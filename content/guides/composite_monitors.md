---
title: Guide to Composite Monitors
kind: guide
listorder: 9
---

***If you're unfamiliar with the basics of Datadog Monitors, first read the [Guide to Monitors](/guides/monitors)***

---

Composite monitors let you combine many individual monitors into one so that you can define more specific alert conditions. Choose two or more existing monitors - monitor A and monitor B, say - and then set a trigger condition using boolean operators (e.g. “A && B”). The composite monitor will trigger when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

After you create a composite monitor, you can modify it just as you would an individual monitor. To change the trigger condition, edit the composite monitor. To change one of its constituent monitors, though - e.g. to disable its notifications in favor of the composite notification - simply edit that individual monitor.

## Creating composite monitors

In Datadog, go to the New Monitor page and select 'Composite Monitor' from the list of monitor types:

![choose-composite-type](/static/images/composite_monitors/select-monitor-type.png)

### Choose individual monitors

You can choose up to 10 individual monitors to use in the new composite monitor. When choosing monitors, the following rules apply:

* No individual monitor may itself be a composite monitor
* Individual monitors may be all simple alert monitors, all multi-alert monitors, or a combination of simple and multi-alert
* If more than one multi-alert monitor is chosen, then **all** multi-alert monitors in the composite monitor must:
  1. Use the same grouping (e.g. a monitor grouped by `{host}` cannot be used with one grouped by `{environment}`) AND the same group ordering (e.g. a monitor grouped by `{host,device}` cannot be used with one grouped by `{device,host}`)
  2. Have at least one group element in common (e.g. a monitor that applies only to `environment:dev` cannot be used with one that applies only to `environment:prod`)

After you choose your first monitor, the UI will indicate its alert type and current status:

![create-composite-2](/static/images/composite_monitors/create-composite-2.png)

In the screenshot below, monitor 'a' is grouped by `availability-zone`, but monitor 'b' is grouped by `host`:

![create-composite-4](/static/images/composite_monitors/create-composite-4.png)

You cannot create such a composite monitor.

In _this_ screenshot, both monitors are grouped by `{host}`, yet the UI indicates that the two monitors are incompatible:

![create-composite-5](/static/images/composite_monitors/create-composite-5.png)

Since there's still a 'Group Matching Error' despite matching group-bys, we can assume that these monitors have no reporting sources in common.

As soon as you select a compatible second monitor, the UI will:

1. Populate the 'trigger when' field with the default trigger condition `a && b`,
2. Show the current status of each individual monitor, and
3. Show the current status of the proposed composite monitor, given the default trigger condition.

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

In the API, a composite monitor's trigger condition is called its query. While a non-composite monitor's query can encapsulate many things — a metric, tags, an aggregation function like `avg`, a group-by, etc — a composite monitor's query is simply its trigger condition, defined in terms of its constituent monitors.

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

In this section, we look at a few examples to show **how** and **when** Datadog will alert on composite monitors.

### How to alert?

Consider a composite monitor that uses three individual monitors — A, B, and C — and a trigger condition `A && B && C`. How many simultaneous alerts might you potentially receive from the composite monitor? That depends on its individual monitors' alert types. 

Let's look at three examples with varying individual monitors. We'll consider how the composite monitor behaves in each case.

#### All simple alert monitors

The composite monitor will also have a simple alert type, i.e. it will only send up to one alert per evaluation cycle. The composite monitor triggers when the queries for A, B, and C are all true at the same time.

#### One multi-alert monitor (monitor A)

The composite monitor will have a multi-alert type. If monitor A has 4 reporting sources — hosts web01 through web04 — you may receive up to 4 alerts each time Datadog evaluates the composite monitor. In other words: for a given evaluation cycle, Datadog has 4 cases to consider. For each case, monitor A's status may vary across its sources, but the statuses of monitors B and C — which are simple alert types — are unchanging. Here's an example cycle:

| monitor A    | monitor B| monitor C | composite status |
|--------------|----------|-----------| ---------------- |
| True (web01) | True     | True      | True - triggered!|
| False (web02)| True     | True      | F                |
| True (web03) | True     | True      | True - triggered!|
| False (web04)| True     | True      | False            |
{:.table}

In this cycle, you would receive two alerts.

#### Many multi-alert monitors (monitors A and B)

The composite monitor will have a multi-alert type, but the number of alerts per cycle will be, at most, the number of common sources between monitors A and B. If web01 through web05 are reporting for monitor A, and web04 through web09 are reporting for monitor B, the composite monitor _only_ considers the common sources: web04 and web05. You can only receive up to two alerts in a cycle. Here's an example cycle:

| monitor A    | monitor B    | monitor C | composite status |
|--------------|--------------|-----------|------------------|
| True (web04) | True (web04) | True      | True - alert!    |
| False (web05)| True (web05) | True      | False            |
{:.table}

In this cycle, you would receive one alert.

Remember: all multi-alert monitors used in a composite monitor _must_ use the same group-by.

### When to alert?

The previous section considered monitor statuses in binary terms: true, or false. But a monitor can have statuses other than simply `Alert` and `OK`. Possible statuses include (in order of increasing severity): `OK`, `Skipped`, `Ignored`, `No Data`, `Unknown`, `Warn`, and `Alert`. Above, what true and false actually refer to is whether or not a given status should trigger an alert (true) or not (false). In other words: the status' **alert-worthiness**. 

Composite monitors consider statuses from `No Data` up to `Alert` to be alert-worthy. When a composite monitor evaluates as alert-worthy, it inherits the most severe status among its individual monitors. When a composite monitor does not evaluate as alert-worthy, it inherits the _least_ severe status.

Let's look again at the previous example that used only one multi-alert monitor. This table includes status detail, but still indicates the alert-worthiness of each status with T or F:

| monitor A           | monitor B | monitor C       | composite status     |
| ------------------- | --------- | --------------- | -------------------- |
| No Data (T) (web01) | Warn (T)  | Unknown (T)     | Warn (T) - alert!    |
| Skipped (F) (web02) | Warn (T)  | Unknown (T)     | Skipped (F)          |
| Alert (T) (web03)   | Warn (T)  | Unknown (T)     | Alert (T) - alert!   |
| OK (F) (web04)      | Warn (T)  | Unknown (T)     | OK (F)               |
{:.table}
