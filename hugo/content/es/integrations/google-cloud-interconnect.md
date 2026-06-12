---
aliases:
- /es/integrations/google_cloud_interconnect
app_id: google-cloud-interconnect
categories:
- nube
- google cloud
- recopilación de logs
- red
custom_kind: integración
description: Extiende tu red on-premises a la red de Google a través de una conexión
  de alta disponibilidad y baja latencia.
media: []
title: Google Cloud Interconnect
---
## Información general

Google Cloud Interconnect amplía tu red on-premises a red de Google a través de una conexión de alta disponibilidad y baja latencia.

Utiliza la integración Google Cloud Platform en Datadog para recopilar métricas de Google Cloud Interconnect.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Interconnect se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Interconnect de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra los logs de Google Cloud Interconnect.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.interconnect.network.attachment.capacity** <br>(gauge) | Capacidad de red del anexo.|
| **gcp.interconnect.network.attachment.egress_dropped_packets_count** <br>(count) | Número de paquetes salientes descartados desde el último muestreo.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.attachment.ingress_dropped_packets_count** <br>(count) | Número de paquetes entrantes descartados desde el último muestreo.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.attachment.received_bytes_count** <br>(count) | Número de bytes entrantes recibidos.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.attachment.received_bytes_count_by_l3_protocol** <br>(count) | Número de bytes entrantes recibidos por el protocolo L3.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.attachment.received_packets_count** <br>(count) | Número de paquetes entrantes recibidos.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.attachment.received_packets_count_by_l3_protocol** <br>(count) | Número de paquetes entrantes recibidos por el protocolo L3.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.attachment.sent_bytes_count** <br>(count) | Número de bytes salientes enviados.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.attachment.sent_bytes_count_by_l3_protocol** <br>(count) | Número de bytes salientes enviados por el protocolo L3.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.attachment.sent_packets_count** <br>(count) | Número de paquetes salientes enviados.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.attachment.sent_packets_count_by_l3_protocol** <br>(count) | Número de paquetes salientes enviados por el protocolo L3.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.capacity** <br>(gauge) | Capacidad activa de la interconexión.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.interconnect.dropped_packets_count** <br>(count) | Número de paquetes salientes descartados debido a la congestión del enlace.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.aai.bytes_count** <br>(count) | Número de bytes en la interconexión que tienen activado el reconocimiento de aplicaciones.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.interconnect.link.aai.packets_count** <br>(count) | Número de paquetes en la interconexión que tiene activado el reconocimiento de aplicaciones.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.operational** <br>(gauge) | Estado operativo de MACsec (si está activado) en el enlace físico.|
| **gcp.interconnect.network.interconnect.link.macsec.receive_dropped_packets_count** <br>(count) | Número de paquetes de entrada MACsec descartados en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.receive_errors_count** <br>(count) | Número de errores de entrada MACSEC en el enlace físico.<br>_Se muestra como error_ |
| **gcp.interconnect.network.interconnect.link.macsec.received_control_packets_count** <br>(count) | Número de paquetes de control de entrada MACsec en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.received_data_packets_count** <br>(count) | Número de paquetes de datos de entrada MACsec en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.send_dropped_packets_count** <br>(count) | Número de paquetes de salida MACsec descartados en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.send_errors_count** <br>(count) | Número de errores de salida MACsec en el enlace físico.<br>_Se muestra como error_ |
| **gcp.interconnect.network.interconnect.link.macsec.sent_control_packets_count** <br>(count) | Número de paquetes de control de salida MACsec en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.macsec.sent_data_packets_count** <br>(count) | Número de paquetes de datos de salida MACsec en el enlace físico.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.link.operational** <br>(gauge) | Si el estado operativo del circuito es up.|
| **gcp.interconnect.network.interconnect.link.rx_power** <br>(gauge) | Nivel de luz recibido a través del circuito físico.|
| **gcp.interconnect.network.interconnect.link.tx_power** <br>(gauge) | Nivel de luz transmitido por el circuito físico.|
| **gcp.interconnect.network.interconnect.operational** <br>(gauge) | Si el estado operativo de la interconexión es up.|
| **gcp.interconnect.network.interconnect.receive_errors_count** <br>(count) | Número de errores encontrados al recibir paquetes.<br>_Se muestra como error_ |
| **gcp.interconnect.network.interconnect.received_bytes_count** <br>(count) | Número de bytes entrantes recibidos.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.interconnect.received_unicast_packets_count** <br>(count) | Número de paquetes unicast entrantes recibidos.<br>_Se muestra como paquete_ |
| **gcp.interconnect.network.interconnect.send_errors_count** <br>(count) | Número de errores encontrados durante el envío de paquetes.<br>_Se muestra como error_ |
| **gcp.interconnect.network.interconnect.sent_bytes_count** <br>(count) | Número de bytes salientes enviados.<br>_Se muestra en bytes_ |
| **gcp.interconnect.network.interconnect.sent_unicast_packets_count** <br>(count) | Número de paquetes unicast salientes enviados.<br>_Se muestra como paquete_ |

### Eventos

La integración Google Cloud Interconnect no incluye eventos.

### Checks de servicio

La integración Google Cloud Interconnect no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).