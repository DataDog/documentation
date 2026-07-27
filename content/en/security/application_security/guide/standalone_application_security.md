---
title: Set Up App and API Protection Without APM or Infrastructure Monitoring
disable_toc: false
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

Datadog App and API Protection (AAP) is built on top of [APM][3] and runs alongside [Infrastructure Monitoring][7] by default. While Datadog recommends using AAP together with APM and Infrastructure Monitoring to adopt DevSecOps practices, you can also run AAP on its own. This configuration is referred to as Standalone App and API Protection.

Running standalone allows to be billed primarily for App and API Protection. Some APM intake is still present to support AAP features (for example, security traces), and is expected to appear on your bill.

This guide explains how to disable APM tracing and infrastructure monitoring.

## Prerequisites

This guide assumes you have the following:

- **Datadog Agent:** [Install the Datadog Agent][6] and configure it for your application's operating system, container, cloud, or virtual environment. Disabling Infrastructure Monitoring requires Datadog Agent version 7.77.0 or newer.
- **Supported SDK:** The Datadog SDK used by your application or service supports App and API Protection. For more details, see the guide for [App and API Protection][4].

## Compatibility

Standalone App and API Protection is supported for the following SDK versions:

| Language | Version |
| -------- | ------- |
| .NET     | 3.12.0  |
| Go       | 1.73.0  |
| Java     | 1.47.0  |
| Node.js  | 5.40.0  |
| PHP      | 1.8.0   |
| Python   | 3.2.0   |
| Ruby     | 2.13.0  |

## Setup

Standalone App and API Protection requires two pieces of configuration: disabling Infrastructure Monitoring on the Datadog Agent, and disabling APM tracing on the SDK while enabling AAP.

### Disable Infrastructure Monitoring on the Datadog Agent

Standalone App and API Protection uses the same Datadog Agent installation as APM. For installation steps, see [Install the Datadog Agent][6].

To disable Infrastructure Monitoring, set the Datadog Agent infrastructure mode to `none` (requires Datadog Agent 7.77.0 or newer) using either:

- The `DD_INFRASTRUCTURE_MODE=none` environment variable
- The `infrastructure_mode: none` setting in the `datadog.yaml` configuration file

For more details, see [Datadog Agent infrastructure mode][8].

### Disable APM tracing and enable AAP on the service

On the instrumented service, set the following environment variables:

- `DD_APM_TRACING_ENABLED=false`
- `DD_APPSEC_ENABLED=true`

`DD_APM_TRACING_ENABLED=false` disabled APM tracing and limits the amount of APM data sent to the minimum required by App and API Protection. This environment variable can be combined with other [App and API Protection configuration options][4].


[1]: /security/workload_protection/
[2]: /security/application_security/code_security/
[3]: /tracing/
[4]: /security/application_security/setup/
[5]: /security/application_security/code_security/setup/
[6]: /agent/
[7]: /infrastructure/
[8]: /agent/configuration/infrastructure-modes/
