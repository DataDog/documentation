---
title: Servicios inferidos
description: Descubra automáticamente dependencias de servicio como bases de datos y colas a través del análisis de solicitudes salientes.
aliases:
  - /tracing/guide/inferred-service-opt-in
further_reading:
- link: "/tracing/services/service_page/"
  tag: "Documentation"
  text: "Más información sobre los servicios en Datadog"
---

## Información general

Datadog descubre automáticamente las dependencias de un servicio instrumentado, como bases de datos, colas o API de terceros, incluso si esa dependencia no se ha instrumentado directamente. Al analizar las solicitudes salientes de sus servicios instrumentados, Datadog infiere la presencia de estas dependencias y recopila las métricas de rendimiento asociadas.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Mapa de dependencias de la página de servicios" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explora los servicios inferidos en el [catálogo de software][1] filtrando las entradas por tipo de entidad, como la base de datos, la cola o la API de terceros. Cada [página de servicio][2] se adapta al tipo de servicio que está investigando. Por ejemplo, las páginas del servicio de base de datos muestran información específica de la base de datos e incluyen datos de supervisión de la base de datos si utiliza [Database Monitoring][3] de datos.

## Configurar servicios inferidos
{{< tabs >}} {{% tab "Agent v7.60.0+" %}} A partir de la versión [7.60.0][1] de Datadog Agent, no se necesita configuración manual para ver los servicios inferidos. Las configuraciones requeridas (`apm_config.compute_stats_by_span_kind` y `apm_config.peer_tags_aggregation`) están habilitadas de forma predeterminada.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}} {{% tab "Agent v7.55.1 - v7.59.1" %}}

Para las versiones [7.55.1][1] a [7.59.1][2] del Datadog Agent, añade lo siguiente a tu archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config: compute_stats_by_span_kind: true peer_tags_aggregation: true

{{< /code-block >}}

Alternativamente, configura estas variables de entorno en tu configuración del Datadog Agent:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si utilizas Helm, incluye estas variables de entorno en tu [archivo][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}} {{% tab "Agent v7.50.3 - v7.54.1" %}}

Para las versiones [7.50.3][1] a [7.54.1][2] del Datadog Agent, añade lo siguiente a tu archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config: compute_stats_by_span_kind: true peer_tags_aggregation: true peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.system","server.address","streamname","tabletopicname"]

{{< /code-block >}}

Alternativamente, configura estas variables de entorno en tu configuración del Datadog Agent:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true DD_APM_PEER_TAGS_AGGREGATION=true DD_APM_PEER_TAGS='\["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.name","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.queue.path","net.peername","net.destination.name","peer.name","network.destination".name","peer.coue.service","queue.name","pcrpc.service","pcr.system","adserver","address","streamname","tabletopic'name]

{{< /code-block >}}

Si utilizas Helm, incluye estas variables de entorno en tu [archivo][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}} {{% tab "OpenTelemetry Collector" %}}

Para OpenTelemetry Collector, la versión mínima recomendada es `opentelemetry-collector-contrib` [v0.95.0][1] o posterior. En ese caso, actualice esta configuración:

{{< code-block lang="yaml" collapsible="true" >}}

conectores: datadog/connector: traces: compute_stats_by_span_kind: true peer_tags_aggregation: true peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","stream","table","topicname"]

{{< /code-block >}}

Si tu versión del Collector es anterior a v0.95.0, actualiza la siguiente configuración del Collector:

{{< code-block lang="yaml" collapsible="true" >}}

exporters: datadog: traces: compute_stats_by_span_kind: true peer_tags_aggregation: true peer_tags: \["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","namestreamname","table",topicname"]   

{{< /code-block >}}

**Ejemplo**: [colector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}} {{< /tabs >}}

## Nombrar entidades inferidas

Para determinar los nombres y tipos de las dependencias de servicio inferidas, Datadog utiliza atributos span estándar y los asigna a atributos `peer.*`. Por ejemplo, las API externas inferidas usan los `net.peer.name` predeterminados del esquema de nombres como `api.stripe.com`, `api.twilio.com` y `us6.api.mailchimp.com`. Las bases de datos inferidas utilizan el `db.instance` de esquema de nombres predeterminado. Puede cambiar el nombre de las entidades inferidas creando [reglas de cambio][5] de nombre.

### Etiquetas (tags) pares

Etiqueta par | Atributos de origen
--------------------|-------------------
`peer.aws.dynamodb.table` | `tablename`
`peer.aws.kinesis.stream` | `streamname`
`peer.aws.s3.bucket` | `bucketname`, `aws.s3.bucket`
`peer.aws.sqs.queue` | `queuename`
`peer.cassandra.contact.points` | `db.cassandra.contact.points`
`peer.couchbase.seed.nodes` | `db.couchbase.seed.nodes`
`peer.db.name` | `db.name`, `mongodb.db`, `db.instance`, `cassandra.keyspace`, `db.namespace`
`peer.db.system` | `db.system`
`peer.hostname` | `peer.hostname`, `hostname`, `net.peer.name`, `db.hostname`, `network.destination.name`, `grpc.host`, `http.host`, `server.address`, `http.server_name`
`peer.kafka.bootstrap.servers` | `messaging.kafka.bootstrap.servers`
`peer.messaging.destination` | `topicname`, `messaging.destination`, `messaging.destination.name`, `messaging.rabbitmq.exchange`, `amqp.destination`, `amqp.queue`, `amqp.exchange`, `msmq.queue.path`, `aws.queue.name`
`peer.messaging.system` | `messaging.system`
`peer.rpc.service` | `rpc.service`
`peer.rpc.system` | `rpc.system`
`peer.service` | `peer.service`

\*\*NOTA:** Los valores de atributos homólogos que coinciden con los formatos de dirección IP (por ejemplo, 127.0.0.1) se modifican y redactan con `blocked-ip-address` para evitar ruido innecesario y métricas de etiquetado con dimensiones de alta cardinalidad. Como resultado, es posible que encuentre algunos servicios de `blocked-ip-address` que aparecen como dependencias descendentes de sus servicios instrumentados.

#### Prioridad de etiquetas pares

Para asignar el nombre a las entidades inferidas, Datadog utiliza un orden específico de prioridad entre etiquetas pares, cuando las entidades se definen mediante una combinación de varias etiquetas. 

Tipo de entidad | Orden de prioridad
-----------|----------------
Base de datos | `peer.db.name` > `peer.aws.s3.bucket` (para AWS S3) / `peer.aws.dynamodb.table` (para AWS DynamoDB) / `peer.cassandra.contact.points` (para Cassandra) / `peer.couchbase.seed.nodes` (para Couchbase) > `peer.hostname` > `peer.db.system`
Cola | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (para Kafka) / `peer.aws.sqs.queue` (para AWS SQS) / `peer.aws.kinesis.stream` (para AWS Kinesis) > `peer.messaging.system`
Servicio inferido | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si la etiqueta con mayor prioridad, como `peer.db.name`, no se detecta como parte de la instrumentación, Datadog utiliza la segunda etiqueta con mayor prioridad, como `peer.hostname`, y continúa en ese orden.

\*\*NOTA:** Datadog nunca establece el `peer.service` para las bases de datos y colas inferidas. `peer.service` es el atributo peer de mayor prioridad. Si se establece, tiene prioridad sobre todos los demás atributos.

## Migración a la nomenclatura global de servicios por defecto

Con los servicios inferidos, las dependencias del servicio se detectan automáticamente a partir de los atributos span existentes. Como resultado, no es necesario cambiar los nombres de servicio (mediante la etiqueta `service`) para identificar estas dependencias. 

Habilite `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` para asegurarse de que ninguna integración de Datadog establece nombres de servicio diferentes del nombre de servicio global predeterminado. Esto también mejora la forma en que las conexiones de servicio a servicio y los servicios inferidos se representan en las visualizaciones de Datadog, en todos los lenguajes e integraciones de bibliotecas de rastreo compatibles.

<div class="alert alert-danger">Activar esta opción puede afectar a las métricas de APM existentes, las métricas de span personalizadas, el análisis de trazas, los filtros de retención, los análisis de datos confidenciales, los monitores, los paneles o los portátiles que hacen referencia a los nombres de servicio antiguos. Actualice estos activos para usar la etiqueta global de servicio predeterminada (<code>service:&lt;DD_SERVICE></code>).</div>

Para obtener instrucciones sobre cómo eliminar servicios anulados y migrar a servicios inferidos, consulte la [guía Anulación de servicios][4].

[1]: /software_catalog/
[2]: /tracing/services/service_page
[3]: /database_monitoring/
[4]: /tracing/guide/service_overrides
[5]: /tracing/services/renaming_rules/

{{< /site-region >}} {{< site-region region="gov" >}}
<div class="alert alert-info">La función Servicios inferidos no está disponible de forma predeterminada en su centro de datos. Rellene este <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulario</a> para solicitar acceso.</div>

{{< /site-region >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

