---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-backup
app_uuid: f0a2c15e-9c53-4645-aedc-5a28af130308
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: rapdev.backup
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10194
    source_type_name: Copia de seguridad RapDev
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: support@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_backup
integration_id: rapdev-backup
integration_title: Automatizador de copias de seguridad
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_backup
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: copia de seguridad
  short_description: Tarifa plana para integraciones
  unit_price: 500
public_title: Automatizador de copias de seguridad
short_description: Copias de seguridad de tus dashboards, Synthetics, monitores y
  notebooks de Datadog
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
  configuration: README.md#Configuración
  description: Copias de seguridad de tus dashboards, Synthetics, monitores y notebooks
    de Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Automatizador de copias de seguridad
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

El propósito de este check del Agent es crear una copia de seguridad comprimida para los dashboards, tests Synthetic, monitores y notebooks
de una cuenta de Datadog,. Esa copia de seguridad se puede almacenar en un equipo local o en otra plataforma compatible
(como AWS, Azure y GitHub).

## Datos recopilados

### Métricas

Esta integración no incluye métricas.

### Checks de servicios

Esta integración tiene el check de servicio `rapdev.backup.can_connect` que devuelve `OK` si el Agent puede comunicarse con la API Datadog, de lo contrario informa `CRITICAL`. 

### Eventos

Esta integración no incluye eventos.

## Ayuda
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io](https://www.rapdev.io/#Get-in-touch)
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿Falta una función esencial para tu organización? Envía una [nota](mailto:support@rapdev.io) a RapDev y la crearemos.*

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[4]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[5]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_permissions-to-switch.html
[6]: https://docs.datadoghq.com/es/agent/guide/agent-v6-python-3/?tab=hostagent
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_switch-role-ec2_instance-profiles.html
[8]: https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
[9]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html
[10]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-backup" target="_blank">adquiere esta aplicación en el Marketplace</a>.