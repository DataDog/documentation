---
title: Custom Metrics Billing
kind: faq
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

## Overview

In general, [custom metrics][1] refers to any metrics that are not part of the regular integration suite, for example using custom checks or API-level metrics in your application stack.

Pro plans include 100 custom metrics per host and Enterprise plans include 200 custom metrics per host. This number is averaged across all paid hosts. Additional custom metrics packages can be purchased.

Contact [Sales][2] or your [Customer Success][3] Manager to discuss custom metrics for your account.

### Standard integrations
Some standard integrations can potentially emit custom metrics.

Integrations limited to 350 metrics by default and emit custom metrics:

* [ActiveMQ][4]
* [Go-Expvar][5]

Integrations with no default limit that emit custom metrics: 

* [Agent Metrics][6]
* [Directory][7]
* [Linux Proc Extras][8]
* [Nagios][9]
* [Prometheus][10]
* [SNMP][11]
* [Windows Services][12]
* [WMI][13]

## Troubleshooting
For technical questions, contact [Datadog support][14].

For billing questions, contact your [Customer Success][3] Manager.

[1]: /developers/metrics/custom_metrics
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /integrations/activemq
[5]: /integrations/go_expvar
[6]: /integrations/agent_metrics
[7]: /integrations/directory
[8]: /integrations/linux_proc_extras
[9]: /integrations/nagios
[10]: /integrations/prometheus
[11]: /integrations/snmp
[12]: /integrations/windows_service
[13]: /integrations/wmi_check
[14]: /help
