<script lang="ts">
	import { enhance } from '$app/forms';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import type { PageData } from './$types';
	let activeTab = 'lost';

	export let data: PageData;

	let showCastratedCheckbox = false;
	let showChippedCheckbox = false;
	let showCollarTextarea = false;
	const { form } = superForm(data.form);
	$: $form.sexId = Number($form.sexId);
	$: if (!showCastratedCheckbox) {
		$form.castrated = null;
	}
	$: if (!showChippedCheckbox) {
		$form.chipped = null;
		$form.chipNumber = null;
	}
	$: if (!showCollarTextarea) {
		$form.collar = null;
	}
	$: if ($form.chipped === false) {
		$form.chipNumber = null;
	}
</script>

<div class="flex justify-between h-auto">
	<div class="w-full max-w-md items-center justify-center">
		<div class="tabs tabs-boxed bg-gray-100 justify-evenly">
			<button
				class="tab tab-bordered bg-primary text-neutral btn-primary"
				class:selected={activeTab === 'lost'}
				on:click={() => (activeTab = 'lost')}
			>
				Lost Cats
			</button>
			<button
				class="tab tab-bordered bg-primary text-neutral btn-primary"
				class:selected={activeTab === 'found'}
				on:click={() => (activeTab = 'found')}
			>
				Found Cats
			</button>
		</div>
		{#if activeTab === 'lost'}
			<form method="POST" use:enhance class="space-y-5">
				<h1 class="w-full py-2 text-secondary text-3xl">Verloren Kat Toevoegen</h1>
				<p class="text-2xl py-2 justify-center text-secondary w-full">Gegevens kat:</p>
				<div class="form-control">
					<label class="label" for="name">
						<span class="label-text text-secondary">Naam verloren kat</span>
					</label>
					<input
						type="text"
						name="name"
						placeholder="Vb. Felix"
						class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
						bind:value={$form.name}
					/>
					<label class="label" for="raceId">
						<span class="label-text text-secondary">Ras</span>
					</label>
					<select
						class="select select-bordered border border-gray-300 bg-gray-100 max-w-md text-secondary"
						placeholder="Maak een keuze"
						bind:value={$form.raceId}
						name="raceId"
					>
						<option disabled selected>Maak een keuze</option>
						{#each data.races.sort((a, b) => a.name.localeCompare(b.name)) as race}
							<option value={race.id} class="text-secondary">{race.name}</option>
						{/each}
						<!-- TODO Keuze open houden op einde: wanneer geklikt -> nieuw ras toevoegen -->
					</select>
					<label class="label" for="sex">
						<span class="label-text text-secondary">Geslacht</span>
					</label>
					<div class="join justify-center align-middle">
						<input
							class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
							type="radio"
							name="sexId"
							value={13}
							aria-label="Mannetje"
							bind:group={$form.sexId}
						/>
						<input
							class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
							type="radio"
							name="sexId"
							value={14}
							aria-label="Vrouwtje"
							bind:group={$form.sexId}
						/>
					</div>
					<div class="flex flex-col justify-evenly">
						<label class="label cursor-pointer" for="showCastratedCheckbox">
							<span class="label-text mr-2 text-secondary"
								>{$form.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'} gekend?</span
							>
						</label>
						<div class="join justify-center align-middle">
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showCastratedCheckbox"
								value={true}
								aria-label="Ja"
								bind:group={showCastratedCheckbox}
							/>
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showCastratedCheckbox"
								value={false}
								aria-label="Nee"
								bind:group={showCastratedCheckbox}
							/>
						</div>
						{#if showCastratedCheckbox}
							<label class="label cursor-pointer" for="castratedCheckbox">
								<span class="label-text mr-2 text-secondary"
									>{$form.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'}?</span
								>
							</label>
							<div class="join justify-center align-middle">
								<input
									class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
									type="radio"
									name="castratedCheckbox"
									value={true}
									aria-label="Ja"
									bind:group={$form.castrated}
								/>
								<input
									class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
									type="radio"
									name="castratedCheckbox"
									value={false}
									aria-label="Nee"
									bind:group={$form.castrated}
								/>
							</div>
						{/if}
					</div>
					<label class="label" for="colorId">
						<span class="label-text text-secondary">Kleur</span>
					</label>
					<select
						class="select select-bordered border border-gray-300 bg-gray-100 max-w-md text-secondary"
						placeholder="Maak een keuze"
						bind:value={$form.colorId}
						name="colorId"
					>
						<option disabled selected>Maak een keuze</option>
						{#each data.colors.sort((a, b) => a.name.localeCompare(b.name)) as color}
							<option value={color.id} class="text-secondary">{color.name}</option>
						{/each}
						<!-- TODO Keuze open houden op einde: wanneer geklikt -> nieuwe kleur toevoegen -->
					</select>
					<label class="label" for="age">
						<span class="label-text text-secondary">Leeftijd</span>
					</label>
					<input
						type="number"
						name="age"
						placeholder="Vb. 6"
						class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
						min="0"
						bind:value={$form.age}
					/>
					<label class="label" for="dateLost">
						<span class="label-text text-secondary">Datum waarop kat verloren is geraakt</span>
					</label>
					<input
						type="date"
						name="dateLost"
						bind:value={$form.dateLost}
						class="p-2 block w-full rounded-md border border-gray-300 bg-gray-100 text-secondary"
					/>
					<label class="label" for="dateReported">
						<span class="label-text text-secondary">Datum waarop gemeld</span>
					</label>
					<input
						type="date"
						name="dateReported"
						bind:value={$form.dateReported}
						class="p-2 block w-full rounded-md border border-gray-300 bg-gray-100 text-secondary"
					/>
					<label class="label" for="cityLost">
						<span class="label-text text-secondary">Stad verloren</span>
					</label>
					<input
						type="text"
						name="cityLost"
						placeholder="Vb. Deurne"
						class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
						bind:value={$form.cityLost}
					/>
					<label class="label" for="description">
						<span class="label-text text-secondary">Omschrijving</span>
					</label>
					<textarea
						name="description"
						class="textarea textarea-bordered bg-gray-100 text-secondary"
						placeholder="Vb. Witte kat met zwarte vlekken op de rug en een zwarte staart."
						bind:value={$form.description}
					/>
					<!-- TODO Image upload toevoegen -->
					<div class="flex flex-col justify-evenly">
						<label class="label cursor-pointer" for="showChippedCheckbox">
							<span class="label-text mr-2 text-secondary">Gechipped gekend?</span>
						</label>
						<div class="join justify-center align-middle">
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showChippedCheckbox"
								value={true}
								aria-label="Ja"
								bind:group={showChippedCheckbox}
							/>
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showChippedCheckbox"
								value={false}
								aria-label="Nee"
								bind:group={showChippedCheckbox}
							/>
						</div>
						{#if showChippedCheckbox}
							<label class="label cursor-pointer" for="chippedCheckbox">
								<span class="label-text mr-2 text-secondary">Gechipped?</span>
							</label>
							<div class="join justify-center align-middle">
								<input
									class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
									type="radio"
									name="chippedCheckbox"
									value={true}
									aria-label="Ja"
									bind:group={$form.chipped}
								/>
								<input
									class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
									type="radio"
									name="chippedCheckbox"
									value={false}
									aria-label="Nee"
									bind:group={$form.chipped}
								/>
							</div>
						{/if}
						{#if $form.chipped}
							<label class="label" for="chipNumber">
								<span class="label-text text-secondary">Chipnummer</span>
							</label>
							<input
								type="text"
								name="chipNumber"
								minlength="15"
								placeholder="Vb. 111222333444555"
								class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
								bind:value={$form.chipNumber}
							/>
						{/if}
						<label class="label cursor-pointer" for="showCollarTextarea">
							<span class="label-text mr-2 text-secondary">Halsband aanwezig?</span>
						</label>
						<div class="join justify-center align-middle">
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showCollarTextarea"
								value={true}
								aria-label="Ja"
								bind:group={showCollarTextarea}
							/>
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="showCollarTextarea"
								value={false}
								aria-label="Nee"
								bind:group={showCollarTextarea}
							/>
						</div>
						{#if showCollarTextarea}
							<label class="label" for="collar">
								<span class="label-text text-secondary">Halsband</span>
							</label>
							<textarea
								name="collar"
								class="textarea textarea-bordered bg-gray-100 text-secondary"
								placeholder="Vb. Rood met witte stippen, met een belletje aan."
								bind:value={$form.collar}
							/>
						{/if}
						<p class="text-2xl py-2 justify-center text-secondary w-full underline">
							Gegevens eigenaar:
						</p>
						<label class="label" for="ownerName">
							<span class="label-text text-secondary">Naam</span>
						</label>
						<input
							type="text"
							name="ownerName"
							placeholder="Vb. Jan Janssens"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerName}
						/>
						<label class="label" for="ownerEmail">
							<span class="label-text text-secondary">Email</span>
						</label>
						<input
							type="email"
							name="ownerEmail"
							placeholder="Vb. jan.janssens@gmail.com"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerEmail}
						/>
						<label class="label" for="ownerStreet">
							<span class="label-text text-secondary">Straat</span>
						</label>
						<input
							type="text"
							name="ownerStreet"
							placeholder="Vb. Beeldekensstraat 9"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerStreet}
						/>
						<label class="label" for="ownerCity">
							<span class="label-text text-secondary">Stad</span>
						</label>
						<input
							type="text"
							name="ownerCity"
							placeholder="Vb. Deurne"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerCity}
						/>
						<label class="label" for="ownerPhone">
							<span class="label-text text-secondary">Telefoonnummer</span>
						</label>
						<input
							type="tel"
							name="ownerPhone"
							placeholder="Vb. 04 123 45 67 89"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerPhone}
						/>
						<label class="label" for="ownerCellphone">
							<span class="label-text text-secondary">GSM-nummer</span>
						</label>
						<input
							type="tel"
							name="ownerCellphone"
							placeholder="Vb. 04 123 45 67 89"
							class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
							bind:value={$form.ownerCellphone}
						/>
						<label class="label" for="comments">
							<span class="label-text text-secondary">Opmerkingen</span>
						</label>
						<textarea
							name="comments"
							class="textarea textarea-bordered textarea-sm bg-gray-100 text-secondary"
							placeholder="Vb. De kat is heel lief en aanhankelijk, maar kan niet goed overweg met andere katten."
							bind:value={$form.comments}
						/>
						<p class="text-2xl py-2 justify-center text-secondary w-full underline">Extra:</p>
						<label class="label cursor-pointer" for="ripCheckbox">
							<span class="label-text mr-2 text-secondary">RIP?</span>
						</label>
						<div class="join justify-center align-middle">
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="ripCheckbox"
								value={true}
								aria-label="Ja"
								bind:group={$form.rip}
							/>
							<input
								class="join-item btn max-w-md bg-gray-100 text-primary border-gray-300"
								type="radio"
								name="ripCheckbox"
								value={false}
								aria-label="Nee"
								bind:group={$form.rip}
							/>
						</div>
						<label class="label" for="locationId">
							<span class="label-text text-secondary">Locatie</span>
						</label>
						<select
							class="select select-bordered border border-gray-300 bg-gray-100 max-w-md text-secondary"
							placeholder="Maak een keuze"
							bind:value={$form.locationId}
							name="locationId"
						>
							<option disabled selected>Maak een keuze</option>
							{#each data.locations.sort((a, b) => a.name.localeCompare(b.name)) as location}
								<option value={location.id} class="text-secondary">{location.name}</option>
							{/each}
						</select>
					</div>
				</div>
				<button class="btn btn-primary text-neutral justify-center w-full" type="submit"
					>Kat Toevoegen</button
				>
			</form>
		{:else}
			<p class="text-3xl py-2 justify-center text-secondary w-full">Work in progress!</p>
			<!-- <form method="POST" use:enhance class="space-y-5">
				<h1 class="w-full text-secondary text-3xl">Gevonden Kat Toevoegen</h1>
				<div class="form-control">
					<label class="label" for="naam">
						<span class="label-text">Naam Gevonden Kat</span>
					</label>
					<input
						type="text"
						name="naam"
						placeholder="Naam"
						class="input input-bordered border-gray-300 w-full text-secondary bg-gray-100 max-w-md"
						bind:value={initialValues.name}
					/>
				</div>
				<button class="btn btn-primary text-neutral justify-center w-full" type="submit"
					>Kat Toevoegen</button
				>
			</form> -->
		{/if}
	</div>
	<SuperDebug data={form} />
</div>
