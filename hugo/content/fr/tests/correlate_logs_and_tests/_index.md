---
description: Corrélez vos logs avec vos traces de test.
further_reading:
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
title: Corréler vos logs et vos traces
---
## Présentation {#overview}

Vous pouvez corréler les données Test Optimization avec les [logs injectés dans Datadog][1], ce qui vous permet de visualiser et d'analyser les logs pour des cas de test spécifiques.

{{< img src="continuous_integration/correlate_logs_and_tests.png"
  alt="Examinez les logs pour des cas de test spécifiques grâce à la corrélation entre les logs et les tests." style="width:90%" >}}

## Configuration {#setup}

La corrélation peut être configurée différemment selon la manière dont vous [envoyez vos données de test à Datadog][2].

{{< tabs >}}
{{% tab "Fournisseur CI cloud (agentless)" %}}

### Java {#java}

La soumission de logs agentless est prise en charge pour les langages et frameworks suivants :

-   `dd-trace-java >= 1.35.2` et Log4j2.

Utilisez les variables d'environnement suivantes pour activer et configurer la soumission de logs agentless :

| Nom                                                | Description                                 | Valeur par défaut |
| --------------------------------------------------- | ------------------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (requis)    | Active/désactive la soumission de logs             | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (facultatif)      | Définit le niveau de log pour la soumission agentless     | `INFO`        |
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (facultatif) | Définit la taille maximale de la file d'attente des logs en attente | `1024`        |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (facultatif)        | Définit l'URL personnalisée pour la soumission des logs         | -             |

### JavaScript/TypeScript {#javascripttypescript}

La soumission de logs agentless est prise en charge pour les versions de traceur et les bibliothèques de logs suivantes :

- `dd-trace-js v4.48.0 or later` sur la ligne de version v4, ou `dd-trace-js v5.24.0 or later` sur la ligne de version v5, avec `winston`.
- `dd-trace-js v5.124.0 or later` sur la ligne de version v5, ou `dd-trace-js v6.13.0 or later` sur la ligne de version v6, avec `pino` ou `bunyan`.

Utilisez les variables d'environnement suivantes pour activer et configurer la soumission de logs agentless :

| Nom                                             | Description                         | Valeur par défaut |
| ------------------------------------------------ | ----------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (requis) | Active/désactive la soumission des logs     | `false`       |
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (facultatif)     | Définit une URL personnalisée pour la soumission des logs | -             |

### .NET {#net}

La soumission de logs agentless est prise en charge pour les langages et frameworks suivants :

-   `dd-trace-dotnet >= 2.50.0` et XUnit TestOutputHelper.

Utilisez les variables d'environnement suivantes pour activer et configurer la soumission de logs agentless :

| Nom                                      | Description                                   | Valeur par défaut |
| ----------------------------------------- | --------------------------------------------- | ------------- |
| `DD_CIVISIBILITY_LOGS_ENABLED` (requis) | Active/désactive la soumission des logs CI Visibility | `false`       |

### Swift {#swift}

Utilisez les variables d'environnement suivantes pour activer et configurer la soumission des logs :

| Nom                               | Description                            | Valeur par défaut |
| ---------------------------------- | -------------------------------------- | ------------- |
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | Active/désactive la soumission des logs stdout | `false`       |
| `DD_ENABLE_STDERR_INSTRUMENTATION` | Active/désactive la soumission des logs stderr | `false`       |

### Python {#python}

Prérequis : `ddtrace >= 4.8.0`.

La soumission des logs est prise en charge pour le framework de test pytest, et uniquement lorsque les logs sont émis avec le module `logging` de la bibliothèque standard.

Utilisez la variable d'environnement suivante pour activer la soumission des logs en mode Agentless :

| Nom                                             | Description                     | Valeur par défaut |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (requis) | Active/désactive la soumission des logs | `false`       |

Si vous utilisez **Datadog Agent** au lieu du mode Agentless, définissez plutôt `DD_LOGS_INJECTION=true` dans l'environnement :

#### logs hors processus {#out-of-process-logs}

Lorsqu'un processus distinct exécute du code déclenché par un test, il a besoin d'un `trace_id` et d'un `span_id` provenant de cette trace de test pour corréler ses logs. Utilisez `ddtrace.testing.logs.DDTestLogsHandler` (`ddtrace >= 4.11.0`) pour envoyer ces enregistrements de logs vers l'ingestion de logs Datadog, corrélés avec la trace de test d'origine.

`DDTestLogsHandler` lit les mêmes variables d'environnement que le plugin pytest pour détecter le backend (agentless ou proxy EVP). Il est disponible dans tout sous-processus où ces variables sont disponibles.

**Mode Agentless** (défini `DD_CIVISIBILITY_AGENTLESS_ENABLED=true`) :

| Variable     | Description     | Valeur par défaut         |
| ------------ | --------------- | --------------- |
| `DD_API_KEY` | Clé Datadog API | (obligatoire)      |
| `DD_SITE`    | Site Datadog    | `datadoghq.com` |

**Mode Agent/proxy EVP** (par défaut) :

| Variable                  | Description    | Valeur par défaut     |
| ------------------------- | -------------- | ----------- |
| `DD_TRACE_AGENT_URL`      | URL complète de l'agent | -           |
| `DD_TRACE_AGENT_HOSTNAME` | Nom d'hôte de l'agent | `localhost` |
| `DD_TRACE_AGENT_PORT`     | Port de l'agent | `8126`      |

##### Thread par worker {#thread-per-worker}

Pour un thread par worker de test, utilisez `ThreadLocalCorrelationFilter` pour associer les enregistrements de logs de chaque thread à la trace de test correcte :

```python
import logging
from ddtrace.testing.logs import DDTestLogsHandler, ThreadLocalCorrelationFilter

with DDTestLogsHandler(service="my-service") as handler:
    correlation = ThreadLocalCorrelationFilter()
    handler.addFilter(correlation)
    logging.getLogger().addHandler(handler)

    while True:
        job = queue.get()  # queue and run_test are provided by your worker framework
        correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
        run_test(job.item)
```

`DDTestLogsHandler` vide automatiquement les enregistrements mis en mémoire tampon lorsqu'il est utilisé comme gestionnaire de contexte. Appelez `handler.close()` si vous n'utilisez pas la forme de gestionnaire de contexte.

##### Workers Asyncio {#asyncio-workers}

Pour les workers basés sur asyncio, `ThreadLocalCorrelationFilter` n'est pas compatible avec les workers basés sur asyncio car le stockage local au thread ne se propage pas au-delà des limites `asyncio.Task`. Sous-classez `CorrelationFilter` et utilisez plutôt un `contextvars.ContextVar`, que la boucle d'événements propage automatiquement au-delà des limites `await` :

```python
import asyncio
import contextvars
import logging
from ddtrace.testing.logs import CorrelationFilter, DDTestLogsHandler

class ContextVarCorrelationFilter(CorrelationFilter):
    def __init__(self):
        super().__init__()
        self._trace_id = contextvars.ContextVar("dd_trace_id", default=None)
        self._span_id = contextvars.ContextVar("dd_span_id", default=None)

    def set_context(self, trace_id, span_id):
        self._trace_id.set(trace_id)
        self._span_id.set(span_id)

    def get_trace_id(self):
        return self._trace_id.get()

    def get_span_id(self):
        return self._span_id.get()

async def run_one(job, correlation):
    correlation.set_context(trace_id=job.trace_id, span_id=job.span_id)
    await run_test(job.item)

async def main(jobs):
    with DDTestLogsHandler(service="my-service") as handler:
        correlation = ContextVarCorrelationFilter()
        handler.addFilter(correlation)
        logging.getLogger().addHandler(handler)
        await asyncio.gather(*(run_one(job, correlation) for job in jobs))
```

### Ruby {#ruby}

La soumission des logs agentless avec Test Optimization des tests est prise en charge pour les applications Rails. Avant d'activer, assurez-vous
que votre application est [instrumentée avec le traçage Datadog][1].

Pour utiliser la soumission des logs agentless, vous avez besoin de la version `datadog-ci` `0.16` ou ultérieure. Les bibliothèques de logs suivantes sont prises en charge :

-   `activesupport >= 5.0` (uniquement lors de l'utilisation de `ActiveSupport::TaggedLogging`)
-   `lograge >= 0.14`
-   `semantic_logger >= 4.0`

Utilisez la variable d'environnement suivante pour activer la soumission des logs :

| Nom                                             | Description                     | Valeur par défaut |
| ------------------------------------------------ | ------------------------------- | ------------- |
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (requis) | Active/désactive la soumission des logs | `false`       |

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/ruby/#rails-or-hanami-applications

{{% /tab %}}
{{% tab "Fournisseur CI sur site (Datadog Agent)" %}}

1. [Configurez la collecte de logs][1] via l'Agent Datadog.
2. Suivez les étapes décrites dans [Corréler les logs et les traces][2].

[1]: /fr/logs/log_collection/
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/log_collection/
[2]: /fr/tests/setup/