<script lang="ts">
	import type { HighlighterProps } from './highlighter.types';

	const { initialValue = '', get_highlights }: HighlighterProps = $props();

	let raw_text = $state(initialValue);

	const highlighted_text = $derived(get_highlights(raw_text));
</script>

<div>
	<div>
		{#each highlighted_text as highlight_chunk}
			{#if highlight_chunk.is_highlighted}
				<mark>
					{highlight_chunk.value}
				</mark>
			{:else}
				{highlight_chunk.value}
			{/if}
		{/each}
	</div>
	<textarea bind:value={raw_text}></textarea>
</div>
