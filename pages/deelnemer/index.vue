<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht deelnemers</h1>
      </div>

      <button @click="isOpen = true" class="btn" type="button">
        Toevoegen deelnemer
      </button>

      <div v-show="isOpen" class="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-gray-700 bg-opacity-50
          ">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <form class="max-w-sm mx-auto">
              <div class="mb-3">
                <label for="firstname">Voornaam</label>
                <input type="input" id="firstname" v-model="firstname" placeholder="Ruben" required>
              </div>
              <div class="mb-3">
                <label for="lastname">Achternaam</label>
                <input type="input" id="lastname" v-model="lastname" placeholder="van der Neut" required>
              </div>
              <div class="mb-3">
                <label for="rating">Rating</label>
                <input type="input" id="rating" v-model="rating" placeholder="431" required>
              </div>

            </form>
          </div>
          <div class="mt-4">
            <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
              Cancel
            </button>
            <button type="submit" @click.prevent="addAttendee(firstname, lastname, rating)" class="btn">Voeg deelnemer
              toe</button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Voornaam
              </th>
              <th scope="col" class="px-6 py-3">
                Achternaam
              </th>
              <th scope="col" class="px-6 py-3">
                Rating
              </th>
              <th scope="col" class="px-6 py-3">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(attendee) in attendee" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" class="px-6 py-4">
                {{ attendee.firstname }}
              </th>
              <td class="px-6 py-4">
                {{ attendee.lastname }}
              </td>
              <td class="px-6 py-4">
                {{ attendee.rating }}
              </td>
              <td class="px-6 py-4">
                <button @click="isOpen = true" class="btn" type="button">
                  edit
                </button>
                <button @click="deleteAttendee(attendee.id)" class="btn-red">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>

const isOpen = ref(false)

const { data: attendee } = await getAttendee()
const firstname = ref(null)
const lastname = ref(null)
const rating = ref(null)

const editedAttendee = ref({
  firstname: null,
  lastname: null,
  rating: null
})

async function getAttendee() {
  return await useFetch('/api/attendee')
}

async function deleteAttendee(id) {
  let deletedAttendee = null

  if (id) {
    deletedAttendee = await useFetch('/api/attendee/attendee', {
      method: 'DELETE',
      body: {
        id: id
      }
    })
  }

  if (deletedAttendee) {
    attendee.value = await getAttendee()
  }
}

async function addAttendee(firstname, lastname, rating) {
  let addedAttendee = null

  if (firstname && lastname && rating) {
    console.log('hier')
    addedAttendee = await $fetch('/api/attendee/add', {
      method: 'POST',
      body: {
        userId: 1, // Todo make this depending on the user that has login
        firstname: firstname,
        lastname: lastname,
        rating: rating,
      }
    })
  }

  if (addedAttendee) {
    attendee.value = await getAttendee()
  }
}

async function editAttendee(editedAttendee) {
  let editAttendee = null

  if (editedAttendee.firstname && editAttendee.lastname && editAttendee.rating) {
    editAttendee = await $fetch('/api/attendee', {
      method: 'PUT',
      body: {
        firstname: editedAttendee.firstname,
        lastname: editedAttendee.lastname,
        rating: editedAttendee.rating,
      }
    })
  }

  if (editAttendee) {
    attendee.value = await getAttendee()
  }
}
</script>