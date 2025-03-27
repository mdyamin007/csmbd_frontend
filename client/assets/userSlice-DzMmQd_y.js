import{r as v}from"./chunk-GNGMS2XR-BTyGsKOQ.js";var Ee={exports:{}},Pe={};/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var B=v;function We(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ke=typeof Object.is=="function"?Object.is:We,He=B.useSyncExternalStore,Ve=B.useRef,Xe=B.useEffect,Ge=B.useMemo,qe=B.useDebugValue;Pe.useSyncExternalStoreWithSelector=function(e,t,r,n,i){var o=Ve(null);if(o.current===null){var u={hasValue:!1,value:null};o.current=u}else u=o.current;o=Ge(function(){function c(h){if(!a){if(a=!0,f=h,h=n(h),i!==void 0&&u.hasValue){var _=u.value;if(i(_,h))return l=_}return l=h}if(_=l,Ke(f,h))return _;var T=n(h);return i!==void 0&&i(_,T)?(f=h,_):(f=h,l=T)}var a=!1,f,l,y=r===void 0?null:r;return[function(){return c(t())},y===null?void 0:function(){return c(y())}]},[t,r,n,i]);var s=He(e,o[0],o[1]);return Xe(function(){u.hasValue=!0,u.value=s},[s]),qe(s),s};Ee.exports=Pe;var Qe=Ee.exports;function Je(e){e()}function Ye(){let e=null,t=null;return{clear(){e=null,t=null},notify(){Je(()=>{let r=e;for(;r;)r.callback(),r=r.next})},get(){const r=[];let n=e;for(;n;)r.push(n),n=n.next;return r},subscribe(r){let n=!0;const i=t={callback:r,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){!n||e===null||(n=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var ye={notify(){},get:()=>[]};function Ze(e,t){let r,n=ye,i=0,o=!1;function u(T){f();const b=n.subscribe(T);let m=!1;return()=>{m||(m=!0,b(),l())}}function s(){n.notify()}function c(){_.onStateChange&&_.onStateChange()}function a(){return o}function f(){i++,r||(r=e.subscribe(c),n=Ye())}function l(){i--,r&&i===0&&(r(),r=void 0,n.clear(),n=ye)}function y(){o||(o=!0,f())}function h(){o&&(o=!1,l())}const _={addNestedSub:u,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:a,trySubscribe:y,tryUnsubscribe:h,getListeners:()=>n};return _}var et=()=>typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",tt=et(),rt=()=>typeof navigator<"u"&&navigator.product==="ReactNative",nt=rt(),it=()=>tt||nt?v.useLayoutEffect:v.useEffect,ot=it(),J=Symbol.for("react-redux-context"),Y=typeof globalThis<"u"?globalThis:{};function ut(){if(!v.createContext)return{};const e=Y[J]??(Y[J]=new Map);let t=e.get(v.createContext);return t||(t=v.createContext(null),e.set(v.createContext,t)),t}var k=ut();function st(e){const{children:t,context:r,serverState:n,store:i}=e,o=v.useMemo(()=>{const c=Ze(i);return{store:i,subscription:c,getServerState:n?()=>n:void 0}},[i,n]),u=v.useMemo(()=>i.getState(),[i]);ot(()=>{const{subscription:c}=o;return c.onStateChange=c.notifyNestedSubs,c.trySubscribe(),u!==i.getState()&&c.notifyNestedSubs(),()=>{c.tryUnsubscribe(),c.onStateChange=void 0}},[o,u]);const s=r||k;return v.createElement(s.Provider,{value:o},t)}var Qt=st;function ce(e=k){return function(){return v.useContext(e)}}var Re=ce();function xe(e=k){const t=e===k?Re:ce(e),r=()=>{const{store:n}=t();return n};return Object.assign(r,{withTypes:()=>r}),r}var ct=xe();function ft(e=k){const t=e===k?ct:xe(e),r=()=>t().dispatch;return Object.assign(r,{withTypes:()=>r}),r}var Jt=ft(),at=(e,t)=>e===t;function lt(e=k){const t=e===k?Re:ce(e),r=(n,i={})=>{const{equalityFn:o=at}=typeof i=="function"?{equalityFn:i}:i,u=t(),{store:s,subscription:c,getServerState:a}=u;v.useRef(!0);const f=v.useCallback({[n.name](y){return n(y)}}[n.name],[n]),l=Qe.useSyncExternalStoreWithSelector(c.addNestedSub,s.getState,a||s.getState,f,o);return v.useDebugValue(l),l};return Object.assign(r,{withTypes:()=>r}),r}var Yt=lt();function w(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var dt=typeof Symbol=="function"&&Symbol.observable||"@@observable",he=dt,Z=()=>Math.random().toString(36).substring(7).split("").join("."),yt={INIT:`@@redux/INIT${Z()}`,REPLACE:`@@redux/REPLACE${Z()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${Z()}`},L=yt;function fe(e){if(typeof e!="object"||e===null)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Oe(e,t,r){if(typeof e!="function")throw new Error(w(2));if(typeof t=="function"&&typeof r=="function"||typeof r=="function"&&typeof arguments[3]=="function")throw new Error(w(0));if(typeof t=="function"&&typeof r>"u"&&(r=t,t=void 0),typeof r<"u"){if(typeof r!="function")throw new Error(w(1));return r(Oe)(e,t)}let n=e,i=t,o=new Map,u=o,s=0,c=!1;function a(){u===o&&(u=new Map,o.forEach((b,m)=>{u.set(m,b)}))}function f(){if(c)throw new Error(w(3));return i}function l(b){if(typeof b!="function")throw new Error(w(4));if(c)throw new Error(w(5));let m=!0;a();const R=s++;return u.set(R,b),function(){if(m){if(c)throw new Error(w(6));m=!1,a(),u.delete(R),o=null}}}function y(b){if(!fe(b))throw new Error(w(7));if(typeof b.type>"u")throw new Error(w(8));if(typeof b.type!="string")throw new Error(w(17));if(c)throw new Error(w(9));try{c=!0,i=n(i,b)}finally{c=!1}return(o=u).forEach(R=>{R()}),b}function h(b){if(typeof b!="function")throw new Error(w(10));n=b,y({type:L.REPLACE})}function _(){const b=l;return{subscribe(m){if(typeof m!="object"||m===null)throw new Error(w(11));function R(){const p=m;p.next&&p.next(f())}return R(),{unsubscribe:b(R)}},[he](){return this}}}return y({type:L.INIT}),{dispatch:y,subscribe:l,getState:f,replaceReducer:h,[he]:_}}function ht(e){Object.keys(e).forEach(t=>{const r=e[t];if(typeof r(void 0,{type:L.INIT})>"u")throw new Error(w(12));if(typeof r(void 0,{type:L.PROBE_UNKNOWN_ACTION()})>"u")throw new Error(w(13))})}function pt(e){const t=Object.keys(e),r={};for(let o=0;o<t.length;o++){const u=t[o];typeof e[u]=="function"&&(r[u]=e[u])}const n=Object.keys(r);let i;try{ht(r)}catch(o){i=o}return function(u={},s){if(i)throw i;let c=!1;const a={};for(let f=0;f<n.length;f++){const l=n[f],y=r[l],h=u[l],_=y(h,s);if(typeof _>"u")throw s&&s.type,new Error(w(14));a[l]=_,c=c||_!==h}return c=c||n.length!==Object.keys(u).length,c?a:u}}function W(...e){return e.length===0?t=>t:e.length===1?e[0]:e.reduce((t,r)=>(...n)=>t(r(...n)))}function _t(...e){return t=>(r,n)=>{const i=t(r,n);let o=()=>{throw new Error(w(15))};const u={getState:i.getState,dispatch:(c,...a)=>o(c,...a)},s=e.map(c=>c(u));return o=W(...s)(i.dispatch),{...i,dispatch:o}}}function bt(e){return fe(e)&&"type"in e&&typeof e.type=="string"}var De=Symbol.for("immer-nothing"),pe=Symbol.for("immer-draftable"),C=Symbol.for("immer-state");function P(e,...t){throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var I=Object.getPrototypeOf;function N(e){return!!e&&!!e[C]}function D(e){var t;return e?Te(e)||Array.isArray(e)||!!e[pe]||!!((t=e.constructor)!=null&&t[pe])||G(e)||q(e):!1}var wt=Object.prototype.constructor.toString();function Te(e){if(!e||typeof e!="object")return!1;const t=I(e);if(t===null)return!0;const r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object?!0:typeof r=="function"&&Function.toString.call(r)===wt}function K(e,t){X(e)===0?Reflect.ownKeys(e).forEach(r=>{t(r,e[r],e)}):e.forEach((r,n)=>t(n,r,e))}function X(e){const t=e[C];return t?t.type_:Array.isArray(e)?1:G(e)?2:q(e)?3:0}function re(e,t){return X(e)===2?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function Me(e,t,r){const n=X(e);n===2?e.set(t,r):n===3?e.add(r):e[t]=r}function mt(e,t){return e===t?e!==0||1/e===1/t:e!==e&&t!==t}function G(e){return e instanceof Map}function q(e){return e instanceof Set}function A(e){return e.copy_||e.base_}function ne(e,t){if(G(e))return new Map(e);if(q(e))return new Set(e);if(Array.isArray(e))return Array.prototype.slice.call(e);const r=Te(e);if(t===!0||t==="class_only"&&!r){const n=Object.getOwnPropertyDescriptors(e);delete n[C];let i=Reflect.ownKeys(n);for(let o=0;o<i.length;o++){const u=i[o],s=n[u];s.writable===!1&&(s.writable=!0,s.configurable=!0),(s.get||s.set)&&(n[u]={configurable:!0,writable:!0,enumerable:s.enumerable,value:e[u]})}return Object.create(I(e),n)}else{const n=I(e);if(n!==null&&r)return{...e};const i=Object.create(n);return Object.assign(i,e)}}function ae(e,t=!1){return Q(e)||N(e)||!D(e)||(X(e)>1&&(e.set=e.add=e.clear=e.delete=gt),Object.freeze(e),t&&Object.entries(e).forEach(([r,n])=>ae(n,!0))),e}function gt(){P(2)}function Q(e){return Object.isFrozen(e)}var St={};function z(e){const t=St[e];return t||P(0,e),t}var F;function ke(){return F}function vt(e,t){return{drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0}}function _e(e,t){t&&(z("Patches"),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function ie(e){oe(e),e.drafts_.forEach(Ct),e.drafts_=null}function oe(e){e===F&&(F=e.parent_)}function be(e){return F=vt(F,e)}function Ct(e){const t=e[C];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function we(e,t){t.unfinalizedDrafts_=t.drafts_.length;const r=t.drafts_[0];return e!==void 0&&e!==r?(r[C].modified_&&(ie(t),P(4)),D(e)&&(e=H(t,e),t.parent_||V(t,e)),t.patches_&&z("Patches").generateReplacementPatches_(r[C].base_,e,t.patches_,t.inversePatches_)):e=H(t,r,[]),ie(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e!==De?e:void 0}function H(e,t,r){if(Q(t))return t;const n=t[C];if(!n)return K(t,(i,o)=>me(e,n,t,i,o,r)),t;if(n.scope_!==e)return t;if(!n.modified_)return V(e,n.base_,!0),n.base_;if(!n.finalized_){n.finalized_=!0,n.scope_.unfinalizedDrafts_--;const i=n.copy_;let o=i,u=!1;n.type_===3&&(o=new Set(i),i.clear(),u=!0),K(o,(s,c)=>me(e,n,i,s,c,r,u)),V(e,i,!1),r&&e.patches_&&z("Patches").generatePatches_(n,r,e.patches_,e.inversePatches_)}return n.copy_}function me(e,t,r,n,i,o,u){if(N(i)){const s=o&&t&&t.type_!==3&&!re(t.assigned_,n)?o.concat(n):void 0,c=H(e,i,s);if(Me(r,n,c),N(c))e.canAutoFreeze_=!1;else return}else u&&r.add(i);if(D(i)&&!Q(i)){if(!e.immer_.autoFreeze_&&e.unfinalizedDrafts_<1)return;H(e,i),(!t||!t.scope_.parent_)&&typeof n!="symbol"&&Object.prototype.propertyIsEnumerable.call(r,n)&&V(e,i)}}function V(e,t,r=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&ae(t,r)}function Et(e,t){const r=Array.isArray(e),n={type_:r?1:0,scope_:t?t.scope_:ke(),modified_:!1,finalized_:!1,assigned_:{},parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1};let i=n,o=le;r&&(i=[n],o=U);const{revoke:u,proxy:s}=Proxy.revocable(i,o);return n.draft_=s,n.revoke_=u,s}var le={get(e,t){if(t===C)return e;const r=A(e);if(!re(r,t))return Pt(e,r,t);const n=r[t];return e.finalized_||!D(n)?n:n===ee(e.base_,t)?(te(e),e.copy_[t]=se(n,e)):n},has(e,t){return t in A(e)},ownKeys(e){return Reflect.ownKeys(A(e))},set(e,t,r){const n=Ae(A(e),t);if(n!=null&&n.set)return n.set.call(e.draft_,r),!0;if(!e.modified_){const i=ee(A(e),t),o=i==null?void 0:i[C];if(o&&o.base_===r)return e.copy_[t]=r,e.assigned_[t]=!1,!0;if(mt(r,i)&&(r!==void 0||re(e.base_,t)))return!0;te(e),ue(e)}return e.copy_[t]===r&&(r!==void 0||t in e.copy_)||Number.isNaN(r)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=r,e.assigned_[t]=!0),!0},deleteProperty(e,t){return ee(e.base_,t)!==void 0||t in e.base_?(e.assigned_[t]=!1,te(e),ue(e)):delete e.assigned_[t],e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){const r=A(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n&&{writable:!0,configurable:e.type_!==1||t!=="length",enumerable:n.enumerable,value:r[t]}},defineProperty(){P(11)},getPrototypeOf(e){return I(e.base_)},setPrototypeOf(){P(12)}},U={};K(le,(e,t)=>{U[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}});U.deleteProperty=function(e,t){return U.set.call(this,e,t,void 0)};U.set=function(e,t,r){return le.set.call(this,e[0],t,r,e[0])};function ee(e,t){const r=e[C];return(r?A(r):e)[t]}function Pt(e,t,r){var i;const n=Ae(t,r);return n?"value"in n?n.value:(i=n.get)==null?void 0:i.call(e.draft_):void 0}function Ae(e,t){if(!(t in e))return;let r=I(e);for(;r;){const n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=I(r)}}function ue(e){e.modified_||(e.modified_=!0,e.parent_&&ue(e.parent_))}function te(e){e.copy_||(e.copy_=ne(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var Rt=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.produce=(t,r,n)=>{if(typeof t=="function"&&typeof r!="function"){const o=r;r=t;const u=this;return function(c=o,...a){return u.produce(c,f=>r.call(this,f,...a))}}typeof r!="function"&&P(6),n!==void 0&&typeof n!="function"&&P(7);let i;if(D(t)){const o=be(this),u=se(t,void 0);let s=!0;try{i=r(u),s=!1}finally{s?ie(o):oe(o)}return _e(o,n),we(i,o)}else if(!t||typeof t!="object"){if(i=r(t),i===void 0&&(i=t),i===De&&(i=void 0),this.autoFreeze_&&ae(i,!0),n){const o=[],u=[];z("Patches").generateReplacementPatches_(t,i,o,u),n(o,u)}return i}else P(1,t)},this.produceWithPatches=(t,r)=>{if(typeof t=="function")return(u,...s)=>this.produceWithPatches(u,c=>t(c,...s));let n,i;return[this.produce(t,r,(u,s)=>{n=u,i=s}),n,i]},typeof(e==null?void 0:e.autoFreeze)=="boolean"&&this.setAutoFreeze(e.autoFreeze),typeof(e==null?void 0:e.useStrictShallowCopy)=="boolean"&&this.setUseStrictShallowCopy(e.useStrictShallowCopy)}createDraft(e){D(e)||P(8),N(e)&&(e=xt(e));const t=be(this),r=se(e,void 0);return r[C].isManual_=!0,oe(t),r}finishDraft(e,t){const r=e&&e[C];(!r||!r.isManual_)&&P(9);const{scope_:n}=r;return _e(n,t),we(void 0,n)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}applyPatches(e,t){let r;for(r=t.length-1;r>=0;r--){const i=t[r];if(i.path.length===0&&i.op==="replace"){e=i.value;break}}r>-1&&(t=t.slice(r+1));const n=z("Patches").applyPatches_;return N(e)?n(e,t):this.produce(e,i=>n(i,t))}};function se(e,t){const r=G(e)?z("MapSet").proxyMap_(e,t):q(e)?z("MapSet").proxySet_(e,t):Et(e,t);return(t?t.scope_:ke()).drafts_.push(r),r}function xt(e){return N(e)||P(10,e),Ne(e)}function Ne(e){if(!D(e)||Q(e))return e;const t=e[C];let r;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,r=ne(e,t.scope_.immer_.useStrictShallowCopy_)}else r=ne(e,!0);return K(r,(n,i)=>{Me(r,n,Ne(i))}),t&&(t.finalized_=!1),r}var E=new Rt,ze=E.produce;E.produceWithPatches.bind(E);E.setAutoFreeze.bind(E);E.setUseStrictShallowCopy.bind(E);E.applyPatches.bind(E);E.createDraft.bind(E);E.finishDraft.bind(E);function Ie(e){return({dispatch:r,getState:n})=>i=>o=>typeof o=="function"?o(r,n,e):i(o)}var Ot=Ie(),Dt=Ie,Tt=typeof window<"u"&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]=="object"?W:W.apply(null,arguments)};function ge(e,t){function r(...n){if(t){let i=t(...n);if(!i)throw new Error(O(0));return{type:e,payload:i.payload,..."meta"in i&&{meta:i.meta},..."error"in i&&{error:i.error}}}return{type:e,payload:n[0]}}return r.toString=()=>`${e}`,r.type=e,r.match=n=>bt(n)&&n.type===e,r}var je=class j extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,j.prototype)}static get[Symbol.species](){return j}concat(...t){return super.concat.apply(this,t)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new j(...t[0].concat(this)):new j(...t.concat(this))}};function Se(e){return D(e)?ze(e,()=>{}):e}function ve(e,t,r){return e.has(t)?e.get(t):e.set(t,r(t)).get(t)}function Mt(e){return typeof e=="boolean"}var kt=()=>function(t){const{thunk:r=!0,immutableCheck:n=!0,serializableCheck:i=!0,actionCreatorCheck:o=!0}=t??{};let u=new je;return r&&(Mt(r)?u.push(Ot):u.push(Dt(r.extraArgument))),u},At="RTK_autoBatch",Ce=e=>t=>{setTimeout(t,e)},Nt=(e={type:"raf"})=>t=>(...r)=>{const n=t(...r);let i=!0,o=!1,u=!1;const s=new Set,c=e.type==="tick"?queueMicrotask:e.type==="raf"?typeof window<"u"&&window.requestAnimationFrame?window.requestAnimationFrame:Ce(10):e.type==="callback"?e.queueNotification:Ce(e.timeout),a=()=>{u=!1,o&&(o=!1,s.forEach(f=>f()))};return Object.assign({},n,{subscribe(f){const l=()=>i&&f(),y=n.subscribe(l);return s.add(f),()=>{y(),s.delete(f)}},dispatch(f){var l;try{return i=!((l=f==null?void 0:f.meta)!=null&&l[At]),o=!i,o&&(u||(u=!0,c(a))),n.dispatch(f)}finally{i=!0}}})},zt=e=>function(r){const{autoBatch:n=!0}=r??{};let i=new je(e);return n&&i.push(Nt(typeof n=="object"?n:void 0)),i};function Zt(e){const t=kt(),{reducer:r=void 0,middleware:n,devTools:i=!0,preloadedState:o=void 0,enhancers:u=void 0}=e||{};let s;if(typeof r=="function")s=r;else if(fe(r))s=pt(r);else throw new Error(O(1));let c;typeof n=="function"?c=n(t):c=t();let a=W;i&&(a=Tt({trace:!1,...typeof i=="object"&&i}));const f=_t(...c),l=zt(f);let y=typeof u=="function"?u(l):l();const h=a(...y);return Oe(s,o,h)}function Fe(e){const t={},r=[];let n;const i={addCase(o,u){const s=typeof o=="string"?o:o.type;if(!s)throw new Error(O(28));if(s in t)throw new Error(O(29));return t[s]=u,i},addMatcher(o,u){return r.push({matcher:o,reducer:u}),i},addDefaultCase(o){return n=o,i}};return e(i),[t,r,n]}function It(e){return typeof e=="function"}function jt(e,t){let[r,n,i]=Fe(t),o;if(It(e))o=()=>Se(e());else{const s=Se(e);o=()=>s}function u(s=o(),c){let a=[r[c.type],...n.filter(({matcher:f})=>f(c)).map(({reducer:f})=>f)];return a.filter(f=>!!f).length===0&&(a=[i]),a.reduce((f,l)=>{if(l)if(N(f)){const h=l(f,c);return h===void 0?f:h}else{if(D(f))return ze(f,y=>l(y,c));{const y=l(f,c);if(y===void 0){if(f===null)return f;throw Error("A case reducer on a non-draftable value must not return undefined")}return y}}return f},s)}return u.getInitialState=o,u}var Ft=Symbol.for("rtk-slice-createasyncthunk");function Ut(e,t){return`${e}/${t}`}function Bt({creators:e}={}){var r;const t=(r=e==null?void 0:e.asyncThunk)==null?void 0:r[Ft];return function(i){const{name:o,reducerPath:u=o}=i;if(!o)throw new Error(O(11));const s=(typeof i.reducers=="function"?i.reducers(Wt()):i.reducers)||{},c=Object.keys(s),a={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},f={addCase(d,p){const g=typeof d=="string"?d:d.type;if(!g)throw new Error(O(12));if(g in a.sliceCaseReducersByType)throw new Error(O(13));return a.sliceCaseReducersByType[g]=p,f},addMatcher(d,p){return a.sliceMatchers.push({matcher:d,reducer:p}),f},exposeAction(d,p){return a.actionCreators[d]=p,f},exposeCaseReducer(d,p){return a.sliceCaseReducersByName[d]=p,f}};c.forEach(d=>{const p=s[d],g={reducerName:d,type:Ut(o,d),createNotation:typeof i.reducers=="function"};Ht(p)?Xt(g,p,f,t):Kt(g,p,f)});function l(){const[d={},p=[],g=void 0]=typeof i.extraReducers=="function"?Fe(i.extraReducers):[i.extraReducers],M={...d,...a.sliceCaseReducersByType};return jt(i.initialState,x=>{for(let S in M)x.addCase(S,M[S]);for(let S of a.sliceMatchers)x.addMatcher(S.matcher,S.reducer);for(let S of p)x.addMatcher(S.matcher,S.reducer);g&&x.addDefaultCase(g)})}const y=d=>d,h=new Map;let _;function T(d,p){return _||(_=l()),_(d,p)}function b(){return _||(_=l()),_.getInitialState()}function m(d,p=!1){function g(x){let S=x[d];return typeof S>"u"&&p&&(S=b()),S}function M(x=y){const S=ve(h,p,()=>new WeakMap);return ve(S,x,()=>{const de={};for(const[$e,Le]of Object.entries(i.selectors??{}))de[$e]=$t(Le,x,b,p);return de})}return{reducerPath:d,getSelectors:M,get selectors(){return M(g)},selectSlice:g}}const R={name:o,reducer:T,actions:a.actionCreators,caseReducers:a.sliceCaseReducersByName,getInitialState:b,...m(u),injectInto(d,{reducerPath:p,...g}={}){const M=p??u;return d.inject({reducerPath:M,reducer:T},g),{...R,...m(M,!0)}}};return R}}function $t(e,t,r,n){function i(o,...u){let s=t(o);return typeof s>"u"&&n&&(s=r()),e(s,...u)}return i.unwrapped=e,i}var Lt=Bt();function Wt(){function e(t,r){return{_reducerDefinitionType:"asyncThunk",payloadCreator:t,...r}}return e.withTypes=()=>e,{reducer(t){return Object.assign({[t.name](...r){return t(...r)}}[t.name],{_reducerDefinitionType:"reducer"})},preparedReducer(t,r){return{_reducerDefinitionType:"reducerWithPrepare",prepare:t,reducer:r}},asyncThunk:e}}function Kt({type:e,reducerName:t,createNotation:r},n,i){let o,u;if("reducer"in n){if(r&&!Vt(n))throw new Error(O(17));o=n.reducer,u=n.prepare}else o=n;i.addCase(e,o).exposeCaseReducer(t,o).exposeAction(t,u?ge(e,u):ge(e))}function Ht(e){return e._reducerDefinitionType==="asyncThunk"}function Vt(e){return e._reducerDefinitionType==="reducerWithPrepare"}function Xt({type:e,reducerName:t},r,n,i){if(!i)throw new Error(O(18));const{payloadCreator:o,fulfilled:u,pending:s,rejected:c,settled:a,options:f}=r,l=i(e,o,f);n.exposeAction(t,l),u&&n.addCase(l.fulfilled,u),s&&n.addCase(l.pending,s),c&&n.addCase(l.rejected,c),a&&n.addMatcher(l.settled,a),n.exposeCaseReducer(t,{fulfilled:u||$,pending:s||$,rejected:c||$,settled:a||$})}function $(){}function O(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}const Ue={id:"",username:"",email:""},Gt={user:Ue,isAuthenticated:!1},Be=Lt({name:"user",initialState:Gt,reducers:{setUser:(e,t)=>{e.user={...e.user,...t.payload},e.isAuthenticated=!0},resetUser:e=>{e.user=Ue,e.isAuthenticated=!1}}}),{setUser:er,resetUser:tr}=Be.actions,rr=e=>e.user,nr=Be.reducer;export{Qt as P,Yt as a,rr as b,Oe as c,pt as d,nr as e,Zt as f,tr as r,er as s,Jt as u};
