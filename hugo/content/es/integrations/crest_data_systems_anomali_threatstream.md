---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-anomali-threatstream
app_uuid: 40102d95-f0e5-4028-855d-2a6218913a86
assets:
  dashboards:
    Anomali ThreatStream - Incidents: assets/dashboards/crest_data_systems_anomali_threatstream_incidents.json
    Anomali ThreatStream - Observables: assets/dashboards/crest_data_systems_anomali_threatstream_observables.json
    Anomali ThreatStream - Overview: assets/dashboards/crest_data_systems_anomali_threatstream_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.anomali.threatstream.observables.confidence
      metadata_path: metadata.csv
      prefix: cds.anomali.threatstream
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10375
    source_type_name: crest_data_systems_anomali_threatstream
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- almacenes de datos
- events
- gestión de eventos
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_anomali_threatstream
integration_id: crest-data-systems-anomali-threatstream
integration_title: Anomali ThreatStream
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_anomali_threatstream
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: anomali-threatstream
  short_description: Tarifa plana mensual para la integración de Anomali ThreatStream.
  unit_price: 495.0
public_title: Anomali ThreatStream
short_description: Monitorización de eventos de Anomali ThreatStream Observables e
  Incident ThreatModel
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
  - Category::Data Stores
  - Category::Alerting
  - Category::Event Management
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Events
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitorización de eventos de Anomali ThreatStream Observables e Incident
    ThreatModel
  media:
  - caption: 'Anomali ThreatStream: información general'
    image_url: images/crest_data_systems_anomali_threatstream_overview.png
    media_type: imagen
  - caption: Anomali ThreatStream - Observables - 1
    image_url: images/crest_data_systems_anomali_threatstream_observables_1.png
    media_type: imagen
  - caption: Anomali ThreatStream - Observables - 2
    image_url: images/crest_data_systems_anomali_threatstream_observables_2.png
    media_type: imagen
  - caption: Anomali ThreatStream - Incidents
    image_url: images/crest_data_systems_anomali_threatstream_incidents.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Anomali ThreatStream
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general

La gestión de inteligencia sobre amenazas de Anomali ThreatStream automatiza la recopilación y el procesamiento de datos sin formato, filtra el ruido y los transforma en inteligencia sobre amenazas relevante y procesable para los equipos de seguridad.

Anomali ThreatStream es compatible con múltiples modelos de amenazas, incluyendo Actors, Vulnerabilities, Attack Patterns, Malware, Incidents y más. El modelado de amenazas es un proceso mediante el cual se pueden identificar, enumerar y priorizar las contramedidas contra amenazas potenciales, como vulnerabilidades estructurales o la ausencia de salvaguardas adecuadas.

Anomali ThreatStream también tiene soporte para la generación de Observables en el entorno. Un observable es una pieza de información técnica que puede detectar una amenaza potencial. Se derivan de todos los datos contenidos en el sistema de inteligencia (Anomali ThreatStream), pero no siempre están contextualizados.

Esta integración monitoriza `Observables` desencadenados en Anomali ThreatStream, así como eventos generados para el modelo de amenazas `Incident`.

## Agent

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][5]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][6]
- Página web: [crestdata.ai][3]
- FAQ: [Crest Data Datadog Marketplace Integrations FAQ][10]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[5]: mailto:datadog.integrations@crestdata.ai
[6]: mailto:datadog-sales@crestdata.ai
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Anomali_Threatstream.pdf
[8]: https://docs.datadoghq.com/es/agent/?tab=Linux
[9]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[10]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-anomali-threatstream" target="_blank">adquiere esta aplicación en el Marketplace</a>.