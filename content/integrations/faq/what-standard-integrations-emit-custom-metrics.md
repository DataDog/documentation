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

Other standard integrations that don’t have a default limit set and also emit custom metrics: 

* [agent_metrics][10]
* [directory][11]
* [linux_proc_extras][10]
* [nagios][12]
* [Prometheus][15]
* [SNMP][9]
* [win32_event_log][13]
* [wmi][14]

[1]: /developers/metrics/custom_metrics/
[2]: /developers/dogstatsd
[3]: /api
[4]: /agent/agent_checks
[5]: /developers/metrics/custom_metrics
[6]: /integrations/activemq
[7]: /integrations/go_expvar
[8]: /help
[9]: /integrations/snmp
[10]: /integrations/system
[11]: /integrations/directory
[12]: /integrations/nagios
[13]: /integrations/windows_service
[14]: /integrations/wmi_check
[15]: /integrations/prometheus
