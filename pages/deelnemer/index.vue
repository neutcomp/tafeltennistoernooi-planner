<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht deelnemers</h1>
      </div>

      <button @click="isOpen = true; resetAttendee()" class="btn" type="button">Deelnemers
        toevoegen</button>

      <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <form class="max-w-sm mx-auto">
              <div class="mb-3">
                <label for="firstname">Voornaam</label>
                <input type="input" id="firstname" v-model="attendee.firstname" placeholder="Ruben" required />
              </div>
              <div class="mb-3">
                <label for="lastname">Achternaam</label>
                <input type="input" id="lastname" v-model="attendee.lastname" placeholder="van der Neut" required />
              </div>
              <div class="mb-3">
                <label for="rating">Rating</label>
                <input type="input" id="rating" v-model="attendee.rating" placeholder="431" required />
              </div>
              <div id="error" class="error">{{ errorMessage }}</div>
            </form>
          </div>
          <div class="mt-4">
            <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">
              Cancel
            </button>
            <button v-if="attendee.id" type="submit" @click.prevent="updateAttendee(attendee)" class="btn">
              Update deelnemer
            </button>
            <button v-else type="submit" @click.prevent="addAttendee(attendee)" class="btn">
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
              <th scope="col" class="px-6 py-3"></th>
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
                <NuxtLink @click="isOpen = true; getAttendee(Number(attendee.id))" class="btn" type="button">edit
                </NuxtLink>
                <button @click="deleteAttendee(Number(attendee.id))" class="btn-red">delete</button>
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
  name: 'attendee',
  data() {
    return {
      isOpen: false,
      errorMessage: '',
      attendeeId: '',
      attendees: [{
        id: '',
        firstname: '',
        lastname: '',
        rating: ''
      }],
      attendee: {
        id: '',
        firstname: '',
        lastname: '',
        rating: ''
      }
    }
  },
  async mounted() {
    await this.getAttendees();
  },
  methods: {
    async resetAttendee() {
      this.attendee.id = '';
      this.attendee.firstname = '';
      this.attendee.lastname = '';
      this.attendee.rating = '';
    },
    async getAttendee(attendeeId: number) {
      const { data } = await useFetch('/api/attendee/get', {
        method: 'POST',
        body: {
          id: attendeeId
        }
      })

      if (data) {
        //@ts-ignore
        this.attendee = data;
      }
    },
    async getAttendees() {
      const { data } = await useFetch('/api/attendee');

      if (data) {
        //@ts-ignore
        this.attendees = data;
      }
    },
    async deleteAttendee(id: number) {
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
            this.errorMessage = error.message;
            return;
          }

          await this.getAttendees();
        }
      }
    },
    async addAttendee(attendee: any) {
      if (attendee.firstname && attendee.lastname && attendee.rating) {
        try {
          await useFetch('/api/attendee/add', {
            method: 'POST',
            body: {
              firstname: attendee.firstname,
              lastname: attendee.lastname,
              rating: attendee.rating,
            },
          });
        } catch (error: any) {
          this.errorMessage = error.message;
          return;
        }

        await this.getAttendees();

        this.isOpen = false;
      }
    },
    async updateAttendee(attendee: any) {
      if (attendee.firstname && attendee.lastname && attendee.rating) {
        try {
          await useFetch('/api/attendee/edit', {
            method: 'POST',
            body: {
              id: attendee.id,
              firstname: attendee.firstname,
              lastname: attendee.lastname,
              rating: attendee.rating,
            },
          });
        } catch (error: any) {
          this.errorMessage = error.message;
          return;
        }

        await this.getAttendees();

        this.isOpen = false;
      }
    }
  }
}
</script>
