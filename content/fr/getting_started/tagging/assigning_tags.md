---
aliases:
- /fr/agent/tagging
- /fr/tagging/assigning_tags/
description: Découvrez comment attribuer des tags dans Datadog
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Apprendre à utiliser des tags dans Datadog
title: Assigner des tags
---

## Présentation

Les tags vous permettent d'interroger les machines et métriques que vous surveillez avec Datadog. Pour identifier les problèmes au sein de votre environnement et affiner suffisamment les données afin d'en découvrir les causes précises, vous devez être en mesure d'assigner des tags et d'appliquer des filtres à partir de ces derniers. Découvrez comment [définir des tags][1] dans Datadog avant d'aller plus loin.

Les tags peuvent être configurés de différentes manières :

- Dans le [fichier de configuration](#fichier-de-configuration) de l'Agent Datadog ou dans chaque fichier de configuration d'intégration
- Dans l'[interface](#interface) Datadog
- Avec l'[API](#api) Datadog
- Avec [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Environnements non conteneurisés" %}}
Dans les environnements non conteneurisés, l'Agent assigne automatiquement le [tag de host](#tags-de-host) et hérite des tags des intégrations. Ces tags, ainsi que d'autres tags que vous pouvez ajouter manuellement, sont configurés dans le [fichier de configuration de l'Agent Datadog](#fichier-de-configuration).
{{% /tab %}}

{{% tab "Environnements conteneurisés" %}}
Dans les environnements conteneurisés, Datadog vous conseille de faire appel à [Autodiscovery][1] : cela permet d'utiliser le [tagging de service unifié][2] de façon à unifier la configuration de toutes vos données de télémétrie Datadog.

Autodiscovery vous permet d'appliquer une configuration d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Lorsque vous utilisez Autodiscovery, l'Agent Datadog identifie automatiquement les services exécutés sur ce nouveau conteneur, cherche la configuration de monitoring correspondante, puis commence à recueillir des métriques. Les tags peuvent être configurés depuis le [modèle de configuration][3] Autodiscovery.

Si vous n'utilisez pas Autodiscovery, l'Agent assigne automatique le [tag de host](#tags-de-host) et hérite des tags des intégrations, comme pour les environnements non conteneurisés. Ces tags, ainsi que d'autres tags ajoutés manuellement, sont configurés dans le [fichier de configuration de l'Agent Datadog](#fichier-de-configuration).


[1]: /fr/getting_started/agent/autodiscovery/
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Méthodes pour assigner des tags

### Fichier de configuration

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

#### Emplacement du fichier

Le fichier de configuration de l'Agent (`datadog.yaml`) est utilisé pour définir des tags de host qui s'appliquent à l'ensemble des métriques, des traces et des logs transmis par l'Agent Datadog.

Les tags pour les [intégrations][1] installées avec l'Agent sont configurés à l'aide des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour accéder aux fichiers de configuration, consultez la documentation relative aux [fichiers de configuration de l'Agent][2].

#### Format YAML

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de tags. En YAML, les listes peuvent respecter deux formats différents, aux caractéristiques similaires :

```yaml
tags: ["<KEY_1>:<VALUE_1>", "<KEY_2>:<VALUE_2>", "<KEY_3>:<VALUE_3>"]
```

ou

```yaml
tags:
    - "<KEY_1>:<VALUE_1>"
    - "<KEY_2>:<VALUE_2>"
    - "<KEY_3>:<VALUE_3>"
```

Nous vous recommandons d'assigner des tags sous la forme de paires `<KEY>:<VALUE>`. Toutefois, les tags comprenant uniquement des clés (`<KEY>`) sont également acceptés. Consultez la rubrique sur la [définition des tags][3] pour en savoir plus.

#### Tags de host

Le hostname (clé de tag `host`) est [assigné automatiquement][4] par l'Agent Datadog. Pour personnaliser le hostname, utilisez le fichier de configuration de l'Agent, `datadog.yaml` :

```yaml
# Définissez le hostname (par défaut : détection automatique)
# Doit être conforme à la norme RFC-1123, qui autorise uniquement :
# les caractères de « A » à « Z », de « a » à « z », de « 0 » à « 9 » et « - » (trait d'union)
hostname: mamachine.mondomaine
```

##### Modifier le hostname

* L'ancien hostname reste dans l'interface pendant deux heures, mais n'affiche pas les nouvelles métriques.
* Vous pouvez interroger les données provenant de hosts avec l'ancien hostname grâce à l'API.
* Pour représenter des métriques avec l'ancien hostname et le nouveau hostname dans un seul graphique, utilisez [des opérations arithmétiques entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/guide/agent-configuration-files/
[3]: /fr/getting_started/tagging/#defining-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Emplacement du fichier

Le fichier de configuration de l'Agent (`datadog.conf`) est utilisé pour définir des tags de host qui s'appliquent à l'ensemble des métriques, des traces et des logs transmis par l'Agent Datadog.

Les tags pour les [intégrations][1] installées avec l'Agent sont configurés à l'aide des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour accéder aux fichiers de configuration, consultez la documentation relative aux [fichiers de configuration de l'Agent][2].

#### Format YAML

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de tags. En YAML, les listes peuvent respecter deux formats différents, aux caractéristiques similaires :

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Nous vous recommandons d'assigner des tags sous la forme de paires `<KEY>:<VALUE>`. Toutefois, les tags comprenant uniquement des clés (`<KEY>`) sont également acceptés. Consultez la rubrique sur la [définition des tags][3] pour en savoir plus.

#### Tags de host

Le hostname (clé de tag `host`) est [assigné automatiquement][4] par l'Agent Datadog. Pour personnaliser le hostname, utilisez le fichier de configuration de l'Agent, `datadog.conf` :

```yaml
# Définissez le hostname (par défaut : détection automatique)
# Doit être conforme à la norme RFC-1123, qui autorise uniquement :
# les caractères de « A » à « Z », de « a » à « z », de « 0 » à « 9 » et « - » (trait d'union)
hostname: mamachine.mondomaine
```

##### Modifier le hostname

* L'ancien hostname reste dans l'interface pendant 2 heures, mais n'affiche pas les nouvelles métriques.
* Vous pouvez interroger les données provenant de hosts avec l'ancien hostname grâce à l'API.
* Pour représenter des métriques avec l'ancien hostname et le nouveau hostname dans un seul graphique, utilisez [des opérations arithmétiques entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/guide/agent-configuration-files/
[3]: /fr/getting_started/tagging/#defining-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Héritage des intégrations

Pour assigner facilement des tags, nous vous conseillons de faire appel à la fonction d'héritage des intégrations. Les tags que vous assignez à vos instances AWS, à vos recettes Chef ainsi qu'à d'autres intégrations sont automatiquement appliqués aux hosts et aux métriques que vous envoyez à Datadog.

Dans les environnements conteneurisés, il est recommandé de suivre la documentation relative au [tagging de service unifié][2] afin d'effectuer une seule configuration pour toutes vos données de télémétrie Datadog.

##### Intégrations cloud

Les [intégrations cloud][3] sont basées sur un système d'authentification. Datadog vous conseille d'utiliser le carré d'intégration cloud principal (AWS, Azure, Google Cloud, etc.) et d'[installer l'Agent][4] lorsque cela est possible. **Remarque** : si vous utilisez uniquement l'Agent, certains tags d'intégration ne seront pas disponibles.

##### Intégrations web

Les [intégrations web][5] sont basées sur un système d'authentification. Les métriques sont recueillies via des appels d'API. **Remarque** : les tags `CamelCase` sont convertis en tirets bas par Datadog (par exemple, `TestTag` --> `test_tag`).

#### Variables d'environnement

Après avoir installé l'Agent Datadog conteneurisé, vous pouvez définir vos tags de host grâce à la variable d'environnement `DD_TAGS` dans le fichier de configuration principal de l'Agent.

Datadog recueille automatiquement les tags courants à partir de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][6]. Pour extraire des tags supplémentaires, utilisez les options suivantes :

| Variable d'environnement               | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Permet d'extraire les étiquettes du conteneur. Remplace l'ancienne variable d'environnement `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Permet d'extraire les variables d'environnement du conteneur. Remplace l'ancienne variable d'environnement `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Permet d'extraire les étiquettes de pod.                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Permet d'ajouter des tags aux métriques de check (low, orchestrator, high).                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Permet d'ajouter des tags aux métriques custom (low, orchestrator, high).                                                    |

**Exemples :**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Lorsque vous utilisez `DD_KUBERNETES_POD_LABELS_AS_TAGS`, vous pouvez utiliser des wildcards au format suivant :

```text
{"foo": "bar_%%label%%"}
```

Par exemple, `{"app*": "kube_%%label%%"}` correspond au nom de tag `kube_application` pour l'étiquette `application`. En outre, `{"*": "kube_%%label%%"}` ajoute toutes les étiquettes de pod en tant que tags avec le préfixe `kube_`.

Lorsque vous utilisez la variable `DD_CONTAINER_LABELS_AS_TAGS` dans un fichier `docker-compose.yaml` Docker Swarm, assurez-vous de supprimer les apostrophes. Exemple :

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Lorsque vous ajoutez des étiquettes à des conteneurs Docker, le placement du mot-clé `labels:` à l'intérieur du fichier `docker-compose.yaml` est important. Pour éviter tout problème, reportez-vous à la documentation relative au [tagging de service unifié Docker][2].

 Si les étiquettes doivent être appliquées au conteneur en dehors de cette configuration, placez le mot-clé `labels:` **dans** la section `services:`, **et non** dans la section `deploy:`. Placez le mot-clé `labels:` dans la section `deploy:` uniquement lorsque les étiquettes doivent être appliquées au service. L'Agent Datadog n'a aucune étiquette à extraire des conteneurs si ce placement n'est pas utilisé.

Un exemple de fichier `docker-compose.yaml` valide illustrant cette notion est présenté ci-dessous. Dans cet exemple, les étiquettes `my.custom.label.project` et `my.custom.label.version` dans la section `myapplication:` ont chacune des valeurs uniques. L'utilisation de la variable d'environnement `DD_CONTAINER_LABELS_AS_TAGS` dans la section `datadog:` permet d'extraire les étiquettes et de générer ces tags pour le conteneur `myapplication` :

À l'intérieur du conteneur `myapplication`, les étiquettes sont : `my.custom.label.project` et `my.custom.label.version`

Une fois que l'Agent aura extrait les étiquettes du conteneur, les tags seront les suivants :
`projecttag:projectA`
`versiontag:1`

**Exemple de fichier docker-compose.yaml :**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<CLÉ_API_DATADOG>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'gcr.io/datadoghq/agent:latest'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
  myapplication:
    image: 'myapplication'
    labels:
      my.custom.label.project: 'projectA'
      my.custom.label.version: '1'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
```

Définissez les variables dans votre fichier `datadog.yaml` personnalisé ou configurez-les en tant que cartes JSON dans ces variables d'environnement. La clé de carte correspond au nom de la source (`label/envvar`), tandis que sa valeur correspond au nom du tag Datadog.

##### Cardinalité des tags

Il existe deux variables d'environnement qui définissent la cardinalité des tags : `DD_CHECKS_TAG_CARDINALITY` et `DD_DOGSTATSD_TAG_CARDINALITY`. Les règles de tarification pour DogStatsD étant différentes, un paramètre de cardinalité distinct est utilisé afin d'offrir des options de configuration plus poussées. Pour le reste, ces variables fonctionnent de la même façon : elles acceptent la valeur `low`, `orchestrator` ou `high`. Par défaut, la valeur `low` est utilisée, ce qui permet de récupérer les tags au niveau du host.

Selon la cardinalité, il existe un ensemble différent de tags prêts à l'emploi pour [Kubernetes et OpenShift][7], mais aussi pour [Docker, Rancher et Mesos][8]. Pour ECS et Fargate, le fait de définir la variable sur `orchestrator` ajoute le tag `task_arn`.

#### Traces

Le traceur Datadog peut être configuré avec des variables d'environnement, des propriétés système, ou dans le code. La documentation relative à la [configuration du traceur Datadog][9] contient des informations sur les options de tagging et la configuration pour chaque traceur. Vous pouvez également vous reporter à la documentation relative au [tagging de service unifié][2] pour configurer le tagging de service unifié sur votre traceur.

Quel que soit le traceur utilisé, l'arborescence des métadonnées de span doit respecter une certaine structure. Chaque nœud de l'arborescence est séparé par le caractère `.` et ne peut posséder qu'un seul type.

Par exemple, un nœud ne peut pas être à la fois un objet (avec des sous-nœuds) et une chaîne :
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
Les métadonnées de span ci-dessus ne sont pas valides, car la valeur de `key` ne peut pas faire référence à une chaîne (`"value"`) ainsi qu'à une sous-arborescence (`{"subkey": "value_2"}`).

### Interface

{{< tabs >}}
{{% tab "Hostmap" %}}

Vous pouvez assigner des tags de host depuis l'interface via la [page Host Map][1]. Cliquez sur l'hexagone (host) de votre choix pour superposer le host en bas de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. L'application des modifications de tags de host effectuées dans l'interface peut prendre jusqu'à cinq minutes.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Tags hostmap" style="width:80%;">}}

[1]: /fr/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Liste d'infrastructures" %}}

Vous pouvez assigner des tags de host depuis l'interface via la [page Infrastructure List][1]. Cliquez sur le host de votre choix pour le superposer à droite de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. L'application des modifications de tags de host effectuées dans l'interface peut prendre jusqu'à cinq minutes. Une fois les tags ajoutés, vérifiez qu'ils sont affichés dans l'interface avant d'ajouter des tags supplémentaires.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Tags liste d'infrastructures" style="width:80%;">}}

[1]: /fr/infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

Depuis la page de [gestion des monitors][1], cochez la case en regard de chaque monitor pour ajouter des tags (sélectionnez un ou plusieurs monitors). Cliquez sur le bouton **Edit Tags**. Saisissez un tag ou sélectionnez un tag précédemment utilisé. Cliquez ensuite sur **Add Tag `nom:tag`** ou **Apply Changes**. Si vous aviez déjà ajouté des tags, vous pouvez assigner plusieurs tags à la fois en cochant leurs cases.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Tags gestion de monitors" style="width:80%;">}}

Lorsque vous créez un monitor, assignez des tags de monitor durant l'étape 4 *Say what's happening* :

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Tags création de monitor" style="width:80%;">}}

[1]: /fr/monitors/manage/
{{% /tab %}}
{{% tab "Métriques de distribution" %}}

Créez des agrégations par centile dans les [métriques de distribution][1] en appliquant une liste d'un maximum de dix tags autorisés à une métrique. Cela permet de créer une série temporelle pour chaque combinaison de valeurs de tags potentiellement interrogeable. Pour en savoir plus sur le comptage de métriques custom et de séries temporelles émises à partir de métriques de distribution, consultez [Métriques custom][2].

**Jusqu'à dix tags peuvent être appliqués. Les tags d'exclusion ne sont pas acceptés** :

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Tags création de monitor" style="width:80%;">}}

[1]: /fr/metrics/distributions/
[2]: /fr/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Intégrations" %}}

Le carré d'intégration [AWS][1] vous permet d'assigner des tags supplémentaires à l'ensemble des métriques pour un compte spécifique. Utilisez une liste de tags au format `<KEY>:<VALUE>` séparés par des virgules.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Tags AWS" style="width:80%;">}}

[1]: /fr/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

Lorsque vous créez un SLO, assignez des tags durant l'étape 3 *Add name and tags* :

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Tags création de SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "Assignation" %}}

Les tags peuvent être assignés de diverses façons avec l'[API Datadog][1]. Cliquez sur les liens ci-dessous pour accéder aux rubriques indiquées :

* [Envoyer le résultat d'un check][1]
* [Envoyer un événement][2]
* [Intégration AWS][3]
* [Envoyer des points de séries temporelles][4]
* [Créer][5] ou [modifier][6] un monitor
* [Ajouter][7] ou [mettre à jour][8] les tags d'un host
* [Envoyer des traces][9]
* [Créer][10] ou [modifier][11] un Service Level Objective

[1]: /fr/api/v1/service-checks/#submit-a-service-check
[2]: /fr/api/v1/events/#post-an-event
[3]: /fr/api/v1/aws-integration/
[4]: /fr/api/v1/metrics/#submit-metrics
[5]: /fr/api/v1/monitors/#create-a-monitor
[6]: /fr/api/v1/monitors/#edit-a-monitor
[7]: /fr/api/v1/tags/#add-tags-to-a-host
[8]: /fr/api/v1/tags/#update-host-tags
[9]: /fr/tracing/guide/send_traces_to_agent_by_api/
[10]: /fr/api/v1/service-level-objectives/#create-a-slo-object
[11]: /fr/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Exemple" %}}

Les tags de Datadog vous permettent de recueillir facilement vos métriques. Pour mieux comprendre, imaginons que vous cherchez à obtenir un total pour l'ensemble de métriques suivant fourni par votre site Web (example.com) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Nous vous conseillons d'ajouter le tag `domain:example.com` et de ne pas toucher au hostname (l'API Datadog détermine automatiquement le hostname) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Grâce au tag `domain:example.com`, vous pouvez calculer le total des vues de pages pour l'ensemble des hosts : 

```text
sum:page.views{domain:example.com}
```

Pour obtenir des données détaillées pour chaque host, utilisez l'expression suivante :

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD

Vous pouvez ajouter des tags aux métriques, événements ou checks de service que vous envoyez à [DogStatsD][9]. Pour comparer les performances de deux algorithmes, il vous suffit donc de taguer une métrique de type timer de façon à indiquer la version de l'algorithme :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # À vous de jouer...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # À vous de jouer... (avec une version plus rapide ?)
```

**Remarque** : l'ajout de tags dans StatsD requiert une [extension Datadog][10].

Des précautions particulières doivent être prises pour l'assignation du tag `host` aux métriques DogStatsD. Pour en savoir plus sur la clé de tag host, consultez la [rubrique DogStatsD][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#defining-tags
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/integrations/#cat-cloud
[4]: /fr/getting_started/agent/#setup
[5]: /fr/integrations/#cat-web
[6]: /fr/agent/docker/?tab=standard#tagging
[7]: /fr/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /fr/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /fr/tracing/setup/
[10]: /fr/developers/dogstatsd/
[11]: /fr/developers/community/libraries/