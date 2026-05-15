---
title: Adjusting No Data alerts for metric Monitors
description: "Configure No Data alerts properly for metrics with irregular reporting patterns, delays, or backfilled data from cloud integrations."
aliases:
  - /monitors/faq/why-am-i-getting-so-many-no-data-alerts/
  - /monitors/faq/why-am-i-getting-so-many-no-data-alerts-for-my-metric-monitor/
further_reading:
- link: "/monitors/notify/"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "/monitors/downtimes/"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "/monitors/guide/troubleshooting-no-data/"
  tag: "Guide"
  text: "Troubleshooting No Data in monitors"
---

## Overview

When a [metric monitor][1] tracks a metric that doesn't always report at the same frequency, or arrives with a timestamp in the past (such as metrics from [AWS integrations][2]), you may receive `No Data` alerts even when data appears in Datadog. Adjust the following settings in your monitor's **Advanced Options** to reduce false `No Data` alerts.

## Add an evaluation delay

The evaluation delay pushes the monitor's evaluation window back in time, giving delayed metrics time to arrive in Datadog before the monitor evaluates.

{{< img src="monitors/guide/AWS_Monitor_Config.png" alt="AWS monitor config" >}}

This setting is recommended for:
- **AWS and crawler-based metrics**: Set to at least 900 seconds (15 minutes) to account for CloudWatch delays.
- **Other cloud provider metrics**: See [Cloud metric delays][4] for provider-specific recommendations.

## Disable Require a Full Window of Data

The **Require a Full Window of Data** setting controls whether the monitor waits for a complete evaluation window before alerting. For sparse or backfilled metrics, requiring a full window can cause the monitor to skip evaluations or report `No Data`.

{{< img src="monitors/guide/require_full_window.png" alt="Monitor Advanced Options - Require a Full Window of Data setting in the Datadog UI" style="width:80%;" >}}

- **Do not require** (recommended for sparse or delayed metrics): The monitor evaluates on partial data, reducing false `No Data` alerts.
- **Require**: The monitor waits for a full window of data before evaluating. This is appropriate for metrics reported by the Datadog Agent at a consistent frequency.

## Install the Datadog Agent on cloud hosts

Cloud metrics have varying delays depending on the provider. To receive metrics with a smaller delay, install the Datadog Agent directly on your cloud hosts. See [installing the Datadog Agent on cloud instances][5] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/types/metric/
[2]: /integrations/amazon_web_services/
[3]: /monitors/types/metric/?tab=threshold#advanced-alert-conditions
[4]: /integrations/guide/cloud-metric-delay/
[5]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
