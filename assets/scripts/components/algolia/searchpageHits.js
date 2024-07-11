import { getHitData, getSnippetForDisplay } from './getHitData';
import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';

const renderHits = (renderOptions, isFirstRender) => {
    const addAttributesToEmptyElements = () => {
        aisHits.classList.add('ais-Hits');
        aisHitsList.classList.add('ais-Hits-list');
    };

    const appendEmptyElements = () => {
        container.appendChild(aisHits);
        aisHits.appendChild(aisHitsList);
    };

    const addHitsToEmptyElements = () => {
        container.querySelector('.ais-Hits-list').innerHTML = joinedListItemsHTML;
    };

    const getTitleHierarchyHTML = (hit) => {
        const spacer = '<span class="ais-Hits-category-spacer">&#187;</span>';
        const category = `<p class="ais-Hits-category">${hit.category}</p>`;
        const subcategory = `<p class="ais-Hits-subcategory">${hit.subcategory}</p>`;
        const pageTitle = `<p class="ais-Hits-title">${hit.title}</p>`;
        const baseTitleHierarchy =
            hit.subcategory === hit.title.replace(/(<mark>|<\/mark>)/gm, '')
                ? `${category}${spacer}${pageTitle}`
                : `${category}${spacer}${subcategory}${spacer}${pageTitle}`;

        return hit.section_header
            ? `${baseTitleHierarchy}${spacer}<p class="ais-Hits-title">${hit.section_header}</p>`
            : `${baseTitleHierarchy}`;
    };

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray) => {
        return hitsArray
            .map((item) => {
                const hit = getHitData(item, renderOptions.results.query);
                const displayContent = getSnippetForDisplay(hit, false);
                const cleanRelpermalink = `${basePathName}${hit.relpermalink}`.replace('//', '/');

                return `
                    <li class="ais-Hits-item">
                        <a href="${cleanRelpermalink}" target="_blank" rel="noopener noreferrer">
                            <div class="ais-Hits-row">${getTitleHierarchyHTML(hit)}</div>
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-content">${displayContent}</p>
                            </div>
                        </a>
                    </li>
                `;
            })
            .join('');
    };

    const { widgetParams, hits } = renderOptions;
    const { container, basePathName } = widgetParams;

    const joinedListItemsHTML = generateJoinedHits(hits);

    const aisHits = document.createElement('div');
    const aisHitsList = document.createElement('ol');

    if (isFirstRender) {
        addAttributesToEmptyElements();
        appendEmptyElements();
        return;
    } else {
        addHitsToEmptyElements();
    }
};

export const searchpageHits = connectHits(renderHits);
