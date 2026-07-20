---
app_id: argo-rollouts
app_uuid: 28d531ac-954c-4c5a-8769-589589f793e0
assets:
  dashboards:
    Argo Rollouts Overview: assets/dashboards/argo_rollouts_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: argo_rollouts.go.threads
      metadata_path: metadata.csv
      prefix: argo_rollouts.
    process_signatures:
    - rollouts-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8465752
    source_type_name: Argo Rollouts
  monitors:
    Argo Rollout is in Non Running or Completed State: assets/monitors/rollout_phase.json
  saved_views:
    Argo Rollouts Error Logs Overview: assets/saved_views/error_logs_overview.json
    Argo Rollouts Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- kubernetes
- herramientas de desarrollo
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/README.md
display_on_public_website: true
draft: false
git_integration_title: argo_rollouts
integration_id: argo-rollouts
integration_title: Argo Rollouts
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: argo_rollouts
public_title: Argo Rollouts
short_description: Monitorizar el estado y el rendimiento de Argo Rollouts
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
  - Category::Metrics
  - Category::Kubernetes
  - Category::Developer Tools
  - Category::Log Collection
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar el estado y el rendimiento de Argo Rollouts
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Argo Rollouts
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check supervisa [Argo Rollouts][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en tu entorno de Kubernetes. Para más información sobre la configuración en entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación.

### Instalación

A partir de la versión 7.53.0 del Agent, el check de Argo Rollouts se incluye en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics][4] para recopilar métricas desde el endpoint de OpenMetrics que expone Argo Rollouts, que requiere Python 3.

### Configuración

El controlador de Argo Rollouts dispone de métricas con formato Prometheus en `/metrics` en el puerto `8090`. Para que el Agent empiece a recopilar métricas, los pods de Argo Rollouts necesitan ser anotados. Para más información sobre anotaciones, consulta las [plantillas de integración de Autodiscovery][2] como guía. Puedes encontrar opciones adicionales de configuración en el [argo_rollouts.d/conf.yaml de ejemplo][5].

**Nota**: Las métricas enumeradas sólo pueden recopilarse si están disponibles. Algunas métricas sólo se generan cuando se realizan determinadas acciones. Por ejemplo, la métrica `argo_rollouts.info.replicas.updated` sólo se expone tras la actualización de una réplica.

El único parámetro necesario para configurar el check de Argo Rollouts es:
- `openmetrics_endpoint`: este parámetro debe establecerse en la localización donde se exponen las métricas con formato Prometheus. El puerto predeterminado es `8090`. En entornos en contenedores, `%%host%%` debe utilizarse para la [autodetección de hosts][2]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argo-rollouts.checks: |
      {
        "argo_rollouts": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8090/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argo-rollouts'
# (...)
```

#### Recopilación de logs

_Disponible para la versión 6.0 o posterior del Agent_

Los logs de Argo Rollouts pueden recopilarse de los diferentes pods de Argo Rollouts a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para habilitarla, consulta [recopilación de logs de Kubernetes][6].

Consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argo_rollouts", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `argo_rollouts` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "argo-rollouts" >}}


### Eventos

La integración de Argo Rollouts no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "argo-rollouts" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización del estado y el rendimiento de tus pipelines de CI/CD nativas en el contenedor][11]

[1]: https://argoproj.github.io/rollouts/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/datadog_checks/argo_rollouts/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/argo_rollouts/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/