---
aliases:
- /fr/agent/autodiscovery/tag/
- /fr/agent/kubernetes/tag
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Utiliser des tags avec Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs
title: Extraction de tags dans Kubernetes
---

L'Agent peut créer et attribuer des tags à toutes les métriques, toutes les traces et tous les logs émis par un pod, en fonction de ses étiquettes ou de ses annotations.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur dans votre cluster Kubernetes, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent conteneurisé](?tab=agentconteneurise).

## Tags prêts à l'emploi

L'Agent peut découvrir automatiquement des tags et les ajouter à toutes les données générées par des pods entiers ou par un conteneur spécifique dans un pod. La liste des tags ajoutés automatiquement dépend de la [configuration de cardinalité][1] de l'Agent.

<div style="overflow-x: auto;">

  | Tag                           | Cardinalité  | Source                                                                  | Prérequis                                        |
  |-------------------------------|--------------|-------------------------------------------------------------------------|-----------------------------------------------------|
  | `container_id`                | Élevée         | Statut de pod                                                              | S.O.                                                 |
  | `display_container_name`      | Élevée         | Statut de pod                                                              | S.O.                                                 |
  | `pod_name`                    | Orchestrateur | Métadonnées de pod                                                            | S.O.                                                 |
  | `oshift_deployment`           | Orchestrateur | Annotation de pod `openshift.io/deployment.name`                           | L'environnement OpenShift et l'annotation de pod doivent exister. |
  | `kube_ownerref_name`          | Orchestrateur | Ownerref de pod                                                            | Le pod doit avoir un propriétaire.                              |
  | `kube_job`                    | Orchestrateur | Ownerref de pod                                                            | Le pod doit être ajouté à un cronjob.                   |
  | `kube_job`                    | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un job.                       |
  | `kube_replica_set`            | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un ReplicaSet.               |
  | `kube_service`                | Faible          | Découverte de service Kubernetes                                            | Le pod se trouve derrière un service Kubernetes.                  |
  | `kube_daemon_set`             | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un DaemonSet.                 |
  | `kube_container_name`         | Faible          | Statut de pod                                                              | S.O.                                                 |
  | `kube_namespace`              | Faible          | Métadonnées de pod                                                            | S.O.                                                 |
  | `kube_app_name`               | Faible          | Étiquette de pod `app.kubernetes.io/name`                                      | L'étiquette de pod doit exister.                                |
  | `kube_app_instance`           | Faible          | Étiquette de pod `app.kubernetes.io/instance`                                  | L'étiquette de pod doit exister.                                |
  | `kube_app_version`            | Faible          | Étiquette de pod `app.kubernetes.io/version`                                   | L'étiquette de pod doit exister.                                |
  | `kube_app_component`          | Faible          | Étiquette de pod `app.kubernetes.io/component`                                 | L'étiquette de pod doit exister.                                |
  | `kube_app_part_of`            | Faible          | Étiquette de pod `app.kubernetes.io/part-of`                                   | L'étiquette de pod doit exister.                                |
  | `kube_app_managed_by`         | Faible          | Étiquette de pod `app.kubernetes.io/managed-by`                                | L'étiquette de pod doit exister.                                |
  | `env`                         | Faible          | Étiquette de pod `tags.datadoghq.com/env` ou variable d'environnement de container `DD_ENV`         | Le [tagging de service unifié][2] est activé.                |
  | `version`                     | Faible          | Étiquette de pod `tags.datadoghq.com/version` ou variable d'environnement de conteneur `DD_VERSION` | Le [tagging de service unifié][2] est activé.                |
  | `service`                     | Faible          | Étiquette de pod `tags.datadoghq.com/service` ou variable d'environnement de conteneur `DD_SERVICE` | Le [tagging de service unifié][2] est activé.                |
  | `pod_phase`                   | Faible          | Statut de pod                                                              | S.O.                                                 |
  | `oshift_deployment_config`    | Faible          | Annotation de pod `openshift.io/deployment-config.name`                    | L'environnement OpenShift et l'annotation de pod doivent exister. |
  | `kube_ownerref_kind`          | Faible          | Ownerref de pod                                                            | Le pod doit avoir un propriétaire.                              |
  | `kube_deployment`             | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un déploiement.                |
  | `kube_replication_controller` | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un contrôleur de réplication.    |
  | `kube_stateful_set`           | Faible          | Ownerref de pod                                                            | Le pod doit être ajouté à un statefulset.               |
  | `persistentvolumeclaim`       | Faible          | Spécification de pod                                                                | Une PVC (demande de volume persistant) doit être ajoutée au pod.                   |
  | `kube_cronjob`                | Faible          | Ownerref de pod                                                            | Un pod doit être ajouté à un cronjob.                   |
  | `image_name`                  | Faible          | Spécification de pod                                                                | S.O.                                                 |
  | `short_image`                 | Faible          | Spécification de pod                                                                | S.O.                                                 |
  | `image_tag`                   | Faible          | Spécification de pod                                                                | S.O.                                                 |
  | `eks_fargate_node`            | Faible          | Spécification de pod                                                                | Environnement EKS Fargate                                       |

</div>


### Tag host

L'Agent peut ajouter des informations sur l'environnement Kubernetes sous la forme de tags de host.

<div style="overflow-x: auto;">

  | Tag                 | Cardinalité | Source                                                 | Prérequis                                                    |
  |---------------------|-------------|--------------------------------------------------------|----------------------------------------------------------------|
  | `kube_cluster_name` | Faible         | Variable d'environnement `DD_CLUSTER_NAME` ou intégration de fournisseur cloud | La variable d'environnement `DD_CLUSTER_NAME` ou l'intégration de fournisseur cloud est activée. |
  | `kube_node_role`    | Faible         | Étiquette de nœud `node-role.kubernetes.io/<role>`            | L'étiquette de nœud doit exister.                                          |

</div>

## Récupération automatique des tags

À partir de la version 6.10+ de l'Agent, l'Agent peut automatiquement récupérer les tags des annotations de pod. Il est ainsi capable d'associer des tags à l'ensemble des données envoyées par un pod entier ou par un conteneur spécifique dans ce pod.

Datadog vous conseille d'utiliser le tagging de service unifié pour mieux unifier vos tags dans les environnements conteneurisés. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][2].

Pour appliquer un tag `<CLÉ_TAG>:<VALEUR_TAG>` à l'ensemble des données envoyées par un pod donné et recueillies par l'Agent, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<CLÉ_TAG>": "<VALEUR_TAG>","<CLÉ_TAG_1>": "<VALEUR_TAG_1>"}'
```

Si vous souhaitez appliquer un tag `<CLÉ_TAG>:<VALEUR_TAG>` à un conteneur `<IDENTIFICATEUR_CONTENEUR>` spécifique dans un pod, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.tags: '{"<CLÉ_TAG>": "<VALEUR_TAG>","<CLÉ_TAG_1>": "<VALEUR_TAG_1>"}'
```

À partir de la version 7.17+ de l'Agent, l'Agent peut automatiquement récupérer les tags à partir des étiquettes Docker. Il peut ainsi appliquer des tags personnalisés à l'ensemble des données envoyées par un conteneur, sans qu'il soit nécessaire de [modifier son fichier `datadog.yaml`][3].

```yaml
com.datadoghq.ad.tags: '["<CLÉ_TAG>:VALEUR_TAG", "<CLÉ_TAG_1>:<VALEUR_TAG_1>"]'
```

## Étiquettes de nœud comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un nœud donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par l'ensemble des pods sur ce nœud :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud `<ÉTIQUETTE_NŒUD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<ÉTIQUETTE_NŒUD>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour les versions 7.24.0 et ultérieures de l'Agent, utilisez la configuration de variable d'environnement suivante pour appliquer l'ensemble des étiquettes de nœud en tant que tags à vos métriques. Dans cet exemple, les noms des tags sont précédés de `<PRÉFIXE>_` :

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"*":"<PRÉFIXE>_%%label%%"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur votre facturation. Consultez la [page de facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette de nœud `<ÉTIQUETTE_NŒUD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
kubernetes_node_labels_as_tags:
  <ÉTIQUETTE_NŒUD>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
kubernetes_node_labels_as_tags:
  app: kube_app
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Étiquettes de pod comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un pod donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par ce pod :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud `<ÉTIQUETTE_POD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"<ÉTIQUETTE_POD>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Pour la version >= 6.8.0 de l'Agent, utilisez la configuration de variable d'environnement suivante pour appliquer l'ensemble des étiquettes de pod comme tags à vos métriques. Dans cet exemple, les noms de tag sont précédés de `<PRÉFIXE>_` :

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"*":"<PRÉFIXE>_%%label%%"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur votre facturation. Consultez la [page de facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette de pod `<ÉTIQUETTE_POD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
kubernetes_pod_labels_as_tags:
  <ÉTIQUETTE_POD>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
kubernetes_pod_labels_as_tags:
  app: kube_app
```

Pour la version >= 6.8.0 de l'Agent, utilisez la configuration de variable d'environnement suivante pour appliquer l'ensemble des étiquettes de pod comme tags à vos métriques. Dans cet exemple, les noms de tag sont précédés de `<PRÉFIXE>_` :

```yaml
kubernetes_pod_labels_as_tags:
  *: <PRÉFIXE>_%%label%%
```

**Remarque** : les métriques custom peuvent avoir une incidence sur vos coûts. Consultez la section [Facturation des métriques custom][3] pour en savoir plus.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Annotations de pod comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les annotations d'un pod donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par ce pod :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de pod `<ANNOTATION_POD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<ANNOTATION_POD>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

Pour les versions 7.24.0 et ultérieures de l'Agent, utilisez la configuration de variable d'environnement suivante pour appliquer l'ensemble des annotations de pod en tant que tags à vos métriques. Dans cet exemple, les noms des tags sont précédés de `<PRÉFIXE>_` :

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"*":"<PRÉFIXE>_%%annotation%%"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur votre facturation. Consultez la [page de facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une annotation de pod `<ANNOTATION_POD>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
kubernetes_pod_annotations_as_tags:
  <ANNOTATION_POD>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
kubernetes_pod_annotations_as_tags:
  app: kube_app
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Étiquettes d'espace de nommage en tant que tags

À partir de la version 7.27+ de l'Agent, l'Agent peut recueillir les étiquettes d'un espace de nommage donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par tous les pods sur cet espace de nommage :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette d'espace de nommage `<ÉTIQUETTE_ESPACE_DE_NOMMAGE>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"<ÉTIQUETTE_ESPACE_DE_NOMMAGE>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

Utilisez la configuration de variable d'environnement suivante pour appliquer l'ensemble des étiquettes d'espace de nommage comme tags à vos métriques. Dans cet exemple, les noms de tag sont précédés de `<PRÉFIXE>_` :

```shell
DD_KUBERNETES_NAMESPACE_LABELS_AS_TAGS='{"*":"<PRÉFIXE>_%%label%%"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur votre facturation. Consultez la [page de facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette d'espace de nommage `<ÉTIQUETTE_ESPACE_DE_NOMMAGE>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
kubernetes_namespace_labels_as_tags:
  <ÉTIQUETTE_ESPACE_DE_NOMMAGE>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
kubernetes_namespace_labels_as_tags:
  app: kube_app
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Variables d'environnement de conteneur en tant que tags

À partir de la version 7.32+ de l'Agent, l'Agent peut recueillir des variables d'environnement de conteneur sous la forme de tags et les appliquer à l'ensemble des métriques correspondant au conteneur. Les conteneurs `docker` et `containerd` sont pris en charge :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une variable d'environnement `<VARIABLE_ENVIRONNEMENT>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_ENV_AS_TAGS='{"<VARIABLE_ENVIRONNEMENT>": "<CLÉ_TAG>"}'
```

Par exemple :

```shell
DD_CONTAINER_ENV_AS_TAGS='{"app":"kube_app"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur vos coûts. Consultez la section [Facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une variable d'environnement `<VARIABLE_ENVIRONNEMENT>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_env_as_tags:
  <VARIABLE_ENVIRONNEMENT>: <CLÉ_TAG>
```

Par exemple :

```yaml
container_env_as_tags:
  app: kube_app
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Étiquettes de conteneur en tant que tags

À partir de la version 7.33+ de l'Agent, l'Agent peut recueillir des étiquettes de conteneur sous la forme de tags et les appliquer à l'ensemble des métriques associées au conteneur. L'Agent peut générer des tags à partir des étiquettes des conteneurs `docker` et `containerd`. Pour les conteneurs `containerd`, vous devez utiliser au minimum la version 1.5.6, car les versions antérieures ne propagent pas correctement les étiquettes.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de conteneur `<ÉTIQUETTE_CONTENEUR>` donnée et la transformer en clé de tag `<CLÉ_TAG>`, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_CONTAINER_LABELS_AS_TAGS='{"<ÉTIQUETTE_CONTENEUR>":"<CLÉ_TAG>"}'
```

Par exemple :

```shell
DD_CONTAINER_LABELS_AS_TAGS='{"app":"kube_app"}'
```

**Remarque** : les métriques custom peuvent avoir une incidence sur vos coûts. Consultez la section [Facturation des métriques custom][1] pour en savoir plus.

[1]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette de conteneur `<ÉTIQUETTE_CONTENEUR>` donnée et la transformer en clé de tag `<CLÉ_TAG>`, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_labels_as_tags:
  <ÉTIQUETTE_CONTENEUR>: <CLÉ_TAG>
```

Par exemple :

```yaml
container_labels_as_tags:
  app: kube_app
```

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/agent/kubernetes/tag/?tab=agent#extract-labels-as-tags