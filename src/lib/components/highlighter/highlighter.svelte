<script lang="ts">
	import { css } from 'styled-system/css';
	import type { HighlighterProps } from './highlighter.types';

	const { initialValue = '', get_highlights }: HighlighterProps = $props();

	let raw_text = $state(initialValue);
	let text_area_height = $state(100);

	const highlighted_text = $derived(get_highlights(raw_text));
	let highlight_container: HTMLDivElement | undefined = $state(undefined);
</script>

<div
	class={css({
		position: 'relative',
		overscrollBehavior: 'none',
		width: 'full',
		height: 'full',
		padding: '12px',
		textAlign: 'left'
	})}
>
	<div
		bind:this={highlight_container}
		class={css({
			position: 'absolute',
			whiteSpace: 'pre-wrap',
			width: 'full',
			color: 'black',
			height: 'calc(var(--height) * 1px)',
			overflow: 'hidden',
			overscrollBehavior: 'none',
			'& mark': {
				color: 'lightgray',
				background: 'green',
				borderRadius: '2px'
			}
		})}
		style:--height={text_area_height}
	>
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
	<textarea
		id="highlighter"
		onscroll={(e) => {
			if (highlight_container) {
				highlight_container.scrollTo({ top: e.currentTarget.scrollTop });
			}
		}}
		bind:clientHeight={text_area_height}
		class={css({
			position: 'relative',
			overscrollBehavior: 'none',
			color: 'transparent',
			caretColor: '#003b6f',
			outline: 'none',
			width: 'full',
			height: 'full',
			resize: 'none'
		})}
		bind:value={raw_text}
		spellcheck="false"
	></textarea>
</div>
