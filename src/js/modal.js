//0.2.0

let bowser = require('bowser');


let openedModal = null

var scrollY = 0;

function getScrollbarWidth() {
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
}

const scrollbarWidth = getScrollbarWidth();

const MicroModal = (() => {
  'use strict'

  const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ]

  class Modal {
    constructor ({
      targetModal,
      triggers = [],
      disableScroll = true,
      debugMode = false,
      onShow = () => {},
      onClose = () => {}
    } = {}) {
      this.modal = document.getElementById(targetModal)
      if (triggers.length > 0) this.registerTriggers(...triggers)

      this.disableScroll = disableScroll
      this.callbacks = { onShow, onClose }

      this.onClick = this.onClick.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
    }

    registerTriggers (...triggers) {
      triggers.forEach(trigger => {
        trigger.addEventListener('click', () => this.showModal())
      })
    }

    showModal () {

      if (openedModal) {
         openedModal.closeModal()
      }

      activeModal = this;

      

      
      this.activeElement = document.activeElement
      this.modal.setAttribute('aria-hidden', 'false')
      window.requestAnimationFrame(() => {
        this.modal.classList.add('is-open')
        this.setFocusToFirstNode()
      })
      this.scrollBehaviour('disable')
      this.addEventListeners()
      this.callbacks.onShow(this.modal)

      openedModal = this

      document.documentElement.classList.add('modal-open')


    }

    closeModal () {
      const modal = this.modal
      // if (bowser.ios) {
      //     modal.classList.remove('is-open')
      // } else {
        this.modal.addEventListener('animationend', function handler () {
          window.requestAnimationFrame(() => modal.classList.remove('is-open'))
          modal.removeEventListener('animationend', handler, false)
        }, false)
      // }
      this.modal.setAttribute('aria-hidden', 'true')
      this.removeEventListeners()
      this.scrollBehaviour('enable')
      //this.activeElement.focus()
      this.callbacks.onClose(this.modal)

      openedModal = null
      activeModal = null;

       document.documentElement.classList.remove('modal-open')

    }

    scrollBehaviour (toggle) {

      
      if (this.disableScroll === false) return




      const body = document.body
      const html = document.documentElement
      switch (toggle) {
        case 'enable':
          body.style.overflow = '';
          body.style.height = '';
          body.style.position = '';
          //html.style.overflow = '';
          body.style.paddingRight = ''
          //console.log('enable')
          break
        case 'disable':
          scrollY = window.scrollY || document.documentElement.scrollTop;
          body.style.overflow = 'hidden';
          //html.style.overflow = 'hidden';
          body.style.paddingRight = scrollbarWidth+'px'
          //console.log('disable')
          if (bowser.ios) {
              body.style.height = '100vh';
              body.style.position = 'fixed';
          }
          break
        default:
      }

      if (bowser.ios) {
          document.body.scrollTop = scrollY
          window.scrollTo(0, scrollY);
      }
      

    }

    addEventListeners () {
      this.modal.addEventListener('touchstart', this.onClick)
      this.modal.addEventListener('click', this.onClick)
      document.addEventListener('keydown', this.onKeydown)
    }

    removeEventListeners () {
      this.modal.removeEventListener('touchstart', this.onClick)
      this.modal.removeEventListener('click', this.onClick)
      document.removeEventListener('keydown', this.onKeydown)
    }

    onClick (event) {
      console.log(event.target)
      if (event.target.hasAttribute('data-micromodal-close') || event.target.closest('button[data-micromodal-close]')) {
        this.closeModal()
        event.preventDefault()
      }
    }

    onKeydown (event) {
      if (event.keyCode === 27) this.closeModal(event)
      if (event.keyCode === 9) this.maintainFocus(event)
    }

    getFocusableNodes () {
      const nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Object.keys(nodes).map((key) => nodes[key])
    }

    setFocusToFirstNode () {
      const focusableNodes = this.getFocusableNodes()
      //if (focusableNodes.length) focusableNodes[0].focus()
    }

    maintainFocus (event) {
      var focusableNodes = this.getFocusableNodes()
      var focusedItemIndex = focusableNodes.indexOf(document.activeElement)

      if (event.shiftKey && focusedItemIndex === 0) {
        focusableNodes[focusableNodes.length - 1].focus()
        event.preventDefault()
      }

      if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
        focusableNodes[0].focus()
        event.preventDefault()
      }
    }
  }

  const generateTriggerMap = triggers => {
    const triggerMap = []

    triggers.forEach(trigger => {
      const targetModal = trigger.dataset.micromodalTrigger
      if (triggerMap[targetModal] === undefined) triggerMap[targetModal] = []
      triggerMap[targetModal].push(trigger)
    })

    return triggerMap
  }

  const validateModalPresence = id => {
    if (!document.getElementById(id)) {
      console.warn(`MicroModal \u2757Seems like you have missed %c'${id}'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.')
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<div class="modal" id="${id}"></div>`)
      return false
    }
  }

  const validateTriggerPresence = triggers => {
    if (triggers.length <= 0) {
      console.warn(`MicroModal \u2757Please specify at least one %c'micromodal-trigger'`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.')
      console.warn(`%cExample:`, 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', `<a href="#" data-micromodal-trigger="my-modal"></a>`)
      return false
    }
  }

  const validateArgs = (triggers, triggerMap) => {
    validateTriggerPresence(triggers)
    if (!triggerMap) return true
    for (var id in triggerMap) validateModalPresence(id)
    return true
  }

  const init = config => {
    const options = config || {}

    const triggers = [...document.querySelectorAll('[data-micromodal-trigger]')]
    const triggerMap = generateTriggerMap(triggers)

    if (
      options.debugMode === true &&
      validateArgs(triggers, triggerMap) === false
    ) return

    for (var key in triggerMap) {
      let value = triggerMap[key]
      options.targetModal = key
      options.triggers = [...value]
      new Modal(options) // eslint-disable-line no-new
    }
  }

  let activeModal = null

  /**
   * Shows a particular modal
   * @param  {string} targetModal [The id of the modal to display]
   * @param  {{object}} config [The configuration object to pass]
   * @return {void}
   */
  const show = (targetModal, config) => {
    const options = config || {}
    options.targetModal = targetModal

    if (
      options.debugMode === true &&
      validateModalPresence(targetModal) === false
    ) return

    if (activeModal) {
      activeModal.closeModal()
    }
 
    activeModal = new Modal(options) // eslint-disable-line no-new
    activeModal.showModal()


  }

  const close = () => {

    activeModal.closeModal()
  }

  return { init, show, close }
})()

module.exports = MicroModal