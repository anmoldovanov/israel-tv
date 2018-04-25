'use strict';
require('polyfills')

const body = document.body
const docElem = document.documentElement

let bowser = require('bowser');

if (bowser.webkit) {
    docElem.classList.add('isWebkit')
}
if (bowser.blink) {
    docElem.classList.add('isBlink')
}
if (bowser.ios) {
    docElem.classList.add('isIOS')
}
if (bowser.safari) {
    docElem.classList.add('isSafari')
}
if (bowser.msie) {
    docElem.classList.add('isIE')
}
if (bowser.gecko) {
    docElem.classList.add('isGecko')
}
if (bowser.ucbrowser) {
    docElem.classList.add('isUCbrowser')
}

if (!window.jQuery) {
    window.$ = window.jQuery = require("jquery");
}

$.fn.slideFadeIn = function(speed, easing, callback) {
  return this.animate({ opacity: 'show', height: 'show' }, speed, easing, callback);
};
$.fn.slideFadeOut = function(speed, easing, callback) {
  return this.animate({ opacity: 'hide', height: 'hide' }, speed, easing, callback);
};

const Tablist = require('Tablist');
const Toggler = require('Toggler');
Tablist.initAll();
Toggler.initAll();



var MicroModal = require('modal.js'); // commonjs module
window.MicroModal = MicroModal;

MicroModal.init({
  debugMode: false, // [3]
  disableScroll: true // [4]
});

let Bee3D = require('bee3D.js')

let advantagesSlider = document.getElementById('main-slider');
var slider = new Bee3D(advantagesSlider, {
  effect: 'coverflow',
  focus: advantagesSlider.dataset.focus || 1,
  loop: {
      enabled: true,
      continuous: true
  },
  listeners: {
     touches: true,
     drag: true,
     keys: true,
     clicks: true
  },
  navigation: {
     //enabled: true,
     //prev: '[data-slider-prev]',
     //next: '[data-slider-next]'
  }
  // ... more options here
});

$('[data-slider="main-slider"] [data-slider-arrow-prev]').on('click', function() {
   slider.el.prev()
})
$('[data-slider="main-slider"] [ data-slider-arrow-next]').on('click', function() {
   slider.el.next()
})


$('[data-scroll-up]').on('click', function() {
   $('html, body').animate({
      scrollTop: 0
    }, 400);
})

window.addEventListener('scroll', function(e) {
    let scrollY = window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 50) {
        document.body.classList.add('show-scroll-up');
    } else {
      document.body.classList.remove('show-scroll-up');
    }
})






