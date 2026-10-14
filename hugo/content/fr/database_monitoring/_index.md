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
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Data Collected
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: Centre d'apprentissage
  text: Surveillance d'une base de données Postgres avec Datadog DBM
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Prenez part à une session interactive pour améliorer la solution Database
    Monitoring
- link: https://www.datadoghq.com/blog/map-postgresql-explain-plan-nodes-to-sql-with-datadog/
  tag: Blog
  text: Diagnostiquez plus rapidement les requêtes PostgreSQL lentes grâce à la corrélation
    des plans d'exécution
- link: https://www.datadoghq.com/blog/dbm-supabase/
  tag: Blog
  text: Surveillez et optimisez les performances des requêtes Supabase avec Datadog
    Database Monitoring
- link: https://www.datadoghq.com/blog/detect-inefficient-index-scans-with-dbm/
  tag: Blog
  text: 'Tous les parcours d''index ne se valent pas : comment nous avons réduit la
    latence des requêtes de plus de 99 %'
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analyse de la latence aller-retour des requêtes
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: Blog
  text: Améliorez les performances de vos hosts de base de données et de vos requêtes
    grâce aux recommandations de Database Monitoring (en anglais)
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Surveillez et visualisez les performances de vos bases de données
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: Blog
  text: Surveiller des bases de données gérées par SQL Server et Azure avec Datadog
    DBM
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: Blog
  text: Suivre et dépanner les performances de MongoDB avec Datadog Database Monitoring
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: Blog
  text: Comment les architectures de microservices ont façonné l'utilisation des technologies
    de base de données
title: Database Monitoring
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Avec Database Monitoring, apprenez à identifier rapidement les requêtes coûteuses et lentes. Approfondissez les détails d'exécution précis pour résoudre les goulots d'étranglement.
{{< /learning-center-callout >}}

Datadog Database Monitoring offre une visibilité approfondie sur les bases de données de tous vos hosts. Analysez les métriques historiques de performance des requêtes, les plans d'exécution et les métriques au niveau du host, le tout au même endroit, pour comprendre l'état de santé et les performances de vos bases de données et résoudre les problèmes dès qu'ils surviennent.

## Mise en route {#getting-started}

Datadog Database Monitoring prend en charge les versions auto-hébergées et gérées dans le cloud de **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB** et **ClickHouse**. Pour commencer avec Datadog Database Monitoring, configurez votre base de données et installez le Datadog Agent. Pour obtenir des instructions de configuration, sélectionnez votre technologie de base de données :

### Postgres {#postgres}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_postgres/selfhosted" src="integrations_logos/postgres.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_postgres/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_postgres/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_postgres/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/alloydb" src="integrations_logos/google_cloud_alloydb.png" alt="Google Cloud SQL" image_width="80">}}
  {{< image-card href="/database_monitoring/setup_postgres/azure" src="integrations_logos/azure_db_for_postgresql.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/heroku" src="integrations_logos/heroku.png" alt="PostgreSQL" >}}
  {{< image-card href="/database_monitoring/setup_postgres/supabase" src="integrations_logos/supabase.png" alt="Supabase" >}}
{{< /card-grid >}}
<p></p>

### MySQL {#mysql}

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_mysql/selfhosted" src="integrations_logos/mysql.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_mysql/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_mysql/aurora" src="integrations_logos/aurora.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_mysql/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
  {{< image-card href="/database_monitoring/setup_mysql/azure" src="integrations_logos/azure_db_for_mysql.png" alt="MySQL" >}}
{{< /card-grid >}}
<p></p>

### Oracle {#oracle}

{{< card-grid card_width="130px">}}
  {{< image-card href="/database_monitoring/setup_oracle/selfhosted" src="integrations_logos/oracle.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rds" src="integrations_logos/amazon_rds.png" alt="RDS" title="RDS" >}}
  {{< image-card href="/database_monitoring/setup_oracle/rac" src="integrations_logos/oracle.png" alt="RAC" title="RAC" >}}
  {{< image-card href="/database_monitoring/setup_oracle/exadata" src="integrations_logos/oracle.png" alt="Exadata" title="Exadata" >}}
  {{< image-card href="/database_monitoring/setup_oracle/autonomous_database" src="integrations_logos/oracle.png" alt="Auto-hébergé" title="Autonomous Database" >}}
{{< /card-grid >}}
<p></p>

### SQL Server {#sql-server}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_sql_server/selfhosted" src="integrations_logos/sqlserver.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/rds" src="integrations_logos/amazon_rds.png" alt="RDS" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/azure" src="integrations_logos/azure.png" alt="Aurora" >}}
  {{< image-card href="/database_monitoring/setup_sql_server/gcsql" src="integrations_logos/google_cloudsql.png" alt="Google Cloud SQL" >}}
{{< /card-grid >}}
<p></p>

### MongoDB {#mongodb}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_mongodb/selfhosted" src="integrations_logos/mongo.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_mongodb/mongodbatlas" src="integrations_logos/mongodb_atlas.png" alt="MongoDB Atlas" title="MongoDB Atlas" >}}
{{< /card-grid >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_documentdb/amazon_documentdb" src="integrations_logos/amazon_documentdb.png" alt="Amazon DocumentDB" title="Amazon DocumentDB" >}}
{{< /card-grid >}}
<p></p>

### ClickHouse {#clickhouse}

{{< card-grid >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="Auto-hébergé" title="Auto-hébergé" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}
<p></p>

## Explorer Datadog Database Monitoring {#explore-datadog-database-monitoring}

Accédez à [Database Monitoring][1] dans Datadog.

### Approfondissez les métriques de performance des requêtes {#dig-into-query-performance-metrics}

La [vue Métriques de requête][2] affiche les performances historiques des requêtes normalisées. Visualisez les tendances de performance par infrastructure ou par tags personnalisés tels que la zone de disponibilité du centre de données, et définissez des alertes pour les anomalies.

- Identifiez les requêtes lentes et celles qui consomment le plus de temps.
- Affichez les métriques au niveau de la base de données non capturées par APM, telles que les lignes mises à jour/renvoyées.
- Filtrez et regroupez les requêtes par dimensions arbitraires telles que l'équipe, l'utilisateur, le cluster et le host.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### Explorer les exemples de requêtes {#explore-query-samples}

La [vue Exemples de requêtes][3] vous aide à comprendre quelles requêtes sont exécutées à un moment donné. Comparez chaque exécution à la performance moyenne de la requête et des requêtes associées.

- Identifiez les requêtes inhabituellement lentes mais peu fréquentes qui ne sont pas capturées par les métriques.
- Trouvez les valeurs aberrantes dans le temps d'exécution ou le coût d'exécution d'une requête.
- Attribuez une exécution de requête spécifique à un utilisateur, une application ou un host client.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### Comprenez avant d'exécuter {#understand-before-you-run}

Les [plans d'exécution][4] vous permettent de déterminer comment une base de données va exécuter vos requêtes.

- Parcourez chaque opération pour identifier les goulots d'étranglement.
- Améliorez l'efficacité des requêtes et économisez sur les analyses séquentielles coûteuses sur les grandes tables.
- Voyez comment le plan d'une requête évolue au fil du temps.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### Collectez des métriques personnalisées {#collect-custom-metrics}

Utilisez [`custom_queries`][7] pour collecter des métriques à partir de vos propres tables de base de données — état de l'application, compteurs métier, profondeurs de file d'attente ou toute donnée que vous souhaitez corréler avec les performances des requêtes.

### Visualisez tout sur des dashboards enrichis {#visualize-everything-on-enriched-dashboards}

Identifiez rapidement les zones problématiques en visualisant les métriques de base de données et système ensemble sur des dashboards d'intégration enrichis pour les instances auto-hébergées et gérées dans le cloud. Clonez des dashboards pour les personnaliser et les améliorer avec vos propres métriques personnalisées. Cliquez sur le lien {{< ui >}}Dashboards{{< /ui >}} en haut des pages Query Metrics et Query Samples pour accéder aux dashboards Database Monitoring.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimisez la santé et les performances des hosts {#optimize-host-health-and-performance}

Sur la [page Databases][1], vous pouvez évaluer la santé et l'activité de vos hosts de base de données. Triez et filtrez la liste pour hiérarchiser les hosts avec des alertes déclenchées, un volume de requêtes élevé et d'autres critères. Cliquez sur un host individuel pour afficher des détails tels que sa configuration, les requêtes bloquantes courantes et les services appelants. Consultez [Exploring Database Hosts][5] pour plus de détails.

{{< img src="database_monitoring/databases-list.png" alt="La page Databases dans Datadog" style="width:90%;" >}}

### Affichez les recommandations d'optimisation {#view-optimization-recommendations}

La [page Recommendations][6] met en évidence les problèmes et les opportunités d'optimisation, vous aidant à gagner du temps en hiérarchisant ce qui est le plus important. Sélectionnez une recommandation pour afficher les détails, y compris un résumé du problème, ainsi que les prochaines étapes potentielles pour résoudre le problème.

{{< img src="database_monitoring/recommendations-page.png" alt="La page Recommendations dans Datadog" style="width:90%;" >}}


## Pour aller plus loin {#further-reading}

{{< learning-center-callout header="Essayez de surveiller une base de données Postgres avec Datadog DBM dans le Learning Center" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Le Datadog Learning Center regorge de cours pratiques pour vous aider à en apprendre davantage sur ce sujet. Inscrivez-vous sans frais pour identifier les inefficacités et optimiser votre base de données Postgres.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/query_metrics/
[3]: /fr/database_monitoring/query_samples/
[4]: /fr/database_monitoring/query_metrics/#explain-plans
[5]: /fr/database_monitoring/database_hosts/
[6]: /fr/database_monitoring/recommendations/
[7]: /fr/database_monitoring/custom_metrics/