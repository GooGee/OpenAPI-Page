(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b9fa61b6"],{2682:function(t,e,n){},"2c64":function(t,e,n){"use strict";var i=n("7a23");const o=["onClick"];function r(t,e,n,r,s,a){const c=Object(i["G"])("ColorButton");return Object(i["y"])(),Object(i["g"])("div",null,[(Object(i["y"])(!0),Object(i["g"])(i["a"],null,Object(i["E"])(t.colorxx,e=>(Object(i["y"])(),Object(i["g"])("span",{key:e,onClick:n=>t.$emit("update:color",e)},[Object(i["k"])(c,{color:e,active:e===t.color},null,8,["color","active"])],8,o))),128))])}var s=n("11ef");function a(t,e,n,o,r,s){return Object(i["y"])(),Object(i["g"])("span",{style:Object(i["s"])({"background-color":t.bg,"border-color":t.border}),class:Object(i["r"])([{active:t.active},"color-button"])},null,6)}var c=Object(i["l"])({props:{color:{type:String,required:!0},active:{type:Boolean,required:!1,default:!1}},setup(t,e){const n=Object(i["c"])((function(){return""===t.color?"#fff":t.active?t.color:"#fff"})),o=Object(i["c"])((function(){return""===t.color?"#333":t.color}));return{bg:n,border:o}}}),u=(n("983e"),n("6b0d")),l=n.n(u);const p=l()(c,[["render",a]]);var d=p,f=Object(i["l"])({components:{ColorButton:d},props:{color:{type:String,required:!0}},setup(t,e){return{colorxx:s["a"]}}});const v=l()(f,[["render",r]]);e["a"]=v},"4a82":function(t,e,n){"use strict";var i=n("7a23"),o=n("9883");function r(t){const e=Object(i["D"])(!1);function n(t=1222){setTimeout(()=>{e.value=!1},t)}const r=()=>{if(!e.value){e.value=!0;try{t()}catch(i){n(),o["a"].error(i.message)}}};return{run:r,stopWaiting:n,waiting:e}}const s={wait:r};e["a"]=s},"983e":function(t,e,n){"use strict";n("2682")},9883:function(t,e,n){"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */var i,o=function(){return o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o.apply(this,arguments)},r=function(){function t(t){this.options=t,this.listeners={}}return t.prototype.on=function(t,e){var n=this.listeners[t]||[];this.listeners[t]=n.concat([e])},t.prototype.triggerEvent=function(t,e){var n=this,i=this.listeners[t]||[];i.forEach((function(t){return t({target:n,event:e})}))},t}();(function(t){t[t["Add"]=0]="Add",t[t["Remove"]=1]="Remove"})(i||(i={}));var s,a=function(){function t(){this.notifications=[]}return t.prototype.push=function(t){this.notifications.push(t),this.updateFn(t,i.Add,this.notifications)},t.prototype.splice=function(t,e){var n=this.notifications.splice(t,e)[0];return this.updateFn(n,i.Remove,this.notifications),n},t.prototype.indexOf=function(t){return this.notifications.indexOf(t)},t.prototype.onUpdate=function(t){this.updateFn=t},t}();(function(t){t["Dismiss"]="dismiss",t["Click"]="click"})(s||(s={}));var c={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!1},u=function(){function t(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var t=document.createDocumentFragment(),e=this._createHTMLElement({tagName:"div",className:"notyf"});t.appendChild(e),document.body.appendChild(t),this.container=e,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}return t.prototype.on=function(t,e){var n;this.events=o(o({},this.events),(n={},n[t]=e,n))},t.prototype.update=function(t,e){e===i.Add?this.addNotification(t):e===i.Remove&&this.removeNotification(t)},t.prototype.removeNotification=function(t){var e,n,i=this,o=this._popRenderedNotification(t);o&&(e=o.node,e.classList.add("notyf__toast--disappear"),e.addEventListener(this.animationEndEventName,n=function(t){t.target===e&&(e.removeEventListener(i.animationEndEventName,n),i.container.removeChild(e))}))},t.prototype.addNotification=function(t){var e=this._renderNotification(t);this.notifications.push({notification:t,node:e}),this._announce(t.options.message||"Notification")},t.prototype._renderNotification=function(t){var e,n=this._buildNotificationCard(t),i=t.options.className;return i&&(e=n.classList).add.apply(e,i.split(" ")),this.container.appendChild(n),n},t.prototype._popRenderedNotification=function(t){for(var e=-1,n=0;n<this.notifications.length&&e<0;n++)this.notifications[n].notification===t&&(e=n);if(-1!==e)return this.notifications.splice(e,1)[0]},t.prototype.getXPosition=function(t){var e;return(null===(e=null===t||void 0===t?void 0:t.position)||void 0===e?void 0:e.x)||"right"},t.prototype.getYPosition=function(t){var e;return(null===(e=null===t||void 0===t?void 0:t.position)||void 0===e?void 0:e.y)||"bottom"},t.prototype.adjustContainerAlignment=function(t){var e=this.X_POSITION_FLEX_MAP[this.getXPosition(t)],n=this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],i=this.container.style;i.setProperty("justify-content",n),i.setProperty("align-items",e)},t.prototype._buildNotificationCard=function(t){var e=this,n=t.options,i=n.icon;this.adjustContainerAlignment(n);var o=this._createHTMLElement({tagName:"div",className:"notyf__toast"}),r=this._createHTMLElement({tagName:"div",className:"notyf__ripple"}),a=this._createHTMLElement({tagName:"div",className:"notyf__wrapper"}),c=this._createHTMLElement({tagName:"div",className:"notyf__message"});c.innerHTML=n.message||"";var u=n.background||n.backgroundColor;if(i){var l=this._createHTMLElement({tagName:"div",className:"notyf__icon"});if(("string"===typeof i||i instanceof String)&&(l.innerHTML=new String(i).valueOf()),"object"===typeof i){var p=i.tagName,d=void 0===p?"i":p,f=i.className,v=i.text,h=i.color,m=void 0===h?u:h,y=this._createHTMLElement({tagName:d,className:f,text:v});m&&(y.style.color=m),l.appendChild(y)}a.appendChild(l)}if(a.appendChild(c),o.appendChild(a),u&&(n.ripple?(r.style.background=u,o.appendChild(r)):o.style.background=u),n.dismissible){var b=this._createHTMLElement({tagName:"div",className:"notyf__dismiss"}),g=this._createHTMLElement({tagName:"button",className:"notyf__dismiss-btn"});b.appendChild(g),a.appendChild(b),o.classList.add("notyf__toast--dismissible"),g.addEventListener("click",(function(n){var i,o;null===(o=(i=e.events)[s.Dismiss])||void 0===o||o.call(i,{target:t,event:n}),n.stopPropagation()}))}o.addEventListener("click",(function(n){var i,o;return null===(o=(i=e.events)[s.Click])||void 0===o?void 0:o.call(i,{target:t,event:n})}));var O="top"===this.getYPosition(n)?"upper":"lower";return o.classList.add("notyf__toast--"+O),o},t.prototype._createHTMLElement=function(t){var e=t.tagName,n=t.className,i=t.text,o=document.createElement(e);return n&&(o.className=n),o.textContent=i||null,o},t.prototype._createA11yContainer=function(){var t=this._createHTMLElement({tagName:"div",className:"notyf-announcer"});t.setAttribute("aria-atomic","true"),t.setAttribute("aria-live","polite"),t.style.border="0",t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t.style.outline="0",document.body.appendChild(t),this.a11yContainer=t},t.prototype._announce=function(t){var e=this;this.a11yContainer.textContent="",setTimeout((function(){e.a11yContainer.textContent=t}),100)},t.prototype._getAnimationEndEventName=function(){var t,e=document.createElement("_fake"),n={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(t in n)if(void 0!==e.style[t])return n[t];return"animationend"},t}(),l=function(){function t(t){var e=this;this.dismiss=this._removeNotification,this.notifications=new a,this.view=new u;var n=this.registerTypes(t);this.options=o(o({},c),t),this.options.types=n,this.notifications.onUpdate((function(t,n){return e.view.update(t,n)})),this.view.on(s.Dismiss,(function(t){var n=t.target,i=t.event;e._removeNotification(n),n["triggerEvent"](s.Dismiss,i)})),this.view.on(s.Click,(function(t){var e=t.target,n=t.event;return e["triggerEvent"](s.Click,n)}))}return t.prototype.error=function(t){var e=this.normalizeOptions("error",t);return this.open(e)},t.prototype.success=function(t){var e=this.normalizeOptions("success",t);return this.open(e)},t.prototype.open=function(t){var e=this.options.types.find((function(e){var n=e.type;return n===t.type}))||{},n=o(o({},e),t);this.assignProps(["ripple","position","dismissible"],n);var i=new r(n);return this._pushNotification(i),i},t.prototype.dismissAll=function(){while(this.notifications.splice(0,1));},t.prototype.assignProps=function(t,e){var n=this;t.forEach((function(t){e[t]=null==e[t]?n.options[t]:e[t]}))},t.prototype._pushNotification=function(t){var e=this;this.notifications.push(t);var n=void 0!==t.options.duration?t.options.duration:this.options.duration;n&&setTimeout((function(){return e._removeNotification(t)}),n)},t.prototype._removeNotification=function(t){var e=this.notifications.indexOf(t);-1!==e&&this.notifications.splice(e,1)},t.prototype.normalizeOptions=function(t,e){var n={type:t};return"string"===typeof e?n.message=e:"object"===typeof e&&(n=o(o({},n),e)),n},t.prototype.registerTypes=function(t){var e=(t&&t.types||[]).slice(),n=c.types.map((function(t){var n=-1;e.forEach((function(e,i){e.type===t.type&&(n=i)}));var i=-1!==n?e.splice(n,1)[0]:{};return o(o({},t),i)}));return n.concat(e)},t}();const p=new l({ripple:!1});function d(t){var e;const n=null!==(e=null===t||void 0===t?void 0:t.message)&&void 0!==e?e:t;p.error({dismissible:!0,duration:0,message:n})}function f(t,e){if(e<300)return v(t);d(t)}function v(t){p.success(t)}const h={error:d,show:f,success:v};e["a"]=h},a218:function(t,e,n){"use strict";n.r(e);var i=n("7a23");const o={class:"table"},r={colspan:"2"},s={class:"ml11"};function a(t,e,n,a,c,u){const l=Object(i["G"])("ColorPanel"),p=Object(i["G"])("RunButton");return Object(i["y"])(),Object(i["g"])("table",o,[Object(i["h"])("thead",null,[Object(i["h"])("tr",null,[Object(i["h"])("th",r,[Object(i["k"])(l,{color:t.color,"onUpdate:color":e[0]||(e[0]=e=>t.color=e)},null,8,["color"])])])]),Object(i["h"])("tbody",null,[(Object(i["y"])(!0),Object(i["g"])(i["a"],null,Object(i["E"])(t.list,e=>(Object(i["y"])(),Object(i["g"])("tr",{key:e.ui},[Object(i["h"])("td",null,[Object(i["k"])(p,{schema:t.sidebar.item,script:e,onRun:t.run},null,8,["schema","script","onRun"]),Object(i["h"])("span",s,Object(i["K"])(e.un),1)]),Object(i["h"])("td",null,Object(i["K"])(e.description),1)]))),128))])])}var c=n("dc01"),u=n("12eb"),l=n("7b6f"),p=n("d724"),d=n("2c64"),f=Object(i["l"])({components:{ColorPanel:d["a"],RunButton:p["a"]},setup(t,e){const n=Object(i["D"])(""),o=Object(i["c"])((function(){return l["a"].project.scriptManager.list.filter(t=>!t.requireLayer&&(""===n.value||t.color===n.value))}));function r(){c["a"].emit(u["a"]["sidebar-list-change"])}const s=Object(i["o"])("sidebar");return{color:n,list:o,run:r,sidebar:s}}}),v=n("6b0d"),h=n.n(v);const m=h()(f,[["render",a]]);e["default"]=m},d724:function(t,e,n){"use strict";var i=n("7a23");const o={key:0,class:"spinner-border spinner-border-sm"},r=Object(i["j"])(" Run ");function s(t,e,n,s,a,c){return Object(i["y"])(),Object(i["g"])("span",{onClick:e[0]||(e[0]=(...e)=>t.run&&t.run(...e)),class:Object(i["r"])([t.waiting?"disabled":"","btn btn-outline-primary"])},[t.waiting?(Object(i["y"])(),Object(i["g"])("span",o)):Object(i["f"])("",!0),r],2)}var a=n("62fb"),c=n("4a82"),u=n("9883"),l=n("7b6f"),p=Object(i["l"])({props:{schema:{type:Object,required:!1,default:void 0},script:{type:Object,required:!0}},setup(t,e){const n=c["a"].wait(()=>{a["a"].run(t.script.code,l["a"],t.schema),e.emit("run"),u["a"].success("OK! Run "+t.script.un),n.stopWaiting()});return n}}),d=n("6b0d"),f=n.n(d);const v=f()(p,[["render",s]]);e["a"]=v}}]);