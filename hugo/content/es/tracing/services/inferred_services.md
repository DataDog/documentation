---
aliases:
- /es/tracing/guide/inferred-service-opt-in
description: Descubra automáticamente las dependencias de servicio como bases de datos
  y colas a través del análisis de solicitudes salientes.
further_reading:
- link: /tracing/services/service_page/
  tag: Documentación
  text: Aprenda más sobre los servicios en Datadog
title: Servicios inferidos
---
## Resumen {#overview}

Datadog descubre automáticamente las dependencias de un servicio instrumentado, como bases de datos, colas o APIs de terceros, incluso si esa dependencia no ha sido instrumentada directamente. Al analizar las solicitudes salientes de sus servicios instrumentados, Datadog infiere la presencia de estas dependencias y recopila métricas de rendimiento asociadas.

{{< img src="tracing/visualization/service/dependencies_section.png" alt="Mapa de dependencias de la página de servicio" style="width:90%;">}}

{{< site-region region="ap1,us3,us5,eu,us,ap2" >}}

Explore los servicios inferidos en el [Catálogo][1] filtrando entradas por tipo de entidad, como base de datos, cola o API de terceros. Cada [página de servicio][2] está adaptada al tipo de servicio que está investigando. Por ejemplo, las páginas de servicio de bases de datos muestran información específica de la base de datos e incluyen datos de DBM si está utilizando [DBM][3].

## Configure servicios inferidos {#set-up-inferred-services}
{{< tabs >}}
{{% tab "Agente v7.60.0+" %}}
A partir de la versión [7.60.0][1] del Agente de Datadog, no se necesita configuración manual para ver los servicios inferidos. Las configuraciones requeridas—`apm_config.compute_stats_by_span_kind` y `apm_config.peer_tags_aggregation`—están habilitadas por defecto.

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.60.0

{{% /tab %}}
{{% tab "Agente v7.55.1 - v7.59.1" %}}

Para las versiones del Agente de Datadog [7.55.1][1] a [7.59.1][2], agrega lo siguiente a tu archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true

{{< /code-block >}}

Alternativamente, establezca estas variables de entorno en la configuración de su Agente de Datadog:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true

{{< /code-block >}}

Si está utilizando Helm, incluya estas variables de entorno en su `values.yaml` [archivo][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.55.1
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.59.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "Agente v7.50.3 - v7.54.1" %}}

Para las versiones del Agente de Datadog [7.50.3][1] a [7.54.1][2], agregue lo siguiente a su archivo de configuración `datadog.yaml`:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternativamente, establezca estas variables de entorno en la configuración de su Agente de Datadog:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}

Si está utilizando Helm, incluya estas variables de entorno en su `values.yaml` [archivo][3].

[1]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[2]: https://github.com/DataDog/datadog-agent/releases/tag/7.54.1
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Para el OpenTelemetry Collector, la versión mínima recomendada es `opentelemetry-collector-contrib` [v0.95.0][1] o posterior. En ese caso, actualice esta configuración:

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Si la versión de su Collector es inferior a v0.95.0, actualice la siguiente configuración del Collector:

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

## Nombramiento de entidades inferidas {#naming-inferred-entities}

Para determinar los nombres y tipos de los servicios dependientes inferidos, Datadog utiliza atributos estándar de tramo y los asocia a atributos `peer.*`. Por ejemplo, las APIs externas inferidas utilizan el esquema de nombres por defecto `net.peer.name` como `api.stripe.com`, `api.twilio.com` y `us6.api.mailchimp.com`. Las bases de datos inferidas utilizan el esquema de nombres por defecto `db.instance`. Puede renombrar entidades inferidas creando [reglas de renombrado][5].

### Etiquetas de pares {#peer-tags}

Etiqueta de par | Atributos de fuente
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

**Nota**: Los valores de atributos de pares que coinciden con formatos de direcciones IP son modificados y redactados con `blocked-ip-address` para evitar ruido innecesario y el etiquetado de métricas con dimensiones de alta cardinalidad. Como resultado, puede encontrar que algunos servicios `blocked-ip-address` aparecen como dependencias descendentes de sus servicios instrumentados.

#### Precedencia de etiquetas de pares {#precedence-of-peer-tags}

Para asignar el nombre a entidades inferidas, Datadog utiliza un orden específico de precedencia entre etiquetas de pares, cuando las entidades se definen por una combinación de varias etiquetas. 

Tipo de entidad | Orden de precedencia
-----------|----------------
Base de datos | `peer.db.name` > `peer.aws.s3.bucket` (Para AWS S3) / `peer.aws.dynamodb.table` (Para AWS DynamoDB) / `peer.cassandra.contact.points` (Para Cassandra) / `peer.couchbase.seed.nodes` (Para Couchbase) > `peer.hostname` > `peer.db.system`
Cola | `peer.messaging.destination` > `peer.kafka.bootstrap.servers` (para Kafka) / `peer.aws.sqs.queue` (para AWS SQS) / `peer.aws.kinesis.stream` (para AWS Kinesis) > `peer.messaging.system`
Servicio inferido | `peer.service` > `peer.rpc.service` > `peer.hostname`

Si la etiqueta de mayor prioridad, como `peer.db.name`, no se captura como parte de la instrumentación, Datadog utiliza la segunda etiqueta de mayor prioridad, como `peer.hostname`, y continúa en ese orden.

**Nota**: Datadog nunca establece el `peer.service` para bases de datos y colas inferidas. `peer.service` es el atributo de par de mayor prioridad. Si se establece, tiene prioridad sobre todos los demás atributos.

## Migre a la nomenclatura global de servicios predeterminada {#migrate-to-global-default-service-naming}

Con los servicios inferidos, las dependencias de servicios se detectan automáticamente a partir de los atributos de tramo existentes. Como resultado, no es necesario cambiar los nombres de los servicios (usando la etiqueta `service`) para identificar estas dependencias. 

Habilite `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED` para asegurar que ninguna integración de Datadog establezca nombres de servicio que sean diferentes del nombre de servicio global predeterminado. Esto también mejora la forma en que se representan las conexiones de servicio a servicio y los servicios inferidos en las visualizaciones de Datadog, en todos los lenguajes compatibles con el SDK e integraciones compatibles.

<div class="alert alert-danger">Habilitar esta opción puede afectar las métricas de APM existentes, métricas de tramo personalizadas, análisis de trazas, filtros de retención, escaneos de datos sensibles, monitores, tableros o notebooks que hagan referencia a los antiguos nombres de servicio. Actualice estos activos para usar la etiqueta de servicio predeterminada global (<code>service:&lt;DD_SERVICE&gt;</code>).</div>

Para instrucciones sobre cómo eliminar las sobreescrituras de servicio y migrar a servicios inferidos, consulte la [guía de sobreescrituras de servicio][4].

[1]: /es/internal_developer_portal/catalog/
[2]: /es/tracing/services/service_page
[3]: /es/database_monitoring/
[4]: /es/tracing/guide/service_overrides
[5]: /es/tracing/services/renaming_rules/

{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">La función de Servicios Inferidos no está disponible por defecto en su centro de datos. Complete este <a href="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA" target="_blank">formulario</a> para solicitar acceso.</div>

{{< /site-region >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}