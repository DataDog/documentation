import connectHits from 'instantsearch.js/es/connectors/hits/connectHits';
import { highlight } from 'instantsearch.js/es/helpers';

const renderHits = (renderOptions) => {
    const { widgetParams, results, hits } = renderOptions;

    // Create li's for each hit and concat into hitsItems to display on every render past 1st
    widgetParams.container.innerHTML = `<ul class="ais-Hits-Search-list">${hits
        .map((item) => {
            const index = results.index;
            const link = index.includes('doc') ? item.url : `https://www.datadoghq.com${item.relpermalink}`;
            // If hit is from docs index, more formatting required to render a highlighted hit
            if (index.includes('doc')) {
                const highlightedHierarchy = item._highlightResult.hierarchy;
                const lengthOfHierarchy = Object.keys(highlightedHierarchy).length;
                const hitContent = item.content;
                let hitTitle = '';
                let count = 0;
                for (const [key, value] of Object.entries(highlightedHierarchy)) {
                    hitTitle += `${value.value}`;
                    if (count < lengthOfHierarchy - 1) {
                        hitTitle += " <span class='mx-1'>&gt;</span> ";
                    }
                    count++;
                }
                return `
            <li class="ais-Hits-Search-item">
                <a href="${link}" target="_blank" rel="noopener noreferrer">
                  <p class="ais-Hits-Search-title">${hitTitle}</p>
                  <div class="ais-Hits-Search-content">
                    <p>${hitContent}</p>
                  </div>
                </a>
            </li>
        `;
            } else {
                // Hit from Corpsite (blog)
                return `
            <li class="ais-Hits-Search-item">
                <a href="${link}" target="_blank" rel="noopener noreferrer">
                    <p class="ais-Hits-Search-title">${highlight({
                        attribute: 'title',
                        hit: item,
                        highlightedTagName: 'b'
                    })}</p>
                    <div class="ais-Hits-Search-content">
                        <img
                            src="${
                                item.image
                            }?ch=Width,DPR,Save-Data&fit=crop&crop=focalpoint&q=40&w=130&h=95&auto=enhance,format&dpr=2"
                            alt="${item.relpermalink}"
                            loading="lazy"
                        />
                        <p>${item.description}
                    </div>
                  
                </a>
            </li>
        `;
            }
        })
        .join('')}
    </ul>`;
};

export const searchpageHits = connectHits(renderHits);
