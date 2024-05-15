---
title: SLO Checklist
kind: guide
aliases:
- /monitors/guide/slo-checklist/
further_reading:
- link: 'https://www.datadoghq.com/blog/slo-monitoring-tracking/'
  tag: 'Blog'
  text: 'Track the status and error budget of your SLOs with Datadog'
- link: 'https://learn.datadoghq.com/courses/intro-to-slo'
  tag: 'Learning Center'
  text: 'Introduction to Service Level Objectives'
- link: "/service_management/service_level_objectives/guide/slo_types_comparison/"
  tag: "Documentation"
  text: "Comparison of Datadog SLO Types"
---


## Getting started

1. Navigate to the [SLO Manage page][1].

2. Start thinking from the perspective of your user:

    * How are your users interacting with your application?
    * What is their journey through the application?
    * Which parts of your infrastructure do these journeys interact with?
    * What are they expecting from your systems and what are they hoping to accomplish?

## Select the relevant SLI

### STEP 1

#### Response/Request

|  Type of SLI |  Description                                                   |
| ------------ | -------------------------------------------------------------- |
| Availability | Could the server respond to the request successfully?          |
| Latency      | How long did it take for the server to respond to the request? |
| Throughput   | How many requests can be handled?                              |

#### Storage

|  Type of SLI |  Description                                 |
| ------------ | -------------------------------------------- |
| Availability | Can the data be accessed on demand?          |
| Latency      | How long does it take to read or write data? |
| Durability   | Is the data still there when it is needed?   |

#### Pipeline

| Type of SLI |   Description                                                      |
| ----------- | ------------------------------------------------------------------ |
| Correctness | Was the right data returned?                                       |
| Freshness   | How long does it take for new data or processed results to appear? |

### STEP 2

**Do you require an SLI calculation that is time-based or count-based?**

The following SLO types are available in Datadog: 

**Metric-based SLOs**

_Example: 99% of requests should complete in less than 250 ms over a 30-day window._

- Count-based SLI calculation
- SLI is calculated as the sum of good events divided by the sum of total events

**Monitor-based SLOs**

_Example: the latency of all user requests should be less than 250 ms 99% of the time in any
30-day window._

- Time-based SLI calculation
- SLI calculated based on the underlying Monitor’s uptime
- You can select a single monitor, multiple monitors (up to 20), or a single multi alert monitor with groups

If you need to create a new monitor go to the [Monitor create][2] page.

**Time Slice SLOs**

_Example: the latency of all user requests should be less than 250 ms 99% of the time in any
30-day window._

- Time-based SLI calculation
- SLI calculated based on your custom uptime definition using a metric query

## Implement your SLIs

1. [Custom metrics][3] (for example, counters)
2. [Integration metrics][4] (for example, load balancer, http requests)
3. [Datadog APM][5] (for example, errors, latency on services and resources)
4. [Datadog Logs][6] (for example, metrics generated from logs for a count of particular occurrence)

## Set your target objective and time window

1. Select your target: `99%`, `99.5%`, `99.9%`, `99.95%`, or any other target value that makes sense for your requirements.
2. Select your time window: over the last rolling `7`, `30`, or `90 days`

## Name, describe, and tag your SLOs

1. Name your SLO.
2. Add a description: describe what the SLO is tracking and why it is important for your end user experience. You can also add links to dashboards for reference.
3. Add tags: tagging by `team` and `service` is a common practice.

## View and search

[Use tags to search for your SLOs from the SLO list view][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: https://app.datadoghq.com/monitors#create/metric
[3]: /metrics
[4]: /integrations
[5]: /tracing/trace_pipeline/generate_metrics/
[6]: /logs/logs_to_metrics/
[7]: /service_management/service_level_objectives/#searching-and-viewing-slos
