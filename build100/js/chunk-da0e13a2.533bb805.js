(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da0e13a2"],{1047:function(t,e,n){"use strict";var i=n("7a23");const o={class:"btn-group"},s={class:"btn btn-outline-secondary"};function a(t,e,n,a,r,c){const p=Object(i["G"])("DeleteButton");return Object(i["y"])(),Object(i["g"])(i["a"],null,[(Object(i["y"])(!0),Object(i["g"])(i["a"],null,Object(i["E"])(t.list,e=>(Object(i["y"])(),Object(i["g"])("div",{key:e.ui,class:"mb11"},[Object(i["h"])("div",o,[Object(i["k"])(p,{manager:t.manager,item:t.manager.find(e.ui)},null,8,["manager","item"]),Object(i["h"])("span",s,Object(i["K"])(e.un),1),Object(i["F"])(t.$slots,"default")])]))),128)),Object(i["h"])("span",{onClick:e[0]||(e[0]=(...e)=>t.select&&t.select(...e)),class:"btn btn-outline-primary"}," + ")],64)}var r=n("9883"),c=n("7b6f"),p=n("3a0b"),u=n("873b");const l=Object(i["l"])({components:{DeleteButton:u["a"]},props:{manager:{type:Object,required:!0}},setup(t,e){const n=c["a"].finder.findManager(t.manager.targetType).list,o=Object(i["c"])((function(){const e=new Set(t.manager.uixx);return n.filter(t=>e.has(t.ui))}));function s(){const e=p["a"].listModal;e.showList(n,"Select "+t.manager.targetType,(function(e){try{const n=t.manager.make(e.ui);t.manager.add(n)}catch(n){r["a"].error(n)}}))}return{list:o,select:s}}});var d=l,f=n("6b0d"),m=n.n(f);const h=m()(d,[["render",a]]);e["a"]=h},"873b":function(t,e,n){"use strict";var i=n("7a23");function o(t,e,n,o,s,a){return Object(i["y"])(),Object(i["g"])("span",{onClick:e[0]||(e[0]=(...e)=>t.remove&&t.remove(...e)),class:"btn btn-outline-danger"}," - ")}var s=Object(i["l"])({props:{manager:{type:Object,required:!0},item:{type:Object,required:!0}},setup(t,e){function n(n){n.stopPropagation(),confirm("Are you sure?")&&(t.manager.remove(t.item),e.emit("remove",t.item))}return{remove:n}}}),a=n("6b0d"),r=n.n(a);const c=r()(s,[["render",o]]);e["a"]=c},9883:function(t,e,n){"use strict";
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
***************************************************************************** */var i,o=function(){return o=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},o.apply(this,arguments)},s=function(){function t(t){this.options=t,this.listeners={}}return t.prototype.on=function(t,e){var n=this.listeners[t]||[];this.listeners[t]=n.concat([e])},t.prototype.triggerEvent=function(t,e){var n=this,i=this.listeners[t]||[];i.forEach((function(t){return t({target:n,event:e})}))},t}();(function(t){t[t["Add"]=0]="Add",t[t["Remove"]=1]="Remove"})(i||(i={}));var a,r=function(){function t(){this.notifications=[]}return t.prototype.push=function(t){this.notifications.push(t),this.updateFn(t,i.Add,this.notifications)},t.prototype.splice=function(t,e){var n=this.notifications.splice(t,e)[0];return this.updateFn(n,i.Remove,this.notifications),n},t.prototype.indexOf=function(t){return this.notifications.indexOf(t)},t.prototype.onUpdate=function(t){this.updateFn=t},t}();(function(t){t["Dismiss"]="dismiss",t["Click"]="click"})(a||(a={}));var c={types:[{type:"success",className:"notyf__toast--success",backgroundColor:"#3dc763",icon:{className:"notyf__icon--success",tagName:"i"}},{type:"error",className:"notyf__toast--error",backgroundColor:"#ed3d3d",icon:{className:"notyf__icon--error",tagName:"i"}}],duration:2e3,ripple:!0,position:{x:"right",y:"bottom"},dismissible:!1},p=function(){function t(){this.notifications=[],this.events={},this.X_POSITION_FLEX_MAP={left:"flex-start",center:"center",right:"flex-end"},this.Y_POSITION_FLEX_MAP={top:"flex-start",center:"center",bottom:"flex-end"};var t=document.createDocumentFragment(),e=this._createHTMLElement({tagName:"div",className:"notyf"});t.appendChild(e),document.body.appendChild(t),this.container=e,this.animationEndEventName=this._getAnimationEndEventName(),this._createA11yContainer()}return t.prototype.on=function(t,e){var n;this.events=o(o({},this.events),(n={},n[t]=e,n))},t.prototype.update=function(t,e){e===i.Add?this.addNotification(t):e===i.Remove&&this.removeNotification(t)},t.prototype.removeNotification=function(t){var e,n,i=this,o=this._popRenderedNotification(t);o&&(e=o.node,e.classList.add("notyf__toast--disappear"),e.addEventListener(this.animationEndEventName,n=function(t){t.target===e&&(e.removeEventListener(i.animationEndEventName,n),i.container.removeChild(e))}))},t.prototype.addNotification=function(t){var e=this._renderNotification(t);this.notifications.push({notification:t,node:e}),this._announce(t.options.message||"Notification")},t.prototype._renderNotification=function(t){var e,n=this._buildNotificationCard(t),i=t.options.className;return i&&(e=n.classList).add.apply(e,i.split(" ")),this.container.appendChild(n),n},t.prototype._popRenderedNotification=function(t){for(var e=-1,n=0;n<this.notifications.length&&e<0;n++)this.notifications[n].notification===t&&(e=n);if(-1!==e)return this.notifications.splice(e,1)[0]},t.prototype.getXPosition=function(t){var e;return(null===(e=null===t||void 0===t?void 0:t.position)||void 0===e?void 0:e.x)||"right"},t.prototype.getYPosition=function(t){var e;return(null===(e=null===t||void 0===t?void 0:t.position)||void 0===e?void 0:e.y)||"bottom"},t.prototype.adjustContainerAlignment=function(t){var e=this.X_POSITION_FLEX_MAP[this.getXPosition(t)],n=this.Y_POSITION_FLEX_MAP[this.getYPosition(t)],i=this.container.style;i.setProperty("justify-content",n),i.setProperty("align-items",e)},t.prototype._buildNotificationCard=function(t){var e=this,n=t.options,i=n.icon;this.adjustContainerAlignment(n);var o=this._createHTMLElement({tagName:"div",className:"notyf__toast"}),s=this._createHTMLElement({tagName:"div",className:"notyf__ripple"}),r=this._createHTMLElement({tagName:"div",className:"notyf__wrapper"}),c=this._createHTMLElement({tagName:"div",className:"notyf__message"});c.innerHTML=n.message||"";var p=n.background||n.backgroundColor;if(i){var u=this._createHTMLElement({tagName:"div",className:"notyf__icon"});if(("string"===typeof i||i instanceof String)&&(u.innerHTML=new String(i).valueOf()),"object"===typeof i){var l=i.tagName,d=void 0===l?"i":l,f=i.className,m=i.text,h=i.color,v=void 0===h?p:h,y=this._createHTMLElement({tagName:d,className:f,text:m});v&&(y.style.color=v),u.appendChild(y)}r.appendChild(u)}if(r.appendChild(c),o.appendChild(r),p&&(n.ripple?(s.style.background=p,o.appendChild(s)):o.style.background=p),n.dismissible){var g=this._createHTMLElement({tagName:"div",className:"notyf__dismiss"}),b=this._createHTMLElement({tagName:"button",className:"notyf__dismiss-btn"});g.appendChild(b),r.appendChild(g),o.classList.add("notyf__toast--dismissible"),b.addEventListener("click",(function(n){var i,o;null===(o=(i=e.events)[a.Dismiss])||void 0===o||o.call(i,{target:t,event:n}),n.stopPropagation()}))}o.addEventListener("click",(function(n){var i,o;return null===(o=(i=e.events)[a.Click])||void 0===o?void 0:o.call(i,{target:t,event:n})}));var _="top"===this.getYPosition(n)?"upper":"lower";return o.classList.add("notyf__toast--"+_),o},t.prototype._createHTMLElement=function(t){var e=t.tagName,n=t.className,i=t.text,o=document.createElement(e);return n&&(o.className=n),o.textContent=i||null,o},t.prototype._createA11yContainer=function(){var t=this._createHTMLElement({tagName:"div",className:"notyf-announcer"});t.setAttribute("aria-atomic","true"),t.setAttribute("aria-live","polite"),t.style.border="0",t.style.clip="rect(0 0 0 0)",t.style.height="1px",t.style.margin="-1px",t.style.overflow="hidden",t.style.padding="0",t.style.position="absolute",t.style.width="1px",t.style.outline="0",document.body.appendChild(t),this.a11yContainer=t},t.prototype._announce=function(t){var e=this;this.a11yContainer.textContent="",setTimeout((function(){e.a11yContainer.textContent=t}),100)},t.prototype._getAnimationEndEventName=function(){var t,e=document.createElement("_fake"),n={MozTransition:"animationend",OTransition:"oAnimationEnd",WebkitTransition:"webkitAnimationEnd",transition:"animationend"};for(t in n)if(void 0!==e.style[t])return n[t];return"animationend"},t}(),u=function(){function t(t){var e=this;this.dismiss=this._removeNotification,this.notifications=new r,this.view=new p;var n=this.registerTypes(t);this.options=o(o({},c),t),this.options.types=n,this.notifications.onUpdate((function(t,n){return e.view.update(t,n)})),this.view.on(a.Dismiss,(function(t){var n=t.target,i=t.event;e._removeNotification(n),n["triggerEvent"](a.Dismiss,i)})),this.view.on(a.Click,(function(t){var e=t.target,n=t.event;return e["triggerEvent"](a.Click,n)}))}return t.prototype.error=function(t){var e=this.normalizeOptions("error",t);return this.open(e)},t.prototype.success=function(t){var e=this.normalizeOptions("success",t);return this.open(e)},t.prototype.open=function(t){var e=this.options.types.find((function(e){var n=e.type;return n===t.type}))||{},n=o(o({},e),t);this.assignProps(["ripple","position","dismissible"],n);var i=new s(n);return this._pushNotification(i),i},t.prototype.dismissAll=function(){while(this.notifications.splice(0,1));},t.prototype.assignProps=function(t,e){var n=this;t.forEach((function(t){e[t]=null==e[t]?n.options[t]:e[t]}))},t.prototype._pushNotification=function(t){var e=this;this.notifications.push(t);var n=void 0!==t.options.duration?t.options.duration:this.options.duration;n&&setTimeout((function(){return e._removeNotification(t)}),n)},t.prototype._removeNotification=function(t){var e=this.notifications.indexOf(t);-1!==e&&this.notifications.splice(e,1)},t.prototype.normalizeOptions=function(t,e){var n={type:t};return"string"===typeof e?n.message=e:"object"===typeof e&&(n=o(o({},n),e)),n},t.prototype.registerTypes=function(t){var e=(t&&t.types||[]).slice(),n=c.types.map((function(t){var n=-1;e.forEach((function(e,i){e.type===t.type&&(n=i)}));var i=-1!==n?e.splice(n,1)[0]:{};return o(o({},t),i)}));return n.concat(e)},t}();const l=new u({ripple:!1});function d(t){var e;const n=null!==(e=null===t||void 0===t?void 0:t.message)&&void 0!==e?e:t;l.error({dismissible:!0,duration:0,message:n})}function f(t,e){if(e<300)return m(t);d(t)}function m(t){l.success(t)}const h={error:d,show:f,success:m};e["a"]=h},bd75:function(t,e,n){"use strict";n.r(e);var i=n("7a23");const o={class:"row"},s=Object(i["h"])("div",{class:"col-3"},null,-1),a={class:"col-9"},r={class:"table"},c=Object(i["h"])("caption",{class:"caption-top"},[Object(i["h"])("h2",null,"Security Requirement")],-1);function p(t,e,n,p,u,l){const d=Object(i["G"])("ReferenceList");return Object(i["y"])(),Object(i["g"])("div",o,[s,Object(i["h"])("div",a,[Object(i["h"])("table",r,[c,Object(i["h"])("tbody",null,[Object(i["h"])("tr",null,[Object(i["h"])("td",null,[Object(i["k"])(d,{manager:t.manager},null,8,["manager"])])])])])])])}var u=n("7b6f"),l=n("1047"),d=Object(i["l"])({components:{ReferenceList:l["a"]},setup(t,e){const n=Object(i["D"])(u["a"].project.oapi.securityManager);return{manager:n}}}),f=n("6b0d"),m=n.n(f);const h=m()(d,[["render",p]]);e["default"]=h}}]);