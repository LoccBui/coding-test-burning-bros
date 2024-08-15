<script setup lang="ts">
import ProductLayout from '@/layout/ProductLayout.vue'
import { defineAsyncComponent } from 'vue'
import { size } from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

import { useProductStore } from '../stores/product.store'
const SearchBar = defineAsyncComponent(() =>
  import('@/components/atoms/SearchBar.vue')
)

const Loading = defineAsyncComponent(() =>
  import('@/components/atoms/Loading.vue')
)

const EmptyData = defineAsyncComponent(() =>
  import('@/components/atoms/EmptyData.vue')
)

const AtomsAlert = defineAsyncComponent(() =>
  import('@/components/atoms/Alert.vue')
)

const ProductCard = defineAsyncComponent(() =>
  import('@/components/molecules/ProductCard.vue')
)

const totalItem = ref<number>(0)
const productStore = useProductStore()
const router = useRouter()
const route = useRoute()
const searchValue = ref<string>(route.query.search as string)
let skip = 0

const handleInputChange = async () => {
  updateQueryParams(searchValue.value)
  await productStore.searchProducts(searchValue.value)
}

const updateQueryParams = (queryValue: string) => {
  const query = queryValue ? { search: queryValue } : {}
  router.push({ name: 'productPage', query })
}

const fetchProductData = async () => {
  await productStore.fetchProducts(skip, searchValue.value)
}

onMounted(async () => {
  await fetchProductData()
})
</script>

<template>
  <ProductLayout>
    <template #title>
      <h1 class="text-center font-bold text-primary text-5xl">Burning Bros Store</h1>
    </template>

    <template #searchBar>
      <SearchBar v-model="searchValue" placeholder="Search product..." @updateInput="handleInputChange" />
    </template>

    <template #productList>
      <ProductCard :listsData="productStore.productList" />
      <div v-if="!productStore.isError">
        <Loading v-if="productStore.isLoading && !productStore.isEmpty" text-message="Loading product..." />
        <EmptyData v-if="size(productStore.productList) <= 0 && productStore.totalItem === 0"
          :message="`Oops! ${totalItem} product found for '${searchValue}'`" />
      </div>

      <AtomsAlert v-if="productStore.isError" />
    </template>
  </ProductLayout>
</template>
