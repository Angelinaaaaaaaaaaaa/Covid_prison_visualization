

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.b9d59d48.js","_app/immutable/chunks/index.11e7d0cf.js","_app/immutable/chunks/singletons.eb6bc46e.js"];
export const stylesheets = [];
export const fonts = [];
