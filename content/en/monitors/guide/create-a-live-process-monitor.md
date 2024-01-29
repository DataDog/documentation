---
title: Create a live process monitor
kind: Guide
---

## Overview

With the Live Processes product, you can monitor the number of running processes across your entire infrastructure. Live process monitors are most useful for adding observability to non-containerized processes.

Use live process monitors to:

- Ensure that you have enough replicas of a process to serve customers.
- Alert when a specific process is running.

An improperly configured monitor is prone to false positives. This guide covers the recommended best practices for creating a reliable live process monitor.

## Create a monitor

### 1. Launch the monitor creation flow

On the [**Infrastructure > Processes**][1] page, expand the **New Metric** dropdown and click **Create monitor**.

<!-- create-process-monitor.png -->

**Note**: Live process monitors can also be created from the **Monitors > New monitor** page, but the steps occur in a different order than shown below.

### 2. Scope the monitor

<div class="alert alert-warning">To avoid false positives, the scope of your monitor should not exceed a few thousand processes. Because text search is fuzzy, tags are the most accurate way to adjust the scope of your monitor.</div>

1. Add tags to the monitor in the **by tags** field. For example, use `command:puma` to monitor processes associated with the `puma` command.

<!-- tag-scoped-process-monitor -->

2. Optionally, refine the monitor's scope by adding search text to the **by text** field. In the example below, only processes matching `cluster worker` are included.

<!-- text-scoped-process-monitor -->

3. If your monitor's scope still exceeds a few thousand processes total across all process groups, use additional tags to break it into multiple monitors. 
  - For example, you can use the `env` tag to create separate monitors for `prod` and `staging`.

### 3. [Single alert, multi alert]

### 4. Choose a timeframe



- To avoid false positives, use a minimum interval of **5 minutes**.
- If your monitor uses tags that come from a cloud provider crawler, use a minimum interval of **15 minutes**.
- To avoid delayed alerts, use a maximum interval of **1 hour**.

<div class="alert alert-warning">
The monitor updates its query result every 1 minute, no matter what query evaluation interval you choose for the monitor. The query evaluation interval only determines how far back the monitor looks, so a longer query interval is less prone to false positives.
</div>








## Best practices

### Choosing a timeframe

#### How live process timeframes work

<!-- image of cumulative/expanding window here -->

- Evaluations happen every minute on a rolling basis.
- We recommend a 5-minute to 1-hour window
  - After 1 hour, it takes a long time for the monitor to trigger once the monitor condition is met
  - Less than 5 minutes, you are open to flaky monitors
- Tags that come from cloud provider crawlers should always have at least a 15-minute timeframe. [Link to metrics docs](https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert#evaluation-delay)
- A good guide for this can be found in [Best Practices to Prevent Alert Fatigue | Datadog](https://www.datadoghq.com/blog/best-practices-to-prevent-alert-fatigue/#increase-your-evaluation-window).
  - "One common misconception is that increasing the evaluation window might lead to slower responses or missed alerts, but that isn't the case. The alert continuously assesses the underlying data, so lengthening the evaluation window will ensure that the system considers more data points before deciding if an anomaly exists. In other words, you can increase the evaluation window so that you are only alerted if a behavior is happening consistently—not temporarily." "Setting a short evaluation window for alerts might seem like a proactive approach to catch anomalies quickly. However, this can increase the occurrence of false positives."

### Scoping live processes

#### Keeping a manageable scope
- We recommend limiting each monitor to a few thousand processes across all monitor groups
- If needed, consider creating multiple monitors to reduce the scope of the query. For example, have a monitor filtering processes by env:staging and another env:prod.

**Example:**
Instead of

```
processes('').over('command:puma').by('env').rollup('count').last('5m') < 1
```

Create a separate monitor for each env like so:

```
processes('').over('command:puma,env:prod').by().rollup('count').last('5m') < 1
```

This avoids querying thousands of processes per monitor.
Example: https://app.datadoghq.com/monitors/138254002?view=spans 

#### Filtering with tags and full text search
- We recommend that customers scope down their monitors as much as possible using tags first, and only then filtering by full text search.
- This helps to remove the likelihood of accidentally matching other processes due to the fuzzy search.

**Example:**
Filtering `puma` processes down to the worker:

```
processes('worker').over('command:puma').by().rollup('count').last('5m') < 1
```

This is preferred over:
```
processes("puma worker").by().rollup('count').last('5m') < 1
```

Example monitor: https://app.datadoghq.com/monitors/138256501?view=spans (in demo org)

[1]: https://app.datadoghq.com/process