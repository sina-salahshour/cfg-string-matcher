var qn=Array.isArray,zt=Array.prototype.indexOf,Mn=Array.from,Ln=Object.defineProperty,ct=Object.getOwnPropertyDescriptor,Wt=Object.getOwnPropertyDescriptors,Yn=Object.prototype,jn=Array.prototype,Xt=Object.getPrototypeOf;const Hn=()=>{};function Un(t){return t()}function Jt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,Et=4,H=8,at=16,A=32,U=64,G=128,k=256,K=512,h=1024,x=2048,P=4096,b=8192,F=16384,Qt=32768,yt=65536,Bn=1<<17,tn=1<<19,wt=1<<20,vt=Symbol("$state"),Vn=Symbol("legacy props");function mt(t){return t===this.v}function nn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function Tt(t){return!nn(t,this.v)}function rn(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function en(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function ln(t){throw new Error("https://svelte.dev/e/effect_orphan")}function sn(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function $n(){throw new Error("https://svelte.dev/e/hydration_failed")}function Gn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Kn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Zn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function an(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function un(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let J=!1;function zn(){J=!0}const Wn=1,Xn=2,Jn=16,Qn=1,tr=2,nr=4,rr=8,er=16,lr=1,sr=2,on="[",fn="[!",_n="]",gt={},ar=Symbol();function ut(t,n){var r={f:0,v:t,reactions:null,equals:mt,rv:0,wv:0};return r}function ur(t){return At(ut(t))}function cn(t,n=!1){var e;const r=ut(t);return n||(r.equals=Tt),J&&_!==null&&_.l!==null&&((e=_.l).s??(e.s=[])).push(r),r}function or(t,n=!1){return At(cn(t,n))}function At(t){return u!==null&&u.f&y&&(T===null?Dn([t]):T.push(t)),t}function ir(t,n){return vn(t,Pn(()=>bn(t))),n}function vn(t,n){return u!==null&&Q()&&u.f&(y|at)&&(T===null||!T.includes(t))&&un(),pn(t,n)}function pn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Ut(),xt(t,x),Q()&&f!==null&&f.f&h&&!(f.f&(A|U))&&(g===null?Sn([t]):g.push(t))),n}function xt(t,n){var r=t.reactions;if(r!==null)for(var e=Q(),l=r.length,s=0;s<l;s++){var a=r[s],o=a.f;o&x||!e&&a===f||(m(a,n),o&(h|k)&&(o&y?xt(a,P):nt(a)))}}function Rt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let S=!1;function fr(t){S=t}let w;function M(t){if(t===null)throw Rt(),gt;return w=t}function _r(){return M(O(w))}function cr(t){if(S){if(O(w)!==null)throw Rt(),gt;w=t}}function vr(t=1){if(S){for(var n=t,r=w;n--;)r=O(r);w=r}}function pr(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===_n){if(t===0)return n;t-=1}else(r===on||r===fn)&&(t+=1)}var e=O(n);n.remove(),n=e}}var pt,hn,Dt,St;function hr(){if(pt===void 0){pt=window,hn=document;var t=Element.prototype,n=Node.prototype;Dt=ct(n,"firstChild").get,St=ct(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function rt(t=""){return document.createTextNode(t)}function et(t){return Dt.call(t)}function O(t){return St.call(t)}function dr(t,n){if(!S)return et(t);var r=et(w);if(r===null)r=w.appendChild(rt());else if(n&&r.nodeType!==3){var e=rt();return r==null||r.before(e),M(e),e}return M(r),r}function Er(t,n){if(!S){var r=et(t);return r instanceof Comment&&r.data===""?O(r):r}return w}function yr(t,n=1,r=!1){let e=S?w:t;for(var l;n--;)l=e,e=O(e);if(!S)return e;var s=e==null?void 0:e.nodeType;if(r&&s!==3){var a=rt();return e===null?l==null||l.after(a):e.before(a),M(a),a}return M(e),e}function wr(t){t.textContent=""}function dn(t){var n=y|x;f===null?n|=k:f.f|=wt;var r=u!==null&&u.f&y?u:null;const e={children:null,ctx:_,deps:null,equals:mt,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??f};return r!==null&&(r.children??(r.children=[])).push(e),e}function mr(t){const n=dn(t);return n.equals=Tt,n}function It(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ot(e):I(e)}}}function En(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function kt(t){var n,r=f;W(En(t));try{It(t),n=Vt(t)}finally{W(r)}return n}function Ot(t){var n=kt(t),r=(D||t.f&k)&&t.deps!==null?P:h;m(t,r),t.equals(n)||(t.v=n,t.wv=Ut())}function ot(t){It(t),j(t,0),m(t,F),t.v=t.children=t.deps=t.ctx=t.reactions=null}function Ct(t){f===null&&u===null&&ln(),u!==null&&u.f&k&&en(),it&&rn()}function yn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function q(t,n,r,e=!0){var l=(t&U)!==0,s=f,a={ctx:_,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|x,first:null,fn:n,last:null,next:null,parent:l?null:s,prev:null,teardown:null,transitions:null,wv:0};if(r){var o=C;try{ht(!0),ft(a),a.f|=Qt}catch(v){throw I(a),v}finally{ht(o)}}else n!==null&&nt(a);var c=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(wt|G))===0;if(!c&&!l&&e&&(s!==null&&yn(a,s),u!==null&&u.f&y)){var p=u;(p.children??(p.children=[])).push(a)}return a}function Tr(t){const n=q(H,null,!1);return m(n,h),n.teardown=t,n}function gr(t){Ct();var n=f!==null&&(f.f&A)!==0&&_!==null&&!_.m;if(n){var r=_;(r.e??(r.e=[])).push({fn:t,effect:f,reaction:u})}else{var e=Nt(t);return e}}function Ar(t){return Ct(),wn(t)}function xr(t){const n=q(U,t,!0);return(r={})=>new Promise(e=>{r.outro?gn(n,()=>{I(n),e(void 0)}):(I(n),e(void 0))})}function Nt(t){return q(Et,t,!1)}function wn(t){return q(H,t,!0)}function Rr(t){return mn(t)}function mn(t,n=0){return q(H|at|n,t,!0)}function Dr(t,n=!0){return q(H|A,t,!0,n)}function bt(t){var n=t.teardown;if(n!==null){const r=it,e=u;dt(!0),z(null);try{n.call(null)}finally{dt(r),z(e)}}}function Pt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ot(n[r])}}function Ft(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;I(r,n),r=e}}function Tn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||I(n),n=r}}function I(t,n=!0){var r=!1;if((n||t.f&tn)&&t.nodes_start!==null){for(var e=t.nodes_start,l=t.nodes_end;e!==null;){var s=e===l?null:O(e);e.remove(),e=s}r=!0}Ft(t,n&&!r),Pt(t),j(t,0),m(t,F);var a=t.transitions;if(a!==null)for(const c of a)c.stop();bt(t);var o=t.parent;o!==null&&o.first!==null&&qt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function qt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function gn(t,n){var r=[];Mt(t,r,!0),An(r,()=>{I(t),n&&n()})}function An(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var l of t)l.out(e)}else n()}function Mt(t,n,r){if(!(t.f&b)){if(t.f^=b,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var l=e.next,s=(e.f&yt)!==0||(e.f&A)!==0;Mt(e,n,s?r:!1),e=l}}}function Sr(t){Lt(t,!0)}function Lt(t,n){if(t.f&b){t.f^=b,t.f&h||(t.f^=h),B(t)&&(m(t,x),nt(t));for(var r=t.first;r!==null;){var e=r.next,l=(r.f&yt)!==0||(r.f&A)!==0;Lt(r,l?n:!1),r=e}if(t.transitions!==null)for(const s of t.transitions)(s.is_global||n)&&s.in()}}let Z=!1,lt=[];function Yt(){Z=!1;const t=lt.slice();lt=[],Jt(t)}function Ir(t){Z||(Z=!0,queueMicrotask(Yt)),lt.push(t)}function xn(){Z&&Yt()}const jt=0,Rn=1;let V=!1,$=jt,L=!1,Y=null,C=!1,it=!1;function ht(t){C=t}function dt(t){it=t}let R=[],N=0;let u=null;function z(t){u=t}let f=null;function W(t){f=t}let T=null;function Dn(t){T=t}let d=null,E=0,g=null;function Sn(t){g=t}let Ht=1,X=0,D=!1,_=null;function Ut(){return++Ht}function Q(){return!J||_!==null&&_.l===null}function B(t){var p;var n=t.f;if(n&x)return!0;if(n&P){var r=t.deps,e=(n&k)!==0;if(r!==null){var l,s,a=(n&K)!==0,o=e&&f!==null&&!D,c=r.length;if(a||o){for(l=0;l<c;l++)s=r[l],(a||!((p=s==null?void 0:s.reactions)!=null&&p.includes(t)))&&(s.reactions??(s.reactions=[])).push(t);a&&(t.f^=K)}for(l=0;l<c;l++)if(s=r[l],B(s)&&Ot(s),s.wv>t.wv)return!0}(!e||f!==null&&!D)&&m(t,h)}return!1}function In(t,n){for(var r=n;r!==null;){if(r.f&G)try{r.fn(t);return}catch{r.f^=G}r=r.parent}throw V=!1,t}function kn(t){return(t.f&F)===0&&(t.parent===null||(t.parent.f&G)===0)}function tt(t,n,r,e){if(V){if(r===null&&(V=!1),kn(n))throw t;return}r!==null&&(V=!0);{In(t,n);return}}function Bt(t,n,r=0){var e=t.reactions;if(e!==null)for(var l=0;l<e.length;l++){var s=e[l];s.f&y?Bt(s,n,r+1):n===s&&(r===0?m(s,x):s.f&h&&m(s,P),nt(s))}}function Vt(t){var _t;var n=d,r=E,e=g,l=u,s=D,a=T,o=_,c=t.f;d=null,E=0,g=null,u=c&(A|U)?null:t,D=!C&&(c&k)!==0,T=null,_=t.ctx,X++;try{var p=(0,t.fn)(),v=t.deps;if(d!==null){var i;if(j(t,E),v!==null&&E>0)for(v.length=E+d.length,i=0;i<d.length;i++)v[E+i]=d[i];else t.deps=v=d;if(!D)for(i=E;i<v.length;i++)((_t=v[i]).reactions??(_t.reactions=[])).push(t)}else v!==null&&E<v.length&&(j(t,E),v.length=E);if(Q()&&g!==null&&!(t.f&(y|P|x)))for(i=0;i<g.length;i++)Bt(g[i],t);return l!==null&&X++,p}finally{d=n,E=r,g=e,u=l,D=s,T=a,_=o}}function On(t,n){let r=n.reactions;if(r!==null){var e=zt.call(r,t);if(e!==-1){var l=r.length-1;l===0?r=n.reactions=null:(r[e]=r[l],r.pop())}}r===null&&n.f&y&&(d===null||!d.includes(n))&&(m(n,P),n.f&(k|K)||(n.f^=K),j(n,0))}function j(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)On(t,r[e])}function ft(t){var n=t.f;if(!(n&F)){m(t,h);var r=f,e=_;f=t;try{n&at?Tn(t):Ft(t),Pt(t),bt(t);var l=Vt(t);t.teardown=typeof l=="function"?l:null,t.wv=Ht;var s=t.deps,a}catch(o){tt(o,t,r,e||t.ctx)}finally{f=r}}}function $t(){if(N>1e3){N=0;try{sn()}catch(t){if(Y!==null)tt(t,Y,null);else throw t}}N++}function Gt(t){var n=t.length;if(n!==0){$t();var r=C;C=!0;try{for(var e=0;e<n;e++){var l=t[e];l.f&h||(l.f^=h);var s=[];Kt(l,s),Cn(s)}}finally{C=r}}}function Cn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(F|b)))try{B(e)&&(ft(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?qt(e):e.fn=null))}catch(l){tt(l,e,null,e.ctx)}}}function Nn(){if(L=!1,N>1001)return;const t=R;R=[],Gt(t),L||(N=0,Y=null)}function nt(t){$===jt&&(L||(L=!0,queueMicrotask(Nn))),Y=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(U|A)){if(!(r&h))return;n.f^=h}}R.push(n)}function Kt(t,n){var r=t.first,e=[];t:for(;r!==null;){var l=r.f,s=(l&A)!==0,a=s&&(l&h)!==0,o=r.next;if(!a&&!(l&b))if(l&H){if(s)r.f^=h;else try{B(r)&&ft(r)}catch(i){tt(i,r,null,r.ctx)}var c=r.first;if(c!==null){r=c;continue}}else l&Et&&e.push(r);if(o===null){let i=r.parent;for(;i!==null;){if(t===i)break t;var p=i.next;if(p!==null){r=p;continue t}i=i.parent}}r=o}for(var v=0;v<e.length;v++)c=e[v],n.push(c),Kt(c,n)}function Zt(t){var n=$,r=R;try{$t();const l=[];$=Rn,R=l,L=!1,Gt(r);var e=t==null?void 0:t();return xn(),(R.length>0||l.length>0)&&Zt(),N=0,Y=null,e}finally{$=n,R=r}}async function kr(){await Promise.resolve(),Zt()}function bn(t){var v;var n=t.f,r=(n&y)!==0;if(r&&n&F){var e=kt(t);return ot(t),e}if(u!==null){T!==null&&T.includes(t)&&an();var l=u.deps;t.rv<X&&(t.rv=X,d===null&&l!==null&&l[E]===t?E++:d===null?d=[t]:d.push(t))}else if(r&&t.deps===null)for(var s=t,a=s.parent,o=s;a!==null;)if(a.f&y){var c=a;o=c,a=c.parent}else{var p=a;(v=p.deriveds)!=null&&v.includes(o)||(p.deriveds??(p.deriveds=[])).push(o);break}return r&&(s=t,B(s)&&Ot(s)),t.v}function Pn(t){const n=u;try{return u=null,t()}finally{u=n}}const Fn=-7169;function m(t,n){t.f=t.f&Fn|n}function Or(t,n=!1,r){_={p:_,c:null,e:null,m:!1,s:t,x:null,l:null},J&&!n&&(_.l={s:null,u:null,r1:[],r2:ut(!1)})}function Cr(t){const n=_;if(n!==null){const a=n.e;if(a!==null){var r=f,e=u;n.e=null;try{for(var l=0;l<a.length;l++){var s=a[l];W(s.effect),z(s.reaction),Nt(s.fn)}}finally{W(r),z(e)}}_=n.p,n.m=!0}return{}}function Nr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(vt in t)st(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&vt in r&&st(r)}}}function st(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{st(t[e],n)}catch{}const r=Xt(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=Wt(r);for(let l in e){const s=e[l].get;if(s)try{s.call(t)}catch{}}}}}export{A as $,Yn as A,jn as B,ut as C,Kn as D,vn as E,ct as F,Zn as G,Xt as H,qn as I,mn as J,yt as K,fn as L,pr as M,fr as N,Sr as O,Dr as P,gn as Q,Nt as R,vt as S,lr as T,ar as U,wn as V,Ir as W,Gn as X,Bn as Y,nr as Z,Tt as _,gr as a,U as a0,W as a1,Qn as a2,tr as a3,rr as a4,Vn as a5,mr as a6,cn as a7,er as a8,wr as a9,Q as aA,or as aB,hn as aC,vr as aD,ir as aE,nn as aF,z as aa,u as ab,Tr as ac,Ln as ad,tn as ae,on as af,O as ag,hr as ah,gt as ai,_n as aj,Rt as ak,$n as al,Mn as am,xr as an,Zt as ao,kr as ap,ur as aq,b as ar,pn as as,Mt as at,An as au,I as av,Xn as aw,Wn as ax,Jn as ay,Hn as az,Pn as b,_ as c,Jt as d,Nr as e,dn as f,bn as g,zn as h,Er as i,Cr as j,dr as k,J as l,cr as m,S as n,_r as o,Or as p,rt as q,Un as r,yr as s,Rr as t,Ar as u,et as v,f as w,sr as x,w as y,M as z};
