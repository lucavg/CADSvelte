import { c as create_ssr_component, a as subscribe, e as each, b as escape, d as add_attribute, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="w-8/12 mx-auto text-center bg-gray-300 text-gray-500 border-2 border-gray-300 text-sm" data-svelte-h="svelte-16bn6e2">Coördinatie Antwerpse Dierenbescherming vzw
	<br>
	Centrale databank gevonden - verloren - te adopteren dieren | email:
	<a class="text-primary" href="mailto:cad-dieren@telenet.be">cad-dieren@telenet.be</a>
	| Tel:
	<a class="text-primary" href="tel:+323/440.05.48">03/440.05.48</a> <br>
	De gebruiker mag geen informatie verkregen op deze site wijzigen, kopiëren, verdelen, doorgeven, verspreiden,
	weergeven, reproduceren, publiceren op om het even welke wijze of door om het even welk middel of criterium,
	zonder voorafgaande en schriftelijke toelating van CAD.</div>`;
});
const navItemsStore = writable([
  { name: "Home", link: "/" },
  {
    name: "Katten",
    children: [
      { name: "Gevonden katten", link: "/catsFound" },
      { name: "Verloren katten", link: "/catsLost" }
    ]
  },
  {
    name: "Honden",
    children: [
      { name: "Gevonden honden", link: "/dogsFound" },
      { name: "Verloren honden", link: "/dogsLost" }
    ]
  },
  {
    name: "Allerlei",
    children: [
      { name: "Gevonden allerlei", link: "/randomFound" },
      { name: "Verloren allerlei", link: "/randomLost" }
    ]
  },
  { name: "RIP", link: "/rip" },
  {
    name: "Andere",
    children: [
      { name: "De visie van Mark Eyskens", link: "/mark" },
      { name: "Chips", link: "/chips" },
      { name: "Sterilisatie", link: "/sterilisatie" },
      { name: "Steun Ons", link: "/steunOns" },
      { name: "Tips", link: "/tips" },
      { name: "Toxoplasmose", link: "/toxoplasmose" },
      { name: "Veiligheid", link: "/veiligheid" },
      { name: "Zwerfkatten", link: "/zwerfkatten" }
    ]
  },
  { name: "Contact", link: "/contact" },
  { name: "Vragen", link: "/vragen" }
]);
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navItemsStore, $$unsubscribe_navItemsStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_navItemsStore = subscribe(navItemsStore, (value) => $navItemsStore = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_navItemsStore();
  $$unsubscribe_page();
  return `<div class="navbar bg-primary"><div class="navbar-start"><div class="dropdown"><button class="btn btn-ghost flex lg:hidden" data-svelte-h="svelte-u0li3d"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg></button> <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-80">${each($navItemsStore, (item) => {
    return `${item.children && item.children.length > 0 ? `<li><details><summary class="text-neutral text-xl">${escape(item.name)}</summary> <ul class="p-2 text-neutral">${each(item.children, (child) => {
      return `<li><a${add_attribute("href", child.link, 0)} class="text-xl">${escape(child.name)}</a></li>`;
    })} </ul></details> </li>` : `<li><a${add_attribute("href", item.link, 0)} class="text-neutral text-xl">${escape(item.name)}</a></li>`}`;
  })} ${!$page.data.user ? `<li data-svelte-h="svelte-302nl5"><a href="/auth/login" class="text-neutral text-xl">Login</a></li>` : `<li data-svelte-h="svelte-q7qqri"><form action="/auth/logout" method="post"><button type="submit" class="text-neutral text-xl border-none cursor-pointer">Logout</button></form></li>`}</ul></div> <a href="/" class="flex flex-row items-center" data-svelte-h="svelte-293bbj"><img alt="logo" src="/cad02.webp"> <p class="no-animation text-neutral text-xl">Coördinatie Antwerpse Dierenbescherming vzw</p></a></div> <div class="navbar-end hidden lg:flex"><ul class="menu menu-horizontal px-1">${each($navItemsStore, (item) => {
    return `${item.children && item.children.length > 0 ? `<li><details><summary class="text-neutral text-xl">${escape(item.name)}</summary> <ul class="p-2 bg-primary text-neutral text-xl">${each(item.children, (child) => {
      return `<li><a${add_attribute("href", child.link, 0)} class="text-xl">${escape(child.name)}</a></li>`;
    })} </ul></details> </li>` : `<li><a${add_attribute("href", item.link, 0)} class="text-neutral text-xl">${escape(item.name)}</a></li>`}`;
  })} ${!$page.data.user ? `<li data-svelte-h="svelte-302nl5"><a href="/auth/login" class="text-neutral text-xl">Login</a></li>` : `<li data-svelte-h="svelte-1oaky28"><form action="/auth/logout" method="post"><button type="submit" class="text-neutral text-xl border-none cursor-pointer">Logout</button></form></li>`}</ul></div></div>`;
});
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-col min-h-screen text-black bg-gray-100 h-4/5"><div class="w-full">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}</div> <main class="w-10/12 md:w-8/12 flex-grow container mx-auto my-5">${slots.default ? slots.default({}) : ``}</main></div> <div class="w-full bg-gray-100">${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  Layout as default
};
