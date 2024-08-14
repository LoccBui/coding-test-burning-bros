<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '../stores/product.store'
import ScrollToTop from '@/components/atoms/ScrollToTop.vue'
import { useInfiniteScroll } from '@vueuse/core'


const productStore = useProductStore()
const containerEl = ref<HTMLElement | null>(null)
let skip = 0
const isLoading = ref(false)

const { reset } = useInfiniteScroll(
    containerEl,
    async () => {
        isLoading.value = true

        // load more
        if (isLoading) {
            await productStore.fetchProducts(skip += 20)
            isLoading.value = false
        }
    },
    { distance: 200 }
)

const goOnTop = () => {
    const productLayoutEl = document.getElementById('productLayout');
    if (productLayoutEl) {
        productLayoutEl.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional, adds a smooth scrolling animation
        })
    }
}
</script>

<template>
    <div ref="containerEl" id="productLayout"
        class="flex flex-col gap-4 place-items-center max-h-screen overflow-y-auto">
        <slot name="title"></slot>

        <slot name="searchBar"></slot>
        <slot name="productList"></slot>
    </div>

    <ScrollToTo @goTop="goOnTop" />
</template>