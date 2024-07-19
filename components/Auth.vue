<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Controleer je emailbox voor de magische link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">Login</h1>
      <p class="description">Vul je emailadres in en ontvang de magische login link</p>
      <div>
        <input class="inputField" type="email" placeholder="Je emailadres" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Laden' : 'Stuur magische link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>