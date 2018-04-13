// version 2

// required polyfills:
//     dataset
//     closest
//     Map

let {
    forEach,
    getDatasetBoolean,
    replaceHash,
    guid,
    setOpts
} = require('helpers')

// use only for animation
// if (!window.jQuery) {
//     window.$ = window.jQuery = require("jquery");
// }

function setStatusAria(opts, tab, panel, s) {
    tab.setAttribute('aria-selected', !!s)
    if (opts.useAnimation) {
        panel.setAttribute('aria-expanded', !!s)
    }
    panel.setAttribute('aria-hidden', !s)
}

let tablistList = {}


let defaultSettings = {
    closeAll: true,
    multiExpand: false,
    useAnimation: true,
    useHistory: false,
    siblingPanel: false, // связывать tab и panel по соседству и генерировать id
    setOddEven: false, // добавлять класс четный / нечетный
    classTabActive: 'tablist-tab-active',
    classItemActive: 'tablist-item-active',
    classPanelActive: 'tablist-panel-active',
}

class Tablist {

    constructor(tablist, opts = {}){

        // если таблист уже инициализирован, тогда не продолжаем
        if (!tablist || tablist.classList.contains('tablist--initialized')) return;
        // Если медиавыражение не указанно или оно неверно - не продолжаем.
   
        
        setOpts(this, opts, defaultSettings)
       
        this.tablist = tablist
        this.panels = new Map()
        this.tabs = new Map()
        this.items = new Map()



        tablist.id = tablist.id || guid('tablist-')
        tablist.setAttribute('role', 'tablist')

        forEach(tablist.querySelectorAll('[data-tablist-tab]'), tab => {

            let panel = document.getElementById(tab.dataset.tablistTab)

            
            
            if (!panel && this.opts.siblingPanel) {
                panel = tab.nextElementSibling;
                panel.id = panel.id || guid('panel-')
            }

            if (!panel) return;
            
            let item  = tab.closest('[data-tablist-item]') || tab.parentNode;

            tab.id = tab.id || 'tab-'+panel.id

            tab.setAttribute('role', 'tab')
            tab.setAttribute('aria-controls', panel.id)
            panel.setAttribute('aria-labelledby', tab.id)
            panel.setAttribute('role', 'tabpanel')

            this.tabs.set(tab.id, tab)
            this.items.set(tab, item)
            this.panels.set(tab, panel)

            // Если таб не кнопка или не ссылка - добавляем tabindex и клик по нажатию клавиши Enter
            if (!/BUTTON|A/.test(tab.tagName)) {
                tab.setAttribute('tabindex', 0)
                tab.addEventListener('keyup', function(e){
                    if (e.keyCode == 13){
                        tab.click();
                    }
                })
            }

            if (item.tagName == 'LI') {
                item.setAttribute('role', 'presentation')
            }


            // Проверяем, активный ли таб
            let active = tab.classList.contains(this.opts.classTabActive)

            // Устанавливаем состояния для веб-доступности
            setStatusAria(this.opts, tab, panel, active)

            panel.classList.add('tablist-panel--initialized')

            tab.addEventListener('click', (e) => {
                e.preventDefault()
                this.toggle(tab)
            })

            let closeElem = panel.querySelector('[data-close]')
            if (closeElem) {
                closeElem.addEventListener('click', () => {
                    this.close(tab)  
                })
            }
            
        })



        this.isInit = true
        tablist.classList.add('tablist--initialized')
        tablistList[tablist.id] = this;

        if (this.opts.onInit) {
            this.opts.onInit()
        } 
        
    }
    toggle(tab, s = !tab.classList.contains(this.opts.classTabActive)) { // если действие не указано, проверяем, активный ли элементы и закрываем (и наоборот)

        if (typeof tab == 'string') {
            tab = this.tabs.get(tab)
        }

        if (!tab) return;
        
        // приводим к булевому значению
        s = !!s



        if (!this.opts.closeAll && !s) {
            // Если активных табов меньше или равно 1 не закрываем таб
            if (this.tablist.querySelectorAll('[data-tablist-tab].'+this.opts.classTabActive).length <= 1) return;
        }

        if (!this.opts.multiExpand) {

            this.panels.forEach((panel, tab) => {

                this.items.get(tab).classList.remove(this.opts.classItemActive)
                
                tab.classList.remove(this.opts.classTabActive)
                panel.classList.remove(this.opts.classPanelActive)

                setStatusAria(this.opts, tab, panel, false)
                
                if (this.opts.useAnimation) $(panel).slideUp()
            })
        }

        let panel = this.panels.get(tab)
        let item  = this.items.get(tab)

        if (s) {
            forEach(panel.querySelectorAll('[data-lazy]'), function(img) {
                img.src = img.dataset.lazy
            })
        }

        setStatusAria(this.opts, tab, panel, s)

        let action = s ? 'add' : 'remove';

        item.classList[action](this.opts.classItemActive)
        tab.classList[action](this.opts.classTabActive)
        panel.classList[action](this.opts.classPanelActive)

        if (this.opts.useHistory) {
            replaceHash(s ? tab.id : '')
        }

        if (this.opts.useAnimation) {
            if (s) {
                $(panel).slideDown()
            } else {
                $(panel).slideUp()
            }
        }

        if (s) {
            this.opts.onOpen && this.opts.onOpen(tab)
        } else {
            this.opts.onClose && this.opts.onClose(tab)
        }


        if (this.opts.setOddEven) {
             
             let activePanels = [];
             this.panels.forEach((panel, i) => {
                if (panel.classList.contains(this.opts.classPanelActive)) {
                    activePanels.push(panel)
                }
             })
             activePanels.forEach(function(panel, i) {
                 if (i % 2 == 0) {
                     panel.classList.remove('odd')
                     panel.classList.add('even')
                 } else {
                     panel.classList.remove('even')
                    panel.classList.add('odd')
                 }
             })
        }

    }
    open (tab) {
        this.toggle.bind(this, tab, 1)()
    }
    close (tab) {
        this.toggle.bind(this, tab, 0)()
    }
    static get(id) {
        return tablistList[id]
    }
    static initAll(){
        forEach(document.querySelectorAll('[data-tablist]'), function(elem) {

            let tablist = new Tablist(elem, {
                closeAll: getDatasetBoolean(elem, 'closeAll'),
                multiExpand: getDatasetBoolean(elem, 'multiExpand'),
                useAnimation: getDatasetBoolean(elem, 'useAnimation'),
                useHistory: getDatasetBoolean(elem, 'useHistory'),
                siblingPanel: getDatasetBoolean(elem, 'siblingPanel'),
                setOddEven: getDatasetBoolean(elem, 'setOddEven')
            })



            if (tablist.opts.multiExpand && tablist.isInit) {
                tablist.tabs.forEach(function(tab) {
                    if (tab.classList.contains(tablist.opts.classTabActive)) {
                        tablist.open(tab)
                    } else {
                        tablist.close(tab)
                    }
                })
            }
            
        })
    }
}

module.exports = Tablist