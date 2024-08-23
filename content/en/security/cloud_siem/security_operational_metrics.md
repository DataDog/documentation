---
title: Security Operational Metrics
disable_toc: false
further_reading:
- link: "security/cloud_siem/investigate_security_signals"
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

Cloud SIEM provides security operational metrics to help you determine your security team's effectiveness in responding to and resolving security threats to your cloud environments. These metrics are shown in the out-of-the-box [Cloud SIEM dashboard][1] and also sent in the Cloud SIEM [weekly digest reports][2]. You can also create dashboards and monitors for them.

[IMAGE]

## Operational Metrics

`datadog.security.siem_signal.time_to_detect`
: **Name**: Mean Time to Detect (MTTD)
: **Description**:The average time from when a matching log is triggered to when a signal is generated.

`datadog.security.siem_signal.time_to_acknowledge`
: **Name**:  Mean Time to Acknowledge (MTTA)
: **Description**: The average time from when a signal is triggered to when an investigation on the signal begins.

`datadog.security.siem_signal.time_to_resolve`
: **Name**: Mean Time to Resolve (MTTR)
: **Description**: The average time it takes to close a signal from the time when you are first notified of the detection.

## How the metrics are calculated

The MTTD, MTTA, and MTTR metrics are calculated based on these timestamps:

1. The timestamp (`T0`) of the log that triggered a security signal.
1. The timestamp (`T1`) of when the signal was generated.
1. The timestamp (`T3`) of when the signal status was changed to `under_review`.
1. The timestamp (`T4`) of when the signal status was changed to `archived`.

| Metric                                                                                | How the metric is calculated |
| ------------------------------------------------------------------------------------- | ---------------------------- |
| Mean Time to Detect (MTTD)<br>`datadog.security.siem_signal.time_to_detect`           | `T1 - T0`                    |
| Mean Time to Acknowledge (MTTA)<br>`datadog.security.siem_signal.time_to_acknowledge` | `T2 - T1`                    |
| Mean Time to Resolve (MTTR)<br>`datadog.security.siem_signal.time_to_resolve`         | `T3 - T1`                    |

## Explore, visualize, and monitor the metrics

Use the [Metrics Summary][3] to view details about the operational metrics, such as the tags and assets (dashboards, notebooks, monitors, SLOs) that are using those metrics.

Use tags to filter the metrics to specific teams, sources, and environments and then create [dashboards][4] for those metrics to visualize the data. You can also create [monitors][5] to alert you if the metrics exceed a specified threshold.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/30378/cloud-siem-overview
[2]: https://app.datadoghq.com/security/configuration/reports
[3]: https://app.datadoghq.com/metric/summary?filter=datadog.security.siem&window=604800
[4]: /getting_started/dashboards/
[5]: /getting_started/monitors/