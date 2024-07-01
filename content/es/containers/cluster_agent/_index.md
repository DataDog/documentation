---
aliases:
- /es/agent/kubernetes/cluster/
- /es/agent/cluster_agent/
- /es/containers/cluster_agent/event_collection
- /es/containers/cluster_agent/metadata_provider
further_reading:
- link: https://www.datadoghq.com/blog/datadog-cluster-agent/
  tag: Blog
  text: Presentación del Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/autoscale-kubernetes-datadog/
  tag: Blog
  text: Autoescalar sus cargas de trabajo Kubernetes con cualquier métrica Datadog
title: Cluster Agent para Kubernetes
---

## Información general

El Cluster Agent de Datadog proporciona un enfoque optimizado y centralizado para recopilar datos de monitorización a nivel de clúster. Al actuar como proxy entre el servidor de la API y los Agents basados en nodos, el Cluster Agent ayuda a reducir la carga del servidor. También transmite metadatos a nivel de clúster a los Agents basados en nodos, lo que les permite enriquecer los metadatos de las métricas recopiladas localmente.

El uso del Cluster Agent de Datadog te permite:

* Reducir el impacto de los Agents en tu infraestructura.
* Aislar los Agents basados en nodos a sus respectivos nodos, limitando las reglas de configuración del control de acceso basado en roles (RBAC) para que únicamente lean métricas y metadatos del kubelet.
* Proporcionar metadatos a nivel de clúster que solo pueden encontrarse en el servidor de la API a los Agents de nodo, para que enriquezcan los metadatos de las métricas recopiladas localmente.
* Habilitar la recopilación de datos a nivel de clúster, tales como la monitorización de servicios o SPOF y eventos.
* Usar el Escalador automático de pods horizontales (HPA) con métricas personalizadas de Kubernetes y métricas externas. Consulta la [guía de escalado automático con métricas personalizadas y externas][1] para obtener más información.

Si has instalado el Datadog Agent utilizando Helm chart v2.7.0 u Operator de Datadog v1.0.0 o posterior, el **Datadog clúster Agent está activado por defecto**.

Si estás usando el Docker, el Datadog Cluster Agent está disponible en Docker Hub y GCR:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/cluster-agent][2]      | [gcr.io/datadoghq/cluster-agent][3]                       |

<div class="alert alert-warning">Docker Hub está sujeto a límites en la tasa de extracción de imágenes. Si no eres cliente de Docker Hub, Datadog te recomienda que actualices tu configuración de Datadog Agent y Cluster Agent para extraer desde GCR o ECR. Para obtener instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambio de tu registro de contenedores </a>.</div>

### Versiones mínimas del Agent y el Cluster Agent

Algunas funciones relacionadas con versiones posteriores de Kubernetes requieren una versión mínima del Datadog Agent.

| Versión de Kubernetes | Versión del Agent  | Versión de Cluster Agent | Motivo                                |
|--------------------|----------------|-----------------------|---------------------------------------|
| 1.16.0 o posterior            | 7.19.0 o posterior        | 1.9.0 o posterior                | Obsolescencia de métricas kubelet           |
| 1.21.0 o posterior            | 7.36.0 o posterior        | 1.20.0 o posterior               | Obsolescencia de recursos Kubernetes       |
| 1.22.0 o posterior            | 7.37.0 o posterior        | 7.37.0 o posterior               | Admitir token de cuenta de servicio dinámico |

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
    {{< nextlink href="/agent/cluster_agent/setup" >}}<u>Setup</u>: configura tu Datadog Cluster Agent en tu clúster Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/commands" >}}<u>Comandos y opciones</u>: lista de todos los comandos y todas las opciones disponibles for para el Cluster Agent.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/clusterchecks" >}}<u>Checks de clústeres</u>: los checks de clústers proporcionan la capacidad de auto-descubrimiento y de realización de checks en servicios de clúster de carga equilibrada como los servicios Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/endpointschecks" >}}<u>Checks de endpoints</u>: los checks de endpoints amplían los checks de clústeres para la monitorización de cualquier endpoint detrás de servicios de clúster.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/admission_controller" >}}<u>Controlador de admisión</u>: configura el Controlador de admisión para la configuración simplificada de pods de aplicaciones.{{< /nextlink >}}
    {{< nextlink href="/agent/cluster_agent/troubleshooting" >}}<u>Resolución de problemas del Cluster Agent</u>: encuentra información para la resolución de problemas del Datadog Cluster Agent.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/guide/cluster_agent_autoscaling_metrics
[2]: https://hub.docker.com/r/datadog/cluster-agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent