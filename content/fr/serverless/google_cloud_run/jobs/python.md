---
title: "Instrumentation d'une tâche Python Cloud Run"
code_lang: python
type: multi-code-lang
code_lang_weight: 10
further_reading:
  - link: '/tracing/trace_collection/automatic_instrumentation/dd_libraries/python/'
    tag: 'Documentation'
    text: 'Tracer des applications Python'
  - link: '/tracing/other_telemetry/connect_logs_and_traces/python/'
    tag: 'Documentation'
    text: 'Corrélation des journaux et des traces Python'
---

## Implémentation

<div class="alert alert-info">Un exemple d'application est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">disponible sur GitHub</a>.</div>
<div class="alert alert-info">
Pour bénéficier d'une visibilité totale et accéder à toutes les fonctionnalités de Datadog dans Cloud Run Jobs, assurez-vous d'avoir <a href="http://localhost:1313/integrations/google_cloud_platform/">installé l'intégration Google Cloud</a> et d'utiliser <a href="https://hub.docker.com/r/datadog/serverless-init">la version 1.9.0 ou ultérieure de serverless-init</a>.
</div>

1. Installez le traceur Python de Datadog.

   Ajoutez `ddtrace` à votre `requirements.txt` ou `pyproject.toml`. Vous pouvez trouver la dernière version sur [PyPI][1]: {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}} ddtrace==<VERSION> {{< /code-block >}}

   Vous pouvez également installer le traceur dans votre fichier Dockerfile : {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} RUN pip install ddtrace {{< /code-block >}}

   Ensuite, encapsulez votre commande de démarrage avec `ddtrace-run`: {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} CMD ["ddtrace-run", "python", "app.py"] {{< /code-block >}}

   note Les tâches Cloud Run s'exécutent jusqu'à leur achèvement plutôt que de traiter des requêtes. Par conséquent, l'instrumentation automatique ne crée pas de span « tâche » de niveau supérieur. Pour bénéficier d'une visibilité de bout en bout, créez votre propre span racine. Consultez les instructions relatives à [l'instrumentation personnalisée Python][2].

   Pour plus d'informations, consultez la section [Suivi des applications Python][3].

2. **Installez serverless-init**.

   {{% serverless-init-install mode="in-container" cmd=""ddtrace-run", "python", "path/to/your/python/app.py"" cloudservice="jobs" %}}

3. **Configurer les journaux**.

   Pour activer la journalisation, définissez la variable d'environnement `DD_LOGS_ENABLED=true`. Cela permet à `serverless-init` de lire les journaux à partir de stdout et stderr.

   Datadog recommande également les variables d'environnement suivantes :
   - `ENV PYTHONUNBUFFERED=1`: Assurez-vous que les sorties Python apparaissent immédiatement dans les journaux du conteneur au lieu d'être mises en mémoire tampon.
   - `ENV DD_LOGS_INJECTION=true`: Activer la corrélation des journaux/traces pour les enregistreurs pris en charge.
   - `ENV DD_SOURCE=python`: Activer l'analyse avancée des logs Datadog.

   Si vous souhaitez que les logs multilignes soient conservés dans un seul message de log, Datadog recommande d'écrire vos logs au format JSON. Par exemple, vous pouvez utiliser une bibliothèque de journalisation tierce telle que `structlog`: {{< code-block lang="python" disable_copy="false" >}} import structlog

def tracer_injection(logger, log_method, event_dict) : event_dict.update(tracer.get_log_correlation_context()) return event_dict

structlog.configure( processeurs=\[ tracer_injection, structlog.processors.EventRenamer("msg"), structlog.processors.JSONRenderer() ], logger_factory=structlog.WriteLoggerFactory(fichier=sys.stdout), )

logger = structlog.get_logger()

logger.info("Bonjour tout le monde !") {{< /code-block >}}

   Pour plus d'informations, consultez la section [Corrélation des journaux et des traces Python][4].

4. 2\. Configurer votre application

{{% serverless-init-configure %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Envoyer des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [installez le client DogStatsD][5] et [consultez les exemples de code][6]. Dans le mode sans serveur, seul le type de métrique *de distribution* est pris en charge.

{{% serverless-init-env-vars-in-container language="python" defaultSource="cloudrun" %}}

## Dépannage

{{% serverless-init-troubleshooting productNames="Services Cloud Run" %}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5

