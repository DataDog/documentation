---
app_id: airbrake
app_uuid: 9628996b-82c1-4920-a0c5-c5f32dabd4cf
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - airbrake.exception_rate
      metadata_path: metadata.csv
      prefix: airbrake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34
    source_type_name: Airbrake
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
- issue tracking
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: airbrake
integration_id: airbrake
integration_title: Airbrake
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: airbrake
public_title: Airbrake
short_description: Ver, buscar y discutir las excepciones de Airbrake en tu flujo
  de eventos.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Event Management
  - Category::Issue Tracking
  - Offering::Integration
  configuration: README.md#Setup
  description: Ver, buscar y discutir excepciones de Airbrake en tu flujo de eventos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airbrake
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conecta Airbrake a Datadog para:

- Ve las excepciones en tiempo real como [eventos][1] en Datadog.
- Busca las excepciones en tus gráficos.
- Comenta las excepciones con tu equipo.

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake" popup="true">}}

## Configuración

### Configuración

Configura la integración de Airbrake utilizando webhooks:

1. Ve a la página de configuración en tu cuenta de Airbrake.

2. Para cada proyecto que desees activar, haz clic en **Integrations** (Integraciones).

3. Haz clic en **WebHooks** e introduce esta URL en el campo **URL**:

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. Haz clic en **Save** (Guardar).

Ve a [Events Explorer][2] para ver los nuevos errores de Airbrake.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "airbrake" >}}


### Eventos

La integración de Airbrake muestra errores de Airbrake como eventos.

### Checks de servicio

La integración de Airbrake no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el soporte de Datadog][4].

[1]: https://docs.datadoghq.com/es/events/
[2]: https://app.datadoghq.com/event/explorer
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/airbrake/metadata.csv
[4]: https://docs.datadoghq.com/es/help/