---
title: Opérations primaires dans les services

aliases:
  - /fr/tracing/faq/resource-trace-doesn-t-show-up-under-correct-service/
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: Configurer le tracing d'APM avec votre application
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: /tracing/visualization/service/
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
## Services APM

Les services APM calculent des métriques de trace portant sur les erreurs, le débit et la latence. Ces données sont calculées en tenant compte des ressources correspondant à un nom de span unique, à savoir l'opération primaire. Ces métriques de service sont utilisées dans l'ensemble du produit, que ce soit dans la page Service par défaut, la liste des services ou encore la Service Map.

**Remarque** : vous pouvez interroger les métriques de trace en indiquant `trace.*` [espacedenommage][1].

## Opérations primaires
### Définition

Le nom de l'opération primaire d'un service détermine sa représentation dans l'interface. Le backend Datadog sélectionne automatiquement le nom d'opération avec le plus haut débit de requêtes afin d'en faire le point d'entrée vers le service.

Imaginons qu'un service `web-store` dispose de plusieurs endpoints, instrumentés comme des ressources. Celles-ci partagent alors la même opération primaire, car le point d'entrée vers ces ressources est identique. Par exemple, les ressources `/user/home` et `/user/new` doivent avoir toutes les deux la même opération primaire, `web.request`. Voici à quoi ressemble une opération primaire pour un service dans différents langages :

| Type de service           | Opération primaire                                 |
|------------------------|---------------------------------------------------|
| web                    | `servlet.request`, `flask.request`, `web.request` |
| db                     | `postgres.query`, `db.query`                      |
| custom-instrumentation | `trace.annotation`, `method.call`                 |

### Configuration

Lorsque plusieurs opérations primaires sont définies pour un service, c'est l'opération avec le plus haut débit de requêtes qui est automatiquement sélectionnée en tant que point d'entrée vers le service. Un administrateur peut également définir manuellement l'opération primaire :

1. Accédez à la [page des réglages de l'APM][2].
2. Sélectionnez l'onglet **Primary Operation Name**.
3. Cliquez sur l'icône de modification en regard du service que vous souhaitez définir manuellement.
4. Cliquez sur l'onglet **Set Manually**.
5. Sélectionnez l'opération à définir comme point d'entrée vers le service.
6. Cliquez sur **Enregistrer**.

{{< img src="tracing/guide/primary_operation/configuring-primary-option.png" alt="Enregistrement depuis l'APM" >}}

## Afficher des statistiques sur des noms de span supplémentaires

Pour vérifier que toutes les traces sont correctement envoyées à Datadog en dehors des instrumentations, vous pouvez consulter vos ressources en appliquant un filtre supplémentaire. Pour ce faire, sélectionnez dans un menu déroulant des noms de span supplémentaires considérés comme des opérations secondaires. Veuillez toutefois noter que ces noms de span ne sont pas utilisés pour calculer les statistiques au niveau des services.

{{< img src="tracing/guide/primary_operation/dropdown.mp4" alt="Enregistrement depuis l'APM" video=true >}}

## Instrumentation manuelle

Lorsque vous rédigez des spans personnalisées, définissez de façon statique le nom de la span afin de veiller à ce que vos ressources soient regroupées en fonction de la même opération primaire (par exemple, `web.request`). Si le nom de la span est dynamique, définissez la span en tant que ressource (par exemple, `/user/profile`).

Pour obtenir plus de détails, consultez la section [Instrumentation personnalisée][3] pour votre langage.

## OpenTracing

Dans Datadog, le nom d'opération OpenTracing correspond à une ressource, tandis que le tag « component » OpenTracing correspond au nom de la span de Datadog. L'exemple suivant vous permet de définir une span avec la ressource « /user/profile » et le nom « http.request » de manière compréhensible pour OpenTracing.

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}



```java
Span span = tracer.buildSpan("http.request").start();

try (Scope scope = tracer.activateSpan(span)) {
    span.setTag("service.name", "service_name");
    span.setTag("resource.name", "/user/profile");
    // code tracé
} finally {
    span.finish();
}

```

Pour en savoir plus, consultez la section relative à la [configuration de Java et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/java/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

```python
from ddtrace.opentracer.tags import Tags
import opentracing
span = opentracing.tracer.start_span('http.request')
span.set_tag(Tags.RESOURCE_NAME, '/user/profile')
span.set_tag(Tags.SPAN_TYPE, 'web')

# ...
span.finish()

```

Pour en savoir plus, consultez la section relative à la [configuration de Python et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/python/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}


```ruby
OpenTracing.start_active_span('http.request') do |scope|
  scope.span.datadog_span.resource = '/user/profile'
  # code tracé
end
```
Pour en savoir plus, consultez la section relative à la [configuration de Ruby et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/ruby/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


```go
opentracing.StartSpan("http.request", opentracer.ResourceName("/user/profile"))
```

Pour en savoir plus, consultez la section relative à la [configuration de Go et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/go/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}


```javascript
const span = tracer.startSpan('http.request');
span.setTag('resource.name',  '/user/profile')
span.setTag('span.type', 'web')
// code tracé
span.finish();
```

Pour en savoir plus, consultez la section relative à la [configuration de Node.js et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/nodejs/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}


```csharp
using OpenTracing;
using OpenTracing.Util;

using (var scope = GlobalTracer.Instance.BuildSpan("http.request").StartActive(finishSpanOnDispose: true))
{
    scope.Span.SetTag("resource.name", "/user/profile");
    // code tracé
}

```

Pour en savoir plus, consultez la section relative à la [configuration de .NET et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/dotnet/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}


```php
// À utiliser une fois, au début de votre index.php et juste après l'importation du chargeur automatique de Composer.
// Pour OpenTracing <= 1.0-beta6
$otTracer = new \DDTrace\OpenTracer\Tracer(\DDTrace\GlobalTracer::get());
// Pour OpenTracing >= 1.0
$otTracer = new \DDTrace\OpenTracer1\Tracer(\DDTrace\GlobalTracer::get());
// Enregistrer le wrapper du traceur global
 \OpenTracing\GlobalTracer::set($otTracer);

// À placer à l'emplacement de votre choix dans le code de votre application
$otTracer = \OpenTracing\GlobalTracer::get();
$scope = $otTracer->startActiveSpan('http.request');
$span = $scope->getSpan();
$span->setTag('service.name', 'service_name');
$span->setTag('resource.name', '/user/profile');
$span->setTag('span.type', 'web');
// ...Utiliser OpenTracing comme prévu
$scope->close();
```

Pour en savoir plus, consultez la section relative à la [configuration de PHP et d'OpenTracing][1].


[1]: /fr/tracing/setup_overview/open_standards/php/#opentracing
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}


```cpp
// Créer une span racine pour la requête active.
auto root_span = tracer->StartSpan("web.request");
// Définir un nom de ressource pour la span racine.
root_span->SetTag(datadog::tags::resource_name, "/user/profile");
```

Pour en savoir plus, consultez la section relative à la [configuration de C++ et de l'instrumentation personnalisée][1].


[1]: /fr/tracing/setup_overview/custom_instrumentation/cpp/#manually-instrument-a-method
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/tracing/guide/metrics_namespace/
[2]: https://app.datadoghq.com/apm/settings
[3]: /fr/tracing/setup_overview/custom_instrumentation/