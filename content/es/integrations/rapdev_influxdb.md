---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-influxdb
app_uuid: e560c4c8-7983-4338-bc41-30b121a4ac98
assets:
  dashboards:
    RapDev InfluxDB API Statistics: assets/dashboards/RapDevInfluxDBAPIStatistics.json
    RapDev InfluxDB Summary: assets/dashboards/RapDevInfluxDBSummary.json
    RapDev InfluxDB System: assets/dashboards/RapDevInfluxDBSystem.json
    RapDev InfluxDB Tasks and Services: assets/dashboards/RapDevInfluxDBTasksandServices.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.influxdb.go_info
      metadata_path: metadata.csv
      prefix: rapdev.influxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10292
    source_type_name: RapDev InfluxDB
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- almacenes de datos
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_influxdb
integration_id: rapdev-influxdb
integration_title: InfluxDB
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_influxdb
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.influxdb
  product_id: influxdb
  short_description: Precio unitario por instancia.
  tag: influxdb_endpoint
  unit_label: Instancia de InfluxDB
  unit_price: 10
public_title: InfluxDB
short_description: Monitorizar el estado y la actividad de tus instancias InfluxDB
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar el estado y la actividad de tus instancias InfluxDB
  media:
  - caption: Dashboard de la integración InfluxDB - Estadísticas de API
    image_url: images/rapdev-influxdb-api.png
    media_type: imagen
  - caption: Dashboard de la integración InfluxDB - Resumen
    image_url: images/rapdev-influxdb-summary.png
    media_type: imagen
  - caption: Dashboard de la integración InfluxDB - Sistema
    image_url: images/rapdev-influxdb-system.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: InfluxDB
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Esta integración informa de métricas sobre el estado y el funcionamiento de [InfluxDB][1] v2.0 o posterior.

### Dashboards

Esta integración proporciona varios dashboards predefinidos llamados **Resumen InfluxDB**, 
**Estadísticas de la API InfluxDB**, **Sistema InfluxDB** y **Tareas y servicios InfluxDB**. 
Estos dashboards muestran las métricas generadas por la integración y las dividen en diferentes categorías.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io][2]
- Teléfono: 855-857-0222

---

Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota][4] a RapDev y la crearemos.*


[1]: https://www.influxdata.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-influxdb" target="_blank">adquiere esta aplicación en el Marketplace</a>.