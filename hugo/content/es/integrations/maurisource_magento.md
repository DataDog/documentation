---
algolia:
  subcategory: Integraciones de Marketplace
app_id: maurisource-magento
app_uuid: 09849dc9-ec3b-43a1-9ec4-da7821c12b63
assets:
  dashboards:
    Magento: assets/dashboards/maurisource_magento_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: maurisource.magento.store.count
      metadata_path: metadata.csv
      prefix: maurisource.magento.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 25366756
    source_type_name: Maurisource Magento
author:
  homepage: https://maurisource.com/
  name: Maurisource Inc
  sales_email: info@maurisource.com
  support_email: info@maurisource.com
  vendor_id: maurisource
categories:
- marketplace
- métricas
- gestión de costes
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: maurisource_magento
integration_id: maurisource-magento
integration_title: Magento (Adobe Commerce)
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: maurisource_magento
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.maurisource.magento
  product_id: maurisource-magento
  short_description: Precio unitario por tienda Magento/Adobe Commerce habilitada
  tag: user_login
  unit_label: Tiendas habilitadas
  unit_price: 49.0
public_title: Magento (Adobe Commerce)
short_description: Monitoriza claves de métricas de las tiendas de Magento (Adobe
  Commerce).
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Category::Metrics
  - Category::Cost Management
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Monitoriza claves de métricas de las tiendas de Magento (Adobe Commerce).
  media:
  - caption: Captura de pantalla del dashboard de la integración de Maurisource Magento
    image_url: images/dashboard-screenshot.png
    media_type: imagen
  - caption: Captura de pantalla del dashboard de Adobe Commerce
    image_url: images/adobe-commerce-dashboard.png
    media_type: imagen
  - caption: Captura de pantalla del dashboard de Magento
    image_url: images/magento-commerce-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Magento (Adobe Commerce)
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Esta integración recopila las métricas expuestas por [Magento Module][1].

### Magento (Adobe Commerce)

Magento (Adobe Commerce) es una plataforma de comercio flexible y escalable que te permite crear experiencias B2B y B2C personalizadas únicas. Magento permite a las empresas crear, gestionar y escalar tiendas en línea. Ofrece herramientas avanzadas de gestión de productos, captación de clientes y análisis de ventas que permiten a miles de empresas crear y gestionar sus marcas.

Esta integración recopila datos en formato de métricas abiertas de Magento y monitoriza las métricas de recuento de clientes, catálogo de productos, ventas, pedidos y otras métricas específicas del comercio electrónico.

Esta integración proporciona visibilidad en tiempo real de Magento, lo que permite a las empresas tomar decisiones basadas en datos y garantizar una mejor comprensión de las necesidades de los clientes, ayudando a mejorar la retención y la satisfacción y a desarrollar campañas de marketing que lleguen a su público objetivo.

## Soporte

Para obtener soporte, ponte en contacto con Maurisource

- Correo electrónico: [info@maurisource.com][9]
- Página web: [maurisource.com][10]

### Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Maurisource][9].

[1]: https://github.com/run-as-root/magento2-prometheus-exporter
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://docs.datadoghq.com/es/getting_started/integrations/#configuring-agent-integrations
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/containers/
[7]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-information
[8]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#remove
[9]: mailto:info@maurisource.com
[10]: https://maurisource.com

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/maurisource-magento" target="_blank">adquiere esta aplicación en el Marketplace</a>.