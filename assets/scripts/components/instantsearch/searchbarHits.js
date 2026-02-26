import { getHitData, getSnippetForDisplay } from './getHitData';
import { bodyClassContains } from '../../helpers/helpers';
import { CONVERSATIONAL_SEARCH_FLAG_KEY } from '../../components/conversational-search';
import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';
import { initializeFeatureFlags, getBooleanFlag } from '../../helpers/feature-flags';

let IS_CONVERSATIONAL_SEARCH_ENABLED = false;
const ASK_AI_ICON_SRC = '/images/svg-icons/spark-ai.svg';

initializeFeatureFlags().then((client) => {
    IS_CONVERSATIONAL_SEARCH_ENABLED = getBooleanFlag(client, CONVERSATIONAL_SEARCH_FLAG_KEY);
});

const logDocsAIEvent = (message, payload) => {
    const eventPayload = {
        docs_ai: true,
        ...payload
    };

    if (window.DD_LOGS?.logger) {
        window.DD_LOGS.logger.info(message, { docs_ai_event: eventPayload }, 'info');
    }

    if (window.DD_RUM) {
        window.DD_RUM.addAction('docs_ai_search_action', eventPayload);
    }
};

const setAskAISuggestionContent = (contentElement, query) => {
    if (!contentElement) return;
    const trimmedQuery = query?.trim() || '';
    contentElement.replaceChildren();
    if (!trimmedQuery) {
        contentElement.textContent = 'Ask AI anything';
        return;
    }

    contentElement.appendChild(document.createTextNode('Ask AI about '));
    const queryElement = document.createElement('span');
    queryElement.className = 'ask-ai-query';
    queryElement.textContent = `"${trimmedQuery}"`;
    contentElement.appendChild(queryElement);
};

export const updateAskAISuggestionElement = (suggestionElement, query) => {
    if (!suggestionElement) return;
    const trimmedQuery = query?.trim() || '';
    suggestionElement.dataset.query = trimmedQuery;
    setAskAISuggestionContent(suggestionElement.querySelector('.ask-ai-content'), trimmedQuery);
};

const createAskAISuggestionElement = (query) => {
    const item = document.createElement('li');
    item.className = 'ais-Hits-item ais-Hits-ai-suggestion';

    const link = document.createElement('a');
    link.href = '#';
    link.className = 'ask-docs-ai-link';

    const icon = document.createElement('img');
    icon.className = 'ask-ai-icon';
    icon.src = ASK_AI_ICON_SRC;
    icon.width = 14;
    icon.height = 14;
    icon.alt = '';

    const content = document.createElement('p');
    content.className = 'ask-ai-content';

    link.appendChild(icon);
    link.appendChild(content);
    item.appendChild(link);

    updateAskAISuggestionElement(item, query);
    return item;
};

const renderAskAISuggestion = (aiList, query) => {
    if (!aiList) return;
    const existingSuggestion = aiList.querySelector('.ais-Hits-ai-suggestion');
    if (existingSuggestion) {
        updateAskAISuggestionElement(existingSuggestion, query);
        return;
    }
    aiList.replaceChildren(createAskAISuggestionElement(query));
};

const updateNoHitsState = (container, numHits) => {
    const hasAISuggestion = !!container.querySelector('.ais-Hits-ai-suggestion');
    (numHits === 0 && !hasAISuggestion) ? container.classList.add('no-hits') : container.classList.remove('no-hits');
};

// Kick off flag init once, update UI when ready
const ensureConvSearchFlag = (state) => {
    if (!IS_CONVERSATIONAL_SEARCH_ENABLED || !state?.isDocsContainer) return;
    const aiList = state.container.querySelector('#ais-Hits-ai-list');
    renderAskAISuggestion(aiList, state.query);
    updateNoHitsState(state.container, state.numHits);
};

const renderHits = (renderOptions, isFirstRender) => {
    const handleFirstRender = (containerDiv, isDocsContainer) => {
        // Create hits container div, AI suggestion div, category divs (x5), and hit lists (x5). Then append everthing together and to the DOM.
        const readyHitsContainer = () => {
            const aisHits = document.createElement('div');
            aisHits.id = 'ais-Hits';
            aisHits.classList.add('ais-Hits');
            return aisHits;
        };

        // Create AI suggestion container (only for docs container, not partners)
        const createAISuggestionContainer = () => {
            if (!isDocsContainer) return null;
            const aiContainer = document.createElement('div');
            aiContainer.id = 'ais-Hits-ai-container';
            aiContainer.classList.add('ais-Hits-ai-container');
            const aiList = document.createElement('ol');
            aiList.id = 'ais-Hits-ai-list';
            aiList.classList.add('ais-Hits-list', 'ais-Hits-ai-list');
            aiContainer.appendChild(aiList);
            return aiContainer;
        };

        const generateElements = ({ name, count, classArray } = item) => {
            const generatedElementsArray = [];

            for (let i = 0; i < count; i++) {
                const element = name === 'list' ? document.createElement('ol') : document.createElement('div');
                element.id = `ais-Hits-${name}-${i}`;

                classArray.forEach((classToAdd) => {
                    element.classList.add(classToAdd);
                });

                generatedElementsArray.push(element);
            }

            return generatedElementsArray;
        };

        const appendChildElements = (target, elements) => {
            Array.isArray(elements)
                ? elements.forEach((element) => {
                      target.appendChild(element);
                  })
                : target.appendChild(elements);
        };

        const elementDictionary = {
            category: { name: 'category', count: 5, classArray: ['ais-Hits-category'] },
            list: { name: 'list', count: 5, classArray: ['ais-Hits-list', 'no-hits'] }
        };
        const hitsContainer = readyHitsContainer();
        
        // Add AI suggestion container first (only for docs container)
        const aiSuggestionContainer = createAISuggestionContainer();
        if (aiSuggestionContainer) {
            appendChildElements(hitsContainer, aiSuggestionContainer);
        }
        
        const categoryElements = generateElements(elementDictionary['category']);
        const listElements = generateElements(elementDictionary['list']);

        appendChildElements(hitsContainer, categoryElements);

        categoryElements.forEach((category, index) => {
            appendChildElements(category, listElements[index]);
        });

        appendChildElements(containerDiv, hitsContainer);
        
        // Add click handler for AI suggestion
        containerDiv.addEventListener('click', (e) => {
            const aiLink = e.target.closest('.ask-docs-ai-link');
            if (aiLink) {
                e.preventDefault();
                const queryItem = aiLink.closest('.ais-Hits-ai-suggestion');
                const query = queryItem?.dataset?.query || '';
                logDocsAIEvent('Docs AI Search Suggestion Click', {
                    action: 'search_suggestion_clicked',
                    source: 'searchbar_dropdown',
                    query,
                    query_length: query.length
                });
                if (window.askDocsAI) {
                    window.askDocsAI(query, { source: 'search_suggestion' });
                }
            }
        });
    };

    const handleNRender = (containerDiv, allJoinedListItemsArray, numHits, currentQuery, isDocsContainer) => {
        // On non-first renders, add organized hits to applicable divs
        const addHitsToEmptyElements = (container) => {
            // Add AI suggestion first (only for docs container)
            if (isDocsContainer) {
                const aiList = container.querySelector('#ais-Hits-ai-list');
                if (IS_CONVERSATIONAL_SEARCH_ENABLED) {
                    renderAskAISuggestion(aiList, currentQuery);
                } else if (aiList) {
                    aiList.replaceChildren();
                }
            }
            
            allJoinedListItemsArray.forEach((joinedList, index) => {
                if (joinedList) {
                    const target = container.querySelector(`#ais-Hits-category-${index} .ais-Hits-list`);
                    if (target) target.innerHTML = joinedList;
                }
            });
        };

        const hideOrShowElements = (container) => {
            const finalHitsLists = container.querySelectorAll('.ais-Hits-list:not(.ais-Hits-ai-list)');
            
            finalHitsLists.forEach((list) => {
                if (list.childElementCount) {
                    list.classList.remove('no-hits');
                } else {
                    list.classList.add('no-hits');
                }
            });

            updateNoHitsState(container, numHits);
        };

        addHitsToEmptyElements(containerDiv);
        hideOrShowElements(containerDiv);
        
        // Keep keyboard selection opt-in: clear any stale selection on rerender,
        // but do not auto-select an item until user presses arrow keys.
        containerDiv.querySelectorAll('.selected-item').forEach(item => {
            item.classList.remove('selected-item');
        });
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray, category) => {
        const joinedListItems = hitsArray
            .map((item) => {
                const hit = getHitData(item, renderOptions.results.query);
                const displayContent = getSnippetForDisplay(hit, false);
                const cleanRelpermalink = `${basePathName}${hit.relpermalink}`.replace('//', '/');
                const sectHeader =
                    hit.section_header !== ''
                        ? `<span class="breadcrumb2"> &raquo; <strong>${hit.section_header}</strong></span>`
                        : '';

                return `
                    <li class="ais-Hits-item">
                        <a href="${cleanRelpermalink}" target="_blank" rel="noopener noreferrer">
                            <p class="ais-Hits-subcategory">${hit.subcategory}</p>
                            <div>
                                <p class="ais-Hits-title">
                                    <strong class="breadcrumb1">${hit.title}</strong>
                                    ${sectHeader}
                                  </p>
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');
                                      
        const enhanceCategoryHeader = ['api', 'partners'].includes(category.toLowerCase()) && bodyClassContains(category.toLowerCase());
        const categoryLiClassList = 'ais-Hits-item ais-Hits-category';
        const categoryParagraphClassList = enhanceCategoryHeader ? 'fw-bold text-primary' : '';

        return hitsArray.length
            ? [
                  `<li class="${categoryLiClassList}"><p class="${categoryParagraphClassList}">${category}</p></li>`,
                  joinedListItems
              ].join('')
            : null;
    };

    const { widgetParams, hits, results } = renderOptions;
    const { container, basePathName } = widgetParams;
    
    // Check if this is the main docs container (not partners)
    const isDocsContainer = container.id === 'hits' || container.querySelector('#hits') !== null;

    const partnersHitsArray = hits.filter((hit) => hit.type === 'partners');

    const gettingStartedHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'getting started');
    const docsHitsArray = hits.filter(
        (hit) => hit.category?.toLowerCase() === 'documentation' || hit.category === null
    );
    const integrationsHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'integrations');
    const guidesHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'guide');
    const apiHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'api');
    
    // Use the live input value (not results.query which lags due to debounce) to avoid text flicker
    const liveInput = document.querySelector('.ais-SearchBox-input');
    const currentQuery = liveInput ? liveInput.value.trim() : (results?.query || '');
    ensureConvSearchFlag({ container, query: currentQuery, numHits: hits.length, isDocsContainer });

    // Remove null from array
    const allJoinedListItemsHTML = [
        generateJoinedHits(gettingStartedHitsArray, 'Getting Started'),
        generateJoinedHits(docsHitsArray, 'Documentation'),
        generateJoinedHits(guidesHitsArray, 'Guides'),
        generateJoinedHits(partnersHitsArray, 'Partners'),
        generateJoinedHits(integrationsHitsArray, 'Integrations'),
        generateJoinedHits(apiHitsArray, 'API')
    ].filter((item) => item !== null);

    // Ensure API results render first if user performs a search from an API page.
    if (bodyClassContains('api')) {
        allJoinedListItemsHTML.pop();
        allJoinedListItemsHTML.unshift(generateJoinedHits(apiHitsArray, 'API'));
    }

    if (isFirstRender) {
        handleFirstRender(container, isDocsContainer);
    } else {
        handleNRender(container, allJoinedListItemsHTML, hits.length, currentQuery, isDocsContainer);
    }
};

export const searchbarHits = connectHits(renderHits);
