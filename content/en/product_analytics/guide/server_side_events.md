---
title: Track Server-Side Events
description: Send custom events from your server to supplement client-side data in Product Analytics.
further_reading:
- link: "/api/latest/product-analytics/#send-server-side-events"
  tag: "API Reference"
  text: "Product Analytics API"
- link: "/product_analytics/"
  tag: "Documentation"
  text: "Product Analytics"
- link: "/product_analytics/data_collected/"
  tag: "Documentation"
  text: "Product Analytics Data Collected"
---

## Overview

Server-side events are custom events sent through the [Product Analytics API][1] from your server. Unlike client-side events captured by the RUM SDK, such as pageviews or button clicks, server-side events track actions that occur in your backend, such as a completed checkout or processed payment.

Use server-side events to:

- Capture events at the source of truth on the server, independent of client-side behavior
- Track backend actions with no client-side equivalent, such as a payment confirmation or subscription renewal
- Supplement client-side data with server-side context

<div class="alert alert-warning">Datadog bills server-side events separately. See the <a href="https://www.datadoghq.com/pricing/?product=product-analytics#products">pricing page</a> for details, and contact your Customer Success Manager with additional questions.</div>

## Prerequisites

Before sending server-side events, [set up the Datadog SDK][2] for your application and [enable Product Analytics][3].

## Send server-side events

Use the [Product Analytics API][1] to send events from your server. To associate a server-side event with a client session, include the `session_id` from the client's active RUM session. Including the session ID links server-side events to client-side data for a complete view of the user journey.

For the full API reference, including authentication, required fields, and request parameters, see [Send server-side events][1].

## Analyze server-side events

After you send server-side events, they are available in any Product Analytics chart. In the event picker, select **Server Events** to scope your analysis to server-side data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/product-analytics/#send-server-side-events
[2]: /product_analytics/#track-client-side-events-sdk
[3]: /product_analytics/#enable-product-analytics
