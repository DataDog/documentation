import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';
import { highlight } from 'instantsearch.js/es/helpers';

const renderHits = (renderOptions, isFirstRender) => {
    const { widgetParams, results, hits } = renderOptions;
    const { container } = widgetParams;
    const aisHits = document.createElement('div');
    const aisHitsList = document.createElement('ol');

    const truncateContent = (content, length) => {
        if (content.length > length) {
            return `${content.slice(0, length)} ...`;
        } else {
            return content;
        }
    };

    aisHits.classList.add('ais-Hits');
    aisHitsList.classList.add('ais-Hits-list');

    const hitsItems = hits
        .map((item) => {
            // console.log(item);
            const markedResults = item._highlightResult;
            const markedResultsTag = markedResults.tags[0].value;
            const markedResultsTitle = markedResults.title.value;
            const markedResultsSectionHeader = markedResults.section_header ? markedResults.section_header.value : null;
            const markedResultsContent = markedResults.content.value;

            const tag = markedResultsTag;
            const sectionHeader = markedResultsSectionHeader;
            const title = sectionHeader ? sectionHeader : markedResultsTitle;
            const content = truncateContent(markedResultsContent, 165);

            console.log(tag);
            console.log(sectionHeader);
            console.log(title);
            console.log(content);
            console.log("--------");

            return `
            <li class="ais-Hits-item">
                <a href="${item.relpermalink}" target="_blank" rel="noopener noreferrer">
                  <p>${tag}</p>
                  <p>${title}</p>
                  <p>${content}</p>
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
