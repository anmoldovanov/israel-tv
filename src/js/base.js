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

