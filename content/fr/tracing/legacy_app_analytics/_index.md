---
title: App Analytics
kind: documentation
aliases:
  - /fr/tracing/visualization/search/
  - /fr/tracing/trace_search_and_analytics/
  - /fr/tracing/advanced_usage/
---
<div class="alert alert-danger">
Le 20 octobre 2020,  App Analytics a été remplacé par Tracing without Limits. Cette page est obsolète et contient des informations de configuration relatives à l'ancienne version, App Analytics, pouvant s'avérer utiles pour dépanner ou modifier des configurations antérieures. Utilisez désormais Tracing without Limits™ pour profiter d'un contrôle total sur votre <a href="https://docs.datadoghq.com/tracing/trace_retention_and_ingestion">ingestion de données et de votre rétention de traces</a>, et ce sans aucun échantillonnage.
<br>
Adoptez <a href="https://docs.datadoghq.com/tracing/trace_retention_and_ingestion">la rétention et l'ingestion des traces</a> pour utiliser les nouvelles fonctionnalités.
</div>

La fonction [App Analytics][1] sert à filtrer les spans indexées avec des tags définis par l'utilisateur, comme `customer_id`, `error_type` ou `app_name`, vous permettant ainsi de dépanner et filtrer vos requêtes. Elle peut être activée de deux façons :

* Configurez votre traceur d'APM de façon à ce qu'il émette les analyses pertinentes à partir de vos services. Cela peut se faire de façon [automatique](#configuration-automatique) ou [manuelle](#instrumentation-personnalisee). Ensuite, [activez App Analytics dans Datadog][1] pour commencer à transmettre ces analyses.

**Remarque** : pour utiliser App Analytics, vous devez utiliser l'Agent v6.7 ou une version ultérieure.

## Configuration automatique

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp,nginx" >}}
{{< programming-lang lang="java" >}}

La fonction App Analytics est disponible à partir de la version 0.25.0 du client de tracing Java. Elle peut être activée de façon globale pour toutes les intégrations **de serveur Web** avec un paramètre de configuration unique dans le client de tracing :

* Propriété système : `-Ddd.trace.analytics.enabled=true`
* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

La fonction App Analytics est disponible à partir de la version 0.19.0 du client de tracing Python. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

* Configuration du traceur : `ddtrace.config.analytics_enabled = True`
* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

La fonction App Analytics est disponible à partir de la version 0.19.0 du client de tracing Ruby. Elle peut être activée pour toutes les intégrations **Web** avec un flag global.

Pour ce faire, définissez `DD_TRACE_ANALYTICS_ENABLED=true` dans votre environnement ou configurez ce paramètre :

```ruby
Datadog.configure { |c| c.analytics_enabled = true }
```

* `true` active les analyses pour tous les frameworks Web.
* `false` ou `nil` désactive les analyses, sauf pour les intégrations qui l'activent automatiquement. (Par défaut)

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

La fonction App Analytics est disponible à partir de la version 1.11.0 du client de tracing Go. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec :

* l'option de démarrage du traceur [`WithAnalytics`][1]. Exemple :

  ```go
  tracer.Start(tracer.WithAnalytics(true))
  ```

* la variable d'environnement `DD_TRACE_ANALYTICS_ENABLED=true`, à partir de la version 1.26.0.

[1]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#WithAnalytics
{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

La fonction App Analytics est disponible à partir de la version 0.10.0 du client de tracing Node.js. Elle peut être activée de façon globale pour toutes les intégrations Web avec un paramètre de configuration unique dans le client de tracing :

```javascript
tracer.init({
  analytics: true
})
```

Vous pouvez également utiliser le paramètre de configuration suivant :

* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

La fonction App Analytics est disponible à partir de la version 1.1.0 du client de tracing .NET. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

* Variable d'environnement ou AppSetting : `DD_TRACE_ANALYTICS_ENABLED=true`

Ce paramètre peut également être défini dans le code :

```csharp
Tracer.Instance.Settings.AnalyticsEnabled = true;
```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

La fonction App Analytics est disponible à partir de la version 0.17.0 du client de tracing PHP. Elle peut être activée de façon globale pour toutes les intégrations **Web** avec un paramètre de configuration unique dans le client de tracing :

* Variable d'environnement : `DD_TRACE_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

La fonction App Analytics est disponible à partir de la version 1.0.0 du client de tracing C++. Elle peut être activée de façon globale pour toutes les spans de premier niveau en définissant la variable d'environnement `DD_TRACE_ANALYTICS_ENABLED` sur `true`. Notez que ce paramètre peut également être défini directement dans le code :

```csharp
datadog::opentracing::TracerOptions tracer_options;
  tracer_options.agent_host = "dd-agent";
  tracer_options.service = "<NOM_SERVICE>";
  tracer_options.analytics_rate = 1.0;
  auto tracer = datadog::opentracing::makeTracer(tracer_options);
```

{{< /programming-lang >}}
{{< programming-lang lang="nginx" >}}

Pour activer la fonction App Analytics pour Nginx :

1. Définissez la variable d'environnement `DD_TRACE_ANALYTICS_ENABLED` sur `true`.

2. Ajoutez `env DD_TRACE_ANALYTICS_ENABLED;` en haut de votre fichier `nginx.conf`.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

Une fois la fonction activée, l'interface App Analytics commence à afficher des résultats. Consultez la [page App Analytics][1] pour démarrer.

## Configurer d'autres services (facultatif)

### Configuration par intégration

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour des intégrations spécifiques grâce au paramètre suivant :

* Propriété système : `-Ddd.<intégration>.analytics.enabled=true`
* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans JMS sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de JMS dans la fonction App Analytics :

* Propriété système : `-Ddd.jms.analytics.enabled=true`
* Variable d'environnement : `DD_JMS_ANALYTICS_ENABLED=true`

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].

[1]: /fr/tracing/compatibility_requirements/java/#compatibility
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour des intégrations spécifiques grâce au paramètre suivant :

* Configuration du traceur : `ddtrace.config.<INTÉGRATION>.analytics_enabled = True`
* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans Boto sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de Boto dans la fonction App Analytics :

* Configuration du traceur : `ddtrace.config.boto.analytics_enabled = True`
* Variable d'environnement : `DD_BOTO_ANALYTICS_ENABLED=true`

**Remarque** : l'implémentation du traceur étant propre à chaque intégration, plusieurs intégrations nécessitent une configuration spéciale. Consultez la documentation des bibliothèques sur [App Analytics][1] pour en savoir plus.

[1]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace_search_analytics
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

La fonction App Analytics peut être activée pour des intégrations spécifiques.

Pour ce faire, définissez `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true` dans votre environnement ou configurez ce paramètre :

```ruby
Datadog.configure { |c| c.use :integration, analytics_enabled: true }
```

Où `intégration` est le nom de l'intégration. Consultez la [liste des intégrations disponibles][1] pour découvrir les options disponibles.

* `true` active l'analyse pour cette intégration, quel que soit le paramètre global.
* `false` désactive l'analyse pour cette intégration, quel que soit le paramètre global.
* `nil` applique le paramètre global pour l'analyse.

[1]: /fr/tracing/setup/ruby/#library-compatibility
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour chaque intégration. Par exemple, pour configurer le paquet `net/http` de la bibliothèque standard, vous pouvez procéder ainsi :

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

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour des intégrations spécifiques.

Par exemple, pour activer la fonction App Analytics pour `express` :

```js
tracer.use('express', {
  analytics: true
})
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].

[1]: /fr/tracing/setup/nodejs/#integrations
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour des intégrations spécifiques.

* Variable d'environnement ou AppSetting : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Ou via le code :

```csharp
Tracer.Instance.Settings.Integrations["<INTÉGRATION>"].AnalyticsEnabled = true;
```

Par exemple, pour activer la fonction App Analytics pour ASP.NET MVC :

* Variable d'environnement ou AppSetting : `DD_ASPNETMVC_ANALYTICS_ENABLED=true`

Ou via le code :

```csharp
Tracer.Instance.Settings.Integrations["AspNetMvc"].AnalyticsEnabled = true;
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1]. **Remarque :** sous Linux, les noms des variables d'environnement sont sensibles à la casse.

[1]: /fr/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

En plus du paramètre global, vous pouvez activer ou désactiver la fonction App Analytics pour des intégrations spécifiques grâce au paramètre suivant :

* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez ces options en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, si des spans Symfony sont envoyées en tant que service custom, vous pouvez définir le code suivant pour activer le tracing de Symfony dans la fonction App Analytics :

* Variable d'environnement : `DD_SYMFONY_ANALYTICS_ENABLED=true`

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].

[1]: /fr/tracing/setup/php/#integration-names
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Services de base de données

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}


Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

* Propriété système : `-Ddd.jdbc.analytics.enabled=true`
* Variable d'environnement : `DD_JDBC_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

* Configuration du traceur : `ddtrace.config.psycopg.analytics_enabled = True`
* Variable d'environnement : `DD_PSYCOPG_ANALYTICS_ENABLED=true`

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```ruby
Datadog.configure { |c| c.use :mongo, analytics_enabled: true }
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```go
// Enregistrer le pilote de base de données avec la fonction Analytics activée.
sqltrace.Register("mysql", &mysql.MySQLDriver{}, sqltrace.WithAnalytics(true))
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple :

```javascript
tracer.use('mysql', {
  analytics: true
})
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Par défaut, le tracing de base de données n'est pas pris en charge par la fonction App Analytics. Vous devez activer la collecte manuellement pour chaque intégration. Par exemple, pour activer la fonction App Analytics pour ADO.NET :

* Variable d'environnement ou AppSetting : `DD_AdoNet_ANALYTICS_ENABLED=true`

Ou via le code :

```csharp
Tracer.Instance.Settings.Integrations["AdoNet"].AnalyticsEnabled = true;
```

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1]. **Remarque :** sous Linux, les noms des variables d'environnement sont sensibles à la casse.

[1]: /fr/tracing/setup/dotnet/#integrations
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Par défaut, le tracing Datadog n'est pas enregistré par la fonction App Analytics. Vous pouvez activer ou désactiver cette fonction pour des intégrations spécifiques grâce au paramètre suivant :

* Variable d'environnement : `DD_<INTÉGRATION>_ANALYTICS_ENABLED=true`

Utilisez cette option en plus de la configuration globale pour les intégrations qui envoient des services custom. Par exemple, pour `mysqli` :

* Variable d'environnement : `DD_MYSQLI_ANALYTICS_ENABLED=true`

Les noms des intégrations sont disponibles sur le [tableau des intégrations][1].

[1]: /fr/tracing/setup/php/#integrations
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Instrumentation personnalisée

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}
{{< programming-lang lang="java" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `ANALYTICS_SAMPLE_RATE` à une span :

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
      span.setTag(DDTags.SERVICE, "<NOM_SERVICE>");
      span.setTag(DDTags.ANALYTICS_SAMPLE_RATE, 1.0);
    }
  }
}
```
**Remarque :** la fonction App Analytics peut être activée pour [dd.trace.methods][1] ou pour les spans des [annotations de trace][2] en définissant `-Ddd.trace-annotation.analytics.enabled=true`.


[1]: https://docs.datadoghq.com/fr/tracing/custom_instrumentation/java/#dd-trace-methods
[2]: https://docs.datadoghq.com/fr/tracing/custom_instrumentation/java/#trace-annotations
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `ddtrace.constants.ANALYTICS_SAMPLE_RATE_KEY` à une span :

```python
from ddtrace import tracer
from ddtrace.constants import ANALYTICS_SAMPLE_RATE_KEY

@tracer.wrap()
def my_method():
    span = tracer.current_span()
    span.set_tag(ANALYTICS_SAMPLE_RATE_KEY, True)
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `ANALYTICS_KEY` à une span :

```ruby
Datadog.tracer.trace('my.task') do |span|
  # Définir le taux d'échantillonnage de l'analyse sur 1.0
  span.set_tag(Datadog::Ext::Analytics::TAG_ENABLED, true)
end
```

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Pour les instrumentations personnalisées, un tag spécial a été ajouté pour activer la fonction App Analytics sur une span, comme ci-dessous :

```go
span.SetTag(ext.AnalyticsEvent, true)
```

Ce tag permet de définir la span comme un événement App Analytics.

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `ANALYTICS` à une span :

```javascript
const { ANALYTICS } = require('dd-trace/ext/tags')

span.setTag(ANALYTICS, true)
```

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `Tags.Analytics` à une span :

```csharp
using Datadog.Trace;

using(var scope = Tracer.Instance.StartActive("web.request"))
{
    // activer l'analyse sur cette span
    scope.span.SetTag(Tags.Analytics, "true");
}

```

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `ANALYTICS_KEY` à une span :

```php
<?php
  // ... la span existante pour laquelle vous souhaitez activer App Analytics
  $span->setTag(Tag::ANALYTICS_KEY, true);
?>
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

Les applications utilisant une instrumentation personnalisée peuvent activer App Analytics en appliquant le tag `analytics_event` à une span :

```cpp
...
#include <datadog/tags.h>
...
auto tracer = ...
auto span = tracer->StartSpan("operation_name");
// Une valeur booléenne true active la fonction App Analytics,
// avec un taux d'échantillonnage de 1.0.
span->SetTag(datadog::tags::analytics_event, true);
// Une double valeur entre 0.0 et 1.0 active la fonction App Analytics
// et définit le taux d'échantillonnage sur la valeur spécifiée.
span->SetTag(datadog::tags::analytics_event, 0.5);
```

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

[1]: https://app.datadoghq.com/apm/analytics
