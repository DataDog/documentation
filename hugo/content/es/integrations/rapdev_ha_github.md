---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-ha-github
app_uuid: c4bdf039-4223-4505-80dc-d2564dbc8368
assets:
  dashboards:
    RapDev GitHub Hosted Agent Issues: assets/dashboards/github_issues_dashboard.json
    RapDev GitHub Hosted Agent Overview: assets/dashboards/github_overview_dashboard.json
    RapDev GitHub Hosted Agent Pull Request: assets/dashboards/github_pull_requests_dashboard.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: rapdev.hosted_agent.github.repository
      metadata_path: metadata.csv
      prefix: rapdev.hosted_agent.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 82741
    source_type_name: RapDev HA GitHub
  monitors:
    GitHub Issue for Repository is Stale: assets/monitors/github_issue_is_stale_repo.json
    GitHub Issue is Stale: assets/monitors/github_issue_is_stale_org.json
    GitHub Pull Request Has Not Been Updated: assets/monitors/github_pr_is_stale_org.json
    GitHub Pull Request for Repository Has Not Been Updated: assets/monitors/github_pr_is_stale_repo.json
  oauth: assets/oauth_clients.json
author:
  contact_link: https://meetings.hubspot.com/ewilliams/rapdev-marketplace
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- nube
- colaboración
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_ha_github
integration_id: rapdev-ha-github
integration_title: Hosted Agent GitHub
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_ha_github
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.hosted_agent.github
  product_id: rapdev-ha-github
  short_description: Precio unitario por repositorio
  tag: repo_id
  unit_label: Repositorio GitHub
  unit_price: 1
public_title: Hosted Agent GitHub
short_description: Monitorizar tus repositorios GitHub utilizando el Rapdev Hosted
  Agent
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
  - Categoría::Marketplace
  - Categoría::Nube
  - Categoría::Colaboración
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar tus repositorios GitHub utilizando el Rapdev Hosted Agent
  media:
  - caption: Información general de GitHub 1
    image_url: images/github_overview_dashboard_1.jpg
    media_type: imagen
  - caption: Información general de GitHub 2
    image_url: images/github_overview_dashboard_2.jpg
    media_type: imagen
  - caption: Solicitud pull GitHub 1
    image_url: images/github_pull_request_dashboard_1.jpg
    media_type: imagen
  - caption: Solicitud pull GitHub 2
    image_url: images/github_pull_request_dashboard_2.jpg
    media_type: imagen
  - caption: Problemas de GitHub 1
    image_url: images/github_issues_dashboard_1.jpg
    media_type: imagen
  - caption: Problemas de GitHub 2
    image_url: images/github_issues_dashboard_2.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Hosted Agent GitHub
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

El Hosted Agent para GitHub proporciona información sobre la actividad de desarrollo en los repositorios. GitHub es la plataforma líder mundial en desarrollo de software, colaboración y seguridad. Identifica problemas como repositorios obsoletos, solicitudes pull o problemas y alinea la actividad de fusión con creadores, fusiones y asignatarios. 

El Hosted Agent permite una instalación y una configuración más simple de la [integración RapDev GitHub del Marketplace][4] existente. Aprovechando las capacidades OAuth del Marketplace de Datadog, el Hosted Agent ofrece un proceso guiado de instalación de GitHub App con el portal RapDev Connection Manager y es compatible con múltiples organizaciones y usuarios de GitHub para proporcionar una capacidad de observación unificada en Datadog.

La integración Hosted Agent para GitHub incluye dashboards y monitores de Datadog recomendados para ayudarte a proporcionar una capacidad de observación inmediata de las actividades de tu repositorio GitHub.

## Soporte
Para solicitar asistencia o funciones, ponte en contacto con RapDev a través de los siguientes canales:

- Soporte: [support@rapdev.io][1]
- Ventas: [sales@rapdev.io][3]
- Chat: [rapdev.io][2]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][1] a RapDev y la crearemos!*

[1]: mailto:support@rapdev.io
[2]: https://www.rapdev.io/#Get-in-touch
[3]: mailto:sales@rapdev.io
[4]: https://app.datadoghq.com/marketplace/app/rapdev-github/overview
[5]: https://app.datadoghq.com/organization-settings/api-keys

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-ha-github" target="_blank">adquiere esta aplicación en el Marketplace</a>.