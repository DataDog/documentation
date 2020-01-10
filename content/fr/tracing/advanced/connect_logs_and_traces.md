---
title: Connect Logs and Traces
kind: documentation
further_reading:
  - link: tracing/manual_instrumentation
    tags: Enrichir vos Traces
    text: Instrumenter vos applications manuellement pour créer des traces
  - link: tracing/opentracing
    tags: Enrichir vos Traces
    text: Implémenter Opentracing dans vos applications
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.datadoghq.com/blog/request-log-correlation/'
    tag: Blog
    text: Corréler automatiquement des logs de requête avec des traces
---
L'ajout automatique de `trace_id` et `span_id` à vos logs avec les bibliothèques de tracing permet une meilleure mise en corrélation des données de l'APM avec les données Log Management. Cette fonctionnalité peut être utilisée dans la plateforme pour afficher les logs spécifiques qui sont corrélés à la [trace][1] observée.

Avant de corréler des traces à des logs, assurez-vous que vos logs sont envoyés au format JSON ou [analysés par le bon processeur de log pour le langage utilisé][2].

Vos logs *doivent* être convertis en attributs Datadog afin que la corrélation entre les traces et les logs fonctionne.

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs dans des traces"  style="width:100%;">}}


## Injection automatique d'ID de trace

{{< tabs >}}
{{% tab "Java" %}}

Activez l'injection dans la [configuration][1] du traceur Java en ajoutant le paramètre `-Ddd.logs.injection=true` comme argument de démarrage jvm ou via la variable d'environnement `DD_LOGS_INJECTION=true`.

Si vos logs sont au format brut, modifiez votre formateur en ajoutant `dd.trace_id` et `dd.span_id` à la configuration de votre logger :

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

Si vos logs sont au format JSON et que vous utilisez Logback, vous n'avez plus rien à faire. Si vous utilisez une autre bibliothèque de logging, vous devez activer l'auto-injection des attributs MDC dans vos logs.

[1]: /fr/tracing/setup/java/#configuration
{{% /tab %}}
{{% tab "Python" %}}

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` lorsque vous utilisez `ddtrace-run`.

**Remarque** : l'auto-injection prend en charge la bibliothèque standard `logging`, ainsi que toutes les bibliothèques qui complètent le module de bibliothèque standard, comme la bibliothèque `json_log_formatter`. `ddtrace-run` appelle `logging.basicConfig` avant l'exécution de votre application. Si le logger racine possède un gestionnaire configuré, votre application doit modifier directement le logger racine et le gestionnaire.

{{% /tab %}}
{{% tab "Ruby" %}}

Utilisez l'une des options suivantes pour injecter des informations de trace Ruby dans vos logs :

**Injection automatique d'ID de trace pour les applications Rails à l'aide de Lograge (conseillé)**

Après avoir [configuré Lograge dans une application Rails][1], modifiez le bloc `custom_options` dans le fichier de configuration de votre environnement (p. ex., `config/environments/production.rb`) pour ajouter les ID de trace :

```ruby
config.lograge.custom_options = lambda do |event|
  # Récupère les informations de trace pour le thread actuel
  correlation = Datadog.tracer.active_correlation

  {
    # Ajoute les ID en tant que tags à la sortie du log
    :dd => {
      :trace_id => correlation.trace_id,
      :span_id => correlation.span_id
    },
    :ddsource => ["ruby"],
    :params => event.payload[:params].reject { |k| %w(controller action).include? k }
  }
end
```

**Injection automatique d'ID de trace pour les applications Rails par défaut**

Les applications Rails qui sont configurées avec un logger `ActiveSupport::TaggedLogging` peuvent ajouter des ID de trace en tant que tags à la sortie du log. L'logger Rails par défaut applique cette journalisation avec des tags, ce qui simplifie l'ajout de tags de trace. 

Dans le fichier de configuration de votre environnement Rails (p. ex., `config/environments/production.rb`), ajoutez le code suivant :

```ruby
Rails.application.configure do
  config.log_tags = [proc { Datadog.tracer.active_correlation.to_s }]
end
```

Cela ajoute les tags de trace aux requêtes Web :

```
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Started GET "/articles" for 172.22.0.1 at 2019-01-16 18:50:57 +0000
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Processing by ArticlesController#index as */*
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206]   Article Load (0.5ms)  SELECT "articles".* FROM "articles"
# [dd.trace_id=7110975754844687674 dd.span_id=7518426836986654206] Completed 200 OK in 7ms (Views: 5.5ms | ActiveRecord: 0.5ms)
```


[1]: /fr/logs/log_collection/python/#configure-the-datadog-agent
{{% /tab %}}
{{% tab "Go" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.


[1]: /fr/help
{{% /tab %}}
{{% tab "Node.js" %}}

Activez l'injection avec la variable d'environnement `DD_LOGS_INJECTION=true` ou en configurant directement le traceur :

```javascript
const tracer = require('dd-trace').init({
  logInjection: true
})
```

Cela active l'injection automatique de l'ID de trace pour `bunyan`, `paperplane`, `pino` et `winston`.

**Remarque** : l'injection automatique fonctionne uniquement pour les logs au format JSON.

{{% /tab %}}
{{% tab ".NET" %}}

Le traceur .NET utilise la bibliothèque [LibLog][1] pour injecter automatiquement les identifiants de trace dans les logs de votre application. Il prend en charge l'injection dans les logs [NLog][2], [Log4Net][3] et [Serilog][4] par défaut.

Activez l'injection dans la [configuration][5] du traceur .NET en définissant le paramètre `DD_LOGS_INJECTION=true` via les variables d'environnement ou dans les fichiers de configuration.

De plus, l'injection peut être activée dans le code :

```csharp
using Datadog.Trace;
using Datadog.Trace.Configuration;

var settings = new TracerSettings { LogsInjectionEnabled = true };
var tracer = new Tracer(settings);
```

**Remarque** : ce paramètre est uniquement lu à l'initialisation du `Tracer`. Toute modification de ce paramètre après la création de l'instance `Tracer` sera ignorée.


[1]: https://github.com/damianh/LibLog
[2]: http://nlog-project.org
[3]: https://logging.apache.org/log4net
[4]: http://serilog.net
[5]: /fr/tracing/setup/dotnet/#configuration
{{% /tab %}}
{{% tab "PHP" %}}


```php
  <?php
  $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
  $append = sprintf(
      ' [dd.trace_id=%d dd.span_id=%d]',
      $span->getTraceId(),
      $span->getSpanId()
  );
  my_error_logger('Error message.' . $append);
?>
```

Si le logger implémente la [bibliothèque **monolog/monolog**][1], utilisez `Logger::pushProcessor()` pour ajouter automatiquement les identifiants aux messages de log :

```php
<?php
  $logger->pushProcessor(function ($record) {
      $span = \DDTrace\GlobalTracer::get()->getActiveSpan();
      if (null === $span) {
          return $record;
      }
      $record['message'] .= sprintf(
          ' [dd.trace_id=%d dd.span_id=%d]',
          $span->getTraceId(),
          $span->getSpanId()
      );
      return $record;
  });
?>
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

[1]: https://github.com/Seldaek/monolog
[2]: /fr/logs/log_collection/php
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "C++" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Injection manuelle d'ID de trace

{{< tabs >}}
{{% tab "Java" %}}

Si vous préférez corréler manuellement vos [traces][1] avec vos logs, utilisez l'API Datadog pour récupérer les identifiants de corrélation :

* Utilisez les méthodes d'API `CorrelationIdentifier#getTraceId()` et `CorrelationIdentifier#getSpanId()` pour injecter les identifiants au début et à la fin de chaque [span][2] dans vos logs (voir les exemples ci-dessous).
* Configurez MDC pour utiliser les clés injectées :
  * `dd.trace_id` : l'ID de la trace active lors de l'écriture du message de log (ou `0` en l'absence de trace).
  * `dd.span_id` : l'ID de la span active lors de l'écriture du message de log (ou `0` en l'absence de trace).

* `log4j2` - exemple :

```java
import org.apache.logging.log4j.ThreadContext;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    ThreadContext.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    ThreadContext.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    ThreadContext.remove("dd.trace_id");
    ThreadContext.remove("dd.span_id");
}
```

* `slf4j/logback` -  exemple :

```java
import org.slf4j.MDC;
import datadog.trace.api.CorrelationIdentifier;

// Des spans doivent avoir été initialisées et être actives avant ce bloc.
try {
    MDC.put("dd.trace_id", String.valueOf(CorrelationIdentifier.getTraceId()));
    MDC.put("dd.span_id", String.valueOf(CorrelationIdentifier.getSpanId()));
}

// Loguer quelque chose

finally {
    MDC.remove("dd.trace_id");
    MDC.remove("dd.span_id");
}
```

Modifiez ensuite la configuration de votre logger en ajoutant `dd.trace_id` et `dd.span_id` à votre pattern de log :

```
<Pattern>"%d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %X{dd.trace_id:-0} %X{dd.span_id:-0} - %m%n"</Pattern>
```

**Remarque** : si vous n'utilisez pas une [intégration de log Datadog][3] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][4].

[Consultez la documentation relative à la journalisation Java][3] pour en savoir plus sur l'implémentation d'un logger spécifique ou découvrir comment créer des logs au format JSON.


[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/visualization/#spans
[3]: /fr/logs/log_collection/java/#raw-format
[4]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Python" %}}

**Injection manuelle d'ID de trace avec le module de journalisation de la bibliothèque standard**

Si vous préférez corréler manuellement vos [traces][1] avec vos logs, ajustez votre module `logging` en modifiant votre formateur de log de façon à inclure les attributs ``dd.trace_id`` et ``dd.span_id`` à partir de l'entrée de log.

La configuration ci-dessous est utilisée par la méthode d'injection automatique et prise en charge par défaut par l'intégration de log Python :

``` python
from ddtrace import patch_all; patch_all(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__nom__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

**Injection manuelle d'ID de trace sans le module de journalisation de la bibliothèque standard**

Si vous n'utilisez pas le module `logging` de la bibliothèque standard, vous pouvez utiliser la commande `ddtrace.helpers.get_correlation_ids()` pour injecter les informations du traceur dans vos logs. Les exemples suivants illustrent cette approche, en définissant une fonction en tant que *processeur* dans `structlog` afin d'ajouter `dd.trace_id` et `dd.span_id` à la sortie de log :

``` python
from ddtrace.helpers import get_correlation_ids

import structlog


def tracer_injection(logger, log_method, event_dict):
    # obtenir les identifiants de corrélation à partir du contexte du traceur actuel
    trace_id, span_id = get_correlation_ids()

    # ajouter des identifiants au dictionnaire d'événement structlog
    # en l'absence de trace, définir les identifiants sur 0
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    return event_dict


structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Une fois le logger configuré, si vous exécutez une fonction tracée qui logue un événement, vous obtenez les informations du traceur injecté :

```
>>> traced_func()
{"event": "Contexte du traceur", "trace_id": 9982398928418628468, "span_id": 10130028953923355146}
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][2] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][3].

[Consultez la documentation relative à la journalisation Python][2] pour vous assurer que l'intégration de log Python est bien configurée de façon à ce que vos logs Python soient automatiquement analysés.


[1]: /fr/tracing/visualization/#trace
[2]: /fr/logs/log_collection/python/#configure-the-datadog-agent
[3]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Ruby" %}}
Pour ajouter des ID de trace à votre propre logger, ajoutez un formateur de log qui récupère les ID de trace avec `Datadog.tracer.active_correlation`, puis ajoutez les ID de trace au message.

Pour s'assurer du bon fonctionnement de la corrélation des logs, vérifiez que les éléments suivants sont inclus dans chaque message :

 - `dd.trace_id=<ID_TRACE>` : `<ID_TRACE>` a pour valeur `Datadog.tracer.active_correlation.trace_id` ou `0` en l'absence de trace active lors de la journalisation.
 - `dd.span_id=<ID_SPAN>` : `<ID_SPAN>` a pour valeur `Datadog.tracer.active_correlation.span_id` ou `0` en l'absence de trace active lors de la journalisation.

Par défaut, `Datadog::Correlation::Identifier#to_s` renvoie `dd.trace_id=<ID_TRACE> dd.span_id=<ID_SPAN>`.

Voici un exemple pour illustrer cela :

```ruby
require 'ddtrace'
require 'logger'

logger = Logger.new(STDOUT)
logger.progname = 'mon_app'
logger.formatter  = proc do |severity, datetime, progname, msg|
  "[#{datetime}][#{progname}][#{severity}][#{Datadog.tracer.active_correlation}] #{msg}\n"
end

# Lorsqu'aucune trace n'est active
logger.warn('Cette opération n'est pas tracée.')
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=0 dd.span_id=0] Cette opération n'est pas tracée.

# Lorsqu'une trace est active
Datadog.tracer.trace('my.operation') { logger.warn('Cette opération est tracée.') }
# [2019-01-16 18:38:41 +0000][my_app][WARN][dd.trace_id=8545847825299552251 dd.span_id=3711755234730770098] Cette opération est tracée.
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].

Consultez la [documentation relative à la journalisation Ruby][1] pour vérifier que l'intégration de log Ruby est bien configurée et que vos logs Ruby sont automatiquement analysés.


[1]: /fr/logs/log_collection/ruby/#configure-the-datadog-agent
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Go" %}}

Le traceur Go expose deux appels d'API afin d'ajouter les identifiants de [span][2] et de [trace][1] aux messages de log via les méthodes exportées à partir du type `SpanContext` :

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Créer une span pour une requête Web au niveau de l'URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Récupérer l'ID de trace et l'ID de span.
    traceID := span.Context().TraceID()
    spanID := span.Context().SpanID()

    // Les ajouter aux messages de log en tant que champs :
    log.Printf("mon message de log dd.trace_id=%d dd.span_id=%d", traceID, spanID)
}
```

L'exemple ci-dessus explique comment utiliser le contexte de la span dans le paquet `log` de la bibliothèque standard. Cette même logique peut être appliquée aux paquets tiers.

**Remarque** : si vous n'utilisez pas une [intégration de log Datadog][3] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][4].


[1]: /fr/tracing/visualization/#trace
[2]: /fr/tracing/visualization/#spans
[3]: /fr/logs/log_collection/go/#configure-your-logger
[4]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "Node.js" %}}

**Injection manuelle d'ID de trace pour les logs au format JSON**

Si votre bibliothèque de journalisation n'est pas compatible avec l'injection automatique, mais que vous utilisez des logs au format JSON, vous pouvez effectuer une injection manuelle directement dans votre code.

Exemple d'utilisation de `console` comme logger sous-jacent :

```javascript
const tracer = require('dd-trace')
const formats = require('dd-trace/ext/formats')

class Logger {
  log (level, message) {
    const span = tracer.scope().active()
    const time = (new Date()).toISOString()
    const record = { time, level, message }

    if (span) {
      tracer.inject(span.context(), formats.LOG, record)
    }

    console.log(JSON.stringify(record))
  }
}

module.exports = Logger
```

**Injection manuelle d'ID de trace pour les logs au format brut**

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

[1]: /fr/help
{{% /tab %}}
{{% tab ".NET" %}}

Pour injecter manuellement des identifiants de trace dans vos logs, accédez aux valeurs nécessaires via la classe statique `CorrelationIdentifier`. Si votre bibliothèque de journalisation prend en charge les logs structurés (tels que les messages JSON), ajoutez les propriétés `dd.trace_id` et `dd.span_id` ainsi que leurs valeurs respectives.

Sinon, ajoutez les chaînes `dd.trace_id=<ID_TRACE>` et `dd.span_id=<ID_SPAN>` à votre message de log. Par exemple :

```csharp
using Datadog.Trace;

var traceId = CorrelationIdentifier.TraceId;
var spanId = CorrelationIdentifier.SpanId;

var message = $"Mon message de log. [dd.trace_id={traceId} dd.span_id={spanId}]";
```

**Remarque** : si vous n'utilisez pas une [intégration de log de Datadog][1] pour analyser vos logs, des règles de parsing de log personnalisées doivent être utilisées pour s'assurer que `trace_id` et `span_id` sont analysés en tant que chaînes de caractères. Pour en savoir plus, consultez la [FAQ à ce sujet][2].


[1]: /fr/logs/log_collection/csharp/#configure-your-logger
[2]: /fr/tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel
{{% /tab %}}
{{% tab "PHP" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

[1]: /fr/help
{{% /tab %}}
{{% tab "C++" %}}

Prochainement disponible. Contactez l'[assistance Datadog][1] pour en savoir plus.

[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/visualization/#trace
[2]: /fr/agent/logs/#enabling-log-collection-from-integrations