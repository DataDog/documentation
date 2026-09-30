---
app_id: bonsai
categories:
- métricas
custom_kind: integración
description: Bonsai Managed Elasticsearch
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
title: Bonsai
---
## Información general

Rastrea las métricas a nivel de solicitud para tus clústeres de Bonsai para:

- Visualizar el rendimiento de tus clústeres
- Correlacionar el rendimiento de la búsqueda con el rendimiento de la aplicación
- Crear alertas

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/snapshot.png)

## Configuración

Para integrar tu clúster con Datadog es necesario enviar tu clave API a la aplicación bonsai.

### Obtener clave API

En Datadog, ve a [Integrations --> API (Integraciones --> API)](https://app.datadoghq.com/organization-settings/api-keys) y copia tu clave de API.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/copy_key.png)

### Enviar clave API

Ve a [Bonsai --> Clusters (Bonsai --> Clústeres)](https://app.bonsai.io/clusters) y haz clic en el clúster que quieres integrar. Ve a la pestaña Manage (Gestionar) y desplázate hasta la parte inferior de la página.

En la sección "Datadog Integration", pega tu clave API y haz clic en "Activate Datadog".

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/activate_datadog.png)

### Verificación

Si tu clave es válida, deberías ver la integración como activa.

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bonsai/images/datadog_activated.png)

En pocos minutos, las métricas de solicitud estarán disponibles en tu dashboard de Datadog.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **bonsai.req.2xx** <br>(gauge) | Número de solicitudes con un código de respuesta 2xx (correcta)<br>_Se muestra como solicitud_ |
| **bonsai.req.4xx** <br>(gauge) | Número de solicitudes con un código de respuesta 4xx (error del cliente)<br>_Se muestra como solicitud_ |
| **bonsai.req.5xx** <br>(gauge) | Número de solicitudes con un código de respuesta 5xx (error del servidor)<br>_Se muestra como solicitud_ |
| **bonsai.req.max_concurrency** <br>(gauge) | Pico de solicitudes simultáneas<br>_Se muestra como conexión_ |
| **bonsai.req.p50** <br>(gauge) | Mediana de la duración de la solicitud<br>_Se muestra en minutos_ |
| **bonsai.req.p95** <br>(gauge) | Percentil 95 de la duración de la solicitud<br>_Se muestra en minutos_ |
| **bonsai.req.p99** <br>(gauge) | Percentil 99 de la duración de la solicitud<br>_Se muestra en minutos_ |
| **bonsai.req.queue_depth** <br>(gauge) | Profundidad de la cola pico (cuántas solicitudes están en espera debido a los límites por simultaneidad)<br>_Se muestra como conexión_ |
| **bonsai.req.reads** <br>(gauge) | Número de solicitudes que leen datos<br>_Se muestra como solicitud_ |
| **bonsai.req.rx_bytes** <br>(gauge) | Número de bytes enviados a elasticsearch<br>_Se muestra en bytes_ |
| **bonsai.req.total** <br>(gauge) | Número total de solicitudes<br>_Se muestra como solicitud_ |
| **bonsai.req.tx_bytes** <br>(gauge) | Número de bytes enviados al cliente<br>_Se muestra en bytes_ |
| **bonsai.req.writes** <br>(gauge) | Número total de escrituras<br>_Se muestra como solicitud_ |

Las métricas están etiquetadas para cada clúster, por lo que puedes segmentar en función de los clústeres. Las etiquetas (tags) tienen el siguiente aspecto:

```text
cluster:my-cluster-slug
```

### Eventos

La integración Bonsai no incluye eventos.

### Checks de servicio

La integración Bonsai no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).