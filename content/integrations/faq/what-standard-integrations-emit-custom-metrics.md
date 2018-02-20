---
title: What standard integrations emit custom metrics?
kind: faq
---

In general, [custom metrics](/getting_started/custom_metrics/) are defined as any single, unique combination of a metric name, host, and tag that are sent using [statsd, DogStatsD](/developers/dogstatsd), via [API](/api), or through [extensions](/developers/agent_checks) made to the Datadog agent.  
[Further details with examples on how we count a custom metric](/getting_started/custom_metrics)).  
However, certain standard integrations can also emit custom metrics as specified below.

Standard integrations that are limited to 350 metrics by default and emit custom metrics: 

* [ActiveMQ_XML](/integrations/activemq)
* [Go_expvar](/integrations/go_expvar)

If you'd like to increase this limit, email [us](/help)!

Other standard integrations that don’t have a default limit set and also emit custom metrics: 

* [SNMP](/integrations/snmp)
* [agent_metrics](/integrations/system)
* [directory](/integrations/directory)
* [linux_proc_extras](/integrations/system)
* [nagios](/integrations/nagios)
* [win32_event_log](/integrations/windows_service)
* [wmi](/integrations/wmi_check)