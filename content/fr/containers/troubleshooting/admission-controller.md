---
description: Dépanner les problèmes courants avec le contrôleur d'admission de l'Agent
  de cluster de Datadog et l'injection de bibliothèque
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Instrumenter automatiquement le tracing Kubernetes
- link: /containers/cluster_agent/admission_controller/
  tag: Documentation
  text: Contrôleur d'admission de lʼAgent de cluster
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: Documentation
  text: Injection de bibliothèque Kubernetes
title: Dépannage du contrôleur d'admission
---

## Présentation

Cette page fournit des informations de dépannage pour le [contrôleur d'admission][1] de l'Agent de cluster de Datadog.

## Problèmes courants

### Mettre à jour les pods préexistants
Le contrôleur d'admission répond à la création de nouveaux pods dans votre cluster Kubernetes : lors de la création d'un pod, l'Agent de cluster reçoit une requête de Kubernetes et répond avec les détails des modifications (le cas échéant) à apporter au pod.

Par conséquent, **le contrôleur d'admission ne mute pas les pods existants dans votre cluster**. Si vous avez récemment activé le contrôleur d'admission ou effectué d'autres modifications environnementales, supprimez votre pod existant et laissez Kubernetes le recréer. Cela garantit que le contrôleur d'admission met à jour votre pod.

### Étiquettes et annotations
L'Agent de cluster répond aux étiquettes et annotations sur le pod créé—**pas** la workload (Deployment, DaemonSet, CronJob, etc.) qui a créé ce pod. Assurez-vous que votre modèle de pod référence cela en conséquence.

Par exemple, le modèle suivant définit l'[étiquette pour la configuration APM][2] et l'[annotation pour l'injection de bibliothèque][3] :

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)  
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

### Les pods d'application ne sont pas créés

Le mode d'injection du contrôleur d'admission (`socket`, `hostip`, `service`) est défini par la configuration de votre Agent de cluster. Par exemple, si vous avez le mode `socket` activé dans votre Agent, le contrôleur d'admission utilise également le mode `socket`.

Si vous utilisez GKE Autopilot ou OpenShift, vous devez utiliser un mode d'injection spécifique.

#### GKE Autopilot

GKE Autopilot restreint l'utilisation de tous les `volumes` avec un `hostPath`. Par conséquent, si le contrôleur d'admission utilise le mode `socket`, les pods sont bloqués de la planification par le GKE Warden.

L'activation du mode GKE Autopilot dans le chart Helm désactive le mode `socket` pour éviter que cela ne se produise. Pour activer APM, activez le port et utilisez plutôt la méthode `hostip` ou `service`. Le contrôleur d'admission utilisera par défaut `hostip` pour correspondre.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
  #(...)

providers:
  gke:
    autopilot: true
```
{{% /tab %}}
{{< /tabs >}}

Consultez les [distributions Kubernetes][17] pour plus de détails de configuration concernant Autopilot.

#### OpenShift

OpenShift dispose de `SecurityContextConstraints` (SCC) qui sont requis pour déployer des pods avec des autorisations supplémentaires, tels qu'un `volume` avec un `hostPath`. Les composants Datadog sont déployés avec des SCC pour permettre une activité spécifique aux pods Datadog, mais Datadog ne crée pas de SCC pour d'autres pods. Le contrôleur d'admission peut ajouter la configuration basée sur socket à vos pods d'application, ce qui entraîne leur échec de déploiement.

Si vous utilisez OpenShift, utilisez le mode `hostip`. La configuration suivante active le mode `hostip` en désactivant les options socket :

{{< tabs >}}
{{% tab "Operator Datadog" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
```
En alternative, vous pouvez définir `features.admissionController.agentCommunicationMode` sur `hostip` ou `service` directement.

{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
En alternative, vous pouvez définir `clusterAgent.admissionController.configMode` sur `hostip` ou `service` directement.
{{% /tab %}}
{{< /tabs >}}

Consultez les [distributions Kubernetes][18] pour plus de détails de configuration concernant OpenShift.

## Afficher le statut du contrôleur d'admission

La sortie de statut de l'Agent de cluster fournit des informations pour vérifier qu'il a créé le `datadog-webhook` pour la `MutatingWebhookConfiguration` et dispose d'un certificat valide.

Exécutez la commande suivante :

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

Votre sortie ressemble à ce qui suit :

```
...
Admission Controller
====================

    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags

    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

Cette sortie est relative à l'Agent de cluster déployé dans l'espace de nommage `default`. Le `Service` et le `Secret` doivent correspondre à l'espace de nommage utilisé.

## Afficher les logs du contrôleur d'admission

Les logs de debug aident à valider que vous avez configuré correctement le contrôleur d'admission. [Activez les logs de debug][3] avec la configuration suivante :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>
    logLevel: debug
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  logLevel: debug
```

{{% /tab %}}
{{< /tabs >}}

### Valider `datadog-webhook`

**Exemples de logs** :

```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

Si vous ne voyez pas que le webhook `datadog-webhook` a été réconcilié avec succès, assurez-vous d'avoir correctement activé le contrôleur d'admission conformément aux [instructions de configuration][1].

### Valider l'injection

**Exemples de logs** :

```
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

Si vous voyez des erreurs avec l'injection pour un pod donné, contactez l'assistance Datadog avec votre configuration Datadog et votre configuration de pod.

Si vous ne voyez pas les tentatives d'injection pour *aucun* pod, vérifiez vos paramètres `mutateUnlabelled` et assurez-vous que vos étiquettes de pod correspondent aux valeurs attendues. Si celles-ci correspondent, votre problème est probablement lié au réseau entre le control plane, le webhook et le service. Consultez [Réseau](#networking) pour plus d'informations.

## Réseau

### Politiques réseau

Les [politiques réseau][5] Kubernetes vous aident à contrôler différents flux de trafic entrant (inbound) et sortant (outbound) vers vos pods.

Si vous utilisez des politiques réseau, Datadog recommande de créer des politiques correspondantes pour l'Agent de cluster afin de garantir la connectivité au pod sur ce port. Vous pouvez le faire avec la configuration suivante :

{{< tabs >}}
{{% tab "Operator Datadog" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
    networkPolicy:
      create: true
      flavor: kubernetes
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)
  networkPolicy:
    create: true
    flavor: kubernetes
```
{{% /tab %}}
{{< /tabs >}}

Définissez `flavor` sur `kubernetes` pour créer une ressource `NetworkPolicy`.

En alternative, pour les environnements basés sur Cilium, définissez `flavor` sur `cilium` pour créer une ressource `CiliumNetworkPolicy`.

### Dépannage réseau pour les distributions Kubernetes

Lorsqu'un pod est créé, le cluster Kubernetes envoie une requête depuis le control plane, vers `datadog-webhook`, via le service, et enfin vers le pod de l'Agent de cluster. Cette requête nécessite une connectivité entrante depuis le control plane vers le nœud sur lequel se trouve l'Agent de cluster, sur son port de contrôleur d'admission (`8000`). Une fois cette requête résolue, l'Agent de cluster mute votre pod pour configurer la connexion réseau pour le traceur Datadog.
Le service de contrôleur d'admission reçoit le trafic sur le port 443 et le transfère au pod de l'Agent de cluster sur le port 8000. 

Selon votre distribution Kubernetes, cela peut avoir des exigences supplémentaires pour vos règles de sécurité et paramètres de contrôleur d'admission.

#### Amazon Elastic Kubernetes Service (EKS)

Dans un cluster EKS, vous pouvez déployer le pod de l'Agent de cluster sur n'importe lequel de vos nœuds basés sur Linux par défaut. Ces nœuds et leurs instances EC2 nécessitent un [groupe de sécurité][6] avec la [règle entrante][7] suivante :
- **Protocole** : TCP
- **Plage de ports** : `8000`, ou une plage qui couvre `8000`
- **Source** : l'ID du groupe de sécurité du cluster _ou_ l'un des groupes de sécurité supplémentaires de votre cluster. Vous pouvez trouver ces ID dans la console EKS, sous l'onglet _Networking_ pour votre cluster EKS.

Cette règle de groupe de sécurité permet au control plane d'accéder au nœud et à l'Agent de cluster en aval sur le port `8000`.

Si vous disposez de plusieurs [groupes de nœuds managés][8], chacun avec des groupes de sécurité distincts, ajoutez cette règle entrante à chaque groupe de sécurité.

##### Journalisation du control plane

Pour valider votre configuration réseau, activez la [journalisation du control plane EKS][9] pour l'API Server. Vous pouvez afficher ces logs dans la [console CloudWatch][10].

Ensuite, supprimez l'un de vos pods pour redéclencher une requête via le contrôleur d'admission. Lorsque la requête échoue, vous pouvez afficher des logs ressemblant à ce qui suit :

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

Ces échecs sont relatifs à un Agent de cluster déployé dans l'espace de nommage `default` ; le nom DNS s'ajuste en fonction de l'espace de nommage utilisé.

Vous pouvez également voir des échecs pour les autres webhooks du contrôleur d'admission, tels que `datadog.webhook.tags` et `datadodg.webhook.config`.

**Remarque** : EKS génère souvent deux flux de logs dans le groupe de logs CloudWatch pour le cluster. Assurez-vous de vérifier les deux pour ces types de logs.

#### Azure Kubernetes Service (AKS)

Pour utiliser des [webhooks de contrôleur d'admission sur AKS][11], utilisez la configuration suivante :

{{< tabs >}}
{{% tab "Operator Datadog" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  #(...)
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

```yaml
datadog:
  #(...)

providers:
  aks:
    enabled: true
```

L'option `providers.aks.enabled` définit la variable d'environnement `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE)

Si vous utilisez un [cluster privé GKE][12], vous devez ajuster vos règles de pare-feu pour autoriser l'accès entrant depuis le control plane vers le port `8000`.

[Ajoutez une règle de pare-feu][13] pour autoriser l'entrée via TCP sur le port `8000`.

Vous pouvez également modifier une règle existante. Par défaut, le réseau de votre cluster dispose d'une règle de pare-feu nommée `gke-<CLUSTER_NAME>-master`. Assurez-vous que les _filtres source_ de cette règle incluent [le bloc CIDR du control plane de votre cluster][14]. Modifiez cette règle pour autoriser l'accès via le protocole `tcp` sur le port `8000`.

Pour plus d'informations, consultez [Ajout de règles de pare-feu pour des cas d'utilisation spécifiques][15] dans la documentation GKE.

#### Rancher

Si vous utilisez Rancher avec un cluster EKS ou un cluster privé GKE, une configuration supplémentaire est requise. Pour plus d'informations, consultez [Rancher Webhook - Common Issues][16] dans la documentation Rancher.

**Remarque** : étant donné que le webhook du contrôleur d'admission de Datadog fonctionne de manière similaire au webhook Rancher, Datadog a besoin d'un accès au port `8000` au lieu du `9443` de Rancher.

##### Rancher et EKS
Pour utiliser Rancher dans un cluster EKS, déployez le pod de l'Agent de cluster avec la configuration suivante :

{{< tabs >}}
{{% tab "Operator Datadog" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      hostNetwork: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)

clusterAgent:
  useHostNetwork: true
```
{{% /tab %}}
{{< /tabs >}}

Vous devez également ajouter une règle entrante de groupe de sécurité, comme décrit dans la section [Amazon EKS](#amazon-elastic-kubernetes-service-eks) sur cette page.

##### Rancher et GKE
Pour utiliser Rancher dans un cluster privé GKE, modifiez vos règles de pare-feu pour autoriser l'accès entrant via TCP sur le port `8000`. Consultez la section [GKE](#google-kubernetes-engine-gke) sur cette page.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/containers/cluster_agent/admission_controller
[2]: /fr/containers/cluster_agent/admission_controller/#apm-and-dogstatsd
[3]: /fr/tracing/trace_collection/library_injection_local/?tab=kubernetes
[4]: /fr/agent/troubleshooting/debug_mode/
[5]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[8]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[10]: https://console.aws.amazon.com/cloudwatch/home#logs:prefix=/aws/eks
[11]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[12]: https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_3_add_a_firewall_rule
[14]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_1_view_control_planes_cidr_block
[15]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[16]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[17]: /fr/containers/kubernetes/distributions/#autopilot
[18]: /fr/containers/kubernetes/distributions/#Openshift