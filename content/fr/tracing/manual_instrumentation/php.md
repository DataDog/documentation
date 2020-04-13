---
title: Instrumentation manuelle PHP
kind: documentation
decription: Instrumentez manuellement votre application PHP afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tag: Documentation
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
Même si Datadog ne prend pas officiellement en charge votre framework Web, une instrumentation manuelle n'est pas forcément nécessaire. Consultez la section [Instrumentation automatique][1] pour en savoir plus.

Si vous devez effectuer une instrumentation manuelle, par exemple pour [tracer][2] des méthodes personnalisées spécifiques dans votre application, commencez par installer la dépendance du traceur PHP avec Composer :

```bash
composer require datadog/dd-trace
```

## Tracer une méthode ou une fonction personnalisée

La fonction `dd_trace()` se fixe aux fonctions et méthodes existantes pour :

- Ouvrir une [span][3] avant l'exécution du code
- Définir des [tags][4] ou des erreurs supplémentaires sur la span
- Fermer la span une fois le processus terminé
- Modifier les arguments ou la valeur renvoyée

Par exemple, le snippet suivant trace la méthode `CustomDriver::doWork()`, ajoute des tags personnalisés, signale les éventuelles exceptions sous la forme d'erreurs sur la span et renvoie à nouveau les exceptions.

```php
<?php
  dd_trace("CustomDriver", "doWork", function (...$args) {
      // Initialiser une nouvelle span
      $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
      $span = $scope->getSpan();

      // Accéder aux membres d'objet via $this
      $span->setTag(\DDTrace\Tag::RESOURCE_NAME, $this->workToDo);

      try {
          // Exécuter la méthode d'origine. Remarque : dd_trace_forward_call() gère automatiquement tous les paramètres
          $result = dd_trace_forward_call();
          // Définir un tag en fonction de la valeur renvoyée
          $span->setTag('doWork.size', count($result));
          return $result;
      } catch (Exception $e) {
          // Informer le traceur qu'une exception a été renvoyée
          $span->setError($e);
          // Remonter l'exception
          throw $e;
      } finally {
          // Fermer la span
          $span->finish();
      }
  });
?>
```

Vous pourrez accéder plus tard à la span racine depuis le traceur global, via `Tracer::getRootScope()`. Cela s'avère utile lorsque les métadonnées à ajouter à la span racine n'existent pas au début de l'exécution d'un script.

```php
<?php
  $rootSpan = \DDTrace\GlobalTracer::get()
      ->getRootScope()
      ->getSpan();
  $rootSpan->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
?>
```

### Instrumentation manuelle de Zend Framework 1

Par défaut, Zend Framework 1 est automatiquement instrumenté. Vous n'avez donc pas besoin de modifier votre projet ZF1. Cependant, si l'instrumentation automatique est désactivée, activez manuellement le traceur.

Commencez par [télécharger la dernière version du code source depuis la page des nouvelles versions][5]. Dézippez le fichier et copiez le dossier `src/DDTrace` dans le dossier `/library` de votre application. Ajoutez ensuite le bloc de configuration suivant au fichier `application/configs/application.ini` :

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = CHEMIN_APPLICATION "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

## Optimisation du code PHP

Avant PHP 7, certains frameworks intégraient des solutions pour compiler les classes PHP, par exemple via la commande `php artisan optimize` de Laravel.

Bien que cette version [soit désormais obsolète][6], si vous utilisez PHP 7.x, vous pouvez utiliser ce mécanisme de mise en cache au sein de votre app avant la version 7.x. Pour ce cas précis, nous vous conseillons d'utiliser l'API [OpenTracing][7] au lieu d'ajouter `datadog/dd-trace` à votre fichier Composer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/php/#automatic-instrumentation
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#span-tags
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[7]: /fr/tracing/opentracing/?tab=php