---
aliases:
- /fr/serverless/google_cloud_run/containers/in_process/python
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: Tracer des applications Python
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Corrélation des logs et des traces Python
title: Instrumentation du conteneur Python Cloud Run en mode in-container
type: multi-code-lang
---
## Configuration {#setup}

<div class="alert alert-info">Un exemple d'application est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/python">disponible sur GitHub</a>.</div>

1. **Installez le SDK Python Datadog**.

   Ajoutez `ddtrace` à votre `requirements.txt` ou `pyproject.toml`. Vous pouvez trouver la dernière version sur [PyPI][1] :
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Alternativement, vous pouvez installer le SDK dans votre Dockerfile :
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
RUN pip install ddtrace
{{< /code-block >}}

   Ensuite, enveloppez votre commande de démarrage avec `ddtrace-run` :
   {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}}
CMD ["ddtrace-run", "python", "app.py"]
{{< /code-block >}}

   Pour plus d'informations, consultez [Tracing Python applications][2].

2. **Installez serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"ddtrace-run", "python", "path/to/your/python/app.py".py\"" %}}

3. **Configurez les logs**.

   Pour activer la journalisation, définissez la variable d'environnement `DD_LOGS_ENABLED=true`. Cela permet à `serverless-init` de lire les logs depuis stdout et stderr.

   Datadog recommande également les variables d'environnement suivantes :
   - `ENV PYTHONUNBUFFERED=1` : Assurez-vous que les sorties Python apparaissent immédiatement dans les logs du conteneur au lieu d'être mises en mémoire tampon.
   - `ENV DD_LOGS_INJECTION=true` : Activez la corrélation log/trace pour les loggers pris en charge.
   - `ENV DD_SOURCE=python` : Activez le parsing avancé des logs Datadog.

   Si vous souhaitez que les logs multilignes soient conservés dans un seul message de log, Datadog recommande d'écrire vos logs au format JSON. Par exemple, vous pouvez utiliser une bibliothèque de journalisation tierce telle que `structlog` :
   {{< code-block lang="python" disable_copy="false" >}}
import structlog

def tracer_injection(logger, log_method, event_dict):
    event_dict.update(tracer.get_log_correlation_context())
    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.EventRenamer("msg"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.WriteLoggerFactory(file=sys.stdout),
)

logger = structlog.get_logger()

logger.info("Hello world!")
{{< /code-block >}}

   Pour plus d'informations, consultez [Corrélation des logs et des traces Python][3].

4. **Configurez votre application**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Envoyez des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [installez le client DogStatsD][4] et [consultez des exemples de code][5]. Dans serverless, seul le type de métrique *distribution* est pris en charge.

7. **Activez le profilage (préversion)**.

   Pour activer le [Continuous Profiler][6], définissez la variable d'environnement `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">Le Continuous Profiler de Datadog est disponible en préversion pour les services Google Cloud Run.</div>

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Traçage distribué avec Pub/Sub {#distributed-tracing-with-pubsub}

Définissez `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true`. Cela crée un span `gcp.pubsub.receive` inféré pour la requête push.

Le tracing des abonnements push Google Cloud Pub/Sub nécessite la version 4.8.0 ou ultérieure de `ddtrace`.

{{% gcr-pubsub-push-tracing %}}

## Dépannage {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /fr/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /fr/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /fr/profiler/