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

{{< img src="real_user_monitoring/explorer/events/performance_side_panel-1.png" alt="Application performance graph and Core Web Vitals in the Waterfall tab" width="100%" >}}

The side panel header displays contextual information about your users and their applications, including OS, country, code version, and browser. It also shows event-specific details such as the view path and loading type. For Synthetic test runs, the panel displays the test ID with a link to view the test result.

## Waterfall tab

The **Waterfall** tab provides a comprehensive view of your application's performance:

- **Core Web Vitals**: Cards displaying key metrics like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) with clear pass/fail indicators.
- **Event Timings**: A row of metrics including DOM Interactive, DOM Content Loaded, First Contentful Paint, DOM Complete, Load Event, and Loading Time.
- **Waterfall timeline**: A visualization of resources, errors, actions, and long tasks. Use the filter buttons (**Network**, **Events**, **Timings**) or the search bar to focus on specific event types. You can expand the waterfall and drag the time selectors to zoom into a specific time span.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-2.mp4" alt="Interacting with the waterfall timeline in the Waterfall tab" video="true" width="80%" >}}

### Filter by metric

The side panel displays the following performance metrics for each view event:

- [Loading Time][3]
- [Time To First Byte][3]
- [First Contentful Paint (FCP)][4]
- [Largest Contentful Paint (LCP)][4]
- [Cumulative Layout Shift (CLS)][4]

### Filter on specific times

Hover over a web vital to view its definition, current value, and threshold indicators.

{{< img src="real_user_monitoring/explorer/events/specific-times.png" alt="Loading Time popover showing performance details, threshold indicators, and comparison to p75 performance in the Waterfall tab" width="100%" >}}

### Subevent details

Hover over any subevent in the waterfall to view its timestamp, duration, and a breakdown of contributing factors (such as scripts, style and layout, or other processing).

{{< img src="real_user_monitoring/explorer/events/hover-subevent.png" alt="Loading Time popover showing performance details, threshold indicators, and comparison to p75 performance in the Waterfall tab" width="100%" >}}

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
| Attributes | View all collected context attributes. |

## Attributes

RUM collects contextual information by default. You can also add additional context attributes with the [Global Context API][2].

{{< img src="real_user_monitoring/explorer/events/attributes-1.png" alt="Attribute tab" width="100%" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#all-performance-telemetry
[4]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals