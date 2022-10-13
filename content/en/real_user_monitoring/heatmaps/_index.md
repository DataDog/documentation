---
title: Heatmaps
kind: documentation
description: Heatmaps are a type of visualization allowing you to see where users click on your website.
further_reading:
- link: '/real_user_monitoring/session_replay/'
  tag: 'Documentation'
  text: 'Session Replay'
---

{{< beta-callout url="https://forms.gle/48wkkRoZfwhn74ycA" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
Heatmaps are currently in private beta, but you can easily request access! Use this form to submit your request today. Once approved, you can start visualizing your customer's journey through your pages today!
{{< /beta-callout >}} 

{{< img src="real_user_monitoring/heatmaps/heatmaps.png" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's Session Replay data, where your user's interactions (clicks) are represented by color in the image. Seeing how a user interacts with your product or webpage lets you understand if users engage with your page the way you expect. This insight into how your page is interacted with helps you make UI decisions to optimize how your user engages. This kind of optimization can potentially improve their user experience and increase retention. Heatmaps make it easy to visualize complex data and understand it at a glance:

## Getting started

To get started with heatmaps:

- You need to be on the latest version of the SDK (v4.X.Y) 
- Enable [Session Replay](/real_user_monitoring/session_replay/).

### Analysis
Start from the [heatmap page](https://app.datadoghq.com/rum/heatmap/view) in Session Replay, select your application, and view. A heatmap shows a single view of an app and then on that page, it shows the aggregate of where all users (sessions) clicked. So each view corresponds to an application. A view is a single page within an application. Each session is a user action and includes everything they did, like all the pages they viewed.

- Pick your application.
- Pick your view.

{{< img src="real_user_monitoring/heatmaps/application-and-view.jpeg" alt="Shows the selector for selecting an application and a view from the options where you have already enabled session replay." style="width:100%;">}}

The heatmap displayed shows you the most popular clicks on a given view. To adjust the filters (to look at specific geography, for example), you can add a filter from the panel on the left side.

## Insights

The right panel allows you to make sense of the data in the heatmap itself:

- The popularity of the selected page in the context of the selected application
- The total unique users viewing the page
- The actions on the page where a frustration signal occurred

Below the panel is all actions that occurred on the page, listed by frequency. When you click into an action, you can understand more about that interaction, for example:

- The number of times the user performed the action and where it falls in overall analytics of top actions on a given page.
- If that action had a frustration signal occurring on it (like if a user rage clicked on that button), you can view the associated frustration signals as well.

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="Shows an example action and the informatipn you can get about that action." style="width:60%;">}}

### Next steps

After understanding analytics, the next thing you do is understand that action in the context of other data outside of heatmaps. This might mean pivoting to the [RUM explorer](/real_user_monitoring/explorer/) or building a funnel including that action to [analyze conversion rates](https://docs.datadoghq.com/real_user_monitoring/guide/alerting-with-conversion-rates/). You can also watch associated [session replays](/real_user_monitoring/session_replay/) to visually see a user performing that action in the context of their overall session. 
