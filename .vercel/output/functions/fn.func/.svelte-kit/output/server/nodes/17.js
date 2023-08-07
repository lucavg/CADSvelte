

export const index = 17;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/steunOns/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/17.8307004f.js","_app/immutable/chunks/scheduler.ca89b992.js","_app/immutable/chunks/index.cbda178f.js"];
export const stylesheets = [];
export const fonts = [];
