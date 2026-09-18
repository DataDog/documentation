---
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentation
  text: Compatibilité entre Datadog et OpenTelemetry
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utiliser des composants OpenTelemetry personnalisés
- link: /opentelemetry/instrument/
  tag: Documentation
  text: Instrumenter votre application avec OpenTelemetry
title: Instrumenter des runtimes non pris en charge avec OpenTelemetry
---
## Présentation {#overview}

Si le runtime de votre application n'est pas pris en charge nativement par un [SDK Datadog][1], vous pouvez utiliser le SDK OpenTelemetry pour envoyer des données de télémétrie à Datadog. Cette approche vous permet d'obtenir des traces et des métriques sans attendre la prise en charge native du runtime.

Ce guide explique comment instrumenter une application [Bun][2] à titre d'exemple. Bun est compatible avec la plupart des API Node.js, vous pouvez donc utiliser le [SDK Node.js OpenTelemetry][3] pour instrumenter des applications Bun. Vous pouvez appliquer le même modèle à d'autres runtimes non pris en charge compatibles avec le SDK OpenTelemetry.

## Niveau de support {#support-level}

<div class="alert alert-info">
Ce guide relève de <strong>Composants personnalisés</strong> <a href="/opentelemetry/compatibility/#support-levels">niveau de support</a>. Datadog fournit cette documentation comme point de départ, mais ne prend pas directement en charge les fonctionnalités du runtime ou le comportement du SDK OpenTelemetry en son sein. Pour les problèmes spécifiques au runtime, adressez-vous à la <a href="https://opentelemetry.io/community/">communauté OpenTelemetry</a> ou aux responsables du runtime.
</div>

## Prérequis {#prerequisites}

- Un backend compatible OpenTelemetry configuré pour envoyer des données à Datadog. Consultez [Envoyer des données OpenTelemetry à Datadog][4] pour connaître les options de configuration, notamment le collecteur DDOT, le collecteur OTel avec l'exportateur Datadog ou l'ingestion OTLP directe.
- [Bun][2] installé (v1.0 ou version ultérieure).
- Une application Bun que vous souhaitez instrumenter.

## Instrumenter une application Bun {#instrument-a-bun-application}

### Installer les packages OpenTelemetry {#install-opentelemetry-packages}

Depuis le répertoire racine de votre projet, installez les packages OpenTelemetry requis :

```shell
bun add @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/exporter-metrics-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

### Créez un module d'initialisation de télémétrie {#create-a-telemetry-initialization-module}

Dans Node.js, OpenTelemetry se charge généralement via le flag `--require`, qui précharge l'instrumentation avant l'exécution du code de votre application. Le système de résolution de modules de Bun fonctionne différemment, vous devez donc initialiser OpenTelemetry par programmation à la place.

Créez un fichier `tracing.ts` qui configure le SDK Node.js d'OpenTelemetry :

{{< code-block lang="typescript" filename="tracing.ts" >}}
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || '<YOUR_SERVICE_NAME>',
  [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || '1.0.0',
  'telemetry.sdk.runtime': 'bun',
});

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  })],
  instrumentations: [getNodeAutoInstrumentations({
    // Disable fs instrumentation to avoid compatibility issues with Bun
    '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
{{< /code-block >}}

Remplacez `<YOUR_SERVICE_NAME>` par le nom de service de votre application.

### Initialisez la télémétrie au point d'entrée de votre application {#initialize-telemetry-at-your-application-entry-point}

Importez le module `tracing.ts` **avant** tout autre import d'application. Le SDK OpenTelemetry doit s'initialiser en premier pour corriger les bibliothèques pour l'auto-instrumentation.

{{< code-block lang="typescript" filename="index.ts" >}}
import './tracing';

// Import your application code after tracing is initialized
import { startApp } from './app';

startApp();
{{< /code-block >}}

### Configurez les variables d'environnement {#configure-environment-variables}

Définissez les variables d'environnement suivantes pour configurer l'endpoint de l'exportateur OTLP et l'identité de votre service :

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
```

La valeur `OTEL_EXPORTER_OTLP_ENDPOINT` dépend de votre configuration :
- **Collecteur local** (DDOT ou collecteur OTel) : `http://localhost:4318` (HTTP par défaut) ou `http://localhost:4317` (gRPC)
- **Collecteur distant** : utilisez l'adresse et le port du collecteur

Pour des options de configuration supplémentaires, consultez la [spécification des variables d'environnement OpenTelemetry][5].

### Exécutez votre application {#run-your-application}

Démarrez votre application Bun :

```shell
bun run index.ts
```

### Ajoutez une instrumentation manuelle pour les API natives de Bun {#add-manual-instrumentation-for-bun-native-apis}

Les API intégrées de Bun telles que `Bun.serve()`, `bun:sqlite` et les API d'E/S de fichiers natives ne sont pas instrumentées automatiquement. Pour capturer la télémétrie de ces API, créez des spans manuellement avec le package `@opentelemetry/api`.

L'exemple suivant enveloppe un gestionnaire de route `Bun.serve()` avec un span personnalisé :

{{< code-block lang="typescript" filename="server.ts" >}}
import { trace, SpanKind } from '@opentelemetry/api';

const tracer = trace.getTracer('bun-app');

export function startServer() {
  Bun.serve({
    port: 3000,
    fetch(req) {
      return tracer.startActiveSpan('handleRequest', { kind: SpanKind.SERVER }, (span) => {
        try {
          span.setAttribute('http.method', req.method);
          span.setAttribute('http.url', req.url);
          return new Response('Hello from Bun!');
        } finally {
          span.end();
        }
      });
    },
  });
}
{{< /code-block >}}

Pour plus de modèles d'instrumentation manuelle, consultez la [documentation sur l'instrumentation JS d'OpenTelemetry][7].

### Vérifiez les traces dans Datadog {#verify-traces-in-datadog}

Une fois que votre application a traité quelques requêtes :

1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][6] dans Datadog.
2. Recherchez le nom de votre service.
3. Confirmez que les traces apparaissent avec les spans et les métadonnées attendus.

## Limitations {#limitations}

- **Couverture de l'auto-instrumentation** : Les bibliothèques d'auto-instrumentation Node.js d'OpenTelemetry dépendent de la couche de compatibilité Node.js de Bun. La plupart des bibliothèques courantes (clients HTTP, Express, pilotes de base de données) fonctionnent, mais certains packages d'instrumentation peuvent ne pas fonctionner comme prévu.
- **API natives de Bun** : Les API intégrées de Bun telles que `Bun.serve()`, `bun:sqlite` et les API d'E/S de fichiers natives ne sont pas instrumentées automatiquement. Consultez [Ajouter une instrumentation manuelle pour les API natives de Bun](#add-manual-instrumentation-for-bun-native-apis) pour un exemple.
- **Compatibilité des bibliothèques** : Il n'est pas garanti que toutes les bibliothèques d'instrumentation Node.js fonctionnent avec Bun. Testez vos dépendances spécifiques et désactivez toute instrumentation provoquant des erreurs en transmettant des options de configuration à `getNodeAutoInstrumentations()`. Le package `@opentelemetry/instrumentation-fs` est une source courante de problèmes et est désactivé dans l'exemple de configuration ci-dessus.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/
[2]: https://bun.com/docs/installation
[3]: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
[4]: /fr/opentelemetry/setup/
[5]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
[6]: https://app.datadoghq.com/apm/traces
[7]: https://opentelemetry.io/docs/languages/js/instrumentation/