---
title: Why did I get a recovery event from a Monitor that was in a Downtime when it alerted?
kind: faq
further_reading:
- link: "/monitors/create/"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/notify/downtimes/"
  tag: "Documentation"
  text: "Learn more about downtimes"
---

When a group is [downtimed][1] and transitions from **`OK`** to one of a **`ALERT`**, **`WARNING`**, or **`NO DATA`** state, this event is suppressed from notifying you. 
When this downtime ends or is cancelled, this allows both re-notify events (if configured) and recovery events to then be sent. 

An option is to resolve the monitor prior to cancelling the downtime to suppress recovery notifications. However, any groups that were in a non-**`OK`** state could switch back to their previous state, resulting in another notification.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notify/downtimes/
