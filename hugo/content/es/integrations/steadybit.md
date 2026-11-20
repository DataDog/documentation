---
app_id: steadybit
app_uuid: b1194c36-afd0-47dc-9c0a-11f3ab82f387
assets:
  dashboards:
    Steadybit Chaos Engineering Activity: assets/dashboards/steadybit.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: steadybit.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10321
    source_type_name: Steadybit
author:
  homepage: https://steadybit.com/
  name: Steadybit
  sales_email: sales@steadybit.com
  support_email: support@steadybit.com
categories:
- rum
- pruebas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/steadybit/README.md
display_on_public_website: true
draft: false
git_integration_title: steadybit
integration_id: steadybit
integration_title: Steadybit
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: steadybit
public_title: Steadybit
short_description: Mejorar inmediatamente la fiabilidad de tus sistemas con la ingeniería
  del caos
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Incidents
  - Category::Testing
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Mejorar inmediatamente la fiabilidad de tus sistemas con la ingeniería
    del caos
  media:
  - caption: Un vídeo que muestra la integración de la API de Datadog con Steadybit
      en acción.
    image_url: images/steadybit_experiment_editor.png
    media_type: vídeo
    vimeo_id: 782622274
  - caption: Una vez ejecutados, los estados de monitor de Datadog se utilizan para
      controlar el comportamiento de un experimento.
    image_url: images/steadybit_experiment_execution_run_log.png
    media_type: imagen
  - caption: El estado de los monitores de Datadog relevantes se muestra a lo largo
      del tiempo en Steadybit.
    image_url: images/steadybit_experiment_execution_monitor_status_over_time.png
    media_type: imagen
  - caption: Steadybit informa de eventos a Datadog para informar a toda la organización.
    image_url: images/steadybit_events_in_datadog.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Steadybit
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Steadybit][1] es una plataforma de ingeniería del caos que permite simular condiciones turbulentas de forma controlada, para mejorar la fiabilidad de los sistemas y guiar a tu organización hacia una mejor gestión de las incidencias.

La integración de Steadybit utiliza el estado de los monitores de Datadog dentro de los experimentos de ingeniería del caos. Esta integración proporciona a tu equipo una visión de la actividad de la ingeniería del caos, como el entorno, hora de inicio y fin del experimento, y el resultado del mismo a través de eventos de Datadog.

## Configuración

La integración entre Datadog y Steadybit se realiza a través de la [extensión de Steadybit Datadog][2]. La extensión interactúa con la API de Datadog para recopilar información sobre los monitores e informar de eventos a Datadog.

### Requisitos previos

Necesitas una [licencia gratuita o paga de Steadybit][3]. La integración es compatible con la oferta SAAS y on-premises de Steadybit.

### Instalación

Se admiten varios [métodos de instalación][4]. Para obtener la mejor experiencia, instala la extensión de Steadybit Datadog a través del cuadro de Helm dedicado, como se muestra a continuación. Para obtener más información sobre los valores admitidos para `datadog.siteParameter` y `datadog.siteUrl`, consulta la página [sitios de Datadog][5].

```
helm repo add steadybit https://steadybit.github.io/helm-charts
helm repo update

helm upgrade steadybit-extension-datadog \
  --install \
  --wait \
  --timeout 5m0s \
  --create-namespace \
  --namespace steadybit-extension \
  --set datadog.apiKey="{{API_KEY}}" \
  --set datadog.applicationKey="{{APPLICATION_KEY}}" \
  --set datadog.siteParameter="{{SITE_PARAMETER}}" \
  --set datadog.siteUrl="{{SITE_URL}}" \
  steadybit/steadybit-extension-datadog
```

### Validación

Una vez que la extensión de Steadybit Datadog esté en funcionamiento, verás una lista de monitores de Datadog dentro de la pestaña *Landscape* (Entorno) en Steadybit.

## Datos recopilados

### Métricas

Steadybit no incluye ninguna métrica.

### Checks de servicio

Steadybit no incluye ningún check de servicio.

### Eventos

Steadybit informa de eventos a Datadog indicando actividad de ingeniería del caos. Todos estos eventos llevan la etiqueta `source:steadybit`.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Steadybit][6].

[1]: https://steadybit.com/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[2]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[3]: https://signup.steadybit.io/?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme
[4]: https://hub.steadybit.com/extension/com.steadybit.extension_datadog?utm_campaign=datadogintegration&utm_source=datadog&utm_medium=integration-readme#content-installation
[5]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[6]: mailto:support@steadybit.com