---
aliases:
- /es/infrastructure/containers/orchestrator_explorer
description: Uso de la página del Kubernetes Explorer de Datadog para monitorizar
  tus recursos Kubernetes, como pods y despliegues.
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Monitorizar tus operadores de Kubernetes para que las aplicaciones funcionen
    sin problemas
title: Kubernetes Explorer
---

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Explorer que muestra pods de Kubernetes." style="width:80%;">}}

El [Kubernetes Explorer][1] de Datadog te permite monitorizar el estado de pods, despliegues y otros recursos Kubernetes. También puedes ver las especificaciones de recursos de pods fallidos en un despliegue, correlacionar la actividad de los nodos con logs relacionados, realizar un seguimiento del uso de recursos, escalar automáticamente cargas de trabajo y corregir errores.

<div class="alert alert-info">El Kubernetes Explorer requiere el Datadog Agent v7.27.0 o posterior y Datadog Cluster Agent v1.11.0 o posterior. <br/>Si utilizas Kubernetes v1.25 o posterior, necesitarás Cluster Agent v7.40.0 o posterior.</div>


## Configuración

### Activar el Kubernetes Explorer

El Kubernetes Explorer está **activado por defecto** en la mayoría de las instalaciones de Datadog Agents.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Cuando se instala el Datadog Agent utilizando el Datadog Operator, el Kubernetes Explorer se activa por defecto.

Para comprobar que el Kubernetes Explorer está activado, asegúrate de que el parámetro `features.orchestratorExplorer.enabled` está configurado como `true` en tu `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Cuando se instala el Datadog Agent utilizando el [Helm chart oficial][1], el Kubernetes Explorer está activado por defecto.

Para comprobar que el Kubernetes Explorer está activado, asegúrate de que el parámetro `orchestratorExplorer.enabled` está configurado como `true` en tu archivo `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Luego, actualiza tu Helm chart.

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "Manual" %}}
Para la configuración manual, consulta [Configurar el Kubernetes Explorer con un DaemonSet][5].

[5]: /es/infrastructure/faq/set-up-orchestrator-explorer-daemonset
{{% /tab %}}
{{< /tabs >}}

### Recopilar recursos personalizados


### Añadir etiquetas (tags) personalizadas a los recursos

Para facilitar el filtrado, puedes añadir etiquetas (tags) personalizadas a tus recursos Kubernetes a través de la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`. **Estas etiquetas solo aparecen en el Kubernetes Explorer.**

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Define la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **dos veces** en `datadog-agent.yaml`:
- En `agents.containers.processAgent.env`
- En `clusterAgent.env` 

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

Configura la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **dos veces** en `datadog-agent.yaml`:
- En `processAgent.env`
- En `clusterAgent.env` 

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

{{% /tab %}}
{{% tab "DaemonSet" %}}

Establece la variable de entorno en los contenedores del Process Agent y Cluster Agent:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## Utilización

### Vistas

Alterna entre **Pods**, **Clusters** (Clústeres), **Namespaces** (Espacios de nombres) y otros recursos de Kubernetes en el menú desplegable **Select Resources** (Seleccionar recursos) en la esquina superior izquierda de la página.

Cada una de estas vistas incluye una tabla de datos para ayudarte a organizar mejor tus datos por campo, como estado, nombre y etiquetas (labels) de Kubernetes, y un mapa de clústeres detallado para brindarte panorama más amplio de tus pods y clústeres de Kubernetes.

**Consulta los [Detalles del filtro de consulta](#query-filter-details) para obtener más detalles sobre cómo filtrar estas vistas.**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer abierto para mostrar Cargas de trabajo > Conjuntos de réplicas, en el modo Resumen" style="width:80%;">}}

#### Agrupar por funcionalidad y facetas

Agrupa los pods por etiquetas (tags), etiquetas (labels) de Kubernetes o anotaciones de Kubernetes para obtener una vista agregada que te permita encontrar información con mayor rapidez. Puedes crear un grupo con la barra «Group by» (Agrupar por) en la parte superior derecha de la página o al hacer clic en una etiqueta (tag) o etiqueta (label) en particular y ubicar la función agrupar por en el menú contextual como se muestra a continuación.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="Un ejemplo de agrupación por equipo" style="width:80%;">}}

También puedes utilizar facetas en el lado izquierdo de la página para agrupar recursos o filtrar los recursos que más te interesen, como pods con un estado de pod CrashLoopBackOff.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="Un ejemplo de cómo agrupar el estado de pod CrashLoopBackOff" video=true style="width:80%;">}}

### Mapa de clústeres

Un mapa de clústeres te brinda un panorama más amplio de tus pods y clústeres de Kubernetes. Puedes ver todos tus recursos juntos en una pantalla con grupos y filtros personalizados, y elegir las métricas para rellenar el color de los nodos.

Examina los recursos de los mapas de clústeres al hacer clic en cualquier círculo o grupo para completar un panel detallado.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="Un mapa de clústeres con grupos y filtros personalizados" video=true style="width:80%;">}}

### Panel de información

Haz clic en cualquier fila de la tabla o en cualquier objeto en un mapa de clústeres para ver información sobre un recurso específico en un panel lateral.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="Una vista de recursos en el panel lateral, abierta en procesos." style="width:80%;">}}

La pestaña **YAML** del panel lateral muestra la definición completa del recurso. A partir de la **versión del Agent 7.44.0**, también incluye siete días de historial de definiciones. Puedes comparar lo que cambió con el tiempo y en diferentes versiones. La hora indicada es aproximada a cuando se aplicaron los cambios al recurso.

Para evitar mostrar una gran cantidad de cambios irrelevantes, se ignoran las actualizaciones que afectan solo a los siguientes campos:

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="Una vista de los recursos en el panel lateral, que muestra la función de historial de yaml" style="width:80%;">}}

Las demás pestañas muestran más información para solucionar problemas del recurso seleccionado:

* [**Logs**][9]: visualiza los logs desde tu contenedor o recurso. Haz clic en cualquier log para ver los logs relacionados en el Log Explorer.
* [**APM**][11]: consulta trazas (traces) de tu contenedor o recurso, incluida la fecha, el servicio, la duración, el método y el código de estado de una traza.
* [**Metrics**][10] (Métricas): consulta métricas en directo para tu contenedor o recurso. Puedes ver cualquier gráfica en pantalla completa, compartir una snapshot de esta o exportarla desde esta pestaña.
* **Processes** (Procesos): consulta todos los procesos que se ejecutan en el contenedor de este recurso.
* **Network** (Red): consulta el rendimiento de la red de un contenedor o recurso, incluidos los campos de origen, destino, volumen enviado y recibido, y rendimiento. Utiliza el campo **Destination** (Destino) para buscar por etiquetas como `DNS` o `ip_type`, o utiliza el filtro **Group by** (Agrupar por) en esta vista a fin de agrupar datos de red por etiquetas, como `pod_name` o `service`.
* [**Events**][12] (Eventos): consulta todos los eventos de Kubernetes para tu recurso.
* **Monitors** (Monitores): consulta los monitores etiquetados, con contexto o agrupados para este recurso.

Para obtener un dashboard detallado de este recurso, haz clic en View Dashboard (Ver dashboard) en la esquina superior derecha de este panel.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="Un enlace a un dashboard de pod desde la información general sobre Live Containers" style="width:80%;">}}

### Utilización de recursos

_Para ver la página de utilización de recursos, consulta [Utilización de recursos][13]_.

En la pestaña del Kubernetes Explorer, puedes explorar una selección de métricas de utilización de recursos.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="Utilización de recursos de contenedor" style="width:80%;">}}

Todas estas columnas admiten la clasificación, lo que te ayuda a identificar cargas de trabajo individuales en función de su utilización de recursos.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="Columnas ordenadas por utilización de recursos de contenedor" style="width:50%;">}}

## Detalles del filtro de consulta

Puedes limitar los recursos que se muestran al proporcionar una consulta en la barra de búsqueda «Filter by» (Filtrar por) en la parte superior izquierda de la página.

### Sintaxis

Un filtro de consulta se compone de términos y operadores. Por ejemplo:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Sintaxis del filtro de consultas de Orchestrator Explorer." style="width:80%;">}}

#### Términos

Existen varios tipos de términos:

| Tipo | Ejemplos |
|---|---|
| **Etiquetas (tags)**: adjuntas a los recursos por [el Agent que las recopila][20]. También existen etiquetas adicionales que genera Datadog para los recursos de Kubernetes. | `datacenter:staging`, `tag#datacenter:staging`<br> _(la `tag#` es opcional)_ |
| **Etiquetas (labels)**: Extraídas de [metadatos de un recurso][25]. Por lo general, se utilizan para organizar tu clúster y dirigirte a recursos específicos con selectores. | `label#chart_version:2.1.0` |
| **Anotaciones**: extraídas de [metadatos de un recurso][26]. Por lo general, se utilizan para respaldar herramientas que ayudan en la gestión de clústeres. | `annotation#checksum/configmap:a1bc23d4` |
| **Métricas**: añadidas a los recursos de carga de trabajo (pods y despliegues, entre otros). Puedes encontrar recursos en función de su utilización. Para ver qué métricas se admiten, consulta [Filtros de utilización de recursos](#resource-utilization-filters). | `metric#cpu_usage_pct_limits_avg15:>80%` |
| **Coincidencia de cadenas**: Compatible con algunos atributos de recursos específicos, consulta más abajo.<br>_Nota: La correspondencia de cadenas no utiliza el formato clave-valor, y no se puede especificar el atributo utilizado en la coincidencia._ | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID),<br>`web-api-3` (nombre) |
| **Campos**: Extraídos de [los metadatos de un recurso][27] o de los campos indexados de recursos personalizados. | `field#metadata.creationTimestamp:>=4wk`, `field#metadata.deletionTimestamp:<=1hr`, `field#status.currentReplicas:3`, `field#status.conditions.Active.status:True` |

>  ***Nota**: Es posible que encuentres los mismos pares clave-valor como etiqueta (tag) y etiqueta (label) (o anotación); esto depende de cómo se haya configurado tu clúster.*

Los siguientes atributos de recursos se admiten en la **coincidencia de cadenas** arbitraria:
- `metadata.name`
- `metadata.uid`
- Direcciones IP encontradas en:
  - Pods
  - Nodos (internos y externos)
  - Servicios (IPs de clúster, externas y de equilibrador de carga)

No es necesario que especifiques una clave para buscar un recurso por nombre o IP. No se requieren comillas a menos que tu búsqueda de cadenas incluya ciertos caracteres especiales.

#### Comparadores

Todos los términos respaldan el operador de igualdad `:`. Los términos de [valor de métrica](#resource-utilization-filters) también admiten comparaciones numéricas:

- `:>` Mayor que (por ejemplo, `metric#cpu_usage_avg15:>0.9`)
- `:>=` Mayor o igual que
- `:<` Menor que
- `:<=` Menor o igual que

#### Operadores

Para combinar varios términos en una consulta compleja, puedes utilizar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| Operador | Descripción | Ejemplo |
|---|---|---|
| `AND` | **Intersección**: ambos términos están en los eventos seleccionados (si no se añade nada, AND se toma de manera predeterminada) | `a AND b`   |
| `OR` | **Unión**: cualquiera de los términos está en los eventos seleccionados                                             | `a OR b`   |
| `NOT` / `-` | **Exclusión**: el siguiente término NO está en el evento (se aplica a cada búsqueda individual de texto sin formato) | `a AND NOT b` o<br>`a AND -b` |
|  `( )` | **Agrupación:** especifica cómo agrupar los términos de manera lógica | `a AND (b OR c)` o<br>`(a AND b) or c` |

##### `OR` abreviatura del valor

Se pueden combinar varios términos que comparten la misma clave en un solo término si todos utilizan el operador `OR`. Por ejemplo, esta consulta:

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

Puede reducirse a:

```
app_name:(web-server OR database OR event-consumer)
```

### Comodines

Puedes utilizar comodines `*` como parte de un término a fin de filtrar por coincidencias parciales, tanto para valores como para claves. Algunos ejemplos:

- `kube_job:stats-*`: encuentra todos los recursos con un valor de etiqueta (tag) `kube_deployment` que comience con `stats-`.
- `pod_name:*canary`: encuentra todos los recursos con un valor `pod_name` que termine en `canary`..
- `label#release:*`: encuentra todos los recursos con una etiqueta (label) `release`, independientemente de su valor.
- `-label#*.datadoghq.com/*`: encuentra recursos que no tengan ninguna etiqueta (label) con contexto de Datadog.
- `kube_*:*stats*canary`: encuentra recursos que tengan etiquetas (tags) de recursos relacionados (`kube_*`), con `stats` en el medio del valor y que también terminen en `canary`.

### Etiquetas (tags) extraídas

Además de las etiquetas (tags) que has [configurado][20] dentro del Datadog Agent, Datadog inyecta etiquetas (tags) generadas basadas en atributos de recursos que pueden ayudarte con tus necesidades de búsqueda y agrupación. Estas etiquetas (tags) se añaden a los recursos de manera condicional, cuando son relevantes.

#### Todos los recursos

Todos los recursos tienen la etiqueta (tag) `kube_cluster_name` y todos los recursos con espacios de nombres tienen añadida la etiqueta (tag) `kube_namespace`.

Además, los recursos contienen una etiqueta (tag) `kube_<api_kind>:<metadata.name>`. Por ejemplo, a un despliegue denominado `web-server-2` se le añadiría de manera automática la etiqueta (tag) `kube_deployment:web-server-2`.

> **Nota**: Hay algunas excepciones a este patrón:
>
> - Los pods utilizan `pod_name` en su lugar.
> - *VPAs: `verticalpodautoscaler`*.
> - *HPAs: `horizontalpodautoscaler`*.
> - *Demandas de volumen persistentes: `persistentvolumeclaim`*.

En función de las etiquetas (labels) adjuntas al recurso, también se extraerán las siguientes etiquetas (tags):

| Etiqueta (tag) | Etiqueta (label) de origen |
|---|---|
| `kube_app_name` | `app.kubernetes.io/name` |
| `kube_app_instance` | `app.kubernetes.io/instance` |
| `kube_app_version` | `app.kubernetes.io/version` |
| `kube_app_component` | `app.kubernetes.io/component` |
| `kube_app_part_of` | `app.kubernetes.io/part-of` |
| `kube_app_managed_by` | `app.kubernetes.io/managed-by` |
| `env` | `tags.datadoghq.com/env` |
| `version` | `tags.datadoghq.com/version` |
| `service` | `tags.datadoghq.com/service` |

#### Relaciones

Los recursos relacionados se etiquetarán entre sí. Algunos ejemplos son:

- Un pod que sea parte del despliegue «XYZ» tendrá una etiqueta (tag) `kube_deployment:xyz`.
- Una entrada que se dirija al servicio "A" tendrá una etiqueta (tag) `kube_service:a`.

Los recursos que se generan a partir de recursos «principales» tendrán las etiquetas (tags) `kube_ownerref_kind` y `kube_ownerref_name` (como pods y trabajos).

> **Consejo:** Utiliza la función de autocompletar consultas de filtro para descubrir qué etiquetas (tags) de recursos relacionados se encuentran disponibles. Escribe `kube_` y conoce qué resultados se sugieren.

#### Pods

Los pods reciben las siguientes etiquetas (tags):

- `pod_name`
- `pod_phase` (extraído del manifiesto)
- `pod_status` (calculado de forma similar a `kubectl`)

#### Cargas de trabajo

Los recursos de carga de trabajo (pods, despliegues, conjuntos con estado, etc.) tendrán las siguientes etiquetas (tags), que indican su compatibilidad dentro de la página de utilización de recursos:

- `resource_utilization` (`supported` o `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### Condiciones

Algunas condiciones, para algunos recursos, se extraen como etiquetas (tags). Por ejemplo, puedes encontrar la etiqueta (tag) `kube_condition_available` en los despliegues. El formato de la etiqueta (tag) siempre es `kube_condition_<name>` con un valor `true` o `false`.

> **Consejo**: Utiliza la función de autocompletar para descubrir qué condiciones se encuentran disponibles en un tipo de recurso determinado al ingresar `kube_condition` y revisar los resultados.

#### Etiquetas (tags) específicas de recursos

Algunos recursos tienen etiquetas (tags) específicas que se extraen en función del entorno de tu clúster. Las siguientes etiquetas (tags) se encuentran disponibles junto con las etiquetas (tags) que se compartieron anteriormente.

| Recurso | Etiquetas (tags) extraídas |
|---|---|
| **Clúster** | `api_server_version`<br>`kubelet_version` |
| **Definiciones de recursos personalizados** y<br>**Recursos personalizados** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **Espacio de nombres** | `phase` |
| **Node** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Volumen persistente** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Demanda de volumen persistente** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (en lugar de `kube_pod`)<br>`pod_phase` (extraído del manifiesto)<br>`pod_status` (calculado de forma similar a `kubectl`) |
| **Servicio** | `kube_service_type`<br>`kube_service_port` |

### Filtros de utilización de recursos

Los siguientes recursos de carga de trabajo están enriquecidos con métricas de utilización de recursos:

- Clústeres
- Nodos
- Pods

Estas métricas se calculan en el momento de la recopilación, en función de los valores promedio de los últimos 15 minutos. Puedes filtrar por valores de métrica de esta manera:`metric#<metric_name><comparator><numeric_value>`.

- `metric_name` es una métrica disponible (consulta más abajo)
- `comparator` es un [comparador](#comparator) compatible
- y `numeric_value` es un valor de coma flotante.

Para los pods, están disponibles los siguientes nombres de métricas:

| CPU | Memoria |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

Además, los clústeres y nodos tienen disponibles las siguientes métricas:

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### Unidades de métrica

Las métricas de CPU se almacenan como varios núcleos.

Las métricas de memoria se almacenan como bytes.

Los porcentajes (`*_pct_*`) se almacenan como flotantes, donde `0.0` es 0 % y `1.0` es 100 %. El valor es la relación de las dos métricas indicadas; por ejemplo, `cpu_usage_pct_limits_avg15` es el valor de `usage / limits`. Los valores de métrica pueden estar por encima del 100 %, como el porcentaje de uso de CPU de las solicitudes.

## Notas y problemas conocidos

* Los datos se actualizan automáticamente a intervalos constantes.
* En clústeres con más de 1000 despliegues o ReplicaSets, es posible que observes un uso elevado de CPU por parte del Cluster Agent. Hay una opción para deshabilitar la limpieza de contenedores en el Helm chart. Consulta [el repositorio de Helm chart][15] para obtener más detalles.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /es/infrastructure/containers/?tab=datadogoperator#setup
[9]: /es/logs
[10]: /es/metrics
[11]: /es/tracing
[12]: /es/events
[13]: /es/infrastructure/containers/kubernetes_resource_utilization
[15]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog
[20]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[25]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[26]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[27]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/