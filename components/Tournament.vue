<template>
  <button @click="isOpen = true" class="btn" type="button">Toernooi toevoegen</button>

  <div v-show="isOpen" class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
    <div class="max-w-2xl p-6 bg-white rounded-md shadow-xl">
      <div class="flex items-center justify-between">
        <form class="max-w-sm mx-auto">
          <div class="mb-3">
            <label for="name">Naam</label>
            <input type="input" id="name" v-model="name" class="w-96" placeholder="Jeugd clubkampioenschappen 2024"
              required />
          </div>
          <div id="error" class="error">{{ errorMessage }}</div>
        </form>
      </div>
      <div class="mt-4">
        <button @click="isOpen = false" class="px-6 py-2 text-blue-800 border border-blue-600 rounded">Cancel</button>
        <button type="submit" @click.prevent="$event => addTournament(name)" class="btn">Voeg toernooi toe</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface userType {
  id: number;
  name: string;
}

let tournaments = await getTournaments();
let isOpen = ref(false);
let errorMessage = ref(null);
const name = ref(null);

async function getTournaments() {
  return await $fetch('/api/tournament');
}

async function addTournament(name: any) {
  if (name) {
    try {
      await $fetch('/api/tournament/add', {
        method: 'POST',
        body: {
          userId: 1, // Todo make this depending on the user that has login
          name: name,
        },
      });
    } catch (error: any) {
      errorMessage = error.message; // Showing the error does not seem to work
      return;
    }

    let tournaments = await getTournaments(); // Refreshing the data does not seem to work
    isOpen.value = false;
  }
}

async function editTournament(editedUser: userType) {
  if (editedUser.name) {
    try {
      await $fetch('/api/tournament', {
        method: 'GET',
        body: {
          id: editedUser.id,
          userId: 1,
          name: editedUser.name,
        },
      });
    } catch (error: any) {
      errorMessage = error.message;
      return;
    }

    tournaments = await getTournaments();
  }
}
</script>
