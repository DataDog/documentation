---
aliases:
- /fr/opentelemetry/otlp_endpoint
- /fr/opentelemetry/setup/intake_endpoint/otlp_traces
- /fr/opentelemetry/setup/agentless/traces
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Site externe
  text: Configuration générale du SDK OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Site externe
  text: Spécification des variables d'environnement OpenTelemetry
- link: 'https://opentelemetry.io/docs/reference/specification/protocol/exporter/ '
  tag: Site externe
  text: Exportateur du protocole OpenTelemetry
title: Endpoint d'ingestion de traces OTLP Datadog
---
## Présentation {#overview}

L'endpoint de l'API d'ingestion de traces du protocole OpenTelemetry (OTLP) de Datadog permet aux applications, aux plateformes gérées et aux collecteurs OpenTelemetry d'envoyer des traces à Datadog via OTLP HTTP.

Utilisez la configuration directe sur cette page lorsque vous devez envoyer des traces sans le [Datadog Agent][2] ou un collecteur OpenTelemetry. Pour les déploiements de collecteurs en production, utilisez [Configurer le collecteur OpenTelemetry][1].

Pour les charges de travail serverless, consultez [Ingestion OTLP pour le serverless][8]. Pour les plateformes gérées telles que Cloudflare, Vercel et Heroku, consultez [Ingestion OTLP pour les plateformes gérées][9].

<div class="alert alert-info">L'endpoint d'ingestion de traces OTLP prend en charge <code>http/protobuf</code> et <code>http/json</code> encodage. <code>grpc</code> n'est pas pris en charge.</div>

## Configuration {#configuration}

Pour exporter des données OTLP vers l'endpoint d'ingestion de traces OTLP de Datadog :

1. [Configurez l'exportateur OTLP HTTP Protobuf](#configure-the-exporter).
   - Définissez l'endpoint d'ingestion de traces OTLP de Datadog.
   - Configurez les en-têtes HTTP requis.
1. (Facultatif) [Définissez l'en-tête HTTP `dd-otel-span-mapping`](#optional-map-or-filter-span-names) pour mapper ou filtrer les spans.

### Configurez l'exportateur {#configure-the-exporter}

Pour envoyer des données OTLP vers l'endpoint d'ingestion de traces OTLP de Datadog, vous devez utiliser l'exportateur OTLP HTTP Protobuf. Le processus diffère selon que vous utilisez une instrumentation automatique ou manuelle pour OpenTelemetry.

Les [métriques de trace][7] ne sont pas calculées par défaut pour les traces envoyées directement à l'endpoint d'ingestion de traces OTLP de Datadog. Les exemples suivants incluent `compute_stats=true` pour activer les métriques de trace.

#### Instrumentation automatique {#automatic-instrumentation}

Si vous utilisez l'[instrumentation automatique OpenTelemetry][3], définissez les variables d'environnement suivantes :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},compute_stats=true"
```

#### Instrumentation manuelle {#manual-instrumentation}

Si vous utilisez une instrumentation manuelle avec les SDK OpenTelemetry, configurez l'exportateur OTLP HTTP Protobuf par programmation.

<div class="alert alert-info">Selon votre <a href="/getting_started/site/">site Datadog</a>, qui est {{< region-param key=dd_datacenter code="true" >}}, remplacez <code>${YOUR_ENDPOINT}</code> par {{< region-param key="otlp_trace_endpoint" code="true" >}}.</div>

{{< tabs >}}
{{% tab "JavaScript" %}}

L'exportateur JavaScript est [`exporter-trace-otlp-proto`][100]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: '${YOUR_ENDPOINT}', // Replace this with the correct endpoint
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: true}',
    'compute_stats': 'true',
  },
});
```
[100]: https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

L'exportateur Java est [`OtlpHttpSpanExporter`][200]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-span-mapping", "{span_name_as_resource_name: true}")
    .addHeader("compute_stats", "true")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-trace/

{{% /tab %}}
{{% tab "Go" %}}

L'exportateur Go est [`otlptracehttp`][300]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint
	otlptracehttp.WithURLPath("/v1/traces"),
	otlptracehttp.WithHeaders(
		map[string]string{
			"dd-api-key": os.Getenv("DD_API_KEY"),
			"dd-otel-span-mapping": "{span_name_as_resource_name: true}",
			"compute_stats": "true",
		}),
)
```

[300]: http://go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp

{{% /tab %}}
{{% tab "Python" %}}

L'exportateur Python est [`OTLPSpanExporter`][400]. Pour configurer l'exportateur, utilisez l'extrait de code suivant :

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="${YOUR_ENDPOINT}", # Replace this with the correct endpoint
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: true}",
        "compute_stats": "true",
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Facultatif) Mapper ou filtrer les noms de spans {#optional-map-or-filter-span-names}

Utilisez l'en-tête `dd-otel-span-mapping` pour configurer le mappage et le filtrage des spans. L'en-tête JSON contient les champs suivants :

- `ignore_resources` : une liste d'expressions régulières pour désactiver les traces en fonction de leur nom de ressource.
- `span_name_remappings` : une carte des noms de span Datadog vers les noms préférés.
- `span_name_as_resource_name` : spécifie s'il faut utiliser le nom du span OpenTelemetry comme nom d'opération du span Datadog (par défaut : true). Si la valeur est false, le nom de l'opération est dérivé d'une combinaison du nom de la portée d'instrumentation et du type de span.

Exemple :

```json
{
  "span_name_as_resource_name":false,
  "span_name_remappings":{
    "io.opentelemetry.javaagent.spring.client":"spring.client"
  },
  "ignore_resources":[
    "io.opentelemetry.javaagent.spring.internal"
  ]
}
```
## OpenTelemetry Collector {#opentelemetry-collector}

Configurez la [configuration recommandée d'OpenTelemetry Collector][10] pour exporter les traces vers cet endpoint et générer des métriques de trace APM avant l'échantillonnage.

## Dépannage {#troubleshooting}

### Erreur : 403 Forbidden {#error-403-forbidden}

Si vous recevez une erreur `403 Forbidden` lors de l'envoi de traces à l'endpoint d'ingestion de traces OTLP de Datadog, vérifiez que l'endpoint correspond à votre site Datadog. Votre site est {{< region-param key=dd_datacenter code="true" >}}, utilisez donc l' {{< region-param key="otlp_trace_endpoint" code="true" >}} endpoint.

### Erreur : 413 Request Entity Too Large {#error-413-request-entity-too-large}

Si vous recevez une erreur `413 Request Entity Too Large` lors de l'envoi de traces à l'endpoint d'ingestion de traces OTLP de Datadog, cela indique que la taille de la charge utile envoyée par l'exportateur OTLP dépasse la limite de 15 MiB (non compressée) du point de terminaison d'ingestion de traces de Datadog.

Cette erreur se produit généralement lorsque le SDK OpenTelemetry regroupe trop de données de télémétrie dans une seule charge utile de requête.

**Solution** : réduisez la taille du lot d'exportation du processeur de span par lots du SDK. Voici un exemple de la façon de modifier le `BatchSpanProcessorBuilder` dans le SDK OpenTelemetry Java :

```java
CopyBatchSpanProcessor batchSpanProcessor =
    BatchSpanProcessor
        .builder(exporter)
        .setMaxExportBatchSize(10)  // Default is 512
        .build();
```
Ajustez la valeur `setMaxExportBatchSize` selon vos besoins. Une valeur plus petite entraîne des exportations plus fréquentes avec des charges utiles plus petites, ce qui réduit la probabilité de dépasser la limite de 15 MiB.

### Avertissement : « traces export: failed … 202 Accepted » dans Go {#warning-traces-export-failed-202-accepted-in-go}


Si vous utilisez le SDK Go d'OpenTelemetry et que vous voyez un message d'avertissement similaire à `traces export: failed … 202 Accepted`, cela est dû à un problème connu dans l'exportateur HTTP OTLP d'OpenTelemetry Go.

L'exportateur HTTP OTLP d'OpenTelemetry Go traite tout code d'état HTTP autre que 200 comme une erreur, même si l'exportation réussit ([Issue 3706][5]). En revanche, d'autres SDK OpenTelemetry considèrent tout code d'état dans la plage [200, 300) comme un succès. L'endpoint d'ingestion de traces OTLP de Datadog renvoie un code d'état `202 Accepted` pour les exportations réussies.

La communauté OpenTelemetry discute encore de la question de savoir si d'autres codes d'état `2xx` devraient être traités comme des succès ([Issue 3203][6]).

**Solution** : Si vous utilisez l'endpoint d'ingestion de traces OTLP de Datadog avec le SDK OpenTelemetry pour Go, vous pouvez ignorer ce message d'avertissement en toute sécurité. Vos traces sont exportées avec succès malgré l'avertissement.

### Problème : Noms d'opération de span inattendus {#issue-unexpected-span-operation-names}

Lorsque vous utilisez l'endpoint d'ingestion de traces OTLP de Datadog, vous pouvez remarquer que les noms d'opération de span sont différents de ceux générés lors de l'utilisation de Datadog Agent ou du collecteur OpenTelemetry.

L'endpoint d'ingestion de traces OTLP de Datadog a l'option `span_name_as_resource_name` définie sur `true` par défaut. Cela signifie que Datadog utilise le nom du span OpenTelemetry comme nom d'opération. En revanche, Datadog Agent et le collecteur OpenTelemetry ont cette option définie sur `false` par défaut.

Lorsque `span_name_as_resource_name` est défini sur `false`, le nom de l'opération est dérivé d'une combinaison du nom de la portée d'instrumentation et du type de span. Par exemple, un nom d'opération peut apparaître sous la forme `opentelemetry.client`.

**Solution** : Si vous souhaitez désactiver l'option `span_name_as_resource_name` dans l'endpoint d'ingestion de traces OTLP de Datadog pour correspondre au comportement de Datadog Agent ou du collecteur OpenTelemetry, suivez ces étapes :

1. Consultez [Mapper ou filtrer les noms de spans](#optional-map-or-filter-span-names) dans ce document.
1. Définissez l'option `span_name_as_resource_name` sur `false` dans l'en-tête `dd-otel-span-mapping`.

Exemple :

```json
jsonCopy{
  "span_name_as_resource_name": false,
  ...
}
```

Cela garantit que les noms d'opération de span sont cohérents entre l'endpoint d'ingestion de traces OTLP de Datadog, Datadog Agent et le collecteur OpenTelemetry.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/collector_exporter/
[2]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[5]: https://github.com/open-telemetry/opentelemetry-go/issues/3706
[6]: https://github.com/open-telemetry/opentelemetry-specification/issues/3203
[7]: /fr/tracing/metrics/
[8]: /fr/opentelemetry/setup/otlp_ingest/serverless/
[9]: /fr/opentelemetry/setup/otlp_ingest/managed_platforms/
[10]: /fr/opentelemetry/setup/collector_exporter/