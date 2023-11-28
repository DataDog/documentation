---
title: Custom Instrumentation of Go Applications with the OpenTelemetry API
kind: documentation
description: 'Instrument your Go application with OpenTelemetry API to send traces to Datadog'
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

{{% otel-custom-instrumentation %}}

## Requirements and limitations

- Datadog Go tracing library `dd-trace-go` version 1.5.0 or greater.
- Go version 1.18 or greater.
- The Datadog OpenTelemetry API implementation is dependent on upstream [OpenTelemetry Go][6].

The following OpenTelemetry features are implemented in the Datadog library as noted:

| Feature                               | Support notes                       |
|---------------------------------------|------------------------------------|
| [OpenTelemetry Context propagation][1]         | [Datadog distributed header format][9] is used instead. |
| [Span processors][2]                  | Unsupported                                          |
| [Span Exporters][3]                   | Unsupported                                            |
| Trace/span [ID generators][4]         | ID generation is performed by `ddtrace`.           |


## Configuring OpenTelemetry to use the Datadog trace provider

1. Add your desired manual OpenTelemetry instrumentation to your Go code following the [OpenTelemetry Go Manual Instrumentation documentation][5].

2. Install the OpenTelemetry package `go.opentelemetry.io/otel` using the command:

   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Install the Datadog OpenTelemetry wrapper package `gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry` using the command:

   ```shell
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry
   ```

4. Import packages in the code:

   ```go
   import (
     "go.opentelemetry.io/otel"
     ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
   )
   ```

5. Create a TracerProvider, optionally providing a set of options, that are specific to Datadog APM, and defer the Shutdown method, which stops the tracer:

   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. Use the Tracer Provider instance with the OpenTelemetry API to set the global TracerProvider:

   ```go
   otel.SetTracerProvider(provider)
   ```
   
7. Run your application.

Datadog combines these OpenTelemetry spans with other Datadog APM spans into a single trace of your application.


[1]: https://opentelemetry.io/docs/instrumentation/go/manual/#propagators-and-context
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/go/manual/
[6]: https://opentelemetry.io/docs/instrumentation/go/
[9]: /tracing/trace_collection/trace_context_propagation/go/
