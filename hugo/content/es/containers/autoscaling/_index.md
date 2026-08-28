---
aliases:
- /es/containers/monitoring/autoscaling
cascade:
  site_support_id: containers_autoscaling
description: Escale automáticamente las cargas de trabajo de Kubernetes utilizando
  métricas de Datadog y recomendaciones de escalado inteligente
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: Documentación
  text: Utilización de recursos de Kubernetes
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Permisos de roles de Datadog
- link: /agent/remote_config/
  tag: Documentación
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: Blog
  text: Escalado de cargas de trabajo de Kubernetes en métricas personalizadas
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimice las cargas de trabajo de Kubernetes con el escalado de consultas
    personalizadas
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con el gateway DDOT
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: Blog
  text: Ajuste el tamaño de las cargas de trabajo y reduzca los costos con Datadog
    Kubernetes Autoscaling
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: Centro de arquitectura
  text: Escalado automático de cargas de trabajo de Kubernetes con Datadog
title: Kubernetes Autoscaling
---
Datadog Kubernetes Autoscaling monitorea continuamente sus recursos de Kubernetes para proporcionar recomendaciones de escalado inmediatas y escalado automático multidimensional de sus cargas de trabajo de Kubernetes. Puede implementar el escalado automático a través de la interfaz web de Datadog o con un `DatadogPodAutoscaler` recurso personalizado.

## Cómo funciona {#how-it-works}
Datadog utiliza métricas de utilización históricas y en tiempo real, así como señales de evento de sus Datadog Agent existentes para realizar recomendaciones. Luego puede examinar estas recomendaciones y elegir implementarlas.

De forma predeterminada, Datadog Kubernetes Autoscaling utiliza valores estimados de costo de CPU y memoria para mostrar oportunidades de ahorro y estimaciones de impacto. También puede utilizar Kubernetes Autoscaling junto con [Cloud Cost Management](#idle-cost-and-savings-estimates) para obtener informes basados en los costos exactos de su tipo de instancia.

El escalado automatizado de cargas de trabajo funciona mediante un `DatadogPodAutoscaler` recurso personalizado que define el comportamiento de escalado a nivel de cada carga de trabajo. El Datadog Cluster Agent actúa como el controlador para este recurso personalizado.

**Nota:** Cada clúster puede tener un máximo de 1000 cargas de trabajo optimizadas con Datadog Kubernetes Autoscaling.

### Compatibilidad {#compatibility}

- **Distribuciones**: Esta función es compatible con todas las [distribuciones de Kubernetes compatibles][5] de Datadog.
- **Escalado automático de cargas de trabajo**: Esta función es una alternativa a Horizontal Pod Autoscaler (HPA) y Vertical Pod Autoscaler (VPA). Datadog recomienda que elimine cualquier HPA o VPA de una carga de trabajo al habilitar Datadog Kubernetes Autoscaling para optimizarla. Estas cargas de trabajo se identifican en la aplicación en su nombre.
**Nota:** Puede experimentar con Datadog Kubernetes Autoscaling mientras mantiene su HPA y/o VPA creando un `DatadogPodAutoscaler` con `mode: Preview` en la sección `applyPolicy`.

### Requisitos {#requirements}

- [Remote Configuration][1] debe estar habilitado tanto a nivel de organización como en los Datadog Agent de su clúster de destino. Consulte [Enabling Remote Configuration][2] para obtener instrucciones de configuración.
- [Helm][3], para actualizar su Datadog Agent.
- (Para usuarios de Datadog Operator) [`kubectl` CLI][4], para actualizar el Datadog Agent.
- Cuando utiliza el escalado automático en tiempo real, Datadog recomienda usar la versión más reciente de Datadog Agent. Esto ayuda a garantizar el acceso a las mejoras y optimizaciones más recientes. Las recomendaciones de escalado requieren que la integración [Kubernetes State Core][9] esté habilitada. <br/><br/>

   | Función | Versión mínima del Agent |
   |---------|----------------------|
   | Recomendaciones de escalado de carga de trabajo en la aplicación | 7.50+ |
   | Escalado de carga de trabajo en vivo | 7.66.1+ |
   | Recomendaciones de Argo Rollout y escalado automático | 7.71+ |
   | Escalado automático de clúster ([registro para vista previa][10]) | 7.72+ |
   | Cambio de tamaño vertical de pod en el lugar (opt-in) | 7.78+ |
   | Activación de perfil de clúster, etiqueta de carga de trabajo | 7.78+ |
   | Activación de perfil de clúster, etiqueta de espacio de nombres | 7.79+ |

- Los siguientes permisos de usuario:
   - Gestión de la organización (requerido para Remote Configuration)
   - Escritura de clave de API (requerido para Remote Configuration)
   - Escritura de escalado de carga de trabajo
   - Administración de escalado automático
- (Recomendado) Kernel de Linux v5.19+ y cgroup v2

## Configuración {#setup}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Asegúrese de estar utilizando Datadog Operator v1.16.0+. Para actualizar su Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. Agregue lo siguiente a su archivo de configuración `datadog-agent.yaml`:

```yaml
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
```

3. [Admission Controller][1] está habilitado de forma predeterminada con Datadog Operator. Si lo deshabilitó, vuelva a habilitarlo agregando las siguientes líneas resaltadas a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. Aplique la configuración `datadog-agent.yaml` actualizada:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Asegúrese de estar utilizando Datadog Agent y Cluster Agent v7.66.1+. Agregue lo siguiente a su archivo de configuración `datadog-values.yaml`:

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] está habilitado de forma predeterminada en el Datadog Helm chart. Si lo deshabilitó, vuelva a habilitarlo agregando las siguientes líneas resaltadas a `datadog-values.yaml`:
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Actualice su versión de Helm:

```shell
helm repo update
```

4. Vuelva a implementar el Datadog Agent con su `datadog-values.yaml` actualizada:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Estimaciones de costos inactivos y ahorros {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Con Cloud Cost Management" %}}
Si [Cloud Cost Management][1] está habilitado dentro de una organización, Datadog Kubernetes Autoscaling muestra estimaciones de costos inactivos y ahorros basados en el costo exacto de su factura de las instancias monitoreadas subyacentes.

Consulte las instrucciones de configuración de Cloud Cost para [AWS][2], [Azure][3] o [Google Cloud][4].

Los datos de Cloud Cost Management mejoran Kubernetes Autoscaling, pero no son obligatorios. Todas las recomendaciones de carga de trabajo y las decisiones de escalado automático de Datadog son válidas y funcionales sin Cloud Cost Management.

[1]: /es/cloud_cost_management
[2]: /es/cloud_cost_management/aws
[3]: /es/cloud_cost_management/azure
[4]: /es/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Predeterminado" %}}
Si Cloud Cost Management **no** está habilitado, Datadog Kubernetes Autoscaling muestra estimaciones de costos inactivos y ahorros utilizando las siguientes fórmulas y valores fijos:

**Inactividad del clúster**:

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**Carga de trabajo inactiva**:

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**Valores fijos**:
- core_rate_per_hour = $0.0295 por hora de núcleo de CPU
- memory rate_per_hour = $0.0053 por hora de GB de memoria


_Los valores de costo fijo están sujetos a refinamiento con el tiempo._
{{% /tab %}}
{{< /tabs >}}

## Uso {#usage}

### Identificar recursos para ajustar el tamaño {#identify-resources-to-rightsize}

La [página de resumen de escalado automático][6] proporciona un punto de partida para que los equipos de plataforma comprendan las oportunidades totales de ahorro de recursos de Kubernetes en toda una organización y filtren por clústeres y espacios de nombres clave.

La [página de configuración][11] ofrece la opción de seleccionar múltiples cargas de trabajo para escalar y gestionar su optimización en lotes.

La [visualización de escalado de clúster][7] proporciona información por clúster sobre el total de CPU inactiva, el total de memoria inactiva y los costos.

Haga clic en un clúster para obtener información detallada y una tabla de las cargas de trabajo del clúster ordenadas por ahorros estimados. Si usted es propietario de una aplicación o servicio individual, también puede filtrar por el nombre de su equipo o servicio directamente desde la [visualización de la lista de escalado de carga de trabajo][8].

Desde cualquiera de estas vistas, haga clic en {{< ui >}}Optimize{{< /ui >}} en una carga de trabajo para ver su recomendación de escalado, luego proceda a [Habilitar el escalado automático para una carga de trabajo](#enable-autoscaling-for-a-workload).

### Habilitar el escalado automático para una carga de trabajo {#enable-autoscaling-for-a-workload}

Después de identificar una carga de trabajo para optimizar, inspeccione su {{< ui >}}Scaling Recommendation{{< /ui >}}. Haga clic en {{< ui >}}Configure Recommendation{{< /ui >}} para agregar restricciones o ajustar los niveles de utilización objetivo antes de habilitar.

Existen tres formas de habilitar el escalado automático para una carga de trabajo. Elija la ruta que coincida con la forma en que implementa las cargas de trabajo actualmente.

| Ruta | Ideal para | Dónde empezar | Gestión continua |
|------|----------|-----------------|--------------------|
| **A. Datadog UI setup wizard** | Comience rápidamente e itere en la configuración con retroalimentación visual inmediata, o faculte a sus equipos de aplicaciones para que tomen mejores decisiones de configuración de escalado | [Setup page][11] en Datadog UI | Edite el `DatadogPodAutoscaler` de la carga de trabajo desde la UI o su clúster |
| **B. Crear un manifiesto de `DatadogPodAutoscaler`** | Flujos de trabajo existentes para enviar manifiestos de Kubernetes (`kubectl`, Helm, ArgoCD, Terraform u otras herramientas de GitOps) | YAML escrito a mano o con plantillas aplicado a través de sus herramientas existentes | Edite el manifiesto y vuelva a aplicarlo a través de la misma herramienta |
| **C. Aplicar un [perfil de clúster](#cluster-profiles)Etiqueta** | Activación del escalado automático en muchas cargas de trabajo o espacios de nombres con una única política compartida | Etiquete la carga de trabajo o el espacio de nombres con `autoscaling.datadoghq.com/profile` | Edite el perfil para actualizar cada carga de trabajo que gestiona, o mueva las cargas de trabajo entre perfiles cambiando la etiqueta |

#### Path A: Datadog UI {#path-a-datadog-ui}

La forma más rápida de comenzar es la [Setup page][11] en Datadog UI. El asistente lo guía a través de cinco pasos: seleccionar un clúster, verificar los requisitos del Agent y de permisos, elegir un método de instalación, seleccionar una plantilla de escalado e implementar. Plantillas disponibles en el asistente:

- **Optimizar costos**: objetivo de utilización de CPU alto, escalado descendente agresivo, límite inferior de réplicas más bajo. Ideal para cargas de trabajo sin estado y sensibles a los costos.
- **Optimizar equilibrio**: objetivo de utilización moderado, escalado ascendente rápido, escalado descendente equilibrado. Ideal para la mayoría de las cargas de trabajo sin estado.
- **Optimizar rendimiento**: objetivo de utilización conservador, escalado ascendente rápido, escalado descendente lento, límite inferior de réplicas más alto. Ideal para servicios con estado o críticos.
- **Personalizar**: comience desde cualquiera de las opciones anteriores y ajuste usted mismo el objetivo de CPU, las réplicas y las ventanas de estabilización.

El Datadog UI setup wizard es ideal para probar el escalado automático en una sola carga de trabajo, familiarizarse con una recomendación o incorporar un pequeño conjunto de cargas de trabajo. (Requiere permisos de `Workload Scaling Write` y `Autoscaling Manage`.)

#### Path B: GitOps {#path-b-gitops}

Defina un `DatadogPodAutoscaler` recurso personalizado que apunte a su carga de trabajo y aplíquelo a través de cualquier herramienta que ya utilice para enviar manifiestos de Kubernetes, ya sea `kubectl apply`, Helm, ArgoCD, Terraform u otra herramienta de GitOps. La creación del manifiesto es la misma independientemente del mecanismo de entrega. Consulte los [ejemplos de configuración](#example-datadogpodautoscaler-configurations) a continuación para obtener puntos de partida listos para editar que cubren la optimización de costos, el escalado equilibrado, el cambio de tamaño solo vertical y el escalado horizontal mediante consultas personalizadas.

Para guías específicas de herramientas, consulte:

- [Administrar DatadogPodAutoscaler con ArgoCD][12]
- [Administrar DatadogPodAutoscaler con Terraform][13]

### Ejemplos de configuraciones de DatadogPodAutoscaler {#example-datadogpodautoscaler-configurations}

Los siguientes ejemplos demuestran configuraciones `DatadogPodAutoscaler` comunes para diferentes estrategias de escalado. Úselos como puntos de partida y ajuste los valores para que coincidan con los requisitos de su carga de trabajo. Si prefiere elegir una plantilla en la interfaz de usuario, siga la [Ruta A](#path-a-datadog-ui-setup-wizard) anterior.

{{< tabs >}}
{{% tab "Optimizar costo" %}}

Elija esta plantilla para una carga de trabajo sin estado y sensible a los costos, donde el controlador debe eliminar capacidad rápidamente cuando la carga disminuye. La configuración determinante es el objetivo de utilización de CPU alto (85%), combinado con una regla de reducción de escala agresiva y un mínimo de una réplica.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Aggressive: allow 50% reduction every 2 minutes
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 190
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Allow scaling down to 1 replica for maximum savings
        minReplicas: 1
    objectives:
        # High utilization target to maximize cost efficiency
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 85
```

{{% /tab %}}
{{% tab "Optimizar equilibrio" %}}

Elija esta plantilla cuando desee ahorros sin sacrificar la disponibilidad. Es una opción predeterminada sensata para la mayoría de las cargas de trabajo sin estado. La configuración determinante es el objetivo de utilización de CPU moderado (70%) junto con una reducción de escala conservadora y un mínimo de dos réplicas. El controlador añade capacidad rápidamente pero la elimina lentamente.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Conservative: allow only 20% reduction every 20 minutes
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Maintain at least 2 replicas for availability
        minReplicas: 2
    objectives:
        # Moderate utilization target balances cost and performance
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 70
```

{{% /tab %}}
{{% tab "Vertical CPU and Memory" %}}

Elija esta plantilla cuando una carga de trabajo no pueda escalarse horizontalmente, o cuando desee un ajuste de tamaño preciso sin cambiar el número de réplicas. Los casos comunes son servicios singleton, cargas de trabajo con estado y componentes con elección de líder. La configuración determinante es `scaleDown.strategy: Disabled` y `scaleUp.strategy: Disabled`, lo que deja solo `update.strategy: Auto` para aplicar las recomendaciones de CPU y memoria.

De forma predeterminada, el controlador aplica recomendaciones verticales activando un despliegue (evacuar y recrear pods). El Cluster Agent **7.78+** también admite el cambio de tamaño **in-place de pod**, lo que actualiza las solicitudes y límites de CPU y memoria de un pod sin reiniciarlo. El cambio de tamaño in-place es opcional: configure `autoscaling.workload.in_place_vertical_scaling.enabled: true` en el Cluster Agent (o establezca la variable de entorno `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`).

Su clúster también debe exponer el subrecurso `pods/resize`. Este es el valor predeterminado en Kubernetes 1.33+ donde la puerta de características `InPlacePodVerticalScaling` está en versión beta. En Kubernetes 1.27 a 1.32, la puerta de características debe estar habilitada en `kube-apiserver` y en cada `kubelet`.

Cuando se cumplen ambos requisitos previos:

- **Predeterminado**: Las cargas de trabajo con `applyPolicy.update.strategy: Auto` (el valor predeterminado) cambian de tamaño in-place.
- **Recuperación**: Si el kubelet informa un cambio de tamaño como `Infeasible`, el controlador recurre a un despliegue.
- **Exclusión voluntaria**: Para forzar a una carga de trabajo a usar siempre el escalado vertical basado en despliegue independientemente de la configuración del clúster, establezca `applyPolicy.update.strategy: TriggerRollout` en su `DatadogPodAutoscaler`.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        # Horizontal scaling disabled; only vertical resizing
        scaleDown:
            strategy: Disabled
        scaleUp:
            strategy: Disabled
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
```

{{% /tab %}}
{{% tab "Consulta personalizada horizontal" %}}

Elija esta plantilla cuando la CPU y la memoria no sean la señal de escalado adecuada. Los ejemplos incluyen un trabajador de cola que debería escalar según la profundidad de la acumulación, o un servicio API que debería escalar según la latencia de las solicitudes. La configuración definitoria es el bloque `objectives`, que hace referencia a una consulta de métrica de Datadog y a un objetivo `AbsoluteValue` en lugar de a un porcentaje de utilización. Reemplace la consulta de ejemplo con una que coincida con su carga de trabajo.

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        # Vertical updates disabled — horizontal only
        update:
            strategy: Disabled
    constraints:
        maxReplicas: 100
        minReplicas: 2
    objectives:
        - type: CustomQuery
          customQuery:
            # Replace with your own Datadog metric query
            request:
                formula: usage
                queries:
                    - name: usage
                      source: Metrics
                      metrics:
                        query: avg:redis.info.latency_ms{kube_cluster_name:<CLUSTER_NAME>,kube_namespace:<NAMESPACE>,kube_deployment:<WORKLOAD_NAME>}
            value:
                type: AbsoluteValue
                absoluteValue: 500M
            window: 5m0s
    fallback:
        horizontal:
            # With custom queries, local fallback is not activated by default
            enabled: false
            # Direction can be ScaleUp, ScaleDown or All
            direction: ScaleUp
            # When using custom queries, a CPU or Memory fallback objective is required
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{< /tabs >}}

### Perfiles de clúster {#cluster-profiles}

Un `DatadogPodAutoscalerClusterProfile` es un recurso a nivel de clúster que contiene una plantilla de `DatadogPodAutoscaler`. El Cluster Agent observa los recursos `Deployment` y `StatefulSet` (y, en la versión 7.79+, los espacios de nombres que los contienen) en busca de la etiqueta `autoscaling.datadoghq.com/profile`, y crea un `DatadogPodAutoscaler` administrado para cada carga de trabajo coincidente. Un perfil se aplica a muchas cargas de trabajo; una carga de trabajo sigue asignándose a un `DatadogPodAutoscaler`.

Los perfiles de clúster y la etiqueta a nivel de carga de trabajo requieren Datadog Cluster Agent 7.78.0+. La activación a nivel de espacio de nombres (etiquetar un espacio de nombres para incluir todas las cargas de trabajo admitidas dentro de él en un perfil) requiere Datadog Cluster Agent 7.79.0+. Los Cluster Agent más antiguos ignoran la etiqueta de perfil.

#### Perfiles integrados {#built-in-profiles}

El Cluster Agent incluye tres perfiles integrados y los recrea al iniciar, por lo que no debe confirmar ningún YAML de CRD para usarlos. Los nombres están reservados.

| Perfil | Objetivo de CPU | Réplicas mínimas | Perfil de comportamiento |
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | Objetivo de alta utilización de CPU, escalado descendente agresivo, límite mínimo de réplicas más bajo. Ideal para cargas de trabajo sin estado y sensibles a los costos. |
| `datadog-optimize-balance` | 70% | 2 | Objetivo de utilización moderado, escalado ascendente rápido, escalado descendente equilibrado. Ideal para la mayoría de las cargas de trabajo sin estado. |
| `datadog-optimize-performance` | 60% | 3 | Objetivo de utilización conservador, escalado ascendente rápido, escalado descendente lento, límite mínimo de réplicas más alto. Ideal para servicios con estado o críticos. |

Para activar un perfil en una sola carga de trabajo, agregue la etiqueta a `metadata.labels` de la carga de trabajo:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
spec:
  # ...rest of the Deployment spec
```

Para activar un perfil en cada carga de trabajo admitida en un espacio de nombres, etiquete el espacio de nombres en su lugar (requiere Cluster Agent 7.79.0+):

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### Perfiles personalizados {#custom-profiles}

Cree un `DatadogPodAutoscalerClusterProfile` cuando ningún perfil integrado coincida con su política de escalado. Los perfiles son de ámbito de clúster, así que aplíquelos sin una bandera `--namespace` (o colóquelos en la capa de nivel de clúster de su repositorio de configuración).

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: cost-optimized-strict-floor
spec:
  template:
    applyPolicy:
      mode: Apply
      scaleUp:
        stabilizationWindowSeconds: 190
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
      scaleDown:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
    constraints:
      minReplicas: 1
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 85
```

Haga referencia al perfil personalizado desde una carga de trabajo o namespace usando la misma etiqueta:

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

El cuerpo de la plantilla acepta los mismos campos que una especificación `DatadogPodAutoscaler`, menos `targetRef` (el Cluster Agent lo completa para cada carga de trabajo coincidente). Consulte las [configuraciones de ejemplo](#example-datadogpodautoscaler-configurations) anteriores para ver la gama completa de campos que puede colocar bajo `spec.template`.

#### Precedencia de activación {#activation-precedence}

Cluster Agent 7.79.0+ añade la activación a nivel de namespace, `excluded`la opción de exclusión y la regla de precedencia entre ellas. En Cluster Agent 7.78.0, solo se lee la etiqueta a nivel de carga de trabajo; las reglas a continuación que involucran namespace o el valor `excluded` no se aplican.

- **Las etiquetas de carga de trabajo tienen prioridad sobre las etiquetas de namespace.** Si un namespace está etiquetado como `autoscaling.datadoghq.com/profile=ns-profile` y una carga de trabajo dentro de él está etiquetada como `autoscaling.datadoghq.com/profile=workload-profile`, la carga de trabajo usa `workload-profile`.
- **Opte por la exclusión con `excluded`.** Establezca `autoscaling.datadoghq.com/profile: excluded` en una carga de trabajo para eximirla cuando su namespace esté etiquetado. Esto es útil para cargas de trabajo con estado o críticas en un namespace que, por lo demás, está habilitado.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **Los nombres de perfil desconocidos se ignoran.** Si una carga de trabajo o un namespace hace referencia a un perfil que no existe, el Cluster Agent no crea un `DatadogPodAutoscaler` gestionado y no informa de un error. La reconciliación detecta la asignación tan pronto como se crea un perfil con ese nombre.
- **La reconciliación es automática.** Agregar, cambiar o eliminar la etiqueta se propaga a un `DatadogPodAutoscaler` gestionado en cuestión de segundos.

#### Tipos de carga de trabajo admitidos {#supported-workload-kinds}

La activación de perfiles admite `Deployment` y `StatefulSet`. Para otros tipos (por ejemplo, Argo `Rollout`), utilice [Ruta B: GitOps](#path-b-gitops) para crear un `DatadogPodAutoscaler` directamente.

### Despliegue recomendaciones manualmente {#deploy-recommendations-manually}

Si desea las recomendaciones de Datadog sin habilitar el escalado automático, puede aplicarlas manualmente como una acción única. Cuando configure recursos para sus implementaciones de Kubernetes, utilice los valores sugeridos en la recomendación de escalado. También puede hacer clic en {{< ui >}}Export Recommendation{{< /ui >}} para ver un comando `kubectl patch` generado. Datadog continúa actualizando la recomendación, pero el clúster solo cambia cuando usted vuelve a aplicar.

## Administre cargas de trabajo a escala {#manage-workloads-at-scale}

Después de que una carga de trabajo se escala automáticamente, las operaciones del segundo día se administran a través de una combinación del recurso `DatadogPodAutoscaler` y la interfaz de usuario de Datadog:

- **Cambie la plantilla de escalado.** Edite la especificación `DatadogPodAutoscaler` de la carga de trabajo (objetivo de CPU, límites de réplicas, reglas de escalado ascendente y descendente) directamente, o elija una plantilla diferente de la [lista de visualización de Escalado de cargas de trabajo][8]. Los cambios surten efecto en la siguiente reconciliación.
- **Ponga en pausa el escalado automático sin eliminar el recurso.** Establezca `applyPolicy.mode: Preview` para mantener las recomendaciones visibles en `.status` mientras evita que el controlador las aplique. Esto es útil cuando se ejecuta junto con un HPA o VPA durante la evaluación.
- **Observe el despliegue.** La lista de visualización de Escalado de cargas de trabajo muestra el estado en vivo de la recomendación de cada carga de trabajo, la última acción aplicada y cualquier error de reconciliación.
- **Elimine el escalado automático de forma limpia.** Elimine el recurso `DatadogPodAutoscaler` para detener el escalado automático. Los recursos de pod existentes permanecen en sus últimos valores aplicados, y la carga de trabajo revierte a lo que sea que su controlador principal (Deployment, StatefulSet, etc.) especifique en el siguiente despliegue.

## Referencia {#reference}

### Cómo se calculan las recomendaciones verticales {#how-vertical-recommendations-are-calculated}

Datadog calcula las recomendaciones de escalado vertical para CPU y memoria analizando los datos históricos de uso de contenedores durante los últimos 8 días. La metodología utilizada para cada recurso depende de si la solicitud de ese recurso es igual a su límite, reflejando el concepto de [clase de Calidad de Servicio (QoS) de Kubernetes][14]. La CPU y la memoria se evalúan de forma independiente: una carga de trabajo puede usar la metodología Burstable para la CPU y la metodología Guaranteed para la memoria, o viceversa.

#### Recomendaciones de memoria {#memory-recommendations}

**Burstable** (la solicitud de memoria es menor que el límite de memoria):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud** | Basado en el **p95** del uso de memoria durante los últimos 8 días, con un peso decreciente aplicado a las muestras más antiguas para que se prioricen los patrones de uso recientes. Luego se añade un **margen de seguridad del 10%**. |
| **Recomendación de límite** | Basado en el **pico máximo de uso de memoria** observado durante los últimos 8 días. Luego se añade un **margen de seguridad del 5%**. |

**Garantizado** (la solicitud de memoria es igual al límite de memoria):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud y límite** | Basado en el **pico máximo de uso de memoria** observado durante los últimos 8 días. Se añade un **margen de seguridad del 5%**. Si se detecta un **OOMKill**, se aplica un **aumento adicional del 20%** para ayudar a prevenir futuros eventos de falta de memoria. |

**Nota:** El seguimiento del pico de memoria captura el uso de memoria más alto registrado por cualquier contenedor que haya existido dentro de la ventana de revisión de 8 días. Esto significa que incluso si un contenedor comenzó antes de esa ventana, su uso máximo (por ejemplo, durante el inicio) todavía se contabiliza en la recomendación.

#### Recomendaciones de CPU {#cpu-recommendations}

**Burstable** (la solicitud de CPU es menor que el límite de CPU):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud** | Basado en el **p90** del uso de CPU en relación con la solicitud actual durante los últimos 8 días, con un peso decreciente aplicado a las muestras más antiguas para que se prioricen los patrones de uso recientes. Luego se añade un **margen de seguridad del 10%**. |
| **Recomendación de límite** | Basado en el **p95** del uso de CPU en relación con la solicitud actual durante los últimos 8 días. Luego se añade un **margen de seguridad del 5%**. Si la recomendación de solicitud resultante supera alguna vez la recomendación de límite, se utiliza el valor de solicitud para ambos. |

**Garantizado** (la solicitud de CPU es igual al límite de CPU):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud y límite** | Basado en el **p95** del uso de CPU en relación con la solicitud actual durante los últimos 8 días. Luego se añade un **margen de seguridad del 5%**. |

#### Principios clave de diseño {#key-design-principles}

- **Ventana de retrospectiva de 8 días**: Todas las recomendaciones consideran los datos de uso de los últimos 8 días, proporcionando suficiente historial para capturar los patrones de tráfico semanales y, al mismo tiempo, seguir respondiendo a los cambios.
- **Pesos decrecientes**: Para las recomendaciones de solicitud de clase Burstable (CPU o memoria), las muestras más antiguas tienen menos peso, por lo que la recomendación se adapta más rápidamente a los cambios recientes en el uso.
- **Márgenes de seguridad**: Cada recomendación incluye un margen por encima del uso observado (del 5 al 10%) para proporcionar un margen contra picos inesperados.
- **Respuesta a OOMKill**: Cuando la memoria es de clase Garantizada (la solicitud es igual al límite) y ocurre un OOMKill, se aplica un aumento del 20% para reducir la probabilidad de fallos repetidos por falta de memoria.
- **Preservación de clase garantizada**: Cuando un recurso tiene una solicitud igual al límite, Datadog utiliza el cálculo más conservador (nivel de límite) para ambos, asegurando que las recomendaciones no introduzcan una brecha entre la solicitud y el límite.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /es/containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /es/integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
[11]: https://app.datadoghq.com/orchestration/scaling/setup
[12]: /es/containers/guide/manage-datadogpodautoscaler-with-argocd/
[13]: /es/containers/guide/manage-datdadogpodautoscaler-with-terraform/
[14]: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/