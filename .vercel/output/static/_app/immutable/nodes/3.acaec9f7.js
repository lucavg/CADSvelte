import{s as Q,a as W,n as V,r as X,b as R,e as z}from"../chunks/scheduler.ca89b992.js";import{S as Z,i as $,e as _,s as A,c as g,a as I,k as P,f as M,d as C,l as n,g as S,h as d,m as F,n as J}from"../chunks/index.cbda178f.js";import{p as tt}from"../chunks/parse.bee59afc.js";import{c as et,a as at}from"../chunks/singletons.01596a0d.js";const rt=et("invalidate_all");function st(a){return at.apply_action(a)}function nt(a){const t=JSON.parse(a);return t.data&&(t.data=tt(t.data)),t}function Y(a){return HTMLElement.prototype.cloneNode.call(a)}function lt(a,t=()=>{}){const e=async({action:r,result:p,reset:h})=>{p.type==="success"&&(h!==!1&&HTMLFormElement.prototype.reset.call(a),await rt()),(location.origin+location.pathname===r.origin+r.pathname||p.type==="redirect"||p.type==="error")&&st(p)};async function s(r){var k,E,L,y;if(((k=r.submitter)!=null&&k.hasAttribute("formmethod")?r.submitter.formMethod:Y(a).method)!=="post")return;r.preventDefault();const h=new URL((E=r.submitter)!=null&&E.hasAttribute("formaction")?r.submitter.formAction:Y(a).action),l=new FormData(a),x=(L=r.submitter)==null?void 0:L.getAttribute("name");x&&l.append(x,((y=r.submitter)==null?void 0:y.getAttribute("value"))??"");const b=new AbortController;let v=!1;const H=await t({action:h,cancel:()=>v=!0,controller:b,get data(){return l},formData:l,get form(){return a},formElement:a,submitter:r.submitter})??e;if(v)return;let i;try{const u=await fetch(h,{method:"POST",headers:{accept:"application/json","x-sveltekit-action":"true"},cache:"no-store",body:l,signal:b.signal});i=nt(await u.text()),i.type==="error"&&(i.status=u.status)}catch(u){if((u==null?void 0:u.name)==="AbortError")return;i={type:"error",error:u}}H({action:h,get data(){return l},formData:l,get form(){return a},formElement:a,update:u=>e({action:h,result:i,reset:u==null?void 0:u.reset}),result:i})}return HTMLFormElement.prototype.addEventListener.call(a,"submit",s),{destroy(){HTMLFormElement.prototype.removeEventListener.call(a,"submit",s)}}}function G(a){let t,e="Username and password is required.";return{c(){t=_("p"),t.textContent=e,this.h()},l(s){t=g(s,"P",{class:!0,"data-svelte-h":!0}),P(t)!=="svelte-1ar3ney"&&(t.textContent=e),this.h()},h(){n(t,"class","error")},m(s,r){S(s,t,r)},d(s){s&&C(t)}}}function K(a){let t,e="You have entered the wrong credentials.";return{c(){t=_("p"),t.textContent=e,this.h()},l(s){t=g(s,"P",{class:!0,"data-svelte-h":!0}),P(t)!=="svelte-koq2j1"&&(t.textContent=e),this.h()},h(){n(t,"class","error")},m(s,r){S(s,t,r)},d(s){s&&C(t)}}}function it(a){var j,B;let t,e,s,r,p='<span class="label-text text-accent">E-mail</span>',h,l,x,b,v,N='<span class="label-text text-accent">Password</span>',H,i,k,E,L,y,u="Log In",D,O,U,o=((j=a[0])==null?void 0:j.invalid)&&G(),c=((B=a[0])==null?void 0:B.credentials)&&K();return{c(){t=_("div"),e=_("form"),s=_("div"),r=_("label"),r.innerHTML=p,h=A(),l=_("input"),x=A(),b=_("div"),v=_("label"),v.innerHTML=N,H=A(),i=_("input"),k=A(),o&&o.c(),E=A(),c&&c.c(),L=A(),y=_("button"),y.textContent=u,this.h()},l(f){t=g(f,"DIV",{class:!0});var w=I(t);e=g(w,"FORM",{action:!0,method:!0,class:!0});var m=I(e);s=g(m,"DIV",{class:!0});var T=I(s);r=g(T,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),P(r)!=="svelte-12lfg41"&&(r.innerHTML=p),h=M(T),l=g(T,"INPUT",{id:!0,name:!0,type:!0,class:!0}),T.forEach(C),x=M(m),b=g(m,"DIV",{class:!0});var q=I(b);v=g(q,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),P(v)!=="svelte-k0v8bo"&&(v.innerHTML=N),H=M(q),i=g(q,"INPUT",{id:!0,name:!0,type:!0,class:!0}),q.forEach(C),k=M(m),o&&o.l(m),E=M(m),c&&c.l(m),L=M(m),y=g(m,"BUTTON",{class:!0,type:!0,"data-svelte-h":!0}),P(y)!=="svelte-1d1cxq3"&&(y.textContent=u),m.forEach(C),w.forEach(C),this.h()},h(){n(r,"class","label"),n(r,"for","email"),n(l,"id","email"),n(l,"name","email"),n(l,"type","email"),l.required=!0,n(l,"class","input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"),n(s,"class","form-control w-full max-w-xs"),n(v,"class","label"),n(v,"for","password"),n(i,"id","password"),n(i,"name","password"),n(i,"type","password"),i.required=!0,n(i,"class","input input-bordered border-gray-300 w-full text-accent bg-gray-100 max-w-xs"),n(b,"class","form-control w-full max-w-xs"),n(y,"class","btn btn-primary text-neutral justify-center"),n(y,"type","submit"),n(e,"action","?/login"),n(e,"method","POST"),n(e,"class",D="space-y-5 "+a[3].class),n(t,"class","flex items-center justify-center h-auto")},m(f,w){S(f,t,w),d(t,e),d(e,s),d(s,r),d(s,h),d(s,l),F(l,a[1]),d(e,x),d(e,b),d(b,v),d(b,H),d(b,i),F(i,a[2]),d(e,k),o&&o.m(e,null),d(e,E),c&&c.m(e,null),d(e,L),d(e,y),O||(U=[J(l,"input",a[4]),J(i,"input",a[5]),W(lt.call(null,e))],O=!0)},p(f,[w]){var m,T;w&2&&l.value!==f[1]&&F(l,f[1]),w&4&&i.value!==f[2]&&F(i,f[2]),(m=f[0])!=null&&m.invalid?o||(o=G(),o.c(),o.m(e,E)):o&&(o.d(1),o=null),(T=f[0])!=null&&T.credentials?c||(c=K(),c.c(),c.m(e,L)):c&&(c.d(1),c=null),w&8&&D!==(D="space-y-5 "+f[3].class)&&n(e,"class",D)},i:V,o:V,d(f){f&&C(t),o&&o.d(),c&&c.d(),O=!1,X(U)}}}function ot(a,t,e){let{form:s}=t,r="",p="";function h(){r=this.value,e(1,r)}function l(){p=this.value,e(2,p)}return a.$$set=x=>{e(3,t=R(R({},t),z(x))),"form"in x&&e(0,s=x.form)},t=z(t),[s,r,p,t,h,l]}class mt extends Z{constructor(t){super(),$(this,t,ot,it,Q,{form:0})}}export{mt as component};