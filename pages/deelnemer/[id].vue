<template>
	Details van deelnemer {{ route.params.id }}
</template>

<script setup lang="ts">
definePageMeta({
	middleware: 'auth'
})

const route = useRoute()
</script>