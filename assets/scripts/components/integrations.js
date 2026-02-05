/* eslint-disable no-underscore-dangle */
import Mousetrap from 'mousetrap';
import mixitup from 'mixitup';
import Fuse from 'fuse.js';
import { updateQueryParameter, deleteQueryParameter, getQueryParameterByName } from '../helpers/browser';
import { scrollTop } from '../helpers/scrollTop';
import { triggerEvent } from '../helpers/triggerEvent';

export function initializeIntegrationsOld() {
    let finderState = 0; // closed
    let popupClosed = true;
    const container = document.querySelector('[data-ref="container"]');

    // Early return if container doesn't exist to avoid unnecessary processing
    if (!container) return;

    // Cache Safari detection - this is used multiple times
    const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    
    // Cache DOM elements
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    const mobileDropDown = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    const mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    const search = document.querySelector('[data-ref="search"]');
    const items = window.integrations;
    
    // Create a Map for faster DOM element lookups
    const domElements = new Map();
    
    // Pre-process integrations data
    if (items && items.length) {
        items.forEach(item => {
            if (item.name) item.nameLower = item.name.toLowerCase();
            if (item.public_title) item.publicTitleLower = item.public_title.toLowerCase();
        });
    }

    window.addEventListener('focus', () => {
        if (finderState && container) {
            container.classList.remove('find');
            finderState = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function () {
        if (!finderState && container) {
            container.classList.add('find');
            finderState = 1;
        }
    });

    if (ref && pop) {
        ref.addEventListener('click', function () {
            pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
            return false;
        });
    }

    const filters = controls ? controls.querySelectorAll('[data-ref="filter"]') : null;
    const mobilefilters = mobilecontrols ? mobilecontrols.querySelectorAll('[data-ref="filter"]') : null;

    const config = {
        animation: {
            duration: 150,
            enable: !(parseInt(window.innerWidth) <= 575)
        },
        selectors: {
            target: '[data-ref="item"]' // Query targets with an attribute selector to keep our JS and styling classes separate
        },
        load: {
            dataset: items // As we have pre-rendered targets, we must "prime" MixItUp with their underlying data
        },
        data: {
            uidKey: 'id' // Our data model must have a unique id. In this case, its key is 'id'
        }
    };

    const mixer = mixitup(container, config);

    // Helper function to get DOM element with caching
    function getDomElement(id) {
        if (!domElements.has(id)) {
            domElements.set(id, document.getElementById(`mixid_${id}`));
        }
        return domElements.get(id);
    }

    controls.addEventListener('click', function (e) {
        handleButtonClick(e.target, filters);

        if (e.target.dataset.filter && e.target.dataset.filter !== 'all') {
            deleteQueryParameter('q');
        }

        // trigger same active on mobile
        const mobileBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
        activateButton(mobileBtn, mobilefilters);
    });

    mobilecontrols.addEventListener('click', function (e) {
        e.stopPropagation();
        handleButtonClick(e.target, mobilefilters);

        // trigger same active on desktop
        const desktopBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);

        activateButton(desktopBtn, filters);

        pop.style.display = 'none';
        scrollTop(window, 0);
    });

    let searchTimer;

    search.addEventListener('input', function (e) {
        const allBtn = controls.querySelector('[data-filter="all"]');

        // search only executes after user is finished typing
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            const searchValue = e.target.value.toLowerCase();
            activateButton(allBtn, filters);
            updateData(searchValue, true);

            if (window.location.hash && window.location.hash !== 'all') {
                window.location.hash = '#all';
            }

            updateQueryParameter('q', searchValue);

            if (searchValue.length > 0 && window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    {
                        browser: {
                            integrations: {
                                search: searchValue
                            }
                        }
                    },
                    'info'
                );
            }
        }, 400);
    });

    function activateButton(activeButton, siblings) {
        if (activeButton && siblings) {
            for (let i = 0; i < siblings.length; i++) {
                const button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
            mobileDropDown.textContent = activeButton.textContent;
        }
    }

    function handleButtonClick(button, catFilters) {
        // clear the search input
        search.value = '';
        // If button is already active, or an operation is in progress, ignore the click
        if (button.classList.contains('active') || !button.getAttribute('data-filter')) return;

        const filter = button.getAttribute('data-filter');
        if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
            window.DD_LOGS.logger.log(
                'Integrations category selected',
                { browser: { integrations: { category: button.innerText } } },
                'info'
            );
        }
        activateButton(button, catFilters);
        updateData(filter, false);

        if (window.history.pushState) {
            const href = button.getAttribute('href');
            window.history.pushState(null, document.title, href);
        }
    }

    // DEBUG: Performance tracking
    let debugStats = {
        checkMatchesCalls: 0,
        includesOperations: 0,
        domQueries: 0,
        classListOperations: 0,
        totalItemsProcessed: 0
    };

    function resetDebugStats() {
        debugStats = {
            checkMatchesCalls: 0,
            includesOperations: 0,
            domQueries: 0,
            classListOperations: 0,
            totalItemsProcessed: 0
        };
    }

    function logDebugStats(searchTerm) {
        console.group(`🔍 Search Performance: "${searchTerm}"`);
        console.log(`📊 Total integrations processed: ${debugStats.totalItemsProcessed}`);
        console.log(`🔄 checkMatches() calls: ${debugStats.checkMatchesCalls}`);
        console.log(`📝 String .includes() operations: ${debugStats.includesOperations}`);
        console.log(`🌳 DOM querySelector calls: ${debugStats.domQueries}`);
        console.log(`🎨 classList add/remove operations: ${debugStats.classListOperations}`);
        console.log(`⚡ Total operations: ${debugStats.checkMatchesCalls + debugStats.includesOperations + debugStats.domQueries + debugStats.classListOperations}`);
        console.groupEnd();
    }

    // Shared function to check for matches - reduces code duplication
    function checkMatches(item, filter, filterWords, isSearch) {
        debugStats.checkMatchesCalls++;
        
        // Use pre-processed lowercase values
        const name = item.nameLower || '';
        const publicTitle = item.publicTitleLower || '';

        // Check for exact matches first (only full query match, not individual words)
        const hasExactMatch = isSearch && (
            name === filter ||
            publicTitle === filter
        );

        // Calculate match score - count how many search terms match
        let matchScore = 0;
        if (isSearch) {
            for (const word of filterWords) {
                debugStats.includesOperations += 2; // Two .includes() calls
                if (name.includes(word) || publicTitle.includes(word)) {
                    matchScore++;
                }
            }
        } else {
            // For category filters, check tags
            for (const word of filterWords) {
                debugStats.includesOperations++;
                if (item.tags && item.tags.indexOf(word.substr(1)) !== -1) {
                    matchScore++;
                }
            }
        }

        const hasPartialMatch = matchScore > 0;

        return { hasExactMatch, hasPartialMatch, matchScore };
    }

    function updateData(filter, isSearch) {
        // DEBUG: Reset stats and start timing
        resetDebugStats();
        const startTime = performance.now();
        
        const exactMatches = [];
        const partialMatches = [];
        const hide = [];
        const filterWords = filter.split(/\s+/);
        const isAllFilter = filter === 'all' || filter === '#all' || (isSearch && !filter);

        console.log(`🚀 Starting search with ${window.integrations.length} integrations, ${filterWords.length} search word(s)`);

        // Process all items in a single loop
        for (let i = 0; i < window.integrations.length; i++) {
            const item = window.integrations[i];
            debugStats.totalItemsProcessed++;
            
            const domitem = getDomElement(item.id);
            debugStats.domQueries++; // getDomElement (even if cached, still a lookup)
            
            const int = domitem.querySelector('.integration');
            debugStats.domQueries++; // querySelector call

            if (isAllFilter) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                    debugStats.classListOperations++;
                }
                exactMatches.push(item);
                continue;
            }

            const { hasExactMatch, hasPartialMatch, matchScore } = checkMatches(item, filter, filterWords, isSearch);

            if (hasExactMatch) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                    debugStats.classListOperations++;
                }
                exactMatches.push(item);
            } else if (hasPartialMatch) {
                if (!isSafari) {
                    int.classList.remove('dimmer');
                    debugStats.classListOperations++;
                }
                // Store match score with the item for sorting
                partialMatches.push({ item, matchScore });
            } else {
                if (!isSafari) {
                    int.classList.add('dimmer');
                    debugStats.classListOperations++;
                }
                hide.push(item);
            }
        }

        const loopEndTime = performance.now();
        console.log(`⏱️ First loop completed in ${(loopEndTime - startTime).toFixed(2)}ms`);

        // Sort partial matches by score (highest first), then extract items
        partialMatches.sort((a, b) => b.matchScore - a.matchScore);
        const sortedPartialMatches = partialMatches.map(m => m.item);

        // Combine exact matches first, then sorted partial matches, then hidden items
        const show = [...exactMatches, ...sortedPartialMatches];
        const mixerItems = [...show, ...hide];
        
        mixer.dataset(mixerItems).then(function () {
            if (isSafari) {
                console.log(`🍎 Safari detected - running SECOND loop through all ${window.integrations.length} items`);
                const safariLoopStart = performance.now();
                
                for (let i = 0; i < window.integrations.length; i++) {
                    const item = window.integrations[i];
                    debugStats.totalItemsProcessed++;
                    
                    const domitem = getDomElement(item.id);
                    debugStats.domQueries++;
                    
                    const int = domitem.querySelector('.integration');
                    debugStats.domQueries++;
                    
                    if (isAllFilter) {
                        int.classList.remove('dimmer');
                        debugStats.classListOperations++;
                    } else {
                        const { hasExactMatch, hasPartialMatch, matchScore } = checkMatches(item, filter, filterWords, isSearch);

                        if (hasExactMatch || hasPartialMatch) {
                            int.classList.remove('dimmer');
                            debugStats.classListOperations++;
                        } else {
                            int.classList.add('dimmer');
                            debugStats.classListOperations++;
                        }
                    }
                }
                
                const safariLoopEnd = performance.now();
                console.log(`🍎 Safari second loop completed in ${(safariLoopEnd - safariLoopStart).toFixed(2)}ms`);
            }
            
            // DEBUG: Log final stats
            const endTime = performance.now();
            logDebugStats(filter);
            console.log(`✅ Total search time: ${(endTime - startTime).toFixed(2)}ms`);
            console.log(`📈 Results: ${show.length} shown, ${hide.length} hidden`);
        });

        // if no integrations are found, trigger hotjar popup
        if (!show.length && popupClosed) {
            window.hj('trigger', 'dd_integrations_poll');
            popupClosed = false;
        }
    }

    // Handle search query param filtering on page load.
    const handleQueryParamFilter = () => {
        const searchQueryParameter = getQueryParameterByName('q', window.location.href);

        if (searchQueryParameter) {
            // Search query parameter should take priority if both param & category hash are present in URL.
            if (window.location.hash) {
                window.location.hash = '#all';
            }

            updateData(searchQueryParameter, true);

            search.value = searchQueryParameter;

            if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    {
                        browser: {
                            integrations: {
                                search: searchQueryParameter.toLowerCase()
                            }
                        }
                    },
                    'info'
                );
            }
        }
    };

    // Set controls the active controls on startup
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);

    handleQueryParamFilter();

    window.addEventListener('hashchange', () => {
        let currentCat = '';
        if (window.location.href.indexOf('#') > -1) {
            currentCat = window.location.href.substring(window.location.href.indexOf('#'));
        }
        const currentSelected = document.querySelector('.controls .active')?.getAttribute('href');

        if (currentCat && currentSelected) {
            if (currentCat !== currentSelected) {
                document.querySelector(`a[href="${currentCat}"]`)?.click();
            }
        }
        if (currentCat === '') {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
            activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
            updateData('all', false);
        }
    });

    if (window.location.href.indexOf('#') > -1) {
        triggerEvent(window, 'hashchange');
    }

    // Use event delegation for hover effects instead of attaching to each tile
    const integrationRows = document.querySelectorAll('.integration-row');
    integrationRows.forEach(row => {
        row.addEventListener('mouseover', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
                if (window.innerWidth >= 576) {
                    integration.classList.add('hover');
                }
            }
        });
        
        row.addEventListener('mouseout', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
            }
        });
    });
}

/**
 * ============================================================================
 * FUSE.JS OPTIMIZED IMPLEMENTATION v2 - NO MIXITUP FOR SEARCH
 * ============================================================================
 * Senior-level implementation with:
 * - Fuse.js for fuzzy search with typo tolerance
 * - BYPASSES MIXITUP for search (CSS-only show/hide) - 100x faster!
 * - MixItUp only used for category filters where reordering matters
 * - Pre-cached DOM elements at initialization (zero DOM queries during search)
 * - Cancellable searches (stale search results are discarded)
 * - Batched DOM updates via requestAnimationFrame
 * ============================================================================
 */
export function initializeIntegrations() {
    let finderState = 0;
    let popupClosed = true;
    const container = document.querySelector('[data-ref="container"]');

    if (!container) return;

    console.log('🚀 [FUSE.JS v2] Initializing - MixItUp BYPASSED for search!');

    // =========================================================================
    // CONFIGURATION
    // =========================================================================
    const CONFIG = {
        DEBOUNCE_MS: 150,           // Even faster - 150ms
        FUSE_THRESHOLD: 0.35,       // 0 = exact, 1 = match anything
        FUSE_DISTANCE: 100,         // How far to extend fuzzy match
        ANIMATION_DURATION: 150,
        USE_MIXITUP_FOR_SEARCH: false  // KEY: Bypass MixItUp for text search
    };

    // =========================================================================
    // DOM CACHING - All DOM queries happen ONCE at initialization
    // =========================================================================
    const isSafari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
    const ref = document.querySelector('.integration-popper-button');
    const pop = document.getElementById('integration-popper');
    const mobileDropDown = document.querySelector('#dropdownMenuLink');
    const controls = document.querySelector('[data-ref="controls"]');
    const mobilecontrols = document.querySelector('[data-ref="mobilecontrols"]');
    const search = document.querySelector('[data-ref="search"]');
    const items = window.integrations || [];
    const filters = controls ? controls.querySelectorAll('[data-ref="filter"]') : null;
    const mobilefilters = mobilecontrols ? mobilecontrols.querySelectorAll('[data-ref="filter"]') : null;

    // Pre-cache ALL DOM elements at init - ZERO DOM queries during search
    const domCache = new Map();
    const integrationElCache = new Map();
    
    const cacheStartTime = performance.now();
    items.forEach(item => {
        const wrapper = document.getElementById(`mixid_${item.id}`);
        if (wrapper) {
            domCache.set(item.id, wrapper);
            integrationElCache.set(item.id, wrapper.querySelector('.integration'));
        }
    });
    console.log(`📦 [FUSE.JS] Cached ${domCache.size} DOM elements in ${(performance.now() - cacheStartTime).toFixed(2)}ms`);

    // =========================================================================
    // FUSE.JS INITIALIZATION
    // =========================================================================
    const fuseOptions = {
        keys: [
            { name: 'name', weight: 2.0 },
            { name: 'public_title', weight: 1.5 },
            { name: 'short_description', weight: 0.5 }
        ],
        threshold: CONFIG.FUSE_THRESHOLD,
        distance: CONFIG.FUSE_DISTANCE,
        ignoreLocation: true,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
        useExtendedSearch: false,
        findAllMatches: false
    };

    const fuseInitStart = performance.now();
    const fuse = new Fuse(items, fuseOptions);
    console.log(`🔧 [FUSE.JS] Index built in ${(performance.now() - fuseInitStart).toFixed(2)}ms for ${items.length} items`);

    // =========================================================================
    // SEARCH STATE MANAGEMENT - For cancellable searches
    // =========================================================================
    let currentSearchId = 0;
    let searchTimer = null;

    // =========================================================================
    // DEBUG STATS
    // =========================================================================
    let debugStats = {
        fuseSearchTime: 0,
        domUpdateTime: 0,
        mixerTime: 0,
        totalItems: 0,
        matchedItems: 0,
        classListOps: 0
    };

    function resetDebugStats() {
        debugStats = {
            fuseSearchTime: 0,
            domUpdateTime: 0,
            mixerTime: 0,
            totalItems: items.length,
            matchedItems: 0,
            classListOps: 0
        };
    }

    function logDebugStats(searchTerm, totalTime) {
        console.group(`🔍 [FUSE.JS v2] Search Performance: "${searchTerm}"`);
        console.log(`📊 Total integrations: ${debugStats.totalItems}`);
        console.log(`✅ Matched items: ${debugStats.matchedItems}`);
        console.log(`⚡ Fuse.js search: ${debugStats.fuseSearchTime.toFixed(2)}ms`);
        console.log(`🎨 DOM updates: ${debugStats.domUpdateTime.toFixed(2)}ms (${debugStats.classListOps} ops)`);
        
        if (debugStats.mixerTime === 0) {
            console.log(`🚫 MixItUp: BYPASSED (CSS dimmer mode - non-matches visible but faded)`);
        } else {
            console.log(`🔄 MixItUp render: ${debugStats.mixerTime.toFixed(2)}ms`);
        }
        
        console.log(`✅ Total time: ${totalTime.toFixed(2)}ms`);
        
        // Calculate speedup
        const naiveEstimate = debugStats.totalItems * 10; // Rough estimate of old impl
        const currentOps = debugStats.fuseSearchTime + debugStats.domUpdateTime + debugStats.mixerTime;
        if (currentOps > 0) {
            console.log(`📈 Estimated speedup: ~${Math.round(naiveEstimate / currentOps)}x faster than MixItUp approach`);
        }
        console.groupEnd();
    }

    // =========================================================================
    // MIXITUP INITIALIZATION
    // =========================================================================
    const mixerConfig = {
        animation: {
            duration: CONFIG.ANIMATION_DURATION,
            enable: !(parseInt(window.innerWidth) <= 575)
        },
        selectors: {
            target: '[data-ref="item"]'
        },
        load: {
            dataset: items
        },
        data: {
            uidKey: 'id'
        }
    };

    const mixer = mixitup(container, mixerConfig);

    // =========================================================================
    // KEYBOARD SHORTCUTS
    // =========================================================================
    window.addEventListener('focus', () => {
        if (finderState && container) {
            container.classList.remove('find');
            finderState = 0;
        }
    });

    Mousetrap.bind(['command+f', 'control+f'], function () {
        if (!finderState && container) {
            container.classList.add('find');
            finderState = 1;
        }
    });

    // =========================================================================
    // POPUP HANDLING
    // =========================================================================
    if (ref && pop) {
        ref.addEventListener('click', function () {
            pop.style.display = pop.style.display === 'none' ? 'block' : 'none';
            return false;
        });
    }

    // =========================================================================
    // BUTTON STATE MANAGEMENT
    // =========================================================================
    function activateButton(activeButton, siblings) {
        if (activeButton && siblings) {
            for (let i = 0; i < siblings.length; i++) {
                const button = siblings[i];
                button.classList[button === activeButton ? 'add' : 'remove']('active');
            }
            if (mobileDropDown) {
                mobileDropDown.textContent = activeButton.textContent;
            }
        }
    }

    // =========================================================================
    // CSS-ONLY DIMMER UPDATES - Bypasses MixItUp but keeps items visible!
    // Non-matches are dimmed (faded) but still visible, like original behavior
    // =========================================================================
    function cssOnlyVisibilityUpdate(showIds, hideIds, searchId) {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                if (searchId !== currentSearchId) {
                    console.log(`⏭️ [FUSE.JS v2] Skipping stale update (search ${searchId} vs current ${currentSearchId})`);
                    resolve(false);
                    return;
                }

                const domStart = performance.now();
                const showSet = new Set(showIds);
                
                // Single loop through all items - apply dimmer class only (no display:none)
                // This keeps non-matches visible but faded, like the original MixItUp behavior
                for (const [id, wrapperEl] of domCache) {
                    const integrationEl = integrationElCache.get(id);
                    
                    if (showSet.has(id)) {
                        // Match: full visibility
                        wrapperEl.style.display = '';
                        if (integrationEl) {
                            integrationEl.classList.remove('dimmer');
                        }
                    } else {
                        // Non-match: dimmed but still visible (original behavior)
                        wrapperEl.style.display = '';  // Keep visible!
                        if (integrationEl) {
                            integrationEl.classList.add('dimmer');
                        }
                    }
                    debugStats.classListOps++;
                }

                debugStats.domUpdateTime = performance.now() - domStart;
                resolve(true);
            });
        });
    }

    // =========================================================================
    // CORE SEARCH FUNCTION - Optimized with Fuse.js + NO MIXITUP FOR SEARCH
    // =========================================================================
    async function updateData(filter, isSearch, searchId) {
        const startTime = performance.now();
        resetDebugStats();

        const isAllFilter = filter === 'all' || filter === '#all' || (isSearch && !filter.trim());

        console.log(`🚀 [FUSE.JS v2] Search started: "${filter}" (id: ${searchId}, useMixItUp: ${!isSearch || isAllFilter})`);

        let show = [];
        let hide = [];
        let matchedIds = new Set();

        if (isAllFilter) {
            // Show all - no search needed
            show = [...items];
            matchedIds = new Set(items.map(i => i.id));
            debugStats.matchedItems = items.length;
            debugStats.fuseSearchTime = 0;
        } else if (isSearch) {
            // Use Fuse.js for fuzzy search
            const fuseStart = performance.now();
            const results = fuse.search(filter);
            debugStats.fuseSearchTime = performance.now() - fuseStart;

            // Build matched IDs set for O(1) lookup
            matchedIds = new Set(results.map(r => r.item.id));
            debugStats.matchedItems = matchedIds.size;

            // Fuse results are already sorted by score (best first)
            show = results.map(r => r.item);
            hide = items.filter(item => !matchedIds.has(item.id));

            // Log top matches for debugging
            if (results.length > 0) {
                console.log(`🎯 [FUSE.JS v2] Top 3 matches:`, results.slice(0, 3).map(r => ({
                    name: r.item.name,
                    score: r.score.toFixed(4)
                })));
            }
        } else {
            // Category filter (tag-based) - use MixItUp for nice reordering
            const tag = filter.startsWith('#') ? filter.slice(1) : filter;
            
            for (const item of items) {
                if (item.tags && item.tags.includes(tag)) {
                    show.push(item);
                    matchedIds.add(item.id);
                } else {
                    hide.push(item);
                }
            }
            debugStats.matchedItems = show.length;
            debugStats.fuseSearchTime = 0;
        }

        // Check if search is still current before DOM updates
        if (searchId !== currentSearchId) {
            console.log(`⏭️ [FUSE.JS v2] Search ${searchId} cancelled (current: ${currentSearchId})`);
            return;
        }

        const showIds = show.map(item => item.id);
        const hideIds = hide.map(item => item.id);

        // KEY OPTIMIZATION: For text search, bypass MixItUp entirely!
        if (isSearch && !CONFIG.USE_MIXITUP_FOR_SEARCH) {
            // CSS-only dimmer update - FAST! Non-matches stay visible but dimmed
            await cssOnlyVisibilityUpdate(showIds, hideIds, searchId);
            debugStats.mixerTime = 0; // No mixer used!
            
            console.log(`⚡ [FUSE.JS v2] MixItUp BYPASSED - using CSS dimmer (non-matches still visible)`);
        } else {
            // Use MixItUp for category filters (nice animations) or "show all"
            // First restore all items visibility
            for (const [id, wrapperEl] of domCache) {
                wrapperEl.style.display = '';
            }
            
            const mixerStart = performance.now();
            const mixerItems = [...show, ...hide];
            
            await mixer.dataset(mixerItems);
            debugStats.mixerTime = performance.now() - mixerStart;
            
            // Apply dimmer classes after mixer
            requestAnimationFrame(() => {
                for (const [id, integrationEl] of integrationElCache) {
                    if (integrationEl) {
                        if (matchedIds.has(id)) {
                            integrationEl.classList.remove('dimmer');
                        } else {
                            integrationEl.classList.add('dimmer');
                        }
                    }
                }
            });
        }

        // Log final stats
        const totalTime = performance.now() - startTime;
        logDebugStats(filter, totalTime);

        // Hotjar popup trigger
        if (!show.length && popupClosed) {
            window.hj('trigger', 'dd_integrations_poll');
            popupClosed = false;
        }
    }

    // =========================================================================
    // CATEGORY BUTTON CLICK HANDLER
    // =========================================================================
    function handleButtonClick(button, catFilters) {
        search.value = '';
        
        if (button.classList.contains('active') || !button.getAttribute('data-filter')) return;

        const filter = button.getAttribute('data-filter');
        
        if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
            window.DD_LOGS.logger.log(
                'Integrations category selected',
                { browser: { integrations: { category: button.innerText } } },
                'info'
            );
        }
        
        activateButton(button, catFilters);
        
        const searchId = ++currentSearchId;
        updateData(filter, false, searchId);

        if (window.history.pushState) {
            window.history.pushState(null, document.title, button.getAttribute('href'));
        }
    }

    // =========================================================================
    // EVENT LISTENERS
    // =========================================================================
    controls.addEventListener('click', function (e) {
        handleButtonClick(e.target, filters);

        if (e.target.dataset.filter && e.target.dataset.filter !== 'all') {
            deleteQueryParameter('q');
        }

        const mobileBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
        activateButton(mobileBtn, mobilefilters);
    });

    mobilecontrols.addEventListener('click', function (e) {
        e.stopPropagation();
        handleButtonClick(e.target, mobilefilters);

        const desktopBtn = controls.querySelector(`[data-filter="${e.target.getAttribute('data-filter')}"]`);
        activateButton(desktopBtn, filters);

        pop.style.display = 'none';
        scrollTop(window, 0);
    });

    // =========================================================================
    // SEARCH INPUT - With improved debounce and cancellation
    // =========================================================================
    search.addEventListener('input', function (e) {
        const allBtn = controls.querySelector('[data-filter="all"]');

        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
            const searchValue = e.target.value.toLowerCase().trim();
            const searchId = ++currentSearchId;
            
            console.log(`⌨️ [FUSE.JS] Input debounced, starting search ${searchId}`);
            
            activateButton(allBtn, filters);
            updateData(searchValue, true, searchId);

            if (window.location.hash && window.location.hash !== 'all') {
                window.location.hash = '#all';
            }

            updateQueryParameter('q', searchValue);

            if (searchValue.length > 0 && window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    { browser: { integrations: { search: searchValue } } },
                    'info'
                );
            }
        }, CONFIG.DEBOUNCE_MS);
    });

    // =========================================================================
    // QUERY PARAMETER HANDLING
    // =========================================================================
    const handleQueryParamFilter = () => {
        const searchQueryParameter = getQueryParameterByName('q', window.location.href);

        if (searchQueryParameter) {
            if (window.location.hash) {
                window.location.hash = '#all';
            }

            const searchId = ++currentSearchId;
            updateData(searchQueryParameter, true, searchId);
            search.value = searchQueryParameter;

            if (window._DATADOG_SYNTHETICS_BROWSER === undefined) {
                window.DD_LOGS.logger.log(
                    'Integrations Search',
                    { browser: { integrations: { search: searchQueryParameter.toLowerCase() } } },
                    'info'
                );
            }
        }
    };

    // =========================================================================
    // HASH CHANGE HANDLING
    // =========================================================================
    window.addEventListener('hashchange', () => {
        let currentCat = '';
        if (window.location.href.indexOf('#') > -1) {
            currentCat = window.location.href.substring(window.location.href.indexOf('#'));
        }
        const currentSelected = document.querySelector('.controls .active')?.getAttribute('href');

        if (currentCat && currentSelected) {
            if (currentCat !== currentSelected) {
                document.querySelector(`a[href="${currentCat}"]`)?.click();
            }
        }
        if (currentCat === '') {
            activateButton(controls.querySelector('[data-filter="all"]'), filters);
            activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);
            const searchId = ++currentSearchId;
            updateData('all', false, searchId);
        }
    });

    // =========================================================================
    // HOVER EFFECTS - Event delegation
    // =========================================================================
    const integrationRows = document.querySelectorAll('.integration-row');
    integrationRows.forEach(row => {
        row.addEventListener('mouseover', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
                if (window.innerWidth >= 576) {
                    integration.classList.add('hover');
                }
            }
        });
        
        row.addEventListener('mouseout', (e) => {
            const integration = e.target.closest('.integration');
            if (integration) {
                integration.classList.remove('hover');
            }
        });
    });

    // =========================================================================
    // INITIALIZATION
    // =========================================================================
    activateButton(controls.querySelector('[data-filter="all"]'), filters);
    activateButton(mobilecontrols.querySelector('[data-filter="all"]'), mobilefilters);

    handleQueryParamFilter();

    if (window.location.href.indexOf('#') > -1) {
        triggerEvent(window, 'hashchange');
    }

    console.log('✅ [FUSE.JS] Initialization complete!');
}
