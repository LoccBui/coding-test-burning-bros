import { describe, it, expect } from 'vitest'
import { toUSD } from '@/composables/currency' // Update the path to your actual module

describe('toUSD', () => {
  it('should format integer values as USD without cents', () => {
    expect(toUSD(1000)).toBe('$1,000')
    expect(toUSD('2500')).toBe('$2,500')
    expect(toUSD(0)).toBe('$0')
    expect(toUSD(1000000)).toBe('$1,000,000')
  })

  it('should format decimal values as USD with two decimal places', () => {
    expect(toUSD(1000.5)).toBe('$1,000.50')
    expect(toUSD('2500.75')).toBe('$2,500.75')
    expect(toUSD(123456.789)).toBe('$123,456.79')
  })
})
