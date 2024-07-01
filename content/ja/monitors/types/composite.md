---
title: Composite Monitor
aliases:
    - /guides/composite_monitors
    - /monitors/monitor_types/composite
    - /monitors/create/types/composite/
description: "Alert on an expression combining multiple monitors"
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Check your monitor status
---


## Overview

Composite monitors combine individual monitors into one monitor to define more specific alert conditions.

Choose existing monitors to create a composite monitor, for example: monitor `A` and monitor `B`. Then set a trigger condition using Boolean operators, such as `A && B`. The composite monitor triggers when the individual monitors simultaneously have values that cause the composite monitor's trigger condition to be true.

{{< img src="monitors/monitor_types/composite/overview.jpg" alt="composite example" style="width:80%;">}}

For configuration purposes, a composite monitor is independent of its constituent monitors. The notification policy of a composite monitor can be modified without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor does not delete the constituent monitors. A composite monitor does not own other monitors—it only uses their results. Also, many composite monitors may reference the same individual monitor.

**Notes**

- The terms `individual monitors`, `constituent monitors`, and `non-composite monitors` all refer to monitors used by a composite monitor to calculate its status.
- Composite results require common groupings. If you choose monitors that do not have common groupings, the selected monitors in the expression may not lead to a composite result.
- Composite monitors cannot be based on other composite monitors.

## Monitor creation

To create a [composite monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Composite*.

### Select monitors and set triggering conditions

#### Select monitors

Choose up to **10** individual monitors to use in a composite monitor. Monitors can be of different alert types (simple alerts, multi alerts, or a combination of the two). No individual monitor may itself be a composite monitor. After you choose your first monitor, the UI shows its alert type and current status.

If you choose a multi alert monitor, the UI shows the monitor's group-by clause and how many unique sources are currently reporting, for example: `Returns 5 host groups`. When you combine multi alert monitors, this information helps you choose monitors that pair together naturally.

{{< img src="monitors/monitor_types/composite/composite_example.jpg" alt="composite example"style="width:80%;">}}

You should choose monitors that have the same groups. Otherwise, the UI warns you that such a composite monitor may never trigger:

{{< img src="monitors/monitor_types/composite/composite_common_group.jpg" alt="composite common groups" style="width:80%;">}}


Even if you choose multi alert monitors with the same groups, you might still see a `Group Matching Error` if the monitors have no common reporting sources (also called common groupings). If there are no common reporting sources, Datadog cannot compute a status for the composite monitor, and it never triggers. However, you _can_ ignore the warning and create the monitor anyway. For more details, see [How composite monitors select common reporting sources](#select-monitors-and-set-triggering-conditions).

When you select a second monitor that doesn't cause a warning, the UI populates the **Trigger when** field with the default trigger condition `a && b` and shows the status of the proposed composite monitor.

#### Set triggering conditions

In the **Trigger when** field, write your desired trigger condition using Boolean operators, referring to individual monitors by their labels in the form `a`, `b`, `c`, etc. Use parentheses to control operator precedence and create more complex conditions.

The following are all valid trigger conditions:

```text
!(a && b)
a || b && !c
(a || b) && (c || d)
```

#### Advanced alert conditions

##### No data

`Do not notify` or `Notify` when the composite monitor is in a no-data state. Whatever you choose here doesn't affect the individual monitors' `Notify no data` settings, but in order for a composite to alert on No Data, both the individual monitors and the composite monitor must be set to `Notify` when data is missing.

##### Other options

For detailed instructions on the advanced alert options (auto resolve, etc.), see the [Monitor configuration][2] page.

### Notifications

For instructions on using template variables from a composite monitor's constituent monitors in your notifications, see [composite monitor variables][4]. For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][3] page.

### API

When using the API, a composite monitor's query is defined in terms of its sub-monitors using monitor IDs.

For example, two non-composite monitors have the following queries and IDs:

```text
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # Monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # Monitor ID: 5678
```

A composite monitor's query combining the monitors above could be `"1234 && 5678"`, `"!1234 || 5678"`, etc.

## How composite monitors work

This section uses examples to show how trigger conditions are computed, and the number of alerts you may receive in different scenarios.

### Computing trigger conditions

There are 4 different statuses a composite monitor can have and 3 of them are considered alert-worthy:

| Status    | Alert-worthy         |Severity           |
|-----------|----------------------|-------------------|
| `Alert`   | True                 |4 (Most severe)    |
| `Warn`    | True                 |3                  |
| `No Data` | True                 |2                  |
| `Ok`      | False                |1 (Least severe)   |

The Boolean operators used (`&&`, `||`, `!`) operate on the alert-worthiness of the composite monitor status.

* If `A && B` is alert-worthy, the result is the **least** severe status between A and B.
* If `A || B` is alert-worthy, the result is the **most** severe status between A and B.
* If `A` is `No Data`, `!A` is `No Data`
* If `A` is alert-worthy, `!A` is `OK`
* If `A` is not alert-worthy, `!A` is `Alert`

Consider a composite monitor that uses two individual monitors: `A` and `B`. The following table shows the resulting status of the composite monitor given the trigger condition (`&&` or `||`), and the different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| Monitor A   | Monitor B   | Condition   | Notify No Data   | Composite status | Alert triggered? |
|-------------|-------------|-------------|------------------|------------------|------------------|
| Alert (T)   | Warn (T)    | `A && B`    |                  | Warn (T)         | {{< X >}}        |
| Alert (T)   | Warn (T)    | `A \|\| B`  |                  | Alert (T)        | {{< X >}}        |
| Alert (T)   | Ok (F)      | `A && B`    |                  | OK (F)           |                  |
| Alert (T)   | Ok (F)      | `A \|\| B`  |                  | Alert (T)        | {{< X >}}        |
| Warn (T)    | Ok (F)      | `A && B`    |                  | OK (F)           |                  |
| Warn (T)    | Ok (F)      | `A \|\| B`  |                  | Warn (T)         | {{< X >}}        |
| No Data (T) | Warn (T)    | `A && B`    | True             | No Data (T)      | {{< X >}}        |
| No Data (T) | Warn (T)    | `A \|\| B`  | True             | Warn (T)         | {{< X >}}        |
| No Data (T) | Warn (T)    | `A && B`    | False            | Last known       |                  |
| No Data (T) | Warn (T)    | `A \|\| B`  | False            | Warn (T)         | {{< X >}}        |
| No Data (T) | OK (F)      | `A && B`    | False            | OK (F)           |                  |
| No Data (T) | OK (F)      | `A \|\| B`  | False            | Last known       |                  |
| No Data (T) | OK (F)      | `A && B`    | True             | OK (F)           |                  |
| No Data (T) | OK (F)      | `A \|\| B`  | True             | No Data (T)      | {{< X >}}        |
| No Data (T) | No Data (T) | `A && B`    | True             | No Data (T)      | {{< X >}}        |
| No Data (T) | No Data (T) | `A \|\| B`  | True             | No Data (T)      | {{< X >}}        |

**Note**: When the composite has `notify_no_data` to false, and the result of the evaluation of the sub-monitors should end up on a `No Data` status for the composite, the composite uses the last known state instead.

### Composites and Downtimes

A composite monitor and its individual monitors are independent of each other.

#### Downtime on a composite monitor

Consider a composite monitor `C` that consists of two individual monitors with the condition `A || B`. Creating a downtime on the composite monitor will suppress notifications from `C` only.

If monitor `A` or monitor `B` notify services or teams in their respective monitor configurations, the downtime on the composite `C` does not mute any notifications caused by `A` or `B`. To mute notifications from `A` or `B`, set downtime on those monitors.

#### Downtime on an individual monitor used in a composite monitor

Creating a downtime on an individual monitor `A`, which is used within a composite monitor, does not mute the composite monitor.

For example, a downtime mutes monitor `A`, specifically its group `env:staging`. Once the group `env:staging` reaches an alert-worthy state, the notification coming from the individual monitor is suppressed while the composite monitor sends an alert notification.

### Number of alerts

The number of alerts you receive depends on the individual monitor's alert type.
If all individual monitors are simple alerts, the composite monitor also has a simple alert type. The composite monitor triggers a single notification when the queries for `A` and `B` are all `true` at the same time.

If even one individual monitor is multi alert, then the composite monitor is also multi alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi alert monitors.


### Common reporting sources

Composite monitors that use many multi alert monitors only consider the individual monitors' *common reporting sources*.

**Multi alert Example**

Consider a scenario where monitor `A` and `B` are multi alert and grouped by host.

* Hosts from `host:web01` through `host:web05` are reporting for Monitor `A`.
* Hosts from `host:web04` through `host:web09` are reporting for monitor `B`.

The composite monitor _only_ considers the common sources (`web04` and `web05`). Up to two alerts can be received in an evaluation cycle.

**Common group value with different group names**

Composite monitors only look at tag *values* (`web04`), not tag *keys* (`host`).
If the example above included a multi alert monitor `C` grouped by `service` with a single reporting source, `service:web04`, then the composite monitor would consider `web04` to be the single common reporting source between `A`, `B`, and `C`.

**Monitor group by two or more dimensions**

In the case of a multi alert monitor split by two or more tags, a monitor group corresponds to the whole combination of tags.
For example, if monitor `1` is a multi alert per `device,host`, and monitor `2` is a multi alert per `host`, a composite monitor can combine monitor `1` and monitor `2`.

{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="writing notification" style="width:80%;">}}

However, consider monitor `3`, a multi alert per `host,url`. Monitor `1` and monitor `3` may not create a composite result because the groupings are too different:
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="writing notification" style="width:80%;">}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/composite
[2]: /monitors/configuration/#advanced-alert-conditions
[3]: /monitors/notify/
[4]: /monitors/notify/variables/?tab=is_alert#composite-monitor-variables
