---
description: Dépannage des problèmes courants liés au contrôleur d'admission du Cluster
  Agent Datadog et à l'injection de bibliothèque
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: Blog
  text: Instrumentation automatique du traçage Kubernetes
- link: /containers/cluster_agent/admission_controller/
  tag: Documentation
  text: Contrôleur d'admission de lʼAgent de cluster
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: Documentation
  text: Injection de bibliothèque dans Kubernetes
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: Centre d'architecture
  text: Instrumentez votre application à l'aide du Datadog Operator et du contrôleur
    d'admission
title: Dépannage du contrôleur d'admission
---
## Présentation {#overview}

Cette page fournit des informations de dépannage pour le [Admission Controller][1] du Datadog Cluster Agent.

## Problèmes courants {#common-problems}

### Mettre à jour les pods préexistants {#update-pre-existing-pods}
Le contrôleur d'admission répond à la création de nouveaux pods au sein de votre cluster Kubernetes : lors de la création d'un pod, l'Agent de cluster reçoit une requête de Kubernetes et répond avec les détails des modifications (le cas échéant) à apporter au pod.

Par conséquent, **le contrôleur d'admission ne modifie pas les pods existants au sein de votre cluster**. Si vous avez récemment activé le contrôleur d'admission ou effectué d'autres modifications environnementales, supprimez votre pod existant et laissez Kubernetes le recréer. Cela garantit que le contrôleur d'admission met à jour votre pod. 

### Étiquettes et annotations {#labels-and-annotations}
Le Datadog Cluster Agent répond aux étiquettes et aux annotations sur le pod créé—**pas** à la charge de travail (Deployment, DaemonSet, CronJob, etc.) qui a créé ce pod. Assurez-vous que votre modèle de pod y fait référence en conséquence. 

Par exemple, le modèle suivant définit l'[étiquette pour la configuration APM][2] et l'[annotation pour l'injection de bibliothèque][3] :

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

### Les pods d'application ne sont pas créés {#application-pods-are-not-created}

Le mode d'injection du contrôleur d'admission (`socket`, `hostip`, `service`) est défini par la configuration de votre Datadog Cluster Agent. Par exemple, si vous avez activé le mode `socket` dans votre Agent, l'Admission Controller utilise également le mode `socket`.

Si vous utilisez GKE Autopilot ou OpenShift, vous devez utiliser un mode d'injection spécifique.

#### GKE Autopilot {#gke-autopilot}

GKE Autopilot restreint l'utilisation de tout `volumes` avec un `hostPath`. Par conséquent, si l'Admission Controller utilise le mode `socket`, les Pods sont empêchés d'être planifiés par le GKE Warden.

L'activation du mode GKE Autopilot dans le chart Helm désactive le mode `socket` pour éviter que cela ne se produise. Pour activer l'APM, activez le port et utilisez plutôt la méthode `hostip` ou `service`. L'Admission Controller utilisera par défaut `hostip` pour correspondre.

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

Reportez-vous à [Kubernetes Distributions][17] pour plus de détails de configuration concernant Autopilot.

#### OpenShift {#openshift}

OpenShift dispose de `SecurityContextConstraints` (SCCs) qui sont nécessaires pour déployer des pods avec des autorisations supplémentaires, comme un `volume` avec un `hostPath`. Les composants Datadog sont déployés avec des SCC pour permettre une activité spécifique aux pods Datadog, mais Datadog ne crée pas de SCC pour d'autres pods. L'Admission Controller pourrait ajouter la configuration basée sur socket à vos pods d'application, ce qui empêcherait leur déploiement.

Si vous utilisez OpenShift, utilisez le mode `hostip`. La configuration suivante active le mode `hostip` en désactivant les options de socket :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
Alternativement, vous pouvez définir `features.admissionController.agentCommunicationMode` sur `hostip` ou `service` directement.

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
Alternativement, vous pouvez définir `clusterAgent.admissionController.configMode` sur `hostip` ou `service` directement.
{{% /tab %}}
{{< /tabs >}}

Reportez-vous à [Kubernetes Distributions][18] pour plus de détails de configuration concernant OpenShift.

## Afficher le statut du contrôleur d'admission {#view-admission-controller-status}

La sortie de statut du Datadog Cluster Agent fournit des informations pour vérifier qu'il a créé le `datadog-webhook` pour le `MutatingWebhookConfiguration` et qu'il dispose d'un certificat valide.

Exécutez la commande suivante :

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

Votre sortie ressemble à ce qui suit :

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

Cette sortie est relative au Datadog Cluster Agent déployé dans l'espace de nom `default`. Les `Service` et `Secret` doivent correspondre à l'espace de nom utilisé.

## Afficher les logs du contrôleur d'admission {#view-admission-controller-logs}

Les logs de débogage aident à valider que vous avez correctement configuré le contrôleur d'admission. [Activez les logs de débogage][3] avec la configuration suivante :

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

### Valider `datadog-webhook` {#validate-datadog-webhook}

**Exemple de logs** :

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

### Valider l'injection {#validate-injection}

**Exemple de logs** :

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

Si vous voyez des erreurs concernant l'injection pour un pod donné, contactez le support Datadog avec votre configuration Datadog et votre configuration de pod.

Si vous ne voyez pas les tentatives d'injection pour *quelconque* pod, vérifiez vos paramètres `mutateUnlabelled` et assurez-vous que vos étiquettes de pod correspondent aux valeurs attendues. Si elles correspondent, votre problème est probablement lié au réseau entre le plan de contrôle, le webhook et le service. Consultez [Mise en réseau](#networking) pour plus d'informations.

## Mise en réseau {#networking}

### Politiques réseau {#network-policies}

Les [Politiques réseau][5] Kubernetes vous aident à contrôler les différents flux de trafic entrants (ingress) et sortants (egress) vers vos pods.

Si vous utilisez des politiques réseau, Datadog recommande de créer des politiques correspondantes pour le Datadog Cluster Agent afin d'assurer la connectivité au pod sur ce port. Vous pouvez le faire avec la configuration suivante :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Alternativement, pour les environnements basés sur Cilium, définissez `flavor` sur `cilium` pour créer une ressource `CiliumNetworkPolicy`.

### Dépannage réseau pour les distributions Kubernetes {#network-troubleshooting-for-kubernetes-distributions}

Lorsqu'un pod est créé, le cluster Kubernetes envoie une requête depuis le plan de contrôle vers `datadog-webhook`, via le service, et enfin vers le pod du Datadog Cluster Agent. Cette requête nécessite une connectivité entrante du plan de contrôle vers le nœud sur lequel se trouve le Datadog Cluster Agent, via son port de contrôleur d'admission (`8000`). Une fois cette requête résolue, le Datadog Cluster Agent modifie votre pod pour configurer la connexion réseau pour le SDK Datadog.
Le service du contrôleur d'admission reçoit le trafic sur le port 443 et le transfère au pod du Datadog Cluster Agent sur le port 8000.

Selon votre distribution Kubernetes, cela peut entraîner des exigences supplémentaires pour vos règles de sécurité et vos paramètres de contrôleur d'admission.

#### Amazon Elastic Kubernetes Service (EKS) {#amazon-elastic-kubernetes-service-eks}

Dans un cluster EKS, vous pouvez déployer le pod du Datadog Cluster Agent sur n'importe lequel de vos nœuds basés sur Linux par défaut. Ces nœuds et leurs instances EC2 ont besoin d'un [groupe de sécurité][6] avec la [règle entrante][7] suivante :
- **Protocole** : TCP
- **Plage de ports** : `8000`, ou une plage couvrant `8000`
- **Source** : L'ID de _soit_ le groupe de sécurité du cluster, soit l'un des groupes de sécurité supplémentaires de votre cluster. Vous pouvez trouver ces ID dans la console EKS, sous l'onglet _Mise en réseau_ de votre cluster EKS.

Cette règle de groupe de sécurité permet au plan de contrôle d'accéder au nœud et au Datadog Cluster Agent en aval via le port `8000`.

Si vous avez plusieurs [groupes de nœuds gérés][8], chacun avec des groupes de sécurité distincts, ajoutez cette règle entrante à chaque groupe de sécurité.

##### Journalisation du plan de contrôle {#control-plane-logging}

Pour valider votre configuration réseau, activez la [journalisation du plan de contrôle EKS][9] pour le serveur API. Vous pouvez consulter ces logs dans la [console CloudWatch][10].

Ensuite, supprimez l'un de vos pods pour déclencher à nouveau une requête via le contrôleur d'admission. Lorsque la requête échoue, vous pouvez consulter des logs qui ressemblent à ce qui suit :

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

Ces échecs sont relatifs à un Datadog Cluster Agent déployé dans l'espace de nom `default` ; le nom DNS s'ajuste en fonction de l'espace de nom utilisé.

Vous pouvez également constater des échecs pour les autres webhooks du contrôleur d'admission, tels que `datadog.webhook.tags` et `datadodg.webhook.config`. 

**Remarque :** EKS génère souvent deux flux de logs au sein du groupe de logs CloudWatch pour le cluster. Assurez-vous de vérifier les deux pour ces types de logs.

#### Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks}

Pour utiliser [les webhooks du contrôleur d'admission sur AKS][11], utilisez la configuration suivante :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

#### Google Kubernetes Engine (GKE) {#google-kubernetes-engine-gke}

Si vous utilisez un [cluster privé GKE][12], vous devez ajuster vos règles de pare-feu pour autoriser l'accès entrant depuis le plan de contrôle vers le port `8000`.

[Ajoutez une règle de pare-feu][13] pour autoriser l'entrée via TCP sur le port `8000`.

Vous pouvez également modifier une règle existante. Par défaut, le réseau de votre cluster possède une règle de pare-feu nommée `gke-<CLUSTER_NAME>-master`. Assurez-vous que les _filtres sources_ de cette règle incluent [le bloc CIDR du plan de contrôle de votre cluster][14]. Modifiez cette règle pour autoriser l'accès via le protocole `tcp` sur le port `8000`.

Pour plus d'informations, consultez [Ajout de règles de pare-feu pour des cas d'utilisation spécifiques][15] dans la documentation GKE.

#### Rancher {#rancher}

Si vous utilisez Rancher avec un cluster EKS ou un cluster GKE privé, une configuration supplémentaire est requise. Pour plus d'informations, consultez [Rancher Webhook - Problèmes courants][16] dans la documentation Rancher.

**Remarque** : Étant donné que le webhook du contrôleur d'admission de Datadog fonctionne de manière similaire au webhook de Rancher, Datadog a besoin d'accéder au port `8000` au lieu du port `9443` de Rancher.

##### Rancher et EKS {#rancher-and-eks}
Pour utiliser Rancher dans un cluster EKS, déployez le pod Cluster Agent avec la configuration suivante :

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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

Vous devez également ajouter une règle de trafic entrant pour le groupe de sécurité, comme décrit dans la section [Amazon EKS](#amazon-elastic-kubernetes-service-eks) de cette page.

##### Rancher et GKE {#rancher-and-gke}
Pour utiliser Rancher dans un cluster GKE privé, modifiez vos règles de pare-feu pour autoriser l'accès entrant via TCP sur le port `8000`. Consultez la section [GKE](#google-kubernetes-engine-gke) de cette page.

## Pour aller plus loin {#further-reading}

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