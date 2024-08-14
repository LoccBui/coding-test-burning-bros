<script lang="ts" setup>
const props = defineProps({
    description: {
        type: String,
        default: ''
    },
})
</script>

<template>
    <div class="text-lg text-slate-500 line-clamp-3">{{ description }}</div>
</template>