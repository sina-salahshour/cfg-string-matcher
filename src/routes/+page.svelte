<script>
	import Highlighter from '$lib/components/highlighter/highlighter.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Highlighter
	get_highlights={(v) =>
		v.split(' ').map((item, index) => ({ value: item + ' ', is_highlighted: index % 2 == 0 }))}
	initialValue="test is this the real life is this just fantasy"
/>
