---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-gitlab
app_uuid: 629973c5-63ac-4f17-a9c2-5bda5b6677b4
assets:
  dashboards:
    RapDev GitLab Overview: assets/dashboards/RapDevGitLabDashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.gitlab.users
      metadata_path: metadata.csv
      prefix: rapdev.gitlab.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10300
    source_type_name: RapDev GitLab
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- nube
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_gitlab
integration_id: rapdev-gitlab
integration_title: GitLab
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_gitlab
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.gitlab
  product_id: gitlab
  short_description: Precio unitario por proyecto
  tag: nombre_proyecto
  unit_label: Proyecto GitLab
  unit_price: 1
public_title: GitLab
short_description: Monitoriza tus proyectos, aplicaciones e instancias GitLab.
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
  - Categoría::Marketplace
  - Categoría::Nube
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitoriza tus proyectos, aplicaciones e instancias GitLab.
  media:
  - caption: Métricas generales del estado de la API GitLab, de proyectos y de Sidekiq
    image_url: images/RapDevGitLab_DB1.jpg
    media_type: imagen
  - caption: Métricas de todas y cada una de las instancias
    image_url: images/RapDevGitLab_DB2.jpg
    media_type: imagen
  - caption: Métricas de ejecutores y de problemas específicos
    image_url: images/RapDevGitLab_DB3.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: GitLab
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
GitLab es un paquete de software DevOps que combina la capacidad de desarrollo, protección y operación de software en una única aplicación. Esta integración recopila e informa de las siguientes métricas de GitLab a través de diferentes endpoints de la API GitLab:
+ Métricas de proyecto
+ Estadísticas de Sidekiq
+ Métricas de instancia
+ Ejecutores instalados
+ Incidentes pendientes y totales

### Dashboards
Esta integración proporciona un dashboard predefinido llamado **Dashboard RapDev GitLab** que muestra los datos enviados a Datadog a lo largo del tiempo e incluye variables de entorno para delimitar aún más la búsqueda de un proyecto o host específico.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una
[nota][2] a RapDev y la crearemos.*

[1]: https://docs.datadoghq.com/es/getting_started/agent/
[2]: mailto:support@rapdev.io

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-gitlab" target="_blank">adquiere esta aplicación en el Marketplace</a>.