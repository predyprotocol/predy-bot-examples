// Import dependencies available in the autotask environment
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { BigNumber, ethers } from 'ethers';

// Import a dependency not present in the autotask environment which will be included in the js bundle
import isOdd from 'is-odd';
import { PerpetualMarket__factory } from './typechain';
import { toUnscaled, calDelta2, calDelta } from './helpers';

const PredyContractAddress = '0xdF8d64A556a60f7177A3FFc41AEde15524a218F3';

// vault id
const vaultId = 4

// subvaultIndex that has pro metadata
const subVaultIndex = 0

// 0.0002
const TARGET_GAMMA8E = BigNumber.from(20000)
// 0.1
const DELTA_THRESHOLD = BigNumber.from(10000000)

// Entrypoint for the Autotask
export async function handler(credentials: RelayerParams) {
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: 'average',
    validForSeconds: 300
  })

  const contract = PerpetualMarket__factory.connect(PredyContractAddress, signer)

  const ethPriceInfo = await contract.getTradePrice(0, [0, 0])
  const eth2PriceInfo = await contract.getTradePrice(1, [0, 0])
  const vaultInfo = await contract.getTraderVault(vaultId)

  // 1. Calculate vault delta and gamma
  let ethAmount = BigNumber.from(0)
  let eth2Amount = BigNumber.from(0)

  if (vaultInfo.subVaults.length > 0) {
    ethAmount = vaultInfo.subVaults[subVaultIndex].positionPerpetuals[0]
    eth2Amount = vaultInfo.subVaults[subVaultIndex].positionPerpetuals[1]
  }

  const totalEthDelta = calDelta(ethPriceInfo.fundingRate, ethAmount)
  const totalEth2Delta = calDelta2(ethPriceInfo.indexPrice, eth2PriceInfo.fundingRate, eth2Amount)

  const vaultNetDelta = totalEthDelta.add(totalEth2Delta)

  const vaultGamma = eth2Amount.mul(2).div(10000)

  console.log('eth delta', toUnscaled(totalEthDelta, 8))
  console.log('eth2 delta', toUnscaled(totalEth2Delta, 8))

  // 2. Calculate trade amounts to make the vault delta neutral
  let tradeAmountEth = BigNumber.from(0)
  const tradeAmountEth2 = TARGET_GAMMA8E.sub(vaultGamma).mul(10000).div(2)

  if (vaultNetDelta.gt(DELTA_THRESHOLD)) {
    tradeAmountEth = vaultNetDelta.mul(-1)
  } else if (vaultNetDelta.lt(DELTA_THRESHOLD.mul(-1))) {
    tradeAmountEth = vaultNetDelta.mul(-1)
  }

  console.log('eth trade', toUnscaled(tradeAmountEth, 8))
  console.log('eth2 trade', toUnscaled(tradeAmountEth2, 8))

  // 3. Create trade tx
  const trades = []

  if (!tradeAmountEth.eq(0)) {
    trades.push({
      productId: 0,
      subVaultIndex: 0,
      tradeAmount: tradeAmountEth,
      limitPrice: 0,
      metadata: '0x0700'
    })
  }

  if (!tradeAmountEth2.eq(0)) {
    trades.push({
      productId: 1,
      subVaultIndex: 0,
      tradeAmount: tradeAmountEth2,
      limitPrice: 0,
      metadata: '0x0700'
    })
  }

  if (trades.length > 0) {
    console.log('try to send trade tx', trades)
    await contract.trade({
      vaultId,
      trades: trades,
      marginAmount: 0,
      deadline: 0
    })
  }
}

// Sample typescript type definitions
type EnvInfo = {
  API_KEY: string;
  API_SECRET: string;
}

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => { console.error(error); process.exit(1); });
}