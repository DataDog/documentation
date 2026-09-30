---
aliases:
- /es/agent/kubernetes/daemonset_setup
- /es/agent/kubernetes/helm
- /es/agent/kubernetes/installation
description: Instale y configure el Datadog Agent en Kubernetes utilizando Datadog
  Operator, Helm o kubectl
further_reading:
- link: /agent/kubernetes/configuration
  tag: Documentación
  text: Configure aún más el Datadog Agent en Kubernetes
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: Código fuente
  text: Datadog Helm chart – Todas las opciones de configuración
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: Código fuente
  text: Actualizando Datadog Helm
title: Instale el Datadog Agent en Kubernetes
---
## Resumen {#overview}

Esta página proporciona instrucciones sobre cómo instalar el Agente de Datadog en un entorno de Kubernetes.

Para documentación y ejemplos dedicados para las principales distribuciones de Kubernetes, incluyendo AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine para Kubernetes (OKE), consulte [distribuciones de Kubernetes][1].

Para documentación y ejemplos dedicados para monitorear el plano de control de Kubernetes, consulte [monitoreo del plano de control de Kubernetes][2].

### Versiones mínimas de Kubernetes y del Agente de Datadog {#minimum-kubernetes-and-datadog-agent-versions}

Algunas características relacionadas con versiones posteriores de Kubernetes requieren una versión mínima del Agente de Datadog.

| Versión de Kubernetes | Versión del Datadog Agent | Versión del Cluster Agent | Razón |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| 1.16.0+ | 7.19.0+ | 1.9.0+ | Deprecación de métricas de Kubelet |
| 1.21.0+ | 7.36.0+ | 1.20.0+ | Deprecación de recursos de Kubernetes |
| 1.22.0+ | 7.37.0+ | 7.37.0+ | Soporta tokens de cuenta de servicio dinámicos |
| 1.25.0+ | 7.40.0+ | 7.40.0+ | Soporta el grupo de API `v1` |
| 1.33.0+ | 7.67.0+ | 7.67.0+ | Corrige incompatibilidades con Kubernetes `AllocatedResources` en `/pods` salida |

Para una compatibilidad óptima, Datadog recomienda mantener sus Cluster Agent y Agent en versiones coincidentes.

## Instalación {#installation}

Utilice la página de [Instalación en Kubernetes][16] en Datadog para guiarlo a través del proceso de instalación.

1. **Seleccione el método de instalación**

   Elija uno de los siguientes métodos de instalación:

   - Datadog Operator (recomendado): un operator de Kubernetes que puede usar para implementar el Datadog Agent en Kubernetes y OpenShift. Informa sobre el estado de despliegue, la salud y los errores en su estado de Custom Resource, y limita el riesgo de mala configuración gracias a opciones de configuración de nivel superior.
   - [Helm][11]
   - Instalación manual. Consulte [Instalar y configurar manualmente el Datadog Agent con un DaemonSet][12]
  
<div class="alert alert-info">Si planea implementar APM con <a href="/containers/kubernetes/apm">Instrumentación de Un Solo Paso (SSI)</a> en su entorno de Kubernetes, instale el Datadog Agent en su propio espacio de nombres. SSI no instrumenta pods en el mismo espacio de nombres que el Datadog Agent.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info">Requiere <a href="https://helm.sh">Helm</a> y el <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">CLI de kubectl</a>.</div>

2. **Instale el Datadog Operator**

   Para instalar el Datadog Operator en su espacio de nombres actual, ejecute:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][1].

3. **Configure `datadog-agent.yaml`**

   Cree un archivo, `datadog-agent.yaml`, que contenga:
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
   - Reemplace `<CLUSTER_NAME>` con un nombre para su clúster. 
   - Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][2]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITIO correcto esté seleccionado a la derecha).

4. **Despliegue el Datadog Agent con el archivo de configuración anterior**

   Ejecute:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requiere <a href="https://helm.sh">Helm</a>.</div>

2. **Agregue el repositorio de Helm de Datadog**

   Ejecute:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Reemplace `<DATADOG_API_KEY>` con su [clave de API de Datadog][1].

3. **Configure `datadog-values.yaml`**

   Cree un archivo, `datadog-values.yaml`, que contenga:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   - Reemplace `<CLUSTER_NAME>` con un nombre para su clúster.
   - Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][2]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el SITIO correcto esté seleccionado a la derecha).

4. **Despliegue el Datadog Agent con el archivo de configuración anterior**

   Ejecute:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Para Windows, agregue <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirme la instalación del Datadog Agent**

   Verifique que los pods del Datadog Agent (etiquetados con `app.kubernetes.io/component:agent`) aparezcan en la página de [Containers][13] en Datadog. Los pods del Datadog Agent se detectan en pocos minutos después del despliegue.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> Le permite definir el contexto de los hosts y de Cluster Checks. Este nombre único debe estar compuesto por tokens separados por puntos y cumplir con las siguientes restricciones:
<ul>
  <li/>Debe contener solo letras minúsculas, números y guiones
  <li/>Debe comenzar con una letra
  <li/>Debe terminar con un número o una letra
  <li/>Debe tener 80 caracteres o menos
</ul>
</div>

### Instalación no privilegiada {#unprivileged-installation}

Para ejecutar una instalación no privilegiada, agregue lo siguiente `securityContext` a su configuración en relación con su `<USER_ID>` y `<GROUP ID>` deseados:

- Reemplace `<USER_ID>` con el UID para ejecutar el Datadog Agent. Datadog recomienda establecer este valor en `100` para el usuario `dd-agent` preexistente [para Datadog Agent v7.48+][26].
- Reemplace `<GROUP_ID>` con el ID de grupo que posee el socket de Docker o containerd.

Esto establece el `securityContext` a nivel de pod para el Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para ejecutar una instalación no privilegiada, agregue lo siguiente a `datadog-agent.yaml`:

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

Luego, despliegue el Datadog Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Para ejecutar una instalación no privilegiada, agregue lo siguiente a su archivo `datadog-values.yaml`:

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

Luego, despliegue el Datadog Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Registros de contenedores {#container-registries}

Datadog publica imágenes de contenedor en el Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR y Docker Hub:

{{% container-images-table %}}

Por defecto, el Datadog Agent Helm chart determina el registro de imágenes del Datadog Agent a partir de su sitio de Datadog, tipo de clúster y `registryMigrationMode`. Dependiendo de estos valores y exclusiones de entorno, las imágenes del Datadog Agent pueden ser extraídas del Datadog Container Registry (`registry.datadoghq.com`) o de un registro específico del sitio. El Datadog Operator chart se incluye como dependencia del Datadog Agent Helm chart por defecto. A partir de la versión 2.19.0 del Datadog Operator chart, cuando instale el Operator a través de esa dependencia, el `registryMigrationMode` del Datadog Agent Helm chart se aplica a las imágenes del Datadog Agent gestionadas por el Operator. El Datadog Operator chart en sí no define `registryMigrationMode`; la imagen del pod del Operator se controla por separado mediante el valor `image.repository` del Datadog Operator chart.

<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de extracción de contenedor. Si no es cliente de Docker Hub, Datadog recomienda que actualice la configuración de su Datadog Agent y de Cluster Agent para extraer de otro registro. Para instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambiar tu registro de contenedores</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

A partir de la versión 2.19.0 del chart del Datadog Operator, cuando el Datadog Operator se instala a través de la dependencia del Helm chart del Datadog Agent, el `registryMigrationMode` del Helm chart del Datadog Agent puede usar `registry.datadoghq.com` para las imágenes del Datadog Agent gestionadas por el Datadog Operator. Las versiones anteriores extraían imágenes del Datadog Agent de registros específicos del sitio (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` o `datadoghq.azurecr.io`). Para seguir utilizando los registros específicos del sitio anteriores para las imágenes del Datadog Agent en esta ruta de implementación, establece `registryMigrationMode: ""` en tu Helm chart del Datadog Agent `values.yaml`. Esta configuración no tiene efecto cuando se establece explícitamente un registro, y no es una configuración en el Helm chart independiente del Datadog Operator. Para usar un registro diferente para la imagen del pod del Datadog Operator, establece `image.repository` en tu Helm chart del Datadog Operator `values.yaml`.

Para usar un registro de contenedores diferente, modifica `global.registry` en `datadog-agent.yaml`.

Por ejemplo, para usar Amazon ECR:

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

Para usar un registro de contenedores diferente, modifica `registry` en `datadog-values.yaml`.

Por ejemplo, para usar Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

Para más información, consulta [Cambiando tu registro de contenedores][17].

### Desinstalar {#uninstall}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

Este comando elimina todos los recursos de Kubernetes creados al instalar Datadog Operator y desplegar Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}

```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Próximos pasos {#next-steps}

### Monitorea tu infraestructura en Datadog {#monitor-your-infrastructure-in-datadog}
Utiliza la página de [Contenedores][13] para tener visibilidad de tu infraestructura de contenedores, con métricas de recursos y búsqueda por facetas. Para obtener información sobre cómo usar la página de [Containers], consulta [Containers View][14].

Utiliza la página de [Container Images][18] para obtener información sobre cada imagen utilizada en tu entorno. Esta página también muestra las vulnerabilidades encontradas en las imágenes de contenedor de [Cloud Security][19]. Para obtener información sobre cómo usar la página de [Container Images], consulta [Container Images View][20].

La sección de [Kubernetes][21] presenta una visión general de todos tus recursos de Kubernetes. [Orchestrator Explorer][22] te permite monitorear el estado de los pods, despliegues y otros conceptos de Kubernetes en un espacio de nombres o zona de disponibilidad específica, ver las especificaciones de recursos para los pods fallidos dentro de un despliegue, correlacionar la actividad de los nodos con los registros relacionados, y más. La página de [Resource Utilization][23] proporciona información sobre cómo tus cargas de trabajo de Kubernetes utilizan tus recursos de cómputo en toda tu infraestructura. Para obtener información sobre cómo usar estas páginas, consulta [Orchestrator Explorer][24] y [Kubernetes Resource Utilization][25].

### Habilitar funciones {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM para Kubernetes</u>: Configura y ajusta la recolección de trazas para tu aplicación en Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recolección de registros en Kubernetes</u>: Configura la recolección de registros en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: Recoge tus métricas expuestas de Prometheus y OpenMetrics de tu aplicación que se ejecuta dentro de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Control plane monitoring</u>: Monitorea el servidor API de Kubernetes, el controller manager, el scheduler y etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Further Configuration</u>: Recoge eventos, sobrescribe la configuración del proxy, envía métricas personalizadas con DogStatsD, configura las listas de permitidos y bloqueados de contenedores, y consulta la lista completa de variables de entorno disponibles.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/kubernetes/distributions
[2]: /es/agent/kubernetes/control_plane
[3]: /es/infrastructure/livecontainers/configuration/
[4]: /es/agent/kubernetes/configuration/
[5]: /es/agent/kubernetes/integrations/
[6]: /es/agent/kubernetes/apm/
[7]: /es/agent/kubernetes/log/
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