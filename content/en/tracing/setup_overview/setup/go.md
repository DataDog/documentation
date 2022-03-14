---
title: Tracing Go Applications
kind: documentation
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
- /tracing/setup/go
- /tracing/setup_overview/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "GitHub"
  text: "Source code"
- link: "https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "GoDoc"
  text: "Package page"
- link: "/tracing/visualization/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Advanced Usage"
  text: "Advanced Usage"
---

## Compatibility requirements

The Go Tracer requires Go `1.12+` and Datadog Agent `>= 5.21.1`.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and getting started

For configuration instructions and details about using the API, see the Datadog [API documentation][2].

For a description of the terminology used in APM, see the [Getting started with APM section][3]. For details about contributing, check the official repository [README.md][4].

Use the [migration document][5] if you need to migrate from an older version of the tracer (for example, v<0.6.x) to the newest version.

When you set up tracing, you're also setting up Continuous Profiler, and you need only [enable Profiler][6] to start receiving profiling data from your app.

### Installation

#### Follow the in-app documentation (recommended)

Follow the [Quickstart instructions][7] within the Datadog for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces , and Trace ID injection into logs during setup.


Otherwise, follow the instructions below to add the Datadog Tracing Library to your code.

## Automatic instrumentation

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. To trace these integrations, import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

## Configuration


Datadog recommends using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

Read the [Unified Service Tagging][10] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithEnv("prod"),
        tracer.WithService("test-go"),
        tracer.WithServiceVersion("abc123"),
    )

    // When the tracer is stopped, it will flush everything it has to the Datadog Agent before quitting.
    // Make sure this line stays in your main function.
    defer tracer.Stop()
}
```

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][8].

`DD_VERSION`
: Set the application’s version, for example: `1.2.3`, `6c44da20`, `2020.02.13`

`DD_SERVICE`
: The service name to be used for this application.

`DD_ENV`
: Set the application’s environment, for example: prod, pre-prod, staging.

`DD_AGENT_HOST`
: **Default**: `localhost` <br>
Override the default trace Agent host address for trace submission.

`DD_DOGSTATSD_PORT`
: **Default**: `8125` <br>
Override the default trace Agent port for DogStatsD metric submission.

`DD_TRACE_SAMPLE_RATE`
: Enable [Tracing without Limits][9].

`DD_TAGS`
: **Default**: [] <br>
A list of default tags to be added to every span and profile. Tags can be separated by commas or spaces, for example: `layer:api,team:intake` or `layer:api team:intake`

`DD_TRACE_STARTUP_LOGS`
: **Default**: `true` <br>
Enable startup configuration and the diagnostic log.

`DD_TRACE_DEBUG`
: **Default**: `false` <br>
Enable debug logging in the tracer.

`DD_TRACE_ENABLED`
: **Default**: `true` <br>
Enable web framework and library instrumentation. When false, the application code doesn’t generate any traces.

`DD_SERVICE_MAPPING`
: **Default**: `null` <br>
Dynamically rename services through configuration. Services can be separated by commas or spaces, for example: `mysql:mysql-service-name,postgres:postgres-service-name`, `mysql:mysql-service-name postgres:postgres-service-name`.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   A similar rule applies to all metrics sent by the Go tracer (including Runtime Metrics and internal telemetry): the client will attempt to send Dogstatsd data to the Unix domain socket `/var/run/datadog/dsd.socket` and will default to `http://localhost:8125` if that does not exist.

   If different hosts or ports are required, one or more of the below environment variables can be used. The examples show the defaults but can be set to other values as well.

   ```
   DD_AGENT_HOST=localhost   # the host to send traces and metrics to; defaults to "localhost" when not set
   DD_TRACE_AGENT_PORT=8126  # the port to send traces to; defaults to 8126 when not set
   DD_DOGSTATSD_PORT=8125    # the port to send Dogstatsd metrics to; defaults to 8125 when not set
   ```

   The connection for traces can also be configured in code:

    ```go
    package main

    import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

    func main() {
        tracer.Start(
            // Unix Domain Socket configuration:
            tracer.WithUDS("/var/run/datadog/apm.socket"),
            // or, for a non-default TCP connection:
            // tracer.WithAgentAddr("localhost:8126"),
            // or, for an alternative UDP connection for Dogstatsd:
            // tracer.WithDogstatsdAddress("localhost:8125"),
        )
        defer tracer.Stop()

        // ...
    }
    ```
{{< site-region region="us3,us5,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

## Configure APM environment name

The [APM environment name][11] may be configured [in the agent][12] or using the [WithEnv][8] start option of the tracer.

### B3 headers extraction and injection

The Datadog APM tracer supports [B3 headers extraction][13] and injection for distributed tracing.

Distributed headers injection and extraction is controlled by
configuring injection/extraction styles. Two styles are
supported: `Datadog` and `B3`.

Configure injection styles using the environment variable
`DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

Configure extraction styles using the environment variable
`DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

The values of these environment variables are comma separated lists of
header styles that are enabled for injection or extraction. By default only
the `Datadog` extraction style is enabled.

If multiple extraction styles are enabled, extraction attempts are made
in the order that those styles are specified. The first successfully
extracted value is used.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[3]: /tracing/visualization/
[4]: https://github.com/DataDog/dd-trace-go/tree/v1#contributing
[5]: https://github.com/DataDog/dd-trace-go/tree/v1/MIGRATING.md
[6]: /tracing/profiler/enabling/?code-lang=go
[7]: https://app.datadoghq.com/apm/docs
[8]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[9]: /tracing/trace_ingestion/
[10]: /getting_started/tagging/unified_service_tagging
[11]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[12]: /getting_started/tracing/#environment-name
[13]: https://github.com/openzipkin/b3-propagation
