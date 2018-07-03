/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-backdropfilter-classlist-csscalc-cssfilters-cssmask-csspointerevents-csspositionsticky-cssvhunit-dataset-es6array-fetch-flexboxlegacy-flexwrap-objectfit-picture-shapes-setclasses !*/
!function(e,t,n){function r(e,t){return typeof e===t}function s(){var e,t,n,s,o,i,a;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],t=x[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(s=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],a=i.split("."),1===a.length?Modernizr[a[0]]=s:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=s),g.push((s?"":"no-")+a.join("-"))}}function o(e){var t=T.className,n=Modernizr._config.classPrefix||"";if(S&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),S?T.className.baseVal=t:T.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):S?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function l(){var e=t.body;return e||(e=i(S?"svg":"body"),e.fake=!0),e}function f(e,n,r,s){var o,a,f,u,p="modernizr",d=i("div"),c=l();if(parseInt(r,10))for(;r--;)f=i("div"),f.id=s?s[r]:p+(r+1),d.appendChild(f);return o=i("style"),o.type="text/css",o.id="s"+p,(c.fake?c:d).appendChild(o),c.appendChild(d),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),d.id=p,c.fake&&(c.style.background="",c.style.overflow="hidden",u=T.style.overflow,T.style.overflow="hidden",T.appendChild(c)),a=n(d,e),c.fake?(c.parentNode.removeChild(c),T.style.overflow=u,T.offsetHeight):d.parentNode.removeChild(d),!!a}function u(e,t){return!!~(""+e).indexOf(t)}function p(e,t){return function(){return e.apply(t,arguments)}}function d(e,t,n){var s;for(var o in e)if(e[o]in t)return n===!1?e[o]:(s=t[e[o]],r(s,"function")?p(s,n||t):s);return!1}function c(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function y(t,r){var s=t.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(c(t[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];s--;)o.push("("+c(t[s])+":"+r+")");return o=o.join(" or "),f("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return n}function v(e,t,s,o){function l(){p&&(delete L.style,delete L.modElem)}if(o=r(o,"undefined")?!1:o,!r(s,"undefined")){var f=y(e,s);if(!r(f,"undefined"))return f}for(var p,d,c,v,m,h=["modernizr","tspan","samp"];!L.style&&h.length;)p=!0,L.modElem=i(h.shift()),L.style=L.modElem.style;for(c=e.length,d=0;c>d;d++)if(v=e[d],m=L.style[v],u(v,"-")&&(v=a(v)),L.style[v]!==n){if(o||r(s,"undefined"))return l(),"pfx"==t?v:!0;try{L.style[v]=s}catch(g){}if(L.style[v]!=m)return l(),"pfx"==t?v:!0}return l(),!1}function m(e,t,n,s,o){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+j.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?v(a,t,s,o):(a=(e+" "+P.join(i+" ")+i).split(" "),d(a,t,n))}function h(e,t,r){return m(e,n,n,t,r)}var g=[],x=[],C={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr,Modernizr.addTest("picture","HTMLPictureElement"in e),Modernizr.addTest("es6array",!!(Array.prototype&&Array.prototype.copyWithin&&Array.prototype.fill&&Array.prototype.find&&Array.prototype.findIndex&&Array.prototype.keys&&Array.prototype.entries&&Array.prototype.values&&Array.from&&Array.of)),Modernizr.addTest("fetch","fetch"in e);var T=t.documentElement;Modernizr.addTest("classlist","classList"in T);var S="svg"===T.nodeName.toLowerCase();Modernizr.addTest("csspointerevents",function(){var e=i("a").style;return e.cssText="pointer-events:auto","auto"===e.pointerEvents}),Modernizr.addTest("dataset",function(){var e=i("div");return e.setAttribute("data-a-b","c"),!(!e.dataset||"c"!==e.dataset.aB)});var b=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=b,Modernizr.addTest("csscalc",function(){var e="width:",t="calc(10px);",n=i("a");return n.style.cssText=e+b.join(t+e),!!n.style.length}),Modernizr.addTest("csspositionsticky",function(){var e="position:",t="sticky",n=i("a"),r=n.style;return r.cssText=e+b.join(t+";"+e).slice(0,-e.length),-1!==r.position.indexOf(t)});var w="CSS"in e&&"supports"in e.CSS,_="supportsCSS"in e;Modernizr.addTest("supports",w||_);var A=C.testStyles=f;A("#modernizr { height: 50vh; }",function(t){var n=parseInt(e.innerHeight/2,10),r=parseInt((e.getComputedStyle?getComputedStyle(t,null):t.currentStyle).height,10);Modernizr.addTest("cssvhunit",r==n)});var k="Moz O ms Webkit",j=C._config.usePrefixes?k.split(" "):[];C._cssomPrefixes=j;var E=function(t){var r,s=b.length,o=e.CSSRule;if("undefined"==typeof o)return n;if(!t)return!1;if(t=t.replace(/^@/,""),r=t.replace(/-/g,"_").toUpperCase()+"_RULE",r in o)return"@"+t;for(var i=0;s>i;i++){var a=b[i],l=a.toUpperCase()+"_"+r;if(l in o)return"@-"+a.toLowerCase()+"-"+t}return!1};C.atRule=E;var P=C._config.usePrefixes?k.toLowerCase().split(" "):[];C._domPrefixes=P;var z={elem:i("modernizr")};Modernizr._q.push(function(){delete z.elem});var L={style:z.elem.style};Modernizr._q.unshift(function(){delete L.style}),C.testAllProps=m,C.testAllProps=h,Modernizr.addTest("backdropfilter",h("backdropFilter")),Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return h("filter","blur(2px)");var e=i("a");return e.style.cssText=b.join("filter:blur(2px); "),!!e.style.length&&(t.documentMode===n||t.documentMode>9)}),Modernizr.addTest("flexboxlegacy",h("boxDirection","reverse",!0)),Modernizr.addTest("flexwrap",h("flexWrap","wrap",!0)),Modernizr.addTest("cssmask",h("maskRepeat","repeat-x",!0)),Modernizr.addTest("shapes",h("shapeOutside","content-box",!0));var N=C.prefixed=function(e,t,n){return 0===e.indexOf("@")?E(e):(-1!=e.indexOf("-")&&(e=a(e)),t?m(e,t,n):m(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),s(),o(g),delete C.addTest,delete C.addAsyncTest;for(var O=0;O<Modernizr._q.length;O++)Modernizr._q[O]();e.Modernizr=Modernizr}(window,document);