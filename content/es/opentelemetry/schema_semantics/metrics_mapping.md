---
aliases:
- /opentelemetry/guide/metrics_mapping/
further_reading:
- link: /metrics/open_telemetry/otlp_metric_types
  tag: Documentación
  text: Tipos de métricas OTLP
- link: /opentelemetry/guide/semantic_mapping
  tag: Documentación
  text: Asignación de atributos de recursos de OpenTelemetry a Datadog
title: Asignación de métricas de OpenTelemetry
---

## Información general

Los productos y visualizaciones de Datadog se basan en métricas y etiquetas (tags) que se adhieren a patrones de nomenclatura específicos. Las métricas de los componentes de OpenTelemetry que se envían a Datadog se asignan a las métricas correspondientes de Datadog según proceda. La creación de estas métricas no afecta a la facturación de Datadog.

El siguiente diagrama muestra el proceso de asignación de métricas de OpenTelemetry a métricas que utiliza Datadog:

{{< img src="opentelemetry/guide/metrics_mapping/otel-mapping-metrics.png" alt="El proceso de decisión para asignar nombres de métricas de OpenTelemetry a nombres de métricas de Datadog. Si ningún producto de Datadog utiliza una métrica de OTel, o si la semántica es la misma que Datadog, se envía como está a Datadog. Sino, se crea una métrica del estilo de Datadog desde la métrica de OTel y se la envía a Datadog." style="width:100%;" >}}

## Utilización del prefijo `otel` 

Para diferenciar las métricas capturadas por el receptor `hostmetrics` del Datadog Agent, añadimos un prefijo, `otel`, para las métricas recopiladas por el recopilador. Si un nombre de métrica empieza por `system.` o `process.`, se añade `otel.` al nombre de métrica. No es recomendado monitorizar el mismo artefacto de infraestructura con el Agent y Collector al mismo tiempo.

<div class="alert alert-info">Datadog está evaluando formas de mejorar la experiencia de métrica OTLP, incluyendo la posible eliminación de este prefijo <code>otel</code>. Si tienes alguna sugerencia al respecto, ponte en contacto con tu equipo de cuentas.</div>

## Métricas de host

Las métricas de host son recopiladas por el [receptor de métricas de host][1]. Para obtener información sobre cómo configurar el receptor, consulta [OpenTelemetry Collector y Exportador de Datadog][2].

La métricas, asignadas a métricas de Datadog, se utilizan en las siguientes vistas:
- [Mapa de host de infraestructura][5]
- [Lista de infraestructura][6]
- [Dashboards de host por defecto][7]
- [Información de host en la vista de traza de APM][8]

**Nota**: Para correlacionar trazas y métricas de host, configura [Atributos de Universal Service Monitoring][3] para cada servicio y establece el atributo de recurso `host.name` en el host subyacente correspondiente para las instancias de servicio y recopilador.

La siguiente tabla muestra qué nombres de métrica de host de Datadog están asociados a los correspondientes nombres de métrica de host de OpenTelemetry y, si procede, qué matemática se aplica a la métrica de host de OTel para transformarla en unidades de Datadog durante la asignación.

| Nombre de métrica de Datadog   | Nombre de métrica de OTel      | Descripción de métrica         | Transformación realizada en la métrica de OTel      |
|-----------------------|-----------------------|----------------------------|--------------------------|
| `system.load.1`         | `system.cpu.load_average.1m`     | La carga media del sistema durante un minuto. (Solo Linux)       |         |
| `system.load.5`         | `system.cpu.load_average.5m`        | La carga media del sistema durante cinco minutos. (Solo Linux)   | |
| `system.load.15`        | `system.cpu.load_average.15m`     | La carga media del sistema durante 15 minutos. (Solo Linux)         |            |
| `system.cpu.idle`       | `system.cpu.utilization` <br>Estado del filtro de atributo: `idle`    | Fracción de tiempo que la CPU pasó en estado inactivo. Se muestra como porcentaje.   | Multiplicado por 100     |
| `system.cpu.user`       | `system.cpu.utilization` <br>Estado del filtro de atributo: `user`    | Fracción de tiempo que la CPU pasó ejecutando los procesos del espacio de usuario. Se muestra como porcentaje.  | Multiplicado por 100     |
| `system.cpu.system`     | `system.cpu.utilization` <br>Estado del filtro de atributo: `system`  | Fracción de tiempo que la CPU pasó ejecutando el kernel.    | Multiplicado por 100    |
| `system.cpu.iowait`     | `system.cpu.utilization` <br>Estado del filtro de atributo: `wait`    | Porcentaje de tiempo que la CPU dedica a esperar a que se completen las operaciones de E/S.         | Multiplicado por 100       |
| `system.cpu.stolen`     | `system.cpu.utilization` <br>Estado del filtro de atributo: `steal`     | El porcentaje de tiempo que la CPU virtual pasó esperando a que el hipervisor preste servicio a otra CPU virtual. Solo se aplica a máquinas virtuales. Se muestra como porcentaje.| Multiplicado por 100   |
| `system.mem.total`      | `system.memory.usage`     | La cantidad total de RAM física en bytes.   | Convertido a MB (dividido por 2^20) |
| `system.mem.usable`     | `system.memory.usage` <br>Estado del filtro de atributo: `(free, cached, buffered)` | Valor de `MemAvailable` a partir de `/proc/meminfo` si está presente. Si no está presente, se vuelve a añadir `free + buffered + cached memory`. En bytes.    | Convertido a MB (dividido por 2^20) |
| `system.net.bytes_rcvd` | `system.network.io` <br>Dirección del filtro de atributo: `receive`   | Número de bytes recibidos en un dispositivo por segundo.       |         |
| `system.net.bytes_sent` | `system.network.io` <br>Dirección del filtro de atributo: `transmit`   | Número de bytes enviados desde un dispositivo por segundo.           |       |
| `system.swap.free`      | `system.paging.usage` <br>Estado del filtro de atributo: `free`    | La cantidad de espacio swap libre, en bytes      | Convertido a MB (dividido por 2^20) |
| `system.swap.used`      | `system.paging.usage` <br>Estado del filtro de atributo: `used`     | La cantidad de espacio swap en uso, en bytes.  | Convertido a MB (dividido por 2^20) |
| `system.disk.in_use`    | `system.filesystem.utilization`    | La cantidad de espacio en disco en uso como fracción del total.      |        |

## Métricas de contenedor

El receptor de Docker Stats genera métricas de contenedor para OpenTelemetry Collector. El exportador de Datadog traduce las métricas de contenedor a sus homólogos de Datadog para usarlas en las siguientes vistas:

- [Dashboard predeterminado de información general de contenedores][9]
- [Vista de traza de APM][10] con métricas de contenedor

**Nota**: Para correlacionar trazas y métricas de contenedor, configura [Atributos de Universal Service Monitoring][3] para cada servicio y establece los siguientes atributos de recurso para cada servicio:
  - `k8s.container.name` 
  - `k8s.pod.name` 
  - `container.name` 
  - `container.id`

  Más información sobre [la asignación entre las convenciones semánticas de OpenTelemetry y Datadog para los atributos de recursos][4].

La siguiente tabla muestra qué nombres de métrica de contenedor de Datadog están asociados a los correspondientes nombres de métrica de contenedor de OpenTelemetry

| Nombre de métrica de Datadog     | Nombre de métrica de OTel Docker Stats         | Descripción de métrica             |
|-------------------------|--------------------------------|----------------------|
| `container.cpu.usage`    | `container.cpu.usage.total`       | El uso total de la CPU del contenedor     |
| `container.cpu.user`     | `container.cpu.usage.usermode`         | El uso de CPU en el espacio de usuario del contenedor    |
| `container.cpu.system`    | `container.cpu.usage.system`    | El uso de la CPU del sistema del contenedor       |
| `container.cpu.throttled`    | `container.cpu. throttling_data.throttled_time`      | El tiempo total de limitación de la CPU      |
| `container.cpu.throttled.periods` | `container.cpu. throttling_data.throttled_periods`       | El número de periodos durante los cuales el contenedor estaba limitado |
| `container.memory.usage`          | `container.memory.usage.total`      | El uso total de memoria del contenedor       |
| `container.memory.kernel`         | `container.memory.active_anon`        | El uso de memoria del kernel del contenedor      |
| `container.memory.limit`          | `container.memory. hierarchical_memory_limit`    | El límite de memoria del contenedor     |
| `container.memory.soft_limit`     | `container.memory.usage.limit`       | El límite movible de memoria del contenedor      |
| `container.memory.cache`          | `container.memory.total_cache`      | El uso de la caché del contenedor    |
| `container.memory.swap`           | `container.memory.total_swap`         | El uso de swap del contenedor       |
| `container.io.write`              | `container.blockio. io_service_bytes_recursive` <br>Operación del filtro de atributo=`write` | El número de bytes escritos en los discos por este contenedor         |
| `container.io.read`               | `container.blockio. io_service_bytes_recursive` <br>Operación del filtro de atributo=`read`  | El número de bytes leídos de los discos por este contenedor          |
| `container.io.write.operations`   | `container.blockio. io_serviced_recursive` <br>Operación del filtro de atributo=`write`      | El número de operaciones de escritura realizadas por este contenedor          |
| `container.io.read.operations`    | `container.blockio. io_serviced_recursive` <br>Operación del filtro de atributo=`read`       | El número de operaciones de lectura realizadas por este contenedor           |
| `container.net.sent`              | `container.network.io. usage.tx_bytes`      | Número de bytes de red enviados (por interfaz)    |
| `container.net.sent.packets`      | `container.network.io. usage.tx_packets`    | Número de paquetes de red enviados (por interfaz)   |
| `container.net.rcvd`              | `container.network.io. usage.rx_bytes`     | Número de bytes de red recibidos (por interfaz)   |
| `container.net.rcvd.packets`      | `container.network.io. usage.rx_packets`   | Número de paquetes de red recibidos (por interfaz)    |

## Métricas de Kafka

| Métrica de OpenTelemetry | Métrica de Datadog | Fuente | Transformación realizada en la métrica de Datadog |
|---|---|---|---|
| otel.kafka.producer.request-rate | kafka.producer.request_rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| otel.kafka.producer.response-rate | kafka.producer.response_rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| otel.kafka.producer.request-latency-avg|kafka.producer.request_latency_avg | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer}| |
| kafka.producer.outgoing-byte-rate | kafka.producer.outgoing-byte-rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer}| |
| kafka.producer.io-wait-time-ns-avg | kafka.producer.io_wait | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer}| |
| kafka.producer.byte-rate | kafka.producer.bytes_out | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| kafka.consumer.total.bytes-consumed-rate | kafka.consumer.bytes_in | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-consumer} | |
| kafka.consumer.total.records-consumed-rate | kafka.consumer.messages_in | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-consumer} | |
| kafka.red.io{state:out} | kafka.net.bytes_out.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.red.io{state:in} | kafka.net.bytes_in.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.purgatory.size{type:produce} | kafka.request.producer_request_purgatory.size | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.purgatory.size{type:fetch} | kafka.request.fetch_request_purgatory.size | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.partition.under_replicated | kafka.replication.under_replicated_partitions | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.isr.operation.count{operation:shrink} | kafka.replication.isr_shrinks.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.isr.operation.count{operation:expand} | kafka.replication.isr_expands.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge | 
| kafka.leader.election.rate | kafka.replication.leader_elections.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge | 
| kafka.partition.offline | kafka.replication.offline_partitions_count | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.request.time.avg{type:produce} | kafka.request.produce.time.avg | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.request.time.avg{type:fetchconsumer} | kafka.request.fetch_consumer.time.avg | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.request.time.avg{type:fetchfollower} | kafka.request.fetch_follower.time.avg |Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.message.count |kafka.messages_in.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.request.failed{type:produce} | kafka.request.produce.failed.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.request.failed{type:fetch} | kafka.request.fetch.failed.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.request.time.99p{type:produce} | kafka.request.produce.time.99percentile | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.request.time.99p{type:fetchconsumer} | kafka.request.fetch_consumer.time.99percentile | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.request.time.99p{type:fetchfollower} | kafka.request.fetch_follower.time.99percentile | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.partition.count | kafka.replication.partition_count | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.max.lag | kafka.replication.max_lag | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.controller.active.count | kafka.replication.active_controller_count | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.unclean.election.rate | kafka.replication.unclean_leader_elections.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.request.queue | kafka.request.channel.queue.size | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | |
| kafka.logs.flush.time.count | kafka.log.flush_rate.rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka} | Calcula la tasa por segundo y la presenta como gauge |
| kafka.consumer.bytes-consumed-rate | kafka.consumer.bytes_consumed | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-consumer} | |
| kafka.consumer.records-consumed-rate | kafka.consumer.records_consumed | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-consumer} | |
| otel.kafka.consumer.fetch-size-avg | kafka.consumer.fetch_size_avg | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-consumer} | |
| otel.kafka.producer.compression-rate | kafka.producer.compression-rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| otel.kafka.producer.record-error-rate | kafka.producer.record_error_rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| otel.kafka.producer.record-retry-rate | kafka.producer.record_retry_rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| otel.kafka.producer.record-send-rate | kafka.producer.record_send_rate | Receptor JMX/Recopilador de métricas de JMX {target_system:kafka-producer} | |
| kafka.partition.current_offset | kafka.broker_offset | kafkametricsreceiver | |
| kafka.consumer_group.lag | kafka.consumer_lag | kafkametricsreceiver
| kafka.consumer_group.offset | kafka.consumer_offset | kafkametricsreceiver
| jvm.gc.collections.count{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_count | Receptor JMX/Recopilador de métricas de JMX {target_system:jvm} | Calcula la tasa por segundo y la presenta como gauge |
| jvm.gc.maj&&_collection_count{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.maj&&_collection_count | Receptor JMX/Recopilador de métricas de JMX {target_system:jvm} | Calcula la tasa por segundo y la presenta como gauge |
| jvm.gc.collections.elapsed{name:Copy && name:PS Scavenge && name:ParNew && name:G1 Young Generation} | jvm.gc.min&&_collection_time | Receptor JMX/Recopilador de métricas de JMX {target_system:jvm} | Calcula la tasa por segundo y la presenta como gauge |
| jvm.gc.collections.elapsed{name:MarkSweepCompact && name:PS MarkSweep &&name:ConcurrentMarkSweep &&name:G1 Mixed Generation && G1 Old Generation && Shenandoah Cycles && ZGC} | jvm.gc.major_collection_time | Receptor JMX/Recopilador de métricas de JMX {target_system:jvm} | Calcula la tasa por segundo y la presenta como gauge

**Nota:** En Datadog `-` se traduce como `_`. Para las métricas que incluyen el prefijo `otel.`, esto significa que el nombre de métrica de OTel y el nombre de métrica de Datadog son el mismo (por ejemplo, `kafka.producer.request-rate` y `kafka.producer.request_rate`). Para evitar el recuento doble de estas métricas, la métrica de OTel tiene el prefijo `otel.`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver
[2]: /es/opentelemetry/otel_collector_datadog_exporter/
[3]: /es/universal_service_monitoring/setup/
[4]: /es/opentelemetry/guide/semantic_mapping/
[5]: https://app.datadoghq.com/infrastructure/map?fillby=avg%3Acpuutilization&groupby=availability-zone
[6]: https://app.datadoghq.com/infrastructure
[7]: /es/opentelemetry/collector_exporter/#out-of-the-box-dashboards
[8]: /es/tracing/trace_explorer/trace_view/?tab=hostinfo
[9]: /es/opentelemetry/otel_collector_datadog_exporter/?tab=onahost#containers-overview-dashboard
[10]: /es/tracing/trace_explorer/trace_view/