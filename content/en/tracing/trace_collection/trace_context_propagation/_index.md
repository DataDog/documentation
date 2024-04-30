---
title: Propagating the Trace Context
kind: documentation
type: multi-code-lang
description: 'Extract and inject Datadog, B3, and W3C Trace Context headers to propagate the context of a distributed trace.'
aliases:
further_reading:
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Understand APM terminology'
    - link: 'https://www.datadoghq.com/blog/monitor-otel-with-w3c-trace-context/'
      tag: 'Blog'
      text: 'Monitor OpenTelemetry-instrumented apps with support for W3C Trace Context'
    - link: '/opentelemetry/guide/otel_api_tracing_interoperability'
      tag: 'Documentation'
      text: 'Interoperability of OpenTelemetry API and Datadog instrumented traces'
---

W3C Trace Context propagation is available for all supported languages. The default trace propagation style for all languages is `datadog,tracecontext`. Envoy and nginx proxies use the default of `tracecontext,datadog`.

For more information about each language's configuration options for trace context propagation, see the following pages:

{{< partial name="apm/apm-context-propagation" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
