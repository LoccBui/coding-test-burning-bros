<script lang="ts" setup>
import IconArrowUp from '../icons/IconArrowUp.vue';

const emit = defineEmits(['goTop'])
const btn = document.getElementsByClassName('scrolToTopButton')

console.log(btn);

window.onscroll = () => { scrollFunction() };

const scrollFunction = () => {
    console.log('123');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

const scrolToTop = () => {
    emit('goTop')
}
</script>

<template>
    <div @click="scrolToTop"
        class="w-10 h-10 absolute bottom-5 right-5 scrolToTopButton rounded-full flex items-center justify-center bg-primary z-[100] hover:cursor-pointer hover:opacity-80">
        <IconArrowUp />
    </div>
</template>
