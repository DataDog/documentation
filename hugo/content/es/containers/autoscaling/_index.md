---
aliases:
- /es/containers/monitoring/autoscaling
description: Escala automáticamente las cargas de trabajo de Kubernetes utilizando
  métricas de Datadog y recomendaciones inteligentes de escalado.
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: Documentación
  text: Utilización de recursos de Kubernetes
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Permisos de rol de Datadog
- link: /agent/remote_config/
  tag: Documentación
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: Blog
  text: Escalando cargas de trabajo de Kubernetes con métricas personalizadas
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: Blog
  text: Optimiza las cargas de trabajo de Kubernetes con escalado de consultas personalizadas
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gestione su canalización de OpenTelemetry con el gateway DDOT.
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: Blog
  text: Ajusta las cargas de trabajo y reduce costos con el escalado automático de
    Kubernetes de Datadog
title: Escalado automático de Kubernetes
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
  Esta función no está disponible para Datadog for Government ({{< region-param key="dd_datacenter" >}})
</div>
{{< /site-region >}}

Datadog Kubernetes Autoscaling monitorea continuamente sus recursos de Kubernetes para proporcionar recomendaciones de escalado inmediatas y escalado multidimensional de sus cargas de trabajo de Kubernetes. Puede implementar el escalado automático a través de la interfaz web de Datadog, o con un `DatadogPodAutoscaler` recurso personalizado.

## Cómo funciona {#how-it-works}
Datadog utiliza métricas de utilización en tiempo real e históricas y señales de eventos de sus Agentes de Datadog existentes para hacer recomendaciones. Luego puede examinar estas recomendaciones y elegir implementarlas.

Por defecto, Datadog Kubernetes Autoscaling utiliza valores estimados de costo de CPU y memoria para mostrar oportunidades de ahorro y estimaciones de impacto. También puede usar Kubernetes Autoscaling junto con [Cloud Cost Management](#idle-cost-and-savings-estimates) para obtener informes basados en el costo exacto de su tipo de instancia.

La escalabilidad automatizada de cargas de trabajo es impulsada por un `DatadogPodAutoscaler` recurso personalizado que define el comportamiento de escalado a nivel de cada carga de trabajo. El Agente de Clúster de Datadog actúa como el controlador de este recurso personalizado.

**Nota:** Cada clúster puede tener un máximo de 1000 cargas de trabajo optimizadas con Datadog Kubernetes Autoscaling.

### Compatibilidad {#compatibility}

- **Distribuciones**: Esta función es compatible con todas las [distribuciones de Kubernetes soportadas][5] por Datadog.
- **Autoscaling de cargas de trabajo**: Esta función es una alternativa al Horizontal Pod Autoscaler (HPA) y al Vertical Pod Autoscaler (VPA). Datadog recomienda que elimine cualquier HPA o VPA de una carga de trabajo al habilitar Datadog Kubernetes Autoscaling para optimizarla. Estas cargas de trabajo se identifican en la aplicación en su nombre.
**Nota:** Puede experimentar con Datadog Kubernetes Autoscaling mientras mantiene su HPA y/o VPA creando un `DatadogPodAutoscaler` con `mode: Preview` en la sección `applyPolicy`.

### Requisitos {#requirements}

- [Remote Configuration][1] debe estar habilitado tanto a nivel de organización como en los Agentes de su clúster objetivo. Consulte [Enabling Remote Configuration][2] para obtener instrucciones de configuración.
- [Helm][3], para actualizar su Datadog Agent.
- (Para usuarios de Datadog Operator) [`kubectl` CLI][4], para actualizar su Datadog Agent.
- Cuando esté utilizando escalado automático en vivo, Datadog recomienda usar la última versión del Datadog Agent. Esto ayuda a garantizar el acceso a las últimas mejoras y optimizaciones. Las recomendaciones de escalado requieren que la integración del [Kubernetes State Core][9] esté habilitada. <br/><br/>

   | Función | Versión mínima del Datadog Agent |
   |---------|----------------------|
   | Recomendaciones de escalado de carga de trabajo en la aplicación | 7.50+ |
   | Escalado de carga de trabajo en vivo | 7.66.1+ |
   | Recomendaciones de Argo Rollout y escalado automático | 7.71+ |
   | Escalado automático de clúster ([inscripción previa][10]) | 7.72+ |
   | Redimensionamiento vertical de pod en su lugar (opción activa) | 7.78+ |
   | Activación del perfil del clúster, etiqueta de carga de trabajo | 7.78+ |
   | Activación del perfil del clúster, etiqueta de espacio de nombres | 7.79+ |

- Los siguientes permisos de usuario:
   - Gestión de la organización (requerido para la configuración remota)
   - Claves API de escritura (requerido para la configuración remota)
   - Escritura de escalado de carga de trabajo
   - Administrar escalado automático
- (Recomendado) Núcleo de Linux v5.19+ y cgroup v2

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

3. [Admission Controller][1] está habilitado por defecto con Datadog Operator. Si lo ha desactivado, vuelva a activarlo agregando las siguientes líneas resaltadas a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. Aplique la configuración actualizada de `datadog-agent.yaml`:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Asegúrese de estar utilizando la versión 7.66.1+ de Agent y Cluster Agent. Agregue lo siguiente a su archivo de configuración `datadog-values.yaml`:

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] está habilitado por defecto en el chart de Helm de Datadog. Si lo ha desactivado, vuelva a activarlo agregando las siguientes líneas resaltadas a `datadog-values.yaml`:
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

4. Vuelva a desplegar Datadog Agent con su `datadog-values.yaml` actualizado:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Estimaciones de costos y ahorros inactivos {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Con Cloud Cost Management" %}}
Si [Cloud Cost Management][1] está habilitado dentro de una organización, el Autoscaling de Kubernetes de Datadog muestra estimaciones de costos inactivos y ahorros basados en el costo exacto de tu factura de las instancias monitoreadas subyacentes.

Consulta las instrucciones de configuración de Cloud Cost para [AWS][2], [Azure][3] o [Google Cloud][4].

Los datos de Cloud Cost Management mejoran el Autoscaling de Kubernetes, pero no son obligatorios. Todas las recomendaciones de carga de trabajo y decisiones de autoscaling de Datadog son válidas y funcionales sin Cloud Cost Management.

[1]: /es/cloud_cost_management
[2]: /es/cloud_cost_management/aws
[3]: /es/cloud_cost_management/azure
[4]: /es/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Predeterminado" %}}
Si Cloud Cost Management no está habilitado, Datadog Kubernetes Autoscaling muestra estimaciones de costos inactivos y ahorros utilizando las siguientes fórmulas y valores fijos:

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
- tasa_núcleo_por_hora = $0.0295 por hora de núcleo de CPU
- tasa_memoria_por_hora = $0.0053 por hora de GB de memoria


_Los valores de costo fijos están sujetos a refinamiento con el tiempo._
{{% /tab %}}
{{< /tabs >}}

## Uso {#usage}

### Identificar recursos para ajustar {#identify-resources-to-rightsize}

La [página de Resumen de Escalado Automático][6] proporciona un punto de partida para que los equipos de plataforma comprendan las oportunidades de ahorro total de Recursos de Kubernetes en una organización y filtren hacia clústeres y espacios de nombres clave.

La [página de Configuración][11] ofrece la opción de seleccionar múltiples cargas de trabajo para escalar y gestionar su optimización en lotes.

La [vista de Escalado de Clúster][7] proporciona información por clúster sobre el total de CPU inactiva, la memoria inactiva total y los costos.

Haga clic en un clúster para obtener información detallada y una tabla de las cargas de trabajo del clúster ordenadas por ahorros estimados. Si usted es un propietario de aplicación o servicio individual, también puede filtrar por el nombre de su equipo o servicio directamente desde la [vista de lista de Escalado de Carga de Trabajo][8].

Desde cualquiera de estas vistas, haga clic {{< ui >}}Optimize{{< /ui >}} en una carga de trabajo para ver su recomendación de escalado, luego proceda a [Habilitar Escalado Automático para una carga de trabajo](#enable-autoscaling-for-a-workload).

### Habilitar Escalado Automático para una carga de trabajo {#enable-autoscaling-for-a-workload}

Después de identificar una carga de trabajo para optimizar, inspeccione su {{< ui >}}Scaling Recommendation{{< /ui >}}. Haga clic {{< ui >}}Configure Recommendation{{< /ui >}} para agregar restricciones o ajustar los niveles de utilización objetivo antes de habilitar.

Hay tres formas de habilitar el escalado automático para una carga de trabajo. Elija la ruta que coincida con la forma en que despliega cargas de trabajo hoy.

| Ruta | Mejor para | Dónde comenzar | Gestión continua |
|------|----------|-----------------|--------------------|
| **A. Asistente de configuración de la interfaz de usuario de Datadog** | Comience rápidamente y ajuste la configuración con retroalimentación visual inmediata, o empodere a sus equipos de aplicación para tomar mejores decisiones de configuración de escalado | [Página de configuración][11] en la interfaz de usuario de Datadog | Edite la carga de trabajo `DatadogPodAutoscaler` desde la interfaz o su clúster |
| **B. Redacte un `DatadogPodAutoscaler` manifiesto** | Flujos de trabajo existentes para implementar manifiestos de Kubernetes (`kubectl`, Helm, ArgoCD, Terraform u otras herramientas de GitOps) | YAML escrito a mano o mediante plantillas aplicado a través de sus herramientas existentes | Edite el manifiesto y vuelva a aplicarlo a través de las mismas herramientas |
| **C. Aplicar un [perfil de clúster](#cluster-profiles) etiqueta** | Activar el escalado automático en muchas cargas de trabajo o espacios de nombres con una única política compartida | Etiquete la carga de trabajo o el espacio de nombres con `autoscaling.datadoghq.com/profile` | Edite el perfil para actualizar cada carga de trabajo que gestiona, o mueva cargas de trabajo entre perfiles cambiando la etiqueta |

#### Ruta A: Datadog UI {#path-a-datadog-ui}

La forma más rápida de comenzar es la [Página de configuración][11] en la Datadog UI. El asistente lo guía a través de cinco pasos: seleccionar un clúster, verificar los requisitos de Agent y permisos, elegir un método de instalación, seleccionar una plantilla de escalado y desplegar. Plantillas disponibles en el asistente:

- **Optimizar costo**: objetivo de alta utilización de CPU, reducción agresiva, piso de réplicas más bajo. Mejor para cargas de trabajo sin estado y sensibles al costo.
- **Optimizar balance**: objetivo de utilización moderada, escalado equilibrado y reducción. Mejor para la mayoría de las cargas de trabajo sin estado.
- **Optimizar rendimiento**: objetivo de utilización conservadora, reducción lenta, piso de réplicas más alto. Mejor para servicios con estado o críticos.
- **Personalizar**: comience desde cualquiera de los anteriores y ajuste el objetivo de CPU, las réplicas y las ventanas de estabilización.

El asistente de configuración es mejor para probar el escalado automático en una sola carga de trabajo, interactuar con una recomendación o incorporar un pequeño conjunto de cargas de trabajo. (Requiere `Workload Scaling Write` y `Autoscaling Manage` permisos.)

#### Ruta B: GitOps {#path-b-gitops}

Defina un `DatadogPodAutoscaler` recurso personalizado que apunte a su carga de trabajo y aplíquelo a través de cualquier herramienta que ya use para enviar manifiestos de Kubernetes, ya sea `kubectl apply`, Helm, ArgoCD, Terraform u otra herramienta de GitOps. La redacción del manifiesto es la misma independientemente del mecanismo de entrega. Vea las [configuraciones de ejemplo](#example-datadogpodautoscaler-configurations) a continuación para puntos de partida listos para editar que cubren optimización de costos, escalado equilibrado, redimensionamiento vertical únicamente y escalado horizontal de consulta personalizada.

Para guías específicas de herramientas, consulte:

- [Gestionar DatadogPodAutoscaler con ArgoCD][12]
- [Gestionar DatadogPodAutoscaler con Terraform][13]

### Ejemplos de configuraciones de DatadogPodAutoscaler {#example-datadogpodautoscaler-configurations}

Los siguientes ejemplos demuestran configuraciones comunes `DatadogPodAutoscaler` para diferentes estrategias de escalado. Úselos como puntos de partida y ajuste los valores para que coincidan con los requisitos de su carga de trabajo. Si prefiere elegir una plantilla en la Datadog UI, siga [Ruta A](#path-a-datadog-ui-setup-wizard) arriba.

{{< tabs >}}
{{% tab "Optimizar Costo" %}}

Elija esta plantilla para una carga de trabajo sin estado, sensible al costo, en la que el controlador debe eliminar capacidad rápidamente cuando la carga disminuye. La configuración definitoria es el objetivo de alta utilización de CPU (85%), combinado con una regla de reducción agresiva y un mínimo de una réplica.

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
            stabilizationWindowSeconds: 300
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
{{% tab "Optimizar Balance" %}}

Elija esta plantilla cuando desee ahorros sin sacrificar disponibilidad. Es un valor predeterminado sensato para la mayoría de las cargas de trabajo sin estado. La configuración definitoria es el objetivo moderado de utilización de CPU (70%) emparejado con una reducción conservadora (20% cada 20 minutos) y un mínimo de dos réplicas. El controlador agrega capacidad rápidamente pero la elimina lentamente.

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
            stabilizationWindowSeconds: 600
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
{{% tab "CPU y Memoria Vertical" %}}

Elija esta plantilla cuando una carga de trabajo no pueda escalarse horizontalmente, o cuando desee un ajuste puro sin cambiar el número de réplicas. Los casos comunes son servicios singleton, cargas de trabajo con estado y componentes elegidos por un líder. La configuración definitoria es `scaleDown.strategy: Disabled` y `scaleUp.strategy: Disabled`, lo que deja solo `update.strategy: Auto` para aplicar recomendaciones de CPU y memoria.

Por defecto, el controlador aplica recomendaciones verticales al activar un despliegue (desalojar y recrear pods). El Cluster Agent **7.78+** también admite **el redimensionamiento en su lugar de pods**, lo que actualiza las solicitudes y límites de CPU y memoria de un pod sin reiniciarlo. El redimensionamiento en su lugar es opcional: configure `autoscaling.workload.in_place_vertical_scaling.enabled: true` en el Cluster Agent (o establezca la variable de entorno `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true`).

Su clúster también debe exponer el `pods/resize` subrecurso. Este es el valor predeterminado en Kubernetes 1.33+ donde el `InPlacePodVerticalScaling` feature gate está en beta. En Kubernetes 1.27 a 1.32, el feature gate debe estar habilitado en `kube-apiserver` y en cada `kubelet`.

Cuando se cumplen ambos requisitos previos:

- **Predeterminado**: Las cargas de trabajo con `applyPolicy.update.strategy: Auto` (el predeterminado) se redimensionan en su lugar.
- **Reversión**: Si el kubelet informa que un redimensionamiento es `Infeasible`, el controlador vuelve a una implementación.
- **Opción de exclusión**: Para forzar a una carga de trabajo a utilizar siempre el escalado vertical basado en implementación, independientemente de la configuración del clúster, configure `applyPolicy.update.strategy: TriggerRollout` en su `DatadogPodAutoscaler`.

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
{{% tab "Consulta Personalizada Horizontal" %}}

Elija esta plantilla cuando la CPU y la memoria no sean la señal de escalado adecuada. Los ejemplos incluyen un trabajador de cola que debería escalar según la profundidad de la cola, o un servicio API que debería escalar según la latencia de las solicitudes. La configuración definitoria es el bloque `objectives`, que hace referencia a una consulta de métrica de Datadog y a un `AbsoluteValue` objetivo en lugar de un porcentaje de utilización. Reemplace la consulta de ejemplo con una que coincida con su carga de trabajo.

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
            stabilizationWindowSeconds: 600
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

Un `DatadogPodAutoscalerClusterProfile` es un recurso de ámbito de clúster que contiene una plantilla `DatadogPodAutoscaler`. El Cluster Agent observa los recursos `Deployment` y `StatefulSet` (y, en 7.79+, los espacios de nombres que los contienen) para la etiqueta `autoscaling.datadoghq.com/profile`, y crea un `DatadogPodAutoscaler` administrado para cada carga de trabajo coincidente. Un perfil se aplica a muchas cargas de trabajo; una carga de trabajo aún se asigna a un `DatadogPodAutoscaler`.

Los perfiles de clúster y la etiqueta a nivel de carga de trabajo requieren Datadog Cluster Agent 7.78.0+. La activación a nivel de espacio de nombres (etiquetando un espacio de nombres para optar por cada carga de trabajo compatible dentro de él en un perfil) requiere Datadog Cluster Agent 7.79.0+. Los Cluster Agents más antiguos ignoran la etiqueta del perfil.

#### Perfiles integrados {#built-in-profiles}

El Cluster Agent envía tres perfiles integrados y los recrea al iniciar, por lo que no debe incluir ningún YAML de CRD para usarlos. Los nombres están reservados.

| Perfil | Objetivo de CPU | Mínimo de réplicas | Perfil de comportamiento |
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | Cargas de trabajo sin estado, sensibles al costo. Escalado rápido hacia arriba y hacia abajo (ventanas de estabilización de 5 minutos, paso del 50% cada 2 minutos). |
| `datadog-optimize-balance` | 70% | 2 | Predeterminado para la mayoría de las cargas de trabajo sin estado. Ventanas de estabilización equilibradas de 10 minutos, escalado hacia abajo conservador (paso del 20% cada 20 minutos). |
| `datadog-optimize-performance` | 60% | 3 | Cargas de trabajo con estado o sensibles a la latencia. Escalado hacia abajo muy conservador (ventanas de estabilización de 15 minutos, paso del 10% cada 30 minutos). |

Para activar un perfil en una sola carga de trabajo, agregue la etiqueta a la `metadata.labels` de la carga de trabajo:

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

Para activar un perfil en cada carga de trabajo soportada en un espacio de nombres, etiquete el espacio de nombres en su lugar (requiere Cluster Agent 7.79.0+):

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### Perfiles personalizados {#custom-profiles}

Cree un `DatadogPodAutoscalerClusterProfile` cuando ningún perfil integrado coincida con su política de escalado. Los perfiles son de ámbito de clúster, por lo que aplíquelos sin una flag `--namespace` (o colóquelos en la capa de nivel de clúster de su repositorio de configuración).

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
        stabilizationWindowSeconds: 300
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

Haga referencia al perfil personalizado desde una carga de trabajo o espacio de nombres utilizando la misma etiqueta:

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

El cuerpo de la plantilla acepta los mismos campos que una especificación `DatadogPodAutoscaler`, menos `targetRef` (el Cluster Agent lo completa para cada carga de trabajo coincidente). Vea las [configuraciones de ejemplo](#example-datadogpodautoscaler-configurations) anteriores para el rango completo de campos que puede incluir bajo `spec.template`.

#### Precedencia de activación {#activation-precedence}

El Cluster Agent 7.79.0+ añade activación a nivel de espacio de nombres, la `excluded` opción de exclusión y la regla de precedencia entre ellas. En el Cluster Agent 7.78.0, solo se lee la etiqueta a nivel de carga de trabajo; las reglas a continuación que involucran espacios de nombres o el valor `excluded` no se aplican.

- **Las etiquetas de carga de trabajo tienen precedencia sobre las etiquetas de espacio de nombres.** Si un espacio de nombres está etiquetado como `autoscaling.datadoghq.com/profile=ns-profile` y una carga de trabajo dentro de él está etiquetada como `autoscaling.datadoghq.com/profile=workload-profile`, la carga de trabajo utiliza `workload-profile`.
- **Exclúyase con `excluded`.** Establezca `autoscaling.datadoghq.com/profile: excluded` en una carga de trabajo para eximirla cuando su espacio de nombres esté etiquetado. Esto es útil para cargas de trabajo con estado o críticas en un espacio de nombres que de otro modo está incluido.

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **Los nombres de perfil desconocidos son ignorados.** Si una carga de trabajo o espacio de nombres hace referencia a un perfil que no existe, el Cluster Agent no crea un administrado `DatadogPodAutoscaler` y no informa un error. La reconciliación recoge la asignación tan pronto como se crea un perfil con ese nombre.
- **La reconciliación es automática.** Agregar, cambiar o eliminar la etiqueta se propaga a un administrado `DatadogPodAutoscaler` en segundos.

#### Tipos de carga de trabajo soportados {#supported-workload-kinds}

La activación de perfil soporta `Deployment` y `StatefulSet`. Para otros tipos (por ejemplo, Argo `Rollout`), use [Ruta B: GitOps](#path-b-gitops) para crear un `DatadogPodAutoscaler` directamente.

### Despliegue las recomendaciones manualmente {#deploy-recommendations-manually}

Si desea las recomendaciones de Datadog sin habilitar el escalado automático, puede aplicarlas manualmente como una acción única. Cuando configure recursos para sus implementaciones de Kubernetes, utilice los valores sugeridos en la recomendación de escalado. También puede hacer clic en {{< ui >}}Export Recommendation{{< /ui >}} para ver un comando generado `kubectl patch`. Datadog continúa actualizando la recomendación, pero el clúster solo se actualiza cuando la vuelve a aplicar.

## Gestione cargas de trabajo a gran escala {#manage-workloads-at-scale}

Después de que una carga de trabajo se escale automáticamente, las operaciones del día dos se gestionan a través de una combinación del recurso `DatadogPodAutoscaler` y la interfaz de usuario de Datadog:

- **Cambie la plantilla de escalado.** Edite la especificación `DatadogPodAutoscaler` de la carga de trabajo (objetivo de CPU, límites de réplicas, reglas de escalado ascendente y descendente) directamente, o elija una plantilla diferente de la vista de lista de [Escalado de Cargas de Trabajo][8]. Los cambios entran en efecto en la próxima reconciliación.
- **Páuse el escalado automático sin eliminar el recurso.** Establezca `applyPolicy.mode: Preview` para mantener las recomendaciones visibles en `.status` mientras impide que el controlador las aplique. Esto es útil cuando se ejecuta junto a un HPA o VPA durante la evaluación.
- **Observe el despliegue.** La vista de lista de escalado de cargas de trabajo muestra el estado en vivo de la recomendación de cada carga de trabajo, la última acción aplicada y cualquier error de reconciliación.
- **Elimine el escalado automático de manera limpia.** Elimine el recurso `DatadogPodAutoscaler` para detener el escalado automático. Los recursos de pod existentes permanecen en sus últimos valores aplicados, y la carga de trabajo vuelve a lo que su controlador padre (Deployment, StatefulSet, etc.) especifica en el próximo despliegue.

## Referencia {#reference}

### Cómo se calculan las recomendaciones verticales {#how-vertical-recommendations-are-calculated}

Datadog calcula recomendaciones de escalado vertical para CPU y memoria analizando datos históricos de uso de contenedores durante los últimos 8 días. La metodología utilizada para cada recurso depende de si la solicitud de ese recurso es igual a su límite, reflejando el concepto de [clase de Calidad de Servicio (QoS) de Kubernetes][14]. La CPU y la memoria se evalúan de manera independiente: una carga de trabajo puede utilizar la metodología Burstable para la CPU y la metodología Garantizada para la memoria, o viceversa.

#### Recomendaciones de memoria {#memory-recommendations}

**Burstable** (la solicitud de memoria es menor que el límite de memoria):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud** | Basada en el **p95** del uso de memoria durante los últimos 8 días, con un peso decreciente aplicado a muestras más antiguas para que los patrones de uso recientes tengan prioridad. Se añade un **margen de seguridad del 10 %**. |
| **Recomendación de límite** | Basada en el **máximo uso de memoria pico** observado durante los últimos 8 días. Se añade un **margen de seguridad del 5 %**. |

**Garantizada** (la solicitud de memoria es igual al límite de memoria):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud y límite** | Basada en el **máximo uso de memoria pico** observado durante los últimos 8 días. Se añade un **margen de seguridad del 5 %**. Si se detecta un **OOMKill**, se aplica un incremento adicional del 20 %**** para ayudar a prevenir futuros eventos de falta de memoria. |

**Nota:** El seguimiento del uso máximo de memoria captura el mayor uso de memoria registrado por cualquier contenedor que haya existido dentro de la ventana de retroceso de 8 días. Esto significa que incluso si un contenedor comenzó antes de esa ventana, su uso máximo (por ejemplo, al inicio) aún se tiene en cuenta en la recomendación.

#### Recomendaciones de CPU {#cpu-recommendations}

**Burstable** (la solicitud de CPU es menor que el límite de CPU):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud** | Basada en el **p90** del uso de CPU en relación con la solicitud actual durante los últimos 8 días, con un peso decreciente aplicado a muestras más antiguas para que los patrones de uso recientes tengan prioridad. Se añade un **margen de seguridad del 10 %**. |
| **Recomendación de límite** | Basada en el **p95** del uso de CPU en relación con la solicitud actual durante los últimos 8 días. Se añade un **margen de seguridad del 5 %**. Si la recomendación de solicitud resultante alguna vez excede la recomendación de límite, se utiliza el valor de solicitud para ambos. |

**Garantizado** (la solicitud de CPU es igual al límite de CPU):

| | Cómo se calcula |
|---|---|
| **Recomendación de solicitud y límite** | Basada en el **p95** del uso de CPU en relación con la solicitud actual durante los últimos 8 días. Se añade un **margen de seguridad del 5 %**. |

#### Principios de diseño clave {#key-design-principles}

- **Ventana de retroceso de 8 días**: Todas las recomendaciones consideran datos de uso de los últimos 8 días, proporcionando suficiente historial para capturar patrones de tráfico semanales mientras se mantiene la capacidad de respuesta a los cambios.
- **Pesos en decadencia**: Para recomendaciones de solicitudes de clase Burstable (CPU o memoria), las muestras más antiguas tienen un peso menor, por lo que la recomendación se adapta más rápido a los cambios recientes en el uso.
- **Márgenes de seguridad**: Cada recomendación incluye un margen por encima del uso observado (5 a 10%) para proporcionar un colchón contra picos inesperados.
- **Respuesta OOMKill**: Cuando la memoria es de clase Guaranteed (la solicitud es igual al límite) y ocurre un OOMKill, se aplica un aumento del 20% para reducir la probabilidad de fallos repetidos por falta de memoria.
- **Preservación de clase Guaranteed**: Cuando un recurso tiene una solicitud igual al límite, Datadog utiliza el cálculo más conservador (a nivel de límite) para ambos, asegurando que las recomendaciones no introduzcan una brecha entre la solicitud y el límite.

## Lectura adicional {#further-reading}

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