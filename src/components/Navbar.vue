<script setup lang="ts">
 export interface NavBarProps{
    to:string;
    name:string;
 }

 const { to , name} = defineProps<NavBarProps>()

</script>

<template>
    <li class="nav-item">
        <RouterLink class="nav-link-active" :to="to">{{ name }}</RouterLink>
    </li>
</template>