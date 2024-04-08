<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht gebruikers</h1>
      </div>

      <div class="mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Email</th>
              <th scope="col" class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">
                {{ user.email }}
              </td>
              <td class="px-6 py-4">
                <button @click="deleteUser(user.id);" class="btn-red">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
definePageMeta({
  middleware: 'auth'
})

export default {
  name: 'user',
  data() {
    return {
      errorMessage: '',
      users: [{
        id: '',
        email: ''
      }]
    }
  },
  async mounted() {
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      const { data } = await useFetch('/api/user');

      if (data) {
        //@ts-ignore
        this.users = data;
      }
    },
    async deleteUser(id: string) {
      if (confirm('Weet je het zeker?')) {
        if (id) {
          try {
            await useFetch('/api/user/delete', {
              method: 'DELETE',
              body: {
                id: id,
              },
            });
          } catch (error: any) {
            this.errorMessage = error.message;
            return;
          }

          await this.getUsers();
        }
      }
    }
  }
}
</script>
