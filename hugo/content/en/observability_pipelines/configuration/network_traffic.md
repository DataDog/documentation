---
title: Network Traffic
description: Learn about the domains used for the Observability Pipelines Worker.
disable_toc: false
---

## Overview

The Observability Pipelines Worker communicates with Datadog over HTTPS on port 443 to validate credentials, receive pipeline configurations, and send Worker logs and metrics to Datadog. If your environment restricts outbound traffic, allowlist the domains listed on this page.

## Domains

The domains depend on the [Datadog Site][1] you use. Replace `<DD_SITE>` with `{{< region-param key="dd_site" >}}`.


{{< tabs >}}
{{% tab "Linux" %}}

`api.<DD_SITE>:443`
: **Description**: Used for API key and pipeline ID validation at startup, including Live Capture status.

`config.<DD_SITE>:443`
: **Description**: Used for Remote Configuration pipeline configuration delivery, polled every 5 seconds.

`http-intake.logs.<DD_SITE>:443`
: **Description**: Used to send the Observability Pipelines Worker's operational logs to Datadog.

`*.agent.<DD_SITE>:443`
: **Description**: Used to send Observability Pipelines Worker metrics (`pipelines.*`) to Datadog. A wildcard is required because the subdomain changes with each Worker version. For example, for Worker version 2.15.1, the domain is `2-15-1-observability-pipelines.agent.datadoghq.com`. See [Pipeline Usage Metrics][1] for information about the metrics.

`obpipeline-intake.<DD_SITE>:443`
: **Description**: Used for Live Capture. See [Live Capture permissions][2] for more information.

`install.datadoghq.com:443`
: **Description**: Used by the one-line install script to download and install the Worker package.

`keys.datadoghq.com:443`
: **Description**: Used to download and verify the Datadog package signing keys.

`apt.datadoghq.com:443`
: **Description**: Datadog APT repo used to install and upgrade the Worker on Debian-based distributions.

`yum.datadoghq.com:443`
: **Description**: Datadog RPM repo used to install and upgrade the Worker on RPM-based distributions.

### Use wildcards in domains

Most enterprise firewalls support wildcard rules. If you prefer to allowlist by wildcard instead of listing each domain explicitly, add the following:

`*.<DD_SITE>:443`
: **Description**: Matches the following domains:<br>- `api.<DD_SITE>`<br>- `config.<DD_SITE>`<br>- `obpipeline-intake.<DD_SITE>`

`*.logs.<DD_SITE>:443`
: **Description**: Matches `http-intake.logs.<DD_SITE>`.

`*.datadoghq.com:443`
: **Description**: Matches the following domains:<br>- `install.datadoghq.com:443`<br>- `keys.datadoghq.com:443`<br>- `yum.datadoghq.com:443`<br>- `apt.datadoghq.com:443`

`*.agent.<DD_SITE>:443`
: **Description**: Matches the version-prefixed Worker metrics domain, such as `2-15-1-observability-pipelines.agent.datadoghq.com`.

[1]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[2]: /observability_pipelines/configuration/live_capture/#permissions

{{% /tab %}}
{{% tab "Docker, Kubernetes, CloudFormation, ECS Fargate" %}}

`api.<DD_SITE>:443`
: **Description**: Used for API key and pipeline ID validation at startup, including Live Capture status.

`config.<DD_SITE>:443`
: **Description**: Used for Remote Configuration pipeline configuration delivery, polled every 5 seconds.

`http-intake.logs.<DD_SITE>:443`
: **Description**: Used to send the Observability Pipelines Worker's operational logs to Datadog.

`*.agent.<DD_SITE>:443`
: **Description**: Used to send Observability Pipelines Worker metrics (`pipelines.*`) reported to your account. A wildcard is required because the subdomain changes with each Worker version. For example for Worker 2.15.1, the domain is `2-15-1-observability-pipelines.agent.datadoghq.com`. See [Pipeline Usage Metrics][1] for information about the metrics.

`obpipeline-intake.<DD_SITE>:443`
: **Description**: Used for Live Capture. See [Live Capture permissions][2] for more information.

### Use wildcards in domains

Most enterprise firewalls support wildcard rules. If you prefer to allowlist by wildcard instead of listing each domain explicitly:

`*.<DD_SITE>:443`
: **Description**: Matches the following domains:<br>- `api.<DD_SITE>`<br>- `config.<DD_SITE>`<br>- `obpipeline-intake.<DD_SITE>`

`*.logs.<DD_SITE>:443`
: **Description**: Matches `http-intake.logs.<DD_SITE>`.

`*.agent.<DD_SITE>:443`
: **Description**: Matches the version-prefixed Worker metrics domain, such as `2-15-1-observability-pipelines.agent.datadoghq.com`.

[1]: /observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[2]: /observability_pipelines/configuration/live_capture/#permissions

{{% /tab %}}
{{< /tabs >}}

[1]: /getting_started/site/