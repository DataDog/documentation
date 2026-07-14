---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-glassfish
app_uuid: 58392a75-5d53-43ad-aeb9-62129ccf086b
assets:
  dashboards:
    RapDev Glassfish Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.glassfish.up_time
      metadata_path: metadata.csv
      prefix: rapdev.glassfish.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10424
    source_type_name: RapDev Glassfish
  monitors:
    Glassfish Virtual Server is Off: assets/monitors/virtual_server_state.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_glassfish
integration_id: rapdev-glassfish
integration_title: Glassfish
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_glassfish
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.glassfish
  product_id: glassfish
  short_description: Precio unitario por instancia.
  tag: instancia_glassfish
  unit_label: Instancia Glassfish
  unit_price: 10
public_title: Glassfish
short_description: Monitorizar el estado de tus aplicaciones y servicios Glassfish
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
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Monitorizar el estado de tus aplicaciones y servicios Glassfish
  media:
  - caption: Información general de la aplicación
    image_url: images/applications-overview.png
    media_type: imagen
  - caption: Información general del servicio HTTP
    image_url: images/http-service-overview.png
    media_type: imagen
  - caption: Información general de máquinas virtuales Java, redes y servicios de
      transacción
    image_url: images/jvm-network-ts.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Glassfish
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
GlassFish es la implementación de Eclipse de Jakarta EE (anteriormente la implementación de referencia de Oracle) y admite Jakarta REST, Jakarta CDI, Jakarta Security, Jakarta Persistence, Jakarta Transactions, Jakarta Servlet, Jakarta Faces, Jakarta Messaging, y más. Esto permite a los desarrolladores crear aplicaciones empresariales que son portátiles y escalables, y que se integran con las tecnologías legacy. La integración Glassfish permite a los usuarios monitorizar varios módulos diferentes dentro de Glassfish, como aplicaciones, servicios HTTP, JMS, métricas de máquina virtual Java (JVM), redes y servicios de transacción.


## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][6]
- Ventas: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://docs.oracle.com/cd/E19355-01/820-1072/6ncp48v4e/index.html
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-glassfish" target="_blank">adquiere esta aplicación en el Marketplace</a>.