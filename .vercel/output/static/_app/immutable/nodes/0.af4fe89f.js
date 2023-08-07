import{s as J,n as F,c as le,w as _e,x as ve,y as pe,z as ge}from"../chunks/scheduler.ca89b992.js";import{S as Q,i as W,e as p,c as g,k as S,l as k,g as $,d as u,s as D,a as x,f as C,h as v,B as Y,o as K,t as j,b as N,j as q,x as ne,y as re,z as ae,r as P,p as Z,A as ie}from"../chunks/index.cbda178f.js";import{p as be}from"../chunks/stores.599aa6d1.js";import{w as ke}from"../chunks/singletons.01596a0d.js";function V(s){return(s==null?void 0:s.length)!==void 0?s:Array.from(s)}function xe(s){let e,l=`Coördinatie Antwerpse Dierenbescherming vzw
	<br/>
	Centrale databank gevonden - verloren - te adopteren dieren | email:
	<a class="text-primary" href="mailto:cad-dieren@telenet.be">cad-dieren@telenet.be</a>
	| Tel:
	<a class="text-primary" href="tel:+323/440.05.48">03/440.05.48</a> <br/>
	De gebruiker mag geen informatie verkregen op deze site wijzigen, kopiëren, verdelen, doorgeven, verspreiden,
	weergeven, reproduceren, publiceren op om het even welke wijze of door om het even welk middel of criterium,
	zonder voorafgaande en schriftelijke toelating van CAD.`;return{c(){e=p("div"),e.innerHTML=l,this.h()},l(t){e=g(t,"DIV",{class:!0,"data-svelte-h":!0}),S(e)!=="svelte-16bn6e2"&&(e.innerHTML=l),this.h()},h(){k(e,"class","w-8/12 mx-auto text-center bg-gray-300 text-gray-500 border-2 border-gray-300 text-sm")},m(t,n){$(t,e,n)},p:F,i:F,o:F,d(t){t&&u(e)}}}class Le extends Q{constructor(e){super(),W(this,e,null,xe,J,{})}}const we=ke([{name:"Home",link:"/"},{name:"Katten",children:[{name:"Gevonden katten",link:"/catsFound"},{name:"Verloren katten",link:"/catsLost"}]},{name:"Honden",children:[{name:"Gevonden honden",link:"/dogsFound"},{name:"Verloren honden",link:"/dogsLost"}]},{name:"Allerlei",children:[{name:"Gevonden allerlei",link:"/randomFound"},{name:"Verloren allerlei",link:"/randomLost"}]},{name:"RIP",link:"/rip"},{name:"Andere",children:[{name:"De visie van Mark Eyskens",link:"/mark"},{name:"Chips",link:"/chips"},{name:"Sterilisatie",link:"/sterilisatie"},{name:"Steun Ons",link:"/steunOns"},{name:"Tips",link:"/tips"},{name:"Toxoplasmose",link:"/toxoplasmose"},{name:"Veiligheid",link:"/veiligheid"},{name:"Zwerfkatten",link:"/zwerfkatten"}]},{name:"Contact",link:"/contact"},{name:"Vragen",link:"/vragen"}]);function se(s,e,l){const t=s.slice();return t[2]=e[l],t}function oe(s,e,l){const t=s.slice();return t[5]=e[l],t}function ce(s,e,l){const t=s.slice();return t[2]=e[l],t}function fe(s,e,l){const t=s.slice();return t[5]=e[l],t}function Ee(s){let e,l,t=s[2].name+"",n,r;return{c(){e=p("li"),l=p("a"),n=j(t),this.h()},l(o){e=g(o,"LI",{});var i=x(e);l=g(i,"A",{href:!0,class:!0});var d=x(l);n=N(d,t),d.forEach(u),i.forEach(u),this.h()},h(){k(l,"href",r=s[2].link),k(l,"class","text-neutral text-xl")},m(o,i){$(o,e,i),v(e,l),v(l,n)},p(o,i){i&1&&t!==(t=o[2].name+"")&&q(n,t),i&1&&r!==(r=o[2].link)&&k(l,"href",r)},d(o){o&&u(e)}}}function $e(s){let e,l,t,n=s[2].name+"",r,o,i,d=V(s[2].children),f=[];for(let c=0;c<d.length;c+=1)f[c]=ue(fe(s,d,c));return{c(){e=p("li"),l=p("details"),t=p("summary"),r=j(n),o=D(),i=p("ul");for(let c=0;c<f.length;c+=1)f[c].c();this.h()},l(c){e=g(c,"LI",{});var _=x(e);l=g(_,"DETAILS",{});var a=x(l);t=g(a,"SUMMARY",{class:!0});var b=x(t);r=N(b,n),b.forEach(u),o=C(a),i=g(a,"UL",{class:!0});var L=x(i);for(let y=0;y<f.length;y+=1)f[y].l(L);L.forEach(u),a.forEach(u),_.forEach(u),this.h()},h(){k(t,"class","text-neutral text-xl"),k(i,"class","p-2 text-neutral")},m(c,_){$(c,e,_),v(e,l),v(l,t),v(t,r),v(l,o),v(l,i);for(let a=0;a<f.length;a+=1)f[a]&&f[a].m(i,null)},p(c,_){if(_&1&&n!==(n=c[2].name+"")&&q(r,n),_&1){d=V(c[2].children);let a;for(a=0;a<d.length;a+=1){const b=fe(c,d,a);f[a]?f[a].p(b,_):(f[a]=ue(b),f[a].c(),f[a].m(i,null))}for(;a<f.length;a+=1)f[a].d(1);f.length=d.length}},d(c){c&&u(e),Y(f,c)}}}function ue(s){let e,l,t=s[5].name+"",n,r;return{c(){e=p("li"),l=p("a"),n=j(t),this.h()},l(o){e=g(o,"LI",{});var i=x(e);l=g(i,"A",{href:!0,class:!0});var d=x(l);n=N(d,t),d.forEach(u),i.forEach(u),this.h()},h(){k(l,"href",r=s[5].link),k(l,"class","text-xl")},m(o,i){$(o,e,i),v(e,l),v(l,n)},p(o,i){i&1&&t!==(t=o[5].name+"")&&q(n,t),i&1&&r!==(r=o[5].link)&&k(l,"href",r)},d(o){o&&u(e)}}}function he(s){let e;function l(r,o){return r[2].children&&r[2].children.length>0?$e:Ee}let t=l(s),n=t(s);return{c(){n.c(),e=K()},l(r){n.l(r),e=K()},m(r,o){n.m(r,o),$(r,e,o)},p(r,o){t===(t=l(r))&&n?n.p(r,o):(n.d(1),n=t(r),n&&(n.c(),n.m(e.parentNode,e)))},d(r){r&&u(e),n.d(r)}}}function ye(s){let e,l='<form action="/auth/logout" method="post"><button type="submit" class="text-neutral text-xl border-none cursor-pointer">Logout</button></form>';return{c(){e=p("li"),e.innerHTML=l},l(t){e=g(t,"LI",{"data-svelte-h":!0}),S(e)!=="svelte-q7qqri"&&(e.innerHTML=l)},m(t,n){$(t,e,n)},d(t){t&&u(e)}}}function Ie(s){let e,l='<a href="/auth/login" class="text-neutral text-xl">Login</a>';return{c(){e=p("li"),e.innerHTML=l},l(t){e=g(t,"LI",{"data-svelte-h":!0}),S(e)!=="svelte-302nl5"&&(e.innerHTML=l)},m(t,n){$(t,e,n)},d(t){t&&u(e)}}}function Me(s){let e,l,t=s[2].name+"",n,r;return{c(){e=p("li"),l=p("a"),n=j(t),this.h()},l(o){e=g(o,"LI",{});var i=x(e);l=g(i,"A",{href:!0,class:!0});var d=x(l);n=N(d,t),d.forEach(u),i.forEach(u),this.h()},h(){k(l,"href",r=s[2].link),k(l,"class","text-neutral text-xl")},m(o,i){$(o,e,i),v(e,l),v(l,n)},p(o,i){i&1&&t!==(t=o[2].name+"")&&q(n,t),i&1&&r!==(r=o[2].link)&&k(l,"href",r)},d(o){o&&u(e)}}}function Te(s){let e,l,t,n=s[2].name+"",r,o,i,d=V(s[2].children),f=[];for(let c=0;c<d.length;c+=1)f[c]=de(oe(s,d,c));return{c(){e=p("li"),l=p("details"),t=p("summary"),r=j(n),o=D(),i=p("ul");for(let c=0;c<f.length;c+=1)f[c].c();this.h()},l(c){e=g(c,"LI",{});var _=x(e);l=g(_,"DETAILS",{});var a=x(l);t=g(a,"SUMMARY",{class:!0});var b=x(t);r=N(b,n),b.forEach(u),o=C(a),i=g(a,"UL",{class:!0});var L=x(i);for(let y=0;y<f.length;y+=1)f[y].l(L);L.forEach(u),a.forEach(u),_.forEach(u),this.h()},h(){k(t,"class","text-neutral text-xl"),k(i,"class","p-2 bg-primary text-neutral text-xl")},m(c,_){$(c,e,_),v(e,l),v(l,t),v(t,r),v(l,o),v(l,i);for(let a=0;a<f.length;a+=1)f[a]&&f[a].m(i,null)},p(c,_){if(_&1&&n!==(n=c[2].name+"")&&q(r,n),_&1){d=V(c[2].children);let a;for(a=0;a<d.length;a+=1){const b=oe(c,d,a);f[a]?f[a].p(b,_):(f[a]=de(b),f[a].c(),f[a].m(i,null))}for(;a<f.length;a+=1)f[a].d(1);f.length=d.length}},d(c){c&&u(e),Y(f,c)}}}function de(s){let e,l,t=s[5].name+"",n,r;return{c(){e=p("li"),l=p("a"),n=j(t),this.h()},l(o){e=g(o,"LI",{});var i=x(e);l=g(i,"A",{href:!0,class:!0});var d=x(l);n=N(d,t),d.forEach(u),i.forEach(u),this.h()},h(){k(l,"href",r=s[5].link),k(l,"class","text-xl")},m(o,i){$(o,e,i),v(e,l),v(l,n)},p(o,i){i&1&&t!==(t=o[5].name+"")&&q(n,t),i&1&&r!==(r=o[5].link)&&k(l,"href",r)},d(o){o&&u(e)}}}function me(s){let e;function l(r,o){return r[2].children&&r[2].children.length>0?Te:Me}let t=l(s),n=t(s);return{c(){n.c(),e=K()},l(r){n.l(r),e=K()},m(r,o){n.m(r,o),$(r,e,o)},p(r,o){t===(t=l(r))&&n?n.p(r,o):(n.d(1),n=t(r),n&&(n.c(),n.m(e.parentNode,e)))},d(r){r&&u(e),n.d(r)}}}function Ae(s){let e,l='<form action="/auth/logout" method="post"><button type="submit" class="text-neutral text-xl border-none cursor-pointer">Logout</button></form>';return{c(){e=p("li"),e.innerHTML=l},l(t){e=g(t,"LI",{"data-svelte-h":!0}),S(e)!=="svelte-1oaky28"&&(e.innerHTML=l)},m(t,n){$(t,e,n)},d(t){t&&u(e)}}}function He(s){let e,l='<a href="/auth/login" class="text-neutral text-xl">Login</a>';return{c(){e=p("li"),e.innerHTML=l},l(t){e=g(t,"LI",{"data-svelte-h":!0}),S(e)!=="svelte-302nl5"&&(e.innerHTML=l)},m(t,n){$(t,e,n)},d(t){t&&u(e)}}}function De(s){let e,l,t,n,r='<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="#fff"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>',o,i,d,f,c,_='<img alt="logo" src="/cad02.webp"/> <p class="no-animation text-neutral text-xl">Coördinatie Antwerpse Dierenbescherming vzw</p>',a,b,L,y,T=V(s[0]),w=[];for(let m=0;m<T.length;m+=1)w[m]=he(ce(s,T,m));function X(m,I){return m[1].data.user?ye:Ie}let B=X(s),A=B(s),U=V(s[0]),E=[];for(let m=0;m<U.length;m+=1)E[m]=me(se(s,U,m));function ee(m,I){return m[1].data.user?Ae:He}let G=ee(s),H=G(s);return{c(){e=p("div"),l=p("div"),t=p("div"),n=p("button"),n.innerHTML=r,o=D(),i=p("ul");for(let m=0;m<w.length;m+=1)w[m].c();d=D(),A.c(),f=D(),c=p("a"),c.innerHTML=_,a=D(),b=p("div"),L=p("ul");for(let m=0;m<E.length;m+=1)E[m].c();y=D(),H.c(),this.h()},l(m){e=g(m,"DIV",{class:!0});var I=x(e);l=g(I,"DIV",{class:!0});var h=x(l);t=g(h,"DIV",{class:!0});var M=x(t);n=g(M,"BUTTON",{class:!0,"data-svelte-h":!0}),S(n)!=="svelte-u0li3d"&&(n.innerHTML=r),o=C(M),i=g(M,"UL",{class:!0});var O=x(i);for(let z=0;z<w.length;z+=1)w[z].l(O);d=C(O),A.l(O),O.forEach(u),M.forEach(u),f=C(h),c=g(h,"A",{href:!0,class:!0,"data-svelte-h":!0}),S(c)!=="svelte-293bbj"&&(c.innerHTML=_),h.forEach(u),a=C(I),b=g(I,"DIV",{class:!0});var te=x(b);L=g(te,"UL",{class:!0});var R=x(L);for(let z=0;z<E.length;z+=1)E[z].l(R);y=C(R),H.l(R),R.forEach(u),te.forEach(u),I.forEach(u),this.h()},h(){k(n,"class","btn btn-ghost flex lg:hidden"),k(i,"class","menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-80"),k(t,"class","dropdown"),k(c,"href","/"),k(c,"class","flex flex-row items-center"),k(l,"class","navbar-start"),k(L,"class","menu menu-horizontal px-1"),k(b,"class","navbar-end hidden lg:flex"),k(e,"class","navbar bg-primary")},m(m,I){$(m,e,I),v(e,l),v(l,t),v(t,n),v(t,o),v(t,i);for(let h=0;h<w.length;h+=1)w[h]&&w[h].m(i,null);v(i,d),A.m(i,null),v(l,f),v(l,c),v(e,a),v(e,b),v(b,L);for(let h=0;h<E.length;h+=1)E[h]&&E[h].m(L,null);v(L,y),H.m(L,null)},p(m,[I]){if(I&1){T=V(m[0]);let h;for(h=0;h<T.length;h+=1){const M=ce(m,T,h);w[h]?w[h].p(M,I):(w[h]=he(M),w[h].c(),w[h].m(i,d))}for(;h<w.length;h+=1)w[h].d(1);w.length=T.length}if(B!==(B=X(m))&&(A.d(1),A=B(m),A&&(A.c(),A.m(i,null))),I&1){U=V(m[0]);let h;for(h=0;h<U.length;h+=1){const M=se(m,U,h);E[h]?E[h].p(M,I):(E[h]=me(M),E[h].c(),E[h].m(L,y))}for(;h<E.length;h+=1)E[h].d(1);E.length=U.length}G!==(G=ee(m))&&(H.d(1),H=G(m),H&&(H.c(),H.m(L,null)))},i:F,o:F,d(m){m&&u(e),Y(w,m),A.d(),Y(E,m),H.d()}}}function Ce(s,e,l){let t,n;return le(s,we,r=>l(0,t=r)),le(s,be,r=>l(1,n=r)),[t,n]}class Ve extends Q{constructor(e){super(),W(this,e,Ce,De,J,{})}}function ze(s){let e,l,t,n,r,o,i,d,f;t=new Ve({});const c=s[1].default,_=_e(c,s,s[0],null);return d=new Le({}),{c(){e=p("div"),l=p("div"),ne(t.$$.fragment),n=D(),r=p("main"),_&&_.c(),o=D(),i=p("div"),ne(d.$$.fragment),this.h()},l(a){e=g(a,"DIV",{class:!0});var b=x(e);l=g(b,"DIV",{class:!0});var L=x(l);re(t.$$.fragment,L),L.forEach(u),n=C(b),r=g(b,"MAIN",{class:!0});var y=x(r);_&&_.l(y),y.forEach(u),b.forEach(u),o=C(a),i=g(a,"DIV",{class:!0});var T=x(i);re(d.$$.fragment,T),T.forEach(u),this.h()},h(){k(l,"class","w-full"),k(r,"class","w-10/12 md:w-8/12 flex-grow container mx-auto my-5"),k(e,"class","flex flex-col min-h-screen text-black bg-gray-100 h-4/5"),k(i,"class","w-full bg-gray-100")},m(a,b){$(a,e,b),v(e,l),ae(t,l,null),v(e,n),v(e,r),_&&_.m(r,null),$(a,o,b),$(a,i,b),ae(d,i,null),f=!0},p(a,[b]){_&&_.p&&(!f||b&1)&&ve(_,c,a,a[0],f?ge(c,a[0],b,null):pe(a[0]),null)},i(a){f||(P(t.$$.fragment,a),P(_,a),P(d.$$.fragment,a),f=!0)},o(a){Z(t.$$.fragment,a),Z(_,a),Z(d.$$.fragment,a),f=!1},d(a){a&&(u(e),u(o),u(i)),ie(t),_&&_.d(a),ie(d)}}}function Se(s,e,l){let{$$slots:t={},$$scope:n}=e;return s.$$set=r=>{"$$scope"in r&&l(0,n=r.$$scope)},[n,t]}class Fe extends Q{constructor(e){super(),W(this,e,Se,ze,J,{})}}export{Fe as component};
