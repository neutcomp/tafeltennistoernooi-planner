<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})

const route = useRoute()
</script>

<template>
	Details van toernooi {{ route.params.id }}
</template>