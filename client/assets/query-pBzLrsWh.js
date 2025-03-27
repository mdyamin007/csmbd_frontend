var $=s=>{throw TypeError(s)};var E=(s,t,e)=>t.has(s)||$("Cannot "+e);var i=(s,t,e)=>(E(s,t,"read from private field"),e?e.call(s):t.get(s)),S=(s,t,e)=>t.has(s)?$("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(s):t.set(s,e),b=(s,t,e,r)=>(E(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e),x=(s,t,e)=>(E(s,t,"access private method"),e);import{r as d,j as I}from"./chunk-GNGMS2XR-BTyGsKOQ.js";import{R as K,r as T,a as j,b as _,s as k,t as Q,c as H,n as B,e as L,i as M,d as N}from"./QueryClientProvider-Qv7QOnvw.js";function Z(s,t){const e=d.createContext(t),r=l=>{const{children:a,...h}=l,f=d.useMemo(()=>h,Object.values(h));return I.jsx(e.Provider,{value:f,children:a})};r.displayName=s+"Provider";function u(l){const a=d.useContext(e);if(a)return a;if(t!==void 0)return t;throw new Error(`\`${l}\` must be used within \`${s}\``)}return[r,u]}function tt(s,t=[]){let e=[];function r(l,a){const h=d.createContext(a),f=e.length;e=[...e,a];const g=n=>{var O;const{scope:o,children:C,...y}=n,m=((O=o==null?void 0:o[s])==null?void 0:O[f])||h,P=d.useMemo(()=>y,Object.values(y));return I.jsx(m.Provider,{value:P,children:C})};g.displayName=l+"Provider";function w(n,o){var m;const C=((m=o==null?void 0:o[s])==null?void 0:m[f])||h,y=d.useContext(C);if(y)return y;if(a!==void 0)return a;throw new Error(`\`${n}\` must be used within \`${l}\``)}return[g,w]}const u=()=>{const l=e.map(a=>d.createContext(a));return function(h){const f=(h==null?void 0:h[s])||l;return d.useMemo(()=>({[`__scope${s}`]:{...h,[s]:f}}),[h,f])}};return u.scopeName=s,[r,W(u,...t)]}function W(...s){const t=s[0];if(s.length===1)return t;const e=()=>{const r=s.map(u=>({useScope:u(),scopeName:u.scopeName}));return function(l){const a=r.reduce((h,{useScope:f,scopeName:g})=>{const n=f(l)[`__scope${g}`];return{...h,...n}},{});return d.useMemo(()=>({[`__scope${t.scopeName}`]:a}),[a])}};return e.scopeName=t.scopeName,e}function et(s){const t=d.useRef(s);return d.useEffect(()=>{t.current=s}),d.useMemo(()=>(...e)=>{var r;return(r=t.current)==null?void 0:r.call(t,...e)},[])}var st=globalThis!=null&&globalThis.document?d.useLayoutEffect:()=>{},D,q,p,U,c,A,R,v,F,G,rt=(G=class extends K{constructor(t){super();S(this,v);S(this,D);S(this,q);S(this,p);S(this,U);S(this,c);S(this,A);S(this,R);b(this,R,!1),b(this,A,t.defaultOptions),this.setOptions(t.options),this.observers=[],b(this,U,t.client),b(this,p,i(this,U).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,b(this,D,J(this.options)),this.state=t.state??i(this,D),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=i(this,c))==null?void 0:t.promise}setOptions(t){this.options={...i(this,A),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&i(this,p).remove(this)}setData(t,e){const r=T(this.state.data,t,this.options);return x(this,v,F).call(this,{data:r,type:"success",dataUpdatedAt:e==null?void 0:e.updatedAt,manual:e==null?void 0:e.manual}),r}setState(t,e){x(this,v,F).call(this,{type:"setState",state:t,setStateOptions:e})}cancel(t){var r,u;const e=(r=i(this,c))==null?void 0:r.promise;return(u=i(this,c))==null||u.cancel(t),e?e.then(j).catch(j):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(i(this,D))}isActive(){return this.observers.some(t=>_(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===k||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!Q(this.state.dataUpdatedAt,t)}onFocus(){var e;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(e=i(this,c))==null||e.continue()}onOnline(){var e;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(e=i(this,c))==null||e.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),i(this,p).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(i(this,c)&&(i(this,R)?i(this,c).cancel({revert:!0}):i(this,c).cancelRetry()),this.scheduleGc()),i(this,p).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||x(this,v,F).call(this,{type:"invalidate"})}fetch(t,e){var f,g,w;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(e!=null&&e.cancelRefetch))this.cancel({silent:!0});else if(i(this,c))return i(this,c).continueRetry(),i(this,c).promise}if(t&&this.setOptions(t),!this.options.queryFn){const n=this.observers.find(o=>o.options.queryFn);n&&this.setOptions(n.options)}const r=new AbortController,u=n=>{Object.defineProperty(n,"signal",{enumerable:!0,get:()=>(b(this,R,!0),r.signal)})},l=()=>{const n=L(this.options,e),o={client:i(this,U),queryKey:this.queryKey,meta:this.meta};return u(o),b(this,R,!1),this.options.persister?this.options.persister(n,o,this):n(o)},a={fetchOptions:e,options:this.options,queryKey:this.queryKey,client:i(this,U),state:this.state,fetchFn:l};u(a),(f=this.options.behavior)==null||f.onFetch(a,this),b(this,q,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((g=a.fetchOptions)==null?void 0:g.meta))&&x(this,v,F).call(this,{type:"fetch",meta:(w=a.fetchOptions)==null?void 0:w.meta});const h=n=>{var o,C,y,m;M(n)&&n.silent||x(this,v,F).call(this,{type:"error",error:n}),M(n)||((C=(o=i(this,p).config).onError)==null||C.call(o,n,this),(m=(y=i(this,p).config).onSettled)==null||m.call(y,this.state.data,n,this)),this.scheduleGc()};return b(this,c,H({initialPromise:e==null?void 0:e.initialPromise,fn:a.fetchFn,abort:r.abort.bind(r),onSuccess:n=>{var o,C,y,m;if(n===void 0){h(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(n)}catch(P){h(P);return}(C=(o=i(this,p).config).onSuccess)==null||C.call(o,n,this),(m=(y=i(this,p).config).onSettled)==null||m.call(y,n,this.state.error,this),this.scheduleGc()},onError:h,onFail:(n,o)=>{x(this,v,F).call(this,{type:"failed",failureCount:n,error:o})},onPause:()=>{x(this,v,F).call(this,{type:"pause"})},onContinue:()=>{x(this,v,F).call(this,{type:"continue"})},retry:a.options.retry,retryDelay:a.options.retryDelay,networkMode:a.options.networkMode,canRun:()=>!0})),i(this,c).start()}},D=new WeakMap,q=new WeakMap,p=new WeakMap,U=new WeakMap,c=new WeakMap,A=new WeakMap,R=new WeakMap,v=new WeakSet,F=function(t){const e=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...z(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const u=t.error;return M(u)&&u.revert&&i(this,q)?{...i(this,q),fetchStatus:"idle"}:{...r,error:u,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:u,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=e(this.state),B.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),i(this,p).notify({query:this,type:"updated",action:t})})},G);function z(s,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:N(t.networkMode)?"fetching":"paused",...s===void 0&&{error:null,status:"pending"}}}function J(s){const t=typeof s.initialData=="function"?s.initialData():s.initialData,e=t!==void 0,r=e?typeof s.initialDataUpdatedAt=="function"?s.initialDataUpdatedAt():s.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:e?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:e?"success":"pending",fetchStatus:"idle"}}export{rt as Q,st as a,Z as b,tt as c,z as f,et as u};
