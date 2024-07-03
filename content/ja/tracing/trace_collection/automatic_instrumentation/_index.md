---
algolia:
  tags:
  - apm automatic instrumentation
further_reading:
- link: /tracing/glossary/
  tag: Documentation
  text: APM Terms and Concepts
kind: documentation
title: Automatic Instrumentation
---

## Overview

Automatic instrumentation allows you to create spans automatically for your application. It allows you to capture observability data from a wide range of standard operations and popular frameworks with minimal manual intervention. You can automatically instrument your application when you install the Datadog Agent with [Single Step Instrumentation][5] or when you [manually add Datadog tracing libraries][6] to your code.

## Use cases

Some situations when you might use automatic instrumentation include:

- Capturing essential observability data across common libraries and languages with minimal configuration.
- Enabling real-time monitoring with pre-configured settings for immediate insights into application performance.
- Simplifying the observability setup for projects where [custom instrumentation][7] is not required.

## Getting started

Follow the relevant documentation for your automatic instrumentation approach to learn more:

{{< tabs >}}
{{% tab "Single Step Instrumentation (Beta)" %}}

If you install or update a Datadog Agent with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This allows you to automatically instrument your application, without any additional installation or configuration steps.

To get started, read the [Single Step Instrumentation][1] documentation.

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm

{{% /tab %}}

{{% tab "Datadog libraries" %}}

To automatically instrument your application with Datadog libraries:

1. [Install and configure the Agent](#install-and-configure-the-agent).
2. [Add the Datadog tracing library to your code](#instrument-your-application).

### Install and configure the Agent

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is configured to receive traces in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`.

For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### コンテナ

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][8].
2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}

</br>

3. The trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. For example:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist, then stats are sent to `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][9] documentation.

#### Other environments

Tracing is available for several other environments, such as  [Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12], and [Azure App Service][13].

For other environments, see the [Integrations][14] documentation for that environment and [contact support][15] if you are encountering any setup issues.

### Instrument your application

Set up your application to send traces using one of the following official Datadog tracing libraries:

{{< partial name="apm/apm-languages.html" >}}

<br>

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][1].

[1]: /ja/developers/community/libraries/#apm-tracing-client-libraries
[8]: /ja/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /ja/tracing/serverless_functions/
[10]: /ja/agent/basic_agent_usage/heroku/#installation
[11]: /ja/integrations/cloud_foundry/#trace-collection
[12]: /ja/integrations/amazon_elasticbeanstalk/
[13]: /ja/infrastructure/serverless/azure_app_services/#overview
[14]: /ja/integrations/
[15]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[2]: /ja/tracing/trace_collection/custom_instrumentation/dd_libraries/
[3]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation
[4]: /ja/tracing/trace_collection/custom_instrumentation/opentracing/
[5]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm
[6]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[7]: /ja/tracing/trace_collection/custom_instrumentation/