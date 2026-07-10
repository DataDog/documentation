---
aliases:
- /es/integrations/google_cloud_private_service_connect
app_id: google-cloud-private-service-connect
categories:
- google cloud
- red
- métricas
custom_kind: integración
description: Monitorizar tus conexiones Private Service
integration_version: 1.0.0
media: []
title: Google Cloud Private Service Connect
---
## Información general

[Google Cloud Private Service Connect](https://app.datadoghq.com/integrations/google-cloud-private-service-connect) es una capacidad de Google Cloud Networking que permite a los consumidores acceder a servicios gestionados de forma privada desde el interior de tu red VPC, ofreciendo así tanto seguridad en la transferencia de los datos, como ahorro de costos de sobrecarga de red (salida). También permite a los productores alojar y exponer sus servicios a otros clientes de Google Cloud, ofreciendo una connection (conexión) privada entre su servicio y los consumidores.

Activa esta integración para visualizar conexiones, transferencia de datos y paquetes perdidos a través de Private Service Connect. A través de esta integración, Datadog recopila métricas importantes de tus conexiones Private Service Connect., tanto de productores como de consumidores.

## Configuración

### Instalación

### Configuración

Para recopilar métricas, esta integración utilizará las credenciales que configuraste en la [integración principal de Google Cloud Platform](https://app.datadoghq.com/integrations/google-cloud-platform).

Datadog también ofrece la funcionalidad Private Service Connect, que te permite transmitir métricas, traces (trazas) y logs desde tu entorno de Google Cloud a Datadog a través de un Private Link sin pasar por la Internet pública, lo que ahorra en costos de salida de red y proporciona más seguridad para tus datos en tránsito. Para ello, consulta nuestra [guía de centros de datos compatibles](https://docs.datadoghq.com/agent/guide/gcp-private-service-connect/?site=us5).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gcp.gce.private_service_connect.consumer.closed_connections_count** <br>(count) | Count de connections (conexiones) de TCP/UDP cerradas a través de un ID de connection (conexión) de PSC.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.consumer.dropped_received_packets_count** <br>(count) | Count de paquetes recibidos descartados por un ID de connection (conexión) de PSC.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.consumer.dropped_sent_packets_count** <br>(count) | Count de paquetes enviados descartados por un ID de connection (conexión) de PSC.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.consumer.new_connections_count** <br>(count) | Count de nuevas connections (conexiones) de TCP/UDP creadas a través de un ID de connection (conexión) de PSC.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.consumer.open_connections** <br>(gauge) | Número de connections (conexiones) de TCP/UDP abiertas actualmente en un ID de connection (conexión) de PSC.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.consumer.received_bytes_count** <br>(count) | Count de bytes recibidos (PSC -> Clientes) a través de un ID de connection (conexión) de PSC.<br>_Mostrado como byte_ |
| **gcp.gce.private_service_connect.consumer.received_packets_count** <br>(count) | Count de paquetes recibidos (PSC -> Clientes) a través de un ID de connection (conexión) de PSC.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.consumer.sent_bytes_count** <br>(count) | Recuento de bytes enviados (Clientes -> PSC) a través de un ID de connection (conexión) de PSC.<br>_Mostrado como byte_ |
| **gcp.gce.private_service_connect.consumer.sent_packets_count** <br>(count) | Count de paquetes enviados (Clientes -> PSC) a través de un ID de connection (conexión) de PSC.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.producer.closed_connections_count** <br>(count) | Count de connections (conexiones) de TCP/UDP cerradas a través de un identificador de recurso PSC Service Attachment.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.producer.connected_consumer_forwarding_rules** <br>(gauge) | Número de reglas de reenvío de consumidores conectadas a un ID de recurso de PSC Service Attachment.|
| **gcp.gce.private_service_connect.producer.dropped_received_packets_count** <br>(count) | Count de paquetes recibidos descartados por un identificador de recurso PSC Service Attachment.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.producer.dropped_sent_packets_count** <br>(count) | Count de paquetes enviados descartados por un ID de recurso de PSC Service Attachment.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.producer.new_connections_count** <br>(count) | Count de nuevas connections (conexiones) TCP/UDP creadas a través de un identificador de recurso PSC Service Attachment.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.producer.open_connections** <br>(gauge) | Número de connections (conexiones) TCP/UDP abiertas actualmente en un identificador de recurso del PSC Service Attachment.<br>_Mostrado como connection (conexión)_ |
| **gcp.gce.private_service_connect.producer.received_bytes_count** <br>(count) | Count de bytes recibidos (PSC -> Servicio) a través de un ID de recurso de PSC Service Attachment.<br>_Mostrado como byte_ |
| **gcp.gce.private_service_connect.producer.received_packets_count** <br>(count) | Count de paquetes recibidos (PSC -> Servicio) a través de un ID de recurso de PSC Service Attachment.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.producer.sent_bytes_count** <br>(count) | Count de bytes enviados (Servicio -> PSC) a través de un ID de recurso de PSC Service Attachment.<br>_Mostrado como byte_ |
| **gcp.gce.private_service_connect.producer.sent_packets_count** <br>(count) | Count de paquetes enviados (Servicio -> PSC) a través de un ID de recurso PSC Service Attachment.<br>_Mostrado como paquete_ |
| **gcp.gce.private_service_connect.producer.used_nat_ip_addresses** <br>(gauge) | Uso de IP del anexo de servicio monitorizado.|
| **gcp.gce.quota.psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.exceeded** <br>(count) | Número de intentos de superar el límite de la métrica de cuota compute.googleapis.com/psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.|
| **gcp.gce.quota.psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.limit** <br>(gauge) | Límite actual de la métrica de cuota compute.googleapis.com/psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.|
| **gcp.gce.quota.psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.usage** <br>(gauge) | Uso actual de la métrica de cuota compute.googleapis.com/psc_ilb_consumer_forwarding_rules_per_producer_vpc_network.|

### Checks de servicio

Google Cloud Private Service Connect no incluye checks de servicios.

### Eventos

Google Cloud Private Service Connect no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).