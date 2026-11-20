---
aliases:
- /es/agent/kubernetes/cluster/
- /es/agent/cluster_agent/
- /es/containers/cluster_agent/event_collection
- /es/containers/cluster_agent/metadata_provider
description: Enfoque centralizado para recopilar datos de seguimiento a nivel de clúster
  con el Datadog Cluster Agent
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentación del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Escale automáticamente sus cargas de trabajo de Kubernetes con cualquier métrica
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Lleve la observabilidad de alto rendimiento a entornos seguros de Kubernetes
    con el controlador CSI de Datadog
- link: https://www.datadoghq.com/architecture/efficient-kubernetes-monitoring-with-the-datadog-cluster-agent/
  tag: Centro de arquitectura
  text: Seguimiento eficiente de Kubernetes con el Datadog Cluster Agent
- link: https://www.datadoghq.com/architecture/real-world-applications-of-the-datadog-cluster-agent-part-one/
  tag: Centro de arquitectura
  text: Aplicaciones del mundo real del Datadog Cluster Agent (Parte 1)
title: Cluster Agent para Kubernetes
---
## Descripción general {#overview}

El Datadog Cluster Agent proporciona un enfoque centralizado y optimizado para recopilar datos de seguimiento a nivel de clúster. Al actuar como un proxy entre el servidor de API y los Agents basados en nodos, el Cluster Agent ayuda a aliviar la carga del servidor. También transmite metadatos a nivel de clúster a los Agents basados en nodos, lo que les permite enriquecer los metadatos de las métricas recopiladas localmente.

El uso del Datadog Cluster Agent le permite:

* Aliviar el impacto de los Agents en su infraestructura.
* Aislar los Agents basados en nodos en sus respectivos nodos, reduciendo las reglas de RBAC únicamente a la lectura de métricas y metadatos desde el kubelet.
* Proporcionar a los Agents de nodo metadatos a nivel de clúster que solo se pueden encontrar en el servidor de API, para que puedan enriquecer los metadatos de las métricas recopiladas localmente.
* Habilitar la recopilación de datos a nivel de clúster, como el seguimiento de servicios o SPOF y eventos.
* Usar el escalado automático horizontal de pods (HPA) con métricas personalizadas de Kubernetes y métricas externas. Consulte la [guía de escalado automático con métricas personalizadas y externas][1] para obtener más detalles.

Si instaló el Datadog Agent usando el Helm chart v2.7.0 o Datadog Operator v1.0.0+, el **Datadog Cluster Agent está habilitado de forma predeterminada**.

Datadog publica imágenes de contenedor en Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR y Docker Hub:

{{% container-images-table %}}

De forma predeterminada, el Helm chart de Datadog Agent determina el registro de imágenes del Agent a partir de su sitio de Datadog, el tipo de clúster y `registryMigrationMode`. Dependiendo de estos valores y las exclusiones de entorno, las imágenes del Agent pueden extraerse de Datadog Container Registry (`registry.datadoghq.com`) o de un registro específico del sitio. El chart de Datadog Operator se incluye como una dependencia del Helm chart de Datadog Agent de forma predeterminada. A partir de la versión 2.19.0 del chart de Datadog Operator, cuando instala el Operator a través de esa dependencia, la `registryMigrationMode` del Helm chart de Datadog Agent se aplica a las imágenes del Agent administradas por el Operator. El Helm chart del Operator en sí no define `registryMigrationMode`; la imagen del pod del Operator se controla por separado mediante el valor `image.repository` del chart del Operator.

<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de extracción de imágenes. Si usted no es cliente de Docker Hub, Datadog recomienda que actualice la configuración de su Datadog Agent y Cluster Agent para extraer desde otro registro. Para obtener instrucciones, consulte <a href="/agent/guide/changing_container_registry">Cambiar su registro de contenedor</a>.</div>

### Versiones mínimas de Agent y Cluster Agent {#minimum-agent-and-cluster-agent-versions}

Para una compatibilidad óptima, Datadog recomienda mantener su Cluster Agent y Agent en versiones coincidentes. Para obtener una matriz de soporte completa de versiones de Kubernetes y versiones de Datadog, consulte la [página de instalación de Kubernetes][2].

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Configuración</u>: Configure el Datadog Cluster Agent en su clúster de Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Comandos y opciones</u>: Lista de todos los comandos y opciones disponibles para el Cluster Agent.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Verificaciones de clúster</u>: Las verificaciones de clúster brindan la capacidad de descubrir automáticamente y realizar verificaciones en servicios de clúster balanceados por carga, como los servicios de Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Verificaciones de punto de conexión</u>: Las verificaciones de punto de conexión extienden las verificaciones de clúster para hacer un seguimiento de cualquier punto de conexión detrás de los servicios de clúster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Controlador de admisión</u>: Configure el controlador de admisión para una configuración simplificada de Pods de aplicación.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Cluster Agent Troubleshooting</u>: Encuentre información de solución de problemas para el Datadog Cluster Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Seguimiento del Cluster Agent {#monitoring-the-cluster-agent}
El Datadog Agent incluye una integración que hace un seguimiento automáticamente del Cluster Agent. La integración se ejecuta en el pod del Datadog Agent regular que se encuentra en el mismo nodo que el Cluster Agent. No se ejecutará en el propio Cluster Agent. Consulte la [documentación de la integración del Datadog Cluster Agent][3] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/guide/cluster_agent_autoscaling_metrics
[2]: /es/containers/kubernetes/installation#minimum-kubernetes-and-datadog-agent-versions
[3]: https://docs.datadoghq.com/es/integrations/datadog_cluster_agent/