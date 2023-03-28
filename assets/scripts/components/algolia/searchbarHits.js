import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

const renderHits = (renderOptions, isFirstRender) => {
    const addAttributesToEmptyElements = () => {
        aisHits.classList.add('ais-Hits');
        aisHitsCategory1.classList.add('ais-Hits-category', 'ais-Hits-category-1');
        aisHitsCategory2.classList.add('ais-Hits-category', 'ais-Hits-category-2');
        aisHitsCategory3.classList.add('ais-Hits-category', 'ais-Hits-category-3');
        aisHitsCategory4.classList.add('ais-Hits-category', 'ais-Hits-category-4');
        aisHitsCategory5.classList.add('ais-Hits-category', 'ais-Hits-category-5');
        aisHitsCategory1.id = 'ais-Hits-category-1';
        aisHitsCategory2.id = 'ais-Hits-category-2';
        aisHitsCategory3.id = 'ais-Hits-category-3';
        aisHitsCategory4.id = 'ais-Hits-category-4';
        aisHitsCategory5.id = 'ais-Hits-category-5';
        aisHitsList1.classList.add('ais-Hits-list', 'no-hits');
        aisHitsList2.classList.add('ais-Hits-list', 'no-hits');
        aisHitsList3.classList.add('ais-Hits-list', 'no-hits');
        aisHitsList4.classList.add('ais-Hits-list', 'no-hits');
        aisHitsList5.classList.add('ais-Hits-list', 'no-hits');
    };

    const appendEmptyElements = () => {
        container.appendChild(aisHits);
        aisHits.appendChild(aisHitsCategory1);
        aisHits.appendChild(aisHitsCategory2);
        aisHits.appendChild(aisHitsCategory3);
        aisHits.appendChild(aisHitsCategory4);
        aisHits.appendChild(aisHitsCategory5);
        aisHitsCategory1.appendChild(aisHitsList1);
        aisHitsCategory2.appendChild(aisHitsList2);
        aisHitsCategory3.appendChild(aisHitsList3);
        aisHitsCategory4.appendChild(aisHitsList4);
        aisHitsCategory5.appendChild(aisHitsList5);
    };

    const addHitsToEmptyElements = () => {
        container.querySelector('#ais-Hits-category-1 .ais-Hits-list').innerHTML = apiJoinedListItemsHTML;
        container.querySelector('#ais-Hits-category-2 .ais-Hits-list').innerHTML = gettingStartedJoinedListItemsHTML;
        container.querySelector('#ais-Hits-category-3 .ais-Hits-list').innerHTML = guideJoinedListItemsHTML;
        container.querySelector('#ais-Hits-category-4 .ais-Hits-list').innerHTML = documentationJoinedListItemsHTML;
        container.querySelector('#ais-Hits-category-5 .ais-Hits-list').innerHTML = integrationJoinedListItemsHTML;
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

    const truncateContent = (content, length) => {
        if (content.length > length) {
            return `${content.slice(0, length)} ...`;
        } else {
            return content;
        }
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray, category) => {
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

    const docsHitsArray = hits.filter((hit) => hit.category === 'Documentation' || hit.category === null);
    const guidesHitsArray = hits.filter((hit) => hit.category === 'Guide' || hit.category === 'ガイド');
    const gettingStartedHitsArray = hits.filter((hit) => hit.category === 'Getting Started');
    const integrationsHitsArray = hits.filter(
        (hit) => hit.category === 'Integrations' || hit.category === 'Intégrations'
    );
    const apiHitsArray = hits.filter((hit) => hit.category === 'API');

    const documentationJoinedListItemsHTML = generateJoinedHits(docsHitsArray, 'Documentation');
    const guideJoinedListItemsHTML = generateJoinedHits(guidesHitsArray, 'Guides');
    const gettingStartedJoinedListItemsHTML = generateJoinedHits(gettingStartedHitsArray, 'Getting Started');
    const integrationJoinedListItemsHTML = generateJoinedHits(integrationsHitsArray, 'Integrations');
    const apiJoinedListItemsHTML = generateJoinedHits(apiHitsArray, 'API');

    const aisHits = document.createElement('div');
    const aisHitsCategory1 = document.createElement('div');
    const aisHitsCategory2 = document.createElement('div');
    const aisHitsCategory3 = document.createElement('div');
    const aisHitsCategory4 = document.createElement('div');
    const aisHitsCategory5 = document.createElement('div');
    const aisHitsList1 = document.createElement('ol');
    const aisHitsList2 = document.createElement('ol');
    const aisHitsList3 = document.createElement('ol');
    const aisHitsList4 = document.createElement('ol');
    const aisHitsList5 = document.createElement('ol');

    if (isFirstRender) {
        addAttributesToEmptyElements();
        appendEmptyElements();
        return;
    } else {
        addHitsToEmptyElements();
        hideOrShowElements();
    }
};

export const searchbarHits = connectHits(renderHits);
