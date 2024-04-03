<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht deelnemers</h1>
      </div>

      <button @click="isOpen = true" class="btn" type="button">Deelnemers toevoegen</button>

      <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <form class="max-w-sm mx-auto">
              <div class="mb-3">
                <label for="firstname">Voornaam</label>
                <input type="input" id="firstname" v-model="firstname" placeholder="Ruben" required />
              </div>
              <div class="mb-3">
                <label for="lastname">Achternaam</label>
                <input type="input" id="lastname" v-model="lastname" placeholder="van der Neut" required />
              </div>
              <div class="mb-3">
                <label for="rating">Rating</label>
                <input type="input" id="rating" v-model="rating" placeholder="431" required />
              </div>
            </form>
          </div>
          <div class="mt-4">
            <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
              Cancel
            </button>
            <button type="submit" @click.prevent="addAttendee(firstname, lastname, rating)" class="btn">
              Voeg deelnemer toe
            </button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Voornaam</th>
              <th scope="col" class="px-6 py-3">Achternaam</th>
              <th scope="col" class="px-6 py-3">Rating</th>
              <th scope="col" class="px-6 py-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="attendee in attendees" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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
                <button @click="isOpen = true" class="btn" type="button">edit</button>
                <button @click="deleteAttendee(attendee.id)" class="btn-red">delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})

const isOpen = ref(false);
let errorMessage = ref(null);
let { data: attendees } = await getAttendee();
const firstname = ref(null);
const lastname = ref(null);
const rating = ref(null);

const editedAttendee = ref({
  firstname: null,
  lastname: null,
  rating: null,
});

async function getAttendee() {
  return await useFetch('/api/attendee');
}

async function deleteAttendee(id: number) {
  if (confirm('Weet je het zeker?')) {
    if (id) {
      try {
        await useFetch('/api/attendee/attendee', {
          method: 'DELETE',
          body: {
            id: id,
          },
        });
      } catch (error: any) {
        errorMessage = error.message; // Showing the error does not seem to work
        return;
      }

      await getAttendee();
    }
  }
}

async function addAttendee(firstname: any, lastname: any, rating: any) {
  if (firstname && lastname && rating) {
    try {
      await useFetch('/api/attendee/add', {
        method: 'POST',
        body: {
          firstname: firstname,
          lastname: lastname,
          rating: rating,
        },
      });
    } catch (error: any) {
      errorMessage = error.message; // Showing the error does not seem to work
      return;
    }

    isOpen.value = false;
  }
}

// async function editAttendee(editedAttendee) {
//   let editAttendee = null;

//   if (editedAttendee.firstname && editAttendee.lastname && editAttendee.rating) {
//     editAttendee = await useFetch('/api/attendee', {
//       method: 'PUT',
//       body: {
//         firstname: editedAttendee.firstname,
//         lastname: editedAttendee.lastname,
//         rating: editedAttendee.rating,
//       },
//     });
//   }

//   if (editAttendee) {
//     attendee.value = await getAttendee();
//   }
// }
</script>
