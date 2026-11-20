---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-cofense-triage
app_uuid: 186de352-c901-4479-aa8b-429e99210856
assets:
  dashboards:
    Cofense Triage - Executive Summary: assets/dashboards/crest_data_systems_cofense_triage_executive_summary.json
    Cofense Triage - Overview: assets/dashboards/crest_data_systems_cofense_triage_overview.json
    Cofense Triage - Reporting Output: assets/dashboards/crest_data_systems_cofense_triage_reporting_output.json
    Cofense Triage - System Status: assets/dashboards/crest_data_systems_cofense_triage_system_status.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.cofense_triage.health.cpu_usage_percent
      metadata_path: metadata.csv
      prefix: cds.cofense_triage
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 33375357
    source_type_name: crest_data_systems_cofense_triage
  logs:
    source: crest-data-systems-cofense-triage
  monitors:
    Cofense Triage - CPU Usage Monitor: assets/monitors/crest_data_systems_cofense_triage_cpu_usage_monitor.json
    Cofense Triage - Free Memory Available: assets/monitors/crest_data_systems_cofense_triage_memory_available.json
    Cofense Triage - Partition Usage Monitor: assets/monitors/crest_data_systems_cofense_triage_partition_usage_monitor.json
    Cofense Triage - System Status Monitor: assets/monitors/crest_data_systems_cofense_triage_system_status.json
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- seguridad
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_cofense_triage
integration_id: crest-data-systems-cofense-triage
integration_title: Cofense Triage
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_cofense_triage
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.crest_data_systems.cofense_triage
  product_id: cofense-triage
  short_description: Por host de Cofense Triage
  tag: cds_cofense_triage_host
  unit_label: Hosts de Cofense Triage
  unit_price: 95.0
public_title: Cofense Triage
short_description: Monitorizar incidentes de phishing de Cofense Triage en Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Marketplace
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Monitorizar incidentes de phishing de Cofense Triage en Datadog
  media:
  - caption: 'Cofense Triage: información general'
    image_url: images/crest-data-systems-cofense-triage-overview.png
    media_type: imagen
  - caption: 'Cofense Triage: estado del sistema'
    image_url: images/crest-data-systems-cofense-triage-system-status.png
    media_type: imagen
  - caption: 'Cofense Triage: resumen ejecutivo'
    image_url: images/crest-data-systems-cofense-triage-executive-summary.png
    media_type: imagen
  - caption: 'Cofense Triage: generación de informes'
    image_url: images/crest-data-systems-cofense-triage-reporting-output.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Cofense Triage
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

Cofense Triage es una plataforma de gestión de amenazas de phishing que automatiza la detección, el análisis y la respuesta a correos electrónicos de phishing aprovechando los datos notificados por los usuarios. Esta integración mejora los flujos de trabajo de seguridad al proporcionar visibilidad en tiempo real de los incidentes de phishing identificados por Cofense Triage directamente en Datadog para ofrecer respuestas más rápidas y coordinadas.

Esta integración recopila lo siguiente:

### Métricas

- Estado
- Resumen ejecutivo

### Logs

- Informes
- Indicadores de amenaza
- Urls
- Dominios
- Archivos adjuntos
- Cargas útiles de adjuntos
- Clústeres
- Encabezados
- Nombres de host
- Cuadernos de estrategias
- Reglas
- Categorías
- Comentarios
- Proveedores de identidad
- Integraciones
- Generación de informes dinámicos

### Eventos

- Autenticación
- Validación de la configuración


### Dashboards

Esta integración incluye los siguientes dashboards predefinidos:

1. **Estado**: proporciona información sobre el estado del sistema, incluido el uso de la CPU y de la partición del servidor de Cofense Triage.
2. **Resumen ejecutivo**: ofrece un resumen de los datos de informes de Cofense Triage.
3. **Generación de informes**: muestra una generación de informes detallada, que incluye los informes y sus datos correspondientes.
4. **Información general**: incluye detalles seleccionados de los dashboards mencionados.

## Asistencia

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][1]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][2]
- Página web: [crestdata.ai][3]
- FAQ: [FAQ sobre integraciones Crest Data de Datadog Marketplace][10]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: mailto:datadog.integrations@crestdata.ai
[2]: mailto:datadog-sales@crestdata.ai
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/help/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys
[10]: https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[11]: https://www.crestdatasys.com/datadog-integrations-readme/Cofense_Triage.pdf
---
Esta aplicación está disponible a través  de Datadog Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizar esta aplicación, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cofense-triage" target="_blank">adquiérela en el Marketplace</a>.