---
title: Observability Pipelines
disable_toc: false
further_reading:
- link: /logs/log_collection/
  tag: documentation
  text: Log collection and integrations
- link: data_security/logs/
  tag: documentation
  text: Log Management data security
- link: /sensitive_data_scanner/
  tag: documentation
  text: Sensitive Data Scanner
- link: "/agent/configuration/dual-shipping/#yaml-configuration"
  tag: documentation
  text: Dual shipping with Observability Pipelines
- link: "https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/"
  tag: blog
  text: Redact sensitive data from your logs on-prem by using Observability Pipelines
- link: "https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/"
  tag: blog
  text: Dual ship logs with Datadog Observability Pipelines
- link: "https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/"
  tag: blog
  text: Control your log volumes with Datadog Observability Pipelines
- link: "https://www.datadoghq.com/blog/observability-pipelines-archiving/"
  tag: blog
  text: Archive your logs with Observability Pipelines for a simple and affordable migration to Datadog
- link: "https://www.datadoghq.com/blog/observability-pipelines/"
  tag: blog
  text: Aggregate, process, and route logs easily with Datadog Observability Pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
Datadog recommends you update Observability Pipelines Worker (OPW) with every minor and patch release, or, at a minimum, monthly. <br><br> Upgrading to a major OPW version and keeping it updated is the only supported way to get the latest OPW functionality, fixes, and security updates.
</div>

## Overview

{{< img src="observability_pipelines/op_marketecture_04182024.png" alt="A graphic showing different data sources on the left that flows into three hexagons named transform, reduce, and route, with arrows pointing to different destinations for the modified data" style="width:100%;" >}}

Observability Pipelines allows you to collect, process, and route logs in your own infrastructure. It comes with out-of-the-box templates so that you can easily build and deploy pipelines. The templates are purpose-built for the following use cases:

- Log volume control: Cut down on your log volume before it leaves your infrastructure or network.
- Dual ship logs: Send copies of your logs to multiple destinations.
- Split logs: Send your logs to different destinations based on your use case. For example, you can send DevOps logs to Datadog and security logs to a security vendor.
- Archive logs: Send logs to a log vendor and to an archive in Datadog rehydratable format.
- Sensitive data redaction: Remove sensitive data from your logs before they are routed outside of your infrastructure.

The Observability Pipelines Worker is the software that runs in your infrastructure. It aggregates and centrally processes and routes your logs based on the selected use case.

The Datadog UI provides a control plane to manage your Observability Pipelines Workers. You can build and edit pipelines, deploy pipeline changes to your Workers, and monitor your pipelines to evaluate the health of your pipelines.

## Get started

1. [Set up bootstrap options for the Observability Pipelines Worker][1].
1. Navigate to [Observability Pipelines][2].
1. Select a use case:
    - [Log volume control][3]
    - [Dual ship logs][4]
    - [Split logs][5]
    - [Archive logs to Datadog Archives][6]
    - [Sensitive data redaction][7]
1. Enable monitors.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/setup_opw/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /observability_pipelines/log_volume_control/
[4]: /observability_pipelines/dual_ship_logs/
[5]: /observability_pipelines/split_logs/
[6]: /observability_pipelines/archive_logs/
[7]: /observability_pipelines/sensitive_data_redaction/
