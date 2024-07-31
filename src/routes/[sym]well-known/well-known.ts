/*
	So SvelteKit gets really weird when you start a folder with a dot (.). I tried to name the well-known route as .well-known directly, but it caused some weirdness with using supabase from locals and importing environment variables so I had to use pattern matching instead.
*/

export function match(param: string) {
	return param === '.';
}