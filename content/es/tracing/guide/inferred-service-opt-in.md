---
disable_toc: false
further_reading:
- link: /tracing/services/
  tag: Documentación
  text: Observabilidad del servicio
- link: /tracing/trace_collection/
  tag: Documentación
  text: Envío de trazas a Datadog
- link: /tracing/trace_collection/dd_libraries/
  tag: Documentación
  text: Añadir la biblioteca de rastreo de Datadog
private: true
title: Dependencias de servicio inferidas
---

{{< callout url="https://docs.google.com/forms/d/1imGm-4SfOPjwAr6fwgMgQe88mp4Y-n_zV0K3DcNW4UA/edit" d_target="#signupModal" btn_hidden="true" btn_hidden="false" header="Opt in to the private beta!" >}}
Las dependencias inferidas de servicio están en fase beta privada. Para solicitar acceso, rellena el formulario.
{{< /callout >}}

## Información general

Datadog puede descubrir automáticamente las dependencias para un servicio instrumentado, como una base de datos, una cola o una API de terceros, incluso si esa dependencia aún no se ha instrumentado. Mediante el análisis de las solicitudes salientes de tus servicios instrumentados, Datadog infiere la presencia de estas dependencias y recopila las métricas de rendimiento asociado.

Con la nueva experiencia de entidades inferidas, puedes filtrar las entradas del [Catálogo de servicios][3] por tipo de entidad, como base de datos, cola o API de terceros. Esto te permite visualizar mejor las dependencias de servicio utilizando el [mapa de dependencias de la Página de servicios](https://github.com/DataDog/documentation/pull/23219/files#service-page-dependency-map) y funciones de APM.

Para determinar los nombres y tipos de las dependencias de servicio inferidas, Datadog utiliza atributos de tramo estándar y los asigna a atributos `peer.*`. Para consultar la lista completa de atributos `peer.*`, consulta [Nomenclatura de dependencias de servicio inferidas](#inferred-service-dependencies-nomemclature). Las API externas inferidas utilizan el esquema de nomenclatura por defecto `net.peer.name`. Por ejemplo, `api.stripe.com`, `api.twilio.com`, `us6.api.mailchimp.com`. Las bases de datos inferidas utilizan el esquema de nomenclatura por defecto `db.instance`.

Si utilizas el rastreador de Go, Java, NodeJS, PHP, .NET o Ruby, puedes personalizar los nombres predeterminados de las entidades inferidas.

**Nota:** Si configuras monitores, dashboards, o notebooks para un determinado servicio inferido durante la fase beta, puede que necesites actualizarlos si el esquema de nombres cambia. Más información sobre los pasos de migración en las [instrucciones de elección](#opt-in).

### Mapa de dependencia de la Página de servicios

Utiliza el mapa de dependencias para visualizar la comunicación servicio a servicio y obtener información sobre componentes del sistema como bases de datos, colas y dependencias de terceros. Puedes agrupar las dependencias por tipo y filtrarlas por solicitudes, latencia o errores para identificar conexiones lentas o con fallos.

{{< img src="tracing/services/service_page/dependencies.png" alt="Mapa de dependencias de servicios de la Pagina de servicios" style="width:100%;">}}

## Elección

<div class="alert alert-warning">Sigue los pasos de migración solo una vez que el servicio de soporte de Datadog haya confirmado que la función está activada en Datadog.</div>

Para elegir, Datadog te recomienda que ajustes tu:
- Configuración del [Datadog Agent](#datadog-agent-configuration) (o [Collector de OpenTelemetry](#opentelemetry-collector))
- Configuración de [bibliotecas de rastreo de APM](#APM-tracing-library-configuration)

### Configuración del Datadog Agent

Requisitos:
- Datadog Agent versión >= [7.50.3][4].

Actualiza tu archivo de configuración `datadog.yaml` con lo siguiente:

{{< code-block lang="yaml" filename="datadog.yaml" collapsible="true" >}}

apm_config:
  compute_stats_by_span_kind: true
  peer_tags_aggregation: true
  peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Alternativamente, configura esto estableciendo las siguientes variables de entorno en tu configuración de lanzamiento de Datadog Agent:

{{< code-block collapsible="true" lang="yaml" >}}

DD_APM_COMPUTE_STATS_BY_SPAN_KIND=true 
DD_APM_PEER_TAGS_AGGREGATION=true
DD_APM_PEER_TAGS='["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","cassandra.keyspace","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]'

{{< /code-block >}}


#### Helm
Incluye el mismo conjunto de variables de entorno en tu [archivo][8] `values.yaml`.


### Collector de OpenTelemetry

Versión mínima recomendada: opentelemetry-collector-contrib >= [v0.95.0][7].

Ejemplo [collector.yaml][6].

{{< code-block lang="yaml"  collapsible="true" >}}

connectors:
  datadog/connector:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]

{{< /code-block >}}

Si tu versión del Collector es inferior a [v0.95.0][7], utiliza una configuración de exportador con las siguientes `peer_tags`:


{{< code-block lang="yaml" collapsible="true" >}}

exporters:
  datadog:
    traces:
      compute_stats_by_span_kind: true
      peer_tags_aggregation: true
      peer_tags: ["_dd.base_service","amqp.destination","amqp.exchange","amqp.queue","aws.queue.name","aws.s3.bucket","bucketname","db.cassandra.contact.points","db.couchbase.seed.nodes","db.hostname","db.instance","db.name","db.namespace","db.system","grpc.host","hostname","http.host","http.server_name","messaging.destination","messaging.destination.name","messaging.kafka.bootstrap.servers","messaging.rabbitmq.exchange","messaging.system","mongodb.db","msmq.queue.path","net.peer.name","network.destination.name","peer.hostname","peer.service","queuename","rpc.service","rpc.system","server.address","streamname","tablename","topicname"]   

{{< /code-block >}}


### Configuración de la biblioteca de rastreo de APM

<div class="alert alert-warning">Los siguientes pasos introducen un <b>cambio de última hora</b>: Datadog cambiará la forma en que los nombres de servicio se capturan por defecto. Consulta <a href="#global-default-service-naming-migration">Migración de nomenclatura del servicio predeterminado global</a>, para determinar si necesitas tomar alguna acción de migración.</div>

{{< tabs >}}
{{% tab "Java" %}}

La versión mínima del rastreador de Java requerida es 1.16.0. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

[Descarga la última versión del rastreador de Java][1].

Para ello, añade las siguientes variables de entorno o propiedades del sistema a la configuración de tu rastreador:

| Variable de entorno | Propiedad del sistema |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `-Ddd.trace.remove.integration-service-names.enabled=true` |

Elimina los siguientes ajustes de tu configuración:

| Variable de entorno | Motivo de la eliminación |
| ---  | ----------- |
| `DD_SERVICE_MAPPING` | Todos los nombres de servicio aparecen por defecto en `DD_SERVICE`. |
| `DD_TRACE_SPLIT_BY_TAGS` | Los servicios inferidos se muestran automáticamente con la introducción de la etiqueta `peer.service`. |
| `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | Las instancias de la base de datos se infieren basándose en la etiqueta `peer.service`. |

[1]: https://dtdg.co/latest-java-tracer

{{% /tab %}}

{{% tab "Go" %}}

La versión mínima del rastreador de Go requerida es [v1.52.0][1]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade las siguientes variables de entorno o propiedades del sistema a la configuración de tu rastreador:

| Variable de entorno | Propiedad del sistema |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `WithGlobalServiceName(true)` |

[1]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.52.0

{{% /tab %}}

{{% tab "NodeJS" %}}

Las versiones mínimas del rastreador de NodeJS requeridas son [2.44.0][1], [3.31.0][2], o [4.10.0][3]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade las siguientes variables de entorno o propiedades del sistema a la configuración de tu rastreador:

| Variable de entorno | Propiedad del sistema |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `spanRemoveIntegrationFromService=true` |

[1]: https://github.com/DataDog/dd-trace-js/releases/tag/v2.44.0
[2]: https://github.com/DataDog/dd-trace-js/releases/tag/v3.31.0
[3]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.10.0

{{% /tab %}}

{{% tab "PHP" %}}
La versión mínima del rastreador de PHP requerida es [0.90.0][1]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade las siguientes variables de entorno o propiedades del sistema a la configuración de tu rastreador:

| Variable de entorno | Propiedad del sistema |
| ---  | ----------- |
| `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true` | `datadog.trace.remove_integration_service_names_enabled=true` |

[1]: https://github.com/DataDog/dd-trace-php/releases/tag/0.90.0
{{% /tab %}}

{{% tab ".NET" %}}

La versión mínima del rastreador de .NET requerida es [v2.35.0][1]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade la siguiente variable de entorno a la configuración del rastreador o a las propiedades del sistema:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v2.35.0

{{% /tab %}}

{{% tab "Python" %}}

La versión mínima del rastreador de Python requerida es [v1.16.0][1]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade las siguientes variables de entorno a la configuración del rastreador o a las propiedades del sistema:

Añade las siguientes variables de entorno a la configuración del rastreador o a las propiedades del sistema:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

A partir de la versión del rastreador `v1.16.0` se admiten todas las bibliotecas excepto Boto2.

[1]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.16.0

{{% /tab %}}

{{% tab "Ruby" %}}
La versión mínima del rastreador de Ruby requerida es [v1.13.0][1]. Las actualizaciones periódicas a la última versión son recomendadas para acceder a los cambios y correcciones de errores.

Para ello, añade las siguientes variables de entorno a la configuración del rastreador o a las propiedades del sistema:
- `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED=true`

[1]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.13.0
{{% /tab %}}

{{< /tabs >}}



## La nueva nomenclatura: qué cambia

### Lista de etiquetas de peer.* recién introducidas


### Migración de nomenclatura del servicio global por defecto

Al activar la variable de entorno `DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED`, se mejora la representación de las conexiones servicio a servicio y los servicios inferidos en las visualizaciones de Datadog, en todos los lenguajes de biblioteca de rastreo e integraciones compatibles.

Anteriormente, algunas bibliotecas de rastreo incluían el nombre de integración asociada en el etiquetado de nombre de servicio. Por ejemplo, .NET etiquetaba las llamadas gRPC como `service:<DD_SERVICE>-grpc-client` mientras que Python las etiquetaba como `service:grpc-client`. Con esta opción activada, todos los tramos de etiqueta de bibliotecas de rastreo compatibles de los servicios de descarga con el nombre del servicio de llamada, `service:<DD_SERVICE>`, proporcionando así un _nombre de servicio global predeterminado_.

_ | Antes | Después
--|-------|--------
Nombre de servicio | `service:my-service-grpc-client` o `service:grpc-client` | `service:myservice` 
atributos `peer.*`adicionales | _Sin etiquetas `peer.*` establecidas_ | `@peer.service:otherservice` (`otherservice` es el nombre del servicio remoto al que se llama con gRPC)

Del mismo modo, para un tramo que representa una llamada a una base de datos mySQL:

_ | Antes | Después
--|-------|--------
Nombre de servicio | `service:my-service-mysql` o `service:mysql` | `service:myservice` 
atributos `peer.*`adicionales | _Sin etiquetas `peer.*` establecidas_ | `@peer.db.name:user-db`, `@peer.db.system:mysql`

En consecuencia, si tienes:

- Métricas de APM
- Métricas de tramo personalizadas de APM
- Análisis de traza
- Filtros de retención
- Escaneos de datos confidenciales
- Monitores, dashboards, o notebooks 

Y estos apuntan a nombres de servicio similares, actualiza esos elementos para utilizar la etiqueta de servicio predeterminado global (`service:<DD_SERVICE>`) en su lugar.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[3]: /es/tracing/service_catalog/
[4]: https://github.com/DataDog/datadog-agent/releases/tag/7.50.3
[5]: /es/agent/guide/agent-configuration-files/?tab=agentv6v7
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/examples/collector.yaml#L335-L357
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases
[8]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L517-L538