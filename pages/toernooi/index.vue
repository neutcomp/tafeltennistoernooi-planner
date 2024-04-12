<template>
  <div class="container mx-auto">
    <div class="justify-center">
      <div>
        <h1>Overzicht toernooien</h1>
      </div>

      <button @click="isOpen = true; resetTournament()" class="btn" type="button">Toernooi toevoegen</button>

      <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
        <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <form class="max-w-sm mx-auto">
              <div class="mb-3">
                <label for="name">Naam</label>
                <input type="input" id="name" v-model="tournament.name" class="w-96"
                  placeholder="Jeugd clubkampioenschappen 2024" required />
              </div>
              <div id="error" class="error">{{ errorMessage }}</div>
            </form>
          </div>
          <div class="mt-4">
            <button @click="isOpen = false"
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded">Cancel</button>
            <button v-if="tournament.id" type="submit" @click.prevent="updateTournament(tournament)" class="btn">Wijzig
              toernooi</button>
            <button v-else type="submit" @click.prevent="addTournament(tournament)" class="btn">Voeg toernooi
              toe</button>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">Naam</th>
              <th scope="col" class="px-6 py-3">Datum</th>
              <th scope="col" class="px-6 py-3"></th>
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
                <button @click="isOpen = true; getTournament(Number(tournament.id))" class="btn">edit</button>
                <NuxtLink :to="`/toernooi/${tournament.id}`" class="btn">deelnemers</NuxtLink>
                <button @click="deleteTournament(Number(tournament.id))" class="btn-red">delete</button>
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
  name: 'tournament',
  data() {
    return {
      isOpen: false,
      errorMessage: '',
      tournamentId: '',
      tournaments: [{
        id: '',
        name: '',
        createdAt: ''
      }],
      tournament: {
        id: '',
        name: '',
        createdAt: ''
      }
    }
  },
  async mounted() {
    await this.getTournaments();
  },
  methods: {
    async resetTournament() {
      this.tournament.id = '';
      this.tournament.name = '';
    },
    async getTournament(tournamentId: number) {
      const { data } = await useFetch('/api/tournament/get', {
        method: 'POST',
        body: {
          id: tournamentId
        }
      })

      if (data) {
        //@ts-ignore
        this.tournament = data;
      }
    },
    async getTournaments() {
      const { data } = useFetch('/api/tournament');

      if (data) {
        //@ts-ignore
        this.tournaments = data;
      }
    },
    async deleteTournament(id: number) {
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
            this.errorMessage = error.message;
            return;
          }

          await this.getTournaments();
        }
      }
    },
    async addTournament(tournament: any) {
      if (tournament) {
        try {
          await useFetch('/api/tournament/add', {
            method: 'POST',
            body: {
              name: tournament.name,
            },
          });
        } catch (error: any) {
          this.errorMessage = error.message;
          return;
        }

        await this.getTournaments();

        this.isOpen = false;
      }
    },
    async updateTournament(tournament: any) {
      if (tournament.name) {
        try {
          await $fetch('/api/tournament/edit', {
            method: 'POST',
            body: {
              id: tournament.id,
              name: tournament.name,
            },
          });
        } catch (error: any) {
          this.errorMessage = error.message;
          return;
        }

        await this.getTournaments();

        this.isOpen = false;
      }
    }
  }
}
</script>
