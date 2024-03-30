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
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td class="px-6 py-4">
                {{ user.email }}
              </td>
              <td class="px-6 py-4">
                <button @click="deleteUser(user.id)" class="btn-red">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const { data: users } = await getUsers();

async function getUsers() {
  return await useFetch('/api/user');
}

async function deleteUser(id) {
  let deletedUser = null;

  if (id) {
    deletedUser = await useFetch('/api/user/user', {
      method: 'DELETE',
      body: {
        id: id,
      },
    });
  }

  if (deletedUser) {
    users.value = await getUsers();
  }
}
</script>
