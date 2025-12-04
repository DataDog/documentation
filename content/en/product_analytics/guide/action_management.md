---
title: Action Management
private: true
---

{{< callout url="#" btn_hidden="true" >}}
  Action Management is in preview.
{{< /callout >}} 


## Overview


Action Management is a no-code way of labeling autocaptured actions in your website. Action Management helps to improve trust in your Product Analytics dataset and enhance efficiency in your analysis. This page guides you through getting started with using Action Management. 

As this feature is in preview, here are some important things to consider:
- There are known limitations with the feature which Datadog is addressing. See the [limitations section](#known-limitations) for more information.

- Your feedback is invaluable to Datadog during this preview stage. Share all of your feedback with the Product Analytics team using [Slack](https://chat.datadoghq.com/). If you do not have a Slack channel for sharing your feedback, send an message to Milene Darnis on the Datadog Public Slack.


## Setup 

### Step 1 - Install the browser extension 

Labeling actions with Datadog Product Analytics requires this [Chrome extension][1]. See the [manual instructions if needed][2]. 
 

### Step 2 - Label your actions 

1. Go to the [Actions][3] page in the Datadog UI, and click on **Label New Action**. This takes you to the point-and-click interface where you can select your actions.

{{< img src="product_analytics/action_management/pana-labeled-new-action.png" alt="Actions page to start labelling" style="width:90%;">}}


2. Use the **Navigate Site** mode to browse through your website and identify the location of your actions. 

{{< img src="product_analytics/action_management/pana-point-click-interface.png" alt="The point and click interface used to locate and labed your action " style="width:90%;">}}


3. Use the **Label Actions** mode, then click on each action to name your actions. 

{{< img src="product_analytics/action_management/pana-label-mode.png" alt="Clik on and label your actions." style="width:90%;">}}


4. When in **Label Actions** mode, click on the action you want to define to see more details about it ( _Past 7 days volume_, _XPath_, _other Labeled Actions on the selected action_)

{{< img src="product_analytics/action_management/pana-new-label-action.png" alt="Define your selected actions." style="width:90%;">}}


5. When you are ready, click on **"New Labeled Action"** to:
- Limit the action on the current page or define an action for that selector on any page
- Limit to the target text on that page or define an action regardless of the target text (useful if your website is localized in several languages for instance)
- Give a name (required) and description (optional) to the action

You can also hold the Shift key to select other actions on the page and label several actions under the same name (is used as an “OR” in analysis). 


### Step 3 - Retrieve your Label your actions 

After you define an action, you can find them in the [list of labeled actions][4]. From there you can:
- Filter to only see your actions
- Edit actions
- See this action in a funnel, retention chart or see related replays directly from there

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