---
title: SLO checklist
kind: guide
further_reading:
    - link: 'https://www.datadoghq.com/blog/slo-monitoring-tracking/'
      tag: 'Blog'
      text: 'Track the status and error budget of your SLOs with Datadog'
    - link: 'https://learn.datadoghq.com/course/view.php?id=34'
      tag: 'Learning Center'
      text: 'Introduction to Service Level Objectives (SLOs)'
---

<div class="alert alert-info">
Click <a href="https://www.datadoghq.com/pdf/SLOChecklist_200619.pdf">here</a> to find a PDF version of this page.
</div>

## Getting started

1. Navigate to the SLO page: [Monitors › Service Level Objectives][1]

2. Start thinking from the perspective of your user:

    * How are your users interacting with your application?
    * What is their journey through the application?
    * Which parts of your infrastructure do these journeys interact with?
    * What are they expecting from your systems and what are they hoping to accomplish?

## Select the relevant SLI(s)

### STEP 1

#### Response/Request

|              |                                                                |
| ------------ | -------------------------------------------------------------- |
| Availability | Could the server respond to the request successfully?          |
| Latency      | How long did it take for the server to respond to the request? |
| Throughput   | How many requests can be handled?                              |

#### Storage

|              |                                              |
| ------------ | -------------------------------------------- |
| Availability | Can the data be accessed on demand?          |
| Latency      | How long does it take to read or write data? |
| Durability   | Is the data still there when it is needed?   |

#### Pipeline

|             |                                                                    |
| ----------- | ------------------------------------------------------------------ |
| Correctness | Was the right data returned?                                       |
| Freshness   | How long does it take for new data or processed results to appear? |

### STEP 2

**Do you require a time-based or count-based SLI?**

**Time-based SLIs use Datadog monitors**:

_Example: the latency of all user requests should be less than 250 ms 99% of the time in any
30-day window._

1. Select a single monitor,
2. Select multiple monitors (up to 20), or
3. Select a single multi-alert monitor and pick specific monitor groups (up to 20) to include in
   the SLO calculation

If you need to create a new monitor go to the [Monitor create][2] page.

**Count-based SLIs use metrics in your Datadog account and do not require a monitor**:

_Example: 99% of requests should complete in less than 250 ms over a 30-day window._

## Implementing your SLIs

1. [Custom metrics][3] (e.g., counters)
2. [Integration metrics][4] (e.g., load balancer, http requests)
3. [Datadog APM][5] (e.g., errors, latency on services and resources)
4. [Datadog Logs][6] (e.g., metrics generated from logs for a count of particular occurence)

## Set your target objective and time window

1. Select your target: `99%`, `99.5%`, `99.9%`, `99.95%`, or whatever makes sense for your requirements.
2. Select your time window: over the last `7`, `30`, or `90 days`

## Name, describe, and tag your SLOs

1. Name your SLO.
2. Add a description: describe what the SLO is tracking and why it is important for your end user experience. You can also add links to dashboards for reference.
3. Add tags: tagging by `team` and `service` is a common practice.

## View and search

[Use tags to search for your SLOs from the SLO list view][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo
[2]: https://app.datadoghq.com/monitors#create/metric
[3]: /developers/metrics
[4]: /integrations
[5]: /tracing/generate_metrics/
[6]: /logs/logs_to_metrics/
[7]: /monitors/service_level_objectives/#searching-and-viewing-slos
