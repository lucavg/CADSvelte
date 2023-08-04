<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let email = '';
	let password = '';
</script>

<div class="flex items-center justify-center h-auto">
	<form action="?/login" method="POST" use:enhance class="space-y-5 {$$props.class}">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="email">
				<span class="label-text text-accent">E-mail</span>
			</label>
			<input
				id="email"
				name="email"
				type="email"
				bind:value={email}
				required
				class="input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="password">
				<span class="label-text text-accent">Password</span>
			</label>
			<input
				id="password"
				name="password"
				type="password"
				bind:value={password}
				required
				class="input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"
			/>
		</div>

		{#if form?.invalid}
			<p class="error">Username and password is required.</p>
		{/if}

		{#if form?.credentials}
			<p class="error">You have entered the wrong credentials.</p>
		{/if}

		<button class="btn btn-primary text-neutral justify-center" type="submit">Log In</button>
	</form>
</div>
