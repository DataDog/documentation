---
description: En savoir plus sur la solution Database Monitoring et se lancer
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Surveillez et visualisez les performances de vos bases de données
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Données collectées
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
title: Architectures pour la configuration de Database Monitoring
---


## Présentation

La procédure à suivre pour configurer Database Monitoring dans Datadog varie selon le type de base de données utilisé (Postgres, MySQL, SQL Server) et le fournisseur d'hébergement (auto-hébergement, AWS, Google Cloud SQL ou Azure). Dans tous les cas, pour pouvoir utiliser la solution Database Monitoring avec vos bases de données, vous avez besoin de ce qui suit :

* [Un Agent Datadog][1]
* Un host pour votre Agent Datadog
* Un accès en lecture seule à vos bases de données

## Agent

L'Agent Datadog est un logiciel léger qui surveille des métriques système concernant le processeur, la mémoire ou encore l'activité réseau. Il se connecte également aux bases de données en tant qu'utilisateur SQL, dans le but de recueillir des données à propos des performances des bases de données.

Pour les bases de données auto-hébergées, installez directement l'Agent sur le host qui héberge vos bases de données. Pour les bases de données gérées dans le cloud, comme AWS RDS et Azure SQL, configurez l'Agent de façon à ce qu'il se connecte à vos bases de données à distance.


### Bases de données auto-hébergées

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="La configuration auto-hébergée passe par le processus de base de données sur le host dédié, qui héberge également l'Agent, puis, une fois une connexion Internet établie, est transmise au backend Datadog.">}}

Pour les bases de données auto-hébergées, l'Agent Datadog recueille des métriques système à partir du host du système d'exploitation, des métriques de base de données directement à partir de la base de données, ainsi que des événements de log à partir des logs des bases de données.

* [Métriques système recueillies sur Postgres][2]
* [Métriques système recueillies sur MySQL][3]
* [Métriques système recueillies sur SQL Server][15]


Pour une base de données auto-hébergée, installez l'Agent directement sur le host de la base de données, afin de bénéficier d'une visibilité complète sur l'intégrité de votre système exécutant le processus de base de données.

Accordez à l'Agent un accès en lecture seule à votre base de données, puis configurez l'intégration. L'Agent doit se connecter en tant qu'utilisateur afin de pouvoir exécuter des requêtes en lecture seule sur votre base de données.

Consultez les ressources suivantes pour configurer la solution Database Monitoring avec un fournisseur auto-hébergé :

* [Postgres][4]
* [MySQL][5]
* [SQL Server][14]


### Bases de données gérées dans le cloud

Si vous utilisez une base de données gérée dans le cloud (fournie par [AWS RDS][6], AWS Aurora, Google Cloud SQL ou Azure), installez l'Agent sur un host distinct et configurez ce dernier de façon à ce qu'il se connecte à chaque instance gérée.

La solution Database Monitoring recueille des métriques système concernant le processeur, la mémoire, l'utilisation du disque, les logs et d'autres données de télémétrie directement à partir du fournisseur cloud. Cette collecte repose sur l'intégration de Datadog avec le fournisseur en question.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="L'instance de la base de données n'est pas intégrée au host de l'Agent, qui est lui-même séparé du backend Datadog. L'API cloud se connecte à l'intégration Datadog/AWS via Internet.">}}

Vous pouvez installer l'Agent sur n'importe quelle VM cloud (par exemple, EC2), tant qu'il parvient à se connecter à vos instances de base de données.

Si vous n'exécutez pas votre propre cluster Kubernetes, Datadog vous conseille de tirer profit des outils d'orchestration de votre fournisseur cloud. Par exemple, vous pouvez utiliser [AWS ECS][7] pour héberger l'Agent Datadog, puisque [l'Agent existe déjà sous la forme d'un conteneur Docker][8].

### Kubernetes

Si vous exécutez vos apps sur [Kubernetes][9], utilisez l'[Agent de cluster Datadog avec la solution Datadog Monitoring][10] afin de pouvoir exécuter des [checks de cluster][11] sur l'ensemble de vos pods.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="Les instances de base de données d'un fournisseur cloud se connectent aux nœuds d'un cluster Kubernetes, puis au backend Datadog via Internet. L'API cloud se connecte directement à l'intégration Datadog/AWS.">}}

L'[Agent de cluster][12] distribue automatiquement les instances de base de données à un pool d'Agents. Ainsi, au lieu d'exécuter chaque check sur chaque pod d'Agent basé sur des nœuds, une seule instance de chaque check est exécutée. L'Agent de cluster stocke les configurations et les distribue de façon dynamique aux Agents basés sur des nœuds. Les Agents sur chaque nœud se connectent tous les 10 secondes à l'Agent de cluster et récupèrent les configurations à exécuter.

Si un Agent ne transmet plus de données, l'Agent de cluster le retire du pool actif et distribue les configurations aux autres Agents. De cette façon, une seule instance est toujours exécutée, même lorsque des nœuds sont ajoutés ou supprimés du cluster. Cette approche s'avère particulièrement importante lorsque vous utilisez un grand nombre d'instances de base de données. L'Agent de cluster répartit ainsi les checks de cluster sur l'ensemble des nœuds.



#### Aurora

Si vous utilisez [Aurora][13], l'Agent doit être connecté à l'instance Aurora (et non au endpoint du cluster), car il doit se connecter directement au host surveillé.

Pour la surveillance des bases de données Aurora, l'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge, un outil de regroupement de connexions comme `pgbouncer` ou l'endpoint du cluster Aurora. Chaque Agent Datadog doit connaître le hostname sous-jacent et doit être exécuté sur un seul host durant toute sa durée de vie, même en cas de failover, sans quoi la valeur des métriques est incorrecte.



## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage/
[2]: /fr/integrations/postgres/?tab=host#data-collected
[3]: /fr/integrations/mysql/?tab=host#data-collected
[4]: /fr/database_monitoring/setup_postgres/selfhosted/
[5]: /fr/database_monitoring/setup_mysql/selfhosted/
[6]: /fr/integrations/amazon_rds/
[7]: /fr/agent/amazon_ecs/
[8]: /fr/agent/docker/
[9]: /fr/agent/kubernetes/integrations/
[10]: /fr/database_monitoring/setup_postgres/rds/?tab=kubernetes
[11]: /fr/agent/cluster_agent/clusterchecks/
[12]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[13]: /fr/database_monitoring/setup_postgres/aurora/
[14]: /fr/database_monitoring/setup_sql_server/selfhosted/
[15]: /fr/integrations/sqlserver/?tabs=host#data-collected