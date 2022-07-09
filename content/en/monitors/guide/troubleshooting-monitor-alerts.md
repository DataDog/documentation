---
title: Troubleshooting Monitor Alerts
kind: guide
---

## Overview

If you're not certain whether your monitor's alerting behavior(or lack thereof) is warranted, this guide provides an overview of some foundational concepts and common issues.

### Monitor State Vs Monitor Status

While monitor *evaluations* are stateless, meaning that the result of a given evaluation does not depend on the results of previous evaluations, monitors themselves are stateful, and their state is updated based on the evaluation results of their queries and configurations. A monitor result with a given status won't necessarily cause the monitor's state to change to the same status. For example, if data is absent from the monitor's evaluation window, if the  if the evaluation window, the evaluation may be `skipped`, in which case the monitor state is not updated. See [Monitor Arithmetic and Sparse Metrics][1] for more information and potential solutions.

You can use the monitor's [Status and History][2] section, or try graphing the monitor's query in [Notebooks][3] or [Dashboards][4] to determine if the monitor may be 

Some examples are:

- A result with Skipped status will never cause a state transition (so monitors cannot have a state of Skipped ). Hence, if there isn’t a state transition, the monitor retains the same state it was in before. Customers will see the status bar not change in this case. 

- State is also sometimes updated in the absence of a monitor result (e.g. with the autoresolve from Alert / Warn feature). 

Composite monitor results are based on the monitor state of its submonitors and not the evaluation results. 

### Monitor status and groups

For both results and state, status is tracked by group. 

For a multi-alert monitor, a group is a set of tags with one value for each grouping key (e.g. env:dev,host:myhost for a monitor grouped by env and host ). 

For a simple alert, the group is a star ( * , sometimes represented as "None"). 

By default, group state is maintained for 24 hours after the last time a group appears in a monitor result, at which point a group will drop out of the state, with the exception of hosts, which take ~48 hours to drop out. Our public documentation notes this. 

This limit is configurable in certain circumstances when no other workaround is available and should be treated as a Feature Request with the monitors team for engineering to review. All groups that are currently in a monitor's state should appear on the status page. 

Groups can age out much faster in the monitor admin UI if there are periods where these groups don’t have data to evaluate on for more than the specified evaluation timeframe. 

Note: Unknown status is only used for service checks (both for results and state).

### Monitor Notifications

Monitor state transitions are often accompanied by monitor notifications, which are Datadog events created within a customer's account that indicate that a monitor has changed state. Like any other events, these events can include @-mention handles that allow notification via external services such as Slack or Pagerduty. Not all state transitions result in the generation of a monitor notification. If a monitor group is silenced by a monitor downtime, the state transition occurs as usual but no notification event is created. All state transitions are logged in the MSM logs, and if no notification is sent it's possible to check the logs to determine why.

Monitor state transition history is stored and used to drive the state history visualization on the monitor status page. It can also be queried directly (e.g. for groups that are no longer in the monitor state and don't appear on the status page) using dogq monitors monitor_history view_history.

#### Troubleshooting missing emails

- Check user's email preferences
- Check event stream for notification failed events

#### Opsgenie multi-notification

When a user is using multiple @opsgenie-[...] notifications in their monitor, we will send those notifications with the same alias to opsgenie.
Because of a feature in their side (https://docs.opsgenie.com/docs/alert-deduplication), opsgenie will discard what they think is a duplication.





https://docs.datadoghq.com/monitors/create/configuration/?tabs=thresholdalert#no-data


[1]: /monitors/guide/monitor-arithmetic-and-sparse-metrics/
[2]: /monitors/manage/status/#status-and-history
[3]: /notebooks/
[4]: /dashboards/
