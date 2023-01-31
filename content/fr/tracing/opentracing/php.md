---
title: OpenTracing PHP
kind: documentation
description: Appliquez la norme OpenTracing au traceur de l'APM PHP de Datadog.
further_reading:
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Le traceur PHP prend en charge OpenTracing via la [bibliothèque **opentracing/opentracing**][1], qui est installée avec Composer :

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

Lorsque l'[instrumentation automatique][2] est activée, un traceur compatible avec OpenTracing est utilisé en tant que traceur global :

```php
<?php
  $otTracer = \OpenTracing\GlobalTracer::get();
  $span = $otTracer->startActiveSpan('web.request')->getSpan();
  $span->setTag('span.type', 'web');
  $span->setTag('http.method', $_SERVER['REQUEST_METHOD']);
  // ...Utiliser OpenTracing comme prévu
?>
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/opentracing/opentracing-php
[2]: /fr/tracing/setup/php/#automatic-instrumentation