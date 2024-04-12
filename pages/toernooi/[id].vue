<template>
    <div class="container mx-auto">
        <div class="justify-center">
            <div>
                <h1>Toernooi deelnemers</h1>
                <NuxtLink to="/toernooi/" class="btn">terug</NuxtLink>

                {{ id }}
            </div>
        </div>
    </div>
</template>

<script type="ts" setup>
const route = useRoute()
const id = route.params.id
// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)
</script>