---
title: Event monitor
kind: documentation
autotocdepth: 3
hideguides: true
customnav: monitortypenav
description: "Monitor events gathered by Datadog"
---

Event monitors allows you to alert when an event matching your query occurs.

{{< img src="monitors/monitor_types/event/event_monitor.png" >}}

1. Select the query and parameters (status, priority, sources and tags) you want
    to monitor.

2. Select the alert gouping

3. Select the **alerting conditions**. The **threshold value** and **timeframe**
    options allows you to set the number of occurence of an event required during
    a timeframe before triggering the monitor.

4. Configure your **notifcation options**. Refer to the [Notifications](#monitor-notifications)
    section of this guide for informations.