<script lang="ts" setup>
import { toUSD } from '@/composables/currency.ts'

const props = defineProps({
    price: {
        type: Number,
        default: 0,
    },
})
</script>

<template>
    <span class="bg-primary/10 text-primary text-xl font-medium me-2 px-2.5 py-0.5 rounded w-fit">{{
        toUSD(price) }}</span>
</template>