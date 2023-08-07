

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/rip/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/15.62b9c0a5.js","_app/immutable/chunks/scheduler.ca89b992.js","_app/immutable/chunks/index.cbda178f.js"];
export const stylesheets = [];
export const fonts = [];
