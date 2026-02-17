---
app_id: kubernetes-cluster-autoscaler
app_uuid: 3a3fc186-af02-48e5-8b68-ee9ef37ea566
assets:
  dashboards:
    Kubernetes Cluster Autoscaler Overview: assets/dashboards/kubernetes_cluster_autoscaler_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kubernetes_cluster_autoscaler.nodes.count
      metadata_path: metadata.csv
      prefix: kubernetes_cluster_autoscaler.
    process_signatures:
    - cluster-autoscaler
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 14391189
    source_type_name: Kubernetes Cluster Autoscaler
  logs:
    source: kubernetes_cluster_autoscaler
  monitors:
    Kubernetes Cluster Autoscaler is not safe to autoscale: assets/monitors/KCA_not_safe_to_autosclae.json
    Kubernetes Cluster Autoscaler reporting errors: assets/monitors/KCA_unused_nodes_forecast.json
    Kubernetes Cluster Autoscaler too many unused nodes forecast: assets/monitors/KCA_reporting_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
- Kubernetes
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/README.md
display_on_public_website: true
draft: false
git_integration_title: kubernetes_cluster_autoscaler
integration_id: kubernetes-cluster-autoscaler
integration_title: Kubernetes Cluster Autoscaler
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: kubernetes_cluster_autoscaler
public_title: Kubernetes Cluster Autoscaler
short_description: Integración para Kubernetes Cluster Autoscaler
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
  - Categoría::Métricas
  - Categoría::Kubernetes
  - Tipo de datos enviados::Métricas
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración para Kubernetes Cluster Autoscaler
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Kubernetes Cluster Autoscaler
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Kubernetes Cluster Autoscaler][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Kubernetes Cluster Autoscaler está incluido en el paquete del [Datadog Agent][3]. (Agent >= 7.55.x)
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `kubernetes_cluster_autoscaler.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar los datos de rendimiento de kubernetes_cluster_autoscaler. Para ver todas las opciones de configuración disponibles, consulta el [ejemplo de kubernetes_cluster_autoscaler.d/conf.yaml][4].

2. [Reinicia el Agent][5].

#### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus están expuestas en tu clúster `kubernetes_cluster_autoscaler`. 
Para que el Agent empiece a recopilar métricas, los pods `kubernetes_cluster_autoscaler` deben estar anotados.

[Kubernetes Cluster Autoscaler][6] tiene métricas y endpoints livenessProbe a los que se puede acceder en el puerto `8085`. Estos endpoints se encuentran en `/metrics` y `/health-check`, y proporcionan información valiosa sobre el estado de tu clúster durante las operaciones de escalado.

**Nota**: Para cambiar el puerto por defecto, utiliza el marcador `--address`.

Para configurar el Cluster Autoscaler para exponer métricas, haz lo siguiente:

1. a) Habilita el acceso a la ruta `/metrics` y expón el puerto `8085` del despliegue de tu Cluster Autoscaler:

```
ports:
--name: app
containerPort: 8085
``` 

b) Ordena a tu Prometheus que lo depure, añadiendo la siguiente anotación a tu servicio de Cluster Autoscaler:
```
prometheus.io/scrape: true
```

**Nota**: Los métricas enumeradas solo pueden recopilarse si están disponibles. Algunas métricas solo se generan cuando se realizan determinadas acciones.

Los únicos parámetros necesarios para configurar el check `kubernetes_cluster_autoscaler` son:

* NOMBRE_DEL_CONTENEDOR
  Nombre del contenedor del controlador de Cluster Autoscaler.
* `openmetrics_endpoint`
  Este parámetro debe configurarse en la ubicación donde se exponen las métricas con formato Prometheus. El puerto por defecto es `8085`. Para configurar un puerto diferente, utiliza la [variable de entorno][7] `METRICS_PORT`. En entornos contenedorizados, `%%host%%` debe utilizarse para la [detección automática de hosts][2]. 

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "kubernetes_cluster_autoscaler": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8085/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: '<CONTAINER_NAME>'
# (...)
```


### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `kubernetes_cluster_autoscaler` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kubernetes_cluster_autoscaler" >}}


### Eventos

La integración Kubernetes Cluster Autoscaler no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "kubernetes_cluster_autoscaler" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][11].


[1]: https://docs.datadoghq.com/es/integrations/kubernetes_cluster_autoscaler/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/datadog_checks/kubernetes_cluster_autoscaler/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#how-can-i-monitor-cluster-autoscaler
[7]: https://kubernetes.io/docs/tasks/inject-data-application/define-environment-variable-container/
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_cluster_autoscaler/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/