---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-intel-one-api
app_uuid: f1e37e32-2d31-4f46-8633-e7e6958c909c
assets:
  dashboards:
    CDS Intel oneAPI: assets/dashboards/cds_intel_oneapi.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.intel.one.api.Hotspots_by_CPU_Utilization.Elapsed_Time
      metadata_path: metadata.csv
      prefix: cds.intel.one.api.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28998791
    source_type_name: crest_data_systems_intel_one_api
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- herramientas para desarrolladores
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_intel_one_api
integration_id: crest-data-systems-intel-one-api
integration_title: Intel oneAPI
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_intel_one_api
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: intel-one-api
  short_description: Tarifa plana mensual para la integración Intel oneAPI.
  unit_price: 295.0
public_title: Intel oneAPI
short_description: Recopila y visualiza métricas en informes generados con el generador
  de perfiles vtune de Intel OneAPI.
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Developer Tools
  - Categoría::Marketplace
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Recopila y visualiza métricas en informes generados con el generador
    de perfiles vtune de Intel OneAPI.
  media:
  - caption: CDS Intel oneAPI
    image_url: images/cds_intel_oneapi.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Intel oneAPI
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

**Intel oneAPI** es un modelo de programación unificado diseñado para simplificar el desarrollo en diferentes arquitecturas. El **Generador de perfiles VTune Intel**, un componente de oneAPI, es una herramienta de creación de perfiles que ayuda a los desarrolladores a optimizar sus aplicaciones.

Esta integración recopila y visualiza métricas de informes de VTune, lo que te permite monitorizar y analizar el rendimiento de tu aplicación directamente en Datadog.

### Funciones

- Recopila métricas de diversos tipos de análisis VTune, incluyendo:
  - **Snapshot de rendimiento**
  - **Análisis de zonas sensibles**
  - **Análisis de acceso a la memoria**
  - **Análisis de subprocesos**
  - **Información general del sistema**
  - **Caracterización del rendimiento HPC**
- Extrae métricas importantes de los informes de VTune para su visualización en Datadog.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][3]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][4]
- Página web: [crestdata.ai][5]
- Preguntas frecuentes: [Preguntas frecuentes sobre integraciones Crest Data del Marketplace Datadog][6]


[1]: https://docs.datadoghq.com/es/agent/
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: mailto:datadog.integrations@crestdata.ai
[4]: mailto:datadog-sales@crestdata.ai
[5]: https://www.crestdata.ai
[6]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[7]: https://docs.crestdata.ai/datadog-integrations-readme/Intel_oneAPI.pdf
[8]: https://visualstudio.microsoft.com/downloads/
[9]: https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist

---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-intel-one-api" target="_blank">adquiere esta aplicación en el Marketplace</a>.