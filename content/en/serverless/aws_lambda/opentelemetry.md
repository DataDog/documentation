---
title: AWS Lambda and OpenTelemetry
further_reading:
  - link: '/opentelemetry/'
    tag: 'Documentation'
    text: 'OpenTelemetry in Datadog'
---

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data.

This page discusses using OpenTelemetry with Datadog Serverless Monitoring for AWS Lambda. For more information, including how to use OpenTelemetry in non-serverless environments, see [OpenTelemetry in Datadog][2].

## Instrument AWS Lambda with OpenTelemetry

First, install the [Datadog Lambda Extension layer][3].

Then, choose how to instrument your AWS Lambda functions:

{{< tabs >}}
{{% tab "Datadog tracers" %}}
The Datadog tracing library, which is included in the Datadog Lambda Extension upon installation, accepts custom spans and traces created with OpenTelemetry-instrumented code, processes the telemetry, and sends it to Datadog.

Set the environment variable `DD_TRACE_OTEL_ENABLED` to `true` in your Lambda function.

See [Custom instrumentation with the OpenTelemetry API][1] for runtime-specific instructions.

[1]: /tracing/trace_collection/otel_instrumentation/
{{% /tab %}}

{{% tab "OpenTelemetry SDK" %}}
You can send OpenTelemetry traces from any OpenTelemetry SDK through the Datadog Lambda Extension. This approach is analogous to [OLTP Ingest in the Datadog Agent][1]. It is recommended in situations where tracing support may not be available for your runtime (for example, Rust or PHP). 

Use the endpoint `http://localhost:4318/v1/traces`.

Enable OpenTelemetry in the Datadog Extension with the environment variable `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` set to `localhost:4318` (for HTTP) or `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` set to `localhost:4317` (for gRPC).

[1]: /opentelemetry/interoperability/otlp_ingest_in_the_agent/?tab=host

{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: /opentelemetry
[3]: /serverless/libraries_integrations/extension/
