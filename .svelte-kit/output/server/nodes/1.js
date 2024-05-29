

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.a47489f4.js","_app/immutable/chunks/index.11e7d0cf.js","_app/immutable/chunks/singletons.c6082505.js"];
export const stylesheets = [];
export const fonts = [];
