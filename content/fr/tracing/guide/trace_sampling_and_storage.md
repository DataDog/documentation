---
title: Échantillonnage et stockage de traces
kind: documentation
aliases:
  - /fr/tracing/faq/traces-sampling-and-storage/
  - /fr/tracing/faq/how-long-is-tracing-data-stored/
  - /fr/tracing/getting_further/trace_sampling_and_storage
further_reading:
  - link: tracing/setup/
    tag: Documentation
    text: Découvrir comment configurer le tracing d'APM avec votre application
  - link: tracing/visualization/services_list/
    tag: Documentation
    text: Découvrir la liste des services transmettant des données à Datadog
  - link: tracing/visualization/service
    tag: Documentation
    text: En savoir plus sur les services dans Datadog
  - link: tracing/visualization/resource
    tag: Documentation
    text: Plonger au cœur des traces et des performances de vos ressources
  - link: tracing/visualization/trace
    tag: Documentation
    text: Comprendre comment lire une trace Datadog
---
## Échantillonnage de traces

L'échantillonnage de traces est idéal pour les applications Web à volume élevé : un échantillon proportionnel de [traces][1] est alors conservé dans Datadog selon les règles suivantes.

Les statistiques (requêtes, erreurs, latence, etc.) sont calculées en fonction du volume total de traces au niveau de l'Agent et sont donc toujours exactes.

### Statistiques (requêtes, erreurs, latences, etc.)

L'APM Datadog calcule les statistiques agrégées suivantes parmi toutes les traces de l'instrumentation, quel que soit l'échantillon recueilli :

* Requêtes totales et requêtes par seconde
* Erreurs totales et erreurs par seconde
* Latence
* Données détaillées du temps passé par service/type
* [Score Apdex][2] (services Web uniquement)

{{< img src="tracing/product_specs/trace_sampling_storage/sampling_stats.png" alt="Les statistiques agrégées sont générées à partir de données non échantillonnées."  style="width:90%;">}}

### Objectif de l'échantillonnage

L'objectif de l'échantillonnage est de *conserver* les traces qui ont le plus d'importance :

* Traces distribuées
* Services présentant un QPS (nombre de requêtes par seconde) faible
* Ensemble représentatif de traces

{{< img src="tracing/product_specs/trace_sampling_storage/tracing-flow-chart.png" alt="Les traces individuelles sont échantillonnées au niveau du client, de l'Agent et du serveur."  style="width:90%;">}}

### Règles d'échantillonnage

Concernant le cycle de vie d'une trace, les décisions sont prises au niveau du client, de l'Agent et du backend dans l'ordre suivant.

1. Client de tracing : le client de tracing ajoute un attribut de contexte `sampling.priority` aux traces, ce qui permet à une seule trace de se propager sur les en-têtes de requête dans une architecture distribuée, et ce quel que soit le langage utilisé. L'attribut `sampling-priority` est un indicateur qui permet à l'Agent Datadog de prioriser la trace ou de filtrer les traces moins importantes.

    | Valeur           | Type                        | Action                                                                                                                                                                                                                         |
    |:----------------|:----------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | **MANUAL_DROP** | Entrée utilisateur                  | L'Agent filtre la trace.                                                                                                                                                                                                     |
    | **AUTO_DROP**   | Décision d'échantillonnage automatique | L'Agent filtre la trace.                                                                                                                                                                                                     |
    | **AUTO_KEEP**   | Décision d'échantillonnage automatique | L'Agent conserve la trace.                                                                                                                                                                                                     |
    | **MANUAL_KEEP** | Entrée utilisateur                  | L'Agent conserve la trace, et le backend applique uniquement l'échantillonnage s'il dépasse le volume maximal autorisé. Veuillez noter qu'en cas d'utilisation conjointe avec le [filtrage App Analytics][3], toutes les spans `MANUAL_KEEP` sont considérées comme des spans facturables. |

   Les traces se voient automatiquement attribuer une priorité AUTO_DROP ou AUTO_KEEP, et un quota est appliqué pour empêcher l'Agent de recueillir plus de traces qu'autorisé. Les utilisateurs peuvent [ajuster manuellement](#controler-manuellement-la-priorite-des-traces) cet attribut pour prioriser des types de traces précis ou supprimer filtrer qui ne sont pas intéressantes.

2. Agent de trace (au niveau du host ou du conteneur) : l'Agent reçoit des traces de plusieurs clients de tracing et des requêtes de filtrage basées sur deux règles :
    * S'assurer que les traces conservées correspondent à un échantillon représentatif (services, ressources, codes de statut HTTPS, erreurs).
    * Conserver les traces associées aux ressources à faible volume (endpoints Web, requêtes de base de données).

    L'Agent calcule une `signature` pour chaque trace recueillie, selon ses services, ses ressources, ses erreurs, etc. Les traces avec la même signature sont considérées comme similaires. Une signature peut par exemple prendre cette forme :

    * `env=prod`, `my_web_service`, `is_error=true`, `resource=/login`
    * `env=staging`, `my_database_service`, `is_error=false`, `query=SELECT...`

    Un échantillon de traces avec chaque signature est alors conservé, ce qui vous permet de profiter d'une visibilité totale sur l'ensemble des types de traces recueillis dans votre système. Cette méthode garantit que les traces des ressources à volume faible sont conservées.

    De plus, le nombre de traces conservées par l'Agent depuis le client de tracing est déterminé en fonction du service afin de garantir la conservation des traces des services présentant un QPS (nombre de requêtes par seconde) faible.

    Vous avez la possibilité d'ignorer manuellement les endpoints ressources qui ne sont pas intéressants au niveau de l'Agent en utilisant les [filtres de ressources][4].

3. Serveur/backend DD : le serveur reçoit les traces des différents Agents exécutés sur vos hosts et applique des règles d'échantillonnage afin de garantir que chaque Agent soit représenté. Pour cela, il détermine les traces à conserver en fonction de la signature marquée par l'Agent.

## Contrôler manuellement la priorité des traces

L'APM active le tracing distribué par défaut pour permettre aux traces de se propager d'un en-tête de tracing à l'autre sur plusieurs services/hosts. Les en-têtes de tracing incluent un tag de priorité pour garantir la conservation des traces durant leur propagation entre les services en amont et en aval. Vous pouvez remplacer ce tag pour conserver une trace manuellement (transaction critique, mode debugging, etc.) ou supprimer une trace (checks de santé, ressources statiques, etc.).

{{< tabs >}}
{{% tab "Java" %}}

Pour conserver manuellement une trace :

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // récupérer la span active à partir de la méthode tracée
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // toujours conserver la trace
        ddspan.setTag(DDTags.MANUAL_KEEP, true);
        // ajouter ensuite l'implémentation de la méthode
    }
}
```

Pour supprimer manuellement une trace :

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.interceptor.MutableSpan;
import datadog.trace.api.Trace;
import io.opentracing.util.GlobalTracer;

public class MyClass {
    @Trace
    public static void myMethod() {
        // récupérer la span active à partir de la méthode tracée
        MutableSpan ddspan = (MutableSpan) GlobalTracer.get().activeSpan();
        // toujours supprimer la trace
        ddspan.setTag(DDTags.MANUAL_DROP, true);
        // ajouter ensuite l'implémentation de la méthode
    }
}
```

{{% /tab %}}
{{% tab "Python" %}}

Pour conserver manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
    // toujours conserver la trace
    span.set_tag(MANUAL_KEEP_KEY)
    // ajouter ensuite l'implémentation de la méthode
```

Pour supprimer manuellement une trace :

```python
from ddtrace import tracer
from ddtrace.constants import MANUAL_DROP_KEY, MANUAL_KEEP_KEY

@tracer.wrap()
def handler():
    span = tracer.current_span()
        // toujours supprimer la trace
        span.set_tag(MANUAL_DROP_KEY)
        // ajouter ensuite l'implémentation de la méthode
```

{{% /tab %}}
{{% tab "Ruby" %}}

Pour conserver manuellement une trace :

```ruby
Datadog.tracer.trace(name, options) do |span|

  # toujours conserver la trace
  span.set_tag(Datadog::Ext::ManualTracing::TAG_KEEP, true)
  # ajouter ensuite l'implémentation de la méthode
end
```

Pour supprimer manuellement une trace :

```ruby
Datadog.tracer.trace(name, options) do |span|
  # toujours filtrer la trace
  span.set_tag(Datadog::Ext::ManualTracing::TAG_DROP, true)
  # ajouter ensuite l'implémentation de la méthode
end
```

{{% /tab %}}
{{% tab "Go" %}}

Pour conserver manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // toujours conserver cette trace :
    span.SetTag(ext.ManualKeep, true)
    // ajouter ensuite l'implémentation de la méthode

}
```

Pour supprimer manuellement une trace :

```Go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // toujours supprimer cette trace :
    span.SetTag(ext.ManualDrop, true)
    // ajouter ensuite l'implémentation de la méthode
}
```

{{% /tab %}}
{{% tab "Node.js" %}}

Pour conserver manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// toujours conserver la trace
span.setTag(tags.MANUAL_KEEP)
// ajouter ensuite l'implémentation de la méthode

```

Pour supprimer manuellement une trace :

```js
const tracer = require('dd-trace')
const tags = require('dd-trace/ext/tags')

const span = tracer.startSpan('web.request')

// toujours conserver la trace
span.setTag(tags.MANUAL_DROP)
// ajouter ensuite l'implémentation de la méthode

```

{{% /tab %}}
{{% tab ".NET" %}}

Pour conserver manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // toujours conserver cette trace
    span.SetTag(Tags.ManualKeep, "true");
    // ajouter ensuite l'implémentation de la méthode
}
```

Pour supprimer manuellement une trace :

```cs
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive(operationName))
{
    var span = scope.Span;

    // toujours supprimer cette trace
    span.SetTag(Tags.ManualDrop, "true");
    // ajouter ensuite l'implémentation de la méthode
}
```

{{% /tab %}}
{{% tab "PHP" %}}

Pour conserver manuellement une trace :

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // toujours conserver cette trace
    $span->setTag(\DDTrace\Tag::MANUAL_KEEP, true);
    // ajouter ensuite l'implémentation de la méthode
  }
?>
```

Pour supprimer manuellement une trace :

```php
<?php
  $tracer = \OpenTracing\GlobalTracer::get();
  $span = $tracer->getActiveSpan();

  if (null !== $span) {
    // toujours filtrer cette trace
    $span->setTag(\DDTrace\Tag::MANUAL_DROP, true);
    // ajouter ensuite l'implémentation de la méthode
  }
?>
```

{{% /tab %}}
{{% tab "C++" %}}

Pour conserver manuellement une trace :

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// toujours conserver cette trace
span->SetTag(datadog::tags::manual_keep, {});
// ajouter ensuite l'implémentation de la méthode
```

Pour supprimer manuellement une trace :

```cpp
...
#include <datadog/tags.h>
...

auto tracer = ...
auto another_span = tracer->StartSpan("operation_name");
// toujours supprimer cette trace

another_span->SetTag(datadog::tags::manual_drop, {});
// ajouter ensuite l'implémentation de la méthode
```

{{% /tab %}}
{{< /tabs >}}

Notez que la priorité des traces doit être contrôlée manuellement  uniquement avant la propagation dans le contexte. Si elle a lieu après, le système ne peut pas garantir que la totalité de la trace est conservée d'un service à un autre. La priorité des traces contrôlées manuellement est définie au niveau du client de tracing. La trace peut toujours être supprimée par l'Agent ou au niveau du serveur en fonction des [règles d'échantillonnage](#regles-d-echantillonnage).

## Stockage de traces

Les traces individuelles sont stockées pendant 15 jours. Ainsi, toutes les traces **échantillonnées** sont conservées pendant une période de 15 jours. À la fin du 15e jour, l'ensemble des traces expirées est supprimé. De plus, une fois qu'une trace a été consultée en ouvrant une page entière, elle reste disponible en utilisant son ID de trace dans l'URL : `https://app.datadoghq.com/apm/trace/<ID_TRACE>` (`https://app.datadoghq.eu/apm/trace/<ID_TRACE>` pour le site européen de Datadog). Ceci est valable même après son « expiration » dans l'interface. Ce comportement n'est pas affecté par les compartiments de temps de rétention.

{{< img src="tracing/guide/trace_sampling_and_storage/trace_id.png" alt="ID de trace"  >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/faq/how-to-configure-an-apdex-for-your-traces-with-datadog-apm
[3]: /fr/tracing/app_analytics/#span-filtering
[4]: /fr/security/tracing/#resource-filtering