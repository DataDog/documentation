---
algolia:
  subcategory: Integraciones de Marketplace
app_id: rapdev-terraform
app_uuid: d7240832-9c24-4fc0-9a02-916bc57882c1
assets:
  dashboards:
    RapDev Terraform Dashboard: assets/dashboards/rapdev_terraform_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.terraform.org.count
      metadata_path: metadata.csv
      prefix: rapdev.terraform.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10193
    source_type_name: RapDev Terraform
  logs: {}
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- configuración y despliegue
- herramientas de desarrollo
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_terraform
integration_id: rapdev-terraform
integration_title: Terraform
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_terraform
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: terraform
  short_description: Tarifa plana para esta integración
  unit_price: 100
public_title: Terraform
short_description: Monitoriza tu cuenta de Terraform y las ejecuciones fallidas
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Developer Tools
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Monitoriza tu cuenta de Terraform y las ejecuciones fallidas
  media:
  - caption: Ejecuciones de espacio de trabajo y organización de Terraform
    image_url: images/1.jpg
    media_type: imagen
  - caption: Permisos y tokens de organización de Terraform
    image_url: images/2.jpg
    media_type: imagen
  - caption: Agents y auditorías de permisos de Terraform
    image_url: images/3.jpg
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Terraform
  uninstallation: README.md#Desinstalación
---

<!--  FUENTE https://github.com/DataDog/marketplace -->


## Información general

La integración de Terraform permite a las organizaciones monitorizar de manera activa sus cuentas de Terraform para comprender mejor su funcionamiento y la frecuencia con la que se usan. Incluso, la integración puede proporcionar una auditoría de permisos. 

### Dashboards

1. Dashboard de RapDev Terraform

## Soporte
Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://www.terraform.io/docs/cloud/users-teams-organizations/users.html#api-tokens
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-terraform" target="_blank">adquiere esta aplicación en el Marketplace</a>.