---
title: Set Up App and API Protection Products without using APM
disable_toc: false
---

Datadog AAP is built on top of [APM][3]. While Datadog recommends using AAP with APM and adopting DevSecOps practices, you can also use these security products without using APM. This configuration is referred to as Standalone App and API Protection. This guide explains how to set up Standalone App and API Protection.

## Prerequisites

This guide assumes you have the following:

- **Datadog Agent:** [Install the Datadog Agent][6] and configure it for your application's operating system, container, cloud, or virtual environment. [Infrastructure Monitoring][7] is enabled by default in the Datadog Agent; disabling it requires version 7.77.0 or newer.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports App and API Protection. For more details, see the guide for [App and API Protection][4].

## Compatibility

Standalone App and API Protection is supported for the following tracing library versions:

| Language | Version |
| -------- | ------- |
| .NET     | 3.12.0  |
| Go       | N/A     |
| Java     | 1.47.0  |
| Node.js  | 5.40.0  |
| PHP      | N/A     |
| Python   | 3.2.0   |
| Ruby     | 2.13.0  |

## Setup

### Agent configuration

Standalone App and API Protection uses the same Datadog Agent setup as APM. For more details, see the guide for [installing the Datadog Agent][6].

To disable Infrastructure Monitoring, set the Datadog Agent to `none` infrastructure mode using either:

- The `DD_INFRASTRUCTURE_MODE=none` environment variable, or
- The `infrastructure_mode: none` setting in the `datadog.yaml` configuration file.

For more details, see the configuration page for [the Datadog Agent infrastructure mode][8].

### Tracing library configuration

Standalone App and API Protection is configured at the tracing library level using the following environment variables on the instrumented service: `DD_APM_TRACING_ENABLED=false DD_APPSEC_ENABLED=true`.

`DD_APM_TRACING_ENABLED=false` limits the amount of APM data sent to the minimum required by App and API Protection. The environment variable can be combined with other [App and API Protection configuration options][4].


[1]: /security/workload_protection/
[2]: /security/application_security/code_security/
[3]: /tracing/
[4]: /security/application_security/setup/
[5]: /security/application_security/code_security/setup/
[6]: /agent/
[7]: /infrastructure/
[8]: /agent/configuration/infrastructure-modes/
