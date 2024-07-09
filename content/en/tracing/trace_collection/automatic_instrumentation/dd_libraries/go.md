---
title: Tracing Go Applications
aliases:
- /tracing/go/
- /tracing/languages/go
- /agent/apm/go/
- /tracing/setup/go
- /tracing/setup_overview/go
- /tracing/setup_overview/setup/go
- /tracing/trace_collection/dd_libraries/go
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Source code"
- link: "https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  tag: "External Site"
  text: "Package page"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
---

## Compatibility requirements

The Go Tracer requires Go `1.18+` and Datadog Agent `>= 5.21.1`. For a full list of Datadog's Go version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][5].

### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/go
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/go/
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace
[5]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
