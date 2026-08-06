---
app_id: fluxcd
categories:
- kubernetes
- herramientas de desarrollo
custom_kind: integración
description: Integración de Fluxcd con openmetric v2
further_reading:
- link: https://www.datadoghq.com/blog/container-native-integrations/#cicd-with-flux
  tag: blog
  text: 'Resumen de la integración: Monitorización de las tecnologías nativas de contenedores'
integration_version: 3.0.0
media: []
supported_os:
- linux
- windows
- macOS
title: fluxcd
---
## Información general

Este check monitoriza [Flux](https://fluxcd.io/) a través del Datadog Agent. Flux es un conjunto de soluciones de entrega continua y progresiva para Kubernetes que es abierto y extensible.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir de la versión 7.51.0 del Agent, el check de Fluxcd está incluido en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

Para versiones anteriores del Agent, [sigue estos steps (UI) / pasos (generic) para instalar](https://docs.datadoghq.com/agent/guide/use-community-integrations/?tab=agentv721v621#installation) la integración.

### Configuración

Esta integración admite la recopilación de métricas y logs de los siguientes servicios Flux:

- `helm-controller`
- `kustomize-controller`
- `notification-controller`
- `source-controller`

Puedes elegir qué servicios monitorizar en función de tus necesidades.

#### Recopilación de métricas

Este es un ejemplo de configuración con anotaciones Kubernetes en tus pods de Flux. Consulta el [archivo de configuración de ejemplo](https://github.com/DataDog/integrations-core/blob/7.51.x/fluxcd/datadog_checks/fluxcd/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/manager.checks: |-
      {
        "fluxcd": {
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:8080/metrics"
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'manager'
# (...)
```

#### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de Flux pueden recopilarse de los distintos pods de Flux a través de Kubernetes. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent . Para activarla, consultea [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

Consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro      | Valor                                                   |
| -------------- | ------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "fluxcd", "service": "<SERVICE_NAME>"}`  |

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `fluxcd` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fluxcd.controller.runtime.active.workers** <br>(gauge) | Número de trabajadores utilizados actualmente por controlador.<br>_Mostrado como trabajador_ |
| **fluxcd.controller.runtime.max.concurrent.reconciles** <br>(gauge) | Número máximo de reconciliaciones concurrentes por controlador.|
| **fluxcd.controller.runtime.reconcile.count** <br>(count) | Número total de conciliaciones por controlador.|
| **fluxcd.controller.runtime.reconcile.errors.count** <br>(count) | Número total de errores de reconciliación por controlador.<br>_Mostrado como error_ |
| **fluxcd.controller.runtime.reconcile.time.seconds.bucket** <br>(count) | Bucket de la duración de cada reconciliación por controlador.|
| **fluxcd.controller.runtime.reconcile.time.seconds.count** <br>(count) | Count de la duración de cada reconciliación por controlador.|
| **fluxcd.controller.runtime.reconcile.time.seconds.sum** <br>(count) | Suma de la duración de cada reconciliación por controlador.<br>_Mostrado como segundo_ |
| **fluxcd.gotk.reconcile.condition** <br>(gauge) | El estado actual de una reconciliación de recursos de GitOps Toolkit.|
| **fluxcd.gotk.reconcile.duration.seconds.bucket** <br>(count) | Bucket de la duración en segundos de una reconciliación de recursos de GitOps Toolkit.|
| **fluxcd.gotk.reconcile.duration.seconds.count** <br>(count) | Count de la duración en segundos de una reconciliación de recursos de GitOps Toolkit.|
| **fluxcd.gotk.reconcile.duration.seconds.sum** <br>(count) | Suma de la duración en segundos de una reconciliación de recursos de GitOps Toolkit.<br>_Mostrado como segundo_ |
| **fluxcd.gotk.suspend.status** <br>(gauge) | El estado de suspensión actual de un recurso de GitOps Toolkit.|
| **fluxcd.leader_election_master_status** <br>(gauge) | Indica si el sistema de informes es el contrato de arrendamiento maestro en cuestión. 0 indica copia de seguridad, 1 indica maestro. 'nombre' es la cadena utilizada para identificar el contrato. Asegúrate de agrupar por nombre.|
| **fluxcd.process.cpu_seconds.count** <br>(count) | Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Mostrado como segundo_ |
| **fluxcd.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos.|
| **fluxcd.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos.|
| **fluxcd.process.resident_memory** <br>(gauge) | Tamaño de la memoria residente en bytes.<br>_Mostrado como byte_ |
| **fluxcd.process.start_time** <br>(gauge) | Hora de inicio del proceso desde la época unix en segundos.<br>_Mostrado como segundo_ |
| **fluxcd.process.virtual_memory** <br>(gauge) | Tamaño de la memoria virtual en bytes.<br>_Mostrado como byte_ |
| **fluxcd.process.virtual_memory.max** <br>(gauge) | Cantidad máxima de memoria virtual disponible en bytes.<br>_Mostrado como byte_ |
| **fluxcd.rest_client_requests.count** <br>(count) | Número de solicitudes HTTP, divididas por código de estado, método y host.<br>_Mostrado como solicitud_ |
| **fluxcd.workqueue.adds.count** <br>(count) | Número total de adiciones gestionadas por una cola de trabajo.|
| **fluxcd.workqueue.depth** <br>(gauge) | Profundidad actual de una cola de trabajo.|
| **fluxcd.workqueue.longest_running_processor** <br>(gauge) | El número de segundos que tiene el procesador en ejecución más largo para una cola de trabajo que se ha estado ejecutando.<br>_Mostrado como segundo_ |
| **fluxcd.workqueue.retries.count** <br>(count) | Número total de reintentos gestionados por la cola de trabajo.|
| **fluxcd.workqueue.unfinished_work** <br>(gauge) | El número de segundos de trabajo realizado que está en curso y no ha sido observado por duración_trabajo. Los valores grandes indican subprocesos atascados. Se puede deducir el número de subprocesos atascados observando la velocidad a la que aumenta.<br>_Mostrado como segundo_ |

### Eventos

La integración de fluxcd no incluye eventos.

### Checks de servicio

**fluxcd.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de OpenMetrics de Fluxcd.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de las tecnologías nativas de contenedores](https://www.datadoghq.com/blog/container-native-integrations/#cicd-with-flux)
- [Monitorización del estado y el rendimiento de tus pipelines nativos de contenedores de Continuous Integration Continuous Delivery ](https://www.datadoghq.com/blog/container-native-ci-cd-integrations/)