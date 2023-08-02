<script>
	import { fade } from 'svelte/transition';
	export let track;

	let visible = false;

	new IntersectionObserver((entries) => {
		entries[0].intersectionRatio > 0 ? (visible = false) : (visible = true);
	}).observe(track);

	function scrollUp() {
		document.body.scrollIntoView({ behavior: 'smooth' });
	}
</script>

{#if visible}
	<button
		transition:fade
		on:click={scrollUp}
		class="btn bg-orange-700 hover:bg-orange-800 hover:shadow-lg text-white fixed bottom-0 right-0 mb-3 mr-3"
	>
		Back to Top
	</button>
{/if}
