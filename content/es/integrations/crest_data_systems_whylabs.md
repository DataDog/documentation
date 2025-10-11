---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-whylabs
app_uuid: a53f983e-7d18-4e25-98d9-35cb3ce7c181
assets:
  dashboards:
    WhyLabs - Datasets: assets/dashboards/crest_data_systems_whylabs_datasets.json
    WhyLabs - Models: assets/dashboards/crest_data_systems_whylabs_models.json
    WhyLabs Overview: assets/dashboards/crest_data_systems_whylabs_overview.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: cds.whylabs.dataset_metric.classification_prediction_count
      metadata_path: metadata.csv
      prefix: cds.whylabs.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39158566
    source_type_name: crest_data_systems_whylabs
  logs:
    source: crest-data-systems-whylabs
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- recopilación de logs
- ai/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_whylabs
integration_id: crest-data-systems-whylabs
integration_title: WhyLabs
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_whylabs
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: whylabs
  short_description: Cuota fija mensual.
  unit_price: 50.0
public_title: WhyLabs
short_description: Recopilación de datos de recursos, incluidos fuentes de anomalías,
  entradas/salidas, columnas, segmentos y métricas de rendimiento del modelo.
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
  - Category::Log Collection
  - Categoría::IA/ML
  - Offering::Integration
  - Submitted Data Type::Logs
  - Tipo de datos enviados::Métricas
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Recopilación de datos de recursos, incluidos fuentes de anomalías,
    entradas/salidas, columnas, segmentos y métricas de rendimiento del modelo.
  media:
  - caption: Información general de WhyLabs
    image_url: images/crest_data_systems_whylabs_overview.png
    media_type: imagen
  - caption: WhyLabs - Modelos
    image_url: images/crest_data_systems_whylabs_models.png
    media_type: imagen
  - caption: WhyLabs - Conjuntos de datos
    image_url: images/crest_data_systems_whylabs_datasets.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: WhyLabs
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->


## Información general
[**WhyLabs**][1] es una plataforma creada para ayudar a organizaciones a monitorizar, gestionar y optimizar aplicaciones de inteligencia artificial (IA). Proporciona un conjunto de herramientas para garantizar que los modelos de aprendizaje automático (ML) sigan siendo fiables, transparentes y justos durante todo su ciclo de vida. La plataforma aprovecha la monitorización y las técnicas de observabilidad para rastrear el rendimiento del modelo, identificar problemas como la desviación de datos o anomalías y ayudar a los equipos a mantener predicciones de alta calidad.

Esta integración ingiere datos de WhyLabs como logs, métricas y eventos en Datadog:

### Métricas
  - Rendimiento de la clasificación
  - Rendimiento de la regresión

### Logs
  - Recursos
  - Esquema de entidad
  - Anomalías
  - Segmentos

### Eventos
La configuración de la integración de Datadog se valida para garantizar que todos los parámetros requeridos estén correctamente configurados antes de continuar, seguido de un rastreo de eventos de autenticación durante la ingesta de datos para garantizar un acceso seguro y una correcta verificación del usuario tras la validación de la configuración.

### Dashboards
Esta integración incluye **tres dashboards predefinidos**:

 1. **Información general de WhyLabs**: Proporciona una visión completa de la plataforma, que te permite monitorizar y gestionar modelos de aprendizaje automático y conjuntos de datos. Destaca áreas clave como recursos, anomalías, segmentos, entradas, salidas y columnas.
 2. **WhyLabs - Modelos**: Se centra en elementos esenciales como el resumen del modelo, las anomalías detectadas, los segmentos, los monitores activos, las entradas y las salidas. Ofrece una visión detallada del rendimiento y el comportamiento del modelo en producción.
 3. **WhyLabs - Conjuntos de datos**: Muestra una información general del tipo de datos del conjunto de datos, que hace hincapié en áreas clave como el resumen del modelo, anomalías, segmentos, monitores activos, columnas y estado de discreción.

## Asistencia técnica
Para solicitar asistencia o características, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia técnica: [datadog.integrations@crestdata.ai][9]
- Correo electrónico de ventas: [datadog-sales@crestdata.ai][10]
- Página web: [crestdata.ai][11]
- FAQ: [FAQ de integraciones de marketplace de Crest Data y Datadog][3]


[1]: https://whylabs.ai/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/whylabs.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/
[6]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[7]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#agent-status-and-information
[9]: mailto:datadog.integrations@crestdata.ai
[10]: mailto:datadog-sales@crestdata.ai
[11]: https://www.crestdata.ai/

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-whylabs" target="_blank">adquiere esta aplicación en el Marketplace</a>.