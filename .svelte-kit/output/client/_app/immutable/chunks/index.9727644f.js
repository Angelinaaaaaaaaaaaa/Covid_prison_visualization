function $(){}function R(t,e){for(const n in e)t[n]=e[n];return t}function D(t){return t()}function k(){return Object.create(null)}function g(t){t.forEach(D)}function L(t){return typeof t=="function"}function ft(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function G(t){return Object.keys(t).length===0}function J(t,...e){if(t==null)return $;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function dt(t,e,n){t.$$.on_destroy.push(J(e,n))}function _t(t,e,n,i){if(t){const r=O(t,e,n,i);return t[0](r)}}function O(t,e,n,i){return t[1]&&i?R(n.ctx.slice(),t[1](i(e))):n.ctx}function ht(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const l=[],s=Math.max(e.dirty.length,r.length);for(let u=0;u<s;u+=1)l[u]=e.dirty[u]|r[u];return l}return e.dirty|r}return e.dirty}function mt(t,e,n,i,r,l){if(r){const s=O(e,n,i,l);t.p(s,r)}}function pt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}let E=!1;function K(){E=!0}function Q(){E=!1}function U(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function V(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let c=0;c<e.length;c++){const f=e[c];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let o=0;o<e.length;o++){const c=e[o].claim_order,f=(r>0&&e[n[r]].claim_order<=c?r+1:U(1,r,b=>e[n[b]].claim_order,c))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,r=Math.max(a,r)}const l=[],s=[];let u=e.length-1;for(let o=n[r]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);u>=o;u--)s.push(e[u]);u--}for(;u>=0;u--)s.push(e[u]);l.reverse(),s.sort((o,c)=>o.claim_order-c.claim_order);for(let o=0,c=0;o<s.length;o++){for(;c<l.length&&s[o].claim_order>=l[c].claim_order;)c++;const f=c<l.length?l[c]:null;t.insertBefore(s[o],f)}}function X(t,e){t.appendChild(e)}function Y(t,e){if(E){for(V(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function yt(t,e,n){E&&!n?Y(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function B(t){t.parentNode&&t.parentNode.removeChild(t)}function H(t){return document.createElement(t)}function C(t){return document.createTextNode(t)}function gt(){return C(" ")}function bt(){return C("")}function M(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Z(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function xt(t,e,n){e in t?t[e]=typeof t[e]=="boolean"&&n===""?!0:n:Z(t,e,n)}function tt(t){return Array.from(t.childNodes)}function et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function P(t,e,n,i,r=!1){et(t);const l=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r||(t.claim_info.last_index=s),u}}for(let s=t.claim_info.last_index-1;s>=0;s--){const u=t[s];if(e(u)){const o=n(u);return o===void 0?t.splice(s,1):t[s]=o,r?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,u}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function nt(t,e,n,i){return P(t,r=>r.nodeName===e,r=>{const l=[];for(let s=0;s<r.attributes.length;s++){const u=r.attributes[s];n[u.name]||l.push(u.name)}l.forEach(s=>r.removeAttribute(s))},()=>i(e))}function wt(t,e,n){return nt(t,e,n,H)}function it(t,e){return P(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>C(e),!0)}function $t(t){return it(t," ")}function Et(t,e){e=""+e,t.data!==e&&(t.data=e)}function vt(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}let x;function rt(){if(x===void 0){x=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{x=!0}}return x}function At(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=H("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=rt();let l;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",l=M(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{l=M(i.contentWindow,"resize",e),e()}),X(t,i),()=>{(r||l&&i.contentWindow)&&l(),B(i)}}function Nt(t,e,n){t.classList[n?"add":"remove"](e)}function St(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const l=r.textContent.trim();l===`HEAD_${t}_END`?(i-=1,n.push(r)):l===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Ct(t,e){return new t(e)}let y;function p(t){y=t}function W(){if(!y)throw new Error("Function called outside component initialization");return y}function jt(t){W().$$.on_mount.push(t)}function Tt(t){W().$$.after_update.push(t)}const h=[],z=[];let m=[];const A=[],q=Promise.resolve();let N=!1;function F(){N||(N=!0,q.then(I))}function kt(){return F(),q}function S(t){m.push(t)}function Mt(t){A.push(t)}const v=new Set;let _=0;function I(){if(_!==0)return;const t=y;do{try{for(;_<h.length;){const e=h[_];_++,p(e),st(e.$$)}}catch(e){throw h.length=0,_=0,e}for(p(null),h.length=0,_=0;z.length;)z.pop()();for(let e=0;e<m.length;e+=1){const n=m[e];v.has(n)||(v.add(n),n())}m.length=0}while(h.length);for(;A.length;)A.pop()();N=!1,v.clear(),p(t)}function st(t){if(t.fragment!==null){t.update(),g(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(S)}}function ot(t){const e=[],n=[];m.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),m=e}const w=new Set;let d;function zt(){d={r:0,c:[],p:d}}function Dt(){d.r||g(d.c),d=d.p}function ct(t,e){t&&t.i&&(w.delete(t),t.i(e))}function Lt(t,e,n,i){if(t&&t.o){if(w.has(t))return;w.add(t),d.c.push(()=>{w.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Ot=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;function Bt(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Ht(t){t&&t.c()}function Pt(t,e){t&&t.l(e)}function lt(t,e,n,i){const{fragment:r,after_update:l}=t.$$;r&&r.m(e,n),i||S(()=>{const s=t.$$.on_mount.map(D).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...s):g(s),t.$$.on_mount=[]}),l.forEach(S)}function ut(t,e){const n=t.$$;n.fragment!==null&&(ot(n.after_update),g(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function at(t,e){t.$$.dirty[0]===-1&&(h.push(t),F(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Wt(t,e,n,i,r,l,s,u=[-1]){const o=y;p(t);const c=t.$$={fragment:null,ctx:[],props:l,update:$,not_equal:r,bound:k(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:k(),dirty:u,skip_bound:!1,root:e.target||o.$$.root};s&&s(c.root);let f=!1;if(c.ctx=n?n(t,e.props||{},(a,b,...j)=>{const T=j.length?j[0]:b;return c.ctx&&r(c.ctx[a],c.ctx[a]=T)&&(!c.skip_bound&&c.bound[a]&&c.bound[a](T),f&&at(t,a)),b}):[],c.update(),f=!0,g(c.before_update),c.fragment=i?i(c.ctx):!1,e.target){if(e.hydrate){K();const a=tt(e.target);c.fragment&&c.fragment.l(a),a.forEach(B)}else c.fragment&&c.fragment.c();e.intro&&ct(t.$$.fragment),lt(t,e.target,e.anchor,e.customElement),Q(),I()}p(o)}class qt{$destroy(){ut(this,1),this.$destroy=$}$on(e,n){if(!L(n))return $;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!G(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{lt as A,ut as B,_t as C,mt as D,pt as E,ht as F,Y as G,$ as H,dt as I,S as J,xt as K,M as L,Ot as M,St as N,Nt as O,Bt as P,Mt as Q,At as R,qt as S,gt as a,yt as b,$t as c,Lt as d,bt as e,Dt as f,ct as g,B as h,Wt as i,Tt as j,H as k,wt as l,tt as m,Z as n,jt as o,vt as p,C as q,it as r,ft as s,kt as t,Et as u,zt as v,z as w,Ct as x,Ht as y,Pt as z};
