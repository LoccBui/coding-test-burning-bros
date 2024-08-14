import currency from 'currency.js'

export const toUSD = (value: number | string): string => {
  const numericValue = Number(value)

  if (Number.isInteger(numericValue)) {
    return currency(numericValue, {
      symbol: '$',
      precision: 0,
      separator: ',',
      decimal: '.'
    }).format()
  }

  return currency(numericValue, {
    symbol: '$',
    precision: 2,
    separator: ',',
    decimal: '.'
  }).format()
}
