---
title: Configuring the Go Tracing Library
code_lang: go
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "https://github.com/DataDog/dd-trace-go/tree/v1"
  tag: "Source Code"
  text: "Source code"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "Package page"
- link: "https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace"
  tag: "External Site"
  text: "v2 Package page"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/trace_collection/trace_context_propagation/"
  tag: "Documentation"
  text: "Propagating trace context"
- link: "/opentelemetry/interoperability/environment_variable_support"
  tag: "Documentation"
  text: "OpenTelemetry Environment Variable Configurations"
---

After you [set up the tracing library with your code, configure the Agent to collect APM data, and activate the Go integration][1], start the tracer and configure the library as desired. {{% tracing-go-v2 %}}

{{% apm-config-visibility %}}

Datadog recommends using `DD_ENV`, `DD_SERVICE`, and `DD_VERSION` to set `env`, `service`, and `version` for your services.

Read the [Unified Service Tagging][2] documentation for recommendations on how to configure these environment variables. These variables are available for versions 1.24.0+ of the Go tracer.

You may also elect to provide `env`, `service`, and `version` through the tracer's API:

```go
package main

import (
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
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

    // If you expect your application to be shut down by SIGTERM (for example, a container in Kubernetes),
    // you might want to listen for that signal and explicitly stop the tracer to ensure no data is lost
    sigChan := make(chan os.Signal, 1)
    signal.Notify(sigChan, syscall.SIGTERM)
    go func() {
        <-sigChan
        tracer.Stop()
    }()
}
```

The Go tracer supports additional environment variables and functions for configuration.
See all available options in the [configuration documentation][20] (or [configuration documentation v1][3]).

## Configure APM environment name

The [APM environment name][7] may be configured [in the Agent][8] or using the [WithEnv][20] start option of the tracer.

## Configurations keys

The previous version of this configuration documentation is still available at [Configuring the Go Tracing Library (legacy)][21].

{{< partial name="apm/registry-config-list.html" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/dd_libraries/go
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartOption
[4]: /tracing/trace_pipeline/ingestion_mechanisms/
[5]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=go#pagetitle
[6]: /tracing/configure_data_security#telemetry-collection
[7]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[8]: /getting_started/tracing/#environment-name
[9]: https://github.com/openzipkin/b3-propagation
[13]: /agent/configuration/network/#configure-ports
[14]: https://github.com/w3c/trace-context
[15]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/contrib
[16]: https://www.rfc-editor.org/rfc/rfc7230#section-3.2
[17]: /tracing/metrics/runtime_metrics/?tab=go
[18]: /tracing/trace_collection/trace_context_propagation/
[19]: /opentelemetry/interoperability/environment_variable_support
[20]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartOption
[21]: /tracing/trace_collection/library_config_legacy/go/
[22]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/contrib
