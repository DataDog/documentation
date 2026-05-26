---
aliases:
- /es/integrations/google_cloud_tpu
app_id: google-cloud-tpu
categories:
- métricas
- google cloud
- recopilación de logs
- ia/ml
custom_kind: integración
description: Ventajas de las Tensor Processing Units (TPU) a través de recursos en
  la nube escalables y fáciles de utilizar para el desarrollo de modelos de ML.
integration_version: 1.0.0
media: []
title: TPU de Google Cloud
---
## Información general

Los productos TPU de Google Cloud ponen las ventajas de las Tensor Processing Units (TPU) a disposición de todos los investigadores de ML, ingenieros de ML, desarrolladores y científicos de datos que ejecutan modelos de ML de última generación, a través de un recurso informático en la nube escalable y fácil de utilizar.

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de TPU de Google Cloud.

## Configuración

### Instalación

Para utilizar Google Cloud TPU, solo tienes que configurar la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/).

### Recopilación de logs

Los logs de Google Cloud TPU se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de TPU de Google Cloud de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud TPU.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.tpu.cpu.utilization** <br>(gauge) | Utilización de CPUs en el worker de TPU como porcentaje.<br>_Se muestra como porcentaje_ |
| **gcp.tpu.memory.usage** <br>(gauge) | Uso de memoria en bytes.<br>_Se muestra como byte_ |
| **gcp.tpu.network.received_bytes_count** <br>(count) | Bytes acumulados de datos que este servidor ha recibido a través de la red.<br>_Se muestra como byte_ |
| **gcp.tpu.network.sent_bytes_count** <br>(count) | Bytes acumulados de datos que este servidor ha enviado a través de la red.<br>_Se muestra como byte_ |
| **gcp.tpu.accelerator.duty_cycle** <br>(count) | Porcentaje de tiempo durante el periodo de muestreo en el que el acelerador estuvo procesando activamente<br>_Se muestra como porcentaje_ |
| **gcp.tpu.instance.uptime_total** <br>(count) | Tiempo transcurrido desde que se inició la máquina virtual, en segundos.<br>_Se muestra como segundo_ |
| **gcp.gke.node.accelerator.tensorcore_utilization** <br>(count) | Porcentaje actual del Tensorcore que se utiliza.<br>_Se muestra como porcentaje_ |
| **gcp.gke.node.accelerator.duty_cycle** <br>(count) | Porcentaje de tiempo durante el último periodo de muestreo (10s) durante el cual el acelerador estuvo procesando activamente.<br>_Se muestra como porcentaje_ |
| **gcp.gke.node.accelerator.memory_used** <br>(count) | Memoria total del acelerador asignada en bytes.<br>_Se muestra como byte_ |
| **gcp.gke.node.accelerator.memory_total** <br>(count) | Memoria total del acelerador en bytes.<br>_Se muestra como byte_ |
| **gcp.gke.node.accelerator.memory_bandwidth_utilization** <br>(count) | Porcentaje actual del ancho de banda de la memoria del acelerador que se está utilizando.<br>_Se muestra como porcentaje_ |
| **gcp.gke.container.accelerator.tensorcore_utilization** <br>(count) | Porcentaje actual del Tensorcore que se utiliza.<br>_Se muestra como porcentaje_ |
| **gcp.gke.container.accelerator.duty_cycle** <br>(count) | Porcentaje de tiempo durante el último periodo de muestreo (10s) durante el cual el acelerador estuvo procesando activamente.<br>_Se muestra como porcentaje_ |
| **gcp.gke.container.accelerator.memory_used** <br>(count) | Memoria total del acelerador asignada en bytes.<br>_Se muestra como byte_ |
| **gcp.gke.container.accelerator.memory_total** <br>(count) | Memoria total del acelerador en bytes.<br>_Se muestra como byte_ |
| **gcp.gke.container.accelerator.memory_bandwidth_utilization** <br>(count) | Porcentaje actual del ancho de banda de la memoria del acelerador que se está utilizando.<br>_Se muestra como porcentaje_ |

### Eventos

La integración de las TPU de Google Cloud no incluye eventos.

### Checks de servicio

La integración de las TPU de Google Cloud no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).