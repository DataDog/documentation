---
aliases:
- /es/integrations/confluent_cloud
app_id: confluent-cloud
categories:
- gestión de costes
- métricas
- colas de mensajes
custom_kind: integración
description: Recopila varias métricas de Kafka y datos de costes relacionados desde
  Confluent Cloud.
further_reading:
- link: https://www.datadoghq.com/blog/confluent-cloud-monitoring-datadog/
  tag: blog
  text: Monitorizar Confluent Cloud con Datadog
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: blog
  text: Detectar de forma automática conectores de Confluent Cloud y monitorizar el
    rendimiento fácilmente en Data Streams Monitoring
integration_version: 1.0.0
media:
- caption: Información general del dashboard de Confluent Cloud
  image_url: images/confluent_dashboard.png
  media_type: imagen
title: Nube Confluent
---
## Información general

{{< site-region region="gov" >}}
**La integración de Confluent Cloud no es compatible con el sitio Datadog {{< region-param key="dd_site_name" >}}**.
{{< /site-region >}}

Confluent Cloud es un servicio de transmisión de datos alojado en la nube y totalmente gestionado. Conecta Datadog con Confluent Cloud para visualizar y recibir alertas sobre métricas clave para tus recursos de Confluent Cloud.

El dashboard de Confluent Cloud listo para usar de Datadog te muestra métricas de clúster clave para monitorizar el estado y el rendimiento de tu entorno, incluida información como la tasa de cambio en las conexiones activas y tu relación entre el promedio de registros consumidos y producidos.

Puedes utilizar los monitores recomendados para notificar y alertar a tu equipo cuando el retraso del tema sea demasiado alto, o utilizar estas métricas para crear las tuyas propias.

## Configuración

### Instalación

Instala la integración con el [cuadro de integración de Datadog y Confluent Cloud](https://app.datadoghq.com/integrations/confluent-cloud).

### Configuración

1. En Confluent Cloud, haz clic en **+ Add API Key** para ingresar tu [clave y secreto de API de Confluent Cloud](#api-key-and-secret).
   - Crea una clave y un secreto de API **Cloud Resource Management**.
   - Haz clic en **Save**. Datadog busca las cuentas asociadas a esas credenciales.
   - En la configuración de la integración con Datadog, añade la clave y el secreto de API a los campos de **API Key and API Secret**.
1. Añade tu [ID de clúster](#cluster-id) o [ID de conector](#connector-id) de Confluent Cloud. Datadog rastrea las métricas de Confluent Cloud y las carga en cuestión de minutos.
1. Para recopilar tus etiquetas (tags) definidas en Confluent Cloud (opcional):
   - Crea una clave y un secreto de API de **Registro de esquemas**. Obtén más información sobre la [Gestión de esquemas en Confluent Cloud](https://docs.confluent.io/cloud/current/get-started/schema-registry.html#quick-start-for-schema-management-on-ccloud).
   - Haz clic en **Save**. Datadog recopila las etiquetas definidas en Confluent Cloud.
   - En la configuración de la integración con Datadog, añade la clave y el secreto de API a los campos de **Schema Registry API Key and Secret**.
1. Si utilizas Cloud Cost Management y habilitas la recopilación de datos de costes:
   - Asegúrate de que la clave de API tiene habilitado el rol [BillingAdmin](https://docs.confluent.io/cloud/current/access-management/access-control/rbac/predefined-rbac-roles.html#billingadmin-role).
   - Será visible en [Cloud Cost Management](https://app.datadoghq.com/cost) en 24 horas. ([collected data](https://docs.datadoghq.com/cloud_cost_management/saas_costs/?tab=confluentcloud#data-collected))

Para obtener más información sobre los recursos de configuración, como Clústeres y conectores, consulta la [documentación de la integración de Confluent Cloud](https://docs.datadoghq.com/integrations/confluent_cloud/).

#### Clave y secreto de API

Para crear tu clave y secreto de API de Confluent Cloud, consulta [Añadir el rol MetricsViewer a una nueva cuenta de servicio en la interfaz de usuario](https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account-in-the-ui).

#### ID de clúster

Para encontrar tu ID de clúster de Confluent Cloud:

1. En Confluent Cloud, navega hasta **Environment Overview** y selecciona el clúster que desees monitorizar.
1. En la navegación de la izquierda, haz clic en **Cluster overview** > **Cluster settings**.
1. En **Identification**, copia el ID de clúster que empieza con `lkc`.

#### ID de conector

Para encontrar tu ID de conector de Confluent Cloud:

1. En Confluent Cloud, navega hasta **Environment Overview** y selecciona el clúster que desees monitorizar.
1. En la navegación de la izquierda, haz clic en **Data integration** > **Connectors**.
1. En **Connectors**, copia el ID de conector que empieza con `lcc`.

## Dashboards

Después de configurar la integración, consulta el dashboard de Confluent Cloud listo para usar para obtener información general de las métricas de conector y de clúster de Kafka.

Por defecto, se muestran todas las métricas recopiladas en Confluent Cloud.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **confluent_cloud.kafka.received_bytes** <br>(count) | El recuento delta de bytes recibidos de la red. Cada muestra es el número de bytes recibidos desde la muestra de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.kafka.sent_bytes** <br>(count) | El recuento delta de bytes enviados a través de la red. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.kafka.received_records** <br>(count) | El recuento delta de registros recibidos. Cada muestra es el número de registros recibidos desde la muestra de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como registro_ |
| **confluent_cloud.kafka.sent_records** <br>(count) | El recuento delta de registros enviados. Cada muestra es el número de registros enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como registro_ |
| **confluent_cloud.kafka.retained_bytes** <br>(gauge) | El recuento actual de bytes retenidos por el clúster. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.kafka.active_connection_count** <br>(gauge) | El recuento de conexiones autenticadas activas.<br>_Se muestra como conexión_ |
| **confluent_cloud.kafka.connection_info** <br>(gauge) | Metadatos de conexión de cliente.<br>_Se muestra como conexión_ |
| **confluent_cloud.kafka.request_count** <br>(count) | Recuento delta de solicitudes recibidas a través de la red. Cada muestra es el número de solicitudes recibidas desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como solicitud_ |
| **confluent_cloud.kafka.partition_count** <br>(gauge) | El número de particiones.|
| **confluent_cloud.kafka.successful_authentication_count** <br>(count) | Recuento delta de autenticaciones correctas. Cada muestra es el número de autenticaciones con éxito desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como intento_ |
| **confluent_cloud.kafka.cluster_link_destination_response_bytes** <br>(count) | El recuento delta de bytes de respuesta de enlace de clúster de todos los tipos de solicitud. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.kafka.cluster_link_source_response_bytes** <br>(count) | El recuento delta de bytes de respuesta fuente del enlace de clúster de todos los tipos de solicitud. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.kafka.cluster_active_link_count** <br>(gauge) | Recuento actual de enlaces de clúster activos. El recuento se muestrea cada 60 segundos. La agregación de tiempo implícita para esta métrica es MAX.|
| **confluent_cloud.kafka.cluster_load_percent** <br>(gauge) | Una medida de la utilización del clúster. El valor está comprendido entre 0,0 y 1,0.<br>_Se muestra como porcentaje_ |
| **confluent_cloud.kafka.cluster_load_percent_max** <br>(gauge) | Una medida de la utilización máxima del broker en todo el clúster. El valor está comprendido entre 0,0 y 1,0.<br>_Se muestra como porcentaje_ |
| **confluent_cloud.kafka.cluster_load_percent_avg** <br>(gauge) | Medida de la utilización media en todo el clúster. El valor está comprendido entre 0,0 y 1,0.<br>_Se muestra como porcentaje_ |
| **confluent_cloud.kafka.consumer_lag_offsets** <br>(gauge) | El desfase entre el desplazamiento comprometido de un miembro del grupo y la marca de agua alta de la partición. Etiquetado con `consumer_group_id` y tema.|
| **confluent_cloud.kafka.cluster_link_count** <br>(gauge) | El recuento actual de enlaces de clúster. El recuento se muestrea cada 60 segundos. La agregación de tiempo implícita para esta métrica es MAX.|
| **confluent_cloud.kafka.cluster_link_task_count** <br>(gauge) | El recuento actual de tareas de enlaces de clúster. El recuento se muestrea cada 60 segundos. La agregación de tiempo implícita para esta métrica es MAX.|
| **confluent_cloud.kafka.cluster_link_mirror_transition_in_error** <br>(gauge) | El recuento de errores de transición de estado del tema espejo de enlace de clúster para un enlace. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_bytes** <br>(count) | El recuento delta de bytes del tema de réplica de enlace de clúster. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_count** <br>(gauge) | El recuento de temas de réplica de enlace de clúster para un enlace. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.cluster_link_mirror_topic_offset_lag** <br>(gauge) | El desfase máximo del tema de espejo del enlace del clúster en todas las particiones. El desfase se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.request_bytes** <br>(gauge) | El recuento delta del total de bytes de solicitud de los tipos de solicitud especificados enviados a través de la red. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.response_bytes** <br>(gauge) | El recuento delta del total de bytes de respuesta de los tipos de respuesta especificados enviados a través de la red. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.rest_produce_request_bytes** <br>(count) | El recuento delta del total de bytes de solicitud de llamadas Kafka REST produce enviadas a través de la red solicitadas por Kafka REST.|
| **confluent_cloud.kafka.dedicated_cku_count** <br>(count) | Recuento de CKU de un clúster dedicado|
| **confluent_cloud.kafka.producer_latency_avg_milliseconds** <br>(gauge) | La latencia media de la solicitud del cliente productor.<br>_Se muestra como milisegundo_ |
| **confluent_cloud.connect.sent_records** <br>(count) | El recuento delta del número total de registros enviados desde las transformaciones y escritos en Kafka para el conector fuente. Cada muestra es el número de registros enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como registro_ |
| **confluent_cloud.connect.received_records** <br>(count) | El recuento delta del número total de registros recibidos por el conector del sink. Cada muestra es el número de registros recibidos desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como registro_ |
| **confluent_cloud.connect.sent_bytes** <br>(count) | El recuento delta del total de bytes enviados desde las transformaciones y escritos en Kafka para el conector fuente. Cada muestra es el número de bytes enviados desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.connect.received_bytes** <br>(count) | El recuento delta del total de bytes recibidos por el conector del sink. Cada muestra es el número de bytes recibidos desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como byte_ |
| **confluent_cloud.connect.dead_letter_queue_records** <br>(count) | El recuento delta de registros de cola de mensajes no entregados escritos en Kafka para el conector de sink. El recuento se muestrea cada 60 segundos.<br>_Se muestra como registro_ |
| **confluent_cloud.connect.connector_status** <br>(count) | Esta métrica monitoriza el estado de un conector dentro del sistema. Su valor siempre es 1, lo que significa que el conector está presente. El estado operativo actual del conector se identifica a través de la etiqueta de estado.<br>_Se muestra como registro_ |
| **confluent_cloud.connect.sql_server_cdc_source_connector_snapshot_running** <br>(gauge) | Representa si el snapshot se está ejecutando. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.sql_server_cdc_source_connector_snapshot_completed** <br>(gauge) | Representa si el snapshot se ha completado. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.sql_server_cdc_source_connector_schema_history_status** <br>(gauge) | Representa el estado del historial de esquemas del conector. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.mysql_cdc_source_connector_snapshot_running** <br>(gauge) | Representa si el snapshot se está ejecutando. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.mysql_cdc_source_connector_snapshot_completed** <br>(gauge) | Representa si el snapshot se ha completado. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.mysql_cdc_source_connector_schema_history_status** <br>(gauge) | Representa el estado del historial de esquemas del conector. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.postgres_cdc_source_connector_snapshot_running** <br>(gauge) | Representa si el snapshot se está ejecutando. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.postgres_cdc_source_connector_snapshot_completed** <br>(gauge) | Representa si el snapshot se ha completado. Los valores incorporarán cualquier diferencia entre los relojes de las máquinas en las que se ejecutan el servidor de base de datos y el conector.|
| **confluent_cloud.connect.connector_task_status** <br>(gauge) | Controla el estado de la tarea de un conector dentro del sistema. Su valor siempre es 1, lo que significa que la tarea del conector está presente.|
| **confluent_cloud.connect.connector_task_batch_size_avg** <br>(gauge) | Monitoriza el tamaño medio de los lotes (medido por el recuento de registros) por minuto. Para un conector fuente indica el tamaño medio del lote enviado a Kafka.<br>_Se muestra como porcentaje_ |
| **confluent_cloud.connect.connector_task_batch_size_max** <br>(gauge) | Monitoriza el tamaño máximo del lote (medido por el recuento de registros) por minuto. Para un conector fuente, indica el tamaño máximo de lote enviado a Kafka.<br>_Se muestra como porcentaje_ |
| **confluent_cloud.ksql.streaming_unit_count** <br>(gauge) | Recuento de unidades de streaming de Confluent (CSUs) para esta instancia KSQL. El recuento se muestrea cada 60 segundos. La agregación de tiempo implícita para esta métrica es MAX.<br>_Se muestra como unidad_ |
| **confluent_cloud.ksql.query_saturation** <br>(gauge) | La saturación máxima para una consulta ksqlDB dada en todos los nodos. Devuelve un valor entre 0 y 1. Un valor cercano a 1 indica que el procesamiento de consultas ksqlDB está saturado en los recursos disponibles.|
| **confluent_cloud.ksql.task_stored_bytes** <br>(gauge) | El tamaño de los almacenes de estado de una tarea determinada en bytes.<br>_Se muestra como byte_ |
| **confluent_cloud.ksql.storage_utilization** <br>(gauge) | La utilización total de almacenamiento para una aplicación ksqlDB dada.|
| **confluent_cloud.schema_registry.schema_count** <br>(gauge) | Número de esquemas registrados.|
| **confluent_cloud.schema_registry.request_count** <br>(count) | El recuento delta de solicitudes recibidas por el servidor de registro de esquemas. Cada muestra es el número de solicitudes recibidas desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.kafka.deprecated_request_count** <br>(count) | El recuento delta de solicitudes obsoletas recibidas a través de la red. Cada muestra es el número de solicitudes recibidas desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.<br>_Se muestra como solicitud_ |
| **confluent_cloud.schema_registry.schema_operations_count** <br>(count) | El recuento delta de operaciones relacionadas con el esquema. Cada muestra es el número de solicitudes recibidas desde el punto de datos anterior. El recuento se muestrea cada 60 segundos.|
| **confluent_cloud.flink.num_records_in** <br>(count) | Número total de registros que han recibido todas las sentencias SQL de Flink que aprovechan un grupo de computación de Flink.|
| **confluent_cloud.flink.num_records_out** <br>(count) | Número total de registros que han emitido todas las sentencias SQL de Flink que aprovechan un grupo de computación de Flink.|
| **confluent_cloud.flink.pending_records** <br>(gauge) | Demora total de todas las sentencias SQL de Flink que aprovechan un grupo de computación de Flink. |
| **confluent_cloud.flink.compute_pool_utilization.current_cfus** <br>(gauge) | El número absoluto de UFC en un momento dado.|
| **confluent_cloud.flink.compute_pool_utilization.cfu_minutes_consumed** <br>(count) | El número de CFUs consumidas desde la última medición.|
| **confluent_cloud.flink.compute_pool_utilization.cfu_limit** <br>(gauge) | El número máximo posible de CFUs para el grupo.|
| **confluent_cloud.flink.current_input_watermark_ms** <br>(gauge) | La última marca de agua que ha recibido esta sentencia (en milisegundos) para la tabla dada.|
| **confluent_cloud.flink.current_output_watermark_ms** <br>(gauge) | La última marca de agua que esta sentencia ha producido (en milisegundos) en la tabla dada.|
| **confluent_cloud.custom.kafka.consumer_lag_offsets** <br>(gauge) | El desfase entre el desplazamiento comprometido de un miembro del grupo y la marca de agua alta de la partición. Etiquetado con `consumer_group_id`, tema, partición, `consumer_group_id` y `client_id`.|

### Eventos

La integración de Confluent Cloud no incluye eventos.

### Checks de servicio

La integración de Confluent Cloud no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Crear y gestionar cuentas de Confluent con Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_account)
- [Crear y gestionar recursos de Confluent con Terraform](https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_confluent_resource)