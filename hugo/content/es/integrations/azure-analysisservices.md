---
aliases:
- /es/integrations/azure_analysis_services
app_id: azure-analysisservices
categories:
- nube
- azure
custom_kind: integración
description: Rastrea las métricas clave de Azure Analysis Services.
media: []
title: Servicios de análisis de Azure
---
## Información general

Azure Analysis Services es una plataforma como servicio (PaaS) totalmente gestionada que proporciona modelos de datos de nivel empresarial en la nube.

Utiliza la integración de Azure con Datadog para recopilar métricas de Azure Analysis Services.

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.analysisservices_servers.command_pool_job_queue_length** <br>(count) | Número de trabajos en la cola del grupo de subprocesos de comandos.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.connection_current_connections** <br>(count) | Número actual de conexiones de cliente establecidas.<br>_Se muestra como conexión_ |
| **azure.analysisservices_servers.current_user_sessions** <br>(count) | Número actual de sesiones de usuario establecidas.<br>_Se muestra como sesión_ |
| **azure.analysisservices_servers.m_engine_memory** <br>(gauge) | Uso de memoria por los procesos del motor mashup<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.m_engine_private_bytes** <br>(gauge) | Uso de bytes privados por los procesos del motor mashup<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.m_engine_qpu** <br>(count) | Uso de QPU por los procesos del motor mashup|
| **azure.analysisservices_servers.m_engine_virtual_bytes** <br>(gauge) | Uso de bytes virtuales por los procesos del motor mashup<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_cleaner_current_price** <br>(count) | Precio actual de la memoria, $/byte/tiempo, normalizado a 1000.|
| **azure.analysisservices_servers.memory_cleaner_memory_nonshrinkable** <br>(gauge) | Cantidad de memoria, en bytes, no sujeta a purga por el limpiador en segundo plano.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_cleaner_memory_shrinkable** <br>(gauge) | Cantidad de memoria, en bytes, sujeta a purga por el limpiador en segundo plano.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_memory_limit_hard** <br>(gauge) | Límite de memoria fijo, del archivo de configuración.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_memory_limit_high** <br>(gauge) | Límite de memoria fijo, del archivo de configuración.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_memory_limit_low** <br>(gauge) | Límite bajo de memoria, del archivo de configuración.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_memory_limit_verti_paq** <br>(gauge) | Límite en memoria, desde el archivo de configuración.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_memory_usage** <br>(gauge) | Uso de memoria del proceso del servidor utilizado para calcular el precio de la memoria más limpia. Igual al contador Process\PrivateBytes más el tamaño de los datos asignados en memoria, ignorando cualquier memoria que haya sido asignada por el motor de análisis en memoria xVelocity (VertiPaq) por encima del límite de memoria del motor xVelocity.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_metric** <br>(gauge) | Memoria. Rango 0-25 GB para S1, 0-50 GB para S2 y 0-100 GB para S4<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_quota** <br>(gauge) | Cuota de memoria actual, en bytes. La cuota de memoria también se conoce como concesión de memoria o reserva de memoria.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_quota_blocked** <br>(count) | Número actual de solicitudes de cuota que están bloqueadas hasta que se liberen otras cuotas de memoria.|
| **azure.analysisservices_servers.memory_thrashing** <br>(gauge) | Promedio de hiperpaginación de memoria.<br>_Se muestra como porcentaje_ |
| **azure.analysisservices_servers.memory_verti_paq_nonpaged** <br>(gauge) | Bytes de memoria bloqueados en el conjunto de trabajo para su uso por el motor en memoria.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.memory_verti_paq_paged** <br>(gauge) | Bytes de memoria paginada en uso para datos en memoria.<br>_Se muestra como byte_ |
| **azure.analysisservices_servers.processing_pool_job_queue_length** <br>(count) | Número de trabajos sin E/S en la cola del grupo de subprocesos de procesamiento.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.processing_rows_converted_per_sec** <br>(rate) | Porcentaje de filas convertidas durante el procesamiento.<br>_Se muestra como fila_ |
| **azure.analysisservices_servers.processing_rows_read_per_sec** <br>(rate) | Tasa de filas leídas de todas las bases de datos relacionales.<br>_Se muestra como fila_ |
| **azure.analysisservices_servers.processing_rows_written_per_sec** <br>(rate) | Tasa de filas escritas durante el procesamiento.<br>_Se muestra como fila_ |
| **azure.analysisservices_servers.qpu_metric** <br>(gauge) | QPU. Rango 0-100 para S1, 0-200 para S2 y 0-400 para S4<br>_Se muestra como unidad_ |
| **azure.analysisservices_servers.query_pool_busy_threads** <br>(count) | Número de subprocesos ocupados en el grupo de subprocesos de consulta.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.successfull_connections_per_sec** <br>(rate) | Tasa de finalizaciones de conexión con éxito.<br>_Se muestra como conexión_ |
| **azure.analysisservices_servers.threads_command_pool_busy_threads** <br>(count) | Número de subprocesos ocupados en el grupo de subprocesos de comandos.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_command_pool_idle_threads** <br>(count) | Número de subprocesos inactivos en el grupo de subprocesos de comandos.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_long_parsing_busy_threads** <br>(count) | Número de subprocesos ocupados en el grupo de subprocesos de análisis largos.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_long_parsing_idle_threads** <br>(count) | Número de subprocesos inactivos en el grupo de subprocesos de análisis largo.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_long_parsing_job_queue_length** <br>(count) | Número de trabajos en la cola del grupo de subprocesos de análisis largo.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.threads_processing_pool_busy_i_o_job_threads** <br>(count) | Número de subprocesos que ejecutan trabajos de E/S en el grupo de subprocesos de procesamiento.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_processing_pool_busy_non_i_o_threads** <br>(count) | Número de subprocesos que ejecutan trabajos que no sean de E/S en el grupo de subprocesos de procesamiento.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_processing_pool_i_o_job_queue_length** <br>(count) | Número de trabajos de E/S en la cola del grupo de subprocesos de procesamiento.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.threads_processing_pool_idle_i_o_job_threads** <br>(count) | Número de subprocesos inactivos para trabajos de E/S en el grupo de subprocesos de procesamiento.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_processing_pool_idle_non_i_o_threads** <br>(count) | Número de subprocesos inactivos en el grupo de subprocesos de procesamiento dedicados a trabajos que no son de E/S.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_query_pool_idle_threads** <br>(count) | Número de subprocesos inactivos para trabajos de E/S en el grupo de subprocesos de procesamiento.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_query_pool_job_queue_length** <br>(count) | Número de trabajos en la cola del grupo de subprocesos de consulta.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.threads_short_parsing_busy_threads** <br>(count) | Número de subprocesos ocupados en el grupo de subprocesos de análisis corto.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_short_parsing_idle_threads** <br>(count) | Número de subprocesos inactivos en el grupo de subprocesos de análisis corto.<br>_Se muestra como subproceso_ |
| **azure.analysisservices_servers.threads_short_parsing_job_queue_length** <br>(count) | Número de trabajos en la cola del grupo de subprocesos de análisis corto.<br>_Se muestra como trabajo_ |
| **azure.analysisservices_servers.total_connection_failures** <br>(count) | Total de intentos de conexión fallidos.<br>_Se muestra como conexión_ |
| **azure.analysisservices_servers.total_connection_requests** <br>(count) | Total de solicitudes de conexión. Se trata de llegadas.<br>_Se muestra como solicitud_ |
| **azure.analysisservices_servers.count** <br>(gauge) | El recuento de recursos de servicios de Azure Analysis|

### Eventos

La integración Azure Analysis Services no incluye eventos.

### Checks de servicio

La integración Azure Analysis Services no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).