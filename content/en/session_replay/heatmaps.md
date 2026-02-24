---
title: Heatmaps
description: Heatmaps are a type of visualization showing where users click on your website.
aliases:
- /real_user_monitoring/session_replay/heatmaps
- /real_user_monitoring/heatmaps
- /product_analytics/session_replay/heatmaps
- /product_analytics/heatmaps
further_reading:
- link: '/session_replay/browser/'
  tag: 'Documentation'
  text: 'Session Replay for Browsers'
- link: '/session_replay/mobile/'
  tag: 'Documentation'
  text: 'Session Replay for Mobile'
- link: 'https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/'
  tag: 'Blog'
  text: 'Visualize user interactions with your pages by using Scrollmaps in Datadog Heatmaps'
---

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-landing.png" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's interactions overlaid on Session Replay data. There are three different types of heatmaps:

- **Click maps:** View user interactions (clicks) to understand how users engage with your page.
- **Top Elements:** View a ranking of up to the top 10 most interacted-with elements on a given page.
- **Scroll maps:** View how far users scroll down a page, including where the average fold of a page falls. The average fold is the lowest point on a page that a user can see on their device without scrolling.

Use heatmaps to review complex data at a glance and gain insights around optimizing your user experience.

## Prerequisites

To get started with heatmaps:

1. Verify your SDK version:
   - For Click maps, you must be on the latest version of the SDK (v4.40.0 or later).
   - For Scroll maps, you must be on (v4.50.0 or later).
2. Enable [Session Replay][1].
3. Set`trackUserInteractions: true` in the SDK initialization to enable action tracking (required for Clickmaps).

## Getting started

{{< tabs >}}
{{% tab "RUM" %}}

Navigate to [**Digital Experience > Real User Monitoring > Session Replay > Heatmaps**][1]. Select your application and view.

On the [Real User Monitoring landing page][2], select your application from the application selector and view. To the left of the timeframe selector, you can select the type of heatmap you would like to view: Top elements, Click map, or Scroll map.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-different-views.png" alt="The heatmaps page has multiple ways to show different views: by application, map type, device type, action name, and granular filters." style="width:100%;">}}

[1]: https://app.datadoghq.com/rum/heatmap/
[2]: https://app.datadoghq.com/rum/performance-monitoring

{{% /tab %}}
{{% tab "Product Analytics" %}}

Navigate to [**Digital Experience > Product Analytics > Heatmaps**][1]. Select your application and view.

From this page, you can select the type of heatmap (Top elements, Click map, Scroll map) you would like to see for a particular view.

{{< img src="product_analytics/heatmaps/pa-heatmaps-page.png" alt="For each view, you can select a different type of heatmap: Top Elements, Click Map, or Scroll Map." style="width:100%;">}}

Click on a view name for a more detailed look at the related heatmap.

{{< img src="product_analytics/heatmaps/pa-heatmaps-annotated.png" alt="The heatmaps page has multiple ways to show different views: by application, map type, device type, action name, and granular filters." style="width:100%;">}}

[1]: https://app.datadoghq.com/product-analytics/heatmap

{{% /tab %}}
{{< /tabs >}}

You have the following additional view options:

- To switch the view being shown, use the **View Name** and **Application** selectors at the top.
- To change the device view, use the **Device type** selector.
- To filter by action name, use the **Filter actions by** dropdown.
- To add more granular filters, like a specific geography for example, click the **Add Filter** button.

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

Scroll maps display the aggregate scroll activity on a given page. Use Scroll maps to see where the average fold of the page falls, and how many users scroll to a given depth. You can drag the floating blue bar on a Scroll map to the depth you wish to assess.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-scrollmap.png" alt="Scrollmap of the bedding page in a sample ecommerce application" style="width:100%;">}}

The panel to the left of the Scroll map provides high-level insights with direct links to query results, such as a link to a list of views where the user scrolled past a given percentile. Below the insight panel is a minimap of the page and a distribution graph displaying granular scroll data, useful for identifying where the biggest drop-off occurs.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-minimap.png" alt="A screenshot of the queries for scroll data insights" style="width:50%;">}}

## Screenshots

A screenshot is the state of a view at a particular point in time. Changing the screenshot shows different results, depending on the screenshot selected. You can also save screenshots so that everyone in your organization can analyze the same view state. 

### Changing screenshots
From the heatmap view, click the **Change Screenshot** button. Choose from existing screenshots previously saved by teammates, or grab a screenshot from a Session Replay.

To select a screenshot from a Session Replay:

1. Click **Grab from replay** if the desired heatmap screenshot has not been previously saved.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-screenshot-button-1.png" alt="Click the Grab from replay button to change the screenshot the heatmap background is based on." style="width:100%;">}}

1. Click an action event on the right to select a different snapshot for your heatmap.

   {{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-list-all-events-1.png" alt="List of action events for the session replay." style="width:100%;">}}

1. If the session [does not contain the action](#the-view-that-i-selected-is-not-showing-the-initial-content) that leads to the desired screenshot, you can return to the list of replays by clicking **Choose Another Replay**.
1. Click the **Take Screenshot** button to apply the screenshot at the paused point to the heatmap.

### Saving screenshots

You can save the current heatmap state as a screenshot so it becomes the default view for anyone in your organization who opens the heatmap. To save the current screenshot auto-picked from a recent replay, click **Save** on the current screenshot.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-save-screenshot-1.png" alt="Click Save to apply the auto-picked screenshot." style="width:100%;">}}

You can save multiple screenshots for the same view (for example: default view, open navigation menu, open modal) and switch between screenshots saved by teammates.

To remove the currently saved screenshot and revert to an auto-picked one from a recent replay, click **Unpin** on the current screenshot.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-unpin-screenshot-1.png" alt="Click unpin to remove the currently pinned screenshot." style="width:100%;">}}

## Data retention

The time periods you can view in a heatmap depend on where you access it:

- **RUM**: Session Replay heatmaps use RUM click data (RUM action events), which has a 30-day retention period.
- **Product Analytics**: Heatmaps use Product Analytics click data, which has a 15-month retention period.

## Next steps

After analyzing heatmaps, the next step is to understand the user action by exploring related data. Watch associated [session replays][1] to see user actions in the context of their overall session, or navigate to an Analytics explorer in [RUM][3] or [Product Analytics][4] to analyze your user data.

## Troubleshooting

### I am looking at a heatmap for a given view, but it's showing me an unexpected page.

Heatmaps are based on view names. Depending on how your application is configured, many pages can start being grouped under the same view name, or you can start having specific view names.

### The view that I selected is not showing the initial content.

Heatmaps are generated with Session Replay data. Datadog's intelligent algorithm picks a replay that is both recent and best matches the initial state of the page. In some cases, this replay might not be the one you want to use. To switch the snapshot of your heatmap, use the **Change Snapshot** button to navigate through the different states of a replay and find the one you want. If the replay you're viewing does not have the snapshot you're looking for, you can use the **Choose Another Replay** button to select another replay of the same view.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-change-the-snapshot.mp4" alt="Select a different background by clicking the Change Snapshot button" video=true >}}

### On the action list on the side of my heatmap, I see an icon showing an element that is not visible in the heatmap.

The tooltip on the icon says element is not visible. This means that the element is a common action on your page, but it's not displayed on the snapshot in the heatmap. To see that element, you can click **Change Snapshot** in the top right corner to switch the snapshot of your heatmap to one where that element is present.

{{< img src="real_user_monitoring/session_replay/heatmaps/heatmaps-hidden-elements.png" alt="Hidden elements in the action list on a heatmap." style="width:100%;">}}

### After attempting to create a heatmap, I see a "No Replay Data" state appear.

The "No Replay Data" state means that Datadog could not find any Session Replays to use as a heatmap background that matches the current search filters. If you just started to record sessions with the [Browser SDK][2], it may also take a few minutes for the Session Replay to be available for viewing.

### After attempting to create a heatmap, I see a "Not enough data to generate a heatmap" state appear.

This means that Datadog was not able to match any user actions with the current selected replay. This happens for a variety of reasons, such as:

- Your application is not using the latest SDK version (>= 4.20.0).
- Your page has recently changed drastically. 

### All of the user information on the page is empty.

User information is not collected by default. Heatmaps use the user information available in your session data to display relevant insights on behavior.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: /real_user_monitoring/explorer/
[4]: /product_analytics/charts/analytics_explorer/
