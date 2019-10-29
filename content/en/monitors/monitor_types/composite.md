---
title: Composite Monitor
kind: documentation
aliases:
    - /guides/composite_monitors
description: "Alert on an expression combining multiple monitors"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Check your monitor status"
---

## Overview

Composite monitors combine individual monitors into one monitor to define more specific alert conditions.

Choose existing monitors to create a composite monitor, for example monitor `A` and monitor `B`. Then set a trigger condition using boolean operators such as `A && B`. The composite monitor triggers when the individual monitors simultaneously have values that cause the composite monitor's trigger condition to be true.

For configuration purposes, a composite monitor is independent of its constituent monitors. The notification policy of a composite monitor can be modified without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor does not delete the constituent monitors. A composite monitor does not own other monitors, it only uses their results. Also, many composite monitors may reference the same individual monitor.

**Note**: The terms `individual monitors`, `constituent monitors`, and `non-composite monitors` all refer to monitors used by a composite monitor to calculate its status.

## Monitor creation

To create a [composite monitor][1] in Datadog, use the main navigation: *Monitors --> New Monitor --> Composite*.

### Select monitors and set triggering conditions
#### Select monitors

Choose up to 10 individual monitors to use in a composite monitor. Monitors can be of different alert types (simple alerts, multi-alerts, or a combination of the two). No individual monitor may itself be a composite monitor. After you choose your first monitor, the UI shows its alert type and current status.

If you choose a multi-alert monitor, the UI shows the monitor's group-by clause and how many unique sources are currently reporting, for example: `Returns 5 host groups`. When you combine multi-alert monitors, this information helps you choose monitors that pair together naturally.

You should choose monitors that have the same groups. If you don't, the UI warns you that such a composite monitor may never trigger:

```
Group Matching Error
The selected monitors in the expression may not lead to a
composite result because they have not evaluated any
common groupings or have less than 2 selected monitors.
```

Even if you choose multi-alert monitors with the same groups, you might still see a `Group Matching Error` if the monitors have no common reporting sources (also called common groupings). If there are no common reporting sources, Datadog cannot compute a status for the composite monitor, and it never triggers. However, you _can_ ignore the warning and create the monitor anyway. For more details, see [How composite monitors select common reporting sources](#how-composite-monitors-select-common-reporting-sources).

When you select a second monitor that doesn't cause a warning, the UI populates the **Trigger when** field with the default trigger condition `a && b` and shows the status of the proposed composite monitor.

#### Set triggering conditions

In the **Trigger when** field, write your desired trigger condition using boolean operators, referring to individual monitors by their labels in the form `a`, `b`, `c`, etc. Use parentheses to control operator precedence and create more complex conditions.

The following are all valid trigger conditions:

```
!(a && b)
a || b && !c
(a || b) && (c || d)
```

#### No data

`Do not notify` or `Notify` when the composite monitor is in a no-data state. Whatever you choose here doesn't affect the individual monitors' `Notify no data` settings, but in order for a composite to alert on No Data, both the individual monitors and the composite monitor must be set to `Notify` when data is missing.

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][2] page.

## API

When using the API, a non-composite monitor's query can encapsulate a metric, tags, aggregation function like `avg`, group-by clause, etc. A composite monitor's query is defined in terms of its constituent monitors using monitor IDs.

For example, two non-composite monitors have the following queries and IDs:
```text
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # Monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # Monitor ID: 5678
```

A composite monitor's query combining the monitors above could be `"1234 && 5678"`, `"!1234 || 5678"`, etc.

## How composite monitors work

This section uses examples to show how trigger conditions are computed, and the number of alerts you may receive in different scenarios.

### Computing trigger conditions

Datadog computes `A && B && C` in the way you would expect, but which monitor statuses are considered alert-worthy? There are six different statuses a composite monitor considers:

| Status    | Alert-worthy                             |
|-----------|------------------------------------------|
| `Ok`      | False                                    |
| `Warn`    | True                                     |
| `Alert`   | True                                     |
| `Skipped` | False                                    |
| `No Data` | False (true if `notify_no_data` is true) |
| `Unknown` | True                                     |

When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors and triggers an alert. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status.

The not (`!`) operator causes a individual or composite monitor status to be `Ok`, `Alert`, or `No Data`. For example, if monitor `A` has any alert-worthy status, `!A` is `OK`. If monitor `A` has any alert-**un**worthy status, `!A` is `Alert`. If monitor `A` has a status of `No Data`, `!A` is also `No Data`.

Consider a composite monitor that uses three individual monitors (`A`, `B`, `C`) and a trigger condition `A && B && C`. The following table shows the resulting status of the composite monitor given different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| Monitor A   | Monitor B   | Monitor C   | Composite status | Alert triggered? |
|-------------|-------------|-------------|------------------|------------------|
| Unknown (T) | Warn (T)    | Unknown (T) | Warn (T)         | {{< X >}}        |
| Skipped (F) | Ok (F)      | Unknown (T) | Ok (F)           |                  |
| Alert (T)   | Warn (T)    | Unknown (T) | Alert (T)        | {{< X >}}        |
| Skipped (F) | No Data (F) | Unknown (T) | Skipped (F)      |                  |

Two of the four scenarios trigger an alert, even though not all of the individual monitors have the most severe status (`Alert`).

### Component monitor status

Composite monitors are evaluated by using a sliding window of monitor results for each component monitor. Specifically, **they use the most severe status from the past five minutes for each component monitor**. For example, if you have a composite monitor defined as `A && B` with the following component results (timestamps are one minute apart), the composite monitor triggers at T1 even though `A` is technically in an `OK` state.

| Monitor | T0    | T1    | T2    |
|---------|-------|-------|-------|
| A       | Alert | OK    | OK    |
| B       | OK    | Alert | Alert |

The justification for this behavior is that defining simultaneity is a surprisingly difficult problem for alerting systems. Monitors are evaluated according to different schedules and metric latencies can cause two events, which were likely simultaneous, to occur at different times when monitors are finally evaluated. Merely sampling the current state would likely lead to missed alerts in the composite monitor.

As a consequence of this behavior, composite monitors may take several minutes to resolve after their component monitors have resolved.

### Number of alerts

The number of alerts you receive depends on the individual monitor's alert type. If all individual monitors are simple alerts, the composite monitor also has a simple alert type. The composite monitor triggers a single notification when the queries for `A`, `B`, and `C` are all `true` at the same time.

If even one individual monitor is multi-alert, then the composite monitor is also multi-alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi-alert monitors.

#### One multi-alert monitor

Consider a scenario where monitor `A` is a multi-alert monitor grouped by `host`. If the monitor has four reporting sources (hosts `web01` through `web04`) you may receive up to four alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has four cases to consider. For each case, monitor `A`'s status may vary across its sources, but the statuses of monitors `B` and `C`-which are simple alerts-are unchanging.

The table below shows the status of each multi-alert case at one point in time for the composite monitor `A && B && C`:

| Source | Monitor A | Monitor B | Monitor C | Composite status | Alert triggered? |
|--------|-----------|-----------|-----------|------------------|------------------|
| web01  | Alert     | Warn      | Alert     | Alert            | {{< X >}}        |
| web02  | Ok        | Warn      | Alert     | Ok               |                  |
| web03  | Warn      | Warn      | Alert     | Alert            | {{< X >}}        |
| web04  | Skipped   | Warn      | Alert     | Skipped          |                  |

#### Many multi-alert monitors

Now consider a scenario where monitor `A` and `B` are multi-alert and grouped by host. The number of alerts per cycle is, at most, the number of common reporting sources between monitors `A` and `B`. If `web01` through `web05` are reporting for monitor `A`, and `web04` through `web09` are reporting for monitor `B`, the composite monitor _only_ considers the common sources (`web04` and `web05`). Up to two alerts can be received in an evaluation cycle.

Here's an example cycle for the composite monitor `A && B && C`:

| Source | Monitor A | Monitor B | Monitor C | Composite status | Alert triggered? |
|--------|-----------|-----------|-----------|------------------|------------------|
| web04  | Unknown   | Warn      | Alert     | Alert            | {{< X >}}        |
| web05  | Ok        | Ok        | Alert     | Ok               |                  |

### Common reporting sources

Composite monitors that use many multi-alert monitors only consider the individual monitors' *common reporting sources*. In the example above, the common sources are `host:web04` and `host:web05`.

Composite monitors only look at tag *values* (`web04`), not tag *keys* (`host`). If the example above included a multi-alert monitor `D` grouped by `environment` with a single reporting source, `environment:web04`, then the composite monitor considers `web04` the single common reporting source between `A`, `B`, and `D`.

A composite monitor can be created using multi-alert monitors that have no tag values in common but are grouped by the same tag name because shared tag names are a potential common source of reporting. It's possible that in the future their values will match. This is why, in the above example, the common sources of reporting are considered to be `host:web04` and `host:web05`.

Two monitors grouped by different tags rarely have values that overlap, e.g. `web04` and `web05` for monitor `A`, `dev` and `prod` for monitor `D`. If and when they do overlap, a composite monitor comprised of these monitors becomes capable of triggering an alert.

In the case of a multi-alert monitor split by two or more tags, a monitor group corresponds to the whole combination of tags. For example, if monitor `1` is a multi-alert per `device,host`, and monitor `2` is a multi-alert per `host`, a composite monitor can combine monitor `1` and monitor `2`:

{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="writing notification" responsive="true" style="width:80%;">}}

However, consider monitor `3`, a multi-alert per `host,url`. Monitor `1` and monitor `3` may not create a composite result because the groupings are too different:
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="writing notification" responsive="true" style="width:80%;">}}

Use your best judgment to choose multi-alert monitors that makes sense together.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/composite
[2]: /monitors/notifications
