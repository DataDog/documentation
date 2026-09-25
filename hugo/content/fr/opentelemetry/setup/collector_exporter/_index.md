---
aliases:
- /fr/opentelemetry/setup/collector_exporter/oss_setup/
- /fr/opentelemetry/setup/collector_exporter/community_collector/
- /fr/opentelemetry/setup/collector_exporter/pure_otlp_collector/
- /fr/opentelemetry/setup/collector_exporter/install/
- /fr/opentelemetry/collector_exporter/
description: Envoyez des données OpenTelemetry à Datadog en utilisant le Collector
  OpenTelemetry et OTLP
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Site externe
  text: Documentation Collector
- link: /opentelemetry/config/log_collection
  tag: Documentation
  text: Configurer la collecte de logs
- link: /opentelemetry/config/collector_batch_memory
  tag: Documentation
  text: Configurer les limites de mémoire
- link: /opentelemetry/config/otlp_receiver
  tag: Documentation
  text: Activer le récepteur OTLP
- link: /opentelemetry/setup/ddot_collector/install/
  tag: Documentation
  text: Installer le collecteur DDOT (recommandé)
- link: /opentelemetry/compatibility/
  tag: Documentation
  text: Compatibilité des fonctionnalités
- link: https://www.datadoghq.com/architecture/opentelemetry-collector-in-kubernetes/
  tag: Architecture Center
  text: Collecteur OpenTelemetry dans Kubernetes
site_support_id: opentelemetry_collector_otlp_export
title: Configurer le Collector OpenTelemetry
---
## Présentation {#overview}

Envoyez des traces, des métriques et des logs à Datadog en utilisant le Collector OpenTelemetry. Les configurations sur cette page sont testées avec la distribution OpenTelemetry Collector Contrib v0.154.0 et utilisent un pipeline de télémétrie basé sur OTLP avec les composants clés suivants :

- **Exportateur HTTP OTLP** : envoie la télémétrie aux endpoints d'ingestion OTLP de Datadog.
- **Connecteur de métriques de span** : génère des métriques RED (taux, erreur, durée) à partir des données de trace pour alimenter les fonctionnalités APM telles que le Service Catalog et la page Service.
- **Processeur de détection de ressources** : détecte les attributs des ressources de host et de cloud, que Datadog utilise pour la résolution du nom de host et le marquage.
- **Extension Datadog** : Transmet la configuration du Collector à Datadog pour Fleet Automation. Elle n'exporte pas de données de télémétrie.

Il s'agit de la configuration recommandée pour un Collector que vous gérez vous-même. Si vous souhaitez une distribution de Collector maintenue et prise en charge par Datadog, utilisez plutôt la [distribution Datadog du Collector OTel (DDOT)][12].

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Un SDK OpenTelemetry envoie des données OTLP à un Collector OpenTelemetry, qui les exporte vers Datadog via OTLP HTTP." style="width:100%;" >}}

Les configurations sur cette page utilisent le [modèle de déploiement d'agent][10] : un Collector s'exécute sur chaque host ou nœud Kubernetes et reçoit la télémétrie des charges de travail sur ce host ou ce nœud. Pour un déploiement en passerelle, consultez le [modèle de déploiement de passerelle][11] OpenTelemetry. Le traitement avec état, tel que l'échantillonnage basé sur la fin (tail-based sampling) dans un environnement multi-Collector, nécessite une architecture de passerelle qui achemine tous les spans d'une trace vers le même Collector.

Pour les métriques Kubernetes à l'échelle du cluster et le Kubernetes Explorer, consultez [Métriques Kubernetes][13].

<div class="alert alert-info">Vous utilisez déjà l'exportateur Datadog et le connecteur Datadog ? Consultez <a href="/opentelemetry/setup/collector_exporter/datadog_exporter/">Configurer l'exportateur et le connecteur Datadog</a>.</div>

## Prérequis {#prerequisites}

Cette configuration prend en charge le bare metal, les VM, Docker et Kubernetes. Les distributions Kubernetes gérées prises en charge incluent Amazon EKS (y compris Auto Mode), Google GKE (Standard et Autopilot) et Azure AKS (y compris Automatic).

Cette configuration ne prend pas en charge les environnements d'exécution de conteneurs sans serveur ou basés sur des tâches tels qu'ECS Fargate, EKS Fargate ou AWS Lambda. Pour les fonctionnalités Datadog prises en charge, consultez le [tableau de compatibilité des fonctionnalités][7] sous **OTel SDK + Upstream OpenTelemetry Collector**.

- [OpenTelemetry Collector Contrib][1] v0.154.0 ou version ultérieure
- Une [clé d'API Datadog][2]
- Votre [site Datadog][3] (par exemple, `datadoghq.com` ou `datadoghq.eu`)

## Installez et configurez {#install-and-configure}

### 1. Téléchargez l'OpenTelemetry Collector {#1-download-the-opentelemetry-collector}

Téléchargez la dernière version de la distribution OpenTelemetry Collector Contrib depuis la [page des versions][100].

### 2. Configurez et déployez le Collector {#2-configure-and-deploy-the-collector}

Sélectionnez l'onglet correspondant à votre environnement.

{{< tabs >}}
{{% tab "Host" %}}

Pour un Collector non conteneurisé s'exécutant directement sur un host (bare metal ou VM), créez un fichier nommé `collector.yaml` avec cette configuration.

Définissez les variables d'environnement `DD_API_KEY` et `DD_SITE` avant de démarrer l'OpenTelemetry Collector.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  host_metrics:
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

Pour les environnements spécifiques au cloud, ajoutez le détecteur de ressources approprié :
- **Amazon EC2** : `detectors: [ec2, env, system]`
- **Google Cloud** : `detectors: [gcp, env, system]`
- **Azure** : `detectors: [azure, env, system]`

Consultez les [fichiers de configuration complets][500] pour une configuration optionnelle permettant de collecter des métadonnées supplémentaires sur le système.

[500]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector

Exécutez le Collector :

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml
```

{{% /tab %}}

{{% tab "Docker" %}}

Pour un Collector conteneurisé, créez un fichier nommé `collector.yaml` avec cette configuration. Le récepteur `host_metrics` nécessite le montage du système de fichiers du host sur `/hostfs`.

Définissez les variables d'environnement suivantes avant de démarrer l'OpenTelemetry Collector :

- `DD_API_KEY` et `DD_SITE`
- `OTEL_RESOURCE_ATTRIBUTES` : Le Collector ne peut pas détecter les informations du host depuis l'intérieur d'un conteneur, veuillez donc les fournir ici (par exemple, `host.name=<YOUR_HOST_NAME>`).

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

Créez un réseau Docker pour que le Collector et vos conteneurs d'application puissent le partager, ou utilisez-en un existant :

```shell
docker network create otel
```

Exécutez le Collector avec le système de fichiers du host monté, attaché à ce réseau :

```shell
docker run \
    --name otelcol \
    --network otel \
    -p 4317:4317 \
    -p 4318:4318 \
    -e DD_API_KEY \
    -e DD_SITE \
    -e OTEL_RESOURCE_ATTRIBUTES \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.154.0 \
    --config /etc/otelcol-contrib/config.yaml
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Utilisez le [chart Helm officiel d'OpenTelemetry Collector][102] pour déployer le Collector en tant que DaemonSet dans Kubernetes. Les exemples de fichiers de valeurs sont testés avec le chart v0.147.1, fixent le Collector à la version v0.154.0 et configurent les montages, les variables d'environnement, les ressources RBAC et l'exposition des ports requis.

Pour collecter des métriques à l'échelle du cluster ou envoyer des données de ressources Kubernetes à Kubernetes Explorer, déployez un Collector de cluster en parallèle du DaemonSet. Consultez [Métriques Kubernetes][13].

1. Créez un secret Kubernetes avec votre clé d'API Datadog :

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. Ajoutez le dépôt Helm OpenTelemetry :

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. Téléchargez le fichier de valeurs exemple pour votre environnement et enregistrez-le sous `values.yaml` : Si votre site Datadog n'est pas `datadoghq.com`, mettez à jour la valeur `DD_SITE` dans `values.yaml` avant l'installation.

   | Environnement | Fichier de valeurs |
   |---|---|
   | Kubernetes (hors cloud) | [`daemonset.yaml`][103] |
   | Amazon EKS | [`daemonset-eks.yaml`][104] |
   | Amazon EKS Auto Mode | [`daemonset-eks-auto.yaml`][105] |
   | Google GKE | [`daemonset-gke.yaml`][106] |
   | Google GKE Autopilot | [`daemonset-gke-autopilot.yaml`][107] |
   | Azure AKS | [`daemonset-aks.yaml`][108] |
   | Azure AKS Automatic | [`daemonset-aks-automatic.yaml`][109] |

   Sur Amazon EKS, les fichiers de valeurs ne peuvent pas configurer les paramètres requis côté AWS. Appliquez ce qui suit en dehors de Helm :

   - **Amazon EKS** : Les détecteurs `ec2` et `eks` ont besoin d'accéder à l'endpoint IMDS depuis l'intérieur d'un conteneur. Définissez la limite de saut de jeton IMDS sur 2 dans votre modèle de lancement de nœud ou dans les paramètres de votre compte.
   - **Amazon EKS Auto Mode** : Le détecteur `eks` nécessite une association Pod Identity qui attribue au Collector un rôle IAM avec l'autorisation `EC2:DescribeInstances`.

1. Installez le Collector :

   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --version 0.147.1 --values values.yaml
   ```

[102]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.147.1/charts/opentelemetry-collector
[103]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset.yaml
[104]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-eks.yaml
[105]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-eks-auto.yaml
[106]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-gke.yaml
[107]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-gke-autopilot.yaml
[108]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-aks.yaml
[109]: https://github.com/DataDog/opentelemetry-examples/blob/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector/helm-values/daemonset-aks-automatic.yaml

{{% /tab %}}

{{% tab "Référence des manifestes Kubernetes" %}}

Cet onglet est une référence de configuration pour les utilisateurs qui gèrent leurs propres manifestes Kubernetes. Pour une installation exécutable incluant la spécification de pod, les montages, les variables d'environnement, les ressources RBAC et l'exposition des ports requis, utilisez l'onglet **Kubernetes**.

La configuration exécute le Collector en tant que DaemonSet dans un environnement hors cloud. Il inclut le processeur `k8s_attributes` pour enrichir la télémétrie avec les métadonnées Kubernetes et le récepteur `kubelet_stats` pour les métriques de nœud, de pod, de conteneur et de volume. Sur une distribution Kubernetes gérée, appliquez les modifications décrites dans [Distributions Kubernetes gérées](#managed-kubernetes-distributions) après la configuration.

Définissez les variables d'environnement suivantes dans la spécification du pod du Collector, en utilisant l'API descendante (downward API) de Kubernetes là où indiqué :

- `DD_API_KEY` et `DD_SITE`
- `K8S_NODE_NAME` : Le nom du nœud Kubernetes, utilisé par le récepteur `kubelet_stats`. Définissez-le à partir du champ `spec.nodeName`.
- `MY_POD_IP` : L'adresse IP du pod, utilisée par l'extension `health_check`. Définissez-la à partir du champ `status.podIP`.
- `OTEL_RESOURCE_ATTRIBUTES` : Le Collector ne peut pas déterminer le nom de host depuis l'intérieur d'un conteneur, veuillez donc fournir les informations sur le host ici (par exemple, `k8s.node.name=$(K8S_NODE_NAME)`). La syntaxe `$(VAR)` est développée par Kubernetes, définissez-la donc dans la spécification du pod plutôt que dans un shell.

Montez le système de fichiers du host sur `/hostfs` afin que le récepteur `host_metrics` puisse collecter les métriques du host.

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}
  # Collect node, pod, container, and volume metrics from the kubelet
  kubelet_stats:
    collection_interval: 15s
    auth_type: "serviceAccount"
    endpoint: "${env:K8S_NODE_NAME}:10250"
    node: "${env:K8S_NODE_NAME}"
    insecure_skip_verify: true
    metric_groups:
      - node
      - pod
      - container
      - volume

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}
  # Convert selected delta metrics to rates
  deltatorate:
    metrics:
      - k8s.pod.network.io
      - k8s.pod.network.errors
  # Enrich telemetry with Kubernetes pod and container metadata
  k8s_attributes:
    extract:
      otel_annotations: true
      metadata:
        - k8s.node.name
        - k8s.namespace.name
        - service.namespace
        - service.name
        - service.version
        - service.instance.id
        - k8s.deployment.name
        - k8s.replicaset.name
        - k8s.daemonset.name
        - k8s.statefulset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.pod.uid
        - k8s.pod.name
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
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

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Required for Kubernetes liveness/readiness probes
  health_check:
    endpoint: ${env:MY_POD_IP}:13133
  # Report Collector configuration to Datadog for Fleet Automation
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - health_check
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics, kubelet_stats]
      processors: [k8s_attributes, resource_detection, cumulativetodelta, deltatorate]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

Cette configuration nécessite un ServiceAccount lié à un ClusterRole qui accorde `get`, `list` et `watch` sur `pods`, `namespaces`, `nodes`, `nodes/stats` et `replicasets`. Le processeur `k8s_attributes` lit les métadonnées du pod, et le récepteur `kubelet_stats` lit `nodes/stats`. Consultez la [documentation du processeur d'attributs Kubernetes][101] pour les instructions de configuration RBAC, et ajoutez `nodes/stats` aux règles qu'elle liste :

#### Distributions Kubernetes gérées {#managed-kubernetes-distributions}

Sur une distribution Kubernetes gérée, remplacez le processeur `resource_detection` dans la configuration précédente par la variante adaptée à votre environnement. Les détecteurs de cloud fournissent des informations sur le host, vous n'avez donc pas besoin de définir `OTEL_RESOURCE_ATTRIBUTES`.

##### Amazon EKS {#amazon-eks}

```yaml
processors:
  resource_detection:
    detectors: [eks, ec2, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    ec2:
      tags: ['^kubernetes\.io/cluster/.*$']
    system:
      resource_attributes:
        host.name:
          enabled: false
```

Les détecteurs `ec2` et `eks` ont besoin d'accéder à l'endpoint IMDS depuis l'intérieur d'un conteneur. Définissez la limite de saut de jeton IMDS sur 2 dans votre modèle de lancement de nœud ou dans les paramètres de votre compte. Le `timeout` est augmenté à `15s` pour tenir compte de la latence IMDS.

##### Amazon EKS Auto Mode {#amazon-eks-auto-mode}

```yaml
processors:
  resource_detection:
    detectors: [eks, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
        host.id: { enabled: true } # Required for host name inference
        cloud.account.id: { enabled: true }
        cloud.availability_zone: { enabled: true }
        cloud.region: { enabled: true }
        host.image.id: { enabled: true }
        host.type: { enabled: true }
      node_from_env_var: K8S_NODE_NAME
    system:
      resource_attributes:
        host.name:
          enabled: false
```

Le détecteur `eks` nécessite une association Pod Identity qui attribue à l'OpenTelemetry Collector un rôle IAM avec l'autorisation `EC2:DescribeInstances`.

##### Google GKE {#google-gke}

```yaml
processors:
  resource_detection:
    detectors: [gcp, env, system]
    timeout: 2s
    override: true
    system:
      resource_attributes:
        host.name:
          enabled: false
```

Sur les anciennes versions de GKE, le détecteur `gcp` peut ne pas renvoyer de nom de host. Si cela se produit, fournissez le nom du nœud en tant que `host.name` dans `OTEL_RESOURCE_ATTRIBUTES`.

##### Azure AKS {#azure-aks}

```yaml
processors:
  resource_detection:
    detectors: [aks, azure, env, system]
    timeout: 2s
    override: true
    aks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    system:
      resource_attributes:
        host.name:
          enabled: false
```

##### GKE Autopilot et AKS Automatic {#gke-autopilot-and-aks-automatic}

Ces modes ne permettent pas de monter `/hostfs` ou d'utiliser des ports de host. Utilisez le processeur `resource_detection` GKE ou AKS, puis effectuez ces modifications supplémentaires :

- Supprimez le récepteur `host_metrics` du bloc `receivers` et du pipeline `metrics`. Les métriques de nœud, de pod, de conteneur et de volume proviennent toujours du récepteur `kubelet_stats`.
- Désactivez les ports de host sur l'OpenTelemetry Collector et exposez-le plutôt via un Service local au nœud. Les fichiers de valeurs Helm pour GKE Autopilot et AKS Automatic appliquent ces changements. Pointez les applications vers ce Service plutôt que vers l'IP du host indiquée dans [Configure your application](#3-configure-your-application).

Pour obtenir les fichiers de configuration complets pour chaque environnement, consultez le [`opentelemetry-examples` dépôt][501].

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control
[501]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector

{{% /tab %}}
{{< /tabs >}}

### 3. Configurez votre application {#3-configure-your-application}

Configurez votre application instrumentée avec OpenTelemetry pour envoyer des données au Collector. Définissez la variable d'environnement `OTEL_EXPORTER_OTLP_ENDPOINT` pour pointer vers le Collector :

{{< tabs >}}
{{% tab "Host" %}}

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```
{{% /tab %}}

{{% tab "Docker" %}}
Définissez les variables d'environnement suivantes dans votre conteneur d'application :

```
OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```
Ceci utilise la valeur `--name otelcol` issue de la commande `docker run`. Exécutez votre conteneur d'application sur le même réseau (`--network otel`). Si vous utilisez Docker Compose, les deux conteneurs partagent automatiquement un réseau et vous pouvez utiliser le nom de service du Collector.
{{% /tab %}}

{{% tab "Kubernetes" %}}
Pour les environnements Kubernetes où les valeurs Helm activent les ports du host, configurez l'endpoint en utilisant l'IP du host :

```yaml
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://$(HOST_IP):4318"
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: "http/protobuf"
```

GKE Autopilot et AKS Automatic n'autorisent pas les ports de host. Leurs exemples de valeurs Helm activent plutôt un Service local au nœud. Trouvez le nom du Service avec `kubectl get services`, et configurez l'endpoint en utilisant son nom DNS Kubernetes (par exemple, `http://otelcol-opentelemetry-collector:4318`).
{{% /tab %}}
{{< /tabs >}}

Définissez les attributs de ressource `service.name`, `deployment.environment.name` et `service.version` dans la configuration OpenTelemetry de votre application. Datadog les mappe vers [Unified Service Tagging][4], ce qui corrèle vos traces, métriques et logs.

## Vérifiez la configuration {#verify-the-setup}

Une fois que votre application envoie des données de télémétrie au Collector, vérifiez que les données apparaissent dans Datadog :

1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}} et confirmez que votre `service.name` apparaît.
2. Ouvrez {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}} et recherchez votre service.
3. Accédez à {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Infrastructure List{{< /ui >}} et confirmez que le host exécutant le Collector apparaît. Sur GKE Autopilot et AKS Automatic, les exemples de fichiers de valeurs omettent le récepteur `host_metrics`, donc les hosts n'apparaissent pas.
4. Si vous envoyez des logs par OTLP, accédez à {{< ui >}}Logs Explorer{{< /ui >}} et recherchez le nom de votre service.
5. Dans [Fleet Automation][9], confirmez que le Collector et sa configuration apparaissent.

## Composants clés {#key-components}

### Connecteur de métriques de span {#span-metrics-connector}

Le connecteur `span_metrics` génère des métriques RED à partir des données de trace. Ces métriques alimentent les fonctionnalités APM, notamment le Service Catalog, la page Service et la page Resource. Le connecteur est configuré avec des dimensions qui permettent à Datadog de calculer les tags de host, les services pairs et les noms d'opération à partir de vos traces.

Chaque configuration spécifique de l'environnement dans [Configurer et déployer le Collector](#2-configure-and-deploy-the-collector) inclut le bloc de connecteur `span_metrics` complet. Conservez toutes ses dimensions lors de l'adaptation de la configuration afin que Datadog puisse déduire les tags de host, les services pairs, les noms d'opération et les noms de ressource requis.

Les [fichiers de configuration complets][5] montrent également comment remplacer des groupes de dimensions de tag de conteneur par des modèles glob, tels que `- glob: container.**`.

### Exportateur OTLP HTTP {#otlp-http-exporter}

L'exportateur `otlp_http` envoie des données de télémétrie aux endpoints d'ingestion OTLP de Datadog. Détails de configuration clés :

- **Endpoint** : `https://otlp.<YOUR_DD_SITE>` pour les traces, les logs et les métriques.
- **Compression** : `zstd` est recommandé pour réduire l'utilisation de la bande passante. Lors de l'utilisation de `zstd`, définissez `compression_params.level` explicitement, car la valeur par défaut utilise le niveau de compression le plus bas.
- **Traitement par lots** : Les paramètres `sending_queue.batch` commencent le vidage à 2 MiB et divisent les lots sérialisés à 4 MiB. Si vous recevez une réponse 413, réduisez ces tailles.

#### `dd-otel-metric-config` en-tête {#dd-otel-metric-config-header}

L'en-tête `dd-otel-metric-config` est une charge utile JSON envoyée avec les requêtes de métriques qui configure la manière dont Datadog traite les métriques OTLP. Définissez-le dans la section `headers` de l'exportateur `otlp_http`.

| Champ | Type | Par défaut | Description |
|---|---|---|---|
| `resource_attributes_as_tags` | Booléen | `false` | Propage les attributs de ressource OTLP en tant que tags Datadog sur les métriques émises. |
| `instrumentation_scope_metadata_as_tags` | Booléen | `false` | Propage les métadonnées de périmètre d'instrumentation OTLP (nom et version du périmètre) en tant que tags sur les métriques émises. |
| `trace_metrics.namespace` | Chaîne | `traces.span.metrics` | Préfixe d'espace de nommage appliqué aux métriques dérivées des traces. |
| `trace_metrics.instrumentation_metrics_calc` | Booléen | `false` | Lorsque `true`, achemine les métriques d'instrumentation HTTP prises en charge pour alimenter les métriques de trace APM. |
| `raw_instrumentation_metrics_drop` | Booléen | `false` | Lorsque `true`, supprime les métriques d'instrumentation HTTP brutes de l'ingestion de métriques régulière après les avoir acheminées pour les métriques de trace APM. S'applique uniquement lorsque `trace_metrics.instrumentation_metrics_calc` est `true`. |

Exemple avec les métriques d'instrumentation activées :

```json
{
  "trace_metrics": {
    "namespace": "myapp.traces",
    "instrumentation_metrics_calc": true
  },
  "raw_instrumentation_metrics_drop": false,
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": false
}
```

<div class="alert alert-info">La configuration recommandée du Collector OpenTelemetry utilise le connecteur <code>span_metrics</code> pour générer les métriques RED qui alimentent les vues APM. Les champs <code>trace_metrics.instrumentation_metrics_calc</code> et <code>raw_instrumentation_metrics_drop</code> prennent en charge une configuration alternative pour les installations qui dérivent les métriques de trace APM à partir des métriques d'instrumentation HTTP à la place. N'activez pas <code>instrumentation_metrics_calc</code> aux côtés du connecteur <code>span_metrics</code> car cela calcule les métriques de trace à partir des deux sources.</div>

### Connecteur de transfert de traces {#trace-forward-connector}

Le connecteur `forward/traces_sample` divise le traitement des traces en deux pipelines. Le premier pipeline envoie chaque span au connecteur `span_metrics`, et le second exporte les spans vers Datadog. Ajoutez des processeurs d'échantillonnage au second pipeline afin que les métriques de trace soient calculées à partir de toutes les traces, et non seulement de celles échantillonnées.

### Extension Datadog {#datadog-extension}

L'extension `datadog` transmet la configuration du Collector à Datadog pour Fleet Automation. Elle n'exporte pas de données de télémétrie. Tout le flux de télémétrie passe par l'exportateur HTTP OTLP. Cette extension fait partie du projet [OpenTelemetry Collector Contrib][1] et gère la validation de la clé d'API ainsi que le rapport sur le type de déploiement.

### Processeur cumulatif-vers-delta {#cumulative-to-delta-processor}

Le processeur `cumulativetodelta` convertit les métriques cumulatives en temporalité delta, ce qui est la [configuration recommandée par Datadog][6] pour les métriques OpenTelemetry.

### Récepteur de statistiques Kubelet {#kubelet-stats-receiver}

Dans les déploiements Kubernetes, le récepteur `kubelet_stats` collecte les métriques des nœuds, des pods, des conteneurs et des volumes à partir du kubelet sur chaque nœud. Le processeur `deltatorate` convertit les métriques réseau des pods qu'il produit en taux.

### Télémétrie d'autosurveillance {#self-monitoring-telemetry}

La configuration renvoie les propres métriques du collecteur vers son récepteur OTLP local (`http://localhost:4318`). Cela achemine les métriques internes du collecteur via ses propres pipelines afin qu'elles soient enrichies avec des attributs de ressource avant d'être exportées vers Datadog.

## Limites d'ingestion OTLP {#otlp-intake-limits}

Datadog applique les limites suivantes lors de l'ingestion de données OTLP. Les données qui dépassent une limite sont rejetées ou supprimées comme indiqué.

**Taille de la charge utile**
: Chaque endpoint d'ingestion applique une taille de charge utile maximale par requête. Les requêtes dépassant la limite sont rejetées avec une réponse `HTTP 413 Request Entity Too Large`. Si vous recevez une erreur 413, réduisez la taille du lot ou effectuez des vidages plus fréquemment afin que chaque requête reste sous la limite. Pour connaître la limite de taille de charge utile de chaque endpoint, consultez [Limites d'ingestion][8].

**Nombre de buckets d'histogramme**
: Chaque point de données d'histogramme est validé lors de l'ingestion, avec un nombre maximal par bucket (le nombre d'observations dans un seul bucket) de 2 147 483 647 (2<sup>31</sup> − 1). Si un bucket dépasse cette limite, l'intégralité du point de données est rejetée.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /fr/account_management/api-app-keys/
[3]: /fr/getting_started/site/
[4]: /fr/getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/be842bc1447337c32f2d6265612232932a6cdbfd/configurations/opentelemetry-collector
[6]: /fr/opentelemetry/guide/otlp_delta_temporality/
[7]: /fr/opentelemetry/compatibility/
[8]: /fr/opentelemetry/setup/otlp_ingest/#intake-limits
[9]: https://app.datadoghq.com/fleet
[10]: https://opentelemetry.io/docs/collector/deploy/agent/
[11]: https://opentelemetry.io/docs/collector/deploy/gateway/
[12]: /fr/opentelemetry/setup/ddot_collector/install/
[13]: /fr/opentelemetry/integrations/kubernetes_metrics/
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest