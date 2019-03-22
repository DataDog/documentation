---
title: Datadog Docs
kind: documentation
aliases:
  - /basic_agent_usage/
  - /guides/
  - /faq/
disable_toc: true
---

# Welcome to Datadog Docs!

*If you're new here, read below for a high-level view of Datadog.*

{{< partial name="tile-nav/tile-nav.html" >}}

Your application stack is teeming with unused metadata that's trying to tell a story: things aren't humming along as well as they should be.

Exceptions thrown; database queries slowing; cache misses rising; upstream services flapping; error logs growing. Each of these tells a part of the story, but it's hard to make sense of-or act on meaningfully-when taken separately from the others.

Datadog lets you collect all these metrics, events, and service states in one place. Then, visualize and correlate the data with beautiful graphs, and set flexible alerting conditions on it-all without running any storage or monitoring infrastructure yourself.

## Collect Everything

Collect a wealth of already-available data without writing any code. [Install the Datadog Agent][1] everywhere—every server, instance, VM, node, [container-running host][2]—then enable and configure any of the 200+ out-of-the-box [integrations][3] to start the metrics flowing to Datadog's backend.

Submit custom application metrics by writing a little code. Instrument your own gauges, counters, timers, and histograms with [DogStatsD][4], or use [APM][5] to trace the execution time of any code path to see how it impacts overall request-response times. The [client libraries][6] send your [custom metrics][7] and trace data to the Datadog Agent, which then ships them off to Datadog.

Some of your stack may be SaaS, not servers. Datadog can [poll many of these services][8], and the integrations for them are the easiest of all to install-no Agent required.

## Visualize It

As soon as the data is captured, you'll see it immediately in the Datadog web application. Use the Metrics Explorer to search for a given metric and watch it ebb and flow. View and comment on events, such as an application deployment, as they pour into your [Event Stream][9]. Filter for a group of hosts in the [Infrastructure Map][10]. Get an overall picture of how a given service (say, MySQL) is running via its default dashboard.

Before long, you'll create custom [Screenboards][11] that combine all the graphs, numbers, events, and service states you care about the most. You can customize the graphs in whatever way helps you discover problems: skewing their metric values using other metrics, applying [anomaly][12], [outlier][13], or [forecasts][14] detection, overlaying events onto them, and more.

## Monitor It

Once your graphs have exposed the problem areas, set up alerting conditions on your metrics using [Monitors][15]. You receive [emails][16] when the alerts fire, or set up the [Slack][17] integration for a dedicated, in-app notifications.

When you're well aware of an ongoing problem, [silence its alerts][18]. When you're about to bring a service down for maintenance, [schedule a downtime][18] so you won't get spammed with alerts. When you can't define some alert-worthy condition in terms of a single host, event, metric, or service, then create a [composite monitor][19] instead.

<div class="col text-center">
{{< img src="icons/fr-flag-round-50.png" alt="French Docs" responsive="true" popup="false" href="https://docs.datadoghq.com/fr/" >}}
</div>

{{< partial name="support/support.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[3]: /integrations
[4]: /developers/dogstatsd
[5]: /tracing
[6]: /developers/libraries
[7]: /developers/metrics/custom_metrics
[8]: /integrations
[9]: /graphing/event_stream
[10]: /graphing/infrastructure
[11]: /graphing/dashboards/screenboard
[12]: /monitors/monitor_types/anomaly
[13]: /monitors/monitor_types/outlier
[14]: /monitors/monitor_types/forecasts
[15]: /monitors
[16]: /monitors/notifications
[17]: /integrations/slack
[18]: /monitors/downtimes
[19]: /monitors/monitor_types/composite
