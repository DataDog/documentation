---
app_id: argo-workflows
app_uuid: f96fd144-a3c0-4fed-adcc-53f11f80ec04
assets:
  dashboards:
    Argo Workflows: assets/dashboards/argo_workflows.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argo_workflows.go.info
      metadata_path: metadata.csv
      prefix: argo_workflows.
    process_signatures:
    - controlador de flujos de trabajo
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8511369
    source_type_name: Argo Workflows
  monitors:
    New errors detected in Argo Workflows: assets/monitors/errors.json
  saved_views:
    errors: assets/saved_views/errors.json
    overview: assets/saved_views/overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_workflows/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_workflows
integration_id: argo-workflows
integration_title: Argo Workflows
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: argo_workflows
public_title: Argo Workflows
short_description: Monitorizar el estado y el rendimiento de Argo Workflows
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Herramientas para desarrolladores
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de Argo Workflows
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Argo Workflows
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check supervisa [Argo Workflows][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en tu entorno de Kubernetes. Para más información sobre la configuración en entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación.

### Instalación

A partir de la versión 7.53.0 del Agent, el check de Argo Workflows se incluye en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics][4] para recopilar métricas del endpoint de OpenMetrics.

### Configuración

El controlador de flujos de trabajo de Argo Workflow dispone de métricas con [formato Prometheus][5] en `/metrics` en el puerto `9090`. Para que el Agent empiece a recopilar métricas, los pods del controlador flujos de trabajo necesitan ser anotados. Para obtener más información sobre anotaciones, consulta las [plantillas de integración de Autodiscovery][2] como guía. Puedes encontrar opciones adicionales de configuración en el [argo_workflows.d/conf.yaml de ejemplo][6].

El único parámetro necesario para configurar el check de Argo Workflows es:
- `openmetrics_endpoint`: este parámetro debe definirse en la localización donde se exponen las métricas con formato Prometheus. El puerto predeterminado es `9090`. En entornos en contenedores, `%%host%%` debe utilizarse para la [autodetección de hosts][2]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-workflows.checks: |
      {
        "argo_workflows": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-workflows'
# (...)
```

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

Los logs de Argo Workflows pueden recopilarse de los diferentes pods de Argo Workflows a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][7].

Consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_workflows", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `argo_workflows` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "argo-workflows" >}}


### Eventos

La integración Argo Workflows no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "argo-workflows" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar el estado y el rendimiento de tus pipelines CI/CD nativos de contenedores][12]

[1]: https://argo-workflows.readthedocs.io/en/stable/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/integrations/openmetrics/
[5]: https://argo-workflows.readthedocs.io/en/stable/metrics/
[6]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/datadog_checks/argo_workflows/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/argo_workflows/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/
[12]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/