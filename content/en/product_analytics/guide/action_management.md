---
title: Action Management
private: true
---

{{< callout url="#" btn_hidden="true" >}}
  Action Management is currently in preview.
{{< /callout >}} 


## Overview


Action Management is a no-code way to label autocaptured actions in your website. Action Management helps to improve trust in your Product Analytics dataset and enhance efficiency in your analysis. This page guides you through using Action Management for your use cases. 

As this feature is currently in preview, here are some important things to keep in mind:
- There are known limitations with the feature which Datadog is currently addressing. See the [limitations section](#known-limitations) for more information.

- Your feedback is invaluable to Datadog, especially during this preview stage. Share all of your feedback with Milene through `milene.darnis@datadoghq.com` or using Slack. If you do not currently have a Slack channel for sharing your feedback, send an email to Milene to create one.


## Setup 

### Step 1 - Install the browser extension 

To be able to label actions from this UI, you will need this [Chrome extension][1] ([manual instructions if needed][2]). 


### Step 2 - Label your actions 

1. Go to the [Actions][3] page in the Datadog UI, and click on **Label New Action**. This takes you to the point-and-click interface.

 `<IMAGE>` 

2. Use the **Navigate Site** mode to browse through your website and identify the location of your action 

 `<IMAGE>` 

3. Use the **Label Actions** mode then click on each action to name your actions. 

 `<IMAGE>` 

4. When in **Label Actions** mode, click on the action you want to define to see more details about it ( _Past 7 days volume_, _XPath_, _other Labeled Actions on the selected action_)

 `<IMAGE>` 

5. When you are ready, click on "New Labeled Action" to
- Limit the action on the current page or define an action for that selector on any page
- Limit to the target text on that page or define an action regardless of the target text (useful if your website is localized in several languages for instance)
- Give a name (required) and description (optional) to the action

You can also hold the Shift key to select other actions on the page and label several actions under the same name (will be used as a “OR” in analysis). 


 `<IMAGE>` 


### Step 3 - Retrieve your Label your actions 

After you define an action, you can find them in the [list of labeled actions][4]. From there you can:
- Filter to only see your actions
- Edit actions
- See this action in a funnel, retention chart or see related replays directly from there

 `<IMAGE>` 


## Known limitations 
- Action Management currently only works for web pages, mobile support is on the roadmap. 
- When switching to label mode, we will load the top 300 elements on the page and you will have the ability to pick from these at the moment. 
- You cannot label Actions that are hidden behind a hover today, please give us examples of when this limitation impacts you so we can find solutions to address it. 
- Labeled actions can be used in Funnels and Retention graphs, we’re adding the ability to use them in all graphs this year.
- Deleting a labeled will impact the dashboards where it was being used (the action will be removed from there too)



## What's coming up 

- Removing the limitation to top 300 elements on a page (by end of year)
- A streamlined Edit mode to easily make changes to labeled actions (by end of year)
- Ability to use labeled actions on all the graph types (by end of year)
- Mobile support (2026)




[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management
[4]: https://app.datadoghq.com/product-analytics/data-management