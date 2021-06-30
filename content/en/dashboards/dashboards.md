---
title: Dashboard Layout
kind: documentation
aliases:
    - /graphing/dashboards/dashboard/
    - /graphing/dashboards/dashboard/
    - /dashboards/dashboard/
    - /dashboards/
    - /dashboard/
further_reading:
- link: "/dashboards/template_variables/"
  tag: "Documentation"
  text: "Enhance your Dashboards with Template Variables"
- link: "/dashboards/sharing/"
  tag: "Documentation"
  text: "Share your Graphs outside of Datadog"
- link: "/dashboards/widgets/"
  tag: "Documentation"
  text: "Discover all available Widgets for your Dashboard"
---

Dashboards are the next-gen grid based layout which can include a variety of objects such as images, graphs, and logs. They are commonly used as status boards or storytelling views that update in real-time or represent fixed points in the past. They also work well for debugging dashboards.

To switch from the [Timeboard layout][1] to the Dashboard layout, use `Pick Layout` in the cog menu and select `Grid`.

{{< img src="dashboards/grid-layout.png" alt="Grid layout option for a dashboard"  style="width:70%;">}}

#### High-density mode

High-density mode displays group widgets in a dashboard side-by-side for increased widget density. This mode turns on by default for on large screens for dashboards that use group widgets.

{{< img src="dashboards/high-density-mode.png" alt="The high-density mode display"  style="width:90%;">}}

## Search

For overlay search options, see [timeboards documentation][2].

## Graph menu

For graph menu options, see [timeboards documentation][3].

## Tips and tricks

- Click on a widget icon to add it to the dashboard without dragging (keyboard shortcuts `N` and `shift+N` also do this)
- Double click the bottom left or bottom right resize handle on a widget to instantly fill any empty, adjacent space
- Click and drag from any empty space to use the lasso tool
- When multiple widgets are selected, an action menu appears with bulk-actions
- Press `cmd+G` or `ctrl+G` to group selected widgets
- Use the dashboard header cog menu to open or collapse all groups on a dashboard


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/timeboards
[2]: /dashboards/timeboards/#search
[3]: /dashboards/timeboards/#graph-menu
