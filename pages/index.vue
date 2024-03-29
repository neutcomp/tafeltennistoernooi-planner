<script setup>
const { status, signIn, signOut } = useAuth();
const loggedIn = computed(() => status.value === 'authenticated')

async function handleLogin() {
    await signIn()
}

async function handleLogout() {
    await signOut()
}
</script>

<template>
    <div>
        <h1>Welkom bij <b>T</b>afeltennis <b>T</b>oernooi
            <b>P</b>lanner
        </h1>

        <NuxtLink class="btn" v-if="loggedIn" @click="handleLogout">Logout</NuxtLink>
        <NuxtLink class="btn" v-else @click="handleLogin">Login</NuxtLink>
    </div>
</template>
