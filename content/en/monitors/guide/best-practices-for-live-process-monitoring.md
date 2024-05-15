---
title: Best Practices for Live Process Monitoring
kind: Guide
---

## Overview

With the Live Processes product, you can monitor the number of running processes across your entire infrastructure. Live process monitors are most useful for adding observability to non-containerized processes.

Use live process monitors to:

- Ensure that you have enough replicas of a process to serve customers.
- Alert when a specific process is running.

An improperly configured monitor is prone to false positives. This guide covers the recommended best practices for creating a reliable live process monitor. For a detailed overview of the monitor creation process, see [Live process monitor creation][3].

## Best practices

### Scoping the monitor

Datadog recommends scoping your monitor to no more than a few thousand processes. Because text search is fuzzy, tags are the most accurate way to adjust the scope of your monitor.

Example workflow:

1. Navigate to the [**Monitors > New Monitor > Live Process**][4] page.

2. Add tags to the monitor in the **by tags** field. 
    - For example, use `command:puma` to monitor processes associated with the `puma` command.

{{< img src="monitors/monitor_types/process/tag-scoped-process-monitor.png" alt="A live process monitor that has been scoped using a tag" style="width:100%;" >}}

3. Optionally, refine the monitor's scope by adding search text to the **by text** field. In the example below, only processes whose command line matches `cluster worker` are included.

{{< img src="monitors/monitor_types/process/text-scoped-process-monitor.png" alt="A live process monitor that has been scoped using text search" style="width:100%;" >}}

4. If your monitor's scope still exceeds a few thousand processes total across all monitor groups, use additional tags to break it into multiple monitors. 
    - For example, you can use the `env` tag to create separate monitors for `prod` and `staging`.

### Choosing a time frame

A common misconception is that increasing the evaluation window leads to slower responses or missed alerts, but a monitor continuously assesses data no matter what query evaluation interval you choose. The evaluation interval only determines how many datapoints are used to decide whether an anomaly exists.

By increasing the evaluation window, you can ensure that you are only alerted if a behavior is happening consistently, not temporarily.

- To avoid false positives, use a minimum interval of **5 minutes**.
- If your monitor uses tags that come from a cloud provider integration, use a minimum interval of **15 minutes**.
- To avoid delayed alerts, use a maximum interval of **1 hour**.

For additional guidelines, see [Best Practices to Prevent Alert Fatigue][2].

[1]: https://app.datadoghq.com/process
[2]: https://www.datadoghq.com/blog/best-practices-to-prevent-alert-fatigue/#increase-your-evaluation-window
[3]: https://docs.datadoghq.com/monitors/types/process/#monitor-creation
[4]: https://app.datadoghq.com/monitors/create/live_process