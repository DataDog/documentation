---
title: Appliquer et extraire des tags
kind: documentation
further_reading:
  - link: tagging/
    tag: Documentation
    text: Débuter avec les tags
  - link: tagging/using_tags
    tag: Documentation
    text: Utiliser des tags avec Datadog
  - link: /agent/autodiscovery/integrations
    tag: Documentation
    text: Créer et charger un modèle d'intégration Autodiscovery
  - link: /agent/autodiscovery/ad_identifiers
    tag: Documentation
    text: Associer un conteneur au modèle d'intégration correspondant
  - link: /agent/autodiscovery/management
    tag: Documentation
    text: Gérer les conteneurs à inclure dans Autodiscovery avec l'Agent
---
L'Agent Datadog peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.
Si vous utilisez un environnement Kubernetes, l'Agent peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un pod en fonction de ses étiquettes ou de ses annotations.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez vos extractions de tag en suivant les instructions de l'onglet [Agent conteneurisé](?tab=agentconteneurise).

## Kubernetes

### Récupération automatique des tags

À partir de la version 6.10+ de l'Agent, l'Agent peut automatiquement récupérer les tags des annotations de pod. Il est ainsi capable d'associer des tags à l'ensemble des données envoyées par un pod entier ou par un conteneur spécifique dans ce pod.

Pour appliquer un tag `<CLÉ_TAG>":<VALEUR_TAG>` à l'ensemble des données envoyées par un pod donné et recueillies par l'Agent, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/tags: '{"<CLÉ_TAG>": "<VALEUR_TAG>","<CLÉ_TAG_1>": "<VALEUR_TAG_1>"}'
```

Si vous souhaitez appliquer un tag `<CLÉ_TAG>":<VALEUR_TAG>` à un conteneur spécifique `<IDENTIFICATEUR_CONTENEUR>` dans un pod, utilisez l'annotation suivante sur votre pod :

```yaml
annotations:
  ad.datadoghq.com/<IDENTIFICATEUR_CONTENEUR>.tags: '{"<CLÉ_TAG>": "<VALEUR_TAG>","<CLÉ_TAG_1>": "<VALEUR_TAG_1>"}'
```

### Extraire les étiquettes de nœud comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un nœud donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par l'ensemble des pods sur ce nœud :

{{< tabs >}}
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

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud donnée `<ÉTIQUETTE_NŒUD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"<ÉTIQUETTE_NŒUD>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_NODE_LABELS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

### Extraire les étiquettes de pod comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un pod donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par ce pod :

{{< tabs >}}
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

**Remarque** : l'utilisation de cette méthode pourrait [accroître le nombre de métriques][2] de votre organisation et augmenter vos frais.

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /fr/developers/metrics/custom_metrics/#how-is-a-custom-metric-defined
{{% /tab %}}
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

**Remarque** : l'utilisation de cette méthode pourrait accroître le nombre de [métriques custom][1] de votre organisation et augmenter vos frais.

[1]: /fr/developers/metrics/custom_metrics/#how-is-a-custom-metric-defined
{{% /tab %}}
{{< /tabs >}}

### Extraire les annotations de pod comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les annotations d'un pod donné sous la forme de tags et les appliquer à l'ensemble des métriques envoyées par ce pod :

{{< tabs >}}
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

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de nœud donnée `<ANNOTATION_POD>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"<ANNOTATION_POD>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_KUBERNETES_POD_ANNOTATIONS_AS_TAGS='{"app":"kube_app"}'
```

{{% /tab %}}
{{< /tabs >}}

## Docker

### Extraire les étiquettes comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
{{% tab "Agent" %}}

Pour extraire une étiquette Docker donnée `<NOM_ÉTIQUETTE>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
docker_labels_as_tags:
  <NOM_ÉTIQUETTE>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
docker_labels_as_tags:
  com.docker.compose.service: service_name
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette Docker donnée `<NOM_ÉTIQUETTE>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<NOM_ÉTIQUETTE>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

{{% /tab %}}
{{< /tabs >}}

### Extraire les variables d'environnement comme tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les variables d'environnement d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
{{% tab "Agent" %}}

Pour extraire une variable d'environnement Docker donnée `<NOM_VARENV>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
docker_env_as_tags:
  <NOM_VARENV>: <CLÉ_TAG>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
docker_env_as_tags:
  ENVIRONMENT: env
```

[1]: /fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
{{% /tab %}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une variable d'environnement Docker donnée `<NOM_VARENV>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_DOCKER_ENV_AS_TAGS='{"<NOM_VARENV>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_DOCKER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}