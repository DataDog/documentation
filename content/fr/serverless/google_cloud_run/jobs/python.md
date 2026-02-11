---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: Tracer des applications Python
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Corréler les journaux et les traces Python
title: Instrumenter un travail Cloud Run Python
type: multi-code-lang
---

## Implémentation

<div class="alert alert-info">Une application d'exemple est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/python">disponible sur GitHub</a>.</div>
<div class="alert alert-info">
Pour une visibilité complète et un accès à toutes les fonctionnalités de Datadog dans les travaux Cloud Run, assurez-vous d'avoir <a href="http://localhost:1313/integrations/google_cloud_platform/">installé l'intégration Google Cloud</a> et d'utiliser <a href="https://hub.docker.com/r/datadog/serverless-init">serverless-init version 1.9.0 ou ultérieure</a>.
</div>

1. Installez le traceur Python de Datadog.

   Ajoutez `ddtrace` à votre `requirements.txt` ou `pyproject.toml`. Vous pouvez trouver la dernière version sur [PyPI][1] : {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}} ddtrace==<VERSION> {{< /code-block >}}

   Alternativement, vous pouvez installer le traceur dans votre Dockerfile : {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} RUN pip install ddtrace {{< /code-block >}}

   Ensuite, enveloppez votre commande de démarrage avec `ddtrace-run` : {{< code-block lang="dockerfile" filename="Dockerfile" disable_copy="false" collapsible="true" >}} CMD ["ddtrace-run", "python", "app.py"] {{< /code-block >}}

   note Les travaux Cloud Run s'exécutent jusqu'à leur achèvement plutôt que de servir des requêtes, donc l'instrumentation automatique ne créera pas un span "job" de niveau supérieur. Pour une visibilité de bout en bout, créez votre propre span racine. Voir les instructions de [personnalisation de l'instrumentation Python][2].

   Pour plus d'informations, voir [Tracer les applications Python][3].

2. **Installez serverless-init**.

   ...

3. **Configurer les journaux**.

   Pour activer la journalisation, définissez la variable d'environnement `DD_LOGS_ENABLED=true`. Cela permet à `serverless-init` de lire les journaux de stdout et stderr.

   Datadog recommande également les variables d'environnement suivantes :
   - `ENV PYTHONUNBUFFERED=1` : Assurez-vous que les sorties Python apparaissent immédiatement dans les journaux du conteneur au lieu d'être mises en mémoire tampon.
   - `ENV DD_LOGS_INJECTION=true` : Activez la corrélation des journaux/traces pour les enregistreurs pris en charge.
   - `ENV DD_SOURCE=python` : Activez l'analyse avancée des journaux Datadog.

   Si vous souhaitez que les journaux multilignes soient préservés dans un seul message de journal, Datadog recommande d'écrire vos journaux au format JSON. Par exemple, vous pouvez utiliser une bibliothèque de journalisation tierce telle que `structlog` : {{< code-block lang="python" disable_copy="false" >}} import structlog

def tracer_injection(logger, log_method, event_dict): event_dict.update(tracer.get_log_correlation_context()) return event_dict

structlog.configure( processors=[ tracer_injection, structlog.processors.EventRenamer("msg"), structlog.processors.JSONRenderer() ], logger_factory=structlog.WriteLoggerFactory(file=sys.stdout), )

logger = structlog.get_logger()

logger.info("Bonjour le monde !") {{< /code-block >}}

   Pour plus d'informations, voir [Corréler les journaux et les traces Python][4].

4. 2. Configurer votre application

...

5. ...

6. ...

7. **Envoyer des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [installez le client DogStatsD][5] et [consultez des exemples de code][6]. Dans un environnement sans serveur, seul le type de métrique *distribution* est pris en charge.

...

## Dépannage

...

## Pour aller plus loin

...

[1]: https://pypi.org/project/ddtrace/
[2]: /fr/tracing/trace_collection/custom_instrumentation/python/dd-api?tab=decorator
[3]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[4]: /fr/tracing/other_telemetry/connect_logs_and_traces/python/
[5]: /fr/developers/dogstatsd/?tab=python#install-the-dogstatsd-client
[6]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5