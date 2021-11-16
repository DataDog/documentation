---
title: Extraction de tags avec Docker
kind: documentation
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
## Présentation

L'Agent Datadog peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez l'extraction de vos tags en suivant les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez l'extraction de vos tags en suivant les instructions de l'onglet [Agent conteneurisé](?tab=agentconteneurise).

### Tagging de service unifié

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags dans des environnements conteneurisés. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la documentation dédiée au [tagging de service unifié][1].

## Extraire les étiquettes en tant que tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette Docker `<NOM_ÉTIQUETTE>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```shell
DD_DOCKER_LABELS_AS_TAGS='{"<NOM_ÉTIQUETTE>": "<CLÉ_TAG>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```shell
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Remarque** : `<NOM_ÉTIQUETTE>` n'est pas sensible à la casse. Par exemple, si vous avez des étiquettes intitulées `foo` et `FOO` et que vous définissez `DD_DOCKER_LABELS_AS_TAGS='{"foo": "bar"}'`, les étiquettes `foo` et `FOO` seront toutes les deux mappées vers `bar`.

{{% /tab %}}
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


[1]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extraire les variables d'environnement en tant que tags

Datadog recueille automatiquement les tags courants à partir de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][2]. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement               | Rôle                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extrait les étiquettes de conteneur Docker                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extrait les variables d'environnement de conteneur Docker |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extrait les étiquettes de pod.                             |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajoute des tags aux métriques de check                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajoute des tags aux métriques custom                     |

À partir de la version 7.20+ de l'Agent, les Agents conteneurisés peuvent automatiquement récupérer les tags à partir des étiquettes Docker. L'Agent peut ainsi appliquer des tags personnalisés à l'ensemble des données envoyées par un conteneur sans qu'il soit nécessaire de modifier son fichier `datadog.yaml`.

Les tags doivent être ajoutés avec la syntaxe suivante :

```yaml
com.datadoghq.ad.tags: '["<CLÉ_TAG_1>:<VALEUR_TAG_1>", "<CLÉ_TAG_2>:<VALEUR_TAG_2>"]'
```

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les variables d'environnement d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
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

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/agent/docker/?tab=standard#tagging