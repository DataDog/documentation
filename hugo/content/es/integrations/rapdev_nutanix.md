---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-nutanix
app_uuid: 53711ca7-b5f8-4472-b921-e70a3103ede4
assets:
  dashboards:
    RapDev Nutanix Cluster Overview: assets/dashboards/rapdev_nutanix_overview_dashboard.json
    RapDev Nutanix Clusters Dashboard: assets/dashboards/rapdev_nutanix_clusters_dashboard.json
    RapDev Nutanix Hosts and Disks Dashboard: assets/dashboards/rapdev_nutanix_hosts_and_disks_dashboard.json
    RapDev Nutanix Protection Domain Dashboard: assets/dashboards/rapdev_nutanix_protection_domain_dashboard.json
    RapDev Nutanix VMs Dashboard: assets/dashboards/rapdev_nutanix_vms_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.nutanix.clusters.count
      metadata_path: metadata.csv
      prefix: rapdev.nutanix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10138
    source_type_name: RapDev Nutanix
  logs: {}
  monitors:
    CPU utilization is high: assets/monitors/nutanix_cpu_monitor.json
    Compression saving ratio is low: assets/monitors/nutanix_compression_saving_monitor.json
    Deduplication ratio is low: assets/monitors/nutanix_deduplication_monitor.json
    Storage is reaching saturation: assets/monitors/nutanix_storage_monitor.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_nutanix
integration_id: rapdev-nutanix
integration_title: Nutanix
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_nutanix
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.nutanix
  product_id: nutanix
  short_description: Precio unitario por núcleo
  tag: núcleo
  unit_label: Núcleos de host de Nutanix
  unit_price: 5
public_title: Nutanix
short_description: Monitoriza el uso de recursos de Nutanix para obtener una mejor
  comprensión de tu entorno
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza el uso de recursos de Nutanix para obtener una mejor comprensión
    de tu entorno
  media:
  - caption: Dashboard de información general de Nutanix
    image_url: images/4.png
    media_type: imagen
  - caption: Dashboard de máquinas virtuales de Nutanix
    image_url: images/5.png
    media_type: imagen
  - caption: Dashboard de clústeres de Nutanix
    image_url: images/6.png
    media_type: imagen
  - caption: Dashboard de discos y hosts de Nutanix
    image_url: images/7.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Nutanix
  uninstallation: README.md#Uninstallation
---

<!--  FUENTE https://github.com/DataDog/marketplace -->


## Información general
La integración de Nutanix monitoriza el almacenamiento, el uso de CPU, las IOPS de lectura/escritura y otras métricas dentro de los clústeres de Nutanix, para garantizar que tu entorno funcione con un rendimiento óptimo en todo momento. La integración incluye 4 dashboards que te permiten ver tus clústeres de Nutanix desde la vista de información general, así como obtener información detallada e identificar posibles degradaciones del rendimiento. La integración de Nutanix también incluye monitores para métricas clave como la utilización del almacenamiento y los ahorros de deduplicación, que son esenciales para el rendimiento general del entorno de Nutanix.

### Monitores

1. Utilización del almacenamiento de clúster de Nutanix
2. Utilización de la CPU de clúster de Nutanix
3. Tasa de ahorro de la deduplicación de clústeres de Nutanix
4. Tasa de ahorro de la compresión de clústeres de Nutanix

### Dashboards

1. Información general de RapDev Nutanix
2. Clústeres de RapDev Nutanix
3. Hosts y discos de RapDev Nutanix
4. Máquinas virtuales de RapDev Nutanix

## Soporte
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Correo electrónico: support@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/rapdev-nutanix" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.