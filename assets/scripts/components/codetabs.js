import { getQueryParameterByName } from '../helpers/browser';

const codeTabNodeList = document.querySelectorAll('.code-tabs')

const initTabs = () => {
    const tab = getQueryParameterByName('tab')
    // const codeTabNodeList = document.querySelectorAll('.code-tabs')

    // create tabs dynamically
    createTabs()

    activateTabOnLoad()

    addTabEventListeners()

    // activate tab on page load
    if (tab) {
        const selectedLanguageTab = document.querySelector(`a[data-lang="${tab}"]`);

        if (selectedLanguageTab) {
            selectedLanguageTab.click()
        }
    } else {            
        codeTabNodeList.forEach(codeTab => {
            const navTabs = codeTab.querySelector('.nav-tabs')
            const firstTabLink = navTabs.querySelectorAll('a').item(0)
            activateTab(firstTabLink)
        })
    }

    const allTabLinksNodeList = document.querySelectorAll('.code-tabs li a')

    allTabLinksNodeList.forEach(link => {
        link.addEventListener('click', () => {
            console.log(link)
            event.preventDefault()
            activateTab(link)
        })
    })
}

const createTabs = () => {
    if (codeTabNodeList.length > 0) {
        codeTabNodeList.forEach(codeTab => {
            const navTabsElement = codeTab.querySelector('.nav-tabs')
            const tabContent = codeTab.querySelector('.tab-content')
            const tabPaneNodeList = tabContent.querySelectorAll('.tab-pane')

            tabPaneNodeList.forEach(tabPane => {
                const title = tabPane.getAttribute('title')
                const lang = tabPane.getAttribute('data-lang')
                const li = document.createElement('li')
                const anchor = document.createElement('a')
                anchor.dataset.lang = lang
                anchor.href = '#'
                anchor.innerText = title
                li.appendChild(anchor)
                navTabsElement.appendChild(li)
            })
        })
    }
}

const activateTab = (element) => {
    const activeLang = element.getAttribute('data-lang')

    if (activeLang) {
        const allActiveTabLangs = document.querySelectorAll(`a[data-lang="${activeLang}"]`)

        allActiveTabLangs.forEach(tab => {
            const parentLi = tab.closest('li')
            parentLi.classList.add('active')
        })

        // find closest tab that has the data lang
        const tabPanes = document.querySelectorAll(`.tab-pane[data-lang="${activeLang}"]`)

        tabPanes.forEach(pane => {
            pane.classList.add('active')
            pane.classList.add('show')
        })
    }
}

const codeTabs = () => {
    initTabs()
}

// function codeTabs() {
//     const tab = getQueryParameterByName('tab');

//     if ($('.code-tabs').length > 0) {
//         // clicking a tab open them all
//         $('.code-tabs .nav-tabs a').click(function (e) {
//             e.preventDefault();

//             // find all
//             const lang = $(this).data('lang');
//             $('.code-tabs .nav-tabs').each(function () {
//                 const navtabs = $(this);
//                 const links = $(this).find('a:first');
//                 const langLinks = $(this).find(`a[data-lang="${lang}"]`);
//                 if (langLinks.length) {
//                     langLinks.each(function () {
//                         activateTab($(this));
//                     });
//                 } else if (navtabs.find('.active').length === 0) {
//                     // set first lang selected if nothing selected
//                     links.each(function () {
//                         activateTab($(this));
//                     });
//                 }
//             });

//             const url = window.location.href
//                 .replace(window.location.hash, '')
//                 .replace(window.location.search, '');
//             window.history.replaceState(
//                 null,
//                 null,
//                 `${url}?tab=${lang}${window.location.hash}`
//             );
//         });
// }

// function activateTab(el) {
//     const tab = el.parent();
//     const tabIndex = tab.index();
//     const tabPanel = el.closest('.code-tabs');
//     const tabPane = tabPanel.find('.tab-pane').eq(tabIndex);
//     tabPanel.find('.active').removeClass('active');
//     tab.addClass('active');
//     tabPane.addClass('active');
//     tabPane.addClass('show');
//     el.closest('.code-tabs')
//         .find('.nav-tabs-mobile .title-dropdown')
//         .text(tab.text());
// }

export default codeTabs;
