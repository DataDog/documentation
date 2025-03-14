---
app_id: circleci
app_uuid: 042c421c-c655-4034-9b2f-c2c09faf0800
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    metrics:
      check:
      - circleci.finished_builds.count
      metadata_path: metadata.csv
      prefix: circleci
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 213
    source_type_name: CircleCI
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- configuración y despliegue
- automatización
- herramientas para desarrolladores
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: circleci
integration_id: circleci
integration_title: CircleCI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: circleci
public_title: CircleCI
short_description: La plataforma de CircleCI facilita la creación y el lanzamiento
  rápidos de software de calidad.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Configuration & Deployment
  - Category::Automation
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Configuración
  description: La plataforma de CircleCI facilita la creación y el lanzamiento rápidos
    de software de calidad.
  media:
  - caption: Synthetics
    image_url: images/circleci_synthetics.jpg
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/circleci-monitoring-datadog/
  support: README.md#Soporte
  title: CircleCI
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Conéctate a CircleCI para:

- Visualizar métricas clave de CircleCI, como la cantidad de compilaciones finalizadas o el tiempo de compilación promedio.
- Analizar datos (por ejemplo, dividiendo compilaciones por nombre de trabajo o repositorio) utilizando el sistema de etiquetas (tags) de Datadog.
- Ver datos del flujo de trabajo de Orb en Synthetics.
- Recopilar e ingerir logs de trabajos de CircleCI en Datadog.

## Configuración

### Instalación

Puedes instalar la integración de CircleCI con su [cuadro de integración][1].

### Configuración

1. En la configuración de CircleCI, ve a Personal API Tokens e ingresa la clave generada en el formulario. El nombre no debe ser el mismo que la etiqueta de CircleCI, sino que debe ser único.
2. Filtra los repositorios utilizando una expresión como "Organization/repo*name", "Organization/repo*\*" o "Organization/\*". **El filtrado se realiza en la lista de proyectos rastreados, que debe configurarse en el lado de CircleCI.**
3. Especifica el sistema de control de versiones apropiado y haz referencia a la clave API apropiada.
4. Si habilitas la recopilación de logs para un repositorio, debes asegurarte de que tus pipelines se envíen a Datadog CI Visibility.
   Sigue las instrucciones de [Configurar el rastreo en un flujo de trabajo de CircleCI][2].

Se pueden configurar varios tokens de API y se pueden rastrear varios proyectos para un token determinado. Los usuarios deben estar configurados como colaboradores de un repositorio en particular para poder ver la información de ese repositorio en Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "circleci" >}}


### Eventos

La integración CircleCI no incluye eventos.

### Checks de servicio

La integración CircleCI no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

- [Monitorizar tu entorno de CircleCI con Datadog][5]

[1]: https://app.datadoghq.com/integrations/circleci
[2]: https://docs.datadoghq.com/es/continuous_integration/pipelines/circleci/
[3]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/circleci-monitoring-datadog/