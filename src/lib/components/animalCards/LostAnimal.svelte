<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils';
	import AnimalDataModal from './animalCardModal/AnimalDataModal.svelte';
	let avatarUrl: string = '/placeholder.png';

	export let animal: any;

	$: animal, console.log(animal);
</script>

<div class="card min-w-fit lg:card-side lg:max-h-[430px] shadow-xl bg-primary">
	<figure>
		<img
			class="rounded lg:mt-2 lg:max-h-[200px] mx-2"
			src={animal.photoUrl ?? avatarUrl}
			alt={animal.name}
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">
			{animal.name}
		</h2>
		<p class="text-neutral">
			<span class="text-secondary">Omschrijving:</span>
			{animal.description}
		</p>
		<p class="text-neutral">
			<span class="text-secondary">Ras:</span>
			{animal.race.name}
		</p>
		<p class="text-neutral">
			<span class="text-secondary">Kleur:</span>
			{animal.color.name}
		</p>
		<p class="text-neutral">
			<span class="text-secondary">Geslacht:</span>
			{animal.sex.name}
		</p>
		<p class="text-neutral"><span class="text-secondary">Leeftijd:</span> {animal.age}</p>
		<p class="text-neutral">
			<span class="text-secondary">Datum verloren:</span>
			{formatDate(animal.dateLost)}
		</p>
		<p class="text-neutral">
			<span class="text-secondary">Verloren te:</span>
			{animal.cityLost.name}
		</p>
		<p class="text-neutral">
			<span class="text-secondary">Straat verloren:</span>
			{animal.owner.street}
		</p>
		{#if $page.data.user}
			<div class="card-actions mt-3 justify-evenly">
				<button
					class="btn btn-outline text-secondary hover:btn-neutral"
					onclick="{animal.name}.showModal()">Meer info</button
				>
				<button class="btn btn-outline text-secondary hover:btn-warning">Aanpassen</button>
			</div>
		{/if}
	</div>
</div>

<dialog id={animal.name} class="modal">
	<div class="modal-box bg-white w-11/12 max-w-5xl flex flex-col items-center justify-center">
		<AnimalDataModal animalFormData={animal} />
		<div class="modal-action mt-4">
			<form method="dialog">
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
