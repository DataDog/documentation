---
title: Instrumentation manuelle
kind: documentation
aliases:
  - /fr/tracing/setup/php/manual-installation
  - /fr/agent/apm/php/manual-installation
  - /fr/tracing/guide/distributed_tracing/
further_reading:
  - link: tracing/connect_logs_and_traces
    tags: Enrichir vos traces
    text: Associer vos logs à vos traces
  - link: tracing/opentracing
    tags: Enrichir vos traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
---
L'instrumentation manuelle consiste à écrire du code afin de créer des traces à envoyer à Datadog. Cela vous permet d'effectuer un tracing du code interne qui n'est pas pris en compte par l'instrumentation automatique. Avant d'instrumenter votre application, consultez la [terminologie de l'APM][1] de Datadog et passez en revue les concepts de base de l'APM.

{{< tabs >}}
{{% tab "Java" %}}

Si vous utilisez un [framework dont l'instrumentation automatique n'est pas prise en charge][1] ou que vous souhaitez apporter de la profondeur aux [traces][2] de votre application, vous pouvez choisir d'instrumenter manuellement votre code.

Pour ce faire, utilisez l'annotation de traces pour effectuer un tracing simple des appels de méthode, ou l'API OpenTracing pour un tracing plus complexe.

La fonction d'annotation de traces de Datadog est fournie par la [dépendance dd-trace-api][3].

**Exemple d'utilisation**

```java
import datadog.trace.api.Trace;

public class MyJob {
  @Trace(operationName = "job.exec", resourceName = "MyJob.process")
  public static void process() {
    // implémenter votre méthode ici
  }
}
```



[1]: /fr/tracing/setup/java/#compatibility
[2]: /fr/tracing/visualization/#trace
[3]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
{{% /tab %}}
{{% tab "Python" %}}

SI vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Vous pouvez également choisir d'accroître les fonctionnalités de la bibliothèque `ddtrace` ou de contrôler plus précisément l'instrumentation de votre application. La bibliothèque propose plusieurs méthodes afin d'y parvenir.

Les exemples suivants utilisent l'objet traceur global, qui peut être importé à l'aide de la commande :

```python
  from ddtrace import tracer
```

**Décorateur**

`ddtrace` fournit un décorateur permettant de tracer une méthode spécifique de votre application :

```python
  @tracer.wrap()
  def business_logic():
    """Une méthode pertinente à tracer."""
    # ...
    # ...
```

Consultez [`ddtrace.Tracer.wrap()`][2] pour obtenir des détails sur l'API pour le décorateur.

**Gestionnaire de contextes**

Pour tracer un bloc arbitraire de code, vous pouvez utiliser le gestionnaire de contextes [`ddtrace.Span`][3] :

```python
  # tracer une opération pertinente
  with tracer.trace('operations.pertinentes'):
    # ajouter une ou plusieurs opérations pertinentes
    # ...
    # ...
```

Consultez [`ddtrace.Tracer()`][4] pour obtenir davantage de détails sur l'API.

**Utiliser l'API**

Si les méthodes présentées ci-dessus ne vous permettent pas de répondre à vos besoins en tracing, vous pouvez utiliser l'API manuelle fournie afin d'initialiser des [spans][5] et d'y mettre fin comme bon vous semble :

```python
  span = tracer.trace('operations.pertinentes')

  # ajouter une ou plusieurs opérations pertinentes ici

  # REMARQUE : assurez-vous d'appeler span.finish(), sans quoi la trace entière ne sera pas envoyée
  # à Datadog
  span.finish()
```

Consultez les ressources ci-dessous pour obtenir des détails sur l'API :

- [`ddtrace.Tracer.trace`][6]
- [`ddtrace.Span.finish`][7]




[1]: /fr/tracing/setup/python/#compatibility
[2]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.wrap
[3]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span
[4]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#tracer
[5]: /fr/tracing/visualization/#spans
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Tracer.trace
[7]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#ddtrace.Span.finish
{{% /tab %}}
{{% tab "Ruby" %}}

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code. Vous pouvez utiliser la méthode `Datadog.tracer.trace` pour tracer facilement votre code. Celle-ci peut être ajoutée autour de n'importe quel code Ruby.

**Exemple d'utilisation**

```ruby
# Un exemple d'endpoint Sinatra,
# avec un tracing Datadog autour de la requête,
# une requête de base de données et des étapes de rendu.
get '/posts' do
  Datadog.tracer.trace('web.request', service: '<NOM_SERVICE>', resource: 'GET /posts') do |span|
    # Tracer l'appel activerecord
    Datadog.tracer.trace('posts.fetch') do
      @posts = Posts.order(created_at: :desc).limit(10)
    end

    # Ajouter des tags d'APM
    span.set_tag('http.method', request.request_method)
    span.set_tag('posts.count', @posts.length)

    # Tracer le rendu du modèle
    Datadog.tracer.trace('template.render') do
      erb :index
    end
  end
end
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][2].


[1]: /fr/tracing/setup/ruby/#compatibility
[2]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#manual-instrumentation
{{% /tab %}}
{{% tab "Go" %}}

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

Afin de bénéficier d'une instrumentation manuelle, utilisez le paquet `tracer`, dont l'utilisation est documentée sur la [page GoDoc][2] de Datadog.

**Exemple d'utilisation**

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    // Lancer le traceur avec zéro ou au moins une option.
    tracer.Start(tracer.WithServiceName("<NOM_SERVICE>"))
    defer tracer.Stop()

    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Définir les métadonnées.
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}
```
**Créez une [trace][3] distribuée en propageant manuellement le contexte de tracing :**

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Injecter le contexte de la span dans les en-têtes de requête
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Erreur de traitement ou d'injection de log
    }
    http.DefaultClient.Do(req)
}
```

**Pour continuer la trace, initialisez une nouvelle [span][4] côté serveur à partir du `Context` extrait :**

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extraire le contexte de la span et continuer la trace dans ce service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Erreur de traitement ou d'extraction de log
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```



[1]: /fr/tracing/setup/go/#compatibility
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[3]: /fr/tracing/visualization/#trace
[4]: /fr/tracing/visualization/#spans
{{% /tab %}}
{{% tab "Node.js" %}}

Si vous n'utilisez pas une instrumentation de bibliothèque compatible (voir la [compatibilité des bibliothèques][1]), vous pouvez choisir d'instrumenter manuellement votre code.

L'exemple suivant initialise un traceur Datadog et crée une [span][2] intitulée `web.request` :

```javascript
const tracer = require('dd-trace').init()
const span = tracer.startSpan('web.request')

span.setTag('http.url', '/login')
span.finish()
```

Pour en savoir plus sur l'instrumentation manuelle, consultez la [documentation relative à l'API][3].

[1]: /fr/tracing/setup/nodejs/#compatibility
[2]: /fr/tracing/visualization/#spans
[3]: https://datadog.github.io/dd-trace-js/#manual-instrumentation
{{% /tab %}}
{{% tab ".NET" %}}

Si vous n'utilisez pas de bibliothèques compatibles avec l'instrumentation automatique (voir les [intégrations][1]), vous pouvez instrumenter manuellement votre code.

L'exemple suivant utilise le `Tracer` global et crée une [span][2] personnalisée pour [tracer][3] une requête Web :

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    var span = scope.Span;
    span.Type = SpanTypes.Web;
    span.ResourceName = request.Url;
    span.SetTag(Tags.HttpMethod, request.Method);

    // à vous de jouer…
}
```

[1]: /fr/tracing/setup/dotnet/#integrations
[2]: /fr/tracing/visualization/#spans
[3]: /fr/tracing/visualization/#trace
{{% /tab %}}

{{% tab "PHP" %}}

Même si Datadog ne prend pas officiellement en charge votre framework Web, une instrumentation manuelle n'est pas forcément nécessaire. Consultez la section [Instrumentation automatique][1] pour en savoir plus.

Si vous devez effectuer une instrumentation manuelle, par exemple pour [tracer][2] des méthodes personnalisées spécifiques dans votre application, commencez par installer la dépendance du traceur PHP avec Composer :

```bash
$ composer require datadog/dd-trace
```

**Tracer une méthode ou une fonction personnalisée**

La fonction `dd_trace()` se fixe aux fonctions et méthodes existantes pour :

* Ouvrir une [span][3] avant l'exécution du code
* Définir des [tags][4] ou des erreurs supplémentaires sur la span
* Fermer la span une fois le processus terminé
* Modifier les arguments ou la valeur renvoyée

Par exemple, le snippet suivant trace la méthode `CustomDriver::doWork()`, ajoute des tags personnalisés, signale les éventuelles exceptions sous la forme d'erreurs sur la span et renvoie à nouveau les exceptions.

```php
<?php
  dd_trace("CustomDriver", "doWork", function (...$args) {
      // Initialiser une nouvelle span
      $scope = GlobalTracer::get()->startActiveSpan('CustomDriver.doWork');
      $span = $scope->getSpan();

      // Accéder aux membres d'objet via $this
      $span->setTag(Tags\NOM_RESSOURCE, $this->workToDo);

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

**Instrumentation manuelle de Zend Framework 1**

Par défaut, Zend Framework 1 est automatiquement instrumenté. Vous n'avez donc pas besoin de modifier votre projet ZF1. Cependant, si l'instrumentation automatique est désactivée, activez manuellement le traceur.

Commencez par [télécharger la dernière version du code source depuis la page des nouvelles versions][5]. Dézippez le fichier et copiez le dossier `src/DDTrace` dans le dossier `/library` de votre application. Ajoutez ensuite le bloc de configuration suivant au fichier `application/configs/application.ini` :

```ini
autoloaderNamespaces[] = "DDTrace_"
pluginPaths.DDTrace = CHEMIN_APPLICATION "/../library/DDTrace/Integrations/ZendFramework/V1"
resources.ddtrace = true
```

**Instrumentation manuelle et optimisation du code PHP**

Avant PHP 7, certains frameworks intégraient des solutions pour compiler les classes PHP, par exemple via la commande `php artisan optimize` de Laravel.

Bien que cette version [soit désormais obsolète][6], si vous utilisez PHP 7.x, vous pouvez utiliser ce mécanisme de mise en cache au sein de votre app avant la version 7.x. Pour ce cas précis, nous vous conseillons d'utiliser l'API [OpenTracing][7] au lieu d'ajouter `datadog/dd-trace` à votre fichier Composer.


[1]: /fr/tracing/setup/php/#automatic-instrumentation
[2]: /fr/tracing/visualization/#trace
[3]: /fr/tracing/visualization/#spans
[4]: /fr/tracing/visualization/#span-tags
[5]: https://github.com/DataDog/dd-trace-php/releases/latest
[6]: https://laravel-news.com/laravel-5-6-removes-artisan-optimize
[7]: /fr/tracing/opentracing/?tab=php
{{% /tab %}}
{{% tab "C++" %}}

Pour instrumenter manuellement votre code, installez le traceur tel qu'indiqué dans les exemples de configurations, puis utilisez l'objet tracer pour créer des [spans][1].

```cpp
{
  // Créer une span racine.
  auto root_span = tracer->StartSpan("nom_opération");
  // Créer une span enfant.
  auto child_span = tracer->StartSpan(
      "nom_opération",
      {opentracing::ChildOf(&root_span->context())});
  // Les spans peuvent prendre fin à une heure donnée…
  child_span->Finish();
} // ... ou lors de leur destruction (root_span prend fin ici).
```

Vous pouvez effectuer un tracing distribué en [utilisant les méthodes `Inject` et `Extract` sur le traceur][2], qui accepte les [types `Reader` et `Writer` de base][1]. Vous devez utiliser l'échantillonnage prioritaire (activé par défaut) pour garantir l'envoi uniforme des spans.

```cpp
// Autorise l'écriture d'en-têtes de propagation sur une carte simple <string, string>.
// Copié depuis https://github.com/opentracing/opentracing-cpp/blob/master/mocktracer/test/propagation_test.cpp
struct HTTPHeadersCarrier : HTTPHeadersReader, HTTPHeadersWriter {
  HTTPHeadersCarrier(std::unordered_map<std::string, std::string>& text_map_)
      : text_map(text_map_) {}

  expected<void> Set(string_view key, string_view value) const override {
    text_map[key] = value;
    return {};
  }

  expected<void> ForeachKey(
      std::function<expected<void>(string_view key, string_view value)> f)
      const override {
    for (const auto& key_value : text_map) {
      auto result = f(key_value.first, key_value.second);
      if (!result) return result;
    }
    return {};
  }

  std::unordered_map<std::string, std::string>& text_map;
};

void example() {
  auto tracer = ...
  std::unordered_map<std::string, std::string> headers;
  HTTPHeadersCarrier carrier(headers);

  auto span = tracer->StartSpan("nom_opération");
  tracer->Inject(span->context(), carrier);
  // `headers` contient désormais les en-têtes requis pour propager la span.
}
```

[1]: /fr/tracing/visualization/#spans
[2]: https://github.com/opentracing/opentracing-cpp/#inject-span-context-into-a-textmapwriter
[3]: https://github.com/opentracing/opentracing-cpp/blob/master/include/opentracing/propagation.h
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization