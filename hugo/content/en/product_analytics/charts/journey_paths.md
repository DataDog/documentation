---
title: Journey Paths Analysis
description: See the most common paths users take between two events, including paths for sessions that dropped off before reaching the second event.
---

Journey paths show the most common paths users take between selected events.

Use journey paths to:
- See what views and actions users typically go through between a starting event and a target event.
- Compare the paths taken by users who converted against the paths taken by users who dropped off.
- Investigate branching paths, including detours that skip directly from one step to another.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_conversion_chart.png" alt="A rendered Journey Paths chart showing the top paths users take between two views" style="width:100%;" >}}

## Create a journey paths chart

1. In {{< ui >}}Product Analytics{{< /ui >}}, select {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Journey Paths{{< /ui >}}.

2. Define {{< ui >}}User steps{{< /ui >}} by selecting at least two events that you want to analyze paths between. 

   For a given step, click {{< ui >}}or...{{< /ui >}} to specify multiple events, or click the filter icon to filter the step by specified properties. 

3. (Optional) Filter chart results based on properties such as country or device type using {{< ui >}}Filter by{{< /ui >}} criteria.

## Analyze a journey paths chart

After you define steps in a journey, the chart displays the most common paths that sessions took between them.

Each path shows the percentage and number of sessions that followed that path, and the average time spent on it. Paths with no listed events represent sessions that went directly from the start event to the end event with no intermediate views or actions in between.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_customization.png" alt="A Journey Paths chart with numbered callouts for the converted/dropped selector, step selector, time range, event type toggles, View more, the path options menu, and the More Paths/Fewer Paths controls" style="width:100%;" >}}

You can refine journey path charts in various ways to zero in on the paths you want to analyze.

1. Use the {{< ui >}}Converted{{< /ui >}} / {{< ui >}}Dropped{{< /ui >}} selector to switch between paths that reached the final step and those that dropped off. Dropoff paths have no end node, and their total session count reflects a subset of the full starting population. 

2. In journeys with multiple steps, use the step selector to choose which pair of steps to analyze paths between.  

3. Use the time range selector to change the period of data the chart analyzes.

4. Use the {{< ui >}}Views{{< /ui >}} and {{< ui >}}Actions{{< /ui >}} toggles to control which event types appear as path nodes. Views, actions, and custom actions each display with a distinct color and icon in the diagram, so you can identify the type of event at each step of a path.

5. For truncated paths, click {{< ui >}}View more{{< /ui >}} to reveal the next events in that path. Click {{< ui >}}View less{{< /ui >}} to collapse it again.

6. Click an event to open a menu with options to view the session replays or the users associated with that path. Or, hold **Option** (macOS) or **Alt** (Windows/Linux) and click an event to hide it from the diagram.

7. Use {{< ui >}}More Paths{{< /ui >}} and {{< ui >}}Fewer Paths{{< /ui >}} to control how many paths are displayed.
