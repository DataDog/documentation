---
last_modified: 2017/08/25
translation_status: tentative
language: ja
title: Composite Monitor (複合条件監視)
kind: guide
listorder: 14
---

<!--
<div class="alert alert-info">
If you're unfamiliar with the basics of Datadog Monitors, first read the <a href="https://docs.datadoghq.com/guides/monitors/">Guide to Monitors</a>
</div>
-->
<div class="alert alert-info">
もし、まだDatadogのMonitor(監視)機能について不安がある場合は、<a href="https://docs.datadoghq.com/guides/monitors/">Monitor(監視)機能の設定ガイド</a>を先に参照して下さい。
</div>

<!--
Composite monitors let you combine many individual monitors into one so that you can define more specific alert conditions.
You can choose up to 10 existing monitors-monitor A and monitor B, say-and then set a trigger condition using boolean operators (e.g. "A && B"). The composite monitor will trigger when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

With regard to configuration, a composite monitor is independent of its constituent monitors. You can modify the notification policy of a composite monitor without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor will not delete its constituent monitors; a composite monitor does not own other monitors, it only uses their results. Also, many composite monitors may reference the same individual monitor.

_Note: this guide refers variously to 'individual monitors', 'constituent monitors', and 'non-composite monitors'. They all mean the same thing: the monitors that a composite monitor uses to calculate its status._
-->
コンポジットMonitorを使用すると、多数の個々のMonitorを1つの複合Monitorとしてまとめることができ、より具体的なアラート条件を定義することができます。最大で10までの作成済みのMonitorを使用して、例えば Monitor A と Monitor B があるとすると、boolean演算子を用いてアラートがトリガする条件を("A && B")のようにセットすることができます。コンポジットMonitorは、複合したトリガ条件が真となる値を個々のMonitorのステータスが同時に持つ場合にトリガされます。

With regard to configuration, a composite monitor is independent of its constituent monitors. You can modify the notification policy of a composite monitor without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor will not delete its constituent monitors; a composite monitor does not own other monitors, it only uses their results. Also, many composite monitors may reference the same individual monitor.

_Note: this guide refers variously to 'individual monitors', 'constituent monitors', and 'non-composite monitors'. They all mean the same thing: the monitors that a composite monitor uses to calculate its status._

<!--
## Creating composite monitors

In the Datadog app, go to the [**New Monitor**](https://app.datadoghq.com/monitors#create) page and click **Composite** in the list of monitor types:

{{< img src="guides/composite_monitors/select-monitor-type.png" >}}
-->
## Composite Monitor の作成

In the Datadog app, go to the [**New Monitor**](https://app.datadoghq.com/monitors#create) page and click **Composite** in the list of monitor types:

{{< img src="guides/composite_monitors/select-monitor-type.png" >}}

<!--
### Choose individual monitors

Choose up to 10 individual monitors to use in the new composite monitor. You can mix and match monitors of different alert types; they can be all simple alerts, all multi-alerts, or a combination of the two. No individual monitor may itself be a composite monitor.

After you choose your first monitor, the UI will show its alert type and current status:

{{< img src="guides/composite_monitors/create-composite-2.png" >}}

If you choose a multi-alert monitor, the UI will show its group-by clause (e.g. `host`) and how many unique sources (i.e. how many hosts) are currently reporting. When you want to combine many multi-alert monitors, this information can help you choose monitors that pair naturally together: you should almost always choose monitors that have the same group-by. If you don't, the UI will warn you that such a composite monitor may never trigger:

{{< img src="guides/composite_monitors/create-composite-4.png" >}}

Even if you choose multi-alert monitors with the same group-by, the UI may still warn you about the selection. In the following screenshot, both monitors are grouped by `host`:

{{< img src="guides/composite_monitors/create-composite-5.png" >}}

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors currently have no common reporting sources (also called common groupings). As long as there are no common reporting sources, Datadog cannot compute a status for the composite monitor, and it will never trigger. However, you _can_ ignore the warning and create the monitor anyway. To understand why, [read more below](#how-composite-monitors-select-common-reporting-sources).

When you select a second monitor that doesn't cause a warning in the UI, the UI will populate the **Trigger when** field with the default trigger condition `a && b` and show the status of the proposed composite monitor:

{{< img src="guides/composite_monitors/create-composite-3.png" >}}
-->
### 個々のMonitorの選択

Choose up to 10 individual monitors to use in the new composite monitor. You can mix and match monitors of different alert types; they can be all simple alerts, all multi-alerts, or a combination of the two. No individual monitor may itself be a composite monitor.

After you choose your first monitor, the UI will show its alert type and current status:

{{< img src="guides/composite_monitors/create-composite-2.png" >}}

If you choose a multi-alert monitor, the UI will show its group-by clause (e.g. `host`) and how many unique sources (i.e. how many hosts) are currently reporting. When you want to combine many multi-alert monitors, this information can help you choose monitors that pair naturally together: you should almost always choose monitors that have the same group-by. If you don't, the UI will warn you that such a composite monitor may never trigger:

{{< img src="guides/composite_monitors/create-composite-4.png" >}}

Even if you choose multi-alert monitors with the same group-by, the UI may still warn you about the selection. In the following screenshot, both monitors are grouped by `host`:

{{< img src="guides/composite_monitors/create-composite-5.png" >}}

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors currently have no common reporting sources (also called common groupings). As long as there are no common reporting sources, Datadog cannot compute a status for the composite monitor, and it will never trigger. However, you _can_ ignore the warning and create the monitor anyway. To understand why, [read more below](#how-composite-monitors-select-common-reporting-sources).

When you select a second monitor that doesn't cause a warning in the UI, the UI will populate the **Trigger when** field with the default trigger condition `a && b` and show the status of the proposed composite monitor:

{{< img src="guides/composite_monitors/create-composite-3.png" >}}

<!--
### Set a trigger condition

In the **Trigger when** field, write your desired trigger condition using boolean operators, referring to individual monitors by their labels in the form (a, b, c, etc). You can use parentheses to control operator precedence and create more complex conditions.

The following are all valid trigger conditions:

~~~
!(a && b)
a || b && !c
(a || b) && (c || d)
~~~

Outside of a composite monitor's New Monitor and Edit forms, its individual monitors are known by their numeric IDs:

{{< img src="guides/composite_monitors/composite-status.png" >}}

In the API, a composite monitor's trigger condition is called its query. While a non-composite monitor's query can encapsulate many things-a metric, tags, an aggregation function like `avg`, a group-by clause, etc-a composite monitor's query is simply its trigger condition defined in terms of its constituent monitors.

For two non-composite monitors with the following queries:

~~~
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # monitor ID: 5678
~~~

a composite monitor's query is simply `"1234 && 5678"`, `"!1234 || 5678"`, etc.
-->
### アラートのトリガ条件を設定する

In the **Trigger when** field, write your desired trigger condition using boolean operators, referring to individual monitors by their labels in the form (a, b, c, etc). You can use parentheses to control operator precedence and create more complex conditions.

The following are all valid trigger conditions:

~~~
!(a && b)
a || b && !c
(a || b) && (c || d)
~~~

Outside of a composite monitor's New Monitor and Edit forms, its individual monitors are known by their numeric IDs:

{{< img src="guides/composite_monitors/composite-status.png" >}}

In the API, a composite monitor's trigger condition is called its query. While a non-composite monitor's query can encapsulate many things-a metric, tags, an aggregation function like `avg`, a group-by clause, etc-a composite monitor's query is simply its trigger condition defined in terms of its constituent monitors.

For two non-composite monitors with the following queries:

~~~
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # monitor ID: 5678
~~~

a composite monitor's query is simply `"1234 && 5678"`, `"!1234 || 5678"`, etc.

<!--
### Configure behavior for `No Data`

As with a non-composite monitor, you may configure whether or not a composite monitor triggers when it has the `No Data` status. Whatever you choose here will not affect the constituent monitors' `notify_no_data` settings.
-->
### `No Data`の場合の振る舞いの設定

As with a non-composite monitor, you may configure whether or not a composite monitor triggers when it has the `No Data` status. Whatever you choose here will not affect the constituent monitors' `notify_no_data` settings.

<!--
### Write a notification message

Write a notification message as you would with any other monitor, using the @-syntax (e.g. @you@example.com) to notify individuals or teams:

{{< img src="guides/composite_monitors/writing-notification.png" >}}

In addition to your own message, notifications (e.g. emails) for the composite monitor will show the status of the individual monitors:

~~~
[Triggered] CPU + Memory composite monitor

Database servers are high on CPU usage AND low on memory. @kent@datadoghq.com

Query: 1896131 && 1896130

1 Alert | 4 OK

* CPU monitor for database servers
  ID: 1896131
  5 host groups
  1 Alert | 4 OK

* Memory monitor for database servers
  ID: 1896130
  5 host groups
  1 Alert | 4 OK

The monitor was last triggered at Mon Apr 17 2017 11:31:47 EDT (28 secs ago)
~~~
-->
### 通知先と通知本文の設定

Write a notification message as you would with any other monitor, using the @-syntax (e.g. @you@example.com) to notify individuals or teams:

{{< img src="guides/composite_monitors/writing-notification.png" >}}

In addition to your own message, notifications (e.g. emails) for the composite monitor will show the status of the individual monitors:

~~~
[Triggered] CPU + Memory composite monitor

Database servers are high on CPU usage AND low on memory. @kent@datadoghq.com

Query: 1896131 && 1896130

1 Alert | 4 OK

* CPU monitor for database servers
  ID: 1896131
  5 host groups
  1 Alert | 4 OK

* Memory monitor for database servers
  ID: 1896130
  5 host groups
  1 Alert | 4 OK

The monitor was last triggered at Mon Apr 17 2017 11:31:47 EDT (28 secs ago)
~~~

<!--
### Save the monitor

After setting any other miscellaneous options, click **Save**. Remember: each option you select only affects the composite monitor, not its constituent monitors.
-->
### Monitor設定を保存する

After setting any other miscellaneous options, click **Save**. Remember: each option you select only affects the composite monitor, not its constituent monitors.

<!--
## How composite monitors work

This section uses examples to show how trigger conditions are computed, and how many alerts you may receive in different scenarios.
-->
## Composite Monitor の動き方

This section uses examples to show how trigger conditions are computed, and how many alerts you may receive in different scenarios.

<!--
### How trigger conditions are computed

Datadog doesn't compute `A && B && C` any differently than you would expect, but which monitor statuses are considered true and which false?

Recall the seven statuses a monitor may have (in order of increasing severity): `Ok`, `Skipped`, `Ignored`, `No Data`, `Unknown`, `Warn`, and `Alert`. Composite monitors consider `Unknown`, `Warn` and `Alert` to be alert-worthy (i.e. true). The rest-`Ok`, `Skipped`, `Ignored`, and `No Data`-are not alert-worthy (i.e. false). However, you can configure `No Data` to be alert-worthy by setting `notify_no_data` to true.

When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors and triggers an alert. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status. The not (!) operator causes a status-individual or composite-to be either `Ok`, `Alert`, or `No Data`: if monitor A has any alert-worthy status, `!A` is `OK`; if monitor A has any alert-**un**worthy status, `!A` is `Alert`; if monitor A has a status of `No Data`, `!A` is also `No Data`.

Consider a composite monitor that uses three individual monitors-A, B, and C-and a trigger condition `A && B && C`. The following table shows the resulting status of the composite monitor given different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| monitor A   | monitor B  | monitor C  | composite status        | alert triggered? |
|-------------|------------|------------|-------------------------|-------------------------|
| Unknown (T) | Warn (T)   | Unknown (T)| Warn (T)                |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | Ok (F)     | Unknown (T)| Ok (F)                  |
| Alert (T)   | Warn (T)   | Unknown (T)| Alert (T)               |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | No Data (F)| Unknown (T)| Skipped (F)             |

Two of the four scenarios will trigger an alert, even though not all of the individual monitors have the most severe status, `Alert` (and in row 1, none do). But how _many_ alerts might you potentially receive from the composite monitor? That depends on the individual monitors' alert types.
-->
### トリガ条件の判定方法

Datadog doesn't compute `A && B && C` any differently than you would expect, but which monitor statuses are considered true and which false?

Recall the seven statuses a monitor may have (in order of increasing severity): `Ok`, `Skipped`, `Ignored`, `No Data`, `Unknown`, `Warn`, and `Alert`. Composite monitors consider `Unknown`, `Warn` and `Alert` to be alert-worthy (i.e. true). The rest-`Ok`, `Skipped`, `Ignored`, and `No Data`-are not alert-worthy (i.e. false). However, you can configure `No Data` to be alert-worthy by setting `notify_no_data` to true.

When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors and triggers an alert. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status. The not (!) operator causes a status-individual or composite-to be either `Ok`, `Alert`, or `No Data`: if monitor A has any alert-worthy status, `!A` is `OK`; if monitor A has any alert-**un**worthy status, `!A` is `Alert`; if monitor A has a status of `No Data`, `!A` is also `No Data`.

Consider a composite monitor that uses three individual monitors-A, B, and C-and a trigger condition `A && B && C`. The following table shows the resulting status of the composite monitor given different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| monitor A   | monitor B  | monitor C  | composite status        | alert triggered? |
|-------------|------------|------------|-------------------------|-------------------------|
| Unknown (T) | Warn (T)   | Unknown (T)| Warn (T)                |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | Ok (F)     | Unknown (T)| Ok (F)                  |
| Alert (T)   | Warn (T)   | Unknown (T)| Alert (T)               |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | No Data (F)| Unknown (T)| Skipped (F)             |

Two of the four scenarios will trigger an alert, even though not all of the individual monitors have the most severe status, `Alert` (and in row 1, none do). But how _many_ alerts might you potentially receive from the composite monitor? That depends on the individual monitors' alert types.

<!--
### How many alerts you will receive

If all individual monitors are simple alerts, the composite monitor will also have a simple alert type; the composite monitor will trigger a single notification when the queries for A, B, and C are all true at the same time.

If even one individual monitor is multi-alert, then the composite monitor is also multi-alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi-alert monitors.
-->
### 発報されるアラートの数

If all individual monitors are simple alerts, the composite monitor will also have a simple alert type; the composite monitor will trigger a single notification when the queries for A, B, and C are all true at the same time.

If even one individual monitor is multi-alert, then the composite monitor is also multi-alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi-alert monitors.

<!--
#### One multi-alert monitor

Consider a scenario where monitor A is a multi-alert monitor grouped by `host`. If the monitor has four reporting sources-hosts web01 through web04-you may receive up to four alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has 4 cases to consider. For each case, monitor A's status may vary across its sources, but the statuses of monitors B and C-which are simple alerts-are unchanging.

The previous table showed the composite monitor status across four points in time, but in this example, the table shows the status of each multi-alert case, all at one point in time:

|source | monitor A    | monitor B| monitor C | composite status (A && B && C) | alert triggered? |
|-------|--------------|----------|-----------|--------------------------------|-------------------------|
| web01 | Alert        | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web02 | Ok           | Warn     | Alert     | Ok                             |
| web03 | Warn         | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web04 | Skipped      | Warn     | Alert     | Skipped                        |

In this cycle, you would receive two alerts.
-->
#### multi-alert Monitor が1つだけ使用されるケース

Consider a scenario where monitor A is a multi-alert monitor grouped by `host`. If the monitor has four reporting sources-hosts web01 through web04-you may receive up to four alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has 4 cases to consider. For each case, monitor A's status may vary across its sources, but the statuses of monitors B and C-which are simple alerts-are unchanging.

The previous table showed the composite monitor status across four points in time, but in this example, the table shows the status of each multi-alert case, all at one point in time:

|source | monitor A    | monitor B| monitor C | composite status (A && B && C) | alert triggered? |
|-------|--------------|----------|-----------|--------------------------------|-------------------------|
| web01 | Alert        | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web02 | Ok           | Warn     | Alert     | Ok                             |
| web03 | Warn         | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web04 | Skipped      | Warn     | Alert     | Skipped                        |

In this cycle, you would receive two alerts.

<!--
#### Many multi-alert monitors

Now consider a scenario where monitor B is multi-alert, too, and is also grouped by host. The number of alerts per cycle will be, at most, the number of common reporting sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web09 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. You can only receive up to two alerts in an evaluation cycle.

Here's an example cycle:

|source | monitor A | monitor B | monitor C  | composite status (A && B && C) |alert triggered?|
|-------|-----------|-----------|------------|--------------------------------|----------------|
| web04 | Unknown   | Warn      | Alert      | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>
| web05 | Ok        | Ok        | Alert      | Ok                             |

In this cycle, you would receive one alert.
-->
#### 複数の multi-alert Monitor が使用されるケース

Now consider a scenario where monitor B is multi-alert, too, and is also grouped by host. The number of alerts per cycle will be, at most, the number of common reporting sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web09 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. You can only receive up to two alerts in an evaluation cycle.

Here's an example cycle:

|source | monitor A | monitor B | monitor C  | composite status (A && B && C) |alert triggered?|
|-------|-----------|-----------|------------|--------------------------------|----------------|
| web04 | Unknown   | Warn      | Alert      | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>
| web05 | Ok        | Ok        | Alert      | Ok                             |

In this cycle, you would receive one alert.

<!--
### How composite monitors select common reporting sources

As explained above, composite monitors that use many multi-alert monitors only consider the individual monitors' _common reporting sources_. In the example, the common sources were `host:web04` and `host:web05`, but there's a subtle caveat: in identifying common reporting sources, composite monitors only look at tag _values_ (i.e. `web04`), not tag names (i.e. `host`). This technically makes it possible for a composite monitor to trigger on multi-alert monitors that group by different tags.

If the example above had included a multi-alert monitor 'D' grouped by `environment`, and that monitor had a single reporting source, `environment:web04`, then the composite monitor would consider `web04` the single common reporting source between A, B, and D, and would compute its trigger condition.

Often, two monitors grouped by different tags tend to have reporting sources whose tag values never overlap, e.g. `web04` and `web05` for monitor A, `dev` and `prod` for monitor D. But if and when they do overlap, a composite monitor that uses two such monitors becomes capable of triggering an alert.

Furthermore, as with an individual multi-alert monitor, the number of common reporting sources for a composite monitor may change over time (e.g. when you provision or deprovision hosts). This is why it's possible for composite monitors to use multi-alert monitors that group by the same tag, but which initially have no reporting sources in common; they _might_ in the future.

Use your best judgement to choose multi-alert monitors that makes sense together.
-->
### Composite Monitor が共通の発報元を選択する方法

As explained above, composite monitors that use many multi-alert monitors only consider the individual monitors' _common reporting sources_. In the example, the common sources were `host:web04` and `host:web05`, but there's a subtle caveat: in identifying common reporting sources, composite monitors only look at tag _values_ (i.e. `web04`), not tag names (i.e. `host`). This technically makes it possible for a composite monitor to trigger on multi-alert monitors that group by different tags.

If the example above had included a multi-alert monitor 'D' grouped by `environment`, and that monitor had a single reporting source, `environment:web04`, then the composite monitor would consider `web04` the single common reporting source between A, B, and D, and would compute its trigger condition.

Often, two monitors grouped by different tags tend to have reporting sources whose tag values never overlap, e.g. `web04` and `web05` for monitor A, `dev` and `prod` for monitor D. But if and when they do overlap, a composite monitor that uses two such monitors becomes capable of triggering an alert.

Furthermore, as with an individual multi-alert monitor, the number of common reporting sources for a composite monitor may change over time (e.g. when you provision or deprovision hosts). This is why it's possible for composite monitors to use multi-alert monitors that group by the same tag, but which initially have no reporting sources in common; they _might_ in the future.

Use your best judgement to choose multi-alert monitors that makes sense together.
