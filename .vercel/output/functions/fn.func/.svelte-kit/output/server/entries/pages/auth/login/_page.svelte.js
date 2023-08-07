import { c as create_ssr_component, b as escape, d as add_attribute } from "../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { form } = $$props;
  let email = "";
  let password = "";
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  return `<div class="flex items-center justify-center h-auto"><form action="?/login" method="POST" class="${"space-y-5 " + escape($$props.class, true)}"><div class="form-control w-full max-w-xs"><label class="label" for="email" data-svelte-h="svelte-12lfg41"><span class="label-text text-accent">E-mail</span></label> <input id="email" name="email" type="email" required class="input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"${add_attribute("value", email, 0)}></div> <div class="form-control w-full max-w-xs"><label class="label" for="password" data-svelte-h="svelte-k0v8bo"><span class="label-text text-accent">Password</span></label> <input id="password" name="password" type="password" required class="input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"${add_attribute("value", password, 0)}></div> ${form?.invalid ? `<p class="error" data-svelte-h="svelte-1ar3ney">Username and password is required.</p>` : ``} ${form?.credentials ? `<p class="error" data-svelte-h="svelte-koq2j1">You have entered the wrong credentials.</p>` : ``} <button class="btn btn-primary text-neutral justify-center" type="submit" data-svelte-h="svelte-1d1cxq3">Log In</button></form></div>`;
});
export {
  Page as default
};
