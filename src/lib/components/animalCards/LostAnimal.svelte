<script lang="ts">
	import { formatDate } from '$lib/utils';
	let avatarUrl: string = '/placeholder.png';

	export let animal: any;
</script>

<div class="card w-96 md:mx-10 lg:mx-5 h-min shadow-xl bg-primary">
	<figure>
		<img src={animal.photoUrl ?? avatarUrl} alt={animal.name} />
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
	</div>
</div>
