---
aliases:
- /fr/agent/kubernetes/distributions
description: Instructions d'installation et de configuration spécifiques à la plateforme
  pour le Datadog Agent sur diverses distributions Kubernetes
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Recueillir les logs de votre application
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Recueillir les traces de votre application
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Recueillez vos métriques Prometheus
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Recueillez automatiquement les métriques et les logs de vos applications
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limitez la collecte de données à un sous-ensemble de conteneurs
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Attribuez des tags à toutes les données envoyées par un conteneur
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Surveiller Tanzu Kubernetes Grid sur vSphere
title: Distributions Kubernetes
---
## Présentation {#overview}

Cette section vise à documenter les spécificités et à fournir une bonne configuration de base pour toutes les principales distributions Kubernetes.
Ces configurations peuvent ensuite être personnalisées pour ajouter n'importe quelle fonctionnalité Datadog.

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Kubernetes Service (VKS)](#VKS)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

Aucune configuration particulière n'est requise.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Dans un cluster EKS, vous pouvez installer le Datadog Operator en utilisant [Helm][1] ou en tant qu'[EKS add-on][2].

La configuration ci-dessous est conçue pour fonctionner avec l'une ou l'autre installation (Helm ou EKS add-on) lorsque le Datadog Agent est installé dans le même espace de nommage que le Datadog Operator.

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

## Azure Kubernetes Service (AKS) {#AKS}

### Admission Controller {#admission-controller}
La fonctionnalité optionnelle [Admission Controller][1] nécessite une configuration spécifique pour éviter une erreur lors de la réconciliation du webhook.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Remplacez `<DATADOG_SITE>` par votre [site Datadog][1]. Votre site est {{< region-param key="dd_site" code="true" >}}. (Assurez-vous que le SITE correct pour votre compte est sélectionné sur la droite de cette page).

[1]: /fr/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

Personnalisé `datadog-values.yaml` :

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

### Rotation du certificat de service Kubelet {#kubelet-serving-certificate-rotation}
Si votre cluster, **ne dispose pas** de la [rotation du certificat de service Kubelet][13] activée, vous devez fournir une configuration supplémentaire pour permettre au Datadog Agent de se connecter au Kubelet. La rotation du certificat de service Kubelet est activée dans les clusters Kubernetes 1.27 et supérieurs sur les pools de nœuds mis à jour après juillet 2025.

Vos nœuds ont cette fonctionnalité activée s'ils possèdent l'étiquette `kubernetes.azure.com/kubelet-serving-ca=cluster`. Vérifiez si tous vos nœuds possèdent cette étiquette en exécutant :

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

Assurez-vous que tous vos nœuds affichent `cluster`.

#### Sans rotation du certificat de service Kubelet {#without-kubelet-serving-certificate-rotation}

Si la rotation du certificat de service Kubelet n'est pas activée, fournissez la configuration Kubelet supplémentaire suivante :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Personnalisé `datadog-values.yaml` :

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

Dans ces versions de nœuds AKS, le certificat Kubelet AKS nécessite de remplacer le host Kubelet par `spec.nodeName` et l'emplacement `hostCAPath` du certificat, comme indiqué dans les extraits précédents. Cela active la vérification TLS. Sans ces modifications, le Datadog Agent ne peut pas se connecter au Kubelet.

<div class="alert alert-info">Une fois la rotation du certificat de service Kubelet activée dans votre cluster, supprimez cette configuration.</div>

Lorsque vous mettez à niveau votre cluster AKS, il est possible que la fonctionnalité de rotation du certificat de service Kubelet soit activée automatiquement pour vous, ce qui peut nuire au Datadog Agent si vous utilisez la configuration spéciale ci-dessus pour référencer le certificat `/etc/kubernetes/certs/kubeletserver.crt`. Lorsque la rotation du certificat de service Kubelet est activée, ce certificat est supprimé, ce qui entraîne :

- Dans le Datadog Operator : Le conteneur du Datadog Agent s'arrête dans `Error`, car il ne peut pas se connecter au Kubelet, et il enregistre `Error while getting hostname, exiting: unable to reliably determine the host name`
- Dans Helm : Le pod du Datadog Agent ne parvient pas à démarrer avec l'événement d'avertissement `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file`

Dans ces cas, supprimez les configurations Kubelet supplémentaires.

Comme alternative, vous pouvez également [vous connecter au Kubelet sans vérification TLS](#without-tls-verification).

### Sans vérification TLS {#without-tls-verification}

Dans certains clusters, la résolution DNS pour `spec.nodeName` au sein des Pods ne fonctionne pas dans AKS. Cela affecte :
 - Nœuds Windows
 - Nœuds Linux, lorsque le cluster est configuré dans un réseau virtuel utilisant un DNS personnalisé

Dans ce cas, utilisez la configuration AKS fournie ci-dessous pour définir `tlsVerify: false` et supprimez tout paramètre pour le chemin de host Kubelet (qui est `status.hostIP` par défaut). **Ne définissez pas le chemin de host Kubelet et `tlsVerify: false` dans la même configuration**.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Personnalisé `datadog-values.yaml` :

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

## Google Kubernetes Engine (GKE) {#GKE}

Il est possible de configurer deux modes d'opération pour GKE :

- **Standard** : Vous gérez l'infrastructure sous-jacente du cluster, ce qui vous offre une flexibilité de configuration des nœuds.
- **Autopilot** : GKE provisionne et gère l'infrastructure sous-jacente du cluster, y compris les nœuds et les pools de nœuds, vous offrant un cluster optimisé avec une expérience sans intervention.

Vous devez adapter la configuration du Datadog Agent en fonction du mode d'opération de votre cluster.

### Standard {#standard}

Dans le Datadog Agent 7.26 et versions ultérieures, GKE ne nécessite aucune configuration supplémentaire, que vous exécutiez `Docker` ou `containerd`. La seule exception est Container-Optimized OS (COS) avec le chart Helm. Le Datadog Operator détecte automatiquement GKE COS.

{{< tabs >}}
{{% tab "Helm" %}}

Personnalisé `datadog-values.yaml` :

```yaml
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{< /tabs >}}

### Autopilot {#autopilot}

Le mode Autopilot de GKE requiert une configuration précise, indiquée ci-dessous.

Datadog recommande de spécifier des limites de ressources pour le conteneur du Datadog Agent. Autopilot définit une limite par défaut relativement basse (50m CPU, 100Mi mémoire) qui peut amener le conteneur du Datadog Agent à subir rapidement un OOMKill selon votre environnement. Le cas échéant, spécifiez également des limites de ressources pour les conteneurs Trace Agent, Process Agent et System-Probe. De plus, vous souhaiterez peut-être créer une classe de priorité pour le Datadog Agent afin de garantir sa planification.

À partir du Datadog Agent `7.65.0+` et de la version `3.113.0+` du chart Helm, Datadog recommande d'utiliser `datadog.kubelet.useApiServer` pour que le Datadog Agent interroge la liste des pods depuis le serveur API. Évitez d'utiliser le [port kubelet en lecture seule obsolète][12].


{{< tabs >}}
{{% tab "Helm" %}}

Personnalisé `datadog-values.yaml` :

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

{{% tab "Datadog Operator" %}}

En commençant par Datadog Operator `1.27.0+`, activez le mode Autopilot avec l'annotation `experimental.agent.datadoghq.com/autopilot`. Le Datadog Operator configure le Datadog Agent pour GKE Autopilot, y compris la découverte des pods du serveur API et la WorkloadAllowlist requise.

Personnalisé `datadog-agent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    experimental.agent.datadoghq.com/autopilot: "true"
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
    # Default value is `datadoghq.com' (the US1 site)
    # Documentation: https://docs.datadoghq.com/getting_started/site/
    site: <DATADOG_SITE>
  override:
    nodeAgent:
      containers:
        agent:
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
        trace-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        process-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        system-probe:
          resources:
            requests:
              cpu: 100m
              memory: 400Mi
```

{{% /tab %}}
{{< /tabs >}}

### Pods Spot et classes de calcul {#spot-pods-and-compute-classes}

L'utilisation de [pods Spot][10] dans les clusters GKE Autopilot introduit des [taints][9] sur les nœuds GKE Spot correspondants. Lors de l'utilisation de pods Spot, une configuration supplémentaire est requise pour fournir au DaemonSet du Datadog Agent une tolérance correspondante.

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

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/gke-spot
        operator: Equal
        value: "true"
```
{{% /tab %}}
{{< /tabs >}}

De même, lors de l'utilisation de [classes de calcul GKE Autopilot][11] pour exécuter des charges de travail ayant des exigences matérielles spécifiques, prenez note des [taints][9] que GKE Autopilot applique à ces nœuds spécifiques et ajoutez des tolérances correspondantes au DaemonSet du Datadog Agent. Vous pouvez faire correspondre les tolérances sur vos pods correspondants. Par exemple, pour la classe de calcul `Scale-Out`, utilisez une tolérance telle que :

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

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/compute-class
        operator: Equal
        value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift est doté par défaut d'une sécurité renforcée grâce à SELinux et aux SecurityContextConstraints (SCC). Par conséquent, il nécessite certaines configurations spécifiques :
- Accès SCC élevé pour le Datadog Node Agent et le Datadog Cluster Agent
- Les certificats de l'API Kubelet ne sont pas toujours signés par l'autorité de certification du cluster
- Des tolérances sont requises pour planifier le Datadog Node Agent sur les nœuds `master` et `infra`
- Le nom du cluster doit être défini car il ne peut pas être récupéré automatiquement auprès du fournisseur cloud
- *(Facultatif)* Définissez `hostNetwork: true` dans le Datadog Node Agent pour permettre au Datadog Agent d'effectuer des requêtes vers les services de métadonnées du fournisseur cloud (IMDS).

Cette configuration de base prend en charge OpenShift 3.11 et OpenShift 4, mais elle fonctionne mieux avec OpenShift 4.

De plus, la collecte de logs et l'APM ont également des exigences légèrement différentes.

L'utilisation de sockets de domaine Unix (UDS) pour l'APM et DogStatsD peut fonctionner dans OpenShift. Cependant, Datadog ne recommande pas cette approche, car elle nécessite des autorisations privilégiées supplémentaires et un accès SCC à **la fois** votre pod Datadog Agent et votre pod d'application. Sans cela, votre pod d'application peut échouer lors du déploiement. Datadog recommande de désactiver l'option UDS pour éviter cela, permettant à l'Admission Controller d'injecter le [paramètre TCP/IP][7] ou le [paramètre de service][8] approprié pour la connectivité APM.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Lors de l'utilisation du Datadog Operator dans OpenShift, Datadog recommande d'utiliser l'Operator Lifecycle Manager pour déployer le Datadog Operator depuis OperatorHub dans votre console Web de cluster OpenShift. Reportez-vous aux [étapes d'installation du Datadog Operator][1]. La configuration ci-dessous fonctionne avec cette installation, qui crée l'accès [ClusterRole et ClusterRoleBinding basé sur le SCC][2] pour le ServiceAccount `datadog-agent-scc` spécifié. Cette `DatadogAgent` configuration doit être déployée dans le même espace de nommage que le Datadog Operator.

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

**Remarque** : La valeur de remplacement `nodeAgent.securityContext.seLinuxOptions` est nécessaire pour la collecte des logs lors du déploiement avec le Datadog Operator. Si la collecte des logs n'est pas activée, vous pouvez omettre cette valeur de remplacement.

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

La configuration ci-dessous crée des SCC personnalisés pour les comptes de service du Datadog Agent et du Datadog Cluster Agent.

Personnalisé `datadog-values.yaml` :

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

Les installations Rancher sont similaires aux installations Kubernetes vanilla, ne nécessitant qu'une configuration mineure :
- Des tolérances sont requises pour planifier le Node Agent sur les nœuds `controlplane` et `etcd`.
- Le nom du cluster doit être défini car il ne peut pas être récupéré automatiquement auprès du fournisseur cloud.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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

Personnalisé `datadog-values.yaml` :

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

## vSphere Kubernetes Service (VKS) {#VKS}

VKS nécessite que l'espace de nommage dans lequel le Datadog Agent est déployé utilise la norme de sécurité des pods privilégiée (privileged Pod Security Standard). Avant de déployer le Datadog Agent, remplacez `<namespace>` par l'espace de nommage dans lequel vous déployez `datadog-agent` et exécutez :

```shell
kubectl label --overwrite ns <namespace> \
  pod-security.kubernetes.io/enforce=privileged
```

Utilisez la configuration suivante pour activer la collecte d'événements Kubernetes et kube-state-metrics core, désactiver la vérification TLS du Kubelet pour les certificats auto-signés, et ajouter une tolérance afin que le Datadog Agent puisse être planifié sur les nœuds du plan de contrôle.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Personnalisé `datadog-values.yaml` :

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

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG nécessite quelques modifications mineures de configuration, indiquées ci-dessous. Par exemple, la définition d'une tolérance est requise pour que le contrôleur puisse planifier le Node Agent sur les nœuds `master`.


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Personnalisé `datadog-values.yaml` :

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