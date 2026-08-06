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
title: Assignation de tags
---
## Aperçu {#overview}

Le balisage est utilisé dans tout Datadog pour interroger les machines et les métriques que vous surveillez. Sans la possibilité d'assigner et de filtrer en fonction des balises, il pourrait être difficile de trouver des problèmes dans votre environnement et de les réduire suffisamment pour découvrir les véritables causes. Apprenez à [définir des balises][1] dans Datadog avant de continuer.

Les tags peuvent être configurés de différentes manières :

- Dans le fichier de configuration [de l'Agent Datadog](#configuration-file) ou dans chaque fichier de configuration d'intégration individuelle
- Via le [UI (interface utilisateur)](#ui) de Datadog
- Avec l'[API](#api) de Datadog
- Avec le [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Environnements non conteneurisés" %}}
Dans des environnements non conteneurisés, l'Agent assigne automatiquement la [balise hôte](#host-tags) et hérite des balises des intégrations. Ces balises, ainsi que des balises supplémentaires que vous pouvez ajouter manuellement, sont configurées dans le [fichier de configuration de l'Agent Datadog](#configuration-file).
{{% /tab %}}

{{% tab "Environnements conteneurisés" %}}
Dans des environnements conteneurisés, Datadog recommande d'utiliser [l'Autodécouverte][1] car cela permet un [balisage de service unifié][2], la méthode recommandée pour obtenir un point de configuration unique à travers toute votre télémétrie Datadog.

L'objectif de l'Autodécouverte est d'appliquer une configuration d'intégration Datadog lors de l'exécution d'une vérification de l'Agent contre un conteneur donné. Lors de l'utilisation de l'Autodécouverte, l'Agent Datadog identifie automatiquement quels services s'exécutent sur ce nouveau conteneur, recherche la configuration de surveillance correspondante et commence à collecter des métriques. Les balises peuvent ensuite être configurées à partir du [modèle de configuration][3] de l'Autodécouverte.

Si l'Autodécouverte n'est pas utilisée, l'Agent assigne automatiquement la [balise hôte](#host-tags) et hérite des balises des intégrations de la même manière que dans des environnements non conteneurisés. Ces balises, ainsi que les balises ajoutées manuellement, sont configurées dans le [fichier de configuration de l'Agent Datadog](#configuration-file).


[1]: /fr/getting_started/agent/autodiscovery/
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Méthodes pour assigner des balises {#methods-to-assign-tags}

### Fichier de configuration {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### Emplacement du fichier {#file-location}

Le fichier de configuration de l'Agent (`datadog.yaml`) est utilisé pour définir des balises hôtes qui s'appliquent à toutes les métriques, traces et journaux transmis par l'Agent Datadog.

Les balises pour les [intégrations][1] installées avec l'Agent sont configurées avec des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour localiser les fichiers de configuration, consultez [Fichiers de configuration de l'Agent][2].

#### Format YAML {#yaml-format}

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de balises. Dans YAML, les listes sont définies avec deux formes différentes mais fonctionnellement équivalentes :

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

Il est recommandé d'attribuer des balises sous forme de `<KEY>:<VALUE>` paires, mais les balises ne contenant que des clés (`<KEY>`) sont également acceptées. Consultez [Définition des balises][3] pour plus de détails.

#### Balises hôtes {#host-tags}

Le nom d'hôte (clé de balise `host`) est [attribué automatiquement][4] par l'Agent Datadog. Pour personnaliser le nom d'hôte, utilisez le fichier de configuration de l'Agent, `datadog.yaml` :

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Changement du nom d'hôte {#changing-the-hostname}

* L'ancien nom d'hôte reste dans l'UI (interface utilisateur) pendant deux heures mais ne montre pas de nouvelles métriques.
* Toute donnée provenant d'hôtes avec l'ancien nom d'hôte peut être interrogée avec l'API.
* Pour représenter graphiquement les métriques avec l'ancien et le nouveau nom d'hôte dans un seul graphique, utilisez [l'arithmétique entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/configuration/agent-configuration-files/
[3]: /fr/getting_started/tagging/#define-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Emplacement du fichier {#file-location-1}

Le fichier de configuration de l'Agent (`datadog.conf`) est utilisé pour définir des balises hôtes qui s'appliquent à toutes les métriques, traces et journaux transmis par l'Agent Datadog.

Les balises pour les [intégrations][1] installées avec l'Agent sont configurées avec des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour localiser les fichiers de configuration, consultez [Fichiers de configuration de l'Agent][2].

#### Format YAML {#yaml-format-1}

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de balises. Dans YAML, les listes sont définies avec deux formes différentes mais fonctionnellement équivalentes :

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Il est recommandé d'attribuer des balises sous forme de `<KEY>:<VALUE>` paires, mais les balises ne contenant que des clés (`<KEY>`) sont également acceptées. Consultez [Définition des balises][3] pour plus de détails.

#### Balises hôtes {#host-tags-1}

Le nom d'hôte (clé de balise `host`) est [attribué automatiquement][4] par l'Agent Datadog. Pour personnaliser le nom d'hôte, utilisez le fichier de configuration de l'Agent, `datadog.conf` :

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Changement du nom d'hôte {#changing-the-hostname-1}

* L'ancien nom d'hôte reste dans l'UI (interface utilisateur) pendant deux heures, mais ne montre pas de nouvelles métriques.
* Toute donnée provenant d'hôtes avec l'ancien nom d'hôte peut être interrogée avec l'API.
* Pour représenter graphiquement les métriques avec l'ancien et le nouveau nom d'hôte dans un seul graphique, utilisez [l'arithmétique entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/configuration/agent-configuration-files/
[3]: /fr/getting_started/tagging/#define-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Héritage d'intégration {#integration-inheritance}

La méthode la plus efficace pour attribuer des balises est de s'appuyer sur l'héritage d'intégration. Les balises que vous attribuez à vos instances AWS, recettes Chef et autres intégrations sont automatiquement héritées par les hôtes et les métriques que vous envoyez à Datadog.

Dans les environnements conteneurisés, il est recommandé de suivre la documentation relative au [tagging de service unifié][2] afin d'effectuer une seule configuration pour toutes vos données de télémétrie Datadog.

##### Intégrations cloud {#cloud-integrations}

[Les intégrations cloud][3] sont basées sur l'authentification. Datadog recommande d'utiliser la tuile principale d'intégration cloud (AWS, Azure, Google Cloud, etc.) et [d'installer l'Agent][4] lorsque cela est possible. **Remarque** : Si vous choisissez d'utiliser uniquement l'Agent, certaines balises d'intégration ne sont pas disponibles.

##### Intégrations web {#web-integrations}

[Les intégrations web][5] sont basées sur l'authentification. Les métriques sont collectées par des appels API. **Remarque** : `CamelCase` les balises sont converties en underscores par Datadog, par exemple `TestTag` --> `test_tag`.

#### Variables d'environnement {#environment-variables}

Après avoir installé l'Agent Datadog containerisé, vous pouvez définir vos balises d'hôte en utilisant la variable d'environnement `DD_TAGS` dans le fichier de configuration principal de votre Agent. Si vous spécifiez plusieurs balises, séparez chacune par un espace.

**Remarque** : La variable d'environnement `DD_TAGS` utilise des espaces pour séparer les balises. Par exemple, `DD_TAGS="key1:val1 key2:val2"` définit deux balises. Une valeur comme `DD_TAGS="test:this is a test"` produit quatre balises distinctes (`test:this`, `is`, `a`, `test`) car chaque jeton séparé par un espace est traité comme sa propre balise. Pour inclure des espaces dans les valeurs de balises, définissez les balises via la configuration YAML ou les annotations d'intégration à la place. Ces méthodes convertissent les espaces en underscores (par exemple, `test:this is a test` devient `test:this_is_a_test`).

Datadog collecte automatiquement les balises communes de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][6]. Pour extraire encore plus de balises, utilisez les options suivantes :

| Variable d'environnement               | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraire les étiquettes de conteneur. Cette variable d'environnement est équivalente à l'ancienne variable d'environnement `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraire les variables d'environnement du conteneur. Cette variable d'environnement est équivalente à l'ancienne variable d'environnement `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraire les étiquettes des pods.                                                                                     |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajouter des étiquettes pour vérifier les métriques (faible, orchestrateur, élevé).                                                    |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajouter des étiquettes aux métriques personnalisées (faible, orchestrateur, élevé).                                                   |

**Exemples :**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Lors de l'utilisation de `DD_KUBERNETES_POD_LABELS_AS_TAGS`, vous pouvez utiliser des caractères génériques au format :

```text
{"foo": "bar_%%label%%"}
```

Par exemple, `{"app*": "kube_%%label%%"}` se résout au nom de l'étiquette `kube_application` pour l'étiquette `application`. De plus, `{"*": "kube_%%label%%"}` ajoute toutes les étiquettes des pods en tant qu'étiquettes préfixées par `kube_`.

Lors de l'utilisation de la variable `DD_CONTAINER_LABELS_AS_TAGS` dans un fichier Docker Swarm `docker-compose.yaml`, retirez les apostrophes, par exemple :

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Lors de l'ajout d'étiquettes aux conteneurs Docker, le placement du mot-clé `labels:` à l'intérieur du fichier `docker-compose.yaml` est important. Pour éviter des problèmes, suivez la documentation [Docker unified service tagging][2].

Si le conteneur doit être étiqueté en dehors de cette configuration, placez le mot-clé `labels:` **à l'intérieur** de la section `services:`, **pas** à l'intérieur de la section `deploy:`. Placez le mot-clé `labels:` à l'intérieur de la section `deploy:` uniquement lorsque le service doit être étiqueté. L'Agent Datadog n'a pas d'étiquettes à extraire des conteneurs sans ce placement.

Ci-dessous se trouve un exemple de fichier `docker-compose.yaml` fonctionnel qui montre ce placement d'étiquette. Dans l'exemple ci-dessous, les étiquettes dans la section `myapplication:`, `my.custom.label.project` et `my.custom.label.version` ont chacune des valeurs uniques. L'utilisation de la variable d'environnement `DD_CONTAINER_LABELS_AS_TAGS` dans la section `datadog:` extrait les étiquettes et produit ces étiquettes pour le conteneur `myapplication` :

À l'intérieur du conteneur `myapplication`, les étiquettes sont : `my.custom.label.project` et `my.custom.label.version`

Après que l'Agent ait extrait les étiquettes du conteneur, les étiquettes sont :
`projecttag:projectA`
`versiontag:1`

**Exemple de docker-compose.yaml :**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<DATADOG_API_KEY>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'registry.datadoghq.com/agent:latest'
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

Définissez soit les variables dans votre `datadog.yaml` personnalisé, soit définissez-les comme des cartes JSON dans ces variables d'environnement. La clé de la carte est le nom de la source (`label/envvar`), et la valeur de la carte est le nom de l'étiquette Datadog.

##### Cardinalité des étiquettes {#tags-cardinality}

Il existe deux variables d'environnement qui définissent la cardinalité des étiquettes : `DD_CHECKS_TAG_CARDINALITY` et `DD_DOGSTATSD_TAG_CARDINALITY`. Parce que DogStatsD est tarifé différemment, le paramètre de cardinalité des étiquettes DogStatsD est séparé pour offrir la possibilité d'une configuration plus fine. Sinon, ces variables fonctionnent de la même manière : elles peuvent avoir des valeurs `low`, `orchestrator` ou `high`. Elles ont toutes deux par défaut `low`, ce qui inclut les étiquettes au niveau du cluster Kubernetes.

Les différents paramètres de cardinalité ciblent :
* `low` : étiquettes au niveau du cluster Kubernetes, telles que `kube_namespace`.
* `orchestrator` : étiquettes au niveau des pods, telles que `pod_name`.
* `high` : étiquettes au niveau des conteneurs, telles que `container_id`.

En fonction de la cardinalité, il existe un ensemble différent d'étiquettes prêtes à l'emploi pour [Kubernetes et OpenShift][7], et pour [Docker, Rancher et Mesos][8]. Pour ECS et Fargate, définir la variable sur `orchestrator` ajoute l'étiquette `task_arn`.

**Notes** :
- L'envoi d'étiquettes de conteneur pour les métriques DogStatsD peut créer plus de métriques (une par conteneur au lieu d'une par hôte). Cela peut avoir un impact sur la facturation de vos métriques personnalisées.
- Dans les métriques, les horodatages sont arrondis à la seconde la plus proche. Si des points ont le même horodatage, le dernier point écrase les précédents. Définir une cardinalité plus élevée peut aider à prévenir ce problème.

#### Traces {#traces}

Le SDK Datadog peut être configuré avec des variables d'environnement, des propriétés système ou par le biais de la configuration dans le code. La documentation de la [configuration du traçage Datadog][9] contient des informations sur les options d'étiquetage et la configuration pour chaque SDK. Vous pouvez également suivre la documentation sur l'étiquetage de service unifié [2] pour configurer votre SDK pour l'étiquetage de service unifié.

Quel que soit le SDK utilisé, les métadonnées de span doivent respecter une structure d'arbre typée. Chaque nœud de l'arbre est séparé par un `.` et est d'un seul type.

Par exemple, un nœud ne peut pas être à la fois un objet (avec des sous-nœuds) et une chaîne :

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

Les métadonnées de span ci-dessus sont invalides puisque la valeur de `key` ne peut pas référencer une chaîne (`"value"`) et aussi un sous-arbre (`{"subkey": "value_2"}`).

### UI {#ui}

{{< tabs >}}
{{% tab "La Hostmap" %}}

Attribuez des étiquettes d'hôte dans l'UI en utilisant la [page de carte des hôtes][1]. Cliquez sur n'importe quel hexagone (hôte) pour afficher la superposition de l'hôte en bas de la page. Ensuite, sous la section *Utilisateur*, cliquez sur le bouton **Ajouter des étiquettes**. Entrez les étiquettes sous forme de liste séparée par des virgules, puis cliquez sur **Enregistrer les étiquettes**. Les modifications apportées aux étiquettes d'hôte dans l'UI peuvent prendre jusqu'à cinq minutes pour s'appliquer.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Carte des hôtes avec les détails d'un hôte ouverts mettant en évidence le bouton Ajouter des étiquettes." style="width:80%;">}}


[1]: /fr/infrastructure/hostmap/
{{% /tab %}}
{{% tab "La liste d'insfrastructures" %}}

Attribuez des étiquettes d'hôte dans l'UI en utilisant la [page de liste d'infrastructure][1]. Cliquez sur n'importe quel hôte pour afficher la superposition de l'hôte à droite de la page. Ensuite, sous la section *Utilisateur*, cliquez sur le bouton **Ajouter des étiquettes**. Entrez les étiquettes sous forme de liste séparée par des virgules, puis cliquez sur **Enregistrer les étiquettes**. Les modifications apportées aux étiquettes d'hôte dans l'UI peuvent prendre jusqu'à cinq minutes pour s'appliquer. Après avoir ajouté des étiquettes, assurez-vous qu'elles sont visibles dans l'UI avant d'essayer d'ajouter d'autres étiquettes.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Liste d'infrastructure avec un panneau de détails d'infrastructure ouvert mettant en évidence le bouton Ajouter des étiquettes." style="width:80%;">}}


[1]: /fr/infrastructure/
{{% /tab %}}
{{% tab "Les monitors" %}}

Depuis la page [Gérer les Moniteurs][1], sélectionnez la case à cocher à côté de chaque moniteur pour ajouter des étiquettes (sélectionnez un ou plusieurs moniteurs). Cliquez sur le bouton **Modifier les étiquettes**. Entrez une étiquette ou sélectionnez-en une utilisée précédemment. Puis cliquez sur **Ajouter une étiquette `tag:name`** ou **Appliquer les modifications**. Si des étiquettes ont été ajoutées précédemment, plusieurs étiquettes peuvent être attribuées en même temps en utilisant les cases à cocher des étiquettes. Pour plus d'informations, consultez la [documentation sur la gestion des moniteurs][2].

Lors de la création d'un moniteur, attribuez des étiquettes de moniteur à l'étape 4 *Indiquez ce qui se passe* ou *Notifier votre équipe* :

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="Vue de la configuration des étiquettes de politique. Sous 'Étiquettes de politique', il y a trois exemples d'étiquettes : cost_center, product_id et env, à côté d'un menu déroulant 'Sélectionner une valeur'." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/manage/
{{% /tab %}}
{{% tab "Métriques de distribution" %}}

Créez des agrégations de percentile dans [Métriques de distribution][1] en appliquant une liste autorisée de jusqu'à dix étiquettes à une métrique. Cela crée une série temporelle pour chaque combinaison potentiellement interrogeable de valeurs d'étiquettes. Pour plus d'informations sur le comptage des métriques personnalisées et des séries temporelles émises par les métriques de distribution, consultez [Métriques personnalisées][2].

**Appliquez jusqu'à dix étiquettes. Les étiquettes d'exclusion ne sont pas acceptées** :

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Créer des étiquettes de moniteur" style="width:80%;">}}

[1]: /fr/metrics/distributions/
[2]: /fr/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Les intégrations" %}}

La tuile d'intégration [AWS][1] vous permet d'attribuer des étiquettes supplémentaires à toutes les métriques au niveau du compte, ainsi qu'aux journaux envoyés via [déclencheurs d'abonnement automatique][2]. Utilisez une liste d'étiquettes séparées par des virgules sous la forme `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Étiquettes AWS" style="width:80%;">}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

Lors de la création d'un SLO, attribuez des étiquettes à l'étape 3, **Ajouter un nom et des étiquettes** :

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Créer des étiquettes SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "Attribution" %}}

Les étiquettes peuvent être attribuées de différentes manières avec l'[API Datadog][1]. Voir la liste ci-dessous pour des liens vers ces sections :

* [Publier un contrôle][1]
* [Publier un événement][2]
* [Intégration AWS][3]
* [Publier un point de séries temporelles][4]
* [Créer][5] ou [Modifier][6] un moniteur
* [Ajouter][7] ou [Mettre à jour][8] des étiquettes d'hôte
* [Envoyer des traces][9]
* [Créer][10] ou [Mettre à jour][11] un Objectif de Niveau de Service

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

L'étiquetage dans Datadog est un moyen puissant de rassembler vos métriques. Pour un exemple rapide, peut-être que vous recherchez une somme des métriques suivantes provenant de votre site web (example.com) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recommande d'ajouter l'étiquette `domain:example.com` et de laisser de côté le nom d'hôte (l'API Datadog détermine automatiquement le nom d'hôte) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Avec l'étiquette `domain:example.com`, les pages vues peuvent être additionnées à travers les hôtes :

```text
sum:page.views{domain:example.com}
```

Pour obtenir des données détaillées pour chaque host, utilisez l'expression suivante :

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD {#dogstatsd}

Ajoutez des étiquettes à toute métrique, événement ou vérification de service que vous envoyez à [DogStatsD][10]. Par exemple, comparez la performance de deux algorithmes en étiquetant une métrique de minuterie avec la version de l'algorithme :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Remarque** : L'étiquetage est une [extension spécifique à Datadog][11] de StatsD.

Une attention particulière est nécessaire lors de l'attribution de l'étiquette `host` aux métriques DogStatsD. Pour plus d'informations sur la clé d'étiquette d'hôte, consultez la documentation [Soumission de Métriques : DogStatsD][12].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#define-tags
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/integrations/#cat-cloud
[4]: /fr/getting_started/agent/#setup
[5]: /fr/integrations/#cat-web
[6]: /fr/agent/docker/?tab=standard#tagging
[7]: /fr/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /fr/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /fr/tracing/setup/
[10]: /fr/extend/dogstatsd/
[11]: /fr/extend/community/libraries/
[12]: /fr/metrics/dogstatsd_metrics_submission/#host-tag