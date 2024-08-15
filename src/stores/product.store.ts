import { defineStore } from 'pinia'
import { get, isEmpty, size } from 'lodash'
import type { ProductType } from '@/types/Product'

const normalizeProductFromResponse = (product: ProductType) => ({
  title: get(product, 'title', 'Unknown'),
  description: get(product, 'description', 'Unknown'),
  image: get(product, 'thumbnail', 'Unknown'),
  price: get(product, 'price', 0)
})

export const useProductStore = defineStore('product', {
  state: () => ({
    productList: [] as ProductType[],
    isLoading: false,
    isEmpty: false,
    isError: false,
    totalItem: 0
  }),
  getters: {},
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    },
    setEmpty(value: boolean) {
      this.isEmpty = value
    },
    async fetchProducts(skip?: number, keyword?: string) {
      try {
        if (!isEmpty(keyword)) {
          this.searchProducts(keyword as string)
          return
        }

        const baseUri = `${import.meta.env.VITE_BASE_URI}/products`
        this.setLoading(true)
        this.isError = false

        const res = await fetch(`${baseUri}?limit=20&skip=${skip}`)
        const data = await res.json()

        if (size(data.products) > 0) {
          const normalized = data.products.map((data: ProductType) =>
            normalizeProductFromResponse(data)
          )
          this.productList.push(...normalized)
          this.setLoading(false)
        }
      } catch (error) {
        this.isError = true
      }
    },

    async searchProducts(searchValue: string) {
      try {
        const baseUri = `${import.meta.env.VITE_BASE_URI}/products`
        this.setLoading(true)
        this.isError = false

        if (isEmpty(searchValue) && !searchValue) {
          this.setLoading(true)
          this.fetchProducts(10)
        }

        const res = await fetch(
          `${baseUri}/search?limit=20&skip=0&select=title,price,images,thumbnail&q=${searchValue}`
        )
        const data = await res.json()

        if (size(data.products) > 0) {
          const normalized = data.products.map((data: any) => normalizeProductFromResponse(data))
          this.productList = [] // reset
          this.setLoading(false)
          this.productList = normalized
        } else {
          this.productList = data.products
          this.totalItem = data.total
          this.setEmpty(true)
        }
      } catch (error) {
        this.isError = true
      }
    }
  }
})
