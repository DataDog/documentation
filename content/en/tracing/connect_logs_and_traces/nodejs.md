---
title: Connecting NodeJS Logs and Traces
kind: documentation
description: 'Connect your NodeJS logs and traces to correlate them in Datadog.'
further_reading:
    - link: 'tracing/manual_instrumentation'
      tag: 'Documentation'
      text: 'Instrument manually your application to create traces.'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications.'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
      tag: 'Blog'
      text: 'Correlate request logs with traces automatically'
    - link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
      tag: 'Guide'
      text: 'Ease troubleshooting with cross product correlation.'
---

## Automatically Inject Trace and Span IDs

Enable injection with the environment variable `DD_LOGS_INJECTION=true` or by configuring the tracer directly:

```javascript
const tracer = require('dd-trace').init({
    logInjection: true
});
```

This enables automatic trace ID injection for `bunyan`, `paperplane`, `pino`, and `winston`.

If you haven't done so already, configure the NodeJS tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`. This will provide the best
experience for adding `env`, `service`, and `version` (see [Unified Service Tagging][1] for more details).

**Note**: Automatic injection only works for logs formatted as JSON.

## Manually Inject Trace and Span IDs

If you are using a logging library not supported for automatic injection but are using JSON format, it's possible to do manual injection directly in your code.

Example using `console` as the underlying logger:

```javascript
const tracer = require('dd-trace');
const formats = require('dd-trace/ext/formats');

class Logger {
    log(level, message) {
        const span = tracer.scope().active();
        const time = new Date().toISOString();
        const record = { time, level, message };

        if (span) {
            tracer.inject(span.context(), formats.LOG, record);
        }

        console.log(JSON.stringify(record));
    }
}

module.exports = Logger;
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
