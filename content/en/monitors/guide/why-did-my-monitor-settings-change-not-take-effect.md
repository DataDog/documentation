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

Datadog keeps monitor groups available in the UI for 24 hours unless the query is changed. Host monitors and service checks that notify on *No Data* are available for 48 hours. If you do not have *No Data* alert settings enabled and your group for a metric monitor stops reporting data, the group persists on the monitor status page until it ages out, though that group stops being evaluated after a short absence. The specific timing for how long the group persists depends on your settings.

For event monitors, however, Datadog also keeps groups for evaluations for at least 24 hours. This means that if a monitor is updated and the groups are changed in the query, some old groups may persist. If you must change the group settings on your event monitor, you may want to clone or create a monitor to reflect your new groups. Alternatively, you can mute them if you would like to maintain the monitor but silence any alerts that would result from the changes.

## Renamed or decommissioned hosts appearing in alerts

When a host is renamed at the operating system (OS) level or decommissioned, the old hostname may continue to appear in monitor alert groups even after the host stops reporting data. This is expected behavior based on host group retention periods, which vary by monitor type:

- **Metric Monitors**: 24 hours
- **Host Monitors**: 48 hours
- **Service Check Monitors**: 48 hours

The old hostname remains in an alert state until the retention period expires, after which it automatically ages out and disappears from the monitor. **Note**: The old hostname will no longer appear in **Infrastructure > Hosts**, but will continue to be evaluated by monitors until the retention window passes.

### Workarounds

If you need to remove the old hostname from alerts before the retention period expires, you can use one of the following workarounds:

- **Mute the specific alert group** for the old hostname while it ages out naturally.
- **Add an exclusion filter** to the monitor query (for example, `-host:old-hostname`) to immediately remove the hostname from evaluation.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}