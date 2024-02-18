<template>
    <div>
        <h1>Overzicht gebruikers</h1>
    </div>

    <div>
        <form class="max-w-sm mx-auto">
            <div class="mb-3">
                <label for="firstname">Voornaam</label>
                <input type="input" id="firstname" v-model="firstname" placeholder="Bjorn" required>
            </div>
            <div class="mb-3">
                <label for="lastname">Achternaam</label>
                <input type="input" id="lastname" v-model="lastname" placeholder="van der Neut" required>
            </div>
            <div class="mb-3">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" placeholder="bjorn@thevictory.nl" required>
            </div>
            <button type="submit" @click.prevent="addUser(firstname, lastname, email)" class="btn">Voeg gebruiker
                toe</button>
        </form>
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
                    <th scope="row" class="px-6 py-4">
                        {{ user.firstname }}
                    </th>
                    <td class=" px-6 py-4">
                        {{ user.lastname }}
                    </td>
                    <td class="px-6 py-4">
                        {{ user.email }}
                    </td>
                    <td class="px-6 py-4">
                        <button @click="editUser(user.id)" class="btn">edit</button>
                        <button @click="deleteUser(user.id)" class="btn-red">delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const isOpen = ref(false)

const { data: users } = await getUsers()
const firstname = ref(null)
const lastname = ref(null)
const email = ref(null)

const editedUser = ref({
    firstname: null,
    lastname: null,
    email: null
})

async function getUsers() {
    return await useFetch('/api/user')
}

async function deleteUser(id) {
    let deletedUser = null

    if (id) {
        deletedUser = await useFetch('/api/user/user', {
            method: 'DELETE',
            body: {
                id: id
            }
        })
    }

    if (deletedUser) {
        users.value = await getUsers()
    }
}

async function addUser(firstname, lastname, email) {
    let addedUser = null

    if (firstname && lastname && email) {
        addedUser = await $fetch('/api/user/add', {
            method: 'POST',
            body: {
                firstname: firstname,
                lastname: lastname,
                email: email,
            }
        })
    }

    if (addedUser) {
        users.value = await getUsers()
    }
}

async function editUser(editedUser) {
    let editUser = null

    if (editedUser.firstname && editUser.lastname && editUser.email) {
        editUser = await $fetch('/api/user', {
            method: 'PUT',
            body: {
                firstname: editedUser.firstname,
                lastname: editedUser.lastname,
                email: editedUser.email,
            }
        })
    }

    if (editUser) {
        users.value = await getUsers()
    }
}
</script>