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
description: Instala y configura el Agente de Datadog en Kubernetes
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centro de Aprendizaje
  text: Introducción a la Observabilidad de Kubernetes
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de la Versión
  text: Consulta las últimas versiones de Datadog Containers (se requiere inicio de
    sesión en la aplicación).
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limita la recolección de datos a un subconjunto de contenedores solamente
- link: /agent/guide/docker-deprecation
  tag: Documentación
  text: Deprecación del runtime de Docker en Kubernetes
- link: https://dtdg.co/fe
  tag: Habilitación de la Fundación
  text: Únete a una sesión interactiva para obtener información sobre la monitorización
    de Kubernetes
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: Blog
  text: Una guía sobre cómo escalar sus pods de Kubernetes con el Watermark Pod Autoscaler.
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Monitorea tus operadores de Kubernetes para mantener las aplicaciones funcionando
    sin problemas
title: Kubernetes
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  Esta sesión de habilitación de la fundación se centrará en cómo Datadog puede monitorear Kubernetes. Aprende a configurar Datadog para Kubernetes y cómo comenzar. Explora las diversas vistas y herramientas que Datadog ofrece para visualizar y analizar las métricas, trazas y registros de tu clúster y aplicaciones.
{{< /learning-center-callout >}}

## Instalación del agente {#agent-installation}

Puede instalar el Datadog Agent utilizando ya sea el Datadog Operator o el Helm chart, siguiendo la [guía de instalación en la aplicación en Fleet Automation][5]. Esta interfaz guiada te permite:
- Seleccione su distribución de Kubernetes (por ejemplo, EKS, AKS o GKE)
- Genere comandos de Helm y kubectl con su clave de API prellenada
- Habilite características como APM, Log Management, etiquetado y otra telemetría a través de una configuración basada en la interfaz de usuario


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Pasos de instalación en la aplicación para el Agente de Datadog en Kubernetes." style="width:90%;">}}


El flujo del Datadog Operator instala el Datadog Operator y utiliza recursos personalizados para configurar su cobertura de observabilidad.

El flujo del Helm chart instala los componentes de Datadog de manera más directa y ofrece interruptores similares para las características de observabilidad.

Ambas opciones le permiten gestionar una configuración: el Datadog Operator o el Helm chart crean el DaemonSet del Datadog Agent, el Cluster Agent Deployment y todas sus dependencias para su monitoreo basado en Kubernetes.

Consulte [Supported Versions][6] para la lista completa de versiones de Kubernetes soportadas por el Datadog Agent.


### Instalación manual {#manual-installation}

La [herramienta de instalación en la aplicación en Fleet Automation][5] proporciona una forma guiada de construir sus configuraciones. También puede consultar la [documentación de instalación de Kubernetes][7] para los pasos sobre cómo desplegar y configurar el Datadog Operator o el Datadog Helm chart manualmente en su entorno.

Datadog recomienda que utilice el Datadog Operator o el Datadog Helm chart para desplegar todos los recursos de Kubernetes. Si necesita desplegar todos los manifiestos directamente, consulte la documentación completa de instalación manual de Kubernetes [8].

Para comandos del Datadog Agent, consulte las [guías de comandos del Agent][9]. Para información sobre el Datadog Cluster Agent y su rol, consulte [Cluster Agent for Kubernetes][3].

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Instalación</u>: Instale el Datadog Agent en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuración Adicional</u>: Recopile eventos, anule la configuración del proxy, envíe métricas personalizadas con DogStatsD, configure las listas de permitidos y bloqueados de contenedores y consulte la lista completa de variables de entorno disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distribuciones</u>: Revise las configuraciones base para las principales distribuciones de Kubernetes, incluyendo AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Configure la recolección de trazas: configure el Datadog Agent para aceptar trazas, configure sus pods para comunicarse con el Datadog Agent y configure sus SDKs de aplicación para emitir trazas.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>App and API Protection</u>: Habilite automáticamente App and API Protection para sus ingress proxies y gateways de Kubernetes, a fin de detectar amenazas y proteger las APIs en el borde.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>CSI Driver</u>: Instale y configure el Datadog CSI driver, y monte el socket UDS de DogStatsD y del Trace Agent utilizando volúmenes CSI de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recolección de registros</u>: Configure la recolección de registros en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extracción de etiquetas</u>: Configure el Datadog Agent para crear y asignar etiquetas a todas las métricas, trazas y registros emitidos por un contenedor, pod o nodo, basándose en etiquetas o anotaciones de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations & Autodiscovery</u>: Configure Integrations en un entorno de Kubernetes utilizando Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus & OpenMetrics</u>: Recolecte las métricas expuestas de Prometheus y OpenMetrics de su aplicación que se ejecuta dentro de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Monitoreo del plano de control</u>: Monitoree el servidor API de Kubernetes, el administrador de controladores, el programador y etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Datos recolectados</u>: Consulte la lista de métricas recolectadas por el Datadog Agent cuando se despliega en su clúster de Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/kubernetes-legacy/
[2]: /es/agent/configuration/agent-commands/
[3]: /es/containers/cluster_agent/
[4]: https://docs.datadoghq.com/es/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: /es/containers/kubernetes/installation?tab=datadogoperator#minimum-kubernetes-and-datadog-agent-versions
[7]: /es/containers/kubernetes/installation
[8]: https://docs.datadoghq.com/es/containers/guide/kubernetes_daemonset/
[9]: /es/agent/configuration/agent-commands/