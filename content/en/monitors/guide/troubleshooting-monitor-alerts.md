---
title: Troubleshooting Monitor Alerts
kind: guide
---

## Overview

If you're not certain whether your monitor's alerting behavior(or lack thereof) is warranted, this guide provides an overview of some foundational concepts and common issues.

### Monitor State and Monitor Status

While monitor *evaluations* are stateless, meaning that the result of a given evaluation does not depend on the results of previous evaluations, monitors themselves are stateful, and their state is updated based on the evaluation results of their queries and configurations. A monitor evaluation with a given status won't necessarily cause the monitor's state to change to the same status. For example, if data is absent from the monitor's evaluation window, the evaluation may be `skipped`, in which case the monitor state is not updated. See [Monitor Arithmetic and Sparse Metrics][1] for more information.

The state of a monitor may also sometimes updated in the absence of a monitor evaluation, for example, due to [auto-resolve][2]. 

### Monitor status and groups

For both monitor evaluations and state, status is tracked by group. 

For a multi-alert monitor, a group is a set of tags with one value for each grouping key (for example, `env:dev`,`host:myhost` for a monitor grouped by `env` and `host`). 

For a simple alert, there is only one group (`*`, representing everything within the monitor's scope). 

By default, Datadog keeps monitor groups available in the UI for 24 hours, or 48 hours for host monitors, unless the query is changed. See [Monitor settings changes not taking effect][3] for more information.

### Monitor Notifications

Monitor state transitions are often accompanied by monitor notifications, which are Datadog events that indicate a monitor has changed state. Like any other events, these events can include @-mention handles that allow notification via external services such as Slack or Pagerduty. Not all state transitions result in the generation of a monitor notification. If a monitor group is silenced by a monitor downtime, the state transition occurs without a notification event being created. 

Monitor state transition history is used to drive the [status and history][4] visualization on the monitor status page. 

#### Troubleshooting missing emails

- Check [email preferences][5] for the recipient and ensure that `Notification from monitor alerts` is checked 
- Check the [event stream][6] for events with the string `Error delivering notification`.

#### Opsgenie multi-notification

If you are using multiple @opsgenie-[...] notifications in your monitor, we send those notifications with the same alias to opsgenie.
Due to an [Opsgenie feature][7], Opsgenie will discard what is seen as a duplication.


[1]: /monitors/guide/monitor-arithmetic-and-sparse-metrics/
[2]: /monitors/create/configuration/?tabs=thresholdalert#auto-resolve
[3]: /monitors/guide/why-did-my-monitor-settings-change-not-take-effect
[4]: /monitors/manage/status/#status-and-history
[5]: /account_management/#preferences
[6]: /events/stream
[7]: https://docs.opsgenie.com/docs/alert-deduplication
