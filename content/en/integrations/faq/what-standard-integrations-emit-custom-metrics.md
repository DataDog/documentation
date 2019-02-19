---
title: What standard integrations emit custom metrics?
kind: faq
---

In general, [custom metrics][1] are defined as any single, unique combination of a metric name, host, and tag that are sent using [statsd, DogStatsD][2], via [API][3], or through [extensions][4] made to the Datadog Agent.  
[Further details with examples on how we count a custom metric][5]).  
However, certain standard integrations can also emit custom metrics as specified below.

Standard integrations that are limited to 350 metrics by default and emit custom metrics:

* [ActiveMQ_XML][6]
* [Go_expvar][7]

If you'd like to increase this limit, email [us][8]!

Other standard integrations that don't have a default limit set and also emit custom metrics: 

* [agent_metrics][9]
* [directory][10]
* [linux_proc_extras][9]
* [nagios][11]
* [Prometheus][12]
* [SNMP][13]
* [win32_event_log][14]
* [wmi][15]

[1]: /developers/metrics/custom_metrics
[2]: /developers/dogstatsd
[3]: /api
[4]: /agent/agent_checks
[5]: /developers/metrics/custom_metrics
[6]: /integrations/activemq
[7]: /integrations/go_expvar
[8]: /help
[9]: /integrations/system
[10]: /integrations/directory
[11]: /integrations/nagios
[12]: /integrations/prometheus
[13]: /integrations/snmp
[14]: /integrations/windows_service
[15]: /integrations/wmi_check
