<template>
    <form class="max-w-sm mx-auto">
        <div class="mb-3">
            <label for="firstname">Voornaam</label>
            <input type="input" id="firstname" placeholder="Kees" v-model="user.firstname" required>
        </div>
        <div class="mb-3">
            <label for="lastname">Achternaam</label>
            <input type="email" id="lastname" placeholder="Jansen" required>
        </div>
        <div class="mb-3">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="name@flowbite.com" required>
        </div>
        <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" required>
            </div>
            <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Actief</label>
        </div>
        <button type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
</template>

<script setup>
definePageMeta({
	middleware: 'auth'
})

const { id } = useRoute().params
const uri = '/api/user/' + id

const { data: user } = await useFetch(uri, { key: id })

if (!user.value) {
    throw createError({ statusCode: 404, statusMessage: 'Gebruiker bestaat niet', fatal: true })
}
</script>