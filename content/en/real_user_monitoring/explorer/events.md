---
title: Events Side Panel
description: "View detailed information about individual RUM events including context, waterfalls, and performance data in the side panel."
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

The Real User Monitoring (RUM) Explorer displays individual events in a side panel. To open the event side panel in the [RUM Explorer][1], click on a table row in the **List** visualization type.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-1.png" alt="Application performance graph and Core Web Vitals in the Waterfall tab" width="100%" >}}

The side panel header displays contextual information about your users and their applications, including OS, country, code version, and browser. It also shows event-specific details such as the view path and loading type. For Synthetic test runs, the panel displays the test ID with a link to view the test result.

A distribution visualization appears at the top of the side panel regardless of which tab you're viewing. This helps you understand whether the current view is close to the median or is an outlier compared to other similar views.

## Waterfall tab

The **Waterfall** tab displays an interactive timeline of your view's performance, including [Core Web Vitals][3] with pass or fail indicators.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-2.mp4" alt="Interacting with the waterfall timeline in the Waterfall tab" video="true" width="80%" >}}

### Filtering the waterfall

Control which events appear in the waterfall:

- **By attribute**: Use the filter buttons above the waterfall. Click a filter to access additional options like resource URL, action name, error message, and more.
- **By time range**: Drag the time selectors in the minimap, or expand the left sidebar and click a timing to filter to events before that point.
- **By critical path**: Click the **Critical Events** toggle to see only events directly impacting your key performance timings.

The left sidebar reveals key timings, including custom timings from the [addTiming API][4].

### Inspecting events

Hover over any event in the waterfall to see its timestamp, duration, and contributing factors (scripts, style/layout, or other processing). Hover over a Core Web Vital to view its definition, threshold, and how it compares to your p75.

{{< img src="real_user_monitoring/explorer/events/specific-times.png" alt="Loading Time popover showing performance details, threshold indicators, and comparison to p75 performance" width="100%" >}}

### Connected telemetry

Click on events to access related data:

- **Resources**: View connected backend traces.
- **Long Animation Frames**: Access associated profiles for performance analysis.

## Additional tabs

Use the other tabs to explore related data:

| Tab | Description |
|-----|-------------|
| Replay | Watch a visual replay of the user's session. |
| Errors | View errors associated with the event. |
| Resources | Inspect all resources loaded during the event. |
| Traces | See backend traces connected to the event. |
| Feature Flags | View feature flags evaluated during the event. |
| Actions | Review user actions captured during the session. |
| Logs | Access logs associated with the event. |
| Attributes | View collected context attributes. Add custom attributes with the [Global Context API][2]. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[4]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#track-additional-performance-timings