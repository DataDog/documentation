---
title: Analyse et recherche de traces
kind: documentation
aliases:
  - /fr/tracing/visualization/search/
---
{{< vimeo 278748711 >}}

La fonction [Analyse et recherche de traces][1] sert à filtrer les événements APM avec des tags définis par l'utilisateur, comme `customer_id`, `error_type` ou `app_name`, vous permettant ainsi de dépanner et filtrer vos requêtes. Pour l'activer, deux options s'offrent à vous :

* Configurez votre traceur d'APM de façon à ce qu'il émette les analyses pertinentes à partir de vos services. Cela peut se faire de façon [automatique](#configuration-automatique) ou [manuelle](#instrumentation-personnalisee). Ensuite, [activez la recherche de traces dans Datadog][1] pour commencer à transmettre ces analyses.

**Remarque** : pour utiliser la recherche de traces, vous devez utiliser l'Agent v6.7 ou une version ultérieure.

## Configuration automatique

{{< tabs >}}
{{% tab "Java" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 0.25.0 du client de tracing Java. Elle peut être activée de façon globale pour toutes les intégrations **de serveur Web** avec un paramètre de configuration unique dans le client de tracing :

* Propriété système : `-Ddd.trace.analytics.enabled=true`
* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

 Une fois la fonction activée, l'interface Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][1] pour commencer.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Python" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 0.19.0 du client de tracing Python. Activez l'analyse et recherche de traces de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

* Configuration du traceur : `ddtrace.config.analytics_enabled = True`
* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

 Une fois la fonction activée, l'interface Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][1] pour commencer.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Ruby" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 0.19.0 du client de tracing Ruby. Elle peut être activée pour toutes les intégrations **Web** avec un flag global.

Pour ce faire, définissez `DD_TRACE_ANALYTICS_ENABLED=true` dans votre environnement ou configurez ce paramètre :

 ```ruby
Datadog.configure { |c| c.analytics_enabled = true }
```

 - `true` active les analyses pour tous les frameworks Web.
- `false` ou `nil` désactive les analyses, sauf pour les intégrations qui l'activent automatiquement. (Par défaut)

 Une fois la fonction activée, la page [Analyse et recherche de traces] commence à afficher des informations.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Go" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 1.11.0 du client de tracing Go. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec l'option de démarrage du traceur [`WithAnalytics`][1].

```go
tracer.Start(tracer.WithAnalytics(true))
```

Une fois la fonction activée, l'interface Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][2] pour commencer.


[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
[2]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "Node.js" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 0.10.0 du client de tracing Node.js. Elle peut être activée de façon globale pour toutes les intégrations Web avec un paramètre de configuration unique dans le client de tracing :

```javascript
tracer.init({
  analytics: true
})
```

Vous pouvez également utiliser le paramètre de configuration suivant :

* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

 Une fois la fonction activée, l'interface Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][1] pour commencer.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab ".NET" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 1.1.0 du client de tracing .NET. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

 * Variable d'environnement ou AppSetting : `DD_TRACE_ANALYTICS_ENABLED=true`

 Ce paramètre peut également être défini dans le code :

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

Une fois activée, l'IU Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][1] pour commencer.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{% tab "PHP" %}}

La fonction Analyse et recherche de traces est disponible à partir de la version 0.17.0 du client de tracing PHP. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

 * Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

 Une fois la fonction activée, l'interface Analyse et recherche de traces commence à afficher des résultats. Consultez la [page relative à la recherche de traces][1] pour commencer.


[1]: https://app.datadoghq.com/apm/search
{{% /tab %}}
{{< /tabs >}}

## Configurer d'autres services (facultatif)

### Configurer par intégration

{{< tabs >}}
{{% tab "Java" %}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour des intégrations spécifiques grâce au paramètre suivant :

* Propriété système : `-Ddd.<intégration>.analytics.enabled=true`
* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans JMS sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de JMS dans la fonction Analyse et recherche de traces :

* Propriété système : `-Ddd.jms.analytics.enabled=true`
* Variable d'environnement : `DD_JMS_ANALYTICS_ENABLED=true`

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].

[1]: /fr/tracing/setup/java/#integrations
{{% /tab %}}
{{% tab "Python" %}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour des intégrations spécifiques grâce au paramètre suivant :

* Configuration du traceur : `ddtrace.config.<INTÉGRATION>.analytics_enabled = True`
* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans Boto sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de Boto dans la fonction Analyse et recherche de traces :

* Configuration du traceur : `ddtrace.config.boto.analytics_enabled = True`
* Variable d'environnement : `DD_BOTO_ANALYTICS_ENABLED=true`

**Remarque** : l'implémentation du traceur étant propre à chaque intégration, plusieurs intégrations nécessitent une configuration spéciale. Consultez la documentation de la bibliothèque sur la fonction [Analyse et recherche de traces][1] pour en savoir plus.

[1]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#trace_search_analytics
{{% /tab %}}
{{% tab "Ruby" %}}

La fonction Analyse et recherche de traces peut être activée pour des intégrations spécifiques.

Pour ce faire, définissez `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true` dans votre environnement ou configurez ce paramètre :

```ruby
Datadog.configure { |c| c.use :integration, analytics_enabled: true }
```

Où `intégration` est le nom de l'intégration. Consultez la [liste des intégrations disponibles][1] pour découvrir les options disponibles.

- `true` active l'analyse pour cette intégration, quel que soit le paramètre global.
- `false` désactive l'analyse pour cette intégration, quel que soit le paramètre global.
- `nil` renvoie au paramètre global pour l'analyse.


[1]: /fr/tracing/setup/ruby/#library-compatibility
{{% /tab %}}
{{% tab "Go" %}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour chaque intégration. Par exemple, pour configurer le paquet `net/http` de la bibliothèque standard, vous pouvez procéder ainsi :

```go
package main

import (
    httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
    defer tracer.Stop()

    mux := httptrace.NewServeMux(httptrace.WithAnalytics(true))
    // ...
}
```

{{% /tab %}}
{{% tab "Node.js" %}}


En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour des intégrations spécifiques.

Par exemple, pour activer l'analyse et la recherche de traces pour `express` :

```js
tracer.use('express', {
  analytics: true
})
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].


[1]: /fr/tracing/setup/nodejs/#integrations
{{% /tab %}}
{{% tab ".NET" %}}


En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour des intégrations spécifiques.

* Variable d'environnement ou AppSetting : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Ou en code :

```csharp
Tracer.Instance.Settings.Integrations["<INTÉGRATION>"].AnalyticsEnabled = true;
```

Par exemple, pour activer l'analyse et la recherche de traces pour ASP.NET MVC :

* Variable d'environnement ou AppSetting : `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

Ou en code :

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].


[1]: /fr/tracing/setup/dotnet#integrations
{{% /tab %}}
{{% tab "PHP" %}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction Analyse et recherche de traces pour des intégrations spécifiques grâce au paramètre suivant :

* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans Symfony sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de Symfony dans la fonction Analyse et recherche de traces :

* Variable d'environnement : `DD_SYMFONY_ANALYTICS_ENABLED=true`

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].


[1]: /fr/tracing/setup/php/#integrations
{{% /tab %}}
{{< /tabs >}}

### Services de base de données

{{< tabs >}}
{{% tab "Java" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

* Propriété système : `-Ddd.jdbc.analytics.enabled=true`
* Variable d'environnement : `DD_JDBC_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Python" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

* Configuration du traceur : `ddtrace.config.postgres.analytics_enabled = True`
* Variable d'environnement : `DD_POSTGRES_ANALYTICS_ENABLED=true`

{{% /tab %}}
{{% tab "Ruby" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```ruby
Datadog.configure { |c| c.use :mongo, analytics_enabled: true }
```

{{% /tab %}}
{{% tab "Go" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```go
// Enregistrer le pilote de base de données avec l'analyse activée.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{% /tab %}}
{{% tab "Node.js" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{% /tab %}}
{{% tab ".NET" %}}


Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple, pour activer l'analyse et la recherche de traces pour ADO.NET :

* Variable d'environnement ou AppSetting : `DD_ADONET_ANALYTICS_ENABLED=true`

Ou en code :

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].


[1]: /fr/tracing/setup/dotnet#integrations
{{% /tab %}}
{{% tab "PHP" %}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction Analyse et recherche de traces. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```javascript
tracer.use('mysqli', {
  analytics: true
})
```

{{% /tab %}}
{{< /tabs >}}

### Instrumentation personnalisée

{{< tabs >}}
{{% tab "Java" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `ANALYTICS_SAMPLE_RATE` à la span racine du service :

```java
import datadog.trace.api.DDTags;
import datadog.trace.api.Trace;
import io.opentracing.Tracer;
import io.opentracing.util.GlobalTracer;

class MyClass {
  @Trace
  void myMethod() {
    final Span span = GlobalTracer.get().activeSpan();
    // Span fournie par l'annotation @Trace.
    if (span != null) {
      span.setTag(DDTags.SERVICE_NAME, "my-custom-service");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```

{{% /tab %}}
{{% tab "Python" %}}


Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` à la span racine du service :

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```


{{% /tab %}}
{{% tab "Ruby" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `ANALYTICS_KEY` à la span racine du service :

```ruby
Datadog.tracer.trace('my.task') do |span|
  # Définir le taux d'échantillonnage de l'analyse sur 1.0
  span.set_tag(Datadog::Ext::Analytics::TAG_ENABLED, true)
end
```

{{% /tab %}}
{{% tab "Go" %}}

Pour les instrumentations personnalisées, un tag spécial a été ajouté pour activer l'analyse et la recherche de traces sur une span, comme ci-dessous :

```go
span.SetTag(ext.AnalyticsEvent, true)
```

Ce tag permet de définir la span comme un événement pour l'analyse et la recherche de traces.

{{% /tab %}}
{{% tab "Node.js" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `ANALYTICS` à la span racine du service :

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{% /tab %}}
{{% tab ".NET" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `Tags.Analytics` à la span racine du service :

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // activer l'analyse sur cette span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{% /tab %}}
{{% tab "PHP" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `ANALYTICS_KEY` à la span racine du service :

```php
<?php
  // ... la span existante que vous souhaitez activer pour l'analyse et la recherche de traces
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{% /tab %}}
{{% tab "C++" %}}

Les applications utilisant une instrumentation personnalisée peuvent activer l'analyse en appliquant le tag `analytics_event` à la span racine du service :

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Une valeur booléenne true active l'analyse et la recherche de traces pour la span,
// avec un taux d'échantillonnage de 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// Une double valeur entre 0.0 et 1.0 active l'analyse et la recherche de traces
// et définit le taux d'échantillonnage sur la valeur spécifiée.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{% /tab %}}
{{< /tabs >}}

## Filtrage d'événements

Un [événement APM][2] représente la [span][3] supérieure d'un service, métadonnées incluses. Une fois activés, les événements APM sont envoyés à un débit de 100 % par défaut. Par exemple, un service Java avec 100 requêtes générera 100 événements APM depuis ses spans `servlet.request`, car chaque span `servlet.request` génère un événement APM. Le [filtrage d'événements APM][4] a l'avantage de réduire le nombre d'événements APM facturables sans aucune conséquence sur l'échantillonnage des [traces][5]. Lorsqu'un service est filtré et que moins de 100 % des événements sont envoyés, l'analyse des événements APM est mise à l'échelle pour afficher une estimation par défaut. Vous pouvez également afficher la valeur filtrée.

{{< img src="tracing/trace_search_and_analytics/analytics/apm_event_filtering.png" alt="Filtrage des événements APM" responsive="true" style="width:100%;">}}

[1]: https://app.datadoghq.com/apm/search
[2]: /fr/tracing/visualization/#apm-event
[3]: /fr/tracing/visualization/#spans
[4]: https://app.datadoghq.com/apm/settings
[5]: /fr/tracing/visualization/#trace