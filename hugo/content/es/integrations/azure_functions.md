---
app_id: azure_functions
categories:
- azure
- nube
- suministro
custom_kind: integración
description: Rastrea las métricas principales de Azure Functions.
title: Microsoft Azure Functions
---
## Información general

Azure Functions es una plataforma de computación sin servidor basada en eventos que también puede resolver problemas complejos de orquestación. Crea y depura localmente sin configuración adicional, despliega y opera a escala en la nube e integra servicios mediante activadores y enlaces.

Obtén métricas de Azure Functions para:

- Visualizar el rendimiento y la utilización de tu función
- Correlacionar el rendimiento de tu Azure Functions con el resto de tus aplicaciones

## Configuración

### Instalación

Si aún no lo has hecho, primero configura la [integración de Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No es necesario realizar ningún otro paso de instalación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.functions.average_memory_working_set** <br>(gauge) | Conjunto de trabajo de memoria media<br>_Se muestra como byte_ |
| **azure.functions.average_response_time** <br>(gauge) | El tiempo medio que tarda la aplicación en enviar las solicitudes, en segundos.<br>_Se muestra como segundo_ |
| **azure.functions.bytes_received** <br>(gauge) | Datos entrantes<br>_Se muestra como byte_ |
| **azure.functions.bytes_sent** <br>(gauge) | Datos salientes<br>_Se muestra como byte_ |
| **azure.functions.connections** <br>(gauge) | Conexiones<br>_Se muestra como conexión_ |
| **azure.functions.current_assemblies** <br>(gauge) | Montajes actuales|
| **azure.functions.function_execution_count** <br>(count) | Recuento de ejecución de funciones|
| **azure.functions.function_execution_units** <br>(count) | Unidades de ejecución de funciones|
| **azure.functions.function_execution_units.max** <br>(count) | Unidades máximas de ejecución de funciones (Max Aggregated)|
| **azure.functions.gen_0_garbage_collections** <br>(gauge) | Recopilación de elementos no usados de generación 0|
| **azure.functions.gen_1_garbage_collections** <br>(gauge) | Recopilación de elementos no usados de generación 1|
| **azure.functions.gen_2_garbage_collections** <br>(gauge) | Recopilación de elementos no usados de generación 2|
| **azure.functions.handle_count** <br>(count) | Recuento de identificadores|
| **azure.functions.http101** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP 101.|
| **azure.functions.http2xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 200 pero \< 300.|
| **azure.functions.http3xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 300 pero \< 400.|
| **azure.functions.http401** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 401.|
| **azure.functions.http403** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 403.|
| **azure.functions.http404** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 404.|
| **azure.functions.http406** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 406.|
| **azure.functions.http4xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 400 pero \< 500.|
| **azure.functions.http5xx** <br>(count) | Errores del servidor http|
| **azure.functions.io_other_bytes_per_second** <br>(rate) | Otros bytes de E/S por segundo<br>_Se muestra como byte_ |
| **azure.functions.io_other_operations_per_second** <br>(rate) | Otras operaciones de E/S por segundo|
| **azure.functions.io_read_bytes_per_second** <br>(rate) | Bytes de lectura de E/S por segundo<br>_Se muestra como byte_ |
| **azure.functions.io_read_operations_per_second** <br>(rate) | Operaciones de lectura de E/S por segundo|
| **azure.functions.io_write_bytes_per_second** <br>(rate) | Bytes de escritura de E/S por segundo<br>_Se muestra como byte_ |
| **azure.functions.io_write_operations_per_second** <br>(rate) | Operaciones de escritura de E/S por segundo|
| **azure.functions.memory_working_set** <br>(gauge) | Conjunto de trabajo de memoria<br>_Se muestra como byte_ |
| **azure.functions.private_bytes** <br>(gauge) | Bytes privados<br>_Se muestra como byte_ |
| **azure.functions.requests_in_application_queue** <br>(count) | Solicitudes en la cola de solicitudes<br>_Se muestra como solicitud_ |
| **azure.functions.thread_count** <br>(count) | Número de subprocesos|
| **azure.functions.total_app_domains** <br>(gauge) | Total de dominios de aplicaciones|
| **azure.functions.total_app_domains_unloaded** <br>(gauge) | Total de dominios de aplicación descargados|
| **azure.functions.file_system_usage** <br>(gauge) | Porcentaje de la cuota del sistema de archivos consumida por la aplicación.<br>_Se muestra como byte_ |
| **azure.functions.health_check_status** <br>(gauge) | Estado del check de estado.|
| **azure.functions.response_time** <br>(gauge) | El tiempo que tarda la aplicación en enviar las solicitudes, en segundos.<br>_Se muestra como segundo_ |
| **azure.functions.requests** <br>(count) | El número total de solicitudes independientemente de su código de estado HTTP resultante.|
| **azure.functions.count** <br>(gauge) | El recuento de recursos de funciones de Azure|

### Eventos

La integración Azure Functions no incluye ningún evento.

### Checks de servicio

La integración Azure Functions no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).