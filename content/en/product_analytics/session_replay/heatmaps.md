---
title: Heatmaps
aliases:
- /product_analytics/heatmaps
description: Heatmaps are a type of visualization allowing you to see where users click on your website.
further_reading:
- link: '/product_analytics/session_replay/browser/'
  tag: 'Documentation'
  text: 'Session Replay'
- link: 'https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/'
  tag: 'Blog'
  text: 'Visualize user interactions with your pages by using Scrollmaps in Datadog Heatmaps'
---
## Overview
{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's interactions overlaid on Session Replay data. Product Analytics has three different types of heatmaps:

- **Click maps:** View user interactions (clicks) to understand how users engage with your page
- **Top elements:** View a ranking of up to the top 10 most interacted-with elements on a given page.
- **Scroll maps:** View how far users scroll down a page, including where the average fold of a page falls. The average fold is the lowest point on a page that a user can see on their device without scrolling.

Use heatmaps to review complex data at a glance, gaining insights around optimizing your user experience.

## Prerequisites

To get started with heatmaps:

1. Verify your SDK version:
   - For Click maps, you must be on the latest version of the SDK (v4.40.0 or later).
   - For Scroll maps, you must be on (v4.50.0 or later).
2. Enable [Session Replay][1].
3. Set`trackUserInteractions: true` in the SDK initialization to enable action tracking (required for Clickmaps).

## Getting started

Navigate to [**Digital Experience > Product Analytics > Session Replay > Heatmaps**][2]. Select your application and view.

From this page, you can select the type of heatmap (Top Elements, Click Map, Scroll Map) you would like to see for a particular view.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="For each view, you can select a different type of heatmap: Top Elements, Click Map, or Scroll Map." style="width:100%;">}}

Click on a view name to have a more detailed look of the related heatmap. From here, you have these additional view options:

- To switch the view being shown, use the **View Name** and **Application** selectors at the top.
- To change the device view, use the **Device type** selector.
- To filter by action name, use the **Filter actions by** dropdown.
- To add more granular filters, like a specific geography for example, click the **Add Filter** button.

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="The heatmaps page has multiple ways to show different views: by application, map type, device type, action name, and granular filters." style="width:100%;">}}

## Top Elements

Top Elements heatmaps aggregate click actions on a given view by displaying the elements that are most interacted with, in addition to their interaction rank. The ranking on the map itself corresponds to the action name on the side.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-top-elements.png" alt="A ranking of the top elements clicked on a page." style="width:100%;">}}

Hover over any action name in the panel to highlight the corresponding action on the map.

## Click maps

A Click map shows you the actions most interacted with on a given view by aggregating user click actions from sessions and visualizing them as blobs on the map.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmaps.png" alt="Clickmap data overlayed on a website." style="width:100%;">}}

On the left is a list of all actions that occurred on the page, listed by frequency. When you click into an action, you can understand more about that interaction, for example:

- The number of times the user performed the action and where it falls in overall analytics of top actions on a given page.
- If that action had a frustration signal occurring on it (for example, if a user rage clicked on that button), you can view the associated frustration signals as well.

From this view, you can also click the **Start a Funnel** button to identify user drop off.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-clickmap-actions.png" alt="Shows an example action and the information you can get about that action." style="width:50%;">}}

## Scroll maps

Scroll maps show a visual of the aggregate scroll activity on a given page. Use Scroll maps to see where the average fold of the page falls, and how many users scroll to a given depth. You can drag the floating blue bar on a Scroll map to the depth you wish to assess.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="Scrollmap of the bedding page in a sample ecommerce application" style="width:100%;">}}

The panel to the left of the Scroll map provides high-level insights with direct links to query results, such as a link to a list of views where the user scrolled past a given percentile. Below the insight panel is a minimap of the page and a distribution graph displaying granular scroll data, useful for identifying where the biggest drop-off occurs.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="A screenshot of the queries for scroll data insights" style="width:50%;">}}

## Snapshots

A snapshot is the state of a Session Replay at a particular point in time. Changing the snapshot shows different results, depending on the snapshot selected. You can use the **Change Snapshot** button to select a particular snapshot in a replay for your heatmap.

To select a background snapshot:

1. From the heatmap view, click the **Change Snapshot** button.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-snapshot-button.png" alt="Click the Change Snapshot button to change the background snapshot the heatmap is based on." style="width:100%;">}}
1. Click an action event on the right to select a different snapshot for your heatmap.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events.png" alt="List of action events for the session replay." style="width:100%;">}}

1. If the session [does not contain the action](#the-view-that-i-selected-is-not-showing-the-initial-content) that leads to the desired snapshot, you can return to the list of replays by clicking **Choose Another Replay**.
1. Click the **Select Snapshot** button to apply the snapshot at the paused point to the heatmap.

## Next steps

After understanding analytics, the next step is to understand the action in the context of other data outside of heatmaps. This might mean pivoting to the [Analytics explorer][4]. You can also watch associated [session replays][1] to visually see a user performing the action in the context of their overall session.

## Troubleshooting

### I am looking at a heatmap for a given view, but it's showing me an unexpected page.

Heatmaps are based on Product Analytics view names. Depending on how your Product Analytics application is configured, many pages can start being grouped under the same view name, or you can start having specific view names.

### The view that I selected is not showing the initial content.

Heatmaps are generated with Session Replay data. Datadog's intelligent algorithm picks a replay that is both recent and best matches the initial state of the page. In some cases, you might not be able to find the correct replay. To switch the snapshot of your heatmap, you can use the **Change Snapshot** button to navigate through the different states of a replay and find the one you are looking for. If the replay you're viewing does not have the snapshot you're looking for, you can use the **Choose Another Replay** button to select another replay of the same view.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Select a different background by clicking the Change Snapshot button" video=true >}}

### On the action list on the side of my heatmap, I see an icon showing an element that is not visible in the heatmap.

The tooltip on the icon says element is not visible. This means that the element is a common action on your page, but it's not displayed on the snapshot in the heatmap. To see that element, you can click **Change Snapshot** in the top right corner to switch the snapshot of your heatmap to one where that element is present.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="Hidden elements in the action list on a heatmap." style="width:100%;">}}

### After attempting to create a heatmap, I see a "No Replay Data" state appear. 

This means that Datadog could not find any Session Replays to use as a heatmap background that matches the current search filters. If you just started to record sessions with the [Browser SDK][5], it may also take a few minutes for the Session Replay to be available for viewing.

### After attempting to create a heatmap, I see a "Not enough data to generate a heatmap" state appear.

This means that Datadog was not able to match any user actions with the current selected replay. This happens for a variety of reasons, such as:

- Your application is not using the latest SDK version (>= 4.20.0).
- Your page has recently changed drastically. 

### All of the user information on the page is empty.

User information is not collected by default. Heatmaps use the user information available in your session data to display relevant insights on behavior.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /product_analytics/session_replay/browser/
[2]: https://app.datadoghq.com/product-analytics/heatmap
[3]: https://app.datadoghq.com/product-analytics/summary
[4]: /product_analytics/analytics_explorer/
[5]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json 
