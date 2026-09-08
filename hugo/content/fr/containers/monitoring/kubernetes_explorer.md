---
aliases:
- /fr/infrastructure/containers/orchestrator_explorer
description: Utilisez la page Kubernetes Explorer de Datadog pour surveiller vos ressources
  Kubernetes, telles que les pods et les déploiements.
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: Blog
  text: Surveillez vos opérateurs Kubernetes pour assurer le bon fonctionnement de
    vos applications.
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: Centre d'apprentissage
  text: Premiers pas avec l'observabilité Kubernetes
title: Kubernetes Explorer
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Explorer, affichant les pods Kubernetes." style="width:80%;">}}

[Kubernetes Explorer][1] de Datadog vous permet de surveiller l'état des pods, des déploiements et d'autres ressources Kubernetes. Vous pouvez également afficher les spécifications des ressources pour les pods en échec au sein d'un déploiement, corréler l'activité des nœuds avec les logs associés, suivre l'utilisation des ressources, mettre à l'échelle automatiquement les workloads et corriger les erreurs.

<div class="alert alert-info">Lors de l'utilisation du Datadog Agent, Kubernetes Explorer nécessite l'Agent 7.27.0+ et le Cluster Agent 1.11.0+. Si vous utilisez Kubernetes 1.25+, le Cluster Agent 7.40.0+ est requis.</div>


## Configuration {#configuration}

### Activer Kubernetes Explorer {#enable-kubernetes-explorer}

Kubernetes Explorer est **activé par défaut** pour la plupart des installations du Datadog Agent.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Lorsque vous installez le Datadog Agent à l'aide du Datadog Operator, Kubernetes Explorer est activé par défaut.

Pour vérifier que Kubernetes Explorer est activé, assurez-vous que le paramètre `features.orchestratorExplorer.enabled` est défini sur `true` dans votre `datadog-agent.yaml` :

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

Lorsque vous installez le Datadog Agent à l'aide du [chart Helm officiel][1], Kubernetes Explorer est activé par défaut.

Pour vérifier que Kubernetes Explorer est activé, assurez-vous que le paramètre `orchestratorExplorer.enabled` est défini sur `true` dans votre fichier `datadog-values.yaml` :

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

Mettez ensuite à niveau votre chart Helm.

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "Méthode manuelle" %}}
Pour une configuration manuelle, consultez [Configurer Kubernetes Explorer avec un DaemonSet][1].

[1]: /fr/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "Collector OpenTelemetry" %}}

Vous pouvez alimenter Kubernetes Explorer à l'aide d'un pipeline OpenTelemetry natif au lieu du Datadog Agent. Cette configuration utilise le récepteur [`k8sobjects`][1] pour collecter les données des ressources Kubernetes et les transfère via la fonctionnalité Orchestrator Explorer de [Datadog Exporter][2].

#### Prérequis {#prerequisites}

- OpenTelemetry Collector Contrib [v0.154.0][3] ou version ultérieure.
- OpenTelemetry Collector [Helm chart][4] v0.156.2 ou version ultérieure.

#### Limitations {#limitations}

Le récepteur open source `k8sobjects` peut imposer une charge importante sur le serveur API Kubernetes d'un cluster.

Recommandations :

- Utilisez Kubernetes 1.33 ou version ultérieure, qui inclut des [améliorations de liste en continu][5] réduisant l'impact sur le serveur API.
- Commencez avec des clusters plus petits. Limitez le nombre d'objets par type de ressource à moins de 5 000 comme point de départ, et augmentez progressivement tout en surveillant la santé du cluster.

Les étapes suivantes présentent les composants requis pour Kubernetes Explorer. Pour un exemple de référence complet qui collecte également les métriques d'infrastructure Kubernetes, consultez [Kubernetes Metrics][6].

#### 1. Créez un secret de clé d'API Datadog {#1-create-a-datadog-api-key-secret}

Créez un secret Kubernetes pour stocker votre clé d'API Datadog :

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. Configurez le collecteur de cluster {#2-configure-the-cluster-collector}

Cette configuration déploie l'OTel Collector en tant que déploiement Kubernetes. Créez un fichier `deployment-collector.yaml` avec les blocs de configuration suivants, ou fusionnez-les dans votre fichier de valeurs OpenTelemetry Collector existant.

##### Image et mode du collecteur {#collector-image-and-mode}

Configurez le collecteur pour qu'il s'exécute en tant que déploiement à réplique unique utilisant la distribution Contrib :

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

##### Collecte d'objets Kubernetes {#kubernetes-objects-collection}

Le `kubernetesObjects` [préréglage][4] provisionne automatiquement le compte de service, les autorisations RBAC et les valeurs par défaut du récepteur `k8sobjects` nécessaires pour remplir Kubernetes Explorer. Remplacez le récepteur `interval` par `3m`, ce qui est requis pour Kubernetes Explorer :

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

Activez l'option `orchestrator_explorer` dans le Datadog Exporter. Il s'agit du paramètre qui envoie les données d'objet Kubernetes à Kubernetes Explorer. Remplacez `<YOUR_DATADOG_SITE>` par votre [site Datadog][7] :

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

##### Processeurs et pipeline {#processors-and-pipeline}

Ajoutez un processeur [`resourcedetection`][8] pour détecter l'UID et le nom du cluster.

- Le détecteur `k8s_api` est requis pour détecter l'UID du cluster (`k8s.cluster.uid`).
- La détection du nom du cluster dépend de votre fournisseur cloud. Consultez la [documentation du processeur `resourcedetection`][8] pour connaître les fournisseurs pris en charge (EKS, AKS, GCP) et les autorisations requises.
- Si votre fournisseur n'est pas pris en charge, utilisez un processeur `resource/add-cluster-name` pour définir le nom du cluster manuellement. Remplacez `<YOUR_CLUSTER_NAME>` par le nom de votre cluster.

Connectez ensuite les composants dans un pipeline `logs`.

Les exemples suivants présentent deux approches. Utilisez l'exemple du fournisseur cloud si vous utilisez EKS, AKS ou GCP. Utilisez le recours manuel si votre fournisseur n'est pas pris en charge.

**Détection du fournisseur cloud (exemple EKS) :**

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

Remplacez `eks` par le détecteur de votre fournisseur (`aks`, `gcp`). Consultez la [`resourcedetection` documentation du processeur][8] pour la configuration spécifique au fournisseur.

**Recours manuel :**

Si le processeur `resourcedetection` ne prend pas en charge votre fournisseur cloud, définissez le nom du cluster manuellement. Remplacez `<YOUR_CLUSTER_NAME>` par le nom de votre cluster :

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

#### 3. Déployez avec Helm {#3-deploy-with-helm}

Installez le collecteur OpenTelemetry en utilisant votre fichier de configuration :

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. Vérifiez l'installation {#4-verify-the-installation}

Ouvrez le [Kubernetes Explorer][9] et filtrez par le nom de votre cluster OpenTelemetry. Toutes les sections principales de ressources Kubernetes devraient se remplir, ainsi que **Custom Resources > CRD**. La section **Custom Resources > Resources** n'est pas prise en charge avec cette configuration.

#### 5. Corrélez les logs, les métriques et les traces avec Kubernetes Explorer (facultatif) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

Pour naviguer entre les ressources Kubernetes et leurs logs, métriques et traces associés, ajoutez les processeurs [`k8sattributes`][10] et [`resourcedetection`][8] à vos pipelines de collecteur existants. Pour la configuration `resourcedetection`, voir [Processeurs et pipeline](#processors-and-pipeline) ci-dessus.

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

Pour un exemple de référence complet, voir la [configuration du collecteur DaemonSet][11].

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[4]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: /fr/opentelemetry/integrations/kubernetes_metrics/#setup
[7]: /fr/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[9]: https://app.datadoghq.com/orchestration/overview
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[11]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml

{{% /tab %}}
{{% tab "Pile Kube OpenTelemetry" %}}

Vous pouvez remplir Kubernetes Explorer en utilisant le chart Helm `opentelemetry-kube-stack` au lieu du Datadog Agent.

Le chart Helm [`opentelemetry-kube-stack`][1] installe l'opérateur OpenTelemetry et gère les collecteurs en tant que `OpenTelemetryCollector`Custom Resources (CR). Datadog maintient une référence [`values.yaml`][2] qui configure deux collecteurs :

- **`cluster`** (Deployment) : récupère les métriques kube-state-metrics, surveille les objets Kubernetes et active `orchestrator_explorer` pour remplir Kubernetes Explorer.
- **`daemon`** (DaemonSet) : collecte les métriques de l'host et du kubelet, et expose un endpoint OTLP pour les données de télémétrie des applications.

#### Prérequis {#prerequisites-1}

- Helm chart OpenTelemetry Kube Stack [0.20.1][3] ou version ultérieure.
- OpenTelemetry Collector Contrib [v0.154.0][4] ou version ultérieure (épinglé par le fichier de valeurs de référence).
- cert-manager, qui est requis pour le webhook d'admission de l'opérateur.

#### Limitations {#limitations-1}

Le récepteur open source `k8sobjects` peut imposer une charge importante sur le serveur API Kubernetes d'un cluster.

Recommandations :

- Utilisez Kubernetes 1.33 ou version ultérieure, qui inclut des [améliorations de liste en continu][5] réduisant l'impact sur le serveur API.
- Commencez avec des clusters plus petits. Limitez le nombre d'objets par type de ressource à moins de 5 000 comme point de départ, et augmentez progressivement tout en surveillant la santé du cluster.

#### Démarrage rapide (installateur interactif) {#quickstart-interactive-installer}

Le dépôt [`opentelemetry-examples`][6] fournit un installateur interactif qui gère toutes les étapes ci-dessous. Depuis `guides/kubernetes/configuration/opentelemetry-kube-stack/` :

```sh
./install
```

L'installateur demande votre clé d'API Datadog, votre [site Datadog][7], votre plateforme Kubernetes et votre environnement de déploiement. Pour EKS, GKE et AKS, il active le préréglage de détection de ressources correspondant. Pour les autres plateformes, il demande le nom du cluster. Il crée ensuite l'espace de nom `opentelemetry-operator-system` et `datadog-secret`, installe cert-manager si nécessaire, et installe ou met à niveau le chart.

#### Installation avec des fichiers de valeurs {#install-with-values-files}

Si vous n'avez pas utilisé l'installateur interactif ci-dessus, suivez les étapes ci-dessous pour effectuer une installation manuelle.

##### 1. Installez cert-manager (si ce n'est pas déjà fait) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Créez le secret Datadog {#2-create-the-datadog-secret}

Définissez `DD_SITE` sur votre [site Datadog][7] (la valeur par défaut est `datadoghq.com`) :

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

##### 3. Créez une surcouche de déploiement {#3-create-a-deployment-overlay}

La référence `values.yaml` est la base ; les paramètres spécifiques au déploiement (plateforme de cluster, environnement, nom du cluster) se trouvent dans un fichier de surcouche. Depuis `guides/kubernetes/configuration/opentelemetry-kube-stack/`, copiez l'exemple qui correspond à votre plateforme :

```sh
mkdir -p deployment

# EKS, GKE, or AKS (resource detector auto-populates k8s.cluster.name):
cp examples/eks-deployment/values.yaml deployment/values.yaml
cp examples/gcp-deployment/values.yaml deployment/values.yaml
cp examples/aks-deployment/values.yaml deployment/values.yaml

# Other platforms (set the cluster name manually):
cp examples/manually-set-k8s-cluster-name/values.yaml deployment/values.yaml
```

Pour les plateformes autres qu'EKS/GKE/AKS, modifiez `deployment/values.yaml` et remplacez `my_k8s_cluster` et `production` par le nom de votre cluster et votre environnement de déploiement.

##### 4. Déployez les collecteurs de référence {#4-deploy-the-reference-collectors}

Installez ou mettez à niveau le chart avec la base `values.yaml` et votre superposition :

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm upgrade --install opentelemetry-kube-stack \
  open-telemetry/opentelemetry-kube-stack \
  --namespace opentelemetry-operator-system \
  --values ./values.yaml \
  --values ./deployment/values.yaml
```

Les deux collecteurs utilisent par défaut des limites de `500m` CPU et `1Gi` de mémoire, ainsi que des demandes de `200m` CPU et `500Mi` de mémoire. Effectuez une mise à l'échelle pour les grands clusters.

#### Vérifiez l'installation {#verify-the-installation}

Ouvrez le [Kubernetes Explorer][8] et filtrez par le nom de votre cluster. Toutes les sections principales de ressources Kubernetes devraient se remplir, ainsi que **Custom Resources > CRD**. La section **Custom Resources > Resources** n'est pas prise en charge avec cette configuration.

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[2]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/opentelemetry-kube-stack/values.yaml
[3]: https://github.com/open-telemetry/opentelemetry-helm-charts/releases/tag/opentelemetry-kube-stack-0.20.1
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack
[7]: /fr/getting_started/site/
[8]: https://app.datadoghq.com/orchestration/overview

{{% /tab %}}
{{< /tabs >}}

### Ajoutez des tags personnalisés aux ressources {#add-custom-tags-to-resources}

Pour faciliter le filtrage, vous pouvez ajouter des tags personnalisés à vos ressources Kubernetes via la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`. **Ces tags n'apparaissent que dans [Kubernetes Explorer].**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Définissez la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **deux fois** dans `datadog-agent.yaml` :
- Dans `agents.containers.processAgent.env`
- Dans `clusterAgent.env` 

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

Ensuite, appliquez la nouvelle configuration :

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Définissez la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` **deux fois** dans `datadog-agent.yaml` :
- Dans `processAgent.env`
- Dans `clusterAgent.env` 

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

Mettez ensuite à niveau votre chart Helm.

{{% /tab %}}
{{% tab "DaemonSet" %}}

Définissez la variable d'environnement sur les conteneurs de l'Agent de processus et de l'Agent de cluster :

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## Utilisation {#usage}

### Vues {#views}

Basculez entre les {{< ui >}}Pods{{< /ui >}}, {{< ui >}}Clusters{{< /ui >}}, {{< ui >}}Namespaces{{< /ui >}} et d'autres ressources Kubernetes dans le menu déroulant {{< ui >}}Select Resources{{< /ui >}} situé dans le coin supérieur gauche de la page.

Chacune de ces vues inclut un tableau de données. Vous pouvez ainsi organiser facilement vos données par champ (statut, nom ou encore étiquettes Kubernetes). La Cluster Map détaillée vous offre une vue d'ensemble de vos pods et clusters Kubernetes.

**Consultez [Détails du filtre de requête](#query-filter-details) pour plus de détails sur la façon de filtrer ces vues.**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer ouvert pour afficher Workloads > Replica Sets, en mode Résumé" style="width:80%;">}}

#### Grouper par fonctionnalité et facettes {#group-by-functionality-and-facets}

Regroupez les pods par tags, labels Kubernetes ou annotations Kubernetes pour obtenir une vue agrégée qui vous permet de trouver des informations plus rapidement. Vous pouvez effectuer un regroupement en utilisant la barre « Group by » en haut à droite de la page ou en cliquant sur un tag ou un label particulier et en localisant la fonction de regroupement dans le menu contextuel, comme illustré ci-dessous.

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="Un exemple de regroupement par équipe" style="width:80%;">}}

Il est également possible d'utiliser les facettes sur la partie gauche de la page pour regrouper des ressources, ou encore pour filtrer les ressources les plus importantes, comme les pods avec un statut CrashLoopBackOff.

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="Un exemple de regroupement du statut de pod CrashLoopBackOff" video=true style="width:80%;">}}

### Carte du cluster {#cluster-map}

Une carte de cluster vous donne une vue d'ensemble de vos pods et clusters Kubernetes. Vous pouvez voir toutes vos ressources ensemble sur un seul écran avec des groupes et des filtres personnalisés, et choisir les métriques pour remplir la couleur des nœuds.

Pour examiner des ressources spécifiques depuis une Cluster Map, cliquez sur un cercle ou un groupe. Les détails s'affichent alors dans un volet distinct.

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="Une carte de cluster avec des groupes et des filtres personnalisés" video=true style="width:80%;">}}

### Information panel {#information-panel}

Cliquez sur une ligne du tableau ou d'un objet dans une Cluster Map pour afficher des informations sur la ressource associée dans un volet latéral

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="Une vue des ressources dans le panneau latéral, ouvert sur les processus." style="width:80%;">}}

L'onglet {{< ui >}}YAML{{< /ui >}} du panneau latéral affiche la définition complète de la ressource. À partir de la **version 7.44.0 de l'Agent**, il inclut également sept jours d'historique des définitions. Vous pouvez comparer ce qui a changé au fil du temps et entre différentes versions. L'heure indiquée correspond approximativement au moment où les modifications ont été appliquées à la ressource.

Pour éviter de multiplier les changements inutiles, les modifications concernant uniquement les champs suivants sont ignorées :

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations[\"kubernetes.io/config.seen\"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="Une vue des ressources dans le panneau latéral, montrant la fonctionnalité d'historique yaml" style="width:80%;">}}

Les autres onglets comportent des informations supplémentaires permettant de résoudre les éventuels problèmes concernant la ressource sélectionnée :

* [**Logs**][2] : Affichez les logs de votre conteneur ou ressource. Cliquez sur n'importe quel log pour afficher les logs associés dans le Log Explorer.
* [**APM**][3] : Affichez les traces de votre conteneur ou ressource, y compris la date, le service, la durée, la méthode et le code d'état d'une trace.
* [**Metrics**][4] : Affichez les métriques en direct pour votre conteneur ou ressource. Vous pouvez afficher n'importe quel graphique en plein écran, en partager un instantané ou l'exporter depuis cet onglet.
* {{< ui >}}Processes{{< /ui >}} : Affichez tous les processus en cours d'exécution dans le conteneur de cette ressource.
* {{< ui >}}Network{{< /ui >}} : Affichez les performances réseau d'un conteneur ou d'une ressource, y compris les champs source, destination, volume envoyé et reçu, et débit. Utilisez le champ {{< ui >}}Destination{{< /ui >}} pour effectuer une recherche par tags comme `DNS` ou `ip_type`, ou utilisez le filtre {{< ui >}}Group by{{< /ui >}} dans cette vue pour regrouper les données réseau par tags, comme `pod_name` ou `service`.
* [**Événements**][5] : Affichez tous les événements Kubernetes pour votre ressource.
* {{< ui >}}Monitors{{< /ui >}} : Affichez les monitors tagués, délimités ou regroupés pour cette ressource.

Pour obtenir un dashboard détaillé de cette ressource, cliquez sur l'option View Dashboard en haut à droite de ce volet.

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="Un lien vers un dashboard pod depuis la vue d’ensemble de Live Containers." style="width:80%;">}}

### Resource Utilization {#resource-utilization}

_Pour la page Resource Utilization, consultez [Resource Utilization][6]_.

Dans l'onglet Kubernetes Explorer, vous pouvez explorer une sélection de métriques d'utilisation des ressources.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="Container Resource Utilization" style="width:80%;">}}

Toutes les colonnes de cette vue peuvent être triées, ce qui vous permet d'identifier des workloads spécifiques en fonction de leur utilisation des ressources.

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="Colonnes triées de l'utilisation des ressources du conteneur" style="width:50%;">}}

## Query filter details {#query-filter-details}

Vous pouvez filtrer les ressources affichées en fournissant une requête dans la barre de recherche Filter by, située en haut à gauche de la page.

### Syntax {#syntax}

Une requête de filtre est composée de termes et d'opérateurs. Exemple :

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Syntaxe du filtre de requête d'Orchestrator Explorer." style="width:80%;">}}

#### Terms {#terms}

Vous pouvez utiliser plusieurs types de termes :

| Type | Examples |
|---|---|
| **Tags**: Attached to resources by [the agent collecting them][7]. Il existe également des tags supplémentaires que Datadog génère pour les ressources Kubernetes. | `datacenter:staging`, `tag#datacenter:staging`<br>_(le `tag#` est facultatif)_ |
| **Labels**: Extracted from [a resource's metadata][8]. Ils sont généralement utilisés pour organiser votre cluster et cibler des ressources spécifiques avec selectors. | `label#chart_version:2.1.0` |
| **Annotations** : Extraites des [métadonnées d'une ressource][9]. Elles sont généralement utilisées pour prendre en charge des outils qui aident à la gestion du cluster. | `annotation#checksum/configmap:a1bc23d4` |
| **Metrics**: ajoutées aux ressources de workloads (pods, deployments, etc.). Vous pouvez trouver des ressources en fonction de leur utilisation. Pour voir quelles métriques sont prises en charge, consultez [Resource Utilization Filters](#resource-utilization-filters). | `metric#cpu_usage_pct_limits_avg15:>80%` |
| **String matching**: Supported by some specific resource attributes, see below.<br>_Note : string matching does not use the key-value format, and you cannot specify the attribute to match on._ | `"10.132.6.23"` (IP),<br>`"9cb4b43f-8dc1-4a0e"` (UID),<br>`web-api-3` (Nom) |
| **Champs** : Extraits des [métadonnées d'une ressource][10] ou des champs indexés des ressources personnalisées. | `field#metadata.creationTimestamp:>=4wk`, `field#metadata.deletionTimestamp:<=1hr`, `field#status.currentReplicas:3`, `field#status.conditions.Active.status:True` |

>  ***Remarque** : Vous pourriez trouver les mêmes paires clé-valeur à la fois comme tag et comme étiquette (ou annotation)a; cela dépend de la configuration de votre cluster.*

Les attributs de ressource suivants sont pris en charge dans la **Correspondance de chaîne** arbitraire :
- `metadata.name`
- `metadata.uid`
- Adresses IP trouvées dans :
  - Pods
  - Nœuds (internes et externes)
  - Services (IP de cluster, externes et d'équilibreur de charge)

Vous n'avez pas besoin de spécifier une clé pour rechercher une ressource par nom ou par IP. Les guillemets ne sont pas requis, sauf si votre recherche de chaîne inclut certains caractères spéciaux.

#### Comparators {#comparators}

Tous les termes prennent en charge l'opérateur d'égalité `:`. [Metric value](#resource-utilization-filters) terms support numeric comparisons as well:

- `:>` Greater than (for example, `metric#cpu_usage_avg15:>0.9`)
- `:>=` Greater than or equal
- `:<` Less than
- `:<=` Less than or equal

#### Operators {#operators}

Pour combiner plusieurs termes dans une requête complexe, vous pouvez utiliser l'un des opérateurs booléens suivants (sensibles à la casse) :

| Operator | Description | Example |
|---|---|---|
| `AND` | **Intersection**: Both terms are in the selected events (if nothing is added, AND is taken by default) | `a AND b`   |
| `OR` | **Union**: Either term is contained in the selected events                                             | `a OR b`   |
| `NOT` / `-` | **Exclusion**: Le terme suivant n'est PAS dans l'événement (s'applique à chaque recherche dans le texte brut) | `a AND NOT b` or<br>`a AND -b` |
|  `( )` | **Regroupement :** Spécifiez comment regrouper les termes logiquement. | `a AND (b OR c)` ou<br>`(a AND b) or c` |

##### `OR` raccourci de valeur {#or-value-shorthand}

Plusieurs termes partageant la même clé peuvent être combinés en un seul terme s'ils utilisent tous l'opérateur `OR`. Par exemple, cette requête :

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

Il est possible d'indiquer uniquement ce qui suit :

```
app_name:(web-server OR database OR event-consumer)
```

### Wildcards {#wildcards}

Vous pouvez utiliser `*` wildcards dans un terme pour filtrer par correspondances partielles, aussi bien pour values que pour keys. Quelques exemples :

- `kube_job:stats-*`: Find all resources with a `kube_deployment` tag value starting with `stats-`.
- `pod_name:*canary`: Find all resources with a `pod_name` value ending in `canary`.
- `label#release:*` : Trouver toutes les ressources avec un label `release`, quelle que soit sa valeur.
- `-label#*.datadoghq.com/*` : Trouver les ressources qui n'ont aucun Datadog scoped label.
- `kube_*:*stats*canary` : Trouver les ressources qui ont des tags de ressources associés (`kube_*`), avec `stats` au milieu de la valeur, se terminant également par `canary`.

### Tags extraits {#extracted-tags}

En plus des tags que vous avez [configurés][7] dans votre agent Datadog, Datadog injecte des tags générés basés sur les attributs des ressources qui peuvent répondre à vos besoins de recherche et de regroupement. Ces tags sont ajoutés aux ressources de manière conditionnelle, lorsqu'ils sont pertinents.

#### Toutes les ressources {#all-resources}

Toutes les ressources possèdent le tag `kube_cluster_name` et toutes les ressources avec un espace de nommage possèdent le tag `kube_namespace` qui leur est ajouté.

De plus, les ressources contiennent un tag `kube_<api_kind>:<metadata.name>`. Par exemple, un déploiement nommé `web-server-2` se verrait automatiquement attribuer le tag `kube_deployment:web-server-2`.

> **Remarque** : Il existe quelques exceptions à ce modèle :
>
> - Les pods utilisent `pod_name` à la place.
> - *VPA : `verticalpodautoscaler`*.
> - *HPA : `horizontalpodautoscaler`*.
> - *Persistent Volume Claims : `persistentvolumeclaim`*.

Selon les étiquettes appliquées à la ressource, les tags suivants sont également extraits :

| Tag | Label source |
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

#### Relations {#relationships}

Les ressources associées se verront attribuer mutuellement des tags. Quelques exemples :

- Un pod qui fait partie du déploiement « XYZ » aura un tag `kube_deployment:xyz`.
- Une ingress qui pointe vers le service « A » aura un tag `kube_service:a`.

Les ressources générées à partir de ressources « parent » auront les tags `kube_ownerref_kind` et `kube_ownerref_name` (tels que les pods et les jobs).

> **Conseil :** Utilisez la fonction de saisie semi-automatique des requêtes de filtrage pour découvrir quels tags de ressources associés sont disponibles. Saisissez `kube_` et voyez quels résultats sont suggérés.

#### Pods {#pods}

Les pods possèdent les tags suivants :

- `pod_name`
- `pod_phase` (extrait du manifeste)
- `pod_status` (calculé de la même manière que `kubectl`)

#### Workloads {#workloads}

Les ressources de workload (pods, déploiements, StatefulSets, etc.) possèdent les tags suivants, qui indiquent leur statut de prise en charge par la page Resources Utilization :

- `resource_utilization` (`supported` ou `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### Conditions {#conditions}

Certaines conditions, pour certaines ressources, sont extraites sous forme de tags. Par exemple, vous pouvez trouver le tag `kube_condition_available` sur les déploiements. Le format du tag est toujours `kube_condition_<name>` avec une valeur `true` ou `false`.

> **Conseil** : Utilisez la fonction de saisie semi-automatique pour découvrir quelles conditions sont disponibles sur un type de ressource donné en saisissant `kube_condition` et en examinant les résultats.

#### Tags spécifiques aux ressources {#resource-specific-tags}

Certaines ressources possèdent des tags spécifiques qui sont extraits en fonction de l'environnement de votre cluster. Les tags suivants sont disponibles en plus des tags partagés ci-dessus.

| Ressource | Tags extraits |
|---|---|
| **Cluster** | `api_server_version`<br>`kubelet_version` |
| **Custom Resource Definitions** &<br>**Custom Resources** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **Namespace** | `phase` |
| **Nœud** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Volume persistant** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Réclamation de volume persistant** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (au lieu de `kube_pod`)<br>`pod_phase` (extrait du manifeste)<br>`pod_status` (calculé de manière similaire à `kubectl`) |
| **Service** | `kube_service_type`<br>`kube_service_port` |

### Filtres d'utilisation des ressources {#resource-utilization-filters}

Des métriques d'utilisation de ressources sont appliquées aux ressources de workload suivantes :

- Clusters
- Nœuds
- Pods

Ces métriques sont calculées au moment de la collecte, sur la base des valeurs moyennes des 15 dernières minutes. Vous pouvez filtrer par valeurs de métrique comme suit : `metric#<metric_name><comparator><numeric_value>`.

- `metric_name` est une métrique disponible (voir ci-dessous)
- `comparator` est un [comparateur pris en charge](#comparator)
- et `numeric_value` est une valeur à virgule flottante.

Pour les Pods, les noms de métriques suivants sont disponibles :

| CPU | Mémoire |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

De plus, les métriques suivantes sont disponibles pour les clusters et nœuds :

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### Unités de mesure {#metric-units}

Les métriques relatives au CPU sont stockées en tant que nombre de cœurs.

Les métriques relatives à la mémoire sont stockées en tant qu'octets.

Les pourcentages (`*_pct_*`) sont stockés sous forme de nombres à virgule flottante, où `0.0` correspond à 0% et `1.0` correspond à 100%. La valeur est le rapport des deux métriques indiquées - par exemple, `cpu_usage_pct_limits_avg15` est la valeur de `usage / limits`. Les valeurs des métriques peuvent être supérieures à 100%, comme le pourcentage d'utilisation du processeur par les requêtes.

## Remarques et problèmes connus {#notes-and-known-issues}

* Les données sont mises à jour automatiquement à intervalles constants.
* Dans les clusters avec plus de 1000 déploiements ou ReplicaSets, vous pourriez remarquer une utilisation accrue du processeur par le Cluster Agent. Il existe une option pour désactiver le nettoyage des conteneurs dans le chart Helm. Consultez [le dépôt du chart Helm][11] pour plus de détails.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /fr/logs
[3]: /fr/tracing
[4]: /fr/metrics
[5]: /fr/events
[6]: /fr/infrastructure/containers/kubernetes_resource_utilization
[7]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[8]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[9]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
[11]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog