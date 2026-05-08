---
aliases:
- /es/tracing/guide/inferred-service-opt-in
description: Descubre automáticamente dependencias de servicios como bases de datos
  y colas mediante el análisis de solicitudes salientes.
further_reading:
- link: /tracing/services/service_page/
  tag: Documentación
  text: Más información sobre servicios en Datadog
title: Servicios inferidos
---

## Información general

Datadog detecta automáticamente las dependencias de un servicio instrumentado, como bases de datos, colas o API de terceros, incluso si esas dependencias no se instrumentaron directamente. A través del análisis de las solicitudes salientes de tus servicios instrumentados, Datadog infiere la presencia de las dependencias y recopila las métricas de rendimiento asociadas.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Mapa de dependencias de la página de servicios" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explora los servicios inferidos en el [Catálogo de software][1], filtrando las entradas por tipo de entidad, como bases de datos, colas o API de terceros. Cada [página de servicios][2] se ajusta al tipo de servicio que estás investigando. Por ejemplo, las páginas de servicios de bases de datos muestran información específica de las bases de datos y, si estás utilizando [Database Monitoring][3], incluyen datos de monitorización de estas bases de datos.

## Configurar servicios inferidos
{{< tabs >}}
{{% tab "Agent v7.60.0+" %}}
A partir de la versión [7.60.0][1] del Datadog Agent, no se necesita ninguna configuración manual para ver servicios inferidos. Las configuraciones necesarias —`apm_config.compute_stats_by_span_kind` y `apm_config.peer_tags_aggregation`— están activadas por defecto.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agent v7.55.1 - v7.59.1" %}}

Para las versiones [7.55.1][1] a [7.59.1][2] del Datadog Agent, añade lo siguiente a tu archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

Alternativamente, configura estas variables de entorno en tu configuración del Datadog Agent:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si utilizas Helm, incluye estas variables de entorno en tu [archivo][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agent v7.50.3 - v7.54.1" %}}

Para las versiones [7.50.3][1] a [7.54.1][2] del Datadog Agent, añade lo siguiente a tu archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternativamente, configura estas variables de entorno en tu configuración del Datadog Agent:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

Si utilizas Helm, incluye estas variables de entorno en tu [archivo][3] `values.yaml`.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Para OpenTelemetry Collector, la versión mínima recomendada es [v0.95.0][1] o posterior de `opentelemetry-collector-contrib`. En ese caso, actualiza esta configuración:

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Si tu versión del Collector es anterior a v0.95.0, actualiza la siguiente configuración del Collector:

{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}

**Ejemplo**: [collector.yaml][2].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.95.0
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L375-L395
{{% /tab %}}
{{< /tabs >}}

## Nombrar entidades inferidas

Para determinar los nombres y tipos de las dependencias de servicio inferidas, Datadog utiliza atributos estándar de tramo y los asigna a atributos de `peer.*`. Por ejemplo, las API externas inferidas utilizan el esquema de nomenclatura predeterminado `net.peer.name` como `api.stripe.com`, `api.twilio.com` y `us6.api.mailchimp.com`. Las bases de datos inferidas utilizan el esquema de nomenclatura predeterminado `db.instance`. Puedes renombrar entidades inferidas creando [reglas de renombrado][5].

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

**Nota**: Los valores de atributos pares que coinciden con formatos de direcciones IP (por ejemplo, 127.0.0.1) se modifican y ofuscan con `blocked-ip-address` para evitar ruidos innecesarios y el etiquetado de métricas con dimensiones de alta cardinalidad. Como resultado, es posible que veas que algunos servicios `blocked-ip-address` aparecen como dependencias descendentes de tus servicios instrumentados.

#### Prioridad de etiquetas pares

Para asignar el nombre a las entidades inferidas, Datadog utiliza un orden específico de prioridad entre etiquetas pares, cuando las entidades se definen mediante una combinación de varias etiquetas.

Tipo de entidad | Orden de prioridad
-----------|----------------
Base de datos | `peer.db.name` > `peer.aws.s3.bucket` (Para AWS S3) / `peer.aws.dynamodb.table` (Para AWS DynamoDB) / `peer.cassandra.contact.points` (Para Cassandra) / `peer.couchbase.seed.nodes` (Para Couchbase) > `peer.hostname` > `peer.db.system`
Cola | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (para Kafka) / `peer.aws.sqs.queue` (para AWS SQS) / `peer.aws.kinesis.stream` (Para AWS Kinesis) > `peer.messaging.system`
Servicio inferido | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si la etiqueta con mayor prioridad, como `peer.db.name`, no se detecta como parte de la instrumentación, Datadog utiliza la segunda etiqueta con mayor prioridad, como `peer.hostname`, y continúa en ese orden.

**Nota**: Datadog nunca define el `peer.service` para bases de datos y colas inferidas. `peer.service` es el atributo par con mayor prioridad. Si se define, tiene prioridad sobre todos los demás atributos.

## Migración a la nomenclatura global de servicios por defecto

Con los servicios inferidos, las dependencias de servicios se detectan automáticamente a partir de los atributos de tramo existentes. Como resultado, no es necesario cambiar los nombres de los servicios (utilizando la etiqueta `service`) para identificar estas dependencias.

Habilita `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` para asegurarte de que ninguna integración Datadog defina nombres de servicios diferentes del nombre global del servicio por defecto. Esto también mejora la forma en que las conexiones servicio-a-servicio y los servicios inferidos son representados en las visualizaciones de Datadog, a través de todos los lenguajes de bibliotecas de rastreo e integraciones compatibles.

<div class="alert alert-danger">La activación de esta opción puede afectar a las métricas existentes de APM, las métricas personalizadas de tramo, los análisis de traza, los filtros de retención, los escaneos de datos confidenciales, los monitores, los dashboards o los notebooks que hacen referencia a los antiguos nombres de servicio. Actualiza estos activos para utilizar la etiqueta de servicio global predeterminada<code>(service:&lt;DD_SERVICE&gt;)</code>.</div>

Para obtener instrucciones sobre cómo eliminar servicios anulados y migrar a servicios inferidos, consulta la guía [Anulación de servicios][4].

[1]: /es/software_catalog/
[2]: /es/tracing/services/service_page
[3]: /es/database_monitoring/
[4]: /es/tracing/guide/service_overrides
[5]: /es/tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov" >}}
<div class="alert alert-info">La función de servicios inferidos no está disponible por defecto en tu centro de datos. Rellena este <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulario</a> para solicitar acceso.</div>

{{< /site-region >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}