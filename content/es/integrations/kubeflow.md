---
app_id: kubeflow
categories:
- métricas
- kubernetes
- ai/ml
custom_kind: integración
description: Integración para Kubeflow
integration_version: 2.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kubeflow
---
## Información general

Este check monitoriza [Kubeflow](https://docs.datadoghq.com/integrations/kubeflow/) a través del Datadog Agent.

## Configuración

<div class="alert alert-warning">
Esta integración se publica actualmente en modo de vista previa. Su disponibilidad está sujeta a cambios en el futuro. 
</div>

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Kubeflow se incluye en el paquetedel [Datadog Agent] (https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `kubeflow.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de kubeflow. Consulta el [kubeflow.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kubeflow/datadog_checks/kubeflow/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

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

**Nota**: Las métricas enumeradas solo pueden recopilarse si están disponibles (dependiendo de la versión). Algunas métricas solo se generan cuando se realizan determinadas acciones. 

El único parámetro necesario para configurar el check `kubeflow` es `openmetrics_endpoint`. Este parámetro debe definirse en la localización donde se exponen métricas con formato Prometheus. El puerto por defecto es `9090`. En entornos contenedorizados, `%%host%%` debe utilizarse para la [detección automática de hosts](https://docs.datadoghq.com/agent/kubernetes/integrations/).

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

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kubeflow` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kubeflow.katib.controller.reconcile.count** <br>(count) | Número de bucles de conciliación ejecutados por el controlador de Katib|
| **kubeflow.katib.controller.reconcile.duration.seconds.bucket** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de Katib (bucket)|
| **kubeflow.katib.controller.reconcile.duration.seconds.count** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de Katib (count)|
| **kubeflow.katib.controller.reconcile.duration.seconds.sum** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de Katib (sum)<br>_Se muestra como segundo_ |
| **kubeflow.katib.experiment.created.count** <br>(count) | Número total de experimentos creados|
| **kubeflow.katib.experiment.duration.seconds.bucket** <br>(count) | Duración de los experimentos desde su inicio hasta su finalización (bucket)|
| **kubeflow.katib.experiment.duration.seconds.count** <br>(count) | Duración de los experimentos desde el inicio hasta la finalización (count)|
| **kubeflow.katib.experiment.duration.seconds.sum** <br>(count) | Duración de los experimentos desde el inicio hasta la finalización (sum)<br>_Se muestra como segundo_ |
| **kubeflow.katib.experiment.failed.count** <br>(count) | Número de experimentos que han fracasado|
| **kubeflow.katib.experiment.running.total** <br>(gauge) | Número de experimentos en curso actualmente|
| **kubeflow.katib.experiment.succeeded.count** <br>(count) | Número de experimentos realizados con éxito|
| **kubeflow.katib.suggestion.created.count** <br>(count) | Número total de sugerencias|
| **kubeflow.katib.suggestion.duration.seconds.bucket** <br>(count) | Duración de los procesos de sugerencia desde su inicio hasta su finalización (bucket)|
| **kubeflow.katib.suggestion.duration.seconds.count** <br>(count) | Duración de los procesos de sugerencia desde el inicio hasta la finalización (count)|
| **kubeflow.katib.suggestion.duration.seconds.sum** <br>(count) | Duración de los procesos de sugerencia desde el inicio hasta la finalización (sum)<br>_Se muestra como segundo_ |
| **kubeflow.katib.suggestion.failed.count** <br>(count) | Número de sugerencias que han fracasado|
| **kubeflow.katib.suggestion.running.total** <br>(gauge) | Número de sugerencias en procesamiento actualmente|
| **kubeflow.katib.suggestion.succeeded.count** <br>(count) | Número de sugerencias que han concluido con éxito|
| **kubeflow.katib.trial.created.count** <br>(count) | Número total de ensayos creados|
| **kubeflow.katib.trial.duration.seconds.bucket** <br>(count) | Duración de los ensayos desde el inicio hasta la finalización (bucket)|
| **kubeflow.katib.trial.duration.seconds.count** <br>(count) | Duración de los ensayos desde el inicio hasta la finalización (count)|
| **kubeflow.katib.trial.duration.seconds.sum** <br>(count) | Duración de los ensayos desde el inicio hasta la finalización (sum)<br>_Se muestra como segundo_ |
| **kubeflow.katib.trial.failed.count** <br>(count) | Número de ensayos que han fracasado|
| **kubeflow.katib.trial.running.total** <br>(calibre) | Número de ensayos en curso actualmente|
| **kubeflow.katib.trial.succeeded.count** <br>(count) | Número de ensayos que han concluido con éxito|
| **kubeflow.kserve.inference.duration.seconds.bucket** <br>(count) | Duración de las solicitudes de inferencia (bucket)|
| **kubeflow.kserve.inference.duration.seconds.count** <br>(count) | Duración de las solicitudes de inferencia (count)|
| **kubeflow.kserve.inference.duration.seconds.sum** <br>(count) | Duración de las solicitudes de inferencia (sum)<br>_Se muestra como segundo_ |
| **kubeflow.kserve.inference.errors.count** <br>(count) | Número de errores encontrados durante la inferencia|
| **kubeflow.kserve.inference.request.bytes.bucket** <br>(count) | Tamaño de las cargas útiles de las solicitudes de inferencia (bucket)|
| **kubeflow.kserve.inference.request.bytes.count** <br>(count) | Tamaño de las cargas útiles de las solicitudes de inferencia (count)|
| **kubeflow.kserve.inference.request.bytes.sum** <br>(count) | Tamaño de las cargas útiles de las solicitudes de inferencia (sum)<br>_Se muestra como byte_ |
| **kubeflow.kserve.inference.response.bytes.bucket** <br>(count) | Tamaño de las cargas útiles de la respuesta de inferencia (bucket)|
| **kubeflow.kserve.inference.response.bytes.count** <br>(count) | Tamaño de las cargas útiles de la respuesta de inferencia (count)|
| **kubeflow.kserve.inference.response.bytes.sum** <br>(count) | Tamaño de las cargas útiles de la respuesta de inferencia (sum)<br>_Se muestra como byte_ |
| **kubeflow.kserve.inferences.count** <br>(count) | Número total de inferencias realizadas|
| **kubeflow.notebook.server.created.count** <br>(count) | Número total de servidores de notebook creados|
| **kubeflow.notebook.server.failed.count** <br>(count) | Número de servidores de notebook que han fallado|
| **kubeflow.notebook.server.reconcile.count** <br>(count) | Número de bucles de conciliación ejecutados por el controlador de notebook|
| **kubeflow.notebook.server.reconcile.duration.seconds.bucket** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de notebook (bucket)|
| **kubeflow.notebook.server.reconcile.duration.seconds.count** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de notebook (count)|
| **kubeflow.notebook.server.reconcile.duration.seconds.sum** <br>(count) | Duración de los bucles de conciliación ejecutados por el controlador de notebook (sum)<br>_Se muestra como segundo_ |
| **kubeflow.notebook.server.running.total** <br>(gauge) | Número de servidores de notebook en ejecución actualmente|
| **kubeflow.notebook.server.succeeded.count** <br>(count) | Número de servidores de notebook que han completado con éxito|
| **kubeflow.pipeline.run.duration.seconds.bucket** <br>(count) | Duración de ejecuciones de pipeline (bucket)|
| **kubeflow.pipeline.run.duration.seconds.count** <br>(count) | Duración de las ejecuciones de pipeline (count)|
| **kubeflow.pipeline.run.duration.seconds.sum** <br>(count) | Duración de las ejecuciones de pipeline (sum)<br>_Se muestra como segundo_ |
| **kubeflow.pipeline.run.status** <br>(gauge) | Estado de las ejecuciones de pipeline|

### Eventos

La integración Kubeflow no incluye eventos.

### Checks de servicio

**kubeflow.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de Kubeflow OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).