---
app_id: kyverno
app_uuid: 125b7209-7617-4bf5-a88c-a4e1f0fa211d
assets:
  dashboards:
    Kyverno Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - kyverno.policy.results.count
      - kyverno.policy.rule.info
      metadata_path: metadata.csv
      prefix: kyverno.
    process_signatures:
    - kyverno
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17459094
    source_type_name: kyverno
  monitors:
    Controller element is dropped: assets/monitors/controller_drops.json
  saved_views:
    Kyverno Error Logs Overview: assets/saved_views/error_logs_overview.json
    Kyverno Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- Kubernetes
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kyverno/README.md
display_on_public_website: true
draft: false
git_integration_title: kyverno
integration_id: kyverno
integration_title: Kyverno
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: kyverno
public_title: Kyverno
short_description: Monitorizar el estado y el rendimiento de Kyverno
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Métricas
  - Categoría::Kubernetes
  - Categoría::Seguridad
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de Kyverno
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kyverno
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Kyverno][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en tu entorno de Kubernetes. Para más información sobre la configuración en entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación.

### Instalación

A partir de la versión 7.56.0 del Agent, el check de Kyverno se incluye en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu entorno.

Este check utiliza [OpenMetrics][4] para recopilar métricas desde el endpoint de OpenMetrics que expone Kyverno, que requiere Python v3.

### Configuración

Kyverno está compuesto por diferentes controladores, como los de copia de seguridad, admisiones, limpieza e informes. Es posible monitorizar cada uno de estos controladores. Cada controlador de Kyverno tiene métricas con el formato Prometheus, disponibles en `/metrics` en el puerto `8000`. Para que el Agent comience a recopilar métricas, es necesario anotar los pods de los controladores Kyverno. Para obtener más información sobre anotaciones, consulta las [plantillas de la integración Autodiscovery][2] como guía. Puedes encontrar opciones adicionales de configuración en el [kyverno.d/conf.yaml de ejemplo][5]. 

**Nota**: Las métricas enumeradas sólo pueden recopilarse si están disponibles. Algunas métricas sólo se generan cuando se realizan determinadas acciones. Por ejemplo, la métrica `kyverno.controller.drop.count` sólo se expone después de que un objeto sea descartado por el controlador.

El único parámetro necesario para configurar el check Kyverno es:
- `openmetrics_endpoint`: este parámetro debe definirse en la localización donde se exponen métricas con el formato Prometheus. El puerto predeterminado es `8000`. En entornos contenedorizados, `%%host%%` debe utilizarse para la [autodetección de hosts][2].

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "kyverno": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8000/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: <CONTAINER_NAME> # e.g. 'kyverno' in the Admission controller
# (...)
```

Para recopilar métricas de cada controlador Kyverno, las anotaciones de pod anteriores pueden aplicarse a cada pod de controlador Kyverno. Ejemplo de anotaciones de pod para el controlador Informes:

```yaml
# Pod manifest from a basic Helm chart deployment
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: 'controller'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "kyverno": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8000/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: controller
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de Kyverno pueden recopilarse de los distintos pods de Kyverno a través de Kubernetes. La recopilación de logs está deshabilitada por defecto en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][6].

Consulta las [plantillas de la integración Autodiscovery][2] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kyverno", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `kyverno` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kyverno" >}}


### Eventos

La integración Kyverno no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "kyverno" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://kyverno.io/docs/introduction/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/kyverno/datadog_checks/kyverno/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/kyverno/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/kyverno/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/