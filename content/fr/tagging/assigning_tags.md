---
title: Assigner des tags
kind: documentation
aliases:
  - /fr/agent/tagging
  - /fr/getting_started/tagging/assigning_tags
further_reading:
  - link: /getting_started/tagging/
    tag: Documentation
    text: Débuter avec les tags
  - link: /getting_started/tagging/using_tags/
    tag: Documentation
    text: Apprendre à utiliser des tags dans Datadog
---
## Présentation

Les tags vous permettent d'interroger les machines et métriques que vous surveillez avec Datadog. Pour identifier les problèmes au sein de votre environnement et affiner suffisamment les données afin d'en découvrir les causes profondes, vous devez être en mesure d'assigner des tags et d'appliquer des filtres à partir de ces derniers. Découvrez comment [définir des tags][1] dans Datadog avant de poursuivre la lecture de cette rubrique.

Vous pouvez assigner des tags au sein de plusieurs éléments de Datadog : les [fichiers de configuration](#fichiers-de-configuration), les [variables d'environnement][2], vos [traces](#traces), l'[IU](#iu) de Datadog, l'[API][3], [DogStatsD][4] et les [intégrations][5] (grâce à leur fonction d'héritage). Nous vous recommandons d'utiliser les fichiers de configuration et l'héritage des intégrations pour l'assignation de la majorité de vos tags.

## Fichiers de configuration

### Hostname

Le hostname (clé de tag `host`) est [assigné automatiquement][6] par l'Agent Datadog. Pour personnaliser le hostname, utilisez le fichier de configuration de l'Agent, `datadog.yaml` :

```yaml
# Définissez le hostname (par défaut : détection automatique)
# Doit être conforme à la norme RFC-1123, qui autorise uniquement :
# les caractères de « A » à « Z », de « a » à « z », de « 0 » à « 9 » et « - » (trait d'union)
hostname: mamachine.mondomaine
```

#### Modifier le hostname

* L'ancien hostname reste dans l'interface pendant 2 heures, mais n'affiche pas les nouvelles métriques.
* Vous pouvez interroger les données provenant de hosts avec l'ancien hostname grâce à l'API.
* Pour représenter des métriques avec l'ancien hostname et le nouveau hostname dans un seul graphique, utilisez [des opérations arithmétiques entre deux métriques][7].

### Ajouter des tags

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Le fichier de configuration de l'Agent (`datadog.yaml`) est également utilisé pour définir des tags de host qui s'appliquent à l'ensemble des métriques, des traces et des logs transmis par l'Agent Datadog (voir les formats YAML ci-dessous).

{{% /tab %}}
{{% tab "Agent v5" %}}

Le fichier de configuration de l'Agent (`datadog.conf`) est également utilisé pour définir des tags de host qui s'appliquent à l'ensemble des métriques, des traces et des logs transmis par l'Agent Datadog. Les tags dans le fichier `datadog.conf` doivent respecter le format suivant :

```text
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

{{% /tab %}}
{{< /tabs >}}

Les tags pour les [intégrations][5] installées avec l'Agent sont configurés à l'aide des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour accéder aux fichiers de configuration, consultez les [fichiers de configuration de l'Agent][8].

#### Formats YAML

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

Nous vous recommandons d'assigner des tags sous la forme de paires `<KEY>:<VALUE>`. Toutefois, les tags comprenant uniquement des keys (`<KEY>`) sont également acceptés. Consultez la rubrique sur la [définition des tags][1] pour en savoir plus.

## Variables d'environnement

Lors de l'installation de l'Agent Datadog conteneurisé, définissez vos tags de host à l'aide de la variable d'environnement `DD_TAGS`. Nous recueillons automatiquement les tags courants de [Docker][9], [Kubernetes][10], [ECS][11], [Swarm, Mesos, Nomad et Rancher][9]. Pour extraire encore plus de tags, utilisez les paramètres suivants :

| Variable d'environnement               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extraire les étiquettes de conteneur Docker                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extraire les variables d'environnement de conteneur Docker |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraire les étiquettes de pod                             |
| `DD_CHECKS_TAG_CARDINALITY`        | Ajouter des tags aux métriques de check                      |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Ajouter des tags aux métriques custom                     |

**Exemples :**

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Lorsque vous utilisez `DD_KUBERNETES_POD_LABELS_AS_TAGS`, vous pouvez utiliser des wildcards au format suivant :

```text
{"foo", "bar_%%label%%"}
```

Par exemple, `{"app*", "kube_%%label%%"}` correspond au nom de tag `kube_application` pour l'étiquette `application`. En outre, `{"*", "kube_%%label%%"}` ajoute toutes les étiquettes de pod en tant que tags avec le préfixe `kube_`.

Lorsque vous utilisez la variable `DD_DOCKER_LABELS_AS_TAGS` dans un fichier `docker-compose.yaml` Docker Swarm, assurez-vous de supprimer les apostrophes. Exemple :

```shell
DD_DOCKER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Lors de l'ajout d'étiquettes à des conteneurs Docker, le placement du mot-clé `labels:` à l'intérieur du fichier `docker-compose.yaml` est très important. Si les étiquettes doivent être appliquées au conteneur, placez le mot-clé `labels:` **dans** de la section `services:`, et **non** dans la section `deploy:`. Placez le mot-clé `labels:` dans la section `deploy:` uniquement lorsque les étiquettes doivent être appliquées au service. L'Agent Datadog n'a aucune étiquette à extraire des conteneurs si ce placement n'est pas utilisé. Un exemple de fichier `docker-compose.yaml` valide illustrant cette notion est présenté ci-dessous. Dans cet exemple, les étiquettes `my.custom.label.project` et `my.custom.label.version` dans la section `myapplication:` ont chacune des valeurs uniques. L'utilisation de la variable d'environnement `DD_DOCKER_LABELS_AS_TAGS` dans la section `datadog:` permet d'extraire les étiquettes et de générer ces tags pour le conteneur `myapplication` :

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
      - DD_DOCKER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
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

Il existe deux variables d'environnement qui définissent la cardinalité des tags : `DD_CHECKS_TAG_CARDINALITY` et `DD_DOGSTATSD_TAG_CARDINALITY`. Les règles de tarification pour DogStatsD étant différentes, un paramètre de cardinalité distinct est utilisé afin d'offrir des options de configuration plus poussées. Pour le reste, ces variables fonctionnent de la même façon : elles acceptent la valeur `low`, `orchestrator` ou `high`. Par défaut, la valeur `low` est utilisée, ce qui permet de récupérer les tags au niveau du host.

Si vous définissez la variable sur `orchestrator`, cela ajoute les tags suivants : `pod_name` (Kubernetes), `oshift_deployment` (OpenShift), `task_arn` (ECS et Fargate) et `mesos_task` (Mesos).

Si vous définissez la variable sur `high`, cela ajoute également les tags suivants : `container_name` (Docker), `container_id` (Docker) et `display_container_name` (Kubelet).

## Traces

Si vous envoyez une seule trace, taguez ses spans afin d'ignorer les tags de configuration de l'Agent et/ou la valeur des tags du host (le cas échéant) pour ces traces :

Les exemples suivants utilisent le [tag primaire][12] par défaut `env:<ENVIRONNEMENT>`. Cependant, vous pouvez également le remplacer par un tag `<KEY>:<VALUE>`.

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "<ENVIRONNEMENT>")
```

Pour OpenTracing, utilisez l'option de démarrage `tracer.WithGlobalTag` pour définir de façon globale l'environnement.

{{% /tab %}}
{{% tab "Java" %}}
Avec sysprop :

```text
-Ddd.trace.span.tags=env:<ENVIRONNEMENT>
```

Avec des variables d'environnement :

```text
DD_TRACE_SPAN_TAGS="env:<ENVIRONNEMENT>"
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
Datadog.tracer.set_tags('env' => '<ENVIRONNEMENT>')
```

{{% /tab %}}
{{% tab "Python" %}}

```python
from ddtrace import tracer
tracer.set_tags({'env': '<ENVIRONNEMENT>'})
```

{{% /tab %}}
{{% tab ".NET" %}}

```csharp
using Datadog.Trace;
Tracer.Instance.ActiveScope?.Span.SetTag("env", "<ENVIRONNEMENT>");
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : les métadonnées span doivent respecter une arborescence. Chaque nœud de l'arborescence est séparé par le caractère `.` et ne peut posséder qu'un seul type. Ainsi, un nœud ne peut pas être un objet (avec des nœuds inférieurs) ET une chaîne de caractères.

Cet exemple de tags de span n'est donc pas valide :

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

## IU

{{< tabs >}}
{{% tab "Hostmap" %}}

Vous pouvez assigner des tags de host dans l'interface depuis la page relative à la [Hostmap][1]. Cliquez sur l'hexagone (host) de votre choix pour superposer le host en bas de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. **Remarque** : l'application des modifications de tags de métrique effectuées via l'interface peut prendre jusqu'à 30 minutes.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Tags hostmap"  style="width:80%;">}}

[1]: /fr/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Liste d'infrastructures" %}}

Vous pouvez assigner des tags de host dans l'interface depuis la page relative à la [liste d'infrastructures][1]. Cliquez sur un host pour le superposer sur la droite de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. **Remarque** : l'application des modifications de tags de métrique effectuées via l'interface peut prendre jusqu'à 30 minutes.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Tags liste d'infrastructures"  style="width:80%;">}}

[1]: /fr/infrastructure/
{{% /tab %}}
{{% tab "Monitors" %}}

Depuis la page de [gestion des monitors][1], cochez la case en regard de chaque monitor pour ajouter des tags (sélectionnez un ou plusieurs monitors). Cliquez sur le bouton **Edit Tags**. Saisissez un tag ou sélectionnez un tag précédemment utilisé. Cliquez ensuite sur **Add Tag `nom:tag`** ou **Apply Changes**. Si vous aviez déjà ajouté des tags, vous pouvez assigner plusieurs tags à la fois en cochant leurs cases.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Tags gestion de monitors"  style="width:80%;">}}

Lorsque vous créez un monitor, assignez des tags de monitor durant l'étape 4 *Say what's happening* :

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Tags création de monitor"  style="width:80%;">}}

[1]: /fr/monitors/manage_monitor/
{{% /tab %}}
{{% tab "Métriques de distribution" %}}

Créez des agrégations par centile dans les [métriques de distribution][1] en appliquant une liste blanche d'un maximum de dix tags à une métrique. Cela permet de créer une série temporelle pour chaque combinaison de valeurs de tags potentiellement interrogeable. Pour en savoir plus sur le comptage de métriques custom et de séries temporelles émises à partir de métriques de distribution, consultez [Métriques custom][2].

**Jusqu'à dix tags peuvent être appliqués. Les tags d'exclusion ne sont pas acceptés** :

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Tags création de monitor"  style="width:80%;">}}

[1]: /fr/metrics/distributions/
[2]: /fr/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Intégrations" %}}

Le carré d'intégration [AWS][1] vous permet d'assigner des tags supplémentaires à l'ensemble des métriques pour un compte spécifique. Utilisez une liste de tags au format `<KEY>:<VALUE>` séparés par des virgules.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Tags AWS"  style="width:80%;">}}

[1]: /fr/integrations/amazon_web_services/
{{% /tab %}}
{{< /tabs >}}

## API

{{< tabs >}}
{{% tab "Assignation" %}}

Les tags peuvent être assignés de diverses façons avec l'[API Datadog][1]. Cliquez sur les liens ci-dessous pour accéder aux rubriques indiquées :

* [Envoyer le résultat d'un check][2]
* [Envoyer un événement][3]
* [Intégration AWS][4]
* [Envoyer des points de séries temporelles][5]
* [Créer][6] ou [modifier][7] un monitor
* [Ajouter][8] ou [mettre à jour][9] les tags d'un host
* [Envoyer des traces][10]

[1]: /fr/api/
[2]: /fr/api/v1/service-checks/#submit-a-service-check
[3]: /fr/api/v1/events/#post-an-event
[4]: /fr/api/v1/aws-integration/
[5]: /fr/api/v1/metrics/#submit-metrics
[6]: /fr/api/v1/monitors/#create-a-monitor
[7]: /fr/api/v1/monitors/#edit-a-monitor
[8]: /fr/api/v1/tags/#add-tags-to-a-host
[9]: /fr/api/v1/tags/#update-host-tags
[10]: /fr/api/v1/tracing/
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

## DogStatsD

Vous pouvez ajouter des tags aux métriques, événements ou checks de service que vous envoyez à [DogStatsD][4]. Pour comparer les performances de deux algorithmes, il vous suffit donc de taguer une métrique de type timer de façon à indiquer la version de l'algorithme :

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # À vous de jouer...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # À vous de jouer... (avec une version plus rapide ?)
```

**Remarque** : l'ajout de tags dans StatsD requiert une [extension Datadog][13].

Des précautions particulières doivent être prises pour l'assignation du tag `host` aux métriques DogStatsD. Pour en savoir plus sur la clé de tag host, consultez la [rubrique DogStatsD][14].

## Héritage des intégrations

Pour assigner facilement des tags, nous vous conseillons de faire appel à la fonction d'héritage des intégrations. Les tags que vous assignez à vos instances AWS, à vos recettes Chef ainsi qu'à d'autres intégrations sont automatiquement appliqués aux hosts et aux métriques que vous envoyez à Datadog.

### Intégrations cloud

Les intégrations cloud sont basées sur un système d'authentification. Datadog vous conseille d'utiliser le carré d'intégration cloud principal (AWS, Azure, Google Cloud, etc.) et d'[installer l'Agent][15] lorsque cela est possible. **Remarque** : si vous utilisez uniquement l'Agent, certains tags d'intégration ne seront pas disponibles.

#### Amazon Web Services

Les tags suivants sont recueillis à partir des intégrations AWS. **Remarque** : certains tags s'affichent uniquement pour des métriques spécifiques.

| Intégration            | Clés de tag Datadog                                                                                                                                                                                              |
|------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes                    | `region`                                                                                                                                                                                                      |
| [API Gateway][16]      | `apiid`, `apiname`, `method`, `resource`, `stage`                                                                                                                                                             |
| [Auto Scaling][17]     | `autoscalinggroupname`, `autoscaling_group`                                                                                                                                                                   |
| [Billing][18]          | `account_id`, `budget_name`, `budget_type`, `currency`, `servicename`, `time_unit`                                                                                                                            |
| [CloudFront][19]       | `distributionid`                                                                                                                                                                                              |
| CodeBuild              | `project_name`                                                                                                                                                                                                |
| [CodeDeploy][20]       | `application`, `creator`, `deployment_config`, `deployment_group`, `deployment_option`, `deployment_type`, `status`                                                                                           |
| [DirectConnect][21]    | `connectionid`                                                                                                                                                                                                |
| [DynamoDB][22]         | `globalsecondaryindexname`, `operation`, `streamlabel`, `tablename`                                                                                                                                           |
| [EBS][23]              | `volumeid`, `volume-name`, `volume-type`                                                                                                                                                                      |
| [EC2][24]              | `autoscaling_group`, `availability-zone`, `image`, `instance-id`, `instance-type`, `kernel`, `name`, `security_group_name`                                                                                    |
| [ECS][25]              | `clustername`, `servicename`, `instance_id`                                                                                                                                                                   |
| [EFS][26]              | `filesystemid`                                                                                                                                                                                                |
| [ElastiCache][27]      | `cachenodeid`, `cache_node_type`, `cacheclusterid`, `cluster_name`, `engine`, `engine_version`, `prefered_availability-zone`, `replication_group`                                                             |
| [ElasticBeanstalk][28] | `environmentname`, `enviromentid`                                                                                                                                                                             |
| [ELB][29]              | `availability-zone`, `hostname`, `loadbalancername`, `name`, `targetgroup`                                                                                                                                    |
| [EMR][30]              | `cluster_name`, `jobflowid`                                                                                                                                                                                   |
| [ES][31]               | `dedicated_master_enabled`, `ebs_enabled`, `elasticsearch_version`, `instance_type`, `zone_awareness_enabled`                                                                                                 |
| [Firehose][32]         | `deliverystreamname`                                                                                                                                                                                          |
| [Health][33]           | `event_category`, `status`, `service`                                                                                                                                                                         |
| [IoT][34]              | `actiontype`, `protocol`, `rulename`                                                                                                                                                                          |
| [Kinesis][35]          | `streamname`, `name`, `state`                                                                                                                                                                                 |
| [KMS][36]              | `keyid`                                                                                                                                                                                                       |
| [Lambda][37]           | `functionname`, `resource`, `executedversion`, `memorysize`, `runtime`                                                                                                                                        |
| [Machine Learning][38] | `mlmodelid`, `requestmode`                                                                                                                                                                                    |
| [MQ][39]               | `broker`, `queue`, `topic`                                                                                                                                                                                    |
| [OpsWorks][40]         | `stackid`, `layerid`, `instanceid`                                                                                                                                                                            |
| [Polly][41]            | `operation`                                                                                                                                                                                                   |
| [RDS][42]              | `auto_minor_version_upgrade`, `dbinstanceclass`, `dbclusteridentifier`, `dbinstanceidentifier`, `dbname`, `engine`, `engineversion`, `hostname`, `name`, `publicly_accessible`, `secondary_availability-zone` |
| [Redshift][43]         | `clusteridentifier`, `latency`, `nodeid`, `service_class`, `stage`, `wlmid`                                                                                                                                   |
| [Route 53][44]         | `healthcheckid`                                                                                                                                                                                               |
| [S3][45]               | `bucketname`, `filterid`, `storagetype`                                                                                                                                                                       |
| [SES][46]              | Les clés de tag sont personnalisées dans AWS.                                                                                                                                                                               |
| [SNS][47]              | `topicname`                                                                                                                                                                                                   |
| [SQS][48]              | `queuename`                                                                                                                                                                                                   |
| [VPC][49]              | `nategatewayid`, `vpnid`, `tunnelipaddress`                                                                                                                                                                   |
| [WorkSpaces][50]       | `directoryid`, `workspaceid`                                                                                                                                                                                  |

#### Azure

Les métriques, événements et checks de service des intégrations Azure reçoivent les tags suivants :

| Intégration                                           | Espace de nommage                                   | Clés de tag Datadog                                                                                                                                                                                                 |
|-------------------------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Toutes les intégrations Azure                                | Toutes                                         | `cloud_provider`, `region`, `kind`, `type`, `name`, `resource_group`, `tenant_name`, `subscription_name`, `subscription_id`, `status` (le cas échéant)                                                            |
| Intégrations VM Azure                                 | `azure.vm.*`                                | `host`, `size`, `operating_system`, `availability_zone`                                                                                                                                                          |
| Plans Azure App Service<sup>(1)</sup>                 | `azure.web_serverfarms.*`                   | `per_site_scaling`, `plan_size`, `plan_tier`, `operating_system`                                                                                                                                                 |
| Azure App Services Web Apps et Functions<sup>(1)</sup> | `azure.app_services.*`, `azure.functions.*` | `operating_system`, `server_farm_id`, `reserved`, `usage_state`, `fx_version` (applications web Linux uniquement), `php_version`, `dot_net_framework_version`, `java_version`, `node_version`, `python_version`                |
| Azure&nbsp;SQL&nbsp;DB<sup>(1)</sup>                  | `azure.sql_servers_databases.*`             | `license_type`, `max_size_mb`, `server_name`, `role`, `zone_redundant`. <br>Pour les liens de réplication uniquement :  `state` `primary_server_name` `primary_server_region` `secondary_server_name` `secondary_server_region` |
| Azure Load Balancer<sup>(1)</sup>                     | `azure.network_loadbalancers.*`             | `sku_name`                                                                                                                                                                                                       |
| Utilisation et quotas Azure<sup>(1)</sup>                   | `azure.usage.*`                             | `usage_category`, `usage_name`                                                                                                                                                                                   |

<sup>(1)</sup>*Les tags spécifiques aux ressources sont en version bêta.*

#### Google Cloud Platform

Consultez la documentation de l'[intégration Google Cloud Platform][51].

### Intégrations web

Les intégrations web sont basées sur un système d'authentification. Les métriques sont recueillies via des appels d'API. **Remarque** : les tags `CamelCase` sont convertis en tirets bas par Datadog (par exemple, `TestTag` --> `test_tag`).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/#defining-tags
[2]: /fr/agent/docker/#environment-variables
[3]: /fr/api/
[4]: /fr/metrics/dogstatsd_metrics_submission/
[5]: /fr/integrations/
[6]: /fr/agent/faq/how-datadog-agent-determines-the-hostname/
[7]: /fr/dashboards/querying/#arithmetic-between-two-metrics
[8]: /fr/agent/guide/agent-configuration-files/
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[12]: /fr/tracing/guide/setting_primary_tags_to_scope/
[13]: /fr/libraries/
[14]: /fr/metrics/dogstatsd_metrics_submission/#host-tag-key
[15]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[16]: /fr/integrations/amazon_api_gateway/
[17]: /fr/integrations/amazon_auto_scaling/
[18]: /fr/integrations/amazon_billing/
[19]: /fr/integrations/amazon_cloudfront/
[20]: /fr/integrations/amazon_codedeploy/
[21]: /fr/integrations/amazon_directconnect/
[22]: /fr/integrations/amazon_dynamodb/
[23]: /fr/integrations/amazon_ebs/
[24]: /fr/integrations/amazon_ec2/
[25]: /fr/integrations/amazon_ecs/
[26]: /fr/integrations/amazon_efs/
[27]: /fr/integrations/amazon_elasticache/
[28]: /fr/integrations/amazon_elasticbeanstalk/
[29]: /fr/integrations/amazon_elb/
[30]: /fr/integrations/amazon_emr/
[31]: /fr/integrations/amazon_es/
[32]: /fr/integrations/amazon_firehose/
[33]: /fr/integrations/amazon_health/
[34]: /fr/integrations/amazon_iot/
[35]: /fr/integrations/amazon_kinesis/
[36]: /fr/integrations/amazon_kms/
[37]: /fr/integrations/amazon_lambda/
[38]: /fr/integrations/amazon_machine_learning/
[39]: /fr/integrations/amazon_mq/
[40]: /fr/integrations/amazon_ops_works/
[41]: /fr/integrations/amazon_polly/
[42]: /fr/integrations/amazon_rds/
[43]: /fr/integrations/amazon_redshift/
[44]: /fr/integrations/amazon_route53/
[45]: /fr/integrations/amazon_s3/
[46]: /fr/integrations/amazon_ses/
[47]: /fr/integrations/amazon_sns/
[48]: /fr/integrations/amazon_sqs/
[49]: /fr/integrations/amazon_vpc/
[50]: /fr/integrations/amazon_workspaces/
[51]: /fr/integrations/google_cloud_platform/#tags-assigned
