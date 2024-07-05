---
title: Serverless and OpenTelemetry
further_reading:
  - link: '/opentelemetry/'
    tag: 'Documentation'
    text: 'OpenTelemetry in Datadog'
---

[OpenTelemetry][1] is an open source observability framework that provides IT teams with standardized protocols and tools for collecting and routing telemetry data.

If your code is custom instrumented with the [OpenTelemetry API][2], or you want to write vendor-agnostic custom instrumentation code, you can configure it to generate Datadog-style spans and traces. You can then process these spans and traces with the Datadog tracing library for your language, and send the data to Datadog.

### AWS Lambda

See [AWS Lambda and OpenTelemetry][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /tracing/trace_collection/otel_instrumentation/
[4]: /serverless/aws_lambda/opentelemetry