---
title: How do I export Monitors Alerts?
kind: faq
further_reading:
- link: "/monitors/monitor_types"
  tag: "Documentation"
  text: Learn how to create a monitor
---

Customers sometimes require an audit trail of all Monitor Alerts that have triggered during a specific period of time. If you are an Administrator, you can easily generate a CSV of the past half year (182 days) by accessing this link: https://app.datadoghq.com/report/hourly_data/monitor

If you need a more specific timeframe, adjust the URL to add in the from and to arguments represented in epoch time, for example: https://app.datadoghq.com/report/hourly_data/monitor?from=XXXX&to=YYYY

You can generate the relevant epoch times by leveraging an online epoch converter like [epochconverter](https://www.epochconverter.com/) or navigate to our [Events stream](/graphing/event_stream), set the desired timeframes, and then reference the values from the resulting URL's from_ts and to_ts arguments referencing this [example](https://cl.ly/343a0L1N2A3i)

{{< partial name="whats-next/whats-next.html" >}}