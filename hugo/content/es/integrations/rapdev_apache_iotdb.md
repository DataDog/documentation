---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-apache-iotdb
app_uuid: dfc14c35-0fb0-457c-abf2-cde174b9e113
assets:
  dashboards:
    RapDev Apache IoTDB Dashboard: assets/dashboards/rapdev_apache_iotdb_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.apache_iotdb.connections
      metadata_path: metadata.csv
      prefix: rapdev.apache_iotdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10430
    source_type_name: RapDev Apache IoTDB
  monitors:
    Apache IoTDB Prometheus Connection Failing: assets/monitors/failed_prometheus_health.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- herramientas de desarrollo
- iot
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_apache_iotdb
integration_id: rapdev-apache-iotdb
integration_title: Apache IoTDB
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_apache_iotdb
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.apache_iotdb
  product_id: apache-iotdb
  short_description: Precio unitario por instancia.
  tag: endpoint_apache_iotdb
  unit_label: Nodo Apache IoTDB
  unit_price: 10
public_title: Apache IoTDB
short_description: Monitorizar los nodos de configuración y de datos de Apache IoTDB
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Herramientas de desarrollo
  - Categoría::IoT
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar los nodos de configuración y de datos de Apache IoTDB
  media:
  - caption: Dashboard Apache IoTDB - Información general de clúster
    image_url: images/cluster_overview.png
    media_type: imagen
  - caption: Dashboard Apache IoTDB - Rendimiento de escritura
    image_url: images/write_performance.png
    media_type: imagen
  - caption: Dashboard Apache IoTDB - Interfaz de consulta
    image_url: images/query_interface.png
    media_type: imagen
  - caption: Dashboard Apache IoTDB - Máquina virtual Java (JVM)
    image_url: images/jvm.png
    media_type: imagen
  - caption: Dashboard Apache IoTDB - Conexiones y redes
    image_url: images/connections_networking.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Apache IoTDB
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Apache IoTDB (Internet of Things Database) es un motor integrado de gestión de datos diseñado para datos de series temporales, que puede proporcionar a los usuarios servicios específicos para la recopilación, el almacenamiento y el análisis de datos. La integración Apache IoTDB permite a los usuarios monitorizar sus nodos de configuración y de datos para operaciones de compactación, consulta, metadatos y programación, así como el estado general de la máquina virtual Java (JVM).

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io][4]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][5] a RapDev y la crearemos!*

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[4]: https://www.rapdev.io/#Get-in-touch
[5]: mailto:support@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-apache-iotdb" target="_blank">adquiere esta aplicación en el Marketplace</a>.