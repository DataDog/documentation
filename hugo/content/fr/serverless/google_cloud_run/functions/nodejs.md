---
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: Documentation
  text: Tracer des applications Node.js
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: Documentation
  text: Corrélation des logs et des traces Node.js
title: Instrumentation d'une fonction Cloud Run Node.js
type: multi-code-lang
---
<div class="alert alert-info">Un exemple d'application est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-functions/node">disponible sur GitHub</a>.</div>

## Configuration {#setup}

1. **Installez le SDK Datadog Node.js**.

   1. Dans votre application principale, installez le package `dd-trace`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Initialisez le traceur Node.js avec la variable d'environnement `NODE_OPTIONS` :
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   Pour plus d'informations, consultez [Traçage des applications Node.js][1].

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

   À cette étape, configurez votre bibliothèque de journalisation pour écrire les logs dans le fichier défini dans `DD_SERVERLESS_LOG_PATH`. Dans Node.js, Datadog recommande d'écrire les logs au format JSON. Par exemple, vous pouvez utiliser une bibliothèque de journalisation tierce telle que `winston` :
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const LOG_FILE = "/shared-volume/logs/app.log"

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: LOG_FILE }),
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Datadog recommande de définir les variables d'environnement `DD_LOGS_INJECTION=true` (dans votre conteneur principal) et `DD_SOURCE=nodejs` (dans votre conteneur sidecar) pour activer le parsing avancé des logs Datadog.

   Pour plus d'informations, consultez [Corrélation des logs et des traces Node.js][2].

4. {{% gcr-service-label %}}

5. **Envoyez des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [consultez les exemples de code][3]. Dans Serverless Monitoring, seul le type de métrique *distribution* est pris en charge.

6. **Activez le profilage (préversion)**.

   Pour activer le [Continuous Profiler][6], définissez la variable d'environnement `DD_PROFILING_ENABLED=true` dans votre conteneur d'application.

   <div class="alert alert-info">Le Continuous Profiler de Datadog est disponible en préversion pour les fonctions Cloud Run de 2e génération.</div>

{{% serverless-init-env-vars-sidecar language="nodejs" function="true" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Traçage distribué avec Pub/Sub {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## Dépannage {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /fr/profiler/