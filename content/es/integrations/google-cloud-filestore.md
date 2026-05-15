---
aliases:
- /es/integrations/google_cloud_filestore
app_id: google-cloud-filestore
categories:
- nube
- almacenes de datos
- google cloud
- recopilación de logs
custom_kind: integración
description: Servicio gestionado que proporciona un sistema de archivos compartido
  para aplicaciones que requieren una interfaz de sistema de archivos.
media: []
title: Google Cloud Filestore
---
## Información general

Google Cloud Filestore es un servicio gestionado de almacenamiento de archivos para aplicaciones que requieren una interfaz de sistema de archivos y un sistema de archivos compartido para los datos.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Filestore.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Filestore se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Filestore de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Filestore.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.file.nfs.server.average_read_latency** <br>(gauge) | Latencia media de todas las operaciones de lectura de disco (Nota: Esta métrica solo se rellena para instancias de hiperescala).<br>_Se muestra en milisegundos_ |
| **gcp.file.nfs.server.average_write_latency** <br>(gauge) | Latencia media de todas las operaciones de escritura en disco (Nota: Esta métrica solo se rellena para las instancias de hiperescala).<br>_Se muestra en milisegundos_ |
| **gcp.file.nfs.server.domain_reachable** <br>(gauge) | Verdadero si al menos uno de los DC de AD es accesible.|
| **gcp.file.nfs.server.free_bytes** <br>(gauge) | Total de bytes libres en disco.<br>_Se muestra en bytes_ |
| **gcp.file.nfs.server.free_bytes_percent** <br>(gauge) | Porcentaje total de bytes libres en disco.<br>_Se muestra como porcentaje_ |
| **gcp.file.nfs.server.free_raw_capacity_percent** <br>(gauge) | Capacidad libre sin procesar como porcentaje del espacio total. Los valores son números entre 0,0 y 100,0.<br>_Se muestra como porcentaje_ |
| **gcp.file.nfs.server.instance_available** <br>(gauge) | Verdadero si e2e NFS prober que utiliza sec=krb5 es capaz de sondear la instancia.|
| **gcp.file.nfs.server.locks** <br>(gauge) | Número de bloqueos.<br>_Se muestra como bloqueo_ |
| **gcp.file.nfs.server.metadata_ops_count** <br>(count) | Recuento de operaciones de metadatos de disco (Nota: Esta métrica solo se rellena para instancias de hiperescala).<br>_Se muestra como operación_ |
| **gcp.file.nfs.server.procedure_call_count** <br>(count) | Recuento de llamadas a procedimientos del servidor NFS.|
| **gcp.file.nfs.server.read_bytes_count** <br>(count) | Bytes leídos del disco.<br>_Se muestra en bytes_ |
| **gcp.file.nfs.server.read_milliseconds_count** <br>(count) | Recuento de milisegundos empleados en operaciones de lectura de disco.<br>_Se muestra en milisegundos_ |
| **gcp.file.nfs.server.read_ops_count** <br>(count) | Recuento de operaciones de lectura de disco. Muestreado cada 60 segundos.<br>_Se muestra como operación_ |
| **gcp.file.nfs.server.snapshots_used_bytes** <br>(gauge) | Número de bytes utilizados por snapshots.<br>_Se muestra en bytes_ |
| **gcp.file.nfs.server.used_bytes** <br>(gauge) | Total de bytes de disco utilizados.<br>_Se muestra en bytes_ |
| **gcp.file.nfs.server.used_bytes_percent** <br>(gauge) | Porcentaje total de bytes de disco utilizados.<br>_Se muestra como porcentaje_ |
| **gcp.file.nfs.server.write_bytes_count** <br>(count) | Bytes escritos en disco.<br>_Se muestra en bytes_ |
| **gcp.file.nfs.server.write_milliseconds_count** <br>(count) | Recuento de milisegundos empleados en operaciones de escritura en disco.<br>_Se muestra en milisegundos_ |
| **gcp.file.nfs.server.write_ops_count** <br>(count) | Recuento de operaciones de escritura en disco.<br>_Se muestra como operación_ |

### Eventos

La integración Google Cloud Filestore no incluye eventos.

### Checks de servicio

La integración Google Cloud Filestore no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).