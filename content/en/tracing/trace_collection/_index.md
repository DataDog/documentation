---
title: Sending Traces to Datadog
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
    - /tracing/setup_overview/
further_reading:
- link: "tracing/trace_collection/compatibility"
  tag: "Documentation"
  text: "Compatibility requirements"
---

To configure your application to send traces to Datadog:

## Step 1 - Configure the Datadog Agent for APM

<div class="alert alert-info"><strong>Beta</strong>: If you use <a href="/tracing/trace_collection/single-step-apm">Single Step APM Instrumentation</a> when you install or update your Agent to the latest version, <strong>you're done!</strong> With this option, APM is configured in the Agent and all your services on that host, VM, or Docker container are automatically instrumented and report APM traces to Datadog. <a href="/tracing/services">Start exploring!</a></div>

If you don't use the Single Step APM Instrumentation option, APM-specific configurations are required on both the Tracer and Agent to ensure that traces can be properly received from containerized, serverless, or certain other environments. Ensure you have followed instructions for both components. 

Select your language:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,php,cpp,dotnet-core,dotnet-framework" >}}
{{< programming-lang lang="java" >}}

Compatibility requirements
: The latest Java Tracer supports all JVMs version 8 and higher. For additional information about JVM versions below 8, read [Supported JVM runtimes][10].
: For a full list of Datadog's Java version and framework support (including legacy and maintenance versions), read [Compatibility Requirements][1].

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][18].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. Some examples follow:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket

   ```

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
   ```

   You can also use system properties:

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
       -Ddd.trace.agent.url=$DD_TRACE_AGENT_URL \
       -jar <YOUR_APPLICATION_PATH>.jar
   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist, then stats are sent to `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][19] documentation.

#### Other environments

Tracing is available for a number of other environments, such as  [Heroku][20], [Cloud Foundry][21], [AWS Elastic Beanstalk][22], and [Azure App Service][23].

For other environments, refer to the [Integrations][24] documentation for that environment and [contact support][25] if you are encountering any setup issues.

[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/library_injection_remote/
[16]: /agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[19]: /tracing/serverless_functions/
[20]: /agent/basic_agent_usage/heroku/#installation
[21]: /integrations/cloud_foundry/#trace-collection
[22]: /integrations/amazon_elasticbeanstalk/
[23]: /infrastructure/serverless/azure_app_services/#overview
[24]: /integrations/
[25]: /help/

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Compatibility requirements
: The latest Python Tracer supports CPython versions 2.7 and 3.5-3.10.
: For a full list of Datadog's Python version and framework support (including legacy and maintenance versions), read the [Compatibility Requirements][9] page.

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data by default at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][7].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. Some examples:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   The connection for traces can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network sockets
   tracer.configure(
       https=False,
       hostname="custom-hostname",
       port="1234",
   )

   # Unix domain socket configuration
   tracer.configure(
       uds_path="/var/run/datadog/apm.socket",
   )
   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist then stats are sent to `http://localhost:8125`.

   If a different configuration is required, the `DD_DOGSTATSD_URL` environment variable can be used. Some examples:
   ```
   DD_DOGSTATSD_URL=udp://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   The connection for stats can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="udp://localhost:8125",
   )

   # Unix domain socket configuration
   tracer.configure(
     dogstatsd_url="unix:///var/run/datadog/dsd.socket",
   )
   ```
{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][8] documentation.

#### Other environments

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/
[7]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[8]: /tracing/serverless_functions/
[9]: /tracing/trace_collection/compatibility/python

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

#### Setup the Datadog Agent for tracing

Before installing `ddtrace`, [install the Datadog Agent](https://docs.datadoghq.com/agent/), to which `ddtrace` will send trace data.

Then configure the Datadog Agent to accept traces. To do this, either:

 - Set `DD_APM_ENABLED=true` in the Agent's environment

OR

 - Add `apm_enabled: true` to the [Agent's configuration file](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

*Additionally, in containerized environments...*

 - Set `DD_APM_NON_LOCAL_TRAFFIC=true` in the Agent's environment

OR

 - Add `apm_non_local_traffic: true` to the [Agent's configuration file](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file).

See the specific setup instructions for [Docker](https://docs.datadoghq.com/agent/docker/apm/?tab=ruby), [Kubernetes](https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm), [Amazon ECS](https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ruby) or [Fargate](https://docs.datadoghq.com/integrations/ecs_fargate/#trace-collection) to ensure that the Agent is configured to receive traces in a containerized environment.

##### Configuring trace data ingestion

The Datadog Agent will listen for traces via HTTP on port `8126` by default.

You may change the protocol or port the Agent listens for trace data using the following:

**For HTTP over TCP**:

 - Set `DD_APM_RECEIVER_PORT=<port>` in the Agent's environment

OR

 - Add `apm_config: receiver_port: <port>` to the [Agent's configuration file](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

 **For Unix Domain Socket (UDS)**:

 - Set `DD_APM_RECEIVER_SOCKET=<path-to-socket-file>`

OR

 - Add `apm_config: receiver_socket: <path-to-socket-file>` to the [Agent's configuration file](https://docs.datadoghq.com/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file)

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Compatibility requirements
: The latest Node.js Tracer supports versions `>=14`.
: For a full list of Datadog's Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][7] page.

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][8].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port for your Agent, set the `DD_TRACE_AGENT_HOSTNAME` and `DD_TRACE_AGENT_PORT` environment variables by running:

    ```sh
    DD_TRACE_AGENT_HOSTNAME=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   To use Unix domain sockets, specify the entire URL as a single environment variable, `DD_TRACE_AGENT_URL`.

   If you require a different socket, host, or port, use the `DD_TRACE_AGENT_URL` environment variable or the `DD_TRACE_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. Some examples:

   ```sh
   DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
   DD_TRACE_AGENT_URL=http://<HOSTNAME>:<PORT> node server
   DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][9] documentation.

#### Other environments

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you encounter setup issues.

Read [tracer settings][3] for a list of initialization options.


[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/
[7]: /tracing/trace_collection/compatibility/nodejs
[8]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /tracing/serverless_functions/

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Compatibility requirements
: The latest PHP Tracer supports versions >= 5.4.x.
: For a full list of Datadog's PHP version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][7] page.

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][8].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After having instrumented your application, the tracing client sends traces to Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`. If this is not the correct host and port change it by setting `DD_TRACE_AGENT_URL`, for example:

   ```
   DD_TRACE_AGENT_URL=unix:///path/to/custom.socket
   DD_TRACE_AGENT_URL=http://localhost:9442
   ```

   Similarly, where `DD_TRACE_HEALTH_METRICS_ENABLED` is set true, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist then stats are sent to `http://localhost:8125`.

   If a different configuration is required, use the `DD_DOGSTATSD_URL` environment variable. Some examples:
   ```
   DD_DOGSTATSD_URL=http://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][9] documentation.

#### Other environments

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/
[7]: /tracing/trace_collection/compatibility/php
[8]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[9]: /tracing/serverless_functions/

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**Note**: C++ does not provide integrations for OOTB instrumentation, but it's used by Proxy tracing such as [Envoy][8] and [Nginx][9]. For compatibility requirements for the C++ Tracer, visit the [Compatibility Requirements][7] page.

#### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][10].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port for your Agent, set the `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables.

To connect to the Agent using Unix Domain Sockets, use `DD_TRACE_AGENT_URL` instead. Set it to the same value as the Agent's value for `DD_APM_RECEIVER_SOCKET`.

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][11] documentation.

#### Other Environments

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you encounter setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/
[7]: /tracing/trace_collection/compatibility/cpp
[8]: /tracing/trace_collection/proxy_setup/?tab=envoy
[9]: /tracing/trace_collection/proxy_setup/?tab=nginx
[10]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /tracing/serverless_functions/

{{< /programming-lang >}}
{{< programming-lang lang="dotnet-core" >}}

Compatibility requirements
: The .NET Tracer supports instrumentation on .NET Core 2.1, 3.1, .NET 5, .NET 6, and .NET 7.
: For a full list of Datadog's .NET Core library and processor architecture support (including legacy and maintenance versions), see [Compatibility Requirements][6].

<div class="alert alert-info">
    To set up Datadog APM in AWS Lambda, see <strong><a href="/tracing/serverless_functions/">Tracing Serverless Functions</a></strong>, in Azure App Service, see <strong><a href="/serverless/azure_app_services/">Tracing Azure App Service</a></strong>.
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog's .NET Tracer with Profiler enabled). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

<div class="alert alert-info">
  To instrument trimmed apps, reference the <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> NuGet package in your project. Support for trimmed apps is in beta.
</div>

#### Installation

1. [Configure the Datadog Agent for APM.](#configure-the-datadog-agent-for-apm)
2. [Choose your instrumentation method](#option-2---inject-the-library-locally-at-the-agent)
3. [Install the tracer.](#install-the-tracer)
4. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
5. [View your live data.](#view-your-live-data)

#### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data on `http://localhost:8126`.

For containerized, serverless, and cloud environments:

##### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][7].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client attempts to send traces to the following:

    - The `/var/run/datadog/apm.socket` Unix domain socket by default.
    - If the socket does not exist, then traces are sent to `localhost:8126`.
    - If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable: `DD_TRACE_AGENT_URL=http://custom-hostname:1234` or `DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket`
    - Using Unix Domain Sockets for trace transport is only supported on .NET Core 3.1 and later.

For more information on how to configure these settings, see [Configuration](#configuration).

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. To ensure the Agent sends data to the right Datadog location, set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}}.

{{< /site-region >}}

##### Other environments

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For all other environments, see the [Integrations documentation][4] for that environment and contact [Datadog support][5] if you encounter setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /integrations/
[5]: /help/
[6]: /tracing/trace_collection/compatibility/dotnet-core
[7]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

{{< /programming-lang >}}
{{< programming-lang lang="dotnet-framework" >}}

Compatibility requirements
: The .NET Tracer supports instrumentation on .NET Framework >= 4.6.1.
: For a full list of Datadog's .NET Framework library and processor architecture support (including legacy and maintenance versions), see [Compatibility Requirements][6].

<div class="alert alert-info">
  To set up Datadog APM in AWS Lambda, see <strong><a href="/tracing/serverless_functions/">Tracing Serverless Functions</a></strong>, in Azure App Service, see <strong><a href="/serverless/azure_app_services/">Tracing Azure App Service</a></strong>.
</div>

<div class="alert alert-warning">
  <strong>Note:</strong> Datadog's automatic instrumentation relies on the .NET CLR Profiling API. This API allows only one subscriber (for example, Datadog's .NET Tracer with Profiler enabled). To ensure maximum visibility, run only one APM solution in your application environment.
</div>

#### Installation

1. [Configure the Datadog Agent for APM.](#configure-the-datadog-agent-for-apm)
2. [Choose your instrumentation method](#option-2---inject-the-library-locally-at-the-agent)
3. [Install the tracer.](#install-the-tracer)
4. [Enable the tracer for your service.](#enable-the-tracer-for-your-service)
5. [View your live data.](#view-your-live-data)

#### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic on `http://localhost:8126`.

For containerized, serverless, and cloud environments:

##### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][7].

2. See the specific setup instructions to configure the Agent to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After instrumenting your application, the tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port, change it by setting the `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. For more information on configuring these settings, see [Configuration](#configuration).

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. To ensure the Agent sends data to the right Datadog location, set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}}.

{{< /site-region >}}

##### Other environments

Tracing is available for other environments including, [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For all other environments, see the [Integrations documentation][4] for that environment and contact [Datadog support][5] if you are encountering setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /integrations/
[5]: /help/
[6]: /tracing/trace_collection/compatibility/dotnet-framework
[7]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Step 2 - Instrument your application 

When you add the Datadog tracing library to your code, it instruments the service and sends traces to the Datadog Agent. The Agent then sends the traces to the Datadog backend to be displayed in the UI.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

Depending on the programming language and infrastructure you use, you have the following options to instrument your application:

- [Add the library directly to your application code](#option-1---add-the-library-directly-to-your-application-code)
- [Inject the library locally at the Agent](#option-2---inject-the-library-locally-at-the-agent)
- [Inject the library remotely from the Datadog UI](#option-3---inject-the-library-remotely-from-the-datadog-ui)

### Option 1 - Add the library directly to your application code

For setup instructions, select your language:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,php,cpp,dotnet-core,dotnet-framework" >}}
{{< programming-lang lang="java" >}}

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, or from an application on a Linux host or container, as an alternative to the following instructions, you can inject the tracing library into your application. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries</a> for instructions.</div>

After the agent is installed, to begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest tracer class files, to a folder that is accessible by your Datadog user:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

   **Note:** To download the latest build of a specific **major** version, use the `https://dtdg.co/java-tracer-vX` link instead, where `X` is the desired major version.
   For example, use `https://dtdg.co/java-tracer-v1` for the latest version 1 build. Minor version numbers must not be included. Alternatively, see Datadog's [Maven repository][3] for any specific version.

2. To run your app from an IDE, Maven or Gradle application script, or `java -jar` command, with the Continuous Profiler, deployment tracking, and logs injection (if you are sending logs to Datadog), add the `-javaagent` JVM argument and the following configuration options, as applicable:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```

    **Note:** Enabling profiling may impact your bill depending on your APM bundle. See the [pricing page][4] for more information.

| Environment Variable      | System Property                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Your application environment (`production`, `staging`, etc.) |
| `DD_SERVICE`   | `dd.service`     | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| `DD_VERSION` | `dd.version` |  Your application version (for example, `2.5`, `202003181415`, `1.3-alpha`, etc.) |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Enable the [Continous Profiler][5] |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Enable automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][6] for details. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][17] UI. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Set a sampling rate at the root of the trace for all services. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_SAMPLE_RATE` in the [Service Catalog][17] UI.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Set a sampling rate at the root of the trace for services that match the specified rule.    |

Additional [configuration options](#configuration) are described below.


#### Add the Java Tracer to the JVM

Use the documentation for your application server to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

##### Spring Boot

If your app is called `my_app.jar`, create a `my_app.conf`, containing:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

For more information, see the [Spring Boot documentation][20].

##### Tomcat

Open your Tomcat startup script file, for example `setenv.sh` on Linux, and add:

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Or on Windows, `setenv.bat`:

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
If a `setenv` file does not exist, create it in the `./bin` directory of the Tomcat project folder.


##### JBoss

- In standalone mode:

  Add the following line to the end of `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- In standalone mode and on Windows, add the following line to the end of `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- In domain mode:

  Add the following line in the file `domain.xml`, under the tag server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

For more details, see the [JBoss documentation][21].


##### Jetty

If you use `jetty.sh` to start Jetty as a service, edit it to add:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

If you use `start.ini` to start Jetty, add the following line (under `--exec`, or add `--exec` line if it isn't there yet):

```text
-javaagent:/path/to/dd-java-agent.jar
```

##### WebSphere

In the administrative console:

1. Select **Servers**. Under **Server Type**, select **WebSphere application servers** and select your server.
2. Select **Java and Process Management > Process Definition**.
3. In the **Additional Properties** section, click **Java Virtual Machine**.
4. In the **Generic JVM arguments** text field, enter:

```text
-javaagent:/path/to/dd-java-agent.jar
```

For additional details and options, see the [WebSphere docs][22].


**Note**

- If you're adding the `-javaagent` argument to your `java -jar` command, it needs to be added _before_ the `-jar` argument, as a JVM option, not as an application argument. For example:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- Never add `dd-java-agent` to your classpath. It can cause unexpected behavior.

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][9] for details.

[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/library_injection_remote/
[16]: /agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[19]: /tracing/serverless_functions/
[20]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
[21]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
[22]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server


{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, as an alternative to the following instructions, you can inject the tracing library into your application using the Cluster Agent Admission Controller. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries Using Admission Controller</a> for instructions.</div>

Once the agent is installed, to begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

**Note:** This command requires pip version `18.0.0` or greater. For Ubuntu, Debian, or another package manager, update your pip version with the following command:

```python
pip install --upgrade pip
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

Once you've finished setup and are running the tracer with your application, you can run `ddtrace-run --info` to check that configurations are working as expected. Note that the output from this command does not reflect configuration changes made during runtime in code.

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

#### Upgrading to v1

If you are upgrading to ddtrace v1, review the [upgrade guide][4] and the [release notes][5] in the library documentation for full details.

[3]: /tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

#### Rails or Hanami applications

1. Add the `ddtrace` gem to your Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace', require: 'ddtrace/auto_instrument'
    ```

2. Install the gem with `bundle install`

3. Create a `config/initializers/datadog.rb` file containing:

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Using this block you can:

      - [Add additional configuration settings](#additional-configuration)
      - [Activate or reconfigure instrumentation](#integration-instrumentation)

#### Other Ruby applications

If your application does not use the supported gems (Rails or Hanami) above, you can set it up as follows:

1. Add the `ddtrace` gem to your Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Install the gem with `bundle install`
3. `require` any [supported libraries or frameworks](#integration-instrumentation) that should be instrumented.
4. Add `require 'ddtrace/auto_instrument'` to your application. _Note:_ This must be done _after_ requiring any supported libraries or frameworks.

    ```ruby
    # Example frameworks and libraries
    require 'sinatra'
    require 'faraday'
    require 'redis'

    require 'ddtrace/auto_instrument'
    ```

5. Add a configuration block to your application:

    ```ruby
    Datadog.configure do |c|
      # Add additional configuration here.
      # Activate integrations, change tracer settings, etc...
    end
    ```

    Using this block you can:

      - [Add additional configuration settings](#additional-configuration)
      - [Activate or reconfigure instrumentation](#integration-instrumentation)

#### Configuring OpenTracing

1. Add the `ddtrace` gem to your Gemfile:

    ```ruby
    source 'https://rubygems.org'
    gem 'ddtrace'
    ```

2. Install the gem with `bundle install`
3. To your OpenTracing configuration file, add the following:

    ```ruby
    require 'opentracing'
    require 'datadog/tracing'
    require 'datadog/opentracer'

    # Activate the Datadog tracer for OpenTracing
    OpenTracing.global_tracer = Datadog::OpenTracer::Tracer.new
    ```

4. Add a configuration block to your application:

    ```ruby
    Datadog.configure do |c|
      # Configure the Datadog tracer here.
      # Activate integrations, change tracer settings, etc...
      # By default without additional configuration,
      # no additional integrations will be traced, only
      # what you have instrumented with OpenTracing.
    end
    ```

     Using this block you can:

      - [Add additional Datadog configuration settings](#additional-configuration)
      - [Activate or reconfigure Datadog instrumentation](#integration-instrumentation)

#### Configuring OpenTelemetry

You can send OpenTelemetry traces directly to the Datadog Agent (without `ddtrace`) by using OTLP. Check out our documentation on [OTLP ingest in the Datadog Agent](https://docs.datadoghq.com/tracing/setup_overview/open_standards/#otlp-ingest-in-datadog-agent) for details.

#### Connect your application to the Datadog Agent

By default, `ddtrace` will connect to the Agent using the first available settings in the listed priority:

1. Via any explicitly provided configuration settings (hostname/port/transport)
2. Via Unix Domain Socket (UDS) located at `/var/run/datadog/apm.socket`
3. Via HTTP over TCP to `127.0.0.1:8126`

If your Datadog Agent is listening at any of these locations, no further configuration should be required.

If your Agent runs on a different host or container than your application, or you would like to send traces via a different protocol, you will need to configure your application accordingly.

  - [How to send trace data via HTTP over TCP to Agent](#changing-default-agent-hostname-and-port)
  - [How to send trace data via Unix Domain Socket (UDS) to Agent](#using-the-unix-domain-socket-uds-adapter)

#### Final steps for installation

After setting up, your services will appear on the [APM services page](https://app.datadoghq.com/apm/services) within a few minutes. Learn more about [using the APM UI][visualization docs].

#### Manual instrumentation

If you aren't using a supported framework instrumentation, you may want to manually instrument your code.

To trace any Ruby code, you can use the `Datadog::Tracing.trace` method:

```ruby
Datadog::Tracing.trace(name, **options) do |span, trace|
  # Wrap this block around the code you want to instrument
  # Additionally, you can modify the span here.
  # e.g. Change the resource name, set tags, etc...
end
```

Where `name` should be a `String` that describes the generic kind of operation being done (e.g. `'web.request'`, or `'request.parse'`)

And `options` are the following optional keyword arguments:

| Key | Type | Description | Default |
| --------------- | ----------------------- | --- | --- |
| `autostart`     | `Bool`                  | Whether the time measurement should be started automatically. If `false`, user must call `span.start`. | `true` |
| `continue_from` | `Datadog::TraceDigest`  | Continues a trace that originated from another execution context. TraceDigest describes the continuation point. | `nil` |
| `on_error`      | `Proc`                  | Overrides error handling behavior, when a span raises an error. Provided `span` and `error` as arguments. Sets error on the span by default. | `proc { |span, error| span.set_error(error) unless span.nil? }` |
| `resource`      | `String`                | Name of the resource or action being operated on. Traces with the same resource value will be grouped together for the purpose of metrics (but still independently viewable.) Usually domain specific, such as a URL, query, request, etc. (e.g. `'Article#submit'`, `http://example.com/articles/list`.) | `name` of Span. |
| `service`       | `String`                | The service name which this span belongs (e.g. `'my-web-service'`) | Tracer `default-service`, `$PROGRAM_NAME` or `'ruby'` |
| `start_time`    | `Time`                  | When the span actually starts. Useful when tracing events that have already happened. | `Time.now` |
| `tags`          | `Hash`                  | Extra tags which should be added to the span. | `{}` |
| `type`          | `String`                | The type of the span (such as `'http'`, `'db'`, etc.) | `nil` |

It's highly recommended you set both `service` and `resource` at a minimum. Spans without a `service` or `resource` as `nil` will be discarded by the Datadog agent.

Example of manual instrumentation in action:

```ruby
get '/posts' do
  Datadog::Tracing.trace('web.request', service: 'my-blog', resource: 'GET /posts') do |span|
    # Trace the activerecord call
    Datadog::Tracing.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Add some APM tags
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Trace the template rendering
    Datadog::Tracing.trace('template.render') do
      erb :index
    end
  end
end
```

#### Asynchronous tracing

It might not always be possible to wrap `Datadog::Tracing.trace` around a block of code. Some event or notification based instrumentation might only notify you when an event begins or ends.

To trace these operations, you can trace code asynchronously by calling `Datadog::Tracing.trace` without a block:

```ruby
# Some instrumentation framework calls this after an event finishes...
def db_query(start, finish, query)
  span = Datadog::Tracing.trace('database.query', start_time: start)
  span.resource = query
  span.finish(finish)
end
```

Calling `Datadog::Tracing.trace` without a block will cause the function to return a `Datadog::Tracing::SpanOperation` that is started, but not finished. You can then modify this span however you wish, then close it `finish`.

*You must not leave any unfinished spans.* If any spans are left open when the trace completes, the trace will be discarded. You can [activate debug mode](#additional-configuration) to check for warnings if you suspect this might be happening.

To avoid this scenario when handling start/finish events, you can use `Datadog::Tracing.active_span` to get the current active span.

```ruby
# e.g. ActiveSupport::Notifications calls this when an event starts
def start(name, id, payload)
  # Start a span
  Datadog::Tracing.trace(name)
end

# e.g. ActiveSupport::Notifications calls this when an event finishes
def finish(name, id, payload)
  # Retrieve current active span (thread-safe)
  current_span = Datadog::Tracing.active_span
  unless current_span.nil?
    current_span.resource = payload[:query]
    current_span.finish
  end
end
```
#### Enriching traces from nested methods

You can tag additional information to the current active span from any method. Note however that if the method is called and there is no span currently active `active_span` will be nil.

```ruby
# e.g. adding tag to active span

current_span = Datadog::Tracing.active_span
current_span.set_tag('my_tag', 'my_value') unless current_span.nil?
```

You can also get the current active trace using the `active_trace` method. This method will return `nil` if there is no active trace.

```ruby
# e.g. accessing active trace

current_trace = Datadog::Tracing.active_trace
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

#### Library configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].

[1]: /tracing/compatibility_requirements/go
[3]: tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/library_injection_remote/

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

After the Agent is installed, follow these steps to add the Datadog tracing library to your Node.js applications:

1. Install the Datadog Tracing library using npm for Node.js 14+:

    ```sh
    npm install dd-trace --save
    ```
    If you need to trace end-of-life Node.js version 12, install version 2.x of `dd-trace` by running:
    ```
    npm install dd-trace@latest-node12
    ```
    For more information on our distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.
    If you are upgrading from a previous major version of the library (0.x, 1.x, or 2.x) to another major version (2.x or 3.x), read the [Migration Guide][5] to assess any breaking changes.

2. Import and initialize the tracer either in code or via command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

   Once you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm step 2 has been correctly done**. The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

   When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

#### Adding the tracer in code

##### JavaScript

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript and bundlers

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file in order to maintain correct load
order.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

If the default config is sufficient, or all configuration is done
via environment variables, you can also use `dd-trace/init`, which loads and
initializes in one step.

```typescript
import 'dd-trace/init';
```

#### Adding the tracer via command line arguments

Use the `--require` option to Node.js to load and initialize the tracer in one
step.

```sh
node --require dd-trace/init app.js
```

**Note:** This approach requires using environment variables for all
configuration of the tracer.

#### Bundling

`dd-trace` works by intercepting `require()` calls that a Node.js application makes when loading modules. This includes modules that are built-in to Node.js, like the `fs` module for accessing the filesystem, as well as modules installed from the NPM registry, like the `pg` database module.

Bundlers crawl all of the `require()` calls that an application makes to files on disk. It replaces the `require()` calls with custom code and combines all of the resulting JavaScript into one "bundled" file. When a built-in module is loaded, such as `require('fs')`, that call can then remain the same in the resulting bundle.

APM tools like `dd-trace` stop working at this point. They can continue to intercept the calls for built-in modules but don't intercept calls to third party libraries. This means that when you bundle a `dd-trace` app with a bundler it is likely to capture information about disk access (through `fs`) and outbound HTTP requests (through `http`), but omit calls to third party libraries. For example:
- Extracting incoming request route information for the `express` framework. 
- Showing which query is run for the `mysql` database client.

A common workaround is to treat all third party modules that the APM needs to instrument as being "external" to the bundler. With this setting the instrumented modules remain on disk and continue to be loaded with `require()` while the non-instrumented modules are bundled. However, this results in a build with many extraneous files and starts to defeat the purpose of bundling.

Datadog recommends you have custom-built bundler plugins. These plugins are able to instruct the bundler on how to behave, inject intermediary code and intercept the "translated" `require()` calls. As a result, more packages are included in the bundled JavaScript file. 

**Note**: Some applications can have 100% of modules bundled, however native modules still need to remain external to the bundle.

##### Esbuild support

This library provides experimental esbuild support in the form of an esbuild plugin, and requires at least Node.js v16.17 or v18.7. To use the plugin, make sure you have `dd-trace@3+` installed, and then require the `dd-trace/esbuild` module when building your bundle.

Here's an example of how one might use `dd-trace` with esbuild:

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16']
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

[1]: /tracing/compatibility_requirements/nodejs
[4]: tracing/trace_collection/library_config/nodejs
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/library_injection_remote/

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

#### Install the extension

Download the official installer:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

In case you are using Alpine Linux you need to install `libgcc_s` prior to running the installer:

```shell
apk add libgcc
```

Run the installer:

```shell
# Full installation: APM + ASM + Profiling (Beta)
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# APM only
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling (Beta)
php datadog-setup.php --php-bin=all --enable-profiling
```

This command installs the extension to all the PHP binaries found in the host or container. If `--php-bin` is omitted, the installer runs in interactive mode and asks the user to select the binaries for installation. The value of `--php-bin` can be a path to a specific binary in case `dd-trace-php` should be installed only to such binary.

Restart PHP (PHP-FPM or the Apache SAPI) and visit a tracing-enabled endpoint of your application. For traces, see the [APM Service List][5].

When you do not specify `--enable-appsec`, the AppSec extension loads shortly at startup, and is not enabled by default. It immediately short-circuits, causing negligible performance overhead.

<div class="alert alert-info">
<strong>Note:</strong>
It may take a few minutes before traces appear in the UI. If traces still do not appear after a few minutes, create a <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> page from the host machine and scroll down to the `ddtrace`. Failed diagnostic checks appear in this section to help identify any issues.
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
If the PHP CLI binary is built as NTS (non thread-safe), while Apache uses a ZTS (Zend thread-safe) version of PHP, you need to manually change the extension load for the ZTS binary. Run <code>/path/to/php-zts --ini</code> to find where Datadog's <code>.ini</code> file is located, then add the <code>-zts</code> suffix from the file name. For example, from <code>extension=ddtrace-20210902.so</code> to <code>extension=ddtrace-20210902-zts.so</code>.
</div>


#### Automatic instrumentation

Tracing is automatically enabled by default. Once the extension is installed, **ddtrace** traces your application and sends traces to the Agent.

Datadog supports all web frameworks out of the box. Automatic instrumentation works by modifying PHP's runtime to wrap certain functions and methods to trace them. The PHP tracer supports automatic instrumentation for several libraries.

Automatic instrumentation captures:

* Method execution time
* Relevant trace data, such as URL and status response codes for web requests or SQL queries for database access
* Unhandled exceptions, including stacktraces if available
* A total count of traces (for example, web requests) flowing through the system

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][6] for details.

#### Tracing short- and long-running CLI scripts

Additional steps are required for instrumenting CLI scripts. Read [Trace PHP CLI Scripts][7] for more information.

#### Upgrading

To upgrade the PHP tracer, [download the latest release][5] and follow the same steps as [installing the extension](#install-the-extension).

Once the installation is completed restart PHP (PHP-FPM or the Apache SAPI).

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

#### Removing

To remove the PHP tracer:

1. For php-fpm, stop the php-fpm service, otherwise stop the Apache web server.
2. Unlink files `98-ddtrace.ini` and `99-ddtrace-custom.ini` from your php configuration folder.
3. For php-fpm, restart php-fpm service, otherwise restart the Apache web server.

**Note**: If you are using second level caching in OPcache by setting the parameter `opcache.file_cache`, remove the cache folder.

#### Troubleshooting an application crash

In the unusual event of an application crash caused by the PHP tracer, typically because of a segmentation fault, the best thing to do is obtain a core dump or a Valgrind trace and contact Datadog support.

##### Install debug symbols

For the core dumps to be readable, debug symbols for the PHP binaries have to be installed on the system that runs PHP.

To check if debug symbols are installed for PHP or PHP-FPM, use `gdb`.

Install `gdb`:

```
apt|yum install -y gdb
```

Run `gdb` with the binary of interest. For example for PHP-FPM:

```
gdb php-fpm
```

If the `gdb` output contains a line similar to the text below, then debug symbols are already installed.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

If the `gdb` output contains a line similar to the text below, then debug symbols need to be installed:

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


###### Centos

Install package `yum-utils` that provides the program `debuginfo-install`:

```
yum install -y yum-utils
```

Find the package name for your PHP binaries, it can vary depending on the PHP installation method:

```
yum list installed | grep php
```

Install debug symbols. For example for package `php-fpm`:

```
debuginfo-install -y php-fpm
```

**Note**: If the repository that provides the PHP binaries is not enabled by default, it can be enabled when running the `debuginfo-install` command. For example:

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

###### Debian

**HP installed from the Sury Debian DPA**

If PHP was installed from the [Sury Debian DPA][8], debug symbols are already available from the DPA. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

**PHP installed from a different package**

The Debian project maintains a wiki page with [instructions to install debug symbols][9].

Edit the file `/etc/apt/sources.list`:

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Update `apt`:

```
apt update
```

Try canonical package names for debug symbols, first. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

If debug symbols cannot be found, use the utility tool `find-dbgsym-packages`. Install the binary:

```
apt install -y debian-goodies
```

Attempt finding debug symbols from either the full path to the binary or the process id of a running process:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Install the resulting package name, if found:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

###### Ubuntu

**PHP installed from `ppa:ondrej/php`**

If PHP was installed from the [`ppa:ondrej/php`][10], edit the apt source file `/etc/apt/sources.list.d/ondrej-*.list` by adding the `main/debug` component.

Before:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

After:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Update and install the debug symbols. For example, for PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```
**PHP installed from a different package**

Find the package name for your PHP binaries, it can vary depending on the PHP installation method:

```
apt list --installed | grep php
```

**Note**: In some cases `php-fpm` can be a metapackage that refers to the real package, for example `php7.2-fpm` in case of PHP-FPM 7.2. In this case the package name is the latter.

Try canonical package names for debug symbols, first. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

If the `-dbg` and `-dbgsym` packages cannot be found, enable the `ddebs` repositories. Detailed information about how to [install debug symbols][11] from the `ddebs` can be found in the Ubuntu documentation.

For example, for Ubuntu 18.04+, enable the `ddebs` repo:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Import the signing key (make sure the [signing key is correct][12]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Try adding the canonical package names for debug symbols. For example, if the package name is `php7.2-fpm` try:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

In case debug symbols cannot be found, use the utility tool `find-dbgsym-packages`. Install the binary:

```
apt install -y debian-goodies
```

Attempt finding debug symbols from either the full path to the binary or the process id of a running process:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Install the resulting package name, if found:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

##### Obtaining a core dump

Obtaining a core dump for PHP applications can be tricky, especially on PHP-FPM. Here are a few tips to help you obtain a core dump:

1. Determine whether the PHP-FPM generated a core dump by looking in the application error log:
   - Search for `(SIGSEGV - core dumped)` because a message like this means it has been dumped: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Search for `(SIGSEGV)` because a message like this indicates that the core was not dumped: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Locate the core dump by running `cat /proc/sys/kernel/core_pattern`. The default value is typically `core`, meaning that a file named `core` will be generated in the web root folder.

If no core dump was generated, check the following configurations and change them as needed:

1. If `/proc/sys/kernel/core_pattern` contains a path including nested directories, ensure the full directory path exists.
1. If the user running the PHP-FPM pool workers is something other than `root` (a common user name is `www-data`) give that user write permissions to the core dumps directory.
1. Ensure that the value of `/proc/sys/fs/suid_dumpable` is not `0`. Set it to `1` or `2` unless you run PHP-FPM workers pool as `root`. Check your options with your system administrator.
1. Ensure you have a suitable `rlimit_core` in the PHP-FPM pool configuration section. You can set it to unlimited: `rlimit_core = unlimited`.
1. Ensure you have a suitable `ulimit` set in your system. You can set it to unlimited: `ulimit -c unlimited`.
1. If your application runs in a Docker container, changes to `/proc/sys/*` have to be done to the host machine. Contact your system administrator to know the options available to you. If you are able to, try recreating the issue in your testing or staging environments.

##### Obtaining a Valgrind trace

To gain more details about the crash, run the application with Valgrind. Unlike core dumps, this approach always works in an unprivileged container.

<div class="alert alert-danger">
<strong>Note</strong>: An application that runs through Valgrind is orders of magnitude slower than when running natively. This method is recommended for non-production environments.
</div>

Install Valgrind with your package manager. Run the application with Valgrind enough to generate a few requests.

For a CLI application, run:
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
When running `php-fpm` run:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
When using Apache, run:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

The resulting Valgrind trace is printed by default to the standard error, follow the [official documentation][13] to print to a different target. The expected output is similar to the example below for a PHP-FPM process:

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

##### Obtaining a strace

Some issues are caused by external factors, so it can be valuable to have a `strace`.

<div class="alert alert-danger">
<strong>Note</strong>: An application that runs through <code>strace</code> is orders of magnitude slower than when running natively. This method is recommended for non-production environments.
</div>

Install `strace` with your package manager. When generating a `strace` to send to Datadog Support, ensure you use the `-f` option to follow child processes.

For a CLI application, run:
```shell
strace -f php path/to/script.php
```

For `php-fpm`, run:
```shell
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
```

For Apache, run:
```
(. /etc/apache2/envvars; strace -f apache2 -X)
```

[1]: /tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/glossary/
[5]: https://app.datadoghq.com/apm/services
[6]: /tracing/trace_collection/library_config/php/
[7]: /tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

After the Agent is installed, follow these steps to add the Datadog tracing library to your C++ applications in one of two ways:

* Compile against dd-opentracing-cpp, where the Datadog lib is compiled in and configured in code
* Dynamic loading, where the Datadog OpenTracing library is loaded at runtime and configured via JSON

##### Compile against dd-opentracing-cpp

```bash
# Requires the "jq" command, which can be installed via
# the package manager, for example "apt install jq",
# "apk add jq", "yum install jq".
if ! command -v jq >/dev/null 2>&1; then
  >&2 echo "jq command not found. Install using the local package manager."
else
  # Gets the latest release version number from GitHub.
  get_latest_release() {
    curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
  }
  DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
  # Download and install dd-opentracing-cpp library.
  wget https://github.com/DataDog/dd-opentracing-cpp/archive/${DD_OPENTRACING_CPP_VERSION}.tar.gz -O dd-opentracing-cpp.tar.gz
  mkdir -p dd-opentracing-cpp/.build
  tar zxvf dd-opentracing-cpp.tar.gz -C ./dd-opentracing-cpp/ --strip-components=1
  cd dd-opentracing-cpp/.build
  # Download and install the correct version of opentracing-cpp, & other deps.
  ../scripts/install_dependencies.sh
  # Configure the project, build it, and install it.
  cmake ..
  make -j
  make install
fi
```

Include `<datadog/opentracing.h>` and create the tracer:

```cpp
// tracer_example.cpp
#include <datadog/opentracing.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  datadog::opentracing::TracerOptions tracer_options{"localhost", 8126, "compiled-in example"};
  auto tracer = datadog::opentracing::makeTracer(tracer_options);

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Link against `libdd_opentracing` and `libopentracing`, making sure that they are both in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++14 -o tracer_example tracer_example.cpp -ldd_opentracing -lopentracing
./tracer_example
```

##### Dynamic loading

```bash
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
OPENTRACING_VERSION="$(get_latest_release opentracing/opentracing-cpp)"
# Download and install OpenTracing-cpp
wget https://github.com/opentracing/opentracing-cpp/archive/${OPENTRACING_VERSION}.tar.gz -O opentracing-cpp.tar.gz
mkdir -p opentracing-cpp/.build
tar zxvf opentracing-cpp.tar.gz -C ./opentracing-cpp/ --strip-components=1
cd opentracing-cpp/.build
cmake ..
make
make install
# Install dd-opentracing-cpp shared plugin.
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

Include `<opentracing/dynamic_load.h>` and load the tracer from `libdd_opentracing_plugin.so`:

```cpp
// tracer_example.cpp
#include <opentracing/dynamic_load.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]) {
  // Load the tracer library.
  std::string error_message;
  auto handle_maybe = opentracing::DynamicallyLoadTracingLibrary(
      "/usr/local/lib/libdd_opentracing_plugin.so", error_message);
  if (!handle_maybe) {
    std::cerr << "Failed to load tracer library " << error_message << "\n";
    return 1;
  }

  // Read in the tracer's configuration.
  std::string tracer_config = R"({
      "service": "dynamic-load example",
      "agent_host": "localhost",
      "agent_port": 8126
    })";

  // Construct a tracer.
  auto& tracer_factory = handle_maybe->tracer_factory();
  auto tracer_maybe = tracer_factory.MakeTracer(tracer_config.c_str(), error_message);
  if (!tracer_maybe) {
    std::cerr << "Failed to create tracer " << error_message << "\n";
    return 1;
  }
  auto& tracer = *tracer_maybe;

  // Create some spans.
  {
    auto span_a = tracer->StartSpan("A");
    span_a->SetTag("tag", 123);
    auto span_b = tracer->StartSpan("B", {opentracing::ChildOf(&span_a->context())});
    span_b->SetTag("tag", "value");
  }

  tracer->Close();
  return 0;
}
```

Just link against `libopentracing`, making sure that `libopentracing.so` is in your `LD_LIBRARY_PATH`:

```bash
g++ -std=c++11 -o tracer_example tracer_example.cpp -lopentracing
./tracer_example
```

**Note**: OpenTracing requires C++ 11 or higher.

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][5] for details.

[1]: /tracing/setup/envoy/
[2]: /tracing/setup/nginx/
[3]: /tracing/compatibility_requirements/cpp
[4]: https://app.datadoghq.com/apm/service-setup
[5]: /tracing/trace_collection/library_config/cpp/

{{< /programming-lang >}}
{{< programming-lang lang="dotnet-core" >}}

#### Install the tracer

You can install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented, or you can install it on a per-application basis to allow developers to manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the Windows or Linux tab. To see per-application installation instructions, click the NuGet tab.

#### Windows

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][16]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Tracer MSI installer with administrator privileges.

You can also script the MSI setup by running the following in PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases

#### Linux

To install the .NET Tracer machine-wide:

1. Download the latest [.NET Tracer package][16] that supports your operating system and architecture.

2. Run one of the following commands to install the package and create the .NET tracer log directory `/var/log/datadog/dotnet` with the appropriate permissions:

   Debian or Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS or Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine or other musl-based distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Other distributions
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-tar.gz && /opt/datadog/createLogPath.sh`

#### NuGet

<div class="alert alert-warning">
  <strong>Note:</strong> This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
</div>

To install the .NET Tracer per-application:

1. Add the `Datadog.Trace.Bundle` [NuGet package][15] to your application.

#### Enable the tracer for your service

To enable the .NET Tracer for your service, set the required environment variables and restart the application.

For information about the different methods for setting environment variables, see [Configuring process environment variables](#configuring-process-environment-variables).

#### Windows

#### Internet Information Services (IIS)

1. The .NET Tracer MSI installer adds all required environment variables. There are no environment variables you need to configure.

   <div class="alert alert-warning">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. To automatically instrument applications hosted in IIS, completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Services not in IIS

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>CORECLR_PROFILER</code> if you installed the tracer using the MSI.</div>

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. For standalone applications and Windows services, manually restart the application.

#### Linux

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. For standalone applications, manually restart the application as you normally would.

#### NuGet

Follow the instructions in the package readme, also available in [`dd-trace-dotnet` repository][13].
Docker examples are also available in the [repository][14].

#### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.
2. Create application load.
3. In Datadog, navigate to [**APM** > **APM Traces**][3].

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

#### Custom instrumentation

Your setup for custom instrumentation depends on your automatic instrumentation and includes additional steps depending on the method:

##### Windows

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, you must keep the package versions (for example: MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:

1. Add the `Datadog.Trace` [NuGet package][12] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

##### Linux

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, you must keep the package versions (for example, MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:
1. Add the `Datadog.Trace` [NuGet package][12] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

##### NuGet

To use custom instrumentation in your .NET application:

1. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more information on adding spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][5].

#### Configuring process environment variables

To attach automatic instrumentation to your service, you must set the required environment variables before starting the application. See [Enable the tracer for your service](#enable-the-tracer-for-your-service) section to identify which environment variables to set based on your .NET Tracer installation method and follow the examples below to correctly set the environment variables based on the environment of your instrumented service.

##### Windows

###### Windows services

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>CORECLR_PROFILER</code> if you installed the tracer using the MSI.</div>

##### Registry Editor

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
CORECLR_ENABLE_PROFILING=1
CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

##### PowerShell

```powershell
[string[]] $v = @("CORECLR_ENABLE_PROFILING=1", "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```

##### IIS

After installing the MSI, no additional configuration is needed to automatically instrument your IIS sites. To set additional environment variables that are inherited by all IIS sites, perform the following steps:

1. Open the Registry Editor, find the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` key, and add the environment variables, one per line. For example, to add logs injection and runtime metrics, add the following lines to the value data:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Run the following commands to restart IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Using the Registry Editor to create environment variables for all IIS sites" >}}

#### Console applications

To automatically instrument a console application, set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET CORECLR_ENABLE_PROFILING=1
rem Unless v2.14.0+ and you installed the tracer with the MSI
SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Set additional Datadog environment variables
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

#### Linux

#### Bash script

To set the required environment variables from a bash file before starting your application:

```bash
# Set environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# Set additional Datadog environment variables
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Start your application
dotnet example.dll
```

#### Linux Docker container

To set the required environment variables on a Linux Docker container:

  ```docker
  # Set environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # Set additional Datadog environment variables
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (per service)

When using `systemctl` to run .NET applications as a service, you can add the required environment variables to be loaded for a specific service.

1. Create a file called `environment.env` containing:

    ```ini
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. In the service's configuration file, reference this as an [`EnvironmentFile`][1] in the service block:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Restart the .NET service for the environment variable settings to take effect.

#### `systemctl` (all services)

<div class="alert alert-warning">
  <strong>Note:</strong> The .NET runtime tries to load a profiler into <em>any</em> .NET process that is started with these environment variables set. You should limit instrumentation to only the applications that need to be traced. <strong>Don't set these environment variables globally as this causes <em>all</em> .NET processes on the host to load the profiler.</strong>
</div>

When using `systemctl` to run .NET applications as a service, you can also set environment variables to be loaded for all services run by `systemctl`.

1. Set the required environment variables by running [`systemctl set-environment`][6]:

    ```bash
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # Set additional Datadog environment variables
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Verify that the environment variables were set by running `systemctl show-environment`.

3. Restart the .NET service for the environment variables to take effect.

[1]: /tracing/trace_collection/compatibility/dotnet-core
[2]: /agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /tracing/trace_collection/library_config/dotnet-core/
[5]: /tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /tracing/_trace_collection/library_injection_local/
[12]: https://www.nuget.org/packages/Datadog.Trace
[13]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[14]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
[15]: https://www.nuget.org/packages/Datadog.Trace.Bundle
[16]: https://github.com/DataDog/dd-trace-dotnet/releases


{{< /programming-lang >}}
{{< programming-lang lang="dotnet-framework" >}}

#### Install the tracer

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, or from an application on a Linux host or container, as an alternative to the following instructions, you can inject the tracing library into your application. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries</a> for instructions.</div>

Install the Datadog .NET Tracer machine-wide so that all services on the machine are instrumented or on a per-application basis, so developers can manage the instrumentation through the application's dependencies. To see machine-wide installation instructions, click the Windows tab. To see per-application installation instructions, click the NuGet tab.

#### Windows

To install the .NET Tracer machine-wide:

1. Download the [.NET Tracer MSI installer][6]. Select the MSI installer for the architecture that matches the operating system (x64 or x86).

2. Run the .NET Tracer MSI installer with administrator privileges.

You can also script the MSI setup by running the following in PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

#### NuGet

<div class="alert alert-warning">
  <strong>Note:</strong> This installation does not instrument applications running in IIS. For applications running in IIS, follow the Windows machine-wide installation process.
</div>

To install the .NET Tracer per-application:

1. Add the `Datadog.Trace.Bundle` [NuGet package][6] to your application.

#### Enable the tracer for your service

To enable the .NET Tracer for your service, set the required environment variables and restart the application.

For information about the different methods for setting environment variables, see [Configuring process environment variables](#configuring-process-environment-variables).

#### Windows

##### Internet Information Services (IIS)

1. The .NET Tracer MSI installer adds all required environment variables. There are no environment variables you need to configure.

2. To automatically instrument applications hosted in IIS, completely stop and start IIS by running the following commands as an administrator:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


##### Services not in IIS

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

1. Set the following required environment variables for automatic instrumentation to attach to your application:

   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. For standalone applications and Windows services, manually restart the application.

##### NuGet

Follow the instructions in the package readme, also available in [`dd-trace-dotnet` repository][12].
Docker examples are also available in the [repository][13].

#### View your live data

After enabling the .NET Tracer for your service:

1. Restart your service.

2. Create application load.

3. In Datadog, navigate to [**APM** > **APM Traces**][3].

#### Configuration

If needed, configure the tracing library to send application performance telemetry data, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

#### Custom instrumentation

Your setup for custom instrumentation depends on your automatic instrumentation and includes additional steps depending on the method:

#### Windows

<div class="alert alert-warning">
  <strong>Note:</strong> If you are using both automatic and custom instrumentation, you must keep the package versions (for example: MSI and NuGet) in sync.
</div>

To use custom instrumentation in your .NET application:

1. Add the `Datadog.Trace` [NuGet package][6] to your application.
2. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

#### NuGet

To use custom instrumentation in your .NET application:

1. In your application code, access the global tracer through the `Datadog.Trace.Tracer.Instance` property to create new spans.

For more information on adding spans and tags for custom instrumentation, see the [.NET Custom Instrumentation documentation][5].

#### Configuring process environment variables

To attach automatic instrumentation to your service, set the required environment variables before starting the application. See [Enable the tracer for your service](#enable-the-tracer-for-your-service) section to identify which environment variables to set based on your .NET Tracer installation method and follow the examples below to correctly set the environment variables based on the environment of your instrumented service.

#### Windows

<div class="alert alert-info">Starting v2.14.0, you don't need to set <code>COR_PROFILER</code> if you installed the tracer using the MSI.</div>

#### Windows services

##### Registry Editor

In the Registry Editor, create a multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` key and set the value data to:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Using the Registry Editor to create environment variables for a Windows service" >}}

##### PowerShell

```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```

#### IIS

After installing the MSI, no additional configuration is needed to automatically instrument your IIS sites. To set additional environment variables that are inherited by all IIS sites, perform the following steps:

1. Open the Registry Editor, find the multi-string value called `Environment` in the `HKLM\System\CurrentControlSet\Services\WAS` key, and add the environment variables, one per line. For example, to add logs injection and runtime metrics, add the following lines to the value data:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Run the following commands to restart IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Using the Registry Editor to create environment variables for all IIS sites" >}}

#### Console applications

To automatically instrument a console application, set the environment variables from a batch file before starting your application:

```bat
rem Set environment variables
SET COR_ENABLE_PROFILING=1
rem Unless v2.14.0+ and you installed the tracer with the MSI
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Set additional Datadog environment variables
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

[1]: /tracing/compatibility_requirements/dotnet-framework
[2]: /agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /tracing/trace_collection/library_config/dotnet-framework/
[5]: /tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.nuget.org/packages/Datadog.Trace.Bundle
[11]: /tracing/_trace_collection/library_injection_local/
[12]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[13]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][2].

### Option 2 - Inject the library locally at the Agent

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,php,cpp,dotnet-core,dotnet-framework" >}}
{{< programming-lang lang="java" >}}

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it can modify class files at load time.

**Note:** Classes loaded with remote ClassLoader are not instrumented automatically.

Instrumentation may come from auto-instrumentation, the OpenTracing API, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's NanoTime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stack traces which are unhandled by the application
- A total count of traces (requests) flowing through the system

[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-core" >}}
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-framework" >}}
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

For Kubernetes, hosts, and containers, you can inject the tracing library locally at the Agent without modifying your application code. For more information and instructions, read [Injecting Libraries Locally][4].

- For Kubernetes, you can inject the library into applications written in Java, Python, Node.js, .NET, and Ruby.
- **Beta**: For Linux hosts and containers, you can inject the library into applications written in Java, Python, Node.js, and .NET.

### Option 3 - Inject the library remotely from the Datadog UI

For Kubernetes, you can inject the Java, Python, and Node.js tracing libraries from the Datadog UI. For more information and instructions, read [Injecting Libraries Remotely][5].

## APM setup tutorials

The following tutorials guide you through setting up distributed tracing for a sample application on various infrastructure scenarios, with both automatic and custom instrumentation, using the direct method ([Option 1](#option-1---add-the-library-directly-to-your-application-code)):

{{< whatsnext desc="Choose your language and environment:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Python Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Python Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Python Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Java Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Java Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Java Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Enabling Tracing for a Java Application on GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Enabling Tracing for a Java Application on AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Java Application in AWS ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Java Application in AWS ECS with Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Enabling Tracing for a Java Application with the Admission Controller{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Go Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Go Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Go Application in AWS ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Go Application in AWS ECS with Fargate{{< /nextlink >}}

{{< /whatsnext >}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/compatibility/
[2]: /developers/community/libraries/#apm-tracing-client-libraries
[3]: /profiler/enabling/
[4]: /tracing/trace_collection/library_injection_local/
[5]: /tracing/trace_collection/library_injection_remote/