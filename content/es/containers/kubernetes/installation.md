---
aliases:
- /es/agent/kubernetes/daemonset_setup
- /es/agent/kubernetes/helm
- /es/agent/kubernetes/installation
description: Instale y configure el Agente de Datadog en Kubernetes utilizando el
  Operador de Datadog, Helm o kubectl
further_reading:
- link: /agent/kubernetes/configuration
  tag: Documentación
  text: Configure aún más el Agente de Datadog en Kubernetes
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#all-configuration-options
  tag: Código fuente
  text: Helm chart de Datadog - Todas las opciones de configuración
- link: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md#upgrading
  tag: Código fuente
  text: Actualizando Helm de Datadog
title: Instale el Agente de Datadog en Kubernetes
---
## Descripción general {#overview}

Esta página proporciona instrucciones sobre cómo instalar el Agente de Datadog en un entorno de Kubernetes.

Para documentación y ejemplos dedicados para las principales distribuciones de Kubernetes, incluyendo AWS Elastic Kubernetes Service (EKS), Azure Kubernetes Service (AKS), Google Kubernetes Engine (GKE), Red Hat OpenShift, Rancher y Oracle Container Engine para Kubernetes (OKE), consulte [distribuciones de Kubernetes][1].

Para documentación y ejemplos dedicados para monitorear el plano de control de Kubernetes, consulte [monitoreo del plano de control de Kubernetes][2].

### Versiones mínimas de Kubernetes y del Agente de Datadog {#minimum-kubernetes-and-datadog-agent-versions}

Algunas características relacionadas con versiones posteriores de Kubernetes requieren una versión mínima del Agente de Datadog.

| Versión de Kubernetes | Versión del Agente | Versión del Agente del Clúster | Razón |
| ------------------ | ------------- | --------------------- | ------------------------------------------------------------------------------ |
| 1.16.0+ | 7.19.0+ | 1.9.0+ | Deprecación de métricas de Kubelet |
| 1.21.0+ | 7.36.0+ | 1.20.0+ | Deprecación de recursos de Kubernetes |
| 1.22.0+ | 7.37.0+ | 7.37.0+ | Soporta tokens de cuenta de servicio dinámicos |
| 1.25.0+ | 7.40.0+ | 7.40.0+ | Soporta el grupo de API `v1` |
| 1.33.0+ | 7.67.0+ | 7.67.0+ | Corrige incompatibilidades con Kubernetes `AllocatedResources` en `/pods` salida |

Para una compatibilidad óptima, Datadog recomienda mantener su Cluster Agent y Datadog Agent en versiones coincidentes.

## Instalación {#installation}

Utiliza la página de [Instalación en Kubernetes][16] en Datadog para guiarte a través del proceso de instalación.

1. **Selecciona el método de instalación**

   Elige uno de los siguientes métodos de instalación:

   - [Datadog Operator][9] (recomendado): un [operator][10] de Kubernetes que puedes usar para desplegar el Agente de Datadog en Kubernetes y OpenShift. Informa el estado de despliegue, salud y errores en su estado de Recurso Personalizado, y limita el riesgo de mala configuración gracias a opciones de configuración de nivel superior.
   - [Helm][11]
   - Instalación manual. Consulta [Instalar y configurar manualmente el Agente de Datadog con un DaemonSet][12]
  
<div class="alert alert-info">Si planeas implementar APM con <a href="/containers/kubernetes/apm">Instrumentación de Un Solo Paso (SSI)</a> en tu entorno de Kubernetes, instala el Agente de Datadog en su propio espacio de nombres. SSI no instrumenta pods en el mismo espacio de nombres que el Agente de Datadog.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}
<div class="alert alert-info">Requiere <a href="https://helm.sh">Helm</a> y la <a href="https://kubernetes.io/docs/tasks/tools/#kubectl">CLI de kubectl</a>.</div>

2. **Instala el Datadog Operator**

   Para instalar el Datadog Operator en tu espacio de nombres actual, ejecuta:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install datadog-operator datadog/datadog-operator
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
   - Reemplaza `<DATADOG_API_KEY>` con tu [clave de API de Datadog][1].

3. **Configura `datadog-agent.yaml`**

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
   - Reemplaza `<CLUSTER_NAME>` con un nombre para tu clúster. 
   - Reemplaza `<DATADOG_SITE>` con tu [sitio de Datadog][2]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de que el SITIO correcto esté seleccionado a la derecha).

4. **Despliega el Datadog Agent con el archivo de configuración anterior**

   Ejecutar:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}
<div class="alert alert-info">Requiere <a href="https://helm.sh">Helm</a>.</div>

2. **Agregar el repositorio de Helm de Datadog**

   Ejecutar:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```

   - Reemplaza `<DATADOG_API_KEY>` con tu [clave de API de Datadog][1].

3. **Configura `datadog-values.yaml`**

   Crea un archivo, `datadog-values.yaml`, que contenga:
   ```yaml
   datadog:
    apiKeyExistingSecret: datadog-secret
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
   ```
   
   - Reemplaza `<CLUSTER_NAME>` con un nombre para tu clúster.
   - Reemplaza `<DATADOG_SITE>` con tu [sitio de Datadog][2]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de que el SITIO correcto esté seleccionado a la derecha).

4. **Desplegar Agente con el archivo de configuración anterior**

   Ejecutar:

   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```

   <div class="alert alert-info">
   Para Windows, añade <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
   </div>

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/site

{{% /tab %}}
{{< /tabs >}}

5. **Confirma la instalación del Datadog Agent**

   Verifica que los pods del Datadog Agent (etiquetados con `app.kubernetes.io/component:agent`) aparezcan en la página de [Containers][13] en Datadog. Se detectan los pods del Datadog Agent pocos minutos después del despliegue.

<div class="alert alert-info">

<code>&lt;CLUSTER_NAME&gt;</code> te permite definir el contexto de los hosts y de los Cluster Checks. Este nombre único debe estar compuesto por elementos separados por puntos y cumplir con las siguientes restricciones:
<ul>
  <li/>Solo debe contener letras minúsculas, números y guiones
  <li/>Debe comenzar con una letra
  <li/>Debe terminar con un número o una letra
  <li/>Debe tener 80 caracteres o menos
</ul>
</div>

### Instalación sin privilegios {#unprivileged-installation}

Para ejecutar una instalación sin privilegios, agregue lo siguiente `securityContext` a la configuración de su `<USER_ID>` y `<GROUP ID>` deseados:

- Reemplace `<USER_ID>` con el UID para ejecutar el Datadog Agent. Datadog recomienda establecer este valor en `100` para el usuario `dd-agent` preexistente [para Datadog Agent v7.48+][26].
- Reemplace `<GROUP_ID>` con el ID de grupo que posee el socket de Docker o containerd.

Esto establece el `securityContext` a nivel de pod para el Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Para ejecutar una instalación sin privilegios, agregue lo siguiente a `datadog-agent.yaml`:

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

Luego, despliega el Datadog Agent:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Para ejecutar una instalación sin privilegios, agregue lo siguiente a su archivo `datadog-values.yaml`:

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

Luego, despliega el Datadog Agent:

```shell
helm install datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

### Registros de contenedores {#container-registries}

Datadog publica imágenes de contenedores en el Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR y Docker Hub:

{{% container-images-table %}}

Por defecto, el Helm chart extrae imágenes de Google Artifact Registry (`gcr.io/datadoghq`). El Datadog Operator chart está migrando progresivamente al Datadog Container Registry (`registry.datadoghq.com`).

<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de extracción de imágenes. Si no es cliente de Docker Hub, Datadog recomienda que actualice la configuración del Datadog Agent y del Cluster Agent para extraer de otro registro. Para instrucciones, consulte <a href="/agent/guide/changing_container_registry">Cambiando su registro de contenedores</a>.</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Datadog Operator chart está migrando a `registry.datadoghq.com` tanto para la imagen del operador como para las imágenes del Datadog Agent que gestiona. Anteriormente, las imágenes del Datadog Agent se extraían de registros específicos del sitio (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` o `datadoghq.azurecr.io`). Para seguir utilizando los registros específicos del sitio anteriores, establezca `registryMigrationMode: ""` en su Helm chart del Datadog Operator`values.yaml`.

Para usar un registro de contenedores diferente, modifique `global.registry` en `datadog-agent.yaml`.

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

Para usar un registro de contenedores diferente, modifique `registry` en `datadog-values.yaml`.

Por ejemplo, para usar Amazon ECR:

{{< highlight yaml "hl_lines=1">}}
registry: public.ecr.aws/datadog
datadog:
  apiKeyExistingSecret: datadog-secret
  site: <DATADOG_SITE>
{{< /highlight >}}

{{% /tab %}}
{{< /tabs >}}

Para más información, consulta [Cambiando su registro de contenedores][17].

### Desinstalar {#uninstall}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```shell
kubectl delete datadogagent datadog
helm delete datadog-operator
```

Este comando elimina todos los recursos de Kubernetes creados al instalar el Datadog Operator y desplegar el Datadog Agent.
{{% /tab %}}
{{% tab "Helm" %}}

```shell
helm uninstall datadog-agent
```
{{% /tab %}}
{{< /tabs >}}

## Próximos pasos {#next-steps}

### Monitorea tu infraestructura en Datadog {#monitor-your-infrastructure-in-datadog}
Utiliza la página de [Containers][13] para tener visibilidad de tu infraestructura de contenedores, con métricas de recursos y búsqueda facetada. Para información sobre cómo usar la página de Containers, consulta [Visualización de Containers][14].

Utiliza la página de [Container Images][18] para obtener información sobre cada imagen utilizada en tu entorno. Esta página también muestra vulnerabilidades encontradas en tus imágenes de contenedores desde [Cloud Security][19]. Para información sobre cómo usar la página de Container Images, consulta la [Visualización de Container Images][20].

La sección de [Kubernetes][21] presenta un resumen de todos tus recursos de Kubernetes. [Explorador de Orquestador][22] te permite monitorear el estado de los pods, despliegues y otros conceptos de Kubernetes en un espacio de nombres o zona de disponibilidad específica, ver especificaciones de recursos para pods fallidos dentro de un despliegue, correlacionar la actividad de nodos con registros relacionados, y más. La página de [Utilización de Recursos][23] proporciona información sobre cómo tus cargas de trabajo de Kubernetes están utilizando tus recursos de computación a través de tu infraestructura. Para información sobre cómo usar estas páginas, consulta [Explorador de Orquestador][24] y [Utilización de Recursos de Kubernetes][25].

### Habilitar características {#enable-features}

{{< whatsnext >}}
  {{< nextlink href="/containers/kubernetes/apm">}}<u>APM para Kubernetes</u>: Configura y ajusta la recolección de trazas para tu aplicación de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/log">}}<u>Recolección de registros en Kubernetes</u>: Configura la recolección de registros en un entorno de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/prometheus">}}<u>Prometheus y OpenMetrics</u>: Recopila tus métricas expuestas de Prometheus y OpenMetrics de tu aplicación que se ejecuta dentro de Kubernetes.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/control_plane">}}<u>Monitoreo del plano de control</u>: Monitorea el servidor API de Kubernetes, el controller manager, el scheduler y etcd.{{< /nextlink >}}
  {{< nextlink href="/agent/kubernetes/configuration">}}<u>Configuración Adicional</u>: Recopila eventos, anula las configuraciones de proxy, envía métricas personalizadas con DogStatsD, configura las listas de contenedores permitidas y bloqueadas, y consulta la lista completa de variables de entorno disponibles.{{< /nextlink >}}
{{< /whatsnext >}}

## Lectura Adicional {#further-reading}

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