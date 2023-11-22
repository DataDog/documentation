---
title: Custom Instrumentation with the OpenTelemetry API
kind: documentation
type: multi-code-lang
description: 'Sending spans from custom instrumentation through the OpenTelemetry API to the Datadog tracing libraries.'
aliases:
further_reading:
    - link: '/opentelemetry/'
      tag: 'Documentation'
      text: 'OpenTelemetry in Datadog'
    - link: '/tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
    - link: 'https://www.datadoghq.com/blog/opentelemetry-instrumentation/'
      tag: 'Blog'
      text: 'Learn More about Datadog and the OpenTelemetry initiative'
---

## Overview

Datadog tracing libraries provide an implementation of the [OpenTelemetry API][1] for instrumenting your code. This means you can maintain vendor-neutral instrumentation of all your services, while still taking advantage of Datadog's native implementation, features, and products. 

By instrumenting your code with OpenTelemetry API:

- Your code remains free of vendor-specific API calls.
- Your code does not depend on Datadog tracing libraries at compile time (only runtime).
- Your code does not use the deprecated OpenTracing API.
- The traces produced by your running code can be processed, analyzed, and monitored alongside Datadog traces and in Datadog proprietary products such as [Continuous Profiler][3], [Data Streams Monitoring][4], [Application Security Management][5], and [Live Processes][6].

{{% otel-custom-instrumentation %}}

{{< partial name="apm/apm-otel-instrumentation.html" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/specs/otel/trace/api/
[3]: /profiler/
[4]: /data_streams/
[5]: /security/application_security/
[6]: /infrastructure/process