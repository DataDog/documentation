---
aliases:
- /fr/opentelemetry/otlp_logs
- /fr/opentelemetry/setup/intake_endpoint/otlp_logs
- /fr/opentelemetry/setup/agentless/logs
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Site externe
  text: Configuration générale du SDK OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Site externe
  text: Spécification des variables d'environnement OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/protocol/exporter/
  tag: Site externe
  text: Exportateur du protocole OpenTelemetry
title: Endpoint d'ingestion de logs OTLP de Datadog
---
## Présentation {#overview}

L'endpoint de l'API d'ingestion de logs du protocole OpenTelemetry (OTLP) de Datadog permet aux applications, aux plateformes gérées et aux collecteurs OpenTelemetry d'envoyer des logs à Datadog via OTLP HTTP.

Utilisez la configuration directe sur cette page lorsque vous devez envoyer des logs sans le [Datadog Agent][2] ou un collecteur OpenTelemetry. Pour les déploiements de collecteurs en production, utilisez [Configurer le collecteur OpenTelemetry][1].

<div class="alert alert-info">Si vous envoyez des logs depuis une plateforme gérée (Cloudflare, Vercel, Heroku, et autres), consultez <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">Plateformes gérées</a> pour obtenir la configuration correcte de l'endpoint.</div>

## Configuration {#configuration}

Pour envoyer des données OTLP à l'endpoint d'ingestion de logs OTLP de Datadog, vous devez configurer l'exportateur Protobuf HTTP OTLP. Le processus diffère selon que vous utilisez une instrumentation automatique ou manuelle pour OpenTelemetry.

<div class="alert alert-info">Selon votre <a href="/getting_started/site/">site Datadog</a>, qui est {{< region-param key=dd_datacenter code="true" >}}: Remplacez <code>${YOUR_ENDPOINT}</code> par {{< region-param key="otlp_logs_endpoint" code="true" >}} dans les exemples suivants.</div>

#### Instrumentation automatique {#automatic-instrumentation}

Si vous utilisez l'[instrumentation automatique OpenTelemetry][3], définissez les variables d'environnement suivantes :

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### Instrumentation manuelle {#manual-instrumentation}

Si vous utilisez une instrumentation manuelle avec les SDK OpenTelemetry, configurez l'exportateur Protobuf HTTP OTLP par programmation en utilisant les exemples suivants.

<div class="alert alert-info">La prise en charge des logs par les SDK OpenTelemetry pour JavaScript et Python est en cours de développement. Pour connaître les derniers statuts, consultez <a href="https://opentelemetry.io/docs/languages/#status-and-releases">Statut et versions d'OpenTelemetry</a>.</div>

{{< tabs >}}
{{% tab "Java" %}}
L'exportateur Java est `OtlpHttpLogRecordExporter`. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```
{{% /tab %}}

{{% tab "Go" %}}
L'exportateur Go est `otlploghttp`. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"

logExporter, err := otlploghttp.New(
    ctx,
    otlploghttp.WithEndpointURL("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint, minus the URL path
    otlploghttp.WithURLPath("/v1/logs"),
    otlploghttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
        }),
)
```
{{% /tab %}}
{{< /tabs >}}

## OpenTelemetry Collector {#opentelemetry-collector}

Si votre distribution du collecteur OpenTelemetry n'inclut pas tous les composants utilisés par la configuration du collecteur recommandée par Datadog, configurez l'exportateur HTTP OTLP dans votre propre distribution :

Ces exemples utilisent des identifiants de composants issus d'OpenTelemetry Collector Contrib v0.154.0. Pour d'autres versions ou distributions, utilisez les identifiants pris en charge par cette distribution.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlp_http]
```

Ajoutez tous les récepteurs et processeurs requis par votre distribution de collecteur.

Pour un déploiement en production utilisant OpenTelemetry Collector Contrib, utilisez la [configuration recommandée du collecteur OpenTelemetry][1]. Il configure également le traitement par lots de la file d'attente d'envoi, la détection des ressources et l'enrichissement des métadonnées de l'hôte.

## Configurer le traitement des logs (facultatif) {#configure-log-processing-optional}

Utilisez l'en-tête `dd-otel-log-config` pour configurer la manière dont Datadog traite les enregistrements de logs OTLP lors de l'ingestion. La valeur de l'en-tête est un objet JSON avec les champs suivants :

`keep_raw_message`
: **Type** : Boolean<br>
**Par défaut** : `false`<br>
**Description** : Par défaut, Datadog analyse un corps de log JSON en attributs de log afin que vous puissiez rechercher des champs individuels (par exemple, `@key:value`) au lieu d'effectuer une recherche en texte intégral sur le message. Si `keep_raw_message` est défini sur `true`, Datadog n'analyse pas le corps et le conserve sous forme de chaîne dans l'attribut `message`. Utilisez cette option si vous effectuez un parsing personnalisé du message de log dans un pipeline de logs ou si les champs de votre corps JSON entrent en conflit avec des attributs de log existants.

Par exemple, pour conserver les corps de logs JSON sous forme de chaînes brutes :

```json
{
  "keep_raw_message": true
}
```

Définissez l'en-tête sur vos requêtes OTLP avec `dd-api-key`. Par exemple, avec l'instrumentation automatique :

```shell
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY},dd-otel-log-config={\"keep_raw_message\":true}"
```

Pour l'instrumentation manuelle, ajoutez l'en-tête dans la configuration de votre exportateur. Par exemple, en Java :

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-log-config", "{\"keep_raw_message\": true}")
    .build();
```

Dans un collecteur OpenTelemetry, ajoutez l'en-tête dans la section `otlp_http` de l'exportateur `headers` :

```yaml
exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-log-config: '{"keep_raw_message": true}'
```

## Dépannage {#troubleshooting}

### Erreur : 403 Forbidden {#error-403-forbidden}

Si vous recevez une erreur `403 Forbidden` lors de l'envoi de logs à l'endpoint d'ingestion de logs OTLP de Datadog, cela indique un problème potentiel :

- L'URL d'endpoint est incorrecte pour votre organisation.  
   **Solution** : Utilisez l'URL d'endpoint correcte pour votre organisation. Votre site est {{< region-param key=dd_datacenter code="true" >}}, vous devez donc utiliser le {{< region-param key="otlp_logs_endpoint" code="true" >}} endpoint.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/collector_exporter/
[2]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation