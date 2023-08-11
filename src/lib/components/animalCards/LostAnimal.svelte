<script lang="ts">
	import { page } from '$app/stores';
	import { formatDate } from '$lib/utils';

	export let animal: any;
</script>

<div class="card lg:card-side bg-primary shadow-xl">
	<figure>
		<img
			class="md:m-2 text-neutral"
			src={animal.photoUrl ?? '/placeholder.png'}
			alt={animal.name}
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title text-neutral underline text-3xl">{animal.name}</h2>
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
			<span class="text-secondary">Omschrijving:</span>
			{animal.description}
		</p>
		<!-- {#if $page.data.user}
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Listen</button>
			</div>
		{/if} -->
	</div>
</div>
