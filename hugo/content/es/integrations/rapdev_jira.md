---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-jira
app_uuid: 745eddf9-460c-4189-a7d1-00c297371519
assets:
  dashboards:
    RapDev Jira Overview Dashboard: assets/dashboards/rapdev_jira_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.jira.user.count
      metadata_path: metadata.csv
      prefix: rapdev.jira
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10428
    source_type_name: RapDev Jira
  logs: {}
  monitors:
    Jira Integration Unable to Run: assets/monitors/jira_api.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- herramientas de desarrollo
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_jira
integration_id: rapdev-jira
integration_title: Jira
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_jira
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: jira
  short_description: Tarifa plana para esta integración
  unit_price: 100
public_title: Jira
short_description: Monitoriza incidentes y usuarios de Jira Cloud.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas de desarrollo
  - Categoría::Marketplace
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitoriza incidentes y usuarios de Jira Cloud.
  media:
  - caption: Dashboard de información general
    image_url: images/overview_sample_tvmode.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Jira
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Jira es un servicio basado en la nube o autoalojado que te permite planificar, realizar un seguimiento y gestionar tus proyectos de software. Es un producto de Atlassian, una empresa que proporciona herramientas para que los equipos colaboren y ofrezcan grandes productos. Jira Software es compatible con equipos Agile que utilizan Scrum, Kanban y DevOps.

La integración Jira permite a las organizaciones monitorizar el estado general de sus sistemas mediante informes de resumen, flujos de trabajo y métricas de incidentes. La integración es compatible con Jira Cloud alojado en Atlassian, Jira Data Center autoalojado (9.x.x) y Jira Server legacy (7.6.1 o posterior, 8.x.x, 9.x.x).

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][6]
- Ventas: [sales@rapdev.io][7]
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://confluence.atlassian.com/adminjiraserver/create-edit-or-remove-a-user-938847025.html
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
[7]: mailto:sales@rapdev.io

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-jira" target="_blank">adquiere esta aplicación en el Marketplace</a>.