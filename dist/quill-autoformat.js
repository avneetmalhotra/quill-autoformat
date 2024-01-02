!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("quill")):"function"==typeof define&&define.amd?define(["quill"],e):"object"==typeof exports?exports.QuillAutoformat=e(require("quill")):t.QuillAutoformat=e(t.Quill)}(window,function(t){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(e,r){e.exports=t},function(t,e,r){"use strict";r.r(e);var n=r(0),o=r.n(n);const i=o.a.import("blots/embed"),s=o.a.import("blots/inline"),l=o.a.import("blots/text"),a=o.a.import("blots/cursor");class u extends i{static create(t){let e=super.create(t);return e.setAttribute("href",this.BASE_URL+t),e.setAttribute("spellcheck",!1),e.textContent="#"+t,e}static formats(t){return t.getAttribute("href").substr(this.BASE_URL.length)}format(t,e){this.domNode.setAttribute("href",this.BASE_URL+e)}static value(t){return t.textContent.substr(1)}}u.blotName="hashtag",u.className="ql-hashtag",u.tagName="A",u.BASE_URL="#";class f extends s{static create(t){let e=super.create(t);return e.setAttribute("href",this.BASE_URL+t),e.setAttribute("spellcheck",!1),e}static formats(t){return t.getAttribute("href").substr(this.BASE_URL.length)}format(t,e){this.domNode.setAttribute("href",this.BASE_URL+e)}}f.blotName="hashtag",f.className="ql-hashtag",f.tagName="A",f.allowedChildren=[l,a],f.BASE_URL="#";const c=o.a.import("blots/embed");class p extends c{static create(t){const e=super.create(t);return e.setAttribute("title",t),e.setAttribute("href",this.BASE_URL+t),e.textContent="@"+t,e}static value(t){return t.textContent.substr(1)}}p.blotName="mention",p.className="ql-mention",p.tagName="A",p.BASE_URL="/";var d=p;const h=o.a.import("blots/embed");class m extends h{static create(t){const e=super.create(t);return e.setAttribute("title",t),e.setAttribute("href",this.BASE_URL+t),e.textContent="+"+t,e}static value(t){return t.textContent.substr(1)}}m.blotName="points",m.className="ql-points",m.tagName="A",m.BASE_URL="/";var b=m;function g(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=[],n=!0,o=!1,i=void 0;try{for(var s,l=t[Symbol.iterator]();!(n=(s=l.next()).done)&&(r.push(s.value),!e||r.length!==e);n=!0);}catch(t){o=!0,i=t}finally{try{n||null==l.return||l.return()}finally{if(o)throw i}}return r}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}const y=o.a.import("core/module"),x=o.a.import("delta"),w=o.a.import("parchment"),A=w.Attributor,v=w.Scope;class q extends y{constructor(t,e){super(t,e),this.transforms=e,this.registerTypeListener(),this.registerPasteListener()}registerPasteListener(){for(const t in this.transforms){const e=this.transforms[t];this.quill.clipboard.addMatcher(Node.TEXT_NODE,(t,r)=>{if("string"==typeof t.data)return r.ops.forEach((t,r,n)=>{if("string"==typeof t.insert){let o=E(e,t.insert),i=new x([t]).compose(o);n.splice(r,1,...i.ops)}}),r})}}registerTypeListener(){this.quill.keyboard.addBinding({key:38,collapsed:!0,format:["autoformat-helper"]},this.forwardKeyboardUp.bind(this)),this.quill.keyboard.addBinding({key:40,collapsed:!0,format:["autoformat-helper"]},this.forwardKeyboardDown.bind(this)),this.quill.on(o.a.events.TEXT_CHANGE,(t,e,r)=>{let n=t.ops;if("user"!==r||!n||n.length<1)return;let i=n.length-1,s=n[i];for(;!s.insert&&i>0;)s=n[--i];if(!s.insert||"string"!=typeof s.insert)return;let l="\n"===s.insert,a=this.quill.getSelection();if(!a)return;let u=this.quill.getLength()-a.index-(l?1:0),f=a.index,c=g(this.quill.getLeaf(f),1)[0];if(!c||!c.text)return;let p=c.offset(c.scroll),d=f-p,h=!1;for(const t in this.transforms){const e=this.transforms[t];if(e.helper&&e.helper.trigger&&s.insert.match(e.helper.trigger))this.quill.formatText(f,1,"autoformat-helper",t,o.a.sources.API),this.openHelper(e,f);else if(s.insert.match(e.trigger||/./)){this.closeHelper(e);let t=(new x).retain(p),r=E(e,c.text,d);r&&(t=t.concat(r)),this.quill.updateContents(t,"api"),h=!0}}h&&setTimeout(()=>{this.quill.setSelection(this.quill.getLength()-u,"api")},0)})}forwardKeyboard(t,e){if(this.currentHelper&&this.currentHelper.container){let t=this.currentHelper.container.querySelector(".dropdown-menu");console.log("keyboard",t,e.event),t.dispatchEvent(e.event)}}forwardKeyboardUp(t,e){var r=new KeyboardEvent("keydown",{key:"ArrowUp",keyCode:38,which:38,bubbles:!0,cancelable:!0});e.event=r,this.forwardKeyboard(t,e)}forwardKeyboardDown(t,e){var r=new KeyboardEvent("keydown",{key:"ArrowDown",keyCode:40,which:40,bubbles:!0,cancelable:!0});e.event=r,this.forwardKeyboard(t,e)}openHelper(t,e){if(t.helper&&(this.currentHelper=t.helper,"function"==typeof t.helper.open)){console.log("openHelper",e,this.quill.getFormat(e));let r=this.quill.getBounds(e),n=this.quill.addContainer("ql-helper");n.style.position="absolute",n.style.top=r.top+"px",n.style.left=r.left+"px",n.style.width=r.width+"px",n.style.height=r.height+"px",console.log("openHelper",r,n),t.helper.container=n,t.helper.open(n)}}closeHelper(t){t.helper&&"function"==typeof t.helper.close&&t.helper.close(t.helper.container)}}function E(t,e,r){t.find.global||(t.find=new RegExp(t.find,t.find.flags+"g")),t.find.lastIndex=0;let n=new x,o=null;if(null!=r)for(o=t.find.exec(e);o&&o.length&&o.index<r;){if(o.index<r&&o.index+o[0].length+1>=r){n=n.concat(S(t,o).ops);break}o=t.find.exec(e)}else for(;null!==(o=t.find.exec(e));){let r=S(t,o);n=n.concat(r.ops),e=e.substr(r.rightIndex),t.find.lastIndex=0}return n}function S(t,e){let r=(e=function(t,e){if(t.extract){let r=new RegExp(t.extract).exec(e[0]);return r&&r.length?(r.index+=e.index,r):e}return e}(t,e)).index,n=function(t,e){let r=new RegExp(t.extract||t.find);return t.transform?e.replace(r,t.transform):e}(t,e[0]),o=n;t.insert&&((o={})[t.insert]=n);let i=function(t,e){let r={};return"string"==typeof t.format?r[t.format]=e:"object"==typeof t.format&&(r=t.format),r}(t,n);const s=new x;return s.retain(r).delete(e[0].length).insert(o,i),{ops:s,rightIndex:r+e[0].length}}q.DEFAULTS={points:{trigger:/[\s.,;:!?]/,find:/(?:^|\s)\+[^\s.,;:!?]+/i,extract:/\+([^\s.,;:!?]+)/i,transform:"$1",insert:"points"},link:{trigger:/[\s]/,find:/https?:\/\/[\S]+|(www\.[\S]+)/gi,transform:function(t,e){return e?"http://"+t:t},format:"link"}};const L=new A("autoformat-helper","data-helper",{scope:v.INLINE});r.d(e,"default",function(){return q}),r.d(e,"Hashtag",function(){return u}),r.d(e,"Mention",function(){return d}),r.d(e,"Points",function(){return b}),r.d(e,"AutoformatHelperAttribute",function(){return L}),o.a.version&&parseInt(o.a.version[0])<2&&console.warn("quill-autoformat requires Quill 2.0 or higher to work properly"),o.a.register({"modules/autoformat":q,"formats/hashtag":u,"formats/mention":d,"formats/points":b,"formats/autoformat-helper":L})}])});