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

    const handleNRender = (containerDiv, allJoinedListItemsArray) => {
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
        };

        addHitsToEmptyElements();
        hideOrShowElements();
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray, category) => {
        const truncateContent = (content, length) => {
            if (content.length > length) {
                return `${content.slice(0, length)} ...`;
            } else {
                return content;
            }
        };

        const joinedListItems = hitsArray
            .map((item) => {
                const link = item.full_url;
                const hitData = item._highlightResult;
                const title = item.title;
                const subcategory = hitData.subcategory ? hitData.subcategory.value : title;
                const sectionHeader = item.section_header ? item.section_header : null;
                const content = hitData.content.value;

                const displayTitle = sectionHeader ? sectionHeader : title;
                const displayContent = truncateContent(content, 145);

                return `
                    <li class="ais-Hits-item">
                        <a href="${link}" target="_blank" rel="noopener noreferrer">
                            <p class="ais-Hits-subcategory">${subcategory}</p>
                            <div>
                                <p class="ais-Hits-title"><strong>${displayTitle}</strong></p>
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');

        return hitsArray.length
            ? [`<li class="ais-Hits-item ais-Hits-category"><p>${category}</p></li>`, joinedListItems].join('')
            : null;
    };

    const { widgetParams, hits } = renderOptions;
    const { container } = widgetParams;

    const gettingStartedHitsArray = hits.filter((hit) => hit.category === 'Getting Started');
    const docsHitsArray = hits.filter((hit) => hit.category === 'Documentation' || hit.category === null);
    const integrationsHitsArray = hits.filter(
        (hit) => hit.category === 'Integrations' || hit.category === 'Intégrations'
    );
    const guidesHitsArray = hits.filter((hit) => hit.category === 'Guide' || hit.category === 'ガイド');
    const apiHitsArray = hits.filter((hit) => hit.category === 'API');

    const allJoinedListItemsHTML = [
        generateJoinedHits(gettingStartedHitsArray, 'Getting Started'),
        generateJoinedHits(docsHitsArray, 'Documentation'),
        generateJoinedHits(integrationsHitsArray, 'Integrations'),
        generateJoinedHits(guidesHitsArray, 'Guides'),
        generateJoinedHits(apiHitsArray, 'API')
    ];

    if (isFirstRender) {
        handleFirstRender(container);
    } else {
        handleNRender(container, allJoinedListItemsHTML);
    }
};

export const searchbarHits = connectHits(renderHits);
