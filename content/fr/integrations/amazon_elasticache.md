---
aliases:
- /fr/integrations/awselasticache/
- /fr/integrations/elasticache/
categories:
- cloud
- caching
- aws
- log collection
ddtype: crawler
dependencies: []
description: Surveillez des métriques clés d'Amazon ElastiCache.
doc_link: https://docs.datadoghq.com/integrations/amazon_elasticache/
draft: false
git_integration_title: amazon_elasticache
has_logo: true
integration_id: amazon-elasticache
integration_title: Amazon ElastiCache
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_elasticache
public_title: Intégration Datadog/Amazon ElastiCache
short_description: Surveillez des métriques clés d'Amazon ElastiCache.
version: '1.0'
---

{{< img src="integrations/awselasticache/elasticache-memcached.png" alt="Dashboard par défaut ElastiCache Memcached" popup="true">}}

## Présentation

Consultez [Surveiller les métriques de performance ElastiCache avec Redis ou Memcached][1] pour obtenir des informations supplémentaires sur les principales métriques de performance ainsi que des conseils pour les recueillir, et découvrez comment [Coursera][2] surveille ElastiCache à l'aide de Datadog.

## Configuration

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][3].

### Installation sans l'Agent Datadog

1. Dans le [carré d'intégration AWS][4], assurez-vous que l'option `ElastiCache` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][5] afin de recueillir des métriques Amazon ElastiCache. Pour en savoir plus, consultez la section relative aux [stratégies ElastiCache][6] de la documentation AWS.

    | Autorisation AWS                      | Description                                                           |
    | ----------------------------------- | --------------------------------------------------------------------- |
    | `elasticache:DescribeCacheClusters` | Énumère et décrit les clusters Cache pour ajouter des tags et des métriques supplémentaires. |
    | `elasticache:ListTagsForResource`   | Énumère les tags personnalisés d'un cluster, pour en ajouter.                    |
    | `elasticache:DescribeEvents`        | Ajoute des événements à propos des snapshots et des entretiens.                          |

3. Installez l'[intégration Datadog/AWS ElastiCache][7].

### Installation avec l'Agent Datadog (conseillée)

#### Recueillir des métriques natives avec l'Agent

Le diagramme suivant explique comment Datadog recueille des métriques directement à partir de CloudWatch via l'intégration native ElastiCache, mais également comment notre solution peut recueillir des métriques natives directement depuis une technologie en backend : Redis ou Memcached. En les recueillant directement à partir du backend, vous pouvez accéder à un plus grand nombre de métriques importantes, avec une meilleure résolution.

{{< img src="integrations/awselasticache/elasticache1.png" alt="Intégrations ElastiCache, Redis et Memcached" >}}

#### Fonctionnement

Comme les métriques de l'Agent sont liées à l'instance EC2 où l'Agent est exécuté, et non pas à l'instance ElastiCache, vous devez utiliser le tag `cacheclusterid` pour regrouper toutes les métriques. Une fois l'Agent configuré avec les mêmes tags que l'instance ElastiCache, il vous suffit de combiner les métriques Redis/Memcached aux métriques ElastiCache.

#### Étapes détaillées

Puisque l'Agent ne s'exécute pas sur une instance ElastiCache, mais sur une machine à distance, vous devez indiquer à l'Agent où recueillir les métriques afin de configurer correctement cette intégration.

##### Rassembler les informations de connexion de votre instance ElastiCache

Accédez d'abord à la console AWS, ouvrez la section ElastiCache, puis l'onglet Cache Clusters pour trouver le cluster que vous souhaitez surveiller. Voici ce qui s'affiche :

{{< img src="integrations/awselasticache/elasticache2.png" alt="Clusters ElastiCache dans la console AWS" >}}

Cliquez ensuite sur le lien du « node » pour accéder à son URL d'endpoint :

{{< img src="integrations/awselasticache/elasticache3.png" alt="Lien node dans la console AWS" >}}

Notez l'URL de l'endpoint (par exemple, **replica-001.xxxx.use1.cache.amazonaws.com**) et le `cacheclusterid` (par exemple, **replica-001**). Ces valeurs sont requises pour configurer l'Agent et créer des graphiques et dashboards.

##### Configurer l'Agent

Les intégrations Redis/Memcached prennent en charge l'assignation de tags aux instances de cache individuelles. Prévus initialement pour permettre la surveillance de nombreuses instances sur une seule machine, ces tags peuvent être utilisés pour filtrer et regrouper les métriques. Voici un exemple de configuration pour ElastiCache avec Redis à l'aide de `redisdb.yaml`. Pour obtenir plus d'informations concernant l'emplacement de stockage de ce fichier en fonction de votre plateforme, consultez le [répertoire de configuration de l'Agent][8].

```yaml
init_config:

instances:
    # URL d'endpoint de la console AWS
    - host: replica-001.xxxx.use1.cache.amazonaws.com
      port: 6379
      # Id du cluster Cache de la console AWS
      tags:
          - cacheclusterid:replicaa-001
```

Redémarrez ensuite l'Agent : `sudo /etc/init.d/datadog-agent restart` (sous Linux).

##### Visualiser plusieurs métriques en même temps

Après quelques minutes, les métriques ElastiCache et les métriques Redis ou Memcached apparaissent dans Datadog et peuvent être utilisées pour les représentations graphiques, les processus de surveillance, etc.

Voici un exemple de configuration d'un graphique. L'objectif de celui-ci consiste à combiner les métriques d'accès au cache d'ElastiCache avec des métriques de latence natives de Redis grâce au tag `cacheclusterid` **replicaa-001**.

{{< img src="integrations/awselasticache/elasticache4.png" alt="Métriques Cache et ElastiCache" >}}

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_elasticache" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS ElastiCache comprend des événements pour le cluster, des groupes de sécurité de cache et des groupes de paramètres de cache. Vous trouverez ci-dessous des exemples d'événements :

{{< img src="integrations/amazon_elasticache/aws_elasticache_events.png" alt="Événements AWS Elasticache" >}}

### Checks de service

L'intégration AWS ElastiCache n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

## Pour aller plus loin

- [Surveiller les métriques de performance ElastiCache avec Redis ou Memcached][1]
- [Recueillir des métriques ElastiCache et ses métriques Redis/Memcached][11]

[1]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
[2]: https://www.coursera.org
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[5]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[6]: https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/IAM.html
[7]: https://app.datadoghq.com/account/settings#integrations/amazon_elasticache
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_elasticache/amazon_elasticache_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/
[11]: https://www.datadoghq.com/blog/collecting-elasticache-metrics-its-redis-memcached-metrics