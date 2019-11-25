---
title: Custom Metrics Billing
kind: documentation
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

## Overview

In general, [custom metrics][1] refers to any metrics that are not part of the regular integration suite, for example using custom checks or API-level metrics in your application stack.

* Billable count is based on average number of `custom metrics / hour` for the month.
* Pro plans include 100 custom metrics per host.
* Enterprise plans include 200 custom metrics per host.
* The number of metrics is averaged across all paid hosts.
* Additional custom metrics packages can be purchased.

Contact [Sales][2] or your [Customer Success][3] Manager to discuss custom metrics for your account.

### Standard integrations
The following standard integrations can potentially emit custom metrics.

Integrations limited to 350 custom metrics by default:

* [ActiveMQ XML][4]
* [Go-Expvar][5]

Integrations with no default limit:

* [Agent Metrics][6]
* [Directory][7]
* [Linux Proc Extras][8]
* [Nagios][9]
* [PDH Check][10]
* [Prometheus][11]
* [SNMP][12]
* [Windows Services][13]
* [WMI][14]

Many other integrations can be configured to collect custom metrics, for example:

* [MySQL][15]
* [Oracle][16]
* [Postgres][17]
* [SQL Server][18]

## Troubleshooting
For technical questions, contact [Datadog support][19].

For billing questions, contact your [Customer Success][3] Manager.

[1]: /developers/metrics/custom_metrics
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: /integrations/activemq/#activemq-xml-integration
[5]: /integrations/go_expvar
[6]: /integrations/agent_metrics
[7]: /integrations/directory
[8]: /integrations/linux_proc_extras
[9]: /integrations/nagios
[10]: /integrations/pdh_check
[11]: /integrations/prometheus
[12]: /integrations/snmp
[13]: /integrations/windows_service
[14]: /integrations/wmi_check
[15]: /integrations/mysql
[16]: /integrations/oracle
[17]: /integrations/postgres
[18]: /integrations/sqlserver
[19]: /help
