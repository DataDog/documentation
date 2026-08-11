---
aliases:
- /es/integrations/awsemr/
app_id: amazon_emr
categories:
- aws
- cloud
- log collection
custom_kind: integración
description: Rastrea las métricas clave de Amazon EMR.
title: Amazon EMR
---
## Información general

<div class="alert alert-info">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costes de tus trabajos de Spark en tus clústeres de EMR.
</div>

Amazon EMR es un servicio web que facilita el procesamiento rápido y rentable de grandes cantidades de datos.

Habilita esta integración para ver las métricas de EMR en Datadog.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Amazon Web Services](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Recopilación de métricas

1. En la [página de la integración de AWS](https://app.datadoghq.com/integrations/amazon-web-services), asegúrate de que `EMR` está habilitado en la pestaña `Metric Collection`.

1. Añade los siguientes permisos a tu [política de IAM de Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) para recopilar métricas de Amazon EMR. Para obtener más información, consulta las [políticas de EMR](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-authentication-access-control.html) en el sitio web de AWS.

   | Permiso de AWS                     | Descripción                         |
   | ---------------------------------- | ----------------------------------- |
   | `elasticmapreduce:ListClusters` | Lista de clústeres disponibles.            |
   | `elasticmapreduce:DescribeCluster` | Añadir etiquetas a las métricas de CloudWatch EMR. |

1. Instala la [integración de Datadog y Amazon EMR](https://app.datadoghq.com/integrations/amazon-emr).

### Recopilación de logs

#### Activar logging

Configura Amazon EMR para enviar logs a un bucket de S3 o a CloudWatch.

**Nota**: Si vas a loguear en un bucket de S3, asegúrate de que `amazon_emr` está configurado como _Target prefix_ (Prefijo de destino).

#### Enviar logs a Datadog

1. Si aún no lo has hecho, configura la [función de Lambda del Datadog Forwarder](https://docs.datadoghq.com/logs/guide/forwarder/).

1. Una vez instalada la función de Lambda, añade manualmente un activador en el bucket de S3 o grupo de logs de CloudWatch que contenga tus logs de Amazon EMR en la consola de AWS:

   - [Añadir un activador manual en el bucket de S3](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-s3-buckets)
   - [Añadir un activador manual en el CloudWatch Log Group](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group)

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **aws.elasticmapreduce.apps_completed** <br>(gauge) | Número medio de aplicaciones enviadas a YARN que se han completado. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_completed.sum** <br>(gauge) | La suma del número de aplicaciones enviadas a YARN que se han completado. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_failed** <br>(gauge) | Número medio de aplicaciones enviadas a YARN que no se han completado. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_failed.sum** <br>(gauge) | La suma del número de aplicaciones enviadas a YARN que no se han completado. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_killed** <br>(gauge) | El número medio de aplicaciones enviadas a YARN que han sido eliminadas. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_killed.sum** <br>(gauge) | La suma del número de aplicaciones enviadas a YARN que han sido eliminadas. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_pending** <br>(gauge) | Número medio de aplicaciones enviadas a YARN que se encuentran en estado pendiente. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_pending.sum** <br>(gauge) | La suma del número de aplicaciones enviadas a YARN que se encuentran en estado pendiente. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_running** <br>(gauge) | El número medio de aplicaciones enviadas a YARN que se están ejecutando. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_running.sum** <br>(gauge) | La suma del número de aplicaciones enviadas a YARN que se están ejecutando. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_submitted** <br>(gauge) | Número medio de solicitudes enviadas a YARN. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.apps_submitted.sum** <br>(gauge) | La suma del número de solicitudes enviadas a YARN. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.backup_failed** <br>(count) | Si falló la última copia de seguridad. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.capacity_remaining_gb** <br>(gauge) | La cantidad media de capacidad de disco HDFS restante. (Sólo Hadoop v2)<br>_Se muestra como byte_. |
| **aws.elasticmapreduce.capacity_remaining_gb.sum** <br>(gauge) | La suma de la cantidad de capacidad de disco HDFS restante. (Sólo Hadoop v2)<br>_Se muestra como byte_. |
| **aws.elasticmapreduce.container_allocated** <br>(gauge) | El número medio de contenedores de recursos asignados por el ResourceManager. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.container_allocated.sum** <br>(gauge) | La suma del número de contenedores de recursos asignados por el ResourceManager. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.container_pending** <br>(gauge) | El número medio de contenedores en la cola que aún no han sido asignados. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.container_pending.sum** <br>(gauge) | La suma del número de contenedores en la cola que aún no han sido asignados. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.container_pending_ratio** <br>(gauge) | Porcentaje medio de contenedores en la cola que aún no han sido asignados. (Sólo Hadoop v2)<br>_Se muestra como porcentaje_. |
| **aws.elasticmapreduce.container_reserved** <br>(gauge) | El número medio de contenedores reservados. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.container_reserved.sum** <br>(gauge) | La suma del número de contenedores reservados. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.core_nodes_pending** <br>(gauge) | Número medio de nodos centrales en espera de ser asignados. Es posible que no todos los nodos centrales solicitados estén disponibles inmediatamente; esta métrica informa de las solicitudes pendientes. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_nodes_pending.sum** <br>(gauge) | La suma del número de nodos centrales en espera de ser asignados. Es posible que no todos los nodos centrales solicitados estén disponibles inmediatamente; esta métrica informa de las solicitudes pendientes. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_nodes_requested** <br>(gauge) | El número medio de nodos centrales en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_nodes_requested.sum** <br>(gauge) | La suma del número de nodos centrales de un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_nodes_running** <br>(gauge) | Número medio de nodos centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_nodes_running.sum** <br>(gauge) | La suma del número de nodos centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_units_requested** <br>(gauge) | El número medio de unidades centrales en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_units_requested.sum** <br>(gauge) | La suma del número de unidades centrales en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_units_running** <br>(gauge) | Número objetivo de unidades centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_units_running.sum** <br>(gauge) | La suma del número de unidades centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_vcpu_requested** <br>(gauge) | El número medio de vCPUs centrales en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_vcpu_requested.sum** <br>(gauge) | La suma del número de vCPUs centrales en un clúster según lo determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_vcpu_running** <br>(gauge) | Número medio de vCPU centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.core_vcpu_running.sum** <br>(gauge) | La suma del número de vCPUs centrales en funcionamiento. Los puntos de datos de esta métrica sólo se notifican cuando existe un grupo de instancias correspondiente.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.corrupt_blocks** <br>(gauge) | El número medio de bloques que HDFS reporta como corruptos. (Sólo Hadoop v2)<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.corrupt_blocks.sum** <br>(gauge) | La suma del número de bloques que HDFS reporta como corruptos. (Sólo Hadoop v2)<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.dfs_fsnamesystem_pending_replication_blocks** <br>(gauge) | El estado de la replicación de bloques: bloques que se están replicando, antigüedad de las solicitudes de replicación y solicitudes de replicación fallidas. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.hbase_backup_failed** <br>(gauge) | Si falló la última copia de seguridad. Se establece en 0 por defecto y se actualiza a 1 si el intento de copia de seguridad anterior falló. Esta métrica sólo se reporta para clústeres HBase. (Sólo Hadoop v2)|
| **aws.elasticmapreduce.hbase_most_recent_backup_duration** <br>(gauge) | El tiempo que tardó en completarse la última copia de seguridad. Esta métrica se establece independientemente de si la última copia de seguridad completada tuvo éxito o falló. Mientras la copia de seguridad está en curso, esta métrica devuelve el número de minutos transcurridos desde el inicio de la copia de seguridad. Esta métrica sólo se informa para clústeres HBase.<br>_Se muestra como minuto_ |
| **aws.elasticmapreduce.hbase_time_since_last_successful_backup** <br>(gauge) | El número de minutos transcurridos desde la última copia de seguridad de HBase iniciada correctamente en tu clúster. Esta métrica sólo se informa para clústeres HBase.<br>_Se muestra como minuto_ |
| **aws.elasticmapreduce.hdfsbytes_read** <br>(gauge) | El número medio de bytes leídos de HDFS.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.hdfsbytes_read.sum** <br>(gauge) | La suma del número de bytes leídos desde HDFS.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.hdfsbytes_written** <br>(gauge) | El número medio de bytes escritos en HDFS.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.hdfsbytes_written.sum** <br>(gauge) | La suma del número de bytes escritos en HDFS.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.hdfsutilization** <br>(gauge) | El porcentaje de almacenamiento HDFS utilizado actualmente.<br>_Se muestra como porcentaje_ |
| **aws.elasticmapreduce.is_idle** <br>(gauge) | Indica que un clúster ya no está realizando trabajo, pero sigue vivo y acumulando cargos. Se establece en 1 si no hay tareas ni trabajos en ejecución, y en 0 en caso contrario. Este valor se comprueba a intervalos de cinco minutos y un valor de 1 sólo indica que el clúster estaba inactivo cuando se comprobó, no que estuviera inactivo durante los cinco minutos.|
| **aws.elasticmapreduce.jobs_failed** <br>(gauge) | El número medio de trabajos en el clúster que han fallado. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.jobs_failed.sum** <br>(gauge) | La suma del número de trabajos en el clúster que han fallado. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.jobs_running** <br>(gauge) | El número medio de trabajos en el clúster que se están ejecutando actualmente. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.jobs_running.sum** <br>(gauge) | La suma del número de trabajos en el clúster que se están ejecutando actualmente. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.live_data_nodes** <br>(gauge) | El porcentaje de nodos de datos que están recibiendo trabajo de Hadoop.<br>_Se muestra como porcentaje_ |
| **aws.elasticmapreduce.live_task_trackers** <br>(gauge) | El porcentaje de rastreadores de tareas que son funcionales. (Sólo Hadoop v1)<br>_Se muestra como porcentaje_ |
| **aws.elasticmapreduce.map_slots_open** <br>(gauge) | La capacidad media de tareas de mapa no utilizadas. Se calcula como el número máximo de tareas de mapa para un clúster determinado, menos el número total de tareas de mapa que se ejecutan actualmente en ese clúster. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.map_slots_open.sum** <br>(gauge) | La suma de la capacidad de tareas de mapa no utilizadas. Se calcula como el número máximo de tareas de mapa para un clúster determinado, menos el número total de tareas de mapa que se ejecutan actualmente en ese clúster. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.memory_allocated_mb** <br>(gauge) | La cantidad media de memoria asignada al clúster. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_allocated_mb.sum** <br>(gauge) | La suma de la cantidad de memoria asignada al clúster. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_available_mb** <br>(gauge) | La cantidad media de memoria disponible para ser asignada. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_available_mb.sum** <br>(gauge) | La suma de la cantidad de memoria disponible para ser asignada. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_reserved_mb** <br>(gauge) | La cantidad media de memoria reservada. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_reserved_mb.sum** <br>(gauge) | La suma de la cantidad de memoria reservada. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_total_mb** <br>(gauge) | La cantidad total media de memoria en el clúster. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.memory_total_mb.sum** <br>(gauge) | La suma de la cantidad total de memoria en el clúster. (Sólo Hadoop v2)<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.missing_blocks** <br>(gauge) | El número medio de bloques en los que HDFS no tiene réplicas. Puede tratarse de bloques corruptos.<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.missing_blocks.sum** <br>(gauge) | La suma del número de bloques en los que HDFS no tiene réplicas. Puede tratarse de bloques corruptos.<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.mractive_nodes** <br>(gauge) | El número medio de nodos que actualmente ejecutan tareas o trabajos MapReduce. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mractive_nodes.sum** <br>(gauge) | La suma del número de nodos que actualmente ejecutan tareas o trabajos MapReduce. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrdecommissioned_nodes** <br>(gauge) | El número medio de nodos asignados a aplicaciones MapReduce que se han marcado en estado DECOMISSIONED. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrdecommissioned_nodes.sum** <br>(gauge) | La suma del número de nodos asignados a las aplicaciones de MapReduce que se han marcado en estado DECOMMISSIONED. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrlost_nodes** <br>(gauge) | El número medio de nodos asignados a MapReduce que se han marcado en estado LOST. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrlost_nodes.sum** <br>(gauge) | La suma del número de nodos asignados a MapReduce que han sido marcados en estado LOST. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrrebooted_nodes** <br>(gauge) | El número medio de nodos disponibles para MapReduce que han sido reiniciados y marcados en estado REBOOTED. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrrebooted_nodes.sum** <br>(gauge) | La suma del número de nodos disponibles para MapReduce que han sido reiniciados y marcados en estado REBOOTED. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrtotal_nodes** <br>(gauge) | El número medio de nodos actualmente disponibles para los trabajos de MapReduce. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrtotal_nodes.sum** <br>(gauge) | La suma del número de nodos actualmente disponibles para los trabajos de MapReduce. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrunhealthy_nodes** <br>(gauge) | El número medio de nodos disponibles para MapReduce trabajos marcados en estado UNHEALTHY. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.mrunhealthy_nodes.sum** <br>(gauge) | La suma del número de nodos disponibles para trabajos de MapReduce marcados en estado UNHEALTHY. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.multi_master_instance_group_nodes_requested** <br>(count) | El número de nodos maestros solicitados. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.multi_master_instance_group_nodes_running** <br>(count) | El número de nodos maestros en ejecución. (Sólo Hadoop v2)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.multi_master_instance_group_nodes_running_percentage** <br>(gauge) | El porcentaje de nodos maestros que se están ejecutando por encima del recuento de instancias de nodo maestro solicitado. (Sólo Hadoop v2)<br>_Se muestra como porcentaje_ |
| **aws.elasticmapreduce.no_of_black_listed_task_trackers** <br>(gauge) | El número medio de nodos de TaskTracker prohibidos.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.no_of_black_listed_task_trackers.sum** <br>(gauge) | La suma del número de nodos TaskTracker prohibidos.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.no_of_gray_listed_task_trackers** <br>(gauge) | Número medio de nodos TaskTracker en la lista gris.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.no_of_gray_listed_task_trackers.sum** <br>(gauge) | La suma del número de nodos TaskTracker en la lista gris.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.pending_deletion_blocks** <br>(gauge) | El número medio de bloques marcados para su eliminación. (Sólo Hadoop v2)<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.pending_deletion_blocks.sum** <br>(gauge) | La suma del número de bloques marcados para su eliminación. (Sólo Hadoop v2)<br>_Se muestra como bloque_. |
| **aws.elasticmapreduce.reduce_slots_open** <br>(gauge) | Capacidad media de tareas de reducción no utilizadas. Se calcula como la capacidad máxima de tareas de reducción para un clúster determinado, menos el número de tareas de reducción que se están ejecutando en ese clúster. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.reduce_slots_open.sum** <br>(gauge) | La suma de la capacidad de reducción no utilizada. Se calcula como la capacidad máxima de tareas de reducción para un clúster determinado, menos el número de tareas de reducción que se ejecutan actualmente en ese clúster. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.remaining_map_tasks** <br>(gauge) | El número medio de tareas de mapa restantes para cada trabajo. Si tienes un programador instalado y varios trabajos en ejecución, se generarán varios gráficos. Una tarea de mapa restante es aquella que no se encuentra en ninguno de los siguientes estados: Running, Killed, o Completed. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.remaining_map_tasks.sum** <br>(gauge) | La suma del número de tareas de mapa restantes para cada trabajo. Si tienes un programador instalado y varios trabajos en ejecución, se generarán varios gráficos. Una tarea de mapa restante es aquella que no se encuentra en ninguno de los siguientes estados: Running, Killed, o Completed. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.remaining_map_tasks_per_slot** <br>(gauge) | La relación entre el total de tareas de mapa restantes y el total de slots de mapa disponibles en el clúster. (Sólo Hadoop v1)|
| **aws.elasticmapreduce.remaining_reduce_tasks** <br>(gauge) | El número medio de tareas de reducción restantes para cada trabajo. Si tienes un programador instalado y varios trabajos en ejecución, se generarán varios gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.remaining_reduce_tasks.sum** <br>(gauge) | La suma del número de tareas de reducción restantes para cada trabajo. Si tienes un programador instalado y múltiples trabajos en ejecución, se generan múltiples gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.running_map_tasks** <br>(gauge) | El número medio de tareas de mapa en ejecución para cada trabajo. Si tienes un programador instalado y múltiples tareas en ejecución, se generan múltiples gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.running_map_tasks.sum** <br>(gauge) | La suma del número de tareas de mapa en ejecución para cada trabajo. Si tienes un programador instalado y múltiples tareas en ejecución, se generan múltiples gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.running_reduce_tasks** <br>(gauge) | El número medio de tareas de reducción en ejecución para cada trabajo. Si tienes un programador instalado y múltiples trabajos en ejecución, se generan múltiples gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.running_reduce_tasks.sum** <br>(gauge) | La suma del número de tareas de reducción en ejecución para cada trabajo. Si tienes un programador instalado y múltiples trabajos en ejecución, se generan múltiples gráficos. (Sólo Hadoop v1)<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.s_3bytes_read** <br>(gauge) | El número medio de bytes leídos de Amazon S3.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.s_3bytes_read.sum** <br>(gauge) | La suma del número de bytes leídos de Amazon S3.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.s_3bytes_written** <br>(gauge) | El número medio de bytes escritos en Amazon S3.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.s_3bytes_written.sum** <br>(gauge) | La suma del número de bytes escritos en Amazon S3.<br>_Se muestra como byte_ |
| **aws.elasticmapreduce.task_nodes_pending** <br>(gauge) | Número medio de nodos de tarea en espera de ser asignados. Es posible que no todos los nodos de tarea solicitados estén disponibles inmediatamente; esta métrica informa de las solicitudes pendientes. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_nodes_pending.sum** <br>(gauge) | La suma del número de nodos de tarea en espera de ser asignados. Es posible que no todos los nodos de tarea solicitados estén disponibles inmediatamente; esta métrica informa de las solicitudes pendientes. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_nodes_requested** <br>(gauge) | El número medio de nodos de tareas en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_nodes_requested.sum** <br>(gauge) | La suma del número de nodos de tareas en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_nodes_running** <br>(gauge) | Número medio de nodos de tarea en funcionamiento. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_nodes_running.sum** <br>(gauge) | La suma del número de nodos de tarea en funcionamiento. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_units_requested** <br>(gauge) | El número medio de unidades de tarea en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_units_requested.sum** <br>(gauge) | La suma del número de unidades de tarea en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_units_running** <br>(gauge) | Número medio de unidades de tarea en funcionamiento. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_units_running.sum** <br>(gauge) | La suma del número de unidades de tarea en funcionamiento. Los puntos de datos para esta métrica se reportan sólo cuando existe un grupo de instancia correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_vcpu_requested** <br>(gauge) | El número medio de vCPUs de tarea en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_vcpu_requested.sum** <br>(gauge) | La suma del número de vCPUs de tarea en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_vcpu_running** <br>(gauge) | Número medio de vCPUs de tarea en funcionamiento. Los puntos de datos para esta métrica sólo se reportan cuando existe un grupo de instancias correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.task_vcpu_running.sum** <br>(gauge) | La suma del número de vCPUs de tarea en funcionamiento. Los puntos de datos para esta métrica sólo se reportan cuando existe un grupo de instancias correspondiente. (Sólo Hadoop v1)<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_load** <br>(gauge) | El número total medio de transferencias de datos simultáneas.|
| **aws.elasticmapreduce.total_load.sum** <br>(gauge) | La suma del número total de transferencias de datos concurrentes.|
| **aws.elasticmapreduce.total_map_tasks** <br>(gauge) | El número total medio de tareas del mapa.<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.total_map_tasks.sum** <br>(gauge) | La suma del número total de tareas del mapa.<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.total_nodes_requested** <br>(gauge) | El número total de nodos de un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_nodes_requested.average** <br>(gauge) | La media del número total de nodos de un clúster determinada por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_nodes_running** <br>(gauge) | Número medio actual de nodos disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_nodes_running.sum** <br>(gauge) | La suma actual de nodos disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_reduce_tasks** <br>(gauge) | El número total medio de tareas de reducción.<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.total_reduce_tasks.sum** <br>(gauge) | La suma del número total de tareas de reducción.<br>_Se muestra como tarea_ |
| **aws.elasticmapreduce.total_units_requested** <br>(gauge) | El número total medio de unidades en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_units_requested.sum** <br>(gauge) | La suma del número total de unidades en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_units_running** <br>(gauge) | El número medio actual de unidades disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_units_running.sum** <br>(gauge) | La suma actual de unidades disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_vcpu_requested** <br>(gauge) | El número total medio de vCPUs en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_vcpu_requested.sum** <br>(gauge) | La suma del número total de vCPUs en un clúster determinado por el escalado gestionado.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_vcpu_running** <br>(gauge) | El número medio actual de vCPUs disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.total_vcpu_running.sum** <br>(gauge) | La suma actual de vCPUs disponibles en un clúster en ejecución.<br>_Se muestra como nodo_ |
| **aws.elasticmapreduce.under_replicated_blocks** <br>(gauge) | El número medio de bloques que necesitan ser replicados una o más veces. (Sólo Hadoop v2)<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.under_replicated_blocks.sum** <br>(gauge) | La suma del número de bloques que necesitan ser replicados una o más veces. (Sólo Hadoop v2)<br>_Se muestra como bloque_ |
| **aws.elasticmapreduce.yarnmemory_available_percentage** <br>(gauge) | El porcentaje de memoria restante disponible para YARN. (Sólo Hadoop v2)<br>_Se muestra como porcentaje_ |

A cada una de las métricas recuperadas de AWS se le asignan las mismas etiquetas (tags) que aparecen en la consola de AWS, incluidos, entre otros, el nombre del host y los grupos de seguridad.

### Eventos

La integración de Amazon EMR no incluye ningún evento.

### Checks de servicio

La integración de Amazon EMR no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).