---
title: Action Management
private: true
---

<div class="alert alert-info">
  Action Management is in preview.
</div>


## Overview


Action Management is a no-code way to label autocaptured actions from your website. Action Management helps to improve trust in your Product Analytics dataset and enhance efficiency in your analysis. This page describes how to get started with Action Management.

Your feedback is invaluable to Datadog during this preview stage. Share all of your feedback with the Product Analytics Product Manager, Milene Darnis team using [Datadog Public Slack](https://chat.datadoghq.com/).


## Setup 

### Step 1 - Install the browser extension 

Action Management requires [The Datadog test recorder Chrome extension][1]. If you are unable to add the extension through the Chrome web store, refer to the [manual instructions][2]. 

### Step 2 - Label your actions 

1. Go to the [Actions][3] page in the Datadog UI, and click on **Label New Action**. This takes you to the point-and-click interface where you can select your actions.

{{< img src="product_analytics/action_management/pana-labeled-new-action.png" alt="Actions page to start labelling" style="width:90%;">}}


2. Use the **Navigate Site** mode to browse to the location of the actions you want to label.

{{< img src="product_analytics/action_management/pana-point-click-interface.png" alt="The point and click interface used to locate and labed your action " style="width:90%;">}}


3. In **Label Actions** mode, click on a UI element to add and label it as an action.

{{< img src="product_analytics/action_management/pana-label-mode.png" alt="Click on and label your actions." style="width:90%;">}}


4. While in **Label Actions** mode, click on the action you want to define to see more details about it.

{{< img src="product_analytics/action_management/pana-new-label-action.png" alt="Define your selected actions." style="width:90%;">}}


5. When you are ready, click on **New Labeled Action** to:
    - Limit the action on the current page or define an action for that selector on any page.
    - Limit to the target text on that page or define an action regardless of the target text (useful if your website is localized in several languages for instance).
    - Give a name (required) and description (optional) to the action.

You can also hold the Shift key to select multiple actions on the page and label them under the same name. This functionality enables "OR" analysis.

### Step 3 - Retrieve your Label your actions 

After you define an action, you can find them in the [list of labeled actions][4]. From there you can:
- Filter to only see your actions.
- Edit actions.
- See this action in a funnel, retention chart, or see related replays.

 {{< img src="product_analytics/action_management/pana-action-list.png" alt="List of your labeled actions." style="width:90%;">}}



## Known limitations 
- Action Management only works for web pages at this time, mobile support is on the roadmap. 
- You cannot label Actions that are hidden behind a hover. If this limitation impacts your use cases, share examples of these with Datadog to inform future improvements. 
- Labeled actions can only be used in Funnels and Retention graphs at this time. The ability to use them in all graphs is a feature .
- Deleting a labeled action also deletes it from the dashboards where it is being used.



## What's coming up 

- A streamlined Edit mode to easily make changes to labeled actions (by end of year)
- Ability to use labeled actions on all the graph types (by end of year)
- Mobile support (2026)




[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management
[4]: https://app.datadoghq.com/product-analytics/data-management