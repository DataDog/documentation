---
app_id: argocd
app_uuid: 49ad19d0-1452-4275-b0fe-cbda3821807d
assets:
  dashboards:
    Argo CD Overview: assets/dashboards/argo_cd_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - argocd.api_server.go.goroutines
      - argocd.app_controller.go.goroutines
      - argocd.appset_controller.go.goroutines
      - argocd.repo_server.go.goroutines
      - argocd.notifications_controller.go.goroutines
      metadata_path: metadata.csv
      prefix: argocd.
    process_signatures:
    - argocd-application-controller
    - argocd-applicationset-controller
    - argocd-repo-server
    - argocd-server
    - argocd-notifications-controller
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10314
    source_type_name: ArgoCD
  monitors:
    Applications sync status: assets/monitors/application_sync_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas de desarrollo
- recopilación de logs
- Kubernetes
- Configuración y despliegue
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/argocd/README.md
display_on_public_website: true
draft: false
git_integration_title: argocd
integration_id: argocd
integration_title: Argo CD
integration_version: 3.3.0
is_public: true
manifest_version: 2.0.0
name: argocd
public_title: Argo CD
short_description: Monitorizar el estado y el rendimiento de Argo CD
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas para desarrolladores
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Kubernetes
  - Categoría::Configuración y despliegue
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorizar el estado y el rendimiento de Argo CD
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Argo CD
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Argo CD][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Argo CD está incluido en el paquete del [Datadog Agent][2]. No se necesita ninguna instalación adicional en tu servidor.

**Note**: Este check requiere el Agent v7.42.0 o posterior.

### Configuración

Argo CD expone métricas con formato Prometheus en tres de sus componentes:
   - Controlador de aplicaciones
   - Servidor API
   - Servidor de repositorio

El Datadog Agent puede recopilar las métricas expuestas utilizando esta integración. Sigue las instrucciones siguientes para configurar la recopilación de datos de cualquiera de los componentes o de todos ellos.

**Nota**: Este check utiliza [OpenMetrics][3] para la recopilación de métricas, lo que requiere Python v3.

#### En contenedores
##### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus están expuestas en tu clúster CD Argo. Esto está activado por defecto, si se utilizan los [manifiestos predeterminados][4] de CD Argo. Para que el Agent reúna todas las métricas, es necesario anotar cada uno de los tres componentes mencionados. Para obtener más información sobre las anotaciones, consulta las [plantillas de la integración Autodiscovery][5] como guía. Si consultas el [argocd.d/conf.yaml de ejemplo][6], podrás ver otras opciones de configuración.

Hay casos de uso en los que las aplicaciones CD Argo contienen etiquetas (labels) que deben exponerse como métricas de Prometheus. Estas etiquetas (labels) están disponibles utilizando la métrica `argocd_app_labels`, que está desactivada en el controlador de aplicaciones de forma predeterminada. Para ver instrucciones sobre cómo activarla, consulta la [documentación de ArgoCD][7].

Ejemplo de configuraciones:

**Controlador de aplicaciones**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-application-controller.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "app_controller_endpoint": "http://%%host%%:8082/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-application-controller'
# (...)
```

**Servidor API**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-server.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "api_server_endpoint": "http://%%host%%:8083/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-server'
# (...)
```

**Servidor de repositorio**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-repo-server.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "repo_server_endpoint": "http://%%host%%:8084/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-repo-server'
# (...)
```

**Nota**: Para consultar la lista completa de endpoints compatibles, consulta el [archivo conf.yaml de ejemplo][8].

##### Solucionar problemas 

**Nombres de etiqueta (tag) en conflicto**:
La integración Argo CD adjunta un nombre de etiqueta (tag) derivado de la etiqueta (label) del nombre de la aplicación OpenMetrics, cuando está disponible. En algunas ocasiones, esto puede provocar problemas con las consultas, si un nombre de etiqueta (tag) ya está asociado a un host, como se ve en el ejemplo `name: host_a, app_a`. Para evitar comportamientos no deseados durante la consulta, es aconsejable [reasignar el nombre de la etiqueta (label)][9] a algo más exclusivo, como `argocd_app_name`, si el host ya tiene un nombre de etiqueta (tag). A continuación se muestra un ejemplo de configuración:

**Controlador de aplicaciones**:
```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/argocd-application-controller.checks: |
      {
        "argocd": {
          "init_config": {},
          "instances": [
            {
              "app_controller_endpoint": "http://%%host%%:8082/metrics",
              "rename_labels": {
                "name": "argocd_app_name"
              }
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'argocd-application-controller'
# (...)
```

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

Los logs de Argo CD pueden recopilarse de los diferentes pods de Argo CD a través de Kubernetes. La recopilación de logs está desactivada por defecto en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][10].

Consulta las [plantillas de integración de Autodiscovery][11] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "argocd", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent][12] y busca `argocd` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "argocd" >}}


### Eventos

La integración Argo CD no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "argocd" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][15].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar el estado y el rendimiento de tus pipelines CI/CD nativos de contenedores][16]



[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/integrations/openmetrics/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/installation/
[5]: https://docs.datadoghq.com/es/containers/kubernetes/integrations/?tab=kubernetesadv2
[6]: https://github.com/DataDog/integrations-core/blob/master/argocd/datadog_checks/argocd/data/conf.yaml.example
[7]: https://argo-cd.readthedocs.io/en/stable/operator-manual/metrics/#exposing-application-labels-as-prometheus-metrics
[8]: https://github.com/DataDog/integrations-core/blob/master/argocd/datadog_checks/argocd/data/conf.yaml.example#L45-L72
[9]: https://github.com/DataDog/integrations-core/blob/7.45.x/argocd/datadog_checks/argocd/data/conf.yaml.example#L164-L166
[10]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[11]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[12]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/argocd/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/argocd/assets/service_checks.json
[15]: https://docs.datadoghq.com/es/help/
[16]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/