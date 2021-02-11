---
title: Extraction de tags dans Kubernetes
kind: documentation
aliases:
  - /fr/agent/autodiscovery/tag/
further_reading:
  - link: /getting_started/tagging/
    tag: Documentation
    text: Débuter avec les tags
  - link: /getting_started/tagging/using_tags/
    tag: Documentation
    text: Utiliser des tags avec Datadog
  - link: /agent/guide/autodiscovery-management/
    tag: Documentation
    text: Limiter la collecte de données à un seul sous-ensemble de conteneurs
---
L'Agent peut créer et attribuer des tags à toutes les métriques, toutes les traces et tous les logs émis par un pod, en fonction de ses étiquettes ou de ses annotations.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur dans votre cluster Kubernetes, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent conteneurisé](?tab=agentconteneurise).

## Récupération automatique des tags

À partir de la version 6.10+ de l'Agent, l'Agent peut automatiquement récupérer les tags des annotations de pod. Il est ainsi capable d'associer des tags à l'ensemble des données envoyées par un pod entier ou par un conteneur spécifique dans ce pod.

Datadog vous conseille d'utiliser le tagging de service unifié pour mieux unifier vos tags dans les environnements conteneurisés. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][1].

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

À partir de la version 7.17+ de l'Agent, l'Agent peut automatiquement récupérer les tags à partir des étiquettes Docker. L'Agent peut ainsi appliquer des tags personnalisés à l'ensemble des données envoyées par un conteneur sans qu'il soit nécessaire de [modifier son fichier `datadog.yaml`][2].

```yaml
com.datadoghq.ad.tags: '["<CLÉ_TAG>:VALEUR_TAG", "<CLÉ_TAG_1>:<VALEUR_TAG_1>"]'
```

## Étiquettes de nœud comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un nœud donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par l'ensemble des pods sur ce nœud :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud donnée `<ÉTIQUETTE_NŒUD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

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

Pour extraire une étiquette de nœud donnée `<ÉTIQUETTE_NŒUD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

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

Pour extraire une étiquette de nœud donnée `<ÉTIQUETTE_POD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

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

Pour extraire une étiquette de pod donnée `<ÉTIQUETTE_POD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

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

**Remarque** : les métriques custom peuvent avoir une incidence sur votre facturation. Consultez la [page de facturation des métriques custom][2] pour en savoir plus.

[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /fr/account_management/billing/custom_metrics
{{% /tab %}}
{{< /tabs >}}

## Annotations de pod comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les annotations d'un pod donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par ce pod :

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud donnée `<ANNOTATION_POD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

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

Pour extraire une annotation de pod donnée `<ANNOTATION_POD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

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

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/agent/kubernetes/tag/?tab=agent#extract-labels-as-tags