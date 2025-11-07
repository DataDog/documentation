---
app_id: tekton
app_uuid: 4e8f129e-1c9b-4078-a966-f0099dbf9465
assets:
  dashboards:
    Tekton Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - tekton.pipelines_controller.go.alloc
      - tekton.triggers_controller.go.alloc
      metadata_path: metadata.csv
      prefix: tekton.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 5667413
    source_type_name: Tekton
  monitors:
    Increasing number of failed PipelineRuns: assets/monitors/increasing_failed_pipelineruns.json
    Increasing number of failed TaskRuns: assets/monitors/increasing_failed_taskruns.json
    TaskRuns are throttled: assets/monitors/throttled_taskruns.json
  saved_views:
    tekton_errors: assets/saved_views/tekton_errors.json
    tekton_overview: assets/saved_views/tekton_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- herramientas de desarrollo
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tekton/README.md
display_on_public_website: true
draft: false
git_integration_title: tekton
integration_id: tekton
integration_title: Tekton
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: tekton
public_title: Tekton
short_description: Realiza un seguimiento de todas tus métricas de Tekton con Datadog.
supported_os:
- linux
- windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Recopilación de logs
  - Categoría::Herramientas de desarrollo
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de todas tus métricas de Tekton con Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Tekton
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Tekton][1] a través del Datadog Agent. Tekton es un marco de código abierto robusto y flexible para la creación de sistemas CI/CD, que permite a los desarrolladores crear, probar y desplegar en proveedores de nube y sistemas on-premise.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir del Agent versión 7.53.0, el check de Tekton está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

Este check utiliza [OpenMetrics][4] para recopilar métricas del endpoint expuesto por Tekton, que requiere Python v3.

### Configuración

1. Edita el archivo `tekton.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Tekton. Consulta el [tekton.d/conf.yaml de ejemplo][5] para ver todas las opciones de configuración disponibles.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `tekton` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tekton" >}}


### Eventos

La integración Tekton no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "tekton" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de la salud y del rendimiento de tus pipelines CI/CD nativos del contenedor][11]


[1]: https://tekton.dev/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/tekton/datadog_checks/tekton/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tekton/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/tekton/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/