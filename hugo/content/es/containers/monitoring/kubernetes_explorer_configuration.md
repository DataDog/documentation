---
aliases:
- /es/infrastructure/livecontainers/configuration
- /es/infrastructure/containers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentación
  text: Vea todos sus hosts/Containers con el Mapa de infraestructura
- link: /infrastructure/process/
  tag: Documentación
  text: Entienda lo que sucede en cualquier nivel de su sistema
title: Configure Kubernetes Explorer
---
Esta página lista las opciones de configuración para la página de [Containers][1] en Datadog. Para obtener más información sobre la página de Containers y sus capacidades, consulte la documentación de [Vista de contenedores][2].

## Configure Kubernetes Explorer {#configure-kubernetes-explorer}

### Matriz de compatibilidad de recolección de recursos {#resource-collection-compatibility-matrix}

La siguiente tabla lista los recursos recopilados y las versiones mínimas de Agent, Cluster Agent y gráfico de Helm para cada uno.

| Recurso | Versión mínima de Agent | Versión mínima de Cluster Agent* | Versión mínima de Helm chart | Versión mínima de Kubernetes |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clusters | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| CustomResourceDefinitions | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| CustomResources | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Deployments | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Ingresses | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Jobs | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Namespaces | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| Network Policies | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nodos | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| Reclamaciones de volumen persistente | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Volúmenes persistentes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| Conjuntos de réplicas | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| Vinculaciones de roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Cuentas de servicio | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Servicios | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| StatefulSets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| Autoescaladores verticales de pods | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**Nota**: Después de la versión 1.22, la numeración de versiones del Cluster Agent sigue la numeración de versiones del Agent, comenzando con la versión 7.39.0.

### Agregue etiquetas personalizadas a los recursos {#add-custom-tags-to-resources}

Puede agregar etiquetas personalizadas a los recursos de Kubernetes para facilitar el filtrado dentro de la vista de recursos de Kubernetes.

Las etiquetas adicionales se agregan a través de la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`.

**Nota**: Estas etiquetas solo aparecen en la vista de recursos de Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Agregue la variable de entorno tanto en el Process Agent como en el Cluster Agent configurando `agents.containers.processAgent.env` y `clusterAgent.env` en `datadog-agent.yaml`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

Luego aplique la nueva configuración:

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Si está utilizando el [official Helm chart][1], agregue la variable de entorno tanto en el Process Agent como en el Cluster Agent configurando `agents.containers.processAgent.env` y `clusterAgent.env` en [values.yaml][2].

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

Luego, actualice su Helm chart.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Establezca la variable de entorno tanto en los contenedores del Process Agent como del Cluster Agent:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Recopile recursos personalizados {#collect-custom-resources}

El [Kubernetes Explorer][3] recopila automáticamente las Definiciones de Recursos Personalizados (CRD, por sus siglas en inglés) de forma predeterminada.

#### Matriz de compatibilidad de recolección de recursos personalizados automática {#automatic-custom-resource-collection-compatibility-matrix}

Cuando los siguientes CRDs están presentes en su cluster, el Agent recopila automáticamente sus CRs. Si un CRD que utiliza **no** aparece aquí—o su versión del Agent es anterior—siga los pasos de **configuración manual** a continuación.

| Grupo CRD | Tipo de CRD | Versiones de CRD | Versión mínima de Agent |
| --------------------------- | ----------------------------------- | ------------------ | --------------------- |
| argoproj.io                 | application                         | v1alpha1           | 7.71.0                |
| argoproj.io                 | applicationset                      | v1alpha1           | 7.71.0                |
| argoproj.io                 | rollout                             | v1alpha1           | 7.71.0                |
| azure.karpenter.sh          | *                                   | v1beta1            | 7.71.0                |
| datadoghq.com               | datadogagent                        | v2alpha1           | 7.71.0                |
| datadoghq.com               | datadogagentprofile                 | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogdashboard                    | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadoginstrumentation              | v1alpha1           | 7.83.0                |
| datadoghq.com               | datadogmetric                       | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogmonitor                      | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogpodautoscaler                | v1alpha2           | 7.71.0                |
| datadoghq.com               | datadogslo                          | v1alpha1           | 7.71.0                |
| eks.amazonaws.com           | nodeclass                           | v1, v1beta1        | 7.77.0                |
| karpenter.k8s.aws           | *                                   | v1                 | 7.71.0                |
| karpenter.sh                | *                                   | v1                 | 7.71.0                |
| kubeai.org                  | model                               | v1                 | 7.85.0                |
| kustomize.toolkit.fluxcd.io | kustomization                       | v1                 | 7.76.0                |
| nvidia.com                  | dynamocheckpoint                    | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamocomponentdeployment           | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeployment               | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentrequest        | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentscalingadapter | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamomodel                         | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamoworkermetadata                | v1alpha1           | 7.84.0                |
| ray.io                      | raycluster                          | v1, v1alpha1       | 7.84.0                |
| ray.io                      | raycronjob                          | v1                 | 7.84.0                |
| ray.io                      | rayjob                              | v1, v1alpha1       | 7.84.0                |
| ray.io                      | rayservice                          | v1, v1alpha1       | 7.84.0                |
| serving.kserve.io           | clusterservingruntime               | v1alpha1           | 7.85.0                |
| serving.kserve.io           | clusterstoragecontainer             | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferencegraph                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferenceservice                    | v1beta1            | 7.85.0                |
| serving.kserve.io           | llminferenceservice                 | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | llminferenceserviceconfig           | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | localmodelcache                     | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnamespacecache            | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnode                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnodegroup                 | v1alpha1           | 7.85.0                |
| serving.kserve.io           | servingruntime                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | trainedmodel                        | v1alpha1           | 7.85.0                |
| source.toolkit.fluxcd.io    | bucket                              | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | externalartifact                    | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | gitrepository                       | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmchart                           | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmrepository                      | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | ocirepository                       | v1                 | 7.76.0                |


#### Configuración manual {#manual-configuration}

Para los otros CRD, siga estos pasos para recopilar los recursos personalizados que definen estos CRD:

1. En Datadog, abra [Kubernetes Explorer][3]. En el panel izquierdo, bajo **Select Resources**, seleccione [**Kubernetes > Custom Resources > Resource Definitions**][4].

1. Localice el CRD que define el recurso personalizado que desea visualizar en el explorador. Debajo de la columna **Versions**, haga clic en la `version`etiqueta para la que desea configurar la indexación.

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="Un video de Kubernetes Explorer con el menú desplegable Custom Resources expandido y Resource Definitions seleccionado. El cursor se mueve hacia abajo a una de las filas de la tabla y, bajo la columna 'Versions', hace clic en una de las versiones. El cursor selecciona 'v1alpha1'. Aparece una ventana modal." video="true">}}

   Aparece una ventana modal:
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="La ventana modal Collecting and Indexing. Contiene dos secciones: Set up Datadog Agent, con fragmentos copiables para actualizar una configuración del Datadog Agent, y Select indexed fields for filtering/sorting, con casillas de verificación para los campos a indexar y una vista previa.">}}

1. Siga las instrucciones en la sección **Set up Datadog Agent** de la ventana modal para actualizar la configuración del Datadog Agent para los clústeres que no están recopilando recursos personalizados. La ventana modal enumera todos esos clústeres, ya sea porque el Datadog Agent no está configurado para recopilar recursos personalizados o porque no hay ninguno disponible en ese clúster. Si el Datadog Agent está configurado y no existen recursos personalizados, no se requiere ninguna acción.

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Agregue la siguiente configuración a `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Actualice su Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Instale el Datadog Operator con una opción que otorgue al Datadog Agent permiso para recopilar recursos personalizados:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Agregue la siguiente configuración a su manifiesto `DatadogAgent`, `datadog-agent.yaml`:

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          orchestratorExplorer:
            customResources:
              - <CUSTOM_RESOURCE_NAME>
      ```

   1. Aplique su nueva configuración:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   Cada `<CUSTOM_RESOURCE_NAME>` debe usar el formato `group/version/kind`.

1. En la ventana modal, bajo **Select indexed fields for filtering/sorting**, seleccione los campos que desea indexar del recurso personalizado para filtrar y ordenar. Para algunos CRD, Datadog proporciona una configuración predeterminada. Puede seleccionar campos adicionales si es necesario.

    <div class="alert alert-info">Una vez configurado el Datadog Agent, este recopila automáticamente los recursos personalizados disponibles. La indexación de campos es opcional.</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="Un video de la ventana modal Collecting and Indexing. El cursor selecciona tres campos y hace clic en Update Fields. Se muestra un mensaje de éxito." video="true">}}

    For arrays of objects, see the [Indexing complex types](#indexing-complex-types) section.

1.  Seleccione **Update Fields** para guardar.

Una vez que los campos están indexados, puede agregarlos como columnas en el explorador y ordenarlos, o incluirlos en Saved Views. También puede filtrar por campos indexados usando el prefijo `field#`.

### Indexación de tipos complejos {#indexing-complex-types}

{{< img src="containers/explorer/crd_groupby_1.png" alt="Configuración de indexación: Un objeto targets object[] array, con opciones de menú desplegable 'Agrupar por': sin campo, containerResource.container, containerResource.name, containerResource.value.type, etc." style="width:100%;" >}}

Para matrices de objetos, hay dos estrategias de agrupación disponibles:

-   `No field`: Los campos anidados del objeto se indexan únicamente según el nombre del campo anidado.
-   **Campo** (por ejemplo: `type`, `status`, etc.): Los campos anidados del objeto se indexan según cada valor de campo único.

##### Ejemplo: Filtrado en recursos personalizados DatadogPodAutoscaler {#example-filtering-on-datadogpodautoscaler-custom-resources}

Considere estos dos recursos personalizados:

**Recurso personalizado 1 (CR1)**:

```yaml
status:
    conditions:
        - type: HorizontalAbleToScale
          status: 'True'
        - type: VerticalAbleToApply
          status: 'False'
```

**Recurso personalizado 2 (CR2)**:

```yaml
status:
    conditions:
        - type: VerticalAbleToApply
          status: 'True'
        - type: HorizontalAbleToScale
          status: 'False'
```

Usted tiene las posibilidades de filtrado en `status.conditions` basadas en las dos estrategias de indexación:

{{< tabs >}}
{{% tab "Agrupación por ningún campo" %}}

**Campos indexados para CR1:**

```yaml
status:
    conditions:
        type: [HorizontalAbleToScale, VerticalAbleToApply]
        status: ['True', 'False']
```

**Campos indexados para CR2:**

```yaml
status:
    conditions:
        type: [VerticalAbleToApply, HorizontalAbleToScale]
        status: ['True', 'False']
```

**Ejemplos de consultas:**

**Consulta 1:**

```text
field#status.conditions.status:"False"
```

**Resultado:** Devuelve CR1 y CR2. Ambos CR tienen al menos un objeto con `status:"False"`

**Consulta 2:**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**Resultado:** Devuelve CR1 y CR2. Al menos un objeto `status.condition` en cada recurso personalizado coincide con uno de los filtros, incluso si no es el mismo objeto el que coincide con ambos filtros.

{{% /tab %}}
{{% tab "Agrupar por tipo" %}}

**Campos indexados para CR1:**

```yaml
status:
    conditions:
        - HorizontalAbleToScale:
              status: 'True'
        - VerticalAbleToApply:
              status: 'False'
```

**Campos indexados para CR2:**

```yaml
status:
    conditions:
        - VerticalAbleToApply:
              status: 'True'
        - HorizontalAbleToScale:
              status: 'False'
```

**Ejemplo de consulta:**

```text
field#status.conditions.HorizontalAbleToScale.status:"False"
```

**Resultado:** Devuelve CR2. Solo se devuelve un objeto `status.condition` cuyo `type:"HorizontalAbleToScale"` y `status:"False"` se devuelven.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Puede seleccionar hasta 50 campos por recurso. Puede usar la vista previa para validar sus opciones de indexación.</div>

### Recopile métricas de recursos personalizados mediante el check Kubernetes State Core {#collect-custom-resource-metrics-using-kubernetes-state-core-check}

<div class="alert alert-info">Esta funcionalidad requiere Cluster Agent 7.63.0+.</div>

Puede usar el `kubernetes_state_core` check para recopilar métricas de recursos personalizados al ejecutar Datadog Cluster Agent.

1. Escriba las definiciones de sus recursos personalizados y los campos que se convertirán en métricas de acuerdo con el siguiente formato:
   ```yaml
   #=(...)
   collectCrMetrics:
     - groupVersionKind:
         group: "crd.k8s.amazonaws.com"
         kind: "ENIConfig"
         version: "v1alpha1"
       commonLabels:
         crd_type: "eniconfig"
       labelsFromPath:
         crd_name: [metadata, name]
       metricNamePrefix: "userPrefix"
       metrics:
         - name: "eniconfig"
           help: "ENI Config"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
     - groupVersionKind:
         group: "vpcresources.k8s.aws"
         kind: "CNINode"
         version: "v1alpha1"
         resource: "cninode-pluralized"
       commonLabels:
         crd_type: "cninode"
       labelsFromPath:
         crd_name: [metadata, name]
       metrics:
         - name: "cninode"
           help: "CNI Node"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
   ```

   De forma predeterminada, los nombres de los recursos de RBAC y API se derivan del tipo en groupVersionKind convirtiéndolo a minúsculas y añadiendo un sufijo "s" (por ejemplo, Kind: ENIConfig → eniconfigs). Si la definición de recurso personalizado (CRD) utiliza una forma plural diferente, puede anular este comportamiento especificando el campo de recurso. En el ejemplo anterior, CNINode anula el valor predeterminado estableciendo resource: "cninode-pluralized".

   Los nombres de las métricas se generan utilizando las siguientes reglas:
   - Sin prefijo: `kubernetes_state_customresource.<metrics.name>`
   - Prefijo: `kubernetes_state_customresource.<metricNamePrefix>_<metric.name>`

   Para obtener más detalles, consulte [Custom Resource State Metrics][5].

2. Actualice su configuración de Helm o del Datadog Operator:

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Agregue la siguiente configuración a `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

       Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Actualice su Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">
      Esta funcionalidad requiere Agent Operator v1.20+.
   </div>

   1. Instale el Datadog Operator con una opción que otorgue al Datadog Agent permiso para recopilar recursos personalizados:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Agregue la siguiente configuración a su manifiesto `DatadogAgent`, `datadog-agent.yaml`:

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          kubeStateMetricsCore:
            collectCrMetrics:
              - <CUSTOM_RESOURCE_METRIC>
      ```

      Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Aplique su nueva configuración:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /es/infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
[5]: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md