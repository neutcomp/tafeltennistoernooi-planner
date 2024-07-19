<script lang="ts">
// definePageMeta({
//     middleware: 'auth'
// })

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
                //@ts-ignore
                this.attendees = data;
            }
        },
        async addAttendee() {
            try {
                const route = useRoute()
                const tournamentId = route.params.id;
                await useFetch('/api/tournament/add-attendees', {
                    method: 'POST',
                    body: { tournamentId: tournamentId, attendees: this.selectedAttendees }
                });
            } catch (error: any) {
                //@ts-ignore
                this.errorMessage = error.message;
                return;
            }
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