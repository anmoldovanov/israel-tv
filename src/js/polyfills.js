
define(function() {

require('modernizr-custom.js')
require('es6-map-shim')

if (!String.prototype.includes) {
  String.prototype.includes = function() {
    'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}


  // Element.classList multiple arguments & toggle - polyfill
;(function () {
    var dummy  = document.createElement('div'),
        dtp    = DOMTokenList.prototype,
        toggle = dtp.toggle,
        add    = dtp.add,
        rem    = dtp.remove;

    dummy.classList.add('class1', 'class2');

    if (!dummy.classList.contains('class2')) {
        dtp.add    = function () {
            Array.prototype.forEach.call(arguments, add.bind(this));
        };
        dtp.remove = function () {
            Array.prototype.forEach.call(arguments, rem.bind(this));
        };
    }
    if (!dummy.classList.toggle('class1', true)) {
        dtp.toggle = function (cls, forcedState) {
            if (forcedState === undefined)
                return toggle.call(this, cls);

            (forcedState ? add : rem).call(this, cls);
            return !!forcedState;
        };
    }
})();
  


  if (!Element.prototype.matches) {
      	var proto = Element.prototype;
      	proto.matches = 
      	proto.matchesSelector ||
      	proto.mozMatchesSelector ||
      	proto.msMatchesSelector ||
      	proto.oMatchesSelector ||
      	proto.webkitMatchesSelector ||
      	function(selector){
      		var matches = document.querySelectorAll(selector), th = this;
      		return Array.prototype.some.call(matches, function(e){
      			return e === th;
      		});
      	};
    }
      
    // Closest() polyfill
    if (!Element.prototype.closest){
    	Element.prototype.closest = function(css){ 
    		var node = this;
    		while (node) { 
    			if (node.matches(css)) return node; 
    		else node = node.parentElement; 
    		} 
    		return null; 
    	}
    }

    // Remove() polyfill
    if (!Element.prototype.remove) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }


function elementDatasetPolyfill () {
  if (!document.documentElement.dataset &&
    (
      !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset')  ||
      !Object.getOwnPropertyDescriptor(Element.prototype, 'dataset').get
    )
  ) {
    const descriptor = {}

    descriptor.enumerable = true

    descriptor.get = function () {
      const element = this
      const map = {}
      const attributes = this.attributes

      function toUpperCase (n0) {
        return n0.charAt(1).toUpperCase()
      }

      function getter () {
        return this.value
      }

      function setter (name, value) {
        if (typeof value !== 'undefined') {
          this.setAttribute(name, value)
        }
        else {
          this.removeAttribute(name)
        }
      }

      for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i]

        // This test really should allow any XML Name without
        // colons (and non-uppercase for XHTML)

        if (attribute && attribute.name && (/^data-\w[\w\-]*$/).test(attribute.name)) {
          const name = attribute.name
          const value = attribute.value

          // Change to CamelCase

          const propName = name.substr(5).replace(/-./g, toUpperCase)

          Object.defineProperty(map, propName, {
            enumerable: this.enumerable,
            get: getter.bind({value: value || ''}),
            set: setter.bind(element, name)
          })
        }
      }
      return map
    }

    Object.defineProperty(Element.prototype, 'dataset', descriptor)
  }
}

 elementDatasetPolyfill ()


if (!Object.assign) {
  Object.defineProperty(Object, 'assign', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(target, firstSource) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert first argument to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];
        if (nextSource === undefined || nextSource === null) {
          continue;
        }

        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
      return to;
    }
  });
}



window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        if (!script) {
          document.head.appendChild(style);
        } else {
          script.parentNode.insertBefore(style, script);
        }

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());
   

   // Шаги алгоритма ECMA-262, 6-е издание, 22.1.2.1
// Ссылка: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function() {
    var toStr = Object.prototype.toString;
    var isCallable = function(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // Свойство length метода from равно 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Положим C равным значению this.
      var C = this;

      // 2. Положим items равным ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError('Array.from requires an array-like object - not null or undefined');
      }

      // 4. Если mapfn равен undefined, положим mapping равным false.
      var mapFn = arguments[1];
      if (typeof mapFn !== 'undefined') {
        mapFn = arguments.length > 1 ? arguments[1] : void undefined;
        // 5. иначе
        // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Положим lenValue равным Get(items, "length").
      // 11. Положим len равным ToLength(lenValue).
      var len = toLength(items.length);

      // 13. Если IsConstructor(C) равен true, то
      // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
      //     объекта C со списком аргументов, содержащим единственный элемент len.
      // 14. a. Иначе, положим A равным ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Положим k равным 0.
      var k = 0;
      // 17. Пока k < len, будем повторять... (шаги с a по h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Положим putStatus равным Put(A, "length", len, true).
      A.length = len;
      // 20. Вернём A.
      return A;
    };
  }());
} 

})


