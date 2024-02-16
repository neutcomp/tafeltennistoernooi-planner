<template>
    <div>
        <h1 class="text-5xl font-extrabold dark:text-black mb-3">Overzicht gebruikers</h1>
    </div>

    <div>
        <NuxtLink to="/gebruiker/toevoegen"
            class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">
            voeg toe</NuxtLink>
    </div>

    <div class="relative overflow-x-auto mt-4">
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
                        Email
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Edit
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user) in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {{ user.firstname }}
                    </th>
                    <td class="px-6 py-4">
                        {{ user.lastname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        <NuxtLink :to="`/gebruiker/${user.id}`">wijzig</NuxtLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const users = ref(null);
users.value = await getUsers();


async function getUsers() {
    return await $fetch('/api/user/get')
}
</script>