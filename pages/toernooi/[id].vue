<script lang="ts">
definePageMeta({
    middleware: 'auth'
})

export default {
    name: 'tournamentAttendees',
    data() {
        return {
            attendees: [{
                id: '',
                firstname: '',
                lastname: '',
                rating: ''
            }],
            selectedAttendees: [],
        }
    },
    async mounted() {
        await this.getAttendees();
    },
    methods: {
        async getAttendees() {
            const { data } = await useFetch('/api/attendee');

            if (data) {
                this.attendees = data;
            }
        },
        async addAttendee() {
            console.log(this.selectedAttendees)
            // try {
            //     await useFetch('/api/attendee/add-attendees', {
            //         method: 'POST',
            //         body: this.selectedAttendees
            //     });
            // } catch (error: any) {
            //     this.errorMessage = error.message;
            //     return;
            // }
        }
    }
}
</script>

<template>
    <form class="max-w-sm mx-auto">
        <USelectMenu value-attribute="id" option-attribute="firstname" v-model="selectedAttendees" :options="attendees"
            multiple searchable placeholder="Select people">
            <template #option="{ option: attendee }">
                <span class="truncate">{{ attendee?.firstname }} {{ attendee?.lastname }}</span>
            </template>

        </USelectMenu>

        <button @click.prevent="addAttendee()" class="btn" type="button">Deelnemers
            toevoegen</button>
    </form>

    {{ selectedAttendees }}
</template>