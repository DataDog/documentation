import { getHitData } from './getHitData';
import { truncateContent } from '../../helpers/truncateContent';
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

    // Returns a bunch of <li>s
    const generateJoinedHits = (hitsArray) => {
        return hitsArray
            .map((item) => {
                const hit = getHitData(item);
                const displayContent = truncateContent(hit.content, 100);

                return `
                    <li class="ais-Hits-item">
                        <a href="${hit.link}" target="_blank" rel="noopener noreferrer">
                            <div class="ais-Hits-row">
                                <p class="ais-Hits-category">${hit.category}</p>
                                
                                <span class="ais-Hits-category-spacer">&#187;</span>

                                ${
                                    hit.subcategory === hit.title
                                        ? `<p class="ais-Hits-title">${hit.title}</p>`
                                        : `<p class="ais-Hits-subcategory">${hit.subcategory}</p><span class="ais-Hits-category-spacer">&#187;</span><p class="ais-Hits-title">${hit.title}</p>`
                                }   
                            </div>
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
    const { container } = widgetParams;

    const joinedListItemsHTML = generateJoinedHits(hits, null);

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
