---
title: NodeJS Manual Instrumentation
kind: documentation
decription: 'Manually instrument your NodeJS application to send custom traces to Datadog.'
further_reading:
    - link: 'tracing/guide/instrument_custom_method'
      tag: 'Guide'
      text: 'Instrument a custom method to get deep visibility into your business logic'
    - link: 'tracing/connect_logs_and_traces'
      tag: 'Documentation'
      text: 'Connect your Logs and Traces together'
    - link: 'tracing/opentracing'
      tag: 'Documentation'
      text: 'Implement Opentracing across your applications'
    - link: 'tracing/visualization/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---

If you aren’t using supported library instrumentation (see [Library compatibility][1]), you may want to manually instrument your code. The following example initializes a Datadog Tracer and creates a [span][2] called `web.request`:

```javascript
const tracer = require('dd-trace').init();
const span = tracer.startSpan('web.request');

span.setTag('http.url', '/login');
span.finish();
```

For more information on manual instrumentation, see the [API documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup/nodejs/#compatibility
[2]: /tracing/visualization/#spans
[3]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
