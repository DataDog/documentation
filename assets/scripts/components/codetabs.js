import { getQueryParameterByName } from '../helpers/browser';
import { getCookieByName } from '../helpers/helpers';
import regionConfig from '../config/regions.config';

const initCodeTabs = () => {
    let codeTabsList = document.querySelectorAll('.code-tabs');
    const { allowedRegions } = regionConfig;
    const tabQueryParameter = getQueryParameterByName('tab') || getQueryParameterByName('tabs')
    const codeTabParameters = allowedRegions.reduce((k,v) => ({...k, [v]: {}}), {});

    const init = () => {
        renderCodeTabElements()
        addEventListeners()
        activateTabsOnLoad()
        getContentTabHeight()
        addObserversToCodeTabs()

        // Detect when tabs wrap and apply tabs-wrap-layout class
        const detectTabWrapping = () => {
            const tabContainers = document.querySelectorAll('.code-tabs');

            tabContainers.forEach(container => {
                const tabsNav = container.querySelector('.nav-tabs');
                if (!tabsNav) return;

                // Get the total width of all tabs including gaps
                const tabsList = Array.from(tabsNav.querySelectorAll('li'));
                const totalTabsWidth = tabsList.reduce((sum, tab) => {
                    const style = window.getComputedStyle(tab);
                    const width = tab.offsetWidth;
                    const marginLeft = parseFloat(style.marginLeft);
                    const marginRight = parseFloat(style.marginRight);
                    return sum + width + marginLeft + marginRight;
                }, 0);

                // Add a larger buffer (40px) to prevent edge case flickering
                const containerWidth = tabsNav.offsetWidth;
                const shouldWrap = totalTabsWidth > (containerWidth - 40);

                if (shouldWrap) {
                    container.classList.add('tabs-wrap-layout');
                } else {
                    container.classList.remove('tabs-wrap-layout');
                }
            });
        };

        // Debounce the resize handler to improve performance
        let resizeTimeout;
        const debouncedDetectTabWrapping = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(detectTabWrapping, 100);
        };

        // Initial detection
        detectTabWrapping();

        // Recalculate on window resize with debouncing
        window.addEventListener('resize', debouncedDetectTabWrapping);
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

    const scrollToAnchor = (tab, anchorname) => {
        const anchor = document.querySelectorAll(`[data-lang='${tab}'] ${anchorname}`)[0];

        if (anchor) {
            anchor.scrollIntoView();
        } else {
            document.querySelector(anchorname).scrollIntoView();
        }
    }

    const activateTabsOnLoad = () => {
        const firstTab = document.querySelectorAll('.code-tabs .nav-tabs a').item(0)
        if (tabQueryParameter) {
            const selectedLanguageTab = document.querySelector(`a[data-lang="${tabQueryParameter}"]`);

            if (selectedLanguageTab) {
                activateCodeTab(selectedLanguageTab)
                if (window.location.hash) {
                    setTimeout(function () {
                        scrollToAnchor(tabQueryParameter, window.location.hash);
                    }, 300);
                }
            }else{
                activateCodeTab(firstTab)
            }
        } else {
            if (codeTabsList.length > 0) {
                activateCodeTab(firstTab)
            }
        }
    }

    const addEventListeners = () => {
        if (codeTabsList.length > 0) {
            codeTabsList.forEach(codeTabsElement => {
                let allTabLinksNodeList = codeTabsElement.querySelectorAll('.nav-tabs li a');
                allTabLinksNodeList.forEach(link => {
                    link.addEventListener('click', e => {
                        e.preventDefault();

                        const previousTabPosition = e.target.getBoundingClientRect().top

                        activateCodeTab(link);
                        getContentTabHeight();

                        // ensures page doesnt jump when navigating tabs.
                        // takes into account page shifting that occurs due to navigating tabbed content w/ height changes.
                        // implementation of synced tabs from https://github.com/withastro/starlight/blob/main/packages/starlight/user-components/Tabs.astro
                        window.scrollTo({
                            top: (window.scrollY + e.target.getBoundingClientRect().top) - previousTabPosition,
                            behavior: "instant"
                        });
                        getContentTabHeight();
                    })
                });
            });
        }
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

    const addObserversToCodeTabs = () => {
        allowedRegions.forEach((targetRegion) => {
        let tabContentList = document.querySelectorAll('.tab-content');
        tabContentList = filterArrayOfNonRegionalCodeTabs(tabContentList, targetRegion);
        const resizeObserver = new ResizeObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (entry?.contentBoxSize?.[0]) {
                            const elementTop = entry.target.getBoundingClientRect().top + window.scrollY;
                            const elementCurrentHeight = entry.target.getBoundingClientRect().height;
                            const elementHeightDifference =  elementCurrentHeight - codeTabParameters[targetRegion][idx].elementCurrentHeight;
                            codeTabParameters[targetRegion][idx] = {
                                elementTop,
                                elementCurrentHeight,
                                elementHeightDifference: Math.round(elementHeightDifference),
                            }
                        }
                    })
                });
                tabContentList.forEach((codeTabsElement) => {
                    resizeObserver.observe(codeTabsElement);
                })
            })
    }

    const getContentTabHeight = () => {
        allowedRegions.forEach((targetRegion) => {
            let tabContentList = document.querySelectorAll('.tab-content');
            tabContentList = filterArrayOfNonRegionalCodeTabs(tabContentList, targetRegion);
            tabContentList.forEach((tabContentElement, idx) => {
                    if (codeTabParameters?.[targetRegion]?.[idx]) {
                        const elementCurrentHeight = tabContentElement.getBoundingClientRect().height;
                        const elementHeightDifference = elementCurrentHeight - codeTabParameters[targetRegion][idx].elementCurrentHeight;
                        codeTabParameters[targetRegion][idx] = {
                            elementTop: codeTabParameters[targetRegion][idx].elementTop || tabContentElement.getBoundingClientRect().top + window.scrollY,
                            elementCurrentHeight,
                            elementHeightDifference: Math.round(elementHeightDifference),
                        }
                    } else {
                        codeTabParameters[targetRegion][idx] = {
                            elementCurrentHeight: tabContentElement.getBoundingClientRect().height,
                            ...codeTabParameters?.[targetRegion]?.[idx]
                        }
                    }
            });
        });
    }

    const filterArrayOfNonRegionalCodeTabs = (codeTabElements, targetRegion) => {
        return [...codeTabElements].filter((codeTabElement) => {
            let targetNode = codeTabElement;
            const arr = [];
            while (targetNode) {
                if (targetNode instanceof Element && targetNode?.hasAttribute("data-region")) {
                    return targetNode.getAttribute("data-region").includes(targetRegion) ? true : false;
                }
                arr.unshift(targetNode);
                targetNode = targetNode.parentNode;
            }
            return true;
        })
    }

    init()
}

export default initCodeTabs