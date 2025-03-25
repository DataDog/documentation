---
algolia:
  subcategory: Integraciones de Marketplace
app_id: agentil-software-sap-businessobjects
app_uuid: cac9d777-3bd1-40a1-aef3-28a8141804f1
assets:
  dashboards:
    SAP BusinessObjects overview: assets/dashboards/agentil_software_sap_businessobjects_global_overview.json
    SAP BusinessObjects system dashboard: assets/dashboards/agentil_software_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.agentil_software.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: agentil_software
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10252
    source_type_name: AGENTIL Software SAP BusinessObjects
author:
  homepage: https://www.agentil-software.com
  name: Agentil Software
  sales_email: sales@agentil-software.com
  support_email: support@agentil-software.com
  vendor_id: agentil-software
categories:
- marketplace
- sap
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: agentil_software_sap_businessobjects
integration_id: agentil-software-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: agentil_software_sap_businessobjects
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.agentil_software.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: Precio por cada sistema SAP supervisado (identificado por SID)
  tag: uri
  unit_label: Instancia SAP BusinessObjects
  unit_price: 160
public_title: SAP BusinessObjects
short_description: Monitorizar sistemas de objetos empresariales SAP
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitorizar sistemas de objetos empresariales SAP
  media:
  - caption: Información global de SAP BusinessObjects
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: imagen
  - caption: Información general del sistema SAP BusinessObjects
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: SAP BusinessObjects
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
La integración de SAP BusinessObjects monitoriza los sistemas SAP **BusinessObjects**.

Esta integración utiliza una conexión remota sin agente y plantillas preconfiguradas de monitorización, lo que permite ponerlo en marcha en pocos minutos.

La monitorización se basa en la plataforma [Pro.monitor](https://www.agentil-software.com) de AGENTIL Software, que se configura desde el primer momento para abordar los módulos y transacciones más relevantes de tus sistemas SAP: **conexiones**, **servicios**, **informes**, **programas**, **alertas de auditoría**, etc.

Esta integración recopila y analiza datos de los sistemas en tiempo real, y produce métricas y eventos procesables. Puedes crear alertas personalizadas sobre estos datos configurando Pro.monitor o creando monitores de Datadog directamente en las métricas.

### Módulos monitorizados

- Estado del servidor
- Usuarios simultáneos
- Métricas de servidor
- Propiedades del servidor
- Cronogramas e informes
- CMC y advertencias de auditoría

## Agent
Para solicitar asistencia o funciones, ponte en contacto con AGENTIL Software en support@agentil-software.com

*Si buscas un socio de confianza para integraciones específicas con SAP u otras plataformas, estás en el lugar adecuado: ponte en contacto con nosotros.*

---
Este producto se diseña y desarrolla en Ginebra (Suiza). 


---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/agentil-software-sap-businessobjects" target="_blank">Haz clic aquí</a> para comprar esta aplicación.