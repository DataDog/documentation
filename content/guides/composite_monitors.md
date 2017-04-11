---
title: Guide to Composite Monitors
kind: guide
listorder: 9
---

### What are they?

Composite monitors let you combine individual monitors into one so that you can define more specific alert conditions. Choose two or more existing monitors - monitor A and monitor B, say - and then set a trigger condition using boolean operators (e.g. “A && B”). The composite monitor will trigger when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

An individual monitor is unaffected by the configuration and behavior of any composite monitors which use it. To make changes to one of a composite monitor's individual monitors (e.g. its notifications, its query, etc), modify the individual monitor independently; there's no need to reconfigure the composite monitor.

### Creating them

In Datadog, go to the New Monitor page and select 'Composite Monitor' from the list of monitor types:

![choose-composite-type](/static/images/composite_monitors/select-monitor-type.png)

#### Choose individual monitors

You can choose up to 10 individual monitors to use in the new composite monitor. An individual monitor cannot itself be a composite monitor. 

After you choose your first monitor, the UI will indicate its alert type:

![create-composite-2](/static/images/composite_monitors/create-composite-2.png)

Recall that each Datadog monitor has one of two alert types: simple, or multi-alert. You may create composite monitors from individual monitors of different alert types (e.g. one simple alert monitor and one multi-alert monitor), but if you choose more than one multi-alert monitor, then *all* multi-alert monitors in the composite monitor must use the same grouping. In the screenshot below, monitor 'a' is grouped by `availability-zone`, but monitor 'b' is grouped by `host`:

![create-composite-4](/static/images/composite_monitors/create-composite-4.png)

You cannot create such a composite monitor.

Furthermore, even if all chosen multi-alert monitors use the same grouping, they must *also* have at least one reporting source (i.e. host) in common. In the screenshot below, both monitors are grouped by `host`, yet the UI indicates that the two monitors are incompatible:

![create-composite-5](/static/images/composite_monitors/create-composite-5.png)

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors have no reporting sources in common.

As soon as you select a compatible second monitor, the UI will:

1. Populate the 'trigger when' field with the default trigger condition `a && b`,
2. Show the current status of each individual monitor, and
3. Show the current status of the proposed composite monitor, given the default trigger condition.

![create-composite-3](/static/images/composite_monitors/create-composite-3.png)

#### Set a trigger condition

In the 'trigger when' field, write your desired trigger condition using boolean operators. Refer to individual monitors by their labels in the form (a, b, c, etc). You can use parentheses to control operator precedence and create more complex conditions. 

These are all valid trigger conditions: 

`!(a && b)`<br>
`a || b && !c`<br>
`(a || b) && (c || d)`<br>

Outside of a composite monitor's New Monitor and Edit forms (e.g. on its Status page), its individual monitors are known by their numeric IDs:

![composite-status](/static/images/composite_monitors/composite-status.png)

In the API, a composite monitor's trigger condition is known as its query. Just as two non-composite monitors may be defined by the following queries:

`"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # monitor ID: 1234`<br>
`"avg(last_1m):avg:system.cpu.system{role:database} > 50" # monitor ID: 5678`

A composite monitor's query is defined only in terms of its constituent monitors, e.g. `"1234 && 5678"`.

#### Write a notification message

Write a notification message as you would with any other monitor, using the @-syntax (e.g. @you@example.com) to notify individuals or teams. In addition to your own message, notifications for the composite monitor will show the status of the individual monitors:

![composite](/static/images/composite_monitors/composite-notification.png)

#### Save the monitor

After setting any other miscellaneous options, click 'Save'.

## How they work

This section uses examples to show **how** Datadog evaluates a composite monitor's status, and **when** Datadog considers the status to be alert-worthy.

### How Datadog evaluates status

Consider a composite monitor that uses three individual monitors — A, B, and C — and a trigger condition `A && B && C`. How many simultaneous alerts may you potentially receive from the composite monitor? It depends on the alert types of its individual monitors. Let's look at three examples with varying individual monitors.

#### All simple alert monitors

The composite monitor also has a simple alert type; it can only send one alert per evaluation cycle. The composite monitor triggers when the queries for A, B, and C are all true at the same time.

#### One multi-alert monitor (A)

The composite monitor has a multi-alert type. If monitor A has 4 sources (i.e. hosts) reporting - web01 through web04 - you may receive up to 4 alerts each time Datadog evaluates the composite monitor. For a given evaluation cycle, monitor A's status may vary across its sources, but the statuses of simple alert monitors B and C are unchanging.

Here's an example cycle:

| monitor A | monitor B | monitor C | composite status |
| --------- | --------- | --------- | ---------------- |
| T (web01) | T         | T         | T - alert!       |
| F (web02) | T         | T         | F                |
| T (web03) | T         | T         | T - alert!       |
| F (web04) | T         | T         | F                |

You will receive two alerts for this cycle.

#### Many multi-alert monitors (A and B)

The composite monitor has a multi-alert type, but the number of alerts per cycle is limited to the number of common sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web10 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. You will only receive up to two alerts in a cycle.

Here's an example cycle:

| monitor A | monitor B | monitor C | composite status |
|:---------:|:---------:|:---------:|:----------------:|
| T (web04) | T (web04) | T         | T - alert!       |
| F (web05) | T (web05) | T         | F                |

You will receive one alert for this cycle.

Remember: all multi-alert monitors used in a composite monitor _must_ use the same group-by. If they do, and there are multiple groups in the group-by, the groups must appear in the same order. For example, a monitor grouped by `{host,environment}` and another grouped by `{environment,host}` cannot be used together in a composite monitor.

### When is a status alert-worthy?

The previous section considered monitor statuses in binary terms: true, or false. But a monitor can have statuses other than simply `Alert` and `OK`. Possible statuses include (in order of increasing severity): `OK`, `Skipped`, `Ignored`, `No Data`, `Unknown`, `Warn`, and `Alert`. Above, what true and false actually refer to is whether or not a given status should trigger an alert (true) or not (false). In other words: the status' alert-worthiness. 

Composite monitors consider statuses from `No Data` up to `Alert` to be alert-worthy. When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors. When a composite monitor does not evaluate as alert worthy, it inherits the _least_ severe status.

Let's look again at the previous example that used one multi-alert monitor, this time with status detail:

| monitor A           | monitor B | monitor C       | composite status     |
| ------------------- | --------- | --------------- | -------------------- |
| No Data (T) (web01) | Warn (T)  | Unknown (T)     | Warn (T) - alert!    |
| Skipped (F) (web02) | Warn (T)  | Unknown (T)     | Skipped (F)          |
| Alert (T) (web03)   | Warn (T)  | Unknown (T)     | Alert (T) - alert!   |
| OK (F) (web04)      | Warn (T)  | Unknown (T)     | OK (F)               |
