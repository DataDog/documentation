---
title: Configuring the Go Tracing Library
kind: documentation
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
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired.

Datadog recommends using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

Read the [Unified Service Tagging][1] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

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
See all available options in the [configuration documentation][2].

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
: Enable ingestion rate control.

`DD_TRACE_RATE_LIMIT`
: Maximum number of spans to sample per-second, per-Go process. Defaults to 100 when DD_TRACE_SAMPLE_RATE is set. Otherwise, delegates rate limiting to the Datadog Agent.

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



## Configure APM environment name

The [APM environment name][3] may be configured [in the Agent][4] or using the [WithEnv][2] start option of the tracer.

## B3 headers extraction and injection

The Datadog APM tracer supports [B3 headers extraction][5] and injection for distributed tracing.

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

[1]: /getting_started/tagging/unified_service_tagging
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[3]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[4]: /getting_started/tracing/#environment-name
[5]: https://github.com/openzipkin/b3-propagation
