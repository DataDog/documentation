---
title: Using standalone Application Security products
disable_toc: false
---

DataDog [Application Threat Management][1] and [Code Security][2] are built on top of [APM][3]. While recommend using our application security products alongside with APM and adopt DevSecOps practices, some organizations are interested in more incremental adoption. This guide explains how to set up Application Security products without using APM.

## Prerequisites

This page assumes you already have:

* **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application’s operating system or container, cloud, or virtual environment.
* **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports application security. For more details, refer to the to the setuo guides for [Appplication Threat Management][4] or [Code Security][5].

## Compatibility

Standalone Application Security is currently supported for the following tracing library versions:

| Language | Version |
| -------- | ------- |
| .NET     | N/A     |
| Go       | N/A     |
| Java     | 1.36.0  |
| Node.js  | N/A     |
| PHP      | N/A     |
| Python   | N/A     |
| Ruby     | N/A     |

## Setup

### Agent setup

The DataDog Agent should be setup like you would normally do for APM or Application Security.

However, when setting up the Tracing Library, you should add the `DD_EXPERIMENTAL_APPSEC_STANDALONE_ENABLED=true` environment variable to the service that runs the Tracing Library.

This environment variable will reduce the amount of APM data sent to Datadog to a minimum required by Application Security products. It can then be combined with environment variables to enable Application Threat Management or Code Security.

For Application Threat Management, add the `DD_EXPERIMENTAL_APPSEC_STANDALONE_ENABLED=true DD_APPSEC_ENABLED=true` environment variables.

For Code Security, add the `DD_EXPERIMENTAL_APPSEC_STANDALONE_ENABLED=true DD_IAST_ENABLED=true` environment variables.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/threats/
[2]: /security/application_security/code_security/
[3]: /tracing/
[4]: /security/application_security/threats/setup/
[5]: /security/application_security/code_security/setup/
