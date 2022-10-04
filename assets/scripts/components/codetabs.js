import { getQueryParameterByName } from '../helpers/browser';

const initCodeTabs = () => {
    const codeTabsList = document.querySelectorAll('.code-tabs')
    const tabQueryParameter = getQueryParameterByName('tab') || getQueryParameterByName('tabs')

    const init = () => {
        renderCodeTabElements()
        addEventListeners()
        activateTabsOnLoad()
    }

    /**
     * Renders code tabs on the page at run time
    */
    const renderCodeTabElements = () => {
        if (codeTabsList.length > 0) {
            codeTabsList.forEach(codeTabsElement => {
                const navTabsElement = codeTabsElement.querySelector('.nav-tabs')
                const tabContent = codeTabsElement.querySelector('.tab-content')
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

    /**
     * Adds active class to the selected tab and shows the related tab pane. 
     * @param {object} tabAnchorElement - Reference to the HTML DOM node representing the anchor tag within each tab.
    */
    const activateCodeTab = (tabAnchorElement) => {
        const activeLang = tabAnchorElement.getAttribute('data-lang')

        if (activeLang) {
            codeTabsList.forEach(codeTabsElement => {
                const tabsList = codeTabsElement.querySelectorAll('.nav-tabs li')
                const tabPanesList = codeTabsElement.querySelectorAll('.tab-pane')
                const activeLangTab = codeTabsElement.querySelector(`a[data-lang="${activeLang}"]`)
                const activePane = codeTabsElement.querySelector(`.tab-pane[data-lang="${activeLang}"]`)

                if (activeLangTab && activePane) {
                    // Hide all tab content and remove 'active' class from all tab elements.
                    tabsList.forEach(tab => tab.classList.remove('active'))
                    tabPanesList.forEach(pane => pane.classList.remove('active', 'show'))

                    // Show the active content and highlight active tab.
                    activeLangTab.closest('li').classList.add('active')
                    activePane.classList.add('active', 'show')
                }
                
                const currentActiveTab = codeTabsElement.querySelector('.nav-tabs li.active')

                // If we got this far and no tabs are highlighted, activate the first tab in the list of code tabs.
                if (!currentActiveTab) {
                    const firstTab = tabsList.item(0)
                    const firstTabActiveLang = firstTab.querySelector('a').dataset.lang
                    const firstTabPane = codeTabsElement.querySelector(`.tab-pane[data-lang="${firstTabActiveLang}"]`)
                    firstTab.classList.add('active')
                    firstTabPane.classList.add('active', 'show')
                }
            })
        }

        updateUrl(activeLang)
    }

    const activateTabsOnLoad = () => {
        if (tabQueryParameter) {
            const selectedLanguageTab = document.querySelector(`a[data-lang="${tabQueryParameter}"]`);

            if (selectedLanguageTab) {
                selectedLanguageTab.click()
            }
        } else {
            if (codeTabsList.length > 0) {
                const firstTab = document.querySelectorAll('.code-tabs .nav-tabs a').item(0)
                activateCodeTab(firstTab)
            }
        }
    }

    const addEventListeners = () => {
        const allTabLinksNodeList = document.querySelectorAll('.code-tabs .nav-tabs li a')

        allTabLinksNodeList.forEach(link => {
            link.addEventListener('click', () => {
                event.preventDefault()
                activateCodeTab(link)
            })
        })
    }

    /**
     * Append the active lang to the URL as a query parameter. 
    */
    const updateUrl = (activeLang) => {
        const url = window.location.href
            .replace(window.location.hash, '')
            .replace(window.location.search, '')

        const queryParams = new URLSearchParams(window.location.search)
        queryParams.set('tab', activeLang)

        if (queryParams.get('tabs')) {
            queryParams.delete('tabs')
        }

        window.history.replaceState(
            null,
            null,
            `${url}?${queryParams}${window.location.hash}`
        );
    }

    init()
}

export default initCodeTabs;
