---
title: Custom Metrics Billing
kind: documentation
aliases:
  - /integrations/faq/what-standard-integrations-emit-custom-metrics/
---

## Overview

If a metric is not submitted from one of the [350+ Datadog integrations](/integrations) it's considered a [custom metric](/developers/metrics/custom_metrics) (Note that some standard integrations [emit custom metrics](#standard-integrations)).

* Billable count is based on average number of `custom metrics / hour` for the month.
* Pro plans include 100 custom metrics per host.
* Enterprise plans include 200 custom metrics per host.
* The number of metrics is averaged across all paid hosts.
* Additional custom metrics packages can be purchased.

These allocations are counted across your entire infrastructure. For example, if you are on the Pro plan and licensed for three hosts, 300 custom metrics are allocated. The 300 custom metrics can be divided equally across each host, or all 300 metrics could be used by a single host.

Using this example, the graphic below shows scenarios that do not exceed the allocated custom metric count:

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300" responsive="true" style="width:80%;">}}

Contact [Sales][2] or your [Customer Success][3] Manager to discuss custom metrics for your account.

## Tracking Custom metrics

Administrative users (those with [Datadog Admin roles](/account_management/team) can see the total custom metrics per hour and the top 500 custom metrics for their account on the [usage details page](https://app.datadoghq.com/account/usage/hourly). See the [Usage Details](/account_management/billing/usage_details) documentation for more information.

For more real-time tracking of the count of custom metrics for a particular metric name, click into the metric name on the Metrics Summary page; it’s listed as “Currently reporting # distinct metrics…” as shown below:

{{< img src="account_management/billing/tracking_metric.mp4" alt="Tracking metric" video="true" responsive="true">}}

## Standard integrations

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
