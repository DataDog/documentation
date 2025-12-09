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

Use the side panel header to view contextual information about your users (environment, country) and event-specific details like view path and loading type. For Synthetic test runs, click the test ID to view the result.

The distribution visualization at the top helps you understand whether the current view is close to the median or is an outlier. Use the metric dropdown to switch between {{< tooltip text="Loading Time" tooltip="Time until the page is ready and no network request or DOM mutation is happening. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Learn more</a>" >}}, {{< tooltip text="Time To First Byte" tooltip="Time elapsed until the first byte of the view has been received. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry'>Learn more</a>" >}}, {{< tooltip text="FCP" tooltip="First Contentful Paint: Time when the browser first renders any text, image, or SVG. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Learn more</a>" >}}, {{< tooltip text="LCP" tooltip="Largest Contentful Paint: Time when the largest DOM object in the viewport is rendered. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Learn more</a>" >}}, {{< tooltip text="CLS" tooltip="Cumulative Layout Shift: Quantifies unexpected page movement due to dynamically loaded content. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Learn more</a>" >}}, and {{< tooltip text="INP" tooltip="Interaction to Next Paint: Longest duration between a user's interaction and the next paint. <a href='/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals'>Learn more</a>" >}}. Adjust the time range to view data by day, week, or month.

{{< img src="real_user_monitoring/explorer/events/side-panel-overview-2.png" alt="RUM Explorer side panel showing the distribution visualization, waterfall timeline, and filter options" width="100%" >}}

Click any tab to view its corresponding details and investigate specific aspects of the event. See [Additional tabs](#additional-tabs) for a full list.

## Waterfall tab

The **Waterfall** tab displays an interactive timeline of the events associated with this view. Key performance markers are overlayed, including [Core Web Vitals][3] or mobile timings, with pass or fail indicators.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-3.mp4" alt="Interacting with the waterfall timeline in the Waterfall tab" video="true" width="80%" >}}

### Filtering the waterfall

Control which events appear in the waterfall:

- **By critical path**: Click the **Critical Events** toggle to see only events directly impacting your key performance timings.
- **By attribute**: Use the filter buttons above the waterfall. Click a filter to access additional options like resource URL, action name, error message, and more.
- **By time range**: Drag the time selectors in the minimap, or expand the left sidebar and click a timing to filter to events before that point.

The left sidebar reveals key timings, including custom timings from the [addTiming API][4].

### Inspecting events

Hover over any event in the waterfall to see its timestamp, duration, and contributing factors (scripts, style/layout, or other processing). Hover over a Core Web Vital to view its definition, threshold, and how it compares to your p75.

{{< img src="real_user_monitoring/explorer/events/specific-times-1.png" alt="Loading Time popover showing performance details, threshold indicators, and comparison to p75 performance" width="100%" >}}

### Connected telemetry

Click on events in the waterfall to access related data:

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