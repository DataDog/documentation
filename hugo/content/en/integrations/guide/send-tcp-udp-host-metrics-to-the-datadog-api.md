---
title: Send TCP/UDP host metrics to the Datadog API

aliases:
  - /integrations/faq/how-to-send-tcp-udp-host-metrics-via-the-datadog-api
---

To get insights about your TCP/UDP connections, you can gather statistics through a Crontab Entry and forward them to your Datadog platform.

To do this, use Linux sockstats located in: /proc/net/sockstat.

Here is an example code snippet to get you started:

https://gist.github.com/sage-oli-wood/70e0931f037ea0aac132

This submits your data to Datadog through an HTTP POST.

A more proper way to do this would be to send metrics and events using DogStatsD. You may adapt your cron job to forward your data locally in UDP to your Agent, find more here.

You retrieve from this:

* TCP: 

||||
|:---|:---|:---|
|in use|  total established connections |  integer (number)|
|Orphan|  Orphaned tcp connections |
(not attached to any user file handle) | integer (number)|
|TW | TIME_WAIT connections  | ineger (millisec )|
|Alloc|   TCP sockets allocated  |  ( All type for example, ESTABLISH, CLOSE_WAIT, TIME_WAIT, etc)|
|mem| total memory for TCP socket | integer (KiloBytes)|

* UDP: 

||||
|:---|:---|:---|
|inuse|   total established connections  | integer|
|mem |total memory for UDP socket | integer (KB)|

