---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-commvault
app_uuid: 2d6e8413-e850-4eff-a139-170946be2ffc
assets:
  dashboards:
    Rapdev Commvault Overview: assets/dashboards/rapdev_commvault_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: datadog.marketplace.rapdev.commvault
      metadata_path: metadata.csv
      prefix: rapdev.commvault
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10438
    source_type_name: Rapdev Commvault
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- nube
- marketplace
- conformidad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_commvault
integration_id: rapdev-commvault
integration_title: Commvault
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_commvault
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.commvault
  product_id: commvault
  short_description: Cuota mensual por Terrabyte
  tag: recuento_terrabyte
  unit_label: Terrabyte
  unit_price: 10.0
public_title: Commvault
short_description: Monitorizar tus trabajos, estados de librerías, alertas y eventos
  Commvault
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Nube
  - Categoría::Marketplace
  - Categoría::Cumplimiento
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Eventos
  configuration: README.md#Configuración
  description: Monitorizar tus trabajos, estados de librerías, alertas y eventos
    Commvault
  media:
  - caption: Dashboard de información general de Commvault
    image_url: images/full_view.png
    media_type: imagen
  - caption: Dashboard de información general de Commvault - Sección de información
      general del entorno 1 de 5
    image_url: images/overview.png
    media_type: imagen
  - caption: Dashboard de información general de Commvault - Sección de información
      general del entorno 2 de 5
    image_url: images/alerts_and_events.png
    media_type: imagen
  - caption: Dashboard de información general de Commvault - Sección de información
      general del entorno 3 de 5
    image_url: images/jobs.png
    media_type: imagen
  - caption: Dashboard de información general de Commvault - Sección de información
      general del entorno 4 de 5
    image_url: images/libraries.png
    media_type: imagen
  - caption: Dashboard de información general de Commvault - Sección de información
      general del entorno 5 de 5
    image_url: images/storage_pools.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Commvault
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Commvault simplifica la protección de datos, la recuperación cibernética y la resiliencia cibernética al realizar copias de seguridad de tus datos de diversas fuentes, incluyendo bases de datos, máquinas virtuales, aplicaciones y mucho más.

La integración Rapdev Commvault te ofrece información en tiempo real de tu entorno de copias de seguridad. Esta integración te permite realizar un seguimiento de varias métricas relacionadas con trabajos en curso, bibliotecas de almacenamiento, alertas de consola y eventos.

- Al extraer datos detallados sobre las alertas, te mantiene al tanto de la naturaleza, la antigüedad y el recuento total de alertas, lo que te permite responder rápidamente a cualquier problema.
- El aspecto de la monitorización de trabajos captura información crucial sobre cada trabajo de copia de seguridad, incluyendo el tamaño de los datos en bytes y la duración del trabajo, lo que permite optimizar el rendimiento y analizar las tendencias.
- La monitorización de la librería de almacenamiento te ofrece una visión granular de tu entorno de almacenamiento, con datos específicos sobre cada biblioteca, bytes disponibles, datos de los que se han hecho copias de seguridad en la última hora, capacidad total, espacio libre y hora de la última copia de seguridad.

La integración Rapdev Commvault extrae datos desde tu Command Center hacia tu cuenta de Datadog, lo que te permite aprovechar las visualizaciones mejoradas de dashboard, la monitorización y las capacidades de alerta en Datadog.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: [support@rapdev.io][4]
- Ventas: [sales@rapdev.io][5]
- Chat: [rapdev.io][6]
- Teléfono: 855-857-0222

[1]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[2]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/?tab=agentv6v7
[3]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[4]: mailto:support@rapdev.io
[5]: mailto:sales@rapdev.io
[6]: https://www.rapdev.io/#Get-in-touch
[7]: https://documentation.commvault.com/v11/essential/4237_web_console.html

---
Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-commvault" target="_blank">adquiere esta aplicación en el Marketplace</a>.
