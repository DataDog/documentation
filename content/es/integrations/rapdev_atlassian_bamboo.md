---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-atlassian-bamboo
app_uuid: 8368c74f-4620-490f-aba2-f4eb296adb72
assets:
  dashboards:
    Rapdev - Atlassian Bamboo: assets/dashboards/rapdev_atlassian_bamboo.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.atlassian_bamboo.status
      metadata_path: metadata.csv
      prefix: rapdev.atlassian_bamboo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 13192871
    source_type_name: rapdev_atlassian_bamboo
  logs: {}
  monitors:
    Cannot connect to Atlassian Bamboo: assets/monitors/monitor.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- colaboración
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_atlassian_bamboo
integration_id: rapdev-atlassian-bamboo
integration_title: Atlassian Bamboo
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_atlassian_bamboo
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.atlassian_bamboo
  product_id: bamboo
  short_description: Precio unitario por entidad facturable de Atlassian Bamboo
  tag: entidad_facturable
  unit_label: Bamboo Project
  unit_price: 1
public_title: Atlassian Bamboo
short_description: Monitor Atlassian Bamboo falló al crear métricas en proyectos,
  planes y ramas
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Colaboración
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitor Atlassian Bamboo falló al crear métricas en proyectos, planes
    y ramas
  media:
  - caption: Información general de Bamboo
    image_url: images/image1.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Atlassian Bamboo
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Atlassian Bamboo es un servidor de integración continua y despliegue continuo (CI/CD) que automatiza el proceso de creación, prueba y despliegue de proyectos de software. Esta integración recopila datos de tu instancia Bamboo para reunir información sobre la compilación, el Agent remoto y las estadísticas generales de Bamboo.

Con esta integración puedes conocer el estado operativo y la eficiencia de tu Agent remoto, el estado de ejecución de las compilaciones y el estado general de la instancia de Bamboo. 


## Soporte

Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222
- [Documentación de Atlassian Bamboo][1]

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://confluence.atlassian.com/bamboo/bamboo-documentation-289276551.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[4]: https://github.com/DataDog/integrations-core/blob/master/rapdev_atlassian_bamboo/datadog_checks/atlassian_bamboo/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://confluence.atlassian.com/bamboo/personal-access-tokens-976779873.html
[9]: https://docs.datadoghq.com/es/help/

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-atlassian-bamboo" target="_blank">adquiere esta aplicación en el Marketplace</a>.