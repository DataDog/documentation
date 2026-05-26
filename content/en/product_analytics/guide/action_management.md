---
title: Action Management
further_reading:
  - link: "https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams"
    tag: "Blog"
    text: "From performance to impact: Bridging frontend teams through shared context"
  - link: "https://www.datadoghq.com/blog/product-analytics-faster-decisions"
    tag: "Blog"
    text: "Make faster, better product decisions with Datadog Product Analytics"
  - link: "https://www.datadoghq.com/blog/product-data-best-practices"
    tag: "Blog"
    text: "What your product data is actually saying"
---

## Overview
Action Management is a no-code way to label autocaptured actions from your web and mobile applications. Labeled actions can be used in all Product Analytics charts. Action Management helps to improve trust in your Product Analytics dataset and enhance efficiency in your analysis.

Two labeling methods are available:
- [**Visual labeling**](#visual-labeling): A point-and-click interface for labeling actions on web pages. Requires the Datadog test recorder Chrome extension.
- [**Manual labeling**](#manual-labeling): Label actions for web and mobile applications without a browser extension.

## Visual labeling {#visual-labeling}

Visual labeling requires [the Datadog test recorder Chrome extension][1]. If you are unable to add the extension through the Chrome web store, see the [manual instructions][2] for extension installation, or use [manual labeling](#manual-labeling) instead.

1. Go to the [Actions][3] page in Datadog and select your application.

2. Select **Visual Labeler**.

3. Use the **Navigate Site** mode to browse to the location of the actions you want to label.

4. When you are ready to label an action, switch to **Label Actions** mode.

5. Click on the element you would like to add as an action.

   {{< img src="product_analytics/action_management/pana-label-mode-2.png" alt="Click on and label your actions." style="width:90%;">}}

6. Select **New Labeled Action** and use the modal to define the scope of your label. Add a label name, description (optional), and tags (optional). You can specify a custom CSS selector for tracking clicks, or use the CSS builder to label events, for more control and granularity.

   You can also hold the Shift key to select multiple actions on the page and label them under the same name. This functionality enables "OR" analysis.

7. Select **Save**.

After you define an action, it appears in the list of labeled actions on the [Actions][3] page, and you can use it in any Product Analytics chart.

## Manual labeling {#manual-labeling}

Manual labeling is available for both web and mobile applications and does not require the Chrome extension.

1. Go to the [Actions][3] page in Datadog and select your application. 
2. Select **Add Labeled Action**, then select **Create manually**.
3. Add a label name, description (optional), and tags (optional).
4. Under **Definition**, define one or more events to track:
   - **Action Type**: `click` or `custom` events. For `click` events, you can specify a custom CSS selector for tracking clicks, or use the CSS builder to label events, for more control and granularity. 
   - **Action Name**: Use the drop-down to select an action
   - **Page Location**: Use the drop-down to target one or more pages
   Select **Add New Definition** to add a definition.
5. Select **Save**.

After you define an action, it appears in the list of labeled actions on the [Actions][3] page, and you can use it in any Product Analytics chart.

## Retrieve your actions
After you define an action, you can find it on the [Actions][3] page. 

{{< img src="product_analytics/action_management/pana-action-list-2.png" alt="List of your labeled actions." style="width:90%;">}}

## Known limitations
- Visual labeling is only available for web pages. Use manual labeling for mobile applications.
- You cannot label actions that are hidden behind a hover. If this limitation impacts your use cases, share examples with your Customer Success Manager to inform future improvements.
- Deleting a labeled action also deletes it from the dashboards where it is being used.

[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
