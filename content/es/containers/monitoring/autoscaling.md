---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: Blog
  text: Redimensionar cargas de trabajo y reducir costes con Datadog Kubernetes Autoscaling
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: Documentación
  text: Uso de recursos de Kubernetes
- link: /account_management/rbac/permissions
  tag: Documentación
  text: Permisos de roles en Datadog
- link: /agent/remote_config/
  tag: Documentación
  text: Configuración remota
title: Kubernetes Autoscaling
---

Datadog Kubernetes Autoscaling monitoriza de forma continua tus recursos de Kubernetes para proporcionar recomendaciones inmediatas de escalado y escalado automático multidimensional de tus cargas de trabajo de Kubernetes. Puedes desplegar el escalado automático a través de la interfaz web de Datadog o con un recurso `DatadogPodAutoscaler` personalizado.

## Cómo funciona
Datadog utiliza métricas de uso en tiempo real e históricas y señales de eventos de tus Datadog Agents existentes para hacer recomendaciones. De esta forma, puedes examinar estas recomendaciones y optar por desplegarlas.

Por defecto, Datadog Kubernetes Autoscaling utiliza valores estimados de coste de CPU y memoria para mostrar oportunidades de ahorro y cálculos del impacto. También puedes utilizar Kubernetes Autoscaling junto con [Cloud Cost Management](#idle-cost-and-savings-estimates) para obtener informes basados en los costes exactos de tu tipo de instancia.

El escalado automático de cargas de trabajo se realiza mediante un recurso `DatadogPodAutoscaler` personalizado que define el comportamiento del escalado a nivel de carga de trabajo individual. El Datadog Cluster Agent actúa como controlador de este recurso personalizado.

Cada clúster puede tener un máximo de 1000 cargas de trabajo optimizadas con Datadog Kubernetes Autoscaler.

### Compatibilidad

- **Distribuciones**: Esta función es compatible con todas las [distribuciones Kubernetes compatibles][5] de Datadog.
- **Escalado automático de cargas de trabajo**: Esta función es una alternativa a Horizontal Pod Autoscaler (HPA) y a Vertical Pod Autoscaler (VPA). Datadog recomienda que elimines cualquier HPA o VPA de una carga de trabajo antes de utilizar Datadog Kubernetes Autoscaling para optimizarla. Estas cargas de trabajo se identifican en la aplicación en tu nombre.

### Requisitos

- La [configuración remota][1] debe estar activada para tu organización. Consulta [Activación de la configuración remota][2].
- [Helm][3], para actualizar tu Datadog Agent.
- (Para usuarios del Datadog Operator) [CLI `kubectl`][4], para actualizar el Datadog Agent.
- Los siguientes permisos de usuario:
   - Gestión de organización (necesario para la configuración remota)
   - Escritura de claves de API (necesario para la configuración remota)
   - Lectura del escalado de la carga de trabajo
   - Escritura del escalado de la carga de trabajo
   - Gestión del escalado automático

## Configuración

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Asegúrate de que estás utilizando la v1.8.0 o posterior del Datadog Operator. Para actualizar tu Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator 
```

2. Añade lo siguiente a tu archivo de configuración `datadog-agent.yaml`:

```yaml
spec:
  features:
    orchestratorExplorer:
      customResources:
      - datadoghq.com/v1alpha2/datadogpodautoscalers
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      image:
        tag: 7.66.1
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      image:
        tag: 7.66.1 # or 7.66.1-jmx
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
        - name: DD_AUTOSCALING_FAILOVER_METRICS
          value: container.memory.usage container.cpu.usage
    clusterChecksRunner:
      image:
        tag: 7.66.1 # or 7.66.1-jmx
```

3. El [controlador de admisión][1] está activado por defecto con el Datadog Operator. Si lo desactivaste, vuelve a activarlo añadiendo las siguientes líneas resaltadas a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. Aplica la configuración actualizada de `datadog-agent.yaml`:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Asegúrate de que estás utilizando el Agent y la v7.66.1 o posterior del Cluster Agent. Añade lo siguiente a tu archivo de configuración `datadog-values.yaml`:

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. El [controlador de admisión][1] está activado por defecto en el Datadog Helm chart. Si lo desactivaste, vuelve a activarlo añadiendo las siguientes líneas resaltadas a `datadog-values.yaml`:
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  image:
    tag: 7.66.1
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Update your Helm version:

```shell
helm repo update
```

4. Vuelve a desplegar el Datadog Agent con tu `datadog-values.yaml` actualizado:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /es/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### Estimaciones de costes y ahorros por inactividad

{{< tabs >}}
{{% tab "With Cloud Cost Management" %}}
Si [Cloud Cost Management][1] está habilitado dentro de una organización, Datadog Kubernetes Autoscaling muestra estimaciones de costes y ahorros por inactividad, basadas en el coste exacto de tu facturación de las instancias subyacentes monitorizadas.

Consulta las instrucciones de configuración de Cloud Cost para [AWS][2], [Azure][3] o [Google Cloud][4].

Los datos de Cloud Cost Management mejoran Kubernetes Autoscaling, pero no son necesarios. Todas las recomendaciones de cargas de trabajo y decisiones de escalado automático de Datadog son válidas y funcionales sin Cloud Cost Management.

[1]: /es/cloud_cost_management
[2]: /es/cloud_cost_management/aws
[3]: /es/cloud_cost_management/azure
[4]: /es/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "Default" %}}
Si Cloud Cost Management **no** está activado, Datadog Kubernetes Autoscaling muestra estimaciones de costes y ahorros por inactividad utilizando las siguientes fórmulas y valores fijos:

**Clúster inactivo**: `(max(cpu_usage, cpu_requests, cpu_capacity) - max(cpu_usage, cpu_requests)) *0.0295 + (max(memory_usage, memory_requests, memory_capacity) - max(memory_usage, memory_requests)) * 0.0053`

**Carga de trabajo inactiva**: `(max(cpu_usage, cpu_requests) - cpu_usage) *0.0295 + (max(memory_usage, memory_requests) - memory_usage) * 0.0053`

**Valores fijos**:
- 0,0295 $ por hora de núcleo de CPU
- 0,0053 $ por hora de GB de memoria


_Los valores de los costes fijos están sujetos a ajustes a lo largo del tiempo._
{{% /tab %}}
{{< /tabs >}}

## Utilización

### Identificar recursos para redimensionar

La [página de Resumen de Autoscaling][6] proporciona un punto de partida para que los equipos de plataforma comprendan todas las oportunidades de ahorro de recursos Kubernetes en toda una organización y filtren por clústeres y espacios de nombres clave. La [vista de Escalado de clústeres][7] proporciona información de cada clúster sobre la totalidad de CPU inactiva, el total de memoria inactiva y los costes. Haz clic en un clúster para obtener información detallada y una tabla de las cargas de trabajo del clúster. Si eres propietario de una aplicación o servicio individual, también puedes filtrar por el nombre de tu equipo o servicio directamente desde la [vista de la lista de Escalado de cargas de trabajo][8].

Haz clic en **Optimize** (Optimizar) en cualquier carga de trabajo para ver su recomendación de escalado.

### Activar Autoscaling para una carga de trabajo

Después de identificar una carga de trabajo para optimizar, Datadog recomienda inspeccionar su **recomendación de escalado**. También puedes hacer clic en **Configure Recommendation** (Configurar recomendación) para añadir restricciones o ajustar los niveles de uso objetivo.

Cuando estés listo para activar Autoscaling para una carga de trabajo, tienes dos opciones de despliegue:

- Haz clic en **Enable Autoscaling** (Activar Autoscaling). (Requiere permiso de escritura del escalado de cargas de trabajo). 

   Datadog instala y configura automáticamente el escalado automático de esta carga de trabajo.

- Despliega un recurso personalizado `DatadogPodAutoscaler`.

   Utiliza tu proceso de despliegue existente para orientar y configurar Autoscaling para tu carga de trabajo.

   {{% collapse-content title="Example DatadogPodAutoscaler CRD" level="h4" expanded=false id="id-for-anchoring" %}}
   ```yaml
   apiVersion: datadoghq.com/v1alpha2
   kind: DatadogPodAutoscaler
   metadata:
     name: <name, usually same as Deployment object name>
   spec:
     targetRef:
       apiVersion: apps/v1
       kind: Deployment
       name: <your Deployment name>
     constraints:
       # Adjust constraints as safeguards
       maxReplicas: 50
       minReplicas: 1
     owner: Local
     applyPolicy:
       mode: Apply
     objectives:
       - type: PodResource
         podResource:
           name: cpu
           value:
             type: Utilization
             utilization: 75
   ```
   {{% /collapse-content %}}

### Desplegar recomendaciones manualmente

Como alternativa al Autoscaling, también puedes desplegar manualmente las recomendaciones de escalado de Datadog. Cuando configures recursos para tus despliegues de Kubernetes, utiliza los valores sugeridos en las recomendaciones de escalado. También puedes hacer clic en **Export Recommendation** (Exportar recomendación) para ver un comando `kubectl patch` generado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/remote_config
[2]: /es/agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /es/containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload