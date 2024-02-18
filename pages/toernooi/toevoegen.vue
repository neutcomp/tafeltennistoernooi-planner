<template>
	<div class="mt-5 container">
		<div class="card">
			<div class="card-header">
				<h1>Voeg toernooi toe</h1>
				<NuxtLink to="/toernooi" class="btn btn-danger float-end">Terug</NuxtLink>
			</div>

			<div class="card-body">
				<div>
					<form @submit.prevent="saveTournament">
						<div class="mb-3">
							<label>Naam</label>
							<input type="text" name="name" class="form-control" />
						</div>
						<div class="mb-3">
							<button type="submit" class="btn btn-primary">Opslaan</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "tournamentAdd",
	methods: {
		saveTournament() {
			console.log('saving')
		}
	},
}
</script>