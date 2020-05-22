---
title: PHP OpenTracing
kind: documentation
description: 'Implement the OpenTracing standard with the Datadog PHP APM tracer.'
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

The PHP tracer supports OpenTracing via the [**opentracing/opentracing** library][1] which is installed with Composer:

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][2] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
<?php
  $otWrapper = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
  \OpenTracing\GlobalTracer::set($otWrapper);
  $span = $otTracer->startActiveSpan('web.request')->getSpan();
  $span->setTag('span.type', 'web');
  $span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
  // ...Use OpenTracing as expected
?>
```

<div class="alert alert-info">Before ddtrace version 0.46.0, an OpenTracing compatible tracer was automatically returned from <code>OpenTracing\GlobalTracer::get()</code> without the need to set the global tracer manually.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-php
[2]: /tracing/setup/php/#automatic-instrumentation
