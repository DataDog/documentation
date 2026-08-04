---
title: Add the Datadog SDK
aliases:
    - /tracing/languages
    - /tracing/setup_overview/setup/undefined
    - /tracing/setup_overview/setup/
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/
---

## Overview

To automatically instrument your application with Datadog libraries:

1. [Install and configure the Agent](#install-and-configure-the-agent).
2. [Add the Datadog SDK to your code](#instrument-your-application).

## Install and configure the Agent

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is configured to receive traces in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`.

For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][8].
2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/agent/docker/apm/?tab=java" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/agent/kubernetes/apm/?tab=helm" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="/agent/amazon_ecs/apm/?tab=python" src="integrations_logos/amazon_ecs.png" alt="Amazon ECS" >}}
  {{< image-card href="/integrations/ecs_fargate/#trace-collection" src="integrations_logos/ecs_fargate.png" alt="ECS Fargate" >}}
{{< /card-grid >}}

</br>

3. The trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. For example:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist, then stats are sent to `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,gov2,ap1,ap2,uk1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][9] documentation.

### Other environments

Tracing is available for several other environments, such as  [Heroku][10], [Cloud Foundry][11], [AWS Elastic Beanstalk][12], and [Azure App Service][13].

For other environments, see the [Integrations][14] documentation for that environment and [contact support][15] if you are encountering any setup issues.

## Instrument your application

Set up your application to send [traces][2] using one of the following official Datadog SDKs:

{{< card-grid card_width="225px" image_width="200">}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/cpp" src="integrations_logos/cpp.png" alt="C++" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/rust/" src="integrations_logos/rust.png" alt="Rust" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/dotnet-core" src="integrations_logos/dotnet-core.png" alt=".Net" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/dotnet-framework" src="integrations_logos/dotnet-framework.png" alt=".Net" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/android" src="integrations_logos/android.png" alt="Android" >}}
  {{< image-card href="/tracing/trace_collection/dd_libraries/ios" src="integrations_logos/ios_large.svg" alt="iOS" >}}
{{< /card-grid >}}

<br>

To instrument an application written in a language that does not have official library support, see the list of [community SDKs][1].


[1]: /extend/community/libraries/#apm-tracing-client-libraries
[2]: /tracing/glossary/#trace
[8]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /tracing/serverless_functions/
[10]: /agent/basic_agent_usage/heroku/#installation
[11]: /integrations/cloud_foundry/#trace-collection
[12]: /integrations/amazon_elasticbeanstalk/
[13]: /infrastructure/serverless/azure_app_services/#overview
[14]: /integrations/
[15]: /help/