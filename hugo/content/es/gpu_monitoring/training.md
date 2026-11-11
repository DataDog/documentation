---
description: Solucione problemas de ejecuciones de entrenamiento detenidas o fallidas
  y maximice el rendimiento de sus cargas de trabajo de entrenamiento.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentación
  text: Configure el seguimiento de GPU
- link: /gpu_monitoring/tracing
  tag: Documentación
  text: Traza continua con seguimiento de GPU
- link: /gpu_monitoring
  tag: Documentación
  text: Obtenga más información sobre lo que ofrece el seguimiento de GPU
title: Optimice las cargas de trabajo de entrenamiento con Supervisión de GPU
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-training-obs/" >}}
La optimización de cargas de trabajo de entrenamiento con Supervisión de GPU se encuentra en vista previa de acceso anticipado. Complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Las cargas de trabajo de entrenamiento a menudo fallan, y cada falla desperdicia tiempo costoso de GPU. La depuración de cargas de trabajo de entrenamiento grandes y distribuidas puede llevar mucho tiempo a sus equipos de MLOps, plataforma e ingeniería de ML. La página de Entrenamiento en Supervisión de GPU le ayuda a solucionar problemas de cargas de trabajo detenidas y fallidas y a maximizar el rendimiento general de sus ejecuciones de entrenamiento. La página vincula cada ejecución de entrenamiento con el estado del hardware de GPU y la interconexión de red en la que se ejecutó.

Con la página de Entrenamiento, usted obtiene:

- **Análisis de causa raíz mediante agentes para cargas de trabajo de entrenamiento detenidas o fallidas**: Identifique con precisión por qué las cargas de trabajo de entrenamiento fallan o se ralentizan, ya sea que la causa sea hardware en mal estado, comunicación, ancho de banda de memoria o programación.
- **Optimización del rendimiento de la ejecución de entrenamiento**: Identifique las oportunidades de mayor impacto para aumentar el rendimiento en ejecuciones de entrenamiento exitosas.

{{< img src="gpu_monitoring/training-page.png" alt="Página de entrenamiento en Supervisión de GPU que muestra información sobre la ejecución del entrenamiento, un gráfico de barras de las ejecuciones a lo largo del tiempo y una lista de ejecuciones de entrenamiento." style="width:100%;" >}}

## Configuración {#setup}

### Requisitos previos {#prerequisites}

Para comenzar a monitorear sus cargas de trabajo de entrenamiento, primero debe cumplir con los siguientes criterios:
- Está ejecutando el Datadog Cluster Agent versión 7.80 o posterior con [GPU Monitoring habilitado][1].
- Está ejecutando CUDA y CUPTI versión 13 o posterior.

### 1. Conecte las ejecuciones de entrenamiento al hardware de GPU {#1-connect-training-runs-to-gpu-hardware}

Sus cargas de trabajo de Kubernetes pueden tener etiquetas o anotaciones que identifiquen una ejecución de entrenamiento o un grupo de ejecuciones. En este paso, usted agrega esos identificadores a las métricas de GPU como etiquetas, lo que vincula los datos de ejecución del entrenamiento directamente con el hardware de GPU en el que se ejecutó. El paso 2 agrega los mismos identificadores a los seguimientos.

Los siguientes ejemplos utilizan las anotaciones de pod `company.name/run-id` y `company.name/group-id`. Reemplácelas con las anotaciones que utilizan sus cargas de trabajo.

Para las métricas, utilice [tag extraction][2] para asignar las anotaciones a las etiquetas. Combine la siguiente configuración en el recurso `DatadogAgent` existente:

```yaml
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        company.name/run-id: training_run_id
        company.name/group-id: training_group_id
```

Para utilizar etiquetas de pod en lugar de anotaciones, utilice `kubernetesResourcesLabelsAsTags` para las métricas.

Después de aplicar esta configuración, las métricas de GPU se etiquetan con `training_run_id` y `training_group_id`.

### 2. Configure la traza de GPU {#2-configure-gpu-tracing}

Para habilitar la traza de GPU y añadir los identificadores de ejecución de entrenamiento y de grupo a las trazas, combine la siguiente configuración en el recurso DatadogAgent existente:

```yaml
spec:
  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceVersions:
              c: "0.20.0"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
              - name: DD_TRAINING_RUN_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/run-id']
              - name: DD_TRAINING_GROUP_ID
                valueFrom:
                  fieldRef:
                    fieldPath: metadata.annotations['company.name/group-id']
```

Para utilizar etiquetas de pod en lugar de anotaciones, establezca `metadata.labels['<LABEL_KEY>']` como `fieldPath` para las trazas.

Aplique la configuración y espere a que se complete el despliegue de `DatadogAgent`. Con esta configuración, las trazas de las cargas de trabajo que etiquete en el paso [Etiquete la carga de trabajo de GPU](#3-label-the-gpu-workload) se etiquetan con `training.run_id` y `training.group_id`.

### 3. Etiquete la carga de trabajo de GPU {#3-label-the-gpu-workload}

Añada la etiqueta `admission.datadoghq.com/gpu.enabled: "true"` a la plantilla de pod del controlador de su carga de trabajo, como un trabajo. La carga de trabajo debe ejecutarse fuera del espacio de nombres donde está implementado el Agent. Para los trabajos, añada la etiqueta bajo `spec.template.metadata.labels`:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Aplique el recurso y espere a que se complete el despliegue.

### 4. Verifique la configuración {#4-verify-setup}

Ejecute los siguientes comandos en un pod de GPU recién creado para confirmar la configuración:

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**¿No hay contenedores de configuración?** Confirme que la etiqueta está en la plantilla del pod, que el pod se creó después de aplicar la configuración y que la carga de trabajo se ejecuta fuera del espacio de nombres del Agent. Luego, revise los registros del Cluster Agent.

Después de completar la configuración, las métricas de GPU se etiquetan con `training_run_id` y `training_group_id`, y las trazas se etiquetan con `training.run_id` y `training.group_id`. Utilice estas etiquetas para filtrar las métricas y trazas de GPU para la misma ejecución de entrenamiento.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/gpu_monitoring/setup
[2]: /es/containers/kubernetes/tag/?tab=datadogoperator#tag-extraction