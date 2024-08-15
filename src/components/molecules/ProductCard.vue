<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const AtomsCardTitle = defineAsyncComponent(() =>
    import('@/components/atoms/Card/Title.vue')
)

const AtomsCardDescription = defineAsyncComponent(() =>
    import('@/components/atoms/Card/Description.vue')
)

const AtomsCardPrice = defineAsyncComponent(() =>
    import('@/components/atoms/Card/Price.vue')
)

const props = defineProps({
    listsData: {
        type: Array,
        default: []
    },
})
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div v-for="product in listsData" :key="product.id"
            class="flex flex-col border hover:border-primary hover:shadow-oar rounded-2xl w-96 bg-white shadow-xl">
            <div class="flex justify-center items-center rounded-2xl">
                <img :src="product.image" :alt="product.title" class="rounded-t-2xl" loading="lazy" />
            </div>
            <div class="flex flex-col p-8 gap-4">
                <AtomsCardTitle :title="product.title" />
                <AtomsCardDescription :description="product.description" />
                <AtomsCardPrice :price="product.price" />
            </div>
        </div>
    </div>
</template>