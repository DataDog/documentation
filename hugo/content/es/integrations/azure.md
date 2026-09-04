---
app_id: azure
categories:
- azure
- cloud
- iot
- log collection
- network
- notifications
custom_kind: integración
description: Microsoft Azure es una plataforma en la nube abierta y flexible.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/
  tag: documentación
  text: Arquitectura y configuración de la integración de Azure
- link: https://www.datadoghq.com/blog/azure-log-forwarding/
  tag: blog
  text: Enviar logs de Azure a Datadog más rápida y fácilmente con el reenvío automatizado
    de logs
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: blog
  text: Monitorizar pipelines de Azure con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/
  tag: blog
  text: Monitorizar Azure OpenAI con Datadog
media: []
title: Azure
---
## Información general

La integración de Azure de Datadog permite la recopilación de métricas y logs de tu entorno de Azure. Las opciones de configuración son diferentes en función del sitio Datadog que utilice tu organización:

**Todos los sitios:** Todos los sitios Datadog pueden utilizar el proceso de credenciales de registro de aplicaciones para implementar la recopilación de métricas. Puedes automatizar la configuración de reenvío de logs con una plantilla de Azure Resource Manager (ARM) o configurar manualmente un Azure Event Hub para reenviar tus logs. _En la medida en que la integración Azure se utilice para monitorizar Azure China, todo uso de servicios Datadog en (o en conexión con entornos dentro de) China continental está sujeto al descargo de responsabilidad publicado en la sección [Ubicaciones de servicio restringido](https://www.datadoghq.com/legal/restricted-service-locations/) de nuestro sitio web._

**US3**: Si tu organización está en el sitio Datadog US3, utiliza la integración de Azure Native para agilizar la gestión y la recopilación de datos para tu entorno de Azure. Datadog recomienda utilizar este método siempre que sea posible. La configuración implica la creación de un recurso Datadog en Azure para vincular tus suscripciones de Azure a tu organización Datadog. Esto sustituye al procesamiento de credenciales de registro de aplicaciones para la recopilación de métricas y a la configuración del centro de eventos para el reenvío de logs.

Conéctate a Microsoft Azure para:

- Obtener métricas de las máquinas virtuales Azure con o sin la instalación del Datadog Agent.
- Recopilar las métricas de Monitors de Azure estándar para todos los servicios de Azure: Application Gateway, App Service (web y móvil), Batch Service, Event Hub, IoT Hub, Logic App, Redis Cache, Server Farm (App Service Plan), SQL Database, SQL Elastic Pool, Virtual Machine Scale Set y muchos más.
- Etiquetar tus métricas de Azure con información específica de Azure sobre el recurso asociado, como la región, el grupo de recursos y etiquetas (tags) definidas en tu entorno de Azure.
- Obtener métricas generadas por Datadog para obtener información exclusiva sobre tu entorno de Azure.
- Correlacionar los datos de tus aplicaciones Azure en todos los logs, métricas, rastreo de APM, actividad del usuario y más en tu organización Datadog.

<div class="alert alert-danger">
La integración Azure de Datadog fue creada para recopilar <a href="https://docs.microsoft.com/en-us/azure/azure-monitor/platform/metrics-supported">todas las métricas del monitor Azure</a>. Datadog hace todo lo posible para actualizar continuamente los documentos para mostrar todas las sub-integraciones, pero los servicios de la nube envían rápidamente nuevas métricas y servicios, por lo que la lista de integraciones a veces puede retrasarse. <br>La métrica <code>azure.*.count</code> es generada por Datadog desde Azure Resource Health. Para obtener más información, consulta <a href="https://docs.datadoghq.com/integrations/guide/azure-status-metric">Métrica de recuento de Azure</a>.
</div>

| Integración                     | Descripción                                                                                               |
|---------------------------------|-----------------------------------------------------------------------------------------------------------|
| [Analysis Services](https://docs.datadoghq.com/integrations/azure_analysis_services/)          | Un servicio que proporciona modelos de datos en la nube.                                                         |
| [Gestión de API](https://docs.datadoghq.com/integrations/azure_api_management/)             | Una servicio para publicar, obtener, transformar, mantener y monitorizar API.                                      |
| [App Service](https://docs.datadoghq.com/integrations/azure_app_services/)                | Servicio para implementar y escalar aplicaciones web, móviles, de API y de lógica de negocios.                      |
| [App Service Environment](https://docs.datadoghq.com/integrations/azure_app_service_environment/)    | Un servicio que proporciona un entorno para ejecutar de forma segura aplicaciones de servicios en escala elevada.               |
| [Plan de App Service](https://docs.datadoghq.com/integrations/azure_app_service_plan/)           | Un conjunto de recursos informáticos para ejecutar una aplicación web.                                                          |
| [Pasarela de aplicaciones](https://docs.datadoghq.com/integrations/azure_application_gateway/)        | Un equilibrador de carga de tráfico web que te permite gestionar el tráfico de tus aplicaciones web.                  |
| [Automatización](https://docs.datadoghq.com/integrations/azure_automation/)                 | Un servicio que proporciona gestión de automatización y de configuración en todos tus entornos.                 |
| [Servicio por lotes](https://docs.datadoghq.com/integrations/azure_batch/)              | Programador y procesador de tareas gestionadas.                                                                     |
| [Servicios cognitivos](https://docs.datadoghq.com/integrations/azure_cognitive_services/)         | API, SDK y servicios disponibles para ayudar a crear aplicaciones sin conocimientos de IA ni de ciencia de datos.       |
| [Instancias del contenedor](https://docs.datadoghq.com/integrations/azure_container_instances/)       | Un servicio para desplegar contenedores sin necesidad de aprovisionar ni gestionar la infraestructura subyacente.     |
| [Servicio de contenedores](https://docs.datadoghq.com/integrations/azure_container_service/)         | Un clúster de Kubernetes, DC/OS o Docker Swarm listo para la producción.                                            |
| [Cosmos DB](https://docs.datadoghq.com/integrations/azure_cosmosdb/)                 | Un servicio que admite bases de datos de documentos, clave-valor, columnas anchas y gráficos.                   |
| [Informaciones de clientes](https://docs.datadoghq.com/integrations/azure_customer_insights/)         | Permite a las organizaciones reunir conjuntos de datos para crear una vista de 360° de sus clientes.                |
| [Explorador de datos](https://docs.datadoghq.com/integrations/azure_data_explorer/)             | Servicio de exploración de datos rápida y altamente escalable.                                                        |
| [Data Factory](https://docs.datadoghq.com/integrations/azure_data_factory/)              | Un servicio para componer los servicios de almacenamiento, movimiento y procesamiento de datos en pipelines de datos automatizados.       |
| [Data Lake Analytics](https://docs.datadoghq.com/integrations/azure_data_lake_analytics/)       | Un servicio de trabajo de análisis que simplifica el big data.                                                        |
| [Data Lake Store](https://docs.datadoghq.com/integrations/azure_data_lake_store/)           | Un lago de datos sin límites que potencia el análisis de big data.                                                     |
| [Base de datos para MariaDB](https://docs.datadoghq.com/integrations/azure_db_for_mariadb/)      | Un servicio que proporciona una base de datos de la comunidad lista para empresas, totalmente gestionada MariaDB.                       |
| [Event Grid](https://docs.datadoghq.com/integrations/azure_event_grid/)                | Un servicio de enrutamiento de eventos que permite un consumo uniforme de eventos utilizando un modelo de publicación y suscripción.       |
| [Event Hub](https://docs.datadoghq.com/integrations/azure_event_hub/)                 | Servicio gestionado de flujo (stream) de datos a gran escala.                                                                   |
| [ExpressRoute](https://docs.datadoghq.com/integrations/azure_express_route/)              | Un servicio para extender tus redes on-premises a la nube.                                             |
| [Cortafuegos](https://docs.datadoghq.com/integrations/azure_firewall/)                  | Seguridad de red nativa de la nube para proteger tus recursos de la red virtual Azure.                            |
| [Funciones](https://docs.datadoghq.com/integrations/azure_functions/)                 | Un servicio para ejecutar un código serverless en respuesta a activadores de eventos.                                      |
| [HDInsights](https://docs.datadoghq.com/integrations/azure_hd_insight/)                | Una servicio en la nube que procesa cantidades masivas de datos.                                                   |
| [IOT Hub](https://docs.datadoghq.com/integrations/azure_iot_hub/)                   | Conecta, monitoriza y gestiona miles de millones de activos IoT.                                                      |
| [Key Vault](https://docs.datadoghq.com/integrations/azure_key_vault/)                 | Un servicio para salvaguardar y gestionar claves criptográficas y secretos utilizados por aplicaciones y servicios en la nube. |
| [Balanceador de carga](https://docs.datadoghq.com/integrations/azure_load_balancer/)             | Escala tus aplicaciones y crea una alta disponibilidad para tus servicios.                                   |
| [Logic App](https://docs.datadoghq.com/integrations/azure_logic_app/)                 | Crea soluciones potentes en integración.                                                                     |
| [Machine Learning](https://docs.datadoghq.com/integrations/azure_machine_learning_services/)          | Servicio de machine learning de calidad empresarial para crear e implementar modelos más rápidamente.                              |
| [Interfaces de red](https://docs.datadoghq.com/integrations/azure_network_interface/)        | Permite la comunicación de máquinas virtuales con Internet, Azure y recursos on-premise.                                 |
| [Notification Hubs](https://docs.datadoghq.com/integrations/azure_notification_hubs/)         | Un motor de comando que permite enviar notificaciones a cualquier plataforma desde cualquier backend.                     |
| [Public IP Address](https://docs.datadoghq.com/integrations/azure_public_ip_address/)         | Recurso que permite la comunicación entrante y la conectividad saliente de Internet.                |
| [Recovery Service Vault](https://docs.datadoghq.com/integrations/azure_recovery_service_vault/)    | Entidad que almacena las copias de seguridad y los puntos de recuperación creados a lo largo del tiempo.                                  |
| [Redis Cache](https://docs.datadoghq.com/integrations/azure_redis_cache/)               | Caché de datos gestionada.                                                                                       |
| [Relay](https://docs.datadoghq.com/integrations/azure_relay/)                     | Expone de forma segura servicios que se ejecutan en tu red corporativa a la nube pública.                          |
| Almacenamiento                         | Almacenamiento para [blobs](https://docs.datadoghq.com/integrations/azure_blob_storage/), [files](https://docs.datadoghq.com/integrations/azure_file_storage/), [colas](https://docs.datadoghq.com/integrations/azure_queue_storage/) y [tablas](https://docs.datadoghq.com/integrations/azure_table_storage/).                                     |
| [Stream Analytics](https://docs.datadoghq.com/integrations/azure_stream_analytics/)          | Un motor de procesamiento de eventos para examinar grandes volúmenes de datos procedentes de dispositivos.                        |
| [SQL Database](https://docs.datadoghq.com/integrations/azure_sql_database/)              | Base de datos relacional altamente escalable en la nube.                                                         |
| [Pool elástico de SQL Database](https://docs.datadoghq.com/integrations/azure_sql_elastic_pool/) | Gestiona el rendimiento de múltiples bases de datos.                                                              |
| [Synapse Analytics](https://docs.datadoghq.com/integrations/azure_synapse/)         | Un servicio de análisis que aúna la integración de datos, el almacenamiento de datos empresariales y el análisis de big data. |
| [Uso y cuotas](https://docs.datadoghq.com/integrations/azure_usage_and_quotas/)          | Sigue tu uso de Azure.                                                                                  |
| [Máquina virtual](https://docs.datadoghq.com/integrations/azure_vm/)           | Servicio de gestión de máquinas virtuales.                                                                       |
| [Conjunto de escalado de máquinas virtuales](https://docs.datadoghq.com/integrations/azure_vm_scale_set/) | Implementación, gestión y autoescalado de un conjunto de máquinas virtuales idénticas.                                                     |
| [Red virtual](https://docs.datadoghq.com/integrations/azure-virtual-network/)           | Permite que los recursos de Azure se comuniquen de forma segura entre sí, con Internet y con las redes on-premises.    |

## Configuración

### Automático

_Todos los sitios:_\ 
Consulta la guía [Gestión mediante programación de la integración estándar Azure](https://docs.datadoghq.com/integrations/guide/azure-programmatic-management/) para obtener instrucciones sobre la configuración automática de la integración estándar de Datadog con Azure. Puedes configurar la integración a través de Terraform o la CLI de Azure, desplegar el Datadog Agent de forma nativa en Azure a través de la extensión para máquinas virtuales de Datadog Azure, y configurar automática o manualmente el reenvío de logs.

_US3:_\
Consulta la guía [Gestión mediante programación de la integración nativa Azure](https://docs.datadoghq.com/integrations/guide/azure-native-programmatic-management/) para obtener instrucciones sobre el uso de Terraform para configurar la integración nativa Azure de Datadog con el recurso Datadog en Azure.

### Manual

Todos los sitios
Consulta la guía [Configuración manual de la integración estándar con Azure](https://docs.datadoghq.com/integrations/guide/azure-manual-setup/) para obtener instrucciones sobre cómo configurar manualmente la integración de Datadog con Azure a través del portal de Azure o la CLI, así como para implementar Datadog Agent directamente en Azure con la extensión VM o la extensión AKS Cluster.

_US3:_\
Consulta la guía [Configuración manual de la integración nativa Azure](https://docs.datadoghq.com/integrations/guide/azure-native-manual-setup/) para obtener instrucciones sobre la configuración manual de la integración nativa Azure con Datadog. Esto incluye la creación del recurso Datadog en Azure, el despliegue del Datadog Agent directamente en Azure con la extensión para máquinas virtuales o la extensión para clústeres AKS, y la configuración opcional del inicio de sesión único (SSO).

## Recopilación de logs

_Todos los sitios\ 
Consulta la guía [Envío de logs de Azure a Datadog](https://docs.datadoghq.com/logs/guide/azure-logging-guide/) para obtener instrucciones sobre el envío de tus logs de Azure a Datadog. Puedes automatizar la configuración con una plantilla de Azure Resource Manager (ARM) o configurar una función Datadog-Azure y un Azure Event Hub. También puedes utilizar una función de almacenamiento de blobs Azure para recopilar logs de todos tus Azure App Services.

_US3:_\ 
Consulta la guía [Envío de logs de Azure con el recurso de Datadog](https://docs.datadoghq.com/logs/guide/azure-native-logging-guide/) para obtener instrucciones sobre el envío de logs de tu nivel de suscripción, recurso de Azure y Azure Active Directory a Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.devices_elasticpools_iothubtenants.c2d.commands.egress.abandon.success** <br>(count) | Número de comandos de nube a dispositivo abandonados por el dispositivo|
| **azure.devices_elasticpools_iothubtenants.c2d.commands.egress.complete.success** <br>(count) | Número de comandos de nube a dispositivo completados con éxito por el dispositivo|
| **azure.devices_elasticpools_iothubtenants.c2d.commands.egress.reject.success** <br>(count) | Número de comandos de nube a dispositivo rechazados por el dispositivo|
| **azure.devices_elasticpools_iothubtenants.c2d.methods.failure** <br>(count) | Recuento de todas las llamadas fallidas a métodos directos.|
| **azure.devices_elasticpools_iothubtenants.c2d.methods.request_size** <br>(gauge) | Media mínima y máxima de todas las solicitudes de método directo realizadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.c2d.methods.response_size** <br>(gauge) | Media mínima y máxima de todas las respuestas de método directo realizadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.c2d.methods.success** <br>(count) | Recuento de todas las llamadas de método directo realizadas con éxito.|
| **azure.devices_elasticpools_iothubtenants.c2d.twin.read.failure** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el backend que fallaron.|
| **azure.devices_elasticpools_iothubtenants.c2d.twin.read.size** <br>(gauge) | Media mínima y máxima de todas las lecturas gemelas iniciadas por el backend con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.c2d.twin.read.success** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el backend con éxito.|
| **azure.devices_elasticpools_iothubtenants.c2d.twin.update.failure** <br>(count) | Recuento de todas las actualizaciones gemelas iniciadas por el backend que fallaron.|
| **azure.devices_elasticpools_iothubtenants.c2d.twin.update.size** <br>(gauge) | Tamaño medio mínimo y máximo de todas las actualizaciones gemelas iniciadas por el backend con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.c2d.twin.update.success** <br>(count) | Recuento de todas las actualizaciones gemelas iniciadas por el backend con éxito.|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.built_in.events** <br>(count) | Número de veces que los mensajes se escribieron correctamente en el endpoint integrado (mensajes/eventos)|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.event_hubs** <br>(count) | Número de veces que los mensajes se escribieron correctamente en los endpoints del Event Hub|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.service_bus_queues** <br>(count) | Número de veces que los mensajes se escribieron correctamente en los endpoints de Service Bus Queue|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.service_bus_topics** <br>(count) | Número de veces que los mensajes se escribieron correctamente en los endpoints de Service Bus Topic|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.storage** <br>(count) | Número de veces que los mensajes se escribieron correctamente en los endpoints de almacenamiento|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.storage.blobs** <br>(count) | Número de blobs escritos en los endpoints de almacenamiento|
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.egress.storage.bytes** <br>(gauge) | Cantidad de datos en bytes escritos en los endpoints de almacenamiento<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.latency.built_in.events** <br>(gauge) | Latencia media entre la entrada de mensajes en el IoT Hub y la entrada de mensajes en el endpoint integrado (mensajes/eventos) en milisegundos <br>_Se muestra como milisegundos_. |
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.latency.event_hubs** <br>(gauge) | Latencia media entre la entrada de mensajes en el IoT Hub y la entrada de mensajes en el endpoint del Event Hub en milisegundos<br>_Se muestra como milisegundos_. |
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.latency.service_bus_queues** <br>(gauge) | Latencia media entre la entrada de mensajes en el IoT Hub y la entrada de mensajes en el endpoint de Service Bus Queue en milisegundos<br>_Se muestra como milisegundos_. |
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.latency.service_bus_topics** <br>(gauge) | Latencia media entre la entrada de mensajes en el IoT Hub y la entrada de mensajes en el endpoint de Service Bus Topic en milisegundos<br>_Se muestra como milisegundos_. |
| **azure.devices_elasticpools_iothubtenants.d2c.endpoints.latency.storage** <br>(gauge) | Latencia media entre la entrada de mensajes en el IoT Hub y la entrada de mensajes en el endpoint de almacenamiento en milisegundos<br>_Se muestra como milisegundos_. |
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.egress.dropped** <br>(count) | Número de mensajes descartados porque el endpoint de entrega estaba muerto|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.egress.fallback** <br>(count) | Número de mensajes escritos en el endpoint alternativo|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.egress.invalid** <br>(count) | Recuento de mensajes no entregados por incompatibilidad con el endpoint|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.egress.orphaned** <br>(count) | Recuento de mensajes que no coinciden con ninguna ruta, incluyendo la ruta alternativa|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.egress.success** <br>(count) | Número de veces que los mensajes se escribieron correctamente en los endpoints (total)|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.ingress.all_protocol** <br>(count) | Número de mensajes de telemetría de dispositivo a nube que se intentaron enviar a tu IoT Hub|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.ingress.send_throttle** <br>(count) | Número de errores de limitación debidos a limitaciones de rendimiento de dispositivos|
| **azure.devices_elasticpools_iothubtenants.d2c.telemetry.ingress.success** <br>(count) | Número de mensajes de telemetría de dispositivo a nube enviados correctamente a tu IoT Hub|
| **azure.devices_elasticpools_iothubtenants.d2c.twin.read.failure** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el dispositivo que fallaron|
| **azure.devices_elasticpools_iothubtenants.d2c.twin.read.size** <br>(gauge) | Media mínima y máxima de todas las lecturas gemelas iniciadas por el dispositivo con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.d2c.twin.read.success** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el dispositivo con éxito.|
| **azure.devices_elasticpools_iothubtenants.d2c.twin.update.failure** <br>(count) | Recuento de todas las actualizaciones gemelas iniciadas por el dispositivo que fallaron.|
| **azure.devices_elasticpools_iothubtenants.d2c.twin.update.size** <br>(gauge) | Tamaño medio mínimo y máximo de todas las actualizaciones gemelas iniciadas por el dispositivo con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.d2c.twin.update.success** <br>(count) | Recuento de todas las lecturas gemelas iniciadas por el dispositivo con éxito.|
| **azure.devices_elasticpools_iothubtenants.daily_message_quota_used** <br>(count) | Número total de mensajes utilizados hoy. Se trata de un valor acumulativo que se pone a cero a las 00:00 UTC de cada día.|
| **azure.devices_elasticpools_iothubtenants.device_data_usage** <br>(count) | Bytes transferidos hacia y desde cualquier dispositivo conectado a Iot Hub|
| **azure.devices_elasticpools_iothubtenants.devices.connected_devices.all_protocol** <br>(count) | Número de dispositivos conectados a tu IoT Hub|
| **azure.devices_elasticpools_iothubtenants.devices.total_devices** <br>(count) | Número de dispositivos registrados en tu IoT Hub|
| **azure.devices_elasticpools_iothubtenants.jobs.cancel_job.failure** <br>(count) | Recuento de todas las llamadas fallidas para cancelar un trabajo.|
| **azure.devices_elasticpools_iothubtenants.jobs.cancel_job.success** <br>(count) | Recuento de todas las llamadas realizadas con éxito para cancelar un trabajo.|
| **azure.devices_elasticpools_iothubtenants.jobs.completed** <br>(count) | Recuento de todos los trabajos completados.|
| **azure.devices_elasticpools_iothubtenants.jobs.create_direct_method_job.failure** <br>(count) | Recuento de todas las creaciones fallidas de trabajos de invocación de métodos directos.|
| **azure.devices_elasticpools_iothubtenants.jobs.create_direct_method_job.success** <br>(count) | Recuento de todas las creaciones exitosas de trabajos de invocación de métodos directos.|
| **azure.devices_elasticpools_iothubtenants.jobs.create_twin_update_job.failure** <br>(count) | Recuento de todas las creaciones fallidas de trabajos gemelos de actualización.|
| **azure.devices_elasticpools_iothubtenants.jobs.create_twin_update_job.success** <br>(count) | Recuento de todas las creaciones exitosas de trabajos gemelos de actualización.|
| **azure.devices_elasticpools_iothubtenants.jobs.failed** <br>(count) | Recuento de todos los trabajos fallidos.|
| **azure.devices_elasticpools_iothubtenants.jobs.list_jobs.failure** <br>(count) | Recuento de todas las llamadas fallidas para listar trabajos.|
| **azure.devices_elasticpools_iothubtenants.jobs.list_jobs.success** <br>(count) | Recuento de todas las llamadas exitosas para listar trabajos.|
| **azure.devices_elasticpools_iothubtenants.jobs.query_jobs.failure** <br>(count) | Recuento de todas las llamadas fallidas para consultar trabajos.|
| **azure.devices_elasticpools_iothubtenants.jobs.query_jobs.success** <br>(count) | Recuento de todas las llamadas exitosas para consultar trabajos.|
| **azure.devices_elasticpools_iothubtenants.tenant_hub.requested_usage_rate** <br>(gauge) | tasa de uso solicitada<br>_Se muestra como porcentaje_. |
| **azure.devices_elasticpools_iothubtenants.twin_queries.failure** <br>(count) | Recuento de todas las consultas gemelas fallidas.|
| **azure.devices_elasticpools_iothubtenants.twin_queries.result_size** <br>(gauge) | Media mínima y máxima del tamaño resultante de todas las consultas gemelas realizadas con éxito.<br>_Se muestra como byte_ |
| **azure.devices_elasticpools_iothubtenants.twin_queries.success** <br>(count) | Recuento de todas las consultas gemelas realizadas con éxito.|
| **azure.devices_elasticpools.elastic_pool.requested_usage_rate** <br>(gauge) | tasa de uso solicitada<br>_Se muestra como porcentaje_. |
| **azure.insights_autoscalesettings.metric_threshold** <br>(count) | Umbral de escalado automático configurado cuando se ejecutó el escalado automático.|
| **azure.insights_autoscalesettings.observed_capacity** <br>(count) | Capacidad informada de escalado automático cuando se ejecuta.|
| **azure.insights_autoscalesettings.observed_metric_value** <br>(count) | Valor calculado por el escalado automático cuando se ejecuta|
| **azure.insights_autoscalesettings.scale_actions_initiated** <br>(count) | Dirección de la operación de escalado.|
| **azure.locationbasedservices_accounts.latency** <br>(gauge) | Duración de las llamadas a la API<br>_Se muestra como milisegundos_ |
| **azure.network_connections.bits_in_per_second** <br>(rate) | Bits que ingresan en Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_connections.bits_out_per_second** <br>(rate) | Bits que salen de Azure por segundo<br>_Se muestra como bit_ |
| **azure.network_dnszones.query_volume** <br>(count) | Número de consultas atendidas para una zona DNS|
| **azure.network_dnszones.record_set_capacity_utilization** <br>(gauge) | Porcentaje de capacidad del conjunto de registros utilizado por una zona DNS<br>_Se muestra como porcentaje_. |
| **azure.network_dnszones.record_set_count** <br>(count) | Número de conjuntos de registros en una zona DNS|
| **azure.network_networkwatchers_connectionmonitors.average_roundtrip_ms** <br>(gauge) | Tiempo medio de ida y vuelta a la red (ms) de las sondas de monitorización de la conectividad enviadas entre la fuente y el destino<br>_Se muestra como milisegundos_. |
| **azure.network_networkwatchers_connectionmonitors.probes_failed_percent** <br>(gauge) | % de sondas de monitorización de la conectividad fallidas<br>_Se muestra como porcentaje_ |
| **azure.network_privatelinkservices.pls_bytes_in** <br>(count) | Número total de bytes que ingresan<br>_Se muestra como byte_ |
| **azure.network_privatelinkservices.pls_bytes_out** <br>(count) | Número total de bytes que salen<br>_Se muestra como byte_ |
| **azure.network_privatelinkservices.pls_nat_ports_usage** <br>(gauge) | Uso de puertos Nat|
| **azure.network_trafficmanagerprofiles.qps_by_endpoint** <br>(count) | Número de veces que se devolvió un endpoint de Traffic Manager en el periodo de tiempo indicado|
| **azure.network_virtualnetworkgateways.tunnel_average_bandwidth** <br>(rate) | Ancho de banda medio de un túnel en bytes por segundo<br>_Se muestra como byte_ |
| **azure.network_virtualnetworkgateways.tunnel_egress_bytes** <br>(gauge) | Bytes salientes de un túnel<br>_Se muestra como byte_ |
| **azure.network_virtualnetworkgateways.tunnel_egress_packet_drop_tsmismatch** <br>(count) | Recuento de paquetes salientes descartados por desajuste del selector de tráfico de un túnel|
| **azure.network_virtualnetworkgateways.tunnel_egress_packets** <br>(count) | Recuento de paquetes salientes de un túnel|
| **azure.network_virtualnetworkgateways.tunnel_ingress_bytes** <br>(gauge) | Bytes entrantes de un túnel<br>_Se muestra como byte_ |
| **azure.network_virtualnetworkgateways.tunnel_ingress_packet_drop_tsmismatch** <br>(count) | Recuento de paquetes entrantes descartados por desajuste del selector de tráfico de un túnel|
| **azure.network_virtualnetworkgateways.tunnel_ingress_packets** <br>(count) | Recuento de paquetes entrantes en un túnel|
| **azure.powerbidedicated_capacities.query_duration** <br>(gauge) | Duración de la consulta DAX en el último intervalo<br>_Se muestra como milisegundos_ |
| **azure.powerbidedicated_capacities.query_pool_job_queue_length** <br>(count) | Número de trabajos en la cola del grupo de subprocesos de la consulta.|
| **azure.storage.availability** <br>(gauge) | Porcentaje de disponibilidad del servicio de almacenamiento o de la operación de API especificada.<br>_Se muestra como porcentaje_ |
| **azure.storage.egress** <br>(gauge) | Cantidad de datos salientes, en bytes.<br>_Se muestra como byte_ |
| **azure.storage.ingress** <br>(gauge) | Cantidad de datos entrantes, en bytes.<br>_Se muestra como byte_ |
| **azure.storage.success_e2_e_latency** <br>(gauge) | Latencia media de extremo a extremo de las solicitudes realizadas con éxito a un servicio de almacenamiento o a la operación de API especificada, en milisegundos.<br>_Se muestra como milisegundos_ |
| **azure.storage.success_server_latency** <br>(gauge) | Latencia media utilizada por Azure Storage para procesar una solicitud correcta, en milisegundos.<br>_Se muestra como milisegundos_ |
| **azure.storage.transactions** <br>(count) | Número de solicitudes realizadas a un servicio de almacenamiento o a la operación de API especificada.|
| **azure.storage.used_capacity** <br>(gauge) | Capacidad de cuenta utilizada<br>_Se muestra como byte_ |
| **azure.usage.remaining_api_calls** <br>(gauge) | Número de llamadas a la API restantes hasta que se alcanza un límite de frecuencia|\](#overview). Para excluir determinadas máquinas virtuales de la recopilación de métricas, consulta [Exclusión de máquinas virtuales de Azure](https://docs.datadoghq.com/account_management/billing/azure/#azure-vm-exclusion).

### Eventos

La integración Azure recopila automáticamente eventos de Azure Service Health. Para verlos en Datadog, ve al [Explorador de eventos](https://app.datadoghq.com/event/explorer) y filtra por el espacio de nombres `Azure Service Health`.

### Checks de servicio

La integración de Azure no incluye ningún check de servicios.

### Etiquetas (Tags)

Las métricas, eventos y checks de servicios de integración de Azure reciben los siguientes etiquetas (tags) además de etiquetas (tags) definidas en tus entornos de Azure:

| Integración                             | Espacio de nombre                                   | Claves de etiqueta de Datadog                                                                                                                                                                                                 |
|-----------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Todas las integraciones de Azure                  | Todos                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (si procede)                                                            |
| Integraciones de máquinas virtuales de Azure                   | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Planes de servicios de aplicaciones Azure                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Aplicaciones web y funciones de servicios de aplicaciones de Azure  | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (sólo aplicaciones web Linux), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Base de datos Azure SQL                            | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Sólo para enlaces de réplica: `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Equilibrador de carga Azure                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Uso y cuota de Azure                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

## Solucionar problemas

Consulta la guía [Solucionar problemas en Azure](https://docs.datadoghq.com/integrations/guide/azure-troubleshooting/).

¿Aún necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Arquitectura y configuración de la integración Azure](https://docs.datadoghq.com/integrations/guide/azure-architecture-and-configuration/)
- [Enviar logs de Azure a Datadog de forma más rápida y fácil con el reenvío automatizado de logs](https://www.datadoghq.com/blog/azure-log-forwarding/)
- [Monitorizar pipelines de Azure con Datadog CI Visibility](https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/)
- [Monitorizar Azure OpenAI con Datadog](https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/)