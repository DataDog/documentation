---
description: Déployez la distribution Datadog autonome du collecteur OpenTelemetry
  (DDOT) sur Kubernetes en utilisant l'opérateur OpenTelemetry ou le chart Helm.
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utilisez des composants OpenTelemetry personnalisés dans DDOT
title: Installez le collecteur DDOT autonome en tant que DaemonSet Kubernetes
---
{{< callout header="faux" btn_hidden="true" >}}
L'installation du collecteur DDOT autonome avec les outils OpenTelemetry est en préversion.
{{< /callout >}}

## Présentation {#overview}

Suivez ce guide pour déployer la Datadog Distribution du collecteur OpenTelemetry (DDOT) en utilisant l'opérateur OpenTelemetry ou le Helm chart.

<div class="alert alert-info">
  <strong>Besoin de composants OpenTelemetry supplémentaires?</strong> Si vous avez besoin de composants au-delà de ceux inclus dans le paquet par défaut, suivez <a href="/opentelemetry/setup/ddot_collector/custom_components">Utilisez des composants OpenTelemetry personnalisés</a> pour étendre les capacités de DDOT. Pour obtenir une liste des composants inclus par défaut, consultez <a href="/opentelemetry/agent/#opentelemetry-collector-components">Composants du collecteur OpenTelemetry</a>.
</div>

## Prérequis {#requirements}

Pour compléter ce guide, vous avez besoin des éléments suivants :

**Compte Datadog** :
1. [Créez un compte Datadog][1] si vous n'en avez pas.
1. Trouvez ou créez votre [clé d'API Datadog][2].

**Logiciels** :
Installez et configurez les éléments suivants sur votre machine :

- Un cluster Kubernetes (v1.29+)
- [Helm (v4+)][54]
- [kubectl][5]

**Réseau** :
| Protocole | Transport | Port |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Installez la distribution Datadog du collecteur OpenTelemetry {#install-the-datadog-distribution-of-the-opentelemetry-collector}

### Sélectionnez la méthode d'installation {#select-installation-method}

Choisissez l'une des méthodes d'installation suivantes :

- [Opérateur OpenTelemetry][55] : une approche [native Kubernetes][56] qui réconcilie et maintient automatiquement votre configuration du collecteur OTel.
- [Helm chart][4] : un moyen simple de déployer des collecteurs OTel.

{{< tabs >}}
{{% tab "Opérateur" %}}
### Installez l'opérateur OpenTelemetry {#install-the-opentelemetry-operator}

Vous pouvez installer l'opérateur OpenTelemetry dans votre cluster en utilisant le [OpenTelemetry Operator Helm chart][1] :

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
     --set "manager.createRbacPermissions=true"                             \
     --set "manager.collectorImage.repository=datadog/ddot-collector"       \
     --set "manager.collectorImage.tag={{< version key="agent_version" >}}"
```

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">
Pour FED, définissez le tag sur <code>{{< version key="agent_version" >}}-fips</code> pour utiliser l'image DDOT conforme FIPS.
Consultez <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.
</div>
{{% /site-region %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Ajoutez le dépôt Helm OpenTelemetry {#add-the-opentelemetry-helm-repository}

Pour ajouter le dépôt OpenTelemetry à vos dépôts Helm :

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configurez la clé d'API Datadog {#set-up-datadog-api-key}

1. Obtenez la [clé d'API][2] Datadog.
1. Confirmez que le **SITE DATADOG** sélectionné à droite (Valeur actuelle : **{{< region-param key="dd_site_name" >}}**) correspond à votre [site Datadog][52].
1. Stockez la clé d'API en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the OTel Collector 

{{< tabs >}}
{{% tab "Opérateur" %}}
Après avoir déployé l'opérateur OTel, créez la ressource `OpenTelemetryCollector` qui déclenche le déploiement du collecteur.

1. Utilisez le fichier `node-collector.yaml` pour spécifier votre configuration de daemonset `OpenTelemetryCollector` :

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  config:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.

2. Ajoutez un récepteur OTLP et l'exportateur Datadog pour tous les signaux souhaités : Publiez les ports OTLP sur le nœud avec `hostPort` afin que les pods d'application puissent atteindre l'instance du Collector s'exécutant sur le même nœud :

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
# [...]
spec:
  # [...]
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp']
          exporters: ['datadog']
        metrics:
          receivers: ['otlp']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          exporters: ['datadog']
{{< /code-block >}}

3. (Facultatif) Activez des fonctionnalités supplémentaires :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Customer Success Manager avant de continuer.</div>

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        logs:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          # [...]
        traces:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    # [...]
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
{{< /code-block >}}

4. (Facultatif) Collectez les logs des conteneurs à partir du système de fichiers du nœud :

<div class="alert alert-warning">L'activation de la collecte des logs peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Customer Success Manager avant de continuer.</div>

Le récepteur `filelog` lit les logs des conteneurs à partir du nœud. Comme l'Opérateur ne monte pas automatiquement les chemins des hosts, ajoutez les répertoires de logs en tant que volumes en lecture seule :

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        # Exclude the Collector's own logs to avoid a feedback loop
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          # [...]
  # Mount the node's log directories into the Collector pod (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

{{% collapse-content title="Fichier node-collector.yaml terminé" level="p" %}}
Votre fichier `node-collector.yaml` devrait ressembler à ceci :
{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="false" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
      extensions: ['health_check']
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  # Mount the node's log directories for the filelog receiver (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Utilisez un fichier YAML pour spécifier les paramètres du chart Helm pour le [Collector chart][1].

1. Créez un fichier `node-collector-values.yaml` vide :

```shell
touch node-collector-values.yaml
```

<div class="alert alert-info">Les paramètres non spécifiés utilisent les valeurs par défaut de <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml">values.yaml</a>.</div>

2. Choisissez le mode daemonset et utilisez DDOT comme collector :

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
mode: daemonset
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
# Can be removed from 7.82.0 onwards
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
{{< /code-block >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Pour FED, définissez <code>tag: {{< version key="agent_version" >}}-fips</code> pour utiliser l'image DDOT conforme FIPS. Consultez <a href="/agent/configuration/fips-compliance/">la conformité FIPS</a>.</div>
{{% /site-region %}}

<div class="alert alert-info">Le Helm chart du Collector publie les ports OTLP sur chaque nœud par défaut (<code>hostPort: 4317</code> pour gRPC et <code>hostPort: 4318</code> pour HTTP), afin que les pods d'application puissent atteindre l'instance du Collector s'exécutant sur le même nœud. Consultez <a href="#configure-the-application">Configurer l'application</a>.</div>

3. Configurez l'exportateur Datadog et le secret de la clé d'API :

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

Remplacez `<CLUSTER_NAME>` par un nom pour votre cluster.

4. Activez les préréglages :

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
presets:
  hostMetrics:
    enabled: true
  kubeletMetrics:
    enabled: true
  logsCollection:
    enabled: true
    includeCollectorLogs: false
{{< /code-block >}}

5. Définissez des pipelines pour les signaux souhaités, avec un récepteur OTLP :

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    pipelines:
      logs:
        receivers: ['otlp']
        exporters: ['datadog']
      metrics:
        receivers: ['otlp']
        exporters: ['datadog']
      traces:
        receivers: ['otlp']
        exporters: ['datadog']
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
{{< /code-block >}}

6. (Facultatif) Activez des fonctionnalités Datadog supplémentaires :

<div class="alert alert-warning">L'activation de ces fonctionnalités peut entraîner des frais supplémentaires. Consultez la <a href="https://www.datadoghq.com/pricing/">page de tarification</a> et parlez à votre Customer Success Manager avant de continuer.</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  service:
    pipelines:
      logs:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
      metrics:
        receivers: ['otlp', 'datadog/connector']
        processors: ['resource/add-cluster-name', 'infraattributes']
	    # [...]
      traces:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
        exporters: ['datadog', 'datadog/connector']
{{< /code-block >}}

{{% collapse-content title="Fichier node-collector-values.yaml complété" level="p" %}}
Votre fichier `node-collector-values.yaml` devrait ressembler à ceci :
{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="false" >}}
mode: daemonset
# vvv To be removed from 7.82.0 onwards vvv
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
presets:
  hostMetrics: # Add an hostmetrics receiver to the metrics pipeline
    enabled: true
  kubeletMetrics: # Add a kubeletstats receiver to the metrics pipeline
    enabled: true
  logsCollection: # Add a filelog receiver to the logs pipeline
    enabled: true
    includeCollectorLogs: false
config:
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    extensions:
      - health_check
    pipelines:
      logs:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      metrics:
        receivers:
          - otlp
          - datadog/connector
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      traces:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
          - datadog/connector
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
{{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/README.md
[2]: /fr/getting_started/site/
[3]: /fr/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Déployez le Collector {#deploy-the-collector}

{{< tabs >}}
{{% tab "Opérateur" %}}
Appliquez le fichier `node-collector.yaml` pour créer la ressource `OpenTelemetryCollector`. Le Datadog Operator déploie le Collector en tant que DaemonSet, en exécutant une instance par nœud :

```shell
kubectl apply -f node-collector.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
Installez le Helm chart OpenTelemetry Collector avec votre fichier de valeurs :

```shell
helm install node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml
```

Pour appliquer des modifications ultérieures, exécutez `helm upgrade node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml`.
{{% /tab %}}
{{< /tabs >}}

## Installez le Datadog Agent principal aux côtés de DDOT {#install-the-core-datadog-agent-alongside-ddot}

Si vous souhaitez exécuter le Datadog Agent principal sur les mêmes nœuds que le Collector DDOT autonome — par exemple, pour collecter des métriques d'infrastructure, l'APM ou des logs via l'Agent principal pendant que DDOT gère l'ingestion OTLP — vous pouvez l'installer séparément en utilisant le [Datadog Operator][57].

Par défaut, le Datadog Operator Helm chart surveille <code>DatadogAgent</code> les ressources uniquement dans l'espace de nommage où le Datadog Operator est installé (<code>watchNamespaces: []</code>). Si la <code>DatadogAgent</code> ressource se trouve dans un espace de nommage différent de celui du Datadog Operator, par exemple pour la garder séparée du espace de nommage de la <code>OpenTelemetryCollector</code> ressource, définissez <code>watchNamespaces</code> pour inclure l'espace de nommage où la <code>DatadogAgent</code> la ressource est créée :
<pre><code>helm upgrade datadog-operator datadog/datadog-operator \
  -n &lt;OPERATOR_NAMESPACE&gt; \
  --reuse-values \
  --set 'watchNamespaces[0]=&lt;DATADOG_AGENT_NAMESPACE&gt;'
</code></pre>
Si le Datadog Operator ne surveille pas l'espace de nommage où la <code>DatadogAgent</code> ressource est créée, la ressource échoue silencieusement à se réconcilier, sans erreur, sans événement Kubernetes et sans mise à jour de statut pour indiquer le problème.

## Envoyez votre télémétrie à Datadog {#send-your-telemetry-to-datadog}

Pour envoyer vos données de télémétrie à Datadog :

1. [Instrumentez votre application](#instrument-the-application)
2. [Configurez l'application](#configure-the-application)
3. [Corrélez les données d'observabilité](#correlate-observability-data)
4. [Exécutez votre application](#run-the-application)

### Instrumentez l'application {#instrument-the-application}

Instrumentez votre application [en utilisant l'API OpenTelemetry][12].

{{% collapse-content title="Exemple d'application instrumentée avec l'API OpenTelemetry" level="p" %}}
À titre d'exemple, vous pouvez utiliser l'[exemple d'application Calendar][9] qui est déjà instrumenté pour vous. Le code suivant instrumente la méthode [CalendarService.getDate()][10] en utilisant les annotations et l'API OpenTelemetry :
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configurez l'application {#configure-the-application}

Le conteneur de votre application doit envoyer des données au collecteur DDOT exécuté sur le même nœud. Comme le collecteur publie les ports OTLP sur le nœud avec `hostPort`, l'application peut atteindre le collecteur local via l'adresse IP du nœud (`status.hostIP`).

Si la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` n'est pas déjà définie, ajoutez-la au fichier manifeste de déploiement de votre application :
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

### Corrélez les données d'observabilité {#correlate-observability-data}

Le [Unified service tagging][14] relie les données d'observabilité dans Datadog afin que vous puissiez naviguer entre les métriques, les traces et les logs avec des tags cohérents.

Dans les environnements conteneurisés, définissez `env`, `service` et `version` à l'aide des variables d'environnement des attributs de ressource OpenTelemetry. Le collecteur DDOT détecte cette configuration de marquage et l'applique aux données qu'il collecte à partir des conteneurs.

Ajoutez les variables d'environnement suivantes au manifeste de déploiement de votre application :

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
{{< /code-block >}}

### Exécutez l'application{#run-the-application}

Redéployez votre application pour appliquer les modifications apportées au manifeste de déploiement. Une fois la configuration mise à jour active, [Unified Service Tagging] est entièrement activé pour vos métriques, traces et logs.

## Explorez les données d'observabilité dans Datadog{#explore-observability-data-in-datadog}

Utilisez Datadog pour explorer les données d'observabilité de votre application.

### Automatisation du parc {#fleet-automation}

Explorez la configuration de votre Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Examinez la configuration de votre Collector depuis la page Fleet Automation." style="width:100%;" >}}

### Surveillance des conteneurs en temps réel {#live-container-monitoring}

Surveillez l'état de vos conteneurs à l'aide des fonctionnalités de Live Container Monitoring.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Surveillez l'état de vos conteneurs depuis la page Containers." style="width:100%;" >}}

### État de santé des nœuds d'infrastructure {#infrastructure-node-health}

Affichez les métriques d'exécution et d'infrastructure pour visualiser, surveiller et mesurer les performances de vos nœuds.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Affichez les métriques d'exécution et d'infrastructure depuis la liste des hosts." style="width:100%;" >}}

### Logs{#logs}

Consultez les logs pour surveiller et diagnostiquer les opérations de l'application et du système.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Affichez les logs depuis le Log Explorer." style="width:100%;" >}}

### Traces {#traces}

Affichez les traces et les spans pour observer l'état et les performances des requêtes traitées par votre application, avec des métriques d'infrastructure corrélées dans la même trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Affichez les traces depuis le Trace Explorer." style="width:100%;" >}}

### Métriques runtime {#runtime-metrics}

Surveillez les métriques runtime (JVM) pour vos applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Affichez les métriques JVM depuis le dashboard JVM Metrics." style="width:100%;" >}}

### Métriques de santé du Collector {#collector-health-metrics}

Affichez les métriques du DDOT Collector pour surveiller la santé du Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Affichez les métriques de santé du Collector depuis le dashboard OTel." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[12]: /fr/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[14]: /fr/getting_started/tagging/unified_service_tagging
[52]: /fr/getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: /fr/getting_started/containers/datadog_operator/