---
title: Set Up Application Security Products without using APM
disable_toc: false
---

Datadog ASM [Threat Management][1] and [Code Security][2] are built on top of [APM][3]. While Datadog recommends using these security products with APM and adopting DevSecOps practices, you can also use these security products without using APM. This configuration is referred to as Standalone Application Security. This guide explains how to set up Standalone Application Security.

## Prerequisites

This guide assumes you have the following:

- **Datadog Agent installation:** The Datadog Agent is installed and configured for your application’s operating system, container, cloud, or virtual environment.
- **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports application security. For more details, see the guides for [Application Threat Management][4] or [Code Security][5].

## Compatibility

Standalone Application Security is currently supported for the following tracing library versions:

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


Set up the Datadog Agent using the standard method for APM or Application Security setup, but set up the Tracing Library by adding the `DD_APM_TRACING_ENABLED=false` environment variable to the service that runs the Tracing Library.

This environment variable will reduce the amount of APM data sent to Datadog to the minimum required by Application Security products. The environment variable can then be combined with environment variables to enable ASM Threat Management or Code Security.

For ASM Threat Management, add the `DD_APM_TRACING_ENABLED=false DD_APPSEC_ENABLED=true` environment variable.

For Code Security, add the `DD_APM_TRACING_ENABLED=false DD_IAST_ENABLED=true` environment variable.


[1]: /security/application_security/threats/
[2]: /security/application_security/code_security/
[3]: /tracing/
[4]: /security/application_security/threats/setup/
[5]: /security/application_security/code_security/setup/
