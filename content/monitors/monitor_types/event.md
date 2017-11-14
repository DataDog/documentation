---
title: Event monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Monitor events gathered by Datadog"
---

## Overview

Event monitors allows you to alert when an event matching your query occurs.

{{< img src="monitors/monitor_types/event/event_monitor.png" alt="event monitor" responsive="true" >}}

1. Select the query and parameters (status, priority, sources and tags) you want
    to monitor.

2. Select the alert gouping

3. Select the **alerting conditions**. The **threshold value** and **timeframe**
    options allows you to set the number of occurence of an event required during
    a timeframe before triggering the monitor.

4. Configure your **notifcation options**. Refer to the [Notifications](#monitor-notifications)
    section of this guide for informations.


## Using event tags in Event Monitors

In Event Monitors, you can use the tags sent with events to identify events and customize the actions and messages of the Monitor. First, define the search parameters for the full text event search.  If you are looking for a specific tag, you can include this in the search as well.  For example:
My Example Event #example-tag

Note:  You may have to escape special characters using a forward slash when searching.  For example, if you wanted to search for the string "my_tag_name", you would need to use "my/_tag/_name"

{{< img src="monitors/monitor_types/event/define_event.png" alt="define_event" responsive="true" >}}

You can then use event.tags and event.tags.tagname to retrieve the values of your tags in markdown.  For example:

{{< img src="monitors/monitor_types/event/whats_happening.png" alt="whats_happening" responsive="true" >}}

You should then see that your alert triggers when any matching events are found in Datadog and the tags appear in the message.

{{< img src="monitors/monitor_types/event/triggered_event.png" alt="triggered_event" responsive="true" >}}