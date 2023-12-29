<script lang="ts">
	export let animalFormData: any;

	const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

	let avatarUrl: string = '/placeholder.png';
</script>

<div class="card h-min mt-60 mx-auto">
	<figure>
		<img
			src={animalFormData.photoUrl ?? avatarUrl}
			alt={animalFormData.name ?? 'Temp name'}
			class="mt-5 max-w-96"
		/>
	</figure>
	<div class="card-body grid grid-cols-1 md:grid-cols-3 gap-20">
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
					<span class="text-black">
						{animalFormData.description}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Ras:</span>
				<br />
				{#if animalFormData.race.name == null}
					<span class="text-red-500">Geen ras gekozen</span>
				{:else}
					<span class="text-black">
						{animalFormData.race.name}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Kleur:</span>
				<br />
				{#if animalFormData.color.name == null}
					<span class="text-red-500">Geen kleur gekozen</span>
				{:else}
					<span class="text-black">
						{animalFormData.color.name}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Geslacht:</span>
				<br />
				<span class="text-black">
					{animalFormData.sexId == 13 ? 'Man' : 'Vrouw'}
				</span>
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Leeftijd:</span>
				<br />
				{#if animalFormData.age == null}
					<span class="text-red-500">Geen leeftijd opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.age}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary"
					>{animalFormData.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'}:</span
				>
				<br />
				<span class="text-black">
					{animalFormData.castrated == true ? 'Ja' : 'Nee'}
				</span>
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Verloren te:</span>
				<br />
				{#if animalFormData.cityLost == null || animalFormData.cityLost == ''}
					<span class="text-red-500">Geen stad opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.cityLost.name}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Datum verloren:</span>
				<br />
				{#if animalFormData.dateLost == null}
					<span class="text-red-500">Geen datum opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.dateLost.toLocaleDateString('nl-BE', options)}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Datum gemeld:</span>
				<br />
				{#if animalFormData.dateReported == null}
					<span class="text-red-500">Geen datum opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.dateReported.toLocaleDateString('nl-BE', options)}
					</span>
				{/if}
			</p>
			{#if animalFormData.chipNumber}
				<p class="text-neutral">
					<span class="underline text-secondary">Chipnummer:</span>
					<br />
					<span class="text-black">
						{animalFormData.chipNumber}
					</span>
				</p>
			{/if}
			{#if animalFormData.collar}
				<p class="text-neutral">
					<span class="underline text-secondary">Halsband:</span>
					<br />
					<span class="text-black">
						{animalFormData.collar}
					</span>
				</p>
			{/if}
		</div>
		<div>
			<h2 class="card-title">Gegevens eigenaar:</h2>
			<p class="text-neutral">
				<span class="underline text-secondary">Naam eigenaar:</span>
				<br />
				{#if animalFormData.owner.name == '' || animalFormData.name == null}
					<span class="text-red-500">Geen naam opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.name}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Email eigenaar:</span>
				<br />
				{#if animalFormData.owner.email == '' || animalFormData.owner.email == null}
					<span class="text-red-500">Geen email opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.email}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Straat eigenaar:</span>
				<br />
				{#if animalFormData.owner.street == '' || animalFormData.owner.street == null}
					<span class="text-red-500">Geen straat opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.street}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Stad eigenaar:</span>
				<br />
				{#if animalFormData.owner.city.name == '' || animalFormData.owner.city.name == null}
					<span class="text-red-500">Geen stad opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.city.name}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Telefoonnummer eigenaar:</span>
				<br />
				{#if animalFormData.owner.phone == '' || animalFormData.owner.phone == null}
					<span class="text-red-500">Geen telefoonnummer opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.phone}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">GSM nummer eigenaar:</span>
				<br />
				{#if animalFormData.owner.cellphone == '' || animalFormData.owner.cellphone == null}
					<span class="text-red-500">Geen gsm nummer opgegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.owner.cellphone}
					</span>
				{/if}
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Opmerkingen:</span>
				<br />
				{#if animalFormData.comments == '' || animalFormData.comments == null}
					<span class="text-red-500">Geen opmerkingen gegeven</span>
				{:else}
					<span class="text-black">
						{animalFormData.comments}
					</span>
				{/if}
			</p>
		</div>
		<div>
			<h2 class="card-title">Extra:</h2>
			<p class="text-neutral">
				<span class="underline text-secondary">RIP:</span>
				<br />
				<span class="text-black">
					{animalFormData.rip ? 'Ja' : 'Nee'}
				</span>
			</p>
			<p class="text-neutral">
				<span class="underline text-secondary">Locatie:</span>
				<br />
				{#if animalFormData.location.name == '' || animalFormData.location.name == null}
					<span class="text-red-500">Geen locatie gekozen</span>
				{:else}
					<span class="text-black">
						{animalFormData.location.name}
					</span>
				{/if}
			</p>
		</div>
	</div>
</div>
