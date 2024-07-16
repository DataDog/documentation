---
aliases:
- /es/tracing/setup_overview/open_standards/php
- /es/tracing/trace_collection/open_standards/php
- /es/tracing/trace_collection/opentracing/php
code_lang: php
code_lang_weight: 50
description: ' Instrumentación de OpenTracing para PHP'
kind: documentación
title: Instrumentación de PHP OpenTracing
type: multi-code-lang
---

El rastreador de PHP admite OpenTracing a través de la [biblioteca **opentracing/opentracing**][1] que se instala con Composer:

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

Cuando la [instrumentación automática][2] está activada, se pone a disposición un rastreador compatible con OpenTracing como rastreador global:

```php
<?php
// Establece el rastreador global una vez, justo después de la importación composer autoload.php.
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);

// En cualquier lugar donde se necesita un tramo
$scope = $otTracer->startActiveSpan('web.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', 'resource_name');
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Usa OpenTracing como se espera
$scope->close();
?>
```

<div class="alert alert-info">Antes de la versión 0.46.0 de ddtrace, se devolvía automáticamente un rastreador OpenTracing compatible desde <code>OpenTracing\GlobalTracer::get()</code> sin necesidad de establecer el rastreador global manualmente.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /es/tracing/setup/php/#automatic-instrumentation