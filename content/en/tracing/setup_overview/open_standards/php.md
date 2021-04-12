---
title: PHP Open Standards
kind: documentation
description: 'Open Standards for PHP'
code_lang: php
type: multi-code-lang
code_lang_weight: 50
---

## OpenTracing

The PHP tracer supports OpenTracing via the [**opentracing/opentracing** library][1] which is installed with Composer:

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

When [automatic instrumentation][2] is enabled, an OpenTracing-compatible tracer is made available as the global tracer:

```php
<?php
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Use OpenTracing as expected
?>
```

<div class="alert alert-info">Before ddtrace version 0.46.0, an OpenTracing compatible tracer was automatically returned from <code>OpenTracing\GlobalTracer::get()</code> without the need to set the global tracer manually.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /tracing/setup/php/#automatic-instrumentation
