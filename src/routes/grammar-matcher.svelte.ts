import { untrack } from 'svelte';

type Grammar = Record<string, Array<string[]> | undefined>;

export class GrammarMatcher {
	input_grammar: string = $state('');
	start_symbol = '$S';
	grammar_cnf: Grammar = $state({});
	grammar_cnf_str = $derived(this.#grammar_to_string(this.grammar_cnf));

	constructor(input_grammar: string = 'S -> a S b | $;', start_symbol = '$S') {
		this.input_grammar = input_grammar;
		this.start_symbol = start_symbol;
		$effect(() => this.calculate_cnf(this.input_grammar));
	}

	#push_rule(rules: string[][], new_rule: string[]) {
		if (!rules.find((rule) => JSON.stringify(rule) == JSON.stringify(new_rule))) {
			rules.push(new_rule);
		}
	}

	#parse_grammar(input: string): Grammar {
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
				this.#push_rule(rules, new_rule);
			});
			grammar[key] = rules;
		});
		return grammar;
	}
	#apply_lambda(rules: string[][], variable: string) {
		for (let rule_index = 0; rule_index < rules.length; rule_index += 1) {
			const rule = rules[rule_index];

			rule.forEach((item, index) => {
				if (item === variable) {
					this.#push_rule(
						rules,
						rule.filter((_, target_index) => target_index != index)
					);
				}
			});
		}
	}
	#remove_rule_containing(rules: string[][], variable: string) {
		for (let rule_index = 0; rule_index < rules.length; rule_index += 1) {
			const rule = rules[rule_index];
			if (rule.includes(variable)) {
				rules.splice(rule_index, 1);
				rule_index -= 1;
			}
		}
	}

	#remove_lambda_productions(grammar: Grammar) {
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
						this.#apply_lambda(rules, variable);
					});
				}
				rules?.splice(lambda_rule_index, 1);
				if (rules.length == 0) {
					Object.entries(grammar).forEach(([, rules]) => {
						if (rules == null) {
							return;
						}
						this.#remove_rule_containing(rules, variable);
					});
					delete grammar[variable];
				}
				this.#remove_lambda_productions(grammar);
			}
		});
	}

	#remove_useless_productions(grammar: Grammar) {
		Object.entries(grammar).forEach(([variable, rules]) => {
			if (rules == null) {
				return;
			}
			if (rules.length == 0) {
				Object.entries(grammar).forEach(([, rules]) => {
					if (rules == null) {
						return;
					}
					this.#remove_rule_containing(rules, variable);
				});
				delete grammar[variable];
			}
		});
	}

	#remove_unit_productions(grammar: Grammar) {
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
								this.#push_rule(rules, item);
							}
						});
					}
					rules.splice(rule_index, 1);
					rule_index -= 1;
					has_found_unit = true;
				}
			}
			if (has_found_unit) {
				this.#remove_unit_productions(grammar);
			}
		});
	}

	#split_rules(grammar: Grammar): Grammar {
		let tmp_variable_counter = 0;
		function get_variable_name() {
			tmp_variable_counter += 1;
			return 'Z' + tmp_variable_counter;
		}

		const res: Grammar = {};
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
					this.#push_rule(res_rules, tmp);
				}
			});
			res[variable] = res_rules;
		});
		return res;
	}

	#grammar_to_string(grammar: Grammar) {
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

	can_accpet_string(input: string[]): boolean {
		const n = input.length;
		if (!n) {
			return false;
		}
		const table: Set<string>[][] = Array.from({ length: n }, () =>
			Array.from({ length: n }, () => new Set<string>())
		);

		// Initialize the table with productions for each single terminal
		for (let i = 0; i < n; i++) {
			for (const [nonTerminal, productions] of Object.entries(this.grammar_cnf)) {
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

					for (const [nonTerminal, productions] of Object.entries(this.grammar_cnf)) {
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

		return table[0][n - 1].has(this.start_symbol);
	}
	cfg_to_cnf(grammar: Grammar) {
		grammar[this.start_symbol] = [['S']];
		this.#remove_useless_productions(grammar);
		this.#remove_lambda_productions(grammar);
		this.#remove_unit_productions(grammar);
		this.grammar_cnf = this.#split_rules(grammar);
	}
	debounced<T extends (...args: never[]) => unknown>(fn: T, options?: { delay_ms: number }) {
		let timeout: ReturnType<typeof setTimeout>;
		function _debounced_fn(...args: Parameters<T>) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				fn(...args);
			}, options?.delay_ms ?? 250);
		}

		return _debounced_fn;
	}
	calculate_cnf = this.debounced((input_grammar: string) =>
		untrack(() => {
			this.cfg_to_cnf(this.#parse_grammar(input_grammar));
		})
	);
}
