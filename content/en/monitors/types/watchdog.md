---
title: Watchdog Monitor
kind: documentation
description: "Algorithmically detects application and infrastructure issues."
aliases:
- /monitors/monitor_types/watchdog
- /monitors/create/types/watchdog/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/watchdog/"
  tag: "Documentation"
  text: "Watchdog, algorithmically detect application and infrastructure issues"
---

## Overview

[Watchdog][1] is an algorithmic feature for APM, Infrastructure, and Logs. It automatically detects potential issues by continuously observing trends and patterns in metrics and logs, and looking for atypical behavior.

## Monitor creation

To create a [Watchdog monitor][2] in Datadog, use the main navigation: *Monitors --> New Monitor --> Watchdog*.

### Select alert type

In this section, choose between an APM, Infrastructure, or Logs alert:

{{< tabs >}}
{{% tab "APM" %}}

An APM alert is created when Watchdog detects anomalous behavior on your system's services or their child resources.

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-apm2.png" alt="Configuring a Watchdog Monitor on APM" style="width:80%;">}}

### Select sources {#select-sources-1}

Select the scope to be alerted on by configuring:

* The type of Watchdog anomaly: Error Rates, Latency, Hits, or any APM alert
* The value for APM primary tags (see the [Set primary tags to scope][1] page for instructions to configure APM primary and second primary tags)
* The [APM service][2] (choose `Any services` to monitor all services)
* The [APM resource][3] of a service (choose `*` to monitor all resources of a service)
* The dimensions you want to [group notifications by][4]

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over the selected time frame.

[1]: /tracing/guide/setting_primary_tags_to_scope/#environment
[2]: /tracing/services/service_page/
[3]: /tracing/services/resource_page/
[4]: /monitors/configuration/?tab=thresholdalert#alert-grouping
{{% /tab %}}
{{% tab "Infrastructure" %}}

{{< img src="/monitors/monitor_types/watchdog/watchdog-monitor-infra.png" alt="Configuring a Watchdog Monitor on Infrastructure" style="width:80%;">}}

### Select sources {#select-sources-2}

Select the scope to be alerted on by configuring:

* The Infrastructure integration to cover (select `Any Infrastructure alert` to cover them all). See the [Watchdog overview][1] for a full list of integrations covered by Watchdog infrastructure)
* The Tags available for the selected integration
* The dimensions you want to [group notifications by][2]

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over the selected time frame.

[1]: /watchdog/#overview
[2]: /monitors/configuration/?tab=thresholdalert#alert-grouping
{{% /tab %}}
{{% tab "Logs" %}}

A logs alert indicates that either a new pattern of error logs has been detected or that there has been an increase in an existing pattern of error logs.

{{< img src="/monitors/monitor_types/watchdog/log_anomaly_monitor-2.png" alt="The Watchdog monitor's edit page showing the alert category set to logs, alert type as log anomaly, env set to production, service set to ad-server, and the monitor's title is Anomaly Detected in Production Ad Server" style="width:55%;">}}

### Select sources {#select-sources-3}

Select the scope to be alerted on by configuring:

* The environment (leave empty to alert on all environments). These values are derived from the `env` tag in your logs
* The service (leave empty to alert on all services). These values are derived from the `service` [reserved attribute][2] in your logs
* The log source (leave empty to alert on all sources). These values are derived from the `source` [reserved attribute][2] in your logs
* The log status (leave empty to alert on all status). These values are derived from the `status` [reserved attribute][2] in your logs
* The log anomaly type (`new Error` or `Spike in existing logs`) determines whether the anomaly describes a new pattern of error logs or an increase in an existing pattern of error logs
* The dimensions you want to [group notifications by][1]

After your selections are made, the graph at the top of the monitor creation page displays the matching Watchdog events over the selected time frame.

[1]: /monitors/configuration/?tab=thresholdalert#alert-grouping
[2]: /logs/log_configuration/attributes_naming_convention/#reserved-attributes
{{% /tab %}}
{{< /tabs >}}

### Notifications

For detailed instructions on the **Say what's happening** and **Notify your team** sections, see the [Notifications][3] page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog/
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /monitors/notify/
