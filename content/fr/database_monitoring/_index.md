---
algolia:
  tags:
  - database monitoring
  - dbm
cascade:
  algolia:
    rank: 70
description: En savoir plus sur la solution Database Monitoring et se lancer
further_reading:
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Surveiller et visualiser les performances de vos bases de données
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: Blog
  text: Surveiller des bases de données gérées par SQL Server et Azure avec Database Monitoring
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Données collectées
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Prenez part à une session interactive pour améliorer la solution Database
    Monitoring
kind: documentation
title: Database Monitoring
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

{{< img src="database_monitoring/dbm-overview.png" alt="Database Monitoring" style="width:100%;">}}

La solution Database Monitoring de Datadog vous permet d'analyser en détail vos bases de données parmi l'ensemble de vos hosts. Consultez les métriques de performance de vos requêtes, les plans d'exécution et les métriques issues de vos hosts depuis une plateforme centralisée afin de mieux surveiller la santé et les performances de vos bases de données tout en traitant chaque problème dès qu'il est détecté.

## Prise en main

La solution Database Monitoring Datadog prend en charge la surveillance des versions cloud gérées et auto-hébergées de **Postgres**, **MySQL**, **Oracle** et **SQL Server**. Pour commencer à utiliser cette fonctionnalité, configurez votre base de données et installez l'Agent Datadog. Suivez les instructions de configuration correspondant à votre type de base de données :

### Postgres

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

## Explorer la solution Database Monitoring Datadog

Accédez à Database Monitoring en cliquant sur **[APM > Databases][1]** depuis l'interface.

### Analyser en détail les métriques de performance de vos requêtes

La [vue Query Metrics][2] affiche l'historique des performances de vos requêtes normalisées. Visualisez les tendances de performance en fonction d'une infrastructure ou de tags personnalisés spécifiques, tels que la zone de disponibilité du centre de données, et définissez des alertes pour être informé en cas d'anomalie.

- Identifiez les requêtes lentes et celles qui sollicitent le plus longtemps votre base de données.
- Visualisez les métriques de base de données non capturées par APM, comme le nombre de lignes mises à jour et renvoyées.
- Filtrez et regroupez vos requêtes en fonction de dimensions arbitraires, comme une équipe, un utilisateur, un cluster ou un host.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### Explorer des exemples de requête

La [vue Query Samples][3] vous aide à identifier les requêtes qui s'exécutent à un instant donné. Comparez chaque exécution aux performances moyennes de la requête et de requêtes connexes.

- Identifiez les requêtes anormalement lentes mais peu fréquentes qui ne sont pas capturées par les métriques.
- Identifiez les anomalies dans les temps et les coûts d'exécution de vos requêtes.
- Attribuez l'exécution d'une requête spécifique à un utilisateur, une application ou un host client.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### Consulter chaque opération d'une requête avant son exécution

Les [plans d'exécution][4] vous aident à comprendre comment la base de données compte exécuter vos requêtes.

- Visualisez en détail chaque opération pour identifier les goulots d'étranglement.
- Améliorez l'efficacité de vos requêtes et limitez les analyses séquentielles de vastes tables pour réduire vos coûts.
- Consultez l'évolution du plan d'une requête.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### Visualiser toutes vos données dans des dashboards enrichis

Identifiez rapidement vos problèmes en visualisant vos métriques de base de données et vos métriques système au sein de dashboards d'intégration détaillés pour les instances auto-hébergées et celles gérées dans le cloud. Dupliquez des dashboards pour les personnaliser et les enrichir avec vos propres métriques. Cliquez sur le lien **Dashboards** en haut des pages Query Metrics et Query Samples pour accéder aux dashboards Database Monitoring.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimiser les performances et la santé des hosts

Depuis la [page Databases][1], vous pouvez évaluer la santé et l'activité des hosts de vos bases de données. Triez et filtrez la liste pour mettre en avant les hosts pour lesquels des alertes ont été déclenchées, ceux avec un important volume de requête, etc. Cliquez sur un host spécifique pour afficher ses détails, notamment sa configuration, ses principales requêtes bloquées et les services appelés. Consultez la section [Explorer les hosts de base de données][5] pour en savoir plus.

{{< img src="database_monitoring/databases-list.png" alt="La page Databases dans Datadog" style="width:90%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/query_metrics/
[3]: /fr/database_monitoring/query_samples/
[4]: /fr/database_monitoring/query_metrics/#explain-plans
[5]: /fr/database_monitoring/database_hosts/