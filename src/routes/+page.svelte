<script lang="ts">
	import Highlighter from '$lib/components/highlighter/highlighter.svelte';
	import { css } from 'styled-system/css';
	import { untrack } from 'svelte';
	import Card from './card.svelte';

	const start_symbol = '$S';

	type Grammar = Record<string, Array<string[]> | undefined>;

	let input_grammar = $state('');
	let converted_grammar: Grammar = $state({});
	function push_rule(rules: string[][], new_rule: string[]) {
		if (!rules.find((rule) => JSON.stringify(rule) == JSON.stringify(new_rule))) {
			rules.push(new_rule);
		}
	}
	function parse_grammar(input: string): Grammar {
		const grammar: Grammar = {};
		input.split(';').forEach((item) => {
			const [raw_key, raw_value] = item.split('->');
			const key = raw_key.trim();
			if (!key) {
				return;
			}

			const rules = grammar[key] ?? [];
			raw_value.split('|').forEach((item) => {
				const new_rule = item
					.split(' ')
					.map((item) => item.trim())
					.filter(Boolean)
					.filter((item) => item !== '$');
				push_rule(rules, new_rule);
			});
			grammar[key] = rules;
		});
		return grammar;
	}
	function apply_lambda(rules: string[][], variable: string) {
		for (let rule_index = 0; rule_index < rules.length; rule_index += 1) {
			const rule = rules[rule_index];

			rule.forEach((item, index) => {
				if (item === variable) {
					push_rule(
						rules,
						rule.filter((_, target_index) => target_index != index)
					);
				}
			});
		}
	}
	function remove_rule_containing(rules: string[][], variable: string) {
		for (let rule_index = 0; rule_index < rules.length; rule_index += 1) {
			const rule = rules[rule_index];
			if (rule.includes(variable)) {
				rules.splice(rule_index, 1);
				rule_index -= 1;
			}
		}
	}

	function remove_lambda_productions(grammar: Grammar) {
		Object.entries(grammar).forEach(([variable, rules]) => {
			if (rules == null) {
				return;
			}
			const lambda_rule_index = rules?.findIndex((item) => item.length === 0) ?? -1;
			if (lambda_rule_index !== -1) {
				{
					Object.entries(grammar).forEach(([, rules]) => {
						if (rules == null) {
							return;
						}
						apply_lambda(rules, variable);
					});
				}
				rules?.splice(lambda_rule_index, 1);
				if (rules.length == 0) {
					Object.entries(grammar).forEach(([, rules]) => {
						if (rules == null) {
							return;
						}
						remove_rule_containing(rules, variable);
					});
					delete grammar[variable];
				}
				remove_lambda_productions(grammar);
			}
		});
	}

	function remove_useless_productions(grammar: Grammar) {
		Object.entries(grammar).forEach(([variable, rules]) => {
			if (rules == null) {
				return;
			}
			if (rules.length == 0) {
				Object.entries(grammar).forEach(([, rules]) => {
					if (rules == null) {
						return;
					}
					remove_rule_containing(rules, variable);
				});
				delete grammar[variable];
			}
		});
	}

	function remove_unit_productions(grammar: Grammar) {
		Object.entries(grammar).forEach(([variable, rules]) => {
			if (rules == null) {
				return;
			}
			let has_found_unit = false;
			for (let rule_index = 0; rule_index < rules.length; rule_index += 1) {
				const rule = rules[rule_index];
				if (rule.length === 1 && rule[0] in grammar) {
					const target_variable = rule[0];
					if (target_variable !== variable) {
						const target_rules = grammar[target_variable];
						target_rules?.forEach((item) => {
							if (item !== rule) {
								push_rule(rules, item);
							}
						});
					}
					rules.splice(rule_index, 1);
					rule_index -= 1;
					has_found_unit = true;
				}
			}
			if (has_found_unit) {
				remove_unit_productions(grammar);
			}
		});
	}

	function split_rules(grammar: Grammar): Grammar {
		let tmp_variable_counter = 0;
		function get_variable_name() {
			tmp_variable_counter += 1;
			return 'Z' + tmp_variable_counter;
		}

		let res: Grammar = {};
		const var_map: Record<string, string | undefined> = {};
		Object.entries(grammar).forEach(([variable, rules]) => {
			if (rules == null) {
				return;
			}

			const res_rules = res[variable] ?? [];

			rules.forEach((rule) => {
				const tmp = [...rule];
				if (tmp.length == 1) {
					res_rules.push(tmp);
				} else {
					tmp.forEach((item, index) => {
						if (!(item in grammar)) {
							if (!var_map[item]) {
								var_map[item] = get_variable_name();
								res[var_map[item]] = [[item]];
							}
							tmp[index] = var_map[item];
						}
					});
					while (tmp.length !== 2) {
						const tmp_variable = get_variable_name();
						res[tmp_variable] = [tmp.splice(0, 2)];
						tmp.unshift(tmp_variable);
					}
					push_rule(res_rules, tmp);
				}
			});
			res[variable] = res_rules;
		});
		return res;
	}

	function grammar_to_string(grammar: Grammar) {
		let res = '';
		Object.entries(grammar)
			.sort((a, b) => a[0].localeCompare(b[0]))
			.forEach(([variable, rules]) => {
				if (rules == null) {
					return;
				}
				const rules_str = rules.map((rule) => rule.join(' ')).join(' | ');
				res += variable + ' -> ' + rules_str + ';\n';
			});
		return res;
	}

	function cyk_parse(input: string[], grammar: Grammar): boolean {
		const n = input.length;
		if (!n) {
			return false;
		}
		const table: Set<string>[][] = Array.from({ length: n }, () =>
			Array.from({ length: n }, () => new Set<string>())
		);

		// Initialize the table with productions for each single terminal
		for (let i = 0; i < n; i++) {
			for (const [nonTerminal, productions] of Object.entries(grammar)) {
				if (productions) {
					for (const production of productions) {
						if (production.length === 1 && production[0] === input[i]) {
							table[i][i].add(nonTerminal);
						}
					}
				}
			}
		}

		// Fill the table for substrings of length > 1
		for (let length = 2; length <= n; length++) {
			for (let start = 0; start <= n - length; start++) {
				const end = start + length - 1;

				for (let split = start; split < end; split++) {
					const leftSet = table[start][split];
					const rightSet = table[split + 1][end];

					for (const [nonTerminal, productions] of Object.entries(grammar)) {
						if (productions) {
							for (const production of productions) {
								if (
									production.length === 2 &&
									leftSet.has(production[0]) &&
									rightSet.has(production[1])
								) {
									table[start][end].add(nonTerminal);
								}
							}
						}
					}
				}
			}
		}

		return table[0][n - 1].has(start_symbol);
	}
	function cfg_to_cnf(grammar: Grammar) {
		grammar[start_symbol] = [['S']];
		remove_useless_productions(grammar);
		remove_lambda_productions(grammar);
		remove_unit_productions(grammar);
		converted_grammar = split_rules(grammar);
	}
	function debounced<T extends (...args: never[]) => unknown>(
		fn: T,
		options?: { delay_ms: number }
	) {
		let timeout: ReturnType<typeof setTimeout>;
		function _debounced_fn(...args: Parameters<T>) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				fn(...args);
			}, options?.delay_ms ?? 250);
		}

		return _debounced_fn;
	}
	const calculate_cnf = debounced((input_grammar: string) =>
		untrack(() => {
			cfg_to_cnf(parse_grammar(input_grammar));
		})
	);
	$effect(() => {
		calculate_cnf(input_grammar);
	});
</script>

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
				bind:value={input_grammar}
			></textarea>
		</Card>
		<Card is_ediable={false}>
			{#snippet header()}
				CNF Form
			{/snippet}
			<div class={css({ whiteSpace: 'pre-wrap' })}>{grammar_to_string(converted_grammar)}</div>
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
							is_highlighted: cyk_parse(item.split('') ?? [], converted_grammar)
						},
						{ value: '\n', is_highlighted: false }
					])}
				initialValue="test is this the real life is this just fantasy"
			/>
		</Card>
	</div>
</div>
