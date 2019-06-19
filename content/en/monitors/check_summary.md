---
title: Check Summary
kind: documentation
description: "See the list of all your checks reporting to Datadog."
further_reading:
- link: "monitors/monitor_types"
  tag: "Documentation"
  text: "Learn how to create a monitor"
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/manage_monitor"
  tag: "Documentation"
  text: "Manage your monitors"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
---

## Overview

Datadog checks emit a status on each check run. Potential statuses are `OK`, `WARNING`, or `CRITICAL`.

The check summary page lists all your checks reporting to Datadog:

 {{< img src="monitors/check_summary/check_summary.png" alt="Check Summary" responsive="true" style="width:70%;">}}

Click on a check name to see the tags associated with the check:

{{< img src="monitors/check_summary/check_details.png" alt="Check details" responsive="true" style="width:80%;">}}

**Note**: For more insights on check statuses, utilize the [Check Status Widget][1].

## Further Reading 

{{< partial name="whats-next/whats-next.html" >}}

[1]: /graphing/widgets/check_status
