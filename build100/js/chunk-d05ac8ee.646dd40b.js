(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d05ac8ee"],{1126:function(e,t,c){"use strict";var n=c("7a23");const a={class:"table"},l={class:"custom-control custom-switch inline"},o=["id","checked","onClick"],r=["for"],i=["onClick"];function s(e,t,c,s,b,u){return Object(n["y"])(),Object(n["g"])("table",a,[Object(n["h"])("thead",null,[Object(n["h"])("tr",null,[Object(n["h"])("th",null,Object(n["K"])(e.title),1)])]),Object(n["h"])("tbody",null,[(Object(n["y"])(!0),Object(n["g"])(n["a"],null,Object(n["E"])(e.optionxx,t=>(Object(n["y"])(),Object(n["g"])("tr",{key:t.ui},[Object(n["h"])("td",null,[Object(n["h"])("span",l,[Object(n["h"])("input",{id:"checked"+t.ui,checked:e.manager.has(t.ui),onClick:c=>e.add(t.ui),type:"checkbox",class:"custom-control-input"},null,8,o),Object(n["h"])("label",{for:"checked"+t.ui,class:"custom-control-label"},null,8,r)]),Object(n["h"])("span",{onClick:c=>e.$emit("select",t),class:"btn btn-outline-primary"},Object(n["K"])(t.un),9,i)])]))),128))]),Object(n["h"])("tfoot",null,[Object(n["h"])("tr",null,[Object(n["h"])("td",null,[Object(n["h"])("span",{onClick:t[0]||(t[0]=(...t)=>e.clear&&e.clear(...t)),class:"btn btn-outline-danger"}," Clear "),Object(n["F"])(e.$slots,"default")])])])])}var b=Object(n["l"])({props:{manager:{type:Object,required:!0},optionxx:{type:Object,required:!0},title:{type:String,required:!0}},setup(e,t){function c(t){const c=e.manager.find(t);if(c)e.manager.remove(c);else{const c=e.manager.make(t);e.manager.add(c)}}function n(){confirm("Are you sure?")&&e.manager.clear()}return{add:c,clear:n}}}),u=c("6b0d"),d=c.n(u);const O=d()(b,[["render",s]]);t["a"]=O},f9a2:function(e,t,c){"use strict";c.r(t);var n=c("7a23");const a={key:1,class:"mtb11"};function l(e,t,c,l,o,r){const i=Object(n["G"])("CheckList");return e.sidebar.item.isComposition?(Object(n["y"])(),Object(n["e"])(i,{key:0,manager:e.manager,optionxx:e.fieldxx,title:"excluded"},null,8,["manager","optionxx"])):(Object(n["y"])(),Object(n["g"])("span",a,"Only for composition"))}var o=c("7b6f"),r=c("1126"),i=Object(n["l"])({components:{CheckList:r["a"]},setup(e,t){const c=Object(n["o"])("sidebar"),a=Object(n["c"])(()=>c.item.excludedManager),l=Object(n["c"])(()=>o["a"].finder.getSchemaFieldList(c.item));return{fieldxx:l,manager:a,sidebar:c}}}),s=c("6b0d"),b=c.n(s);const u=b()(i,[["render",l]]);t["default"]=u}}]);