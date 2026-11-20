---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-servicenow
app_uuid: 50d76130-5970-43e1-a055-0cd5d681d9b7
assets:
  dashboards:
    RapDev ServiceNow: assets/dashboards/servicenow.json
    RapDev ServiceNow ITSM: assets/dashboards/servicenow_itsm.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rapdev.servicenow.record
      metadata_path: metadata.csv
      prefix: rapdev.servicenow.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10184
    source_type_name: RapDev ServiceNow
  logs: {}
  monitors:
    ServiceNow Records Pending Approval: assets/monitors/servicenow_pending_approval_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- nube
- rum
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_servicenow
integration_id: rapdev-servicenow
integration_title: ServiceNow Performance Monitoring
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_servicenow
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.servicenow
  product_id: servicenow
  short_description: Precio unitario por instancia
  tag: instance_name
  unit_label: Instancia de ServiceNow
  unit_price: 1000
public_title: ServiceNow Performance Monitoring
short_description: Monitoriza el rendimiento de la instancia de ServiceNow y los registros
  de ITSM
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Incidents
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza el rendimiento de la instancia de ServiceNow y los registros
    de ITSM
  media:
  - caption: Dashboard de rendimiento de las instancias de ServiceNow
    image_url: images/1.png
    media_type: imagen
  - caption: Estadísticas de registro del dashboard de ITSM de ServiceNow 1 de 2
    image_url: images/2.png
    media_type: imagen
  - caption: Estadísticas de registro del dashboard de ITSM de ServiceNow 2 de 2
    image_url: images/3.png
    media_type: imagen
  - caption: Estadísticas de SLA del dashboard de ITSM de ServiceNow
    image_url: images/4.png
    media_type: imagen
  - caption: Estadísticas de conexión de la tabla del dashboard de ITSM de ServiceNow
    image_url: images/5.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: ServiceNow Performance Monitoring
  uninstallation: README.md#Uninstallation
---

<!--  FUENTE https://github.com/DataDog/marketplace -->
## Información general

La integración de ServiceNow Performance Monitoring monitoriza el estado y el rendimiento de tus instancias de ServiceNow con información valiosa sobre transacciones, trabajos, bases de datos y métricas de caché. La integración también rastrea los registros de ITSM abiertos, lo que proporciona puntos de datos útiles sobre los SLAs y la antigüedad de los registros que afectan a la empresa.

## Agent
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

 - Correo electrónico: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222

---

Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-servicenow" target="_blank">adquiere esta aplicación en el Marketplace</a>.