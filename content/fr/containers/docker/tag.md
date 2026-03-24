---
aliases:
- /fr/agent/docker/tag
description: Configurer l'extraction automatique des balises à partir des étiquettes
  et des variables d'environnement des conteneurs Docker
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Commencer avec les balises
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Utiliser les balises avec Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limiter la collecte de données à un sous-ensemble de conteneurs uniquement
title: Extraction de balises Docker
---
## Aperçu

L'Agent Datadog peut créer et attribuer des balises à toutes les métriques, traces et journaux émis par un conteneur en fonction de ses étiquettes ou de ses variables d'environnement.

Si vous exécutez l'Agent en tant que binaire sur un hôte, configurez vos extractions de balises avec les instructions de l'onglet [Agent](?tab=agent). Si vous exécutez l'Agent en tant que conteneur, configurez votre extraction de balises avec les instructions de l'onglet [Agent Conteneurisé](?tab=containerizedagent).

### Balisage prêt à l'emploi

L'Agent peut découvrir automatiquement et attacher des balises à toutes les données émises par les conteneurs. La liste des balises attachées dépend de la [configuration de cardinalité de l'Agent][1]. [Cardinalité des balises][5] peut avoir un impact sur la facturation car différentes configurations de cardinalité influencent le nombre de métriques émises.


| Balise                 | Cardinalité  | Exigence                                 |
|----------------------|--------------|---------------------------------------------|
| `container_name`     | Élevée         | N/A<br/> **Remarque** : non inclus pour le runtime containerd.                                         |
| `container_id`       | Élevée         | N/A                                         |
| `rancher_container`  | Élevée         | Environnement Rancher                         |
| `mesos_task`         | Orchestrateur | Environnement Mesos                           |
| `docker_image`       | Faible          | N/A<br/> **Remarque** : non inclus pour le runtime containerd.                                         |
| `image_name`         | Faible          | N/A                                         |
| `short_image`        | Faible          | N/A                                         |
| `image_tag`          | Faible          | N/A                                         |
| `swarm_service`      | Faible          | Environnement Swarm                           |
| `swarm_namespace`    | Faible          | Environnement Swarm                           |
| `rancher_stack`      | Faible          | Environnement Rancher                         |
| `rancher_service`    | Faible          | Environnement Rancher                         |
| `env`                | Faible          | [Balisage de service unifié][2] activé        |
| `version`            | Faible          | [Balisage de service unifié][2] activé        |
| `service`            | Faible          | [Balisage de service unifié][2] activé        |
| `marathon_app`       | Faible          | Environnement Marathon                        |
| `chronos_job`        | Faible          | Environnement Mesos                           |
| `chronos_job_owner`  | Faible          | Environnement Mesos                           |
| `nomad_task`         | Faible          | Environnement Nomad                           |
| `nomad_job`          | Faible          | Environnement Nomad                           |
| `nomad_group`        | Faible          | Environnement Nomad                           |
| `git.commit.sha`     | Faible          | [org.opencontainers.image.revision][3] utilisé |
| `git.repository_url` | Faible          | [org.opencontainers.image.source][3] utilisé   |

### Balisage de service unifié

En tant que meilleure pratique dans les environnements conteneurisés, Datadog recommande d'utiliser le balisage de service unifié lors de l'attribution des balises. Le balisage de service unifié relie la télémétrie de Datadog grâce à l'utilisation de trois balises standard : `env`, `service`, et `version`. Pour apprendre à configurer votre environnement avec le balisage unifié, consultez la documentation dédiée au [balisage de service unifié][2].

## Extraire des étiquettes en tant que balises

À partir de l'Agent v6.0+, l'Agent peut collecter des étiquettes pour un conteneur donné et les utiliser comme balises à attacher à toutes les données émises par ce conteneur.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une étiquette de conteneur donnée `<LABEL_NAME>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"<LABEL_NAME>":"<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

**Remarque** : `<LABEL_NAME>` n'est pas sensible à la casse. Par exemple, si vous avez des étiquettes nommées `foo` et `FOO`, et que vous définissez `DD_CONTAINER_LABELS_AS_TAGS='{"foo": "bar"}'`, alors `foo` et `FOO` sont associées à `bar`.

**Remarque** : `DD_CONTAINER_LABELS_AS_TAGS` est équivalent à l'ancien `DD_DOCKER_LABELS_AS_TAGS`, et `DD_CONTAINER_ENV_AS_TAGS` à `DD_DOCKER_ENV_AS_TAGS`.

{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une étiquette de conteneur donnée `<LABEL_NAME>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration de l'Agent `datadog.yaml`][1] :

```yaml
container_labels_as_tags:
  <LABEL_NAME>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :

```yaml
container_labels_as_tags:
  com.docker.compose.service: service_name
```


[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Extraire les variables d'environnement en tant que balises

Datadog collecte automatiquement des balises communes à partir de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][4]. Pour extraire encore plus de balises, utilisez les options suivantes :

| Variable d'environnement               | Description                             |
|------------------------------------|-----------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraire les étiquettes de conteneur                |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraire les variables d'environnement du conteneur |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraire les étiquettes de pod                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajouter des balises pour vérifier les métriques               |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajouter des balises pour des métriques personnalisées              |

À partir de l'Agent v7.20+, un Agent conteneurisé peut découvrir automatiquement des balises à partir des étiquettes de conteneur. Ce processus permet à l'Agent d'associer des balises personnalisées à toutes les données émises par un conteneur sans modifier le fichier `datadog.yaml` de l'Agent.

Les balises doivent être ajoutées en utilisant le format suivant :

```yaml
com.datadoghq.ad.tags: '["<TAG_KEY_1>:<TAG_VALUE_1>", "<TAG_KEY_2>:<TAG_VALUE_2>"]'
```

Avec l'Agent v6.0+, l'Agent peut collecter des variables d'environnement pour un conteneur donné et les utiliser comme balises à attacher à toutes les données émises par ce conteneur.

{{< tabs >}}
{{% tab "Agent conteneurisé" %}}

Pour extraire une variable d'environnement de conteneur donnée `<ENVVAR_NAME>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez la variable d'environnement suivante à l'Agent Datadog :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"<ENVVAR_NAME>": "<TAG_KEY>"}'
```

Par exemple, vous pourriez configurer :

```bash
DD_CONTAINER_ENV_AS_TAGS='{"ENVIRONMENT":"env"}'
```

{{% /tab %}}
{{% tab "Agent" %}}

Pour extraire une variable d'environnement de conteneur donnée `<ENVVAR_NAME>` et la transformer en clé de balise `<TAG_KEY>` dans Datadog, ajoutez le bloc de configuration suivant dans le [fichier de configuration de l'Agent `datadog.yaml`][1] :

```yaml
container_env_as_tags:
  <ENVVAR_NAME>: <TAG_KEY>
```

Par exemple, vous pourriez configurer :

```yaml
container_env_as_tags:
  ENVIRONMENT: env
```

[1]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{< /tabs >}}

## Lecture complémentaire

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/docker/tag/#extract-environment-variables-as-tags
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: https://github.com/opencontainers/image-spec/blob/02efb9a75ee11e05937b535cc5f228f9343ab2f5/annotations.md#pre-defined-annotation-keys
[4]: /fr/agent/docker/?tab=standard#tagging
[5]: /fr/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality