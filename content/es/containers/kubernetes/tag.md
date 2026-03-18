---
aliases:
- /es/agent/autodiscovery/tag/
- /es/agent/kubernetes/tag
description: Configurar la extracción automática de etiquetas de Kubernetes y anotaciones
  para mejorar la supervisión
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Cómo empezar con las etiquetas
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Uso de etiquetas con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitar la recopilación de datos a un subconjunto de contenedores solamente
title: Extracción de etiquetas de Kubernetes
---
El agente Datadog puede asignar etiquetas automáticamente a métricas, trazas y registros emitidos por un pod (o un contenedor individual dentro de un pod) en función de etiquetas o anotaciones.

## Etiquetas fuera de la caja

La lista de etiquetas asignadas automáticamente depende de la [configuración de cardinalidad] del agente[1]. [Tag Cardinality] [4] se añade antes de la ingestión y puede afectar a la facturación, ya que diferentes ajustes de cardinalidad afectan al número de métricas emitidas.

<div style="overflow-x: auto;">

  | Etiqueta | Cardenalidad | Fuente | Requisito |
  |||||
  | `id_contenedor` | Alto | Estado de la cápsula | N/A |
  | `display_container_name` | Alta | Estado del Pod | N/A |
  | `pod_name` | Orchestrator | Metadatos del Pod | N/A |
  | `oshift_deployment` | Orchestrator | Anotación de pod `openshift.io/deployment.name` | El entorno OpenShift y la anotación de pod deben existir |
  | `kube_ownerref_name` | Orchestrator | Pod ownerref | Pod debe tener un propietario |
  | `kube_job` | Orchestrator | Pod ownerref | Pod debe estar unido a un cronjob |
  | `kube_job` | Low | Pod ownerref | Pod debe estar unido a un trabajo |
  | `kube_replica_set` | Low | Pod ownerref | Pod debe estar unido a un conjunto de réplicas |
  | `kube_service` | Low | Descubrimiento del servicio Kubernetes | Pod está detrás de un servicio Kubernetes |
  | `kube_daemon_set` | Low | Pod ownerref | Pod debe estar unido a un DaemonSet |
  | `kube_container_name` | Bajo | Estado de la cápsula | N/A |
  | `kube_namespace` | Bajo | Metadatos del Pod | N/A |
  | `kube_app_name` | Low | Pod label `app.kubernetes.io/name` | Pod label must exist |
  | `kube_app_instance` | Bajo | Etiqueta de la cápsula `app.kubernetes.io/instance` | La etiqueta de la cápsula debe existir |
  | `kube_app_version` | Low | Pod label `app.kubernetes.io/version` | Pod label must exist |
  | `kube_app_component` | Low | Pod label `app.kubernetes.io/component` | Pod label must exist |
  | `kube_app_part_of` | Baja | Etiqueta de la cápsula `app.kubernetes.io/partof` | La etiqueta de la cápsula debe existir |
  | `kube_app_managed_by` | Low | Pod label `app.kubernetes.io/managedby` | Pod label must exist |
  | `env` | Low | Pod label `tags.datadoghq.com/env` o container envvar (`DD_ENV` o `OTEL_RESOURCE_ATTRIBUTES`) | [Etiquetado de servicio unificado][2] habilitado |
  | `version` | Low | Pod label `tags.datadoghq.com/version` o container envvar (`DD_VERSION` o `OTEL_RESOURCE_ATTRIBUTES`) | [Etiquetado de servicio unificado][2] habilitado |
  | `service` | Low | Pod label `tags.datadoghq.com/service` o container envvar (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, u `OTEL_SERVICE_NAME`) | [Etiquetado de servicio unificado][2] habilitado |
  | `pod_phase` | Baja | Estado de la cápsula | N/A |
  | `oshift_deployment_config` | Low | Anotación de pod `openshift.io/deploymentconfig.name` | El entorno OpenShift y la anotación de pod deben existir |
  | `kube_ownerref_kind` | Bajo | Pod ownerref | Pod debe tener un propietario |
  | `kube_deployment` | Low | Pod ownerref | Pod debe estar adjunto a una implementación |
  | `kube_argo_rollout` | Bajo | Pod ownerref | Pod debe estar unido a un argo rollout |
  | `kube_replication_controller` | Low | Pod ownerref | Pod debe estar conectado a un controlador de replicación |
  | `kube_stateful_set` | Low | Pod ownerref | Pod debe estar unido a un statefulset |
  | `persistentvolumeclaim` | Low | Pod spec | Se debe acoplar un PVC al pod |
  | `kube_cronjob` | Baja | Pod ownerref | Pod debe estar unido a un cronjob |
  | `nombre_imagen` | Bajo | Especificaciones del Pod | N/A |
  | `short_image` | Low | Pod spec | N/A |
  | `image_tag` | Low | Pod spec | N/A |
  | `eks_fargate_node` | Low | Pod spec | Entorno EKS Fargate |
  | `kube_runtime_class` | Low | Pod spec | Pod debe adjuntarse a una clase runtime |
  | `gpu_vendor` | Low | Pod spec | El contenedor debe estar conectado a un recurso de la GPU |
  | `id_imagen` | Bajo | ID de imagen del contenedor | N/A |
  | `kube_autoscaler_kind` | Bajo | Tipo de autoscaler Kubernetes | Se debe usar el autoscaler Kubernetes |
  | `kube_priority_class` | Low | Pod priority class | Pod debe tener establecida la clase de prioridad |
  | `kube_qos` | Low | Pod Clase de calidad de servicio | N/A |

</div>


### Etiqueta host

El agente puede adjuntar información del entorno de Kubernetes como "etiquetas de host".

<div style="overflow-x: auto;">

  | Etiqueta | Cardenalidad | Fuente | Requisito |
  |||||
  | `kube_cluster_name` | Low | `DD_CLUSTER_NAME` envvar o integración del proveedor en la nube | `DD_CLUSTER_NAME` envvar o integración del proveedor en la nube habilitada |
  | `kube_node_role` | Low | Etiqueta del nodo `noderole.kubernetes.io/<role>` | La etiqueta del nodo debe existir |
  | `kube_node` | Low | Campo `NodeName` en las especificaciones de un pod | |
  | `orch_cluster_id` | Low | Metadatos del clúster del orquestador | Entorno del orquestador |
  | `kube_distribution` | Low | Etiquetas de nodo y NodeSystemInfo | |
</div>

## Etiqueta Autodescubrimiento

A partir del Agente v6.10+, el Agente puede autodescubrir etiquetas a partir de anotaciones Pod. Permite al Agente asociar etiquetas a todos los datos emitidos por las cápsulas completas o un contenedor individual dentro de esta cápsula.

Como mejor práctica en entornos contenedores, Datadog recomienda usar el etiquetado de servicios unificado para ayudar a unificar las etiquetas. El etiquetado de servicio unificado une la telemetría Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender a configurar su entorno con etiquetado unificado, consulte la documentación dedicada [etiquetado de servicio unificado][2].

Para aplicar un `<TAG_KEY>:<TAG_VALUE>` etiqueta a todos los datos emitidos por un pod dado y recopilados por el Agente utilice la siguiente anotación en su pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Si desea aplicar un `<TAG_KEY>:<TAG_VALUE>` etiqueta a un contenedor individual `<CONTAINER_NAME>` dentro de una cápsula, utilice la siguiente anotación en su cápsula:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

A partir de Agent v7.17+, el Agente puede Autodescubrir etiquetas de etiquetas Docker. Este proceso permite al agente asociar etiquetas personalizadas a todos los datos emitidos por un contenedor, sin modificar la configuración del agente.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

A partir de Agent v7.77+, las anotaciones de etiquetas admiten [variables de plantilla de detección automática][5] para el etiquetado dinámico basado en metadatos en tiempo de ejecución. Con la excepción de `%%env_<VAR>%%`, se admiten todas las variables de plantilla.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## Extracción de etiquetas

A partir de la versión 7.64+, el agente y el agente de clúster se pueden configurar para recopilar etiquetas y anotaciones de los recursos de Kubernetes y usarlas como etiquetas de una configuración común. Datadog recomienda utilizar las siguientes opciones para garantizar la presentación de informes coherentes en todo el etiquetado central del agente, los informes KSM del agente de clúster y los informes Orchestrator Explorer de ambos agentes:
 `kubernetesRecursosEtiquetasComoEtiquetas`
 `kubernetesRecursosAnotacionesComoEtiquetas`

Estas opciones deben usarse en lugar de las opciones heredadas del agente `podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags` y cualquier configuración de KSM anula.

Estas configuraciones hacen referencia al tipo de recurso del objeto del que extraer metadatos. Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre plural del recurso. Los recursos en el grupo de API vacío (por ejemplo, pods y nodos) se pueden especificar usando solo el nombre `resourceType`.

Por ejemplo, ejecute `kubectl apiresources` para recuperar esta información:

| Nombre | Versión API | Configuración de recursos de Datadog |
||||
| cápsulas | v1 | cápsulas |
| nodos | v1 | nodos |
| espacios de nombres | v1 | espacios de nombres |
| despliegues | apps/v1 | despliegues.apps |
| roles | rbac.authorization.k8s.io/v1 | roles.rbac.authorization.k8s.io |

** Notas:**

 Las etiquetas *no* caen en cascada entre la carga de trabajo y los recursos infantiles. Por ejemplo, las etiquetas de una implementación no se aplican automáticamente a los registros de sus módulos secundarios. Para etiquetar los datos del Pod, configure la extracción de etiquetas directamente en los Pods.
 Las etiquetas *do* caen en cascada desde el espacio de nombres a las cápsulas y contenedores dentro de ellas.
 Use Datadog Agent 7.73+ para usar comodines en las reglas de extracción de etiquetas para sus métricas de KSM.

### Etiquetas de recursos de Kubernetes como etiquetas

Esta opción se utiliza para extraer una etiqueta determinada en sus recursos de Kubernetes y enviarla como una etiqueta Datadog.

{{< tabs >}}

{{% tab "Operador Datadog" %}}

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarlas como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      <RESOURCE>:
        <LABEL>: <TAG_KEY>
```

Por ejemplo, para extraer etiquetas de recursos de nodos, pods e implementaciones:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Timón" %}}

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarlas como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

Por ejemplo, para extraer etiquetas de recursos de nodos, pods e implementaciones:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarlas como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno a **tanto** sus contenedores Agent y Cluster Agent.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

Por ejemplo, para extraer etiquetas de recursos de nodos, pods e implementaciones:

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Para Agent 7.73.0+, utilice la siguiente configuración para agregar todas las etiquetas de recursos como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:
```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**Nota**: Las métricas personalizadas pueden afectar a la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.

#### Fusión con configuraciones heredadas

<div class="alert alert-info">

Esta opción de configuración se combina con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> y <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a> tienen prioridad al fusionar las configuraciones.

Por ejemplo, si tiene las siguientes configuraciones:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      label-1: tag-a
      label-2: tag-b

  podLabelsAsTags:
    label-2: legacy-tag-c
    label-3: legacy-tag-d
```

La siguiente asignación se utiliza para extraer etiquetas de etiquetas de vaina:

```yaml
label-1: tag-a
label-2: tag-b
label-3: legacy-tag-d
```

</div>

### Anotaciones de recursos de Kubernetes como etiquetas

Esta opción extrae una anotación especificada de sus recursos de Kubernetes y la envía como una etiqueta Datadog.

{{< tabs >}}

{{% tab "Operador Datadog" %}}

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarlos como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      <RESOURCE>:
        <ANNOTATION>: <TAG_KEY>
```

Por ejemplo, para extraer anotaciones de recursos de nodos, pods e implementaciones:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Timón" %}}

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarlos como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    <RESOURCE>:
      <ANNOTATION>: <TAG_KEY>
```

Por ejemplo, para extraer anotaciones de recursos de nodos, pods e implementaciones:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarlos como claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno a **tanto** sus contenedores Agent y Cluster Agent.

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"<RESOURCE>":{"<ANNOTATION>":"<TAG_KEY>"}}'
```

Por ejemplo, para extraer anotaciones de recursos de nodos, pods e implementaciones:

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Para Agent 7.73.0+, utilice la siguiente configuración para agregar todas las anotaciones de recursos como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**Nota**: Las métricas personalizadas pueden afectar a la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.

<div class="alert alert-info">

Esta opción de configuración se combina con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnotationsAsTags`</a> tienen prioridad al fusionar las configuraciones.

Por ejemplo, si tiene las siguientes configuraciones:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      annotation-1: tag-a
      annotation-2: tag-b

  podAnnotationsAsTags:
    annotation-2: legacy-tag-c
    annotation-3: legacy-tag-d
```

La siguiente asignación se utiliza para extraer etiquetas de anotaciones de vaina:

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="Configuración heredada" level="h4" expanded=false id="legacy-configuration" %}}
#### Etiquetas de nodo como etiquetas

<div class="alert alert-info">

Si está en la versión 7.58.0+ del agente, se le recomienda que use las etiquetas de <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">recursos Kubernetes como etiquetas</a> para configurar nodos como etiquetas.

</div>

A partir del Agente v6.0+, el Agente puede recopilar etiquetas para un nodo dado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos asociados con este `host` en Datadog:

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      <NODE_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      kubernetes.io/arch: arch
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.

#### Etiquetas de vaina como etiquetas

<div class="alert alert-info">

Si se encuentra en la versión 7.58.0+ del agente, se le recomienda que utilice las etiquetas de <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">recursos Kubernetes como etiquetas</a> para configurar las etiquetas del pod como etiquetas.

</div>

A partir del agente v6.0+, el agente puede recopilar etiquetas para un pod determinado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos por este pod:

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una etiqueta de pod determinada `<POD_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      <POD_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      app: kube_app
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una etiqueta de pod determinada `<POD_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Para Agent v7.24.0+, use la siguiente configuración de variables de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de pod determinada `<POD_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para Agent v7.24.0+, use la siguiente configuración de variables de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.

#### Anotaciones de vaina como etiquetas

<div class="alert alert-info">

Si se encuentra en la versión 7.58.0+ del agente, se le recomienda que utilice las etiquetas de <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">recursos Kubernetes como etiquetas</a> para configurar las anotaciones del pod como etiquetas.

</div>

A partir del agente v6.0+, el agente puede recopilar anotaciones para un pod determinado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos por este pod:

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      <POD_ANNOTATION>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      app: kube_app
```

Para Agent v7.24.0+, use la siguiente configuración de variables de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Para Agent v7.24.0+, use la siguiente configuración de variables de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Para Agent v7.24.0+, use la siguiente configuración de variables de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.

#### Etiquetas de espacio de nombres como etiquetas

<div class="alert alert-info">

Si está en la versión 7.58.0+ del agente, se le recomienda que utilice las etiquetas de <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">recursos Kubernetes como etiquetas</a> para configurar las etiquetas del espacio de nombres como etiquetas.

</div>

A partir del agente 7.55.0+, el agente puede recopilar etiquetas para un espacio de nombres determinado y usarlas como etiquetas para adjuntarlas a todas las métricas, trazas y registros emitidos por todos los módulos de este espacio de nombres:

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      <NAMESPACE_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      app: kube_app
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas del espacio de nombres como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

Por ejemplo, puede configurar:
```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas del espacio de nombres como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para Agent v7.24.0+, utilice la siguiente configuración de variables de entorno para agregar todas las etiquetas del espacio de nombres como etiquetas a sus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas tienen como prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para obtener más información.
{{% /collapse-content %}}

### Variables de entorno de contenedor como etiquetas

A partir de Agent v7.32+, Agent puede recopilar variables de entorno de contenedor y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros correspondientes al contenedor. Se admiten contenedores `muelle` y `contenedores`:

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte [Facturación de métricas personalizadas][3] para obtener más detalles.

### Etiquetas de contenedores como etiquetas

A partir del agente v7.33+, el agente puede recopilar etiquetas de contenedores y usarlas como etiquetas. El agente adjunta las etiquetas a todas las métricas, rastros y registros asociados con el contenedor.

El Agente puede generar etiquetas a partir de etiquetas de contenedores tanto para contenedores `docker` como `containerd`. En el caso de `containerd`, la versión mínima soportada es la versión v1.5.6, porque las versiones anteriores no propagan correctamente las etiquetas.

{{< tabs >}}
{{% tab "Operador Datadog" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración `DatadogAgent` de su Operador en `datadogagent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Timón" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarlo como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadogvalues.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, puede configurar:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarlo en una clave de etiqueta `<TAG_KEY>`, agregue la siguiente variable de entorno al Datadog Agent:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte [Facturación de métricas personalizadas][3] para obtener más detalles.

## Seguir leyendo

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environmentvariables
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/account_management/billing/custom_metrics
[4]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tagscardinality
[5]: /es/containers/guide/template_variables/