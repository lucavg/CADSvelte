<script lang="ts">
	import AnimalDataPreview from './../../../lib/components/AnimalDataPreview.svelte';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import Select from 'svelte-select';
	import { enhance } from '$app/forms';
	import Avatar from '$lib/components/Avatar.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';

	let currentPage: number = 1;
	let steps: number[] = [1, 2, 3];
	let showCastratedCheckbox = false;
	let showChippedCheckbox = false;
	let showCollarTextarea = false;
	let showCityLostInput = false;
	let showOwnerCityLostInput = false;
	let minDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2);
	let maxDate = new Date(Date.now());
	let photoUrl: string | null = null;
	let cityLostChosen: any;
	let cityLostInput: string;
	let ownerCityLostChosen: any;
	let ownerCityLostInput: string;
	let existingOwner: any;
	let selectedExistingOwner: any;

	export let data: PageData;
	const { form, errors, message } = superForm(data.form);

	$: if (cityLostChosen?.label === 'Nieuwe stad toevoegen') {
		showCityLostInput = true;
		$form.catCityName = cityLostInput;
	} else {
		showCityLostInput = false;
		$form.catCityId = cityLostChosen?.value;
	}

	$: if (ownerCityLostChosen?.label === 'Nieuwe stad toevoegen') {
		showOwnerCityLostInput = true;
		$form.ownerCityName = ownerCityLostInput;
	} else {
		showOwnerCityLostInput = false;
		$form.ownerCityId = ownerCityLostChosen?.value;
	}

	$: if (message != null) {
		currentPage = 1;
	}

	$: if (message == null && message != null) {
		currentPage = 2;
	}

	$: if (photoUrl != null) {
		$form.photoUrl = photoUrl;
	}

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

	$: if (existingOwner) {
		selectedExistingOwner = data.ownersNotMapped.find((owner) => owner.id === existingOwner);
		if (selectedExistingOwner) {
			$form.ownerId = selectedExistingOwner.id;
			$form.ownerName = selectedExistingOwner.name;
			$form.ownerEmail = selectedExistingOwner.email;
			$form.ownerStreet = selectedExistingOwner.street;
			$form.ownerCityId = selectedExistingOwner.ownerCityId;
			$form.ownerPhone = selectedExistingOwner.phone;
			$form.ownerCellphone = selectedExistingOwner.cellphone;
			$form.ownerComments = selectedExistingOwner.comments;
		}
	}

	function previousStep(): any {
		currentPage--;
	}

	function nextStep(): any {
		currentPage++;
	}
</script>

<h1 class="w-full text-secondary text-3xl">Verloren Kat Toevoegen</h1>
<form method="POST" use:enhance class="flex flex-col items-center w-full">
	<div class="w-full max-w-3xl">
		<div
			class="form-control w-full grid grid-cols-1 md:grid-cols-2 gap-5"
			class:hide={currentPage != 1}
		>
			<div class="w-full max-w-sm col-span-2">
				<p class="text-2xl py-2 justify-center text-secondary w-full underline">Gegevens kat:</p>
			</div>
			<div class="w-full max-w-sm">
				<label class="label underline" for="name">
					<span class="label-text text-secondary">Naam verloren kat*</span>
				</label>
				<input
					type="text"
					name="name"
					placeholder="Vb. Felix"
					class="input {$errors.name
						? 'input-error'
						: 'input-bordered border-gray-300'} bg-white w-full text-secondary max-w-md"
					bind:value={$form.name}
				/>
				{#if $errors.name}
					<p class="text-red-500">{$errors.name}</p>
				{/if}
				<label class="label underline" for="raceId">
					<span class="label-text text-secondary">Ras*</span>
				</label>
				<input type="hidden" name="raceId" bind:value={$form.raceId} />
				<Select
					items={data.races}
					class="select border bg-white w-full text-secondary {$errors.raceId
						? 'border-red-500'
						: 'select-bordered border-gray-300'}"
					placeholder="Maak een keuze"
					bind:justValue={$form.raceId}
					showChevron
				/>
				{#if $errors.raceId}
					<p class="text-red-500">Selecteer een ras.</p>
				{/if}
				<label class="label underline" for="sex">
					<span class="label-text text-secondary">Geslacht*</span>
				</label>
				<div class="join justify-center align-middle w-full">
					<input
						class="join-item btn max-w-md bg-white text-primary flex-grow {$errors.sexId
							? 'border-red-500'
							: 'border-gray-300'}"
						type="radio"
						name="sexId"
						value={1}
						aria-label="Mannetje"
						bind:group={$form.sexId}
					/>
					<input
						class="join-item btn max-w-md bg-white text-primary flex-grow {$errors.sexId
							? 'border-red-500'
							: 'border-gray-300'}"
						type="radio"
						name="sexId"
						value={2}
						aria-label="Vrouwtje"
						bind:group={$form.sexId}
					/>
				</div>
				{#if $errors.sexId}
					<p class="text-red-500">Gelieve een geslacht te kiezen</p>
				{/if}
				<div class="flex flex-col justify-evenly">
					<label class="label cursor-pointer underline" for="showCastratedCheckbox">
						<span class="label-text mr-2 text-secondary"
							>{$form.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'} gekend?</span
						>
					</label>
					<div class="join justify-center align-middle">
						<input
							class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
							type="radio"
							name="showCastratedCheckbox"
							value={true}
							aria-label="Ja"
							bind:group={showCastratedCheckbox}
						/>
						<input
							class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
							type="radio"
							name="showCastratedCheckbox"
							value={false}
							aria-label="Nee"
							bind:group={showCastratedCheckbox}
						/>
					</div>
					{#if showCastratedCheckbox}
						<label class="label cursor-pointer underline" for="castratedCheckbox">
							<span class="label-text mr-2 text-secondary"
								>{$form.sexId == 13 ? 'Gecastreerd' : 'Gesteriliseerd'}?</span
							>
						</label>
						<div class="join justify-center align-middle">
							<input
								class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
								type="radio"
								name="castratedCheckbox"
								value={true}
								aria-label="Ja"
								bind:group={$form.castrated}
							/>
							<input
								class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
								type="radio"
								name="castratedCheckbox"
								value={false}
								aria-label="Nee"
								bind:group={$form.castrated}
							/>
						</div>
					{/if}
					{#if $errors.castrated}
						<p class="text-red-500">{$errors.castrated}</p>
					{/if}
				</div>
				<label class="label underline" for="colorId">
					<span class="label-text text-secondary">Kleur*</span>
				</label>
				<input type="hidden" name="colorId" bind:value={$form.colorId} />
				<Select
					items={data.colors}
					class="select border bg-white w-full text-secondary {$errors.colorId
						? 'select-error'
						: 'select-bordered border-gray-300'}"
					placeholder="Maak een keuze"
					bind:justValue={$form.colorId}
					showChevron
				/>
				{#if $errors.colorId}
					<p class="text-red-500">Selecteer een kleur</p>
				{/if}
				<label class="label underline" for="age">
					<span class="label-text text-secondary">Leeftijd</span>
				</label>
				<input
					type="number"
					name="age"
					placeholder="Vb. 6"
					class="input w-full text-secondary bg-white max-w-md {$errors.age
						? 'input-error'
						: 'input-bordered border-gray-300'}"
					min="0"
					bind:value={$form.age}
				/>
				{#if $errors.age}
					<p class="text-red-500">Gelieve een correcte leeftijd in te geven</p>
				{/if}
				<label class="label cursor-pointer underline" for="showChippedCheckbox">
					<span class="label-text mr-2 text-secondary">Gechipped gekend?</span>
				</label>
				<div class="join justify-center align-middle w-full">
					<input
						class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
						type="radio"
						name="showChippedCheckbox"
						value={true}
						aria-label="Ja"
						bind:group={showChippedCheckbox}
					/>
					<input
						class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
						type="radio"
						name="showChippedCheckbox"
						value={false}
						aria-label="Nee"
						bind:group={showChippedCheckbox}
					/>
				</div>
				{#if showChippedCheckbox}
					<label class="label cursor-pointer underline" for="chippedCheckbox">
						<span class="label-text mr-2 text-secondary">Gechipped?</span>
					</label>
					<div class="join justify-center align-middle w-full">
						<input
							class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
							type="radio"
							name="chippedCheckbox"
							value={true}
							aria-label="Ja"
							bind:group={$form.chipped}
						/>
						<input
							class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
							type="radio"
							name="chippedCheckbox"
							value={false}
							aria-label="Nee"
							bind:group={$form.chipped}
						/>
					</div>
				{/if}
				{#if $form.chipped}
					<label class="label underline" for="chipNumber">
						<span class="label-text text-secondary">Chipnummer</span>
					</label>
					<input
						type="text"
						name="chipNumber"
						minlength="15"
						placeholder="Vb. 111222333444555"
						class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
						bind:value={$form.chipNumber}
					/>
					{#if $errors.chipped}
						<p class="text-red-500">{$errors.chipped}</p>
					{/if}
				{/if}
			</div>
			<div class="w-full max-w-sm">
				<label class="label underline" for="dateLost">
					<span class="label-text text-secondary">Datum waarop kat verloren is geraakt*</span>
				</label>
				<input
					type="date"
					name="dateLost"
					min={minDate.toISOString().split('T')[0]}
					max={maxDate.toISOString().split('T')[0]}
					placeholder="dd/mm/yyyy"
					bind:value={$form.dateLost}
					class="p-2 block w-full rounded-md border bg-white text-secondary {$errors.dateLost
						? 'border-red-500'
						: 'border-gray-300'}"
				/>
				{#if $errors.dateLost}
					<p class="text-red-500">Gelieve een correcte datum in te geven</p>
				{/if}
				<label class="label underline" for="dateReported">
					<span class="label-text text-secondary">Datum waarop gemeld*</span>
				</label>
				<input
					type="date"
					name="dateReported"
					min={minDate.toISOString().split('T')[0]}
					max={maxDate.toISOString().split('T')[0]}
					placeholder="dd/mm/yyyy"
					bind:value={$form.dateReported}
					class="p-2 block w-full rounded-md border bg-white text-secondary {$errors.dateReported
						? 'border-red-500'
						: 'border-gray-300'}"
				/>
				{#if $errors.dateReported}
					<p class="text-red-500">Gelieve een correcte datum in te geven</p>
				{/if}
				<label class="label underline" for="catCityId">
					<span class="label-text text-secondary">Stad verloren*</span>
				</label>
				<input type="hidden" name="catCityId" bind:value={$form.catCityId} />
				<Select
					items={data.cities}
					placeholder="Maak een keuze"
					bind:value={cityLostChosen}
					showChevron
				/>
				{#if $errors.catCityId}
					<p class="text-red-500">{$errors.catCityId}</p>
				{/if}
				{#if showCityLostInput}
					<label class="label underline" for="catCityName">
						<span class="label-text text-secondary">Voeg nieuwe stad toe</span>
					</label>
					<input
						type="text"
						name="catCityName"
						placeholder="Vb. Wilrijk"
						class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
						bind:value={$form.catCityName}
					/>
					{#if $errors.catCityName}
						<p class="text-red-500">{$errors.catCityName}</p>
					{/if}
				{/if}
				<label class="label underline" for="description">
					<span class="label-text text-secondary">Omschrijving*</span>
				</label>
				<textarea
					name="description"
					class="textarea textarea-bordered w-full bg-white text-secondary {$errors.description
						? 'border-red-500'
						: 'border-gray-300'}"
					placeholder="Vb. Witte kat met zwarte vlekken op de rug en een zwarte staart."
					bind:value={$form.description}
				/>
				{#if $errors.description}
					<p class="text-red-500">{$errors.description}</p>
				{/if}
				<label class="label underline" for="single">
					<span class="label-text text-secondary">Kies een foto</span>
				</label>
				<Avatar bind:url={$form.photoUrl} />
				<input
					type="text"
					name="photoUrl"
					placeholder="Vb. Deurne"
					class="input input-bordered w-full text-secondary bg-white max-w-md hide {$errors.photoUrl
						? 'border-red-500'
						: 'border-gray-300'}"
					bind:value={$form.photoUrl}
				/>
				{#if $errors.photoUrl}
					<p class="text-red-500">{$errors.colorId}</p>
				{/if}
				<label class="label cursor-pointer underline" for="showCollarTextarea">
					<span class="label-text mr-2 text-secondary">Halsband aanwezig?</span>
				</label>
				<div class="join justify-center align-middle w-full">
					<input
						class="join-item btn max-w-md border-gray-300 bg-white text-primary flex-grow"
						type="radio"
						name="showCollarTextarea"
						value={true}
						aria-label="Ja"
						bind:group={showCollarTextarea}
					/>
					<input
						class="join-item btn max-w-md bg-white text-primary border-gray-300 flex-grow"
						type="radio"
						name="showCollarTextarea"
						value={false}
						aria-label="Nee"
						bind:group={showCollarTextarea}
					/>
				</div>
				{#if showCollarTextarea}
					<label class="label underline" for="collar">
						<span class="label-text text-secondary">Halsband</span>
					</label>
					<textarea
						name="collar"
						class="textarea textarea-bordered w-full border-gray-300 bg-white text-secondary"
						placeholder="Vb. Rood met witte stippen, met een belletje aan."
						bind:value={$form.collar}
					/>
					{#if $errors.collar}
						<p class="text-red-500">{$errors.collar}</p>
					{/if}
				{/if}
				<label class="label cursor-pointer underline" for="ripCheckbox">
					<span class="label-text mr-2 text-secondary">RIP?</span>
				</label>
				<div class="join justify-center align-middle w-full">
					<input
						class="join-item btn max-w-md bg-white text-primary border-gray-300"
						type="radio"
						name="ripCheckbox"
						value={true}
						aria-label="Ja"
						bind:group={$form.rip}
					/>
					<input
						class="join-item btn max-w-md bg-white text-primary border-gray-300"
						type="radio"
						name="ripCheckbox"
						value={false}
						aria-label="Nee"
						bind:group={$form.rip}
					/>
				</div>
				{#if $errors.rip}
					<p class="text-red-500">Duid aan of de kat overleden is</p>
				{/if}
				<label class="label underline" for="comments">
					<span class="label-text text-secondary">Opmerkingen kat</span>
				</label>
				<textarea
					name="comments"
					class="textarea textarea-bordered w-full border-gray-300 bg-white text-secondary"
					placeholder="Vb. Kat is nogal slecht te been, kan goed overweg met andere katten."
					bind:value={$form.comments}
				/>
				{#if $errors.comments}
					<p class="text-red-500">{$errors.comments}</p>
				{/if}
			</div>
		</div>
		<div
			class="form-control w-full grid grid-cols-1 md:grid-cols-2 gap-5"
			class:hide={currentPage != 2}
		>
			<div class="w-full max-w-sm col-span-1">
				<p class="text-2xl py-2 justify-center text-secondary w-full underline">
					Gegevens eigenaar:
				</p>
			</div>
			<!-- TODO: ownerCityId Select updaten bij het kiezen van bestaande eigenaar -->
			<div class="w-full max-w-sm col-span-1">
				<div class="form-control w-full max-w-md md:mx-1">
					<label class="label underline" for="raceId">
						<span class="label-text text-secondary">Selecteer een bestaande eigenaar</span>
					</label>
					<input type="hidden" name="raceId" bind:value={existingOwner} />
					<Select
						items={data.owners}
						class="select border bg-white w-full text-secondary select-bordered border-gray-300"
						placeholder="Maak een keuze"
						bind:justValue={existingOwner}
						showChevron
					/>
				</div>
			</div>

			<div class="w-full max-w-sm">
				<label class="label underline" for="ownerName">
					<span class="label-text text-secondary">Naam</span>
				</label>
				<input
					type="text"
					name="ownerName"
					placeholder="Vb. Jan Janssens"
					class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
					bind:value={$form.ownerName}
				/>
				{#if $errors.ownerName}
					<p class="text-red-500">{$errors.ownerName}</p>
				{/if}
				<label class="label underline" for="ownerEmail">
					<span class="label-text text-secondary">Email</span>
				</label>
				<input
					type="email"
					name="ownerEmail"
					placeholder="Vb. jan.janssens@gmail.com"
					class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
					bind:value={$form.ownerEmail}
				/>
				{#if $errors.ownerEmail}
					<p class="text-red-500">{$errors.ownerEmail}</p>
				{/if}
				<label class="label underline" for="ownerStreet">
					<span class="label-text text-secondary">Straat</span>
				</label>
				<input
					type="text"
					name="ownerStreet"
					placeholder="Vb. Beeldekensstraat 9"
					class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
					bind:value={$form.ownerStreet}
				/>
				{#if $errors.ownerStreet}
					<p class="text-red-500">{$errors.ownerStreet}</p>
				{/if}
				<label class="label underline" for="ownerCityId">
					<span class="label-text text-secondary">Stad</span>
				</label>
				<input type="hidden" name="ownerCityId" bind:value={$form.ownerCityId} />
				<Select
					items={data.cities}
					placeholder="Maak een keuze"
					bind:value={ownerCityLostChosen}
					showChevron
				/>
				{#if showOwnerCityLostInput}
					<label class="label underline" for="ownerCityName">
						<span class="label-text text-secondary">Voeg nieuwe stad toe</span>
					</label>
					<input
						type="text"
						name="ownerCityName"
						placeholder="Vb. Wilrijk"
						class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
						bind:value={$form.ownerCityName}
					/>
				{/if}
				{#if $errors.ownerCityName}
					<p class="text-red-500">{$errors.ownerCityName}</p>
				{/if}
			</div>
			<div class="w-full max-w-sm">
				<label class="label underline" for="ownerPhone">
					<span class="label-text text-secondary">Telefoonnummer</span>
				</label>
				<input
					type="tel"
					name="ownerPhone"
					placeholder="Vb. 04 123 45 67 89"
					class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
					bind:value={$form.ownerPhone}
				/>
				{#if $errors.ownerPhone}
					<p class="text-red-500">{$errors.ownerPhone}</p>
				{/if}
				<label class="label underline" for="ownerCellphone">
					<span class="label-text text-secondary">GSM-nummer</span>
				</label>
				<input
					type="tel"
					name="ownerCellphone"
					placeholder="Vb. 04 123 45 67 89"
					class="input input-bordered border-gray-300 w-full text-secondary bg-white max-w-md"
					bind:value={$form.ownerCellphone}
				/>
				{#if $errors.ownerCellphone}
					<p class="text-red-500">{$errors.ownerCellphone}</p>
				{/if}
				<label class="label underline" for="ownerComments">
					<span class="label-text text-secondary">Opmerkingen Eigenaar</span>
				</label>
				<textarea
					name="ownerComments"
					class="textarea textarea-bordered w-full border-gray-300 bg-white text-secondary"
					placeholder="Vb. Eigenaar gedroeg zich niet aangenaam."
					bind:value={$form.ownerComments}
				/>
				{#if $errors.ownerComments}
					<p class="text-red-500">{$errors.ownerComments}</p>
				{/if}
				<label class="label underline" for="locationId">
					<span class="label-text text-secondary">Locatie</span>
				</label>
				<input type="hidden" name="locationId" bind:value={$form.locationId} />
				<Select
					items={data.locations}
					class="select border bg-white w-full text-secondary {$errors.locationId
						? 'select-error'
						: 'select-bordered border-gray-300'}"
					placeholder="Maak een keuze"
					bind:justValue={$form.locationId}
					showChevron
				/>
			</div>
		</div>
		<div class="form-control w-full justify-center mx-auto flex-grow" class:hide={currentPage != 3}>
			<AnimalDataPreview
				animalFormData={$form}
				races={data.races}
				colors={data.colors}
				locations={data.locations}
				cities={data.cities}
			/>
		</div>
		<div class="flex justify-center gap-5 my-4">
			<button
				class="btn btn-primary text-neutral"
				on:click={(e) => {
					previousStep();
					e.preventDefault();
				}}
				class:hide={currentPage == 1}
			>
				Terug
			</button>
			<button
				class="btn btn-primary text-neutral"
				on:click={(e) => {
					nextStep();
					e.preventDefault();
				}}
				class:hide={currentPage == steps.length}
			>
				Volgende
			</button>
			<button
				class="btn btn-success text-neutral"
				type="submit"
				class:hide={currentPage != steps.length}>Kat Toevoegen</button
			>
		</div>
	</div>
</form>

<style>
	.hide {
		display: none;
	}
</style>
