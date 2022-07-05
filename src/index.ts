/*
 * Purpose of the code: Keeping the vault delta neutral. 
 * Platform: This is the code runs with Defender Autotask.
 */

// Import dependencies available in the autotask environment
import { RelayerParams } from 'defender-relay-client/lib/relayer';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { BigNumber } from 'ethers';

// Import a dependency not present in the autotask environment which will be included in the js bundle
import isOdd from 'is-odd';
import { PerpetualMarket__factory } from '@predy/v2-contracts/typechain';
import { toUnscaled, calDelta2, calDelta } from './helpers';
import PerpetualMarketRinkeby from '@predy/v2-contracts/deployments/rinkebyArbitrum/PerpetualMarket.json'

// Your vault id
// example 14 = gamma long, 15 = gamma short(crab strategy)
const VAULT_ID = 15

// subvaultIndex that has pro metadata
const SUB_VAULT_INDEX = 0

// Target gamma: 0.0002
const TARGET_GAMMA8E = BigNumber.from(20000)
// Delta threshold: 0.1
const DELTA_THRESHOLD = BigNumber.from(10000000)

// Entrypoint for the Autotask
export async function handler(credentials: RelayerParams) {
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: 'average',
    validForSeconds: 300
  })
  // Please check https://testnet.arbiscan.io/address/0xdF8d64A556a60f7177A3FFc41AEde15524a218F3
  const contract = PerpetualMarket__factory.connect(PerpetualMarketRinkeby.address, signer)

  const ethPriceInfo = await contract.getTradePrice(0, [0, 0])
  const eth2PriceInfo = await contract.getTradePrice(1, [0, 0])
  const vaultInfo = await contract.getTraderVault(VAULT_ID)

  // 1. Calculate vault delta and gamma
  let ethAmountInVault = BigNumber.from(0)
  let eth2AmountInVault = BigNumber.from(0)

  if (vaultInfo.subVaults.length > 0) {
    ethAmountInVault = vaultInfo.subVaults[SUB_VAULT_INDEX].positionPerpetuals[0]
    eth2AmountInVault = vaultInfo.subVaults[SUB_VAULT_INDEX].positionPerpetuals[1]
  }

  console.log('ethAmountInVault', toUnscaled(ethAmountInVault, 8))
  console.log('eth2AmountInVault', toUnscaled(eth2AmountInVault, 8))

  let vaultStrategy: Strategy
  if (ethAmountInVault.gt(0) && eth2AmountInVault.lt(0)) {
    vaultStrategy = Strategy.gammaShort
  } else if (ethAmountInVault.lt(0) && eth2AmountInVault.gt(0)) {
    vaultStrategy = Strategy.gammaLong
  } else { 
    console.log(`nothing to do.`)
    return
  }

  console.log('vaultStrategy', String(vaultStrategy))

  const totalEthDelta = calDelta(ethPriceInfo.fundingRate, ethAmountInVault)
  const totalEth2Delta = calDelta2(ethPriceInfo.indexPrice, eth2PriceInfo.fundingRate, eth2AmountInVault)

  // vault's net delta and gamma
  const vaultNetDelta = totalEthDelta.add(totalEth2Delta)
  const vaultGamma = eth2AmountInVault.mul(2).div(10000)

  console.log('eth delta', toUnscaled(totalEthDelta, 8))
  console.log('eth2 delta', toUnscaled(totalEth2Delta, 8))
  console.log('vault net delta', toUnscaled(vaultNetDelta, 8))
  console.log('vault gammma', toUnscaled(vaultGamma, 8))

  // 2. Calculate trade amounts to make the vault delta neutral
  let tradeAmountEth = BigNumber.from(0)
  let tradeAmountEth2 = BigNumber.from(0)

  switch (vaultStrategy) { 
    case Strategy.gammaLong: { 
      tradeAmountEth2 = TARGET_GAMMA8E.sub(vaultGamma).mul(10000).div(2)

      // If delta is too large, eth short
      // If delta is negative, eth long
      if (vaultNetDelta.gt(DELTA_THRESHOLD)) {
        tradeAmountEth = vaultNetDelta.mul(-1)
      } else if (vaultNetDelta.lt(DELTA_THRESHOLD.mul(-1))) {
        tradeAmountEth = vaultNetDelta.mul(-1)
      }
      break
    }
    case Strategy.gammaShort: { 
      tradeAmountEth2 = TARGET_GAMMA8E.add(vaultGamma).mul(10000).div(2)

      // If delta is too large, eth long
      // If delta is negative, eth short
      if (vaultNetDelta.gt(DELTA_THRESHOLD)) {
        tradeAmountEth = vaultNetDelta
      } else if (vaultNetDelta.lt(DELTA_THRESHOLD.mul(-1))) {
        tradeAmountEth = vaultNetDelta
      }
      break
    }
    default: 
      console.log('this strategy is not implemented.')
      return
  }

  console.log('eth trade', toUnscaled(tradeAmountEth, 8))
  console.log('eth2 trade', toUnscaled(tradeAmountEth2, 8))

  // 3. Create trade tx
  const trades = []

  if (!tradeAmountEth.eq(0)) {
    trades.push({
      productId: 0,
      subVaultIndex: SUB_VAULT_INDEX,
      tradeAmount: tradeAmountEth,
      limitPrice: 0,
      metadata: '0x0700'
    })
  }

  if (!tradeAmountEth2.eq(0)) {
    trades.push({
      productId: 1,
      subVaultIndex: SUB_VAULT_INDEX,
      tradeAmount: tradeAmountEth2,
      limitPrice: 0,
      metadata: '0x0700'
    })
  }

  if (trades.length > 0) {
    console.log('try to send trade tx', trades)
    await contract.trade({
      vaultId: VAULT_ID,
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

const Strategy = {
  gammaLong: "gammaLong",
  gammaShort: "gammaShort",
} as const;
type Strategy = typeof Strategy[keyof typeof Strategy]

// To run locally (this code will not be executed in Autotasks)
if (require.main === module) {
  require('dotenv').config();
  const { API_KEY: apiKey, API_SECRET: apiSecret } = process.env as EnvInfo;
  handler({ apiKey, apiSecret })
    .then(() => process.exit(0))
    .catch((error: Error) => { console.error(error); process.exit(1); });
}