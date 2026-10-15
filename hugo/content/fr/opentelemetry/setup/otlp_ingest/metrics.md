---
aliases:
- /fr/opentelemetry/otlp_metrics
- /fr/opentelemetry/setup/intake_endpoint/otlp_metrics
- /fr/opentelemetry/setup/agentless/metrics
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Site externe
  text: Configuration générale du SDK OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Site externe
  text: Spécification des variables d'environnement OpenTelemetry
- link: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
  tag: Site externe
  text: Exportateur du protocole OpenTelemetry
- link: 'https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ '
  tag: Site externe
  text: Exportateur de métriques OTLP
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: Documentation
  text: Configurer la temporalité delta dans OpenTelemetry
- link: /metrics/otlp/?tab=summary#mapping
  tag: Documentation
  text: Mappage des métriques OTLP dans Datadog
- link: https://www.datadoghq.com/blog/otlp-metrics-api/
  tag: Blog
  text: Ingérez les métriques OTLP directement dans Datadog avec la nouvelle API de
    métriques OTLP
title: Endpoint d'ingestion de métriques OTLP de Datadog
---
## Présentation {#overview}

L'endpoint de l'API d'ingestion de métriques du protocole OpenTelemetry (OTLP) de Datadog permet aux applications, aux plateformes gérées et aux OpenTelemetry Collectors d'envoyer des métriques à Datadog via OTLP HTTP.

Utilisez la configuration directe sur cette page lorsque vous devez envoyer des métriques sans le [Datadog Agent][2] ou un OpenTelemetry Collector. Pour les déploiements de collecteurs en production, utilisez [Configurer le collecteur OpenTelemetry][1].

Cet endpoint est particulièrement utile dans les scénarios suivants :

- **Distributions OpenTelemetry qui utilisent des exportateurs OTLP** : Certaines distributions OpenTelemetry, telles que [AWS Distro for OpenTelemetry (ADOT)][8], utilisent un exportateur OTLP unifié. L'endpoint des métriques OTLP permet à ces distributions d'envoyer des métriques à Datadog.

- **Contraintes techniques liées à l'utilisation d'un Agent ou d'un Collector** : L'ingestion directe prend en charge les services gérés par des tiers, les applications sur les appareils des clients et d'autres environnements où l'exécution de logiciels supplémentaires n'est pas pratique.

<div class="alert alert-info">Si vous envoyez des métriques depuis une plateforme gérée (Cloudflare, Vercel, Heroku, et autres), consultez <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">Plateformes gérées</a> pour obtenir la configuration correcte de l'endpoint.</div>

## Configuration {#configuration}

Pour exporter des données de métriques OTLP vers l'endpoint d'ingestion de métriques OTLP de Datadog :

1. [Assurez-vous que seules les métriques delta sont envoyées](#ensure-only-delta-metrics-are-sent).
1. [Configurez l'exportateur HTTP OTLP](#configure-the-exporter).
   - Définissez l'endpoint d'ingestion de métriques OTLP de Datadog.
   - Configurez les en-têtes HTTP requis.
1. (Facultatif) [Définissez l'en-tête `dd-otel-metric-config` HTTP](#optional-configure-the-metric-translator) pour configurer le comportement du traducteur de métriques.

<div class="alert alert-info">À partir du 1er septembre 2026, l'endpoint d'ingestion de métriques OTLP stocke nativement les histogrammes à buckets explicites et exponentiels, en conservant leurs buckets d'origine. Datadog calcule les centiles à partir de ces buckets. Metrics Summary et Metrics Explorer affichent le type de chaque histogramme : Histogramme explicite ou Histogramme exponentiel. Les requêtes de distribution sur vos métriques d'histogramme fonctionnent sans modification. L'endpoint ignore les champs <code>histograms</code> et <code>summaries</code> dans l'en-tête <a href="#optional-configure-the-metric-translator"><code>dd-otel-metric-config</code> </a>.</div>

### Configurez l'exportateur {#configure-the-exporter}

Pour envoyer des données OTLP à l'endpoint d'ingestion de métriques OTLP de Datadog, utilisez l'exportateur HTTP OTLP. Pour les métriques, l'exportateur prend en charge à la fois HTTP Protobuf et HTTP JSON. HTTP Protobuf est recommandé pour de meilleures performances.

Le processus diffère selon que vous utilisez une instrumentation automatique ou manuelle pour OpenTelemetry.

<div class="alert alert-info">Selon votre <a href="/getting_started/site/">site Datadog</a>, qui est {{< region-param key=dd_datacenter code="true" >}}: Remplacez votre endpoint par {{< region-param key="otlp_metrics_endpoint" code="true" >}} dans les exemples suivants.</div>

#### Assurez-vous que seules les métriques delta sont envoyées {#ensure-only-delta-metrics-are-sent}

L'endpoint d'ingestion de métriques OTLP de Datadog n'accepte que les métriques **delta**. Si vous tentez d'envoyer des métriques **cumulatives** (la valeur par défaut dans la plupart des SDK), vous recevrez une erreur. Assurez-vous de configurer votre SDK ou Collector OpenTelemetry pour produire des métriques delta.

- Pour les [langages pris en charge][7], définissez la variable d'environnement `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` sur `delta`.
- Sinon, définissez la préférence de temporalité dans votre code. Pour plus d'informations, lisez [Configurer la temporalité delta dans OpenTelemetry][5].

#### Instrumentation automatique {#automatic-instrumentation}

Si vous utilisez l'[instrumentation automatique OpenTelemetry][3], définissez les variables d'environnement suivantes :

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### Instrumentation manuelle {#manual-instrumentation}

Si vous utilisez une instrumentation manuelle avec les SDK OpenTelemetry, configurez l'exportateur OTLP HTTP Protobuf par programmation.

{{< tabs >}}
{{% tab "JavaScript" %}}

L'exportateur JavaScript est [`@opentelemetry/exporter-metrics-otlp-proto`][100]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.datadoghq.com/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{"resource_attributes_as_tags": true}',
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

L'exportateur Java est [`OtlpHttpMetricExporter`][200]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://otlp.datadoghq.com/v1/metrics")
    .setAggregationTemporalitySelector(
      AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{\"resource_attributes_as_tags\": true}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

L'exportateur Go est [`otlpmetrichttp`][300]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
  ctx,
  otlpmetrichttp.WithEndpoint("otlp.datadoghq.com"),
  otlpmetrichttp.WithURLPath("/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
  otlpmetrichttp.WithHeaders(
    map[string]string{
      "dd-api-key": os.Getenv("DD_API_KEY"),
      "dd-otel-metric-config": "{\"resource_attributes_as_tags\": true}",
    }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

L'exportateur Python est [`OTLPMetricExporter`][400]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://otlp.datadoghq.com/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": '{"resource_attributes_as_tags": true}',
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Facultatif) Configurez le traducteur de métriques {#optional-configure-the-metric-translator}

Utilisez l'en-tête `dd-otel-metric-config` pour configurer la manière dont les métriques sont traduites et envoyées à Datadog. L'en-tête JSON contient les champs suivants :

`resource_attributes_as_tags`
: **Type**: Booléen <br>
**Par défaut**: `false` <br>
S'il est défini sur `true`, transforme tous les attributs de ressource en étiquettes de métrique, qui sont ensuite converties en tags.

`instrumentation_scope_metadata_as_tags`
: **Type**: Booléen <br>
**Par défaut** : `false` <br>
S'il est défini sur `true`, ajoute le nom et la version du périmètre d'instrumentation qui a créé une métrique aux tags de métrique.

`histograms.mode`
: **Type** : Chaîne <br>
**Obsolète** : Ignoré à partir du 1er septembre 2026. Datadog stocke les histogrammes nativement, quel que soit ce paramètre. <br>
Mode d'exportation des histogrammes. Les valeurs valides sont :
  - `distributions` : envoie les histogrammes en tant que distributions Datadog.
  - `counters` : envoie les histogrammes en tant que compteurs Datadog, une métrique par bucket.
  - `nobuckets` : n'envoie aucune métrique d'histogramme de bucket.

`histograms.send_aggregation_metrics`
: **Type** : Booléen <br>
**Obsolète** : Ignoré à partir du 1er septembre 2026. Datadog n'écrit pas de métriques `.sum`, `.count`, `.min` et `.max` distinctes. Interrogez plutôt la métrique d'histogramme avec l'agrégation correspondante, telle que `count:<METRIC_NAME>{*}.as_count()`. <br>
S'il est défini sur `true`, écrit des métriques supplémentaires `.sum`, `.count`, `.min` et `.max` pour les histogrammes.

`summaries.mode`
: **Type** : Chaîne <br>
**Obsolète** : Ignoré à partir du 1er septembre 2026. <br>
Mode d'exportation des résumés OTLP. Les valeurs valides sont :
  - `noquantiles` : n'envoie aucune métrique `.quantile`. Les métriques `.sum` et `.count` sont toujours envoyées.
  - `gauges` : envoie les métriques `.quantile` sous forme de jauges taguées par quantile.

Par exemple :

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true
}
```

## OpenTelemetry Collector {#opentelemetry-collector}

Si votre distribution du collecteur OpenTelemetry n'inclut pas tous les composants utilisés par la configuration du collecteur recommandée par Datadog, configurez l'exportateur HTTP OTLP dans votre propre distribution :

Ces exemples utilisent des identifiants de composants issus d'OpenTelemetry Collector Contrib v0.154.0. Pour d'autres versions ou distributions, utilisez les identifiants pris en charge par cette distribution.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

processors:
  cumulativetodelta: {}

exporters:
  otlp_http:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: '{"resource_attributes_as_tags": true}'

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [cumulativetodelta]
      exporters: [otlp_http]
```

Cet exemple convertit les métriques cumulatives en temporalité delta requise par l'endpoint d'ingestion. Ajoutez tous les récepteurs et processeurs requis par votre distribution de collecteur.

Pour un déploiement en production utilisant OpenTelemetry Collector Contrib, utilisez la [configuration recommandée du collecteur OpenTelemetry][1]. Il configure également le traitement par lots de la file d'attente d'envoi, la détection des ressources, le tagging des métriques et l'enrichissement des métadonnées du host.

## Dépannage {#troubleshooting}

### Erreur : 403 Forbidden {#error-403-forbidden}

Si vous recevez une erreur `403 Forbidden` lors de l'envoi de métriques à l'endpoint d'ingestion de métriques OTLP de Datadog, cela indique l'un des problèmes suivants :

- L'URL d'endpoint est incorrecte pour votre organisation.  
   **Solution** : Utilisez l'URL d'endpoint correcte pour votre organisation. Votre site est {{< region-param key=dd_datacenter code="true" >}}, vous devez donc utiliser le {{< region-param key="otlp_metrics_endpoint" code="true" >}} endpoint.

### Erreur : 413 Request Entity Too Large {#error-413-request-entity-too-large}

Si vous recevez une erreur `413 Request Entity Too Large` lors de l'envoi de métriques à l'endpoint d'ingestion de métriques OTLP de Datadog, cela indique que la taille de la charge utile envoyée par l'exportateur OTLP dépasse la limite de 512 KiB (compressée) de l'endpoint d'ingestion de métriques de Datadog.

Cette erreur se produit généralement lorsque le SDK OpenTelemetry regroupe trop de données de télémétrie dans une seule charge utile de requête.

**Solution** : Réduisez la taille du lot d'exportation du processeur de lots du SDK. Par exemple, dans le SDK Java OpenTelemetry, vous pouvez ajuster `BatchMetricExportProcessor`.

### Problème : Points de données manquants ou valeurs de métrique inférieures aux attentes {#issue-missing-datapoints-or-lower-than-expected-metric-values}

Si vous remarquez des points de données manquants ou des valeurs de métrique inférieures aux attentes, cela peut être dû au fait que vous envoyez plusieurs points de données pour une métrique ayant le même horodatage (en secondes) et les mêmes dimensions. Dans de tels cas, Datadog n'accepte que le dernier point de données, et les points de données précédents sont supprimés (le dernier écrit l'emporte). Datadog exige que les données de séries temporelles d'une métrique soient uniques dans le contexte de {timestamp + dimensions}.

**Solution** : Assurez-vous que vos points de données d'une métrique donnée à un même horodatage sont tagués de manière unique. Par exemple, si vous envoyez simultanément plusieurs points de données pour une métrique à partir de plusieurs invocations AWS Lambda, assurez-vous d'inclure des identifiants uniques (tels que l'ARN Lambda) en tant qu'attributs de ressource dans vos métriques. Utilisez l'option `resource_attributes_as_tags` pour ajouter ces attributs de ressource en tant que tags de métrique.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/collector_exporter/
[2]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[5]: /fr/opentelemetry/guide/otlp_delta_temporality/
[6]: /fr/metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda