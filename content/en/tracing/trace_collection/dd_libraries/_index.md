---
title: Add the Datadog Tracing Library
aliases:
    - /tracing/languages
    - /tracing/setup_overview/setup/undefined
    - /tracing/setup_overview/setup/
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/
---

## Overview

To automatically instrument your application with Datadog libraries:

1. [Install and configure the Agent](#install-and-configure-the-agent).
2. [Add the Datadog tracing library to your code](#instrument-your-application).

## Install and configure the Agent

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is configured to receive traces in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`.

For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

### Containers

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

{{< site-region region="us3,us5,eu,gov,ap1,ap2" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][9] documentation.

### Other environments

Tracing is available for several other environments, such as  [Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12], and [Azure App Service][13].

For other environments, see the [Integrations][14] documentation for that environment and [contact support][15] if you are encountering any setup issues.

## Instrument your application

Set up your application to send [traces][2] using one of the following official Datadog tracing libraries:

{{< partial name="apm/apm-languages.html" >}}

<br>

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][1].


[1]: /developers/community/libraries/#apm-tracing-client-libraries
[2]: /tracing/glossary/#trace
[8]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /tracing/serverless_functions/
[10]: /agent/basic_agent_usage/heroku/#installation
[11]: /integrations/cloud_foundry/#trace-collection
[12]: /integrations/amazon_elasticbeanstalk/
[13]: /infrastructure/serverless/azure_app_services/#overview
[14]: /integrations/
[15]: /help/