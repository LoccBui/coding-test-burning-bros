<script lang="ts" setup>
const props = defineProps({
    message: {
        type: String,
        default: 'Data not found'
    },
})
</script>

<template>
    <h4 class="w-full text-2xl text-center italic">{{ props.message }}</h4>
</template>