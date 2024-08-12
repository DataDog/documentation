import { getHitData, getSnippetForDisplay } from './getHitData';
import { bodyClassContains } from '../../helpers/helpers';
import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

const renderHits = (renderOptions, isFirstRender) => {
    const handleFirstRender = (containerDiv) => {
        // Create hits container div, category divs (x5), and hit lists (x5). Then append everthing together and to the DOM.
        const readyHitsContainer = () => {
            const aisHits = document.createElement('div');
            aisHits.id = 'ais-Hits';
            aisHits.classList.add('ais-Hits');
            return aisHits;
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
        const categoryElements = generateElements(elementDictionary['category']);
        const listElements = generateElements(elementDictionary['list']);

        appendChildElements(hitsContainer, categoryElements);

        categoryElements.forEach((category, index) => {
            appendChildElements(category, listElements[index]);
        });

        appendChildElements(containerDiv, hitsContainer);
    };

    const handleNRender = (containerDiv, allJoinedListItemsArray, numHits) => {
        // On non-first renders, add organized hits to applicable divs
        const addHitsToEmptyElements = () => {
            allJoinedListItemsArray.forEach((joinedList, index) => {
                containerDiv.querySelector(`#ais-Hits-category-${index} .ais-Hits-list`).innerHTML = joinedList;
            });
        };

        const hideOrShowElements = () => {
            const finalHitsLists = document.querySelectorAll('.ais-Hits-list');

            finalHitsLists.forEach((list) => {
                if (list.childElementCount) {
                    list.classList.remove('no-hits');
                } else {
                    list.classList.add('no-hits');
                }
            });

            numHits === 0
                ? document.querySelector('#hits').classList.add('no-hits')
                : document.querySelector('#hits').classList.remove('no-hits');
        };

        addHitsToEmptyElements();
        hideOrShowElements();
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray, category) => {
        const joinedListItems = hitsArray
            .map((item) => {
                const hit = getHitData(item, renderOptions.results.query);
                const displayContent = getSnippetForDisplay(hit, false);
                const cleanRelpermalink = `${basePathName}${hit.relpermalink}`.replace('//', '/');
                const section_header = hit.section_header ? `&raquo; ${hit.section_header}` : '';

                return `
                    <li class="ais-Hits-item">
                        <a href="${cleanRelpermalink}" target="_blank" rel="noopener noreferrer">
                            <p class="ais-Hits-subcategory">${hit.subcategory}</p>
                            <div>
                                <p class="ais-Hits-title"><strong>${hit.title} ${section_header}</strong></p>
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');

        const enhanceApiCategoryHeader = category.toLowerCase() === 'api' && bodyClassContains('api');
        const categoryLiClassList = 'ais-Hits-item ais-Hits-category';
        const categoryParagraphClassList = enhanceApiCategoryHeader ? 'fw-bold text-primary' : '';

        return hitsArray.length
            ? [
                  `<li class="${categoryLiClassList}"><p class="${categoryParagraphClassList}">${category}</p></li>`,
                  joinedListItems
              ].join('')
            : null;
    };

    const { widgetParams, hits } = renderOptions;
    const { container, basePathName } = widgetParams;

    const gettingStartedHitsArray = hits.filter((hit) => hit.category.toLowerCase() === 'getting started');
    const docsHitsArray = hits.filter((hit) => hit.category.toLowerCase() === 'documentation' || hit.category === null);
    const integrationsHitsArray = hits.filter((hit) => hit.category.toLowerCase() === 'integrations');
    const guidesHitsArray = hits.filter((hit) => hit.category.toLowerCase() === 'guide');
    const apiHitsArray = hits.filter((hit) => hit.category.toLowerCase() === 'api');

    const allJoinedListItemsHTML = [
        generateJoinedHits(gettingStartedHitsArray, 'Getting Started'),
        generateJoinedHits(docsHitsArray, 'Documentation'),
        generateJoinedHits(integrationsHitsArray, 'Integrations'),
        generateJoinedHits(guidesHitsArray, 'Guides'),
        generateJoinedHits(apiHitsArray, 'API')
    ];

    // Ensure API results render first if user performs a search from an API page.
    if (bodyClassContains('api')) {
        allJoinedListItemsHTML.pop();
        allJoinedListItemsHTML.unshift(generateJoinedHits(apiHitsArray, 'API'));
    }

    if (isFirstRender) {
        handleFirstRender(container);
    } else {
        handleNRender(container, allJoinedListItemsHTML, hits.length);
    }
};

export const searchbarHits = connectHits(renderHits);
