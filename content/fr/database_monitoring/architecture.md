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

Les étapes requises pour configurer Database Monitoring dans Datadog varient en fonction du type de base de données utilisé (Postgres, MySQL, SQL Server, Oracle) et du fournisseur d'hébergement (autohébergé, AWS, Google Cloud SQL, Azure ou Oracle). Pour utiliser Database Monitoring avec n'importe quelle base de données chez n'importe quel fournisseur d'hébergement, vous avez besoin des éléments suivants :

* [Un Agent Datadog][1]
* Un host pour votre Agent Datadog
* Un accès en lecture seule à vos bases de données

## Agent

L'Agent Datadog est un logiciel léger qui surveille des métriques système concernant le processeur, la mémoire ou encore l'activité réseau. Il se connecte également aux bases de données en tant qu'utilisateur SQL, dans le but de recueillir des données à propos des performances des bases de données.

Pour les bases de données autohébergées, installez l'Agent directement sur le Host qui héberge votre base de données. Pour les bases de données gérées dans le cloud, telles qu'Amazon RDS et Azure SQL, configurez l'Agent pour qu'il se connecte à vos bases de données à distance.


### Bases de données auto-hébergées

{{< img src="database_monitoring/dbm_architecture_self-hosted.png" alt="La configuration auto-hébergée passe par le processus de base de données sur le host dédié, qui héberge également l'Agent, puis, une fois une connexion Internet établie, est transmise au backend Datadog.">}}

Pour les bases de données auto-hébergées, l'Agent Datadog recueille des métriques système à partir du host du système d'exploitation, des métriques de base de données directement à partir de la base de données, ainsi que des événements de log à partir des logs des bases de données.

* [Métriques système recueillies sur Postgres][2]
* [Métriques système recueillies sur MySQL][3]
* [Métriques système collectées sur SQL Server][4]
* [Métriques système collectées sur Oracle][17]

Pour une base de données auto-hébergée, installez l'Agent directement sur le host de la base de données, afin de bénéficier d'une visibilité complète sur l'intégrité de votre système exécutant le processus de base de données.

Accordez à l'Agent un accès en lecture seule à votre base de données, puis configurez l'intégration. L'Agent doit se connecter en tant qu'utilisateur afin de pouvoir exécuter des requêtes en lecture seule sur votre base de données.

Consultez les ressources suivantes pour configurer la solution Database Monitoring avec un fournisseur auto-hébergé :

* [Postgres][5]
* [MySQL][6]
* [SQL Server][7]
* [Oracle][16]

### Bases de données gérées dans le cloud

Si votre configuration est gérée dans le cloud (avec des fournisseurs tels qu'[Amazon RDS][8] ou Aurora, Google Cloud SQL ou Azure), installez l'Agent sur un Host distinct et configurez-le pour qu'il se connecte à chaque instance gérée.

La solution Database Monitoring recueille des métriques système concernant le processeur, la mémoire, l'utilisation du disque, les logs et d'autres données de télémétrie directement à partir du fournisseur cloud. Cette collecte repose sur l'intégration de Datadog avec le fournisseur en question.

{{< img src="database_monitoring/dbm_architecture_cloud-hosted.png" alt="L'instance de la base de données n'est pas intégrée au host de l'Agent, qui est lui-même séparé du backend Datadog. L'API cloud se connecte à l'intégration Datadog/AWS via Internet.">}}

Installez l'Agent sur n'importe quelle VM cloud (par exemple, EC2), à condition que l'Agent puisse se connecter à vos instances de base de données.

Si vous n'exploitez pas votre propre cluster Kubernetes, Datadog recommande d'utiliser les outils d'orchestration de votre fournisseur cloud. Par exemple, utilisez [Amazon ECS][9] pour héberger l'Agent Datadog, car [l'Agent existe déjà sous forme de conteneur Docker][10].

### Kubernetes

Si vous exécutez vos applications sur [Kubernetes][11], utilisez l'[Agent de cluster de Datadog avec Database Monitoring][12], qui peut exécuter des [cluster checks][13] sur vos pods.

{{< img src="database_monitoring/dbm_architecture_clusters.png" alt="Les instances de base de données d'un fournisseur cloud se connectent aux nœuds d'un cluster Kubernetes, puis au backend Datadog via Internet. L'API cloud se connecte directement à l'intégration Datadog/AWS.">}}

L'[Agent de cluster][14] distribue automatiquement les instances de base de données sur un pool d'Agents. Cela garantit qu'une seule instance de chaque check s'exécute, contrairement à chaque pod d'Agent basé sur un nœud qui exécuterait ce check correspondant. L'Agent de cluster conserve les configurations et les envoie dynamiquement aux Agents basés sur les nœuds. Les Agents de chaque nœud se connectent à l'Agent de cluster toutes les 10 secondes et récupèrent les configurations à exécuter.

Si un Agent cesse d'envoyer des données, l'Agent de cluster le supprime du pool actif et envoie les configurations aux autres Agents. Cela garantit qu'une instance (et une seule) s'exécute en permanence, même lorsque des nœuds sont ajoutés ou supprimés du cluster. Cette fonctionnalité est importante lorsque vous disposez d'un grand nombre d'instances de base de données : l'Agent de cluster répartit les cluster checks sur les différents nœuds.

#### Aurora

Si vous utilisez [Aurora][15], l'Agent doit être connecté à l'instance Aurora individuelle (et non à l'endpoint du cluster), car l'Agent doit se connecter directement au Host surveillé.

Pour la surveillance des bases de données Aurora, l'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge, un outil de regroupement de connexions comme `pgbouncer` ou l'endpoint du cluster Aurora. Chaque Agent Datadog doit connaître le hostname sous-jacent et doit être exécuté sur un seul host durant toute sa durée de vie, même en cas de failover, sans quoi la valeur des métriques est incorrecte.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage/
[2]: /fr/integrations/postgres/?tab=host#data-collected
[3]: /fr/integrations/mysql/?tab=host#data-collected
[4]: /fr/integrations/sqlserver/?tabs=host#data-collected
[5]: /fr/database_monitoring/setup_postgres/selfhosted/
[6]: /fr/database_monitoring/setup_mysql/selfhosted/
[7]: /fr/database_monitoring/setup_sql_server/selfhosted/
[8]: /fr/integrations/amazon_rds/
[9]: /fr/agent/amazon_ecs/
[10]: /fr/agent/docker/
[11]: /fr/agent/kubernetes/integrations/
[12]: /fr/database_monitoring/setup_postgres/rds/?tab=kubernetes
[13]: /fr/agent/cluster_agent/clusterchecks/
[14]: https://www.datadoghq.com/blog/datadog-cluster-agent/
[15]: /fr/database_monitoring/setup_postgres/aurora/
[16]: /fr/database_monitoring/setup_oracle/selfhosted/
[17]: /fr/integrations/oracle/?tab=linux#data-collected