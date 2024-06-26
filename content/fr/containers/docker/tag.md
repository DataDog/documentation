---
aliases:
- /fr/agent/docker/tag
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
kind: documentation
title: Extraction de tags avec Docker
---

## Présentation

L'Agent Datadog peut créer et appliquer des tags à l'ensemble des métriques, des traces et des logs envoyés par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.

Si vous exécutez l'Agent en tant que binaire sur un host, configurez l'extraction de vos tags en suivant les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez l'extraction de vos tags en suivant les instructions de l'onglet [Agent conteneurisé](?tab=agentconteneurise).

### Fonctionnalité prête à l'emploi de tagging

L'Agent peut découvrir automatiquement des tags et les ajouter à toutes les données générées par des conteneurs. La liste des tags ajoutés dépend de la [configuration de cardinalité][1] de l'Agent.

| Tag                 | Cardinalité  | Prérequis                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | Élevée         | S.O.<br/> **Remarque** : non inclus pour le runtime containerd.                                         |
| `container_id`       | Élevée         | S. O.                                         |
| `rancher_container`  | Élevée         | Environnement Rancher                         |
| `mesos_task`         | Orchestrateur | Environnement Mesos                           |
| `docker_image`       | Faible          | S.O.<br/> **Remarque** : non inclus pour le runtime containerd.                                         |
| `image_name`         | Faible          | S. O.                                         |
| `short_image`        | Faible          | S. O.                                         |
| `image_tag`          | Faible          | S. O.                                         |
| `swarm_service`      | Faible          | Environnement Swarm                           |
| `swarm_namespace`    | Faible          | Environnement Swarm                           |
| `rancher_stack`      | Faible          | Environnement Rancher                         |
| `rancher_service`    | Faible          | Environnement Rancher                         |
| `env`                | Faible          | Fonctionnalité de [tagging de service unifié][2] activée        |
| `version`            | Faible          | Fonctionnalité de [tagging de service unifié][2] activée        |
| `service`            | Faible          | Fonctionnalité de [tagging de service unifié][2] activée        |
| `marathon_app`       | Faible          | Environnement Marathon                        |
| `chronos_job`        | Faible          | Environnement Mesos                           |
| `chronos_job_owner`  | Faible          | Environnement Mesos                           |
| `nomad_task`         | Faible          | Environnement Nomad                           |
| `nomad_job`          | Faible          | Environnement Nomad                           |
| `nomad_group`        | Faible          | Environnement Nomad                           |
| `git.commit.sha`     | Faible          | [org.opencontainers.image.revision][3] utilisé |
| `git.repository_url` | Faible          | [org.opencontainers.image.source][3] utilisé   |

### Tagging de service unifié

Datadog vous conseille d'utiliser le tagging de service unifié lorsque vous assignez des tags dans des environnements conteneurisés. Le tagging de service unifié permet de lier les données de télémétrie Datadog entre elles via trois tags standards : `env`, `service` et `version`. Pour découvrir comment configurer le tagging unifié pour votre environnement, consultez la [documentation dédiée][2].

## Extraire les étiquettes en tant que tags

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les étiquettes d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de conteneur `<NOM_ÉTIQUETTE>` donnée et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"": ""}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Remarque** : `<NOM_ÉTIQUETTE>` n'est pas sensible à la casse. Par exemple, si vous avez des étiquettes intitulées `foo` et `FOO` et que vous définissez `DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'`, les étiquettes `foo` et `FOO` seront toutes les deux mappées vers `bar`.

**Remarque **: `DD_CONTAINER_LABELS_AS_TAGS` est lʼéquivalent de lʼancien `DD_DOCKER_LABELS_AS_TAGS`, et `DD_CONTAINER_ENV_AS_TAGS` remplace `DD_DOCKER_ENV_AS_TAGS`.

{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette de conteneur donnée `<NOM_ÉTIQUETTE>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extraire les variables d'environnement en tant que tags

Datadog recueille automatiquement les tags courants à partir de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][4]. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement               | Description                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extrait les étiquettes de conteneur                |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extrait les variables d'environnement de conteneur |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extrait les étiquettes de pod.                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajoute des tags aux métriques de check               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajoute des tags aux métriques custom              |

À partir de la version 7.20+ de l'Agent, les Agents conteneurisés peuvent automatiquement récupérer les tags à partir des étiquettes de conteneur. L'Agent peut ainsi appliquer des tags personnalisés à l'ensemble des données envoyées par un conteneur sans qu'il soit nécessaire de modifier son fichier `datadog.yaml`.

Les tags doivent être ajoutés avec la syntaxe suivante :

```yaml
com.datadoghq.ad.tags: '["<CLÉ_TAG_1>:<VALEUR_TAG_1>", "<CLÉ_TAG_2>:<VALEUR_TAG_2>"]'
```

À partir de la version 6.0+ de l'Agent, l'Agent peut recueillir les variables d'environnement d'un conteneur donné sous la forme de tags et les appliquer à l'ensemble des données envoyées par ce conteneur.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une variable d'environnement de conteneur donnée `<NOM_VARENV>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

Par exemple, il est possible d'utiliser la configuration suivante :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une variable d'environnement de conteneur donnée `<NOM_VARENV>` et la transformer en clé de tag `<CLÉ_TAG>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration `datadog.yaml` de l'Agent][1] :

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

Par exemple, il est possible d'utiliser la configuration suivante :

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /fr/agent/docker/?tab=standard#tagging