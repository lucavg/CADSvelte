import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.af4fe89f.js","_app/immutable/chunks/scheduler.ca89b992.js","_app/immutable/chunks/index.cbda178f.js","_app/immutable/chunks/stores.599aa6d1.js","_app/immutable/chunks/singletons.01596a0d.js"];
export const stylesheets = ["_app/immutable/assets/0.a33206fe.css"];
export const fonts = [];
