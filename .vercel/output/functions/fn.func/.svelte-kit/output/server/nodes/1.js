

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1d533e81.js","_app/immutable/chunks/scheduler.ca89b992.js","_app/immutable/chunks/index.cbda178f.js","_app/immutable/chunks/stores.599aa6d1.js","_app/immutable/chunks/singletons.01596a0d.js"];
export const stylesheets = [];
export const fonts = [];
