---
title: Monitor settings changes not taking effect
description: "Understand why monitor group changes may not take immediate effect due to group persistence and aging behavior."
aliases:
- /monitors/faq/why-did-my-monitor-settings-change-not-take-effect
further_reading:
- link: "content/en/monitors/guide/troubleshooting-monitor-alerts"
  tag: "Documentation"
  text: "Troubleshooting Monitor Alerts"
---

## Overview

Datadog keeps monitor groups available in the UI for a retention period after they stop reporting, unless the query is changed. The retention period depends on the monitor type and configuration. For details, see [Group retention time][1]. If you do not have {{< ui >}}No Data{{< /ui >}} alert settings enabled and your group for a metric monitor stops reporting data, the group persists on the monitor status page until it ages out, though that group stops being evaluated after a short absence. 

For event monitors, however, Datadog also keeps groups for evaluations for at least 24 hours. This means that if a monitor is updated and the groups are changed in the query, some old groups may persist. If you must change the group settings on your event monitor, you may want to clone or create a monitor to reflect your new groups. Alternatively, you can mute them if you would like to maintain the monitor but silence any alerts that would result from the changes.

## Renamed or decommissioned hosts appearing in alerts

When a host is renamed at the operating system (OS) level or decommissioned, the old hostname may continue to appear in monitor alert groups even after the host stops reporting data. This is expected behavior based on host group retention periods, which vary by monitor type and configuration. For the retention period that applies to each monitor type, see [Group retention time][1].

The old hostname remains in an alert state until the retention period expires, after which it automatically ages out and disappears from the monitor. **Note**: The old hostname will no longer appear in {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Hosts{{< /ui >}}, but will continue to be evaluated by monitors until the retention window passes.

<div class="alert alert-danger">If a Custom Schedule is applied to a monitor, decommissioned hosts continue to be evaluated past the standard retention window. For more information, see <a href="/monitors/guide/custom_schedules">Custom Schedules</a>.</div>

### Workarounds

If you need to remove the old hostname from alerts before the retention period expires, you can use one of the following workarounds:

- **Mute the specific alert group** for the old hostname while it ages out naturally.
- **Add an exclusion filter** to the monitor query (for example, `-host:old-hostname`) to immediately remove the hostname from evaluation.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/configuration/?tab=thresholdalert#group-retention-time
