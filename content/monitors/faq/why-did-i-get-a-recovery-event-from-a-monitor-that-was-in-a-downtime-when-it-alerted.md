---
title: Why did I get a Recovery Event from a Monitor that was in a Downtime when it Alerted?
kind: faq
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Learn more about downtimes"
---

When a group is [downtimed][1] and transitions from **`OK`** to one of (**`ALERT`**, **`WARNING`**, **`NO DATA`**), this event will be suppressed from notifying you. When this downtime ends or is cancelled, this allows both re-notify events (if configured) and recovery events to then be sent. This is expected behavior. 


An option is to resolve the monitor prior to cancelling the downtime to suppress recovery notifications. Though any groups that were in a non-**`OK`** state could switch back to their previous state resulting in another notification.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/downtimes
