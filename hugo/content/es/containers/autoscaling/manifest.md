---
description: Configure los recursos personalizados DatadogPodAutoscaler en YAML para
  acceder a opciones que la interfaz de usuario de Datadog no expone.
further_reading:
- link: /containers/autoscaling/
  tag: Documentación
  text: Kubernetes Autoscaling
- link: /containers/guide/manage-datadogpodautoscaler-with-argocd/
  tag: Documentación
  text: '[Administrar DatadogPodAutoscaler con ArgoCD][12]'
- link: /containers/guide/manage-datdadogpodautoscaler-with-terraform/
  tag: Documentación
  text: '[Administrar DatadogPodAutoscaler con Terraform][13]'
title: Referencia del manifiesto de DatadogPodAutoscaler
---
El recurso personalizado `DatadogPodAutoscaler` (DPA) define el comportamiento de escalado automático para una sola carga de trabajo de Kubernetes. La [Autoscaling UI][1] con {{< ui >}}Export Recommendation{{< /ui >}} es un buen lugar para comenzar: configure una carga de trabajo y luego copie el manifiesto generado. Editar el manifiesto directamente le brinda acceso a todos los campos en la definición de recurso personalizado (CRD) y convierte al DPA en una parte normal de su flujo de trabajo GitOps, donde el manifiesto es la fuente revisada y versionada de la verdad.

Esta página cubre las opciones de configuración disponibles en el manifiesto. Los ejemplos en esta página utilizan la versión de API `datadoghq.com/v1alpha2`.

Para la configuración y los requisitos previos, consulte [Kubernetes Autoscaling][2]. Esa página cubre la habilitación del escalado automático de cargas de trabajo y el controlador de admisión en el Datadog Cluster Agent, las versiones requeridas del Agent y la habilitación del [escalado vertical in-place][3].

## Anatomía de un manifiesto {#anatomy-of-a-manifest}

El siguiente esqueleto anotado muestra la estructura de un `DatadogPodAutoscaler`. Todos los campos son opcionales excepto `targetRef`.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app                      # required: conventionally the workload name
  namespace: my-namespace           # required: must match the target workload
  annotations:                      # optional
    ad.datadoghq.com/tags: '{"team": "my-team"}'   # optional: tags on this DPA's telemetry
spec:
  owner: Local                      # optional: Local = this manifest is the source of truth (use for GitOps)
                                    # Remote = created and managed from the Datadog UI

  targetRef:                        # required: the workload being autoscaled - one DPA per workload
    apiVersion: apps/v1
    kind: Deployment
    name: my-app

  applyPolicy:                      # optional
    mode: Apply                     # Apply | Preview (Preview = compute recommendations, change nothing)

    scaleUp:                        # optional: horizontal, upward
      strategy: Max                 # Max | Min | Disabled
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent             # Percent | Pods
          value: 50
          periodSeconds: 120        # 1..3600

    scaleDown:                      # optional: horizontal, downward
      strategy: Max
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent
          value: 10
          periodSeconds: 1800

    update:                         # optional: vertical
      strategy: Auto                # Auto | Disabled | TriggerRollout
      # resizePendingPeriod: 600    # see Vertical rollout timing
      # rolloutFallbackDelay: 900   # see Vertical rollout timing

  constraints:                      # optional
    minReplicas: 3
    maxReplicas: 100
    containers:                     # optional: per-container vertical configuration
      - name: "*"                   # "*" matches all containers
        enabled: true
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits   # RequestsAndLimits | RequestsOnly
        minAllowed:
          cpu: "500m"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 8Gi

  objectives:                       # optional: configures horizontal scaling (also used by multidimensional). Exactly one entry.
    - type: ContainerResource       # PodResource | ContainerResource | CustomQuery
      containerResource:
        container: my-app
        name: cpu                   # cpu | memory
        value:
          type: Utilization         # Utilization | AbsoluteValue
          utilization: 65

  fallback:                         # optional: in-cluster horizontal fallback if recommendations go stale
    horizontal:
      enabled: true
      direction: ScaleUp            # ScaleUp | ScaleDown | All (default ScaleUp)
      triggers:
        staleRecommendationThresholdSeconds: 600   # 100..3600, default 600

  options:                          # optional
    burstable: false                # true = remove CPU limits, keep CPU request recommendations
    outOfMemory:
      bumpUpRatio: "1.2"            # +20% memory limit after an OOMKill (default)
```

### Cargas de trabajo de destino admitidas {#supported-target-workloads}

| `targetRef.kind` | `apiVersion` | Estado |
|---|---|---|
| `Deployment` | `apps/v1` | Admitido |
| `Rollout` (Argo Rollouts) | `argoproj.io/v1alpha1` | Admitido |
| `StatefulSet` | `apps/v1` | Admitido |

Para un Argo Rollout, apunte `targetRef` al Rollout en sí en lugar de a cualquier Deployment que gestione:

```yaml
  targetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: my-app
```

### Elija un modo de escalado {#choose-a-scaling-mode}

La combinación de `objectives` y `applyPolicy.update.strategy` determina si un DPA escala horizontalmente, verticalmente o ambos:

| `objectives` establecer | `applyPolicy.update.strategy` | Modo resultante |
|---|---|---|
| sí | `Disabled` (o sin establecer) | Solo horizontal |
| no | `Auto` | Solo vertical |
| sí | `Auto` | Multidimensional (ambos) |

## Restricciones del contenedor {#container-constraints}

La mayoría de las opciones verticales se expresan a través de `spec.constraints.containers[]`:

| Campo | Tipo | Predeterminado | Significado |
|---|---|---|---|
| `name` | cadena, **obligatorio** | - | Nombre del contenedor, o `"*"` para coincidir con cada contenedor que no tenga su propia entrada (consulte [Excluir un contenedor](#exclude-a-container)) |
| `enabled` | bool | `true` | `false` deshabilita el escalado automático de recursos para este contenedor |
| `controlledResources` | lista de `cpu`, `memory` | `[cpu, memory]` | qué recursos reciben recomendaciones verticales. Una lista vacía es equivalente a `enabled: false` |
| `controlledValues` | enum | `RequestsAndLimits` | Si las recomendaciones escriben tanto solicitudes _como_ límites, o solo solicitudes |
| `minAllowed` | mapa de recursos | - | Límite inferior para las solicitudes del contenedor |
| `maxAllowed` | mapa de recursos | - | Límite superior para las solicitudes del contenedor |

Si `constraints.containers` se omite por completo, el escalado de recursos se habilita para **todos** los contenedores, sin límites.

## Ajustar el tamaño de CPU y memoria {#right-size-cpu-and-memory}

Cuando un DPA combina escalado horizontal (`objectives`) con escalado vertical (`update.strategy: Auto`), el comportamiento predeterminado es producir recomendaciones verticales solo para **memoria**. Las solicitudes y límites de CPU se dejan intactos, y la condición `VerticalAbleToRecommend` puede mostrarse como `Unknown`.

Si un DPA ajusta el tamaño de la memoria mientras deja la CPU sin cambios, esta es la razón. No está relacionado con la preservación de la clase de Calidad de Servicio (QoS).

Use `controlledResources` para declarar qué recursos reciben recomendaciones verticales:

| `controlledResources` | Recomendaciones verticales producidas |
|---|---|
| sin configurar | solo memoria (predeterminado) |
| `[memory]` | solo memoria, igual que sin configurar |
| `[cpu, memory]` | **memoria y CPU** |
| `[cpu]` | solo CPU |

Ejemplo completo:

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto              # required - without it, nothing vertical is applied
  constraints:
    minReplicas: 3
    maxReplicas: 60
    containers:
      - name: "*"
        controlledResources:
          - cpu                   # opts CPU into vertical rightsizing
          - memory
        controlledValues: RequestsAndLimits
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

Esta función requiere Datadog Cluster Agent 7.78.0+. En versiones anteriores, el campo `controlledResources` es aceptado por el CRD pero no tiene efecto.

## Eliminar límites de CPU con modo Burstable {#remove-cpu-limits-with-burstable-mode}

Las recomendaciones de límite de CPU se derivan de los percentiles de uso sostenido durante un periodo de varios días. Un pico breve de calentamiento (por ejemplo, durante el inicio de la JVM) tiene poco efecto en esos percentiles, por lo que el límite de CPU recomendado puede ser demasiado bajo y causar que la aplicación sea limitada en el momento equivocado. La memoria no se ve afectada de la misma manera porque el uso máximo de memoria proporciona un techo confiable.

El modo Burstable **elimina los límites de CPU por completo** mientras sigue aplicando recomendaciones de _ solicitud_ de CPU:

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-java-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-java-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
  options:
    burstable: true
```

Si `options.burstable` se deja sin configurar, se aplica el valor predeterminado de clúster del Cluster Agent. Establézcalo explícitamente en `false` para excluir una sola carga de trabajo del comportamiento predeterminado.

Efecto en el pod:

| | Antes | Después |
|---|---|---|
| Solicitud de CPU | `1` | `400m` (recomendación) |
| Límite de CPU | `2` | **eliminado** |
| Solicitud de memoria | `500Mi` | `450Mi` (recomendación) |
| Límite de memoria | `2Gi` | `2Gi`, preservado |

Antes de habilitarlo:

- Los pods que tenían QoS **Garantizada** pasan a tener QoS **Burstable**. Esto cambia su prioridad de desalojo bajo presión del nodo.
- Sin un límite de CPU, un contenedor puede consumir la CPU disponible del nodo. Las cuotas de CPU del kernel siguen aplicándose.
- El modo Burstable **tiene prioridad sobre** `controlledValues` para los límites de CPU. Si ambos están configurados, gana el modo Burstable.

## Ajuste el incremento de memoria de OOMKill {#tune-the-oomkill-memory-bump}

Después de un OOMKill, el límite de memoria aumenta un 20 % en relación con el límite vigente en ese momento. El aumento se aplica de inmediato y se repite después de cada OOMKill posterior hasta que la carga de trabajo se estabiliza.

Para cambiar la proporción:

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

Escriba el valor entre comillas: es una cantidad de Kubernetes, no un número de punto flotante.

**Cuándo aumentarlo.** Aumente la proporción para cargas de trabajo cuyo uso de memoria pueda alcanzar picos drásticamente superiores a los picos anteriores. Un aumento mayor alcanza el límite de memoria correcto más rápido y evita varios aumentos sucesivos antes de que la carga de trabajo se estabilice. Cuando lo aumente, establezca también un `minAllowed` límite mínimo de memoria (consulte [Establecer límites por contenedor](#set-per-container-bounds)) para que el límite no pueda caer por debajo de un valor seguro entre ciclos de recomendación.

## Ajustar solo las solicitudes al tamaño correcto {#right-size-requests-only}

Si ha ajustado deliberadamente los límites (para el margen de maniobra de ráfagas, un requisito de la plataforma o una garantía de QoS) y desea que Datadog ajuste solo las **solicitudes** al tamaño correcto, use `controlledValues: RequestsOnly`.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsOnly     # limits are not right-sized
```

| `controlledValues` | Solicitudes | Límites |
|---|---|---|
| `RequestsAndLimits` (predeterminado) | recomendado | recomendado |
| `RequestsOnly` | recomendado | no ajustado al tamaño correcto, **excepto** donde un límite debe moverse para mantener válida la especificación del pod (consulte a continuación) |

Interacciones que debe tener en cuenta:

- En un contenedor donde `request == limit`, reducir la solicitud rompe la clase de QoS garantizada. Si necesita la clase garantizada, mantenga `RequestsAndLimits`; el recomendador maneja los contenedores `request == limit` explícitamente.
- Modo Burstable anula esto para los límites de CPU (consulte [Eliminar límites de CPU con Modo Burstable](#remove-cpu-limits-with-burstable-mode)).
- **El manejo de OOMKill aún ajusta el límite de memoria.** `RequestsOnly` no suprime el aumento de memoria. Después de un OOMKill, el límite de memoria se aumenta y la solicitud potencialmente también se incrementa (Kubernetes rechaza cualquier pod cuya solicitud exceda su límite). Lea `RequestsOnly` como "los límites no se _ajustan al tamaño correcto_", no como "los límites nunca se modifican". Consulte [Ajustar el aumento de memoria de OOMKill](#tune-the-oomkill-memory-bump).

Elegir una combinación:

| Objetivo | Configuración |
|---|---|
| Ajustar el tamaño de todo | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| Ajustar el tamaño de las solicitudes, dejar los límites tal como están escritos | `controlledValues: RequestsOnly` |
| Ajustar el tamaño solo de la memoria, dejar la CPU intacta | `controlledResources: [memory]` |
| Ajustar el tamaño de las solicitudes de CPU, sin límite de CPU en absoluto | `options.burstable: true` |
| Dejar un contenedor completamente intacto | `enabled: false` |

## Establecer límites por contenedor {#set-per-container-bounds}

`minAllowed` y `maxAllowed` restringen las solicitudes de recursos que el recomendador puede producir. Se recomiendan para cargas de trabajo sensibles a la latencia. También se recomiendan cuando cambia la relación de aumento de OOM (consulte [Ajustar el aumento de memoria de OOMKill](#tune-the-oomkill-memory-bump)) para evitar que las solicitudes de memoria caigan por debajo de un mínimo seguro entre ciclos de recomendación.

```yaml
spec:
  constraints:
    minReplicas: 2
    maxReplicas: 100
    containers:
      - name: api
        enabled: true
        minAllowed:
          cpu: "1"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 5Gi
      - name: worker
        enabled: true          # no bounds - recommendations are unconstrained
```

## Excluir un contenedor {#exclude-a-container}

Puede excluir un contenedor de las recomendaciones verticales, de la señal horizontal o de ambas.

### Excluir un contenedor de las recomendaciones verticales {#exclude-a-container-from-vertical-recommendations}

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        enabled: true
      - name: istio-proxy
        enabled: false          # resources for this container are never modified
```

También puede especificar la configuración equivalente de forma explícita:

```yaml
      - name: istio-proxy
        controlledResources: []   # empty list is equivalent to enabled: false
```

Un patrón común es escalar automáticamente todo excepto un sidecar conocido:

```yaml
spec:
  constraints:
    containers:
      - name: "*"
        enabled: true
        controlledResources: [cpu, memory]
      - name: istio-proxy
        enabled: false
```

**Cómo se combinan `"*"` y las entradas con nombre:** la entrada `"*"` se aplica a cada contenedor que **no** tiene una entrada con nombre. Un contenedor con su propia entrada con nombre toma solo la configuración declarada bajo ese nombre. Ambas **no se combinan**, por lo que el comodín no aporta nada a ella.

En el ejemplo anterior, `istio-proxy` se rige únicamente por `enabled: false` y no hereda `controlledResources` del comodín. Cualquier otro contenedor en el pod utiliza la entrada comodín.

**Nota**: Si agrega una entrada con nombre solo para establecer un límite, repita cualquier configuración de comodín que aún desee. En el ejemplo siguiente, `my-app` recurre al `RequestsAndLimits` predeterminado en lugar del `RequestsOnly` establecido en el comodín:

```yaml
      - name: "*"
        controlledValues: RequestsOnly
      - name: my-app
        maxAllowed:
          memory: 8Gi          # controlledValues is NOT inherited - repeat it if you want it
```

### Excluir un contenedor de la señal horizontal {#exclude-a-container-from-the-horizontal-signal}

`enabled: false` rige solo el comportamiento _vertical_. El objetivo horizontal se elige por separado, y aquí es donde los sidecars suelen distorsionar las decisiones de escalado:

```yaml
  objectives:
    # Recommended: scale on the application container's CPU
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

La siguiente configuración a nivel de pod puede producir resultados engañosos cuando hay sidecars presentes:

```yaml
  objectives:
    # Risky when sidecars are present: pod-level utilization is diluted by
    # sidecar requests, so a busy application container can appear idle.
    - type: PodResource
      podResource:
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

**Recomendación**: Si el pod tiene algún sidecar, use `ContainerResource` con alcance al contenedor principal. Reserve `PodResource` para pods de un solo contenedor.

## Configurar sidecars {#configure-sidecars}

### Sidecars ordinarios (`spec.containers`) {#ordinary-sidecars-speccontainers}

No se requiere nada especial. Pueden limitarse, excluirse o seleccionarse como cualquier otro contenedor; consulte [Excluir un contenedor](#exclude-a-container).


### Sidecars nativos (`spec.initContainers` con `restartPolicy: Always`) {#native-sidecars-specinitcontainers-with-restartpolicy-always}

Kubernetes 1.29+ admite sidecars de larga duración declarados en `initContainers` con `restartPolicy: Always`, conocidos como el patrón [sidecar nativo][4]. Un sidecar nativo se ejecuta durante toda la vida útil del pod.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      initContainers:
        - name: log-shipper
          image: log-shipper:1.2
          restartPolicy: Always      # this is what makes it a native sidecar
          resources:
            requests: {cpu: 100m, memory: 128Mi}
            limits:   {memory: 256Mi}
      containers:
        - name: my-app
          image: my-app:4.5
          resources:
            requests: {cpu: "1", memory: 2Gi}
            limits:   {cpu: "2", memory: 4Gi}
```

**Los sidecars nativos son totalmente compatibles.** Se tratan como contenedores ordinarios: se producen y aplican recomendaciones para ellos, y aparecen en la lista de contenedores de la carga de trabajo donde pueden configurarse o excluirse. Haga referencia a ellos en `constraints.containers[]` por **nombre**, exactamente igual que cualquier otro contenedor. No hay un bloque `initContainers` separado en la especificación de DPA, y una entrada `"*"` también los cubre.

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits
      - name: log-shipper        # native sidecar, referenced by name
        enabled: false
```

Puntos a tener en cuenta:

- `restartPolicy: Always` es lo que los distingue. Los contenedores de inicialización ordinarios (aquellos que se ejecutan hasta completarse antes de que inicie la aplicación) no son sidecars nativos y no son administrados por un DPA.
- **Las cifras de costos y ahorros pueden subestimar los sidecars nativos.** Sus solicitudes de recursos se informan bajo una agregación separada, por lo que las cifras de costos mostradas para una carga de trabajo con sidecars nativos pueden parecer inconsistentes con su uso observado. Esta es una limitación conocida que afecta solo a la visualización de costos; las recomendaciones no se ven afectadas.
- **Los sidecars inyectados** (como los de Istio) son agregados por un webhook de admisión mutante a nivel de pod y nunca aparecen en el manifiesto de Deployment. Aun así son detectados, porque la lista de contenedores se reconcilia a partir de los pods en ejecución en lugar de solo a partir del manifiesto de la carga de trabajo.
- **No excluya los contenedores con escalado automático de la recolección del Agent.** Un `DatadogPodAutoscaler` depende de las métricas que el Agent recolecta para los contenedores que administra. Si un contenedor en una carga de trabajo con escalado automático se filtra a través de la configuración de descubrimiento de contenedores del Agent, no existen métricas para él y no se puede ajustar su tamaño correctamente. Confirme que ningún contenedor en una carga de trabajo con escalado automático esté excluido de la recolección. Para saber cómo funcionan las reglas de inclusión y exclusión, consulte [Gestión del Descubrimiento de Contenedorest][7].

## Opciones de manifiesto adicionales {#additional-manifest-options}

### Modo de vista previa (simulación) {#preview-dry-run-mode}

```yaml
spec:
  applyPolicy:
    mode: Preview     # recommendations are computed and visible in .status, but nothing is applied
```

Útil como interruptor de parada temporal. Si una configuración horizontal no es válida, el ajuste de tamaño vertical continúa ejecutándose; establecer `mode: Preview` congela ambas mientras usted la corrige.

### Deshabilitar una dirección de escalado {#disable-one-scaling-direction}

```yaml
spec:
  applyPolicy:
    scaleUp:
      strategy: Max
    scaleDown:
      strategy: Disabled     # never scale down
    update:
      strategy: Auto
```

Para el escalado solo vertical, omita `objectives` y establezca `update.strategy: Auto`, como en la tabla [Elegir un modo de escalado](#choose-a-scaling-mode). Sin `objectives`, el escalado horizontal no tiene un objetivo sobre el cual actuar, por lo que tampoco necesita establecer `scaleUp` y `scaleDown` en `Disabled`.

### Tiempo de implementación vertical {#vertical-rollout-timing}

El controlador aplica un cambio vertical mediante la ruta menos disruptiva disponible y escala si esa ruta se detiene. Dos campos controlan cuánto tiempo espera en cada paso:

```yaml
spec:
  applyPolicy:
    update:
      strategy: Auto
      resizePendingPeriod: 600      # 1..3600 seconds
      rolloutFallbackDelay: 900     # 1..3600 seconds
```

| Campo | Controles |
|---|---|
| `resizePendingPeriod` | Cuánto tiempo esperar antes de desalojar un pod cuando el kubelet informa que el cambio de tamaño está pendiente (aceptado pero sin progreso, a menudo porque el nodo carece de capacidad suficiente) |
| `rolloutFallbackDelay` | Cuánto tiempo esperar antes de recurrir a un despliegue completo cuando los desalojos están bloqueados, generalmente por un PodDisruptionBudget |

Ambos son opcionales y aceptan de 1 a 3600 segundos. Dejarlos sin configurar utiliza los valores predeterminados integrados del controlador.

- **Aumente** `resizePendingPeriod` donde el desalojo sea costoso (calentamiento prolongado, cachés grandes, drenaje lento). Usted cambia un período más largo en el tamaño anterior por menos reinicios.
- **Aumente** `rolloutFallbackDelay` en cargas de trabajo con un PodDisruptionBudget ajustado, para que una restricción de presupuesto temporal no escale inmediatamente a un despliegue completo.
- **Reduzca cualquiera de los dos** donde los reinicios sean económicos y desee que las recomendaciones surtan efecto más rápido.

Estos controlan _cómo_ se entrega un cambio, no _si_ ocurre uno. Para detener los cambios por completo, use `update.strategy: Disabled` o `applyPolicy.mode: Preview`. Estos campos se aplican al [escalado vertical in-place][3]; consulte la descripción general para conocer la habilitación a nivel de clúster y los requisitos de Kubernetes.

### Ajuste de respaldo local {#local-fallback-tuning}

```yaml
spec:
  fallback:
    horizontal:
      enabled: true
      direction: ScaleUp          # default; use All to allow fallback scale-in as well
      triggers:
        staleRecommendationThresholdSeconds: 600    # 100..3600
```

Las recomendaciones de respaldo se calculan dentro del clúster a partir de las métricas recopiladas por el Agent, por lo que el escalado continúa si Datadog no puede entregar una recomendación dentro del umbral.

Esta función también requiere configuración del lado del clúster tanto en el Cluster Agent como en los node Agents. Consulte [Kubernetes Autoscaling][2] o comuníquese con [Soporte de Datadog][6].

### Objetivos de valor absoluto {#absolute-value-objectives}

En lugar de un porcentaje de utilización, establezca como objetivo un valor absoluto:

```yaml
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: AbsoluteValue
          absoluteValue: "1.5"     # target cores per pod
```

### Objetivos de consulta personalizados {#custom-query-objectives}

Escala según cualquier métrica de Datadog en lugar de CPU o memoria:

```yaml
  objectives:
    - type: CustomQuery
      customQuery:
        window: 5m
        request:
          queries:
            - name: a
              source: Metrics
              metrics:
                query: "avg:my.queue.depth{service:my-app}"
        value:
          type: AbsoluteValue
          absoluteValue: "100"
```

`source` también puede ser `ApmMetrics`, con campos como `service`, `resourceName`, `operationName` y `stat`.

Las consultas personalizadas son compatibles solo para el **escalado horizontal**. Combinar una consulta personalizada con el escalado vertical **no es compatible**, porque el escalador automático no puede inferir sobre qué dimensión debe actuar una consulta arbitraria.

### Etiquete la telemetría de un DPA {#tag-a-dpas-telemetry}

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

Esto agrega las etiquetas a la telemetría de escalado automático emitida para este DPA. Para obtener la lista de métricas que emite el Cluster Agent, consulte la [integración del Cluster Agent de Datadog][5].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /es/containers/autoscaling/
[3]: /es/containers/autoscaling/#in-place-vertical-scaling
[4]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[5]: /es/integrations/datadog-cluster-agent/#metrics
[6]: /es/help/
[7]: /es/containers/guide/container-discovery-management/