<script>
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import { navigating } from '$app/stores';
</script>

<div class="flex flex-col min-h-screen text-black bg-gray-100 h-4/5">
	<div class="w-full">
		<Navbar />
	</div>

	{#if $navigating}
		<div class="flex items-center justify-center min-h-screen">
			<span class="loading loading-spinner text-primary loading-lg" />
		</div>
	{:else}
		<main class="w-10/12 md:w-8/12 flex-grow container mx-auto my-5">
			<slot />
		</main>
	{/if}
</div>

<div class="w-full bg-gray-100">
	<Footer />
</div>
