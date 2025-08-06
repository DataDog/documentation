---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-github
app_uuid: 37a265a0-fb4a-463b-aaea-653f5d950c2c
assets:
  dashboards:
    RapDev GitHub Overview: assets/dashboards/RapDevGitHubDashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.github.users.count
      metadata_path: metadata.csv
      prefix: rapdev.github.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10289
    source_type_name: RapDev GitHub
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- nube
- colaboración
- marketplace
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_github
integration_id: rapdev-github
integration_title: GitHub
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_github
pricing:
- billing_type: recuento_etiquetas
  includes_assets: true
  metric: datadog.marketplace.rapdev.github
  product_id: github
  short_description: Precio unitario por repositorio
  tag: nombre_repositorio
  unit_label: Repositorio GitHub
  unit_price: 1
public_title: GitHub
short_description: Monitorizar tus organizaciones o empresas de GitHub
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Categoría::Colaboración
  - Categoría::Marketplace
  - Categoría::Métricas
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Monitorizar tus organizaciones o empresas GitHub
  media:
  - caption: Métricas generales de una organización o empresa GitHub
    image_url: images/RapDevGitHub_DB1.jpg
    media_type: imagen
  - caption: Métricas de todos y cada uno de los ejecutores
    image_url: images/RapDevGitHub_DB2.jpg
    media_type: imagen
  - caption: Métricas de repositorios específicos
    image_url: images/RapDevGitHub_DB3.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: GitHub
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
Esta integración recopila e informa de métricas GitHub a Datadog a través de
diferentes endpoints de la API GitHub. Se envían las siguientes variedades
de métricas:
+ Estadísticas de organización/empresa
+ Métricas de repositorio
+ Ejecutores autoalojados e instalados
+ Monitorización de flujos de trabajo de GitHub

### Dashboards
Esta integración proporciona un dashboard predefinido llamado
**Dashboard RapDev GitHub**.
Este dashboard se rellena a medida que se envían datos a Datadog a lo largo del tiempo e incluye
variables de entorno para limitar aún más la búsqueda
de un repositorio o autor específico.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:
- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston
*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-github" target="_blank">adquiere esta aplicación en el Marketplace</a>.