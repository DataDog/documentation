---
title: Single Step APM Instrumentation on Linux
code_lang: linux
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

Linux host or VM

## Requirements

TODO: Determine if we want to remove platform-specific requirements from Compatibility page and instead include them here 

## Enable APM on your applications

For an Ubuntu host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][2], `<YOUR_DD_SITE>` with your [Datadog site][1], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>
2. Start a new shell session.
3. Restart the services on the host or VM.

After you complete these steps, you may want to enable [runtime metrics][3] or view observability data from your application in the [Software Catalog][4].

## Advanced Options

## Removing Single Step APM instrumentation from your Agent

### Removing instrumentation for specific services

### Removing APM for all services on the infrastructure

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /tracing/metrics/runtime_metrics/
[4]: /tracing/software_catalog/


