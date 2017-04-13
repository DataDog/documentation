---
title: Guide to Composite Monitors
kind: guide
listorder: 9
---

***If you're unfamiliar with the basics of Datadog Monitors, first read the [Guide to Monitors](/guides/monitors)***

---

Composite monitors let you combine many individual monitors into one so that you can define more specific alert conditions. You can choose up to 10 existing monitors - monitor A and monitor B, say - and then set a trigger condition using boolean operators (e.g. “A && B”). The composite monitor will trigger when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

With regard to configuration, a composite monitor is independent of its constituent monitors. You can modify the notification policy of a composite monitor without affecting the policies of its constituent monitors, and vice versa. Furthermore, deleting a composite monitor will not delete its constituent monitors; a composite monitor does not own other monitors, it only uses them. Many composite monitors may reference the same individual monitor.

_Note: this guide refers variously to 'individual monitors', 'constituent monitors', and 'non-composite monitors'. They all mean the same thing: the monitors that a composite monitor uses to calculate its status._

## Creating composite monitors

In Datadog, go to the New Monitor page and select 'Composite Monitor' from the list of monitor types:

![choose-composite-type](/static/images/composite_monitors/select-monitor-type.png)

### Choose individual monitors

Choose up to 10 individual monitors to use in the new composite monitor. You can mix and match monitors of different alert types; they can all be simple alerts, all multi-alerts, or a combination of the two. No individual monitor may itself be a composite monitor.

After you choose your first monitor, the UI will show its alert type and current status:

![create-composite-2](/static/images/composite_monitors/create-composite-2.png)

If you choose a multi-alert monitor, the UI will show its group-by clause (e.g. `host`) and how many unique sources (i.e. how many hosts) are currently reporting. When you want to combine many multi-alert monitors, this information can help you choose monitors that pair naturally together: you should almost always choose monitors that have the same group-by. If you don't, the UI will warn you that such a composite monitor may never trigger:

![create-composite-4](/static/images/composite_monitors/create-composite-4.png)

Even if you choose multi-alert monitors with the same group-by, the UI may still warn you about the selection. In the following screenshot, both monitors are grouped by `host`:

![create-composite-5](/static/images/composite_monitors/create-composite-5.png)

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors currently have no reporting sources in common. If there are no common reporting sources, Datadog cannot compute a status for the composite monitor. For further understanding, [read more below](#many-multi-alert-monitors).

When you select a second monitor that doesn't cause a warning, the UI will populate the 'trigger when' field with the default trigger condition `a && b` and show the status of the proposed composite monitor:

![create-composite-3](/static/images/composite_monitors/create-composite-3.png)

### Set a trigger condition

In the 'trigger when' field, write your desired trigger condition using boolean operators, referring to individual monitors by their labels in the form (a, b, c, etc). You can use parentheses to control operator precedence and create more complex conditions. 

These are all valid trigger conditions: 
 
~~~
!(a && b)
a || b && !c
(a || b) && (c || d)
~~~

Outside of a composite monitor's New Monitor and Edit forms (e.g. on its Status page), its individual monitors are known by their numeric IDs:

![composite-status](/static/images/composite_monitors/composite-status.png)

In the API, a composite monitor's trigger condition is called its query. While a non-composite monitor's query can encapsulate many things — a metric, tags, an aggregation function like `avg`, a group-by clause, etc — a composite monitor's query is simply its trigger condition defined in terms of its constituent monitors.

For two non-composite monitors with the following queries:

~~~
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # monitor ID: 5678
~~~

a composite monitor's query is simply `"1234 && 5678"`, `"!1234 || 5678"`, etc.


### Write a notification message

Write a notification message as you would with any other monitor, using the @-syntax (e.g. @you@example.com) to notify individuals or teams. In addition to your own message, notifications for the composite monitor will show the status of the individual monitors:

~~~
[Triggered] AAA Steve Test Composite 1

Steve, your composite monitor has triggered! @steve@example.com

Query: 51253 || 51719

1 Alert | 3 OK

* AAA Steve Test 1
  ID: 51253
  2 availability-zone groups
  1 Alert | 3 OK

* AAA Steve Test 2
  ID: 51719
  1 availability-zone group
  4 OK

The monitor was last triggered at Fri Mar 24 2017 15:56:21 EDT (28 secs ago)
~~~

After setting any other miscellaneous options, click 'Save'.

## How composite monitors work

This section uses examples to show 1) how trigger conditions are computed and 2) how many alerts a composite monitor may generate in different scenarios.

### How we compute trigger conditions

Datadog doesn't compute `A && B && C` any differently than you would expect, but which monitor statuses are considered true and which false?

Recall the seven statuses a monitor may have (in order of increasing severity): `Ok`, `Skipped`, `Ignored`, `No Data`, `Unknown`, `Warn`, and `Alert`. Composite monitors consider `No Data`, `Unknown`, `Warn` and `Alert` to be alert-worthy (i.e. true). The rest — `Ok`, `Skipped`, `Ignored`, and `No Data` — are not alert-worthy (i.e. false). However, you can configure `No Data` to be alert-worthy.

Just like non-composite monitors, each composite monitor has the field `notify_no_data`. It's false by default, i.e. `No Data` is not alert-worthy. However, if _any_ of its constituent monitors have `notify_no_data` enabled, then the composite monitor considers `No Data` to be alert-worthy for _all_ constituent monitors (and of course, for itself). For individual monitors with `notify_no_data` disabled, `No Data` remains alert-**un**worthy only in the context of that individual monitor's own notification policy.

If no constituent monitors have `notify_no_data` enabled but you want to receive alerts on `No Data` for the composite monitor, enable `notify_no_data` for the composite monitor only.

A composite monitor cannot be configured to consider `No Data` alert-worthy for one of its constituent monitors but not for others: it's all or none.

When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors and triggers an alert. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status.

Consider a composite monitor that uses three individual monitors — A, B, and C — and a trigger condition `A && B && C`. The following table shows the resulting status of the composite monitor given different statuses for its individual monitors (alert-worthiness is indicated with T or F):

| monitor A   | monitor B  | monitor C  | composite status        |
|-------------|------------|------------|-------------------------|
| No Data (T) | Warn (T)   | Unknown (T)| Warn (T) - triggered!   |
| Skipped (F) | Ok (F)     | Unknown (T)| Ok (F)                  |
| Alert (T)   | Warn (T)   | Unknown (T)| Alert (T) - triggered!  |
| No Data (T) | No Data (T)| Unknown (T)| Unknown (T) - triggered!|
{:.table}

Three of the four scenarios will trigger an alert even though the individual monitors do not all have `Alert` status (in two cases, _none_ are). But how _many_ alerts might you potentially receive from the composite monitor? That depends on the individual monitors' alert types.

### How many alerts you will receive

If all individual monitors are simple alerts, the composite monitor will also have a simple alert type; the composite monitor will trigger a single alert when the queries for A, B, and C are all true at the same time.

If even one individual monitor is multi-alert, then the composite monitor is also multi-alert. How _many_ alerts it may send at a time depends on whether the composite monitor uses one or uses many multi-alert monitors.

#### One multi-alert monitor

Consider a scenario where monitor A is a multi-alert monitor grouped by `host`. If the monitor has 4 reporting sources — hosts web01 through web04 — you may receive up to 4 alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has 4 cases to consider. For each case, monitor A's status may vary across its sources, but the statuses of monitors B and C — which are simple alerts — are unchanging. 

The previous table showed the composite monitor status across four points in time, but in this example, the table shows the status of each multi-alert case, all at one point in time:

|source | monitor A    | monitor B| monitor C | composite status (A && B && C) |
|-------|--------------|----------|-----------|--------------------------------|
| web01 | Alert        | Warn     | Alert     | Alert - triggered!             |
| web02 | Ok           | Warn     | Alert     | Ok                             |
| web03 | Warn         | Warn     | Alert     | Alert - triggered!             |
| web04 | Skipped      | Warn     | Alert     | Skipped                        |
{:.table}

In this cycle, you would receive two alerts.

#### Many multi-alert monitors

Now consider a scenario where monitor B is multi-alert, too, and is also grouped by host. The number of alerts per cycle will be, at most, the number of common reporting sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web09 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. You can only receive up to two alerts in an evaluation cycle. 

Here's an example cycle:

|source | monitor A | monitor B | monitor C  | composite status (A && B && C) |
|-------|-----------|-----------|------------|--------------------------------|
| web04 | Unknown   | Warn      | Alert      | Alert - triggered!             |
| web05 | Ok        | Ok        | Alert      | Ok                             |
{:.table}

In this cycle, you would receive one alert.

In identifying common reporting sources, composite monitors only look at reporting sources' tag _values_ (i.e. `web04`), not the tag names (i.e. `host`). This makes it possible for composite monitors to use multi-alert monitors with different group-bys.

If the example above included a multi-alert monitor 'D' grouped by `environment`, and that monitor had a single reporting source, `environment:web04`, then the composite monitor would consider `web04` the single common reporting source between A, B, and D, and would compute its trigger condition.

Often, two monitors grouped by different tags will tend not to have reporting sources whose values collide, e.g. `web04` and `web05` for monitor A, `dev` and `prod` for monitor D. But in the event that they do, a composite monitor that uses these two monitors _is_ be capable of triggering an alert.

Furthermore, as with an individual multi-alert monitors, the number of common reporting sources for a composite monitor may change over time (e.g. when you provision or deprovision hosts). This is why it's possible for composite monitors to use multi-alert monitors which use the same group-by, but which initially have no reporting sources in common; they _might_ in the future.

Use your best judgement to choose multi-alert monitors that makes sense together.
