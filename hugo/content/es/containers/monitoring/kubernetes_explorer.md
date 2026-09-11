---
aliases:
- /es/infrastructure/containers/orchestrator_explorer
description: Uso de la página Kubernetes Explorer de Datadog para hacer un seguimiento
  de sus recursos de Kubernetes, como pods y despliegues.
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Haga un seguimiento de sus operadores de Kubernetes para mantener las aplicaciones
    funcionando sin problemas
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centro de aprendizaje
  text: Introducción a la observabilidad de Kubernetes
title: Kubernetes Explorer
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Explorer, mostrando pods de Kubernetes." style="width:80%;">}}

El [Kubernetes Explorer][1] de Datadog le permite hacer un seguimiento del estado de los pods, despliegues y otros recursos de Kubernetes. También puede visualizar las especificaciones de recursos para pods con errores dentro de un despliegue, correlacionar la actividad de los nodos con los registros relacionados, hacer un seguimiento de la utilización de recursos, escalar cargas de trabajo automáticamente y solucionar errores.

<div class="alert alert-info">Al usar el Datadog Agent, Kubernetes Explorer requiere el Agent 7.27.0+ y el Clúster Agent 1.11.0+. Si está utilizando Kubernetes 1.25+, entonces se requiere el Clúster Agent 7.40.0+.</div>


## Configuración {#configuration}

### Habilitar Kubernetes Explorer {#enable-kubernetes-explorer}

Kubernetes Explorer está **habilitado de forma predeterminada** para la mayoría de las instalaciones del Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Cuando instala el Datadog Agent mediante el Datadog Operator, Kubernetes Explorer se habilita de forma predeterminada.

Para verificar que Kubernetes Explorer esté habilitado, asegúrese de que el parámetro `features.orchestratorExplorer.enabled` esté configurado en `true` en su `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

Cuando instala el Datadog Agent mediante el [official Helm chart][1], Kubernetes Explorer se habilita de forma predeterminada.

Para verificar que Kubernetes Explorer esté habilitado, asegúrese de que el parámetro `orchestratorExplorer.enabled` esté configurado en `true` en su archivo `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Luego, actualice su Helm chart.

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "Manual" %}}
Para la configuración manual, consulte [Set up Kubernetes Explorer with a DaemonSet][1].

[1]: /es/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Puede completar el explorador de Kubernetes utilizando una canalización nativa de OpenTelemetry en lugar del Datadog Agent. Esta configuración utiliza el receptor [`k8sobjects`][1] para recopilar datos de recursos de Kubernetes y los reenvía a través de la funcionalidad de explorador de orquestadores del [Datadog Exporter][2].

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Esta función no está disponible para {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

#### Requisitos previos {#prerequisites}

- OpenTelemetry Collector Contrib [v0.154.0][3] o posterior.
- OpenTelemetry Collector [Helm chart][4] v0.156.2 o posterior.

#### Limitaciones {#limitations}

El receptor de fuente abierta `k8sobjects` puede generar una carga significativa en el servidor de API de Kubernetes de un clúster.

Recomendaciones:

- Utilice Kubernetes 1.33 o posterior, que incluye [mejoras de lista][5] que reducen el impacto en el servidor de API.
- Comience con clústeres más pequeños. Limite la cantidad de objetos por tipo de recurso a menos de 5,000 como punto de partida y escale gradualmente mientras monitorea el estado del clúster.

Los siguientes pasos describen los componentes necesarios para Kubernetes Explorer. Para obtener un ejemplo de referencia completo que también recopile métricas de infraestructura de Kubernetes, consulte [Métricas de Kubernetes][6].

#### 1. Cree un secreto de clave de Datadog API {#1-create-a-datadog-api-key-secret}

Cree un secreto de Kubernetes para almacenar su clave de Datadog API:

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. Configure el recopilador del clúster {#2-configure-the-cluster-collector}

Esta configuración implementa el recopilador de OTel como un Deployment de Kubernetes. Cree un archivo `deployment-collector.yaml` con los siguientes bloques de configuración, o combínelos en su archivo de valores de OpenTelemetry Collector existente.

##### Imagen y modo del recopilador {#collector-image-and-mode}

Configure el recopilador para que se ejecute como un Deployment de una sola réplica utilizando la distribución Contrib:

```yaml
mode: deployment
replicaCount: 1

image:
  repository: otel/opentelemetry-collector-contrib
  tag: 0.154.0
  pullPolicy: IfNotPresent

extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: api-key
```

##### Colección de objetos de Kubernetes {#kubernetes-objects-collection}

El `kubernetesObjects` [preset][4] aprovisiona automáticamente la cuenta de servicio, los permisos RBAC y los valores predeterminados del receptor `k8sobjects` necesarios para completar Kubernetes Explorer. Anule el receptor `interval` a `3m`, lo cual es necesario para Kubernetes Explorer:

```yaml
presets:
  kubernetesObjects:
    enabled: true
    watch: true

config:
  receivers:
    k8sobjects:
      interval: 3m
```

##### Datadog Exporter {#datadog-exporter}

Habilite la opción `orchestrator_explorer` en el Datadog Exporter. Esta es la configuración que envía datos de objetos de Kubernetes a Kubernetes Explorer. Reemplace `<YOUR_DATADOG_SITE>` con su [sitio de Datadog][7]:

```yaml
config:
  exporters:
    datadog:
      api:
        site: <YOUR_DATADOG_SITE>
        key: ${env:DD_API_KEY}
      orchestrator_explorer:
        enabled: true
```

##### Procesadores y canalización {#processors-and-pipeline}

Agregue un procesador [`resourcedetection`][8] para detectar el UID y el nombre del clúster.

- El detector `k8s_api` es necesario para detectar el UID del clúster (`k8s.cluster.uid`).
- La detección del nombre del clúster depende de su proveedor de nube. Verifique la [documentación del procesador `resourcedetection`][8] para conocer los proveedores compatibles (EKS, AKS, GCP) y los permisos necesarios.
- Si su proveedor no es compatible, utilice un procesador `resource/add-cluster-name` para establecer el nombre del clúster manualmente. Reemplace `<YOUR_CLUSTER_NAME>` con el nombre de su clúster.

Luego, conecte los componentes en una canalización `logs`.

Los siguientes ejemplos muestran dos enfoques. Utilice el ejemplo del proveedor de nube si ejecuta en EKS, AKS o GCP. Utilice la alternativa manual si su proveedor no es compatible.

**Detección del proveedor de nube (ejemplo de EKS):**

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api, eks]
      override: false
      eks:
        resource_attributes:
          k8s.cluster.name:
            enabled: true

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection]
        exporters: [datadog]
```

Reemplace `eks` con el detector de su proveedor (`aks`, `gcp`). Consulte la [documentación del procesador `resourcedetection`][8] para obtener la configuración específica del proveedor.

**Alternativa manual:**

Si el procesador `resourcedetection` no es compatible con su proveedor de nube, establezca el nombre del clúster manualmente. Reemplace `<YOUR_CLUSTER_NAME>` con el nombre de su clúster:

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api]
      override: false
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: <YOUR_CLUSTER_NAME>
          action: upsert

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection, resource/add-cluster-name]
        exporters: [datadog]
```

#### 3. Implementar con Helm {#3-deploy-with-helm}

Instale el recopilador de OpenTelemetry usando su archivo de configuración:

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. Verifique la instalación {#4-verify-the-installation}

Abra el [Kubernetes Explorer][9] y filtre por el nombre de su clúster de OpenTelemetry. Todas las secciones de recursos principales de Kubernetes deberían llenarse, junto con **Custom Resources > CRD**. La sección **Custom Resources > Resources** no es compatible con esta configuración.

#### 5. Correlacione registros, métricas y trazas con Kubernetes Explorer (opcional) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

Para desplazarse entre los recursos de Kubernetes y sus registros, métricas y trazas relacionados, agregue los procesadores [`k8sattributes`][10] y [`resourcedetection`][8] a sus canalizaciones del recopilador existentes. Para la configuración de `resourcedetection`, consulte [Procesadores y canalización](#processors-and-pipeline) arriba.

```yaml
processors:
  k8sattributes:
    auth_type: "serviceAccount"
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.namespace.name
        - k8s.node.name
        - k8s.replicaset.name
        - k8s.statefulset.name
        - k8s.daemonset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.container.name
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection

service:
  pipelines:
    logs:
      processors: [k8sattributes, resourcedetection, ...]
    metrics:
      processors: [k8sattributes, resourcedetection, ...]
    traces:
      processors: [k8sattributes, resourcedetection, ...]
```

Para obtener un ejemplo de referencia completo, consulte la [configuración del recopilador DaemonSet][11].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[4]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: /es/opentelemetry/integrations/kubernetes_metrics/#setup
[7]: /es/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[9]: https://app.datadoghq.com/orchestration/overview
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[11]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml

{{% /tab %}}
{{% tab "OpenTelemetry Kube Stack" %}}

Puede completar Kubernetes Explorer utilizando el `opentelemetry-kube-stack` Helm chart en lugar del Datadog Agent.

El [`opentelemetry-kube-stack`][1] Helm chart instala el Operador de OpenTelemetry y gestiona los colectores como Custom Resources `OpenTelemetryCollector`. Datadog mantiene una referencia [`values.yaml`][2] que configura dos colectores:

- **`cluster`** (Deployment): Extrae métricas de kube-state-metrics, observa objetos de Kubernetes y permite que `orchestrator_explorer` complete Kubernetes Explorer.
- **`daemon`** (DaemonSet): Recopila métricas del servidor y del kubelet, y expone un punto de conexión OTLP para los datos de telemetría de la aplicación.

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Esta función no está disponible para {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

#### Requisitos previos {#prerequisites-1}

- Helm chart OpenTelemetry Kube Stack [0.20.1][3] o posterior.
- OpenTelemetry Collector Contrib [v0.154.0][4] o posterior (fijado por el archivo de valores de referencia).
- cert-manager, que es necesario para el webhook de admisión del operador.

#### Limitaciones {#limitations-1}

El receptor de fuente abierta `k8sobjects` puede generar una carga significativa en el servidor de API de Kubernetes de un clúster.

Recomendaciones:

- Utilice Kubernetes 1.33 o posterior, que incluye [mejoras de lista][5] que reducen el impacto en el servidor de API.
- Comience con clústeres más pequeños. Limite la cantidad de objetos por tipo de recurso a menos de 5,000 como punto de partida y escale gradualmente mientras monitorea el estado del clúster.

#### Inicio rápido (instalador interactivo) {#quickstart-interactive-installer}

El repositorio [`opentelemetry-examples`][6] incluye un instalador interactivo que gestiona todos los pasos a continuación. Desde `guides/kubernetes/configuration/opentelemetry-kube-stack/`:

```sh
./install
```

El instalador solicita su clave de Datadog API, [sitio de Datadog][7], plataforma de Kubernetes y entorno de implementación. Para EKS, GKE y AKS, habilita el ajuste preestablecido de detección de recursos correspondiente. Para otras plataformas, solicita el nombre del clúster. Luego crea el espacio de nombres `opentelemetry-operator-system` y `datadog-secret`, instala cert-manager si es necesario, e instala o actualiza el chart.

#### Instalar con archivos de valores {#install-with-values-files}

Si no utilizó el instalador interactivo anterior, siga los pasos a continuación para realizar la instalación manualmente.

##### 1. Instale cert-manager (si aún no está presente) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Cree el secreto de Datadog {#2-create-the-datadog-secret}

Establezca `DD_SITE` en su [sitio de Datadog][7] (el valor predeterminado es `datadoghq.com`):

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="datadoghq.com"  # for example us3.datadoghq.com, datadoghq.eu

kubectl create namespace opentelemetry-operator-system \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic datadog-secret \
  --namespace opentelemetry-operator-system \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE" \
  --dry-run=client -o yaml | kubectl apply -f -
```

##### 3. Cree una superposición de implementación {#3-create-a-deployment-overlay}

La referencia `values.yaml` es la base; la configuración específica de la implementación (plataforma de clúster, entorno, nombre del clúster) reside en un archivo de superposición. Desde `guides/kubernetes/configuration/opentelemetry-kube-stack/`, copie el ejemplo que coincida con su plataforma:

```sh
mkdir -p deployment

# EKS, GKE, or AKS (resource detector auto-populates k8s.cluster.name):
cp examples/eks-deployment/values.yaml deployment/values.yaml
cp examples/gcp-deployment/values.yaml deployment/values.yaml
cp examples/aks-deployment/values.yaml deployment/values.yaml

# Other platforms (set the cluster name manually):
cp examples/manually-set-k8s-cluster-name/values.yaml deployment/values.yaml
```

Para plataformas que no sean EKS/GKE/AKS, edite `deployment/values.yaml` y reemplace `my_k8s_cluster` y `production` con el nombre de su clúster y el entorno de implementación.

##### 4. Implemente los recolectores de referencia {#4-deploy-the-reference-collectors}

Instale o actualice el chart con la base `values.yaml` y su superposición:

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm upgrade --install opentelemetry-kube-stack \
  open-telemetry/opentelemetry-kube-stack \
  --namespace opentelemetry-operator-system \
  --values ./values.yaml \
  --values ./deployment/values.yaml
```

Ambos recolectores tienen límites predeterminados de `500m` de CPU y `1Gi` de memoria, y solicitudes de `200m` de CPU y `500Mi` de memoria. Aumente la escala para clústeres grandes.

#### Verifique la instalación {#verify-the-installation}

Abra el [Explorador de Kubernetes][8] y filtre por el nombre de su clúster. Todas las secciones de recursos principales de Kubernetes deberían llenarse, junto con **Custom Resources > CRD**. La sección **Custom Resources > Resources** no es compatible con esta configuración.

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[2]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/opentelemetry-kube-stack/values.yaml
[3]: https://github.com/open-telemetry/opentelemetry-helm-charts/releases/tag/opentelemetry-kube-stack-0.20.1
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack
[7]: /es/getting_started/site/
[8]: https://app.datadoghq.com/orchestration/overview

{{% /tab %}}
{{< /tabs >}}

### Agregue etiquetas personalizadas a los recursos {#add-custom-tags-to-resources}

Para facilitar el filtrado, puede agregar etiquetas personalizadas a sus recursos de Kubernetes a través de la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`. **Estas etiquetas solo aparecen en el Explorador de Kubernetes.**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Establezca la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **dos veces** en `datadog-agent.yaml`:
- En `agents.containers.processAgent.env`
- En `clusterAgent.env` 

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

Luego aplique la nueva configuración:

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Establezca la variable de entorno `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **dos veces** en `datadog-agent.yaml`:
- En `processAgent.env`
- En `clusterAgent.env` 

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

Luego, actualice su Helm chart.

{{% /tab %}}
{{% tab "DaemonSet" %}}

Establezca la variable de entorno tanto en los contenedores del Process Agent como del Cluster Agent:

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## Uso {#usage}

### Views {#views}

Alterne entre {{< ui >}}Pods{{< /ui >}}, {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Namespaces{{< /ui >}} y otros recursos de Kubernetes en el menú desplegable {{< ui >}}Select Resources{{< /ui >}} en la esquina superior izquierda de la página.

Cada una de estas vistas incluye una tabla de datos para ayudarle a organizar mejor sus datos por campo, como estado, nombre y etiquetas de Kubernetes, y un Mapa de clúster detallado para brindarle una visión más amplia de sus pods y clústeres de Kubernetes.

**Consulte [Detalles del filtro de consulta](#query-filter-details) para obtener más información sobre cómo filtrar estas vistas.**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer abierto para mostrar Workloads > Replica Sets, en modo Resumen" style="width:80%;">}}

#### Agrupar por funcionalidad y facetas {#group-by-functionality-and-facets}

Agrupe pods por etiquetas, etiquetas de Kubernetes o anotaciones de Kubernetes para obtener una visualización agregada que le permita encontrar información más rápidamente. Puede realizar una agrupación utilizando la barra "Agrupar por" en la parte superior derecha de la página o haciendo clic en una etiqueta en particular y localizando la función de agrupar por en el menú contextual, como se muestra a continuación.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="Un ejemplo de agrupación por equipo" style="width:80%;">}}

También puede usar facetas en el lado izquierdo de la página para agrupar recursos o filtrar los recursos que más le interesan, como los pods con un estado de pod CrashLoopBackOff.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="Un ejemplo de agrupación del estado de pod CrashLoopBackOff" video=true style="width:80%;">}}

### Mapa de clúster {#cluster-map}

Un mapa de clúster le brinda una visión más amplia de sus pods y clústeres de Kubernetes. Puede ver todos sus recursos juntos en una sola pantalla con grupos y filtros personalizados, y elegir qué métricas utilizar para rellenar el color de los nodos.

Examine los recursos desde los mapas de clúster haciendo clic en cualquier círculo o grupo para completar un panel detallado.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="Un mapa de clúster con grupos y filtros personalizados" video=true style="width:80%;">}}

### Panel de información {#information-panel}

Haga clic en cualquier fila de la tabla o en cualquier objeto de un mapa de clúster para ver información sobre un recurso específico en un panel lateral.

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="Una vista de los recursos en el panel lateral, abierta en procesos." style="width:80%;">}}

La pestaña {{< ui >}}YAML{{< /ui >}} del panel lateral muestra la definición completa del recurso. A partir de la **Agent version 7.44.0**, también incluye siete días de historial de definiciones. Puede comparar lo que cambió con el tiempo y entre diferentes versiones. La hora indicada es aproximadamente cuando se aplicaron los cambios al recurso.

Para evitar mostrar una gran cantidad de cambios irrelevantes, se ignoran las actualizaciones que afectan solo a los siguientes campos:

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations[\"kubernetes.io/config.seen\"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="Una vista de los recursos en el panel lateral, que muestra la función de historial de yaml" style="width:80%;">}}

Las otras pestañas muestran más información para la solución de problemas del recurso seleccionado:

* [**Registros**][2]: Visualice los registros de su contenedor o recurso. Haga clic en cualquier registro para visualizar registros relacionados en el Explorador de registros.
* [**APM**][3]: Visualice las trazas de su contenedor o recurso, incluyendo la fecha, el servicio, la duración, el método y el código de estado de una traza.
* [**Métricas**][4]: Visualice métricas en tiempo real para su contenedor o recurso. Puede ver cualquier gráfico en pantalla completa, compartir una instantánea del mismo o exportarlo desde esta pestaña.
* {{< ui >}}Processes{{< /ui >}}: Visualice todos los procesos que se ejecutan en el contenedor de este recurso.
* {{< ui >}}Network{{< /ui >}}: Visualice el rendimiento de red de un contenedor o recurso, incluyendo los campos de fuente, destino, volumen enviado y recibido, y rendimiento. Use el campo {{< ui >}}Destination{{< /ui >}} para buscar por etiquetas como `DNS` o `ip_type`, o use el filtro {{< ui >}}Group by{{< /ui >}} en esta vista para agrupar datos de red por etiquetas, como `pod_name` o `service`.
* [**Eventos**][5]: Visualice todos los eventos de Kubernetes para su recurso.
* {{< ui >}}Monitors{{< /ui >}}: Vea los monitores etiquetados, con alcance o agrupados para este recurso.

Para obtener un Dashboard detallado de este recurso, haga clic en Ver Dashboard en la esquina superior derecha de este panel.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="Un enlace a un pod Dashboard desde la visualización general de Containers en vivo." style="width:80%;">}}

### Utilización de recursos {#resource-utilization}

_Para la página de Utilización de recursos, consulte [Utilización de recursos][6]_.

Dentro de la pestaña Explorador de Kubernetes, puede explorar una selección de métricas de utilización de recursos.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="Utilización de recursos del contenedor" style="width:80%;">}}

Todas estas columnas admiten la ordenación, lo que le ayuda a identificar cargas de trabajo individuales según su utilización de recursos.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="Columnas ordenadas de utilización de recursos del contenedor" style="width:50%;">}}

## Detalles del filtro de consulta {#query-filter-details}

Puede restringir los recursos mostrados proporcionando una consulta dentro de la barra de búsqueda \"Filtrar por\" en la parte superior izquierda de la página.

### Sintaxis {#syntax}

Un filtro de consulta se compone de términos y operadores. Ejemplo:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Sintaxis del filtro de consulta del Explorador de orquestadores." style="width:80%;">}}

#### Términos {#terms}

Hay varios tipos de términos disponibles:

| Tipo | Ejemplos |
|---|---|
| **Etiquetas**: Adjuntas a los recursos por [el agente que los recopila][7]. También hay etiquetas adicionales que Datadog genera para los recursos de Kubernetes. | `datacenter:staging`, `tag#datacenter:staging`<br>_(el `tag#` es opcional)_ |
| **Etiquetas**: Extraídas de [los metadatos de un recurso][8]. Por lo general, se utilizan para organizar su clúster y seleccionar recursos específicos con selectores. | `label#chart_version:2.1.0` |
| **Anotaciones**: Extraídas de [los metadatos de un recurso][9]. Generalmente se utilizan para dar soporte a herramientas que ayudan en la gestión del clúster. | `annotation#checksum/configmap:a1bc23d4` |
| **Métricas**: Agregadas a los recursos de carga de trabajo (pods, despliegues, etc.). Puede encontrar recursos según su utilización. Para ver qué métricas son compatibles, consulte [Filtros de utilización de recursos](#resource-utilization-filters). | `metric#cpu_usage_pct_limits_avg15:>80%` |
| **Coincidencia de cadenas**: Admitida por algunos atributos de recursos específicos, consulte a continuación.<br>_Nota: la coincidencia de cadenas no utiliza el formato clave-valor y no puede especificar el atributo con el que realizar la coincidencia._ | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID),<br>`web-api-3` (Nombre) |
| **Campos**: Extraídos de los [metadatos de un recurso][10] o de los campos indexados de recursos personalizados. | `field#metadata.creationTimestamp:>=4wk`, `field#metadata.deletionTimestamp:<=1hr`, `field#status.currentReplicas:3`, `field#status.conditions.Active.status:True` |

>  ***Es posible que encuentre los mismos pares clave-valor tanto como etiqueta como label (o anotación)**; esto depende de cómo esté configurado su clúster.*

Los siguientes atributos de recursos son compatibles con la **coincidencia de cadenas** arbitraria:
- `metadata.name`
- `metadata.uid`
- Direcciones IP encontradas en:
  - Pods
  - Nodos (internos y externos)
  - Servicios (IP de clúster, externas y de balanceador de carga)

No necesita especificar una clave para buscar un recurso por nombre o IP. No se requieren comillas a menos que su búsqueda de cadena incluya ciertos caracteres especiales.

#### Comparadores {#comparators}

Todos los términos admiten el operador de igualdad `:`. Los términos de [valor de métrica](#resource-utilization-filters) también admiten comparaciones numéricas:

- `:>` Mayor que (por ejemplo, `metric#cpu_usage_avg15:>0.9`)
- `:>=` Mayor o igual que
- `:<` Menor que
- `:<=` Menor o igual que

#### Operadores {#operators}

Para combinar varios términos en una consulta compleja, puede usar cualquiera de los siguientes operadores booleanos que distinguen entre mayúsculas y minúsculas:

| Operador | Descripción | Ejemplo |
|---|---|---|
| `AND` | **Intersección**: Ambos términos están en los eventos seleccionados (si no se agrega nada, se toma AND de forma predeterminada) | `a AND b`   |
| `OR` | **Unión**: Cualquiera de los términos está contenido en los eventos seleccionados                                             | `a OR b`   |
| `NOT` / `-` | **Exclusión**: El siguiente término NO está en el evento (se aplica a cada búsqueda de texto sin formato individual) | `a AND NOT b` o<br>`a AND -b` |
|  `( )` | **Agrupación:** Especifique cómo agrupar términos lógicamente. | `a AND (b OR c)` o<br>`(a AND b) or c` |

##### `OR` abreviatura de valor {#or-value-shorthand}

Se pueden combinar varios términos que comparten la misma clave en un solo término si todos usan el operador `OR`. Por ejemplo, esta consulta:

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

Se puede reducir a:

```
app_name:(web-server OR database OR event-consumer)
```

### Comodines {#wildcards}

Puede usar `*` comodines como parte de un término para filtrar por coincidencias parciales, tanto para valores como para claves. Algunos ejemplos:

- `kube_job:stats-*`: Encuentre todos los recursos con una etiqueta `kube_deployment` cuyo valor comience con `stats-`.
- `pod_name:*canary`: Encuentre todos los recursos con una etiqueta `pod_name` cuyo valor termine en `canary`.
- `label#release:*`: Encuentre todos los recursos con una etiqueta `release`, independientemente de su valor.
- `-label#*.datadoghq.com/*`: Encuentre recursos que no tengan ninguna etiqueta con ámbito de Datadog.
- `kube_*:*stats*canary`: Encuentre recursos que tengan etiquetas de recursos relacionadas (`kube_*`), con `stats` en medio del valor, y que también terminen con `canary`.

### Etiquetas extraídas {#extracted-tags}

Además de las etiquetas que ha [configurado][7] en su agente de Datadog, Datadog inyecta etiquetas generadas basadas en atributos de recursos que pueden ayudarle con sus necesidades de búsqueda y agrupación. Estas etiquetas se añaden a los recursos de forma condicional, cuando son relevantes.

#### Todos los recursos {#all-resources}

Todos los recursos tienen la etiqueta `kube_cluster_name` y todos los recursos con espacio de nombres tienen la etiqueta `kube_namespace` añadida.

Además, los recursos contienen una etiqueta `kube_<api_kind>:<metadata.name>`. Por ejemplo, a un despliegue llamado `web-server-2` se le añadiría automáticamente la etiqueta `kube_deployment:web-server-2`.

> **Nota**: Existen algunas excepciones a este patrón:
>
> - Los pods utilizan `pod_name` en su lugar.
> - *VPA: `verticalpodautoscaler`*.
> - *HPA: `horizontalpodautoscaler`*.
> - *Reclamaciones de volúmenes persistentes: `persistentvolumeclaim`*.

Según las etiquetas adjuntas al recurso, también se extraerán las siguientes etiquetas:

| Etiqueta | Etiqueta fuente |
|---|---|
| `kube_app_name` | `app.kubernetes.io/name` |
| `kube_app_instance` | `app.kubernetes.io/instance` |
| `kube_app_version` | `app.kubernetes.io/version` |
| `kube_app_component` | `app.kubernetes.io/component` |
| `kube_app_part_of` | `app.kubernetes.io/part-of` |
| `kube_app_managed_by` | `app.kubernetes.io/managed-by` |
| `env` | `tags.datadoghq.com/env` |
| `version` | `tags.datadoghq.com/version` |
| `service` | `tags.datadoghq.com/service` |

#### Relaciones {#relationships}

Los recursos relacionados se etiquetarán entre sí. Algunos ejemplos:

- Un pod que forma parte del despliegue "XYZ" tendrá una etiqueta `kube_deployment:xyz`.
- Un ingress que apunta al servicio "A" tendrá una etiqueta `kube_service:a`.

Los recursos que se generan a partir de recursos "padre" tendrán las etiquetas `kube_ownerref_kind` y `kube_ownerref_name` (como pods y jobs).

> **Consejo:** Utilice la función de autocompletado de consultas de filtro para descubrir qué etiquetas de recursos relacionados están disponibles. Escriba `kube_` y vea qué resultados se sugieren.

#### Pods {#pods}

A los pods se les asignan las siguientes etiquetas:

- `pod_name`
- `pod_phase` (extraído del manifiesto)
- `pod_status` (calculado de forma similar a `kubectl`)

#### Cargas de trabajo {#workloads}

Los recursos de carga de trabajo (pods, despliegues, conjuntos con estado, etc.) tendrán las siguientes etiquetas, que indican su compatibilidad dentro de la página de Utilización de recursos:

- `resource_utilization` (`supported` o `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### Condiciones {#conditions}

Algunas condiciones, para algunos recursos, se extraen como etiquetas. Por ejemplo, puede encontrar la etiqueta `kube_condition_available` en los despliegues. El formato de etiqueta es siempre `kube_condition_<name>` con un valor de `true` o `false`.

> **Consejo**: utilice la función de autocompletar para descubrir qué condiciones están disponibles en un tipo de recurso determinado ingresando `kube_condition` y revisando los resultados.

#### Etiquetas específicas de recursos {#resource-specific-tags}

Algunos recursos tienen etiquetas específicas que se extraen según el entorno de su clúster. Las siguientes etiquetas están disponibles además de las etiquetas compartidas anteriores.

| Recurso | Etiquetas extraídas |
|---|---|
| **Clúster** | `api_server_version`<br>`kubelet_version` |
| **Definiciones de recursos personalizados** &<br>**Recursos personalizados** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **Espacio de nombres** | `phase` |
| **Nodo** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Volumen persistente** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Solicitud de volumen persistente** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (en lugar de `kube_pod`)<br>`pod_phase` (extraído del manifiesto)<br>`pod_status` (calculado de forma similar a `kubectl`) |
| **Servicio** | `kube_service_type`<br>`kube_service_port` |

### Filtros de utilización de recursos {#resource-utilization-filters}

Los siguientes recursos de carga de trabajo se enriquecen con métricas de utilización de recursos:

- Clústeres
- Nodos
- Pods

Estas métricas se calculan en el momento de la recopilación, según los valores promedio de los últimos 15 minutos. Puede filtrar por valores de métricas de la siguiente manera: `metric#<metric_name><comparator><numeric_value>`.

- `metric_name` es una métrica disponible (vea a continuación)
- `comparator` es un [comparador](#comparator) admitido
- y `numeric_value` es un valor de punto flotante.

Para los Pods, están disponibles los siguientes nombres de métricas:

| CPU | Memoria |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

Además, los clústeres y los nodos tienen las siguientes métricas disponibles:

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### Unidades de medida {#metric-units}

Las métricas de CPU se almacenan como un número de núcleos.

Las métricas de memoria se almacenan en bytes.

Los porcentajes (`*_pct_*`) se almacenan como números de punto flotante, donde `0.0` es 0% y `1.0` es 100%. El valor es la proporción de las dos métricas indicadas; por ejemplo, `cpu_usage_pct_limits_avg15` es el valor de `usage / limits`. Los valores de las métricas pueden estar por encima del 100%, como el porcentaje de uso de CPU de las solicitudes.

## Notas y problemas conocidos {#notes-and-known-issues}

* Los datos se actualizan automáticamente en intervalos constantes.
* En clústeres con más de 1000 implementaciones (Deployments) o conjuntos de réplicas (ReplicaSets), es posible que note un mayor uso de CPU por parte del agente de clúster. Existe una opción para deshabilitar la limpieza de contenedor en el gráfico de Helm. Consulte [el repositorio del gráfico de Helm][11] para obtener más detalles.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /es/logs
[3]: /es/tracing
[4]: /es/metrics
[5]: /es/events
[6]: /es/infrastructure/containers/kubernetes_resource_utilization
[7]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[8]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[9]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
[11]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog