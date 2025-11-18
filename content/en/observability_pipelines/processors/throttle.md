---
title: Throttle
disable_toc: false
---
{{< jqmath-vanilla >}}

## Overview

Use this processor to set a limit on the number of logs sent within a specific time window. For example, you can set a limit so that only 100 logs are sent per second. Setting a rate limit can help you catch any spikes in log ingestion and prevent unexpected billing costs.

## Setup

To set up the processor:

1. Define a [filter query](#filter-query-syntax).
    - Only logs that match the specified filter query are processed.
    - All matched logs get throttled. Logs that are sent within the throttle limit and logs that do not match the filter are sent to the next step. Logs sent after the throttle limit has been reached, are dropped.
1. Set the throttling rate. This is the number of events allowed for a given bucket during the set time window.
    - **Note**: This rate limit is applied on a **per-worker level**. If you scale the number of workers up or down, you may want to adjust the processor rate limit accordingly. You can update the rate limit programmatically using the [Observability Pipelines API][1].
1. Set the time window.
1. Optionally, click **Add Field** if you want to group by a field.

{{% observability_pipelines/processors/filter_syntax %}}

## How the throttle processor works

The throttle processor sets a rate limit on the number of logs sent within a specified time window. While similar to the quota processor, the main difference between the throttle and quota is that the quota processor's time window is fixed at 24 hours and cannot be changed, while the throttle processor's time window can be configured. Since the throttle processor's time window is configurable, the processor has a capacity replenishment rate based on the throttling rate and time window you set. See [Capacity replenishment rate](#capacity-replenishment-rate) for more information.

### Initial capacity

When the throttle processor is enabled, the number of logs the processor allows through immediately is based on the configured **Throttling Rate**. For example, if the **Throttling Rate** is set to `1000` events over 60 seconds:

- And 5,000 events arrive the moment the processor is enabled, the processor allows an initial capacity of 1,000 events to pass through while the rest (4,000 events) are dropped.
- This initial behavior is identical to a quota processor's.

### Capacity replenishment rate

The throttle processor follows a generic cell rate algorithm, which enables a steady rate of events to pass through. The replenishment rate is based on the settings of your throttle processor and allows a certain number of events to pass through per second. This rate can be calculated as follows:

$$\text"Throttle rate" / \text"Time window (in seconds)"$$

#### Example

If you use the following processor settings:
- Throttling rate = 1000 events
- Time window = 60 minutes (3600 seconds)

The capacity replenishment rate is:

$$\text"1000 events" / \text"60 minutes" ≈ \text"17 events"/ \text"minute" ≈ \text"0.28 events"/ \text"second"$$

If `T` is the time when the processor is enabled and the processor receives 5000 events at that time, the number of events that the processor allows through based on `T` is as follows:
- `T + 0` minutes (when the processor is enabled):
    - 1000 events processed.
    - 4000 events dropped.
- `T + 1` minute: ~17 events can be processed
- `T + 2` minutes: ~17 events can be processed
- ...the processor continues processing events at a steady rate of ~17 events per minute and dropping the rest until the next minute.

**Note**: The replenishment rate determines the maximum throughput after the initial capacity. You can adjust the throttling rate for a higher or lower throughput if needed.

[1]: /api/latest/observability-pipelines/#update-a-pipeline