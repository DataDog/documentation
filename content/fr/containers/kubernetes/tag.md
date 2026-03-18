---
aliases:
- /fr/agent/autodiscovery/tag/
- /fr/agent/kubernetes/tag
description: Configurer l'extraction automatique des balises à partir des étiquettes
  et des annotations des pods Kubernetes pour un monitoring amélioré
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Commencer avec les balises
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Utiliser des balises avec Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs uniquement
title: Extraction de balises Kubernetes
---
L'Agent Datadog peut automatiquement attribuer des balises aux métriques, aux traces et aux journaux émis par un pod (ou un conteneur individuel au sein d'un pod) en fonction des étiquettes ou des annotations.

## Balises prêtes à l'emploi

La liste des balises attribuées automatiquement dépend de la [configuration de cardinalité][1] de l'Agent. [Cardinalité des balises][4] est ajoutée avant l'ingestion et peut avoir un impact sur la facturation, car différentes configurations de cardinalité influencent le nombre de métriques émises.

<div style="overflow-x: auto;">

  | Balise                         | Cardinalité  | Source                                                                                                                        | Exigence                                         |
  |||||
  | `container_id`                | Élevée       | État du pod                                                                                                                  | N/A                                                 |
  | `display_container_name`      | Élevée       | État du pod                                                                                                                  | N/A                                                 |
  | `pod_name`                    | Orchestrateur | Métadonnées du pod                                                                                                          | N/A                                                 |
  | `oshift_deployment`           | Orchestrateur | Annotation du pod `openshift.io/deployment.name`                                                                             | L'environnement OpenShift et l'annotation du pod doivent exister |
  | `kube_ownerref_name`          | Orchestrateur | Référence du propriétaire du pod                                                                                              | Le pod doit avoir un propriétaire                    |
  | `kube_job`                    | Orchestrateur | Référence du propriétaire du pod                                                                                              | Le pod doit être attaché à un cronjob               |
  | `kube_job`                    | Faible       | Référence du propriétaire du pod                                                                                              | Le pod doit être attaché à un job                   |
  | `kube_replica_set`            | Faible       | Référence du propriétaire du pod                                                                                              | Le pod doit être attaché à un ensemble de réplicas   |
  | `kube_service`                | Faible       | Découverte de service Kubernetes                                                                                              | Le pod est derrière un service Kubernetes            |
  | `kube_daemon_set`             | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit être attaché à un DaemonSet              |
  | `kube_container_name`         | Faible       | État du Pod                                                                                                                   | N/A                                                  |
  | `kube_namespace`              | Faible       | Métadonnées du Pod                                                                                                           | N/A                                                  |
  | `kube_app_name`               | Faible       | Étiquette du Pod `app.kubernetes.io/name`                                                                                     | L'étiquette du Pod doit exister                      |
  | `kube_app_instance`           | Faible       | Étiquette du Pod `app.kubernetes.io/instance`                                                                                 | L'étiquette du Pod doit exister                      |
  | `kube_app_version`            | Faible       | Étiquette du Pod `app.kubernetes.io/version`                                                                                  | L'étiquette du Pod doit exister                      |
  | `kube_app_component`          | Faible       | Étiquette du Pod `app.kubernetes.io/component`                                                                                | L'étiquette du Pod doit exister                      |
  | `kube_app_part_of`            | Faible       | Étiquette du Pod `app.kubernetes.io/partof`                                                                                  | L'étiquette du Pod doit exister                      |
  | `kube_app_managed_by`         | Faible       | Étiquette du Pod `app.kubernetes.io/managedby`                                                                               | L'étiquette du Pod doit exister                      |
  | `env`                         | Faible       | Étiquette du Pod `tags.datadoghq.com/env` ou variable d'environnement du conteneur (`DD_ENV` ou `OTEL_RESOURCE_ATTRIBUTES`)    | [Tagging de service unifié][2] activé                |
  | `version`                     | Faible       | Étiquette du Pod `tags.datadoghq.com/version` ou variable d'environnement du conteneur (`DD_VERSION` ou `OTEL_RESOURCE_ATTRIBUTES`) | [Tagging de service unifié][2] activé                |
  | `service`                     | Faible       | Étiquette du Pod `tags.datadoghq.com/service` ou variable d'environnement du conteneur (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES`, ou `OTEL_SERVICE_NAME`) | [Tagging de service unifié][2] activé                |
  | `pod_phase`                   | Faible       | État du Pod                                                                                                                   | N/A                                                  |
  | `oshift_deployment_config`    | Faible       | Annotation du Pod `openshift.io/deploymentconfig.name`                                                                       | L'environnement OpenShift et l'annotation du Pod doivent exister |
  | `kube_ownerref_kind`          | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit avoir un propriétaire                    |
  | `kube_deployment`             | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit être attaché à un déploiement            |
  | `kube_argo_rollout`           | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit être attaché à un déploiement argo       |
  | `kube_replication_controller` | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit être attaché à un contrôleur de réplication |
  | `kube_stateful_set`           | Faible       | Référence du propriétaire du Pod                                                                                               | Le Pod doit être attaché à un statefulset            |
  | `persistentvolumeclaim`       | Faible       | Spécification du Pod                                                                                                           | Un PVC doit être attaché au Pod                       |
  | `kube_cronjob`                | Faible       | Référence du propriétaire du Pod                                                                                              | Le Pod doit être attaché à un cronjob                   |
  | `image_name`                  | Faible       | Spécifications du Pod                                                                                                        | N/A                                                 |
  | `short_image`                 | Faible       | Spécifications du Pod                                                                                                        | N/A                                                 |
  | `image_tag`                   | Faible       | Spécifications du Pod                                                                                                        | N/A                                                 |
  | `eks_fargate_node`            | Faible       | Spécifications du Pod                                                                                                        | Environnement EKS Fargate                             |
  | `kube_runtime_class`          | Faible       | Spécifications du Pod                                                                                                        | Le Pod doit être attaché à une classe d'exécution     |
  | `gpu_vendor`                  | Faible       | Spécifications du Pod                                                                                                        | Le conteneur doit être attaché à une ressource GPU     |
  | `image_id`                    | Faible       | ID de l'image du conteneur                                                                                                    | N/A                                                 |
  | `kube_autoscaler_kind`        | Faible       | Type d'autoscaler Kubernetes                                                                                                  | L'autoscaler Kubernetes doit être utilisé              |
  | `kube_priority_class`         | Faible       | Classe de priorité du Pod                                                                                                    | Le Pod doit avoir une classe de priorité définie      |
  | `kube_qos`                    | Faible       | Classe de qualité de service du Pod                                                                                          | N/A                                                 |

</div>


### Tag hôte

L'Agent peut attacher des informations sur l'environnement Kubernetes sous forme de "tags hôtes".

<div style="overflow-x: auto;">

  | Tag                 | Cardinalité | Source                                                 | Exigence                                                      |
  |||||
  | `kube_cluster_name` | Faible         | Variable d'environnement `DD_CLUSTER_NAME` ou intégration du fournisseur de cloud | Variable d'environnement `DD_CLUSTER_NAME` ou intégration du fournisseur de cloud activée |
  | `kube_node_role`    | Faible         | Étiquette de nœud `noderole.kubernetes.io/<role>`            | L'étiquette de nœud doit exister                                |
  | `kube_node`         | Faible         | Champ `NodeName` dans les spécifications d'un pod                         |                                                              |
  | `orch_cluster_id`   | Faible         | Métadonnées du cluster d'orchestrateur                                | Environnement d'orchestrateur                                    |
  | `kube_distribution` | Faible         | Étiquettes de nœud et NodeSystemInfo                                 |  |
</div>

## Découverte automatique des tags

À partir de l'Agent v6.10+, l'Agent peut découvrir automatiquement des tags à partir des annotations de Pod. Cela permet à l'Agent d'associer des tags à toutes les données émises par l'ensemble des pods ou un conteneur individuel au sein de ce pod.

En tant que meilleure pratique dans les environnements conteneurisés, Datadog recommande d'utiliser un tagging de service unifié pour aider à unifier les tags. Le tagging de service unifié relie la télémétrie Datadog grâce à l'utilisation de trois tags standard : `env`, `service` et `version`. Pour apprendre à configurer votre environnement avec un tagging unifié, référez-vous à la documentation dédiée au [tagging de service unifié][2].

Pour appliquer un `<TAG_KEY>:<TAG_VALUE>` tag à toutes les données émises par un pod donné et collectées par l'Agent, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Si vous souhaitez appliquer un `<TAG_KEY>:<TAG_VALUE>` tag à un conteneur individuel `<CONTAINER_NAME>` au sein d'un pod, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

À partir de l'Agent v7.17+, l'Agent peut découvrir automatiquement des tags à partir des labels Docker. Ce processus permet à l'Agent d'associer des tags personnalisés à toutes les données émises par un conteneur, sans modifier la configuration de l'Agent.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

À partir de l'Agent v7.77+, les annotations de tags prennent en charge les [variables de modèle de découverte automatique][5] pour un tagging dynamique basé sur les métadonnées d'exécution. À l'exception de `%%env_<VAR>%%`, toutes les variables de modèle sont prises en charge.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## Extraction des tags

À partir de la version 7.64+, l'Agent et l'Agent de Cluster peuvent être configurés pour collecter des labels et des annotations à partir des ressources Kubernetes et les utiliser comme tags à partir d'une configuration commune. Datadog recommande d'utiliser les options suivantes pour garantir un reporting cohérent entre le balisage principal de l'Agent, le reporting KSM du Cluster Agent et le reporting de l'Orchestrator Explorer des deux Agents :
 `kubernetesResourcesLabelsAsTags`
 `kubernetesResourcesAnnotationsAsTags`

Ces options doivent être utilisées à la place des anciennes options de l'Agent `podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags` et de tout remplacement de configuration KSM.

Ces configurations font référence au type de ressource de l'objet à partir duquel extraire les métadonnées. Chaque type de ressource doit être spécifié au format `resourceType.apiGroup`, où `resourceType` est le nom au pluriel de la ressource. Les ressources dans le groupe API vide (par exemple, les pods et les nœuds) peuvent être spécifiées en utilisant uniquement le nom `resourceType`.

Par exemple, exécutez `kubectl apiresources` pour récupérer cette information :

| Nom         | Version API                  | Configuration de ressource Datadog  |
||||
| pods        | v1                           | pods                            |
| nœuds       | v1                           | nœuds                           |
| espaces de noms | v1                           | espaces de noms                      |
| déploiements | apps/v1                      | déploiements.apps                |
| rôles       | rbac.authorization.k8s.io/v1 | rôles.rbac.authorization.k8s.io |

**Remarques :**

 Les tags *ne* se propagent *pas* entre la charge de travail et les ressources enfants. Par exemple, les étiquettes sur un déploiement ne sont pas automatiquement appliquées aux journaux de ses Pods enfants. Pour taguer les données des Pods, configurez l'extraction des étiquettes directement sur les Pods.
 Les tags *se* propagent des espaces de noms vers les pods et les conteneurs qui s'y trouvent.
 Utilisez Datadog Agent 7.73+ pour utiliser des caractères génériques dans les règles d'extraction des tags pour vos métriques KSM.

### Étiquettes des ressources Kubernetes en tant que tags

Cette option est utilisée pour extraire une étiquette donnée sur vos ressources Kubernetes et l'envoyer en tant que tag Datadog.

{{< tabs >}}

{{% tab "Opérateur Datadog" %}}

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      <RESOURCE>:
        <LABEL>: <TAG_KEY>
```

Par exemple, pour extraire les étiquettes de ressources des nœuds, des pods et des déploiements :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesLabelsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

Par exemple, pour extraire les étiquettes de ressources des nœuds, des pods et des déploiements :

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à **la fois** à vos conteneurs Agent et Cluster Agent.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

Par exemple, pour extraire les étiquettes de ressources des nœuds, des pods et des déploiements :

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Pour l'Agent 7.73.0+, utilisez la configuration suivante pour ajouter toutes les étiquettes de ressources en tant que tags à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :
```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**Remarques** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Fusion avec des configurations héritées

<div class="alert alert-info">

Cette option de configuration est fusionnée avec d'autres configurations définies dans <a href="/containers/kubernetes/tag/#pod-labels-as-tags">podLabelsAsTags</a>, <a href="/containers/kubernetes/tag/#namespace-labels-as-tags">namespaceLabelsAsTags</a> et <a href="/containers/kubernetes/tag/#node-labels-as-tags">nodeLabelsAsTags</a>. En cas de conflit, <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">`kubernetesResourcesLabelsAsTags`</a> a la priorité lors de la fusion des configurations.

Par exemple, si vous avez les configurations suivantes :

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      label-1: tag-a
      label-2: tag-b

  podLabelsAsTags:
    label-2: legacy-tag-c
    label-3: legacy-tag-d
```

Le mappage suivant est utilisé pour extraire des balises des étiquettes de pod :

```yaml
label-1: tag-a
label-2: tag-b
label-3: legacy-tag-d
```

</div>

### Annotations des ressources Kubernetes en tant que balises

Cette option extrait une annotation spécifiée de vos ressources Kubernetes et l'envoie en tant que balise Datadog.

{{< tabs >}}

{{% tab "Opérateur Datadog" %}}

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      <RESOURCE>:
        <ANNOTATION>: <TAG_KEY>
```

Par exemple, pour extraire des annotations de ressources des nœuds, des pods et des déploiements :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    kubernetesResourcesAnnotationsAsTags:
      nodes:
        kubernetes.io/arch: arch
      pods:
        role: pod_role
      deployments.apps:
        team: kube_team
```

{{% /tab %}}

{{% tab "Helm" %}}

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    <RESOURCE>:
      <ANNOTATION>: <TAG_KEY>
```

Par exemple, pour extraire des annotations de ressources des nœuds, des pods et des déploiements :

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    nodes:
      kubernetes.io/arch: arch
    pods:
      role: pod_role
    deployments.apps:
      team: kube_team
```

{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à **la fois** à vos conteneurs Agent et Cluster Agent.

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"<RESOURCE>":{"<ANNOTATION>":"<TAG_KEY>"}}'
```

Par exemple, pour extraire des annotations de ressources des nœuds, des pods et des déploiements :

```yaml
- name: DD_KUBERNETES_RESOURCES_ANNOTATIONS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Pour l'Agent 7.73.0 et plus, utilisez la configuration suivante pour ajouter toutes les annotations de ressources en tant que balises à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**Remarques** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

<div class="alert alert-info">

Cette option de configuration est fusionnée avec d'autres configurations définies dans <a href="/containers/kubernetes/tag/#pod-annotations-as-tags">podAnnotationsAsTags</a>. En cas de conflit, <a href="/containers/kubernetes/tag/#kubernetes-resources-annotations-as-tags">`kubernetesResourcesAnnotationsAsTags`</a> a la priorité lors de la fusion des configurations.

Par exemple, si vous avez les configurations suivantes :

```yaml
datadog:
  kubernetesResourcesAnnotationsAsTags:
    pods:
      annotation-1: tag-a
      annotation-2: tag-b

  podAnnotationsAsTags:
    annotation-2: legacy-tag-c
    annotation-3: legacy-tag-d
```

Le mappage suivant est utilisé pour extraire des balises des annotations de pod :

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="Configuration héritée" level="h4" expanded=false id="legacy-configuration" %}}
#### Étiquettes de nœud en tant que balises

<div class="alert alert-info">

Si vous êtes sur la version de l'agent 7.58.0 ou plus, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes en tant que balises</a> pour configurer les étiquettes en tant que balises.

</div>

À partir de l'Agent v6.0, l'Agent peut collecter des étiquettes pour un nœud donné et les utiliser comme balises à attacher à toutes les métriques, traces et journaux émis associés à cet `hôte` dans Datadog :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      <NODE_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      kubernetes.io/arch: arch
```

Pour l'Agent v7.24.0 et plus, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud en tant que balises à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    nodeLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  nodeLabelsAsTags:
    <NODE_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  nodeLabelsAsTags:
    kubernetes.io/arch: arch
```

Pour l'Agent v7.24.0 et plus, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud en tant que balises à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Pour l'Agent v7.24.0 et plus, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud en tant que balises à vos métriques. Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Étiquettes de pod en tant que balises

<div class="alert alert-info">

Si vous utilisez la version de l'agent 7.58.0 ou supérieure, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes en tant que balises</a> pour configurer les étiquettes de pod en tant que balises.

</div>

À partir de l'Agent v6.0, l'Agent peut collecter des étiquettes pour un pod donné et les utiliser comme balises à attacher à toutes les métriques, traces et journaux émis par ce pod :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      <POD_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      app: kube_app
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod en tant que balises à vos métriques. Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  podLabelsAsTags:
    <POD_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  podLabelsAsTags:
    app: kube_app
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod en tant que balises à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod en tant que balises à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Annotations de pod en tant que balises

<div class="alert alert-info">

Si vous utilisez la version de l'agent 7.58.0 ou supérieure, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes en tant que balises</a> pour configurer les annotations de pod en tant que balises.

</div>

À partir de l'Agent v6.0, l'Agent peut collecter des annotations pour un pod donné et les utiliser comme balises à attacher à toutes les métriques, traces et journaux émis par ce pod :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml`

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      <POD_ANNOTATION>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      app: kube_app
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant que balises à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    podAnnotationsAsTags:
      "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  podAnnotationsAsTags:
    <POD_ANNOTATION>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  podAnnotationsAsTags:
    app: kube_app
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant que balises à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Pour l'Agent v7.24.0 ou supérieur, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant que balises à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Étiquettes de namespace en tant que balises

<div class="alert alert-info">

Si vous utilisez la version de l'agent 7.58.0 ou supérieure, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes en tant que balises</a> pour configurer les étiquettes de namespace en tant que balises.

</div>

À partir de l'Agent 7.55.0, l'Agent peut collecter des étiquettes pour un namespace donné et les utiliser comme balises à attacher à toutes les métriques, traces et journaux émis par tous les pods dans ce namespace :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      <NAMESPACE_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      app: kube_app
```

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant que tags à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    namespaceLabelsAsTags:
      "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  namespaceLabelsAsTags:
    <NAMESPACE_LABEL>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  namespaceLabelsAsTags:
    app: kube_app
```

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant que tags à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant que tags à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des balises sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.
{{% /collapse-content %}}

### Variables d'environnement des conteneurs en tant que tags

À partir de l'Agent v7.32+, l'Agent peut collecter les variables d'environnement des conteneurs et les utiliser comme tags à attacher à toutes les métriques, traces et journaux correspondant au conteneur. Les conteneurs `docker` et `containerd` sont pris en charge :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_ENV_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"<ENV_VAR>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  env:
    - name: DD_CONTAINER_ENV_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENV_VAR>": "<TAG_KEY>"}'
```

Par exemple :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Voir [Facturation des métriques personnalisées][3] pour plus de détails.

### Étiquettes de conteneur en tant que tags

À partir de l'Agent v7.33+, l'Agent peut collecter les étiquettes de conteneur et les utiliser comme tags. L'agent attache les tags à toutes les métriques, traces et journaux associés au conteneur.

L'Agent peut générer des tags à partir des étiquettes de conteneur pour les conteneurs `docker` et `containerd`. Dans le cas de `containerd`, la version minimale prise en charge est v1.5.6, car les versions précédentes ne propagent pas correctement les étiquettes.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration `DatadogAgent` de votre opérateur dans `datadogagent.yaml` :

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    nodeAgent:
      env:
        - name: DD_CONTAINER_LABELS_AS_TAGS
          value: '{"app":"kube_app"}'
```

{{% /tab %}}

{{% tab "Helm" %}}
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadogvalues.yaml` :

```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"<CONTAINER_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :
```yaml
datadog:
  env:
    - name: DD_CONTAINER_LABELS_AS_TAGS
      value: '{"app":"kube_app"}'
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de tag `<TAG_KEY>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<CONTAINER_LABEL>":"<TAG_KEY>"}'
```

Par exemple :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Voir [Facturation des métriques personnalisées][3] pour plus de détails.

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environmentvariables
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/account_management/billing/custom_metrics
[4]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tagscardinality
[5]: /fr/conteneurs/guide/variables_de_template/