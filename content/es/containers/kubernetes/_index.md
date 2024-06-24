---
aliases:
- /es/guides/basic_agent_usage/kubernetes
- /es/agent/basic_agent_usage/kubernetes
- /es/tracing/kubernetes/
- /es/tracing/setup/kubernetes
- /es/integrations/faq/using-rbac-permission-with-your-kubernetes-integration
- /es/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s
- /es/integrations/faq/docker-ecs-kubernetes-events/
- /es/integrations/faq/container-integration-event/
- /es/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250/
- /es/agent/kubernetes/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de la versión
  text: ¡Échale un vistazo a las últimas versiones de los contenedores de Datadog!
    (Es necesario iniciar sesión en la aplicación).
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/guide/docker-deprecation
  tag: Documentación
  text: Obsolescencia del tiempo de ejecución Docker en Kubernetes
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para conocer mejor la monitorización en
    Kubernetes
kind: documentación
title: Kubernetes
---

## Información general

Ejecuta el Datadog Agent en tu clúster de Kubernetes para empezar a recopilar métricas, trazas y logs de tus clústeres y aplicaciones.

**Nota**: El Agent v6.0 o posteriores sólo es compatible con Kubernetes v1.7.6 o posteriores. Para ver versiones anteriores de Kubernetes, consulta las [versiones de Kubernetes heredadas][1].

Para conocer los comandos del Agent, consulta las [guías de comandos del Agent][2].

Para obtener más información sobre el Datadog Cluster Agent y ver un enfoque simplificado de la recopilación de datos de monitorización a nivel de clúster, consulta [Cluster Agent para Kubernetes][3].

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Instalación</u>: instalar el Datadog Agent en un entorno Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuración adicional</u>: recopilar eventos, sobreescribir parámetros de proxy, enviar métricas personalizadas con DogStatsD, configurar listas de bloqueos y permitidos en contenedores, y hacer referencia a la lista completa de las variables de entorno disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distribuciones</u>: revisar las configuraciones de base para grandes distribuciones Kubernetes, incluyendo AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>-Configurar la recopilación de trazas: configurar el Agent para aceptar trazas, configurar tus Pods para comunicarse con el Agent y configurar tus rastreadores de aplicaciones para emitir trazas.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recopilación de logs</u>: configurar la recopilación de logs en un entorno Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extracción de etiquetas (tags)</u>: configurar el Agent para crear y asignar etiquetas a todas las métricas, trazas y a todos los logs emitidos por un contenedor, pod o nodo, en base a etiquetas o anotaciones de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integraciones y Autodiscovery</u>: para configurar integraciones en un entorno Kubernetes, utiliza la función Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: recopilar tus métricas de Prometheus y OpenMetrics expuestas desde tu aplicación que se ejecuta en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Monitorización de planos de control</u>: monitorizar el servidor de API Kubernetes, el administrador de controladores, el programador y etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Datos recopilados</u>: ver la lista de las métricas recopiladas por el Agent cuando se despliega en tu clúster Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/kubernetes-legacy/
[2]: /es/agent/configuration/agent-commands/
[3]: /es/containers/cluster_agent/