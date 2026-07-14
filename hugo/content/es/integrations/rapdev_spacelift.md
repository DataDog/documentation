---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-spacelift
app_uuid: 6d7f8c87-ddef-4210-ba7c-7509ff92cf50
assets:
  dashboards:
    RapDev Spacelift Dashboard: assets/dashboards/rapdev_spacelift_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.spacelift.usage.used_seats
      metadata_path: metadata.csv
      prefix: rapdev.spacelift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10382
    source_type_name: RapDev Spacelift
  monitors:
    Spacelift Stack Run Failed: assets/monitors/spacelift_stack_run_failed.json
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
git_integration_title: rapdev_spacelift
integration_id: rapdev-spacelift
integration_title: Spacelift
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_spacelift
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: spacelift
  short_description: Tarifa plana para esta integración
  unit_price: 100
public_title: Spacelift
short_description: Monitorizar stacks tecnológicos, ejecuciones, grupos de Workers
  y el uso de Spacelift
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
  configuration: README.md#Configuración
  description: Monitorizar stacks tecnológicos, ejecuciones, grupos de Workers y el
    uso de Spacelift
  media:
  - caption: Dashboard de Spacelift - Stacks tecnológicos
    image_url: images/dashboard1.png
    media_type: imagen
  - caption: Dashboard de Spacelift - Ejecuciones de stacks tecnológicos
    image_url: images/dashboard2.png
    media_type: imagen
  - caption: Dashboard de Spacelift - Grupos de Workers y uso
    image_url: images/dashboard3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Spacelift
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Spacelift es una plataforma CI/CD que automatiza la infraestructura en forma de flujos de trabajo de código, proporcionando una gestión de los estados, entornos de vista previa y checks de cumplimiento. La integración Spacelift permite a las organizaciones monitorizar activamente sus cuentas de Spacelift para realizar un seguimiento de sus stacks tecnológicos, ejecuciones, grupos de Workers y datos de facturación mediante el envío de métricas relevantes para el bloqueo de stacks tecnológicos, los estados de ejecución de stacks tecnológicos, los estados de grupos de Workers y el consumo de licencias.

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: support@rapdev.io
- Ventas: sales@rapdev.io
- Chat: [rapdev.io][5]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][6] a RapDev y la crearemos!*

[1]: https://docs.spacelift.io/integrations/api#spacelift-api-key-token
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[5]: https://www.rapdev.io/#Get-in-touch
[6]: mailto:support@rapdev.io
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-spacelift" target="_blank">adquiere esta aplicación en el Marketplace</a>.