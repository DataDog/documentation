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

W3C trace propagation and 128 bit headers is available for all supported languages. The default trace propagation style for each language is:

| Language | Default inject and extract setting |
| -------- | ---------------------------------- |
| Java     | `datadog,tracecontext`             |
| Python   | `tracecontext,datadog`             |
| Ruby     | `datadog,tracecontext`             |
| Go       | `tracecontext,datadog`             |
| Node.js  | `datadog,tracecontext`             |
| PHP      | `tracecontext,datadog`             |
| .NET     | `tracecontext,datadog`             |
| C++      | `datadog,tracecontext` or with Envoy or nginx proxies: `tracecontext,Datadog` |


{{< partial name="apm/apm-context-propagation" >}}


<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/otel_tracing/
