---
title: Standards ouverts PHP
kind: documentation
description: Standards ouverts pour PHP
code_lang: php
type: multi-code-lang
code_lang_weight: 50
---
## OpenTracing

Le traceur PHP prend en charge OpenTracing via la [bibliothèque **opentracing/opentracing**][1], qui est installée avec Composer :

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

Lorsque l'[instrumentation automatique][2] est activée, un traceur compatible avec OpenTracing est utilisé en tant que traceur global :

```php
<?php
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);
$span = $otTracer->startActiveSpan('web.request')->getSpan();
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Utiliser OpenTracing comme prévu
?>
```

<div class="alert alert-info">Avant ddtrace version 0.46.0, un traceur compatible avec OpenTracing était automatiquement renvoyé par <code>OpenTracing\GlobalTracer::get()</code> sans avoir à configurer le traceur global manuellement.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /fr/tracing/setup/php/#automatic-instrumentation