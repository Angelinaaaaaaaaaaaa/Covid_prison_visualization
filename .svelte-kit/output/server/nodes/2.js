

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.c2a31bf0.js","_app/immutable/chunks/index.9727644f.js"];
export const stylesheets = ["_app/immutable/assets/2.9da32cb5.css"];
export const fonts = [];
