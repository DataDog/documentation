---
aliases:
  - /integrations/amazon_eks_fargate/
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - aws
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/eks_fargate/README.md'
description: "Recueillez vos métriques, traces et logs Amazon\_EKS."
display_name: "EKS\_Fargate"
git_integration_title: eks_fargate
guid: e9e58fb9-696b-4e3c-9058-c144a1d9a737
integration_id: eks-fargate
integration_title: "EKS\_Fargate"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: eks.fargate.
metric_to_check: eks.fargate.pods.running
name: eks_fargate
public_title: "Intégration Datadog/EKS\_Fargate"
short_description: "Recueillez vos métriques, traces et logs Amazon\_EKS."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Amazon EKS sur AWS Fargate est un service Kubernetes géré qui permet d'automatiser certains aspects du déploiement et de la maintenance de n'importe quel environnement Kubernetes standard. Les nœuds Kubernetes sont gérés par AWS Fargate, les utilisateurs n'ont donc plus besoin de s'en occuper.

## Configuration

Ces étapes décrivent comment configurer l'Agent Datadog dans un conteneur au sein d'Amazon EKS sur AWS Fargate. Consultez la [documentation relative à l'intégration Datadog/Amazon EKS][1] si vous n'utilisez pas AWS Fargate.

Les pods AWS Fargate ne sont pas des pods physiques. Ils excluent donc les [checks système basés sur des hosts][2], comme les checks liés au processeur, à la mémoire, etc. Pour recueillir des données à partir de vos pods AWS Fargate, vous devez exécuter l'Agent en tant que sidecar du pod de votre application avec un RBAC personnalisé. Cette configuration vous permet de bénéficier des fonctionnalités suivantes :

* Collecte de métriques Kubernetes à partir du pod exécutant les conteneurs de votre application et l'Agent
* [Autodiscovery][3]
* Configuration de checks custom d'Agent pour cibler les conteneurs dans le même pod
* APM et DogStatsD pour les conteneurs dans un même pod

### Nœud EC2

Si vous ne spécifiez pas, via le [profil AWS Fargate][4], que vos pods doivent s'exécuter sur Fargate, ils peuvent avoir recours à des machines EC2 classiques. Dans ce cas, consultez la [configuration de l'intégration Datadog/Amazon EKS][5] pour recueillir des données à partir des machines. Cette collecte passe par l'exécution de l'Agent en tant que charge de travail EC2. La configuration de l'Agent est identique à [celle de l'Agent Kubernetes][6] et vous disposez de l'ensemble des options. Pour déployer l'Agent sur des nœuds EC2, utilisez la [configuration DaemonSet pour l'Agent Datadog][7].

### Installation

Pour accroître votre visibilité lors de la surveillance de charges de travail dans AWS EKS Fargate, installez les intégrations Datadog pour :

* [Kubernetes][8]
* [AWS][9]
* [EKS][10]
* [EC2][11] (si vous exécutez un nœud de type EC2)

Configurez également des intégrations pour tout autre service AWS que vous exécutez avec EKS (par exemple, [ELB][12]).

#### Installation manuelle

Pour procéder à l'installation, téléchargez l'image de l'Agent personnalisé `datadog/agent`.

Si l'Agent s'exécute en tant que sidecar, il peut communiquer uniquement avec des conteneurs sur le même pod. Exécutez donc un Agent pour chaque pod que vous souhaitez surveiller.

### Configuration

Pour recueillir des données à partir de vos applications qui s'exécutent dans AWS EKS Fargate sur un nœud Fargate, suivez les étapes suivantes :

* [Configurez des règles RBAC AWS EKS Fargate](#rbac-aws-eks-fargate).
* [Déployez l'Agent en tant que sidecar](#execution-de-l-agent-en-tant-que-side-car).
* Configurez la collecte de [métriques](#collecte-de-metriques), d'[événements](#collecte-d-evenements) et de [traces](#collecte-de-traces).

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

Pour commencer à recueillir les données de votre pod Fargate, déployez l'Agent Datadog en tant que sidecar de votre application. Vous trouverez ci-dessous la configuration minimale requise pour recueillir des métriques à partir de votre application s'exécutant dans le pod. Vous remarquerez que nous avons ajouté `DD_EKS_FARGATE=true` dans le manifeste pour déployer le sidecar de votre Agent Datadog.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
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
     ## Exécution de l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de votre Agent au site européen de Datadog
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

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][13].

## Collecte de métriques

### Métriques des intégrations
​
Utilisez les [étiquettes Autodiscovery avec le conteneur de votre application][14] pour commencer à recueillir ses métriques pour les [intégrations d'Agent prises en charge][15].
​
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
 replicas: 1
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
     ## Exécution de l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de votre Agent au site européen de Datadog
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

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][13].

### DogStatsD

Configurez le port de conteneur `8125` pour votre conteneur d'Agent afin d'envoyer des [métriques DogStatsD][16] à Datadog depuis le conteneur de votre application.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
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
     ## Exécution de l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Activation du port 8125 pour la collecte de métriques DogStatsD
       ports:
        - containerPort: 8125
          name: dogstatsdport
          protocol: UDP
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de votre Agent au site européen de Datadog
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

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][13].

## Collecte de traces

Configurez le port de conteneur `8126` pour votre conteneur d'Agent afin de recueillir des traces à partir du conteneur de votre application. [En savoir plus sur la configuration du tracing][17].

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<NOM_APPLICATION>"
 namespace: default
spec:
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
     ## Exécution de l'Agent en tant que sidecar
     - image: datadog/agent
       name: datadog-agent
       ## Activation du port 8126 pour la collecte de traces
       ports:
        - containerPort: 8126
          name: traceport
          protocol: TCP
       env:
       - name: DD_API_KEY
         value: "<VOTRE_CLÉ_API_DATADOG>"
         ## Définir DD_SITE sur « datadoghq.eu » pour envoyer les
         ## données de votre Agent au site européen de Datadog
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

**Remarque** : n'oubliez pas de remplacer `<VOTRE_CLÉ_API_DATADOG>` par la [clé d'API Datadog de votre organisation][13].

## Collecte d'événements

Pour recueillir des événements depuis votre serveur d'API AWS EKS Fargate, exécutez un Agent de cluster Datadog sur un pod AWS EKS EC2 dans votre cluster Kubernetes :

1. [Configurez l'Agent de cluster Datadog][18].
2. [Activez la collecte d'événements pour votre Agent de cluster][19].

Outre la configuration de l'Agent de cluster Datadog, vous pouvez également choisir de déployer des exécuteurs de checks de cluster afin de faciliter leur activation.

**Remarque** : vous pouvez également recueillir des événements si vous exécutez l'Agent de cluster Datadog dans un pod dans Fargate.

## Données collectées

### Métriques

Le check eks_fargate envoie une métrique de pulsation `eks.fargate.pods.running` avec les tags `pod_name` et `virtual_node`. Cela vous permet de surveiller le nombre de pods en cours d'exécution.

### Checks de service

eks_fargate n'inclut aucun check de service.

### Événements

eks_fargate n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][20].

[1]: http://docs.datadoghq.com//integrations/amazon_eks/
[2]: http://docs.datadoghq.com//integrations/system
[3]: http://docs.datadoghq.com//agent/autodiscovery
[4]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[5]: http://docs.datadoghq.com/integrations/amazon_eks/#setup
[6]: http://docs.datadoghq.com/agent/kubernetes
[7]: http://docs.datadoghq.com/agent/kubernetes/daemonset_setup
[8]: https://app.datadoghq.com/account/settings#integrations/kubernetes
[9]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[10]: https://app.datadoghq.com/account/settings#integrations/amazon-eks
[11]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2
[12]: http://docs.datadoghq.com/integrations/kubernetes
[13]: https://app.datadoghq.com/account/settings#api
[14]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[15]: https://docs.datadoghq.com/fr/integrations/#cat-autodiscovery
[16]: https://docs.datadoghq.com/fr/developers/dogstatsd
[17]: http://docs.datadoghq.com/tracing/setup
[18]: http://docs.datadoghq.com/agent/cluster_agent/setup
[19]: http://docs.datadoghq.com/agent/cluster_agent/event_collection
[20]: https://docs.datadoghq.com/fr/help


