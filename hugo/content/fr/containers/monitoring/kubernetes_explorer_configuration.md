---
aliases:
- /fr/infrastructure/livecontainers/configuration
- /fr/infrastructure/containers/configuration
further_reading:
- link: /infrastructure/hostmap/
  tag: Documentation
  text: Voir tous vos hosts/conteneurs avec l'Infrastructure Map
- link: /infrastructure/process/
  tag: Documentation
  text: Découvrir ce qui se passe à tous les niveaux de votre système
title: Configurez Kubernetes Explorer
---
Cette page répertorie les options de configuration de la page [Containers][1] dans Datadog. Pour en savoir plus sur la page Containers et ses fonctionnalités, consultez la documentation [Containers View][2].

## Configurez Kubernetes Explorer {#configure-kubernetes-explorer}

### Matrice de compatibilité de collecte des ressources {#resource-collection-compatibility-matrix}

Le tableau suivant présente la liste des ressources recueillies et les versions minimales de l'Agent, de l'Agent de cluster et du chart Helm requises pour la collecte.

| Ressource | Version minimale de l'agent | Version minimale du Cluster Agent* | Version minimale du Helm chart | Version minimale de Kubernetes |
|---|---|---|---|---|
| ClusterRoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ClusterRoles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Clusters | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| CronJobs | 7.33.0 | 7.40.0 | 2.15.5 | 1.16.0 |
| CustomResourceDefinitions | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| CustomResources | 7.51.0 | 7.51.0 | 3.39.2 | v1.16.0 |
| DaemonSets | 7.33.0 | 1.18.0 | 2.16.3 | 1.16.0 |
| Deployments | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| HorizontalPodAutoscalers | 7.33.0 | 7.51.0 | 2.10.0 | 1.1.1 |
| Ingresses | 7.33.0 | 1.22.0 | 2.30.7 | 1.21.0 |
| Jobs | 7.33.0 | 1.18.0 | 2.15.5 | 1.16.0 |
| Espaces de noms | 7.33.0 | 7.41.0 | 2.30.9 | 1.17.0 |
| Politiques réseau | 7.33.0 | 7.56.0 | 3.57.2 | 1.14.0 |
| Nœuds | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| PersistentVolumeClaims | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| PersistentVolumes | 7.33.0 | 1.18.0 | 2.30.4 | 1.17.0 |
| Pods | 7.33.0 | 1.18.0 | 3.9.0 | 1.17.0 |
| ReplicaSets | 7.33.0 | 1.18.0 | 2.10.0 | 1.16.0 |
| RoleBindings | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| Roles | 7.33.0 | 1.19.0 | 2.30.9 | 1.14.0 |
| ServiceAccounts | 7.33.0 | 1.19.0 | 2.30.9 | 1.17.0 |
| Services | 7.33.0 | 1.18.0 | 2.10.0 | 1.17.0 |
| StatefulSets | 7.33.0 | 1.15.0 | 2.20.1 | 1.16.0 |
| VerticalPodAutoscalers | 7.33.0 | 7.46.0 | 3.6.8 | 1.16.0 |

**Note** : À partir de la version 1.22, la numérotation de version du Cluster Agent suit celle de l'Agent, en commençant par la version 7.39.0.

### Ajoutez des tags personnalisés aux ressources {#add-custom-tags-to-resources}

Vous pouvez ajouter des tags personnalisés aux ressources Kubernetes afin de faciliter le filtrage de la vue des ressources Kubernetes.

Des tags supplémentaires sont ajoutés via la variable d'environnement `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS`.

**Note** : Ces tags ne s'affichent que dans la vue des ressources Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Ajoutez la variable d'environnement à la fois sur le Process Agent et sur le Cluster Agent en définissant `agents.containers.processAgent.env` et `clusterAgent.env` dans `datadog-agent.yaml`.

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

Si vous utilisez le [Helm chart officiel][1], ajoutez la variable d'environnement à la fois sur le Process Agent et sur le Cluster Agent en définissant `agents.containers.processAgent.env` et `clusterAgent.env` dans [values.yaml][2].

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

[1]: https://github.com/DataDog/helm-charts
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

{{% /tab %}}
{{% tab "DaemonSet" %}}

Définissez la variable d'environnement sur les conteneurs de l'Agent de processus et de l'Agent de cluster :

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

### Collectez des Custom Resources {#collect-custom-resources}

Le [Kubernetes Explorer][3] collecte automatiquement les Custom Resource Definitions (CRDs) par défaut.

#### Matrice de compatibilité de la collecte automatique de Custom Resources {#automatic-custom-resource-collection-compatibility-matrix}

Lorsque les Custom Resource Definitions (CRDs) suivantes sont présentes dans votre cluster, l'Agent collecte automatiquement leurs Custom Resources (CRs). Si une CRD que vous utilisez n'est **pas** listée ici—ou si votre version d'Agent est plus ancienne—suivez les étapes de **configuration manuelle** ci-dessous.

| CRD Group                   | CRD Kind                            | CRD Versions       Minimal Agent version | |
| --------------------------- | ----------------------------------- | ------------------ | --------------------- |
| argoproj.io                 | application                         | v1alpha1           | 7.71.0                |
| argoproj.io                 | applicationset                      | v1alpha1           | 7.71.0                |
| argoproj.io                 | rollout                             | v1alpha1           | 7.71.0                |
| azure.karpenter.sh          | *                                   | v1beta1            | 7.71.0                |
| datadoghq.com               | datadogagent                        | v2alpha1           | 7.71.0                |
| datadoghq.com               | datadogagentprofile                 | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogdashboard                    | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadoginstrumentation              | v1alpha1           | 7.83.0                |
| datadoghq.com               | datadogmetric                       | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogmonitor                      | v1alpha1           | 7.71.0                |
| datadoghq.com               | datadogpodautoscaler                | v1alpha2           | 7.71.0                |
| datadoghq.com               | datadogslo                          | v1alpha1           | 7.71.0                |
| eks.amazonaws.com           | nodeclass                           | v1, v1beta1        | 7.77.0                |
| karpenter.k8s.aws           | *                                   | v1                 | 7.71.0                |
| karpenter.sh                | *                                   | v1                 | 7.71.0                |
| kubeai.org                  | model                               | v1                 | 7.85.0                |
| kustomize.toolkit.fluxcd.io | kustomization                       | v1                 | 7.76.0                |
| nvidia.com                  | dynamocheckpoint                    | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamocomponentdeployment           | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeployment               | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentrequest        | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamographdeploymentscalingadapter | v1beta1, v1alpha1  | 7.84.0                |
| nvidia.com                  | dynamomodel                         | v1alpha1           | 7.84.0                |
| nvidia.com                  | dynamoworkermetadata                | v1alpha1           | 7.84.0                |
| ray.io                      | raycluster                          | v1, v1alpha1       | 7.84.0                |
| ray.io                      | raycronjob                          | v1                 | 7.84.0                |
| ray.io                      | rayjob                              | v1, v1alpha1       | 7.84.0                |
| ray.io                      | rayservice                          | v1, v1alpha1       | 7.84.0                |
| serving.kserve.io           | clusterservingruntime               | v1alpha1           | 7.85.0                |
| serving.kserve.io           | clusterstoragecontainer             | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferencegraph                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | inferenceservice                    | v1beta1            | 7.85.0                |
| serving.kserve.io           | llminferenceservice                 | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | llminferenceserviceconfig           | v1alpha2, v1alpha1 | 7.85.0                |
| serving.kserve.io           | localmodelcache                     | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnamespacecache            | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnode                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | localmodelnodegroup                 | v1alpha1           | 7.85.0                |
| serving.kserve.io           | servingruntime                      | v1alpha1           | 7.85.0                |
| serving.kserve.io           | trainedmodel                        | v1alpha1           | 7.85.0                |
| source.toolkit.fluxcd.io    | bucket                              | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | externalartifact                    | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | gitrepository                       | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmchart                           | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | helmrepository                      | v1                 | 7.76.0                |
| source.toolkit.fluxcd.io    | ocirepository                       | v1                 | 7.76.0                |


#### Configuration manuelle {#manual-configuration}

Pour les autres CRDs, suivez ces étapes pour collecter les ressources personnalisées que ces CRDs définissent :

1. Dans Datadog, ouvrez [Kubernetes Explorer][3]. Dans le panneau de gauche, sous **Sélectionner les ressources**, sélectionnez [**Kubernetes > Ressources personnalisées > Définitions de ressources**][4].

1. Localisez la CRD qui définit la ressource personnalisée que vous souhaitez visualiser dans l'Explorer. Sous la colonne **Versions**, cliquez sur le tag `version` pour laquelle vous souhaitez configurer l'indexation.

   {{< img src="infrastructure/containers_view/CRD_indexing_access_1.mp4" alt="Une vidéo de Kubernetes Explorer avec le menu déroulant Custom Resources déployé et Resource Definitions sélectionné. Le curseur se déplace vers l'une des lignes du tableau et, sous la colonne « Versions », clique sur l'une des versions. Le curseur sélectionne « v1alpha1 ». Une fenêtre modale apparaît." video="true">}}

   Une fenêtre modale apparaît :
   {{< img src="infrastructure/containers_view/indexing_modal_1.png" alt="La fenêtre modale Collecting and Indexing. Contient deux sections : Set up Datadog Agent, avec des extraits copiables pour mettre à jour une configuration d'agent, et Select indexed fields for filtering/sorting, avec des cases à cocher pour les champs à indexer et un aperçu.">}}

1. Suivez les instructions de la section **Set up Datadog Agent** de la fenêtre modale pour mettre à jour la configuration de l'agent pour les clusters qui ne collectent pas de ressources personnalisées. La fenêtre modale répertorie tous ces clusters, soit parce que l'Agent n'est pas configuré pour collecter des ressources personnalisées, soit parce qu'aucune n'est disponible dans ce cluster. Si l'Agent est configuré et qu'aucune ressource personnalisée n'existe, aucune action n'est requise.

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Ajoutez la configuration suivante à `datadog-values.yaml` :

      ```yaml
      datadog:
        #(...)
        orchestratorExplorer:
          customResources:
            - <CUSTOM_RESOURCE_NAME>
      ```

   1. Mettez à jour votre chart Helm :

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   1. Installez le Datadog Operator avec une option qui accorde au Datadog Agent l'autorisation de collecter des ressources personnalisées :

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Ajoutez la configuration suivante à votre manifeste `DatadogAgent`, `datadog-agent.yaml` :

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          orchestratorExplorer:
            customResources:
              - <CUSTOM_RESOURCE_NAME>
      ```

   1. Appliquez votre nouvelle configuration :

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

   Chaque `<CUSTOM_RESOURCE_NAME>` doit utiliser le format `group/version/kind`.

1. Dans la fenêtre modale, sous **Select indexed fields for filtering/sorting**, sélectionnez les champs que vous souhaitez indexer à partir de la ressource personnalisée pour le filtrage et le tri. Pour certains CRDs, Datadog fournit une configuration par défaut. Vous pouvez sélectionner des champs supplémentaires si nécessaire.

    <div class="alert alert-info">Une fois le Datadog Agent configuré, il collecte automatiquement les ressources personnalisées disponibles. L'indexation des champs est facultative.</div>


    {{< img src="infrastructure/containers_view/CRD_indexing_modal_1.mp4" alt="Une vidéo de la fenêtre modale Collecting and Indexing. Le curseur sélectionne trois champs et clique sur Update Fields. Un message de réussite s'affiche." video="true">}}

    For arrays of objects, see the [Indexing complex types](#indexing-complex-types) section.

1.  Sélectionnez **Update Fields** pour enregistrer.

Une fois les champs indexés, vous pouvez les ajouter en tant que colonnes dans l'Explorer et les trier, ou les inclure dans Saved Views. Vous pouvez également filtrer sur les champs indexés en utilisant le préfixe `field#`.

### Indexation de types complexes {#indexing-complex-types}

{{< img src="containers/explorer/crd_groupby_1.png" alt="Configuration de l'indexation : Un tableau object[] cible, avec des options de menu déroulant « Group by » : aucun champ, containerResource.container, containerResource.name, containerResource.value.type, etc." style="width:100%;" >}}

Pour les tableaux d'objets, deux stratégies de regroupement sont disponibles :

-   `No field`: Les champs imbriqués de l'objet sont indexés uniquement sur le nom du champ imbriqué.
-   **Champ** (par exemple : `type`, `status`, etc.) : Les champs imbriqués de l'objet sont indexés en fonction de chaque valeur de champ unique.

##### Exemple : Filtrage sur les ressources personnalisées DatadogPodAutoscaler {#example-filtering-on-datadogpodautoscaler-custom-resources}

Considérez ces deux ressources personnalisées :

**Ressource personnalisée 1 (CR1)** :

```yaml
status:
    conditions:
        - type: HorizontalAbleToScale
          status: 'True'
        - type: VerticalAbleToApply
          status: 'False'
```

**Ressource personnalisée 2 (CR2)** :

```yaml
status:
    conditions:
        - type: VerticalAbleToApply
          status: 'True'
        - type: HorizontalAbleToScale
          status: 'False'
```

Vous disposez des possibilités de filtrage sur `status.conditions` basées sur les deux stratégies d'indexation :

{{< tabs >}}
{{% tab "Regroupement sans champ" %}}

**Champs indexés pour CR1 :**

```yaml
status:
    conditions:
        type: [HorizontalAbleToScale, VerticalAbleToApply]
        status: ['True', 'False']
```

**Champs indexés pour CR2 :**

```yaml
status:
    conditions:
        type: [VerticalAbleToApply, HorizontalAbleToScale]
        status: ['True', 'False']
```

**Exemples de requêtes :**

**Requête 1 :**

```text
field#status.conditions.status:"False"
```

**Résultat :** Renvoie CR1 et CR2. Les deux CR ont au moins un objet avec `status:"False"`

**Requête 2 :**

```text
field#status.conditions.status:"False" AND field#status.conditions.type:VerticalAbleToApply
```

**Résultat :** Renvoie CR1 et CR2. Au moins un objet `status.condition` dans chaque ressource personnalisée correspond à l'un des filtres, même s'il ne s'agit pas du même objet qui correspond aux deux filtres.

{{% /tab %}}
{{% tab "Regroupement par type" %}}

**Champs indexés pour CR1 :**

```yaml
status:
    conditions:
        - HorizontalAbleToScale:
              status: 'True'
        - VerticalAbleToApply:
              status: 'False'
```

**Champs indexés pour CR2 :**

```yaml
status:
    conditions:
        - VerticalAbleToApply:
              status: 'True'
        - HorizontalAbleToScale:
              status: 'False'
```

**Exemple de requête :**

```text
field#status.conditions.HorizontalAbleToScale.status:"False"
```

**Résultat :** Renvoie CR2. Seul un objet `status.condition` dont `type:"HorizontalAbleToScale"` et `status:"False"` sont renvoyés.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Vous pouvez sélectionner jusqu'à 50 champs par ressource. Vous pouvez utiliser l'aperçu pour valider vos choix d'indexation.</div>

### Collectez des métriques de ressources personnalisées à l'aide du check Kubernetes State Core {#collect-custom-resource-metrics-using-kubernetes-state-core-check}

<div class="alert alert-info">Cette fonctionnalité nécessite Cluster Agent 7.63.0+.</div>

Vous pouvez utiliser le check `kubernetes_state_core` pour collecter des métriques de ressources personnalisées lors de l'exécution du Datadog Cluster Agent.

1. Rédigez les définitions de vos ressources personnalisées et les champs à transformer en métriques selon le format suivant :
   ```yaml
   #=(...)
   collectCrMetrics:
     - groupVersionKind:
         group: "crd.k8s.amazonaws.com"
         kind: "ENIConfig"
         version: "v1alpha1"
       commonLabels:
         crd_type: "eniconfig"
       labelsFromPath:
         crd_name: [metadata, name]
       metricNamePrefix: "userPrefix"
       metrics:
         - name: "eniconfig"
           help: "ENI Config"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
     - groupVersionKind:
         group: "vpcresources.k8s.aws"
         kind: "CNINode"
         version: "v1alpha1"
         resource: "cninode-pluralized"
       commonLabels:
         crd_type: "cninode"
       labelsFromPath:
         crd_name: [metadata, name]
       metrics:
         - name: "cninode"
           help: "CNI Node"
           each:
             type: gauge
             gauge:
               path: [metadata, generation]
   ```

   Par défaut, les noms des ressources RBAC et API sont dérivés du kind dans groupVersionKind en le convertissant en minuscules et en ajoutant un suffixe « s » (par exemple, Kind : ENIConfig → eniconfigs). Si la définition de ressource personnalisée (CRD) utilise une forme plurielle différente, vous pouvez remplacer ce comportement en spécifiant le champ resource. Dans l'exemple ci-dessus, CNINode remplace la valeur par défaut en définissant resource : « cninode-pluralized ».

   Les noms des métriques sont produits en utilisant les règles suivantes :
   - Aucun préfixe : `kubernetes_state_customresource.<metrics.name>`
   - Préfixe : `kubernetes_state_customresource.<metricNamePrefix>_<metric.name>`

   Pour plus de détails, consultez [Custom Resource State Metrics][5].

2. Mettez à jour votre configuration Helm ou Datadog Operator :

   {{< tabs >}}
   {{% tab "Helm Chart" %}}

   1. Ajoutez la configuration suivante à `datadog-values.yaml` :

      ```yaml
      datadog:
        #(...)
        kubeStateMetricsCore:
          collectCrMetrics:
            - <CUSTOM_RESOURCE_METRIC>
      ```

       Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Mettez à jour votre chart Helm :

      ```
      helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
      ```

   {{% /tab %}}
   {{% tab "Datadog Operator" %}}

   <div class="alert alert-info">
      Cette fonctionnalité nécessite l'Agent Operator v1.20+.
   </div>

   1. Installez le Datadog Operator avec une option qui accorde au Datadog Agent l'autorisation de collecter des ressources personnalisées :

      ```
      helm install datadog-operator datadog/datadog-operator --set clusterRole.allowReadAllResources=true
      ```

   1. Ajoutez la configuration suivante à votre manifeste `DatadogAgent`, `datadog-agent.yaml` :

      ```yaml
      apiVersion: datadoghq.com/v2alpha1
      kind: DatadogAgent
      metadata:
        name: datadog
      spec:
        #(...)
        features:
          kubeStateMetricsCore:
            collectCrMetrics:
              - <CUSTOM_RESOURCE_METRIC>
      ```

      Replace `<CUSTOM_RESOURCE_METRIC>` with the definitions you wrote in the first step.

   1. Appliquez votre nouvelle configuration :

      ```
      kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
      ```

   {{% /tab %}}
   {{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers
[2]: /fr/infrastructure/containers
[3]: https://app.datadoghq.com/orchestration/explorer/pod
[4]: https://app.datadoghq.com/orchestration/explorer/crd
[5]: https://github.com/kubernetes/kube-state-metrics/blob/main/docs/metrics/extend/customresourcestate-metrics.md