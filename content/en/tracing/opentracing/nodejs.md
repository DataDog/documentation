---
title: NodeJS OpenTracing
kind: documentation
description: 'Implement the OpenTracing standard with the Datadog NodeJS APM tracer.'
further_reading:
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

This library is OpenTracing compliant. Use the ([OpenTracing API][1] and the Datadog Tracer ([dd-trace][2]) library to measure execution times for specific pieces of code. In the following example, a Datadog Tracer is initialized and used as a global tracer:

```javascript
// server.js

const tracer = require('dd-trace').init();
const opentracing = require('opentracing');

opentracing.initGlobalTracer(tracer);

const app = require('./app.js');

// app.js

const tracer = opentracing.globalTracer();
```

The following tags are available to override Datadog specific options:

- `service.name`: The service name to be used for this span. The service name from the tracer is used if this is not provided.
- `resource.name`: The resource name to be used for this span. The operation name is used if this is not provided.
- `span.type`: The span type to be used for this span. The span type falls back to `custom` if not provided.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://doc.esdoc.org/github.com/opentracing/opentracing-javascript
[2]: https://datadog.github.io/dd-trace-js
