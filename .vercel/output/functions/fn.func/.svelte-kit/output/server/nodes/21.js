

export const index = 21;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/vragen/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/21.0a4008ab.js","_app/immutable/chunks/scheduler.ca89b992.js","_app/immutable/chunks/index.cbda178f.js"];
export const stylesheets = [];
export const fonts = [];
