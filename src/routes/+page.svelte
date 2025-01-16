<script lang="ts">
	import Highlighter from '$lib/components/highlighter/highlighter.svelte';
	import { css } from 'styled-system/css';
	import Card from './card.svelte';
	import { GrammarMatcher } from './grammar-matcher.svelte';

	const grammar_matcher = new GrammarMatcher();
</script>

<svelte:head>
	<title>CFG string matcher</title>
</svelte:head>
<div
	class={css({
		height: '100dvh',
		width: '100%',
		padding: '20px'
	})}
>
	<div
		class={css({
			display: 'flex',
			width: '100%',
			height: '100%',
			gap: '12px'
		})}
	>
		<Card>
			{#snippet header()}
				CFG Grammar
			{/snippet}
			<textarea
				class={css({
					width: '100%',
					height: '100%',
					outline: 'none',
					padding: '16px',
					resize: 'none'
				})}
				id="cfg_grammar"
				bind:value={grammar_matcher.input_grammar}
				spellcheck="false"
			></textarea>
		</Card>
		<Card is_ediable={false}>
			{#snippet header()}
				CNF Form
			{/snippet}
			<div class={css({ whiteSpace: 'pre-wrap' })}>{grammar_matcher.grammar_cnf_str}</div>
		</Card>
		<Card>
			{#snippet header()}
				Test string
			{/snippet}
			<Highlighter
				get_highlights={(v) =>
					v.split('\n').flatMap((item) => [
						{
							value: item,
							is_highlighted: grammar_matcher.can_accpet_string(item.split('') ?? [])
						},
						{ value: '\n', is_highlighted: false }
					])}
				initialValue="aaaabbbb"
			/>
		</Card>
	</div>
</div>
