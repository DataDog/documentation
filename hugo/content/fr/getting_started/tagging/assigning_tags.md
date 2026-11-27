---
aliases:
- /fr/agent/tagging
- /fr/tagging/assigning_tags/
description: Découvrez comment attribuer des tags dans Datadog.
further_reading:
- link: /getting_started/tagging/
  tag: Documentation
  text: Débuter avec les tags
- link: /getting_started/tagging/using_tags/
  tag: Documentation
  text: Découvrez comment utiliser des tags dans Datadog
title: Assignation de tags
---
## Présentation {#overview}

Le tagging est utilisé dans tout Datadog pour effectuer des requêtes sur les machines et les métriques que vous surveillez. Sans la possibilité d'attribuer et de filtrer en fonction des tags, il pourrait être difficile de trouver des problèmes dans votre environnement et de les isoler suffisamment pour en découvrir les causes réelles. Découvrez comment [définir des tags][1] dans Datadog avant d'aller plus loin.

Les tags peuvent être configurés de plusieurs manières :

- Dans le [fichier de configuration](#configuration-file) du Datadog Agent ou dans chaque fichier de configuration d'intégration
- Via l'[UI](#ui) de Datadog
- Avec l'[API](#api) Datadog
- Avec [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Environnements non conteneurisés" %}}
Dans les environnements non conteneurisés, l'Agent attribue automatiquement le [tag host](#host-tags) et hérite des tags des intégrations. Ces tags, ainsi que les tags supplémentaires que vous pouvez ajouter manuellement, sont configurés dans le [fichier de configuration du Datadog Agent](#configuration-file).
{{% /tab %}}

{{% tab "Environnements conteneurisés" %}}
Dans les environnements conteneurisés, Datadog recommande d'utiliser [Autodiscovery][1] car cela permet le [tagging unifié des services][2], la méthode recommandée pour obtenir un point de configuration unique pour toute votre télémétrie Datadog.

L'objectif d'Autodiscovery est d'appliquer une configuration d'intégration Datadog lors de l'exécution d'un check de l'Agent sur un conteneur donné. Lors de l'utilisation d'Autodiscovery, le Datadog Agent identifie automatiquement les services s'exécutant sur ce nouveau conteneur, recherche la configuration de surveillance correspondante et commence à collecter des métriques. Les tags peuvent ensuite être configurés à partir du [modèle de configuration][3] d'Autodiscovery.

Si Autodiscovery n'est pas utilisé, l'Agent attribue automatiquement le [tag host](#host-tags) et hérite des tags des intégrations de la même manière que dans les environnements non conteneurisés. Ces tags, ainsi que les tags ajoutés manuellement, sont configurés dans le [fichier de configuration du Datadog Agent](#configuration-file).


[1]: /fr/getting_started/agent/autodiscovery/
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Méthodes d'attribution des tags {#methods-to-assign-tags}

### Fichier de configuration {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### Emplacement du fichier {#file-location}

Le fichier de configuration de l'Agent (`datadog.yaml`) est utilisé pour définir les tags de host qui s'appliquent à toutes les métriques, traces et logs transférés par le Datadog Agent.

Les tags pour les [intégrations][1] installées avec l'Agent sont configurés avec des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour localiser les fichiers de configuration, consultez [Fichiers de configuration de l'Agent][2].

#### Format YAML {#yaml-format}

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de tags. En YAML, les listes sont définies avec deux formes différentes mais fonctionnellement équivalentes :

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

Il est recommandé d'attribuer les tags sous forme de paires `<KEY>:<VALUE>`, mais les tags composés uniquement de clés (`<KEY>`) sont également acceptés. Consultez [définition des tags][3] pour plus de détails.

#### Tags de host {#host-tags}

Le nom de host (clé de tag `host`) est [attribué automatiquement][4] par le Datadog Agent. Pour personnaliser le nom de host, utilisez le fichier de configuration de l'Agent, `datadog.yaml` :

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Modification du nom de host {#changing-the-hostname}

* L'ancien nom de host reste dans l'interface utilisateur pendant deux heures, mais n'affiche pas les nouvelles métriques.
* Les données des hosts portant l'ancien nom de host peuvent faire l'objet de requêtes via l'API.
* Pour représenter graphiquement des métriques avec l'ancien et le nouveau nom de host sur un même graphique, utilisez [l'arithmétique entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/configuration/agent-configuration-files/
[3]: /fr/getting_started/tagging/#define-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Emplacement du fichier {#file-location-1}

Le fichier de configuration de l'Agent (`datadog.conf`) est utilisé pour définir les tags de host qui s'appliquent à toutes les métriques, traces et logs transférés par le Datadog Agent.

Les tags pour les [intégrations][1] installées avec l'Agent sont configurés avec des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour localiser les fichiers de configuration, consultez [Fichiers de configuration de l'Agent][2].

#### Format YAML {#yaml-format-1}

Dans les fichiers YAML, utilisez une liste de chaînes sous la clé `tags` pour attribuer une liste de tags. En YAML, les listes sont définies avec deux formes différentes mais fonctionnellement équivalentes :

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Il est recommandé d'attribuer les tags sous forme de paires `<KEY>:<VALUE>`, mais les tags composés uniquement de clés (`<KEY>`) sont également acceptés. Consultez [définition des tags][3] pour plus de détails.

#### Tags de host {#host-tags-1}

Le nom de host (clé de tag `host`) est [attribué automatiquement][4] par le Datadog Agent. Pour personnaliser le nom de host, utilisez le fichier de configuration de l'Agent, `datadog.conf` :

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Modification du nom de host {#changing-the-hostname-1}

* L'ancien nom de host reste dans l'interface utilisateur pendant 2 heures, mais n'affiche pas les nouvelles métriques.
* Les données des hosts portant l'ancien nom de host peuvent faire l'objet de requêtes via l'API.
* Pour représenter graphiquement des métriques avec l'ancien et le nouveau nom de host sur un même graphique, utilisez [l'arithmétique entre deux métriques][5].


[1]: /fr/getting_started/integrations/
[2]: /fr/agent/configuration/agent-configuration-files/
[3]: /fr/getting_started/tagging/#define-tags
[4]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /fr/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Héritage d'intégration {#integration-inheritance}

La méthode la plus efficace pour attribuer des tags consiste à s'appuyer sur l'héritage d'intégration. Les tags que vous attribuez à vos instances AWS, recettes Chef et autres intégrations sont automatiquement hérités par les hosts et les métriques que vous envoyez à Datadog.

Pour les environnements conteneurisés, il est recommandé de suivre la documentation sur le [tagging unifié des services][2] afin d'obtenir un point de configuration unique pour l'ensemble de votre télémétrie Datadog.

##### Intégrations cloud {#cloud-integrations}

Les [intégrations cloud][3] sont basées sur l'authentification. Datadog recommande d'utiliser la tuile d'intégration cloud principale (AWS, Azure, Google Cloud, etc.) et d'[installer l'Agent][4] lorsque cela est possible. **Remarque** : si vous choisissez d'utiliser uniquement l'Agent, certains tags d'intégration ne sont pas disponibles.

##### Intégrations web {#web-integrations}

Les [intégrations web][5] sont basées sur l'authentification. Les métriques sont collectées via des appels API. **Remarque** : Les tags `CamelCase` sont convertis en underscores par Datadog, par exemple `TestTag` --> `test_tag`.

#### Variables d'environnement {#environment-variables}

Après avoir installé le Datadog Agent conteneurisé, vous pouvez définir les tags de votre host à l'aide de la variable d'environnement `DD_TAGS` dans le fichier de configuration principal de votre Agent. Si vous spécifiez plusieurs tags, séparez chacun d'eux par un espace.

**Remarque** : La variable d'environnement `DD_TAGS` utilise des espaces pour séparer les tags. Par exemple, `DD_TAGS="key1:val1 key2:val2"` définit deux tags. Une valeur telle que `DD_TAGS="test:this is a test"` produit quatre tags distincts (`test:this`, `is`, `a`, `test`) car chaque élément séparé par un espace est traité comme un tag à part entière. Pour inclure des espaces dans les valeurs de tag, définissez plutôt les tags via la configuration YAML ou les annotations d'intégration. Ces méthodes convertissent les caractères d'espacement en traits de soulignement (par exemple, `test:this is a test` devient `test:this_is_a_test`).

Datadog collecte automatiquement les tags courants depuis [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad et Rancher][6]. Pour extraire encore plus de tags, utilisez les options suivantes :

| Variable d'environnement               | Description                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraire les étiquettes de conteneur. Cette variable d'environnement est équivalente à l'ancienne variable `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraire les variables d'environnement de conteneur. Cette variable d'environnement est équivalente à l'ancienne variable `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraire les étiquettes de pod.                                                                                     |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajouter des tags aux métriques de check (low, orchestrator, high).                                                    |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajouter des tags aux Custom Metrics (low, orchestrator, high).                                                   |

**Exemples :**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Lorsque vous utilisez `DD_KUBERNETES_POD_LABELS_AS_TAGS`, vous pouvez utiliser des caractères génériques au format suivant :

```text
{"foo": "bar_%%label%%"}
```

Par exemple, `{"app*": "kube_%%label%%"}` correspond au nom de tag `kube_application` pour l'étiquette `application`. De plus, `{"*": "kube_%%label%%"}` ajoute toutes les étiquettes de pod sous forme de tags préfixés par `kube_`.

Lorsque vous utilisez la variable `DD_CONTAINER_LABELS_AS_TAGS` dans un fichier `docker-compose.yaml` Docker Swarm, supprimez les apostrophes, par exemple :

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Lors de l'ajout d'étiquettes aux conteneurs Docker, l'emplacement du mot-clé `labels:` dans le fichier `docker-compose.yaml` est important. Pour éviter tout problème, suivez la documentation sur le [tagging unifié des services Docker][2].

Si le conteneur doit être étiqueté en dehors de cette configuration, placez le mot-clé `labels:` **à l'intérieur** de la section `services:`, **pas** à l'intérieur de la section `deploy:`. Placez le mot-clé `labels:` à l'intérieur de la section `deploy:` uniquement lorsque le service doit être étiqueté. Le Datadog Agent n'a aucune étiquette à extraire des conteneurs sans cet emplacement.

Vous trouverez ci-dessous un exemple de fichier `docker-compose.yaml` fonctionnel qui montre cet emplacement d'étiquette. Dans l'exemple ci-dessous, les étiquettes de la section `myapplication:`, `my.custom.label.project` et `my.custom.label.version` ont chacune des valeurs uniques. L'utilisation de la variable d'environnement `DD_CONTAINER_LABELS_AS_TAGS` dans la section `datadog:` extrait les étiquettes et produit ces tags pour le conteneur `myapplication` :

À l'intérieur du conteneur `myapplication`, les étiquettes sont : `my.custom.label.project` et `my.custom.label.version`

Une fois que l'Agent a extrait les étiquettes du conteneur, les tags sont :
`projecttag:projectA`
`versiontag:1`

**Exemple de docker-compose.yaml :**

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

Définissez les variables dans votre `datadog.yaml` personnalisé, ou définissez-les en tant que mappages JSON dans ces variables d'environnement. La clé de mappage est le nom de la source (`label/envvar`), et la valeur de mappage est le nom du tag Datadog.

##### Cardinalité des tags {#tags-cardinality}

Il existe deux variables d'environnement qui définissent la cardinalité des tags : `DD_CHECKS_TAG_CARDINALITY` et `DD_DOGSTATSD_TAG_CARDINALITY`. Comme la tarification de DogStatsD est différente, le paramètre de cardinalité des tags DogStatsD est séparé pour permettre une configuration plus précise. Sinon, ces variables fonctionnent de la même manière : elles peuvent avoir les valeurs `low`, `orchestrator` ou `high`. Elles ont toutes deux `low` comme valeur par défaut, ce qui inclut les tags au niveau du cluster Kubernetes.

Les différents paramètres de cardinalité ciblent :
* `low` : tags au niveau du cluster Kubernetes, tels que `kube_namespace`.
* `orchestrator` : tags au niveau du pod, tels que `pod_name`.
* `high` : tags au niveau du conteneur, tels que `container_id`.

Selon la cardinalité, il existe un ensemble différent de tags prêts à l'emploi pour [Kubernetes et OpenShift][7], ainsi que pour [Docker, Rancher et Mesos][8]. Pour ECS et Fargate, définir la variable sur `orchestrator` ajoute le tag `task_arn`.

**Remarques** :
- L'envoi de tags de conteneur pour les métriques DogStatsD peut créer davantage de métriques (une par conteneur au lieu d'une par host). Cela peut avoir une incidence sur la facturation de vos Custom Metrics.
- Dans les métriques, les horodatages sont arrondis à la seconde près. Si plusieurs points possèdent le même horodatage, le point le plus récent écrase les précédents. La définition d'une cardinalité plus élevée peut aider à éviter ce problème.

#### Traces {#traces}

Le SDK Datadog peut être configuré à l'aide de variables d'environnement, de propriétés système ou via une configuration dans le code. La documentation sur la [configuration du tracing Datadog][9] contient des informations sur les options de tagging et la configuration pour chaque SDK. Vous pouvez également suivre la documentation sur le [tagging de service unifié][2] pour configurer votre SDK pour le tagging de service unifié.

Quel que soit le SDK utilisé, les métadonnées de span doivent respecter une structure arborescente typée. Chaque nœud de l'arborescence est séparé par un `.` et est d'un type unique.

Par exemple, un nœud ne peut pas être à la fois un objet (avec des sous-nœuds) et une chaîne de caractères :

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

Les métadonnées de span ci-dessus ne sont pas valides, car la valeur de `key` ne peut pas référencer à la fois une chaîne (`"value"`) et une sous-arborescence (`{"subkey": "value_2"}`).

### UI {#ui}

{{< tabs >}}
{{% tab "Hostmap" %}}

Attribuez des tags de host dans l'interface utilisateur à l'aide de la [page Hostmap][1]. Cliquez sur n'importe quel hexagone (host) pour afficher le panneau du host en bas de la page. Ensuite, sous la section {{< ui >}}User{{< /ui >}}, cliquez sur le bouton {{< ui >}}Add Tags{{< /ui >}}. Saisissez les tags sous forme de liste séparée par des virgules, puis cliquez sur {{< ui >}}Save Tags{{< /ui >}}. Les modifications apportées aux tags de host dans l'interface utilisateur peuvent prendre jusqu'à cinq minutes pour être appliquées.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Hostmap avec les détails d'un host affichés et le bouton Add Tags mis en évidence" style="width:80%;">}}


[1]: /fr/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Liste d'infrastructures" %}}

Attribuez des tags de host dans l'interface utilisateur à l'aide de la [page Infrastructure List][1]. Cliquez sur n'importe quel host pour afficher le panneau du host à droite de la page. Ensuite, sous la section {{< ui >}}User{{< /ui >}}, cliquez sur le bouton {{< ui >}}Add Tags{{< /ui >}}. Saisissez les tags sous forme de liste séparée par des virgules, puis cliquez sur {{< ui >}}Save Tags{{< /ui >}}. Les modifications apportées aux tags de host dans l'interface utilisateur peuvent prendre jusqu'à cinq minutes pour être appliquées. Une fois les tags ajoutés, assurez-vous qu'ils sont visibles dans l'interface utilisateur avant d'essayer d'en ajouter d'autres.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Infrastructure List avec le panneau de détails Infrastructure ouvert et le bouton Add Tags mis en évidence" style="width:80%;">}}


[1]: /fr/infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

Depuis la page [Manage Monitors][1], cochez la case à côté de chaque moniteur pour ajouter des tags (sélectionnez un ou plusieurs moniteurs). Cliquez sur le bouton {{< ui >}}Edit Tags{{< /ui >}}. Saisissez un tag ou sélectionnez-en un utilisé précédemment. Cliquez ensuite sur {{< ui >}}Add Tag `tag:name`{{< /ui >}} ou {{< ui >}}Apply Changes{{< /ui >}}. Si des tags ont été ajoutés précédemment, plusieurs tags peuvent être attribués à la fois à l'aide des cases à cocher des tags. Pour plus d'informations, consultez la [documentation sur la gestion des moniteurs][2].

Lors de la création d'un moniteur, attribuez des tags de moniteur à l'étape 4 {{< ui >}}Say what's happening{{< /ui >}} ou {{< ui >}}Notify your Team{{< /ui >}} :

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="Vue de la configuration des tags de politique. Sous « Tags de politique » se trouvent trois exemples de tags, cost_center, product_id et env, à côté d'un menu déroulant « Sélectionner une valeur »." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/monitors/manage/
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Créez des agrégations de centiles dans [Distribution Metrics][1] en appliquant une liste d'autorisation d'un maximum de dix tags à une métrique. Cela crée une série temporelle pour chaque combinaison potentiellement interrogeable de valeurs de tag. Pour plus d'informations sur le comptage des Custom Metrics et des séries temporelles émises à partir des métriques de distribution, consultez [Custom Metrics][2].

**Appliquez jusqu'à dix tags. Les tags d'exclusion ne sont pas acceptés** :

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Créer des tags de monitor" style="width:80%;">}}

[1]: /fr/metrics/distributions/
[2]: /fr/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integrations" %}}

La tuile d'intégration [AWS][1] vous permet d'attribuer des tags supplémentaires à toutes les métriques au niveau du compte, ainsi qu'aux logs envoyés via des [déclencheurs d'abonnement automatique][2]. Utilisez une liste de tags séparés par des virgules sous la forme `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Tags AWS" style="width:80%;">}}

[1]: /fr/integrations/amazon_web_services/
[2]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

Lors de la création d'un SLO, attribuez des tags à l'étape 3, {{< ui >}}Add name and tags{{< /ui >}} :

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Créer des tags de SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "Attribution" %}}

Les tags peuvent être attribués de différentes manières avec la [Datadog API][1]. Consultez la liste ci-dessous pour obtenir des liens vers ces sections :

* [Publier une exécution de check][1]
* [Publier un événement][2]
* [AWS Integration][3]
* [Publier un point de série temporelle][4]
* [Créer][5] ou [Modifier][6] un monitor
* [Ajouter][7] ou [Mettre à jour][8] des tags de host
* [Envoyer des traces][9]
* [Créer][10] ou [Mettre à jour][11] un Service Level Objective

[1]: /fr/api/v1/service-checks/#submit-a-service-check
[2]: /fr/api/v1/events/#post-an-event
[3]: /fr/api/v1/aws-integration/
[4]: /fr/api/latest/metrics/#submit-metrics
[5]: /fr/api/v1/monitors/#create-a-monitor
[6]: /fr/api/v1/monitors/#edit-a-monitor
[7]: /fr/api/v1/tags/#add-tags-to-a-host
[8]: /fr/api/v1/tags/#update-host-tags
[9]: /fr/tracing/guide/send_traces_to_agent_by_api/
[10]: /fr/api/v1/service-level-objectives/#create-a-slo-object
[11]: /fr/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Exemple" %}}

L'utilisation des tags dans Datadog est un moyen efficace de regrouper vos métriques. Pour prendre un exemple simple, vous souhaitez peut-être calculer la somme des métriques suivantes provenant de votre site web (example.com) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recommande d'ajouter le tag `domain:example.com` et d'omettre le nom de host (la Datadog API détermine automatiquement le nom de host) :

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Avec le tag `domain:example.com`, les pages vues peuvent être additionnées sur tous les hosts :

```text
sum:page.views{domain:example.com}
```

Pour obtenir une répartition par host, utilisez :

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD {#dogstatsd}

Ajoutez des tags à toute métrique, tout événement ou tout service check que vous envoyez à [DogStatsD][10]. Par exemple, comparez les performances de deux algorithmes en taguant une métrique de type timer avec la version de l'algorithme :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Remarque** : le fait de taguer est une [extension spécifique à Datadog][11] de StatsD.

Une attention particulière est nécessaire lors de l'attribution du tag `host` aux métriques DogStatsD. Pour plus d'informations sur la clé de tag host, consultez la documentation [Metrics Submission: DogStatsD][12].

## Pour aller plus loin {#further-reading}

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