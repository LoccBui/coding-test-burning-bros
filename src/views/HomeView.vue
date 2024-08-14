<script setup lang="ts">
import ProductLayout from '@/layout/ProductLayout.vue';

import { onMounted, ref } from 'vue'
import { useProductStore } from '../stores/product.store'
import SearchBar from '@/components/atoms/SearchBar.vue';
import Loading from '@/components/atoms/Loading.vue';
import EmptyData from '@/components/atoms/EmptyData.vue';
import ProductCard from '@/components/molecules/ProductCard.vue';

const totalItem = ref<Number>(0)
const productStore = useProductStore()
const searchValue = ref<String>('')
let skip = 0


const handleInputChange = async () => {
  console.log('chn');
  await productStore.searchProducts(searchValue.value)
}

const fetchProductData = async () => {
  await productStore.fetchProducts(skip)
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
      <Loading v-if="productStore.isLoading && !productStore.isEmpty" text-message="Loading product..." />
      <EmptyData v-if="productStore.isEmpty && productStore.totalItem === 0"
        :message="`Oops! ${totalItem} product found for '${searchValue}'`" />
    </template>
  </ProductLayout>
</template>
