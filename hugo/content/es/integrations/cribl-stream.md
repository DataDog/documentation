---
aliases:
- /es/integrations/cribl_stream
app_id: cribl-stream
categories:
- aws
- azure
- nube
- rastreo
- kubernetes
- google cloud
- recopilación de logs
- seguridad
- métricas
custom_kind: integración
description: Recopilación de datos de observabilidad en un pipeline de telemetría
  de datos independiente del proveedor
media:
- caption: La observabilidad lo cambia todo
  image_url: images/observability_changes.png
  media_type: vídeo
  vimeo_id: 567294419
- caption: Dashboard de Cribl Stream para Datadog
  image_url: images/cribl_dashboard_for_datadog.png
  media_type: imagen
supported_os:
- linux
- windows
title: Cribl Stream
---
## Información general

[Cribl Stream](https://cribl.io/stream) te ayuda a procesar logs de datos de máquinas, datos de instrumentación, datos de aplicaciones y métricas en tiempo real, y enviarlos a la plataforma de análisis que elijas. Te permite:

- Añadir contexto a tus datos enriqueciéndolos con información procedente de fuentes de datos externas.
- Ayudar a asegurar tus datos, editando, enmascarando o cifrando los campos confidenciales.
- Optimizar tus datos, según tus requisitos de rendimiento y costos.

Esto es para la versión de Cribl Stream autoalojada.

Utiliza el dashboard predefinido para ver el rendimiento del flujo (stream) con métricas de base como eventos por segundo, bytes por segundo, tipos de entrada, tipos de salida y métricas de infraestructura. La monitorización de porcentajes de reducción por eventos o bytes, que es útil para mejorar el rendimiento de la búsqueda o los costos de licencias e infraestructura para los sistemas de análisis.

## Configuración

Puedes enviar tus [métricas internas](http://docs.cribl.io/logstream/sources-cribl-internal/) de Cribl Stream a la API de Datadog.

### Instalación

#### Datadog

Ve a [_API Keys_ (Claves de API)](https://app.datadoghq.com/organization-settings/api-keys) en Organization Settings (Parámetros de la organización) y crea una clave API para que Cribl envíe datos.

#### Cribl

1. En Cribl, ve a _Quick Connects_ (Conexiones rápidas) y haz clic en el botón _+Add Source_ (Añadir fuente).
   ![Paso 1](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_1.png)
1. Desplázate hacia abajo hasta _System Internal_ (Sistema interno), pasa el ratón sobre _Cribl Internal_ (Cribl interno) y elige _Select Existing_ (Seleccionar existente). Activa _CriblLogs_ y _CriblMetrics_.

- **Nota**: Ambas fuentes deben tener activado **Conexión rápida** en lugar de **Rutas**.
  ![Paso 3](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_3.png)

3. Haz clic en el botón _+Add Destination_.

1. Desplázate al ícono _Datadog_ y haz clic en _+Add New_.

1. Dale un nombre a la entrada (por ejemplo, Cribl_Datadog).
   ![Paso 4](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_4.png)

1. A continuación, introduce tu _Datadog API Key_ y selecciona tu sitio de Datadog.

1. Añade cualquier etiqueta (tag) de Datadog, un campo de mensaje, una fuente o información del host. Para obtener más información, consulta la [documentación del destino Cribl Datadog](https://docs.cribl.io/stream/destinations-datadog).

1. Haz clic en _Save_.

1. Selecciona _Passthru_ para conectar las métricas de Cribl con tu destino de Datadog.
   ![Paso 5](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_6.png)

![Completo](https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_5.png)

## Desinstalación

Para eliminar el dashboard de Cribl Stream, utiliza la opción para [eliminar dashboards](https://docs.datadoghq.com/dashboards/#delete-dashboard) dentro de la configuración del dashboard de Cribl Stream. Elimina el destino Datadog del despliegue de Cribl Stream para dejar de enviar datos.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cribl.logstream.index.in_bytes** <br>(count) | Bytes entrantes por índice|
| **cribl.logstream.index.in_events** <br>(count) | Eventos entrantes por índice|
| **cribl.logstream.index.out_bytes** <br>(count) | Bytes salientes por índice|
| **cribl.logstream.index.out_events** <br>(count) | Eventos salientes por índice|
| **cribl.logstream.source.in_bytes** <br>(count) | Bytes entrantes por fuente|
| **cribl.logstream.source.in_events** <br>(count) | Eventos entrantes por fuente|
| **cribl.logstream.source.out_bytes** <br>(count) | Bytes salientes por fuente|
| **cribl.logstream.source.out_events** <br>(count) | Eventos salientes por fuente|
| **cribl.logstream.total.in_bytes** <br>(count) | Total de bytes entrantes|
| **cribl.logstream.total.in_events** <br>(count) | Total de eventos entrantes|
| **cribl.logstream.total.out_bytes** <br>(count) | Total de bytes salientes|
| **cribl.logstream.total.out_events** <br>(count) | Total de eventos salientes|
| **cribl.logstream.total.dropped_events** <br>(count) | Total de eventos descartados|
| **cribl.logstream.health.inputs** <br>(gauge) | Entradas saludables|
| **cribl.logstream.health.outputs** <br>(gauge) | Salidas saludables|
| **cribl.logstream.system.load_avg** <br>(gauge) | Carga media|
| **cribl.logstream.system.free_mem** <br>(gauge) | Memoria libre|
| **cribl.logstream.system.disk_used** <br>(gauge) | Uso del disco|
| **cribl.logstream.system.cpu_perc** <br>(gauge) | Porcentaje de uso de la CPU|
| **cribl.logstream.system.mem_rss** <br>(gauge) | Uso de la RAM|
| **cribl.logstream.total.activeCxn** <br>(gauge) | Total de conexiones TCP entrantes activas|
| **cribl.logstream.pipe.in_events** <br>(count) | Eventos entrantes por pipeline|
| **cribl.logstream.pipe.out_events** <br>(count) | Eventos entrantes por pipeline|
| **cribl.logstream.pipe.dropped_events** <br>(count) | Eventos descartados por pipeline|
| **cribl.logstream.metrics_pool.num_metrics** <br>(gauge) | Número total de métricas únicas asignadas a la memoria.|
| **cribl.logstream.collector_cache.size** <br>(count) | Cada función del Collector (default/cribl/collectors/<collector>/index.js) se carga e inicializa una sola vez por cada tarea y luego se almacena en la caché. Esta métrica representa el tamaño actual de esta caché.|
| **cribl.logstream.cluster.metrics.sender.inflight** <br>(gauge) | Número de paquetes de métricas que se están enviando actualmente desde un Worker o proceso de nodo de borde al proceso de API a través de IPC (comunicación entre procesos).|
| **cribl.logstream.backpressure.outputs** <br>(count) | Destinos que experimentan contrapresión, lo que provoca que los eventos se bloqueen o descarten.|
| **cribl.logstream.blocked.outputs** <br>(count) | Destinos bloqueados. (Esta métrica es más restrictiva que la anterior).|
| **cribl.logstream.pq.queue_size** <br>(gauge) | Tamaño actual de la cola por destino por Worker o proceso de nodo de borde.|
| **cribl.logstream.host.in_bytes** <br>(count) | Bytes entrantes de un host determinado|
| **cribl.logstream.host.in_events** <br>(count) | Eventos entrantes de un host determinado|
| **cribl.logstream.host.out_bytes** <br>(count) | Bytes salientes de un host determinado|
| **cribl.logstream.host.out_events** <br>(count) | Eventos salientes de un host determinado|
| **cribl.logstream.route.in_bytes** <br>(count) | Bytes entrantes por ruta|
| **cribl.logstream.route.in_events** <br>(count) | Eventos entrantes por ruta|
| **cribl.logstream.route.out_bytes** <br>(count) | Bytes salientes por ruta|
| **cribl.logstream.route.out_events** <br>(count) | Eventos salientes por ruta|
| **cribl.logstream.sourcetype.in_bytes** <br>(count) | Bytes entrantes por tipo de fuente|
| **cribl.logstream.sourcetype.in_events** <br>(count) | Eventos entrantes por tipo de fuente|
| **cribl.logstream.sourcetype.out_bytes** <br>(count) | Bytes salientes por tipo de fuente|
| **cribl.logstream.sourcetype.out_events** <br>(count) | Eventos salientes por tipo de fuente|.

### Eventos

La integración de Cribl Stream no incluye ningún evento.

### Checks de servicio

La integración de Cribl Stream no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Cribl](https://cribl.io/support).