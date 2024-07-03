---
aliases:
- /ja/developers/faq/how-can-i-submit-a-custom-status-check
- /ja/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
- /ja/guides/services_checks/
- /ja/monitors/guide/visualize-your-service-check-in-the-datadog-ui
kind: documentation
title: Service Check
---

## Overview

Service checks allow you to characterize the status of a service to monitor it within Datadog. Service checks monitor the up or down status of the specific service. You are alerted whenever the monitoring Agent fails to connect to that service in a specified number of consecutive checks. For example, you can get an alert any time the monitoring Agent on a Redis host reports three consecutive failed attempts to connect to Redis and collect metrics.

Service checks at the cluster level offer another effective way to monitor distributed or redundant systems that can withstand some failures. Use these alerts for architectures where individual hosts run multiple services, because they can surface the degradation of the service even if the hosts running that service remain available (and would pass a host-level health check).

You can set up monitoring and an alert for when a critical, non-redundant service is lost, or if a cluster is on the verge of failure due to widespread node loss. Other critical alerts could be a drop in request throughput or an increase in request latency.

You might need to set up a service check if an integration does not have one natively or for an internal service that you want to monitor for up or down status.

To use service checks, first set up the check:

{{< whatsnext >}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}Submit a custom Agent Check.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}Submit a Service Check with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Submit a Service Check through Datadog API.{{< /nextlink >}}
{{< /whatsnext >}}

Once the service check is sending data, check out your check summary and set up dashboards, monitors, and alerts:

## Visualize your service check in Datadog

Service checks can be visualized and used in 3 Datadog sections:

- [Check Summary][1]
- [Screenboards][2]
- [Service Check Monitor][3]

### Check summary

The [Check Summary][1] page lists all checks reported across your infrastructure in the past day. Select a check to get insights on the status and tags associated with the check.

{{< img src="developers/service_checks/check_summary.png" alt="Check summary" >}}

### Screenboards

You can visualize service checks with a **Check status** widget in a screenboard:

{{< img src="developers/service_checks/check_status_widget.png" alt="Check status widget" >}}

After clicking on the **Check status** widget icon, the following pop-up appears:

{{< img src="developers/service_checks/check_widget_config.png" alt="Check widget config" >}}

In this form, you can:

- **Check Name**: Select your service check name.
- **Reporting Timeframe**: Select the time frame on which you want to aggregate your status.
- **Scoping**: Select a single check or a cluster of check statuses reported by a single tag value or a tag key.
- **Widget Title**: Set your widget title.

## Service check monitor

Even if you can't graph a service check over time as you would for metrics, you can still monitor it with a [Service Check Monitor][3].

{{< img src="developers/service_checks/service_check_monitor.png" alt="Check monitor" >}}

In this form, you can:

- **Pick a service check**: Select the check status name to monitor.
- **Pick monitor scope**: Select the context for your monitor (including/excluding tags).
- **Set alert conditions**: Choose between a simple check alert or a cluster alert.
- **Configure notifications and automations**: Choose who this monitor should notify and edit the notifications sent (find more about [Datadog notifications][4]).
- **Define permissions and audit notifications**: Edit access permissions for your monitor and set audit notifications.

For more information on creating a service check, see [Service Check Monitor][5].

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors/create/custom
[4]: /ja/monitors/notify/
[5]: /ja/monitors/types/service_check/