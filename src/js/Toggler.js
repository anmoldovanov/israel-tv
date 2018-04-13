let {
    getDatasetBoolean,
    guid,
    forEach,
    setOpts,
    getScrollbarWidth
} = require('helpers')

const scrollbarWidth = getScrollbarWidth

// if (!window.jQuery) {
//     window.$ = window.jQuery = require("jquery");
// }


// document.ontouchmove = function ( event ) {

//       var isTouchMoveAllowed = true, target = event.target;

//       while ( target !== null ) {
//           if ( target.classList && target.classList.contains( 'disable-scrolling' ) ) {
//               isTouchMoveAllowed = false;
//               break;
//           }
//           target = target.parentNode;
//       }

//       if ( !isTouchMoveAllowed ) {
//           event.preventDefault();
//       }

// };



const docElem = document.documentElement
const body = document.body
let $currentTarget = null

let defaultSettings = {
    once: false,
    useHeight: false,
    useClosest: true,
    useAnimation: false,
    preventScroll: false,
    togglerActiveClass: 'active',
    targetActiveClass: 'active',
    autoFocus: false
}

let togglers = {}

class Toggler {
    constructor(target, opts){
        

        let _this = this;

        setOpts(this, opts, {
            once: defaultSettings.once,
            useHeight: defaultSettings.useHeight,
            useClosest: defaultSettings.useClosest,
            useAnimation: defaultSettings.useAnimation,
            preventScroll: defaultSettings.preventScroll,
            togglerActiveClass: defaultSettings.togglerActiveClass,
            targetActiveClass: defaultSettings.targetActiveClass,
            autoFocus: defaultSettings.autoFocus
         })

        let active = false
        Object.defineProperty(this, 'active', { 
            set: newStatus => active = newStatus ? changeState(true) : changeState(false),
            get: () => active
        })

    
        // Анимируется ли элемент
        var currentlyAnimating = false;

        const targetID = target.id
        let togglerSel = `[data-toggle="${targetID}"]`;

        let $target = $(target)
        let $toggler = $(togglerSel)

        $toggler.attr('aria-controls', targetID)

        // Фиксируем высоту элемента
        if (this.opts.useHeight) {
            target.style.height = target.scrollHeight + 'px'
            window.addEventListener('resize', function() {
                target.style.height = 'auto'
                window.innerHeight;
                target.style.height = target.scrollHeight + 'px'
            })
        } 

        let closestFunc = function(e) {

            let t = e.target;

            if (_this.opts.useClosest && t.closest(`.modal, .modal-overlay`)) return;


            if (!_this.opts.useClosest && !t.closest(togglerSel)) {
                changeState(true)
                return;
            }

            if (!(t.closest(`#${targetID}, ${togglerSel}`) && !t.closest('[data-close]') || t.tagName == 'LABEL' && t.querySelectorAll(`#${targetID}, ${togglerSel}`))) {
                changeState(false)
            }
        }

        let changeState = function(state, first) {
            
            if (currentlyAnimating) return;

            let action = state ? 'add' : 'remove'

            $toggler.attr('aria-expandend', state)[action + 'Class'](_this.opts.togglerActiveClass).parents('.detect-active-child-toggler')[action + 'Class']('has-active-toggler')

            docElem.classList[action](targetID+'-active')

            if (state) {
                let $lazyList = $target.find('[data-lazy]')
                $lazyList.each(function(i, elem) {
                     elem.src = elem.dataset.lazy 
                })
            }

            if (!first && _this.opts.useAnimation) {
                currentlyAnimating = true
                if (state) {
                    $target.slideFadeIn(300, function() {
                        currentlyAnimating = false
                    })
                } else {
                    $target.slideFadeOut(300, function() {
                        currentlyAnimating = false
                    })
                }
            } else if (first && _this.opts.useAnimation) {
                if (state) {
                    $target.show()
                } else {
                    $target.hide()
                }
            }

            target.classList[action](_this.opts.targetActiveClass)
            if (state && _this.opts.autoFocus) {
                let focusElement = target.querySelector(_this.opts.autoFocus);
                if (focusElement) {
                    focusElement.focus()
                }
            }

            if (state && _this.opts.once) {
                return $toggler.addClass('disabled')
            }
            

            if (_this.opts.useClosest) {
                
                body[`${action}EventListener`]('click', closestFunc)
            }

            if (_this.opts.preventScroll) {
                docElem.classList[state ? 'add' : 'remove']('overflow-hidden-active')
            }

        }

        let isTargetActive = function() {
            return target.classList.contains(_this.opts.targetActiveClass);
        }

        changeState(isTargetActive(), true)

        $(body).on('mousedown.changeState', togglerSel, function(e) {
            e.preventDefault()
            changeState(!isTargetActive(), false)
        })

        togglers[targetID] = this;

    }

    open(){
        this.active = true
    }
    close(){
        this.active = false
    }
    toggle(){
        this.active = !this.active  
    }
    static get(id){
        return togglers[id]
    }

    static initAll() {

        forEach(document.querySelectorAll('[data-toggle-target]'), function(elem) {
            new Toggler(elem, {
              togglerActiveClass: elem.dataset.togglerActiveClass,
              targetActiveClass: elem.dataset.targetActiveClass,
              once: getDatasetBoolean(elem, 'once'),
              useHeight: getDatasetBoolean(elem, 'useHeight'),
              useClosest: getDatasetBoolean(elem, 'useClosest'),
              useAnimation: getDatasetBoolean(elem, 'useAnimation'),
              preventScroll: getDatasetBoolean(elem, 'preventScroll'),
              autoFocus: elem.dataset.autoFocus
            })  
        })
        forEach(document.querySelectorAll('[data-readmore]'), function(elem) {
           new Toggler(elem, {
              togglerActiveClass: elem.dataset.togglerActiveClass,
              targetActiveClass: elem.dataset.targetActiveClass,
              useHeight: true,
              useClosest: false,
           })
        })
    }
}

module.exports = Toggler