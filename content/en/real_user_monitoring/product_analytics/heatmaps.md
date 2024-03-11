---
title: Heatmaps
kind: documentation
description: Heatmaps are a type of visualization allowing you to see where users click on your website.
aliases:
- /real_user_monitoring/heatmaps
further_reading:
- link: '/real_user_monitoring/session_replay/'
  tag: 'Documentation'
  text: 'Session Replay'
- link: 'https://www.datadoghq.com/blog/visualize-behavior-datadog-scrollmaps/'
  tag: 'Blog'
  text: 'Visualize user interactions with your pages by using Scrollmaps in Datadog Heatmaps'
---

{{< img src="real_user_monitoring/heatmaps/heatmap_v2.png" alt="An overview of the heatmap functionality." style="width:100%;">}}

A heatmap (or heat map) is a visualization of your user's interactions overlaid on Session Replay data. RUM has three different types of heatmaps:

- **Click maps:** View user interactions (clicks) to understand how users engage with your page
- **Top Elements:** View a ranking of up to the top 10 most interacted-with elements on a given page.
- **Scroll maps:** View how far users scroll down a page, including where the average fold of a page falls. The average fold is the lowest point on a page that a user can see on their device without scrolling.

Use heatmaps to review complex data at a glance, gaining insights around optimizing your user experience.

## Prerequisites

To get started with heatmaps:

1. Verify your SDK version:
  - For Click maps, you must be on the latest version of the SDK (v4.40.0 or later).
  - For Scroll maps, you must be on (v4.50.0 or later)
2. Enable [Session Replay][1].
3. Set`trackUserInteractions: true` in the SDK initialization to enable action tracking (required for Clickmaps).

## Getting started

On the [view list page][9], select your application and view. You can select the type of heatmap you would like to view as well.

{{< img src="real_user_monitoring/heatmaps/view-list-updated.png" alt="Select a view from the Heatmap view list" style="width:100%;" >}}

This takes you to the [heatmap page][3] for a particular view. You can switch the view being shown with the **View Name** and **Application** selectors at the top. To add more granular filters, like a specific geography for example, you can add a filter from the panel on the left side.

{{< img src="real_user_monitoring/heatmaps/heatmaps-filters-v2.png" alt="Shows the selector for selecting an application and a view from the options where you have already enabled session replay." style="width:100%;">}}

## Click maps

A Click map shows you the most interacted-with actions on a given view by aggregating user click actions from sessions and visualizing them as blobs on the map.

{{< img src="real_user_monitoring/heatmaps/heatmap_v3.png" alt="Clickmap data overlayed on a website." style="width:60%;">}}

Each Click map also offers analytics such as:

- Where that page ranks out of all other visited pages
- Unique user counts to that page
- Any frustration signals on that page

Below the panel are all actions that occurred on the page, listed by frequency. When you click into an action, you can understand more about that interaction, for example:

- The number of times the user performed the action and where it falls in overall analytics of top actions on a given page.
- If that action had a frustration signal occurring on it (for example, if a user rage clicked on that button), you can view the associated frustration signals as well.

{{< img src="real_user_monitoring/heatmaps/actions.jpeg" alt="Shows an example action and the information you can get about that action." style="width:60%;">}}

## Top Elements

Top Elements heatmaps aggregate click actions on a given view by displaying the most interacted-with elements and their rank. The ranking on the map itself corresponds to the action name on the side.

{{< img src="real_user_monitoring/heatmaps/top-elements-v3.png" alt="A ranking of the top elements clicked on a page." style="width:100%;">}}

Click any action name in the panel to highlight the corresponding action on the map.

## Scroll maps

Scroll maps show a visual of the aggregate scroll activity on a given page. Use Scroll maps to see where the average fold of the page falls, and how many users scroll to a given depth. You can drag the floating blue bar on a Scroll map to the depth you wish to assess.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-v3.png" alt="Scrollmap of the bedding page in a sample ecommerce application" style="width:100%;">}}

The panel to the left of the Scroll map provides high-level insights with direct links to query results, such as a link to a list of views where the user scrolled past a given percentile. Below the insight panel is a minimap of the page and a distribution graph displaying granular scroll data, useful for identifying where the biggest drop-off occurs.

{{< img src="real_user_monitoring/heatmaps/scrollmaps-insights-panel.png" alt="A screenshot of the queries for scroll data insights" style="width:50%;">}}

## Next steps

After understanding analytics, the next step is to understand the action in the context of other data outside of heatmaps. This might mean pivoting to the [RUM explorer][4] or building a funnel that includes the action in order to [analyze conversion rates][5]. You can also watch associated [session replays][1] to visually see a user performing the action in the context of their overall session.

## Troubleshooting

### I am looking at a heatmap for a given view, but it's showing me an unexpected page.

Heatmaps are based on RUM view names. Depending on how your RUM application is configured, many pages can start being grouped under the same view name, or you can start having very specific view names. If you think the default view name gathering is not sufficient, you can override it manually with the [startView][6] function. 

### The view that I selected is not showing the initial content.

Heatmaps are generated with Session Replay data. Datadog's intelligent algorithm smartly picks a replay that is both recent and best matches the initial state of the page. In some cases, we might not be able to find the correct replay. To switch the background of your heatmap, you can use the **Choose Background** button to navigate through the different states of the page and find the one you are looking for.

{{< img src="real_user_monitoring/heatmaps/heatmaps-background-selector.mp4" alt="Select a different background via the choose background button" video=true >}}

### On the action list on the side of my heatmap, I see an icon showing an element that is not visibile in the heatmap.

{{< img src="real_user_monitoring/heatmaps/heatmaps-hidden-elements.png" alt="Hidden elements in the action list on a heatmap." style="width:60%;">}}

The tooltip on the icon says **element is not visible**. This means that the element is a common action on your page, but it's not displayed on the background in the heatmap. To see that element, you can click **Choose Background** in the bottom right corner to switch the background of your heatmap to one where that element is present. 

### After attempting to create a heatmap, I see a "No Replay Data" state appear. 

This means that Datadog could not find any Session Replays to use as a heatmap background that matches the current search filters. If you just started to record sessions with the [Browser SDK][2], it may also take a few minutes for the Session Replay to be available for viewing.

### After attempting to create a heatmap, I see a "Not enough data to generate a heatmap" state appear.

This means that Datadog was not able to match any user actions with the current selected replay. This happens for a variety of reasons, such as:

- Your application is not using the latest SDK version (>= 4.20.0).
- RUM actions are not enabled. Learn how to [track user interactions][7].
- Your page has recently changed drastically. 

### All of the user information on the page is empty.

User information is not collected by default. Heatmaps use the user information available in your session data to display relevant insights on behavior. You can set up user information in RUM by following the steps in [Modifying Data and Context][8].

## Further reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/
[2]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum/package.json
[3]: https://app.datadoghq.com/rum/heatmap/view
[4]: /real_user_monitoring/explorer/
[5]: /real_user_monitoring/guide/alerting-with-conversion-rates/
[6]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[7]: /real_user_monitoring/browser/tracking_user_actions/#manage-information-being-collected
[8]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#user-session
[9]: https://app.datadoghq.com/rum/heatmap
