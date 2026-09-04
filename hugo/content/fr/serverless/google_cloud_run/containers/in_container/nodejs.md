---
aliases:
- /fr/serverless/google_cloud_run/containers/in_process/nodejs
code_lang: nodejs
code_lang_weight: 20
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
  tag: Documentation
  text: Tracer des applications Node.js
- link: /tracing/other_telemetry/connect_logs_and_traces/nodejs/
  tag: Documentation
  text: Corrélation des logs et des traces Node.js
title: Instrumentation in-container d'un conteneur Cloud Run Node.js.
type: multi-code-lang
---
## Configuration {#setup}

<div class="alert alert-info">Un exemple d'application est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run/in-container/node">disponible sur GitHub</a>.</div>

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

2. **Installez serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node", "/path/to/your/app.js"s\"" %}}

3. **Configurez les logs**.

   Pour activer la journalisation, définissez la variable d'environnement `DD_LOGS_ENABLED=true`. Cela permet à `serverless-init` de lire les logs depuis stdout et stderr.

   Datadog recommande également de définir les variables d'environnement `DD_LOGS_INJECTION=true` et `DD_SOURCE=nodejs` pour activer le parsing avancé des logs Datadog.

   Si vous souhaitez que les logs multilignes soient conservés dans un seul message de log, Datadog recommande d'écrire vos logs au format JSON. Par exemple, vous pouvez utiliser une bibliothèque de journalisation tierce telle que `winston` :
   {{< code-block lang="javascript" disable_copy="false" >}}
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console()
  ],
});

logger.info('Hello world!');
{{< /code-block >}}

   Pour plus d'informations, consultez [Corrélation des logs et des traces Node.js][2].

4. **Configurez votre application**.

{{% serverless-init-configure cloudrun="true" %}}

5. {{% gcr-service-label %}}

6. **Envoyez des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [consultez les exemples de code][3]. Dans serverless, seul le type de métrique *distribution* est pris en charge.

7. **Activez le profilage (préversion)**.

   Pour activer le [Continuous Profiler][6], définissez la variable d'environnement `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">Le Continuous Profiler de Datadog est disponible en préversion pour les services Google Cloud Run.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Traçage distribué avec Pub/Sub {#distributed-tracing-with-pubsub}

{{% gcr-pubsub-push-tracing %}}

## Dépannage {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" in_container="true" %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[2]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[6]: /fr/profiler/