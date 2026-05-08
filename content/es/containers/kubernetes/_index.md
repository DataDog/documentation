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
description: Instalar y configurar el Datadog Agent en Kubernetes
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centro de aprendizaje
  text: Empezando con Kubernetes Observability
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de versiones
  text: ¡Échale un vistazo a las últimas versiones de los contenedores de Datadog!
    (Es necesario iniciar sesión en la aplicación).
- link: /agent/guide/autodiscovery-management
  tag: Documentación
  text: Limitar la recopilación de datos a un subconjunto de contenedores
- link: /agent/guide/docker-deprecation
  tag: Documentación
  text: Obsolescencia del tiempo de ejecución Docker en Kubernetes
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para conocer más sobre la monitorización
    en Kubernetes
- link: https://www.datadoghq.com/blog/watermark-pod-autoscaler/
  tag: Blog
  text: Guía para escalar tus pods de Kubernetes con el Watermark Pod Autoscaler
title: Kubernetes
---


{{< learning-center-callout header="Únete a una sesión web de capacitación" hide_image="true" btn_title="Inscríbete" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Kubernetes">}}
  Esta sesión de capacitación básica se centrará en cómo Datadog puede monitorizar Kubernetes. Aprende cómo configurar Datadog para Kubernetes y cómo empezar. Explora las diversas vistas y herramientas que ofrece Datadog para visualizar y analizar métricas, trazas (traces) y logs de tu aplicación..
{{< /learning-center-callout >}}

## Instalación del Agent

Puedes instalar el Agent utilizando el [Datadog Operator][4] o Helm Chart siguiendo la [guía de instalación en la aplicación en Fleet Automation][5]. Esta interfaz guiada te permite:
- Seleccionar tu distribución Kubernetes (por ejemplo, EKS, AKS o GKE)
- Generar comandos helm y kubectl con tu clave de API rellenada previamente
- Activar funciones como APM, Log Management, etiquetado y otras telemetrías mediante una configuración basada en la interfaz de usuario


{{< img src="agent/basic_agent_usage/agent_install_k8.png" alt="Pasos de instalación en la aplicación del Datadog Agent en Kubernetes." style="width:90%;">}}


El flujo del Datadog Operator instala el Datadog Operator y utiliza recursos personalizados para configurar la cobertura de observabilidad.

El flujo del Helm Chart instala el Agent utilizando DaemonSet y ofrece conmutadores similares para las funciones de observabilidad.

Consulta [Versiones admitidas][6] para ver la lista completa de versiones de Kubernetes admitidas por el Datadog Agent.


### Instalación manual

Para instalar manualmente tu Agent en Kubernetes, sigue las instrucciones de [Instalar y configurar manualmente el Datadog Agent con un DaemonSet][7].


Para obtener información sobre comandos del Agent, consulta las guías de comandos del Agent. Para obtener información sobre el Datadog Cluster Agent, consulta Cluster Agent para Kubernetes.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> te permite delimitar checks de host y clúster. Este nombre único debe ser tokens separados por puntos y respetar las siguientes restricciones:
<ul>
  <li/>Debe contener solo letras minúsculas, números y guiones
  <li/>Debe empezar con una letra
  <li/>Debe terminar con un número o una letra
  <li/>Debe contener 80 caracteres o menos
</ul>
</div>

<br>

## Configuración adicional
### Instalación sin privilegios

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para ejecutar una instalación sin privilegios, añade lo siguiente a `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=13-18" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
agent:
  config:
    securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Sustituye `<USER_ID>` por el UID para ejecutar el Datadog Agent. Datadog recomienda [configurar este valor en 100 a partir del Datadog Agent v7.48 o posterior][1].
- Sustituye `<GROUP_ID>` por el ID del grupo al que pertenece el socket Docker o contenedorizado.

[1]: /es/data_security/kubernetes/#running-container-as-root-user

A continuación, despliega el Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Para ejecutar una instalación sin privilegios, añade lo siguiente a tu archivo `datadog-values.yaml`:

{{< highlight yaml "hl_lines=4-7" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
  securityContext:
      runAsUser: <USER_ID>
      supplementalGroups:
        - <GROUP_ID>
{{< /highlight >}}

- Sustituye `<USER_ID>` por el UID para ejecutar el Datadog Agent.
- Sustituye `<GROUP_ID>` por el ID del grupo al que pertenece el socket Docker o contenedorizado.

A continuación, despliega el Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}


### Seleccionar registros de contenedor

La interfaz de usuario en la aplicación te permite seleccionar el registro de la imagen del contenedor, por defecto gcr.io/datadoghq. Si Artifact Registry no es accesible en la región de tu despliegue, utiliza otro registro como:

- `public.ecr.aws/datadog` (recomendado para desplegar el Agent en un entorno AWS)
- `datadoghq.azurecr.io`
- `docker.io/datadog` (puede estar sujeto a límites de tarifa a menos que sea cliente de Docker Hub)


### Desinstalar


{{< tabs >}}
{{% tab "Datadog Operator" %}}
```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

Este comando elimina todos los recursos de Kubernetes creados al instalar Datadog Operator y desplegar el Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

{{< whatsnext desc="Esta sección incluye los siguientes temas:">}}
  {{< nextlink href="/agent/kubernetes/installation">}}<u>Instalación</u>: Instala el Datadog Agent en un entorno Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Otras configuraciones</u>: Recopila eventos, anula parámetros de proxy, envía métricas personalizadas con DogStatsD, configura listas de autorizaciones y bloqueos para contenedores, y haz referencia a la lista completa de variables de entorno.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/distributions">}}<u>Distribuciones</u>: Revisa configuraciones básicas para distribuciones Kubernetes mayores, incluyendo AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine for Kubernetes (OKE).{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/apm">}}<u>APM</u>: Configura la recopilación de trazas: configura el Agent para aceptar trazas, configura tus pods para comunicarse con el Agent y configura los rastreadores de tu aplicación para emitir trazas.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/csi">}}<u>Controlador CSI</u>: Instala y configura el controlador Datadog CSI, y monta DogStatsD y el socket Trace Agent UDS utilizando volúmenes de Datadog CSI.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recopilación de logs</u>: Configura la recopilación de logs en un entorno Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/tag">}}<u>Extracción de etiquetas (tags)</u>: Configura el Agent para crear y asignar etiquetas a todas las métricas, trazas y logs emitidos por un contenedor, pod o nodo en función de etiquetas (labels) o anotaciones de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/integrations">}}<u>Integraciones y Autodiscovery</u>: Para configurar integraciones en un entorno Kubernetes, utiliza la función Autodiscovery de Datadog.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: Recopila tus métricas expuestas de Prometheus y OpenMetrics de tu aplicación que se ejecuta en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Controla la monitorización de planos</u>: Monitoriza el servidor de API, el controlador, el gestor, el programador y el etcd de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/data_collected">}}<u>Datos recopilados</u>: Consulta la lista de métricas recopiladas por el Agent cuando se despliega en tu clúster Kubernetes.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/kubernetes-legacy/
[2]: /es/agent/configuration/agent-commands/
[3]: /es/containers/cluster_agent/
[4]: https://docs.datadoghq.com/es/containers/datadog_operator/
[5]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[6]: https://docs.datadoghq.com/es/agent/supported_platforms/?tab=cloudandcontainers
[7]: https://docs.datadoghq.com/es/containers/guide/kubernetes_daemonset/