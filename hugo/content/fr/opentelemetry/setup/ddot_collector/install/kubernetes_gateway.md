---
code_lang: kubernetes_gateway
code_lang_weight: 2
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentation
  text: Utiliser des composants OpenTelemetry personnalisés avec le Datadog Agent
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralisez et gérez votre pipeline OpenTelemetry avec la passerelle DDOT
- link: https://www.datadoghq.com/blog/otel-gateway-topology-view/
  tag: Blog
  text: Dépannage des passerelles OTel avec Datadog Fleet Automation
- link: https://opentelemetry.io/docs/collector/deployment/gateway/
  tag: OpenTelemetry
  text: 'Déploiement du collecteur : passerelle'
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter
  tag: OpenTelemetry
  text: Exportateur d'équilibrage de charge
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
  tag: OpenTelemetry
  text: Processeur d'échantillonnage du suivi
title: Installer le collecteur DDOT en tant que passerelle sur Kubernetes
type: multi-code-lang
---
<div class="alert alert-info">
Ce guide suppose que vous êtes familiarisé avec le déploiement du collecteur DDOT en tant que DaemonSet. Pour plus d'informations, consultez <a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">Installer le collecteur DDOT en tant que DaemonSet sur Kubernetes</a>.
</div>

## Présentation {#overview}

Le collecteur OpenTelemetry peut être déployé de plusieurs manières. Le modèle *daemonset* est un déploiement courant où une instance de collecteur s'exécute sur chaque nœud Kubernetes aux côtés du Datadog Agent principal.

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="Schéma d'architecture du modèle de daemonset du collecteur OpenTelemetry. Un cluster Kubernetes contient trois nœuds. Sur chaque nœud, une application instrumentée avec OpenTelemetry envoie des données OTLP à un DaemonSet d'Agent local. Le DaemonSet d'Agent transfère ensuite ces données directement vers le backend Datadog." style="width:100%;" >}}

Le modèle [gateway][6] offre une option de déploiement supplémentaire qui utilise un service de collecteur centralisé et autonome. Cette couche de passerelle peut effectuer des actions telles que l'échantillonnage du suivi, l'agrégation, le filtrage et le routage avant d'exporter les données vers un ou plusieurs backends tels que Datadog. Il agit comme un point central pour la gestion et l'application des politiques d'observabilité.

{{< img src="opentelemetry/embedded_collector/ddot_gateway_diagram.png" alt="Schéma d'architecture du modèle de passerelle du collecteur OpenTelemetry. Les applications envoient des données OTLP aux DaemonSets DDOT locaux s'exécutant sur chaque nœud. Les DaemonSets transfèrent ces données vers un équilibreur de charge central, qui les distribue vers un déploiement distinct de pods de passerelle DDOT. Ces pods de passerelle envoient ensuite les données de télémétrie à Datadog." style="width:100%;" >}}

Lorsque vous activez la passerelle :
1.  Un déploiement Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) gère les pods autonomes du collecteur **de passerelle**.
2.  Un service Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway`) expose les pods de la passerelle et assure l'équilibrage de charge.
3.  Les **pods du collecteur DaemonSet** existants sont configurés par défaut pour envoyer leurs données de télémétrie au service de passerelle au lieu de les envoyer directement à Datadog.

Dans un déploiement de passerelle, ajoutez les informations du host avant que la télémétrie n'atteigne la passerelle. Pour la configuration recommandée du nom de host, consultez [Nom de host et tagging][12].

## Prérequis {#requirements}

Avant de commencer, assurez-vous de disposer des éléments suivants :

* **Compte Datadog**:
    * Un [compte Datadog][1].
    * Votre [clé d'API][2] Datadog.
* **Logiciel** :
    * Un cluster Kubernetes (v1.29+). EKS Fargate et GKE Autopilot ne sont pas pris en charge.
    * [Helm][3] (v3+).
    * Version 3.160.1+ du chart Helm Datadog ou version 1.23.0+ de Datadog Operator.
    * [kubectl][4].
* **Réseau** :
  {{% otel-network-requirements %}}

## Installation et configuration {#installation-and-configuration}

Ce guide montre comment configurer la passerelle du collecteur DDOT en utilisant Datadog Operator ou le chart Helm.

<div class="alert alert-info">Cette installation est requise pour les configurations Datadog SDK + DDOT et OpenTelemetry SDK + DDOT. Bien que le SDK Datadog implémente l'API OpenTelemetry, il nécessite toujours le Collector DDOT pour traiter et transférer les métriques et logs OTLP.</div>

Choisissez l'une des méthodes d'installation suivantes :

- **Datadog Operator** : une approche native Kubernetes qui réconcilie et maintient automatiquement votre configuration Datadog. Il signale l'état du déploiement, l'intégrité et les erreurs dans le statut de sa ressource personnalisée (Custom Resource), et limite le risque de mauvaise configuration grâce à des options de configuration de plus haut niveau.
- **Chart Helm** : Un moyen simple de déployer Datadog Agent. Il offre des fonctionnalités de gestion des versions, de restauration et de création de modèles, rendant les déploiements cohérents et plus faciles à répliquer.

### Installez Datadog Operator ou Helm {#install-the-datadog-operator-or-helm}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si vous n'avez pas encore installé Datadog Operator, vous pouvez l'installer dans votre cluster en utilisant le chart Helm de Datadog Operator :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

Pour plus d'informations, consultez la [documentation de Datadog Operator][1].

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

{{% /tab %}}
{{% tab "Helm" %}}

Si vous n'avez pas encore ajouté le dépôt Helm de Datadog, ajoutez-le maintenant :

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Pour plus d'informations sur les options de configuration de Helm, consultez le [README du chart Helm de Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

### Déploiement de la passerelle avec un DaemonSet {#deploying-the-gateway-with-a-daemonset}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Pour commencer, activez à la fois la passerelle et le collecteur DaemonSet dans votre ressource `DatadogAgent`. Il s'agit de la configuration la plus courante.

Créez un fichier nommé `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    # Enable the Collector in the Agent DaemonSet
    otelCollector:
      enabled: true

    # Enable the standalone Gateway Deployment
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"
```

Appliquez la configuration :

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Pour commencer, activez à la fois la passerelle et le collecteur DaemonSet dans votre fichier `values.yaml`. Il s'agit de la configuration la plus courante.

```yaml
# values.yaml
targetSystem: "linux"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable the Collector in the Agent Daemonset
  otelCollector:
    enabled: true

# Enable the standalone Gateway Deployment
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    # Example selector to place gateway pods on specific nodes
    gateway: "true"
```

{{% /tab %}}
{{< /tabs >}}

Dans ce cas, le collecteur DaemonSet utilise une configuration par défaut qui envoie les données OTLP au service Kubernetes de la passerelle :

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  otlphttp:
    endpoint: http://<release>-datadog-otel-agent-gateway:4318
    tls:
      insecure: true
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes]
      exporters: [otlphttp]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp]
```

Le collecteur de la passerelle utilise une configuration par défaut qui écoute sur les ports de service et envoie les données à Datadog :

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: ${env:DD_API_KEY}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
extension:
  datadog:
    api:
      key: ${env:DD_API_KEY}
    deployment_type: gateway
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog]
    metrics:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

<div class="alert alert-tip">
<strong>Pour les utilisateurs de Helm :</strong> Configurez <code>otelAgentGateway.affinity</code> ou <code>otelAgentGateway.nodeSelector</code> pour contrôler le placement des pods, et ajustez <code>otelAgentGateway.replicas</code> pour mettre à l'échelle la passerelle.<br>
<strong>Pour les utilisateurs de l'Opérateur :</strong> Utilisez <code>override.otelAgentGateway.affinity</code>, <code>override.otelAgentGateway.nodeSelector</code>, et <code>override.otelAgentGateway.replicas</code> pour ces paramètres.</div>

### Déployer une passerelle autonome {#deploying-a-standalone-gateway}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si vous disposez d'un déploiement DaemonSet existant, vous pouvez déployer la passerelle indépendamment en désactivant d'autres composants :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gateway
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"

    # Disable the Agent DaemonSet
    nodeAgent:
      disabled: true
    # Disable the Cluster Agent
    clusterAgent:
      disabled: true
```

Après avoir déployé la passerelle, vous devez mettre à jour la configuration de vos collecteurs DaemonSet existants pour envoyer des données vers le nouvel endpoint du service passerelle (par exemple, `http://datadog-gateway-otel-agent-gateway:4318`).

{{% /tab %}}
{{% tab "Helm" %}}

Si vous disposez d'un déploiement DaemonSet existant, vous pouvez déployer la passerelle indépendamment.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "gw-only"
agents:
  enabled: false
clusterAgent:
  enabled: false
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
```

Après avoir déployé la passerelle, vous devez mettre à jour la configuration de vos collecteurs DaemonSet existants pour envoyer des données vers le nouvel endpoint du service passerelle (par exemple, `http://gw-only-otel-agent-gateway:4318`).

{{% /tab %}}
{{< /tabs >}}

### Personnalisation des configurations du collecteur {#customizing-collector-configurations}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Vous pouvez personnaliser la configuration du collecteur de la passerelle à l'aide de ConfigMaps. Créez une ConfigMap avec votre configuration personnalisée :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
          http:
            endpoint: "0.0.0.0:4318"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
      sending_queue:
        batch:
          flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

Référencez-la ensuite dans votre ressource `DatadogAgent` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      # Reference the custom ConfigMap
      config:
        configMap:
          name: otel-gateway-config

  override:
    otelAgentGateway:
      replicas: 3
```

Pour les ConfigMaps multi-éléments ou la configuration en ligne, consultez les [exemples DatadogAgent][1].

[1]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent

{{% /tab %}}
{{% tab "Helm" %}}

Vous pouvez remplacer les configurations par défaut des collecteurs DaemonSet et passerelle en utilisant respectivement les valeurs `datadog.otelCollector.config` et `otelAgentGateway.config`.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable and configure the DaemonSet Collector
  otelCollector:
    enabled: true
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        otlp:
          endpoint: http://my-gw-otel-agent-gateway:4317
          tls:
            insecure: true
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [otlp]
          metrics:
            receivers: [otlp]
            exporters: [otlp]
          logs:
            receivers: [otlp]
            exporters: [otlp]

# Enable and configure the gateway Collector
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

{{% otel-infraattributes-prereq %}}

<div class="alert alert-info">
Si vous définissez <code>fullnameOverride</code>, le nom du service Kubernetes de la passerelle devient <code><fullnameOverride>-otel-agent-gateway</code>. Les ports définis dans <code>otelAgentGateway.ports</code> sont exposés sur ce service. Assurez-vous que ces ports correspondent à la configuration du récepteur OTLP dans la passerelle et à la configuration de l'exportateur OTLP dans le DaemonSet.
</div>

{{% /tab %}}
{{< /tabs >}}

Les exemples de configuration utilisent TLS non sécurisé par souci de simplicité. Suivez les [instructions OTel configtls][7] si vous souhaitez activer TLS.

### Options de configuration avancées {#advanced-configuration-options}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator fournit des options de configuration supplémentaires pour la passerelle de l'Agent OTel sous `override.otelAgentGateway` (**NON** `features.otelAgentGateway` sauf `featureGates`) :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

      # Feature gates for OTel collector (feature-specific configuration)
      featureGates: "telemetry.UseLocalHostAsDefaultMetricsAddress"

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3

      # Node selector for pod placement
      nodeSelector:
        kubernetes.io/os: linux
        gateway: "true"

      # Affinity configuration
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - datadog-otel-agent-gateway
              topologyKey: kubernetes.io/hostname

      # Tolerations for tainted nodes
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "otel-gateway"
        effect: "NoSchedule"

      # Priority class for scheduling
      priorityClassName: high-priority

      # Environment variables
      env:
      - name: OTEL_LOG_LEVEL
        value: "info"

      # Environment variables from ConfigMaps or Secrets
      envFrom:
      - configMapRef:
          name: otel-gateway-config

      # Custom image (optional)
      image:
        name: ddot-collector
        tag: "{{< version key="ddot_gateway_version" >}}"
        pullPolicy: IfNotPresent

      # Pod-level security context
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000

      # Configure resources
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi

      # Additional labels and annotations
      labels:
        team: observability
      annotations:
        prometheus.io/scrape: "true"
```

Pour une référence complète de toutes les options disponibles, consultez la [documentation de configuration de DatadogAgent v2alpha1][1].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}
{{% tab "Helm" %}}

Pour les déploiements basés sur Helm, bon nombre de ces options de configuration avancées peuvent être définies directement dans le fichier `values.yaml` sous la section `otelAgentGateway`. Pour une référence complète, consultez le [README du chart Helm Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

## Cas d'utilisation avancés {#advanced-use-cases}

### Échantillonnage du suivi avec l'exportateur d'équilibrage de charge {#tail-sampling-with-the-load-balancing-exporter}

Un cas d'utilisation principal pour la passerelle est l'échantillonnage du suivi. Pour garantir que toutes les étendues (spans) d'une trace donnée soient traitées par le même pod de passerelle, utilisez l'**exportateur d'équilibrage de charge** dans vos collecteurs DaemonSet. Cet exportateur achemine systématiquement les étendues en fonction d'une clé, telle que `traceID`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Le collecteur DaemonSet est configuré avec l'exportateur `loadbalancing`, qui utilise le résolveur de service Kubernetes pour découvrir et acheminer les données vers les pods passerelle. Le collecteur passerelle utilise le processeur `tail_sampling` pour échantillonner les traces en fonction de politiques définies avant de les exporter vers Datadog.

**Remarque** : des autorisations RBAC sont requises pour le résolveur k8s dans l'exportateur d'équilibrage de charge.

Créez une ConfigMap pour la configuration du collecteur DaemonSet avec l'exportateur d'équilibrage de charge :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-daemonset-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      loadbalancing:
        routing_key: "traceID"
        protocol:
          otlp:
            tls:
              insecure: true
        resolver:
          k8s:
            service: datadog-otel-agent-gateway
            ports:
              - 4317
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [loadbalancing]
```

Créez une ConfigMap pour la configuration du collecteur de la passerelle avec l'échantillonnage du suivi :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-tailsampling-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies:
          # Add your sampling policies here
          - name: sample-errors
            type: status_code
            status_code:
              status_codes: [ERROR]
          - name: sample-slow-traces
            type: latency
            latency:
              threshold_ms: 1000
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

Appliquez la configuration DatadogAgent :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      # Reference the custom DaemonSet config
      config:
        configMap:
          name: otel-daemonset-config
      # RBAC permissions for the k8s resolver
      rbac:
        create: true

    otelAgentGateway:
      enabled: true
      # Reference the custom gateway config
      config:
        configMap:
          name: otel-gateway-tailsampling-config

  override:
    otelAgentGateway:
      replicas: 3
```

Créez un ClusterRole pour que le DaemonSet puisse accéder aux endpoints :

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-k8s-resolver
rules:
- apiGroups: [""]
  resources: ["endpoints"] # for v0.139.0 and before
  verbs: ["get", "watch", "list"]
- apiGroups: ["discovery.k8s.io"]
  resources: ["endpointslices"] # for v0.140.0 and after
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector-k8s-resolver
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector-k8s-resolver
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

<div class="alert alert-warning">
Pour garantir que les statistiques APM sont calculées sur 100 % de vos traces avant l'échantillonnage, le <code>datadog/connector</code> s'exécute dans un pipeline séparé sans le <code>tail_sampling</code> processeur. Le connecteur peut s'exécuter soit dans le DaemonSet, soit dans la couche passerelle.
</div>

{{% /tab %}}
{{% tab "Helm" %}}

Dans la configuration ci-dessous :

1.  Le collecteur DaemonSet (`datadog.otelCollector`) est configuré avec l'exportateur `loadbalancing`, qui utilise le résolveur de service Kubernetes pour découvrir et acheminer les données vers les pods passerelle.
2.  Le collecteur passerelle (`otelAgentGateway`) utilise le processeur `tail_sampling` pour échantillonner les traces en fonction de politiques définies avant de les exporter vers Datadog.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  otelCollector:
    enabled: true
    # RBAC permissions are required for the k8s resolver in the loadbalancing exporter
    rbac:
      create: true
      rules:
        - apiGroups: [""]
          resources: ["endpoints"] # for v0.139.0 and before
          verbs: ["get", "watch", "list"]
        - apiGroups: ["discovery.k8s.io"]
          resources: ["endpointslices"] # for v0.140.0 and after
          verbs: ["get", "watch", "list"]
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        loadbalancing:
          routing_key: "traceID"
          protocol:
            otlp:
              tls:
                insecure: true
          resolver:
            k8s:
              service: my-gw-otel-agent-gateway
              ports:
                - 4317
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [loadbalancing]

otelAgentGateway:
  enabled: true
  replicas: 3
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies: <Add your sampling policies here>
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

<div class="alert alert-warning">
Pour garantir que les statistiques APM sont calculées sur 100 % de vos traces avant l'échantillonnage, le <code>datadog/connector</code> s'exécute dans un pipeline séparé sans le <code>tail_sampling</code> processeur. Le connecteur peut s'exécuter soit dans le DaemonSet, soit dans la couche passerelle.
</div>

{{% /tab %}}
{{< /tabs >}}

### Utilisation d'une image de collecteur personnalisée {#using-a-custom-collector-image}

Pour utiliser une image de collecteur personnalisée pour votre passerelle, spécifiez le dépôt d'images et le tag. Si vous avez besoin d'instructions sur la façon de créer les images personnalisées, consultez [Utiliser des composants OpenTelemetry personnalisés][5].

<div class="alert alert-info">
<strong>Remarque :</strong> Datadog Operator prend en charge les formats de nom d'image suivants :
<ul>
  <li><code>name</code> - Le nom de l'image (par exemple, <code>ddot-collector</code>)</li>
  <li><code>name:tag</code> - Nom de l'image avec tag (par exemple, <code>ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
  <li><code>registry/name:tag</code> - Référence complète de l'image (par exemple, <code>gcr.io/datadoghq/ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
</ul>
Le format <code>registry/name</code> (sans tag dans le champ name) <strong>n'est pas pris en charge</strong> lors de l'utilisation d'un champ <code>tag</code> séparé. Incluez la référence complète de l'image avec tag dans le champ <code>name</code> ou utilisez le nom de l'image avec un champ <code>tag</code> séparé.
</div>

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      image:
        name: <YOUR REPO>:<IMAGE TAG>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  image:
    repository: <YOUR REPO>
    tag: <IMAGE TAG>
    doNotCheckTag: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
```

{{% /tab %}}
{{< /tabs >}}

### Activer la mise à l'échelle automatique avec le Horizontal Pod Autoscaler (HPA) {#enable-autoscaling-with-horizontal-pod-autoscaler-hpa}

La passerelle DDOT Collector prend en charge la mise à l'échelle automatique avec la fonctionnalité Horizontal Pod Autoscaler (HPA) de Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

**Remarque** : Datadog Operator ne gère pas directement les ressources HPA. Vous devez créer la ressource HPA séparément et la configurer pour cibler le déploiement de l'OTel Agent Gateway.

Créer une ressource HPA :

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: datadog-otel-agent-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: datadog-otel-agent-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
  # Aim for high CPU utilization for higher throughput
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 60
```

Appliquez la configuration DatadogAgent avec les demandes/limites de ressources (requises pour HPA) :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      replicas: 4  # Initial replicas, HPA will override based on metrics
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi
```

{{% /tab %}}
{{% tab "Helm" %}}

Pour activer HPA, configurez `otelAgentGateway.autoscaling` :

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
  replicas: 4  # 4 replicas to begin with and HPA may override it based on the metrics
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    metrics:
      # Aim for high CPU utilization for higher throughput
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 80
    behavior:
      scaleUp:
        stabilizationWindowSeconds: 30
      scaleDown:
        stabilizationWindowSeconds: 60
```

{{% /tab %}}
{{< /tabs >}}

Vous pouvez utiliser des métriques de ressources (CPU ou mémoire), des métriques personnalisées (Pod ou objet Kubernetes) ou des métriques externes comme entrées de mise à l'échelle automatique. Pour les métriques de ressources, assurez-vous que le [Kubernetes metrics server][9] est en cours d'exécution dans votre cluster. Pour les métriques personnalisées ou externes, envisagez de configurer le [fournisseur de métriques du Datadog Cluster Agent][10].

### Déploiement d'une passerelle multicouche {#deploying-a-multi-layer-gateway}

Pour les scénarios avancés, vous pouvez déployer plusieurs couches de passerelle afin de créer une chaîne de traitement.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Déployez chaque couche en tant que ressource `DatadogAgent` distincte, en commençant par la couche finale et en procédant dans l'ordre inverse.

1.  **Déployer la couche 1 (couche finale) :** Cette couche reçoit les données de la couche 2 et les exporte vers Datadog.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-1
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-1-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-1-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

2.  **Déployer la couche 2 (couche intermédiaire) :** Cette couche reçoit les données du DaemonSet et les exporte vers la couche 1.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-2
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-2-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-2-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-1-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

3.  **Déployer le DaemonSet :** Configurez le DaemonSet pour exporter les données vers la couche 2.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      config:
        configMap:
          name: daemonset-layer2-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: daemonset-layer2-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-2-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

{{% /tab %}}
{{% tab "Helm" %}}

Déployez chaque couche en tant que release Helm distincte, en commençant par la couche finale et en procédant dans l'ordre inverse.

1.  **Déployer la couche 1 (couche finale) :** Cette couche reçoit les données de la couche 2 et les exporte vers Datadog.

    ```yaml
    # layer-1-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-1"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          datadog:
            api:
              key: <API Key>
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [datadog]
            metrics:
              receivers: [otlp]
              exporters: [datadog]
            logs:
              receivers: [otlp]
              exporters: [datadog]
    ```

2.  **Déployer la couche 2 (couche intermédiaire) :** Cette couche reçoit les données du DaemonSet et les exporte vers la couche 1.

    ```yaml
    # layer-2-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-2"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          otlp:
            endpoint: http://gw-layer-1-otel-agent-gateway:4317
            tls:
              insecure: true
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [otlp]
            metrics:
              receivers: [otlp]
              exporters: [otlp]
            logs:
              receivers: [otlp]
              exporters: [otlp]
    ```

3.  **Déployer le DaemonSet :** Configurez le DaemonSet pour exporter les données vers la couche 2.

    ```yaml
    # daemonset-values.yaml
    targetSystem: "linux"
    datadog:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
      otelCollector:
        enabled: true
        config: |
          receivers:
            otlp:
              protocols:
                grpc:
                  endpoint: "localhost:4317"
          exporters:
            otlp:
              endpoint: http://gw-layer-2-otel-agent-gateway:4317
              tls:
                insecure: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                exporters: [otlp]
              metrics:
                receivers: [otlp]
                exporters: [otlp]
              logs:
                receivers: [otlp]
                exporters: [otlp]
    ```

{{% /tab %}}
{{< /tabs >}}

## Afficher les pods de passerelle sur Fleet Automation {#view-gateway-pods-on-fleet-automation}

La passerelle DDOT Collector inclut [Datadog extension][11] par défaut. Cette extension exporte les informations de build et les configurations du Collector vers Datadog, vous permettant de surveiller votre pipeline de télémétrie depuis Infrastructure Monitoring et Fleet Automation.

Pour afficher vos pods de passerelle :

1. Accédez à {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}.

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="Page Fleet Automation affichant les pods de passerelle DDOT" style="width:100%;" >}}

2. Sélectionnez un pod de passerelle pour afficher les informations de build détaillées et la configuration du collecteur en cours d'exécution.

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="Page Fleet Automation affichant la configuration du collecteur d'un pod de passerelle DDOT" style="width:100%;" >}}

## Limitations connues {#known-limitations}

  * **Condition de concurrence au démarrage** : lors du déploiement du DaemonSet et de la passerelle dans la même release, les pods du DaemonSet peuvent démarrer avant que le service de passerelle ne soit prêt, ce qui provoque des logs d'erreurs de connexion initiale. L'exportateur OTLP effectue automatiquement des tentatives, ces logs peuvent donc être ignorés en toute sécurité. Alternativement, déployez d'abord la passerelle et attendez qu'elle soit prête avant de déployer le DaemonSet.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /fr/opentelemetry/setup/ddot_collector/custom_components
[6]: https://opentelemetry.io/docs/collector/deployment/gateway/
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[9]: http://github.com/kubernetes-sigs/metrics-server
[10]: /fr/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
[12]: /fr/opentelemetry/config/hostname_tagging/#collector-exporting-through-a-gateway