---
algolia:
  subcategory: Integraciones del Marketplace
app_id: crest-data-systems-netskope
app_uuid: d0754e39-56d8-47e0-8c1f-0f217bd1f8e5
assets:
  dashboards:
    Netskope - Alerts: assets/dashboards/crest_data_systems_netskope_alerts.json
    Netskope - Application Events: assets/dashboards/crest_data_systems_netskope_application_events.json
    Netskope - Audit Events: assets/dashboards/crest_data_systems_netskope_audit_events.json
    Netskope - Clients: assets/dashboards/crest_data_systems_netskope_clients.json
    Netskope - Connection Events: assets/dashboards/crest_data_systems_netskope_connection_events.json
    Netskope - Incident Events: assets/dashboards/crest_data_systems_netskope_incident_events.json
    Netskope - Infrastructure Events: assets/dashboards/crest_data_systems_netskope_infrastructure_events.json
    Netskope - Network Events: assets/dashboards/crest_data_systems_netskope_network_events.json
    Netskope - Overview: assets/dashboards/crest_data_systems_netskope_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.netskope.connection_cci.cci
      metadata_path: metadata.csv
      prefix: cds.netskope
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10343
    source_type_name: crest_data_systems_netskope
  logs:
    source: crest_data_systems_netskope
author:
  homepage: https://crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- almacenes de datos
- events
- gestión de eventos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_netskope
integration_id: crest-data-systems-netskope
integration_title: Netskope
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_netskope
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems_netskope.volume
  product_id: netskope
  short_description: Por 1 millón de eventos/alertas de Netskope.
  tag: etiqueta_evento
  unit_label: 1 millón de eventos/alertas de Netskope
  unit_price: 45.0
public_title: Netskope
short_description: Monitorizar eventos y alerta de seguridad de Netskope
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Marketplace
  - Categoría::Almacenes de datos
  - Categoría::Alertas
  - Categoría::Gestión de eventos
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar eventos y alerta de seguridad de Netskope
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
  overview: README.md#Información general
  support: README.md#Soporte
  title: Netskope
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Netskope es una plataforma de seguridad en la nube que ofrece soluciones de seguridad para gestionar y proteger aplicaciones y datos de la nube. Entre sus funciones se incluyen el agente de seguridad de acceso a la nube (CASB), la prevención de pérdida de datos (DLP), la protección frente a amenazas y la seguridad web.

Esta integración monitoriza las alertas activadas en Netskope, así como los eventos generados para infraestructuras, redes, conexiones, auditorías, aplicaciones e incidentes. También ayuda a los usuarios a visualizar las alertas y los eventos generados en Netskope a través de varios dashboards ricos en datos predefinidos disponibles.

Esta integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM][13] para una monitorización y seguridad mejoradas:

1. Netskope recibió alertas de DLP para múltiples acciones bloqueadas en una hora
2. Netskope detectó una gran actividad de transferencia de archivos
3. Netskope detectó una interacción de baja confianza entre aplicaciones en la nube
4. Netskope detectó múltiples violaciones de política de un solo usuario

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración relevante debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][11]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][12]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ sobre integraciones Crest Data Datadog Marketplace][10]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.crestdata.ai/datadog-integrations-readme/Netskope.pdf
[6]: https://docs.datadoghq.com/es/agent/
[7]: https://docs.netskope.com/en/netskope-help/data-security/real-time-protection/custom-category/rest-api-v2-overview/
[8]: https://docs.netskope.com/en/netskope-help/admin-console/rest-api/rest-api-v1-overview/
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
[13]: https://docs.datadoghq.com/es/security/cloud_siem/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-netskope" target="_blank">adquiere esta aplicación en el Marketplace</a>.