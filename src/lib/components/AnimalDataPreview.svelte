<script lang="ts">
	export let animalFormData: any;
	export let colors: { value: number; label: string }[];
	export let races: { value: number; label: string }[];
	export let locations: { value: number; label: string }[];

	$: animalColor = colors.find((color) => color.value === animalFormData.colorId)?.label;
	$: animalRace = races.find((race) => race.value === animalFormData.raceId)?.label;
	$: ownerLocation = locations.find(
		(location) => location.value === animalFormData.locationId
	)?.label;

	let avatarUrl: string = '/placeholder.png';
</script>

<div class="card w-full max-w-3xl md:mx-10 lg:mx-5 h-min shadow-xl bg-primary">
	<figure>
		<img
			src={animalFormData.photoUrl ?? avatarUrl}
			alt={animalFormData.name ?? 'Temp name'}
			class="mt-5 max-w-96"
		/>
	</figure>
	<div class="card-body grid grid-cols-1 md:grid-cols-3 gap-10">
		<div>
			<h2 class="card-title">
				Gegevens {animalFormData.name}
			</h2>
			<p class="text-neutral">
				<span class="underline text-secondary">Omschrijving:</span>
				<br />
				{#if animalFormData.description == '' || animalFormData.description == null}
					<span class="text-red-500">Geen omschrijving gegeven</span>
				{:else}
					{animalFormData.description}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Ras:</span>
				<br />
				{#if animalRace == null}
					<span class="text-red-500">Geen ras gekozen</span>
				{:else}
					{animalRace}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Kleur:</span>
				<br />
				{#if animalColor == null}
					<span class="text-red-500">Geen kleur gekozen</span>
				{:else}
					{animalColor}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Geslacht:</span>
				<br />
				{animalFormData.sexId == 13 ? 'Man' : 'Vrouw'}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Leeftijd:</span>
				<br />
				{#if animalFormData.age == null}
					<span class="text-red-500">Geen leeftijd opgegeven</span>
				{:else}
					{animalFormData.age}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary"
					>{animalFormData.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'}:</span
				>
				<br />
				{animalFormData.castrated == true ? 'Ja' : 'Nee'}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Verloren te:</span>
				<br />
				{#if animalFormData.cityLost == null || animalFormData.cityLost == ''}
					<span class="text-red-500">Geen stad opgegeven</span>
				{:else}
					{animalFormData.cityLost}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Datum verloren:</span>
				<br />
				{#if animalFormData.dateLost == null}
					<span class="text-red-500">Geen datum opgegeven</span>
				{:else}
					{animalFormData.dateLost}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Datum gemeld:</span>
				<br />
				{#if animalFormData.dateReported == null}
					<span class="text-red-500">Geen datum opgegeven</span>
				{:else}
					{animalFormData.dateReported}
				{/if}
			</p>
			{#if animalFormData.chipNumber}
				<p class="text-neutral">
					<span class="underline text-secondary">Chipnummer:</span>
					<br />
					{animalFormData.chipNumber}
				</p>
			{/if}
			{#if animalFormData.collar}
				<p class="text-neutral">
					<span class="underline text-secondary">Halsband:</span>
					<br />
					{animalFormData.collar}
				</p>
			{/if}
		</div>
		<div>
			<h2 class="card-title">Gegevens eigenaar:</h2>
			<p class="text-neutral">
				<span class="underline text-secondary">Naam eigenaar:</span>
				<br />
				{#if animalFormData.ownerName == '' || animalFormData.ownerName == null}
					<span class="text-red-500">Geen naam opgegeven</span>
				{:else}
					{animalFormData.ownerName}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Email eigenaar:</span>
				<br />
				{#if animalFormData.ownerEmail == '' || animalFormData.ownerEmail == null}
					<span class="text-red-500">Geen email opgegeven</span>
				{:else}
					{animalFormData.ownerEmail}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Straat eigenaar:</span>
				<br />
				{#if animalFormData.ownerStreet == '' || animalFormData.ownerStreet == null}
					<span class="text-red-500">Geen straat opgegeven</span>
				{:else}
					{animalFormData.ownerStreet}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Stad eigenaar:</span>
				<br />
				{#if animalFormData.ownerCity == '' || animalFormData.ownerCity == null}
					<span class="text-red-500">Geen stad opgegeven</span>
				{:else}
					{animalFormData.ownerCity}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Telefoonnummer eigenaar:</span>
				<br />
				{#if animalFormData.ownerPhone == '' || animalFormData.ownerPhone == null}
					<span class="text-red-500">Geen telefoonnummer opgegeven</span>
				{:else}
					{animalFormData.ownerPhone}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">GSM nummer eigenaar:</span>
				<br />
				{#if animalFormData.ownerCellphone == '' || animalFormData.ownerCellphone == null}
					<span class="text-red-500">Geen gsm nummer opgegeven</span>
				{:else}
					{animalFormData.ownerCellphone}
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Opmerkingen:</span>
				<br />
				{#if animalFormData.comments == '' || animalFormData.comments == null}
					<span class="text-red-500">Geen opmerkingen gegeven</span>
				{:else}
					{animalFormData.comments}
				{/if}
			</p>
		</div>
		<div>
			<h2 class="card-title">Extra:</h2>
			<p class="text-neutral">
				<span class="underline text-secondary">RIP:</span>
				<br />
				{animalFormData.rip}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Locatie:</span>
				<br />
				{#if ownerLocation == '' || ownerLocation == null}
					<span class="text-red-500">Geen locatie gekozen</span>
				{:else}
					{ownerLocation}
				{/if}
			</p>
		</div>
	</div>
</div>
