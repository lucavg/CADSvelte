function g(){}function k(t,n){for(const e in n)t[e]=n[e];return t}function w(t){return t()}function F(){return Object.create(null)}function j(t){t.forEach(w)}function E(t){return typeof t=="function"}function P(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function S(t){return Object.keys(t).length===0}function v(t,...n){if(t==null){for(const o of n)o(void 0);return g}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function U(t,n,e){t.$$.on_destroy.push(v(n,e))}function A(t,n,e,o){if(t){const r=y(t,n,e,o);return t[0](r)}}function y(t,n,e,o){return t[1]&&o?k(e.ctx.slice(),t[1](o(n))):e.ctx}function B(t,n,e,o){if(t[2]&&o){const r=t[2](o(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const l=[],f=Math.max(n.dirty.length,r.length);for(let u=0;u<f;u+=1)l[u]=n.dirty[u]|r[u];return l}return n.dirty|r}return n.dirty}function C(t,n,e,o,r,l){if(r){const f=y(n,e,o,l);t.p(f,r)}}function D(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let o=0;o<e;o++)n[o]=-1;return n}return-1}function G(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function H(t){return t&&E(t.destroy)?t.destroy:g}let a;function d(t){a=t}function m(){if(!a)throw new Error("Function called outside component initialization");return a}function I(t){m().$$.on_mount.push(t)}function J(t){m().$$.after_update.push(t)}const i=[],p=[];let s=[];const b=[],x=Promise.resolve();let h=!1;function O(){h||(h=!0,x.then(z))}function K(){return O(),x}function q(t){s.push(t)}const _=new Set;let c=0;function z(){if(c!==0)return;const t=a;do{try{for(;c<i.length;){const n=i[c];c++,d(n),M(n.$$)}}catch(n){throw i.length=0,c=0,n}for(d(null),i.length=0,c=0;p.length;)p.pop()();for(let n=0;n<s.length;n+=1){const e=s[n];_.has(e)||(_.add(e),e())}s.length=0}while(i.length);for(;b.length;)b.pop()();h=!1,_.clear(),d(t)}function M(t){if(t.fragment!==null){t.update(),j(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(q)}}function L(t){const n=[],e=[];s.forEach(o=>t.indexOf(o)===-1?n.push(o):e.push(o)),e.forEach(o=>o()),s=n}export{H as a,k as b,U as c,J as d,G as e,p as f,F as g,z as h,E as i,S as j,q as k,L as l,a as m,g as n,I as o,d as p,w as q,j as r,P as s,K as t,i as u,O as v,A as w,C as x,D as y,B as z};
