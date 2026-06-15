---
algolia:
  subcategory: Integraciones de Marketplace
app_id: avmconsulting-workday
app_uuid: 72aa287e-21c7-473a-9efd-523d9687f7f1
assets:
  dashboards:
    AVM Consulting Workday Integrations Trends: assets/dashboards/workday_integrations_trends.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: avmconsulting.workday.total_jobs
      metadata_path: metadata.csv
      prefix: avmconsulting.workday.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10251
    source_type_name: AVM Consulting Workday
  monitors:
    AVM Consulting Workday Connection Status: assets/monitors/workday_connect.json
    AVM Consulting Workday Integration Status: assets/monitors/workday_integrations_monitor.json
author:
  homepage: https://avmconsulting.net/
  name: AVMConsulting
  sales_email: integrations@avmconsulting.net
  support_email: integrations@avmconsulting.net
  vendor_id: avmconsulting
categories:
- recopilación de logs
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: avmconsulting_workday
integration_id: avmconsulting-workday
integration_title: Workday
integration_version: ''
is_public: true
legal_terms:
  eula: assets/eula.pdf
manifest_version: 2.0.0
name: avmconsulting_workday
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.avmconsulting.workday
  product_id: workday
  short_description: Precios de Workday por trabajo
  tag: job_id
  unit_label: Trabajo de Workday
  unit_price: 1
public_title: Workday
short_description: Proporciona observabilidad del estado de las integraciones de Workday
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Marketplace
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Proporciona observabilidad del estado de las integraciones de Workday
  media:
  - caption: Resumen de integraciones de Workday
    image_url: images/Workday_integration_trends.png
    media_type: imagen
  - caption: Resumen de integraciones de Workday
    image_url: images/Workday_integration_trends_2.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Workday
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Esta integración de Workday monitoriza el estado de tus integraciones en Workday y ofrece métricas detalladas sobre las ejecuciones de trabajos, incluidas las ejecuciones totales de trabajos, las ejecuciones de trabajos fallidas y la duración de cada ejecución de trabajo. Esta integración también recupera logs de ejecución de trabajos y proporciona monitores que alertan sobre el estado de cada integración.

### Monitores

Esta integración incluye los siguientes monitores recomendados:

1. Connect to Workday, que monitoriza tu conexión a Workday.
2. Workday Integration Status, un monitor múltiple que está agrupado por integraciones y verifica el estado del último evento de integración de Workday.

### Dashboards

Esta integración incluye un dashboard listo para usar llamado **Workday Integrations Trends** que proporciona un resumen visual de las ejecuciones de trabajos de Workday, así como el estado de los monitores configurados para cada integración de Workday.

### Colección de logs

Esta integración utiliza la API de Workday para recopilar logs para ejecuciones de integración y enviar esos logs a Datadog a través de la API REST de Datadog. Las etiquetas (tags) relacionadas con la ejecución se asignan dinámicamente a esos logs.

## Agent

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con AVM Consulting a través de los siguientes canales:

 - Correo electrónico: [integrations@avmconsulting.net][6]
 - Teléfono: 855-AVM-0555

### Leer más

Más enlaces, artículos y documentación útiles:

- [Monitorizar Workday con la integración de AVM Consulting en el Marketplace de Datadog][5]

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/developers/guide/custom-python-package/?tab=linux
[5]: https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/
[6]: mailto:integrations@avmconsulting.net

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/avmconsulting-workday" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.