---
aliases:
- /fr/tracing/connect_logs_and_traces/php
code_lang: php
code_lang_weight: 70
description: Associez vos logs PHP à vos traces pour les mettre en corrélation dans
  Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentation
  text: Instrumenter vos applications manuellement pour créer des traces
- link: tracing/glossary/
  tag: Documentation
  text: Explorer vos services, ressources et traces
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: GitHub
  text: Corréler automatiquement vos logs de requête avec vos traces
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
title: Mettre en corrélation vos logs PHP avec vos traces
type: multi-code-lang
---

## Injection automatique

À partir de la version `0.89.0`, le traceur PHP injecte automatiquement les identifiants de corrélation des traces dans les logs d'application. Pour activer l'injection automatique, définissez la variable d'environnement `DD_LOGS_INJECTION` (paramètre INI `datadog.logs_injection`) sur `true`.

Le traceur PHP prend en charge les loggers conformes au standard PSR-3, tels que [Monolog][4] ou [Laminas Log][5].

<div class="alert alert-warning">
  <strong>Remarque</strong> : configurez votre bibliothèque de journalisation de façon à ce que vos logs soient générés au format JSON. De cette façon :
  <ul>
    <li>Vous n'aurez pas besoin de définir des <a href="/logs/log_configuration/parsing">règles de parsing personnalisées</a>.</li>
    <li>Les stack traces seront correctement intégrées dans l'événement de log.</li>
  </ul>
</div>

### Configurer l'injection dans les logs

Si vous ne l'avez pas encore fait, configurez le tracer PHP avec `DD_ENV`, `DD_SERVICE` et `DD_VERSION` afin d'ajouter les tags `env`, `service` et `version` dans vos logs de manière optimale (voir la section [Tagging de service unifié][6] pour en savoir plus).

Le traceur PHP offre différents moyens de configurer l'injection des identifiants de corrélation des traces dans vos logs :
- [En ajoutant les identifiants de corrélation des traces dans le contexte du log](#ajouter-les-identifiants-de-correlation-des-traces-dans-le-contexte-du-log)
- [En utilisant des placeholders dans votre message](#utiliser-des-placeholders-dans-votre-message)

#### Ajouter les identifiants de corrélation des traces dans le contexte du log (#ajouter-les-identifiants-de-correlation-des-traces-dans-le-contexte-du-log)

Par défaut, le traceur PHP ajoute les identifiants de corrélation des traces dans le contexte du log.

Par exemple, si vous utilisez la bibliothèque [Monolog][4] dans une application Laravel comme suit :

```php
use Illuminate\Support\Facades\Log;
# ...
Log::debug('Hello, World!');
```

Le traceur PHP ajoute les identifiants de corrélation des traces disponibles au contexte du log. Le message ci-dessus peut ainsi devenir :

```
[2022-12-09 16:02:42] production.DEBUG: Hello, World! {"dd.trace_id":"1234567890abcdef","dd.span_id":"1234567890abcdef","dd.service":"laravel","dd.version":"8.0.0","dd.env":"production","status":"debug"}
```

**Remarque** : si votre message contient un placeholder ou qu'un ID de trace y est déjà présent, le traceur PHP n'ajoute **pas** les identifiants de corrélation des traces au contexte du log.

#### Utiliser des placeholders dans votre message {#utiliser-des-placeholders-dans-votre-message}

Vous pouvez utiliser des placeholders dans votre message pour injecter automatiquement les identifiants de corrélation des traces dans vos logs. Le traceur PHP prend en charge les placeholders suivants :
- `%dd.trace_id%` : l'ID de la trace
- `%dd.span_id%` : l'ID de la span
- `%dd.service%` : le nom du service
- `%dd.version%` : la version du service
- `%dd.env%` : l'environnement du service

Les placeholders sont sensibles à la casse et doivent être placés entre des caractères `%`.

Par exemple, si vous utilisez la bibliothèque [Monolog][4] dans une application Laravel , vous pouvez configurer l'injection dans un message de log comme suit :

```php
use Illuminate\Support\Facades\Log;
# ...
Log::info('Hello, World! [%dd.trace_id% %dd.span_id% %status%]');
```

Le traceur PHP remplace les placeholders par les valeurs correspondantes. Le message du log peut ainsi devenir :

```
[2022-12-09 16:02:42] production.INFO: Hello, World! [dd.trace_id="1234567890abcdef" dd.span_id="1234567890abcdef" status="info"]
```

**Remarque** : les crochets sont obligatoires si vous prévoyez d'utiliser les règles de parsing par défaut fournies dans le [pipeline de log][7] PHP. Si vous utilisez une règle de parsing personnalisée, vous pouvez omettre les crochets si vous le souhaitez.


## Injection manuelle

<div class="alert alert-warning">
<strong>Remarque :</strong> la fonction <code>\DDTrace\current_context()</code>, ajoutée dans la version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.61.0">0.61.0</a>, renvoie les identifiants des traces en tant que nombre décimal.
</div>

Pour associer vos logs et vos traces, vos logs doivent contenir les attributs `dd.trace_id` et `dd.span_id`, qui contiennent respectivement votre ID de trace et votre ID de span.

Si vous n’utilisez pas une [intégration de log de Datadog][1] pour parser vos logs, des règles de parsing de log personnalisées doivent s’assurer que `dd.trace_id` et `dd.span_id` sont parsés en tant que chaînes de caractères et remappés via le [remappeur de traces][2]. Pour en savoir plus, consultez la section [Les logs corrélés ne s'affichent pas dans le volet des ID de trace][3].

Par exemple, ces deux attributs seront ajoutés à vos logs de la manière suivante :

```php
  <?php
  $append = sprintf(
      ' [dd.trace_id=%s dd.span_id=%s]',
      \DDTrace\logs_correlation_trace_id(),
      \dd_trace_peek_span_id()
  );
  my_error_logger('Error message.' . $append);
?>
```

Si le logger implémente la [bibliothèque **monolog/monolog**][4], utilisez `Logger::pushProcessor()` pour ajouter automatiquement les identifiants à tous les messages de log. Pour monolog v1, ajoutez la configuration suivante :

```php
<?php
  $logger->pushProcessor(function ($record) {
      $record['message'] .= sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      );
      return $record;
  });
?>
```

Pour monolog v2, ajoutez la configuration suivante :

```php
<?php
  $logger->pushProcessor(function ($record) {
      return $record->with(message: $record['message'] . sprintf(
          ' [dd.trace_id=%s dd.span_id=%s]',
          \DDTrace\logs_correlation_trace_id(),
          \dd_trace_peek_span_id()
      ));
    });
  ?>
```

Si votre application utilise le format JSON pour les logs, vous pouvez ajouter une clé de premier niveau `dd` contenant le `trace_id` et le `span_id` au lieu d'ajouter le `trace_id` et le `span_id` dans le message du log :

```php
<?php
  $logger->pushProcessor(function ($record) use ($context) {
      $record['dd'] = [
          'trace_id' => \DDTrace\logs_correlation_trace_id(),
          'span_id'  => \dd_trace_peek_span_id()
      ];

      return $record;
  });
?>
```

Pour monolog v3, ajoutez la configuration suivante :

```php
<?php
  $logger->pushProcessor(function ($record) {
        $record->extra['dd'] = [
            'trace_id' => \DDTrace\logs_correlation_trace_id(),
            'span_id'  => \dd_trace_peek_span_id()
        ];
        return $record;
    });
?>
```

Si vous ingérez vos logs au format JSON, accédez à la section [Prétraitement de logs JSON][8] et ajoutez `extra.dd.trace_id` dans le champ **Trace Id Attributes**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/php/
[2]: /fr/logs/log_configuration/processors/#trace-remapper
[3]: /fr/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[4]: https://github.com/Seldaek/monolog
[5]: https://github.com/laminas/laminas-log
[6]: /fr/getting_started/tagging/unified_service_tagging
[7]: /fr/logs/log_configuration/pipelines
[8]: https://app.datadoghq.com/logs/pipelines/remapping