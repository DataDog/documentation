---
aliases:
- /fr/tracing/connect_logs_and_traces/opentelemetry
code_lang: opentelemetry
code_lang_weight: 80
description: Connectez vos logs d'application et vos traces OpenTelemetry pour les
  corréler dans Datadog
further_reading:
- link: /opentelemetry/setup/
  tag: Documentation
  text: Envoyer des données OpenTelemetry à Datadog
- link: https://opentelemetry.io/docs/collector/
  tag: Site externe
  text: Documentation Collector
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Partenariat de Datadog avec OpenTelemetry
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Bénéficiez de diagnostics simplifiés grâce à la mise en corrélation entre
    produits.
title: Corrélation des traces et des logs OpenTelemetry
type: multi-code-lang
---
## Présentation {#overview}

La corrélation des traces et des logs vous permet d'enquêter sur des problèmes en naviguant depuis un span spécifique dans une trace directement vers les logs générés pendant cette opération. Cela rend le débogage plus rapide et plus intuitif en fournissant le contexte exact nécessaire pour comprendre une erreur ou un problème de performance.

## Prérequis {#requirements}

Avant de commencer, assurez-vous d'avoir configuré le [marquage de service unifié][1]. Ceci est requis pour toute corrélation de données dans Datadog.

## Configuration {#setup}

Pour corréler les traces et les logs OpenTelemetry dans Datadog, vous devez :

- **Injectez le contexte de trace** : le logger de votre application doit être configuré pour enrichir vos logs avec le `trace_id` et le `span_id` issus de la trace active. L'approche recommandée consiste à utiliser une bibliothèque de journalisation ou un appender compatible avec OpenTelemetry. Ces outils capturent automatiquement le contexte de trace actif et intègrent le `trace_id` et le `span_id` en tant que champs de premier niveau dans vos enregistrements de logs, ce qui constitue la méthode standard de corrélation.

- **Envoyez les logs à Datadog** : vos logs, enrichis avec le contexte de trace, doivent être collectés et envoyés à Datadog.

### 1. Injectez le contexte de trace dans vos logs {#1-inject-trace-context-into-your-logs}

Les exemples suivants utilisent des ponts de journalisation ou une instrumentation automatique. Ces outils interceptent les logs provenant de bibliothèques de journalisation courantes (telles que `zap`, `Logback` et `Winston`), les convertissent dans le modèle de données de log OpenTelemetry et les transmettent au SDK OpenTelemetry. Ce processus enrichit automatiquement les logs avec le contexte de trace actif.

Pour des applications complètes et fonctionnelles, consultez le [dépôt d'exemples Datadog OpenTelemetry][2].

{{< tabs >}}
{{% tab "Go" %}}

Tout d'abord, assurez-vous d'avoir initialisé un `LoggerProvider` OpenTelemetry. Ensuite, utilisez-le pour créer votre instance de logger `zap` :

```go
import "go.opentelemetry.io/contrib/bridges/otelzap"

// Replace your standard zap logger with the otelzap-backed one
logger := zap.New(otelzap.NewCore(
    "my-service-name",
    otelzap.WithLoggerProvider(loggerProvider),
))

// Now, logs written with this logger are automatically correlated
logger.Info("Processing user request")
```

Pour voir comment le `LoggerProvider` est configuré dans une application complète, consultez l'[exemple Go complet dans le dépôt d'exemples][100].

[100]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go

{{% /tab %}}

{{% tab "Java" %}}

Pour injecter le contexte de trace en Java, vous pouvez utiliser OpenTelemetry Logback Appender. Ajoutez la dépendance `io.opentelemetry.instrumentation:opentelemetry-logback-appender-1.0` à votre projet et configurez-la dans votre `logback.xml` :

```xml
<configuration>
  <appender name="OpenTelemetry"
      class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
  </appender>

  <root level="INFO">
    <appender-ref ref="OpenTelemetry"/>
  </root>
</configuration>
```

Pour une configuration d'exemple complète et fonctionnelle, consultez l'[exemple Java complet dans le dépôt d'exemples][200].

[200]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/resources/logback.xml

{{% /tab %}}

{{% tab "Node.js" %}}

Pour Node.js, utilisez le package `@opentelemetry/instrumentation-winston` avec [Winston][300] pour injecter automatiquement le contexte de trace dans vos logs. Installez les packages requis :

```shell
npm install winston @opentelemetry/instrumentation-winston
```

Ensuite, enregistrez l'instrumentation Winston dans le cadre de la configuration de votre SDK OpenTelemetry :

```javascript
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
const { NodeSDK } = require('@opentelemetry/sdk-node');

const sdk = new NodeSDK({
  instrumentations: [
    new WinstonInstrumentation(),
    // ... other instrumentations
  ],
});
sdk.start();
```

Une fois l'instrumentation enregistrée, tout logger Winston inclut automatiquement les champs `trace_id`, `span_id` et `trace_flags` lorsqu'un log est émis au sein d'une trace active :

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Logs emitted within a traced context automatically include trace_id and span_id
logger.info('Processing user request');
```

La même approche fonctionne avec [Pino][301] en utilisant le package `@opentelemetry/instrumentation-pino`.

[300]: https://github.com/winstonjs/winston
[301]: https://github.com/pinojs/pino

{{% /tab %}}
{{< /tabs >}}

### 2. Choisissez votre pipeline de logs {#2-choose-your-log-pipeline}

Une fois vos logs instrumentés avec le contexte de trace, vous devez les envoyer à Datadog. L'approche la plus simple consiste à les envoyer directement depuis votre application vers l'OpenTelemetry Collector en utilisant OTLP. Cependant, vous pouvez également récupérer les logs à partir de fichiers ou les collecter à l'aide du Datadog Agent.

#### Envoyez des logs via OTLP {#send-logs-using-otlp}

Il s'agit de la méthode la plus simple et la plus directe. Votre application envoie les logs directement vers un endpoint OTLP, évitant ainsi la complexité liée à l'écriture et au parsing de fichiers locaux.

L'OpenTelemetry Collector et le Datadog Agent peuvent tous deux recevoir des logs OTLP.

1. **Configurez votre application pour exporter les logs via OTLP** : dans la configuration de votre SDK OpenTelemetry, configurez un `LogRecordProcessor` pour utiliser un `OTLPLogExporter`. L'exemple suivant montre comment procéder en Python :
   ```python
   # In your OTel SDK setup for Python
   import logging
   from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
   from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
   from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
   
   # Configure the OTLP Log Exporter to send to your Collector
   # Note: The endpoint should point to your OpenTelemetry Collector.
   # The default port is 4317 for gRPC and 4318 for HTTP.
   exporter = OTLPLogExporter(endpoint="localhost:4317", insecure=True)
   
   log_provider = LoggerProvider()
   log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
   
   # Attach to the root logger
   handler = LoggingHandler(logger_provider=log_provider)
   logging.getLogger().addHandler(handler)
   ```
2. **Configurez le Collector pour recevoir et exporter des logs OTLP** : dans le `config.yaml` du Collector, activez le récepteur `otlp` et ajoutez-le au pipeline `logs`. Utilisez la configuration de l'exportateur HTTP OTLP depuis [Configurer l'OpenTelemetry Collector][7] :
   ```yaml
   receivers:
     otlp:
       protocols:
         grpc:
         http:

   processors:
     resource_detection:
       detectors: [env, system]

   exporters:
     otlp_http:
       endpoint: https://otlp.${env:DD_SITE}
       headers:
         dd-api-key: ${env:DD_API_KEY}

   service:
     pipelines:
       logs:
         receivers: [otlp]
         processors: [resource_detection]
         exporters: [otlp_http]
   ```
   
#### Collectez les logs à partir de fichiers {#scrape-logs-from-files}

Cette approche est utile si vous devez conserver des fichiers de logs locaux pour des raisons de conformité ou pour d'autres outils.

Pour que Datadog puisse corréler vos logs et vos traces, vos fichiers de logs doivent contenir des champs spécifiques correctement formatés :
- `trace_id` : l'ID de trace. Il doit s'agir d'une chaîne hexadécimale en minuscules de 32 caractères.
- `span_id` : l'ID du span. Il doit s'agir d'une chaîne hexadécimale en minuscules de 16 caractères.

Le SDK OpenTelemetry les fournit généralement dans un format brut (tel qu'un entier ou un tableau d'octets), et ces données doivent être formatées en chaînes hexadécimales sans aucun <code>0x</code> préfixe.

##### Logs JSON {#json-logs}

1. **Configurez votre application pour générer des logs JSON** : utilisez une bibliothèque de journalisation standard pour écrire les logs au format JSON dans un fichier ou `stdout`. L'exemple Python suivant utilise la bibliothèque standard `logging`.
2. **Injectez manuellement le contexte de trace** : dans le code de votre application, récupérez le contexte du span actuel et ajoutez `trace_id` et `span_id` à vos enregistrements de logs. L'exemple Python suivant montre comment créer un `logging.Filter` personnalisé pour effectuer cette opération automatiquement :

   ```python
   import logging
   import sys
   from opentelemetry import trace
   from pythonjsonlogger import jsonlogger

   # 1. Create a filter to inject trace context
   class TraceContextFilter(logging.Filter):
       def filter(self, record):
           span = trace.get_current_span()
           if span.is_recording():
               span_context = span.get_span_context()
               record.trace_id = f'{span_context.trace_id:032x}'
               record.span_id = f'{span_context.span_id:016x}'
           return True

   # 2. Configure a JSON logger
   logger = logging.getLogger("my-json-logger")
   logger.setLevel(logging.DEBUG)

   # 3. Add the filter to the logger
   logger.addFilter(TraceContextFilter())

   handler = logging.StreamHandler(sys.stdout)
   formatter = jsonlogger.JsonFormatter(
       '%(asctime)s %(name)s %(levelname)s %(message)s %(trace_id)s %(span_id)s'
   )
   handler.setFormatter(formatter)
   logger.addHandler(handler)

   # Logs will now contain the trace_id and span_id
   logger.info("Processing user request with trace context.")
   ```

3. **Configurez le Collector pour collecter les fichiers de logs** : dans le `config.yaml` de votre Collector, activez le récepteur `filelog`. Configurez-le pour trouver vos fichiers de logs et les analyser au format JSON.
   ```yaml
   receivers:
     filelog:
       include: [ /var/log/my-app/*.log ] # Path to your log files
       operators:
         - type: json_parser
           # The timestamp and severity fields should match your JSON output
           timestamp:
             parse_from: attributes.asctime
             layout: '%Y-%m-%d %H:%M:%S,%f'
           severity:
             parse_from: attributes.levelname
   # ... your logs pipeline ...
   ```

##### Logs non JSON {#non-json-logs}

Si votre application génère des logs au format texte brut ou clé-valeur au lieu du format JSON, vous pouvez toujours les corréler avec des traces. Vous devez injecter manuellement le contexte de trace dans la chaîne de log et configurer le Collector pour l'extraire à l'aide d'un `regex_parser`.

L'exemple Node.js suivant utilise Winston avec un formateur personnalisé pour injecter `trace_id` et `span_id` dans une ligne de log en texte brut :

```javascript
const { trace, context } = require('@opentelemetry/api');
const winston = require('winston');

// Custom format that injects trace context into plain text logs
const traceFormat = winston.format((info) => {
  const span = trace.getSpan(context.active());
  if (span) {
    const spanContext = span.spanContext();
    info.trace_id = spanContext.traceId;
    info.span_id = spanContext.spanId;
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    traceFormat(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, trace_id, span_id }) => {
      return `${timestamp} ${level} trace_id=${trace_id || '0'} span_id=${span_id || '0'} ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: '/var/log/my-app/app.log' })
  ],
});

// Output: 2025-01-15T12:00:00.000Z info trace_id=4bf92f3577b34da6a3ce929d0e0e4736 span_id=00f067aa0ba902b7 Processing request
logger.info('Processing request');
```

Ensuite, configurez le récepteur `filelog` du Collector avec un `regex_parser` pour extraire le contexte de trace des lignes de logs en texte brut :

```yaml
receivers:
  filelog:
    include: [ /var/log/my-app/*.log ]
    operators:
      - type: regex_parser
        regex: '^(?P<timestamp>\S+) (?P<severity>\S+) trace_id=(?P<trace_id>[a-f0-9]+) span_id=(?P<span_id>[a-f0-9]+) (?P<body>.*)$'
        timestamp:
          parse_from: attributes.timestamp
          layout: '%Y-%m-%dT%H:%M:%S.%fZ'
        severity:
          parse_from: attributes.severity
        trace:
          trace_id:
            parse_from: attributes.trace_id
          span_id:
            parse_from: attributes.span_id
# ... your logs pipeline ...
```

Cette approche fonctionne avec n'importe quelle bibliothèque de journalisation ou n'importe quel langage. Les principales exigences sont les suivantes :
- Incluez `trace_id` et `span_id` en tant que champs analysables dans vos logs.
- Configurez le `regex_parser` du Collector pour qu'il corresponde au format de vos logs et extraie les champs de contexte de trace.

#### Collectez les logs à l'aide du Datadog Agent {#collect-logs-using-the-datadog-agent}

Si vous collectez des logs directement avec le Datadog Agent (sans les envoyer via l'OpenTelemetry Collector), vous devez vous assurer que les ID de trace sont présents dans vos logs.

- **Format d'ID de trace** : Datadog détecte automatiquement la convention `dd.trace_id` et `dd.span_id` utilisée par les SDK Datadog, ainsi que les normes OpenTelemetry `trace_id` et `span_id`. Consultez la [documentation sur la compatibilité OpenTelemetry][6] pour plus de détails sur la norme.

<div class="alert alert-info">Si votre instrumentation des logs utilise un nom d'attribut différent pour vos ID de trace ou de span, vous devez vous assurer que l'attribut est ajouté à la configuration <a href="/logs/log_configuration/pipelines/?tab=traceid#preprocessing">Prétraitement des logs JSON</a> afin qu'il soit reconnu comme un ID de trace valide.</div>

- **Mappage d'attributs** : le Datadog Agent ne convertit pas automatiquement les attributs de ressource OTel (par exemple, `service.name`) en tags standard Datadog. Vous devrez peut-être remapper manuellement ces attributs dans votre pipeline de traitement des logs pour maintenir un taggage de service unifié.

## Affichez les données corrélées dans Datadog {#view-correlated-data-in-datadog}

Une fois que votre application envoie des traces, vous pouvez naviguer entre elles dans Datadog.

### D'une trace aux logs {#from-a-trace-to-logs}

1. Accédez à [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][3].
2. Recherchez et cliquez sur une trace provenant de votre service instrumenté.
3. Sélectionnez n'importe quel span dans le graphique de flammes pour afficher ses détails.
4. Cliquez sur l'onglet {{< ui >}}Logs{{< /ui >}}.

Ici, vous pouvez voir tous les logs générés pendant l'exécution de ce span spécifique.

### D'un log à une trace {#from-a-log-to-a-trace}

1. Accédez à [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][4].
2. Recherchez et cliquez sur une entrée de log provenant de votre service instrumenté.
3. Cliquez sur l'onglet {{< ui >}}Trace{{< /ui >}}.

Ici, vous pouvez voir un graphique de flammes de la trace associée, avec le span qui a généré le log. 

Cliquez sur {{< ui >}}View Trace in APM{{< /ui >}} pour accéder directement à la trace APM complète associée à cet événement de log et voir le contexte de l'ensemble de la requête.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: https://github.com/DataDog/opentelemetry-examples
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/logs
[5]: /fr/logs/log_configuration/processors
[6]: https://opentelemetry.io/docs/specs/otel/compatibility/logging_trace_context/
[7]: /fr/opentelemetry/setup/collector_exporter/