---
app_id: speedscale
app_uuid: 35e3ad0c-9189-4453-b3c3-2b4aefa7c176
assets:
  dashboards:
    speedscale: assets/dashboards/SpeedscaleOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: speedscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10271
    source_type_name: Speedscale
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Speedscale
  sales_email: support@speedscale.com
  support_email: support@speedscale.com
categories:
- contenedores
- Kubernetes
- orquestación
- tests
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md
display_on_public_website: true
draft: false
git_integration_title: speedscale
integration_id: speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: speedscale
public_title: Speedscale
short_description: Publica los resultados de las repeticiones de tráfico de Speedscale
  en Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Publica los resultados de las repeticiones de tráfico de Speedscale
    en Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Speedscale
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Esta integración publica los resultados de las repeticiones de tráfico de [Speedscale][1] en Datadog. Esto te permite combinar tus datos de observabilidad de Datadog con los resultados de una repetición particular de Speedscale para investigar la causa raíz de un rendimiento deficiente. Encuentra y soluciona posibles problemas de rendimiento antes de que aparezcan en producción con la integración de Speedscale y Datadog.

## Configuración

### Configuración

1. Para utilizar esta integración necesitas una [clave de API][2] de Datadog para que los eventos puedan enviarse a Datadog.

    Una práctica recomendada es guardar este valor en una variable de entorno. Lo más probable es que almacenes esta variable de entorno en tu sistema de integración continua, sin embargo, cuando realices un test puntual, puedes acceder a la variable en tu terminal de la siguiente manera:

   ```
   export DDOG_API_KEY=0
   ```

2. Recopila el ID de informe de un informe específico que desees cargar en Datadog. Cuando trabajes con la integración continua, obtén el ID de informe asociado a tu hash de confirmación. Almacena este ID de informe en una variable de entorno:

   ```
   export SPD_REPORT_ID=0
   ```

3. Con el ID de informe específico y la clave de API de Datadog, ejecuta el comando `speedctl` para exportar ese informe de repetición de tráfico como evento de Datadog.

   ```
   speedctl export datadog ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### Validación

Visita [Flujo de eventos][2] de Datadog para ver el informe exportado.

## Datos recopilados

### Métricas

Speedscale no incluye ninguna métrica.

### Checks de servicio

Speedscale no incluye ningún check de servicio.

### Eventos

La integración de Speedscale envía eventos a tu [Flujo de eventos de Datadog][3] cuando se completa una repetición de tráfico para ayudar a comprender el impacto que esto tiene en tus métricas.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/es/help/