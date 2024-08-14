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
    productList: [],
    isLoading: false,
    isEmpty: false,
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
    async fetchProducts(skip?: number) {
      try {
        const baseUri = `${import.meta.env.VITE_BASE_URI}/products`
        this.setLoading(true)

        const res = await fetch(`${baseUri}?limit=20&skip=${skip}`)
        const data = await res.json()

        if (size(data.products) > 0) {
          const normalized = data.products.map((data: any) => normalizeProductFromResponse(data))
          this.productList.push(...normalized)
          this.setLoading(false)
        }
      } catch (error) {
        this.setEmpty(true)
        this.setLoading(false)
      }
    },

    async searchProducts(searchValue: string) {
      try {
        const baseUri = `${import.meta.env.VITE_BASE_URI}/products`
        this.setLoading(true)

        if (isEmpty(searchValue) && !searchValue) {
          this.setLoading(true)
          this.fetchProducts(10)
        }

        this.productList = [] // reset

        const res = await fetch(
          `${baseUri}/search?limit=20&skip=0&select=title,price,images,thumbnail&q=${searchValue}`
        )
        const data = await res.json()

        if (size(data.products) > 0) {
          const normalized = data.products.map((data: any) => normalizeProductFromResponse(data))
          this.productList = normalized
          this.setLoading(false)
        } else {
          this.totalItem = data.total
          this.setEmpty(true)
        }
      } catch (error) {
        this.setEmpty(true)
        this.setLoading(false)
      }
    }
  }
})
