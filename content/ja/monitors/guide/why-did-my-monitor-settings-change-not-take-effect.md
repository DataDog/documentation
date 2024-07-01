---
title: Monitor settings changes not taking effect
aliases:
- /monitors/faq/why-did-my-monitor-settings-change-not-take-effect
---

Datadog keeps monitor groups available in the UI for 24 hours unless the query is changed. Host monitors and service checks that notify on on *No Data* are available for 48 hours. If you do not have *No Data* alert settings enabled and your group for a metric monitor stops reporting data, the group persists on the monitor status page until it ages out, though that group stops being evaluated after a short absence. The specific timing for how long the group persists depends on your settings.

For event monitors, however, Datadog also keeps groups for evaluations for at least 24 hours. This means that if a monitor is updated and the groups are changed in the query, some old groups may persist. If you must change the group settings on your event monitor, you may want to clone or create a new monitor to reflect your new groups. Alternatively, you can mute them if you would like to maintain the monitor but silence any alerts that would result from the changes.
