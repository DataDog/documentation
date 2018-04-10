
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

If you're new here, read below for the 10,000 foot view of Datadog.

{{< partial name="tile-nav/tile-nav.html" >}}

Your application stack is teeming with unused metadata that's trying to tell a story: things aren't humming along as well as they should be.

Exception thrown; Database queries slowing; Cache misses rising; Upstream service flapping; Error log growing. Each of these chatters a part of the story, but they're hard to make sense of—or act on meaningfully—when taken separately from the others.

Datadog lets you collect all these metrics, events, and service states in one place. Then, visualize and correlate the data with beautiful graphing and set flexible alerting conditions on it—all without running any storage or monitoring infrastructure yourself.

## Collect Everything

Collect a wealth of already-available data without writing any code. [Install the Datadog Agent][1] everywhere—every server, instance, VM, node, [container-running host][2]—and then enable and configure any of our 200+ out-of-the-box [integrations][3] to start the metrics flowing to Datadog's backend.

Submit custom application metrics by writing a little code. Instrument your own gauges, counters, timers, and histograms with [DogStatsD][4], or use [APM][5] to trace the execution time of any code path to see how it impacts overall request-response times.
The [client libraries][6] for these send your [custom metrics][7] and trace data to the Datadog Agent, which ships them off to Datadog.

Some of your stack may be SaaS, not servers. Datadog can [poll many of these services](/integrations), and the integrations for them are the easiest of all to install; no Agent required.

## Visualize It

As soon as you're capturing all this data, see it immediately in the Datadog web application. Use the Metrics Explorer to search for a given metric and watch it ebb and flow. View and comment on events (say, an application deploy) as they pour into your [Event Stream][8]. Filter for some group of hosts in the [Infrastructure Map][9]. Get an overall picture of how some service (say, MySQL) is running via its default dashboard.

Before long, you will create custom [Screenboards][10], where you will combine all the graphs, numbers, events, and service states you care about the most. You can customize the graphs in whatever way helps you suss out problems—skewing their metric values using other metrics, applying [anomaly][11], [outlier][12] or [forecasts][13] detection, overlaying events onto them, and more.

## Monitor It

Once your graphs have exposed problem areas, set some alerting conditions on your metrics using [Monitors][14]. You will [get emails][15] when the alerts fire, but set up the [Slack][16] or [HipChat][17]  integration to get a dedicated notifications.

When you're well aware of an ongoing problem, [silence its alerts][18]. When you're about to bring a service down for maintenance, [schedule a downtime][19] so you won't get spammed with alerts. When you can't define some alert-worthy condition in terms of a single host, event, metric, or service, create a [composite monitor][20].

{{< partial name="support/support.html" >}}

[1]: /agent
[2]: https://github.com/DataDog/datadog-agent/tree/master/Dockerfiles/agent
[3]: /integrations
[4]: /developers/dogstatsd
[5]: /tracing
[6]: /developers/libraries
[7]: /getting_started/custom_metrics/
[8]: /graphing/event_stream/
[9]: /graphing/infrastructure
[10]: /graphing/dashboards/screenboard
[11]: /monitors/monitor_types/anomaly
[12]: /monitors/monitor_types/outlier
[13]: /monitors/monitor_types/forecasts
[14]: /monitors
[15]: /monitors/notifications
[16]: /integrations/slack
[17]: /integrations/hipchat
[18]: /monitors/downtimes
[19]: /monitors/downtimes/
[20]: /monitors/monitor_types/composite/