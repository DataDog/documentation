---
title: Journey Paths Analysis
further_reading:
- link: '/product_analytics/charts/funnel_analysis/'
  tag: Documentation
  text: Funnel Analysis
- link: '/product_analytics/charts/pathways/'
  tag: Documentation
  text: Pathways Diagrams
---

## Overview

Journey Paths charts show the most popular paths users take between any two events, and the most popular paths users take when they drop off before reaching the second event.

Use a Journey Paths chart to:
- See what pages and actions users typically go through between a starting event and a target event
- Compare the paths taken by users who converted against the paths taken by users who dropped off
- Investigate branching paths, including detours that skip directly from one step to another

## Build a Journey Paths chart

To start building a Journey Paths chart, navigate to [{{< ui >}}Product Analytics{{< /ui >}}][1], then select [{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Journey Paths{{< /ui >}}][2].

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_create_new.png" alt="The Journey Paths option highlighted in the Create New menu, alongside Funnel, Pathways, Retention, and Analytics" style="width:60%;" >}}

### Define your steps

Under {{< ui >}}User steps{{< /ui >}}, select the two events you want to analyze paths between:

1. Select the view or action to act as **Step 1**, the starting event.
2. Select the view or action to act as **Step 2**, the target event.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_select_step.png" alt="The step picker open for Step 1, showing tabs for All, Views, Actions, and Server actions" style="width:80%;" >}}

Click {{< ui >}}Add step{{< /ui >}} to define additional steps, then use the {{< ui >}}Step 1 → Step 2{{< /ui >}} selector above the chart to choose which pair of steps to analyze paths between. Non-adjacent steps are supported, so you can, for example, analyze the paths between step 1 and step 3 directly, skipping step 2.

To combine multiple events into a single step, click {{< ui >}}or...{{< /ui >}} next to that step. Click the filter icon next to a step to add filter criteria for that step alone.

### Add filters

Optionally, use {{< ui >}}Filter by{{< /ui >}} to add global filter criteria, such as user country or device type, that apply to all sessions included in the chart.

## Analyze a Journey Paths chart

After you define your steps, the chart displays the most common paths that sessions took between them.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_conversion_chart.png" alt="A rendered Journey Paths chart showing the top paths users take between two views" style="width:100%;" >}}

Each path row shows the percentage and number of sessions that took that path, and the average time spent on it. A path with no listed events represents sessions that went directly from the start event to the end event with no intermediate views or actions in between.

### View conversion or drop-off paths

Use the {{< ui >}}Converted{{< /ui >}} / {{< ui >}}Dropped{{< /ui >}} selector above the chart to switch between:

- **Converted**: paths taken by sessions that reached Step 2 after Step 1.
- **Dropped**: paths taken by sessions that reached Step 1 but never reached Step 2.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_dropoff_chart.png" alt="A rendered Journey Paths chart showing the top drop-off paths after a starting event" style="width:100%;" >}}

Because drop-off sessions never reach Step 2, drop-off paths have no end node, and the total session count reflects only the sessions that dropped off rather than the full starting population.

### Filter by event type

Use the {{< ui >}}Views{{< /ui >}} and {{< ui >}}Actions{{< /ui >}} toggles in the bottom-right corner of the chart to control which event types appear as path nodes. Expand {{< ui >}}Actions{{< /ui >}} to toggle {{< ui >}}Auto Actions{{< /ui >}} and {{< ui >}}Custom actions{{< /ui >}} independently.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_event_filters.png" alt="A Journey Paths chart with Views, Actions, Auto Actions, and Custom actions all enabled, showing color-coded path nodes for each event type" style="width:100%;" >}}

Views, actions, and custom actions each display with a distinct color and icon in the diagram, so you can identify the type of event at each step of a path. Hold **Option** (macOS) or **Alt** (Windows/Linux) and click an event node to hide that event from the diagram.

### Expand a path

Paths are truncated at a set number of events. Click {{< ui >}}View more{{< /ui >}} at the end of a truncated path to reveal the next events in that path. Click {{< ui >}}View less{{< /ui >}} to collapse it again.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_expand_path.png" alt="A Journey Paths chart with a path expanded to show additional events beyond the initial truncation point" style="width:100%;" >}}

### Investigate a path

Click a path's event chain to open a menu with options to view the session replays or the users associated with that path.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_node_menu.png" alt="The path options menu showing View related replays and View related users" style="width:100%;" >}}

### Adjust the number of paths shown

Use {{< ui >}}More Paths{{< /ui >}} and {{< ui >}}Fewer Paths{{< /ui >}} below the chart to control how many paths are displayed.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/journey-paths
