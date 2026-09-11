---
aliases:
- /es/integrations/google_cloud_datastore
app_id: google-cloud-datastore
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
- móvil
custom_kind: integración
description: Cloud Datastore es una base de datos NoSQL altamente escalable para tus
  aplicaciones web y móviles.
media: []
title: Google Cloud Datastore
---
## Información general

Cloud Datastore es una base de datos NoSQL altamente escalable para tus aplicaciones web y móviles.

Obtén métricas de Google Datastore para:

- Visualizar el rendimiento de tus Datastores.
- Correlacionar el rendimiento de tus Datastores con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo ha hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud Datastore se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Datastore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Datastore.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.datastore.api.request_count** <br>(count) | Llamadas a la API de Datastore.<br>_Se muestra como solicitud_ |
| **gcp.datastore.entity.read_sizes.avg** <br>(gauge) | Media de los tamaños de las entidades leídas.<br>_Se muestra en bytes_ |
| **gcp.datastore.entity.read_sizes.samplecount** <br>(count) | Recuento de muestras de tamaños de entidades leídas.<br>_Se muestra en bytes_ |
| **gcp.datastore.entity.read_sizes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de tamaños de entidades leídas.<br>_Se muestra en bytes_ |
| **gcp.datastore.entity.ttl_deletion_count** <br>(count) | Recuento total de entidades eliminadas por servicios TTL.|
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.avg** <br>(count) | Tiempo medio transcurrido entre la expiración de una entidad con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.samplecount** <br>(count) | Recuento de muestras del tiempo transcurrido entre la expiración de una entidad con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.datastore.entity.ttl_expiration_to_deletion_delays.sumsqdev** <br>(count) | Suma de la desviación al cuadrado del tiempo transcurrido entre la expiración de una entidad con TTL y su eliminación efectiva.<br>_Se muestra en segundos_ |
| **gcp.datastore.entity.write_sizes.avg** <br>(gauge) | Media de los tamaños de entidades escritas.<br>_Se muestra en bytes_ |
| **gcp.datastore.entity.write_sizes.samplecount** <br>(gauge) | Recuento de muestras de los tamaños de entidades escritas.<br>_Se muestra en bytes_ |
| **gcp.datastore.entity.write_sizes.sumsqdev** <br>(gauge) | Suma de la desviación al cuadrado de los tamaños de entidades escritas.<br>_Se muestra en bytes_ |
| **gcp.datastore.index.write_count** <br>(count) | Escrituras de índices de almacenes de datos.<br>_Se muestra como escritura_ |

### Eventos

La integración Google Cloud Datastore no incluye eventos.

### Checks de servicio

La integración Google Cloud Datastore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).