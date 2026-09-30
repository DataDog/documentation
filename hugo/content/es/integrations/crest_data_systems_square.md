---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-square
app_uuid: 1ebd23c1-5394-4cf9-a94e-6fe35dabf72d
assets:
  dashboards:
    Square - Events: assets/dashboards/crest_data_systems_square_events.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 37335937
    source_type_name: crest_data_systems_square
  logs:
    source: crest_data_systems_square
  monitors:
    Item out of stock: assets/monitors/crest_data_systems_square_item_out_of_stock.json
author:
  homepage: https://www.crestdata.ai/
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- nube
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_square
integration_id: crest-data-systems-square
integration_title: Square
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: crest_data_systems_square
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: square
  short_description: Tarifa plana mensual.
  unit_price: 195.0
public_title: Square
short_description: Monitorizar y visualizar eventos de Square
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorizar y visualizar eventos de Square
  media:
  - caption: 'Square: eventos'
    image_url: images/cds_square_events.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Square
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[**Square**][1] es una plataforma tecnológica empresarial que ofrece soluciones de hardware y software para el procesamiento de pagos, la gestión de inventario, la captación de clientes y ventas online, al servicio de empresas de todos los tamaños. Gracias a la **API de eventos** de Square, esta integración proporciona visibilidad de las actividades empresariales y ofrece inteligencia procesable como logs y eventos en Datadog.

Esta integración incluye un dashboard predefinido:

- **Square: eventos**: este dashboard proporciona una visión general de los logs de evento de Square y fusiona las ocho áreas clave de monitorización de Square: pagos, reembolsos, pedidos, inventario, clientes, facturas, reservas y pagos, todo en una vista unificada diseñada para ofrecer visibilidad e inteligencia procesable.

Esta integración incluye las siguientes reglas de detección de [Datadog Cloud SIEM][6] para una mejor monitorización y seguridad:

1. Tendencia inusual de fracaso en el pago observada en Square
2. Patrón inusual de actividad de devolución observado en Square
3. Patrón inusual de actividad de disputa observado en Square
4. Patrón anormal de cancelación de pedidos observado en Square

> **Nota**: Para utilizar las reglas de detección predefinidas, la integración pertinente debe estar instalada en Datadog y Cloud SIEM debe estar habilitado.

Esta integración incluye un monitor:

1. Artículo agotado: este monitor alerta cuando el recuento de inventario llega a cero para un artículo.

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][11]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][12]
- Página web: [crestdata.ai][13]
- FAQ: [FAQ de integraciones de Datadog Marketplace de Crest Data][3]


[1]: https://squareup.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Square.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://developer.squareup.com/apps
[6]: https://docs.datadoghq.com/es/security/cloud_siem/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[8]: https://docs.datadoghq.com/es/account_management/api-app-keys
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: mailto:datadog.integrations@crestdata.ai
[12]: mailto:datadog-sales@crestdata.ai
[13]: https://www.crestdata.ai/
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-square" target="_blank">adquiere esta aplicación en el Marketplace</a>.