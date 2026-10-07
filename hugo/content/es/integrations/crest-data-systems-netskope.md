---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_netskope
app_id: crest-data-systems-netskope
categories:
- marketplace
- almacenes de datos
- events
- gestión de eventos
custom_kind: integración
description: Monitorizar eventos y alerta de seguridad de Netskope
integration_version: 2.1.1
media:
- caption: Netskope - Información general
  image_url: images/crest_data_systems_netskope_overview.png
  media_type: imagen
- caption: Netskope - Alertas
  image_url: images/crest_data_systems_netskope_alerts.png
  media_type: imagen
- caption: Netskope - Eventos de aplicación
  image_url: images/crest_data_systems_netskope_application_events.png
  media_type: imagen
- caption: Netskope - Eventos de auditoría
  image_url: images/crest_data_systems_netskope_audit_events.png
  media_type: imagen
- caption: Netskope - Eventos de conexión
  image_url: images/crest_data_systems_netskope_connection_events.png
  media_type: imagen
- caption: Netskope - Eventos de incidentes
  image_url: images/crest_data_systems_netskope_incident_events.png
  media_type: imagen
- caption: Netskope - Eventos de infraestructura
  image_url: images/crest_data_systems_netskope_infrastructure_events.png
  media_type: imagen
- caption: Netskope - Eventos de red
  image_url: images/crest_data_systems_netskope_network_events.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Netskope
---
## Información general

Netskope es una plataforma de seguridad en la nube que ofrece soluciones de seguridad para gestionar y proteger aplicaciones y datos de la nube. Entre sus funciones se incluyen el agente de seguridad de acceso a la nube (CASB), la prevención de pérdida de datos (DLP), la protección frente a amenazas y la seguridad web.

Esta integración monitoriza las alertas activadas en Netskope, así como los eventos generados para infraestructuras, redes, conexiones, auditorías, aplicaciones e incidentes. También ayuda a los usuarios a visualizar las alertas y los eventos generados en Netskope a través de varios dashboards ricos en datos predefinidos disponibles.

La integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM](https://docs.datadoghq.com/security/cloud_siem/) para mejorar la monitorización y la seguridad:

1. Netskope recibió alertas de DLP para múltiples acciones bloqueadas en una hora
1. Netskope detectó una gran actividad de transferencia de archivos
1. Netskope detectó una interacción de baja confianza entre aplicaciones en la nube
1. Netskope detectó múltiples violaciones de política de un solo usuario

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración relevante debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Preguntas frecuentes sobre integraciones Crest Data en Datadog Marketplace](https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netskope" target="_blank">Haz clic aquí</a> para adquirirla.