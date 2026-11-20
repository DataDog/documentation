---
code_lang: python
code_lang_weight: 10
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
  tag: Documentation
  text: Tracer des applications Python
- link: /tracing/other_telemetry/connect_logs_and_traces/python/
  tag: Documentation
  text: Corrélation des logs et des traces Python
title: Instrumentation d'une fonction Python Cloud Run
type: multi-code-lang
---
<div class="alert alert-info">Un exemple d'application est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/python">disponible sur GitHub</a>.</div>

## Configuration {#setup}

1. **Installez le SDK Python Datadog**.

   Ajoutez `ddtrace` à votre `requirements.txt` ou `pyproject.toml`. Cela garantit que le SDK est inclus dans votre image de conteneur lorsqu'elle est construite et déployée. Vous pouvez trouver la dernière version sur [PyPI][1] :
   {{< code-block lang="text" filename="requirements.txt" disable_copy="false" collapsible="true" >}}
ddtrace==<VERSION>
{{< /code-block >}}

   Pour plus d'informations, consultez [Tracing Python applications][2].

2. **Installez serverless-init en tant que sidecar**.

   {{< tabs >}}

   {{% tab "Datadog CLI" %}}
   {{% gcr-install-sidecar-datadog-ci %}}
   {{% /tab %}}

   {{% tab "Terraform" %}}
   {{% gcr-install-sidecar-terraform function="true" %}}
   {{% /tab %}}

   {{% tab "Other" %}}
   {{% gcr-install-sidecar-other function="true" %}}
   {{% /tab %}}

   {{< /tabs >}}

3. **Configurez les logs**.

   À l'étape précédente, vous avez créé un volume partagé. Vous avez peut-être également défini la variable d'environnement `DD_SERVERLESS_LOG_PATH`, dont la valeur par défaut est `/shared-volume/logs/app.log`.

   À cette étape, configurez votre bibliothèque de journalisation pour écrire les logs dans le fichier défini dans `DD_SERVERLESS_LOG_PATH`. Vous pouvez également définir un format personnalisé pour la corrélation log/trace et d'autres fonctionnalités. Datadog recommande de définir les variables d'environnement suivantes :
   - `PYTHONUNBUFFERED=1` : Dans votre conteneur principal. Assurez-vous que les sorties Python apparaissent immédiatement dans les logs du conteneur au lieu d'être mises en mémoire tampon.
   - `DD_LOGS_INJECTION=true` : Dans votre conteneur principal. Activez la corrélation log/trace pour les loggers pris en charge.
   - `DD_SOURCE=python` : Dans votre conteneur sidecar. Activez le parsing avancé des logs Datadog.

   Ensuite, mettez à jour votre bibliothèque de journalisation. Par exemple, vous pouvez utiliser la bibliothèque native `logging` de Python :
   {{< code-block lang="python" disable_copy="false" >}}
LOG_FILE = "/shared-volume/logs/app.log"
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
        '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
        '- %(message)s')

logging.basicConfig(
    level=logging.INFO,
    format=FORMAT,
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

logger.info('Hello world!')
{{< /code-block >}}

   Pour plus d'informations, consultez [Corrélation des logs et des traces Python][3].

4. {{% gcr-service-label %}}

5. **Envoyez des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [installez le client DogStatsD][4] et [consultez des exemples de code][5]. Dans Serverless Monitoring, seul le type de métrique *distribution* est pris en charge.

6. **Activez le profilage (préversion)**.

   Pour activer le [Continuous Profiler][6], définissez la variable d'environnement `DD_PROFILING_ENABLED=true` dans votre conteneur d'application et ajoutez `import ddtrace.auto` en haut de votre fichier de fonction :

   {{< code-block lang="python" disable_copy="false" >}}
import ddtrace.auto

# ... rest of your function code
{{< /code-block >}}

   <div class="alert alert-info">Le Continuous Profiler de Datadog est disponible en préversion pour les fonctions Cloud Run de 2e génération.</div>

{{% serverless-init-env-vars-sidecar language="python" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Traçage distribué avec Pub/Sub {#distributed-tracing-with-pubsub}

Définissez `DD_TRACE_INFERRED_PROXY_SERVICES_ENABLED=true` dans le conteneur d'application. Cela crée un span `gcp.pubsub.receive` inféré pour la requête push.

Le tracing des abonnements push Google Cloud Pub/Sub nécessite la version 4.8.0 ou ultérieure de `ddtrace`.

{{% gcr-pubsub-push-tracing %}}

## Dépannage {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.org/project/ddtrace/
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /fr/tracing/other_telemetry/connect_logs_and_traces/python/
[4]: /fr/extend/dogstatsd/?tab=python#install-the-dogstatsd-client
[5]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples-5
[6]: /fr/profiler/