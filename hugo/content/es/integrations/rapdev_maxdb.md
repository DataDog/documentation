---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-maxdb
app_uuid: f30ae17c-d58a-43f4-a8a6-693279394101
assets:
  dashboards:
    RapDev MaxDB Dashboard: assets/dashboards/rapdev_maxdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.maxdb.db_state
      metadata_path: metadata.csv
      prefix: rapdev.maxdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10131
    source_type_name: RapDev MaxDB
  monitors:
    Data volume usage is high: assets/monitors/rapdev_maxdb_data_volume_usage.json
    Database connection is failing: assets/monitors/rapdev_maxdb_connection_check.json
    Database is not online: assets/monitors/rapdev_maxdb_state.json
    Lock utilization is high: assets/monitors/rapdev_maxdb_lock_utilization.json
    Log area usage is high: assets/monitors/rapdev_maxdb_log_area_usage.json
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
- sap
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_maxdb
integration_id: rapdev-maxdb
integration_title: MaxDB
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_maxdb
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.maxdb
  product_id: maxdb
  short_description: Precio unitario por base de datos
  tag: base de datos
  unit_label: Base de datos
  unit_price: 50
public_title: MaxDB
short_description: Monitoriza el volumen, la caché, el esquema, la tabla y más desde
  las bases de datos de MaxDB
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Databases
  - Category::Marketplace
  - Category::SAP
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Data Type::Metrics
  configuration: README.md#Configuración
  description: Monitoriza el volumen, la caché, el esquema, la tabla y más desde las
    bases de datos de MaxDB
  media:
  - caption: Estado de la base de datos y métricas de logs/datos
    image_url: images/1.png
    media_type: imagen
  - caption: Métricas de caché de base de datos
    image_url: images/2.png
    media_type: imagen
  - caption: Métricas de esquema, sesión y OMS
    image_url: images/3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: MaxDB
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->
## Información general

La integración de MaxDB monitoriza áreas y volúmenes de datos y logs, cachés, sesiones, bloqueos y otras métricas de las instancias de MaxDB para garantizar que las bases de datos se ejecuten como deberían. La integración incluye un dashboard que se puede filtrar por base de datos y por host de base de datos. La integración de MaxDB también incluye monitores para algunas métricas comunes relacionadas con el estado general de la base de datos.

### Monitores
1. Check de conexión de MaxDB
2. Estado de MaxDB
3. Uso del volumen de datos de MaxDB
4. Utilización de bloqueos de MaxDB
5. Uso del área de log de MaxDB

## Ayuda

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales: 

 - Correo electrónico: support@rapdev.io 
 - Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
 - Teléfono: 855-857-0222 

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-maxdb" target="_blank">adquiere esta aplicación en el Marketplace</a>.