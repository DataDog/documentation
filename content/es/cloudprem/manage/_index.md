---
description: Aprende a monitorizar, mantener y operar tu despliegue de CloudPrem.
title: Gestiona y monitoriza CloudPrem
---

{{< callout btn_hidden="true" >}}
  CloudPrem de Datadog está en vista previa.
{{< /callout >}}

## Política de retención

La política de retención especifica cuánto tiempo se almacenan los datos antes de ser eliminados. En forma predeterminada, el periodo de retención está configurado en 30 días. Los datos se eliminan automáticamente en forma diaria por el conserje, que borra las divisiones (archivos de índice) más antiguas que el umbral de retención definido.

Para cambiar el periodo de retención, actualiza el parámetro `cloudprem.index.retention` en el archivo de valores del gráfico de Helm, luego actualiza la versión de Helm y opcionalmente reinicia el pod de conserje para aplicar los cambios de inmediato:

1. Actualiza el periodo de retención en el archivo de valores del gráfico de Helm con una cadena legible por humanos (por ejemplo, `15 days`, `6 months` o `3 years`):
{{< code-block lang="yaml" filename="datadog-values.yaml">}}
cloudprem:
  índice:
    retención: 6 meses
{{< /code-block >}}

2. Actualiza la versión del gráfico de Helm:

    ```shell
    helm upgrade <RELEASE_NAME> datadog/cloudprem \
      -n <NAMESPACE_NAME> \
      -f datadog-values.yaml
    ```

3. Reinicia el pod de conserje (opcional, pero recomendado para un efecto inmediato):

    ```shell
    kubectl delete pod -l app.kubernetes.io/component=janitor -n <NAMESPACE_NAME>
    ```

## Dashboards

CloudPrem proporciona un dashboard predefinido que monitoriza las métricas clave de CloudPrem.

### Configuración

[DogStatsD][1] exporta estas métricas. Puedes:

- Ejecutar DogStatsD como servicio independiente o
- Ejecutar el Datadog Agent (que incluye DogStatsD en forma predeterminada)

Configura cualquiera de las opciones con la clave de API de tu organización para exportar estas métricas. En cuanto tu clúster de CloudPrem se conecte a Datadog, se creará automáticamente el dashboard predefinido al que podrás acceder desde tu [Lista de dashboards][2].

### Datos recopilados

| Métrica | Descripción |
|---|---|
| **indexed_events.count**<br/>(Contador) | Número de eventos indexados |
| **indexed_events_bytes.count**<br/>(Contador) | Número de bytes indexados |
| **ingest_requests.count**<br/>(Contador) | Número de solicitudes de ingesta |
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

[1]: https://docs.datadoghq.com/es/developers/dogstatsd/?tab=hostagent
[2]: https://app.datadoghq.com/dashboard/lists?q=cloudprem&p=1