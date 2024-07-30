---
title: Events Side Panel
further_reading:
- link: "/real_user_monitoring/explorer/search/"
  tag: "Documentation"
  text: "Search for your events"
---

## Overview

The Product Analytics Explorer displays individual events in a side panel format:

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Application performance graph and Core Web Vitals in the Performance tab" width="80%" >}}

General context information is provided at the top. Scroll to the waterfall to see the actual content of the event. 

Context about your users and their applications, including the OS, country, code version, and more, is captured when the event is generated. Context also refers to the event itself, which includes information specific to the event type. For example, the event side panel shows the view path while the **Errors** side panel shows the error message.

## Event side panel

To open the event side panel in the [Analytics Explorer][1], click on a table row in the **List** visualization type. Alternatively, click in the side panel list displayed after you click on **Show related events**. 

The event side panel displays all the information relative to a Product Analytics event. The waterfall displays related views and actions.

## Attributes

Product Analytics collects contextual information by default. You can also add additional context attributes with the [Global Context API][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Attribute tab" width="80%" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
