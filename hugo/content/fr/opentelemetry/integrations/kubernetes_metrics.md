---
description: Envoyez des données de ressources Kubernetes et des métriques d'infrastructure
  à Datadog avec OpenTelemetry.
further_reading:
- link: /opentelemetry/setup/
  tag: Documentation
  text: Envoyer des données OpenTelemetry à Datadog
- link: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Unified Service Tagging
- link: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes
  tag: GitHub
  text: Exemples de configurations de collecteur
title: Métriques Kubernetes
---
## Présentation {#overview}

Utilisez OpenTelemetry pour envoyer des données Kubernetes à Datadog sans installer Datadog Agent. Choisissez la configuration qui correspond aux données dont vous avez besoin :

| Objectif | Composants | Configuration |
|---|---|---|
| Afficher les pods, les déploiements et d'autres données de ressources dans Kubernetes Explorer | Un collecteur de cluster avec le récepteur `k8sobjects` | [Envoyer des ressources Kubernetes via OTLP][15] |
| Alimentez les dashboards Kubernetes prêts à l'emploi de Datadog | `kube-state-metrics`, un collecteur de cluster et un collecteur de nœud pour chaque nœud | Suivez ce guide |

La configuration complète ci-dessous collecte les métriques d'infrastructure Kubernetes pour le dashboard [Kubernetes - Overview][1] et les données de ressources pour [Kubernetes Explorer][10]. Elle n'instrumente pas vos applications.

{{< img src="/opentelemetry/collector_exporter/kubernetes_metrics.png" alt="Le dashboard « Kubernetes - Overview », affichant les métriques des conteneurs, y compris le statut et l'utilisation des ressources de votre cluster et de ses conteneurs." style="width:100%;" >}}

La configuration utilise trois composants :

- **[`kube-state-metrics`][8]** génère des métriques sur les objets Kubernetes, tels que les déploiements, les nœuds et les pods.
- **Un collecteur de cluster**, exécuté en tant que déploiement à réplique unique, collecte les métriques à l'échelle du cluster et les données de ressources pour Explorer.
- **Un collecteur de nœud**, exécuté en tant que DaemonSet, collecte les métriques de chaque nœud, telles que l'utilisation du processeur et de la mémoire.

Le collecteur de cluster récupère `kube-state-metrics` avec son récepteur Prometheus. Vous n'avez pas besoin d'installer un serveur Prometheus. Ces métriques alimentent les dashboards liés depuis Kubernetes Explorer. Le récepteur `k8sobjects` fournit les données de ressources d'Explorer.

## Configuration {#setup}

Ces étapes déploient de nouveaux collecteurs dans l'espace de noms `default`. Si vous collectez déjà des métriques Kubernetes, examinez votre configuration existante avant de déployer des collecteurs supplémentaires pour éviter une collecte en double.

### Prérequis {#prerequisites}

- [Helm][2] et `kubectl`, avec l'autorisation de déployer des charges de travail et de créer des ressources RBAC dans le cluster.
- Une [clé d'API Datadog][6] et votre [site Datadog][5].

Utilisez le [chart Helm][9] OpenTelemetry Collector v0.156.2 ou ultérieur et OpenTelemetry Collector Contrib v0.159.0 ou ultérieur. Les commandes ci-dessous fixent l'image du collecteur à la version v0.159.0.

Le récepteur `k8sobjects` utilisé pour Explorer peut augmenter la charge du serveur API Kubernetes. Datadog recommande Kubernetes 1.33 ou ultérieur et d'effectuer des tests sur des clusters plus petits avant d'étendre la collecte. Consultez les [limitations de Kubernetes Explorer][12].

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">Kubernetes Explorer avec OpenTelemetry n'est pas disponible pour {{< region-param key="dd_site_name" >}}.</div>{{< /site-region >}}

### Installation {#installation}

#### 1. Installez kube-state-metrics {#1-install-kube-state-metrics}

Ajoutez le dépôt Helm `prometheus-community` et installez `kube-state-metrics` :

```sh
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-state-metrics prometheus-community/kube-state-metrics \
  --namespace default
```

La configuration de référence récupère `kube-state-metrics.default.svc:8080`. Si vous utilisez un nom de service ou un espace de noms différent, mettez à jour la cible du récepteur Prometheus dans `cluster-collector.yaml`.

#### 2. Créez un secret Datadog {#2-create-a-datadog-secret}

Définissez votre clé d'API et votre site, puis créez un secret dans l'espace de noms des collecteurs :

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 3. Configurez et installez les collecteurs {#3-configure-and-install-the-collectors}

1. Ajoutez le dépôt du chart Helm OpenTelemetry :

   ```sh
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   helm repo update
   ```

2. Téléchargez [cluster-collector.yaml][3] et [daemonset-collector.yaml][4] dans le même répertoire. Ces fichiers de valeurs Helm sont maintenus dans le dépôt `opentelemetry-examples` :

   ```sh
   CONFIG_URL="https://raw.githubusercontent.com/DataDog/opentelemetry-examples/main/guides/kubernetes/configuration"
   curl -fsSLo cluster-collector.yaml "$CONFIG_URL/cluster-collector.yaml"
   curl -fsSLo daemonset-collector.yaml "$CONFIG_URL/daemonset-collector.yaml"
   ```

3. Dans les deux fichiers, remplacez le bloc `datadog/exporter` sous `config.exporters` par l'exportateur OTLP HTTP recommandé :

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

   Remplacez chaque entrée `datadog/exporter` dans la liste `exporters` d'un pipeline par `otlp_http`. Dans le Collector de cluster, n'incluez pas l'option `orchestrator_explorer` de l'exportateur Datadog ; Datadog reconnaît les données de ressource provenant du récepteur `k8sobjects` lorsqu'elles arrivent via OTLP.

4. Mettez à jour le traitement des traces dans `daemonset-collector.yaml`. Le fichier de référence prend également en charge les traces d'application :
   - Si le Collector de nœud ne reçoit pas de traces d'application, supprimez `datadog/connector`, les pipelines `traces` et `traces/sampling`, et `datadog/connector` des récepteurs du pipeline `metrics`.
   - Si le Collector de nœud reçoit des traces d'application, utilisez la [configuration recommandée du Collector][18] pour remplacer `datadog/connector` par les connecteurs amont `forward/traces_sample` et `span_metrics`.

   Conservez l'extension `datadog` et son entrée sous `service.extensions`. L'extension rapporte les métadonnées du Collector utilisées pour l'enrichissement des hosts ; elle n'exporte pas de télémétrie.

5. Assurez-vous que les deux Collectors rapportent le même nom de cluster :
   - Pour le détecter automatiquement, conservez `k8s_api` et le détecteur de votre fournisseur sous `resourcedetection.detectors`, et supprimez les autres détecteurs de fournisseurs cloud. Configurez le détecteur de fournisseur et ses autorisations pour [EKS][14], [AKS][16] ou [GKE][17].
   - Sinon, définissez `resourcedetection.detectors` sur `[k8s_api]`. Décommentez `resource/add-cluster-name` et remplacez `<YOUR_CLUSTER_NAME>` par la même valeur dans les deux fichiers. Dans chaque pipeline utilisant `resourcedetection`, ajoutez `resource/add-cluster-name` immédiatement après. Maintenez les autres processeurs en place.

6. Exécutez les commandes suivantes depuis le répertoire contenant les fichiers de valeurs :

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

### Vérifiez la configuration {#verify-the-setup}

1. Vérifiez que les pods du Collector et de `kube-state-metrics` sont en cours d'exécution et prêts :

   ```sh
   kubectl get pods --namespace default \
     -l 'app.kubernetes.io/instance in (otel-daemon-collector,otel-cluster-collector,kube-state-metrics)'
   ```

2. Ouvrez le dashboard [Kubernetes - Overview][1] et sélectionnez votre cluster. Vérifiez l'utilisation des ressources des nœuds et les métriques des objets Kubernetes.
3. Ouvrez [Kubernetes Explorer][13] et filtrez par le nom de votre cluster. Vérifiez que les ressources telles que les pods et les déploiements apparaissent.

Si des données sont manquantes, vérifiez les logs du Collector pour détecter les erreurs d'exportation. Vérifiez que le secret contient une clé d'API pour le site Datadog sélectionné.

## Corréler les traces avec les métriques d'infrastructure (facultatif) {#correlating-traces-with-infrastructure-metrics}

Pour les applications qui envoient déjà des traces, utilisez le [unified service tagging][7] pour corréler la télémétrie de l'application avec les métriques d'infrastructure. Définissez les mêmes attributs de ressource sur les deux :

- `service.name` correspond au tag Datadog `service`.
- `service.version` correspond au tag Datadog `version`.
- `deployment.environment.name` correspond au tag Datadog `env`.

### Configuration de l'application {#application-configuration}

Définissez les variables d'environnement suivantes dans la spécification de conteneur de votre application pour taguer la télémétrie sortante :

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

### Configuration de l'infrastructure {#infrastructure-configuration}

Ajoutez les annotations correspondantes aux métadonnées de votre Kubernetes `Deployment`. Le processeur `k8sattributes` du Collector utilise ces annotations pour enrichir les métriques d'infrastructure avec le contexte du service.

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

## Données collectées {#data-collected}

Cette intégration collecte des métriques à l'aide de plusieurs récepteurs OpenTelemetry.

### kube-state-metrics (à l'aide du récepteur Prometheus) {#kube-state-metrics-using-prometheus-receiver}

Les métriques extraites de l'endpoint `kube-state-metrics` fournissent des informations sur l'état des objets de l'API Kubernetes.

### Récepteur de statistiques Kubelet {#kubelet-stats-receiver}

Le `kubeletstatsreceiver` collecte des métriques depuis le Kubelet sur chaque nœud, en se concentrant sur l'utilisation des ressources des pods, des conteneurs et des volumes.

{{< mapping-table resource="kubeletstats.csv">}}

### Récepteur de cluster Kubernetes {#kubernetes-cluster-receiver}

Le `k8sclusterreceiver` collecte des métriques au niveau du cluster, telles que le statut et le nombre de nœuds, de pods et d'autres objets.

{{< mapping-table resource="k8scluster.csv">}}

### Connecteur de comptage {#count-connector}

Le [connecteur de comptage][11] génère des métriques de comptage d'objets en comptant le nombre de séries de métriques qui passent par le pipeline. Il produit les métriques suivantes :

{{< mapping-table resource="count-connector.csv">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dash/integration/86/kubernetes---overview
[2]: https://helm.sh/docs/intro/install/
[3]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/cluster-collector.yaml
[4]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[5]: /fr/getting_started/site/
[6]: /fr/account_management/api-app-keys/#api-keys
[7]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes#opentelemetry
[8]: https://github.com/kubernetes/kube-state-metrics
[9]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[10]: /fr/containers/monitoring/kubernetes_explorer/
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/countconnector
[12]: /fr/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#limitations
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#amazon-eks
[15]: /fr/containers/monitoring/kubernetes_explorer/?tab=opentelemetrycollector#enable-kubernetes-explorer
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#azure-aks
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#gcp-metadata
[18]: /fr/opentelemetry/setup/collector_exporter/?tab=kubernetesmanifestreference#2-configure-and-deploy-the-collector