---
title: Action Management
private: true
further_reading:
  - link: "https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams"
    tag: "Blog"
    text: "From performance to impact: Bridging frontend teams through shared context"
---

<div class="alert alert-info">
  Action Management is in preview.
</div>


## Overview
Action Management is a no-code way to label autocaptured actions from your website. Action Management helps to improve trust in your Product Analytics dataset and enhance efficiency in your analysis. This page describes how to get started with Action Management.

Your feedback is invaluable to Datadog during this preview stage. Share all of your feedback with the Product Analytics Product Manager, Milene Darnis, using [Datadog Public Slack](https://chat.datadoghq.com/).


## Setup 

### Step 1 - Install the browser extension 

Action Management requires [The Datadog test recorder Chrome extension][1]. If you are unable to add the extension through the Chrome web store, see the [manual instructions][2]. 

### Step 2 - Label your actions 

1. Go to the [Actions][3] page in the Datadog UI, and click on **Label New Action**. This takes you to the point-and-click interface where you can select your actions.

{{< img src="product_analytics/action_management/pana-labeled-new-action.png" alt="Actions page to start labelling" style="width:90%;">}}


2. Use the **Navigate Site** mode to browse to the location of the actions you want to label.

{{< img src="product_analytics/action_management/pana-point-click-interface.png" alt="The point and click interface used to locate and labed your action " style="width:90%;">}}


3. To add an action, first, switch to **Label Actions** mode.

{{< img src="product_analytics/action_management/pana-label-mode.png" alt="Click on and label your actions." style="width:90%;">}}


4. Next, select the UI element that you would like to add as an action, click on **New Labeled Action**, and:
    - **Choose the scope**: Select whether the action should be tracked on the current page only or across all pages.
    - **Set targeting options**: (Optional) Limit the action to a specific target text. This is useful for localized sites where the same element may appear in multiple languages.
    - **Name the action**: Provide a name (required) and a description (optional) to help identify the action in your dashboards and reports.

    You can also hold the Shift key to select multiple actions on the page and label them under the same name. This functionality enables "OR" analysis.

{{< img src="product_analytics/action_management/pana-name-action.png" alt="Give a name and description to your action." style="width:90%;">}}


### Step 3 - Retrieve your actions 

After you define an action, you can find it in the [list of labeled actions][4]. From this list, you can:
- Filter to only see your actions
- Edit actions
- View actions in a funnel, retention chart, related session replay

 {{< img src="product_analytics/action_management/pana-action-list.png" alt="List of your labeled actions." style="width:90%;">}}



## Known limitations 
- Action Management only works for web pages at this time.
- You cannot label Actions that are hidden behind a hover. If this limitation impacts your use cases, share examples of these with the Product Analytics Product Manager, Milene Darnis, using [Datadog Public Slack](https://chat.datadoghq.com/) to inform future improvements. 
- Labeled actions can only be used in Funnels and Retention graphs at this time.
- Deleting a labeled action also deletes it from the dashboards where it is being used.


[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management
[4]: https://app.datadoghq.com/product-analytics/data-management