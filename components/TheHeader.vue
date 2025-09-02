<template>
  <header class="shadow-sm bg-white">
    <nav class="container mx-auto p-4 flex justify-between">

      <ul class="flex gap-4">
        <li>
          <NuxtLink to="/" class="btn">Home</NuxtLink>
        </li>
        <li>
          <NuxtLink v-if="user" to="/deelnemer/" class="btn">Deelnemers overzicht</NuxtLink>
        </li>
        <li>
          <NuxtLink v-if="user" to="/toernooi/" class="btn">Toernooi overzicht</NuxtLink>
        </li>
        <li>
          <NuxtLink class="btn" v-if="user" @click="signOut">Logout</NuxtLink>
          <NuxtLink class="btn" v-else to="/login">Login</NuxtLink>
        </li>
      </ul>
    </nav>
    {{ user?.header }}
  </header>
</template>

<script setup>
  const user = useSupabaseUser();

  async function signOut() {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      user.value = null
    } catch (error) {
      alert(error.message)
    } finally {
      loading.value = false
    }
  }
</script>
