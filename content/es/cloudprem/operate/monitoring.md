---
description: Aprende cómo monitorizar métricas específicas para tu despliegue de CloudPrem
title: Monitorizar CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem está en vista previa" >}}
  Únete a la vista previa de CloudPrem para acceder a las nuevas funciones de gestión de logs autoalojadas.
{{< /callout >}}

## Dashboards

CloudPrem proporciona un dashboard predefinido que monitoriza las métricas clave de CloudPrem.

### Instalación

[DogStatsD][1] exporta estas métricas. Puedes:

- Ejecutar DogStatsD como servicio independiente o
- Ejecutar el Datadog Agent (que incluye DogStatsD en forma predeterminada)

Configura cualquiera de las opciones con la clave de API de tu organización para exportar estas métricas. En cuanto tu clúster de CloudPrem se conecte a Datadog, se creará automáticamente el dashboard predefinido al que podrás acceder desde tu [Lista de dashboards][2].

<div class="alert alert-info">Para mostrar las métricas de distribución en tu dashboard, debes <a href="/metrics/distributions/#enabling-advanced-query-functionality">activar la función de consulta avanzada</a>.</div>

### Datos recopilados

| Métrica | Descripción |
|---|---|
| **indexed_events.count**<br/>(Contador) | Número de eventos indexados |
| **indexed_events_bytes.count**<br/>(Contador) | Número de bytes indexados |
| **ingest_requests.count**<br/>(Contador) | Número de solicitudes de ingesta |
| **ingest_requests.duration_seconds**<br/>(Histogram) | Latencia de las solicitudes de ingesta |
| **object_storage_delete_requests.count**<br/>(Contador) | Número de solicitudes de eliminación en el almacenamiento de objetos |
| **object_storage_get_requests.count**<br/>(Contador) | Número de solicitudes de obtención en el almacenamiento de objetos |
| **object_storage_get_requests_bytes.count**<br/>(Contador) | Total de bytes leídos del almacenamiento de objetos mediante solicitudes GET |
| **object_storage_put_requests.count**<br/>(Contador) | Número de solicitudes PUT en el almacenamiento de objetos |
| **object_storage_put_requests_bytes.count**<br/>(Contador) | Total de bytes escritos en el almacenamiento de objetos mediante solicitudes PUT |
| **pending_merge_ops.gauge**<br/>(Gauge) | Número de operaciones de fusión pendientes |
| **search_requests.count**<br/>(Contador) | Número de solicitudes de búsqueda |
| **search_requests.duration_seconds**<br/>(Histograma) | Latencia de las solicitudes de búsqueda |
| **metastore_requests.count**<br/>(Contador) | Número de solicitudes de metastore |
| **metastore_requests.duration_seconds**<br/>(Histograma) | Latencia de las solicitudes de metastore |
| **cpu.usage.gauge**<br/>(Gauge) | Porcentaje de uso de la CPU |
| **uptime.gauge**<br/>(Gauge) | Tiempo de actividad del servicio en segundos |
| **memory.allocated_bytes.gauge**<br/>(Gauge) | Memoria asignada en bytes |
| **disk.bytes_read.counter**<br/>(Contador) | Total de bytes leídos desde el disco |
| **disk.bytes_written.counter**<br/>(Contador) | Total de bytes escritos en el disco |
| **disk.available_space.gauge**<br/>(Gauge) | Espacio disponible en disco en bytes |
| **disk.total_space.gauge**<br/>(Gauge) | Capacidad total del disco en bytes |
| **network.bytes_recv.counter**<br/>(Contador) | Total de bytes recibidos por la red |
| **network.bytes_sent.counter**<br/>(Contador) | Total de bytes enviados por la red |

<!-- ## Alerts, autoscaling, upgrades

Coming soon. -->

[1]: https://docs.datadoghq.com/es/extend/dogstatsd/?tab=hostagent
[2]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1