---
app_id: azure_synapse
categories:
- nube
- azure
custom_kind: integración
description: Realiza el seguimiento de métricas clave de Azure Synapse.
title: Microsoft Azure Synapse
---
## Información general

Azure Synapse Analytics es un servicio de análisis que reúne la integración de datos, el almacenamiento de datos empresariales y los análisis de big data.

Utiliza la integración Datadog Azure para recopilar métricas de Azure Synapse.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft y Azure](https://docs.datadoghq.com/integrations/azure/). No hay más pasos de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.synapse_workspaces.builtin_sql_pool_data_processed_bytes** <br>(count) | Cantidad de datos procesados por las consultas.<br>_Mostrado como byte_ |
| **azure.synapse_workspaces.builtin_sql_pool_login_attempts** <br>(count) | Número de intentos de inicio de sesión exitosos o fallidos.|
| **azure.synapse_workspaces.builtin_sql_pool_requests_ended** <br>(count) | Número de solicitudes que han tenido éxito, han fallado o se han cancelado.|
| **azure.synapse_workspaces.integration_activity_runs_ended** <br>(count) | Número de actividades de integración que tuvieron éxito, han fallado o se han cancelado.|
| **azure.synapse_workspaces.integration_link_connection_events** <br>(count) | Número de eventos de connection (conexión) de Synapse Link incluidos el inicio, la parada y el fallo.|
| **azure.synapse_workspaces.integration_link_processed_changed_rows** <br>(count) | Número de filas cambiado procesadas por Synapse Link.|
| **azure.synapse_workspaces.integration_link_processed_data_volume** <br>(count) | Volumen de datos en bytes procesados por Synapse Link.<br>_Mostrado como byte_ |
| **azure.synapse_workspaces.integration_link_processing_latency_in_seconds** <br>(gauge) | Latencia de procesamiento de datos de Synapse Link en segundos.|
| **azure.synapse_workspaces.integration_link_table_events** <br>(count) | Número de eventos de la tabla de Synapse Link incluidos instantánea, eliminación y fallo.|
| **azure.synapse_workspaces.integration_pipeline_runs_ended** <br>(count) | Numero de ejecuciones de pipelines de integración que han tenido éxito, han fallado o se han cancelado.|
| **azure.synapse_workspaces.integration_trigger_runs_ended** <br>(count) | Número de activadores de integración que han tenido éxito, han fallado o se han cancelado.|
| **azure.synapse_workspaces.sql_streaming_backlogged_input_event_sources** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de fuentes de eventos de entrada pendientes.|
| **azure.synapse_workspaces.sql_streaming_conversion_errors** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de salida que no pudieron convertirse en el esquema de salida esperado. La política de errores puede modificarse para descartar los eventos que se encuentren en esta situación.|
| **azure.synapse_workspaces.sql_streaming_deserialization_error** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de entrada que no se han podido deserializar.|
| **azure.synapse_workspaces.sql_streaming_early_input_events** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de entrada cuya hora de aplicación se considera temprana en comparación con la hora de llegada, según la política de llegada temprana.|
| **azure.synapse_workspaces.sql_streaming_input_event_bytes** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Cantidad de datos recibidos por el job (generic) de streaming, en bytes. Se puede utilizar para validar que se están enviando eventos a la source (fuente) de entrada.|
| **azure.synapse_workspaces.sql_streaming_input_events** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de entrada.|
| **azure.synapse_workspaces.sql_streaming_input_events_sources_per_second** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de fuentes de eventos de entrada por segundo.|
| **azure.synapse_workspaces.sql_streaming_late_input_events** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de entrada cuya hora de aplicación se considera tardía en comparación con la hora de llegada, según la política de llegada tardía.|
| **azure.synapse_workspaces.sql_streaming_out_of_order_events** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos del Centro de eventos (mensajes serializados) recibidos por el adaptador de entrada del Centro de eventos, recibidos en desorden que se descartaron o a los que se asignó una marca de tiempo ajustada, según la política de ordenamiento de eventos.|
| **azure.synapse_workspaces.sql_streaming_output_events** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número de eventos de salida.|
| **azure.synapse_workspaces.sql_streaming_output_watermark_delay_seconds** <br>(gauge) | Esta es una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Retraso de la marca de agua de salida en segundos.|
| **azure.synapse_workspaces.sql_streaming_resource_utilization** <br>(gauge) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces.sql_streaming_runtime_errors** <br>(count) | Se trata de una métrica preliminar disponible en el Este de EE.UU. y el Oeste de Europa. Número total de errores relacionados con el procesamiento de consultas (excluidos los errores encontrados durante la ingesta de eventos o la salida de resultados).|
| **azure.synapse_workspaces.count** <br>(gauge) | Número de espacios de trabajo de Synapse.|
| **azure.synapse_workspaces_bigdatapools.big_data_pool_allocated_cores** <br>(gauge) | Núcleos virtuales asignados para un grupo de Apache Spark.|
| **azure.synapse_workspaces_bigdatapools.big_data_pool_allocated_memory** <br>(gauge) | Memoria asignada para el grupo de Apache Spark (GB).|
| **azure.synapse_workspaces_bigdatapools.big_data_pool_applications_active** <br>(gauge) | Total de aplicaciones activas del grupo de Apache Spark.|
| **azure.synapse_workspaces_bigdatapools.big_data_pool_applications_ended** <br>(count) | Número de aplicaciones finalizadas del grupo de Apache Spark.|
| **azure.synapse_workspaces_bigdatapools.count** <br>(gauge) | Número de bigDataPools de espacios de trabajo de Synapse.|
| **azure.synapse_workspaces_scopepools.scope_pool_job_pn_metric** <br>(gauge) | Duración (milisegundos) de PN (nodo de proceso) utilizada por cada job (generic) de SCOPE.<br>_Mostrado como milisegundo_ |
| **azure.synapse_workspaces_scopepools.scope_pool_job_queued_duration_metric** <br>(gauge) | Duración de la cola (milisegundos) utilizada por cada job (generic) de SCOPE.<br>_Mostrado como milisegundo_ |
| **azure.synapse_workspaces_scopepools.scope_pool_job_running_duration_metric** <br>(gauge) | Duración de la ejecución (milisegundos) utilizada por cada job (generic) de SCOPE.<br>_Mostrado como milisegundo_ |
| **azure.synapse_workspaces_scopepools.count** <br>(gauge) | Número de scopePools de espacios de trabajo de Synapse.|
| **azure.synapse_workspaces_sqlpools.active_queries** <br>(count) | Consultas activas. Al utilizar esta métrica sin filtrar y sin dividir, se muestran todas las consultas activas que se ejecutan en el sistema.|
| **azure.synapse_workspaces_sqlpools.adaptive_cache_hit_percent** <br>(gauge) | Mide lo bien que las cargas de trabajo están utilizando la caché adaptable. Utiliza esta métrica con la métrica de porcentaje de aciertos de caché para determinar si se debe escalar para obtener capacidad adicional o volver a ejecutar cargas de trabajo para hidratar la caché.<br>_Mostrado como porcentaje_. |
| **azure.synapse_workspaces_sqlpools.adaptive_cache_used_percent** <br>(gauge) | Mide lo bien que las cargas de trabajo están utilizando la caché adaptable. Utiliza esta métrica con la métrica de porcentaje de caché utilizada para determinar si se debe escalar para obtener capacidad adicional o volver a ejecutar cargas de trabajo para hidratar la caché.<br>_Mostrado como porcentaje_. |
| **azure.synapse_workspaces_sqlpools.connections** <br>(count) | Número del total de inicios de sesión en el grupo de SQL.|
| **azure.synapse_workspaces_sqlpools.connections_blocked_by_firewall** <br>(count) | Número de conexiones bloqueadas por reglas de cortafuegos. Revisa las políticas de control de acceso para tu grupo de SQL y monitoriza estas conexiones si el número es alto.|
| **azure.synapse_workspaces_sqlpools.cpu_percent** <br>(gauge) | Utilización de la CPU en todos los nodos del grupo de SQL.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces_sqlpools.dwu_limit** <br>(gauge) | Objetivo de nivel de servicio del grupo de SQL.|
| **azure.synapse_workspaces_sqlpools.dwu_used** <br>(gauge) | Representa una representación de alto nivel del uso a través del grupo de SQL. Medido por el límite de DWU * porcentaje de DWU.|
| **azure.synapse_workspaces_sqlpools.dwu_used_percent** <br>(gauge) | Representa una representación de alto nivel del uso a través del grupo de SQL. Se mide tomando el máximo entre el porcentaje de CPU y el porcentaje de entrada/salida de datos.<br>_Mostrado como porcentaje_. |
| **azure.synapse_workspaces_sqlpools.local_temp_db_used_percent** <br>(gauge) | Utilización local de la base de datos temporal en todos los nodos de cálculo, los valores se emiten cada cinco minutos.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces_sqlpools.memory_used_percent** <br>(gauge) | Utilización de la memoria en todos los nodos del grupo de SQL.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces_sqlpools.queued_queries** <br>(count) | Número acumulado de solicitudes en cola una vez alcanzado el límite máximo de concurrencia.|
| **azure.synapse_workspaces_sqlpools.wlg_active_queries** <br>(count) | Consultas activas dentro del grupo de carga de trabajo. El uso de esta métrica sin filtrar y sin dividir muestra todas las consultas activas que se ejecutan en el sistema.|
| **azure.synapse_workspaces_sqlpools.wlg_active_queries_timeouts** <br>(count) | Consultas para el grupo de carga de trabajo que han agotado el tiempo de espera. Los tiempos de espera de las consultas de los que informa esta métrica son solo una vez que la consulta ha comenzado a ejecutarse (no incluye el tiempo de espera debido a bloqueos o esperas de recursos).|
| **azure.synapse_workspaces_sqlpools.wlg_allocation_by_effective_cap_resource_percent** <br>(gauge) | Muestra el porcentaje de asignación de recursos en relación con el porcentaje efectivo de recursos límite por grupo de carga de trabajo. Esta métrica proporciona la utilización efectiva del grupo de carga de trabajo.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces_sqlpools.wlg_allocation_by_system_percent** <br>(gauge) | Porcentaje de asignación de recursos en relación con todo el sistema.<br>_Mostrado como porcentaje_ |
| **azure.synapse_workspaces_sqlpools.wlg_effective_cap_resource_percent** <br>(gauge) | Porcentaje efectivo de recursos límite para el grupo de carga de trabajo. Si hay otros grupos de carga de trabajo con un porcentaje_mínimo_de_recursos mayor que 0, el porcentaje_efectivo_de_recursos_límite se reduce proporcionalmente.<br>_Mostrado como porcentaje_. |
| **azure.synapse_workspaces_sqlpools.wlg_effective_min_resource_percent** <br>(gauge) | Porcentaje mínimo efectivo de recursos permitido teniendo en cuenta el nivel de servicio y los parámetros del grupo de carga de trabajo. El porcentaje_mínimo_efectivo_de_recursos puede ajustarse más alto en niveles de servicio más bajos.<br>_Mostrado como porcentaje_. |
| **azure.synapse_workspaces_sqlpools.wlg_queued_queries** <br>(count) | Número acumulado de solicitudes en cola una vez alcanzado el límite máximo de concurrencia.|
| **azure.synapse_workspaces_sqlpools.count** <br>(gauge) | Número de sqlPools de espacios de trabajo de Synapse.|

### Eventos

La integración Azure Synapse no incluye eventos.

### Checks de servicio

La integración Azure Synapse no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).