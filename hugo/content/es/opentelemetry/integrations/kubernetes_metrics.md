---
description: Envíe datos de recursos de Kubernetes y métricas de infraestructura a
  Datadog con OpenTelemetry.
further_reading:
- link: /opentelemetry/setup/
  tag: Documentación
  text: Envíe datos de OpenTelemetry a Datadog
- link: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
  tag: Documentación
  text: Unified service tagging
- link: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes
  tag: GitHub
  text: Ejemplos de configuraciones de Collector
title: Métricas de Kubernetes
---
## Descripción general {#overview}

Utilice OpenTelemetry para enviar datos de Kubernetes a Datadog sin instalar el Datadog Agent. Elija la configuración que coincida con los datos que necesita:

| Objetivo | Componentes | Configuración |
|---|---|---|
| Vea pods, despliegues y otros datos de recursos en Kubernetes Explorer | Un Collector de clúster con el `k8sobjects` receptor | [Enviar recursos de Kubernetes a través de OTLP][15] |
| Complete los dashboards de Kubernetes preconfigurados de Datadog | `kube-state-metrics`, un Collector de clúster y un Collector de nodo por nodo | Siga esta guía |

La configuración completa a continuación recopila métricas de infraestructura de Kubernetes para el dashboard [Kubernetes - Overview][1] y datos de recursos para [Kubernetes Explorer][10]. No instrumenta sus aplicaciones.

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="El dashboard 'Kubernetes - Overview', que muestra métricas de contenedores, incluido el estado y el uso de recursos de su clúster y sus contenedores." style="width:100%;" >}}

La configuración utiliza tres componentes:

- **[`kube-state-metrics`][8]** genera métricas sobre objetos de Kubernetes, como despliegues, nodos y pods.
- **Un Collector de clúster**, que se ejecuta como un Deployment de réplica única, recopila métricas de todo el clúster y datos de recursos para Explorer.
- **Un Collector de nodo**, que se ejecuta como un DaemonSet, recopila métricas de cada nodo, como el uso de CPU y memoria.

El Collector de clúster recopila `kube-state-metrics` con su receptor de Prometheus. No necesita instalar un servidor de Prometheus. Estas métricas completan los dashboards vinculados desde Kubernetes Explorer. El receptor `k8sobjects` proporciona los datos de recursos de Explorer.

## Configuración {#setup}

Estos pasos implementan nuevos Collectors en el espacio de nombres `default`. Si ya recopila métricas de Kubernetes, revise su configuración existente antes de implementar Collectors adicionales para evitar la recopilación duplicada.

### Requisitos previos {#prerequisites}

- [Helm][2] y `kubectl`, con permiso para implementar cargas de trabajo y crear recursos RBAC en el clúster.
- Una [clave de API de Datadog][6] y su [sitio de Datadog][5].

Utilice el Helm chart [Helm chart][9] de OpenTelemetry Collector v0.156.2 o posterior y OpenTelemetry Collector Contrib v0.159.0 o posterior. Los comandos a continuación fijan la imagen del Collector en la versión v0.159.0.

El receptor `k8sobjects` utilizado para Explorer puede aumentar la carga del servidor de la API de Kubernetes. Datadog recomienda Kubernetes 1.33 o posterior y realizar pruebas en clústeres más pequeños antes de ampliar la recopilación. Consulte las [limitaciones de Kubernetes Explorer][12].

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Kubernetes Explorer con OpenTelemetry no está disponible para {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

### Instalación {#installation}

#### 1. Instale kube-state-metrics {#1-install-kube-state-metrics}

Agregue el repositorio de Helm `prometheus-community` e instale `kube-state-metrics`:

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics \
  --namespace default
```

La configuración de referencia recopila `kube-state-metrics.default.svc:8080`. Si utiliza un nombre de servicio o espacio de nombres diferente, actualice el destino del receptor de Prometheus en `cluster-collector.yaml`.

#### 2. Cree un secreto de Datadog {#2-create-a-datadog-secret}

Establezca su clave de API y su sitio, luego cree un secreto en el espacio de nombres de los Collectors:

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 3. Configure e instale los Collectors {#3-configure-and-install-the-collectors}

1. Agregue el repositorio del Helm chart de OpenTelemetry:

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. Descargue [cluster-collector.yaml][3] y [daemonset-collector.yaml][4] en el mismo directorio. Estos archivos de valores de Helm se mantienen en el repositorio `opentelemetry-examples`:

   ```sh
   CONFIG_URL="https://raw.githubusercontent.com/DataDog/opentelemetry-examples/main/guides/kubernetes/configuration"
   curl -fsSLo cluster-collector.yaml "$CONFIG_URL/cluster-collector.yaml"
   curl -fsSLo daemonset-collector.yaml "$CONFIG_URL/daemonset-collector.yaml"
   ```

3. En ambos archivos, reemplace el bloque `datadog/exporter` bajo `config.exporters` con el exportador OTLP HTTP recomendado:

   ```yaml
   exporters:
     otlp_http:
       endpoint: https://otlp.${env:DD_SITE}
       logs_endpoint: https://otlp.${env:DD_SITE}/v1/logs
       headers:
         dd-api-key: ${env:DD_API_KEY}
         dd-otel-metric-config: >-
           {
           "resource_attributes_as_tags": true,
           "instrumentation_scope_metadata_as_tags": true
           }
       compression: zstd
       compression_params:
         level: 3
       sending_queue:
         batch:
           sizer: bytes
           min_size: 2097152
           max_size: 4194304
   ```

   Reemplace cada entrada `datadog/exporter` en la lista `exporters` de un pipeline con `otlp_http`. En el Collector del clúster, no incluya la opción `orchestrator_explorer` del Datadog Exporter; Datadog reconoce los datos de recursos del receptor `k8sobjects` cuando llegan a través de OTLP.

4. Actualice el procesamiento de traza en `daemonset-collector.yaml`. El archivo de referencia también admite trazas de aplicaciones:
   - Si el Collector del nodo no recibe trazas de aplicaciones, elimine `datadog/connector`, los pipelines `traces` y `traces/sampling`, y `datadog/connector` de los receptores del pipeline `metrics`.
   - Si el Collector del nodo recibe trazas de aplicaciones, utilice la [configuración de Collector recomendada][18] para reemplazar `datadog/connector` con los conectores `forward/traces_sample` y `span_metrics` upstream.

   Mantenga la extensión `datadog` y su entrada bajo `service.extensions`. La extensión reporta metadatos del Collector utilizados para el enriquecimiento de servidor; no exporta telemetría.

5. Asegúrese de que ambos Collectors reporten el mismo nombre de clúster:
   - Para detectarlo automáticamente, mantenga `k8s_api` y el detector de su proveedor bajo `resourcedetection.detectors`, y elimine los otros detectores de proveedores de nube. Configure el detector del proveedor y sus permisos para [EKS][14], [AKS][16] o [GKE][17].
   - De lo contrario, establezca `resourcedetection.detectors` en `[k8s_api]`. Descomente `resource/add-cluster-name` y reemplace `<YOUR_CLUSTER_NAME>` con el mismo valor en ambos archivos. En cada pipeline que utilice `resourcedetection`, agregue `resource/add-cluster-name` inmediatamente después. Mantenga los otros procesadores en su lugar.

6. Ejecute los siguientes comandos desde el directorio que contiene los archivos de valores:

   ```sh
   # Install the node Collector (DaemonSet)
   helm install otel-daemon-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f daemonset-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0

   # Install the cluster Collector (Deployment)
   helm install otel-cluster-collector open-telemetry/opentelemetry-collector \
     --namespace default \
     -f cluster-collector.yaml \
     --set image.repository=otel/opentelemetry-collector-contrib \
     --set image.tag=0.159.0
   ```

### Verifique la configuración {#verify-the-setup}

1. Compruebe que los pods de Collector y `kube-state-metrics` estén ejecutándose y listos:

   ```sh
   kubectl get pods --namespace default \
     -l 'app.kubernetes.io/instance in (otel-daemon-collector,otel-cluster-collector,kube-state-metrics)'
   ```

2. Abra el dashboard [Kubernetes - Overview][1] y seleccione su clúster. Compruebe el uso de recursos de los nodos y las métricas de los objetos de Kubernetes.
3. Abra [Kubernetes Explorer][13] y filtre por el nombre de su clúster. Compruebe que los recursos como pods y despliegues aparezcan.

Si faltan datos, compruebe los registros del Collector para ver si hay errores de exportación. Verifique que el secreto contenga una clave de API para el sitio de Datadog seleccionado.

## Correlacione trazas con métricas de infraestructura (opcional) {#correlating-traces-with-infrastructure-metrics}

Para aplicaciones que ya envían trazas, utilice [unified service tagging][7] para correlacionar la telemetría de la aplicación con las métricas de infraestructura. Establezca los mismos atributos de recurso en ambos:

- `service.name` se asigna a la etiqueta `service` de Datadog.
- `service.version` se asigna a la etiqueta `version` de Datadog.
- `deployment.environment.name` se asigna a la etiqueta `env` de Datadog.

### Configuración de la aplicación {#application-configuration}

Establezca las siguientes variables de entorno en la especificación del contenedor de su aplicación para etiquetar la telemetría saliente:

```yaml
spec:
  containers:
    - name: my-container
      env:
        - name: OTEL_SERVICE_NAME
          value: "<SERVICE_NAME>"
        - name: OTEL_RESOURCE_ATTRIBUTES
          value: "service.version=<SERVICE_VERSION>,deployment.environment.name=<ENVIRONMENT>"
```

### Configuración de la infraestructura {#infrastructure-configuration}

Agregue las anotaciones correspondientes a los metadatos de Kubernetes `Deployment`. El procesador `k8sattributes` en el Collector utiliza estas anotaciones para enriquecer las métricas de infraestructura con el contexto del servicio.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  annotations:
    # Use resource.opentelemetry.io/ for the k8sattributes processor
    resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
    resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
    resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
spec:
  template:
    metadata:
      annotations:
        resource.opentelemetry.io/service.name: "<SERVICE_NAME>"
        resource.opentelemetry.io/service.version: "<SERVICE_VERSION>"
        resource.opentelemetry.io/deployment.environment.name: "<ENVIRONMENT>"
# ... rest of the manifest
```

## Datos recopilados {#data-collected}

Esta integración recopila métricas utilizando varios receptores de OpenTelemetry.

### kube-state-metrics (usando el receptor de Prometheus) {#kube-state-metrics-using-prometheus-receiver}

Las métricas extraídas del punto de conexión `kube-state-metrics` proporcionan información sobre el estado de los objetos de la API de Kubernetes.

### Receptor de estadísticas de Kubelet {#kubelet-stats-receiver}

El `kubeletstatsreceiver` recopila métricas del Kubelet en cada nodo, centrándose en el uso de recursos de pod, contenedor y volúmenes.

{{< mapping-table resource="kubeletstats.csv">}}

### Receptor de clúster de Kubernetes {#kubernetes-cluster-receiver}

El `k8sclusterreceiver` recopila métricas a nivel de clúster, como el estado y el recuento de nodos, pods y otros objetos.

{{< mapping-table resource="k8scluster.csv">}}

### Conector de recuento {#count-connector}

El [conector de recuento][11] genera métricas de recuento de objetos contando el número de series de métricas que pasan a través de la canalización. Produce las siguientes métricas:

{{< mapping-table resource="count-connector.csv">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /es/getting_started/site/
[6]: /es/account_management/api-app-keys/#api-keys
[7]: /es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[10]: /es/containers/monitoring/kubernetes_explorer/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/countconnector
[12]: /es/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#limitations
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#amazon-eks
[15]: /es/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#enable-kubernetes-explorer
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#azure-aks
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#gcp-metadata
[18]: /es/opentelemetry/setup/collector_exporter/?tab=kubernetesmanifestreference#2-configure-and-deploy-the-collector