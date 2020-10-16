
---
title: Tracing Go Applications
kind: documentation
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
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
## Compatibilty Requirements

The Go Tracer requires Go `1.12+` and Datadog Agent `>= 5.21.1`.  For a full list of supported libraries, visit the [Compatibility Requirements][1] page.

## Installation and Getting Started

For configuration instructions and details about using the API, see the Datadog [API documentation][2]. For manual instrumentation, use the [integrations section](#integrations) below for Go libraries and frameworks supporting automatic instrumentation.

For a description of the terminology used in APM, see the [Getting started with APM section][3]. For details about contributing, check the official repository [README.md][4].

Consult the [migration document][5] if you need to migrate from an older version of the tracer (e.g. v<0.6.x) to the newest version.

### Installation

#### Follow the in-app documentation (Recommended)

Follow the [Quickstart instructions][6] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, App Analytics, and Trace ID injection into logs during setup.

Otherwise, [install and configure the Datadog Agent][7]. See the additional documentation for [tracing Docker applications][8] or [Kubernetes applications][9].

Next, install the Go tracer from its canonical import path:

```go
go get gopkg.in/DataDog/dd-trace-go.v1/...
```

You are now ready to import the tracer and start instrumenting your code.

## Automatic Instrumentation

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page.  To trace these integrations, import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].



## Configuration

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][10].

We highly recommend using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.
Check out the [Unified Service Tagging][11] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

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

### Change Agent Hostname

The Go Tracing Module automatically looks for and initializes with the environment variables `DD_AGENT_HOST` and `DD_AGENT_APM_PORT`.

But you can also set a custom hostname and port in code:

```go
package main

import (
    "net"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    addr := net.JoinHostPort(
        "custom-hostname",
        "1234",
    )
    tracer.Start(tracer.WithAgentAddr(addr))
    defer tracer.Stop()
}
```

## Configure APM Environment Name

The [APM environment name][12] may be configured [in the agent][13] or using the [WithEnv][10] start option of the tracer.

### B3 Headers Extraction and Injection

The Datadog APM tracer supports [B3 headers extraction][14] and injection for distributed tracing.

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
[6]: https://app.datadoghq.com/apm/docs
[7]: /tracing/send_traces/
[8]: /tracing/setup/docker/
[9]: /agent/kubernetes/apm/
[10]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[11]: /getting_started/tagging/unified_service_tagging
[12]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[13]: /getting_started/tracing/#environment-name
[14]: https://github.com/openzipkin/b3-propagation
