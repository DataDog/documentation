---
title: PHP OpenTracing Instrumentation
kind: documentation
aliases:
- /tracing/setup_overview/open_standards/php
- /tracing/trace_collection/open_standards/php
- /tracing/trace_collection/opentracing/php
description: 'OpenTracing instrumentation for PHP'
code_lang: php
type: multi-code-lang
code_lang_weight: 50
---

The PHP tracer supports OpenTracing through the [**opentracing/opentracing** library][1] which is installed with Composer:

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][2] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
<?php
// Set the global tracer once, right after the composer autoload.php import.
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);

// Anywhere a span is required
$scope = $otTracer->startActiveSpan('web.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', 'resource_name');
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Use OpenTracing as expected
$scope->close();
?>
```

<div class="alert alert-info">Before ddtrace version 0.46.0, an OpenTracing compatible tracer was automatically returned from <code>OpenTracing\GlobalTracer::get()</code> without the need to set the global tracer manually.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /tracing/setup/php/#automatic-instrumentation
