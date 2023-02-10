---
title: Heatmaps
kind: documentation
description: Heatmaps are a type of visualization allowing you to see where users click on your website.
further_reading:
- link: '/real_user_monitoring/session_replay/'
  tag: 'Documentation'
  text: 'Session Replay'
---

{{< img src="real_user_monitoring/heatmaps/heatmap.jpeg" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's Session Replay data, where your user's interactions (clicks) are represented by color in the image. Seeing where a user clicks helps you understand if users engage with your page the way you expect and if they are finding all of your call to actions (CTAs) and important buttons. Visualizing these interactions in a heatmap makes it easy to understand complex data at a glance. Taking the insights from heatmaps helps you make UI decisions to optimize your user experience and increase retention.

## Prerequisites

To get started with heatmaps:

- You must be on the latest version of the SDK (v4.20.0 or later)
- Enable [Session Replay][1].
- While heatmaps are in beta, enable the feature flag by adding the following code to the [package.json][2] file in the SDK:

{{< code-block lang="json" filename="block.json">}}
datadogRum.init({
    ...
    enableExperimentalFeatures: ['clickmap']
})
{{< /code-block >}}

### Getting started

On the view list page, select your application and view. 

{{< img src="real_user_monitoring/heatmaps/heatmap-view-list.png" alt="Select a view from the Heatmap view list" style="width:100%;" >}}

This will take you to the [heatmap page][3] for a particular view. You can switch the view being shown with the **View Name** and **Application** selectors at the top. A heatmap displays the aggregate of where all users (sessions) clicked on a single view, with the view being a single page within an application. Each session is one user's activity and includes everything they did, including all pages they viewed and all actions they clicked.

To adjust the filters (to look at specific geography, for example), you can add a filter from the panel on the left side.

{{< img src="real_user_monitoring/heatmaps/application-and-view.jpeg" alt="Shows the selector for selecting an application and a view from the options where you have already enabled session replay." style="width:100%;">}}

## Insights

The right panel helps you understand the data in the heatmap:

- The popularity of the selected page in the context of the selected application.
- The total number of unique users viewing the page.
- The actions on the page where a frustration signal occurred.

{{< img src="real_user_monitoring/heatmaps/insights-panel.png" alt="Data showing top insights detected in the heatmap." style="width:60%;">}}


You can click into any of these queries to pivot to an analytical view of these data points.

Below the panel are all actions that occurred on the page, listed by frequency. When you click into an action, you can understand more about that interaction, for example:

- The number of times the user performed the action and where it falls in overall analytics of top actions on a given page.
- If that action had a frustration signal occurring on it (for example, if a user rage clicked on that button), you can view the associated frustration signals as well.

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="Shows an example action and the information you can get about that action." style="width:60%;">}}

### Next steps

After understanding analytics, the next step is to understand the action in the context of other data outside of heatmaps. This might mean pivoting to the [RUM explorer][4] or building a funnel that includes the action in order to [analyze conversion rates][5]. You can also watch associated [session replays][1] to visually see a user performing the action in the context of their overall session.

## Troubleshooting

### I am looking at a heatmap for a given view, but it’s showing me an unexpected page.

Heatmaps are based on RUM view names. Depending on how your RUM application is configured, many pages can start being grouped under the same view name, or you can start having very specific view names. If you think the default view name gathering is not sufficient, you can override it manually with the [startView][6] function. 

### The view that I selected is not showing the initial content.

Heatmaps are generated with Session Replay data. Our intelligent algorithm smartly picks a replay that is both recent and best matches the initial state of the page. In some cases, we might not be able to find the correct replay. To switch the background of your heatmap, you can use the "Choose Background" button to navigate through the different states of the page and find the one you are looking for.

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="Select a different background via the choose background button" video=true >}}

### On the action list on the side of my heatmap, I see an icon showing an element that is not visibile in the heatmap.

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-element.png" alt="Hidden elements in the action list on a heatmap." style="width:60%;">}}

The tooltip on the icon says "element is not visible". This means that the element is a common action on your page, but it’s not displayed on the background in the heatmap. To see that element, you can click Choose Background in the bottom right corner to switch the background of your heatmap to one where that element is present. 

### After attempting to create a heatmap, I see a "No Replay Data" state appear. 

This means that Datadog could not find any Session Replays to use as a heatmap background that matches the current search filters. If you just started to record sessions with the [Browser SDK][2], it may also take a few minutes for the Session Replay to be available for viewing.

### After attempting to create a heatmap, I see a "Not enough data to generate a heatmap" state appear.

This means that Datadog was not able to match any user actions with the current selected replay. This happens for a variety of reasons, such as:

- Your application is not using the latest SDK version (>= 4.20.0).
- RUM actions are not enabled. Learn how to [track user interactions][7].
- Your page has recently changed drastically. 

### All of the user information on the page is empty.

User information is not collected by default. Heatmaps use the user information available in your session data to display relevant insights on behavior. You can set up user information in RUM by following the steps in [Modifying Data and Context][8].


[1]: /real_user_monitoring/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: https://app.datadoghq.com/rum/heatmap/view
[4]: /real_user_monitoring/explorer/
[5]: /real_user_monitoring/guide/alerting-with-conversion-rates/
[6]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[7]: /real_user_monitoring/browser/tracking_user_actions/#manage-information-being-collected
[8]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#user-session
