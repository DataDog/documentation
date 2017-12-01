---
title: Datadog Docs
kind: documentation
customnav: main_references
aliases:
  - /basic_agent_usage/
  - /guides/
disable_toc: true
---
# Welcome to Datadog Docs!

If you're new here, read below for the 10,000 foot view of Datadog.

{{< partial name="tile-nav/tile-nav.html" >}}

Your application stack is teeming with unused metadata that's trying to tell a story: things aren't humming along as well as they should be.  
Exception thrown; Database queries slowing; Cache misses rising; Upstream service flapping; Error log growing. Each of these chatters a part of the story, but they're hard to make sense of—or act on meaningfully—when taken separately from the others.  

Datadog lets you collect all these metrics, events, and service states in one place. Then, you can visualize and correlate the data with beautiful graphing and set flexible alerting conditions on it—all without running any storage or monitoring infrastructure yourself.

## Collect Everything

Collect a wealth of already-available data without writing any code. [Install the Datadog Agent](/agent) everywhere—every server, instance, VM, node, [container-running host](https://github.com/DataDog/docker-dd-agent)—and then enable and configure any of our 200+ out-of-the-box [integrations](/integrations) to start the metrics flowing to Datadog's backend.

Submit custom application metrics by writing a little code. Instrument your own gauges, counters, timers, and histograms with [DogStatsD](/developers/dogstatsd), or use [APM](/tracing) to trace the execution time of any code path to see how it impacts overall request-response times.  
The [client libraries](/developers/libraries) for these send your custom metrics and trace data to the Datadog Agent, which ships them off to Datadog.

Some of your stack may be SaaS, not servers. Datadog can [poll many of these services](/integrations), and the integrations for them are the easiest of all to install; no Agent required.

<Eventually, something about log data.>

<Something about writing your own integration? Or is that too much info on the front page?>

Across your whole stack—even the sturdiest parts—leave no data uncollected. It's better to have it and not need it than to need it and not have it.

## Visualize It

As soon as you're capturing all this data, see it immediately in the Datadog web application. Use the Metrics Explorer to search for a given metric and watch it ebb and flow. View and comment on events (say, an application deploy) as they pour into your [Event Stream](/graphing/event_stream/). Filter for some group of hosts in the [Infrastructure Map](/graphing/infrastructure). Get an overall picture of how some service (say, MySQL) is running via its default dashboard.

Before long, you'll create custom [Screenboards], where you'll combine all the graphs, numbers, events, and service states you care about the most. You can customize the graphs in whatever way helps you suss out problems—skewing their metric values using other metrics, applying [anomaly](/monitors/monitor_types/anomaly) and [outlier](/monitors/monitor_types/outlier) detection, overlaying events onto them, and more.

## Monitor It

Once your graphs have exposed problem areas, set some alerting conditions on your metrics using [Monitors](/monitors). You'll get emails when the alerts fire, but you can also have them sent to Slack, HipChat, and other channels like these.

When you're well aware of an ongoing problem, [silence its alerts]. When you're about to bring a service down for maintenance, [schedule a downtime](/monitors/downtimes/) so you won't get spammed with alerts. When you can't define some alert-worthy condition in terms of a single host, event, metric, or service, create a [composite monitor](/monitors/monitor_types/composite/).

{{< partial name="questions/questions.html" >}}
