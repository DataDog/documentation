---
aliases:
- /fr/agent/kubernetes/distributions
description: Instructions d'installation et de configuration spécifiques à la plateforme
  pour l'Agent Datadog sur diverses distributions Kubernetes
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

Cette section vise à documenter les spécificités et à fournir une bonne configuration de base pour toutes les principales distributions Kubernetes.
Ces configurations peuvent ensuite être personnalisées pour ajouter n'importe quelle fonctionnalité Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

Aucune configuration particulière n'est requise.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Dans un cluster EKS, vous pouvez installer l'opérateur en utilisant [Helm][1] ou en tant qu'[add-on EKS][2].

La configuration ci-dessous est conçue pour fonctionner avec les deux configurations (Helm ou add-on EKS) lorsque l'Agent est installé dans le même espace de nommage que l'opérateur Datadog.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
```

[1]:/fr/containers/kubernetes/installation/?tab=datadogoperator
[2]: /fr/agent/guide/operator-eks-addon

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

### Contrôleur d'admission
La fonctionnalité [contrôleur d'admission][1] facultative nécessite une configuration spécifique pour éviter une erreur lors de la réconciliation du webhook.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

Remplacez `<DATADOG_SITE>` par votre [site Datadog][1]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le SITE correct pour votre compte est sélectionné à droite de cette page).

[1]: /fr/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

L'option `providers.aks.enabled` définit la variable d'environnement nécessaire `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` pour vous.

{{% /tab %}}
{{< /tabs >}}

### Rotation des certificats de service Kubelet
Si votre cluster **n'a pas** la [rotation des certificats de service Kubelet][13] activée, vous devez fournir une configuration supplémentaire pour permettre à l'Agent Datadog de se connecter au Kubelet. La rotation des certificats de service Kubelet est activée dans les clusters Kubernetes 1.27 et versions ultérieures sur les pools de nœuds mis à jour après juillet 2025.

Vos nœuds disposent de cette fonctionnalité si ils possèdent l'étiquette `kubernetes.azure.com/kubelet-serving-ca=cluster`. Vérifiez si tous vos nœuds possèdent cette étiquette en exécutant :

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

Assurez-vous que tous vos nœuds affichent `cluster`.

#### Sans rotation des certificats de service Kubelet

Si la rotation des certificats de service Kubelet n'est pas activée, fournissez la configuration Kubelet supplémentaire suivante :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      host:
        fieldRef:
          fieldPath: spec.nodeName
      hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt

providers:
  aks:
    enabled: true
```
{{% /tab %}}
{{< /tabs >}}

Dans ces versions de nœud AKS, le certificat Kubelet AKS nécessite de modifier le host Kubelet sur le `spec.nodeName` et l'emplacement `hostCAPath` du certificat, comme indiqué dans les extraits précédents. Cela active la vérification TLS. Sans ces modifications, l'Agent ne peut pas se connecter au Kubelet.

<div class="alert alert-info">Une fois que la rotation des certificats de service Kubelet est activée dans votre cluster, supprimez cette configuration.</div>

Lorsque vous mettez à niveau votre cluster AKS, vous pouvez voir la fonctionnalité de rotation des certificats de service Kubelet activée automatiquement pour vous, ce qui peut avoir un impact négatif sur votre Agent Datadog si vous utilisez la configuration spéciale ci-dessus pour référencer le certificat `/etc/kubernetes/certs/kubeletserver.crt`. Lorsque la rotation des certificats de service Kubelet est activée, ce certificat est supprimé, ce qui entraîne :

- Dans l'opérateur Datadog : le conteneur de l'Agent s'arrête en `Error`, car il ne peut pas se connecter au Kubelet, et il enregistre `Error while getting hostname, exiting: unable to reliably determine the host name`
- Dans Helm : le pod de l'Agent ne parvient pas à démarrer avec l'événement d'avertissement `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file`

Dans ces cas, supprimez les configurations Kubelet supplémentaires.

En alternative, vous pouvez également [vous connecter au Kubelet sans vérification TLS](#without-tls-verification).

### Sans vérification TLS

Dans certains clusters, la résolution DNS pour `spec.nodeName` à l'intérieur des pods ne fonctionne pas dans AKS. Cela affecte :
 - Les nœuds Windows
 - Les nœuds Linux, lorsque le cluster est configuré dans un réseau virtuel utilisant un DNS personnalisé

Dans ce cas, utilisez la configuration AKS fournie ci-dessous pour définir `tlsVerify: false` et supprimer tous les paramètres pour le chemin host Kubelet (qui est défini par défaut sur `status.hostIP`). **Ne définissez pas le chemin host Kubelet et `tlsVerify: false` dans la même configuration**.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Ressource Kubernetes DatadogAgent :

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

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

Datadog recommande de spécifier des limites de ressources pour le conteneur de l'Agent. Autopilot définit une limite par défaut relativement faible (50m CPU, 100Mi mémoire) qui peut amener le conteneur de l'Agent à rapidement atteindre OOMKill en fonction de votre environnement. Le cas échéant, spécifiez également les limites de ressources pour les conteneurs Trace Agent, Process Agent et System-Probe. De plus, vous pouvez souhaiter créer une classe de priorité pour l'Agent afin de garantir sa planification.

À partir de l'Agent `7.65.0+` et de la version `3.113.0+` du chart Helm, Datadog recommande d'utiliser `datadog.kubelet.useApiServer` pour que l'Agent interroge la liste des pods depuis l'API Server. Évitez d'utiliser le [port Kubelet en lecture seule obsolète][12].


{{< tabs >}}
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

  # This option uses the API server to retrieve the node-level pod list from the API server.
  # This setting is necessary to migrate away from the deprecated read-only kubelet port.
  # Requires Agent 7.65.0+ and Datadog Helm chart version 3.113.0+.
  kubelet:
    useApiServer: true

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    systemProbe:
      # resources for the System Probe container
      resources:
        requests:
          cpu: 100m
          memory: 400Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}

### Pods Spot et classes de calcul

L'utilisation de [pods Spot][10] dans les clusters GKE Autopilot introduit des [taints][9] sur les nœuds GKE Spot correspondants. Lors de l'utilisation de pods Spot, une configuration supplémentaire est requise pour fournir au DaemonSet de l'Agent une tolérance correspondante.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}
{{< /tabs >}}

De même, lors de l'utilisation de [classes de calcul GKE Autopilot][11] pour exécuter des workloads ayant des exigences matérielles spécifiques, prenez note des [taints][9] que GKE Autopilot applique à ces nœuds spécifiques et ajoutez des tolérances correspondantes au DaemonSet de l'Agent. Vous pouvez faire correspondre les tolérances sur vos pods correspondants. Par exemple, pour la classe de calcul `Scale-Out`, utilisez une tolérance comme :

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/compute-class
    operator: Equal
    value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift est livré avec une sécurité renforcée par défaut avec SELinux et SecurityContextConstraints (SCC). Par conséquent, il nécessite certaines configurations spécifiques :
- Accès SCC élevé pour l'Agent de nœud et l'Agent de cluster
- Il arrive que les certificats d'API Kubelet ne soient pas signés par l'autorité de certification du cluster.
- Vous devez définir des tolérances pour planifier l'Agent de nœud sur les nœuds `master` et `infra`.
- Le nom du cluster doit être défini et ne peut pas être récupéré automatiquement à partir du fournisseur de cloud.
- *(Facultatif)* Définir `hostNetwork: true` dans l'Agent de nœud pour permettre à l'Agent d'effectuer des requêtes vers les services de métadonnées du fournisseur de cloud (IMDS)

Cette configuration de base prend en charge OpenShift 3.11 et OpenShift 4, mais elle fonctionne mieux avec OpenShift 4.

De plus, la collecte de logs et APM ont également des exigences légèrement différentes.

L'utilisation de Socket de domaine Unix (UDS) pour APM et DogStatsD peut fonctionner dans OpenShift. Toutefois, Datadog ne recommande pas cela, car cela nécessite des autorisations privilégiées supplémentaires et un accès SCC pour **à la fois** votre pod de l'Agent Datadog et votre pod d'application. Sans celles-ci, votre pod d'application peut ne pas parvenir à se déployer. Datadog recommande de désactiver l'option UDS pour éviter cela, permettant au contrôleur d'admission d'injecter le [paramètre TCP/IP][7] ou le [paramètre de service][8] approprié pour la connectivité APM.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

Lors de l'utilisation de l'opérateur Datadog dans OpenShift, Datadog recommande d'utiliser l'Operator Lifecycle Manager pour déployer l'opérateur Datadog depuis OperatorHub dans la console web de votre cluster OpenShift. Consultez les [étapes d'installation de l'opérateur][1]. La configuration ci-dessous fonctionne avec cette configuration, qui crée l'[accès basé sur ClusterRole et ClusterRoleBinding au SCC][2] pour le ServiceAccount spécifié `datadog-agent-scc`. Cette configuration `DatadogAgent` doit être déployée dans le même espace de nommage que l'opérateur Datadog.

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  namespace: openshift-operators # set as the same namespace where the Datadog Operator was deployed
spec:
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      unixDomainSocketConfig:
        enabled: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      serviceAccountName: datadog-agent-scc
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      hostNetwork: true
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**Remarque** : le remplacement `nodeAgent.securityContext.seLinuxOptions` est nécessaire pour la collecte de logs lors du déploiement avec l'opérateur. Si la collecte de logs n'est pas activée, vous pouvez omettre ce remplacement.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

La configuration ci-dessous crée des SCC personnalisés pour les ServiceAccounts de l'Agent et de l'Agent de cluster.

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  apm:
    portEnabled: true
    socketEnabled: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  useHostNetwork: true
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
```

{{% /tab %}}

{{< /tabs >}}

## Rancher {#Rancher}

Les installations Rancher sont similaires aux installations Kubernetes standard, nécessitant seulement une configuration mineure :
- Des tolérances sont requises pour planifier l'Agent de nœud sur les nœuds `controlplane` et `etcd`.
- Le nom de cluster doit être défini car il ne peut pas être récupéré automatiquement depuis le fournisseur de cloud.

{{< tabs >}}
{{% tab "Operator Datadog" %}}

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
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
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
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
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

{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

Aucune configuration particulière n'est requise.

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG nécessite quelques légères modifications de la configuration, visibles ci-dessous. Par exemple, il est nécessaire de configurer une tolérance pour que le contrôleur planifie l'Agent de nœud sur les nœuds `master`.


{{< tabs >}}
{{% tab "Operator Datadog" %}}

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
      enabled: true
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-values.yaml` personnalisé :

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}

{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/cluster_agent/admission_controller
[2]: https://github.com/Azure/AKS/releases/tag/2022-10-30
[3]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[4]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[5]: /fr/getting_started/containers/datadog_operator
[6]: /fr/agent/guide/operator-eks-addon
[7]: /fr/containers/kubernetes/apm/?tab=tcp
[8]: /fr/tracing/guide/setting_up_apm_with_kubernetes_service
[9]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[10]: https://cloud.google.com/kubernetes-engine/docs/how-to/autopilot-spot-pods
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-compute-classes
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/disable-kubelet-readonly-port
[13]: https://learn.microsoft.com/en-us/azure/aks/certificate-rotation#kubelet-serving-certificate-rotation