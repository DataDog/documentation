---
aliases:
- /es/agent/autodiscovery/tag/
- /es/agent/kubernetes/tag
description: Configurar la extracción automática de etiquetas a partir de las etiquetas
  (labels) y anotaciones de pod de Kubernetes para mejorar la monitorización
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Cómo usar etiquetas con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
title: Extracción de etiquetas de Kubernetes
---

El Datadog Agent puede asignar automáticamente etiquetas a métricas, trazas y logs emitidos por un pod (o un contenedor individual dentro de un pod) basándose en etiquetas o anotaciones.

## Etiquetas (tags) predefinidas

La lista de etiquetas asignadas automáticamente depende de la [configuración de cardinalidad][1] del Agent. La [cardinalidad de las etiquetas][4] se añade antes de la ingesta y puede afectar a la facturación, ya que las distintas configuraciones de cardinalidad influyen en el número de métricas emitidas.

<div style="overflow-x: auto;">

  | Tag  (Etiqueta)                         | Cardinalidad  | Source (Fuente)                                                                                                                       | Requisito                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | Alto         | Estado del pod                                                                                                                    | N/A                                                 |
  | `display_container_name`      | Alto         | Estado del pod                                                                                                                    | N/A                                                 |
  | `pod_name`                    | Orquestador | Metadatos del pod                                                                                                                  | N/A                                                 |
  | `oshift_deployment`           | Orquestador | Anotación del pod `openshift.io/deployment.name`                                                                                 | El entorno de OpenShift y la anotación del pod deben existir |
  | `kube_ownerref_name`          | Orquestador | Referencia del propietario del pod                                                                                                                  | El pod debe tener un propietario                              |
  | `kube_job`                    | Orquestador | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un job (generic) programado                   |
  | `kube_job`                    | Bajo          | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un job (generic)                       |
  | `kube_replica_set`            | Bajo          | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un conjunto de réplicas               |
  | `kube_service`                | Bajo          | Descubrimiento de servicios de Kubernetes                                                                                                  | El pod está detrás de un servicio de Kubernetes                  |
  | `kube_daemon_set`             | Bajo          | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un DaemonSet                 |
  | `kube_container_name`         | Bajo          | Estado del pod                                                                                                                    | N/A                                                 |
  | `kube_namespace`              | Bajo         | Metadatos del pod                                                                                                                   | N/A                                                 |
  | `kube_app_name`               | Bajo         | Etiqueta del pod `app.kubernetes.io/name`                                                                                            | La etiqueta del pod debe existir                                |
  | `kube_app_instance`           | Bajo         | Etiqueta del pod `app.kubernetes.io/instance`                                                                                        | La etiqueta del pod debe existir                                |
  | `kube_app_version`            | Bajo         | Etiqueta del pod `app.kubernetes.io/version`                                                                                         | La etiqueta del pod debe existir                                |
  | `kube_app_component`          | Bajo         | Etiqueta del pod `app.kubernetes.io/component`                                                                                       | La etiqueta del pod debe existir                                |
  | `kube_app_part_of`            | Bajo         | Etiqueta del pod `app.kubernetes.io/part-of`                                                                                         | La etiqueta del pod debe existir                              |
  | `kube_app_managed_by`         | Bajo          | Etiqueta del pod `app.kubernetes.io/managed-by`                                                                                      | La etiqueta del pod debe existir                                |
  | `env`                         | Bajo         | Etiqueta del pod `tags.datadoghq.com/env` o variable de entorno del contenedor (`DD_ENV` o `OTEL_RESOURCE_ATTRIBUTES`)                               | [Etiquetado de servicio unificado][2] activado                |
  | `version`                     | Bajo         | Etiqueta del pod `tags.datadoghq.com/version` o variable de entorno del contenedor (`DD_VERSION` o `OTEL_RESOURCE_ATTRIBUTES`)                       | [Etiquetado de servicio unificado][2] activado                |
  | `service`                     | Bajo          | Etiqueta del pod `tags.datadoghq.com/service` o variable de entorno del contenedor (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES` o `OTEL_SERVICE_NAME`) | [Etiquetado de servicio unificado][2] activado                |
  | `pod_phase`                   | Bajo         | Estado del pod                                                                                                                    | N/A                                                 |
  | `oshift_deployment_config`    | Bajo         | Anotación del pod `openshift.io/deployment-config.name`                                                                          | El entorno de OpenShift y la anotación del pod deben existir |
  | `kube_ownerref_kind`          | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe tener un propietario                              |
  | `kube_deployment`             | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un despliegue                |
  | `kube_argo_rollout`           | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un lanzamiento de argo             |
  | `kube_replication_controller` | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe estar asociado a un controlador de replicación    |
  | `kube_stateful_set`           | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe estar a un conjunto completo de estados              |
  | `persistentvolumeclaim`       | Bajo         | Especificación del pod                                                                                                                      | Un PVC debe estar asociado al pod                   |
  | `kube_cronjob`                | Bajo         | Referencia del propietario del pod                                                                                                                  | El pod debe estar a un job (generic) programado                   |
  | `image_name`                  | Bajo         | Especificación del pod                                                                                                                      | N/A                                                 |
  | `short_image`                 | Bajo         | Especificación del pod                                                                                                                      | N/A                                                 |
  | `image_tag`                   | Bajo         | Especificación del pod                                                                                                                      | N/A                                                 |
  | `eks_fargate_node`            | Bajo         | Especificación del pod                                                                                                                      | Entorno de EKS Fargate                             |
  | `kube_runtime_class`          | Bajo         | Especificación del pod                                                                                                                      | El pod debe estar asociado a una clase de tiempo de ejecución             |
  | `gpu_vendor`                  | Bajo         | Especificación del pod                                                                                                                      | El contenedor de estar asociado a un recurso de GPU        |
  | `image_id`                    | Bajo         | Identificador de imagen del contenedor                                                                                                            | N/A                                                 |
  | `kube_autoscaler_kind`        | Bajo         | Tipo de autoescalador de Kubernetes                                                                                                    | Se debe utilizar el autoescalador de Kubernetes                   |
  | `kube_priority_class`         | Bajo         | Clase de prioridad del pod                                                                                                            | El pod debe tener un conjunto de clases de prioridad                    |
  | `kube_qos`                    | Bajo         | Clase de calidad del servicio del pod                                                                                                  | N/A                                                 |

</div>


### Etiqueta de host

El Agent puede adjuntar información del entorno de Kubernetes como "etiquetas de host".

<div style="overflow-x: auto;">

  | Etiqueta                 | Cardinalidad | Fuente                                                 | Requisito                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Baja         | Variable de entorno `DD_CLUSTER_NAME` o integración del proveedor de nube | Variable de entorno `DD_CLUSTER_NAME` o integración del proveedor de nube activado |
  | `kube_node_role`    | Baja         | Etiqueta de nodo `node-role.kubernetes.io/<role>`            | La etiqueta de nodo debe existir                                          |
  | `kube_node`         | Baja         | Campo `NodeName` en las especificaciones de un pod               |                                                                |
  | `orch_cluster_id`         | Baja         | Metadatos del clúster del orquestador               |  Entorno del orquestador                            |                                                              |

</div>

## Autodiscovery de etiqueta

A partir de Agent v6.10+, Agent puede hacer Autodiscovery de etiquetas a partir de anotaciones de pod. Permite al Agent asociar etiquetas a todos los datos emitidos por los pods completos o un contenedor individual dentro de este pod.

Como práctica recomendada en los entornos en contenedores, Datadog recomienda utilizar el etiquetado de servicios unificado para ayudar a unificar etiquetas. El etiquetado de servicios unificado une la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la documentación dedicada de [etiquetado de servicio unificado][2].

Para aplicar una etiqueta `<TAG_KEY>:<TAG_VALUE>` a todos los datos emitidos por un pod determinado y recopilados por el Agent, utiliza la siguiente anotación en tu pod:

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Si deseas aplicar una etiqueta `<TAG_KEY>:<TAG_VALUE>` a un contenedor `<CONTAINER_NAME>` individual dentro de un pod, utiliza la siguiente anotación en tu pod:

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

A partir de Agent v7.17+, Agent puede hacer Autodiscovery de etiquetas a partir de las labels (etiquetas) de Docker. Este proceso permite al Agent asociar etiquetas personalizadas a todos los datos emitidos por un contenedor, sin modificar la configuración del Agent.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

## Extracción de etiquetas

### Etiquetas de recursos de Kubernetes como etiquetas

A partir de Agent v7.58+, el Agent puede configurarse para recopilar etiquetas (labels) de los recursos de Kubernetes y utilizarlas como etiquetas (tags).

**Nota:** Las etiquetas no se aplican en cascada entre recursos primarios y secundarios. Por ejemplo, las etiquetas (labels) de un despliegue no se aplican automáticamente a los logs de sus pods secundarios. Para etiquetar los logs de pod, configura las etiquetas (labels) directamente en los pods.

Esta opción de configuración es más genérica y debería preferirse a las siguientes opciones:
- podLabelsAsTags
- nodeLabelsAsTags
- namespaceLabelsAsTags

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo, `pods` y `nodes`), puede especificarse utilizando `resourceType`.


Para extraer una determinada etiqueta (label) de nodo `<NODE_LABEL>` y transformarlas como claves de etiqueta (tag) `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente configuración a la configuración  `DatadogAgent` del operador en `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        <NODE_LABEL>: <NODE_TAG_KEY>
```

Por ejemplo:

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
        baz: qux
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

{{% /tab %}}

{{% tab "Helm" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo, `pods` y `nodes`), puede especificarse utilizando `resourceType`.

Para extraer una determinada etiqueta (label) de nodo `<NODE_LABEL>` y transformarla como claves de etiqueta (tag) `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo Helm `datadog-values.yaml`:


```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      <NODE_LABEL>: <NODE_TAG_KEY>
```

Po ejemplo, podrías configurar:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      baz: qux
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      "*": <PREFIX>_%%label%%
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo `pods` y `nodes`), puede especificarse utilizando `resourceType`.

Para extraer una determinada etiqueta (label) de nodo `<NODE_LABEL>` y transformarla como clave de etiqueta (tag) `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente variable de entorno al Datadog Agent:

```bash
 DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"nodes":{"<NODE_LABEL>": "<NODE_TAG_KEY>"}}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"nodes":{"kubernetes.io/arch": "arch"},"pods":{"baz":"qux"}}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS='{"pods":{"*": "<PREFIX>_%%label%%"}}'
```

{{% /tab %}}
{{< /tabs >}}

**Notas**: Las métricas personalizadas pueden afectar a la facturación. Consulta la página [Facturación de métricas personalizadas][3] para más información.

<div class="alert alert-info">

Esta opción de configuración se fusiona con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> y <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a> tiene preferencia al fusionar configuraciones.

Por ejemplo, si tienes las siguientes configuraciones:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      foo: bar
      baz: qux

  podLabelsAsTags:
    foo: quux
    bar: quuz
```

La siguiente asignación se utiliza para extraer etiquetas (tags) desde etiquetas (labels) de pod:

```yaml
foo: bar
baz: qux
bar: quuz
```

</div>



### Anotaciones de recursos de Kubernetes como etiquetas

A partir del Agent v7.58+, el Agent puede configurarse para recopilar anotaciones de los recursos de Kubernetes y utilizarlas como etiquetas.

**Nota:** Las etiquetas no se aplican en cascada entre los recursos primarios y secundarios. Por ejemplo, las anotaciones en un despliegue no se aplican automáticamente a los logs de sus pods secundarios. Para etiquetar los logs de pod, configura las anotaciones directamente en los pods.

Esta opción de configuración es más genérica y debería preferirse a las siguientes opciones:
- podAnnotationsAsTags
- nodeAnnotationsAsTags
- namespaceAnnotationsAsTags

{{< tabs >}}

{{% tab "Datadog Operator" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo, `pods` y `nodes`), puede especificarse utilizando `resourceType`.


Para extraer una determinada anotación de nodo `<NODE_ANNOTATION>` y transformarla como clave de etiqueta `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` del operador en `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        <NODE_ANNOTATION>: <NODE_TAG_KEY>
```

Por ejemplo:

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
        baz: qux
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las anotaciones de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

{{% /tab %}}

{{% tab "Helm" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo `pods` y `nodes`), puede especificarse utilizando `resourceType`.

Para extraer una determinada anotación de nodo `<NODE_ANNOTATION>` y transformarla como clave de etiqueta `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo Helm datadog-values.yaml:


```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      <NODE_ANNOTATION>: <NODE_TAG_KEY>
```

Por ejemplo:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      baz: qux
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las anotaciones de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      "*": <PREFIX>_%%annotation%%
```

{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}

Cada tipo de recurso debe especificarse en el formato `resourceType.apiGroup`, donde `resourceType` es el nombre en plural del recurso.

Si un recurso específico se encuentra en el grupo de API vacío (por ejemplo, `pods` y `nodes`), puede especificarse utilizando `resourceType`.

Para extraer una determinada anotación de nodo `<NODE_ANNOTATION>` y transformarla como clave de etiqueta `<NODE_TAG_KEY>` dentro de Datadog, añade la siguiente variable de entorno al Datadog Agent:

```bash
 DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"nodes":{"<NODE_ANNOTATION>": "<NODE_TAG_KEY>"}}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"nodes":{"kubernetes.io/arch": "arch"},"pods":{"baz":"qux"}}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las anotaciones de recursos como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS='{"pods":{"*": "<PREFIX>_%%annotation%%"}}'
```

{{% /tab %}}
{{< /tabs >}}

**Notas**: Las métricas personalizadas pueden afectar a la facturación. Consulta la página [Facturación de métricas personalizadas][3] para más información.

<div class="alert alert-info">

Esta opción de configuración se fusiona con otras configuraciones establecidas en <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-annotations-as-tags">namespaceAnnotationsAsTags</a> y <a href="/containers/kubernetes/tag/#node-annotations-as-tags">nodeAnnotationsAsTags</a>. En caso de conflicto, <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a> tiene preferencia al fusionar configuraciones.

Por ejemplo, si tienes las siguientes configuraciones:

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      foo: bar
      baz: qux

  podAnnotationsAsTags:
    foo: quux
    bar: quuz
```

La siguiente asignación se utiliza para extraer etiquetas de anotaciones del pod:

```yaml
foo: bar
baz: qux
bar: quuz
```

</div>



### Labels de nodo como etiquetas

<div class="alert alert-info">

Si utilizas la versión 7.58.0+ del Agent, te recomendamos que utilices <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">las etiquetas (labels) de los recursos de Kubernetes como etiquetas (tags)</a> para configurar en los nodos las etiquetas (labels) como etiquetas (tags).

</div>

A partir de Agent v6.0+, Agent puede recopilar labels para un nodo determinado y utilizarlas como etiquetas para adjuntarlas a todas las métricas, trazas (traces) y logs emitidas asociadas a este `host` en Datadog:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada label de nodo `<NODE_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` del Operator en `datadog-agent.yaml`:

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

Po ejemplo, podrías configurar:
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

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de nodo como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas de pod llevan el prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
Para extraer una determinada label de nodo `<NODE_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de nodo como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada etiqueta de nodo `<NODE_LABEL>` y transformarla como una clave etiquetar `<TAG_KEY>` dentro de Datadog, añada la siguiente variable entorno a la Datadog Agent :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de nodo como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta la [página de facturación de métricas personalizadas][3] para obtener más información.

### Labels de pod como etiquetas

<div class="alert alert-info">

Si utilizas la versión 7.58.0+ del Agent, te recomendamos que utilices <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">las etiquetas (labels) de los recursos de Kubernetes como etiquetas (tags)</a> para configurar las etiquetas (labels) de pod como etiquetas (tags).

</div>

A partir de Agent v6.0+, Agent puede recopilar labels para un pod determinado y utilizarlas como etiquetas para adjuntarlas a todas las métricas, trazas y logs emitidas por este pod:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada label de pod `<POD_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración`DatadogAgent` de Operator en `datadog-agent.yaml`:

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

Po ejemplo, podrías configurar:
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

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
Para extraer una determinada label de pod `<POD_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada etiqueta de vaina `<POD_LABEL>` y transformarla como una clave etiquetar `<TAG_KEY>` dentro de Datadog, añada la siguiente variable entorno a la Datadog Agent :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta la [página de facturación de métricas personalizadas][3] para obtener más información.

### Anotaciones de pod como etiquetas

<div class="alert alert-info">

Si utilizas la versión 7.58.0+ del Agent, te recomendamos que utilices <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">las etiquetas (labels) de los recursos de Kubernetes como etiquetas (tags)</a> para configurar las anotaciones de pod como etiquetas (tags).

</div>

A partir de Agent v6.0+, Agent puede recopilar anotaciones para un pod determinado y utilizarlas como etiquetas para adjuntarlas a todas las métricas, trazas y logs emitidas por este pod:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada anotación de pod `<POD_ANNOTATION>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` de Operator en `datadog-agent.yaml`

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

Po ejemplo, podrías configurar:
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

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las anotaciones de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

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
Para extraer una determinada anotación de pod `<POD_ANNOTATION>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir toda anotación de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada anotación del pod `<POD_ANNOTATION>` y transformarla como una etiquetar clave `<TAG_KEY>` dentro de Datadog, añada la siguiente entorno variable a la Datadog Agent :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las anotaciones de pod como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta la [página de facturación de métricas personalizadas][3] para obtener más información.

### Labels de espacio de nombres como etiquetas

<div class="alert alert-info">

Si utilizas la versión 7.58.0+ del Agent, te recomendamos que utilices <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">las etiquetas (labels) de los recursos de Kubernetes como etiquetas (tags)</a> para configurar las etiquetas (labels) del espacio de nombres como etiquetas (tags).

</div>

A partir de Agent 7.55.0+, el Agent puede recopilar etiquetas (labels) para un espacio de nombres dado y utilizarlas como etiquetas (tags) para adjuntarlas a todas las métricas, trazas y logs emitidas por todos los pods en este espacio de nombres:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada label de espacio de nombres `<NAMESPACE_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` de Operator en `datadog-agent.yaml`:

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

Po ejemplo, podrías configurar:
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

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de espacio de nombres como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

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
Para extraer una determinada label de espacio de nombres `<NAMESPACE_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de espacio de nombres como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada etiqueta espacio de nombres `<NAMESPACE_LABEL>` y transformarla como una clave etiquetar `<TAG_KEY>` dentro de Datadog, añada la siguiente variable entorno a la Datadog Agent :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Para el Agent v7.24.0+, utiliza la siguiente configuración de variables de entorno para añadir todas las etiquetas (labels) de espacio de nombres como etiquetas a tus métricas, excepto las de KSM (`kubernetes_state.*`). En este ejemplo, los nombres de las etiquetas llevan el prefijo `<PREFIX>_`:

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta la [página de facturación de métricas personalizadas][3] para obtener más información.

### Variables de entorno de contenedor como etiquetas

A partir de Agent v7.32+, Agent puede recopilar variables de entorno de contenedor y utilizarlas como etiquetas para adjuntarlas a todas las métricas, trazas y logs correspondientes al contenedor. Tanto los contenedores de `docker` como los de `containerd` son compatibles:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada variable de entorno `<ENV_VAR>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` de Operator en `datadog-agent.yaml`:

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

Po ejemplo, podrías configurar:
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
Para extraer una determinada variable de entorno `<ENV_VAR>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada variable entorno `<ENV_VAR>` y transformarla en una clave etiquetar `<TAG_KEY>` dentro de Datadog, añada la siguiente variable entorno a la Datadog Agent :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta [Facturación de métricas personalizadas][3] para obtener más información.

### Labels de contenedor como etiquetas

A partir de Agent v7.33+, Agent puede recopilar labels de contenedor y utilizarlas como etiquetas. El Agent adjunta las etiquetas a todas las métricas, trazas y logs asociadas con el contenedor.

Agent puede generar etiquetas a partir de labels de contenedor para los contenedores de `docker` y `containerd`. En el caso de `containerd`, la versión mínima compatible es v1.5.6, ya que las versiones anteriores no propagan las labels correctamente.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para extraer una determinada label de contenedor `<CONTAINER_LABEL>` y transformarla en una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu configuración `DatadogAgent` de Operator en `datadog-agent.yaml`:

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

Po ejemplo, podrías configurar:
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
Para extraer una determinada label de contenedor `<CONTAINER_LABEL>` y transformarla como una clave de etiqueta `<TAG_KEY>` dentro de Datadog, añade la siguiente configuración a tu archivo de Helm `datadog-values.yaml`:

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Po ejemplo, podrías configurar:
```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manual (DaemonSet)" %}}
Para extraer una determinada etiqueta Contenedor `<CONTAINER_LABEL>` y transformarla en una clave etiquetar `<TAG_KEY>` , añada la siguiente variable entorno a la Datadog Agent :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

Por ejemplo:

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Las métricas personalizadas pueden modificar la facturación. Consulta [Facturación de métricas personalizadas][3] para obtener más información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/account_management/billing/custom_metrics
[4]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality