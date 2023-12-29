<script lang="ts">
	import LostAnimal from '$lib/components/animalCards/LostAnimal.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;

	let raceFilter: string | null = '';
	let sexFilter: string | null = '';
	let colorFilter: string | null = '';
	let searchFilter: string = '';

	let filteredData: any[] = [];

	$: filteredData =
		data?.lostCats?.filter(
			(cat) =>
				(!raceFilter || cat.race.name === raceFilter) &&
				(!sexFilter || cat.sex.name === sexFilter) &&
				(!colorFilter || cat.color.name === colorFilter) &&
				(!searchFilter ||
					cat.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
					cat.cityLost.name.toLowerCase().includes(searchFilter.toLowerCase()))
		) || [];
</script>

{#if $page.data.user}
	<ul class="menu menu-vertical lg:menu-horizontal rounded-box bg-primary">
		<li>
			<a href="/api/newCat" class="text-neutral text-xl">Nieuwe kat toevoegen </a>
		</li>
	</ul>
{/if}

<div class="form-control flex md:flex-row w-full items-center md:justify-between">
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="naam">
			<span class="label-text text-xl text-secondary underline">Zoeken via tekst:</span>
		</label>
		<input
			name="naam"
			type="text"
			placeholder="Vb. Felix of Deurne"
			style="min-width: 150px;"
			class="input input-bordered border-primary border-2 bg-white w-full max-w-lg"
			bind:value={searchFilter}
		/>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="ras">
			<span class="label-text text-xl text-secondary underline">Ras:</span>
		</label>
		<select class="select select-bordered border-primary border-2 bg-white" bind:value={raceFilter}>
			<option selected value="">-- Selecteer Ras --</option>
			{#each data.races as race}
				<option value={race.label}>{race.label}</option>
			{/each}
		</select>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="kleur">
			<span class="label-text text-xl text-secondary underline">Kleur:</span>
		</label>
		<select
			class="select select-bordered border-primary border-2 bg-white"
			bind:value={colorFilter}
		>
			<option selected value="">-- Selecteer Kleur --</option>
			{#each data.colors as color}
				<option value={color.label}>{color.label}</option>
			{/each}
		</select>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="geslacht">
			<span class="label-text text-xl text-secondary underline">Geslacht:</span>
		</label>
		<select class="select select-bordered border-primary border-2 bg-white" bind:value={sexFilter}>
			<option selected value="">-- Selecteer Geslacht --</option>
			{#each data.races as race}
				<option value={race.label}>{race.label}</option>
			{/each}
		</select>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-4 items-center place-content-center">
	{#each filteredData as animal}
		<LostAnimal {animal} />
	{/each}
</div>
