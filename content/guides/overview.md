---
title: Datadog Overview
kind: guide
listorder: 2
sidebar:
  nav:
    - header: All About Datadog
    - text: Integrations
      href: "#integrations"
    - text: Infrastructure
      href: "#infrastructure"
    - text: Events
      href: "#events"
    - text: Dashboards
      href: "#dashboards"
    - text: Monitoring
      href: "#monitoring"
---

So, you've just finished [installing](/guides/basic_agent_usage/) the Datadog
Agent, or maybe you're just curious about [what (else) Datadog can do for you](http://www.datadoghq.com/product/).
This document gives a high level overview of Datadog's capabilities and how
it can help you bring your infrastructure to heel.

## Integrations
{: #integrations}

![](/static/images/integrations.png){: style="width:100%; border:1px solid #777777"}

* About 100 integrations <a target="_blank" href="http://www.datadoghq.com/integrations/">officially listed</a>, always adding more.
* Custom integrations are available <a target="_blank" href="http://docs.datadoghq.com/api/">via our API</a>, many documented by our active user community.
* The Agent is <a target="_blank" href="https://github.com/DataDog/dd-agent/">open source</a> and you can instrument your own if you'd like.
* Once integrations have been configured, data living in a datacenter or
in an online service is treated the same throughout Datadog.

## Infrastructure
{: #infrastructure}

![](/static/images/infrastructure.png){: style="width:100%; border:1px solid #777777"}

* All machines show up in the infrastructure overview
* Here you can see the tags applied to each machine; as they're assigned to
perform certain roles, tagging allows you to indicate machines have
a certain purpose
* We do as much as possible to automatically categorize your servers
for you, to create structure in your infrastructure with as little
work as possible (unlike explicitly creating all your clusters).
Thus if a new machine is tagged, you can immediately see the stats
for that machine based on what was previously set up for that tag.
* For more on tagging, please see <a target="_blank" href="/faq/#tagging">here</a>.

## Host Map
{: #hostmap}

![](/static/images/hostmap-overview.png){: style="width:100%; border:1px solid #777777"}

The Host Map can be found under the Infrastructure menu and offers the ability to:

* Quickly visualize your entire environment regardless of whether it's 5, 500, or 50,000 hosts.
* Identify outliers
* Detect usage patterns
* Optimize resources

To learn more about the Host Map, visit the [Host Map Guide](/guides/hostmap).

## Events
{: #events}

![](/static/images/event_stream.png){: style="width:100%; border:1px solid #777777"}

The Event Stream is based on the same conventions as a blog:

* Every event in the stream can be commented on.
* Great for distributed <a target="_blank" href="/faq/#team">teams</a> and maintaining the focus of an investigation
* You can <a target="_blank" href="https://www.datadoghq.com/blog/filter-datadog-events-stream-pinpoint-events-infrastructure/">filter</a>
by: user, source, tag, host, status, priority, incident

![](/static/images/event_stream_post_incident_history.png){: style="width:100%; border:1px solid #777777"}


For each incident users can:

* Claim it
* Increase/decrease priority
* Comment
* See similar incidents
* <a target="_blank" href="/faq/#notify">@ notify team members</a>, who receive an email
* @support-datadog to ask for assistance

![](/static/images/event_stream_claim.png){: style="width:100%; border:1px solid #777777"}

## Dashboards
{: dashboards}

![](/static/images/dashboard_events.png){: style="width:100%; border:1px solid #777777"}

Dashboards contain <a target="_blank" href="/graphing/">graphs</a> with real-time performance metrics

* Synchronous mousing across all graphs in a dashboard.
* Vertical bars are events in the context of the metric.
* Click & drag on a graph to zoom-in on a particular time-frame.
* As you hover over the graph the event stream moves with you.
* Display by zone, host, or total usage.
* We expose the JSON editor of the graph allowing for <a target="_blank" href="http://docs.datadoghq.com/graphing/#functions">arithmetic</a> and
<a target="_blank" href="https://www.datadoghq.com/blog/rank-filter-performance-monitoring-metrics-top-function/">functions</a> to be applied to metrics.
* Share a graph snapshot that will appear in the stream; clicking on
that snapshot returns you to the original dashboard (via the camera in the upper right of a graph).
* Graphs can be embedded in an iframe, giving a 3rd party a live graph
without access to your data or any other information (via the pencil in the upper right of a graph).


## Monitoring
{: monitoring}

![](/static/images/alert.png){: tyle="width:100%; border:1px solid #777777"}

[Monitoring](/guides/monitoring/) gives you the ability to be notified if the aggregate of a specific
metric is above or below a certain threshold:

* Across your entire infrastructure
* Per machine (average, max, min, or sum)
* Applies to any metric you want, revenue: data center temperature, etc.
* Multi alerts (by device, host, etc.)
* Set alert notification message, including @ capabilities

![](/static/images/alert_setup.png){: style="width:100%; border:1px solid #777777"}


Does the data have to be pushed to Datadog?

Currently, yes:

1. All integrations we have get data flowing almost automatically after
launching the Agent (intial reporting may take a few minutes, but not longer than 10).
2. If you have custom metrics, you can indicate specifically where
to pull the data from.
