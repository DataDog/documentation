---
title: Node.js OpenTracing Instrumentation
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/nodejs
- /tracing/trace_collection/open_standards/nodejs
- /tracing/trace_collection/opentracing/nodejs/
description: 'OpenTracing instrumentation for Node.js'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
---


<div class="alert alert-info">OpenTracing support is based on a deprecated specification. If you want to instrument your code with an open spec, use OpenTelemetry instead. Try the beta support for <a href="/tracing/trace_collection/otel_instrumentation/">processing data from OpenTelemetry instrumentation in Datadog Tracing Libraries</a>.</div>

OpenTracing support is included in the `dd-trace` package.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

Use the tracer like in any other OpenTracing application.

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for the span. The service name from the tracer will be used if this is not provided.
* `resource.name`: The resource name to be used for the span. The operation name will be used if this is not provided.
* `span.type`: The span type to be used for the span. Will fallback to `custom` if not provided.

See [opentracing.io][1] for OpenTracing Node.js usage.



[1]: https://opentracing.io/guides/javascript/
