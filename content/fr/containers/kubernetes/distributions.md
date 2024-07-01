---
aliases:
- /fr/agent/kubernetes/distributions
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillir les traces de vos applications
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recueillir vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recueillir automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuer des tags à toutes les données envoyées par un conteneur
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Suivre Tanzu Kubernetes Grid sur vSphere
title: Distributions Kubernetes
---

## Présentation

Cette section présente les particularités des principales distributions Kubernetes et propose des modèles de configuration dont vous pouvez vous servir comme de point de départ. Chacune de ces configurations peut être personnalisée afin d'intégrer des fonctionnalités Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

Aucune configuration particulière n'est requise.

Si vous utilisez le système d'exploitation AWS Bottlerocket sur vos nœuds, ajoutez ce qui suit pour activer la surveillance des conteneurs (check `containerd`) :

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

L'intégration `Kubelet` nécessite une configuration spécifique afin de prendre en charge les certificats AKS.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  kubelet:
    tlsVerify: false # Obligatoire à partir de l'Agent 7.35. Voir la section Remarques.
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    kubelet:
      tlsVerify: false # Obligatoire à partir de l'Agent 7.35. Voir la section Remarques.
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}

**Remarques** :

- Depuis la version 7.35 de l'Agent, `tlsVerify: false` est requis, car aucun autre nom de l'objet (Subject Alternative Name ou SAN) n'est défini pour les certificats Kubelet dans AKS.

- Avec certaines configurations, il est possible que la résolution DNS pour `spec.nodeName` dans les nœuds ne fonctionne pas dans AKS. Ce problème a été signalé sur tous les nœuds AKS Windows, et lorsque le cluster est configuré dans un réseau virtuel avec un DNS personnalisé sur des nœuds Linux. Dans ce cas, vous devez **impérativement** supprimer le champ `agent.config.kubelet.host` (valeur par défaut : `status.hostIP`) et utiliser `tlsVerify: false`. La variable d'environnement `DD_KUBELET_TLS_VERIFY=false` résout également ce problème. Ces deux méthodes permettent de désactiver la vérification du certificat du serveur.

  ```yaml
  env:
    - name: DD_KUBELET_TLS_VERIFY
      value: "false"
  ```
- La fonctionnalité Contrôleur d'admission sur AKS nécessite d'ajouter des sélecteurs pour éviter une erreur lors du rapprochement du webhook :

```yaml
clusterAgent:
  env:
    - name: "DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS"
      value: "true"
```

## Google Kubernetes Engine (GKE) {#GKE}

Il est possible de configurer deux modes d'opération pour GKE :

- **Standard** : vous gérez l'infrastructure sous-jacente du cluster, ce qui vous fournit une plus grande flexibilité pour la configuration des nœuds.
- **Autopilot** : GKE provisionne et gère toute l'infrastructure sous-jacente du cluster, y compris les nœuds et les pools de nœuds. Vous disposez ainsi d'un cluster optimisé pour un fonctionnement autonome.

Vous devez adapter la configuration de l'Agent Datadog en fonction du mode d'opération de votre cluster.

### Standard

Depuis la version 7.26 de l'Agent, aucune spécification spécifique n'est requise pour le mode Standard de GKE (que vous utilisiez `Docker` ou `containerd`).

**Remarque** : si vous utilisez COS (Container Optimized OS), les checks `OOM Kill` et `TCP Queue Length` basés sur eBPF sont pris en charge à partir de la version 3.0.1 du chart Helm. Pour activer ces checks, configurez le paramètre suivant :
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` sur `false`.

### Autopilot

Le mode Autopilot de GKE requiert une configuration précise, indiquée ci-dessous.

Datadog vous conseille de spécifier des limites de ressources pour le conteneur de l'Agent. La limite par défaut d'Autopilot est relativement basse (50 mCPU et 100 Mi pour la mémoire) et peut rapidement entraîner l'OOMKill du conteneur de l'Agent, en fonction de votre environnement. Le cas échéant, définissez d'autres limites de ressources pour les conteneurs de l'Agent de trace et de l'Agent de processus.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>

  # Activer le nouveau check `kubernetes_state_core`.
  kubeStateMetricsCore:
    enabled: true
  # Éviter de déployer le chart kube-state-metrics.
  # Le nouveau `kubernetes_state_core` ne nécessite plus le déploiement de kube-state-metrics.
  kubeStateMetricsEnabled: false

agents:
  containers:
    agent:
      # Ressources pour le conteneur de l'Agent
      resources:
        requests:
          cpu: 200m
          memory: 256Mi
        limits:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # Ressources pour le conteneur de l'Agent de trace
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
        limits:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # Ressources pour le conteneur de l'Agent de processus
      resources:
        requests:
          cpu: 100m
          memory: 200Mi
        limits:
          cpu: 100m
          memory: 200Mi

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift est doté par défaut d'une sécurité renforcée (SELinux et SecurityContextConstraints) et nécessite donc une configuration particulière :
- Créez une SCC pour l'Agent de nœud et l'Agent de cluster.
- Indiquez le chemin du socket CRI, car OpenShift utilise le runtime de conteneur CRI-O.
- Il arrive que les certificats d'API Kubelet ne soient pas signés par l'autorité de certification du cluster.
- Vous devez définir des tolérances pour planifier l'Agent de nœud sur les nœuds `master` et `infra`.
- Le nom du cluster doit être défini et ne peut pas être récupéré automatiquement à partir du fournisseur de cloud.

Cette configuration est disponible pour OpenShift 3.11 et 4, mais est optimisée pour OpenShift 4.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
  criSocketPath: /var/run/crio/crio.sock
  # Selon votre configuration DNS/SSL, il n'est pas forcément possible de vérifier correctement le certificat.
  # Si vous utilisez une autorité de certification adéquate, vous pouvez définir ce paramètre sur true.
  kubelet:
    tlsVerify: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
  - effect: NoSchedule
    key: node-role.kubernetes.io/infra
    operator: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
kube-state-metrics:
  securityContext:
    enabled: false
```

{{% /tab %}}
{{% tab "Operator" %}}

Si vous utilisez l'Operator Datadog dans OpenShift, il est conseillé de l'installer par l'intermédiaire d'OperatorHub ou du Marketplace Redhat. La configuration ci-dessous a été conçue pour un environnement où l'Agent est installé dans le même espace de nommage que l'Operator Datadog (en raison des paramètres SCC/ServiceAccount).

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
      port: 8443
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
    kubelet:
      tlsVerify: false
    criSocketPath: /var/run/crio/crio.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

{{% /tab %}}
{{< /tabs >}}

## Rancher {#Rancher}

Les installations Rancher sont semblables aux installations Kubernetes de base. Leur configuration requiert uniquement quelques ajustements :
- Vous devez définir des tolérances pour planifier l'Agent de nœud sur les nœuds `controlplane` et `etcd`.
- Le nom du cluster doit être défini et ne peut pas être récupéré automatiquement à partir du fournisseur de cloud.

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  clusterName: <NOM_CLUSTER>
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/controlplane
    operator: Exists
  - effect: NoExecute
    key: node-role.kubernetes.io/etcd
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    clusterName: <NOM_CLUSTER>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

Aucune configuration particulière n'est requise.

Pour activer la surveillance des conteneurs, ajoutez ce qui suit (check `containerd`) :

{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <CLÉ_API_DATADOG>
      appKey: <CLÉ_APPLICATION_DATADOG>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

Le [référentiel helm-charts][1] contient d'autres exemples de fichier `values.yaml`. Le [référentiel datadog-operator][2] contient d'autres exemples de `DatadogAgent`.

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG nécessite quelques légères modifications de la configuration, visibles ci-dessous. Par exemple, il est nécessaire de configurer une tolérance pour que le contrôleur planifie l'Agent de nœud sur les nœuds `master`.


{{< tabs >}}
{{% tab "Helm" %}}

`values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <CLÉ_API_DATADOG>
  appKey: <CLÉ_APPLICATION_DATADOG>
  kubelet:
    # Définir tlsVerify sur false étant donné que les certificats Kubelet sont autosignés
    tlsVerify: false
  # Désactiver l'installation du chart de la dépendance `kube-state-metrics`.
  kubeStateMetricsEnabled: false
  # Activer le nouveau check `kubernetes_state_core`.
  kubeStateMetricsCore:
    enabled: true
# Ajouter une tolérance pour que l'Agent puisse être planifié sur les nœuds du plan de contrôle.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}
{{% tab "Operator" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      # Activer le nouveau check `kubernetes_state_core`.
      enabled: true
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      # Définir tlsVerify sur false étant donné que les certificats Kubelet sont autosignés
      tlsVerify: false
  override:
    nodeAgent:
      # Ajouter une tolérance pour que l'Agent puisse être planifié sur les nœuds du plan de contrôle.
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1