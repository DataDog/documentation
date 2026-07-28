---
title: Network Traffic
description: Learn about the domains used for the Observability Pipelines Worker.
disable_toc: false
---

## Overview

This document goes over the domains the Observability Pipelines Worker uses to send and receive data.

## Domains

The domains depend on the [Datadog Site][1] you use. Replace `<DD_SITE>` with `{{< region-param key="dd_site" >}}`.

**Note**: If you are using a firewall, you must add the following domains to the allowlist.

{{< tabs >}}
{{% tab "Linux" %}}

`api.<DD_SITE>:443`
: **Description**: Used for API key and pipeline ID validation at startup, including Live Capture status.

`config.<DD_SITE>:443`
: **Description**: Used for Remote Configuration pipeline configuration delivery, polled every 5 seconds.

`http-intake.logs.datadoghq.com:443`
: **Description**: Used to send the Observability Pipelines Worker's operational logs to Datadog.

`install.<DD_SITE>`
: **Description**: Used by the one-line install script to download and install the Worker package.

`keys.<DD_SITE>`
: **Description**: Used to download and verify the Datadog package signing keys.

`yum.<DD_SITE>`
: **Description**: Datadog RPM repo used to install and upgrade the Worker on RPM-based distributions.

`*.agent.<DD_SITE>:443`
: **Description**: Used to send Observability Pipelines Worker metrics (`pipelines.*`) to Datadog. A wildcard is required because the subdomain changes with each Worker version. For example for Worker version 2.15.1, the domain is `2-15-1-observability-pipelines.agent.datadoghq.com`. See [Pipeline Usage Metrics][1] for information about the metrics.

`obpipeline-intake.<DD_SITE>:443`
: **Description**: Used for Live Capture. See [Live Capture][2].

[1]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[2]: /observability_pipelines/configuration/live_capture/

{{% /tab %}}
{{% tab "Docker, Kubernetes, CloudFormation, ECS Fargate" %}}

`api.<DD_SITE>:443`
: **Description**: Used for API key and pipeline ID validation at startup, including Live Capture status.

`config.<DD_SITE>:443`
: **Description**: Used for Remote Configuration pipeline configuration delivery, polled every 5 seconds.

`http-intake.logs.<DD_SITE>:443`
: **Description**: Used to send the Observability Pipelines Worker's operational logs to Datadog.

`keys.<DD_SITE>`
: **Description**: Used to download and verify the Datadog package signing keys.

`*.agent.<DD_SITE>:443`
: **Description**: Used to send Observability Pipelines Worker metrics (`pipelines.*`) reported to your account. A wildcard is required because the subdomain changes with each Worker version. For example for Worker 2.15.1, the domains is `2-15-1-observability-pipelines.agent.datadoghq.com`. See [Pipeline Usage Metrics][1] for information about the metrics.

`obpipeline-intake.<DD_SITE>:443`
: **Description**: Used for Live Capture. See [Live Capture][2] for more information.

[1]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[2]: /observability_pipelines/configuration/live_capture/

{{% /tab %}}
{{< /tabs >}}

[1]: /getting_started/site/