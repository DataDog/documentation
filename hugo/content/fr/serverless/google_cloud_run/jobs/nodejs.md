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
title: Instrumentation d'un job Cloud Run Node.js
type: multi-code-lang
---
## Configuration {#setup}

<div class="alert alert-info">Une application d'exemple est <a href="https://github.com/DataDog/serverless-gcp-sample-apps/tree/main/cloud-run-jobs/node">disponible sur GitHub</a>.</div>
<div class="alert alert-info">
Pour une visibilité complète et un accès à toutes les fonctionnalités Datadog dans les jobs Cloud Run,
assurez-vous d'avoir <a href="/integrations/google_cloud_platform/">installé l'intégration Google Cloud</a>
et d'utiliser <a href="https://hub.docker.com/r/datadog/serverless-init">la version 1.9.0 ou ultérieure de serverless-init</a>.
</div>

1. **Installez le SDK Datadog Node.js**.

   1. Dans votre application principale, installez le package `dd-trace`.

      {{< code-block lang="shell" disable_copy="false" >}}
npm install dd-trace
{{< /code-block >}}

   2. Initialisez le traceur Node.js avec la variable d'environnement `NODE_OPTIONS` :
   {{< code-block lang="dockerfile" disable_copy="false" >}}
ENV NODE_OPTIONS="--require dd-trace/init"
{{< /code-block >}}

   **Remarque** : les jobs Cloud Run s'exécutent jusqu'à leur terme plutôt que de servir des requêtes ; l'auto-instrumentation ne créera donc pas de span « job » de haut niveau. Pour une visibilité de bout en bout, créez votre propre span racine. Consultez les instructions [d'instrumentation personnalisée Node.js][1].

   Pour plus d'informations, consultez [Tracing Node.js applications][2].

2. **Installez serverless-init**.

   {{% serverless-init-install mode="in-container" cmd="\"/nodejs/bin/node\", \"/path/to/your/app.js\"" cloudservice="jobs" %}}

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

   Pour plus d'informations, consultez [Correlating Node.js Logs and Traces][3].

4. **Configurez votre application**.

{{% serverless-init-configure cloudrun_jobs="true" %}}

5. {{% gcr-service-label %}}

6. {{% gcr-jobs-retention-filter %}}

7. **Envoyer des métriques personnalisées**.

   Pour envoyer des métriques personnalisées, [consultez les exemples de code][4]. Dans serverless, seul le type de métrique *distribution* est pris en charge.

8. **Activer le profilage (aperçu)**.

   Pour activer le [Continuous Profiler][7], définissez la variable d'environnement `DD_PROFILING_ENABLED=true`.

   <div class="alert alert-info">Le Continuous Profiler de Datadog est disponible en aperçu pour les jobs Google Cloud Run.</div>

{{% serverless-init-env-vars-in-container language="nodejs" defaultSource="cloudrun" %}}

{{% svl-tracing-env %}}

## Dépannage {#troubleshooting}

{{% serverless-init-troubleshooting productNames="Cloud Run services" %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/custom_instrumentation/nodejs/dd-api?tab=locally#creating-spans
[2]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
[3]: /fr/tracing/other_telemetry/connect_logs_and_traces/nodejs/
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/?tab=nodejs#code-examples-5
[7]: /fr/profiler/