<script lang="ts" setup>
const props = defineProps({
    message: {
        type: String,
        default: 'Something is wrong ! It\'s not you, it\'s us ! Please try later.'
    },
})
</script>

<template>
    <div class="w-4/5 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-500/50" role="alert">
        {{ message }}
    </div>
</template>