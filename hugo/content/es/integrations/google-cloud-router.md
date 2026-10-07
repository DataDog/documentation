---
aliases:
- /es/integrations/google_cloud_router
app_id: google-cloud-router
categories:
- nube
- google cloud
- recopilación de logs
- red
custom_kind: integración
description: Intercamba rutas dinámicamente entre tu VPC y las redes on-premises mediante
  el protocolo de puerta de enlace de borde (BGP).
media: []
title: Google Cloud Router
---
## Información general

Google Cloud Router te permite intercambiar rutas dinámicamente entre tu Nube virtual privada (VPC) y las redes on-premises utilizando Border Gateway Protocol (BGP).

Utiliza la integración de Google Cloud Platform con Datadog para recopilar métricas de Google Cloud Router.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Google Cloud Platform](https://docs.datadoghq.com/integrations/google-cloud-platform/). No hay más pasos de instalación.

### Recopilación de logs

Los logs de Google Cloud Router se recopilan con Google Cloud Logging y se envían a un job (generic) de Dataflow a través de un tema de Cloud Pub/Sub. Si aún no lo has hecho, [configura el registro con la plantilla de Datadog Dataflow](https://docs.datadoghq.com/integrations/google-cloud-platform/#log-collection).

Una vez hecho esto, exporta tus logs de Google Cloud Router de Google Cloud Logging al tema Pub/Sub:

1. Ve a la [page (página) de Google Cloud Logging](https://console.cloud.google.com/logs/viewer) y filtra logs de Google Cloud Router.
1. Haz clic en **Create Export** (Crear exportación) y asigna un nombre al sumidero.
1. Elige "Cloud Pub/Sub" como destino y selecciona el tema Pub/Sub creado para tal fin. **Nota**: El tema Pub/Sub puede encontrarse en un proyecto diferente.
1. Haz clic en **Create** (Crear) y espera a que aparezca el mensaje de confirmación.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.router.best_received_routes_count** <br>(gauge) | Número actual de mejores rutas recibidas por el enrutador.<br>_Mostrado como ruta_ |
| **gcp.router.bfd.control.receive_intervals** <br>(gauge) | Intervalos de recepción de paquetes de control BFD.<br>_Mostrado como milisegundo_ |
| **gcp.router.bfd.control.received_packets_count** <br>(count) | Número de paquetes de control recibidos de esta sesión BFD.|
| **gcp.router.bfd.control.rejected_packets_count** <br>(count) | Número de paquetes de control rechazados, de esta sesión BFD.|
| **gcp.router.bfd.control.transmit_intervals** <br>(gauge) | Intervalos de transmisión de paquetes de control BFD.<br>_Mostrado como milisegundo_ |
| **gcp.router.bfd.control.transmitted_packets_count** <br>(count) | Número de paquetes de control transmitidos desde esta sesión BFD.|
| **gcp.router.bfd.session_flap_events_count** <br>(count) | Número de cada evento BFD flap de esta sesión BFD. Un evento flap de sesión se refiere a la transición del estado activo.|
| **gcp.router.bfd.session_up** <br>(gauge) | Indicador de que la sesión BFD se ha establecido correctamente. 1 indica que la sesión está activa. 0 indica que la sesión está caída.|
| **gcp.router.bgp.received_routes_count** <br>(gauge) | Número actual de rutas recibidas en una sesión BGP.<br>_Mostrado como ruta_ |
| **gcp.router.bgp.sent_routes_count** <br>(gauge) | Número actual de rutas enviadas en una sesión BGP.<br>_Mostrado como ruta_ |
| **gcp.router.bgp.session_up** <br>(gauge) | Indicador de que la sesión BGP se ha establecido correctamente.|
| **gcp.router.bgp_sessions_down_count** <br>(gauge) | Número de sesiones BGP en el enrutador que están inactivas.<br>_Mostrado como sesión_ |
| **gcp.router.bgp_sessions_up_count** <br>(gauge) | Número de sesiones BGP en el enrutador que están activas.<br>_Mostrado como sesión_ |
| **gcp.router.dynamic_routes.learned_routes.any_dropped_unique_destinations** <br>(gauge) | Una métrica booleana que indica si hay destinos únicos descartados en una región de la red por superar la cuota.|
| **gcp.router.dynamic_routes.learned_routes.dropped_unique_destinations** <br>(gauge) | El número de destinos únicos descartados en una región de la red por superar la cuota.|
| **gcp.router.dynamic_routes.learned_routes.unique_destinations_limit** <br>(gauge) | El número máximo de destinos únicos permitidos por cuota de ruta para esta región de red.|
| **gcp.router.dynamic_routes.learned_routes.used_unique_destinations** <br>(gauge) | Número de destinos únicos utilizados por las rutas aprendidas para esta región de red.|
| **gcp.router.nat.allocated_ports** <br>(gauge) | El número de puertos asignados a todas las máquinas virtuales por la puerta NAT.|
| **gcp.router.nat.closed_connections_count** <br>(count) | El número de connections (conexiones) a la puerta NAT que están cerradas.<br>_Mostrado como connection (conexión)_ |
| **gcp.router.nat.dropped_received_packets_count** <br>(count) | El número de paquetes recibidos descartados por la puerta NAT.<br>_Mostrado como paquete_ |
| **gcp.router.nat.dropped_sent_packets_count** <br>(count) | Count de paquetes enviados descartados por la puerta NAT.<br>_Mostrado como paquete_ |
| **gcp.router.nat.nat_allocation_failed** <br>(gauge) | Indica si hay un fallo en la asignación de IP NAT a alguna máquina virtual en la puerta NAT.|
| **gcp.router.nat.new_connections_count** <br>(count) | El número de nuevas connections (conexiones) a la puerta NAT.<br>_Mostrado como connection (conexión)_ |
| **gcp.router.nat.open_connections** <br>(gauge) | El número de connections (conexiones) abiertas a la puerta NAT.<br>_Mostrado como connection (conexión)_ |
| **gcp.router.nat.port_usage** <br>(gauge) | El mayor uso de puertos entre todas las máquinas virtuales conectadas a la puerta NAT.|
| **gcp.router.nat.received_bytes_count** <br>(count) | El número de bytes recibidos por la puerta NAT.<br>_Mostrado como byte_ |
| **gcp.router.nat.received_packets_count** <br>(count) | El número de paquetes recibidos por la puerta NAT.<br>_Mostrado como paquete_ |
| **gcp.router.nat.sent_bytes_count** <br>(count) | El número de bytes enviados por la puerta NAT.<br>_Mostrado como byte_ |
| **gcp.router.nat.sent_packets_count** <br>(count) | El número de paquetes enviados por la puerta NAT.<br>_Mostrado como paquete_ |
| **gcp.router.router_up** <br>(gauge) | Estado del enrutador, activo o inactivo.|
| **gcp.router.sent_routes_count** <br>(gauge) | Número actual de rutas enviadas por el enrutador.|

### Eventos

La integración Google Cloud Router no incluye eventos.

### Checks de servicio

La integración Google Cloud Router no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).