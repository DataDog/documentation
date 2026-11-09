---
description: Haga un seguimiento de la latencia, el rendimiento y el estado de sus
  implementaciones de modelos junto con las GPU en las que se ejecutan.
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
title: Haga un seguimiento de las cargas de trabajo de inferencia con GPU Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-tracing/" >}}
La optimización de cargas de trabajo de inferencia con Continuous Tracing with GPU Monitoring se encuentra en vista previa de acceso anticipado. Complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

Las cargas de trabajo de inferencia sirven tráfico en vivo, por lo que las respuestas lentas y los errores afectan directamente a sus usuarios. Las GPU subutilizadas también aumentan los costos de servicio. La página Inference de GPU Monitoring muestra el rendimiento de cada implementación de modelo junto con el estado de las GPU en las que se ejecuta. Sus equipos de MLOps, plataforma e ingeniería de ML pueden encontrar y solucionar problemas de servicio en un solo lugar.

Con la página Inference, obtiene:

- **Latencia y rendimiento en las implementaciones de modelos**: Compare el tiempo hasta el primer token (TTFT), la latencia entre tokens (ITL) y los tokens de salida por segundo en sus implementaciones de modelos, y filtre por entorno, implementación o espacio de nombres de Kubernetes.
- **Estado de la implementación de un vistazo**: Revise el promedio de solicitudes simultáneas, la tasa de errores, el estado de salud, los seguimientos y el uso de caché de clave-valor (KV) de GPU de cada implementación de modelo para identificar qué implementaciones necesitan atención.

{{< img src="gpu_monitoring/inference-page2.png" alt="Página Inference de GPU Monitoring que muestra métricas clave para una implementación de modelo determinada, como el tiempo hasta el primer token y los tokens de salida." style="width:100%;" >}}

## Configuración {#setup}

El seguimiento de inferencia admite [vLLM][1] como motor de inferencia en las siguientes implementaciones: independiente, con NVIDIA Dynamo como enrutador de inferencia o en Ray. No se admiten otros motores de inferencia ni enrutadores. Para solicitar soporte para ellos, comuníquese con su representante de Datadog.

Seleccione la pestaña que coincida con su implementación:

{{< tabs >}}
{{% tab "vLLM independiente" %}}

La configuración utiliza la integración de vLLM, que recopila métricas del motor.

### Requisitos previos {#prerequisites}

Para comenzar a monitorear sus cargas de trabajo de inferencia, debe cumplir con los siguientes criterios:
- Tiene [GPU Monitoring habilitado][1].
- Está ejecutando la imagen del Agent de inferencia (`7.85.0-rc.5`).
- Sus cargas de trabajo de inferencia se ejecutan en Kubernetes.
- Usted está sirviendo modelos con vLLM.

### 0. Habilite GPU Monitoring {#0-enable-gpu-monitoring}

Si aún no lo ha hecho, [configure GPU Monitoring][1] en sus hosts de GPU. Los siguientes pasos requieren que GPU Monitoring esté habilitado.

### 1. Use la imagen del Agent de inferencia {#1-use-the-inference-agent-image}

La imagen del Agent de inferencia incluye la verificación de vLLM, por lo que no necesita instalar la integración de vLLM por separado.

Combine la siguiente configuración en el recurso `DatadogAgent` existente. Mantenga sus credenciales, sitio y otras funciones existentes sin cambios:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Para usar una imagen de Agent completa o habilitada para JMX, establezca `tag` en `7.85.0-rc.5-jmx` o `7.85.0-rc.5-full`.

Aplique el recurso y espere a que se despliegue el DaemonSet del Agent:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirme el punto de conexión de métricas y el puerto {#2-confirm-the-metrics-endpoint-and-port}

La integración de vLLM recopila métricas del siguiente punto de conexión:

| Destino | Punto de conexión | Integración | Métricas |
|--------|----------|-------------|---------|
| Servidor vLLM | `:8000/metrics` | vLLM | `vllm.*` |

vLLM sirve métricas en el mismo puerto que su servidor de API compatible con OpenAI, que es `8000` de forma predeterminada. Si inicia vLLM con un `--port` diferente, sustitúyalo en la anotación del paso 3.

### 3. Configure la integración {#3-configure-the-integration}

Agregue la siguiente [anotación de Autodiscovery][2] a cada plantilla de pod de vLLM. En la clave de anotación, reemplace `<VLLM_CONTAINER_NAME>` con el valor del campo `name` del contenedor en `spec.template.spec.containers[]`, no con el nombre de la imagen:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<VLLM_CONTAINER_NAME>.checks: |-
      {
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

Reemplace `<SERVICE_NAME>` con un nombre para su despliegue de modelo, como `inference-vllm-glm5.3`. La página Inference agrupa las métricas por `service`.

Aplique los recursos de carga de trabajo actualizados y vuelva a crear los pods para que Autodiscovery detecte las nuevas anotaciones.

### 4. Verifique la configuración {#4-verify-setup}

Utilice dos terminales para confirmar que el punto de conexión de vLLM responde y que el Agent ejecuta la verificación. Ejecute el reenvío de puertos en el espacio de nombres de Kubernetes de su carga de trabajo, o agregue `-n <WORKLOAD_NAMESPACE>` si difiere de su espacio de nombres actual.

**Terminal 1**: Reenvíe el punto de conexión de métricas de vLLM y déjelo ejecutándose.

```shell
kubectl port-forward pod/<VLLM_POD> 18000:8000
```

**Terminal 2**: Verifique el punto de conexión y la verificación del Agent.

```shell
# Show vLLM metrics from the endpoint
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Look for "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Cuando termine, presione **Ctrl+C** en la terminal 1 para detener el reenvío.

Después de completar la configuración, Datadog recopila `vllm.*` métricas de sus pods de vLLM.

Si no aparecen métricas, envíe tráfico de inferencia a su despliegue. vLLM emite algunas métricas solo después de atender la primera solicitud.

### 5. Habilite los percentiles en sus métricas {#5-enable-percentiles-on-your-metrics}

Para graficar percentiles en ciertas métricas de vLLM, debe optar por la [funcionalidad de consulta avanzada][3] en las siguientes métricas de distribución:

| Métrica |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.time_per_output_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Habilite el rastreo de GPU (opcional) {#6-enable-gpu-tracing-optional}

Para correlacionar las solicitudes de inferencia con la actividad de la GPU, configure [Continuous Tracing with GPU Monitoring][4] y etiquete sus cargas de trabajo de vLLM. Continuous Tracing requiere CUDA y la versión 13 o posterior de CUDA Profiling Tools Interface (CUPTI).

[1]: /es/gpu_monitoring/setup
[2]: /es/containers/kubernetes/integrations/?tab=annotations
[3]: /es/metrics/distributions/#enabling-advanced-query-functionality
[4]: /es/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM con Dynamo" %}}

La configuración utiliza dos integraciones. La integración de Dynamo recopila métricas de tiempo de ejecución del frontend y del trabajador, y la integración de vLLM recopila métricas del motor.

### Requisitos previos {#prerequisites-1}

Para comenzar a monitorear sus cargas de trabajo de inferencia, debe cumplir con los siguientes criterios:
- Tiene [GPU Monitoring habilitado][1].
- Está ejecutando la imagen del Agent de inferencia (`7.85.0-rc.5`).
- Sus cargas de trabajo de inferencia se ejecutan en Kubernetes.
- Está sirviendo modelos con trabajadores de vLLM en un despliegue de NVIDIA Dynamo.

### 0. Habilite GPU Monitoring {#0-enable-gpu-monitoring-1}

Si aún no lo ha hecho, [configure GPU Monitoring][1] en sus hosts de GPU. Los siguientes pasos requieren que GPU Monitoring esté habilitado.

### 1. Use la imagen del Agent de inferencia {#1-use-the-inference-agent-image-1}

La imagen del Agent de inferencia incluye las verificaciones de Dynamo y vLLM, por lo que no necesita instalar ninguna de las integraciones por separado.

Combine la siguiente configuración en el recurso `DatadogAgent` existente. Mantenga sus credenciales, sitio y otras funciones existentes sin cambios:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Para usar una imagen de Agent completa o habilitada para JMX, establezca `tag` en `7.85.0-rc.5-jmx` o `7.85.0-rc.5-full`.

Aplique el recurso y espere a que se despliegue el DaemonSet del Agent:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirme los puntos de conexión y los puertos de las métricas {#2-confirm-the-metrics-endpoints-and-ports}

Las integraciones recopilan métricas de los siguientes puntos de conexión:

| Destino | Punto de conexión | Integración | Métricas |
|--------|----------|-------------|---------|
| Frontend de Dynamo | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Trabajador de Dynamo | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| Motor de vLLM | `:9090/metrics` | vLLM | `vllm.*` |

De forma predeterminada, el trabajador de Dynamo y el motor de vLLM comparten un punto de conexión. Dynamo expone las métricas del motor de vLLM a través del punto de conexión de métricas del trabajador, y cada integración recopila sus propias métricas de ese punto de conexión.

<div class="alert alert-info">Si su despliegue ejecuta el motor de vLLM por separado del worker de Dynamo, como en un sidecar, el worker y el motor exponen las métricas en puntos de conexión separados. En este caso, dirija la <code>dynamo</code> verificación al punto de conexión de métricas del worker y la <code>vllm</code> verificación al punto de conexión de métricas del motor en el paso 3.</div>

El operador de Kubernetes de Dynamo establece `DYN_SYSTEM_PORT=9090` de forma predeterminada. Si inicia un worker directamente, establezca el puerto explícitamente:

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

Si sus workers utilizan un puerto distinto a `9090`, sustitúyalo en la anotación del worker en el paso 3.

### 3. Configure las integraciones {#3-configure-the-integrations}

Agregue las siguientes [anotaciones de Autodiscovery][2] a las plantillas de pod de carga de trabajo correspondientes. En cada clave de anotación, reemplace el marcador de posición con el valor del campo `name` del contenedor en `spec.template.spec.containers[]`, no con el nombre de la imagen.

Agregue la siguiente anotación a la plantilla de pod del frontend de Dynamo:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<FRONTEND_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics"
          }]
        }
      }
```

Reemplace `<SERVICE_NAME>` con un nombre para su despliegue de modelo, como `inference-vllm-glm5.3`. La página Inference agrupa las métricas por `service`.

Agregue la siguiente anotación a cada plantilla de pod de worker de vLLM. Ambas integraciones utilizan el punto de conexión de métricas del worker en el puerto `9090`:

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<WORKER_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

Aplique los recursos de carga de trabajo actualizados y vuelva a crear los pods para que Autodiscovery detecte las nuevas anotaciones.

### 4. Verifique la configuración {#4-verify-setup-1}

Utilice tres terminales para confirmar que cada punto de conexión responde y que el Agent ejecuta ambas verificaciones. Ejecute los reenvíos de puertos en el namespace de Kubernetes de sus cargas de trabajo, o agregue `-n <WORKLOAD_NAMESPACE>` si es diferente a su namespace actual.

**Terminal 1**: Reenvíe el punto de conexión de métricas del frontend y déjelo ejecutándose.

```shell
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
```

**Terminal 2**: Reenvíe el punto de conexión de métricas del worker y déjelo ejecutándose. Si su worker utiliza un puerto de métricas diferente, reemplace `9090` con ese puerto.

```shell
kubectl port-forward pod/<WORKER_POD> 19090:9090
```

**Terminal 3**: Verifique ambos puntos de conexión y las verificaciones del Agent.

```shell
# Show the first ten lines of frontend metrics
curl -fsS http://localhost:18000/metrics | sed -n '1,10p'

# Show Dynamo and vLLM metrics from the worker
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Look for "dynamo" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Confirme que la salida del worker incluya los nombres de métricas `dynamo_` y `vllm:`, y que el estado del Agent enumere ambas verificaciones. Cuando termine, presione **Ctrl+C** en las terminales 1 y 2 para detener el reenvío.

Después de completar la configuración, Datadog recopila lo siguiente:
- `dynamo.frontend.*` métricas de los pods de frontend
- `dynamo.component.*` métricas de los pods de worker
- `vllm.*` métricas de los pods de worker

Si no aparecen métricas, envíe tráfico de inferencia a su despliegue. Dynamo y vLLM emiten algunas métricas solo después de atender la primera solicitud.

### 5. Habilite los percentiles en sus métricas {#5-enable-percentiles-on-your-metrics-1}

Para graficar percentiles en ciertas métricas de vLLM y Dynamo, debe optar por la [funcionalidad de consulta avanzada][3] en las siguientes métricas de distribución:

| Métrica |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Habilite el rastreo de GPU (opcional) {#6-enable-gpu-tracing-optional-1}

Para correlacionar las solicitudes de inferencia con la actividad de la GPU, configure [Continuous Tracing with GPU Monitoring][4] y etiquete sus cargas de trabajo de worker de vLLM. Continuous Tracing requiere CUDA y la versión 13 o posterior de CUDA Profiling Tools Interface (CUPTI).

[1]: /es/gpu_monitoring/setup
[2]: /es/containers/kubernetes/integrations/?tab=annotations
[3]: /es/metrics/distributions/#enabling-advanced-query-functionality
[4]: /es/gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM con Ray" %}}

La configuración utiliza dos integraciones. La [integración de Ray][5] recopila métricas del clúster de Ray, y la [integración de vLLM][6] recopila métricas del motor.

### Requisitos previos {#prerequisites-2}

Para comenzar a monitorear sus cargas de trabajo de inferencia, debe cumplir con los siguientes criterios:
- Tiene [GPU Monitoring habilitado][1] con la imagen del Agent de inferencia (`7.85.0-rc.5`).
- Sus cargas de trabajo de inferencia se ejecutan en Kubernetes, con clústeres de Ray administrados por KubeRay.
- Está sirviendo modelos con vLLM dentro de Ray, por ejemplo con Ray Serve.

### 1. Utilice la imagen del Agent de inferencia {#1-use-the-inference-agent-image-2}

La imagen del Agent de inferencia incluye tanto las verificaciones de Ray como las de vLLM, por lo que no necesita instalar ninguna integración por separado.

Combine la siguiente configuración en el recurso `DatadogAgent` existente. Mantenga sus credenciales, sitio y otras funciones existentes sin cambios:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

Para usar una imagen de Agent completa o habilitada para JMX, establezca `tag` en `7.85.0-rc.5-jmx` o `7.85.0-rc.5-full`.

Aplique el recurso y espere a que se despliegue el DaemonSet del Agent:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirme el punto de conexión de métricas y el puerto {#2-confirm-the-metrics-endpoint-and-port-1}

Cuando vLLM se ejecuta dentro de Ray, no ofrece su propio punto de conexión de métricas. En su lugar, vLLM registra las métricas de su motor a través de Ray, y cada nodo de Ray las publica con un prefijo `ray_vllm_` en el mismo punto de conexión que las métricas propias de Ray. Las integraciones de Ray y vLLM recopilan datos de ese punto de conexión.

Los ejemplos utilizan el puerto `8080`, el puerto establecido por `--metrics-export-port` cuando se inicia Ray. Si sus nodos de Ray utilizan un puerto diferente, reemplace `8080` en la anotación del paso 3.

### 3. Configure las integraciones {#3-configure-the-integrations-1}

Agregue la siguiente [anotación de Autodiscovery][2] a la plantilla de pod de cada grupo de workers de KubeRay que ejecute vLLM. En un recurso `RayCluster` o `RayService`, las plantillas de pod están bajo `workerGroupSpecs[].template`. En la clave de anotación, reemplace `<RAY_CONTAINER_NAME>` con el valor del campo `name` del contenedor de Ray, no con el nombre de la imagen.

La integración de vLLM utiliza `extra_metrics` para asignar cada métrica `ray_vllm_` al nombre que utiliza la página Inference:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<RAY_CONTAINER_NAME>.checks: |-
      {
        "ray": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true,
            "exclude_metrics": ["python_.+", "process_.+"],
            "exclude_labels": ["WorkerId", "SessionName", "otel_scope_name", "otel_scope_schema_url", "otel_scope_version"],
            "extra_metrics": [{
              "ray_vllm_time_to_first_token_seconds": "time_to_first_token.seconds",
              "ray_vllm_e2e_request_latency_seconds": "e2e_request_latency.seconds",
              "ray_vllm_request_prompt_tokens": "request.prompt_tokens",
              "ray_vllm_request_generation_tokens": "request.generation_tokens",
              "ray_vllm_request_params_n": "request.params.n",
              "ray_vllm_prompt_tokens": "prompt_tokens",
              "ray_vllm_generation_tokens": "generation_tokens",
              "ray_vllm_request_success": "request.success",
              "ray_vllm_request_decode_time_seconds": "request.decode_time.seconds",
              "ray_vllm_request_prefill_time_seconds": "request.prefill_time.seconds",
              "ray_vllm_request_queue_time_seconds": "request.queue_time.seconds",
              "ray_vllm_request_prefill_kv_computed_tokens": "request.prefill_kv_computed_tokens",
              "ray_vllm_prompt_tokens_cached": "prompt_tokens.cached"
            }]
          }]
        }
      }
```

Reemplace `<SERVICE_NAME>` con un nombre para su despliegue de modelo, como `inference-vllm-glm5.3`. La página Inference agrupa las métricas por `service`.

En la instancia `vllm`:
- La opción `exclude_metrics` omite las métricas de Python y de proceso en el punto de conexión de Ray, las cuales describen los procesos de Ray en lugar del motor de vLLM.
- La opción `exclude_labels` descarta las etiquetas de Ray que cambian cada vez que se reinicia un worker o un clúster.

<div class="alert alert-info">Si su <code>ray</code> verificación ya recopila <code>ray_vllm_</code> métricas a través de <code>extra_metrics</code>, se envían dos veces: como <code>ray.ray_vllm_*</code> y como <code>vllm.*</code>. Elimine esos patrones de la <code>ray</code> verificación después de migrar cualquier panel y monitor que utilice los <code>ray.ray_vllm_*</code> nombres.</div>

Aplique los recursos de carga de trabajo actualizados. Con KubeRay, cambiar la plantilla de pod de un grupo de workers recrea los pods de worker. Para un `RayService`, KubeRay puede crear un nuevo clúster de Ray en su lugar, dependiendo de la estrategia de actualización.

### 4. Verifique la configuración {#4-verify-setup-2}

Use dos terminales para confirmar que el punto de conexión de Ray expone métricas de vLLM y que el Agent ejecuta ambas verificaciones. Ejecute el reenvío de puertos en el espacio de nombres de Kubernetes de su carga de trabajo, o agregue `-n <WORKLOAD_NAMESPACE>` si difiere de su espacio de nombres actual.

**Terminal 1**: Reenvíe el punto de conexión de métricas de Ray de un pod de worker y déjelo ejecutándose.

```shell
kubectl port-forward pod/<RAY_WORKER_POD> 18080:8080
```

**Terminal 2**: Verifique el punto de conexión y las verificaciones del Agent.

```shell
# Show vLLM metrics published by Ray
curl -fsS http://localhost:18080 | grep '^ray_vllm_'

# Look for "ray" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Cuando termine, presione **Ctrl+C** en la terminal 1 para detener el reenvío.

Después de completar la configuración, Datadog recopila lo siguiente:
- `ray.*` métricas de los pods de Ray
- `vllm.*` métricas de los pods de trabajador de Ray que ejecutan vLLM

Si no aparecen métricas, envíe tráfico de inferencia a su despliegue. vLLM emite algunas métricas solo después de atender la primera solicitud.

<div class="alert alert-info">Algunas versiones de vLLM no publican métricas de tipo gauge, como el número de solicitudes en ejecución y en espera o el uso de caché KV, a través de Ray. Si el punto de conexión no tiene <code>ray_vllm_num_requests_running</code> o <code>ray_vllm_kv_cache_usage_perc</code> métricas, las columnas <strong>Requests</strong> y <strong>GPU Cache</strong> en la página Inference permanecen vacías.</div>

### 5. Habilite los percentiles en sus métricas {#5-enable-percentiles-on-your-metrics-2}

Para graficar percentiles en ciertas métricas de vLLM, debe optar por la [funcionalidad de consulta avanzada][3] en las siguientes métricas de distribución:

| Métrica |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Habilite el seguimiento de GPU (opcional) {#6-enable-gpu-tracing-optional-2}

Para correlacionar las solicitudes de inferencia con la actividad de la GPU, configure [Continuous Tracing with GPU Monitoring][4] y etiquete sus cargas de trabajo de trabajadores de Ray. Continuous Tracing requiere CUDA y la versión 13 o posterior de CUDA Profiling Tools Interface (CUPTI).

[1]: /es/gpu_monitoring/setup
[2]: /es/containers/kubernetes/integrations/?tab=annotations
[3]: /es/metrics/distributions/#enabling-advanced-query-functionality
[4]: /es/gpu_monitoring/tracing
[5]: /es/integrations/ray/
[6]: /es/integrations/vllm/

{{% /tab %}}
{{< /tabs >}}

## Explore la página Inference {#explore-the-inference-page}

Para comenzar, vaya a la [página Inference][2] en GPU Monitoring.

### Filtre las implementaciones de modelos {#filter-model-deployments}

Utilice la barra de búsqueda en la parte superior de la página para buscar implementaciones de modelos, modelos, motores o espacios de nombres. También puede filtrar por {{< ui >}}Env{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}} y {{< ui >}}Kube Namespace{{< /ui >}} o hacer clic en {{< ui >}}Filter{{< /ui >}} para añadir otros filtros.

### Comprenda la latencia y el rendimiento {#understand-latency-and-throughput}

Los gráficos en la parte superior de la página muestran la latencia y el rendimiento de sus implementaciones de modelos:

| Gráfico | Descripción |
|-------|-------------|
| Time to First Token | Tiempo desde que se recibe una solicitud hasta que se genera el primer token de salida. |
| Inter-Token Latency | Tiempo entre tokens de salida consecutivos. |
| Output Tokens | Tokens de salida generados por segundo. |

Un pico en el tiempo hasta el primer token o en la latencia entre tokens para una implementación, sin un cambio correspondiente en las demás, apunta a un problema con esa implementación en lugar de con la infraestructura compartida.

### Revise el estado de la implementación del modelo {#review-model-deployment-health}

La tabla en la parte inferior de la página enumera cada implementación de modelo con su motor de inferencia, entorno y espacio de nombres de Kubernetes, junto con las siguientes columnas:

| Columna | Descripción |
|--------|-------------|
| Output Tok/s | Tokens de salida generados por segundo. |
| Requests | Promedio de solicitudes en ejecución simultánea para el período de tiempo seleccionado. |
| TTFT | Tiempo hasta el primer token. |
| ITL | Latencia entre tokens. |
| Error Rate | Porcentaje de solicitudes que devuelven un error. |
| Health | Estado de la implementación, como {{< ui >}}Warning{{< /ui >}} o {{< ui >}}Critical{{< /ui >}}. |
| Monitors | Monitores asociados con la implementación. |
| GPU Cache | Uso de caché KV de GPU. |

Haga clic en {{< ui >}}Column Settings{{< /ui >}} para elegir qué columnas mostrar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/vllm/
[2]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring