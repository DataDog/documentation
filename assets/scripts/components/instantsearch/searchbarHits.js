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
        const addHitsToEmptyElements = (container) => {
            allJoinedListItemsArray.forEach((joinedList, index) => {
                if (joinedList) {
                    const target = container.querySelector(`#ais-Hits-category-${index} .ais-Hits-list`);
                    if (target) target.innerHTML = joinedList;
                }
            });
        };

        const hideOrShowElements = (container) => {
            const finalHitsLists = container.querySelectorAll('.ais-Hits-list');
            
            finalHitsLists.forEach((list) => {
                if (list.childElementCount) {
                    list.classList.remove('no-hits');
                } else {
                    list.classList.add('no-hits');
                }
            });

            numHits === 0 ? container.classList.add('no-hits') : container.classList.remove('no-hits');
        };

        addHitsToEmptyElements(containerDiv);
        hideOrShowElements(containerDiv);
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

    const { widgetParams, hits } = renderOptions;
    const { container, basePathName } = widgetParams;

    const partnersHitsArray = hits.filter((hit) => hit.type === 'partners');

    const gettingStartedHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'getting started');
    const docsHitsArray = hits.filter(
        (hit) => hit.category?.toLowerCase() === 'documentation' || hit.category === null
    );
    const integrationsHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'integrations');
    const guidesHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'guide');
    const apiHitsArray = hits.filter((hit) => hit.category?.toLowerCase() === 'api');

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
        handleFirstRender(container);
    } else {
        handleNRender(container, allJoinedListItemsHTML, hits.length);
    }
};

export const searchbarHits = connectHits(renderHits);
