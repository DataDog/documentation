---
title: NodeJS Open Standards
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/nodejs
description: 'Open Standards for NodeJS'
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 40
---

## OpenTracing

OpenTracing support is included in the `dd-trace` package.

```javascript
const tracer = require('dd-trace').init()
const opentracing = require('opentracing')

opentracing.initGlobalTracer(tracer)
```

The tracer can now be used like in any other OpenTracing application.

The following tags are available to override Datadog specific options:

* `service.name`: The service name to be used for the span. The service name from the tracer will be used if this is not provided.
* `resource.name`: The resource name to be used for the span. The operation name will be used if this is not provided.
* `span.type`: The span type to be used for the span. Will fallback to `custom` if not provided.

See [opentracing.io][1] for OpenTracing NodeJS usage.



[1]: https://opentracing.io/guides/javascript/
