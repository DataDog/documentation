import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';
import { highlight } from 'instantsearch.js/es/helpers';

const renderHits = (renderOptions, isFirstRender) => {
    const { widgetParams, results, hits } = renderOptions;
    const { container } = widgetParams;
    const aisHits = document.createElement('div');
    const aisHitsList = document.createElement('ol');

    aisHits.classList.add('ais-Hits');
    aisHitsList.classList.add('ais-Hits-list');

    const hitsItems = hits
        .map((item) => {
            console.log(item);
            const markedResults = item._highlightResult;
            const markedResultsTitle = markedResults.title.value;
            const markedResultsSectionHeader = markedResults.section_header ? markedResults.section_header.value : null;
            const markedResultsContent = markedResults.content.value;
            // const highlightedHierarchy = markedResults.hierarchy;
            // const lengthOfHierarchy = Object.keys(highlightedHierarchy).length;
            const hitText = markedResultsTitle;
            // let count = 0;

            // for (const [key, value] of Object.entries(highlightedHierarchy)) {
            //     hitText += `${value.value}`;

            //     if (count < lengthOfHierarchy - 1) {
            //         hitText += " <span class='mx-1'>&gt;</span>";
            //     }

            //     count++;
            // }

            return `
            <li class="ais-Hits-item">
                <a href="${item.relpermalink}" target="_blank" rel="noopener noreferrer">
                  <p>${hitText}</p>
                </a>
            </li>
        `;
        })
        .join('');

    if (isFirstRender) {
        container.appendChild(aisHits);
        aisHits.appendChild(aisHitsList);
        return;
    } else {
        const previousResults = container.querySelector('ol.ais-Hits-list');
        while (previousResults.firstChild) {
            previousResults.removeChild(previousResults.firstChild);
        }
    }

    container.querySelector('ol.ais-Hits-list').innerHTML = hitsItems;
};

export const hitsDropdown = connectHits(renderHits);
