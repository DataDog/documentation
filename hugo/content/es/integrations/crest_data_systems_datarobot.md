---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-datarobot
app_uuid: 144ff7c9-134e-4075-90c3-bda4f1081c7b
assets:
  dashboards:
    CDS DataRobot - Deployments: assets/dashboards/cds_datarobot_deployments.json
    CDS DataRobot - LLM: assets/dashboards/cds_datarobot_llm.json
    CDS DataRobot - Models: assets/dashboards/cds_datarobot_models.json
    CDS DataRobot - Overview: assets/dashboards/cds_datarobot_overview.json
    CDS DataRobot - Predictions: assets/dashboards/cds_datarobot_predictions.json
    CDS DataRobot - Use Cases: assets/dashboards/cds_datarobot_use_cases.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cds.datarobot.deployments.totalPredictions
      metadata_path: metadata.csv
      prefix: cds.datarobot
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28626114
    source_type_name: crest_data_systems_datarobot
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
- ia/ml
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_datarobot
integration_id: crest-data-systems-datarobot
integration_title: DataRobot
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_datarobot
pricing:
- billing_type: flat_fee
  includes_assets: true
  product_id: datarobot
  short_description: Tarifa plana mensual.
  unit_price: 200.0
public_title: DataRobot
short_description: Visualizar datos de DataRobot
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
  - Category::AI/ML
  - Offering::Integration
  - Submitted Data Type::Logs
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Visualizar datos de DataRobot
  media:
  - caption: CDS DataRobot - Información general
    image_url: images/cds_datarobot_overview.png
    media_type: imagen
  - caption: CDS DataRobot - Despliegues
    image_url: images/cds_datarobot_deployments.png
    media_type: imagen
  - caption: CDS DataRobot - Modelos
    image_url: images/cds_datarobot_models.png
    media_type: imagen
  - caption: CDS DataRobot - Predicción
    image_url: images/cds_datarobot_prediction.png
    media_type: imagen
  - caption: CDS DataRobot - LLM
    image_url: images/cds_datarobot_llm.png
    media_type: imagen
  - caption: CDS DataRobot - Casos prácticos
    image_url: images/cds_datarobot_use_cases.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: DataRobot
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/marketplace -->

## Información general
[**DataRobot**][1] es una plataforma de IA que utiliza Machine Learning para automatizar el proceso de creación, despliegue y gestión de modelos. Está diseñada para ayudar a organizaciones de todos los tamaños a utilizar la IA para mejorar sus resultados empresariales. Con DataRobot, los usuarios pueden crear y desplegar modelos en sus conjuntos de datos para generar predicciones, mientras diseñan planos personalizados para sus flujos de trabajo de Machine Learning.

Este integración permite recopilar y visualizar de forma continua datos de DataRobot como métricas y logs en Datadog. Puedes configurar los siguientes componentes:

**Datos de inventario**: 


- Despliegues
    - Dependent Components: BatchServiceStats, Accuracy, ServiceStatsOverTime, ServiceStats [Metric Ingestion], PredictionsVsActualsOverTime, HumilityStatsOverTime, FeatureDrift, TargetDrift
- LLM
    - Componentes relacionados: LLMApiCalls [ingesta de métricas]
- Proyectos
    - Componentes dependientes: Modelos
    - Proyecto - Componentes dependientes del modelo: ModelDetails, NumIterationsTrained, MissingReport, Features, CrossValidationScores
- ModelPackages
- ExternalDataSources
- ExternalDataDrivers
- ExternalDataStores
- BatchPredictions

**Datos no inventariados**: 

- UseCases
    - Componentes dependientes: Datos, Proyectos
- LLMBlueprints
- Playground

Esta integración incluye seis dashboards predefinidos:

  1. **Casos prácticos**: Monitoriza y visualiza estadísticas de UseCases, incluyendo conjuntos de datos y proyectos asociados.

  2. **Despliegues**: Muestra información general de los despliegues recopilados en el `interval_for_inventory` definido por el usuario.

  3. **Modelos**: Monitoriza estadísticas de modelos recopiladas en el`interval_for_inventory` definido por el usuario.

  4. **LLM**: Muestra un resumen de la información relacionada con LLM recopilada en el `interval_for_inventory` definido por el usuario.

  5. **Predicciones**: Presenta un resumen de la información relacionada con las predicciones recopilada en el `interval_for_inventory` definido por el usuario.

  6. **Información general**: Resume los datos de Playgrounds, ExternalDataSources, ExternalDataStores y ExternalDataDrivers recopilados en el `interval_for_inventory` definido por el usuario.

## Asistencia
Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][10]

- Correo electrónico de ventas: [datadog-sales@crestdata.ai][11]

- Página web: [crestdata.ai][12]

- FAQ: [FAQ sobre integraciones Crest Data Datadog Marketplace][3]


[1]: https://www.datarobot.com/
[2]: https://docs.crestdata.ai/datadog-integrations-readme/Datarobot.pdf
[3]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[4]: https://docs.datadoghq.com/es/agent/?tab=Linux
[5]: https://app.datarobot.com/
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/?tab=agentv6v7
[7]: https://docs.datadoghq.com/es/account_management/api-app-keys
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: mailto:datadog.integrations@crestdata.ai
[11]: mailto:datadog-sales@crestdata.ai
[12]: https://www.crestdata.ai/
---
Esta aplicación está disponible a través del Marketplace Datadog y cuenta con el respaldo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-datarobot" target="_blank">adquiere esta aplicación en el Marketplace</a>.