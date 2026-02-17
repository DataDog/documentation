---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-swiftmq
app_uuid: 93738439-2cde-4718-a7f6-004f2da0177e
assets:
  dashboards:
    RapDev SwiftMQ Summary: assets/dashboards/summary.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.swiftmq.env
      metadata_path: metadata.csv
      prefix: rapdev.swiftmq
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10378
    source_type_name: RapDev SwiftMQ
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- colas de mensajes
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_swiftmq
integration_id: rapdev-swiftmq
integration_title: SwiftMQ
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_swiftmq
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.swiftmq
  product_id: swiftmq
  short_description: Precio unitario por instancia.
  tag: swiftmq_endpoint
  unit_label: Instancia SwiftMQ
  unit_price: 10
public_title: SwiftMQ
short_description: Monitorizar el estado y la actividad de tus instancias SwiftMQ
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
  - Categoría::Colas de mensajes
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar el estado y la actividad de tus instancias SwiftMQ
  media:
  - caption: Dashboard de resumen de SwiftMQ (1/3)
    image_url: images/swiftmq_dash_one.png
    media_type: imagen
  - caption: Dashboard de resumen de SwiftMQ (2/3)
    image_url: images/swiftmq_dash_two.png
    media_type: imagen
  - caption: Dashboard de resumen de SwiftMQ (3/3)
    image_url: images/swiftmq_dash_three.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: SwiftMQ
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->



## Información general

[SwiftMQ][1] es una plataforma de mensajería empresarial, de análisis de streaming en tiempo real y de microservicios. Admite aplicaciones empresariales a través de protocolos estándar JMS y AMQP 1.0, así como MQTT 3.1 o 3.1.1 para clientes IoT. Está optimizada para arquitecturas altamente escalables, con enrutamiento dinámico incorporado que permite el envío desde cualquier origen de forma transparente.


Esta integración informa sobre métricas del estado y el funcionamiento de [SwiftMQ][1] utilizando la [aplicación de monitorización Prometheus SwiftMQ][6] en [Flow Director][5].

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: [support@rapdev.io][4]
- Ventas: [sales@rapdev.io][3]
- Chat: [rapdev.io][2]
- Teléfono: 855-857-0222

---

Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota][4] a RapDev y la crearemos.*


[1]: https://www.swiftmq.com/
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: mailto:support@rapdev.io
[5]: https://www.flowdirector.io/start/
[6]: https://www.flowdirector.io/apps/prometheus/swiftmqprometheus/
[7]: https://help.flowdirector.io/spma/install-the-app
[8]: https://help.flowdirector.io/spma/quick-setup
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-swiftmq" target="_blank">adquiere esta aplicación en el Marketplace</a>.