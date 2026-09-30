---
app_id: algorithmia
app_uuid: 09ef6f74-1555-4082-a69e-b5cf21ec4512
assets:
  dashboards:
    Algorithmia: assets/dashboards/algorithmia.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: algorithmia.duration_milliseconds
      metadata_path: metadata.csv
      prefix: algorithmia.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10128
    source_type_name: Algorithmia
  monitors:
    Algorithm is taking too long to execute: assets/monitors/algorithm_duration.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Algorithmia
  sales_email: support@algorithmia.io
  support_email: support@algorithmia.io
categories:
- métricas
- ai/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/algorithmia/README.md
display_on_public_website: true
draft: false
git_integration_title: algorithmia
integration_id: algorithmia
integration_title: Algorithmia
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: algorithmia
public_title: Algorithmia
short_description: Monitorizar métricas para los modelos de Machine Learning en producción
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::AI/ML
  - Supported OS::Linux
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar de métricas para los modelos de Machine Learning en producción
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Algorithmia
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Algorithmia][1] es una plataforma de MLOps que incluye capacidades para los científicos
de datos, desarrolladores de aplicaciones y operadores de TI para desplegar, gestionar, gobernar
y asegurar Machine Learning y otros modelos probabilísticos en producción.

![Algorithmia Insights en Datadog][2]

Algorithmia Insights es una característica de Algorithmia Enterprise y proporciona un
pipeline de métricas que puede utilizarse para instrumentar, medir y monitorizar tus
modelos de Machine Learning. Los casos de uso para monitorizar métricas relacionadas con la inferencia de
modelos de Machine Learning incluyen la detección de la deriva del modelo, la deriva de los datos, el sesgo del modelo,
etc.

Esta integración te permite transmitir métricas operativas así como
métricas definidas por el usuario y relacionadas con la inferencia de Algorithmia a Kafka a la API de métricas
en Datadog.

## Configuración

1. Desde tu instancia de Algorithmia, configura Algorithmia Insights para conectarse a
   un broker de Kafka (externo a Algorithmia).

2. Consulta el [repositorio de integraciones de Algorithmia][3]
   para instalar, configurar, e iniciar el servicio de reenvío de mensajes de Datadog utilizado
   en este integración, que reenvía métricas desde un tema de Kafka a
   la API de métricas en Datadog.


### Validación

1. Desde Algorithmia, consulta un algoritmo que tenga Insights activado.
2. En la interfaz de Datadog, ve a la página de resumen **Metrics** (Métricas).
3. Comprueba que las métricas de Insights están presente en Datadog filtrando por
   `algorithmia`.

### Métricas de transmisión

Esta integración transmite métricas desde Algorithmia cuando se consulta un modelo que tiene Insights
activado. Cada entrada de log incluye métricas operativas y
métricas relacionadas con la inferencia.

La métrica `duration_milliseconds` es una de las métricas operativas que se
incluye en la carga útil por defecto de Algorithmia. Para ayudarte a empezar, esta
integración también incluye un dashboard y un monitor para esta métrica por defecto.

Además, las métricas pueden incluir cualquier métrica definida por el usuario, relacionada con la inferencia, que
sean especificados en Algorithmia por el desarrollador del algoritmo. Las métricas definidas por el usuario
dependen de tu marco específico de Machine Learning y de su caso de uso, pero podrían
incluir valores como probabilidades de predicción de un modelo de regresión en
puntuaciones scikit-learn de confianza de un clasificador de imágenes en TensorFlow, o datos de entrada de solicitudes de API entrantes.
**Nota**: El script de reenvío de mensajes
proporcionado en esta integración antepone a las métricas definidas por el usuario el prefijo
`algorithmia.` en Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "algorithmia" >}}


### Checks de servicio

El check de Algorithmia no incluye ningún check de servicio.

### Eventos

El check de Algorithmia no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [el soporte de Algorithmia][5].

[1]: https://algorithmia.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/algorithmia/images/algorithmia-insights-datadog.png
[3]: https://github.com/algorithmiaio/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/algorithmia/metadata.csv
[5]: https://algorithmia.com/contact