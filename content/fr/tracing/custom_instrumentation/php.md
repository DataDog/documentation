---
title: Instrumentation personnalisée PHP
kind: documentation
aliases:
  - /fr/tracing/manual_instrumentation/php
  - /fr/tracing/opentracing/php
description: Instrumentez manuellement votre application PHP afin d'envoyer des traces personnalisées à Datadog.
further_reading:
  - link: tracing/guide/instrument_custom_method
    tag: Guide
    text: Instrumenter une méthode personnalisée pour analyser en détail votre logique opérationnelle
  - link: tracing/connect_logs_and_traces
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
---
<div class="alert alert-info">
Si vous n'avez pas encore lu les instructions sur l'instrumentation automatique et la configuration, commencez par lire les <a href="https://docs.datadoghq.com/tracing/setup/php/">Instructions de configuration PHP</a>.
</div>

Même si Datadog ne prend pas officiellement en charge votre framework Web, une instrumentation manuelle n'est pas forcément nécessaire. Consultez la section [Instrumentation automatique][1] pour en savoir plus.

## Création de spans

Pour instrumenter manuellement du code afin de [tracer][2] des méthodes personnalisées spécifiques dans votre application ou d'ajouter des tags à vos spans, utilisez `DDTrace\trace_function()` ou `DDTrace\trace_method()`.

<div class="alert alert-info">Si vous utilisez une version de ddtrace antérieure à la version 0.47.0, utilisez <code>dd_trace_function()</code> au lieu de <code>DDTrace\trace_function()</code> et <code>dd_trace_method()</code> au lieu de <code>DDTrace\trace_method()</code>, ou passez à la dernière version du traceur.</div>

### Tracer une méthode ou une fonction personnalisée

Les fonctions `DDTrace\trace_function()` et `DDTrace\trace_method()` permettent d'instrumenter (tracer) des appels de méthodes et de fonctions spécifiques. Elles gèrent automatiquement les tâches suivantes :

- Ouvrir une [span][3] avant l'exécution du code
- Définir les erreurs issues de l'appel instrumenté sur la span
- Fermer la span une fois l'appel instrumenté terminé

Des [tags][4] supplémentaires sont ajoutés à la span après sa fermeture (fermeture de tracing).

Par exemple, le snippet suivant trace la méthode `CustomDriver::doWork()` et ajoute des tags personnalisés. Les exceptions sont automatiquement suivies au niveau de la span.

```php
<?php
// Pour ddtrace < v0.47.0, utilisez dd_trace_method()
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Cette fermeture se produit après l'appel instrumenté
        // La span a été créée automatiquement avant l'appel instrumenté

        // SpanData::$name par défaut en l'absence de configuration : 'ClassName.methodName' (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource par défaut en l'absence de configuration : SpanData::$name (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // Si une exception est renvoyée par l'appel instrumenté, la valeur renvoyée est null
            'doWork.size' => $exception ? 0 : count($retval),
            // Accéder aux membres d'objet via $this
            'doWork.thing' => $this->workToDo,
        ];

        // La span se ferme automatiquement
    }
);

// Pour les fonctions
// Pour ddtrace < v0.47.0, utiliser dd_trace_function()
\DDTrace\trace_function(
    'doCustomDriverWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Similaire à la fermeture de tracing DDTrace\trace_method
    }
);
?>
```

{{< tabs >}}
{{% tab "Tracer des appels de fonctions" %}}

Les appels de fonctions sont instrumentés avec `DDTrace\trace_function()` et la fermeture de tracing est exécutée une fois l'appel instrumenté terminé.

```php
<?php

use DDTrace\SpanData;

function addNums($a, $b) {
    $sum = $a + $b;
    printf("%d + %d = %d\n", $a, $b, $sum);
    return $sum;
}

\DDTrace\trace_function(
    'addNums',
    function(SpanData $span, $args, $retval) {
        echo "Traced" . PHP_EOL;
    }
);

var_dump(addNums(2, 8));
// 2 + 8 = 10
// Traced
// int(10)
```

{{% /tab %}}
{{% tab "Tracer des appels de méthodes" %}}

Les méthodes sont instrumentées avec `DDTrace\trace_method()`, qui offre la même fonctionnalité que `DDTrace\trace_function()`. La différence majeure réside dans le fait que la fermeture de tracing est liée à la classe instrumentée qui expose une instance de la classe instrumentée via `$this`.

```php
<?php

use DDTrace\SpanData;

class Calc {
    public $foo = 'bar';
    public function addNums($a, $b) {
        $sum = $a + $b;
        printf("%d + %d = %d\n", $a, $b, $sum);
        return $sum;
    }
}

\DDTrace\trace_method(
    'Calc', 'addNums',
    function(SpanData $span, $args, $retval) {
        echo '$this->foo: ' . $this->foo . PHP_EOL;
    }
);

$calc = new Calc();
var_dump($calc->addNums(2, 8));
// 2 + 8 = 10
// $this->foo: bar
// int(10)
```
{{% /tab %}}
{{< /tabs >}}

## Accès aux spans actives

L'instrumentation intégrée et votre instrumentation personnalisée créent des spans autour des opérations pertinentes. Vous pouvez accéder à la span active afin d'y inclure des données utiles.

{{< tabs >}}
{{% tab "Span active" %}}

```php
<?php
$span = \DDTrace\GlobalTracer::get()->getActiveSpan();
if ($span) {
    $span->setTag('customer.id', get_customer_id());
}
?>
```

{{% /tab %}}
{{% tab "Span racine" %}}

Vous avez la possibilité d'accéder à la span racine de la trace plus tard, directement depuis le traceur global via `Tracer::getRootScope()`. Cela s'avère utile lorsque les métadonnées à ajouter à la span racine n'existent pas au début de l'exécution d'un script.

```php
<?php
$scope = \DDTrace\GlobalTracer::get()->getRootScope();
if ($scope) {
    $scope->getSpan()->setTag(\DDTrace\Tag::HTTP_STATUS_CODE, 200);
}
?>
```

{{% /tab %}}
{{< /tabs >}}

## Ajout de tags

{{< tabs >}}
{{% tab "Ajout local" %}}

Ajoutez des tags à une span via le tableau `DDTrace\SpanData::$meta`.

```php
<?php

\DDTrace\trace_function(
    'myRandFunc',
    function(\DDTrace\SpanData $span, array $args, $retval) {
        // ...
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
    }
);
```

{{% /tab %}}
{{% tab "Ajout global" %}}

Définissez la variable d'environnement `DD_TAGS` (version 0.47.0+) pour appliquer automatiquement des tags à chaque span créée. Il s'agissait auparavant de la variable `DD_TRACE_GLOBAL_TAGS`. Pour en savoir plus sur la configuration de l'ancienne version, consultez la documentation relative à la [configuration des variables d'environnement][1].

```
DD_TAGS=key1:value1,<CLÉ_TAG>:<VALEUR_TAG>
```

[1]: /fr/tracing/setup/php/#environment-variable-configuration
{{% /tab %}}
{{% tab "Erreurs" %}}

Les exceptions sont automatiquement reliées à la span active.

```php
<?php

function doRiskyThing() {
    throw new Exception('Oops!');
}

\DDTrace\trace_function(
    'doRiskyThing',
    function() {
        // La span est signalée comme étant erronée et comporte
        // la stack trace et le message de l'exception sous forme de tags
    }
);
```

Définissez le tag `error.msg` pour marquer manuellement une span comme étant erronée.

```php
<?php

function doRiskyThing() {
    return SOME_ERROR_CODE;
}

\DDTrace\trace_function(
    'doRiskyThing',
    function(\DDTrace\SpanData $span, $args, $retval) {
        if ($retval === SOME_ERROR_CODE) {
            $span->meta = [
                'error.msg' => 'Foo error',
                // Facultatif :
                'error.type' => 'CustomError',
                'error.stack' => my_get_backtrace(),
            ];
        }
    }
);
```

{{% /tab %}}
{{< /tabs >}}

## Filtrage de ressources

Il est possible d'exclure des traces en fonction de leur nom de ressource afin d'empêcher le trafic Synthetic (tel que les checks de santé) d'envoyer des traces à Datadog. Pour filtrer des ressources et configurer d'autres paramètres de sécurité et de personnalisation, accédez à la page [Securité][5].

## OpenTracing

Le traceur PHP prend en charge OpenTracing via la [bibliothèque **opentracing/opentracing**][6], qui est installée avec Composer :

```bash
composer require opentracing/opentracing:1.0.0-beta5
```

Lorsque l'[instrumentation automatique][1] est activée, un traceur compatible avec OpenTracing est utilisé en tant que traceur global :

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

## Références sur les API

### Paramètres de la fermeture de tracing

La fermeture de tracing fournie à `DDTrace\trace_method()` et `DDTrace\trace_function()` comporte quatre paramètres :

```php
function(
    DDTrace\SpanData $span,
    array $args,
    mixed $retval,
    Exception|null $exception
);
```

1. **$span** : une instance de `DDTrace\SpanData` à écrire dans les propriétés de la span
2. **$args** : un `array` d'arguments pour l'appel instrumenté
3. **$retval** : la valeur renvoyée par l'appel instrumenté
4. **$exception** : une instance de l'exception renvoyée lors de l'appel instrumenté, ou `null` si aucune exception n'a été renvoyée

#### Paramètre 1 : `DDTrace\SpanData $span`

L'instance `DDTrace\SpanData` contient [les informations sur la span dont l'Agent a besoin][7]. Il existe quelques exceptions : `trace_id`, `span_id`, `parent_id`, `start` et `duration`, qui sont définies au niveau supérieur et ne sont pas exposées aux utilisateurs via `DDTrace\SpanData`. Les exceptions issues de l'appel instrumenté sont automatiquement jointes à la span et le champ `error` est géré de manière automatique.

| Propriété | Type | Description |
| --- | --- | --- |
| `SpanData::$name` | `string` | Le nom de la span _(facultatif à partir de ddtrace v0.47.0 ; valeur par défaut en l'absence de configuration : 'ClassName.methodName')_ |
| `SpanData::$resource` | `string` | La ressource que vous tracez _(facultatif à partir de ddtrace v0.47.0 ; valeur par défaut en l'absence de configuration : `SpanData::$name`)_ |
| `SpanData::$service` | `string` | Le service que vous tracez |
| `SpanData::$type` | `string` | Le type de requête, qui peut être : **web**, **db**, **cache** ou **custom** _(facultatif)_ |
| `SpanData::$meta` | `string[]` | Un tableau de métadonnées sur la span, de type clé-valeur ; les clés et les valeurs doivent être des chaînes _(facultatif)_ |
| `SpanData::$metrics` | `float[]` | Un tableau de métriques sur la span, de type clé-valeur ; les clés doivent être des chaînes et les valeurs doivent être des valeurs flottantes _(facultatif)_ |

```php
<?php

use DDTrace\SpanData;

function myRandFunc($min, $max) {
    return mt_rand($min, $max);
}

\DDTrace\trace_function(
    'myRandFunc',
    function(SpanData $span, $args, $retval) {
        // SpanData::$name par défaut en l'absence de configuration : 'functionName' (>= v0.47.0)
        $span->name = 'myRandFunc';
        // SpanData::$resource par défaut en l'absence de configuration : SpanData::$name (>= v0.47.0)
        $span->resource = 'myRandFunc';
        $span->service = 'php';
        // Les paramètres suivants sont facultatifs
        $span->type = 'web';
        $span->meta = [
            'rand.range' => $args[0] . ' - ' . $args[1],
            'rand.value' => $retval,
        ];
        $span->metrics = [
            '_sampling_priority_v1' => 0.9,
        ];
    }
);
```

#### Paramètre 2 : `array $args`

Le deuxième paramètre de la fermeture de tracing est un tableau d'arguments provenant de l'appel instrumenté. Il fonctionne de la même manière que [`func_get_args()`][8].

Par défaut, la fermeture de tracing est exécutée _après_ l'appel instrumenté. Les arguments transmis par référence peuvent donc être différents lorsqu'ils atteignent la fermeture de tracing.

```php
<?php

use DDTrace\SpanData;

function argsByRef(&$a) {
    return ++$a;
}

\DDTrace\trace_function(
    'argsByRef',
    function(SpanData $span, $args) {
        var_dump($args);
    }
);

$foo = 10;
var_dump(argsByRef($foo));
// array(1) {
//   [0]=>
//   int(11)
// }
// int(11)
```

Sur PHP 7, la fermeture de tracing a accès aux mêmes arguments que ceux transmis à l'appel instrumenté. Si l'appel instrumenté modifie un argument, y compris les arguments transmis sous forme de valeurs, la fermeture de tracing `posthook` reçoit l'argument modifié.

Il s'agit du comportement attendu des arguments dans PHP 7, comme illustré dans l'exemple suivant :

```php
<?php

function foo($a) {
    var_dump(func_get_args());
    $a = 'Dogs';
    var_dump(func_get_args());
}

foo('Cats');

/*
array(1) {
  [0]=>
  string(4) "Cats"
}
array(1) {
  [0]=>
  string(4) "Dogs"
}
*/
```

L'exemple suivant montre les conséquences sur les fermetures de tracing `posthook`.

```php
<?php

function foo($a) {
    $a = 'Dogs';
}

\DDTrace\trace_function('foo', function ($span, array $args) {
    var_dump($args[0]);
});

foo('Cats');

// string(4) "Dogs"
```

Si vous devez accéder à un argument avant la modification, la fermeture de tracing [peut être marquée `prehook`](#executer-la-fermeture-de-tracing-avant-l-appel-instrumente) afin d'accéder aux arguments avant l'appel instrumenté.

#### Paramètre 3 : `mixed $retval`

Le troisième paramètre de la fermeture de tracing est la valeur renvoyée par l'appel instrumenté. Une valeur `null` est utilisée pour les fonctions ou les méthodes qui indiquent un retour de type `void`, ou celles qui ne renvoient pas de valeur.

```php
<?php

use DDTrace\SpanData;

function message(): void {
    echo "Hello!\n";
}

\DDTrace\trace_function(
    'message',
    function(SpanData $span, $args, $retval) {
        echo "Traced\n";
        var_dump($retval);
    }
);

var_dump(message());
// Hello!
// Traced
// NULL
// NULL
```

#### Paramètre 4 : `Exception|null $exception`

Le dernier paramètre de la fermeture de tracing est une instance de l'exception renvoyée lors de l'appel instrumenté, ou `null` si aucune exception n'est renvoyée.

```php
<?php

use DDTrace\SpanData;

function mightThrowException() {
  throw new Exception('Oops!');
  return 'Hello';
}

\DDTrace\trace_function(
  'mightThrowException',
  function(SpanData $span, $args, $retval, $ex) {
    if ($ex) {
      echo 'Exception from instrumented call: ';
      echo $ex->getMessage() . PHP_EOL;
    }
  }
);

mightThrowException();

/*
Exception from instrumented call: Oops!
NULL
PHP Fatal error:  Uncaught Exception: Oops! ...
*/
```

Étant donné que les exceptions sont reliées automatiquement aux spans, il n'est pas nécessaire de définir manuellement les métadonnées `SpanData::$meta['error.*']`. En revanche, le fait d'avoir accès à l'instance de l'exception vous permet de vérifier les éventuelles exceptions renvoyées avant d'accéder à la valeur renvoyée.

```php
<?php

use DDTrace\SpanData;

\DDTrace\trace_function(
    'mightThrowException',
    function(SpanData $span, $args, $retval, $ex) {
        if (null === $ex) {
            // Faire quelque chose avec $retval
        }
    }
);
```

## Configurations avancées

### Tracer des fonctions et des méthodes internes

Une optimisation a été ajoutée à partir de la version **0.46.0** afin d'ignorer toutes les fonctions et méthodes internes pour l'instrumentation. Il est toujours possible d'instrumenter les fonctions et les méthodes internes en définissant la variable d'environnement `DD_TRACE_TRACED_INTERNAL_FUNCTIONS`. Cela génère un fichier CSV des fonctions ou méthodes à instrumenter, par exemple `DD_TRACE_TRACED_INTERNAL_FUNCTIONS=array_sum,mt_rand,DateTime::add`. Une fois qu'une fonction ou méthode a été ajoutée à la liste, elle peut être instrumentée respectivement grâce à `DDTrace\trace_function()` et `DDTrace\trace_method()`.

### Exécuter la fermeture de tracing avant l'appel instrumenté

Par défaut, les fermetures de tracing sont traitées comme des fermetures `posthook`, ce qui signifie qu'elles sont exécutées _après_ l'appel instrumenté. Dans certains cas, il peut être nécessaire d'exécuter la fermeture de tracing _avant_ l'appel instrumenté. Les fermetures de tracing sont alors marquées `prehook` à l'aide d'un tableau de configuration associatif.

```php
\DDTrace\trace_function('foo', [
    'prehook' => function (\DDTrace\SpanData $span, array $args) {
        // Cette fermeture de tracing sera exécutée avant l'appel instrumenté
    }
]);
```

### Déboguer les erreurs mises en sandbox

Les fermetures de tracing sont « mises en sandbox » au sens où les exceptions renvoyées et les erreurs signalées n'ont aucun impact sur l'appel instrumenté.

```php
<?php

function my_func() {
  echo 'Hello!' . PHP_EOL;
}

\DDTrace\trace_function(
  'my_func',
  function() {
    throw new \Exception('Oops!');
  }
);

my_func();
echo 'Done.' . PHP_EOL;

/*
Hello!
Done.
*/
```

Pour le débogage, définissez la variable d'environnement `DD_TRACE_DEBUG=1` de manière à exposer les éventuelles exceptions ou erreurs qui se sont produites lors d'une fermeture de tracing.

```php
/*
Hello!
Exception thrown in tracing closure for my_func: Oops!
Done.
*/
```

### Instrumentation manuelle de Zend Framework 1

Par défaut, Zend Framework 1 est automatiquement instrumenté. Vous n'avez donc pas besoin de modifier votre projet ZF1. Cependant, si l'instrumentation automatique est désactivée, activez manuellement le traceur.

Commencez par [télécharger le dernier code source depuis la page des nouvelles versions][9]. Dézippez le fichier et copiez le dossier `src/DDTrace` dans le dossier `/library` de votre application. Ajoutez ensuite le code suivant au fichier `application/configs/application.ini` :

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = CHEMIN_APPLICATION "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

### Optimisation du code PHP

Avant PHP 7, certains frameworks intégraient des solutions pour compiler les classes PHP, par exemple via la commande `php artisan optimize` de Laravel.

Bien que cette version [soit désormais obsolète][10], si vous utilisez PHP 7.x, vous pouvez utiliser ce mécanisme de mise en cache au sein de votre app avant la version 7.x. Pour ce cas précis, nous vous recommandons d'utiliser l'API [OpenTracing](#opentracing) au lieu d'ajouter `datadog/dd-trace` à votre fichier Composer.

## Guide de mise à niveau de l'ancienne API

Nous vous recommandons de mettre à jour les instrumentations personnalisées implémentées à l'aide de l'ancienne API `dd_trace()`.

Il existe une différence majeure entre l'ancienne API et l'API avec sandbox qu'il est important de bien comprendre. L'ancienne API transmet l'appel instrumenté à partir de la fermeture de tracing grâce à `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_legacy_api.png" alt="Ancienne API" style="width:100%;">}}

L'API avec sandbox exécute la fermeture de tracing après l'appel instrumenté et il n'est donc pas nécessaire de transmettre l'appel original avec `dd_trace_forward_call()`.

{{< img src="tracing/manual_instrumentation/php_sandbox_api.png" alt="API avec sandbox" style="width:100%;">}}

Contrairement à l'ancienne API, l'API avec sandbox gère automatiquement les tâches suivantes :

1. Créer la span
2. Transmettre l'appel original
3. Relier les exceptions à la span

### Exemple de mise à niveau

L'API avec sandbox réduit la quantité de code réutilisable nécessaire pour instrumenter un appel. Vous trouverez ci-dessous une comparaison entre un exemple dans l'ancienne API et l'équivalent dans l'API avec sandbox.

```php
# Ancienne API
dd_trace('CustomDriver', 'doWork', function (...$args) {
    // Commencer une nouvelle span
    $scope = \DDTrace\GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
    $span = $scope->getSpan();

    // Accéder aux membres d'objet via $this
    $span->setTag(\DDTrace\Tag::NOM_RESSOURCE, $this->workToDo);

    try {
        // Exécuter la méthode d'origine. Remarque : dd_trace_forward_call() - gère tous les paramètres automatiquement
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

# API avec sandbox
\DDTrace\trace_method(
    'CustomDriver',
    'doWork',
    function (\DDTrace\SpanData $span, array $args, $retval, $exception) {
        // Cette fermeture s'exécute après l'appel instrumenté
        // La span a été créée automatiquement avant l'appel instrumenté

        // SpanData::$name par défaut en l'absence de configuration : 'ClassName.methodName' (>= v0.47.0)
        $span->name = 'CustomDriver.doWork';
        // SpanData::$resource par défaut en l'absence de configuration : SpanData::$name (>= v0.47.0)
        $span->resource = 'CustomDriver.doWork';
        $span->service = 'php';

        $span->meta = [
            // Si une exception a été renvoyée par l'appel instrumenté, la valeur renvoyée est null
            'doWork.size' => $exception ? 0 : count($retval),
            // Accéder aux membres d'objet via $this
            'doWork.thing' => $this->workToDo,
        ];

        // Pas besoin de transmettre explicitement l'appel avec dd_trace_forward_call()
        // Pas besoin de récupérer/relier explicitement les exceptions
        // La span se ferme automatiquement
    }
);
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/setup/php/#automatic-instrumentation
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#span-tags
[5]: /fr/tracing/security
[6]: https://github.com/opentracing/opentracing-php
[7]: /fr/api/v1/tracing/#send-traces
[8]: https://www.php.net/func_get_args
[9]: https://github.com/DataDog/dd-trace-php/releases/latest
[10]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize