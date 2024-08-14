<script lang="ts" setup>
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
})
</script>

<template>
    <div class="text-2xl text-left font-bold text-slate-500">{{ title }}</div>
</template>