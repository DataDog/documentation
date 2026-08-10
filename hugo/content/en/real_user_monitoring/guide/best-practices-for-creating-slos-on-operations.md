---
title: Best Practices for Creating SLOs for RUM Operations
description: Learn how to create availability and latency SLOs from RUM operation metrics.
further_reading:
- link: '/real_user_monitoring/guide/best-practices-for-operations-setup/'
  tag: 'Guide'
  text: 'Best practices for setting up RUM operations'
- link: '/real_user_monitoring/operations_monitoring/?tab=browser'
  tag: 'Documentation'
  text: 'Learn about Operations Monitoring'
- link: '/service_level_objectives/metric/'
  tag: 'Documentation'
  text: 'Create metric-based SLOs'
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
---

## Overview

[RUM operations][1] measure the availability and latency of technical steps in a [user journey][2]. For example, an operation can track whether a checkout request succeeds and how long the request takes to complete.

Use two operation metrics to create [metric-based SLOs][3]:

- Use `rum.measure.operation` to create an **availability SLO** based on the operation's success rate.
- Use `rum.measure.operation.duration` to create a **latency SLO** based on the operation's time to completion.

Both metrics include `operation.name`, `operation.status`, `operation.failure_reason`, and `application.id` tags, which you use to define the SLO queries.

Create separate availability and latency SLOs to measure these distinct aspects of operation health.

## Prerequisites

- [RUM without Limits][4] is enabled for your organization.
- You have [configured at least one RUM operation][5].

## Understand operation outcomes

How you handle each operation outcome depends on what the SLO measures:

| Outcome                | Availability SLO | Latency SLO                                      |
|------------------------|------------------|--------------------------------------------------|
| Success                | Good event       | Good at or below the threshold; bad above it     |
| Error or other failure | Bad event        | Excluded                                         |
| Abandonment            | Excluded         | Bad above the threshold; otherwise excluded      |
| Timeout                | Bad event        | Excluded                                         |

**Availability SLOs exclude abandonments** because a user who leaves before an operation finishes has not necessarily experienced a technical failure. **Latency SLOs include abandonments** only when their duration exceeds the threshold. This treatment also prevents an abandonment from counting against both SLOs.

**Availability SLOs include timeouts** as failed events to maintain parity with other operation failures and avoid hiding potential problems in paths that do not record an operation end. **Latency SLOs exclude timeouts** because RUM records the operation start but not its end, so the duration does not reliably measure application performance.

## Navigate to SLO creation

You can open the SLO creation workflow from RUM or from the SLO page.

### Navigate from RUM

Starting from the operation report is more convenient because Datadog uses the selected operation to initialize the SLO query. Starting from the SLO page requires you to build the operation query from scratch.

1. Go to **RUM > Performance Monitoring > Operations**.
2. Select an operation from the catalog.
3. In the {{< ui >}}SLOs{{< /ui >}} section at the top of the operation report, click {{< ui >}}Create{{< /ui >}}.
4. Select the type of SLO to create.

### Navigate from the SLO page

1. In the left navigation, select **Monitoring > SLOs**.
2. Click {{< ui >}}+ New SLO{{< /ui >}}, then select {{< ui >}}By Count{{< /ui >}}.

After you open the SLO creation workflow, [configure the SLO query](#configure-the-slo-query) for an availability or latency SLO.

## Configure the SLO query

Choose the query that corresponds to the type of SLO you want to create. Replace `<OPERATION_NAME>` with the operation name and `<APPLICATION_ID>` with the RUM application ID.

### Availability SLO

An availability SLO measures whether the operation completes successfully:

- **Good events** include successful operations.
- **Bad events** include failed operations other than abandonments.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-availability-slo-example.png" alt="Create SLO page showing a count-based availability SLO with good and bad event queries and preview graphs" style="width:100%;" >}}

Use this raw query for good events:

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Use this raw query for bad events:

{{< code-block lang="text" >}}
sum:rum.measure.operation{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND NOT operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

The SLO calculates availability as `successful operations / (successful operations + non-abandoned failures)`.

### Latency SLO

A latency SLO measures whether the operation completes within an acceptable duration. Choose a threshold based on the expected user experience and the operation's observed duration. For example, if users expect a checkout submission to complete within three seconds, use a three-second threshold.

{{< img src="real_user_monitoring/guide/operations-monitoring/operations-monitoring-latency-slo-example.png" alt="Create SLO page showing a count-based latency SLO with good and bad event queries and preview graphs" style="width:100%;" >}}

The `rum.measure.operation.duration` metric uses nanoseconds. Multiply seconds by `1,000,000,000` to convert the threshold to nanoseconds. For example, three seconds equals `3,000,000,000` nanoseconds.

Replace `<LATENCY_THRESHOLD_NS>` with the threshold in nanoseconds, then configure the following events:

- **Good events** include successful operations at or below the threshold.
- **Bad events** include successful and abandoned operations above the threshold.

Use this raw query for good events:

{{< code-block lang="text" >}}
count(v: v<=<LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

Define bad events as the sum of these two raw queries:

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:success}.as_count()
{{< /code-block >}}

{{< code-block lang="text" >}}
count(v: v><LATENCY_THRESHOLD_NS>):rum.measure.operation.duration{operation.name:<OPERATION_NAME> AND application.id:<APPLICATION_ID> AND operation.status:failure AND operation.failure_reason:abandoned}.as_count()
{{< /code-block >}}

The SLO calculates latency as `fast successful operations / (all successful operations + slow abandoned operations)`.

### Complete the SLO

After you configure the availability or latency query:

1. Start with a target of 99% over a 30-day rolling window for a critical user journey. Adjust the target based on the journey's reliability requirements and historical performance.
2. Apply the same scope, filters, and groups to every query.
3. Add a descriptive name and optional tags.
4. Save the SLO.

## Validate the SLOs

Validate the SLOs after you create them:

1. Confirm that the good and bad event queries do not overlap.
2. Verify that all queries use the same operation scope, filters, and groups.
3. Compare SLO event counts with the operation volume on the {{< ui >}}Operations{{< /ui >}} page.
4. Review [timed-out operations][6] (see the note under **Parallelization**). A high timeout rate can indicate that some application paths start an operation without recording its end.
5. Confirm that the latency threshold uses nanoseconds and represents an acceptable completion time for the operation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/?tab=browser
[2]: /journey_monitoring/
[3]: /service_level_objectives/metric/
[4]: /real_user_monitoring/rum_without_limits/
[5]: /real_user_monitoring/guide/best-practices-for-operations-setup/
[6]: /real_user_monitoring/operations_monitoring/?tab=browser#parallelization
