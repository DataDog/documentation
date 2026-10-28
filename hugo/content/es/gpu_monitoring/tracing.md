---
description: Habilite la traza de la actividad de la GPU para cargas de trabajo de
  Kubernetes seleccionadas.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentación
  text: Configure el seguimiento de GPU
- link: /gpu_monitoring
  tag: ¿Qué es el seguimiento de GPU?
  text: Obtenga más información sobre lo que ofrece el seguimiento de GPU
is_beta: true
private: true
title: Traza continua con seguimiento de GPU
---
{{< beta-callout url="#" btn_hidden="true" >}}
La traza continua con seguimiento de GPU se encuentra en vista previa de acceso anticipado.
{{< /beta-callout >}}

## Descripción general {#overview}

La traza continua con seguimiento de GPU permite la traza ligera de la actividad de la GPU para cargas de trabajo de Kubernetes seleccionadas. La resolución de problemas de cargas de trabajo grandes y distribuidas puede ser engorrosa y llevar mucho tiempo. Con esta capacidad de traza en el seguimiento de GPU, puede identificar e investigar cuellos de botella utilizando trazas de ejecución detalladas que vinculan las operaciones de CUDA y NCCL con sus operaciones de modelo y PyTorch.

{{< img src="gpu_monitoring/gpu-tracing.png" alt="Vista de gráfico de llama de una traza de torch.step, que muestra tramos de CPU alineados con la actividad de flujo de la GPU, incluidas las operaciones allgather de NCCL y los lanzamientos de kernels de CUDA." style="width:100%;" >}}

## Configuración {#setup}

### Requisitos previos {#prerequisites}

Para comenzar a utilizar la traza continua en sus cargas de trabajo, primero debe cumplir con los siguientes criterios:
- Está ejecutando el Datadog Cluster Agent versión 7.80 o posterior con [GPU Monitoring habilitado][1].
- Versión mínima requerida de CUDA y CUPTI: 13.

### 1. Configure la traza de GPU {#1-configure-gpu-tracing}

Combine la siguiente configuración en el recurso `DatadogAgent` existente:

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
```

Aplique la configuración y espere a que se complete el despliegue de `DatadogAgent`.

### 2. Etiquete la carga de trabajo de GPU {#2-label-the-gpu-workload}

Agregue la etiqueta a la plantilla de pod del controlador. La carga de trabajo debe estar fuera del espacio de nombres del Agent. Para Jobs, utilice `spec.template.metadata.labels`. Para KubeRay, etiquete la plantilla de pod del Head y del Worker:

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
```

Aplique el recurso y espere a que se complete el despliegue.

### 3. Verifique la configuración {#3-verify-setup}

```shell
# Confirm setup containers completed
kubectl get pod <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{range .status.initContainerStatuses[*]}{.name}{" exit="}{.state.terminated.exitCode}{"\n"}{end}'

# Confirm the GPU tracing settings
kubectl exec <NEW_GPU_POD> -n <GPU_WORKLOAD_NAMESPACE> -- sh -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

**¿No hay contenedores de configuración?** Confirme que la etiqueta esté en la plantilla de pod, que el pod sea nuevo y que la carga de trabajo esté fuera del espacio de nombres del Agente. Luego, revise los registros del Cluster Agent.

### 4. Explore trazas {#4-explore-traces}

Ejecute la carga de trabajo y luego consulte [APM Trace Explorer][2] con:

```
pod_name:<NEW_GPU_POD> kube_namespace:<GPU_WORKLOAD_NAMESPACE>
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/gpu_monitoring/setup
[2]: /es/tracing/trace_explorer/