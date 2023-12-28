<script lang="ts">
	import { onMount } from 'svelte';
	import LostAnimal from '$lib/components/animalCards/LostAnimal.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	export let data: PageData;

	let currentPage = 1;
	const itemsPerPage = 9;

	let pagedData: any[] = [];
	let raceFilter: string | null = '';
	let sexFilter: string | null = '';
	let colorFilter: string | null = '';
	let searchFilter: string = '';

	$: if (browser && data && data.lostCats) {
		paginateData();
	}

	let filteredData: any[] = [];

	$: filteredData =
		data?.lostCats?.filter(
			(cat) =>
				(!raceFilter || cat.race.name === raceFilter) &&
				(!sexFilter || cat.sex.name === sexFilter) &&
				(!colorFilter || cat.color.name === colorFilter) &&
				(!searchFilter || cat.name.toLowerCase().includes(searchFilter.toLowerCase()))
		) || [];

	$: if (browser && filteredData) {
		paginateData();
	}

	function paginateData() {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		pagedData = filteredData.slice(start, end);
	}

	function gotoPage(pageNumber: number) {
		currentPage = pageNumber;
		paginateData();
	}
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
			<span class="label-text text-secondary">Zoeken op naam:</span>
		</label>
		<input
			name="naam"
			type="text"
			placeholder="Vb. Felix"
			style="min-width: 150px;"
			class="input input-bordered border-primary border-2 bg-white w-full max-w-lg"
			bind:value={searchFilter}
		/>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="ras">
			<span class="label-text text-secondary">Ras:</span>
		</label>
		<select class="select select-bordered border-primary border-2 bg-white" bind:value={raceFilter}>
			<option selected value="">-- Selecteer Ras --</option>
			{#each data.races as race}
				<option value={race.name}>{race.name}</option>
			{/each}
		</select>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="kleur">
			<span class="label-text text-secondary">Kleur:</span>
		</label>
		<select
			class="select select-bordered border-primary border-2 bg-white"
			bind:value={colorFilter}
		>
			<option selected value="">-- Selecteer Kleur --</option>
			{#each data.colors as color}
				<option value={color.name}>{color.name}</option>
			{/each}
		</select>
	</div>
	<div class="form-control w-full max-w-md md:mx-1">
		<label class="label" for="geslacht">
			<span class="label-text text-secondary">Geslacht:</span>
		</label>
		<select class="select select-bordered border-primary border-2 bg-white" bind:value={sexFilter}>
			<option selected value="">-- Selecteer Geslacht --</option>
			{#each data.races as race}
				<option value={race.name}>{race.name}</option>
			{/each}
		</select>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
	{#each pagedData as animal}
		<LostAnimal {animal} />
	{/each}
</div>

{#if pagedData.length > itemsPerPage}
	<div class="p-4 flex justify-center">
		<div class="pagination">
			{#each Array(Math.ceil(pagedData.length / itemsPerPage)) as _, index (index)}
				<button
					class={currentPage === index + 1 ? 'btn btn-primary' : 'btn'}
					on:click={() => gotoPage(index + 1)}
				>
					{index + 1}
				</button>
			{/each}
		</div>
	</div>
{/if}
