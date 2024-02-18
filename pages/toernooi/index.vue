<template>
  <div>
    <h1>Overzicht toernooien</h1>
  </div>

  <div>
    <form class="max-w-sm mx-auto">
      <div class="mb-3">
        <label for="name">Naam</label>
        <input type="input" id="name" v-model="name" placeholder="Jeugd clubkampioenschappen 2024" required>
      </div>
      <button type="submit" @click.prevent="addTournament(name)" class="btn">Voeg toernooi
        toe</button>
    </form>
  </div>

  <div class="relative overflow-x-auto mt-4">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Naam
          </th>
          <th scope="col" class="px-6 py-3">
            Datum
          </th>
          <th scope="col" class="px-6 py-3">
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(tournament) in tournament" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
</template>

<script setup>

const { data: tournament } = await getTournaments()
const name = ref(null)

const editedTournament = ref({
  name: null
})

async function getTournaments() {
  return await useFetch('/api/tournament')
}

async function deleteTournament(id) {
  let deletedTournament = null

  if (id) {
    deletedTournament = await useFetch('/api/tournament/tournament', {
      method: 'DELETE',
      body: {
        id: id
      }
    })
  }

  if (deletedTournament) {
    tournament.value = await getTournaments()
  }
}

async function addTournament(name) {
  let addedAttendee = null

  if (name) {
    addedAttendee = await $fetch('/api/attendee/add', {
      method: 'POST',
      body: {
        firstname: firstname,
        lastname: lastname,
        email: email,
      }
    })
  }

  if (addedAttendee) {
    tournament.value = await getTournaments()
  }
}

async function editTournament(editedUser) {
  let editUser = null

  if (editedUser.firstname && editUser.lastname && editUser.email) {
    editUser = await $fetch('/api/attendee', {
      method: 'PUT',
      body: {
        firstname: editedUser.firstname,
        lastname: editedUser.lastname,
        email: editedUser.email,
      }
    })
  }

  if (editUser) {
    tournament.value = await getTournaments()
  }
}
</script>