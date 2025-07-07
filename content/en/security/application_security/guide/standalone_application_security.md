---
title: Set Up App and API Protection Products without using APM
disable_toc: false
---

Datadog AAP is built on top of [APM][3]. While Datadog recommends using AAP with APM and adopting DevSecOps practices, you can also use these security products without using APM. This configuration is referred to as Standalone App and API Protection. This guide explains how to set up Standalone App and API Protection.

## Prerequisites

This guide assumes you have the following:

- **Datadog Agent:** [Install the Datadog Agent][6] and configure it for your application's operating system, container, cloud, or virtual environment.
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


Set up the Datadog Agent using the standard method for APM or App and API Protection setup, but set up the Tracing Library by adding the `DD_APM_TRACING_ENABLED=false` environment variable to the service that runs the Tracing Library.

This environment variable will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products. The environment variable can then be combined with environment variables to enable App and API Protection.

For App and API Protection, add the `DD_APM_TRACING_ENABLED=false DD_APPSEC_ENABLED=true` environment variable.


[1]: /security/workload_protection/
[2]: /security/application_security/code_security/
[3]: /tracing/
[4]: /security/application_security/setup/
[5]: /security/application_security/code_security/setup/
[6]: /agent/
