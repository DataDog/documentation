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

{{< img src="real_user_monitoring/explorer/events/performance_side_panel-1.png" alt="Application performance graph and Core Web Vitals in the Waterfall tab" width="80%" >}}

The side panel header displays contextual information about your users and their applications, including OS, country, code version, and browser. It also shows event-specific details such as the view path and loading type. For Synthetic test runs, the panel displays the test ID with a link to view the test result.

## Metrics

You can view the following web vitals:

- **Loading Time** - 
- **Time To First Byte** - 
- **FCP** - 
- **LCP** - 
- **CLS** - 

## Waterfall tab

The **Waterfall** tab provides a visualization of resources, errors, actions, and long tasks. Use the filters or search bar to focus on specific event types. You can expand the waterfall and drag the time selectors to zoom into a specific time span. Click **+Filter** to add more filters.

comprehensive view of your application's performance:

- **Core Web Vitals**: Cards displaying key metrics like Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) with clear pass/fail indicators.
- **Event Timings**: A row of metrics including DOM Interactive, DOM Content Loaded, First Contentful Paint, DOM Complete, Load Event, and Loading Time.
- **Waterfall timeline**: A visualization of resources, errors, actions, and long tasks. Use the filter buttons (**Network**, **Events**, **Timings**) or the search bar to focus on specific event types. You can expand the waterfall and drag the time selectors to zoom into a specific time span.

{{< img src="real_user_monitoring/explorer/events/events_side_panel-1.mp4" alt="Interacting with the waterfall timeline in the Waterfall tab" video="true" width="80%" >}}

## Additional tabs

Use the other tabs to explore related data:

- **Errors**: View errors associated with the event.
- **Resources**: Inspect all resources loaded during the event.
- **Traces**: See backend traces connected to the event.
- **Actions**: Review user actions captured during the session.
- **Logs**: Access logs associated with the event.
- **Attributes**: View all collected context attributes.
- **Raw Event**: Inspect the raw event data.

## Attributes

RUM collects contextual information by default. You can also add additional context attributes with the [Global Context API][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute tab" width="80%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/explorer
[2]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
