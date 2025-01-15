<script lang="ts" module>
	export interface CardProps {
		children?: Snippet;
		header?: Snippet;
		is_ediable?: boolean;
	}
</script>

<script lang="ts">
	import { css } from 'styled-system/css';

	import type { Snippet } from 'svelte';

	const { children, header, is_ediable = true } = $props();
</script>

<section
	class={css({
		background: '#D9D9D968',
		borderRadius: '16px',
		minWidth: '350px',
		display: 'flex',
		flexDirection: 'column',
		padding: '8px',
		flex: '1',
		gap: '8px'
	})}
>
	<header
		class={css({
			background: '#D9D9D980',
			borderRadius: '8px',
			height: '64px',
			color: 'gray',
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: 'semibold',
			flexShrink: '0'
		})}
	>
		{@render header()}
	</header>
	<main
		class={css({
			background: is_ediable ? '#D9D9D980' : 'transparent',
			borderRadius: '8px',
			paddingY: '12px',
			paddingX: '8px',
			color: 'gray',
			flex: '1',
			display: 'flex',
			flexDirection: 'column',
			transition: 'all 300ms',
			overflowY: 'auto',
			overflowX: 'hidden',
			_focusWithin: {
				background: '#B9B9B970'
			}
		})}
	>
		{@render children()}
	</main>
</section>
