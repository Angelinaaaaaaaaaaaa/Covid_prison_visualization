

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.c221f110.js","_app/immutable/chunks/index.9727644f.js"];
export const stylesheets = [];
export const fonts = [];
