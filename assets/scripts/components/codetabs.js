import { getQueryParameterByName } from '../helpers/browser';
import regionConfig from '../config/regions.config';

const initCodeTabs = () => {
    let codeTabsList = [];
    const { allowedRegions } = regionConfig;
    const tabQueryParameter = getQueryParameterByName('tab') || getQueryParameterByName('tabs');
    const codeTabParameters = allowedRegions.reduce((k, v) => ({ ...k, [v]: {} }), {});
    let resizeTimeout;
    let currentActiveTab = null; // Store the current active tab

    const cleanupExistingTabs = () => {
        // Store current active tab before cleanup
        const activeTab = document.querySelector('.code-tabs .nav-tabs li.active a');
        if (activeTab) {
            currentActiveTab = activeTab.getAttribute('data-lang');
        }

        // Remove all existing tab navigation elements
        document.querySelectorAll('.nav-tabs').forEach((navTabs) => {
            // Only remove if it's a child of a code-tabs container
            if (navTabs.closest('.code-tabs')) {
                navTabs.innerHTML = '';
            }
        });
    };

    const detectTabs = () => {
        codeTabsList = document.querySelectorAll('.code-tabs');
    };

    const detectTabWrapping = () => {
        const tabContainers = document.querySelectorAll('.code-tabs');

        tabContainers.forEach((container) => {
            const tabsNav = container.querySelector('.nav-tabs');
            if (!tabsNav) return;

            const tabs = tabsNav.querySelectorAll('li');
            if (tabs.length < 2) return; // Need at least two tabs to wrap

            const firstTab = tabs[0];
            const lastTab = tabs[tabs.length - 1];

            // Store original state
            const originalHasClass = container.classList.contains('tabs-wrap-layout');

            // Ensure measurement happens in the unwrapped state
            container.classList.remove('tabs-wrap-layout');

            // Force layout recalculation
            void tabsNav.offsetHeight;

            const firstTop = firstTab.offsetTop;
            const lastTop = lastTab.offsetTop;
            const heightDifference = lastTop - firstTop;

            // Determine if it *should* be wrapped based on measurement in unwrapped state
            // Use a small buffer (e.g., 2px) to account for rendering variations
            const shouldBeWrapped = heightDifference > 2;

            // Apply the correct class if the state needs to change
            if (shouldBeWrapped !== originalHasClass) {
                if (shouldBeWrapped) {
                    container.classList.add('tabs-wrap-layout');
                } else {
                    container.classList.remove('tabs-wrap-layout');
                }
            } else {
                // If no change needed, ensure the class is restored if it was removed for measurement
                if (originalHasClass) {
                    container.classList.add('tabs-wrap-layout');
                }
            }
        });
    };

    const debouncedDetectTabWrapping = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(detectTabWrapping, 150); // Increased debounce time
    };

    const init = () => {
        // Clean up existing tabs first
        cleanupExistingTabs();

        detectTabs();
        renderCodeTabElements();
        addEventListeners();
        activateTabsOnLoad();
        getContentTabHeight();
        addObserversToCodeTabs();

        // Initial detection with font loading check
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                // Force reflow after fonts are loaded
                document.body.offsetHeight;
                detectTabWrapping();
            });
        } else {
            // Fallback for browsers without font loading API
            detectTabWrapping();
        }

        // Remove any existing resize listeners
        window.removeEventListener('resize', debouncedDetectTabWrapping);
        // Add new resize listener
        window.addEventListener('resize', debouncedDetectTabWrapping);
    };

    /**
     * Renders code tabs on the page at run time
     */
    const renderCodeTabElements = () => {
        if (codeTabsList.length > 0) {
            codeTabsList.forEach((codeTabsElement) => {
                const navTabsElement = codeTabsElement.querySelector('.nav-tabs');
                const tabContent = codeTabsElement.querySelector('.tab-content');
                const tabPaneNodeList = tabContent.querySelectorAll('.tab-pane');

                // Create a map to track unique tab titles
                const uniqueTabs = new Map();

                tabPaneNodeList.forEach((tabPane) => {
                    const title = tabPane.getAttribute('title');
                    const lang = tabPane.getAttribute('data-lang');

                    // Only add the tab if we haven't seen this title before
                    if (!uniqueTabs.has(title)) {
                        uniqueTabs.set(title, true);

                        const li = document.createElement('li');
                        const anchor = document.createElement('a');
                        anchor.dataset.lang = lang;
                        anchor.href = '#';
                        anchor.innerText = title;
                        li.appendChild(anchor);
                        navTabsElement.appendChild(li);
                    }
                });
            });
        }
    };

    /**
     * Adds active class to the selected tab and shows the related tab pane.
     * @param {object} tabAnchorElement - Reference to the HTML DOM node representing the anchor tag within each tab.
     */
    const activateCodeTab = (tabAnchorElement) => {
        const activeLang = tabAnchorElement.getAttribute('data-lang');

        if (activeLang) {
            codeTabsList.forEach((codeTabsElement) => {
                const tabsList = codeTabsElement.querySelectorAll('.nav-tabs li');
                const tabPanesList = codeTabsElement.querySelectorAll('.tab-pane');
                const activeLangTab = codeTabsElement.querySelector(`a[data-lang="${activeLang}"]`);
                const activePane = codeTabsElement.querySelector(`.tab-pane[data-lang="${activeLang}"]`);

                if (activeLangTab && activePane) {
                    // Hide all tab content and remove 'active' class from all tab elements.
                    // Also, remove any inline display style to let CSS classes control visibility.
                    tabsList.forEach((tab) => tab.classList.remove('active'));
                    tabPanesList.forEach((pane) => {
                        pane.classList.remove('active', 'show');
                        pane.style.removeProperty('display');
                    });

                    // Show the active content and highlight active tab.
                    activeLangTab.closest('li').classList.add('active');
                    activePane.classList.add('active', 'show');
                    activePane.style.removeProperty('display');
                }

                const currentActiveTab = codeTabsElement.querySelector('.nav-tabs li.active');

                // If we got this far and no tabs are highlighted, activate the first tab in the list of code tabs.
                if (!currentActiveTab) {
                    const firstTab = tabsList.item(0);
                    const firstTabActiveLang = firstTab.querySelector('a').dataset.lang;
                    const firstTabPane = codeTabsElement.querySelector(`.tab-pane[data-lang="${firstTabActiveLang}"]`);
                    firstTab.classList.add('active');
                    firstTabPane.classList.add('active', 'show');
                }
            });

            // Run tab wrapping detection after tab activation with slight delay
            setTimeout(detectTabWrapping, 10);
        }

        updateUrl(activeLang);
    };

    const scrollToAnchor = (tab, anchorname) => {
        const anchor =
            document.querySelectorAll(`[data-lang='${tab}'] ${anchorname}`)[0] || document.querySelector(anchorname);

        if (anchor) {
            anchor.scrollIntoView();
        }
    };

    const activateTabsOnLoad = () => {
        // If we have a stored active tab from before reinitialization, use that
        if (currentActiveTab) {
            const selectedLanguageTab = document.querySelector(`a[data-lang="${currentActiveTab}"]`);
            if (selectedLanguageTab) {
                activateCodeTab(selectedLanguageTab);
                return;
            }
        }

        // Otherwise use URL parameter or fall back to first tab
        const firstTab = document.querySelectorAll('.code-tabs .nav-tabs a').item(0);
        if (tabQueryParameter) {
            const selectedLanguageTab = document.querySelector(`a[data-lang="${tabQueryParameter}"]`);

            if (selectedLanguageTab) {
                activateCodeTab(selectedLanguageTab);
                if (window.location.hash) {
                    setTimeout(function () {
                        scrollToAnchor(tabQueryParameter, window.location.hash);
                    }, 300);
                }
            } else if (firstTab) {
                activateCodeTab(firstTab);
            }
        } else if (firstTab) {
            activateCodeTab(firstTab);
        }
    };

    const addEventListeners = () => {
        if (codeTabsList.length > 0) {
            codeTabsList.forEach((codeTabsElement) => {
                let allTabLinksNodeList = codeTabsElement.querySelectorAll('.nav-tabs li a');
                allTabLinksNodeList.forEach((link) => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();

                        const previousTabPosition = e.target.getBoundingClientRect().top;

                        activateCodeTab(link);
                        getContentTabHeight();

                        // ensures page doesnt jump when navigating tabs.
                        // takes into account page shifting that occurs due to navigating tabbed content w/ height changes.
                        // implementation of synced tabs from https://github.com/withastro/starlight/blob/main/packages/starlight/user-components/Tabs.astro
                        window.scrollTo({
                            top: window.scrollY + e.target.getBoundingClientRect().top - previousTabPosition,
                            behavior: 'instant'
                        });
                        getContentTabHeight();
                    });
                });
            });
        }
    };

    /**
     * Append the active lang to the URL as a query parameter.
     */
    const updateUrl = (activeLang) => {
        const url = window.location.href.replace(window.location.hash, '').replace(window.location.search, '');

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('tab', activeLang);

        if (queryParams.get('tabs')) {
            queryParams.delete('tabs');
        }

        window.history.replaceState(null, null, `${url}?${queryParams}${window.location.hash}`);
    };

    const addObserversToCodeTabs = () => {
        allowedRegions.forEach((targetRegion) => {
            let tabContentList = document.querySelectorAll('.tab-content');
            tabContentList = filterArrayOfNonRegionalCodeTabs(tabContentList, targetRegion);
            const resizeObserver = new ResizeObserver((entries) => {
                entries.forEach((entry, idx) => {
                    if (entry?.contentBoxSize?.[0]) {
                        const elementTop = entry.target.getBoundingClientRect().top + window.scrollY;
                        const elementCurrentHeight = entry.target.getBoundingClientRect().height;
                        const elementHeightDifference =
                            elementCurrentHeight - codeTabParameters[targetRegion][idx].elementCurrentHeight;
                        codeTabParameters[targetRegion][idx] = {
                            elementTop,
                            elementCurrentHeight,
                            elementHeightDifference: Math.round(elementHeightDifference)
                        };
                    }
                });
            });
            tabContentList.forEach((codeTabsElement) => {
                resizeObserver.observe(codeTabsElement);
            });
        });
    };

    const getContentTabHeight = () => {
        allowedRegions.forEach((targetRegion) => {
            let tabContentList = document.querySelectorAll('.tab-content');
            tabContentList = filterArrayOfNonRegionalCodeTabs(tabContentList, targetRegion);
            tabContentList.forEach((tabContentElement, idx) => {
                if (codeTabParameters?.[targetRegion]?.[idx]) {
                    const elementCurrentHeight = tabContentElement.getBoundingClientRect().height;
                    const elementHeightDifference =
                        elementCurrentHeight - codeTabParameters[targetRegion][idx].elementCurrentHeight;
                    codeTabParameters[targetRegion][idx] = {
                        elementTop:
                            codeTabParameters[targetRegion][idx].elementTop ||
                            tabContentElement.getBoundingClientRect().top + window.scrollY,
                        elementCurrentHeight,
                        elementHeightDifference: Math.round(elementHeightDifference)
                    };
                } else {
                    codeTabParameters[targetRegion][idx] = {
                        elementCurrentHeight: tabContentElement.getBoundingClientRect().height,
                        ...codeTabParameters?.[targetRegion]?.[idx]
                    };
                }
            });
        });
    };

    const filterArrayOfNonRegionalCodeTabs = (codeTabElements, targetRegion) => {
        return [...codeTabElements].filter((codeTabElement) => {
            let targetNode = codeTabElement;
            const arr = [];
            while (targetNode) {
                if (targetNode instanceof Element && targetNode?.hasAttribute('data-region')) {
                    return targetNode.getAttribute('data-region').includes(targetRegion) ? true : false;
                }
                arr.unshift(targetNode);
                targetNode = targetNode.parentNode;
            }
            return true;
        });
    };

    /**
     * If Cdocs is running on this page,
     * tell it to refresh the tabs when content changes
     */
    if (window.clientFiltersManager) {
        // Update the tabs after the page is initially rendered
        clientFiltersManager.registerHook('afterReveal', () => {
            // Reset stored tab on initial reveal
            currentActiveTab = null;
            init();
        });

        // Update the tabs after the page is re-rendered
        clientFiltersManager.registerHook('afterRerender', init);
    }

    init();

    // Add window load event to handle final detection after everything is loaded
    window.addEventListener('load', () => {
        // Final check after page is fully loaded (all resources)
        setTimeout(detectTabWrapping, 50);
    });
};

export default initCodeTabs;
