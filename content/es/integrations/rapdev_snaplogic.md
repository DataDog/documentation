---
algolia:
  subcategory: Integraciones del Marketplace
app_id: rapdev-snaplogic
app_uuid: c3f2e4a6-a17f-4b66-b72d-4be62b648fb8
assets:
  dashboards:
    RapDev SnapLogic Snaplex Dashboard: assets/dashboards/snaplex_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rapdev.snaplogic.snaplex_node.running
      metadata_path: metadata.csv
      prefix: rapdev.snaplogic.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 6643655
    source_type_name: RapDev SnapLogic
  monitors:
    Can't Connect to SnapLogic: assets/monitors/snaplogic_can_connect.json
author:
  homepage: https://www.rapdev.io
  name: RapDev
  sales_email: ddsales@rapdev.io
  support_email: datadog-engineering@rapdev.io
  vendor_id: rapdev
categories:
- marketplace
- herramientas de desarrollo
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: rapdev_snaplogic
integration_id: rapdev-snaplogic
integration_title: SnapLogic
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: rapdev_snaplogic
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.rapdev.snaplogic
  product_id: snaplogic
  short_description: Precio unitario por snaplex
  tag: label_snaplex
  unit_label: SnapLogic Snaplexes
  unit_price: 10
public_title: SnapLogic
short_description: Monitorizar pipelines y snaplexes SnapLogic
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Development Tools
  - Data Type::Metrics
  - Data Type::Logs
  configuration: README.md#Configuración
  description: Monitorizar pipelines y snaplexes SnapLogic
  media:
  - caption: Dashboard de SnapLogic
    image_url: images/dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: SnapLogic
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
SnapLogic es una empresa de software que proporciona herramientas de integración de plataforma como servicio (iPaaS) para conectar fuentes de datos en la nube, aplicaciones SaaS y aplicaciones empresariales on-premises. La integración SnapLogic de RapDev es una integración basada en el check del Agent que consulta la API REST de SnapLogic para recuperar datos de [snaplexes][8] y pipelines como métricas y actividades de la organización como logs.

### Logs
Esta integración sólo recopila logs de actividad de la organización SnapLogic si `collect_activity_logs` está habilitado en el archivo `conf.yaml`. 

## Agent
Para solicitar asistencia o funciones, ponte en contacto con RapDev.io a través de los siguientes canales:

- Soporte: [support@rapdev.io][7]
- Ventas: [sales@rapdev.io][1]
- Chat: [rapdev.io][6]
- Teléfono: 855-857-0222

---
Hecho con ❤️ en Boston

*¿Esta no es la integración que estás buscando? ¿No encuentras una función esencial para tu organización? ¡Envíanos una [nota][7] a RapDev y la crearemos!*

---
[1]: mailto:sales@rapdev.io
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1439028/Creating+a+User
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#agent-information
[6]: https://www.rapdev.io/#Get-in-touch
[7]: mailto:support@rapdev.io
[8]: https://docs-snaplogic.atlassian.net/wiki/spaces/SD/pages/1437953/The+SnapLogic+Snaplex
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/rapdev-snaplogic" target="_blank">adquiere esta aplicación en el Marketplace</a>.