<script lang="ts" setup>
import { useDebounce, useDebounceFn } from '@vueuse/core'

const props = defineProps({
    placeholder: {
        type: String,
        default: 'Search...',
    },
})

const searchValue = defineModel()
const emit = defineEmits(['updateInput'])

const changeInput = () => {
    emit('updateInput', searchValue.value)
}
const debouncedTest = useDebounceFn(changeInput, 1000)
</script>

<template>
    <input v-model="searchValue" class="px-3 py-3 text-lg w-4/5 rounded-lg  bg-white  focus:outline-primary border mb-4"
        autofocus :placeholder="placeholder" @keyup="debouncedTest" />
</template>
