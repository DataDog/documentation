---
aliases:
- /es/integrations/azure_app_services
app_id: azure-app-services
categories:
- nube
- azure
custom_kind: integración
description: Creación rápida y sencilla de aplicaciones web y móviles para todas las
  plataformas y dispositivos.
media: []
title: Azure App Services
---
## Información general

Azure App Service es una plataforma como servicio (PaaS) que ejecuta aplicaciones web, móviles, de API y de lógica empresarial, al tiempo que gestiona automáticamente los recursos que requieren dichas aplicaciones.

Utiliza la integración de Datadog para recopilar métricas de Azure App Service y:

- Visualizar el rendimiento de tu aplicación
- Correlacionar el rendimiento de Azure App con el resto de tu infraestructura

### Vista de Azure App Service 

Además del dashboard preconfigurado de Azure App Service, también puedes utilizar la vista exclusiva de Azure App Service.

Utiliza la vista de Azure App Service para:

- Identificar rápidamente las aplicaciones con alta latencia o errores

- Realizar un seguimiento del uso de tus aplicaciones web, aplicaciones de funciones y planes de Azure App Service

- Comprender los costes de tus planes de App Service visualizando las instancias activas e identificando qué aplicaciones envían trazas o logs a Datadog

- Asignar aplicaciones a tus planes de App Service para identificar las aplicaciones que pueden estar generando costes o afectando al rendimiento.

Para habilitar Datadog APM y métricas personalizadas para aplicaciones que se ejecutan en Azure App Service, consulta la [extensión de Datadog Azure App Service](https://docs.datadoghq.com/serverless/azure_app_services/).

## Configuración

### Instalación

Si aún no lo has hecho, configura la [integración con Microsoft Azure](https://docs.datadoghq.com/integrations/azure/). No se requiere ningún paso de instalación adicional.

Para opciones de monitorización adicionales, como la recopilación de logs y la inyección de ID de traza, consulta la [extensión de Azure App Service](https://docs.datadoghq.com/serverless/azure_app_services/).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.app_services.cpu_time** <br>(gauge) | La cantidad de CPU consumida por la aplicación, en segundos. Para más información sobre esta métrica. Consulta:https://aka.ms/website-monitor-cpu-time-vs-cpu-percentage(Tiempo de CPU frente a porcentaje de CPU). Solo para aplicaciones web.<br>_Se muestra en segundos_ |
| **azure.app_services.cpu_time.max** <br>(gauge) | La cantidad máxima de tiempo de cpu de la aplicación (Max Aggregated)<br>_Se muestra como segundo_ |
| **azure.app_services.bytes_received** <br>(count) | La cantidad de ancho de banda entrante consumido por la aplicación, en MiB. Para aplicaciones web y aplicaciones de función.<br>_Se muestra como byte_ |
| **azure.app_services.bytes_sent** <br>(count) | La cantidad de ancho de banda saliente consumido por la aplicación, en MiB. Para aplicaciones web y aplicaciones de función.<br>_Se muestra como byte_ |
| **azure.app_services.memory_working_set** <br>(gauge) | La memoria media utilizada por la aplicación<br>_Se muestra como byte_ |
| **azure.app_services.memory_working_set.max** <br>(gauge) | La memoria máxima utilizada por la aplicación (Max Aggregated)<br>_Se muestra como byte_ |
| **azure.app_services.response_time** <br>(gauge) | El tiempo que tarda la aplicación en enviar las solicitudes<br>_Se muestra como segundo_ |
| **azure.app_services.response_time.max** <br>(gauge) | El tiempo máximo que tarda la aplicación en enviar solicitudes (Max Aggregated)<br>_Se muestra como segundo_ |
| **azure.app_services.count** <br>(gauge) | El recuento de recursos de Azure App Services|
| **azure.app_services.total_app_domains** <br>(gauge) | Número actual de dominios de aplicación cargados en esta aplicación|
| **azure.app_services.total_app_domains_unloaded** <br>(gauge) | Número total de dominios de aplicación descargados desde el inicio de la aplicación.|
| **azure.app_services.requests** <br>(count) | El número total de solicitudes independientemente de su código de estado HTTP resultante. Para aplicaciones web y aplicaciones de función.|
| **azure.app_services.requests_in_application_queue** <br>(gauge) | El número de solicitudes en la cola de solicitudes de la aplicación. Para aplicaciones web y aplicaciones de función.|
| **azure.app_services.thread_count** <br>(gauge) | El número de subprocesos actualmente activos en el proceso de la aplicación. Para aplicaciones web y aplicaciones de función.|
| **azure.app_services.webjob_count** <br>(gauge) | El número actual de trabajos web configurados por la aplicación web.|
| **azure.app_services.handle_count** <br>(gauge) | El número total de identificadores actualmente abiertos por el proceso de la aplicación. Para aplicaciones web y aplicaciones de función.|
| **azure.web_sites_slots.app_connections** <br>(count) | El número de sockets vinculados existentes en el entorno de prueba (w3wp.exe y sus procesos secundarios). Un socket enlazado se crea llamando a las APIs bind()/connect() y permanece hasta que dicho socket se cierra con CloseHandle()/closesocket().|
| **azure.web_sites_slots.average_memory_working_set** <br>(gauge) | La cantidad media de memoria utilizada por la aplicación, en megabytes (MiB).<br>_Se muestra como byte_ |
| **azure.web_sites_slots.average_response_time** <br>(count) | El tiempo medio que tarda la aplicación en enviar las solicitudes, en segundos.<br>_Se muestra como segundo_ |
| **azure.web_sites_slots.bytes_received** <br>(gauge) | Datos entrantes<br>_Se muestra como byte_ |
| **azure.web_sites_slots.bytes_sent** <br>(gauge) | Datos salientes<br>_Se muestra como byte_ |
| **azure.web_sites_slots.cpu_time** <br>(gauge) | La cantidad de CPU consumida por la aplicación, en segundos. Para más información sobre esta métrica. Consulta:https://aka.ms/website-monitor-cpu-time-vs-cpu-percentage(Tiempo de CPU frente a porcentaje de CPU).<br>_Se muestra en segundos_ |
| **azure.web_sites_slots.current_assemblies** <br>(gauge) | El número actual de ensamblados cargados en todos los dominios de aplicación de esta aplicación.|
| **azure.web_sites_slots.file_system_usage** <br>(gauge) | Porcentaje de la cuota del sistema de archivos consumida por la aplicación.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.function_execution_count** <br>(count) | Recuento de ejecución de funciones|
| **azure.web_sites_slots.function_execution_units** <br>(count) | Unidades de ejecución de funciones|
| **azure.web_sites_slots.gen0_collections** <br>(count) | El número de veces que los objetos de la generación 0 son recopilados desde el inicio del proceso de la aplicación. Las GCs de generación superior incluyen todas las GCs de generación inferior.|
| **azure.web_sites_slots.gen1_collections** <br>(count) | El número de veces que los objetos de la generación 1 son recopilados desde el inicio del proceso de la aplicación. Las GCs de generación superior incluyen todas las GCs de generación inferior.|
| **azure.web_sites_slots.gen2_collections** <br>(count) | El número de veces que los objetos de la generación 2 son recopilados desde el inicio del proceso de la aplicación.|
| **azure.web_sites_slots.handles** <br>(count) | El número total de identificadores abiertos actualmente por el proceso de la aplicación.|
| **azure.web_sites_slots.health_check_status** <br>(gauge) | Estado del check de estado|
| **azure.web_sites_slots.http101** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP 101.|
| **azure.web_sites_slots.http2xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 200 pero \< 300.|
| **azure.web_sites_slots.http3xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 300 pero \< 400.|
| **azure.web_sites_slots.http401** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 401.|
| **azure.web_sites_slots.http403** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 403.|
| **azure.web_sites_slots.http404** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 404.|
| **azure.web_sites_slots.http406** <br>(count) | El recuento de solicitudes que resultan en el código de estado HTTP 406.|
| **azure.web_sites_slots.http4xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 400 pero \< 500.|
| **azure.web_sites_slots.http5xx** <br>(count) | El recuento de solicitudes que resultan en un código de estado HTTP = 500 pero \< 600.|
| **azure.web_sites_slots.http_response_time** <br>(gauge) | El tiempo que tarda la aplicación en enviar las solicitudes, en segundos.<br>_Se muestra como segundo_ |
| **azure.web_sites_slots.io_other_bytes_per_second** <br>(count) | La velocidad a la que el proceso de aplicación está emitiendo bytes a las operaciones de E/S que no implican datos, como las operaciones de control.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.io_other_operations_per_second** <br>(count) | La velocidad a la que el proceso de la aplicación está emitiendo operaciones de E/S que no son operaciones de lectura o escritura.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.io_read_bytes_per_second** <br>(count) | La velocidad a la que el proceso de la aplicación está leyendo bytes de las operaciones de E/S.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.io_read_operations_per_second** <br>(count) | La velocidad a la que el proceso de aplicación está emitiendo operaciones de lectura de E/S.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.io_write_bytes_per_second** <br>(count) | La velocidad a la que el proceso de la aplicación está escribiendo bytes en las operaciones de E/S.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.io_write_operations_per_second** <br>(count) | La velocidad a la que el proceso de aplicación está emitiendo operaciones de E/S de escritura.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.memory_working_set** <br>(gauge) | La cantidad actual de memoria utilizada por la aplicación, en MiB.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.private_bytes** <br>(gauge) | Private Bytes es el tamaño actual, en bytes, de la memoria que el proceso de la aplicación ha asignado y que no puede ser compartida con otros procesos.<br>_Se muestra como byte_ |
| **azure.web_sites_slots.requests** <br>(count) | El número total de solicitudes independientemente de su código de estado HTTP resultante.|
| **azure.web_sites_slots.requests_in_application_queue** <br>(gauge) | El número de solicitudes en la cola de solicitudes de la aplicación.|
| **azure.web_sites_slots.scm_cpu_time** <br>(count) | ScmCpuTime<br>_Se muestra como segundo_ |
| **azure.web_sites_slots.scm_private_bytes** <br>(gauge) | ScmPrivateBytes<br>_Se muestra como byte_ |
| **azure.web_sites_slots.threads** <br>(count) | El número de subprocesos actualmente activos en el proceso de la aplicación.|
| **azure.web_sites_slots.total_app_domains** <br>(gauge) | El número actual de dominios de aplicación cargados en esta aplicación.|
| **azure.web_sites_slots.total_app_domains_unloaded** <br>(gauge) | El número total de dominios de aplicación descargados desde el inicio de la aplicación.|
| **azure.web_sites_slots.count** <br>(gauge) | El recuento de todos los recursos de ranuras de despliegue de aplicaciones|

### Eventos

La integración Azure App Service no incluye eventos.

### Checks de servicio

La integración Azure App Service no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).