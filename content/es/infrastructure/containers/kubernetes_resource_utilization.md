---
aliases:
- /es/infrastructure/containers/kubernetes_resources
further_reading:
- link: https://www.datadoghq.com/blog/rightsize-kubernetes-workloads/
  tag: Blog
  text: Consejos prácticos para redimensionar las cargas de trabajo de Kubernetes
title: Uso de recursos de Kubernetes
---

{{< img src="infraestructura/livecontainers/kubernetes_resource_utilization.png" alt="Vista de utilización de recursos de Kubernetes" >}}

La vista de [utilización de recursos de Kubernetes][3] de Datadog te brinda información sobre cómo las cargas de trabajo de Kubernetes utilizan tus recursos informáticos en toda tu infraestructura. Esto te ayuda a comprender el uso de recursos y tomar mejores decisiones sobre la planificación de la capacidad y el tamaño, además de reducir la cantidad de CPU o memoria desperdiciada.

Con un estado que se actualiza constantemente sobre qué tan bien las solicitudes y límites de recursos coinciden con el uso actual de tus pods, puedes mejorar el empaquetado de contenedores en tus clústeres de Kubernetes.

## Requisitos previos

- Datadog Agent versión 7.45.0 o posteriores
- Habilitar [Orchestrator Explorer][1]

## Uso

En Datadog, dirígete a la página [**Kubernetes Overview**][2] (Información general sobre Kubernetes) y selecciona la [pestaña **Resource Utilization**][3] (Utilización de recursos).

La página se abre en **Pods**, con una agrupación predeterminada por `kube_cluster_name`, `kube_namespace` y `kube_deployment`.

La optimización del tamaño de la CPU y la memoria suele realizarse por separado. Los datos de la tabla se dividen entre **CPU** y **Memory** (Memoria).

#### Columnas predeterminadas

{{< tabs >}}
{{% tab "CPU" %}}
- **Pod group** (Grupo de pods): de manera predeterminada, representa los despliegues, pero depende de lo que especifiques en el campo **Group by** (Agrupar por) en la parte superior derecha. Esta columna incluye la suma del uso, las solicitudes y los límites de los pods de cada grupo.
- **CPU idle** (CPU inactiva): cantidad de CPU sin utilizar, calculada como la suma de las diferencias entre el uso y las solicitudes.
- **CPU usage/requests** (Solicitudes/uso de CPU): suma del uso dividida por la suma de solicitudes, como porcentaje.
- **CPU usage/limits** (Límites/uso de CPU): suma del uso dividida por la suma de límites, como porcentaje.
- **CPU graph** (Gráfica de CPU): una gráfica de líneas que muestra la evolución del uso, las solicitudes y los límites a lo largo del tiempo. Haz clic en cada fila para ver un período de tiempo más largo.
{{% /tab %}}
{{% tab "Memoria" %}}
- **Pod group** (Grupo de pods): de manera predeterminada, representa los despliegues, pero depende de lo que especifiques en el campo **Group by** (Agrupar por) en la parte superior derecha. Esta columna incluye la suma del uso, las solicitudes y los límites de los pods de cada grupo.
- **Memory unused** (Memoria sin utilizar): cantidad de memoria sin utilizar, calculada como la suma de las diferencias entre el uso y las solicitudes.
- **Memory usage/requests** (Solicitudes/uso de memoria): suma del uso dividida por la suma de solicitudes, como porcentaje.
- **Memory usage/limits** (Límites/uso de memoria): suma del uso dividida por la suma de límites, como porcentaje.
- **Memory graph** (Gráfica de memoria): una gráfica de líneas que muestra la evolución del uso, las solicitudes y los límites a lo largo del tiempo. Haz clic en cada fila para ver un período de tiempo más largo.
{{% /tab %}}
{{< /tabs >}}

Utiliza el botón **Customize** (Personalizar) en la esquina superior derecha a fin de seleccionar otras columnas para ver. La codificación por colores refleja el grado de aprovisionamiento excesivo/insuficiente del pod.

#### Vista detallada

Al hacer clic en una fila, se abre un panel lateral con la combinación de datos de CPU y memoria para cada grupo, con gráficas detalladas para cada pod o contenedor y una lista superior de pods.

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_panel.png" alt="Panel lateral de utilización de recursos de Kubernetes" >}}

Las gráficas de contenedores o pods individuales te ayudan a identificar outliers que pueden afectar al grupo en caso de desequilibrio de carga. De forma predeterminada, las gráficas se agrupan por`pod_name` para mostrar los pods individuales. Puedes cambiar esto para agrupar por `kube_container_name` a fin de identificar qué contenedores contribuyen más al aprovisionamiento excesivo/insuficiente en el caso de pods de varios contenedores.

### Optimizar recursos inactivos

La CPU y la memoria inactivas son necesarias a fin de garantizar que tu aplicación tenga espacio para crecer sin que los pods se limiten o cierren de inmediato.

Demasiada CPU y memoria inactivas pueden generar costos innecesariamente más altos, pero la alternativa genera el riesgo de degradación del rendimiento y la confiabilidad si aumenta el uso de recursos.

Para ayudar a encontrar este equilibrio, ajusta las gráficas a fin de observar un período de tiempo más largo y evita tomar decisiones sobre el tamaño de los recursos basándote únicamente en el uso más reciente. Estas métricas son métricas de Kubernetes estándar, por lo que puedes consultarlas como todas las métricas de Datadog (por ejemplo, durante los últimos 15 meses, con resolución completa si es necesario).

{{< img src="infrastructure/livecontainers/kubernetes_resource_utilization_metrics.png" alt="Métricas de utilización de recursos de Kubernetes" >}}

### Limitaciones conocidas

Las métricas no se muestran para grupos que contienen al menos un pod con contenedores que no establecen solicitudes ni límites, ya que Datadog no puede deducir el porcentaje de uso sin ellas. Estos grupos sin métricas aparecen al final, independientemente del orden de clasificación.

La suma de las solicitudes y límites de los recursos de un grupo es independiente del estado de los recursos que pertenecen a ese grupo. Estos valores pueden diferir de los que se muestran en las gráficas de métricas complementarias.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/infrastructure/containers/orchestrator_explorer?tab=datadogoperator#setup
[2]: https://app.datadoghq.com/kubernetes
[3]: https://app.datadoghq.com/orchestration/resource/pod?groups=tag%23kube_deployment%2Ctag%23kube_namespace%2Ctag%23kube_cluster_name