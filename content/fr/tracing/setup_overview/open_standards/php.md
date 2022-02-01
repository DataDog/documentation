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
// Définir le traceur global une seule fois, juste après l'importation de autoload.php par composer.
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
\OpenTracing\GlobalTracer::set($otTracer);

// À n'importe quel endroit où une span est requise
$scope = $otTracer->startActiveSpan('web.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', 'resource_name');
$span->setTag('span.type', 'web');
$span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
// ...Utiliser OpenTracing comme prévu
$scope->close();
?>
```

<div class="alert alert-info">Avant ddtrace version 0.46.0, un traceur compatible avec OpenTracing était automatiquement renvoyé par <code>OpenTracing\GlobalTracer::get()</code> sans avoir à configurer le traceur global manuellement.</div>


[1]: https://github.com/opentracing/opentracing-php
[2]: /fr/tracing/setup/php/#automatic-instrumentation