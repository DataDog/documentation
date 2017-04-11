---
title: Guide to Composite Monitors
kind: guide
listorder: 9
---

Composite monitors let you combine individual monitors into one so that you can define more specific alert conditions. Choose two or more existing monitors - monitor A and monitor B, say - and then set a trigger condition using boolean operators (e.g. “A && B”, “A || !B”, etc). The composite monitor will trigger when its individual monitors' statuses simultaneously have values that cause the composite's trigger condition to be true.

An individual monitor is unaffected by the behavior and configuration of any composite monitors which use it. If you'd like to turn off individual monitor notifications or make any other changes to them, modify them independently.

## Creating a Composite Monitor

In Datadog, go to the New Monitor page and select 'Composite Monitor' in the list of monitor types:

![choose-composite-type](/static/images/composite_monitors/select-monitor-type.png)

## Choose individual monitors

You can choose up to 10 individual monitors to add to the new composite monitor. The individual monitors cannot themselves be composite monitors (i.e. you cannot create composite monitors from composite monitors). 

After you choose your first monitor, the UI will indicate its alert type:

![create-composite-2](/static/images/composite_monitors/create-composite-2.png)

Recall that each Datadog monitor has one of two alert types: simple, or multi-alert. You may create composite monitors from individual monitors with different alert types, but if you choose more than one multi-alert monitor, then *all* multi-alert monitors in the composite monitor must use the same grouping. In the screenshot below, monitor 'a' is grouped by `availability-zone`, but monitor 'b' is grouped by `host`:

![create-composite-4](/static/images/composite_monitors/create-composite-4.png)

You cannot create such a composite monitor.

Furthermore, even if all chosen multi-alert monitors use the same grouping, they must *also* have at least one overlapping element. In the screenshot below, both monitors are grouped by `host` but the UI still indicates that the two monitors are incompatible:

![create-composite-5](/static/images/composite_monitors/create-composite-5.png)

Since there's still a Group Matching Error, we can assume that these monitors apply to disjoint sets of hosts. 

As soon as you select a compatible second monitor, the UI will:

1. Populate the 'trigger when' field with the default trigger condition `a && b`,
2. Show the current status of each individual monitor, and
3. Show the current status of the proposed composite monitor, given the default trigger condition.

![create-composite-3](/static/images/composite_monitors/create-composite-3.png)

### Write a trigger condition

In the 'trigger from' field, write the trigger condition using boolean operators. Refer to individual monitors by their labels in the monitor Creation form (i.e. a, b, c, etc). You can use parentheses to control operator precedence. 

Here are some example trigger conditions:

```
a && b
!a || b && c
(a || b) && (c || d)
```

Outside of a composite monitor's Creation/Edit forms (e.g. on its Status page), its individual monitors are known by their numeric IDs:

![composite-status](/static/images/composite_monitors/composite-status.png)

The trigger condition is also known as the monitor's query.

### Set a notification message

Write a notification message as you would with any other monitor. Notifications for the composite monitor will also show the status of individual monitors:

![composite](/static/images/composite_monitors/composite-notification.png)

## Computing composite status

