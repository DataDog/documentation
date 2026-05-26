---
aliases:
- /es/integrations/google_cloud_vpn
app_id: google-cloud-vpn
categories:
- nube
- red
- google cloud
- recopilación de logs
custom_kind: integración
description: Google Cloud VPN conecta de forma segura tu red existente a tu red de
  Google Cloud Platform (GCP).
media: []
title: Google Cloud VPN
---
## Información general

La VPN de Google Cloud conecta de forma segura tu red actual a tu red Google Cloud Platform.

Obtén métricas de la VPN de Google para:

- Visualizar el rendimiento de tus VPN.
- Correlacionar el rendimiento de tus VPN con tus aplicaciones.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No es necesario realizar ningún otro paso de instalación.

### Recopilación de logs

Los logs de Google Cloud VPN se recopilan con Google Cloud Logging y se envían a un trabajo de Dataflow a través de un tema Cloud Pub/Sub. Si aún no lo has hecho, [configura la generación de logs con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de la VPN de Google Cloud de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [página de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud VPN.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.vpn.gateway.connections** <br>(gauge) | Indica el número de conexiones HA por gateway de VPN.|
| **gcp.vpn.network.dropped_received_packets_count** <br>(count) | Paquetes de entrada descartados para el túnel.<br>_Se muestra como paquete_ |
| **gcp.vpn.network.dropped_sent_packets_count** <br>(count) | Paquetes de salida descartados para el túnel.<br>_Se muestra como paquete_ |
| **gcp.vpn.network.received_bytes_count** <br>(count) | Bytes de entrada para el túnel.<br>_Se muestra como byte_ |
| **gcp.vpn.network.received_packets_count** <br>(count) | Paquetes de entrada (recibidos de la VPN par) para el túnel.<br>_Se muestra como paquete_ |
| **gcp.vpn.network.sent_bytes_count** <br>(count) | Bytes de salida para el túnel.<br>_Se muestra como byte_ |
| **gcp.vpn.network.sent_packets_count** <br>(count) | Paquetes de salida (dirigidos a la VPN par) para el túnel.<br>_Se muestra como paquete_ |
| **gcp.vpn.tunnel_established** <br>(gauge) | Indica que el túnel se ha establecido correctamente si es mayor que 0.|
| **gcp.vpn.vpn_tunnel.gateway_ip_version** <br>(gauge) | La versión IP de la gateway de VPN de HA.|

### Eventos

La integración de la VPN de Google Cloud no incluye eventos.

### Checks de servicio

La integración de la VPN de Google Cloud no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).