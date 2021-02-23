---
title: Why Did My Monitor Settings Change Not Take Effect?
kind: faq

---

Datadog keeps monitor groups available in the UI for 24 hours.  If you do not have *No Data* alert settings enabled and your group for a metric monitor stops reporting data, it will persist on the monitor status page until it ages out, though that group will stop being evaluated after a short absence (specific timing depends on your settings).

For event monitors, however, Datadog also keeps groups for evaluations for at least 24 hours. This means that if a monitor is updated and the groups are changed in the query, some old groups may persist. If you must change the group settings on your event monitor, you may want clone or create a new monitor to reflect your new groups.  Alternatively, you can mute them if you would like to maintain the monitor but silence any alerts that would result from the changes.

For log monitors, Datadog keeps monitor groups available in the UI for 4 hours.
