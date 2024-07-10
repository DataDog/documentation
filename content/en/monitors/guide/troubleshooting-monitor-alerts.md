---
title: Troubleshooting Monitor Alerts
further_reading:
- link: "https://docs.datadoghq.com/monitors/guide/alert-on-no-change-in-value/"
  tag: "Guide"
  text: Alert on no change in value
- link: "https://docs.datadoghq.com/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/"
  tag: "Guide"
  text: Set up an alert for when a specific tag stops reporting
- link: "https://docs.datadoghq.com/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/"
  tag: "Guide"
  text: Prevent alerts from monitors that were in downtime
- link: "https://www.datadoghq.com/blog/datadog-recommended-monitors/"
  tag: "Blog"
  text: Enable preconfigured alerts with recommended monitors
- link: "https://www.datadoghq.com/blog/datadog-recommended-monitors/"
  tag: "Blog"
  text: Monitor alerts and events with OpsGenie and Datadog
- link: "https://www.datadoghq.com/blog/set-and-monitor-slas/"
  tag: "Blog"
  text: Monitoring services and setting SLAs with Datadog
---

## Overview

This guide provides an overview of some foundational concepts that can help you determine if your monitor's alerting behavior is valid. If you suspect that your monitor's evaluations are not accurately reflecting the underlying data, refer to the sections below as you inspect your monitor.

### Monitor state and monitor status

While monitor *evaluations* are stateless, meaning that the result of a given evaluation does not depend on the results of previous evaluations, monitors themselves are stateful, and their state is updated based on the evaluation results of their queries and configurations. A monitor evaluation with a given status won't necessarily cause the monitor's state to change to the same status. See below for some potential causes:

#### Metrics are too sparse within a metric monitor's evaluation window

If metrics are absent from a monitor's evaluation window, and the monitor is not configured to anticipate [no-data conditions][1], the evaluation may be `skipped`. In such a case, the monitor state is not updated, so a monitor previously in the `OK` state remains `OK`, and likewise with a monitor in the `Alert` state. Use the [history][2] graph on the monitor status page and select the group and time frame of interest. If data is sparsely populated, see [monitor arithmetic and sparse metrics][3] for more information.

#### Monitor state updates due to external conditions

The state of a monitor may also sometimes update in the absence of a monitor evaluation, for example, due to [auto-resolve][4].

### Verify the presence of data

If your monitor's state or status is not what you expect, confirm the behavior of the underlying data source. For a metric monitor, you can use the [history][2] graph to view the data points being pulled in by the metric query. For further investigation into your metrics evolution, click **Open in a notebook** by the status graph. This generates an investigation [notebook][20] with a formatted graph of the monitor query.

{{< img src="monitors/monitor_status/notebook-button2.png" alt="The monitor status page with the mouse cursor hovering over the Open in a notebook button next to one monitor group status bar" style="width:60%;">}}

### Alert conditions

Unexpected monitor behavior can sometimes be the result of misconfigured [alert conditions][5], which vary by [monitor type][6]. If your monitor query uses the `as_count()` function, check the [`as_count()` in Monitor Evaluations][7] guide.

If using recovery thresholds, check the conditions listed in the [recovery thresholds guide][8] to see if the behavior is expected.

### Monitor status and groups

For both monitor evaluations and state, status is tracked by group.

For a multi alert monitor, a group is a set of tags with one value for each grouping key (for example, `env:dev, host:myhost` for a monitor grouped by `env` and `host`). For a simple alert, there is only one group (`*`), representing everything within the monitor's scope.

By default, Datadog keeps monitor groups available in the UI for 24 hours, or 48 hours for host monitors, unless the query is changed. See [Monitor settings changes not taking effect][9] for more information.

If you anticipate creating new monitor groups within the scope of your multi alert monitors, you may want to configure a delay for the evaluation of these new groups. This can help you avoid alerts from the expected behavior of new groups, such as high resource usage associated with the creation of a new container. Read [new group delay][10] for more information.

If your monitor queries for crawler-based cloud metrics, use an [evaluation delay][11] to ensure that the metrics have arrived before the monitor evaluates. Read [cloud metric delay][12] for more information about cloud integration crawler schedules.

### Notification issues

If your monitor is behaving as expected, but producing unwanted notifications, there are multiple options to reduce or suppress notifications:

- For monitors that rapidly change between states, read [reduce alert flapping][13] for ways to minimize alert fatigue.
- For alerts which are expected or are otherwise not useful for your organization, use [Downtimes][14] to suppress unwanted notifications.
- To control alert routing, use [template variables][15] and the separation of **warning** or **alert** states with [conditional variables][16].

#### Absent notifications

If you suspect that notifications are not being properly delivered, check the items below to ensure that notifications are able to be delivered:

- Check [email preferences][17] for the recipient and ensure that `Notification from monitor alerts` is checked.
- Check the [event stream][18] for events with the string `Error delivering notification`.

#### Opsgenie multi-notification

If you are using multiple `@opsgenie-[...]` notifications in your monitor, we send those notifications with the same alias to Opsgenie.
Due to an [Opsgenie feature][19], Opsgenie will discard what is seen as a duplication.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tabs=thresholdalert#no-data
[2]: /monitors/manage/status/#history
[3]: /monitors/guide/monitor-arithmetic-and-sparse-metrics/
[4]: /monitors/configuration/?tabs=thresholdalert#auto-resolve
[5]: /monitors/configuration/?tabs=thresholdalert#set-alert-conditions
[6]: /monitors/types
[7]: /monitors/guide/as-count-in-monitor-evaluations/
[8]: /monitors/guide/recovery-thresholds/#behavior
[9]: /monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[10]: /monitors/configuration/?tabs=thresholdalert#new-group-delay
[11]: /monitors/configuration/?tabs=thresholdalert#evaluation-delay
[12]: /integrations/faq/cloud-metric-delay/
[13]: /monitors/guide/reduce-alert-flapping/
[14]: /monitors/guide/suppress-alert-with-downtimes/
[15]: /monitors/notify/variables/?tab=is_alert&tabs=is_alert#template-variables
[16]: /monitors/notify/variables/?tab=is_alert&tabs=is_alert#conditional-variables
[17]: /account_management/#preferences
[18]: /events/stream
[19]: https://docs.opsgenie.com/docs/alert-deduplication
[20]: /notebooks
