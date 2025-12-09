---
app_id: kubeflow
app_uuid: 0db7b333-38a1-4e09-af1b-317da2f9f413
assets:
  dashboards:
    Kubeflow Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubeflow.pipeline.run.status
      metadata_path: metadata.csv
      prefix: kubeflow.
    process_signatures:
    - katib-controller
    - katib-db-manager
    - katib-ui
    - kserve-controller-manager
    - ml-pipeline-api-server
    - ml-pipeline-scheduledworkflow
    - ml-pipeline-persistenceagent
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22259533
    source_type_name: Kubeflow
  monitors:
    Kubeflow Monitor: assets/monitors/kubeflow.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- kubernetes
- ai/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubeflow/README.md
display_on_public_website: true
draft: false
git_integration_title: kubeflow
integration_id: kubeflow
integration_title: Kubeflow
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: kubeflow
public_title: Kubeflow
short_description: Integración para Kubeflow
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
  - Categoría::Kubernetes
  - Submitted Data Type::Metrics
  - Category::AI/ML
  - Offering::Integration
  configuration: README.md#Configuración
  description: Integración para Kubeflow
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kubeflow
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Kubeflow][1] a través del Datadog Agent.


## Configuración

<div class="alert alert-danger">
Esta integración se publica actualmente en modo de vista previa. Su disponibilidad está sujeta a cambios en el futuro. 
</div>

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Kubeflow está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `kubeflow.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Kubeflow. Para ver todas las opciones de configuración disponibles, consulta el [kubeflow.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

#### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus están expuestas para tu componente`kubeflow`. 
Para que el Agent empiece a recopilar métricas, los pods `kubeflow` deben estar anotados.

Kubeflow tiene endpoints de métricas a los que se puede acceder en el puerto `9090`. 

Para habilitar la exposición de métricas en Kubeflow a través de Prometheus, es posible que necesites habilitar la monitorización del servicio Prometheus para el componente en cuestión.

Puedes utilizar Kube-Prometheus-Stack o una instalación personalizada de Prometheus.

##### Cómo instalar Kube-Prometheus-Stack:
1. Añade el repositorio Helm:
```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
```

2. Instala el Chart:
```
helm install prometheus-stack prometheus-community/kube-prometheus-stack
```

3. Expón el servicio Prometheus externamente:
```
kubectl port-forward prometheus-stack 9090:9090
```
##### Configura ServiceMonitors para componentes Kubeflow:

Necesitas configurar ServiceMonitors para que los componentes Kubeflow expongan sus métricas Prometheus.
Si tu componente Kubeflow expone métricas Prometheus por defecto, sólo tendrás que configurar Prometheus para extraer estas métricas.

El ServiceMonitor tendría el siguiente aspecto:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: <kubeflow-component>-monitor
  labels:
    release: prometheus-stack
spec:
  selector:
    matchLabels:
      app: <kubeflow-component-name>
  endpoints:
  - port: http
    path: /metrics
```

Donde `<kubeflow-component>` debe sustituirse por `pipelines`, `kserve` o `katib` y `<kubeflow-component-name>` debe sustituirse por `ml-pipeline`, `kserve` o `katib`.


**Nota**: Las métricas enumeradas sólo pueden recopilarse si están disponibles (dependiendo de la versión). Algunas métricas sólo se generan cuando se realizan determinadas acciones. 

El único parámetro necesario para configurar el check `kubeflow` es `openmetrics_endpoint`. Este parámetro debe definirse en la localización donde se exponen métricas con formato Prometheus. El puerto por defecto es `9090`. En entornos contenedorizados, `%%host%%` debe utilizarse para la [detección automática de hosts][2].

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/controller.checks: |
      {
        "kubeflow": {
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
    - name: 'controller'
# (...)
```

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `kubeflow` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kubeflow" >}}


### Eventos

La integración Kubeflow no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "kubeflow" >}}


## Resolución de problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://docs.datadoghq.com/es/integrations/kubeflow/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubeflow/datadog_checks/kubeflow/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kubeflow/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/kubeflow/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/