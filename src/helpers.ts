import { BigNumber } from 'ethers'

const ONE16E = BigNumber.from('10000000000000000')
const ONE8E = BigNumber.from('100000000')

export function toUnscaled(
  n: BigNumber,
  decimal: number,
  precision = 6,
  round = false
): number {
  const p = 10 ** precision
  if (round) {
    const divider = pow10(decimal - 1)
    return Math.round(n.mul(p).div(divider).toNumber() / 10) / p
  }

  return n.mul(p).div(pow10(decimal)).toNumber() / p
}

export function pow10(d: number): BigNumber {
  return BigNumber.from(10).pow(d)
}

export function calDelta(fundingRate: BigNumber, ethAmount: BigNumber) {
  const deltaPerEth = fundingRate.add(ONE16E)

  return ethAmount.mul(deltaPerEth).div(ONE16E)
}

export function calDelta2(indexPrice: BigNumber, fundingRate: BigNumber, eth2Amount: BigNumber) {
  const deltaPerEth2 = indexPrice.mul(fundingRate.add(ONE16E))
    .mul(2).div(10000).div(ONE16E)

  return eth2Amount.mul(deltaPerEth2).div(ONE8E)
}
