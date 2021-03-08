---
title: Associer des logs PHP à des traces
kind: documentation
description: Associez vos logs PHP à vos traces pour les mettre en corrélation dans Datadog.
further_reading:
  - link: tracing/manual_instrumentation
    tag: Documentation
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
## Injecter automatiquement les ID de trace et de span

Compte tenu des nombreuses méthodes de logging pouvant être utilisées dans PHP<span class="x x-first x-last">,</span> dont certaines contournent complètement l'API de logging d'erreurs intégrée de PHP, la bibliothèque de tracing PHP de Datadog ne peut pas injecter d'<span class="x x-first x-last">ID</span> de trace et de span de manière fiable et automatique dans les logs.
Consultez la section ci-dessous pour savoir comment associer vos logs PHP et vos traces manuellement.

## Injecter manuellement des ID de trace et de span

<div class="alert alert-warning">
Veuillez noter que la fonction <code>\DDTrace\trace_id()</code> a été ajoutée avec la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.53.0">0.53.0</a>.
</div>

Pour associer vos logs et vos traces, vos logs doivent contenir les attributs `dd.trace_id` et `dd.span_id`, qui contiennent respectivement votre ID de trace et votre ID de span.

Si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent s'assurer que `dd.trace_id` et  `dd.span_id` sont analysés en tant que chaînes de caractères et remappés grâce au [remappeur de traces][2]. Pour en savoir plus, consultez la FAQ [Pourquoi mes logs mis en corrélation ne figurent-ils pas dans le volet des ID de trace ?][3].

Par exemple, ces deux attributs seront ajoutés à vos logs de la manière suivante :

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%d dd.span_id=%d]',
      \DDTrace\trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

Si le logger implémente la [bibliothèque **monolog/monolog**][4], utilisez `Logger::pushProcessor()` pour ajouter automatiquement les identifiants à tous les messages de log :

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%d dd.span_id=%d]',
          \DDTrace\trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

Si votre application utilise des logs au format json, au lieu d'ajouter les ID trace_id et span_id au message de log, vous pouvez ajouter une clé « dd » de premier niveau qui contient ces ID :

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['dd'] = [
          'trace_id' => \DDTrace\trace_id(),
          'span_id'  => \dd_trace_peek_span_id(),
      ];

      return $record;
  });
?>
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/php/
[2]: /fr/logs/processing/processors/#trace-remapper
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog