<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '../stores/product.store'
import { defineAsyncComponent } from 'vue'
import { useEventListener, useInfiniteScroll } from '@vueuse/core'
import { isEmpty } from 'lodash'

const AtomsScrollToTop = defineAsyncComponent(() =>
    import('@/components/atoms/ScrollToTop.vue')
)

const productStore = useProductStore()
const containerEl = ref<HTMLElement | null>(null)
let skip = 0
const isLoading = ref(false)
const isShowGoTop = ref(false)
let firstLoad = true

const { reset } = useInfiniteScroll(
    containerEl,
    async () => {
        if (firstLoad) {
            firstLoad = false
            return
        }

        isLoading.value = true

        // load more
        if (isLoading && !isEmpty(productStore.productList)) {
            await productStore.fetchProducts(skip += 20)
            isLoading.value = false
            isShowGoTop.value = true
        }
    },
    { distance: 200 }
)

const goOnTop = () => {
    containerEl?.value?.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

useEventListener(containerEl, 'scroll', () => {
    isShowGoTop.value = containerEl?.value?.scrollTop > 1000 ? true : false // show go to top button
})
</script>

<template>
    <div ref="containerEl" id="productLayout"
        class="flex flex-col gap-4 place-items-center max-h-screen min-h-96 overflow-y-auto">
        <slot name="title"></slot>
        <slot name="searchBar"></slot>
        <slot name="productList"></slot>
    </div>

    <AtomsScrollToTop v-if="isShowGoTop" @goTop="goOnTop" />
</template>