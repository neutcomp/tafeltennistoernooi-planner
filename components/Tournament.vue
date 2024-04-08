<template>
  
</template>

<script lang="ts" setup>
interface userType {
  id: number;
  name: string;
}

let { data: tournaments } = await getTournaments();
let isOpen = ref(false);
let errorMessage = ref(null);
const name = ref(null);

async function getTournaments() {
  return await useFetch('/api/tournament');
}

async function addTournament(name: any) {
  if (name) {
    try {
      await useFetch('/api/tournament/add', {
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

    await getTournaments(); // Refreshing the data does not seem to work
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

    await getTournaments();
  }
}
</script>
