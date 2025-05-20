---
description: Aprende a asignar los gastos de Cloud Cost Management en toda tu organización
  con la Asignación de costes de contenedores.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
private: true
title: Asignación de costes de contenedores
---

{{< jqmath-vanilla >}}

## Información general

Datadog Cloud Cost Management (CCM) asigna automáticamente los costes de tus clústeres en la nube a los servicios y las cargas de trabajo individuales que se ejecutan en esos clústeres. Utiliza métricas de costes enriquecidas con etiquetas (tags) de pods, nodos, contenedores y tareas para visualizar el coste de las cargas de trabajo de contenedores en el contexto de toda tu factura de nube.

Nubes
: CCM asigna los costes de tus instancias de host AWS, Azure o Google. Un host es un equipo (como una instancia EC2 en AWS, una máquina virtual en Azure o una instancia Compute Engine en Google Cloud) que aparece en el informe de costes y uso de tu proveedor de nube y que podría estar ejecutando pods Kubernetes.

Recursos
: CCM asigna los costes de clústeres Kubernetes e incluye análisis de costes de muchos recursos asociados como volúmenes Kubernetes persistentes utilizados por tus pods.

CCM muestra los costes de los recursos, como CPU, memoria y otros, en función de la nube y el orquestador que estés utilizando en la página [**Contenedores**][1].

{{< img src="cloud_cost/container_cost_allocation/container_allocation.png" alt="Tabla de asignación de costes de la nube que muestra las solicitudes y los costes de inactividad durante el último mes en la página Contenedores" style="width:100%;" >}}

## Requisitos previos

{{< tabs >}}
{{% tab "AWS" %}}

CCM asigna los costes de los clústeres AWS ECS, así como de todos los clústeres Kubernetes, incluidos los clústeres gestionados mediante Elastic Kubernetes Service (EKS).

La siguiente tabla presenta la lista de características recopiladas y las versiones mínimas del Agent y el Cluster Agent de cada una de ellas.

| Función | Versión mínima del Agent | Versión mínima del Cluster Agent |
|---|---|---|
| Asignación de costes de contenedores | 7.27.0 | 1.11.0 |
| Asignación de costes de contenedores GPU | 7.54.0 | 7.54.0 |
| Asignación de volúmenes persistentes AWS | 7.46.0 | 1.11.0 |
| Asignación de costes de transferencia de datos    | 7.58.0 | 7.58.0 |

1. Configura la integración AWS Cloud Cost Management en la página [Configuración de costes en la nube][101].
1. Para una compatibilidad con Kubernetes, instala el [**Datadog Agent**][102] en un entorno Kubernetes y asegúrate de habilitar el [**Orchestrator Explorer**][103] en tu configuración del Agent.
1. Para una compatibilidad con AWS ECS, configura la [**monitorización de contenedores de Datadog**][104] en las tareas ECS.
1. Opcionalmente, habilita la [asignación de costes divididos de AWS][105] para la asignación de ECS basada en el uso.
1. Para habilitar la asignación de costes de almacenamiento, configura la [recopilación de métricas EBS][108].
1. Para habilitar la asignación de costes de contenedores GPU, instala la [integración Datadog DCGM][106].
1. Para habilitar la asignación de costes de transferencia de datos, configura [Cloud Network Monitoring][107]. **Nota**: se aplican cargos adicionales.

[101]: https://app.datadoghq.com/cost/setup
[102]: /es/containers/kubernetes/installation/?tab=operator
[103]: /es/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: /es/containers/amazon_ecs/
[105]: https://docs.aws.amazon.com/cur/latest/userguide/enabling-split-cost-allocation-data.html
[106]: /es/integrations/dcgm/?tab=kubernetes#installation
[107]: /es/network_monitoring/cloud_network_monitoring/setup
[108]: /es/integrations/amazon_ebs/#metric-collection

{{% /tab %}}
{{% tab "Azure" %}}

CCM asigna los costes de todos los clústeres Kubernetes, incluidos los clústeres gestionados mediante Azure Kubernetes Service (AKS).

La siguiente tabla presenta la lista de características recopiladas y las versiones mínimas del Agent y el Cluster Agent de cada una de ellas.

| Función | Versión mínima del Agent | Versión mínima del Cluster Agent |
|---|---|---|
| Asignación de costes de contenedores | 7.27.0 | 1.11.0 |
| Asignación de costes de contenedores GPU | 7.54.0 | 7.54.0 |

1. Configura la integración Azure Cost Management en la página [Configuración de costes en la nube][101].
1. Instala el [**Datadog Agent**][102] en un entorno Kubernetes y asegúrate de habilitar el [**Orchestrator Explorer**][103] en tu configuración del Agent.
1. Para habilitar la asignación de costes de contenedores GPU, instala la [integración Datadog DCGM][104].

[101]: https://app.datadoghq.com/cost/setup
[102]: /es/containers/kubernetes/installation/?tab=operator
[103]: /es/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/es/integrations/dcgm/?tab=kubernetes#installation

{{% /tab %}}
{{% tab "Google" %}}

CCM asigna los costes de todos los clústeres Kubernetes, incluidos los clústeres gestionados mediante Google Kubernetes Engine (GKE).

La siguiente tabla presenta la lista de características recopiladas y las versiones mínimas del Agent y el Cluster Agent de cada una de ellas.

| Función | Versión mínima del Agent | Versión mínima del Cluster Agent |
|---|---|---|
| Asignación de costes de contenedores | 7.27.0 | 1.11.0 |
| Asignación de costes de contenedores GPU | 7.54.0 | 7.54.0 |

1. Configura la integración Google Cloud Cost Management en la página [Configuración de costes en la nube][101].
1. Instala el [**Datadog Agent**][102] en un entorno Kubernetes y asegúrate de habilitar el [**Orchestrator Explorer**][103] en tu configuración del Agent.
1. Para habilitar la asignación de costes de contenedores GPU, instala la [integración Datadog DCGM][104].

**Nota**: [GKE Autopilot][105] sólo se admite como una configuración sin agente de Kubernetes sujeta a [limitaciones](#agentless-kubernetes-costs).

[101]: https://app.datadoghq.com/cost/setup
[102]: /es/containers/kubernetes/installation/?tab=operator
[103]: /es/infrastructure/containers/orchestrator_explorer?tab=datadogoperator
[104]: https://docs.datadoghq.com/es/integrations/dcgm/?tab=kubernetes#installation
[105]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview

{{% /tab %}}
{{< /tabs >}}

## Asignar costes

La asignación de costes divide los costes de cálculo de hosts y otros recursos de tu proveedor de nube en tareas individuales o en pods asociados a ellas. Luego, estos costes divididos se enriquecen con las etiquetas (tags) de los recursos asociados para que puedas desglosar los costes por cualquier dimensión asociada.

Utiliza la etiqueta (tag) `allocated_resource` para visualizar los recursos de los gastos asociados a tus costes en varios niveles, incluido el nodo Kubernetes, el host de orquestación de contenedores, el volumen de almacenamiento o a nivel de todo el clúster.

{{< tabs >}}
{{% tab "AWS" %}}

Estos costes divididos se enriquecen con las etiquetas (tags) de nodos, pods, tareas y volúmenes. Puedes utilizar estas etiquetas (tags) para desglosar los costes por cualquier dimensión asociada.

### Extracción de etiquetas (tags) Kubernetes

Sólo las _etiquetas_ (tags) del recurso directo, como un pod, así como los nodos subyacentes, se añaden a las métricas de costes por defecto. Para incluir etiquetas (labels) como etiquetas (tags), anotaciones como etiquetas (tags) o etiquetas (tags) de recursos relacionados como espacios de nombres, consulta [Extracción de etiquetas (tags) Kubernetes][201].

[201]: /es/containers/kubernetes/tag/

### Cálculo

Para la asignación de cálculo de Kubernetes, se conecta un nodo Kubernetes a sus costes de instancia de host asociados. El nombre de clúster del nodo y todas las etiquetas (tags) del nodo se añaden a todo el coste de cálculo del nodo. Esto permite asociar dimensiones de nivel de clúster al coste de la instancia, sin tener en cuenta los pods programados para el nodo.

A continuación, Datadog examina todos los pods ejecutados en ese nodo durante el día. El coste del nodo se asigna al pod en función de los recursos utilizados y del tiempo que estuvo en ejecución. Este coste calculado se enriquece con todas las etiquetas (tags) del pod.

**Nota**: Sólo se añaden _etiquetas_ (tags) de pods y nodos a las métricas de costes. Para incluir etiquetas (labels), habilita las etiquetas (labels) como etiquetas (tags) para [nodos][101] y [pods][102].

Todos los demás costes reciben el mismo valor y las mismas etiquetas (tags) que la métrica `aws.cost.amortized` de origen.

### Almacenamiento de volúmenes persistentes

Para la asignación del almacenamiento de volúmenes persistentes de Kubernetes, los volúmenes persistentes (PV), los reclamos de volúmenes persistentes (PVC), los nodos y los pods se conectan con sus costes de volúmenes EBS asociados. Todas las etiquetas (tags) de PV, PVC, nodos y pods asociadas se añaden a las partidas de costes de volúmenes EBS.

A continuación, Datadog examina todos los pods que reclamaron el volumen ese día. El coste del volumen se asigna a un pod en función de los recursos que utilizó y del tiempo que estuvo en ejecución. Estos recursos incluyen la capacidad aprovisionada de almacenamiento, IOPS y rendimiento. Este coste asignado se enriquece con todas las etiquetas (tags) del pod.

### AWS ECS en EC2

Para la asignación de ECS, Datadog determina qué tareas se ejecutan en cada instancia EC2 utilizada para ECS. Si habilitas la asignación de costes divididos de AWS, las métricas asignan los costes de ECS por uso, en lugar de por reserva, lo que proporciona un detalle más específico.

En función de los recursos utilizados por la tarea, Datadog asigna la parte apropiada del coste de cálculo de la instancia a esa tarea. El coste calculado se enriquece con todas las etiquetas (tags) de la tarea y con todas las etiquetas (tags) del contenedor (excepto los nombres de contenedor) que se ejecutan en la tarea.

### AWS ECS en Fargate

Las tareas ECS que se ejecutan en Fargate ya están totalmente asignadas en el [CUR][103]. CCM enriquece estos datos añadiendo etiquetas (tags) predefinidas y etiquetas (tags) de contenedor al coste de AWS Fargate.

### Transferencia de datos

Para la asignación de transferencia de datos de Kubernetes, se conecta un nodo Kubernetes con tus costes de transferencia de datos asociados del [CUR][103]. El nombre de clúster del nodo y todas las etiquetas (tags) del nodo se suman a todo el coste de transferencia de datos del nodo. Esto te permite asociar las dimensiones a nivel de clúster con el coste de la transferencia de datos, sin tener en cuenta los pods programados para el nodo.

A continuación, Datadog examina los [recursos de carga de trabajo][104] diarios que se ejecutan en ese nodo. El coste del nodo se asigna al nivel de carga de trabajo en función del uso del volumen de tráfico de red. Este coste calculado se enriquece con todas las etiquetas (tags) de los recursos de carga de trabajo.

**Nota**: Sólo se añaden _etiquetas_ (tags) de pods y nodos a las métricas de costes. Para incluir etiquetas (labels), habilita las etiquetas (labels) como etiquetas (tags) para [nodos][101] y [pods][102].

[Cloud Network Monitoring][105] debe estar habilitado en todos los hosts AWS para permitir una asignación precisa de costes de transferencia de datos. Si algunos hosts no tienen habilitada la opción Cloud Network Monitoring, los costes de transferencia de datos de estos hosts no se asignan y pueden aparecer como un bucket `n/a`, dependiendo de las condiciones de filtrado y agrupación.

Datadog sólo admite la asignación de costes de transferencia de datos utilizando [recursos de carga de trabajo estándar 6][104]. Para [recursos de carga de trabajo personalizados][106], los costes de transferencia de datos sólo pueden asignarse a nivel de clúster y no a nivel de nodo/espacio de nombres.

[101]: /es/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /es/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html
[104]: https://kubernetes.io/docs/concepts/workloads/
[105]: /es/network_monitoring/cloud_network_monitoring/setup
[106]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/

{{% /tab %}}
{{% tab "Azure" %}}

### Extracción de etiquetas (tags) Kubernetes

Sólo las _etiquetas_ (tags) del recurso directo, como un pod, así como los nodos subyacentes, se añaden a las métricas de costes por defecto. Para incluir etiquetas (labels) como etiquetas (tags), anotaciones como etiquetas (tags) o etiquetas (tags) de recursos relacionados como espacios de nombres, consulta [Extracción de etiquetas (tags) Kubernetes][201].

[201]: /es/containers/kubernetes/tag/

### Cálculo

Para la asignación de cálculo de Kubernetes, se conecta un nodo Kubernetes a sus costes de instancia de host asociados. El nombre de clúster del nodo y todas las etiquetas (tags) del nodo se añaden a todo el coste de cálculo del nodo. Esto permite asociar dimensiones de nivel de clúster al coste de la instancia, sin tener en cuenta los pods programados para el nodo.

A continuación, Datadog examina todos los pods ejecutados en ese nodo durante el día. El coste del nodo se asigna al pod en función de los recursos utilizados y del tiempo que estuvo en ejecución. Este coste calculado se enriquece con todas las etiquetas (tags) del pod.

**Nota**: Sólo se añaden _etiquetas_ (tags) de pods y nodos a las métricas de costes. Para incluir etiquetas (labels), habilita las etiquetas (labels) como etiquetas (tags) para [nodos][101] y [pods][102].

Todos los demás costes reciben el mismo valor y las mismas etiquetas (tags) que la métrica `azure.cost.amortized` de origen.

[101]: /es/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /es/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags

{{% /tab %}}
{{% tab "Google" %}}

### Extracción de etiquetas Kubernetes

Sólo las _etiquetas_ (tags) del recurso directo, como un pod, así como los nodos subyacentes, se añaden a las métricas de costes por defecto. Para incluir etiquetas (labels) como etiquetas (tags), anotaciones como etiquetas (tags) o etiquetas (tags) de recursos relacionados como espacios de nombres, consulta [Extracción de etiquetas (tags) Kubernetes][201].

[201]: /es/containers/kubernetes/tag/

### Cálculo

Para la asignación de cálculo de Kubernetes, se conecta un nodo Kubernetes a sus costes de instancia de host asociados. El nombre de clúster del nodo y todas las etiquetas (tags) del nodo se añaden a todo el coste de cálculo del nodo. Esto permite asociar dimensiones de nivel de clúster al coste de la instancia, sin tener en cuenta los pods programados para el nodo.

A continuación, Datadog examina todos los pods ejecutados en ese nodo durante el día. El coste del nodo se asigna al pod en función de los recursos utilizados y del tiempo que estuvo en ejecución. Este coste calculado se enriquece con todas las etiquetas (tags) del pod.

**Nota**: Sólo se añaden _etiquetas_ (tags) de pods y nodos a las métricas de costes. Para incluir etiquetas (labels), habilita las etiquetas (labels) como etiquetas (tags) para [nodos][101] y [pods][102].

Todos los demás costes reciben el mismo valor y las mismas etiquetas (tags) que la métrica `gcp.cost.amortized` de origen.

### Costes Kubernetes Agentless

Para ver los costes de los clústeres GKE sin habilitar Datadog Infrastructure Monitoring, utiliza la [asignación de costes de GKE][103]. Habilita la asignación de costes de GKE en clústeres GKE no supervisados para acceder a este conjunto de funciones. Este enfoque conlleva una serie de limitaciones (consulta abajo).

#### Limitaciones y diferencias del Datadog Agent

- No existe una compatibilidad para el seguimiento de los costes de inactividad de las cargas de trabajo.
- No se hace un seguimiento del coste de pods individuales, sólo del coste agregado de una carga de trabajo y del espacio de nombres. No existe una etiqueta (tag) `pod_name`.
- GKE enriquece los datos utilizando únicamente etiquetas (labels) de pods e ignora cualquier etiqueta (tag) de Datadog que añadas.
- Puedes encontrar la lista completa de limitaciones en la [documentación oficial de GKE][104].

Para habilitar la asignación de costes de GKE, consulta la [documentación oficial de GKE][105].

[101]: /es/containers/kubernetes/tag/?tab=containerizedagent#node-labels-as-tags
[102]: /es/containers/kubernetes/tag/?tab=containerizedagent#pod-labels-as-tags
[103]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations
[104]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#limitations
[105]: https://cloud.google.com/kubernetes-engine/docs/how-to/cost-allocations#enable_breakdown

{{% /tab %}}
{{< /tabs >}}

## Para entender los gastos

Utiliza la etiqueta (tag) `allocated_spend_type` para visualizar la categoría de gastos asociados a tus costes en varios niveles, incluido el nodo Kubernetes, el host de orquestación de contenedores, el volumen de almacenamiento o a nivel de todo el clúster.

{{< tabs >}}
{{% tab "AWS" %}}

### Cálculo

El coste de una instancia de host se divide en dos componentes: 60% para la CPU y 40% para la memoria. Si la instancia de host tiene GPU, el coste se divide en tres componentes: 95% para la GPU, 3% para la CPU y 2% para la memoria. Cada componente se asigna a cargas de trabajo individuales en función de sus reservas de recursos y su uso.

Los costes se asignan a los siguientes tipos de gastos:

| Tipo de gasto | Descripción    |
| -----------| -----------    |
| Utilización | Coste de los recursos (como memoria, CPU y GPU) utilizados por las cargas de trabajo, en función del uso medio de ese día. |
| Carga de trabajo inactiva | Coste de los recursos (como memoria, CPU y GPU) reservados y asignados pero no utilizados por las cargas de trabajo. Es la diferencia entre el total de recursos solicitados y el uso medio. |
| Clúster inactivo | Coste de los recursos (como memoria, CPU y GPU) que no están reservados por las cargas de trabajo en un clúster. Es la diferencia entre el coste total de los recursos y lo que se asigna a las cargas de trabajo. |

### Volumen persistente

El coste de un volumen EBS tiene tres componentes: IOPS, rendimiento y almacenamiento. Cada uno de ellos se asigna en función del uso de un pod cuando se monta el volumen.

| Tipo de gasto | Descripción    |
| -----------| -----------    |
| Utilización | Coste de las IOPS, del rendimiento o del almacenamiento aprovisionados, utilizados por las cargas de trabajo. El coste de almacenamiento se basa en la cantidad máxima de volumen de almacenamiento utilizado ese día, mientras que los costes de IOPS y de rendimiento se basan en la cantidad media de volumen de almacenamiento utilizado ese día. |
| Carga de trabajo inactiva | Coste de las IOPS, del rendimiento o del almacenamiento aprovisionados, reservados y asignados pero no utilizados por las cargas de trabajo. El coste de almacenamiento se basa en la cantidad máxima de volumen de almacenamiento utilizado ese día, mientras que los costes de IOPS y de rendimiento se basan en la cantidad media de volumen de almacenamiento utilizado ese día. Es la diferencia entre el total de recursos solicitados y el uso medio. **Nota:** Esta etiqueta (tag) sólo está disponible si ya habilitaste `Resource Collection` en tu [**integración AWS**][101]. Para evitar que se te cobre por `Cloud Security Posture Management`, asegúrate de que durante la configuración de `Resource Collection`, la casilla `Cloud Security Posture Management` no esté marcada. |
| Clúster inactivo | Coste de las IOPS, del rendimiento o del almacenamiento aprovisionados, que no están reservados por ningún pod ese día. Es la diferencia entre el coste total de los recursos y lo que se asigna a las cargas de trabajo. |

**Nota**: La asignación de volúmenes persistentes sólo se admite en clústeres Kubernetes y sólo está disponible para pods que forman parte de un StatefulSet Kubernetes.

[101]: https://app.datadoghq.com/integrations/amazon-web-services

### Transferencia de datos

Los costes se asignan a los siguientes tipos de gastos:

| Tipo de gasto | Descripción    |
| -----------| -----------    |
| Utilización | Coste de transferencia de datos monitorizado por Cloud Network Monitoring y asignado. |
| No monitorizado | Coste de transferencia de datos que no son monitorizados por Cloud Network Monitoring. Este coste no se asigna. |

{{% /tab %}}
{{% tab "Azure" %}}

### Cálculo

El coste de una instancia de host se divide en dos componentes: 60% para la CPU y 40% para la memoria. Si la instancia de host tiene GPU, el coste se divide en tres componentes: 95% para la GPU, 3% para la CPU y 2% para la memoria. Cada componente se asigna a cargas de trabajo individuales en función de sus reservas de recursos y su uso.

Los costes se asignan a los siguientes tipos de gastos:

| Tipo de gasto | Descripción    |
| -----------| -----------    |
| Utilización | Coste de los recursos (como memoria, CPU y GPU) utilizados por las cargas de trabajo, en función del uso medio de ese día. |
| Carga de trabajo inactiva | Coste de los recursos (como memoria, CPU y GPU) reservados y asignados pero no utilizados por las cargas de trabajo. Es la diferencia entre el total de recursos solicitados y el uso medio. |
| Clúster inactivo | Coste de los recursos (como memoria, CPU y GPU) que no están reservados por las cargas de trabajo en un clúster. Es la diferencia entre el coste total de los recursos y lo que se asigna a las cargas de trabajo. |

{{% /tab %}}
{{% tab "Google" %}}

### Cálculo

El coste de una instancia de host se divide en dos componentes: 60% para la CPU y 40% para la memoria. Si la instancia de host tiene GPU, el coste se divide en tres componentes: 95% para la GPU, 3% para la CPU y 2% para la memoria. Cada componente se asigna a cargas de trabajo individuales en función de sus reservas de recursos y su uso.

Los costes se asignan a los siguientes tipos de gastos:

| Tipo de gasto | Descripción    |
| -----------| -----------    |
| Utilización | Coste de los recursos (como memoria, CPU y GPU) utilizados por las cargas de trabajo, en función del uso medio de ese día. |
| Carga de trabajo inactiva | Coste de los recursos (como memoria, CPU y GPU) reservados y asignados pero no utilizados por las cargas de trabajo. Es la diferencia entre el total de recursos solicitados y el uso medio. |
| Clúster inactivo | Coste de los recursos (como memoria, CPU y GPU) que no están reservados por las cargas de trabajo en un clúster. Es la diferencia entre el coste total de los recursos y lo que se asigna a las cargas de trabajo. |
| No monitorizado | Coste de los recursos cuyo tipo de gasto se desconoce. Para resolverlo, instala el Datadog Agent en estos clústeres nodos. |

{{% /tab %}}
{{< /tabs >}}

## Para entender los recursos

Dependiendo del proveedor de la nube, ciertos recursos pueden o no estar disponibles para la asignación de costes.

| Recurso | AWS | Azure | Google Cloud |
|---:|---:|---|---|
| CPU | {{< X >}} | {{< X >}} | {{< X >}} |
| Memoria | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ccm-details title="Volúmenes persistentes" >}}Almacena recursos dentro de un clúster, aprovisionados por administradores o dinámicamente, cuyos datos persisten independientemente de los ciclos de vida de los pods.{{< /ccm-details >}} | {{< X >}} |  |  |
| {{< ccm-details title="Tarifas de servicios gestionados" >}}Costo de las tarifas asociadas, que cobra el proveedor de nube por la gestión del clúster, como tarifas de servicios gestionados por Kubernetes u otras opciones de orquestación de contenedores.{{< /ccm-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Costes de ECS | {{< X >}} | N/A | N/A |
| Costes de transferencia de datos | {{< X >}} | Limitado* | Limitado* |
| GPU | {{< X >}} | {{< X >}} | {{< X >}}  |
| {{< ccm-details title="Almacenamiento local" >}}Recursos de almacenamiento directamente asociados para un nodo.{{< /ccm-details >}} |  | Limitado* | Limitado* |

Los recursos `Limited*` fueron identificados como parte de tus gastos en Kubernetes, pero no están totalmente asignados a cargas de trabajo o pods específicos. Estos recursos son costes a nivel de host, no a nivel de pod o de espacio de nombres, y se identifican con `allocated_spend_type:<resource>_not_supported`.

## Métricas de costes

Cuando se cumplen los requisitos previos, aparecen automáticamente las siguientes métricas de costes.

{{< tabs >}}
{{% tab "AWS" %}}

| Métrica de costes                    | Descripción    |
| ---                                | ----------- |
| `aws.cost.amortized.shared.resources.allocated` | Costes de EC2 asignados según la CPU y la memoria utilizadas por un pod o tarea ECS, utilizando una división 60:40 para CPU y memoria respectivamente, y una división 95:3:2 para GPU, CPU y memoria respectivamente, si un pod utiliza una GPU. También incluye los costes de EBS asignados. <br> *Basados en `aws.cost.amortized`*. |
| `aws.cost.net.amortized.shared.resources.allocated` | Costes netos de EC2 asignados según la CPU y la memoria utilizadas por un pod o tarea ECS, utilizando una división 60:40 para CPU y memoria respectivamente, y una división 95:3:2 para GPU, CPU y memoria respectivamente, si un pod utiliza una GPU. También incluye los costes de EBS asignados. <br> *Basados en `aws.cost.net.amortized`*. |

{{% /tab %}}
{{% tab "Azure" %}}

| Métrica de costes                    | Descripción    |
| ---                                | ----------- |
| `azure.cost.amortized.shared.resources.allocated` | Costes de Azure VM asignados según la CPU y la memoria utilizadas por un pod o tarea de contenedor, utilizando una división 60:40 para CPU y memoria respectivamente, y una división 95:3:2 para GPU, CPU y memoria respectivamente, si un pod utiliza una GPU. También incluye los costes de Azure asignados. <br> *Basados en `azure.cost.amortized`*. |

{{% /tab %}}
{{% tab "Google" %}}

| Métrica de costes                    | Descripción    |
| ---                                | ----------- |
| `gcp.cost.amortized.shared.resources.allocated` | Costes de Google Compute Engine asignados según la CPU y la memoria utilizadas por un pod, utilizando una división 60:40 para CPU y memoria respectivamente, y una división 95:3:2 para GPU, CPU y memoria respectivamente, si un pod utiliza una GPU. Este método de asignación se utiliza cunado la factura no proporciona una división específica entre el uso de CPU y de memoria. <br> *Basados en `gcp.cost.amortized`*. |

{{% /tab %}}
{{< /tabs >}}

Estos costes de métricas incluyen todos tus costes de nube. Esto te permite seguir visualizando todos tus costes de nube de una sola vez.

Por ejemplo, supongamos que tienes la etiqueta (tag) `team` en un bucket de almacenamiento, en una base de datos gestionada por un proveedor de nube y en pods Kubernetes. Puedes utilizar estas métricas para agrupar los costes por `team`, que incluye los costes de las tres ubicaciones mencionadas.

## Aplicación de etiquetas (tags)

Datadog consolida y aplica a las métricas de costes las siguientes etiquetas (tags) procedentes de diversas fuentes.

{{< tabs >}}
{{% tab "AWS" %}}

### Kubernetes

Además de las etiquetas (tags) de pods Kubernetes y de nodos Kubernetes, se aplica la siguiente lista no exhaustiva de etiquetas (tags) predefinidas a las métricas de costes:

| Etiquetas (tags) predefinidas  |  Descripción |
| ---                 | ------------ |
| `orchestrator:kubernetes` | Plataforma de orquestación asociada a la partida es Kubernetes. |
| `kube_cluster_name` | Nombre del clúster Kubernetes. |
| `kube_namespace` | Espacio de nombres donde se ejecutan las cargas de trabajo. |
| `kube_deployment` | Nombre del despliegue Kubernetes. |
| `kube_stateful_set` | Nombre del StatefulSet Kubernetes. |
| `pod_name` | Nombre de cualquier pod individual. |

Los conflictos se resuelven favoreciendo las etiquetas (tags) de mayor especificidad, como las etiquetas (tags) de pods, sobre las etiquetas (tags) de menor especificidad, como las etiquetas (tags) de host. Por ejemplo, un pod Kubernetes con la etiqueta (tag) `service:datadog-agent` que se ejecuta en un nodo etiquetado como `service:aws-node` da como resultado final la etiqueta (tag) `service:datadog-agent`.

#### Volumen persistente

Además de las etiquetas (tags) de pods Kubernetes y de nodos Kubernetes, se aplican las siguientes etiquetas (tags) predefinidas a las métricas de costes.

| Etiquetas (tags) predefinidas                      | Descripción                                                                                                                                  |
| ---                                     |----------------------------------------------------------------------------------------------------------------------------------------------|
| `persistent_volume_reclaim_policy`      | Política de reclamo de Kubernetes sobre volúmenes persistentes.                                                                                      |
| `storage_class_name`                    | Clase de almacenamiento Kubernetes utilizada para instanciar volúmenes persistentes.                                                                      |
| `volume_mode`                           | Modo de volumen del volumen persistente.                                                                                                    |
| `ebs_volume_type`                       | Tipo del volumen EBS. Puede ser `gp3`, `gp2` u otros.                                                                              |

### Amazon ECS

Además de las etiquetas (tags) de tareas ECS, las siguientes etiquetas (tags) predefinidas se aplican a las métricas de costes.

**Nota**: Se aplican la mayoría de las etiquetas (tags) de los contenedores ECS (excluyendo `container_name`).

| Etiquetas (tags) predefinidas      |  Descripción |
| ---                     | ------------ |
| `orchestrator:ecs`      | Plataforma de orquestación asociada a la partida es AWS ECS. |
| `ecs_cluster_name`      | Nombre del clúster ECS. |
| `is_aws_ecs`            | Todos los costes asociados a la ejecución de ECS. |
| `is_aws_ecs_on_ec2`     | Todos los costes de cálculo de EC2 asociados a la ejecución de ECS en EC2. |
| `is_aws_ecs_on_fargate` | Todos los costes asociados a la ejecución de ECS en Fargate. |

### Transferencia de datos

La siguiente lista de etiquetas (tags) predefinidas se aplica a las métricas de costes asociadas a las cargas de trabajo Kubernetes:

| Etiquetas (tags) predefinidas      |  Descripción |
| ---                     | ------------ |
| `source_availability_zone` | Nombre de la zona de disponibilidad donde se originó la transferencia de datos. |
| `source_availability_zone_id` | ID de la zona de disponibilidad donde se originó la transferencia de datos. |
| `source_region` | Región donde se originó la transferencia de datos. |
| `destination_availability_zone` | Nombre de la zona de disponibilidad a la que se envió la transferencia de datos. |
| `destination_availability_zone_id` | ID de la zona de disponibilidad a la que se envió la transferencia de datos. |
| `destination_region` | Región a la que se envió la transferencia de datos. |
| `allocated_resource:data_transfer` | Seguimiento y asignación de los costes asociados a las actividades de transferencia de datos. |

Además, también se aplican algunas etiquetas (tags) de pod Kubernetes que son frecuentes entre todos los pods del mismo nodo.

{{% /tab %}}
{{% tab "Azure" %}}

### Kubernetes

Además de las etiquetas (tags) de pods Kubernetes y de nodos Kubernetes, se aplica la siguiente lista no exhaustiva de etiquetas (tags) predefinidas a las métricas de costes:

| Etiquetas (tags) predefinidas                         | Descripción                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | Plataforma de orquestación asociada a la partida es Kubernetes.                                                                                            |
| `kube_cluster_name` | Nombre del clúster Kubernetes. |
| `kube_namespace` | Espacio de nombres donde se ejecutan las cargas de trabajo. |
| `kube_deployment` | Nombre del despliegue Kubernetes. |
| `kube_stateful_set` | Nombre del StatefulSet Kubernetes. |
| `pod_name` | Nombre de cualquier pod individual. |
| `allocated_resource:data_transfer` | Seguimiento y asignación de los costes asociados a las actividades de transferencia de datos utilizadas por servicios o cargas de trabajo Azure. |
| `allocated_resource:local_storage`         | Seguimiento y asignación de costes a nivel de host asociados a los recursos de almacenamiento local utilizados por servicios o cargas de trabajo Azure.                             |

{{% /tab %}}
{{% tab "Google" %}}

### Kubernetes

Además de las etiquetas (tags) de pods Kubernetes y de nodos Kubernetes, se aplica la siguiente lista no exhaustiva de etiquetas (tags) predefinidas a las métricas de costes:

| Etiquetas (tags) predefinidas                         | Descripción                                                                                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------  |
| `orchestrator:kubernetes`                  | Plataforma de orquestación asociada a la partida es Kubernetes.                                                                                            |
| `kube_cluster_name` | Nombre del clúster Kubernetes. |
| `kube_namespace` | Espacio de nombres donde se ejecutan las cargas de trabajo. |
| `kube_deployment` | Nombre del despliegue Kubernetes. |
| `kube_stateful_set` | Nombre del StatefulSet Kubernetes. |
| `pod_name` | Nombre de cualquier pod individual. |
| `allocated_spend_type:not_monitored` | Seguimiento y asignación de [costes de Kubernetes Agentless](#agentless-kubernetes-costs) asociados a los recursos utilizados por servicios o cargas de trabajo Google Cloud. El Datadog Agent no monitoriza estos recursos. |
| `allocated_resource:data_transfer` | Seguimiento y asignación de los costes asociados a las actividades de transferencia de datos utilizadas por servicios o cargas de trabajo Google Cloud. |
| `allocated_resource:gpu` | Seguimiento y asignación de costes a nivel de host asociados a los recursos de GPU utilizados por servicios o cargas de trabajo Google Cloud. |
| `allocated_resource:local_storage` | Seguimiento y asignación de costes a nivel de host asociados a los recursos de almacenamiento local utilizados por servicios o cargas de trabajo Google Cloud. |

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/containers