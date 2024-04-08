<template>
	<div class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<div>
			<div class="w-50">
				<form class="text-black">
					<input type="hidden" id="id" v-model="attendee.id" />
					<div class="mb-3">
						<label for=" firstname">Voornaam</label>
						<input type="input" id="firstname" v-model="attendee.firstname" placeholder="Ruben" required />
					</div>
					<div class="mb-3">
						<label for="lastname">Achternaam</label>
						<input type="input" id="lastname" v-model="attendee.lastname" placeholder="van der Neut"
							required />
					</div>
					<div class="mb-3">
						<label for="rating">Rating</label>
						<input type="input" id="rating" v-model="attendee.rating" placeholder="431" required />
					</div>
				</form>
			</div>
			<div class="mt-4">
				<button type="submit" @click.prevent="updateAttendee(attendee)" class="btn">
					Update deelnemer
				</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
definePageMeta({
	middleware: 'auth'
})

export default {
	name: 'attendee-edit',
	data() {
		return {
			attendeeId: '',
			attendee: {
				id: '',
				firstname: '',
				lastname: '',
				rating: ''
			}
		}
	},
	async mounted() {
		this.attendeeId = this.$route.params.id.toString();

		await this.getAttendee(Number(this.attendeeId))
	},
	methods: {
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
		async updateAttendee(attendee: any) {
			if (attendee.firstname && attendee.lastname && attendee.rating) {
				await useFetch('/api/attendee/edit', {
					method: 'POST',
					body: {
						id: attendee.id,
						firstname: attendee.firstname,
						lastname: attendee.lastname,
						rating: attendee.rating,
					},
				});

				await navigateTo('/deelnemer')
			}
		}
	}
}
</script>