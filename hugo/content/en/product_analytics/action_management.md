---
title: Action Management
description: Label autocaptured actions from your web and mobile applications using Action Management.
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
aliases:
  - /product_analytics/guide/action_management/
---

## Overview
Action Management is a no-code method for labeling autocaptured actions from your web and mobile applications. Product and business stakeholders can use it to create and rename events without code changes.

Use labeled actions to:
- Track an element that is not yet instrumented by targeting a CSS selector.
- Combine several autocaptured actions under a single name when they represent one meaningful user action.
- Rename an autocaptured action to match your team's business terminology.

After you create a labeled action, Datadog applies the name retroactively to all matching interactions in your recorded data. This includes historical interactions, not only new ones going forward.

Labeled actions work across all {{< prodname >}}Product Analytics{{< /prodname >}} charts and help improve trust in your dataset and efficiency in your analysis.

Two labeling methods are available:
- [**Visual labeling**](#visual-labeling): A point-and-click interface for labeling actions on web pages. Requires the Datadog test recorder Chrome extension.
- [**Manual labeling**](#manual-labeling): Label actions for web and mobile applications without a browser extension.

## Visual labeling {#visual-labeling}

Visual labeling requires [the Datadog test recorder Chrome extension][1]. If you are unable to add the extension through the Chrome web store, see the [manual instructions][2] for extension installation, or use [manual labeling](#manual-labeling) instead.

1. Go to the [Actions][3] page in Datadog and select your application.
2. Select {{< ui >}}Visual Labeler{{< /ui >}}. Elements that already have a labeled action are marked with a blue dot. To display the names of these labeled actions automatically, select the checkbox in the menu.

   {{< img src="product_analytics/action_management/pana-visual-labeler-toolbar.png" alt="Visual Labeler toolbar showing the Navigate Site and Label Actions modes, and a checkbox for displaying the names of the five labeled actions on the page." style="width:90%;">}}

3. Use {{< ui >}}Navigate Site{{< /ui >}} mode to browse to the location of the action or actions you want to label.
4. Switch to {{< ui >}}Label Actions{{< /ui >}} mode when you are ready to label an action.

### Create a labeled action

1. Click the element you want to label. Datadog shows how many times users triggered the element over the past 7 days.
2. Optional: Click additional elements to have the label capture all of them together. To remove an element from the labeled action, select the trash icon next to it.
3. Datadog suggests a name for the labeled action based on the element. Edit the name as needed.
4. By default, Datadog tracks clicks on the element only on the current page. To track matches of the element's CSS selector across all pages, open the label's details and select the {{< ui >}}Target all pages{{< /ui >}} checkbox.
5. Optional: Edit the CSS selector directly if you want to change or refine which elements the label matches.
6. Click {{< ui >}}Save labeled action{{< /ui >}}.

{{< img src="product_analytics/action_management/pana-create-labeled-action-2.png" alt="Labeled action panel with a name of New Chart CTA Click from Home, a tracked element named main navigation, the Target all pages checkbox, the CSS selector for the element, and the Save labeled action button." style="width:60%;">}}

### Update an existing labeled action

1. Click an element that already has a labeled action associated with it (marked with a blue dot).
2. Select {{< ui >}}Edit{{< /ui >}}.
3. Add or remove tracked elements, and update the name or CSS selector as needed.
4. Click {{< ui >}}Save labeled action{{< /ui >}}.

After you define an action, it appears in the list of labeled actions on the [Actions][3] page, and you can use it in any {{< prodname >}}Product Analytics{{< /prodname >}} chart.

## Manual labeling {#manual-labeling}

Manual labeling is available for both web and mobile applications and does not require the Chrome extension.

1. Go to the [Actions][3] page in Datadog and select your application. 
2. Select {{< ui >}}Add Labeled Action{{< /ui >}}, then select {{< ui >}}Create manually{{< /ui >}}.
3. Add a label name, description (optional), and tags (optional).
4. Under {{< ui >}}Definition{{< /ui >}}, define one or more events to track:
   - {{< ui >}}Action Type{{< /ui >}}: `click` or `custom` events. For `click` events, you can specify a custom CSS selector for tracking clicks, or use the CSS builder to label events, for more control and granularity. 
   - {{< ui >}}Action Name{{< /ui >}}: Use the drop-down to select an action
   - {{< ui >}}Page Location{{< /ui >}}: Use the drop-down to target one or more pages
   Select {{< ui >}}Add New Definition{{< /ui >}} to add a definition.
5. Select **Save**.

After you define an action, it appears in the list of labeled actions on the [Actions][3] page, and you can use it in any {{< prodname >}}Product Analytics{{< /prodname >}} chart.

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
