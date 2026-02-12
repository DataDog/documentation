---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-oracle-timesten
app_uuid: bddd0f6a-efe0-4e3f-bff4-46df8bb839f9
assets:
  dashboards:
    Oracle TimesTen: assets/dashboards/oracle_timesten.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.oracle_timesten.reportduration
      metadata_path: metadata.csv
      prefix: rapdev.oracle_timesten.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10116
    source_type_name: Oracle TimesTen
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- almacenamiento en caché
- almacenes de datos
- marketplace
- oracle
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: oracle_timesten
integration_id: rapdev-oracle-timesten
integration_title: Oracle TimesTen
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: oracle_timesten
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.oracle_timesten
  product_id: oracle-timesten
  short_description: Precio unitario por host
  tag: host
  unit_label: Base de datos de Oracle Times Ten
  unit_price: 500
public_title: Oracle TimesTen
short_description: Monitorizar el rendimiento de la base de datos de Oracle TimesTen
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Marketplace
  - Category::Oracle
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Monitorizar el rendimiento de la base de datos de Oracle TimesTen
  media:
  - caption: Integración de Oracle TimesTen y Datadog
    image_url: images/video.png
    media_type: vídeo
    vimeo_id: 630489692
  - caption: Resumen del estado
    image_url: images/1.png
    media_type: imagen
  - caption: Métricas de replicación
    image_url: images/2.png
    media_type: imagen
  - caption: Estadísticas de SQL
    image_url: images/3.png
    media_type: imagen
  - caption: Información general sobre dashboards
    image_url: images/4.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Oracle TimesTen
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La integración de Oracle TimesTen te permite monitorizar tus bases de datos en memoria de TimesTen. Esta integración incluye más de 200 métricas y proporciona detalles sobre tus consultas principales, el estado de la base de datos, los tiempos de ejecución y mucho más.

La integración incluye un dashboard predefinido que muestra una visión general del estado y métricas de tus bases de datos de TimesTen.

## Agent

Para obtener ayuda o solicitudes de características, contacta con RapDev.io a través de los siguientes canales:

 - Correo electrónico: support@rapdev.io
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-oracle-timesten" target="_blank">adquiere esta aplicación en el Marketplace</a>.