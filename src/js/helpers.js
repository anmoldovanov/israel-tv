let _ = {}


_.getScrollbarWidth = (function() {

    let outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    let widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    let inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    let widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll

})();

_.forEach = function (list, fn){ 
  for (let i = 0; i < list.length; i++) { 
    fn(list[i], i, list) 
  }; 
}
_.map = function (list, fn){ 
  let array = [] 
  for (var i = 0, len = list.length; i < len; i++) { 
    array[i] = fn(list[i], i, list) 
  }; 
  return array 
} 
_.toArray = function(list){
    let array = []
    for (var i = 0; i < list.length; i++) {
        array[i] = list[i]
    }
    return array
}

_.isTouchDevice = (function() {
  return 'ontouchstart' in window        // works on most browsers 
      || 'onmsgesturechange' in window;  // works on IE10 with some false positives
})();



_.guid = function(prefix = '') {
  do {
    // eslint-disable-next-line no-bitwise
    prefix += ~~(Math.random() * 9999) // "~~" acts like a faster Math.floor() here
  } while (document.getElementById(prefix))
  return prefix
}

_.setHeight = function(elem) {

    let _updateHeight = _.debounce(function() {
        let clone = elem.cloneNode(true)
        clone.style.cssText = `height: auto !important;` 
        clone.style.display = 'block',
        clone.style.position = 'absolute'
        clone.style.visibility = 'hidden'
        clone.style.width = elem.parentNode.offsetWidth + 'px'
        document.body.appendChild(clone)
        elem.style.height = clone.offsetHeight + 'px'
        document.body.removeChild(clone)   
    }, 200)

    window.addEventListener('load', _updateHeight)
    window.addEventListener('resize', _updateHeight)

}

_.getDatasetBoolean = function(elem, name) {
    let value = elem.dataset[name]
    if (!value) return;
    return /1|true|yes|TRUE|YES/.test(value.trim())
}

_.setOpts = function(context, opts, obj) {
  context.opts = context.opts || {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
        context.opts[key] = opts[key] !== undefined ? opts[key] : obj[key];
    }
  }
}

_.createElementFromString = function(string) {
  var wrapper= document.createElement('div');
  wrapper.innerHTML= string;
  return wrapper.firstChild;
}

if ('replaceState' in history) { // Yay, supported!
    _.replaceHash = function(newhash) {
        if ((''+newhash).charAt(0) !== '#') newhash = '#' + newhash;
        history.replaceState('', '', newhash);
    }
} else {
    var hash = location.hash;
    _.replaceHash = function(newhash) {
        if (location.hash !== hash) history.back();
        location.hash = newhash;
    };
}


_.isOperaMini = Object.prototype.toString.call(window.operamini) === "[object OperaMini]"

module.exports = _