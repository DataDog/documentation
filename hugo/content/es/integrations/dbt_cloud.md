---
app_id: dbt-cloud
app_uuid: b237cca3-e51e-400b-ae1d-960d0cab286b
assets:
  dashboards:
    dbt Cloud Overview: assets/dashboards/dbt_cloud_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - dbt_cloud.runs.total
      metadata_path: metadata.csv
      prefix: dbt_cloud.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 24633362
    source_type_name: DBT Cloud
  monitors:
    High runs error rate: assets/monitors/high_runs_error_rate.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- herramientas para desarrolladores
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: dbt_cloud
integration_id: dbt-cloud
integration_title: dbt Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: dbt_cloud
public_title: dbt Cloud
short_description: Obtén estadísticas sobre ejecuciones, rendimiento de trabajos y
  mucho más desde tu cuenta de dbt Cloud.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Nube
  - Category::Developer Tools
  - Category::Metrics
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Obtén estadísticas sobre ejecuciones, rendimiento de trabajos y mucho
    más desde tu cuenta de dbt Cloud.
  media:
  - caption: Dashboard de dbt Cloud
    image_url: images/dbt-dashboard-screenshot.png
    media_type: imagen
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
  support: README.md#Support
  title: dbt Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

La integración de Datadog con [dbt Cloud][1] te permite recopilar y visualizar métricas clave de tus ejecuciones, modelos y tests de dbt. Al integrar dbt Cloud con Datadog, puedes hacer lo siguiente:

- Monitorizar el rendimiento y el estado de tus ejecuciones de dbt.
- Ver los tiempos de ejecución, los tiempos de compilación y los códigos de estado de las ejecuciones, los modelos y los tests.
- Correlacionar las métricas de dbt con los datos de otros servicios de tu stack.

## Configuración

### Requisitos previos

- Una cuenta de dbt Cloud.
- Un token de API con los permisos necesarios.

### Paso 1: genera un token de API en dbt Cloud

1. En dbt Cloud, ve a **User Profile** (Perfil de usuario) > **API Tokens** (Tokens de API) > **Service Tokens** (Tokens de servicio).
2. Haz clic en **+ Create Service Token** (+ Crear token de servicio).
3. Indica un nombre para el token.
4. Establece los permisos del token:
   - Para las métricas de la API administrativa: asegúrate de que el token tenga acceso a las ejecuciones y los trabajos.
   - Para las métricas de la API de descubrimiento (opcional): asegúrate de que el token tenga privilegios de **API de metadatos** y de que haz [habilitado la API de descubrimiento][2] para tu proyecto.
5. Haz clic en **Save** (Guardar) y copia el **API Token** (Token de API) generado.

### Paso 2: conecta tu cuenta de dbt Cloud a Datadog

1. En la plataforma de Datadog, navega hasta **Integrations** (Integraciones).
2. Busca **dbt Cloud** y selecciona la integración.
3. Rellena el dominio de la cuenta, el dominio de metadatos (opcional) y el token de API.
4. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "dbt-cloud" >}}


### Checks de servicios

La integración de dbt Cloud no incluye checks de servicio.

### Eventos

La integración de dbt Cloud no incluye eventos.

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:
- [Monitorizar dbt Cloud con Datadog][3]

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de soporte de Datadog][4] para obtener asistencia.

[1]: https://www.getdbt.com/product/dbt-cloud
[2]: https://docs.getdbt.com/docs/dbt-cloud-apis/discovery-api
[3]: https://www.datadoghq.com/blog/monitor-dbt-cloud-with-datadog/
[4]: https://docs.datadoghq.com/es/help/