<script>
	import Footer from '$lib/components/Footer.svelte';
	import ScrollTotop from '$lib/components/ScrollTotop.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import NavbarUpdate from '$lib/components/Navbar.svelte';
</script>

<div class="flex flex-col min-h-screen text-black bg-gray-100 h-4/5">
	<div class="w-full">
		<Navbar />
	</div>

	<main class="w-10/12 md:w-8/12 flex-grow container mx-auto my-5">
		<slot />
	</main>
</div>

<div class="w-full bg-gray-100">
	<Footer />
</div>
