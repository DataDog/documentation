---
aliases:
- /es/infrastructure/livecontainers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentación
  text: Ver todos los hosts/contenedores con el mapa de infraestructuras
- link: /infrastructure/process/
  tag: Documentación
  text: Comprender lo que sucede en cualquier nivel del sistema
title: Configurar la vista de contenedores
---

En esta página se enumeran las opciones de configuración para la página de [Contenedores][1] en Datadog. Para obtener más información sobre la página de contenedores y sus capacidades, consulta la documentación de la [Vista de contenedores][2].

## Opciones de configuración

### Incluir o excluir contenedores

Incluye y excluye contenedores de la recopilación en tiempo real:

- Excluye contenedores al pasar la variable de entorno `DD_CONTAINER_EXCLUDE` o al añadir `container_exclude:` en tu archivo de configuración principal `datadog.yaml`.
- Incluye contenedores al pasar la variable de entorno `DD_CONTAINER_INCLUDE` o al añadir `container_include:` en tu archivo de configuración principal `datadog.yaml`.

Ambos argumentos toman un **nombre de imagen** como valor. También se admiten expresiones regulares.

Por ejemplo, para excluir todas las imágenes de Debian excepto los contenedores con un nombre que comience con *frontend*, añade estas dos líneas de configuración en tu archivo `datadog.yaml`:

```yaml
container_exclude: ["image:debian"]
container_include: ["name:frontend.*"]
```

**Nota**: En el caso del Agent 5, en lugar de incluir lo anterior en el archivo de configuración principal `datadog.conf`, añade de manera explícita un archivo `datadog.yaml` a `/etc/datadog-agent/`, ya que el Process Agent requiere todas las opciones de configuración aquí. Esta configuración solo excluye los contenedores de la recopilación en tiempo real, **no** de Autodiscovery.

### Eliminación de información confidencial de manifiestos

Para evitar la filtración de datos confidenciales, el Agent puede configurarse para depurar manifiestos YAML recopilados en Kubernetes. Esta función de depuración se aplica a:

- Valores de anotación
- Valores de etiquetas (labels)
- Configuraciones de sonda (cabeceras y comandos HTTP)
- Variables de entorno 
- Comandos de ejecución de contenedores

El algoritmo de depuración intenta detectar pares clave-valor que contengan secretos basándose en un conjunto de palabras clave sensibles, sustituyendo los valores correspondientes por `********`. Esta lógica se aplica a pares clave-valor estructurados (como variables de entorno), así como a valores que parecen contenido JSON o YAML, que pueden contener pares clave-valor dentro del contenido.

La depuración se activa por defecto utilizando las siguientes palabras clave sensibles:

- `password`
- `passwd`
- `mysql_pwd`
- `access_token`
- `auth_token`
- `api_key`
- `apikey`
- `pwd`
- `secret`
- `credentials`
- `stripetoken`

Puedes proporcionar palabras clave sensibles adicionales proporcionando una lista delimitada por espacios en la variable de entorno: `DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS`. Esto se añade a las palabras por defecto y no las sobrescribe. Para utilizar esta variable de entorno, debes configurarla para los siguientes Agents:

- Agent núcleo
- Agent del clúster

```yaml
env:
    - name: DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS
      value: "customword1 customword2 customword3"
```

**Nota**: Cualquier palabra confidencial adicional debe proporcionarse como cadena en minúsculas. El Agent convierte el texto a minúsculas antes de buscar palabras confidenciales. Si la palabra confidencial es `password`, `MY_PASSWORD=1234` se convierte en `MY_PASSWORD=********`, ya que el Agent convierte `MY_PASSWORD` en `my_password`, lo que significa que la palabra confidencial `PASSWORD` no coincide con nada.

Por ejemplo, como `password` es una palabra confidencial, el limpiador cambia `<MY_PASSWORD>` en cualquiera de los siguientes casos por una cadena de asteriscos, `***********`:

```text
password <MY_PASSWORD>
password=<MY_PASSWORD>
password: <MY_PASSWORD>
password::::== <MY_PASSWORD>
config={"password":"<MY_PASSWORD>"}
```

Sin embargo, el limpiador no limpia rutas que contengan palabras confidenciales. Por ejemplo, no sobrescribe `/etc/vaultd/secret/haproxy-crt.pem` con `/etc/vaultd/******/haproxy-crt.pem` aunque `secret` sea una palabra confidencial.

## Configurar Orchestrator Explorer

### Matriz de compatibilidad de recopilación de recursos

En la siguiente tabla se presenta la lista de recursos recopilados y las versiones mínimas del Agent, Cluster Agent y Helm chart para cada uno.

| Recurso | Versión mínima del Agent | Versión mínima del Cluster Agent* | Versión mínima del Helm chart | Versión mínima de Kubernetes |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clústeres | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| CustomResourceDefinitions | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| CustomResources | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Despliegues | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Entradas | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Trabajos | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Espacios de nombres | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| Políticas de red | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nodos | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Servicios | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| Statefulsets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**Nota**: Después de la versión 1.22, la numeración de la versión del Cluster Agent sigue la numeración del Agent, a partir de la versión 7.39.0.

### Añadir etiquetas (tags) personalizadas a los recursos

Puedes añadir etiquetas personalizadas a los recursos de Kubernetes para facilitar el filtrado en la vista de recursos de Kubernetes.

Se añaden etiquetas adicionales a través de la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`.

**Nota**: Estas etiquetas solo aparecen en la vista de recursos de Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Añade la variable de entorno tanto en el Process Agent como en el Cluster Agent al establecer `agents.containers.processAgent.env` y `clusterAgent.env` en `datadog-agent.yaml`.

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

Luego, aplica la configuración nueva:

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Si utilizas el [Helm chart oficial][1], añade la variable de entorno tanto en el Process Agent como en el Cluster Agent al establecer `agents.containers.processAgent.env` y `clusterAgent.env` en [values.yaml][2].

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

Luego, actualiza tu Helm chart.

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Establece la variable de entorno en los contenedores del Process Agent y Cluster Agent:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Recopilar recursos personalizados

Por defecto, [Kubernetes Explorer][3] recopila automáticamente definiciones de recursos personalizados (CRD).

#### Matriz automática de compatibilidad de recopilaciones de recursos personalizados

Cuando los siguientes CRD están presentes en tu clúster, el Agent recopila automáticamente sus recursos personalizados (CR). Si un CRD que utilizas **no** aparece en esta lista o su versión de Agent es anterior, sigue los pasos de **configuración manual** que se indican a continuación.

| Grupo de CRD          | Tipo de CRD             | Versiones de CRD | Versión mínima del Agent |
| ------------------ | -------------------- | ------------ | --------------------- |
| datadoghq.com      | datadogslo           | v1alfa1     | 7.71.0                |
| datadoghq.com      | datadogdashboard     | v1alfa1     | 7.71.0                |
| datadoghq.com      | datadogagentprofile  | v1alfa1     | 7.71.0                |
| datadoghq.com      | datadogmonitor       | v1alfa1     | 7.71.0                |
| datadoghq.com      | datadogmetric        | v1alfa1     | 7.71.0                |
| datadoghq.com      | datadogpodautoscaler | v1alfa2     | 7.71.0                |
| datadoghq.com      | datadogagent         | v2alfa1     | 7.71.0                |
| argoproj.io        | despliegue              | v1alfa1     | 7.71.0                |
| karpenter.sh       | *                    | v1           | 7.71.0                |
| karpenter.k8s.aws  | *                    | v1           | 7.71.0                |
| azure.karpenter.sh | *                    | v1beta1      | 7.71.0                |


#### Configuración manual

Para los demás CRD, sigue estos pasos para recopilar los recursos personalizados que definen estos CRD:

1. En Datadog, abre el [Kubernetes Explorer][3]. En el panel izquierdo, en **Select Resources** (Seleccionar recursos), selecciona [**Kubernetes > Custom Resources > Resource Definitions** (Kubernetes > Recursos personalizados > Definiciones de recursos)][4].

1. Localiza el CRD que define el recurso personalizado que quieres visualizar en el Explorer. En la columna **Versions** (Versiones), haz clic en la etiqueta `version` para la que quieres configurar la indexación.

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="Video de Kubernetes Explorer con el menú de recursos personalizados ampliado y Resource Definitions (Definiciones de recursos) seleccionado. El cursor desciende hasta una de las filas de la tabla y, en la columna 'Versions' (Versiones), hace clic en una de las versiones. El cursor selecciona 'v1alpha1'. Aparece un modal." video="true">}}

   Aparece un modal:
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="El modal Collecting and Indexing (Recopilación e indexación) contiene dos secciones: Set up Datadog Agent (Configurar el Datadog Agent), con fragmentos copiables para actualizar una configuración del Agent, y Select indexed fields (Seleccionar campos indexados), para filtrar/clasificar, con casillas de verificación de los campos a indexar y una vista previa.">}}

1. Sigue las instrucciones de la sección **Set up Datadog Agent** (Configurar el Datadog Agent) del modal para actualizar la configuración del Agent para los clústeres que no están recopilando recursos personalizados. El modal enumera todos los cústeres de este tipo, ya sea porque el Agent no está configurado para recopilar recursos personalizados o porque no hay ninguno disponible en ese clúster. Si el Agent está configurado y no existen recursos personalizados, no se requiere ninguna acción.

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Añade la siguiente configuración a `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Actualiza tu Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Instala ek Datadog Operator con una opción que conceda al Datadog Agent permiso para recopilar recursos personalizados:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Añade la siguiente configuración a tu manifiesto `DatadogAgent`, `datadog-agent.yaml`:

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

   1. Aplica tu nueva configuración:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   Cada `<CUSTOM_RESOURCE_NAME>` debe utilizar el formato `group/version/kind`.

1. En el modal, en **Select indexed fields for filtering/sorting** (Seleccionar campos indexados para filtrar/clasificar), selecciona los campos que quieres indexar del recurso personalizado para filtrar y clasificar. Para algunos CRD, Datadog proporciona una configuración por defecto. Puedes seleccionar campos adicionales, si es necesario.

    <div class="alert alert-info">Una vez configurado el Datadog Agent, recopila automáticamente los recursos personalizados disponibles. La indexación de campos es opcional.</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="Video del modal Collecting and Indexing (Recopilación e indexación). El cursor selecciona tres campos y hace clic en Update Fields (Actualizar campos). Aparece un mensaje de confirmación de la operación." video="true">}}

    Para matrices de objetos, consulta la sección [Indexación de tipos complejos](#indexing-complex-types).

1.  Selecciona **Update Fields** (Actualizar campos) para guardar.

Una vez indexados los campos, puedes añadirlos como columnas en el Explorer y ordenarlos, o incluirlos en Saved Views (Vistas guardadas). También puedes filtrar los campos indexados utilizando el prefijo `field#`.

### Indexación de tipos complejos

{{< img src="containers/explorer/crd_groupby_1.png" alt="Configuración de la indexación: Matriz de objetos[] de destino, con opciones del menú 'Group by' (Agrupar por): ningún campo, containerResource.container, containerResource.name, containerResource.value.type, etc." style="width:100%;" >}}

Para las matrices de objetos, existen dos estrategias de agrupación:

-   `No field`: Los campos anidados del objeto se indexan únicamente por el nombre del campo anidado.
-   **Campo** (por ejemplo: `type`, `status`, etc.): Los campos anidados del objeto se indexan en función de cada valor de campo único.

##### Ejemplo: Filtrado de recursos personalizados DatadogPodAutoscaler

Considera estos dos recursos personalizados:

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

Las posibilidades de filtrado en `status.conditions` se basan en las dos estrategias de indexación:

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

**Consultas de ejemplo:**

**Consulta 1:**

```text
field#status.conditions.status:"False"
```

**Resultado:** Devuelve CR1 y CR2. Ambos CR tienen al menos un objeto con `status:"False"`

**Consulta 2:**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**Resultado:** Devuelve CR1 y CR2. Al menos un objeto `status.condition` de cada recurso personalizado coincide con uno de los filtros, aunque no sea el mismo objeto el que coincide con ambos filtros.

{{% /tab %}}
{{% tab "Agrupación por tipo" %}}

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

**Resultado:** Devuelve CR2. Solo se devuelve un objeto `status.condition` con `type:"HorizontalAbleToScale"` y `status:"False"`.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Puedes seleccionar hasta 50 campos por recurso. Puedes utilizar la vista previa para confirmar tus opciones de indexación.</div>

### Recopilar métricas de recursos personalizados utilizando el check Kubernetes State Core

<div class="alert alert-info">Esta funcionalidad requiere Cluster Agent v7.63.0 o posterior.</div>

Puedes utilizar el check `kubernetes_state_core` para recopilar métricas de recursos personalizados al ejecutar el Datadog Cluster Agent.

1. Escribe definiciones para tus recursos personalizados y los campos que se convertirán en métricas de acuerdo con el siguiente formato:
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

   Por defecto, los nombres de recursos RBAC y API se derivan del tipo en groupVersionKind convirtiéndolo a minúsculas y añadiendo un sufijo "s" (por ejemplo, Kind: ENIConfig → eniconfigs). Si la definición del recurso personalizado (CRD) utiliza una forma en plural diferente, puedes anular este comportamiento especificando el campo del recurso. En el ejemplo anterior, CNINode anula el predeterminado estableciendo el recurso: "cninode-pluralized".

   Los nombres de las métricas se producen siguiendo las siguientes reglas:
   - Sin prefijo: `kubernetes_state_customresource.<metrics.name>`
   - Con prefijo: `kubernetes_state_customresource.<metricNamePrefix>_<metric.name>`

   Para obtener más detalles, consulta [Métricas del estado de los recursos personalizados][5].

2. Actualiza la configuración de tu Helm o Datadog Operator:

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Añade la siguiente configuración a `datadog-values.yaml`:

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

       Sustituye `<CUSTOM_RESOURCE_METRIC>` por las definiciones que escribiste en el primer paso.

   1. Actualiza tu Helm chart:

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">
      This functionality requires Agent Operator v1.20+.
   </div>

   1. Instala el Datadog Operator con una opción que conceda al Datadog Agent permiso para recopilar recursos personalizados:

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Añade la siguiente configuración a tu manifiesto `DatadogAgent`, `datadog-agent.yaml`:

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

      Sustituye `<CUSTOM_RESOURCE_METRIC>` por las definiciones que escribiste en el primer paso.

   1. Aplica tu nueva configuración:

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /es/infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
[5]: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md