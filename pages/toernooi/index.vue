<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht toernooien</h1>
      </div>

      <Tournament />

      <div class="mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Naam</th>
              <th scope="col" class="px-6 py-3">Datum</th>
              <th scope="col" class="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tournament in tournaments" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4">
                {{ tournament.name }}
              </th>
              <td class="px-6 py-4">
                {{ $dayjs(tournament.createdAt).format('DD-MM-YYYY') }}
              </td>
              <td class="px-6 py-4">
                <button @click.prevent="$event => editTournament(name)" class="btn">edit</button>
                <button @click="deleteTournament(tournament.id)" class="btn-red">delete</button>
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

const { data: tournaments } = await getTournaments();

// Below functions should move to the component Tournament.vue
async function getTournaments() {
  return await useFetch('/api/tournament');
}

// async function editTournament(editedUser: userType) {
//   if (editedUser.name) {
//     try {
//       await $fetch('/api/tournament', {
//         method: 'GET',
//         body: {
//           id: editedUser.id,
//           userId: 1,
//           name: editedUser.name,
//         },
//       });
//     } catch (error: any) {
//       errorMessage = error.message;
//       return;
//     }

//     tournaments = await getTournaments();
//   }
// }

async function deleteTournament(id) {
  if (confirm('Weet je het zeker?')) {
    if (id) {
      try {
        await useFetch('/api/tournament/tournament', {
          method: 'DELETE',
          body: {
            id: id,
          },
        });
      } catch (error) {
        errorMessage = error.message;
        return;
      }

      await getTournaments();
    }
  }
}
</script>
