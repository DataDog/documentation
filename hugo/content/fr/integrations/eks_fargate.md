---
app_id: eks-fargate
app_uuid: f5919a4b-4142-4889-b9c0-6ecdab299ebb
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: eks.fargate.pods.running
      metadata_path: metadata.csv
      prefix: eks.fargate.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: EKS Fargate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- cloud
- aws
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md
display_on_public_website: true
draft: false
git_integration_title: eks_fargate
integration_id: eks-fargate
integration_title: Amazon EKS sur AWS Fargate
integration_version: 3.1.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: eks_fargate
public_title: Amazon EKS sur AWS Fargate
short_description: Recueillez vos métriques, traces et logs Amazon EKS.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Cloud
  - Category::AWS
  - Category::Log Collection
  configuration: README.md#Setup
  description: Recueillez vos métriques, traces et logs Amazon EKS.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon EKS sur AWS Fargate
---



## Présentation

**Remarque** : cette page décrit le fonctionnement de l'intégration EKS Fargate. Pour ECS Fargate, consultez la [section dédiée][1] de la documentation Datadog.

Amazon EKS sur AWS Fargate est un service Kubernetes géré qui permet d'automatiser certains aspects du déploiement et de la maintenance de n'importe quel environnement Kubernetes standard. Les nœuds Kubernetes sont gérés par AWS Fargate, les utilisateurs n'ont donc plus besoin de s'en occuper.

## Configuration

Ces étapes décrivent comment configurer l'Agent Datadog 7.17 ou ultérieur dans un conteneur au sein d'Amazon EKS sur AWS Fargate. Consultez la [documentation relative à l'intégration Datadog/Amazon EKS][2] si vous n'utilisez pas AWS Fargate.

Les pods AWS Fargate ne sont pas des pods physiques. Ils excluent donc les [checks système basés sur des hosts][3], comme les checks liés au processeur, à la mémoire, etc. Pour recueillir des données à partir de vos pods AWS Fargate, vous devez exécuter l'Agent en tant que sidecar du pod de votre application avec un RBAC personnalisé. Cette configuration vous permet de bénéficier des fonctionnalités suivantes :

- Collecte de métriques Kubernetes à partir du pod exécutant les conteneurs de votre application et l'Agent
- [Autodiscovery][4]
- Configuration de checks d'Agent custom pour cibler les conteneurs dans un même pod
- APM et DogStatsD pour les conteneurs dans un même pod

### Nœud EC2

Si vous ne spécifiez pas via le [profil AWS Fargate][5] que vos pods doivent s'exécuter sur Fargate, ils peuvent alors s'exécuter sur des machines EC2 classiques. Dans ce cas, consultez la [configuration de l'intégration Datadog/Amazon EKS][6] pour recueillir des données à partir de ces machines. Vous devrez exécuter l'Agent en tant que workload EC2. La configuration de l'Agent est identique à [celle de l'Agent Kubernetes][7], et vous disposez des mêmes options. Pour déployer l'Agent sur des nœuds EC2, utilisez la [configuration DaemonSet pour l'Agent Datadog][8].

### Installation

Pour accroître votre visibilité lors de la surveillance de workloads dans AWS EKS Fargate, installez les intégrations Datadog pour :

- [Kubernetes][9]
- [AWS][10]
- [EKS][11]
- [EC2][12] (si vous exécutez un nœud de type EC2)

Configurez également les intégrations des autres services AWS que vous exécutez avec EKS (par exemple, [ELB][13]).

#### Installation manuelle

Pour procéder à l'installation, téléchargez la version 7.17 ou une version ultérieure de l'image de l'Agent personnalisé `datadog/agent`.

Si l'Agent s'exécute en tant que sidecar, il peut communiquer uniquement avec des conteneurs sur le même pod. Exécutez donc un Agent pour chaque pod que vous souhaitez surveiller.

### Configuration

Pour recueillir des données à partir de vos applications qui s'exécutent dans AWS EKS Fargate sur un nœud Fargate, suivez les étapes suivantes :

- [Configurez des règles RBAC AWS EKS Fargate](#rbac-aws-eks-fargate).
- [Déployez l'Agent en tant que sidecar](#execution-de-l-agent-en-tant-que-sidecar).
- Configurez la collecte de [métriques](#collecte-de-metriques), de [logs](#collecte-de-logs), d'[événements](#collecte-d-evenements) et de [traces](#collecte-de-traces) Datadog.

Pour que vos conteneurs EKS Fargate s'affichent dans la vue Live Container de Datadog, activez `shareProcessNamespace` dans les spécifications de votre pod. Consultez la section [Collecte de processus](#collecte-de-processus).

#### RBAC AWS EKS Fargate

Utilisez le RBAC d'Agent suivant lors du déploiement de l'Agent en tant que sidecar dans AWS EKS Fargate :

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-agent
rules:
  - apiGroups:
    - ""
    resources:
    - nodes
    - namespaces
    verbs:
    - get
    - list
  - apiGroups:
      - ""
    resources:
      - nodes/metrics
      - nodes/spec
      - nodes/stats
      - nodes/proxy
      - nodes/pods
      - nodes/healthz
    verbs:
      - get
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-agent
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-agent
subjects:
  - kind: ServiceAccount
    name: datadog-agent
    namespace: default
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: datadog-agent
  namespace: default
```

#### Exécution de l'Agent en tant que sidecar

Pour commencer à recueillir les données de votre pod Fargate, déployez la version 7.17 ou une version ultérieure de l'Agent Datadog en tant que sidecar de votre application. Vous trouverez ci-dessous la configuration minimale requise pour recueillir des métriques à partir de votre application s'exécutant dans le pod. Vous remarquerez que nous avons ajouté `DD_EKS_FARGATE=true` dans le manifeste pour déployer le sidecar de votre Agent Datadog.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
 selector:
   matchLabels:
     app: "<NOM_APPLICATION>"
 replicas: 1
 template:
   metadata:
     labels:
       app: "<NOM_APPLICATION>"
     name: "<NOM_POD>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<NOM_APPLICATION>"
       image: "<IMAGE_APPLICATION>"
     ## Exécuter l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les données
         ## de l'Agent au site européen de Datadog
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_CLUSTER_NAME
         value: "<NOM_CLUSTER>"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][14].

**Remarque** : ajoutez le tag `kube_cluster_name:<NOM_CLUSTER>` de votre choix à la liste des `DD_TAGS` pour veiller à ce que votre cluster soit ajouté aux métriques en tant que tag. Vous pouvez ajouter des tags supplémentaires à la liste en utilisant le format `<KEY>:<VALUE>` et en les séparant par des espaces. Pour les versions `7.34+` et `6.34+` de l'Agent, cette opération n'est pas requise : vous pouvez à la place définir la variable d'environnement `DD_CLUSTER_NAME`.

#### Exécuter l'Agent de cluster ou l'exécuteur de checks de cluster

Datadog vous conseille d'exécuter l'Agent de cluster pour bénéficier de fonctionnalités comme la [collecte d'événements][15], la [vue Ressources Kubernetes][16] et les [checks de cluster][17].

Avec EKS Fargate, vous pouvez faire en sorte que le cluster EKS exécute ou non des workloads mixtes (avec des charges Fargate et d'autres natures).

Si le cluster EKS exécute des workloads mixtes, et que vous souhaitez surveiller les workloads autres que Fargate par l'intermédiaire du DaemonSet de l'Agent de nœud, ajoutez l'Agent de cluster ou l'exécuteur de checks de cluster à ce déploiement. Pour en savoir plus, consultez la section [Configuration de l'Agent de cluster][18].

Les tâches Fargate que vous souhaitez surveiller doivent pouvoir accéder au token de l'Agent de cluster. Si votre configuration repose sur le chart Helm ou sur l'Operator Datadog, par défaut, le token n'est pas accessible, car un secret est créé dans l'espace de nommage cible.

Il existe deux solutions pour garantir l'accès du token :

* Codez en dur la valeur du token (avec `clusterAgent.token` dans Helm ou avec `credentials.token` dans l'Operator Datadog). Cette approche est simple, mais moins sécurisée. 
* Créez manuellement un secret (avec `clusterAgent.tokenExistingSecret` dans Helm ; cette option n'est pas disponible pour l'Operator Datadog) et répliquez-le dans tous les espaces de nommage où les tâches Farfate doivent être surveillées. Cette solution est plus sécurisée, mais nécessite des opérations supplémentaires.

Si le cluster EKS exécute seulement des workloads Fargate, un déploiement autonome de l'Agent de cluster est nécessaire. Comme décrit ci-dessus, vous devez également choisir l'une des deux options pour que le token soit accessible.

Utilisez le fichier `values.yaml` Helm suivant :

```yaml
datadog:
  apiKey: <VOTRE_CLÉ_API_DATADOG>
  clusterName: <NOM_CLUSTER>
agents:
  enabled: false
clusterAgent:
  enabled: true
  replicas: 2
```


Pour les deux types de scénarios (mixte ou non), vous devez modifier le manifeste du sidecar de l'Agent Datadog afin d'activer les communications avec l'Agent de cluster :

```yaml
       env:
        - name: DD_CLUSTER_AGENT_ENABLED
          value: "true"
        - name: DD_CLUSTER_AGENT_AUTH_TOKEN
          value: <value du token codée en dur> # Définir valueFrom: si vous utilisez un secret
        - name: DD_CLUSTER_AGENT_URL
          value: https://<NOM_SERVICE_AGENT_CLUSTER>.<ESPACE_DE_NOMMAGE_SERVICE_AGENT_CLUSTER>.svc.cluster.local:5005
        - name: DD_ORCHESTRATOR_EXPLORER_ENABLED # Obligatoire pour utiliser la vue Ressources Kubernetes
          value: "true"
        - name: DD_CLUSTER_NAME
          value: <NOM_CLUSTER>
```

## Collecte de métriques

### Métriques des intégrations

Utilisez les [étiquettes Autodiscovery avec le conteneur de votre application][19] pour commencer à recueillir ses métriques pour les [intégrations d'Agent prises en charge][20].​

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
      app: "<NOM_APPLICATION>"
 template:
   metadata:
     labels:
       app: "<NOM_APPLICATION>"
     name: "<NOM_POD>"
     annotations:
      ad.datadoghq.com/<NOM_CONTENEUR>.check_names: '[<NOM_CHECK>]'
      ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.init_configs: '[<CONFIG_INIT>]'
      ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.instances: '[<CONFIG_INSTANCE>]'
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<NOM_APPLICATION>"
       image: "<IMAGE_APPLICATION>"
     ## Exécuter l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de l'Agent au site européen de Datadog
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Remarques** :

- N'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][14].
- Les métriques de conteneur ne sont pas disponibles dans Fargate. En effet, il est impossible de monter le volume `cgroups` du host sur l'Agent. La vue [Live Containers][21] indique la valeur 0 pour le CPU et la mémoire.

### DogStatsD

Configurez le port de conteneur `8125` pour votre conteneur d'Agent afin d'envoyer des [métriques DogStatsD][22] à Datadog depuis le conteneur de votre application.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
 replicas:  1
 selector:
 matchLabels:
    app: "<NOM_APPLICATION>"
 template:
   metadata:
     labels:
       app: "<NOM_APPLICATION>"
     name: "<NOM_POD>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<NOM_APPLICATION>"
       image: "<IMAGE_APPLICATION>"
     ## Exécuter l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Activer le port 8125 pour la collecte de métriques DogStatsD
       ports:
        - containerPort: 8125
          name: dogstatsdport
          protocol: UDP
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de l'Agent au site européen de Datadog
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][14].

### Live containers

L'intégration EKS Fargate prend en charge les live containers avec l'Agent Datadog 6.19+. Les live containers s'affichent sur la page [Containers][21].

### Live processes

L'intégration EKS Fargate prend en charge les live processes avec l'Agent Datadog 6.19+. Les live processes s'affichent sur la page [Processes][23]. Pour les activer, [activez shareProcessNamespace dans la spécification du pod][24].

### Vue Ressources Kubernetes

Pour recueillir les vues Ressources Kubernetes, vous devez [configurer l'Agent de cluster](#executer-l-agent-de-cluster-ou-l-executeur-de-checks-de-cluster).

## Collecte de logs

### Collecte de logs depuis EKS sur Fargate avec Fluent Bit.

Afin de surveiller les logs EKS Fargate, utilisez [Fluent Bit][25] pour acheminer les logs EKS vers CloudWatch Logs, puis le [Forwarder Datadog][26] pour transmettre les logs à Datadog.

1. Pour configurer Fluent Bit de façon à envoyer des logs vers CloudWatch, créez une ConfigMap Kubernetes en spécifiant CloudWatch Logs comme sortie. La ConfigMap indique le groupe de logs, la région et la chaîne de préfixe, et précise s'il faut créer automatiquement ou non le groupe de logs.

   ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
      name: aws-logging
      namespace: aws-observability
    data:
      output.conf: |
        [OUTPUT]
            Name cloudwatch_logs
            Match   *
            region us-east-1
            log_group_name awslogs-https
            log_stream_prefix awslogs-firelens-example
            auto_create_group true
   ```
2. Utilisez le [Forwarder Datadog][26] pour recueillir des logs à partir de CloudWatch et les envoyer à Datadog.

## Collecte de traces

Configurez le port de conteneur `8126` pour votre conteneur d'Agent afin de recueillir des traces à partir du conteneur de votre application. [En savoir plus sur la configuration du tracing][27].

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
 replicas: 1
selector:
 matchLabels:
     app: "<NOM_APPLICATION>"
 template:
   metadata:
     labels:
       app: "<NOM_APPLICATION>"
     name: "<NOM_POD>"
   spec:
     serviceAccountName: datadog-agent
     containers:
     - name: "<NOM_APPLICATION>"
       image: "<IMAGE_APPLICATION>"
     ## Exécuter l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Activer le port 8126 pour la collecte de traces
       ports:
        - containerPort: 8126
          name: traceport
          protocol: TCP
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de l'Agent au site européen de Datadog
       - name: DD_SITE
         value: "datadoghq.com"
       - name: DD_EKS_FARGATE
         value: "true"
       - name: DD_APM_ENABLED
         value: "true"
       - name: DD_KUBERNETES_KUBELET_NODENAME
         valueFrom:
           fieldRef:
             apiVersion: v1
             fieldPath: spec.nodeName
      resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][14].

## Collecte d'événements

Pour recueillir des événements depuis le serveur d'API AWS EKS Fargate, exécutez un [Agent de cluster Datadog dans votre cluster EKS](#executer-l-agent-de-cluster-ou-l-executeur-de-checks-de-cluster) et [activez la collecte d'événements pour votre Agent de cluster][21].

Outre la configuration de l'Agent de cluster Datadog, vous pouvez également choisir de déployer des exécuteurs de checks de cluster afin de faciliter leur activation.

**Remarque** : vous pouvez également recueillir des événements si vous exécutez l'Agent de cluster Datadog dans un pod dans Fargate.

## Collecte de processus

Les Agents 6.19+/7.19+ prennent en charge la [collecte de processus][28]. Activez `shareProcessNamespace` dans les spécifications de pod pour recueillir tous les processus exécutés sur votre pod Fargate. Exemple :

```
apiVersion: v1
kind: Pod
metadata:
  name: <NOM>
spec:
  shareProcessNamespace: true
...
```

**Remarque** : les métriques de CPU et de mémoire ne sont pas disponibles.

## Données collectées

### Métriques

Le check eks_fargate envoie une métrique de pulsation `eks.fargate.pods.running` avec les tags `pod_name` et `virtual_node`. Cela vous permet de surveiller le nombre de pods en cours d'exécution.

### Checks de service

eks_fargate n'inclut aucun check de service.

### Événements

eks_fargate n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][23].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Métriques clés pour la surveillance d'AWS Fargate][29]
- [Comment recueillir des métriques et des logs à partir de workloads AWS Fargate][30]
- [Surveillance d'AWS Fargate avec Datadog][31]

[1]: http://docs.datadoghq.com/integrations/ecs_fargate/
[2]: http://docs.datadoghq.com/integrations/amazon_eks/
[3]: http://docs.datadoghq.com/integrations/system
[4]: https://docs.datadoghq.com/fr/getting_started/agent/autodiscovery/
[5]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[6]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[7]: http://docs.datadoghq.com/agent/kubernetes
[8]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[9]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[12]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[13]: http://docs.datadoghq.com/integrations/kubernetes
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://docs.datadoghq.com/fr/agent/kubernetes/?tab=helm#event-collection
[16]: https://docs.datadoghq.com/fr/infrastructure/livecontainers/#kubernetes-resources-view
[17]: https://docs.datadoghq.com/fr/agent/cluster_agent/clusterchecks/#overview
[18]: http://docs.datadoghq.com/agent/cluster_agent/setup/
[19]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[20]: https://docs.datadoghq.com/fr/integrations/#cat-autodiscovery
[21]: https://app.datadoghq.com/containers
[22]: http://docs.datadoghq.com/tracing/setup
[23]: https://app.datadoghq.com/process
[24]: https://kubernetes.io/docs/tasks/configure-pod-container/share-process-namespace/
[25]: https://aws.amazon.com/blogs/containers/fluent-bit-for-amazon-eks-on-aws-fargate-is-here/
[26]: https://docs.datadoghq.com/fr/serverless/libraries_integrations/forwarder/
[27]: http://docs.datadoghq.com/tracing/#send-traces-to-datadog
[28]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#process-collection
[29]: https://www.datadoghq.com/blog/aws-fargate-metrics/
[30]: https://www.datadoghq.com/blog/tools-for-collecting-aws-fargate-metrics/
[31]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/