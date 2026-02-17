---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-validator
app_uuid: d66f715a-4218-40f0-af35-a147c45c1d11
assets:
  dashboards:
    RapDev Validator Dashboard: assets/dashboards/rapdev_validator_dashboard.json
    RapDev Validator Host Dashboard: assets/dashboards/host_dashboard.json
    RapDev Validator Synthetic Dashboard: assets/dashboards/synthetic_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.validator.agent.installed
      metadata_path: metadata.csv
      prefix: rapdev.validator.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10183
    source_type_name: RapDev Validator
  logs: {}
  monitors:
    Host has a non-compliant value for their tag key: assets/monitors/host_non_compliant_value.json
    Host is missing their required tag key: assets/monitors/host_missing_tag_key.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- conformidad
- configuración y despliegue
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_validator
integration_id: rapdev-validator
integration_title: Tag Validator
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_validator
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: validator
  short_description: Tarifa plana de esta integración
  unit_price: 500
public_title: Tag Validator
short_description: Valida las etiquetas del monitor y garantiza el cumplimiento del
  Agent en el entorno DD
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Cumplimiento
  - Category::Configuration & Deployment
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Valida las etiquetas del monitor y garantiza el cumplimiento del Agent
    en el entorno DD
  media:
  - caption: Dashboard de Validator
    image_url: images/validator.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Tag Validator
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
El validador de RapDev resuelve el problema de monitorizar el cumplimiento de las etiquetas (tags) y los Agents en tu entorno de Datadog. La integración acepta una lista de claves de etiquetas y sus valores que consideres aceptables en función de la estrategia de etiquetado de tus entornos y, a continuación, los informa como métricas y checks de servicio en tu instancia de Datadog. De esta manera, puedes ver si los hosts de tu entorno tienen aplicadas las etiquetas correctas.

### Dashboards
1. Dashboard del host de RapDev Validator
2. Dashboard Synthetic de RapDev Validator
3. Dashboard de RapDev Validator

### Monitores
1. Al host le falta la clave de etiqueta requerida
2. El host tiene un valor no compatible para la clave de etiqueta

## Ayuda
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Correo electrónico: support@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envíanos una [nota](mailto:support@rapdev.io) y la crearemos.*

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-validator" target="_blank">adquiere esta aplicación en el Marketplace</a>.