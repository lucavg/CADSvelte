<script>
	import Footer from '$lib/components/Footer.svelte';
	import ScrollTotop from '$lib/components/ScrollTotop.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen text-black bg-gray-100 h-4/5">
	<!-- NAVIGATION -->
	<div class="w-full">
		<Navbar />
	</div>

	<!-- CONTENT -->
	<main class="w-full md:w-8/12 flex-grow container mx-auto my-5">
		<slot />
	</main>

	<!-- FOOTER -->
	<div class="w-full">
		<Footer />
	</div>
	<ScrollTotop />
</div>
