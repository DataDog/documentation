---
title: How to monitor live processes
kind: Guide
---

## Overview

Live Processes is essentially a distributed `top` for every process in your infrastructure. As part of the Live Processes product, we also offer live process monitors, which allow users to automatically track the amount of running processes across their entire infrastructure. You can use LP Monitors to:

- Ensure that you have enough replicas of a non-containerized process to serve customers.
- Alerting when a specific process is running.

Filtering processes and selecting a meaningful evaluation window is often challenging. This document intends to walk through the recommended approaches for creating a live process monitor.

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