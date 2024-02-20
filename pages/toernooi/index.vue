<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht toernooien</h1>
      </div>

      <button @click="isOpen = true" class="btn" type="button">Toernooi toevoegen</button>

      <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <form class="max-w-sm mx-auto">
              <div class="mb-3">
                <label for="name">Naam</label>
                <input type="input" id="name" v-model="name" class="w-96" placeholder="Jeugd clubkampioenschappen 2024" required />
              </div>              
              <div id="error" class="error">{{ errorMessage }}</div>
            </form>
          </div>
          <div class="mt-4">
            <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
              Cancel
            </button>
           <button type="submit" @click.prevent="addTournament(name)" class="btn">Voeg toernooi toe</button>
          </div>
        </div>
      </div>

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
            <tr v-for="tournament in tournament" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4">
                {{ tournament.name }}
              </th>
              <td class="px-6 py-4">
                {{ new Date(tournament.createdAt) }}
              </td>
              <td class="px-6 py-4">
                <button @click="editTournament(tournament.id)" class="btn">edit</button>
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
const isOpen = ref(false);
let errorMessage = ref(null);

const { data: tournament } = await getTournaments();
const name = ref(null);

const editedTournament = ref({
  name: null,
});

async function getTournaments() {
  return await useFetch('/api/tournament');
}

async function deleteTournament(id) {
  let deletedTournament = null;

  if (id) {
    deletedTournament = await useFetch('/api/tournament/tournament', {
      method: 'DELETE',
      body: {
        id: id,
      },
    });
  }

  if (deletedTournament) {
    tournament.value = await getTournaments();
  }
}

async function addTournament(name) {
  let addedTournament = null;

  if (name) {
    try {
      addedTournament = await useFetch('/api/tournament/add', {
        method: 'POST',
        body: {
          userId: 1, // Todo make this depending on the user that has login
          name: name,
        },
      });
    } catch (error) {
      errorMessage = error.message;
    }
  }

  if (addedTournament) {
    tournament.value = await getTournaments();
  }
}

async function editTournament(editedUser) {
  let editUser = null;

  if (editedUser.firstname && editUser.lastname && editUser.email) {
    editUser = await useFetch('/api/tournament', {
      method: 'PUT',
      body: {
        userId: 1,
        name: name,
      },
    });
  }

  if (editUser) {
    tournament.value = await getTournaments();
  }
}
</script>
