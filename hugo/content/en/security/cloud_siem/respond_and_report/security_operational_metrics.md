---
title: Security Operational Metrics
disable_toc: false
aliases:
  - /security/cloud_siem/security_operational_metrics
further_reading:
- link: "security/cloud_siem/triage_and_investigate/investigate_security_signals"
  tag: "Documentation"
  text: "Investigate Cloud SIEM Security Signals"
- link: "getting_started/dashboards"
  tag: "Documentation"
  text: "Getting started with dashboards"
- link: "getting_started/monitors"
  tag: "Documentation"
  text: "Getting started with monitors"
- link: "metrics/summary/"
  tag: "Documentation"
  text: "Learn more about the Metrics Summary"
---

## Overview

Cloud SIEM provides security operational metrics to help you determine the effectiveness of your team in responding to and resolving security threats to your cloud environments. These metrics are shown in the out-of-the-box [Cloud SIEM dashboard][1] and are sent in the Cloud SIEM [weekly digest reports][2]. You can also create dashboards and monitors for them.

{{< img src="security/security_monitoring/secops_metrics.png" alt="The security operational metrics section of the Cloud SIEM Overview dashboard" style="width:100%;" >}}

## Operational metrics

`datadog.security.siem_signal.time_to_detect`
: **Name**: Time to Detect (TTD)
: **Description**: The time (in seconds) between when a matching log is triggered and when a signal is generated.
: **Metric type**: [DISTRIBUTION][3]

`datadog.security.siem_signal.time_to_acknowledge`
: **Name**: Time to Acknowledge (TTA)
: **Description**: The time (in seconds) between when a signal is triggered and when an investigation on the signal begins.
: **Metric type**: [DISTRIBUTION][3]

`datadog.security.siem_signal.time_to_investigate`
: **Name**: Time to Investigate (TTI)
: **Description**: The time (in seconds) between when an investigation on the signal begins and when the signal is archived.
: **Metric type**: [DISTRIBUTION][3]

`datadog.security.siem_signal.time_to_resolve`
: **Name**: Time to Resolve (TTR)
: **Description**: The time (in seconds) it takes to archive a signal starting from the time when you are first notified of the detection.
: **Metric type**: [DISTRIBUTION][3]

## How the metrics are calculated

The TTD, TTA, and TTR metrics are calculated based on these timestamps:

1. The timestamp (`T0`) of the log that triggers a security signal.
1. The timestamp (`T1`) of when the signal is generated.
1. The timestamp (`T2`) of when the signal status is changed to `under_review`.
1. The timestamp (`T3`) of when the signal status is changed to `archived`.

| Metric                                                                          | How the metric is calculated |
|---------------------------------------------------------------------------------|------------------------------|
| Time to Detect (TTD)<br>`datadog.security.siem_signal.time_to_detect`           | `T1 - T0`                    |
| Time to Acknowledge (TTA)<br>`datadog.security.siem_signal.time_to_acknowledge` | `T2 - T1`                    |
| Time to Investigate (TTI)<br>`datadog.security.siem_signal.time_to_investigate` | `T3 - T2`                    |
| Time to Resolve (TTR)<br>`datadog.security.siem_signal.time_to_resolve`         | `T3 - T1`                    |

## Explore, visualize, and monitor the metrics

Use the [Metrics Summary][3] to see metadata and tags for the operational metrics. You can also see which dashboards, notebooks, monitors, and SLOs are using those metrics.

Use tags to filter the metrics to specific teams, sources, and environments. You can then create [dashboards][5] for those metrics to visualize the data or create [monitors][6] to alert you if the metrics exceed a specified threshold.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30378/cloud-siem-overview
[2]: https://app.datadoghq.com/security/configuration/reports
[3]: /metrics/types/?tab=distribution#metric-types
[4]: https://app.datadoghq.com/metric/summary?filter=datadog.security.siem&window=604800
[5]: /getting_started/dashboards/
[6]: /getting_started/monitors/
