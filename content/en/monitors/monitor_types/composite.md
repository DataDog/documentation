---
title: Composite monitor
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
  text: "Consult your monitor status"
---

Composite monitors combine individual monitors into one monitor to define more specific alert conditions.

Choose existing monitors to create a composite monitor, for example monitor A and monitor B. Then set a trigger condition using boolean operators (e.g. "A && B"). The composite monitor triggers when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

With regard to configuration, a composite monitor is independent of its constituent monitors. The notification policy of a composite monitor can be modified without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor does not delete its constituent monitors; a composite monitor does not own other monitors, it only uses their results. Also, many composite monitors may reference the same individual monitor.

_Note: we refers variously to 'individual monitors', 'constituent monitors', and 'non-composite monitors'. They all mean the same thing: the monitors that a composite monitor uses to calculate its status._

## Creating composite monitors

In the Datadog application, go to the [**New Monitor**][1] page and click **Composite** in the list of monitor types:

{{< img src="monitors/monitor_types/composite/select-monitor-type.png" alt="select monitor type" responsive="true" >}}

### Choose individual monitors

Choose up to 10 individual monitors to use in the new composite monitor. Monitors can be of different alert types. They can be all simple alerts, all multi-alerts, or a combination of the two. No individual monitor may itself be a composite monitor.

After you choose your first monitor, the UI shows its alert type and current status:

{{< img src="monitors/monitor_types/composite/create-composite-2.png" alt="create composite 2" responsive="true" style="width:80%;">}}

If you choose a multi-alert monitor, the UI shows its group-by clause (e.g. `host`) and how many unique sources (i.e. how many hosts) are currently reporting. When you want to combine many multi-alert monitors, this information can help you choose monitors that pair naturally together: you should almost always choose monitors that have the same group-by. If you don't, the UI warns you that such a composite monitor may never trigger:

{{< img src="monitors/monitor_types/composite/create-composite-4.png" alt="create composite 4" responsive="true" style="width:80%;">}}

Even if you choose multi-alert monitors with the same group-by, the UI may still warn you about the selection. In the following screenshot, both monitors are grouped by `host`:

{{< img src="monitors/monitor_types/composite/create-composite-5.png" alt="create composite 5" responsive="true" style="width:80%;">}}

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors currently have no common reporting sources (also called common groupings). As long as there are no common reporting sources, Datadog cannot compute a status for the composite monitor, and it never triggers. However, you _can_ ignore the warning and create the monitor anyway. To understand why, [read more below](#how-composite-monitors-select-common-reporting-sources).

When you select a second monitor that doesn't cause a warning in the UI, the UI populates the **Trigger when** field with the default trigger condition `a && b` and show the status of the proposed composite monitor:

{{< img src="monitors/monitor_types/composite/create-composite-3.png" alt="create composite 3"  responsive="true" style="width:80%;">}}

### Set a trigger condition

In the **Trigger when** field, write your desired trigger condition using boolean operators, referring to individual monitors by their labels in the form (a, b, c, etc). Use parentheses to control operator precedence and create more complex conditions.

The following are all valid trigger conditions:

```
!(a && b)
a || b && !c
(a || b) && (c || d)
```

Outside of a composite monitor's New Monitor and Edit forms, its individual monitors are known by their numeric IDs:

{{< img src="monitors/monitor_types/composite/composite-status.png" alt="composite status" responsive="true" style="width:80%;">}}

In the API, a composite monitor's trigger condition is called its query. While a non-composite monitor's query can encapsulate many things-a metric, tags, an aggregation function like `avg`, a group-by clause, etc-a composite monitor's query is its trigger condition defined in terms of its constituent monitors.

For two non-composite monitors with the following queries:

```
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # monitor ID: 5678
```

a composite monitor's query is `"1234 && 5678"`, `"!1234 || 5678"`, etc.

### Configure behavior for `No Data`

As with a non-composite monitor, you may configure whether or not a composite monitor triggers when it has the `No Data` status. Whatever you choose here doesn't affect the constituent monitors' `notify_no_data` settings.

### Write a notification message

Write a notification message as you would with any other monitor, using the `@-syntax` (e.g. `@you@example.com`) to notify individuals or teams:

{{< img src="monitors/monitor_types/composite/writing-notification.png" alt="writing notification" responsive="true" style="width:80%;">}}

Adding template variables like `{{a.value}}` and `{{b.value}}` to the monitor message shows the individual monitor values.


### Save the monitor

After setting any other miscellaneous options, click **Save**. Remember: each option you select only affects the composite monitor, not its constituent monitors.

## How composite monitors work

This section uses examples to show how trigger conditions are computed, and how many alerts you may receive in different scenarios.

### How trigger conditions are computed

Datadog doesn't compute `A && B && C` any differently than you would expect, but which monitor statuses are considered true and which false?

Recall the six statuses a monitor may have (in order of increasing severity):

* `Ok`,
* `Warn`,
* `Alert`,
* `Skipped`,
* `No Data`,
* `Unknown`.

Composite monitors consider `Unknown`, `Warn`, and `Alert` to be alert-worthy (i.e. true). The rest-`Ok`, `Skipped`, and `No Data`-are not alert-worthy (i.e. false). However, the monitor can be configured so `No Data` is alert-worthy by setting `notify_no_data` to true.

When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors and triggers an alert. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status.
The not (!) operator causes a status-individual or composite-to be either `Ok`, `Alert`, or `No Data`: if monitor A has any alert-worthy status, `!A` is `OK`; if monitor A has any alert-**un**worthy status, `!A` is `Alert`; if monitor A has a status of `No Data`, `!A` is also `No Data`.

Consider a composite monitor that uses three individual monitors-A, B, and C-and a trigger condition `A && B && C`. The following table shows the resulting status of the composite monitor given different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| monitor A   | monitor B  | monitor C  | composite status        | alert triggered? |
|-------------|------------|------------|-------------------------|-------------------------|
| Unknown (T) | Warn (T)   | Unknown (T)| Warn (T)                |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | Ok (F)     | Unknown (T)| Ok (F)                  |
| Alert (T)   | Warn (T)   | Unknown (T)| Alert (T)               |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | No Data (F)| Unknown (T)| Skipped (F)             |

Two of the four scenarios trigger an alert, even though not all of the individual monitors have the most severe status, `Alert` (and in row 1, none do). But how _many_ alerts might you potentially receive from the composite monitor? That depends on the individual monitors' alert types.

### How a component monitor's status is determined

Rather than periodically sampling the current state of component monitors, composite monitors are evaluated by using a sliding window of monitor results for each component monitor (specifically, they use the most severe status from the past five minutes for each component monitor). For example, if you have a composite monitor defined as `A && B`, and the component results look like this (where the timestamps are one minute apart):

|   | T0    | T1    | T2    |
|---|-------|-------|-------|
| A | Alert | OK    | OK    |
| B | OK    | Alert | Alert |

The composite monitor would trigger at T1 even though `A` is technically in an `OK` state.

The justification for this behavior is that defining simultaneity is a surprisingly difficult problem for alerting systems. Monitors are evaluated according to different schedules and metric latencies can cause two events, which were likely simultaneous, to occur at different times when monitors are finally evaluated. Merely sampling the current state would likely lead to missed alerts in the composite monitor.

As a consequence of this behavior, composite monitors may take several minutes to resolve after their component monitors have resolved.

### How many alerts you will receive

If all individual monitors are simple alerts, the composite monitor also has a simple alert type; the composite monitor triggers a single notification when the queries for A, B, and C are all true at the same time.

If even one individual monitor is multi-alert, then the composite monitor is also multi-alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi-alert monitors.

#### One multi-alert monitor

Consider a scenario where monitor A is a multi-alert monitor grouped by `host`. If the monitor has four reporting sources-hosts web01 through web04-you may receive up to four alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has 4 cases to consider. For each case, monitor A's status may vary across its sources, but the statuses of monitors B and C-which are simple alerts-are unchanging.

The previous table showed the composite monitor status across four points in time, but in this example, the table shows the status of each multi-alert case, all at one point in time:

{{% table responsive="true" %}}

|source | monitor A    | monitor B| monitor C | composite status (A && B && C) | alert triggered? |
|-------|--------------|----------|-----------|--------------------------------|-------------------------|
| web01 | Alert        | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web02 | Ok           | Warn     | Alert     | Ok                             |
| web03 | Warn         | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web04 | Skipped      | Warn     | Alert     | Skipped                        |
{{% /table %}}

In this cycle, you would receive two alerts.

#### Many multi-alert monitors

Now consider a scenario where monitor B is multi-alert, too, and is also grouped by host. The number of alerts per cycle is, at most, the number of common reporting sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web09 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. Up to two alerts can be received in an evaluation cycle.

Here's an example cycle:

|source | monitor A | monitor B | monitor C  | composite status (A && B && C) |alert triggered?|
|-------|-----------|-----------|------------|--------------------------------|----------------|
| web04 | Unknown   | Warn      | Alert      | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>
| web05 | Ok        | Ok        | Alert      | Ok                             |

In this cycle, you would receive one alert.

### How composite monitors select common reporting sources

As explained above, composite monitors that use many multi-alert monitors only consider the individual monitors' *common reporting sources*.
In the example, the common sources were `host:web04` and `host:web05`. Note that composite monitors only look at tag *values* (i.e. `web04`), not tag *names* (i.e. `host`).
If the example above had included a multi-alert monitor `D` grouped by `environment`, and that monitor had a single reporting source, `environment:web04`, then the composite monitor would consider `web04` the single common reporting source between `A`, `B`, and `D`, and would compute its trigger condition.

A composite monitor can be created using multi-alert monitors that have no tag values in common but are grouped by the same tag name because shared tag names are a potential common source of reporting. It's possible that in the future their values will match. This is why, in the above example, the common sources of reporting are considered to be `host:web04` and `host:web05`.

Two monitors grouped by different tags rarely have values that overlap, e.g. `web04` and `web05` for monitor `A`, `dev` and `prod` for monitor `D`. If and when they do overlap, a composite monitor comprised of these monitors becomes capable of triggering an alert.

In the case of a multi-alert split by two or more tags (e.g. an alert per `host, instance, url`) a monitor group corresponds to the whole combination of tags. 

For instance, if Monitor 1 is a multi-alert per `device,host`, and Monitor 2 is a multi-alert per `host`, a composite monitor can combine Monitor 1 and Monitor 2:
{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="writing notification" responsive="true" style="width:80%;">}}

However, consider Monitor 3, a multi-alert per `host,url`. Monitor 1 and Monitor 3 may not lead to a composite result because the groupings are too different.
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="writing notification" responsive="true" style="width:80%;">}}

Use your best judgment to choose multi-alert monitors that makes sense together.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create
