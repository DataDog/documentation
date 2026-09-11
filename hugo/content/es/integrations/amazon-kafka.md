---
aliases:
- /es/integrations/amazon_msk
app_id: amazon-kafka
categories:
- aws
custom_kind: integración
description: Monitoriza el estado y el rendimiento de tus clústeres Amazon MSK.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-msk/
  tag: blog
  text: Monitorizar Amazon Managed Streaming para Apache Kafka con Datadog
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Amazon MSK (Agent)
---
## Información general

Amazon Managed Streaming para Apache Kafka (MSK) es un servicio totalmente gestionado que facilita la creación y ejecución de aplicaciones que utilizan Apache Kafka para procesar datos de streaming.

Puedes recopilar las métricas de esta integración de dos formas: con el [Datadog Agent](#setup) o con un [Crawler](https://docs.datadoghq.com/integrations/amazon_msk) que recopila las métricas de CloudWatch.

Considera [Data Streams Monitoring](https://docs.datadoghq.com/data_streams/) para mejorar tu integración de MSK. Esta solución permite la visualización del pipeline y el seguimiento de retrasos, ayudándote a identificar y resolver cuellos de botella.

## Configuración

El check del Agent monitoriza Amazon Managed Streaming para Apache Kafka ([Amazon MSK](https://aws.amazon.com/msk)) a través del Datadog Agent.

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

Esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: true) y un modo heredado (`use_openmetrics`: false). Para obtener todas las características más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas para integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

### Instalación

1. [Crea una máquina de cliente](https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html) si aún no existe.
1. Asegúrate de que la máquina de cliente tiene [concedida](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role) la política de permisos [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess](https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess) o [credenciales] equivalentes (https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials) disponibles.
1. Activa la [monitorización abierta con Prometheus](https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html) en el lado de MSK para activar el JmxExporter y el NodeExporter.
1. Instala el [Datadog Agent](https://docs.datadoghq.com/agent/) en la máquina de cliente que se acaba de crear.

### Configuración

1. Edita el archivo `amazon_msk.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de Amazon MSK.

   Incluye [etiquetas] personalizadas (https://docs.datadoghq.com/getting_started/tagging/) que se adjuntan a cada métrica y check de servicio proporcionado por esta integración.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   Consulta el [amazon_msk.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles para el modo más reciente. Para el modo heredado de esta integración, consulta el [ejemplo heredado](https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example).

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `amazon_msk` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.msk.go.gc.duration.seconds.count** <br>(count) | Recuento de duraciones de invocación GC. Se trata de un recuento en OpenMetricsV2 y un gauge en OpenMetricsV1.|
| **aws.msk.go.gc.duration.seconds.quantile** <br>(gauge) | Cuantil de duración de la invocación GC.<br>_Se muestra como segundo_ |
| **aws.msk.go.gc.duration.seconds.sum** <br>(count) | Duración total de la invocación GC. Esto es un recuento en OpenMetricsV2 y un gauge en OpenMetricsV1.<br>_Se muestra como segundo_ |
| **aws.msk.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente.<br>_Se muestra como subproceso_ |
| **aws.msk.go.info** <br>(gauge) | Información sobre el entorno de Go.|
| **aws.msk.go.memstats.alloc.bytes** <br>(gauge) | Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.alloc.bytes.count** <br>(count) | \[OpenMetricsV2\] Número total de bytes asignados, incluso liberados.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.alloc.bytes.total** <br>(count) | \[OpenMetricsV1\] Número total de bytes asignados, incluso liberados.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.buck.hash.sys.bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.frees.count** <br>(count) | \[OpenMetricsV2\] Número total de liberados.|
| **aws.msk.go.memstats.frees.total** <br>(count) | Número total de liberados.|
| **aws.msk.go.memstats.gc.cpu.fraction** <br>(gauge) | La fracción del tiempo de CPU disponible de este programa utilizado por la GC desde que se inició el programa.|
| **aws.msk.go.memstats.gc.sys.bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.heap.alloc.bytes** <br>(gauge) | Número de bytes de heap asignados y aún en uso.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.heap.idle.bytes** <br>(gauge) | Número de bytes de heap en espera de ser utilizados.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.heap.inuse.bytes** <br>(gauge) | Número de bytes de heap que están en uso.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.heap.objects** <br>(gauge) | Número de objetos asignados.|
| **aws.msk.go.memstats.heap.released.bytes** <br>(gauge) | Número de bytes de heap liberados al SO.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.heap.sys.bytes** <br>(gauge) | Número de bytes de heap obtenidos del sistema.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.last.gc.time.seconds** <br>(gauge) | Número de segundos transcurridos desde 1970 de la última recopilación de elementos no usados.<br>_Se muestra como segundo_ |
| **aws.msk.go.memstats.lookups.count** <br>(count) | \[OpenMetricsV2\] Número total de búsquedas de punteros.|
| **aws.msk.go.memstats.lookups.total** <br>(count) | \[OpenMetricsV1\] Número total de búsquedas de punteros.|
| **aws.msk.go.memstats.mallocs.count** <br>(count) | \[OpenMetricsV2\] Número total de mallocs.|
| **aws.msk.go.memstats.mallocs.total** <br>(count) | \[OpenMetricsV1\] Número total de mallocs.|
| **aws.msk.go.memstats.mcache.inuse.bytes** <br>(gauge) | Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.mcache.sys.bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.mspan.inuse.bytes** <br>(gauge) | Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.mspan.sys.bytes** <br>(gauge) | Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.next.gc.bytes** <br>(gauge) | Número de bytes de heap en que se realizará la próxima recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.other.sys.bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.stack.inuse.bytes** <br>(gauge) | Número de bytes en uso por el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.stack.sys.bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **aws.msk.go.memstats.sys.bytes** <br>(gauge) | Número de bytes obtenidos del sistema.<br>_Se muestra como byte_ |
| **aws.msk.go.threads** <br>(gauge) | Número de subprocesos de SO creados.<br>_Se muestra como subproceso_ |
| **aws.msk.jmx.config.reload.failure.count** <br>(count) | \[OpenMetricsV2\] Número de veces que ha fallado la recarga de la configuración.|
| **aws.msk.jmx.config.reload.failure.total** <br>(count) | \[OpenMetricsV1\] Número de veces que ha fallado la recarga de la configuración.|
| **aws.msk.jmx.config.reload.success.count** <br>(count) | \[OpenMetricsV2\] Número de veces que la configuración se ha recargado correctamente.|
| **aws.msk.jmx.config.reload.success.total** <br>(count) | \[OpenMetricsV1\] Número de veces que la configuración se ha recargado correctamente.|
| **aws.msk.jmx.exporter.build.info** <br>(gauge) | Una métrica con un valor constante '1' etiquetada con la versión del exportador JMX.|
| **aws.msk.jmx.scrape.duration.seconds** <br>(gauge) | Tiempo que tardó este scrape JMX, en segundos.<br>_Se muestra como segundo_ |
| **aws.msk.jmx.scrape.error** <br>(gauge) | No es cero si la búsqueda falló.|
| **aws.msk.kafka.cluster.Partition.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.cluster\<type=Partition, name=InSyncReplicasCount, topic=test-topic-15, partition=70><>Value)|
| **aws.msk.kafka.consumer.group.ConsumerLagMetrics.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.consumer.group\<type=ConsumerLagMetrics, name=EstimatedTimeLag, groupId=test-group, partition=1, topic=test-topic>\<>Value)|
| **aws.msk.kafka.controller.ControllerChannelManager.50thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>50thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.75thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>75thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.95thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>95thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.98thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>98thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.999thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>999thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.99thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>99thPercentile)|
| **aws.msk.kafka.controller.ControllerChannelManager.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>Count)|
| **aws.msk.kafka.controller.ControllerChannelManager.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>Count) como recuento monotónico|
| **aws.msk.kafka.controller.ControllerChannelManager.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>FifteenMinuteRate)|
| **aws.msk.kafka.controller.ControllerChannelManager.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>FiveMinuteRate)|
| **aws.msk.kafka.controller.ControllerChannelManager.Max** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>Max)|
| **aws.msk.kafka.controller.ControllerChannelManager.Mean** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>Mean)|
| **aws.msk.kafka.controller.ControllerChannelManager.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>MeanRate)|
| **aws.msk.kafka.controller.ControllerChannelManager.Min** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>Min)|
| **aws.msk.kafka.controller.ControllerChannelManager.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>OneMinuteRate)|
| **aws.msk.kafka.controller.ControllerChannelManager.StdDev** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=RequestRateAndQueueTimeMs, broker-id=1>\<>StdDev)|
| **aws.msk.kafka.controller.ControllerChannelManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerChannelManager, name=TotalQueueSize>\<>Value)|
| **aws.msk.kafka.controller.ControllerEventManager.50thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>50thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.75thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>75thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.95thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>95thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.98thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>98thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.999thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>999thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.99thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>99thPercentile)|
| **aws.msk.kafka.controller.ControllerEventManager.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>Count)|
| **aws.msk.kafka.controller.ControllerEventManager.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>Count) como recuento monotónico|
| **aws.msk.kafka.controller.ControllerEventManager.Max** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>Max)|
| **aws.msk.kafka.controller.ControllerEventManager.Mean** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>Mean)|
| **aws.msk.kafka.controller.ControllerEventManager.Min** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>Min)|
| **aws.msk.kafka.controller.ControllerEventManager.StdDev** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueTimeMs>\<>StdDev)|
| **aws.msk.kafka.controller.ControllerEventManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerEventManager, name=EventQueueSize>\<>Value)|
| **aws.msk.kafka.controller.ControllerStats.50thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>50thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.75thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>75thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.95thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>95thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.98thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>98thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.999thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>999thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.99thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>99thPercentile)|
| **aws.msk.kafka.controller.ControllerStats.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>Count)|
| **aws.msk.kafka.controller.ControllerStats.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>Count) como recuento monotónico|
| **aws.msk.kafka.controller.ControllerStats.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>FifteenMinuteRate)|
| **aws.msk.kafka.controller.ControllerStats.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>FiveMinuteRate)|
| **aws.msk.kafka.controller.ControllerStats.Max** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>Max)|
| **aws.msk.kafka.controller.ControllerStats.Mean** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>Mean)|
| **aws.msk.kafka.controller.ControllerStats.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>MeanRate)|
| **aws.msk.kafka.controller.ControllerStats.Min** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>Min)|
| **aws.msk.kafka.controller.ControllerStats.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>OneMinuteRate)|
| **aws.msk.kafka.controller.ControllerStats.StdDev** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=ControllerStats, name=ControlledShutdownRateAndTimeMs>\<>StdDev)|
| **aws.msk.kafka.controller.KafkaController.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.controller\<type=KafkaController, name=GlobalPartitionCount>\<>Value)|
| **aws.msk.kafka.coordinator.group.GroupMetadataManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.coordinator.group\<type=GroupMetadataManager, name=NumGroupsDead>\<>Value)|
| **aws.msk.kafka.coordinator.transaction.TransactionMarkerChannelManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.coordinator.transaction\<type=TransactionMarkerChannelManager, name=LogAppendRetryQueueSize>\<>Value)|
| **aws.msk.kafka.log.Log.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.log\<type=log, name=LogStartOffset, topic=test-topic-5, partition=22><>Value)|
| **aws.msk.kafka.log.LogCleaner.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.log\<type=LogCleaner, name=cleaner-recopy-percent>\<>Value)|
| **aws.msk.kafka.log.LogCleanerManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.log\<type=LogCleanerManager, name=max-dirty-percent>\<>Value)|
| **aws.msk.kafka.log.LogManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.log\<type=LogManager, name=OfflineLogDirectoryCount>\<>Value)|
| **aws.msk.kafka.network.Acceptor.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>Count)|
| **aws.msk.kafka.network.Acceptor.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>Count) como recuento monotónico|
| **aws.msk.kafka.network.Acceptor.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>FifteenMinuteRate)|
| **aws.msk.kafka.network.Acceptor.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>FiveMinuteRate)|
| **aws.msk.kafka.network.Acceptor.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>MeanRate)|
| **aws.msk.kafka.network.Acceptor.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Acceptor, name=AcceptorBlockedPercent, listener=CLIENT>\<>OneMinuteRate)|
| **aws.msk.kafka.network.Processor.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=Processor, name=IdlePercent, networkProcessor=8>\<>Value)|
| **aws.msk.kafka.network.RequestChannel.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestChannel, name=ResponseQueueSize, processor=8>\<>Value)|
| **aws.msk.kafka.network.RequestMetrics.50thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>50thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.75thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>75thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.95thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>95thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.98thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>98thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.999thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>999thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.99thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>99thPercentile)|
| **aws.msk.kafka.network.RequestMetrics.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>Count)|
| **aws.msk.kafka.network.RequestMetrics.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>Count) como recuento monotónico|
| **aws.msk.kafka.network.RequestMetrics.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ErrorsPerSec, request=UpdateMetadata, error=NONE>\<>FifteenMinuteRate)|
| **aws.msk.kafka.network.RequestMetrics.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ErrorsPerSec, request=UpdateMetadata, error=NONE>\<>FiveMinuteRate)|
| **aws.msk.kafka.network.RequestMetrics.Max** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>Max)|
| **aws.msk.kafka.network.RequestMetrics.Mean** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>Mean)|
| **aws.msk.kafka.network.RequestMetrics.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ErrorsPerSec, request=UpdateMetadata, error=NONE>\<>MeanRate)|
| **aws.msk.kafka.network.RequestMetrics.Min** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>Min)|
| **aws.msk.kafka.network.RequestMetrics.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ErrorsPerSec, request=UpdateMetadata, error=NONE>\<>OneMinuteRate)|
| **aws.msk.kafka.network.RequestMetrics.StdDev** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=RequestMetrics, name=ResponseQueueTimeMs, request=ListGroups>\<>StdDev)|
| **aws.msk.kafka.network.SocketServer.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.network\<type=SocketServer, name=ExpiredConnectionsKilledCount>\<>Value)|
| **aws.msk.kafka.network.request.ErrorsPerSec** <br>(gauge) | <br>_Se muestra como error_ |
| **aws.msk.kafka.network.request.ErrorsPerSec.count** <br>(count) | recuento de la versión de aws.msk.kafka.network.request.ErrorsPerSec<br>_Se muestra como error_ |
| **aws.msk.kafka.network.request.LocalTimeMs** <br>(gauge) | <br>_Se muestra como milisegundos_ |
| **aws.msk.kafka.network.request.LocalTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.LocalTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.MessageConversionsTimeMs** <br>(gauge) | <br>_Se muestra como milisegundos_ |
| **aws.msk.kafka.network.request.MessageConversionsTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.MessageConversionsTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.RemoteTimeMs** <br>(gauge) | <br>_Se muestra como milisegundos_ |
| **aws.msk.kafka.network.request.RemoteTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.RemoteTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.RequestBytes** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.network.request.RequestBytes.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.RequestBytes<br>_Se muestra como byte_ |
| **aws.msk.kafka.network.request.RequestQueueTimeMs** <br>(gauge) | <br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.RequestQueueTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.RequestQueueTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.RequestsPerSec** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **aws.msk.kafka.network.request.RequestsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.RequestsPerSec<br>_Se muestra como solicitud_ |
| **aws.msk.kafka.network.request.ResponseQueueTimeMs** <br>(gauge) | <br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.ResponseQueueTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.ResponseQueueTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.ResponseSendTimeMs** <br>(gauge) | <br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.ResponseSendTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.ResponseSendTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.TemporaryMemoryBytes** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.network.request.TemporaryMemoryBytes.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.TemporaryMemoryBytes<br>_Se muestra como byte_ |
| **aws.msk.kafka.network.request.ThrottleTimeMs** <br>(gauge) | <br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.ThrottleTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.ThrottleTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.TotalTimeMs** <br>(gauge) | <br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.network.request.TotalTimeMs.count** <br>(count) | recuento de versión de aws.msk.kafka.network.request.TotalTimeMs<br>_Se muestra como milisegundo_ |
| **aws.msk.kafka.security.SimpleAclAuthorizer.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>Count)|
| **aws.msk.kafka.security.SimpleAclAuthorizer.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>Count) como recuento monotónico|
| **aws.msk.kafka.security.SimpleAclAuthorizer.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>FifteenMinuteRate)|
| **aws.msk.kafka.security.SimpleAclAuthorizer.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>FiveMinuteRate)|
| **aws.msk.kafka.security.SimpleAclAuthorizer.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>MeanRate)|
| **aws.msk.kafka.security.SimpleAclAuthorizer.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.security\<type=SimpleAclAuthorizer, name=ZooKeeperExpiresPerSec>\<>OneMinuteRate)|
| **aws.msk.kafka.server.BrokerTopicMetrics.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>Count)|
| **aws.msk.kafka.server.BrokerTopicMetrics.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.BrokerTopicMetrics.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.BrokerTopicMetrics.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.BrokerTopicMetrics.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>MeanRate)|
| **aws.msk.kafka.server.BrokerTopicMetrics.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=BrokerTopicMetrics, name=BytesInPerSec>\<>OneMinuteRate)|
| **aws.msk.kafka.server.DelayedFetchMetrics.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>Count)|
| **aws.msk.kafka.server.DelayedFetchMetrics.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.DelayedFetchMetrics.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.DelayedFetchMetrics.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.DelayedFetchMetrics.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>MeanRate)|
| **aws.msk.kafka.server.DelayedFetchMetrics.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedFetchMetrics, name=ExpiresPerSec, fetcherType=consumer>\<>OneMinuteRate)|
| **aws.msk.kafka.server.DelayedOperationPurgatory.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=DelayedOperationPurgatory, name=PurgatorySize, delayedOperation=topic>\<>Value)|
| **aws.msk.kafka.server.Fetch.queue.size** <br>(gauge) | Registra el tamaño de la cola de espera (kafka.server\<type=Fetch>\<>queue-size)|
| **aws.msk.kafka.server.FetchSessionCache.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>Count)|
| **aws.msk.kafka.server.FetchSessionCache.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.FetchSessionCache.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.FetchSessionCache.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.FetchSessionCache.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>MeanRate)|
| **aws.msk.kafka.server.FetchSessionCache.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=IncrementalFetchSessionEvictionsPerSec>\<>OneMinuteRate)|
| **aws.msk.kafka.server.FetchSessionCache.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetchSessionCache, name=NumIncrementalFetchPartitionsCached>\<>Value)|
| **aws.msk.kafka.server.FetcherLagMetrics.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherLagMetrics, name=ConsumerLag, clientId=ReplicaFetcherThread-1-3, topic=test-topic-13, partition=38>\<>Value)|
| **aws.msk.kafka.server.FetcherStats.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>Count)|
| **aws.msk.kafka.server.FetcherStats.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.FetcherStats.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.FetcherStats.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.FetcherStats.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>MeanRate)|
| **aws.msk.kafka.server.FetcherStats.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=FetcherStats, name=RequestsPerSec, clientId=ReplicaFetcherThread-1-3, brokerHost=b-3-internal.kafka111cluster-vpc1-4.8fhm2b.c1.kafka.us-east-1.hnahas.net, brokerPort=9093>\<>OneMinuteRate)|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>Count)|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>MeanRate)|
| **aws.msk.kafka.server.KafkaRequestHandlerPool.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaRequestHandlerPool, name=RequestHandlerAvgIdlePercent>\<>OneMinuteRate)|
| **aws.msk.kafka.server.KafkaServer.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=KafkaServer, name=BrokerState>\<>Value)|
| **aws.msk.kafka.server.LeaderReplication.byte.rate** <br>(gauge) | Registra la tasa de bytes para LeaderReplication (kafka.server\<type=LeaderReplication>\<>byte-rate)|
| **aws.msk.kafka.server.Produce.queue.size** <br>(gauge) | Registra el tamaño de la cola de espera (kafka.server\<type=Produce>\<>queue-size)|
| **aws.msk.kafka.server.ReplicaAlterLogDirsManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaAlterLogDirsManager, name=MaxLag, clientId=ReplicaAlterLogDirs>\<>Value)|
| **aws.msk.kafka.server.ReplicaFetcherManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaFetcherManager, name=MinFetchRate, clientId=Replica>\<>Value)|
| **aws.msk.kafka.server.ReplicaManager.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>Count)|
| **aws.msk.kafka.server.ReplicaManager.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.ReplicaManager.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.ReplicaManager.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.ReplicaManager.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>MeanRate)|
| **aws.msk.kafka.server.ReplicaManager.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=IsrShrinksPerSec>\<>OneMinuteRate)|
| **aws.msk.kafka.server.ReplicaManager.Value** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=OfflineReplicaCount>\<>Value)|
| **aws.msk.kafka.server.ReplicaManager.Value.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=ReplicaManager, name=OfflineReplicaCount>\<>Value) como recuento monotónico|
| **aws.msk.kafka.server.Request.queue.size** <br>(gauge) | Registra el tamaño de la cola de espera (kafka.server\<type=Request>\<>queue-size)|
| **aws.msk.kafka.server.SessionExpireListener.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>Count)|
| **aws.msk.kafka.server.SessionExpireListener.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.SessionExpireListener.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>FifteenMinuteRate)|
| **aws.msk.kafka.server.SessionExpireListener.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>FiveMinuteRate)|
| **aws.msk.kafka.server.SessionExpireListener.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>MeanRate)|
| **aws.msk.kafka.server.SessionExpireListener.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=SessionExpireListener, name=ZooKeeperSaslAuthenticationsPerSec>\<>OneMinuteRate)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.50thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>50thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.75thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>75thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.95thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>95thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.98thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>98thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.999thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>999thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.99thPercentile** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>99thPercentile)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>Count)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>Count) como recuento monotónico|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.Max** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>Max)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.Mean** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>Mean)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.Min** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>Min)|
| **aws.msk.kafka.server.ZooKeeperClientMetrics.StdDev** <br>(gauge) | Atributo expuesto para la gestión (kafka.server\<type=ZooKeeperClientMetrics, name=ZooKeeperRequestLatencyMs>\<>StdDev)|
| **aws.msk.kafka.server.broker_topics.BytesInPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.BytesInPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.BytesInPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.BytesOutPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.BytesOutPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.BytesOutPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.BytesRejectedPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.BytesRejectedPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.BytesRejectedPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.FailedFetchRequestsPerSec** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **aws.msk.kafka.server.broker_topics.FailedFetchRequestsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.FailedFetchRequestsPerSec<br>_Se muestra como solicitud_ |
| **aws.msk.kafka.server.broker_topics.FailedProduceRequestsPerSec** <br>(gauge) | <br>_Se muestra como solicitud_ |
| **aws.msk.kafka.server.broker_topics.FailedProduceRequestsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.FailedProduceRequestsPerSec<br>_Se muestra como solicitud_ |
| **aws.msk.kafka.server.broker_topics.FetchMessageConversionsPerSec** <br>(gauge) | |
| **aws.msk.kafka.server.broker_topics.FetchMessageConversionsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.FetchMessageConversionsPerSec|
| **aws.msk.kafka.server.broker_topics.MessagesInPerSec** <br>(gauge) | <br>_Se muestra como mensaje_ |
| **aws.msk.kafka.server.broker_topics.MessagesInPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.MessagesInPerSec<br>_Se muestra como mensaje_ |
| **aws.msk.kafka.server.broker_topics.ProduceMessageConversionsPerSec** <br>(gauge) | |
| **aws.msk.kafka.server.broker_topics.ProduceMessageConversionsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.ProduceMessageConversionsPerSec|
| **aws.msk.kafka.server.broker_topics.ReplicationBytesInPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.ReplicationBytesInPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.ReplicationBytesInPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.ReplicationBytesOutPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.ReplicationBytesOutPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.ReplicationBytesOutPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.TotalFetchRequestsPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.TotalFetchRequestsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.TotalFetchRequestsPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.TotalProduceRequestsPerSec** <br>(gauge) | <br>_Se muestra como byte_ |
| **aws.msk.kafka.server.broker_topics.TotalProduceRequestsPerSec.count** <br>(count) | recuento de versión de aws.msk.kafka.server.broker_topics.TotalProduceRequestsPerSec<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.controller.channel.metrics.connection.close.rate** <br>(gauge) | El número de conexiones cerradas por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>connection-close-rate)<br>_Se muestra como conexión_ |
| **aws.msk.kafka.server.controller.channel.metrics.connection.close.total** <br>(gauge) | El número total de conexiones cerradas (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>connection-close-total)<br>_Se muestra como conexión_ |
| **aws.msk.kafka.server.controller.channel.metrics.connection.count** <br>(gauge) | El número actual de conexiones activas. (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>connection-count)<br>_Se muestra como conexión_ |
| **aws.msk.kafka.server.controller.channel.metrics.connection.creation.rate** <br>(gauge) | El número de nuevas conexiones establecidas por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>connection-creation-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.connection.creation.total** <br>(gauge) | El número total de nuevas conexiones establecidas (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>connection-creation-total)|
| **aws.msk.kafka.server.controller.channel.metrics.failed.authentication.rate** <br>(gauge) | El número de conexiones con autenticación fallida por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>failed-authentication-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.failed.authentication.total** <br>(gauge) | El número total de conexiones con autenticación fallida (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>failed-authentication-total)|
| **aws.msk.kafka.server.controller.channel.metrics.failed.reauthentication.rate** <br>(gauge) | El número de reautenticación fallida de conexiones por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>failed-reauthentication-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.failed.reauthentication.total** <br>(gauge) | El número total de reautenticación fallida de conexiones (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>failed-reauthentication-total)|
| **aws.msk.kafka.server.controller.channel.metrics.incoming.byte.rate** <br>(gauge) | El número de bytes leídos de todos los sockets por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>incoming-byte-rate)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.controller.channel.metrics.incoming.byte.total** <br>(gauge) | El número total de bytes leídos de todos los sockets (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>incoming-byte-total)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.controller.channel.metrics.io.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>io-ratio)|
| **aws.msk.kafka.server.controller.channel.metrics.io.time.ns.avg** <br>(gauge) | La duración media del tiempo de E/S por llamada a select en nanosegundos. (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>io-time-ns-avg)|
| **aws.msk.kafka.server.controller.channel.metrics.io.wait.ratio** <br>(gauge) | La fracción de tiempo que el subproceo de E/S pasó esperando (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>io-wait-ratio)|
| **aws.msk.kafka.server.controller.channel.metrics.io.wait.time.ns.avg** <br>(gauge) | La duración media del tiempo que el subproceso de E/S pasó esperando un socket listo para lecturas o escrituras en nanosegundos. (kafka.server<type=controller-channel-metrics, broker-id=3>\<>io-wait-time-ns-avg)|
| **aws.msk.kafka.server.controller.channel.metrics.io.waittime.total** <br>(gauge) | El tiempo total de espera del subproceso de E/S (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>io-waittime-total)|
| **aws.msk.kafka.server.controller.channel.metrics.iotime.total** <br>(gauge) | El tiempo total que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>iotime-total)|
| **aws.msk.kafka.server.controller.channel.metrics.network.io.rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>network-io-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.network.io.total** <br>(gauge) | El número total de operaciones de red (lecturas o escrituras) en todas las conexiones (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>network-io-total)|
| **aws.msk.kafka.server.controller.channel.metrics.outgoing.byte.rate** <br>(gauge) | El número de bytes salientes enviados a todos los servidores por segundo (kafka.server<type=controller-channel-metrics, broker-id=3>\<>outgoing-byte-rate)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.controller.channel.metrics.outgoing.byte.total** <br>(gauge) | El número total de bytes salientes enviados a todos los servidores (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>outgoing-byte-total)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.controller.channel.metrics.reauthentication.latency.avg** <br>(gauge) | La latencia media observada debido a la reautenticación (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>reauthentication-latency-avg)|
| **aws.msk.kafka.server.controller.channel.metrics.reauthentication.latency.max** <br>(gauge) | La latencia máxima observada debido a la reautenticación (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>reauthentication-latency-max)|
| **aws.msk.kafka.server.controller.channel.metrics.request.rate** <br>(gauge) | El número de solicitudes enviadas por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>request-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.request.size.avg** <br>(gauge) | El tamaño medio de las solicitudes enviadas. (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>request-size-avg)|
| **aws.msk.kafka.server.controller.channel.metrics.request.size.max** <br>(gauge) | El tamaño máximo de cualquier solicitud enviada. (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>request-size-max)|
| **aws.msk.kafka.server.controller.channel.metrics.request.total** <br>(gauge) | El número total de solicitudes enviadas (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>request-total)|
| **aws.msk.kafka.server.controller.channel.metrics.response.rate** <br>(gauge) | El número de respuestas recibidas por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>response-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.response.total** <br>(gauge) | El número total de respuestas recibidas (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>response-total)|
| **aws.msk.kafka.server.controller.channel.metrics.select.rate** <br>(gauge) | El número de veces que la capa de E/S comprueba si hay nuevas E/S que realizar por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>select-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.select.total** <br>(gauge) | El número total de veces que la capa de E/S comprobó si había nuevas E/S que realizar (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>select-total)|
| **aws.msk.kafka.server.controller.channel.metrics.successful.authentication.no.reauth.total** <br>(gauge) | El número total de conexiones con autenticación correcta en las que el cliente no admite la reautenticación (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>successful-authentication-no-reauth-total)|
| **aws.msk.kafka.server.controller.channel.metrics.successful.authentication.rate** <br>(gauge) | El número de conexiones con autenticación correcta por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>successful-authentication-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.successful.authentication.total** <br>(gauge) | El número total de conexiones con autenticación correcta (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>successful-authentication-total)|
| **aws.msk.kafka.server.controller.channel.metrics.successful.reauthentication.rate** <br>(gauge) | Número de conexiones reautenticadas con éxito por segundo (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>successful-reauthentication-rate)|
| **aws.msk.kafka.server.controller.channel.metrics.successful.reauthentication.total** <br>(gauge) | El número total de reautenticación exitosa de conexiones (kafka.server\<type=controller-channel-metrics, broker-id=3>\<>successful-reauthentication-total)|
| **aws.msk.kafka.server.kafka.metrics.count.count** <br>(gauge) | número total de métricas registradas (kafka.server\<type=kafka-metrics-count>\<>count)|
| **aws.msk.kafka.server.replica.fetcher.metrics.connection.close.rate** <br>(gauge) | El número de conexiones cerradas por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>connection-close-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.connection.close.total** <br>(gauge) | El número total de conexiones cerradas (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>connection-close-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.connection.count** <br>(gauge) | El número actual de conexiones activas. (kafka.server<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>connection-count)|
| **aws.msk.kafka.server.replica.fetcher.metrics.connection.creation.rate** <br>(gauge) | El número de nuevas conexiones establecidas por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>connection-creation-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.connection.creation.total** <br>(gauge) | El número total de nuevas conexiones establecidas (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>connection-creation-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.failed.authentication.rate** <br>(gauge) | El número de conexiones con autenticación fallida por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>failed-authentication-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.failed.authentication.total** <br>(gauge) | El número total de conexiones con autenticación fallida (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>failed-authentication-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.incoming.byte.rate** <br>(gauge) | El número de bytes leídos de todos los sockets por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>incoming-byte-rate)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.replica.fetcher.metrics.incoming.byte.total** <br>(gauge) | El número total de bytes leídos de todos los sockets (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>incoming-byte-total)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.replica.fetcher.metrics.io.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>io-ratio)|
| **aws.msk.kafka.server.replica.fetcher.metrics.io.time.ns.avg** <br>(gauge) | La duración media del tiempo de E/S por llamada a select en nanosegundos. (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>io-time-ns-avg)|
| **aws.msk.kafka.server.replica.fetcher.metrics.io.wait.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó esperando (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>io-wait-ratio)|
| **aws.msk.kafka.server.replica.fetcher.metrics.io.wait.time.ns.avg** <br>(gauge) | La duración media del tiempo que el subproceso de E/S pasó esperando un socket listo para lecturas o escrituras en nanosegundos. (kafka.server<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>io-wait-time-ns-avg)|
| **aws.msk.kafka.server.replica.fetcher.metrics.io.waittime.total** <br>(gauge) | El tiempo total de espera del subproceso de E/S (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>io-waittime-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.iotime.total** <br>(gauge) | El tiempo total que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>iotime-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.network.io.rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>network-io-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.network.io.total** <br>(gauge) | El número total de operaciones de red (lecturas o escrituras) en todas las conexiones (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>network-io-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.outgoing.byte.rate** <br>(gauge) | El número de bytes salientes enviados a todos los servidores por segundo (kafka.server<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>outgoing-byte-rate)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.replica.fetcher.metrics.outgoing.byte.total** <br>(gauge) | El número total de bytes salientes enviados a todos los servidores (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>outgoing-byte-total)<br>_Se muestra como byte_ |
| **aws.msk.kafka.server.replica.fetcher.metrics.request.rate** <br>(gauge) | Número de solicitudes enviadas por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>request-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.request.size.avg** <br>(gauge) | El tamaño medio de las solicitudes enviadas. (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>request-size-avg)|
| **aws.msk.kafka.server.replica.fetcher.metrics.request.size.max** <br>(gauge) | El tamaño máximo de cualquier solicitud enviada. (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>request-size-max)|
| **aws.msk.kafka.server.replica.fetcher.metrics.request.total** <br>(gauge) | El número total de solicitudes enviadas (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>request-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.response.rate** <br>(gauge) | El número de respuestas recibidas por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>response-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.response.total** <br>(gauge) | El número total de respuestas recibidas (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>response-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.select.rate** <br>(gauge) | El número de veces que la capa de E/S comprueba si hay nuevas E/S que realizar por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>select-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.select.total** <br>(gauge) | El número total de veces que la capa de E/S comprobó si había nuevas E/S que realizar (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>select-total)|
| **aws.msk.kafka.server.replica.fetcher.metrics.successful.authentication.rate** <br>(gauge) | El número de conexiones con autenticación correcta por segundo (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>successful-authentication-rate)|
| **aws.msk.kafka.server.replica.fetcher.metrics.successful.authentication.total** <br>(gauge) | El número total de conexiones con autenticación correcta (kafka.server\<type=replica-fetcher-metrics, broker-id=2, fetcher-id=0>\<>successful-authentication-total)|
| **aws.msk.kafka.server.replica_manager.LeaderCount** <br>(gauge) | |
| **aws.msk.kafka.server.replica_manager.LeaderCount.count** <br>(count) | recuento de versión de aws.msk.kafka.server.replica_manager.LeaderCount|
| **aws.msk.kafka.server.replica_manager.OfflineReplicaCount** <br>(gauge) | |
| **aws.msk.kafka.server.replica_manager.OfflineReplicaCount.count** <br>(count) | recuento de versión de aws.msk.kafka.server.replica_manager.OfflineReplicaCount|
| **aws.msk.kafka.server.replica_manager.PartitionCount** <br>(gauge) | |
| **aws.msk.kafka.server.replica_manager.PartitionCount.count** <br>(count) | recuento de versión de aws.msk.kafka.server.replica_manager.PartitionCount|
| **aws.msk.kafka.server.replica_manager.UnderMinIsrPartitionCount** <br>(gauge) | |
| **aws.msk.kafka.server.replica_manager.UnderMinIsrPartitionCount.count** <br>(count) | recuento de versión de aws.msk.kafka.server.replica_manager.UnderMinIsrPartitionCountcount version of aws.msk.kafka.server.replica_manager.UnderMinIsrPartitionCount|
| **aws.msk.kafka.server.replica_manager.UnderReplicatedPartitions** <br>(gauge) | |
| **aws.msk.kafka.server.replica_manager.UnderReplicatedPartitions.count** <br>(count) | recuento de versión de aws.msk.kafka.server.replica_manager.UnderReplicatedPartitions|
| **aws.msk.kafka.server.socket.server.metrics.MemoryPoolAvgDepletedPercent** <br>(gauge) | (kafka.server\<type=socket-server-metrics>\<>MemoryPoolAvgDepletedPercent)|
| **aws.msk.kafka.server.socket.server.metrics.MemoryPoolDepletedTimeTotal** <br>(gauge) | (kafka.server\<type=socket-server-metrics>\<>MemoryPoolDepletedTimeTotal)|
| **aws.msk.kafka.server.socket.server.metrics.connection.close.rate** <br>(gauge) | El número de conexiones cerradas por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>connection-close-rate)|
| **aws.msk.kafka.server.socket.server.metrics.connection.close.total** <br>(gauge) | El número total de conexiones cerradas (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>connection-close-total)|
| **aws.msk.kafka.server.socket.server.metrics.connection.count** <br>(gauge) | El número actual de conexiones activas. (kafka.server<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>connection-count)|
| **aws.msk.kafka.server.socket.server.metrics.connection.creation.rate** <br>(gauge) | El número de nuevas conexiones establecidas por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>connection-creation-rate)|
| **aws.msk.kafka.server.socket.server.metrics.connection.creation.total** <br>(gauge) | El número total de nuevas conexiones establecidas (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>connection-creation-total)|
| **aws.msk.kafka.server.socket.server.metrics.expired.connections.killed.count** <br>(gauge) | (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>expired-connections-killed-count)|
| **aws.msk.kafka.server.socket.server.metrics.failed.authentication.rate** <br>(gauge) | El número de conexiones con autenticación fallida por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>failed-authentication-rate)|
| **aws.msk.kafka.server.socket.server.metrics.failed.authentication.total** <br>(gauge) | El número total de conexiones con autenticación fallida (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>failed-authentication-total)|
| **aws.msk.kafka.server.socket.server.metrics.failed.reauthentication.rate** <br>(gauge) | El número de reautenticación fallida de conexiones por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>failed-reauthentication-rate)|
| **aws.msk.kafka.server.socket.server.metrics.failed.reauthentication.total** <br>(gauge) | El número total de reautenticación fallida de conexiones (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>failed-reauthentication-total)|
| **aws.msk.kafka.server.socket.server.metrics.incoming.byte.rate** <br>(gauge) | El número de bytes leídos de todos los sockets por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>incoming-byte-rate)|
| **aws.msk.kafka.server.socket.server.metrics.incoming.byte.total** <br>(gauge) | El número total de bytes leídos de todos los sockets (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>incoming-byte-total)|
| **aws.msk.kafka.server.socket.server.metrics.io.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>io-ratio)|
| **aws.msk.kafka.server.socket.server.metrics.io.time.ns.avg** <br>(gauge) | La duración media del tiempo de E/S por llamada a select en nanosegundos. (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>io-time-ns-avg)|
| **aws.msk.kafka.server.socket.server.metrics.io.wait.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó esperando (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>io-wait-ratio)|
| **aws.msk.kafka.server.socket.server.metrics.io.wait.time.ns.avg** <br>(gauge) | La duración media del tiempo que el subproceso de E/S pasó esperando un socket listo para lecturas o escrituras en nanosegundos. (kafka.server<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>io-wait-time-ns-avg)|
| **aws.msk.kafka.server.socket.server.metrics.io.waittime.total** <br>(gauge) | El tiempo total de espera del subproceso de E/S (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>io-waittime-total)|
| **aws.msk.kafka.server.socket.server.metrics.iotime.total** <br>(gauge) | El tiempo total que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>iotime-total)|
| **aws.msk.kafka.server.socket.server.metrics.network.io.rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>network-io-rate)|
| **aws.msk.kafka.server.socket.server.metrics.network.io.total** <br>(gauge) | El número total de operaciones de red (lecturas o escrituras) en todas las conexiones (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>network-io-total)|
| **aws.msk.kafka.server.socket.server.metrics.outgoing.byte.rate** <br>(gauge) | El número de bytes salientes enviados a todos los servidores por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>outgoing-byte-rate)|
| **aws.msk.kafka.server.socket.server.metrics.outgoing.byte.total** <br>(gauge) | El número total de bytes salientes enviados a todos los servidores (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>outgoing-byte-total)|
| **aws.msk.kafka.server.socket.server.metrics.reauthentication.latency.avg** <br>(gauge) | La latencia media observada debido a la reautenticación (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>reauthentication-latency-avg)|
| **aws.msk.kafka.server.socket.server.metrics.reauthentication.latency.max** <br>(gauge) | La latencia máxima observada debido a la reautenticación (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>reauthentication-latency-max)|
| **aws.msk.kafka.server.socket.server.metrics.request.rate** <br>(gauge) | Número de solicitudes enviadas por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>request-rate)|
| **aws.msk.kafka.server.socket.server.metrics.request.size.avg** <br>(gauge) | El tamaño medio de las solicitudes enviadas. (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>request-size-avg)|
| **aws.msk.kafka.server.socket.server.metrics.request.size.max** <br>(gauge) | El tamaño máximo de cualquier solicitud enviada. (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>request-size-max)|
| **aws.msk.kafka.server.socket.server.metrics.request.total** <br>(gauge) | El número total de solicitudes enviadas (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>request-total)|
| **aws.msk.kafka.server.socket.server.metrics.response.rate** <br>(gauge) | El número de respuestas recibidas por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>response-rate)|
| **aws.msk.kafka.server.socket.server.metrics.response.total** <br>(gauge) | El número total de respuestas recibidas (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>response-total)|
| **aws.msk.kafka.server.socket.server.metrics.select.rate** <br>(gauge) | El número de veces que la capa de E/S comprueba si hay nuevas E/S que realizar por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>select-rate)|
| **aws.msk.kafka.server.socket.server.metrics.select.total** <br>(gauge) | El número total de veces que la capa de E/S comprobó si había nuevas E/S que realizar (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>select-total)|
| **aws.msk.kafka.server.socket.server.metrics.successful.authentication.no.reauth.total** <br>(gauge) | El número total de conexiones con autenticación correcta en las que el cliente no admite la reautenticación (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>successful-authentication-no-reauth-total)|
| **aws.msk.kafka.server.socket.server.metrics.successful.authentication.rate** <br>(gauge) | El número de conexiones con autenticación correcta por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>successful-authentication-rate)|
| **aws.msk.kafka.server.socket.server.metrics.successful.authentication.total** <br>(gauge) | El número total de conexiones con autenticación correcta (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>successful-authentication-total)|
| **aws.msk.kafka.server.socket.server.metrics.successful.reauthentication.rate** <br>(gauge) | Número de conexiones reautenticadas con éxito por segundo (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>successful-reauthentication-rate)|
| **aws.msk.kafka.server.socket.server.metrics.successful.reauthentication.total** <br>(gauge) | El número total de reautenticación exitosa de conexiones (kafka.server\<type=socket-server-metrics, listener=CLIENT, networkProcessor=4>\<>successful-reauthentication-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.connection.close.rate** <br>(gauge) | El número de conexiones cerradas por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>connection-close-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.connection.close.total** <br>(gauge) | El número total de conexiones cerradas (kafka.server\<type=txn-marker-channel-metrics>\<>connection-close-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.connection.count** <br>(gauge) | El número actual de conexiones activas. (kafka.server<type=txn-marker-channel-metrics>\<>connection-count)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.connection.creation.rate** <br>(gauge) | El número de nuevas conexiones establecidas por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>connection-creation-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.connection.creation.total** <br>(gauge) | El número total de nuevas conexiones establecidas (kafka.server\<type=txn-marker-channel-metrics>\<>connection-creation-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.failed.authentication.rate** <br>(gauge) | El número de conexiones con autenticación fallida por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>failed-authentication-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.failed.authentication.total** <br>(gauge) | El número total de conexiones con autenticación fallida (kafka.server\<type=txn-marker-channel-metrics>\<>failed-authentication-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.failed.reauthentication.rate** <br>(gauge) | El número de reautenticación fallida de conexiones por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>failed-reauthentication-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.failed.reauthentication.total** <br>(gauge) | El número total de reautenticación fallida de conexiones (kafka.server\<type=txn-marker-channel-metrics>\<>failed-reauthentication-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.incoming.byte.rate** <br>(gauge) | El número de bytes leídos de todos los sockets por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>incoming-byte-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.incoming.byte.total** <br>(gauge) | El número total de bytes leídos de todos los sockets (kafka.server\<type=txn-marker-channel-metrics>\<>incoming-byte-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.io.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=txn-marker-channel-metrics>\<>io-ratio)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.io.time.ns.avg** <br>(gauge) | La duración media del tiempo de E/S por llamada a select en nanosegundos. (kafka.server\<type=txn-marker-channel-metrics>\<>io-time-ns-avg)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.io.wait.ratio** <br>(gauge) | La fracción de tiempo que el subproceso de E/S pasó esperando (kafka.server\<type=txn-marker-channel-metrics>\<>io-wait-ratio)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.io.wait.time.ns.avg** <br>(gauge) | La duración media del tiempo que el subproceso de E/S pasó esperando un socket listo para lecturas o escrituras en nanosegundos. (kafka.server<type=txn-marker-channel-metrics>\<>io-wait-time-ns-avg)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.io.waittime.total** <br>(gauge) | El tiempo total de espera del subproceso de E/S (kafka.server\<type=txn-marker-channel-metrics>\<>io-waittime-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.iotime.total** <br>(gauge) | El tiempo total que el subproceso de E/S pasó haciendo E/S (kafka.server\<type=txn-marker-channel-metrics>\<>iotime-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.network.io.rate** <br>(gauge) | El número de operaciones de red (lecturas o escrituras) en todas las conexiones por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>network-io-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.network.io.total** <br>(gauge) | El número total de operaciones de red (lecturas o escrituras) en todas las conexiones (kafka.server\<type=txn-marker-channel-metrics>\<>network-io-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.outgoing.byte.rate** <br>(gauge) | El número de bytes salientes enviados a todos los servidores por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>outgoing-byte-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.outgoing.byte.total** <br>(gauge) | El número total de bytes salientes enviados a todos los servidores (kafka.server\<type=txn-marker-channel-metrics>\<>outgoing-byte-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.reauthentication.latency.avg** <br>(gauge) | La latencia media observada debido a la reautenticación (kafka.server\<type=txn-marker-channel-metrics>\<>reauthentication-latency-avg)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.reauthentication.latency.max** <br>(gauge) | La latencia máxima observada debido a la reautenticación (kafka.server\<type=txn-marker-channel-metrics>\<>reauthentication-latency-max)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.request.rate** <br>(gauge) | Número de solicitudes enviadas por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>request-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.request.size.avg** <br>(gauge) | El tamaño medio de las solicitudes enviadas. (kafka.server\<type=txn-marker-channel-metrics>\<>request-size-avg)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.request.size.max** <br>(gauge) | El tamaño máximo de cualquier solicitud enviada. (kafka.server\<type=txn-marker-channel-metrics>\<>request-size-max)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.request.total** <br>(gauge) | El número total de solicitudes enviadas (kafka.server\<type=txn-marker-channel-metrics>\<>request-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.response.rate** <br>(gauge) | El número de respuestas recibidas por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>response-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.response.total** <br>(gauge) | El número total de respuestas recibidas (kafka.server\<type=txn-marker-channel-metrics>\<>response-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.select.rate** <br>(gauge) | El número de veces que la capa de E/S comprueba si hay nuevas E/S que realizar por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>select-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.select.total** <br>(gauge) | El número total de veces que la capa de E/S comprobó si había nuevas E/S que realizar (kafka.server\<type=txn-marker-channel-metrics>\<>select-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.successful.authentication.no.reauth.total** <br>(gauge) | El número total de conexiones con autenticación correcta en las que el cliente no admite la reautenticación (kafka.server\<type=txn-marker-channel-metrics>\<>successful-authentication-no-reauth-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.successful.authentication.rate** <br>(gauge) | El número de conexiones con autenticación correcta por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>successful-authentication-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.successful.authentication.total** <br>(gauge) | El número total de conexiones con autenticación correcta (kafka.server\<type=txn-marker-channel-metrics>\<>successful-authentication-total)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.successful.reauthentication.rate** <br>(gauge) | Número de conexiones reautenticadas con éxito por segundo (kafka.server\<type=txn-marker-channel-metrics>\<>successful-reauthentication-rate)|
| **aws.msk.kafka.server.txn.marker.channel.metrics.successful.reauthentication.total** <br>(gauge) | El número total de reautenticación exitosa de conexiones (kafka.server\<type=txn-marker-channel-metrics>\<>successful-reauthentication-total)|
| **aws.msk.kafka.utils.Throttler.Count** <br>(gauge) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>Count)|
| **aws.msk.kafka.utils.Throttler.Count.count** <br>(count) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>Count) como recuento monotónico|
| **aws.msk.kafka.utils.Throttler.FifteenMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>FifteenMinuteRate)|
| **aws.msk.kafka.utils.Throttler.FiveMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>FiveMinuteRate)|
| **aws.msk.kafka.utils.Throttler.MeanRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>MeanRate)|
| **aws.msk.kafka.utils.Throttler.OneMinuteRate** <br>(gauge) | Atributo expuesto para la gestión (kafka.utils\<type=Throttler, name=cleaner-io>\<>OneMinuteRate)|
| **aws.msk.node.cpu.seconds.count** <br>(count) | \[OpenMetricsV2\] Segundos que los cpus pasaron en cada modo.|
| **aws.msk.node.cpu.seconds.total** <br>(count) | \[OpenMetricsV1\] Segundos que los cpus pasaron en cada modo.|
| **aws.msk.node.exporter.build.info** <br>(gauge) | Una métrica con un valor constante '1' etiquetada por versión, revisión, rama y la versión go a partir de la cual se construyó node_exporter.|
| **aws.msk.node.filesystem.avail.bytes** <br>(gauge) | Espacio del sistema de archivos disponible para usuarios no raíz en bytes.<br>_Se muestra como byte_ |
| **aws.msk.node.filesystem.device.error** <br>(gauge) | Si se ha producido un error al obtener las estadísticas del dispositivo en cuestión.|
| **aws.msk.node.filesystem.files** <br>(gauge) | Total de nodos de archivos del sistema.|
| **aws.msk.node.filesystem.files.free** <br>(gauge) | Nodos de archivos libres totales del sistema de archivos.|
| **aws.msk.node.filesystem.free.bytes** <br>(gauge) | Espacio libre del sistema de archivos en bytes.<br>_Se muestra como byte_ |
| **aws.msk.node.filesystem.readonly** <br>(gauge) | Estado de sólo lectura del sistema de archivos.|
| **aws.msk.node.filesystem.size.bytes** <br>(gauge) | Tamaño del sistema de archivos en bytes.<br>_Se muestra como byte_ |
| **aws.msk.node.scrape.collector.duration.seconds** <br>(gauge) | node_exporter: duración de una extracción del Collector.<br>_Se muestra como segundo_ |
| **aws.msk.node.scrape.collector.success** <br>(gauge) | node_exporter: si un Collector tuvo éxito.|
| **aws.msk.process.cpu.seconds.count** <br>(count) | \[OpenMetricsV2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.|
| **aws.msk.process.cpu.seconds.total** <br>(count) | \[OpenMetricsV1\] Tiempo total de CPU del usuario y del sistema empleado en segundos.|
| **aws.msk.process.max.fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **aws.msk.process.open.fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **aws.msk.process.resident.memory.bytes** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **aws.msk.process.start.time.seconds** <br>(gauge) | Hora de inicio del proceso desde la época unix en segundos.<br>_Se muestra como segundo_ |
| **aws.msk.process.virtual.memory.bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **aws.msk.process.virtual.memory.max.bytes** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes.<br>_Se muestra como byte_ |
| **aws.msk.promhttp.metric.handler.requests.count** <br>(count) | \[OpenMetricsV2\] Número total de extracciones por código de estado HTTP.|
| **aws.msk.promhttp.metric.handler.requests.in.flight** <br>(gauge) | Número actual de extracciones en proceso.|
| **aws.msk.promhttp.metric.handler.requests.total** <br>(count) | \[OpenMetricsV1\] Número total de extracciones por código de estado HTTP.|

### Eventos

El check de Amazon MSK no incluye eventos.

### Checks de servicio

**aws.msk.can_connect**

Devuelve `CRITICAL` si el Agent no puede detectar nodos del clúster de MSK. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**aws.msk.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder a un endpoint de Métricas. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**aws.msk.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza Amazon Managed Streaming para Apache Kafka con Datadog](https://www.datadoghq.com/blog/monitor-amazon-msk/)