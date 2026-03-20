---
aliases:
- /es/agent/autodiscovery/tag/
- /es/agent/kubernetes/tag
description: Configurar la extracción automática de etiquetas a partir de las etiquetas
  y anotaciones de los pods de Kubernetes para una mejor supervisión
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Introducción a las etiquetas
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Uso de etiquetas con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limitar la recolección de datos a un subconjunto de contenedores solamente
title: Extracción de etiquetas de Kubernetes
---
El Agente de Datadog puede asignar automáticamente etiquetas a métricas, trazas y registros emitidos por un pod (o un contenedor individual dentro de un pod) basado en etiquetas o anotaciones.

## Etiquetas listas para usar

La lista de etiquetas asignadas automáticamente depende de la [configuración de cardinalidad][1] del Agente. La [Cardinalidad de Etiquetas][4] se agrega antes de la ingestión y puede afectar la facturación, ya que diferentes configuraciones de cardinalidad impactan el número de métricas emitidas.

<div style="overflow-x: auto;">

  | Etiqueta                           | Cardinalidad  | Fuente                                                                                                                        | Requisito                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | Alta         | Estado del pod                                                                                                                    | N/A                                                 |
  | `display_container_name`      | Alta         | Estado del pod                                                                                                                    | N/A                                                 |
  | `pod_name`                    | Orquestador | Metadatos del pod                                                                                                                  | N/A                                                 |
  | `oshift_deployment`           | Orquestador | Anotación del pod `openshift.io/deployment.name`                                                                                 | El entorno de OpenShift y la anotación del pod deben existir |
  | `kube_ownerref_name`          | Orquestador | Referencia del propietario del pod                                                                                                                  | El pod debe tener un propietario                              |
  | `kube_job`                    | Orquestador | Referencia del propietario del pod                                                                                                                  | El pod debe estar adjunto a un cronjob                   |
  | `kube_job`                    | Baja          | Referencia del propietario del pod                                                                                                                  | El pod debe estar adjunto a un trabajo                       |
  | `kube_replica_set`            | Baja          | Referencia del propietario del pod                                                                                                                  | El pod debe estar adjunto a un conjunto de réplicas               |
  | `kube_service`                | Bajo          | Descubrimiento de servicios de Kubernetes                                                                                                  | El Pod está detrás de un servicio de Kubernetes                  |
  | `kube_daemon_set`             | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe estar adjunto a un DaemonSet                 |
  | `kube_container_name`         | Bajo          | Estado del Pod                                                                                                                    | N/A                                                 |
  | `kube_namespace`              | Bajo          | Metadatos del Pod                                                                                                                  | N/A                                                 |
  | `kube_app_name`               | Bajo          | Etiqueta del Pod `app.kubernetes.io/name`                                                                                            | La etiqueta del Pod debe existir                                |
  | `kube_app_instance`           | Bajo          | Etiqueta del Pod `app.kubernetes.io/instance`                                                                                        | La etiqueta del Pod debe existir                                |
  | `kube_app_version`            | Bajo          | Etiqueta del Pod `app.kubernetes.io/version`                                                                                         | La etiqueta del Pod debe existir                                |
  | `kube_app_component`          | Bajo          | Etiqueta del Pod `app.kubernetes.io/component`                                                                                       | La etiqueta del Pod debe existir                                |
  | `kube_app_part_of`            | Bajo          | Etiqueta del Pod `app.kubernetes.io/part-of`                                                                                         | La etiqueta del Pod debe existir                                |
  | `kube_app_managed_by`         | Bajo          | Etiqueta del Pod `app.kubernetes.io/managed-by`                                                                                      | La etiqueta del Pod debe existir                                |
  | `env`                         | Bajo          | Etiqueta del Pod `tags.datadoghq.com/env` o variable de entorno del contenedor (`DD_ENV` o `OTEL_RESOURCE_ATTRIBUTES`)                               | [Etiquetado de servicio unificado][2] habilitado                |
  | `version`                     | Bajo          | Etiqueta del Pod `tags.datadoghq.com/version` o variable de entorno del contenedor (`DD_VERSION` o `OTEL_RESOURCE_ATTRIBUTES`)                       | [Etiquetado de servicio unificado][2] habilitado                |
  | `service`                     | Bajo          | Etiqueta del Pod `tags.datadoghq.com/service` o variable de entorno del contenedor (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, o `OTEL_SERVICE_NAME`) | [Etiquetado de servicio unificado][2] habilitado                |
  | `pod_phase`                   | Bajo          | Estado del Pod                                                                                                                    | N/A                                                 |
  | `oshift_deployment_config`    | Bajo          | Anotación del Pod `openshift.io/deployment-config.name`                                                                          | El entorno de OpenShift y la anotación del Pod deben existir |
  | `kube_ownerref_kind`          | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe tener un propietario                              |
  | `kube_deployment`             | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe estar adjunto a un despliegue                |
  | `kube_argo_rollout`           | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe estar adjunto a un despliegue de argo             |
  | `kube_replication_controller` | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe estar adjunto a un controlador de replicación    |
  | `kube_stateful_set`           | Bajo          | Referencia del propietario del Pod                                                                                                                  | El Pod debe estar adjunto a un statefulset               |
  | `persistentvolumeclaim`       | Bajo          | Especificación del pod                                                                                                                      | Se debe adjuntar un PVC al pod                   |
  | `kube_cronjob`                | Bajo          | Propietario del pod                                                                                                                  | El pod debe estar adjunto a un cronjob                   |
  | `image_name`                  | Bajo          | Especificación del pod                                                                                                                      | N/A                                                 |
  | `short_image`                 | Bajo          | Especificación del pod                                                                                                                      | N/A                                                 |
  | `image_tag`                   | Bajo          | Especificación del pod                                                                                                                      | N/A                                                 |
  | `eks_fargate_node`            | Bajo          | Especificación del pod                                                                                                                      | Entorno de EKS Fargate                             |
  | `kube_runtime_class`          | Bajo          | Especificación del pod                                                                                                                      | El pod debe estar adjunto a una clase de tiempo de ejecución             |
  | `gpu_vendor`                  | Bajo          | Especificación del pod                                                                                                                      | El contenedor debe estar adjunto a un recurso GPU        |
  | `image_id`                    | Bajo          | ID de imagen del contenedor                                                                                                            | N/A                                                 |
  | `kube_autoscaler_kind`        | Bajo          | Tipo de escalador automático de Kubernetes                                                                                                    | Se debe usar un escalador automático de Kubernetes                  |
  | `kube_priority_class`         | Bajo          | Clase de prioridad del pod                                                                                                            | El pod debe tener configurada la clase de prioridad                    |
  | `kube_qos`                    | Bajo          | Clase de calidad de servicio del pod                                                                                                  | N/A                                                 |

</div>


### Etiqueta de host

El agente puede adjuntar información del entorno de Kubernetes como "etiquetas de host".

<div style="overflow-x: auto;">

  | Etiqueta                 | Cardinalidad | Fuente                                                 | Requisito                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Bajo         | `DD_CLUSTER_NAME` integración de envvar o proveedor de nube | `DD_CLUSTER_NAME` integración de envvar o proveedor de nube habilitada |
  | `kube_node_role`    | Bajo         | Etiqueta de nodo `node-role.kubernetes.io/<role>`            | La etiqueta de nodo debe existir                                          |
  | `kube_node`         | Bajo         | `NodeName` campo en las especificaciones de un pod             |                                                              |
  | `orch_cluster_id`   | Bajo         | Metadatos del clúster del orquestador                          |  Entorno del orquestador                                    |
  | `kube_distribution` | Bajo         | Etiquetas de nodo y NodeSystemInfo                         |  |
</div>

## Etiqueta de Autodescubrimiento

A partir de la versión v6.10+ del Agente, el Agente puede autodescubrir etiquetas a partir de las anotaciones de los Pods. Permite al Agente asociar etiquetas a todos los datos emitidos por todos los pods o un contenedor individual dentro de este pod.

Como mejor práctica en entornos de contenedores, Datadog recomienda utilizar etiquetado de servicio unificado para ayudar a unificar las etiquetas. El etiquetado de servicio unificado vincula la telemetría de Datadog a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender a configurar su entorno con etiquetado unificado, consulte la documentación dedicada de [etiquetado de servicio unificado][2].

Para aplicar una etiqueta `<TAG_KEY>:<TAG_VALUE>` a todos los datos emitidos por un pod dado y recopilados por el Agente, use la siguiente anotación en su pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Si desea aplicar una etiqueta `<TAG_KEY>:<TAG_VALUE>` a un contenedor individual `<CONTAINER_NAME>` dentro de un pod, use la siguiente anotación en su pod:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

A partir de la versión v7.17+ del Agente, el Agente puede autodescubrir etiquetas a partir de etiquetas de Docker. Este proceso permite al Agente asociar etiquetas personalizadas a todos los datos emitidos por un contenedor, sin modificar la configuración del Agente.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

A partir de la versión v7.77+, las anotaciones de etiquetas admiten [variables de plantilla de Autodescubrimiento][5] para etiquetado dinámico basado en metadatos en tiempo de ejecución. Con la excepción de `%%env_<VAR>%%`, se admiten todas las variables de plantilla.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## Extracción de etiquetas

A partir de la versión 7.64+, el Agente y el Agente de Clúster pueden configurarse para recopilar etiquetas y anotaciones de recursos de Kubernetes y usarlas como etiquetas a partir de una configuración común. Datadog recomienda utilizar las siguientes opciones para garantizar informes consistentes en el etiquetado central del Agente, el informe KSM del Agente de Clúster y el informe del Explorador de Orquestadores de ambos Agentes:
- `kubernetesResourcesLabelsAsTags`
- `kubernetesResourcesAnnotationsAsTags`

Estas opciones deben usarse en lugar de las opciones heredadas del Agente `podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags` y cualquier anulación de configuración de KSM.

Estas configuraciones hacen referencia al tipo de recurso del objeto del cual extraer metadatos. Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre plural del recurso. Los recursos en el grupo de API vacío (por ejemplo, pods y nodos) se pueden especificar utilizando solo el nombre `resourceType`.

Por ejemplo, ejecute `kubectl api-resources` para recuperar esta información:

| Nombre        | Versión de API                  | Configuración de Recursos de Datadog  |
|-------------|------------------------------|---------------------------------|
| pods        | v1                           | pods                            |
| nodos       | v1                           | nodos                           |
| namespaces  | v1                           | namespaces                      |
| deployments | apps/v1                      | deployments.apps                |
| roles       | rbac.authorization.k8s.io/v1 | roles.rbac.authorization.k8s.io |

**Notas:**

- Las * etiquetas * no se propagan entre la carga de trabajo y los recursos secundarios. Por ejemplo, las etiquetas en un Deployment no se aplican automáticamente a los registros de sus Pods secundarios. Para etiquetar los datos de los Pods, configure la extracción de etiquetas directamente en los Pods.
- Las etiquetas * sí* se propagan desde el namespace a los pods y contenedores dentro de ellos.
- Utilice Datadog Agent 7.73+ para usar comodines en las reglas de extracción de etiquetas para sus Métricas de KSM.

### Etiquetas de recursos de Kubernetes como etiquetas

Esta opción se utiliza para extraer una etiqueta dada en sus recursos de Kubernetes y enviarla como una etiqueta de Datadog.

{{< tabs >}}

{{% tab "Operador de Datadog" %}}

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, para extraer etiquetas de recursos de nodos, pods y despliegues:

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

{{% tab "Helm" %}}

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

Por ejemplo, para extraer etiquetas de recursos de nodos, pods y despliegues:

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

Para extraer una etiqueta de recurso dada `<LABEL>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno a **tanto** sus contenedores de Agente y Agente de Clúster.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

Por ejemplo, para extraer etiquetas de recursos de nodos, pods y despliegues:

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Para Agente 7.73.0+, use la siguiente configuración para agregar todas las etiquetas de recurso como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**Notas**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.

#### Fusión con configuraciones heredadas

<div class="alert alert-info">

Esta opción de configuración se fusiona con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> y <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a> tiene prioridad al fusionar las configuraciones.

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

El siguiente mapeo se utiliza para extraer etiquetas de las etiquetas de los pods:

```yaml
label-1: tag-a
label-2: tag-b
label-3: legacy-tag-d
```

</div>

### Anotaciones de recursos de Kubernetes como etiquetas

Esta opción extrae una anotación especificada de sus recursos de Kubernetes y la envía como una etiqueta de Datadog.

{{< tabs >}}

{{% tab "Operador de Datadog" %}}

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, para extraer anotaciones de recursos de nodos, pods y despliegues:

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

{{% tab "Helm" %}}

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    <RESOURCE>:
      <ANNOTATION>: <TAG_KEY>
```

Por ejemplo, para extraer anotaciones de recursos de nodos, pods y despliegues:

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

Para extraer una anotación de recurso dada `<ANNOTATION>` y transformarla en claves de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno a **tanto** su Agente como a los contenedores del Agente del Clúster.

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"<RESOURCE>":{"<ANNOTATION>":"<TAG_KEY>"}}'
```

Por ejemplo, para extraer anotaciones de recursos de nodos, pods y despliegues:

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Para la versión 7.73.0+ del Agente, use la siguiente configuración para agregar todas las anotaciones de recurso como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**Notas**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.

<div class="alert alert-info">

Esta opción de configuración se fusiona con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a> tiene prioridad al fusionar las configuraciones.

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

El siguiente mapeo se utiliza para extraer etiquetas de las anotaciones de los pods:

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="Configuración Legada" level="h4" expanded=false id="legacy-configuration" %}}
#### Etiquetas de nodo como etiquetas

<div class="alert alert-info">

Si está en la versión 7.58.0+ del agente, se le aconseja usar <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Etiquetas de recursos de Kubernetes como etiquetas</a> para configurar etiquetas de nodo como etiquetas.

</div>

A partir de la versión v6.0+ del Agente, el Agente puede recopilar etiquetas para un nodo dado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos asociados con este `host` en Datadog:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la `DatadogAgent` configuración de su Operador en `datadog-agent.yaml`:

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

Por ejemplo, podría configurar:

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

Para la versión v7.24.0+ del Agente, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

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

{{% tab "Helm" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Para la versión v7.24.0+ del Agente, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de nodo dada `<NODE_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Para la versión v7.24.0+ del Agente, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de nodo como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.

#### Etiquetas de pod como etiquetas

<div class="alert alert-info">

Si está en la versión 7.58.0+ del agente, se le aconseja usar <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">Etiquetas de recursos de Kubernetes como etiquetas</a> para configurar etiquetas de pod como etiquetas.

</div>

A partir de la versión v6.0+ del Agente, el Agente puede recopilar etiquetas para un pod dado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos por este pod:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una etiqueta de pod dada `<POD_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, podría configurar:

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

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas. En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

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

{{% tab "Helm" %}}
Para extraer una etiqueta de pod dada `<POD_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadog-values.yaml`:

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de pod dada `<POD_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de pod como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.

#### Anotaciones de pod como etiquetas

<div class="alert alert-info">

Si está en la versión del agente 7.58.0+, se le aconseja usar <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">etiquetas de recursos de Kubernetes como etiquetas</a> para configurar las anotaciones de pod como etiquetas.

</div>

A partir del Agente v6.0+, el Agente puede recopilar anotaciones para un pod dado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos por este pod:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`

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

Por ejemplo, podría configurar:

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

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

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

{{% tab "Helm" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadog-values.yaml`:

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una anotación de pod dada `<POD_ANNOTATION>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las anotaciones de pod como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.

#### Etiquetas de espacio de nombres como etiquetas

<div class="alert alert-info">

Si está en la versión del agente 7.58.0+, se le aconseja usar <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">etiquetas de recursos de Kubernetes como etiquetas</a> para configurar las etiquetas de espacio de nombres como etiquetas.

</div>

A partir del Agente 7.55.0+, el Agente puede recopilar etiquetas para un espacio de nombres dado y usarlas como etiquetas para adjuntar a todas las métricas, trazas y registros emitidos por todos los pods en este espacio de nombres:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, podría configurar:

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

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de espacio de nombres como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

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

{{% tab "Helm" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadog-values.yaml`:

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

Por ejemplo, podría configurar:

```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de espacio de nombres como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de espacio de nombres dada `<NAMESPACE_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agente v7.24.0+, use la siguiente configuración de variable de entorno para agregar todas las etiquetas de espacio de nombres como etiquetas a sus métricas, excepto aquellas de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas están precedidos por `<PREFIX>_`:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte la [página de facturación de métricas personalizadas][3] para más información.
{{% /collapse-content %}}

### Variables de entorno de contenedor como etiquetas

A partir de la versión 7.32+ del Agente, el Agente puede recopilar variables de entorno de contenedor y usarlas como etiquetas para adjuntarlas a todas las métricas, trazas y registros correspondientes al contenedor. Se admiten tanto los contenedores `docker` como `containerd`:

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, podría configurar:

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

{{% tab "Helm" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadog-values.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una variable de entorno dada `<ENV_VAR>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte [Facturación de Métricas Personalizadas][3] para más detalles.

### Etiquetas de contenedor como etiquetas

A partir de la versión 7.33+ del Agente, el Agente puede recopilar etiquetas de contenedor y usarlas como etiquetas. El agente adjunta las etiquetas a todas las métricas, trazas y registros asociados con el contenedor.

El Agente puede generar etiquetas a partir de etiquetas de contenedor para los contenedores `docker` y `containerd`. En el caso de `containerd`, la versión mínima admitida es v1.5.6, porque las versiones anteriores no propagan las etiquetas correctamente.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a la configuración de su Operador `DatadogAgent` en `datadog-agent.yaml`:

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

Por ejemplo, podría configurar:

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

{{% tab "Helm" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, agregue la siguiente configuración a su archivo Helm `datadog-values.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Por ejemplo, podría configurar:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una etiqueta de contenedor dada `<CONTAINER_LABEL>` y transformarla a una clave de etiqueta `<TAG_KEY>`, agregue la siguiente variable de entorno al Agente de Datadog:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden afectar la facturación. Consulte [Facturación de Métricas Personalizadas][3] para más detalles.

## Lectura Adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/account_management/billing/custom_metrics
[4]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[5]: /es/containers/guide/template_variables/