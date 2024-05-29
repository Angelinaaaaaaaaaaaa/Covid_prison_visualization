

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.5a704e41.js","_app/immutable/chunks/index.9727644f.js","_app/immutable/chunks/singletons.b577c529.js"];
export const stylesheets = [];
export const fonts = [];
