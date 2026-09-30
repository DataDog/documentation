---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-sophos
app_uuid: 86b68ae7-ba52-4160-bbf5-e1455fafa677
assets:
  dashboards:
    RapDev Sophos Dashboard: assets/dashboards/rapdev_sophos_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.sophos.endpoint.registered
      metadata_path: metadata.csv
      prefix: rapdev.sophos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10192
    source_type_name: RapDev Sophos
  logs: {}
  monitors:
    Endpoint is no longer in good health: assets/monitors/sophos_endpoint_health.json
    Sophos Service is stopped: assets/monitors/sophos_service_running.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_sophos
integration_id: rapdev-sophos
integration_title: Sophos
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_sophos
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.sophos
  product_id: sophos
  short_description: Precio unitario por endpoint
  tag: endpoint_name
  unit_label: Endpoint registrado
  unit_price: 1
public_title: Sophos
short_description: Monitoriza el estado de tus endpoints gestionados por Sophos
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza el estado de tus endpoints gestionados por Sophos
  media:
  - caption: Dashboard de Sophos
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Sophos
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La integración de Sophos monitoriza el estado general de los endpoints gestionados por Sophos para asegurarse de que tus dispositivos gestionados se encuentren en buen estado. La integración cuenta con 1 dashboard preconfigurado que proporciona información general sobre varias métricas que se pueden usar para monitorizar el estado de los dispositivos. La integración de Sophos también cuenta con 2 monitores que se pueden usar para alertar cuando un dispositivo ya no se encuentra en buen estado o si se detiene uno de los servicios de Sophos en el dispositivo.

### Monitores
1. El estado del endpoint gestionado ha cambiado
2. El servicio de Sophos en el endpoint gestionado se ha detenido

### Dashboards
1. Dashboard de RapDev Sophos

## Ayuda
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/rapdev_sophos/datadog_checks/rapdev_sophos/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-sophos" target="_blank">adquiere esta aplicación en el Marketplace</a>.