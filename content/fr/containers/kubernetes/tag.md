---
aliases:
- /fr/agent/autodiscovery/tag/
- /fr/agent/kubernetes/tag
description: Configurer l'extraction automatique des balises à partir des étiquettes
  et des annotations des pods Kubernetes pour un suivi amélioré
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

La liste des balises attribuées automatiquement dépend de la [configuration de cardinalité][1] de l'Agent. [Cardinalité des balises][4] est ajoutée avant l'ingestion et peut avoir un impact sur la facturation, car différents paramètres de cardinalité influencent le nombre de métriques émises.

<div style="overflow-x: auto;">

  | Balise                           | Cardinalité  | Source                                                                                                                        | Exigence                                         |
  |-------------------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | Élevé         | État du pod                                                                                                                    | N/A                                                 |
  | `display_container_name`      | Élevé         | État du pod                                                                                                                    | N/A                                                 |
  | `pod_name`                    | Orchestrateur | Métadonnées du pod                                                                                                                  | N/A                                                 |
  | `oshift_deployment`           | Orchestrateur | Annotation du pod `openshift.io/deployment.name`                                                                                 | L'environnement OpenShift et l'annotation du pod doivent exister |
  | `kube_ownerref_name`          | Orchestrateur | Référence du propriétaire du pod                                                                                                                  | Le pod doit avoir un propriétaire                              |
  | `kube_job`                    | Orchestrateur | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un cronjob                   |
  | `kube_job`                    | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un job                       |
  | `kube_replica_set`            | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un ensemble de réplicas               |
  | `kube_service`                | Faible          | Découverte de service Kubernetes                                                                                                  | Le pod est derrière un service Kubernetes                  |
  | `kube_daemon_set`             | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un DaemonSet                 |
  | `kube_container_name`         | Faible          | État du pod                                                                                                                    | N/A                                                 |
  | `kube_namespace`              | Faible          | Métadonnées du pod                                                                                                                  | N/A                                                 |
  | `kube_app_name`               | Faible          | Étiquette du pod `app.kubernetes.io/name`                                                                                            | L'étiquette du pod doit exister                                |
  | `kube_app_instance`           | Faible          | Étiquette du pod `app.kubernetes.io/instance`                                                                                        | L'étiquette du pod doit exister                                |
  | `kube_app_version`            | Faible          | Étiquette du pod `app.kubernetes.io/version`                                                                                         | L'étiquette du pod doit exister                                |
  | `kube_app_component`          | Faible          | Étiquette du pod `app.kubernetes.io/component`                                                                                       | L'étiquette du pod doit exister                                |
  | `kube_app_part_of`            | Faible          | Étiquette du pod `app.kubernetes.io/part-of`                                                                                         | L'étiquette du pod doit exister                                |
  | `kube_app_managed_by`         | Faible          | Étiquette du pod `app.kubernetes.io/managed-by`                                                                                      | L'étiquette du pod doit exister                                |
  | `env`                         | Faible          | Étiquette du pod `tags.datadoghq.com/env` ou variable d'environnement du conteneur (`DD_ENV` ou `OTEL_RESOURCE_ATTRIBUTES`)                               | [Tagging de service unifié][2] activé                |
  | `version`                     | Faible          | Étiquette du pod `tags.datadoghq.com/version` ou variable d'environnement du conteneur (`DD_VERSION` ou `OTEL_RESOURCE_ATTRIBUTES`)                       | [Tagging de service unifié][2] activé                |
  | `service`                     | Faible          | Étiquette du pod `tags.datadoghq.com/service` ou variable d'environnement du conteneur (`DD_SERVICE`, `OTEL_RESOURCE_ATTRIBUTES` ou `OTEL_SERVICE_NAME`) | [Tagging de service unifié][2] activé                |
  | `pod_phase`                   | Faible          | État du pod                                                                                                                    | N/A                                                 |
  | `oshift_deployment_config`    | Faible          | Annotation du pod `openshift.io/deployment-config.name`                                                                          | L'environnement OpenShift et l'annotation du pod doivent exister |
  | `kube_ownerref_kind`          | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit avoir un propriétaire                              |
  | `kube_deployment`             | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un déploiement                |
  | `kube_argo_rollout`           | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un déploiement argo             |
  | `kube_replication_controller` | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un contrôleur de réplication    |
  | `kube_stateful_set`           | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un statefulset               |
  | `persistentvolumeclaim`       | Faible          | Spécification du pod                                                                                                                      | Un PVC doit être attaché au pod                   |
  | `kube_cronjob`                | Faible          | Référence du propriétaire du pod                                                                                                                  | Le pod doit être attaché à un cronjob                   |
  | `image_name`                  | Faible          | Spécification du pod                                                                                                                      | N/A                                                 |
  | `short_image`                 | Faible          | Spécification du pod                                                                                                                      | N/A                                                 |
  | `image_tag`                   | Faible          | Spécification du pod                                                                                                                      | N/A                                                 |
  | `eks_fargate_node`            | Faible          | Spécification du pod                                                                                                                      | Environnement EKS Fargate                             |
  | `kube_runtime_class`          | Faible          | Spécification du pod                                                                                                                      | Le pod doit être attaché à une classe d'exécution             |
  | `gpu_vendor`                  | Faible          | Spécification du pod                                                                                                                      | Le conteneur doit être attaché à une ressource GPU        |
  | `image_id`                    | Faible          | ID de l'image du conteneur                                                                                                            | N/A                                                 |
  | `kube_autoscaler_kind`        | Faible          | Type d'autoscaler Kubernetes                                                                                                    | L'autoscaler Kubernetes doit être utilisé                  |
  | `kube_priority_class`         | Faible          | Classe de priorité du pod                                                                                                            | Le pod doit avoir une classe de priorité définie                    |
  | `kube_qos`                    | Faible          | Classe de qualité de service du pod                                                                                                  | N/A                                                 |

</div>


### Tag hôte

L'Agent peut attacher des informations sur l'environnement Kubernetes en tant que "tags hôtes".

<div style="overflow-x: auto;">

  | Tag                 | Cardinalité | Source                                                 | Exigence                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Faible         | `DD_CLUSTER_NAME` intégration envvar ou fournisseur de cloud | `DD_CLUSTER_NAME` intégration envvar ou fournisseur de cloud activée |
  | `kube_node_role`    | Faible         | Étiquette de nœud `node-role.kubernetes.io/<role>`            | L'étiquette de nœud doit exister                                          |
  | `kube_node`         | Faible         | `NodeName` champ dans les spécifications d'un pod             |                                                              |
  | `orch_cluster_id`   | Faible         | Métadonnées du cluster orchestrateur                          |  Environnement orchestrateur                                    |
  | `kube_distribution` | Faible         | Étiquettes de nœud et NodeSystemInfo                         |  |
</div>

## Autodécouverte de tag

À partir de l'Agent v6.10+, l'Agent peut autodécouvrir des tags à partir des annotations de pod. Il permet à l'Agent d'associer des tags à toutes les données émises par l'ensemble des pods ou un conteneur individuel au sein de ce pod.

En tant que meilleure pratique dans les environnements conteneurisés, Datadog recommande d'utiliser un étiquetage de service unifié pour aider à unifier les tags. L'étiquetage de service unifié relie la télémétrie de Datadog grâce à l'utilisation de trois tags standard : `env`, `service` et `version`. Pour apprendre à configurer votre environnement avec un étiquetage unifié, référez-vous à la documentation dédiée à l'[étiquetage de service unifié][2].

Pour appliquer un tag `<TAG_KEY>:<TAG_VALUE>` à toutes les données émises par un pod donné et collectées par l'Agent, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

Si vous souhaitez appliquer un tag `<TAG_KEY>:<TAG_VALUE>` à un conteneur individuel `<CONTAINER_NAME>` au sein d'un pod, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/<CONTAINER_NAME>.tags: '{"<TAG_KEY>": "<TAG_VALUE>","<TAG_KEY_1>": "<TAG_VALUE_1>"}'
```

À partir de la version 7.17+ de l'Agent, l'Agent peut découvrir automatiquement des tags à partir des étiquettes Docker. Ce processus permet à l'Agent d'associer des tags personnalisés à toutes les données émises par un conteneur, sans modifier la configuration de l'Agent.

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY>:TAG_VALUE", "<TAG_KEY_1>:<TAG_VALUE_1>"]'
```

À partir de la version 7.77+ de l'Agent, les annotations de tags prennent en charge les [variables de modèle d'autodécouverte][5] pour un étiquetage dynamique basé sur les métadonnées d'exécution. À l'exception de `%%env_<VAR>%%`, toutes les variables de modèle sont prises en charge.

```yaml
annotations:
  ad.datadoghq.com/tags: '{"pod_ip":"%%host%%","pod_name":"%%kube_pod_name%%","namespace":"%%kube_namespace%%"}'
  ad.datadoghq.com/nginx.tags: '{"container_port":"%%port_80%%"}'
```

## Extraction de tag
À partir de la version 7.64+, l'Agent et l'Agent de Cluster peuvent être configurés pour collecter des étiquettes et des annotations à partir des ressources Kubernetes et les utiliser comme tags à partir d'une configuration commune. Datadog recommande d'utiliser les options suivantes pour garantir un reporting cohérent entre l'étiquetage de base de l'Agent, le reporting KSM de l'Agent de Cluster et le reporting de l'Orchestrateur Explorer des deux Agents :
- `kubernetesResourcesLabelsAsTags`
- `kubernetesResourcesAnnotationsAsTags`

Ces options doivent être utilisées au lieu des options héritées de l'Agent `podLabelsAsTags`, `nodeLabelsAsTags`, `namespaceLabelsAsTags`, et de tout remplacement de configuration KSM.

Ces configurations font référence au type de ressource de l'objet à partir duquel extraire les métadonnées. Chaque type de ressource doit être spécifié au format `resourceType.apiGroup`, où `resourceType` est le nom au pluriel de la ressource. Les ressources dans le groupe d'API vide (par exemple, les pods et les nœuds) peuvent être spécifiées en utilisant uniquement le nom `resourceType`.

Par exemple, exécutez `kubectl api-resources` pour récupérer cette information :

| Nom        | Version API                  | Configuration de ressource Datadog  |
|-------------|------------------------------|---------------------------------|
| pods        | v1                           | pods                            |
| nœuds       | v1                           | nœuds                           |
| espaces de noms  | v1                           | espaces de noms                      |
| déploiements | apps/v1                      | déploiements.apps                |
| rôles       | rbac.authorization.k8s.io/v1 | rôles.rbac.authorization.k8s.io |

**Notes:**

- Les tags *ne* se pas propager entre la charge de travail et les ressources enfants. Par exemple, les étiquettes sur un déploiement ne sont pas automatiquement appliquées aux journaux de ses Pods enfants. Pour taguer les données des Pods, configurez l'extraction des étiquettes directement sur les Pods.
- Les tags *se* propagent du namespace vers les pods et les conteneurs à l'intérieur de ceux-ci.
- Utilisez Datadog Agent 7.73+ pour utiliser des jokers dans les règles d'extraction de tags pour vos métriques KSM.

### Étiquettes des ressources Kubernetes en tant que tags

Cette option est utilisée pour extraire une étiquette donnée sur vos ressources Kubernetes et l'envoyer en tant que tag Datadog.

{{< tabs >}}

{{% tab "Opérateur Datadog" %}}

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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

Par exemple, pour extraire les étiquettes de ressource des nœuds, pods et déploiements :

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

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    <RESOURCE>:
      <LABEL>: <TAG_KEY>
```

Par exemple, pour extraire les étiquettes de ressource des nœuds, pods et déploiements :

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

Pour extraire une étiquette de ressource donnée `<LABEL>` et les transformer en clés de tag `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à **à la fois** vos conteneurs Agent et Cluster Agent.

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"<RESOURCE>":{"<LABEL>":"<TAG_KEY>"}}'
```

Par exemple, pour extraire les étiquettes de ressource des nœuds, pods et déploiements :

```yaml
- name: DD_KUBERNETES_RESOURCES_LABELS_AS_TAGS
  value: '{"deployments.apps":{"team":"kube_team"},"nodes":{"kubernetes.io/arch":"arch"},"pods":{"role":"pod_role"}}'
```

{{% /tab %}}
{{< /tabs >}}

Pour Agent 7.73.0+, utilisez la configuration suivante pour ajouter toutes les étiquettes de ressource en tant que tags à vos métriques. Dans cet exemple, les noms de balises sont préfixés par `<PREFIX>_` :

```yaml
    #(...)
    kubernetesResourcesLabelsAsTags:
      pods:
        "*": <PREFIX>_%%label%%
```

**Notes** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

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

Le mappage suivant est utilisé pour extraire des balises à partir des étiquettes de pod :

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

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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

Pour extraire une annotation de ressource donnée `<ANNOTATION>` et les transformer en clés de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à **à la fois** vos conteneurs Agent et Cluster Agent.

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

Pour Agent 7.73.0+, utilisez la configuration suivante pour ajouter toutes les annotations de ressources en tant que balises à vos métriques. Dans cet exemple, les noms de balises sont préfixés par `<PREFIX>_` :

```yaml
    #(...)
    kubernetesResourcesAnnotationsAsTags:
      pods:
        "*": <PREFIX>_%%annotation%%
```

**Notes** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

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

Le mappage suivant est utilisé pour extraire des balises à partir des annotations de pod :

```yaml
annotation-1: tag-a
annotation-2: tag-b
annotation-3: legacy-tag-d
```

</div>


{{% collapse-content title="Configuration héritée" level="h4" expanded=false id="legacy-configuration" %}}
#### Étiquettes de nœud en tant que balises

<div class="alert alert-info">

Si vous utilisez la version 7.58.0 ou supérieure de l'agent, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes comme tags</a> pour configurer les étiquettes des nœuds comme tags.

</div>

À partir de la version 6.0 de l'Agent, celui-ci peut collecter des étiquettes pour un nœud donné et les utiliser comme tags à attacher à toutes les métriques, traces et journaux émis associés à ce `host` dans Datadog :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud comme tags à vos métriques. Dans cet exemple, les noms de balises sont préfixés par `<PREFIX>_` :

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
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud comme tags à vos métriques. Dans cet exemple, les noms de balises sont préfixés par `<PREFIX>_` :


```yaml
datadog:
  nodeLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de nœud donnée `<NODE_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<NODE_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"kubernetes.io/arch":"arch"}'
```

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de nœud comme tags à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}' # Note: wildcards do not work for KSM metrics before version 7.73
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Étiquettes de pod comme tags

<div class="alert alert-info">

Si vous utilisez la version 7.58.0 ou supérieure de l'agent, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes comme tags</a> pour configurer les étiquettes de pod comme tags.

</div>

À partir de la version 6.0 de l'Agent, celui-ci peut collecter des étiquettes pour un pod donné et les utiliser comme tags à attacher à toutes les métriques, traces et journaux émis par ce pod :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod comme tags à vos métriques. Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

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
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod comme tags à vos métriques, sauf celles provenant de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  podLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de pod donnée `<POD_LABEL>` et la transformer en clé de tag `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<POD_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour la version 7.24.0 de l'Agent et supérieure, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de pod comme tags à vos métriques, sauf celles provenant de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Annotations de pod comme tags

<div class="alert alert-info">

Si vous utilisez la version 7.58.0 ou supérieure de l'agent, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags">les étiquettes des ressources Kubernetes comme tags</a> pour configurer les annotations de pod comme tags.

</div>

À partir de l'Agent v6.0+, l'Agent peut collecter des annotations pour un pod donné et les utiliser comme étiquettes à attacher à toutes les métriques, traces et journaux émis par ce pod :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml`

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

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

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
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  podAnnotationsAsTags:
    "*": <PREFIX>_%%annotation%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une annotation de pod donnée `<POD_ANNOTATION>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<POD_ANNOTATION>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les annotations de pod en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PREFIX>_%%annotation%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.

#### Étiquettes de namespace en tant qu'étiquettes

<div class="alert alert-info">

Si vous utilisez la version de l'agent 7.58.0+, il est conseillé d'utiliser <a href="/containers/kubernetes/tag/#kubernetes-resources-labels-as-tags"> les étiquettes des ressources Kubernetes en tant qu'étiquettes </a> pour configurer les étiquettes de namespace en tant qu'étiquettes.

</div>

À partir de l'Agent 7.55.0+, l'Agent peut collecter des étiquettes pour un namespace donné et les utiliser comme étiquettes à attacher à toutes les métriques, traces et journaux émis par tous les pods dans ce namespace :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

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
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```yaml
datadog:
  namespaceLabelsAsTags:
    "*": <PREFIX>_%%label%% # Note: wildcards do not work for KSM metrics
```
{{% /tab %}}

{{% tab "Manuel (DaemonSet)" %}}
Pour extraire une étiquette de namespace donnée `<NAMESPACE_LABEL>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<NAMESPACE_LABEL>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour l'Agent v7.24.0+, utilisez la configuration de variable d'environnement suivante pour ajouter toutes les étiquettes de namespace en tant qu'étiquettes à vos métriques, sauf celles de KSM (`kubernetes_state.*`). Dans cet exemple, les noms des tags sont préfixés par `<PREFIX>_` :

```bash
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PREFIX>_%%label%%"}'
```
{{% /tab %}}
{{< /tabs >}}

**Remarque** : Les métriques personnalisées peuvent avoir un impact sur la facturation. Consultez la [page de facturation des métriques personnalisées][3] pour plus d'informations.
{{% /collapse-content %}}

### Variables d'environnement de conteneur en tant qu'étiquettes

À partir de l'Agent v7.32+, l'Agent peut collecter des variables d'environnement de conteneur et les utiliser comme étiquettes à attacher à toutes les métriques, traces et journaux correspondant au conteneur. Les conteneurs `docker` et `containerd` sont pris en charge :

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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
Pour extraire une variable d'environnement donnée `<ENV_VAR>` et la transformer en clé d'étiquette `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

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

### Étiquettes de conteneur en tant que balises

À partir de l'Agent v7.33+, l'Agent peut collecter des étiquettes de conteneur et les utiliser comme balises. L'agent attache les balises à toutes les métriques, traces et journaux associés au conteneur.

L'Agent peut générer des balises à partir des étiquettes de conteneur pour les conteneurs `docker` et `containerd`. Dans le cas de `containerd`, la version minimale prise en charge est v1.5.6, car les versions précédentes ne propagent pas correctement les étiquettes.

{{< tabs >}}
{{% tab "Opérateur Datadog" %}}
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à la configuration de votre Opérateur `DatadogAgent` dans `datadog-agent.yaml` :

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
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la configuration suivante à votre fichier Helm `datadog-values.yaml` :

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
Pour extraire une étiquette de conteneur donnée `<CONTAINER_LABEL>` et la transformer en clé de balise `<TAG_KEY>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

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

[1]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/account_management/billing/custom_metrics
[4]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[5]: /fr/containers/guide/template_variables/