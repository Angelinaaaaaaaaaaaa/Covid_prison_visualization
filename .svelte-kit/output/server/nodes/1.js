

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.f010128d.js","_app/immutable/chunks/vendor.11e7d0cf.js","_app/immutable/chunks/singletons.df6c114d.js"];
export const stylesheets = [];
export const fonts = [];
