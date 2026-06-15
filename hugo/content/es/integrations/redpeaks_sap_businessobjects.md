---
algolia:
  subcategory: Integraciones del Marketplace
app_id: redpeaks-sap-businessobjects
app_uuid: f6278fc8-8b6a-4f88-922b-3da687b26e62
assets:
  dashboards:
    Redpeaks SAP BusinessObjects overview: assets/dashboards/redpeaks_sap_businessobjects_global_overview.json
    Redpeaks SAP BusinessObjects system dashboard: assets/dashboards/redpeaks_sap_businessobjects_system.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.redpeaks.sap_businessobjects.system
      metadata_path: metadata.csv
      prefix: redpeaks
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10999
    source_type_name: Redpeaks SAP BusinessObjects
author:
  homepage: https://www.redpeaks.io
  name: Redpeaks
  sales_email: sales@redpeaks.io
  support_email: support@redpeaks.io
  vendor_id: redpeaks
categories:
- marketplace
- sap
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: redpeaks_sap_businessobjects
integration_id: redpeaks-sap-businessobjects
integration_title: SAP BusinessObjects
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: redpeaks_sap_businessobjects
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.redpeaks.sap_businessobjects.system
  product_id: sap-businessobjects
  short_description: Precio por cada sistema SAP supervisado (identificado por SID)
  tag: uri
  unit_label: Instancia SAP BusinessObjects
  unit_price: 160.0
public_title: SAP BusinessObjects
short_description: Monitorizar sistemas de objetos empresariales SAP
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Categoría::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  configuration: README.md#Configuración
  description: Monitorizar sistemas de objetos empresariales SAP
  media:
  - caption: Información global de SAP BusinessObjects
    image_url: images/sap_businessobjects_global_overview_dashboard.png
    media_type: imagen
  - caption: Información general del sistema SAP BusinessObjects
    image_url: images/sap_businessobjects_system_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: SAP BusinessObjects
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general
La integración de SAP BusinessObjects monitoriza los sistemas SAP **BusinessObjects**.

Mediante una conexión remota **agentless** y plantillas de monitorización preconfiguradas, esta integración puede ponerse en funcionamiento en sólo **unos minutos**.

La monitorización utiliza la tecnología [Redpeaks][1] (anteriormente conocido como Agentil Software - Pro.Monitor). Está configurado de forma predefinida para cubrir los componentes más relevantes de tus sistemas SAP: **conexiones**, **servicios**, **informes**, **cronogramas**, **alertas de auditoría** y más.

Esta integración recopila y analiza datos de los sistemas en tiempo real y produce métricas y eventos procesables. Puedes ajustar con precisión las alertas configurando Redpeaks y crear monitores de Datadog directamente para las métricas.

Redpeaks se integra con despliegues SAP de todo tipo y tamaño, ya sea que gestiones un único sistema o cientos de ellos. Es compatible con configuraciones on-premises, nubes privadas, entornos híbridos, por lo que ofrece flexibilidad para satisfacer tus necesidades específicas.

### Módulos monitorizados

- Estado del servidor
- Usuarios simultáneos
- Métricas de servidor
- Propiedades del servidor
- Cronogramas e informes
- CMC y advertencias de auditoría

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Redpeaks a través del siguiente canal:

- Correo electrónico: [support@redpeaks.io][2]

### Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar SAP NetWeaver con la oferta de Redpeaks en el Marketplace de Datadog][5]

*Si buscas un socio de confianza para integraciones específicas con SAP u otras plataformas, estás en el lugar adecuado: ponte en contacto con nosotros.*

---
Este producto se diseñó y desarrolló en Ginebra (Suiza). 

[1]: https://www.redpeaks.io
[2]: mailto:support@redpeaks.io
[3]: https://softwaredownloads.sap.com/file/0020000000507122021
[4]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:userguide:configuration
[5]: https://www.datadoghq.com/blog/sap-netweaver-monitoring-agentil-datadog-marketplace/
[6]: https://wiki.redpeaks.io/doku.php?id=products:promonitor:6.8:installguide:prerequisites
[7]: https://wiki.redpeaks.io/doku.php?id=products:cockpit:1.0:installguide:installjava
[8]: https://agentil.box.com/s/k0yp1tk58r666rfncf0nb9k1qa0guvdc


---
Esta aplicación está disponible a través del Marketplace de Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/redpeaks-sap-businessobjects" target="_blank">adquiere esta aplicación en el Marketplace</a>.