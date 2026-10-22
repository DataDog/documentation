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
description: Haga un seguimiento de Kubernetes con el Datadog Agent u OpenTelemetry.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad de Kubernetes
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de la versión
  text: Verifique las últimas versiones de Datadog Containers (se requiere inicio
    de sesión en la aplicación).
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limitar la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/guide/docker-deprecation
  tag: Documentación
  text: Deprecación del tiempo de ejecución de Docker en Kubernetes
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para obtener información sobre el seguimiento
    de Kubernetes
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: Blog
  text: Una guía sobre cómo escalar sus pods de Kubernetes con el Watermark Pod Autoscaler
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Haga un seguimiento de sus operadores de Kubernetes para mantener las aplicaciones
    funcionando sin problemas
title: Kubernetes
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  Esta sesión de habilitación fundamental se centrará en cómo Datadog puede hacer un seguimiento de Kubernetes. Aprenda a configurar Datadog para Kubernetes y cómo empezar. Explore las diversas vistas y herramientas que ofrece Datadog para visualizar y analizar las métricas, trazas y registros de su clúster y de sus aplicaciones.
{{< /learning-center-callout >}}

Para enviar recursos de Kubernetes y métricas de infraestructura a Datadog con OpenTelemetry en lugar del Datadog Agent, consulte [Monitorear Kubernetes con OpenTelemetry][10].

## Instalación del Agent{#agent-installation}

Puede instalar el Agent utilizando el [Datadog Operator][4] o el chart de Helm siguiendo la [guía de instalación in-app en Fleet Automation][5]. Esta interfaz guiada le permite:
- Seleccione su distribución de Kubernetes (por ejemplo, EKS, AKS o GKE)
- Genere comandos de Helm y kubectl con su clave de API precargada
- Habilite funciones como APM, Log Management, etiquetado y otra telemetría a través de la configuración basada en la interfaz de usuario


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Pasos de instalación in-app para el Datadog Agent en Kubernetes." style="width:90%;">}}


El flujo del Datadog Operator instala el Datadog Operator y utiliza Custom Resources para configurar su cobertura de observabilidad.

El flujo del chart de Helm instala los componentes de Datadog de forma más directa y ofrece conmutadores similares para las funciones de observabilidad.

Ambas opciones le permiten gestionar una configuración: el Datadog Operator o el chart de Helm crean el DaemonSet del Datadog Agent, el Deployment del Cluster Agent y todas sus dependencias para su seguimiento basado en Kubernetes.

Consulte [Versiones compatibles][6] para obtener la lista completa de versiones de Kubernetes compatibles con el Datadog Agent.


### Instalación manual {#manual-installation}

La [herramienta de instalación en la aplicación de Fleet Automation][5] proporciona una forma guiada de crear sus configuraciones. También puede consultar la [documentación de instalación de Kubernetes][7] para conocer los pasos sobre cómo implementar y configurar manualmente el Datadog Operator o el chart de Helm de Datadog en su entorno.

Datadog recomienda que utilice el Datadog Operator o el chart de Helm de Datadog para implementar todos los recursos de Kubernetes por usted. Si necesita implementar todos los manifiestos directamente, consulte la [documentación completa de instalación manual de Kubernetes][8].

Para comandos del Agent, consulte las [guías de comandos del Agent][9]. Para obtener información sobre el Cluster Agent de Datadog y su función, consulte [Cluster Agent para Kubernetes][3].

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Instalación</u>: Instale el Datadog Agent en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuración adicional</u>: Recopile eventos, anule la configuración del proxy, envíe métricas personalizadas con DogStatsD, configure la lista de permitidos y la lista de bloqueados de contenedores, y consulte la lista completa de variables de entorno disponibles.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distribuciones</u>: Revise las configuraciones base para las principales distribuciones de Kubernetes, incluidas AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Configure la recopilación de trazas: configure el Agent para aceptar trazas, configure sus pods para comunicarse con el Agent y configure sus SDK de aplicación para emitir trazas.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/appsec">}}<u>Protección de aplicaciones y API</u>: Habilite automáticamente la Protección de aplicaciones y API para sus proxies y puertas de enlace de entrada de Kubernetes para detectar amenazas y proteger las API en el borde.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>Controlador CSI</u>: Instale y configure el controlador CSI de Datadog, y monte el socket UDS de DogStatsD y del Agent de traza utilizando volúmenes CSI de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recopilación de registros</u>: Configure la recopilación de registros en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extracción de etiquetas</u>: Configure el Agent para crear y asignar etiquetas a todas las métricas, trazas y registros emitidos por un contenedor, pod o nodo, según las etiquetas o anotaciones de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integrations y Autodiscovery</u>: Para configurar integraciones en un entorno de Kubernetes, utilice la función Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: Recopile sus métricas expuestas de Prometheus y OpenMetrics de su aplicación que se ejecuta dentro de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Monitoreo del plano de control</u>: Haga un seguimiento del servidor de API de Kubernetes, del administrador de controladores, del planificador y de etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Datos recopilados</u>: Consulte la lista de métricas recopiladas por el Agent cuando se implementa en su clúster de Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Lecturas adicionales {#further-reading}

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
[10]: /es/containers/kubernetes/opentelemetry/