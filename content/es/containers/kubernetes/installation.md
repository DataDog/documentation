---
aliases:
- /es/agent/kubernetes/daemonset_setup
- /es/agent/kubernetes/helm
- /es/agent/kubernetes/installation
description: Instala y configura el Datadog Agent en Kubernetes utilizando el Datadog
  OperatorHelm o kubectl
further_reading:
- link: /agent/kubernetes/configuration
  tag: Documentación
  text: Configurar mejor el Datadog Agent en Kubernetes
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: Código fuente
  text: 'Tabla de Datadog Helm: todas las opciones de configuración '
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: Código fuente
  text: Actualización de Datadog Helm
title: Instala el Datadog Agent en Kubernetes
---

## Información general

Esta página proporciona instrucciones para instalar el Datadog Agent en un entorno Kubernetes.

Para obtener documentación específica y ejemplos para las principales distribuciones de Kubernetes, incluido AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine para Kubernetes (OKE), consulta [distribuciones de Kubernetes][1].

Para obtener documentación específica y ejemplos de monitorización del plano de control de Kubernetes, consulta [Monitorización del plano de control de Kubernetes][2].

### Versiones mínimas de Kubernetes y Datadog Agent 

Algunas funciones relacionadas con versiones posteriores de Kubernetes requieren una versión mínima de Datadog Agent.

| Versión de Kubernetes | Agent version | Motivo                                |
| ------------------ | ------------- | ------------------------------------- |
| 1.16.0+            | 7.19.0+       | Obsolescencia de las métricas de Kubelet           |
| 1.21.0+            | 7.36.0+       | Eliminación de recursos de Kubernetes       |
| 1.22.0+            | 7.37.0+       | Admite el token de cuenta de servicio dinámico |

Consulta también: [Versiones mínimas de Kubernetes y Cluster Agent][8].

## Instalación

Utiliza la página [Instalación en Kubernetes][16] de Datadog como guía para el proceso de instalación.

1. **Selecciona el método de instalación**

   Elige uno de los siguientes métodos de instalación:

   - [Datadog Operador][9] (recomendado): un [operador][10] de Kubernetes que puedes utilizar para desplegar el Datadog Agent en Kubernetes y OpenShift. Informa del estatus del despliegue, el estado y los errores en su estado de recurso personalizado, y limita el riesgo de configuración incorrecta gracias a las opciones de configuración más avanzadas.
   - [Helm][11]
   - Instalación manual. Consulta [Instalación manual y configuración del Datadog Agent con un DaemonSet][12].

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info">Requiere <a href="https://helm.sh">Helm</a> y la <a href="https://Kubernetes.io/docs/tasks/tools/#kubectl">CLI kubectl</a>.</div>

2. **Instalar el Datadog Operator**

   Para instalar el Operador Datadog en tu espacio de nombres actual, ejecuta:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Sustituye `<DATADOG_API_KEY>` por tu [clave de API Datadog][1].

3. **Configurar `datadog-agent.yaml`**

   Crea un archivo, `datadog-agent.yaml`, que contenga:
   ```yaml
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
   ```
   - Sustituye `<CLUSTER_NAME>` por un nombre para tu clúster.
   - Sustituye `<DATADOG_SITE>` por tu [sitio de Datadog][2]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el SITIO correcto a la derecha).

4. **Despliega el Agent con el archivo de configuración anterior**

   Ejecuta:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requires <a href="https://helm.sh">Helm</a>.</div>

2. **Add the Datadog Helm repository**

   Run:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Replace `<DATADOG_API_KEY>` with your [Datadog API key][1].

3. **Configure `datadog-values.yaml`**

   Create a file, `datadog-values.yaml`, that contains:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```

   - Replace `<CLUSTER_NAME>` with a name for your cluster.
   - Replace `<DATADOG_SITE>` with your [Datadog site][2]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).

4. **Deploy Agent with the above configuration file**

   Run:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirm Agent installation**

   Verify that Agent pods (tagged with `app.kubernetes.io/component:agent`) appear on the [Containers][13] page in Datadog. Agent pods are detected within a few minutes of deployment.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> allows you to scope hosts and Cluster Checks. This unique name must be dot-separated tokens and abide by the following restrictions:
<ul>
  <li/>Must only contain lowercase letters, numbers, and hyphens
  <li/>Must start with a letter
  <li/>Must end with a number or a letter
  <li/>Must be less than or equal to 80 characters
</ul>
</div>

### Unprivileged installation

To run an unprivileged installation, add the following `securityContext` to your configuration relative to your desired `<USER_ID>` and `<GROUP ID>`:

- Replace `<USER_ID>` with the UID to run the Datadog Agent. Datadog recommends setting this value to `100` for the preexisting `dd-agent` user [for Datadog Agent v7.48+][26].
- Replace `<GROUP_ID>` with the group ID that owns the Docker or containerd socket.

This sets the `securityContext` at the pod level for the Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
To run an unprivileged installation, add the following to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=14-19" >}}
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

  override:
    nodeAgent:
      securityContext:
        runAsUser:  <USER_ID>
        supplementalGroups:
          - <GROUP_ID>
{{< /highlight >}}

Then, deploy the Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
To run an unprivileged installation, add the following to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=5-8" >}}
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  securityContext:
    runAsUser: <USER_ID>
    supplementalGroups:
      - <GROUP_ID>
{{< /highlight >}}

Then, deploy the Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Container registries

Datadog publishes container images to Google Artifact Registry, Amazon ECR, Azure ACR, and Docker Hub:

| Google Artifact Registry | Amazon ECR             | Azure ACR            | Docker Hub        |
| ------------------------ | ---------------------- | -------------------- | ----------------- |
| gcr.io/datadoghq         | public.ecr.aws/datadog | datadoghq.azurecr.io | docker.io/datadog |

By default, the Agent image is pulled from Google Artifact Registry (`gcr.io/datadoghq`). If Artifact Registry is not accessible in your deployment region, use another registry.

If you are deploying the Agent in an AWS environment, Datadog recommend that you use Amazon ECR.

<div class="alert alert-danger">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from Google Artifact Registry or Amazon ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

To use a different container registry, modify `global.registry` in `datadog-agent.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=8">}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    registry: public.ecr.aws/datadog
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
{{< /highlight >}}

{{% /tab %}}
{{% tab "Helm" %}}

To use a different container registry, modify `registry` in `datadog-values.yaml`.

For example, to use Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

For more information, see [Changing your container registry][17].

### Uninstall

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

This command deletes all Kubernetes resources created by installing Datadog Operator and deploying the Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}
```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Siguientes pasos

### Monitoriza tu infraestructura en Datadog
Utiliza la página [Contenedores][13] para obtener visibilidad de tu infraestructura de contenedor, con métricas de recurso y búsqueda por facetas. Para obtener más información sobre cómo utilizar la página de Contenedores, consulta [Vista de contenedores][14].

Utiliza la página [Imágenes de contenedor][18] para obtener información sobre cada imagen utilizada en tu entorno. Esta página también muestra las vulnerabilidades encontradas en tus imágenes de contenedor desde [Cloud Security][19]. Para obtener información sobre cómo utilizar la página Imágenes de contenedor, consulta la [Vista de imágenes de contenedor][20].

La sección [Kubernetes][21] ofrece una visión general de todos tus recursos de Kubernetes. El [Orchestrator Explorer][22] te permite monitorizar el estado de los pods, despliegues y otros conceptos de Kubernetes en un espacio de nombres o zona de disponibilidad específica, ver especificaciones de recursos para pods fallidos dentro de un despliegue, correlacionar la actividad de nodos con logs relacionados, y mucho más. La página [Utilización de recursos][23] proporciona información sobre cómo las cargas de trabajo de Kubernetes utilizan los recursos informáticos en tu infraestructura. Para obtener información sobre cómo utilizar estas páginas, consulta [Orchestrator Explorer][24] y [Utilización de recursos de Kubernetes][25].

### Activar funciones

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM para Kubernetes</u>: Configura la recopilación de trazas (traces) para tu aplicación Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recopilación de logs en Kubernetes</u>: Configura la recopilación de logs en un entorno Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: Recopila tus métricas de Prometheus y OpenMetrics expuestas desde tu aplicación que se ejecuta en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Monitorización del plano de control</u>: Monitoriza el servidor API, el gestor del controlador, el programador y etcd de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuración adicional</u>: Recopila eventos, sobrescribe parámetros de proxy, envía métricas personalizadas con DogStatsD, configura listas de autorizaciones y exclusiones de contenedores, y haz referencia a la lista completa de variables de entorno disponibles.{{< /nextlink >}}
{{< /whatsnext >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/distributions
[2]: /es/agent/kubernetes/control_plane
[3]: /es/infrastructure/livecontainers/configuration/
[4]: /es/agent/kubernetes/configuration/
[5]: /es/agent/kubernetes/integrations/
[6]: /es/agent/kubernetes/apm/
[7]: /es/agent/kubernetes/log/
[8]: /es/containers/cluster_agent/#minimum-agent-and-cluster-agent-versions
[9]: /es/containers/datadog_operator
[10]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[11]: https://helm.sh
[12]: /es/containers/guide/kubernetes_daemonset/
[13]: https://app.datadoghq.com/containers
[14]: /es/infrastructure/containers
[15]: /es/containers/kubernetes/apm
[16]: https://app.datadoghq.com/account/settings/agent/latest?platform=kubernetes
[17]: /es/containers/guide/changing_container_registry/
[18]: https://app.datadoghq.com/containers/images
[19]: /es/security/cloud_security_management
[20]: /es/infrastructure/containers/container_images
[21]: https://app.datadoghq.com/kubernetes
[22]: https://app.datadoghq.com/orchestration/overview
[23]: https://app.datadoghq.com/orchestration/resource/pod
[24]: /es/infrastructure/containers/orchestrator_explorer
[25]: /es/infrastructure/containers/kubernetes_resource_utilization
[26]: /es/data_security/kubernetes/#running-container-as-root-user