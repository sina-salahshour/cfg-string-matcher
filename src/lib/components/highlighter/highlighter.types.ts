export interface HighlighterProps {
	initialValue?: string;
	get_highlights(text: string): HighlightedText[];
}

export interface HighlightedText {
	value: string;
	is_highlighted: boolean;
}
