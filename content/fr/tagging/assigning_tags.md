---
title: Assigner des tags
kind: documentation
aliases:
  - /fr/agent/tagging
  - /fr/getting_started/tagging/assigning_tags
further_reading:
  - link: tagging
    tag: Documentation
    text: Débuter avec les tags
  - link: tagging/using_tags
    tag: Documentation
    text: Apprendre à utiliser des tags dans Datadog
---
## Présentation

Les tags vous permettent d'interroger les machines et métriques que vous surveillez avec Datadog. Pour identifier les problèmes au sein de votre environnement et affiner suffisamment les données afin d'en découvrir les causes profondes, vous devez être en mesure d'assigner des tags et d'appliquer des filtres à partir de ces derniers. Découvrez comment [définir des tags][1] dans Datadog avant de poursuivre la lecture de cette rubrique.

Vous pouvez assigner des tags au sein de plusieurs éléments de Datadog : les [fichiers de configuration](#fichiers-de-configuration), les [variables d'environnement][2], vos [traces](#traces), l'[IU](#iu) de Datadog, l'[API][3], [DogStatsD][4] et les [intégrations][5] (grâce à leur fonction d'héritage). Nous vous recommandons d'utiliser les fichiers de configuration et l'héritage des intégrations pour l'assignation de la majorité de vos tags.

## Fichiers de configuration

Le hostname (clé de tag `host`) est [assigné automatiquement][6] par l'Agent Datadog. Pour personnaliser le hostname, utilisez le fichier de configuration de l'Agent, `datadog.yaml` :

```yaml
# Définissez le hostname (par défaut : détection automatique)
# Doit être conforme à la norme RFC-1123, qui autorise uniquement :
# les caractères de « A » à « Z », de « a » à « z », de « 0 » à « 9 » et « - » (trait d'union)
hostname: mamachine.mondomaine
```

**Lorsque vous changez le hostname** :

* L'ancien hostname reste dans l'IU pendant 24 heures, mais n'affiche pas les nouvelles métriques.
* Vous pouvez interroger les données provenant de hosts avec l'ancien hostname grâce à l'API.
* Pour représenter des métriques avec l'ancien hostname et le nouveau hostname dans un seul graphique, utilisez [des opérations arithmétiques entre deux métriques][7].

Le fichier de configuration de l'Agent (`datadog.yaml`) est également utilisé pour définir des tags de host qui s'appliquent à l'ensemble des métriques, des traces et des logs transmis par l'Agent Datadog (voir les formats YAML ci-dessous).

Les tags pour les [intégrations][5] installées avec l'Agent sont configurés à l'aide des fichiers YAML situés dans le répertoire **conf.d** de l'installation de l'Agent. Pour accéder aux fichiers de configuration, consultez la [FAQ sur les fichiers de configuration de l'Agent][8].

**Formats YAML**

Utilisez dans les fichiers YAML un dictionnaire de tags comportant la liste des tags à assigner à ce niveau. Les dictionnaires de tags peuvent respecter deux formats différents, aux caractéristiques similaires :

```
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

ou

```
tags:
    - <KEY_1>:<VALUE_1>
    - <KEY_2>:<VALUE_2>
    - <KEY_3>:<VALUE_3>
```

Nous vous recommandons d'assigner des tags sous la forme de paires `<KEY>:<VALUE>`. L'autre format de tags plus simple est également accepté. Consultez la rubrique sur la [définition des tags][1] pour en savoir plus. 

## Variables d'environnement

Lors de l'installation de l'Agent Datadog conteneurisé, définissez vos tags de host à l'aide de la variable d'environnement `DD_TAGS`. Nous recueillons automatiquement les tags courants de [Docker][9], [Kubernetes][10], [ECS][11], [Swarm, Mesos, Nomad et Rancher][9]. Pour extraire encore plus de tags, utilisez les paramètres suivants :

| Variable d'environnement               | Description                                    |
|------------------------------------|------------------------------------------------|
| `DD_DOCKER_LABELS_AS_TAGS`         | Extraire les étiquettes de conteneur Docker                |
| `DD_DOCKER_ENV_AS_TAGS`            | Extraire les variables d'environnement de conteneur Docker |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraire les étiquettes de pod                             |

**Exemples :**

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_DOCKER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Définissez les variables dans votre fichier `datadog.yaml` personnalisé ou configurez-les en tant que cartes JSON dans ces variables d'environnement. La clé de carte correspond au nom de la source (`label/envvar`), tandis que sa valeur correspond au nom du tag Datadog.

## Traces

Si vous envoyez une seule trace, taguez ses spans afin d'ignorer les tags de configuration de l'Agent et/ou la valeur des tags du host (le cas échéant) pour ces traces :

Les exemples suivants utilisent le tag primaire par défaut `env:<ENVIRONNEMENT>`. Cependant, vous pouvez également le remplacer par un tag `<KEY>:<VALUE>`.

{{< tabs >}}
{{% tab "Go" %}}

```go
tracer.SetTag("env", "<ENVIRONNEMENT>")
```

Pour OpenTracing, utilisez l'option de démarrage `tracer.WithGlobalTag` pour définir de façon globale l'environnement.

{{% /tab %}}
{{% tab "Java" %}}
Avec sysprop :

```
-Ddd.trace.span.tags=env:<ENVIRONNEMENT>
```

Avec des variables d'environnement :

```
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
using Datadog.Tracing;
Tracer.Instance.ActiveScope.Span.SetTag("env", "<ENVIRONNEMENT>");
```

{{% /tab %}}
{{< /tabs >}}

**Remarque** : les métadonnées span doivent respecter une arborescence. Chaque nœud de l'arborescence est séparé par le caractère `.` et ne peut posséder qu'un seul type. Ainsi, un nœud ne peut pas être un objet (avec des nœuds inférieurs) ET une chaîne de caractères.

Cet exemple de métadonnées span n'est donc pas valide :

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

## IU

{{< tabs >}}
{{% tab "Hostmap" %}}

Vous pouvez assigner des tags de host dans l'IU depuis la page relative à la [Hostmap][1]. Cliquez sur l'hexagone (host) de votre choix pour superposer le host en bas de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. Remarque : l'application des modifications de tags de métrique effectuées via l'IU peut prendre jusqu'à 30 minutes.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Tags hostmap" responsive="true" style="width:80%;">}}


[1]: /fr/graphing/infrastructure/hostmap
{{% /tab %}}
{{% tab "Liste d'infrastructures" %}}

Vous pouvez assigner des tags de host dans l'IU depuis la page relative à la [liste d'infrastructures][1]. Cliquez sur un host pour le superposer sur la droite de la page. Depuis la section *User*, cliquez ensuite sur le bouton **Edit Tags**. Saisissez les tags sous forme de liste de valeurs séparées par des virgules, puis cliquez sur **Save Tags**. Remarque : l'application des modifications de tags de métrique effectuées via l'IU peut prendre jusqu'à 30 minutes.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Tags liste d'infrastructures" responsive="true" style="width:80%;">}}


[1]: /fr/graphing/infrastructure
{{% /tab %}}
{{% tab "Monitors" %}}

Depuis la page de [gestion des monitors][1], cochez la case en regard de chaque monitor pour ajouter des tags (sélectionnez un ou plusieurs monitors). Cliquez sur le bouton **Edit Tags**. Saisissez un tag ou sélectionnez un tag précédemment utilisé. Cliquez ensuite sur **Add Tag `nom:tag`** ou **Apply Changes**. Si vous aviez déjà ajouté des tags, vous pouvez assigner plusieurs tags à la fois en cochant leurs cases.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Tags gestion de monitors" responsive="true" style="width:80%;">}}

Lorsque vous créez un monitor, assignez des tags de monitor durant l'étape 4 *Say what's happening* :

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Tags création de monitor" responsive="true" style="width:80%;">}}


[1]: /fr/monitors/manage_monitor
{{% /tab %}}
{{% tab "Métriques de distribution" %}}

Vous pouvez assigner des clés de tag au sein des [métriques de distribution][1] (version bêta) pour créer des séries temporelles agrégées. Pour ce faire, appliquez un ensemble de tags à une métrique afin de créer une série temporelle pour chaque combinaison de valeurs de tag de l'ensemble.

**Les ensembles ne peuvent pas comprendre plus de quatre tags** :

{{< img src="tagging/assigning_tags/distributionmetricstags.png" alt="Tags métriques de distribution" responsive="true" style="width:80%;">}}


[1]: /fr/graphing/metrics/distributions
{{% /tab %}}
{{% tab "Intégrations" %}}

Le carré d'intégration [AWS][1] vous permet d'assigner des tags supplémentaires à l'ensemble des métriques au niveau des comptes. Utilisez une liste de tags au format `<KEY>:<VALUE>` séparés par des virgules.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Tags AWS" responsive="true" style="width:80%;">}}


[1]: /fr/integrations/amazon_web_services
{{% /tab %}}
{{< /tabs >}}

## API

{{< tabs >}}
{{% tab "Assignation" %}}

Les tags peuvent être assignés de diverses façons avec l'[API Datadog][1]. Cliquez sur les liens ci-dessous pour accéder aux rubriques indiquées :

- [Envoyer le résultat d'un check][2]
- [Envoyer un événement][3]
- [Intégration AWS][4]
- [Envoyer des points de séries temporelles][5]
- [Créer][6] ou [modifier][7] un monitor
- [Ajouter][8] ou [mettre à jour][9] les tags d'un host
- [Envoyer des traces][10]


[1]: /fr/api
[2]: /fr/api/?lang=python#post-a-check-run
[3]: /fr/api/?lang=python#post-an-event
[4]: /fr/api/?lang=python#aws
[5]: /fr/api/?lang=python#post-timeseries-points
[6]: /fr/api/?lang=python#create-a-monitor
[7]: /fr/api/?lang=python#edit-a-monitor
[8]: /fr/api/?lang=python#add-tags-to-a-host
[9]: /fr/api/?lang=python#update-host-tags
[10]: /fr/api/?lang=python#send-traces
{{% /tab %}}
{{% tab "Exemple" %}}

Les tags de Datadog vous permettent de recueillir facilement vos métriques. Pour mieux comprendre, imaginons que vous cherchez à obtenir un total pour l'ensemble de métriques suivant fourni par votre site Web (example.com) :

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Nous vous recommandons d'ajouter le tag `domain:example.com` et de ne pas toucher au hostname (l'API Datadog déterminera automatiquement le hostname) :

```
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Grâce au tag `domain:example.com`, vous pouvez calculer le total des vues de pages pour l'ensemble des hosts : 

```
sum:page.views{domain:example.com}
```

Pour obtenir des données détaillées pour chaque host, utilisez l'expression suivante :

```
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

Veuillez noter que l'ajout de tags dans StatsD requiert une [extension Datadog][12].

Des précautions particulières doivent être prises pour l'assignation du tag `host` aux métriques DogStatsD. Pour en savoir plus sur la clé de tag host, consultez la [rubrique DogStatsD][13].

## Héritage des intégrations

Pour assigner facilement des tags, il est conseillé d'utiliser les intégrations. Les tags assignés à vos instances Amazon Web Services, recipes Chef et autres éléments sont automatiquement assignés aux hosts et métriques transmis à Datadog. **Remarque** : les tags `CamelCase` sont convertis par Datadog en ajoutant des underscores. Par exemple, `TestTag` --> `test_tag`.

Les sources d'[intégration][5] suivantes créent automatiquement des tags dans Datadog :

| Intégration                             | Source                                                                                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Amazon CloudFront][14]                  | Distribution                                                                                                                                                                                                                                                                                                                                  |
| [Amazon EC2][15]                         | AMI, Customer Gateway, DHCP Option, EBS Volume, Instance, Internet Gateway, Network ACL, Network Interface, Reserved Instance, Reserved Instance Listing, Route Table, Security Group - EC2 Classic, Security Group - VPC, Snapshot, Spot Batch, Spot Instance Request, Spot Instances, Subnet, Virtual Private Gateway, VPC, VPN Connection |
| [Amazon Elastic File System][16]         | Filesystem                                                                                                                                                                                                                                                                                                                                    |
| [Amazon Kinesis][17]                     | Stream State                                                                                                                                                                                                                                                                                                                                  |
| [Amazon Machine Learning][18]            | BatchPrediction, DataSource, Evaluation, MLModel                                                                                                                                                                                                                                                                                              |
| [Amazon Route 53][19]                    | Domains, Healthchecks, HostedZone                                                                                                                                                                                                                                                                                                             |
| [Amazon WorkSpaces][20]                  | WorkSpaces                                                                                                                                                                                                                                                                                                                                    |
| [AWS CloudTrail][21]                     | CloudTrail                                                                                                                                                                                                                                                                                                                                    |
| [AWS Elastic Load Balancing][22]        | Loadbalancer, TargetGroups                                                                                                                                                                                                                                                                                                                    |
| [AWS Identity et Access Management][20] | Profile Name                                                                                                                                                                                                                                                                                                                                  |
| [AWS SQS][23]                           | Queue Name                                                                                                                                                                                                                                                                                                                                    |
| [Apache][24]                            | Apache Host, Apache Port                                                                                                                                                                                                                                                                                                                          |
| [Azure][25]                             | Tenant Name, Status, Tags, Subscription ID, Subscription Name, Availability Zone en commun avec un tag AWS sur demande auprès de l'assistance Datadog                                                                                                                                                                                                                |
| [BTRFS][26]                             | Usage and Replication Type                                                                                                                                                                                                                                                                                                                    |
| [Chef][27]                              | Chef Roles                                                                                                                                                                                                                                                                                                                                    |
| [Consul][28]                            | Previous Consul Leaders, Previous Consul Followers, Current Consul Leaders, Current Consul Followers, Consul Datacenter, Service  Name, Service ID                                                                                                                                                                                                                                               |
| [CouchDB][29]                           | Database Name, Instance Name                                                                                                                                                                                                                                                                                                                 |
| [CouchBase][30]                         | CouchBase Tags, Instance Name                                                                                                                                                                                                                                                                                                                |
| [Docker][31]                            | Pour [Docker][32], [Kubernetes][33], [ECS][34], [Swarm, Mesos, Nomad et Rancher][32], recueillez plus de tags grâce aux [options de collecte de tags de l'Agent Docker][35]                                                                                                                                                                                        |
| [Dyn][36]                               | Zone, Record Type                                                                                                                                                                                                                                                                                                                             |
| [Elasticsearch][37]                     | Cluster Name, Host Name, Port Number                                                                                                                                                                                                                                                                                                          |
| [Etcd][38]                              | State Leader, State Follower                                                                                                                                                                                                                                                                                                                      |
| [Fluentd][39]                           | Host Name, Port Number                                                                                                                                                                                                                                                                                                                        |
| [Google App Engine][40]                 | Project Name, Version ID, Task Queue                                                                                                                                                                                                                                                                                                          |
| [Google Cloud Platform][41]             | Zone, Instance Type et Instance ID, Automatic Restart, Project Name et Project ID, Name, Availability Zone en commun avec un tag AWS sur demande auprès de l'assistance Datadog                                                                                                                                                                                           |
| [Go Expvar][42]                         | Expvar Path                                                                                                                                                                                                                                                                                                                                   |
| [Gunicorn][43]                          | State Idle, State Working, App Name                                                                                                                                                                                                                                                                                                               |
| [HAProxy][44]                           | Service Name, Availability, Backend Host, Status, Type                                                                                                                                                                                                                                                                                        |
| [Check HTTP][45]                        | URL, Instance                                                                                                                                                                                                                                                                                                                                 |
| [IIS][46]                               | Site                                                                                                                                                                                                                                                                                                                                          |
| [Jenkins][47]                           | Job Name, Build Number, Branch, Results                                                                                                                                                                                                                                                                                                   |
| [JMX][48]                               | Tags JMX                                                                                                                                                                                                                                                                                                                                      |
| [Kafka][49]                             | Topic                                                                                                                                                                                                                                                                                                                                         |
| [Kubernetes][50]                        | Minion Name, Namespace, Replication Controller, Labels, Container Alias                                                                                                                                                                                                                                                                       |
| [Marathon][51]                          | URL                                                                                                                                                                                                                                                                                                                                           |
| [Memcached][52]                         | Host, Port, Request, Cache Hit, Cache Miss                                                                                                                                                                                                                                                                                                        |
| [Mesos][53]                             | Role, URL, PID, Slave Role, Master Role, Node, Cluster,                                                                                                                                                                                                                                                                                          |
| [Mongo][54]                             | Server Name                                                                                                                                                                                                                                                                                                                                   |
| [OpenStack][55]                         | Network ID, Network Name, Hypervisor Name, Hypervisor ID et Hypervisor Type, Tenant ID, Availability Zone                                                                                                                                                                                                                                                         |
| [PHP FPM][56]                           | Pool Name                                                                                                                                                                                                                                                                                                                                     |
| [Pivotal][57]                           | Current State, Owner, Labels, Requester, Story Type                                                                                                                                                                                                                                                                                           |
| [Postfix][58]                          | Queue, Instance                                                                                                                                                                                                                                                                                                                               |
| [Puppet][59]                            | Puppet Tags                                                                                                                                                                                                                                                                                                                                   |
| [RabbitMQ][60]                          | Node, Queue Name, Vhost, Policy, Host                                                                                                                                                                                                                                                                                                         |
| [Redis][61]                             | Host, Port, Slave, Master                                                                                                                                                                                                                                                                                                                   |
| [RiakCS][62]                            | Aggregation Key                                                                                                                                                                                                                                                                                                                               |
| [SNMP][63]                              | Device IP Address                                                                                                                                                                                                                                                                                                                             |
| [Supervisord][64]                       | Server Name, Process Name                                                                                                                                                                                                                                                                                                                     |
| [TeamCity][65]                          | Tags, Code Deployments, Build Number                                                                                                                                                                                                                                                                                                          |
| [TokuMX][66]                            | Role Primary, Role Secondary, Replset, Replstate, Db, Coll, Shard                                                                                                                                                                                                                                                                                |
| [Varnish][67]                           | Name, Backend                                                                                                                                                                                                                                                                                                                                 |
| [VSphere][68]                           | Host, Datacenter, Server, Instance                                                                                                                                                                                                                                                                                                            |
| [Événements WIn32][69]                      | Event ID                                                                                                                                                                                                                                                                                                                                      |
| [Windows Services][70]                  | Service Name                                                                                                                                                                                                                                                                                                                                  |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tagging/#defining-tags
[2]: /fr/agent/docker/#environment-variables
[3]: /fr/api
[4]: /fr/developers/dogstatsd
[5]: /fr/integrations
[6]: /fr/agent/faq/how-datadog-agent-determines-the-hostname
[7]: /fr/graphing/#arithmetic-between-two-metrics
[8]: /fr/agent/faq/agent-configuration-files
[9]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[10]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[11]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[12]: /fr/libraries
[13]: /fr/developers/dogstatsd/data_types/#host-tag-key
[14]: /fr/integrations/amazon_cloudfront
[15]: /fr/integrations/amazon_ec2
[16]: /fr/integrations/amazon_efs
[17]: /fr/integrations/amazon_kinesis
[18]: /fr/integrations/amazon_machine_learning
[19]: /fr/integrations/amazon_route53
[20]: /fr/integrations/amazon_workspaces
[21]: /fr/integrations/amazon_cloudtrail
[22]: /fr/integrations/amazon_elb
[23]: /fr/integrations/amazon_sqs
[24]: /fr/integrations/apache
[25]: /fr/integrations/azure
[26]: /fr/integrations/btrfs
[27]: /fr/integrations/chef
[28]: /fr/integrations/consul
[29]: /fr/integrations/couchdb
[30]: /fr/integrations/couchbase
[31]: /fr/integrations/docker
[32]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/docker_extract.go
[33]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/kubelet_extract.go
[34]: https://github.com/DataDog/datadog-agent/blob/master/pkg/tagger/collectors/ecs_extract.go
[35]: /fr/agent/docker/#tagging
[36]: /fr/integrations/dyn
[37]: /fr/integrations/elastic
[38]: /fr/integrations/etcd
[39]: /fr/integrations/fluentd
[40]: /fr/integrations/google_app_engine
[41]: /fr/integrations/google_cloud_platform
[42]: /fr/integrations/goexpvar
[43]: /fr/integrations/gunicorn
[44]: /fr/integrations/haproxy
[45]: /fr/integrations/httpcheck
[46]: /fr/integrations/iis
[47]: /fr/integrations/jenkins
[48]: /fr/integrations/java
[49]: /fr/integrations/kafka
[50]: /fr/integrations/kubernetes
[51]: /fr/integrations/marathon
[52]: /fr/integrations/memcached
[53]: /fr/integrations/mesos
[54]: /fr/integrations/mongodb
[55]: /fr/integrations/openstack
[56]: /fr/integrations/php_fpm
[57]: /fr/integrations/pivotal
[58]: /fr/integrations/postfix
[59]: /fr/integrations/puppet
[60]: /fr/integrations/rabbitmq
[61]: /fr/integrations/redisdb
[62]: /fr/integrations/riakcs
[63]: /fr/integrations/snmp
[64]: /fr/integrations/supervisor
[65]: /fr/integrations/teamcity
[66]: /fr/integrations/tokumx
[67]: /fr/integrations/varnish
[68]: /fr/integrations/vmware
[69]: /fr/integrations/wmi
[70]: /fr/integrations/winservices