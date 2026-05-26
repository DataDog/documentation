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
- link: https://www.datadoghq.com/blog/analyzing-roundtrip-query-latency
  tag: Blog
  text: Analyse de la latence des requêtes aller-retour
- link: https://www.datadoghq.com/blog/database-monitoring-recommendations/
  tag: Blog
  text: Améliorez les performances de vos hosts de base de données et de vos requêtes
    grâce aux recommandations de Database Monitoring (en anglais)
- link: https://www.datadoghq.com/blog/database-performance-monitoring-datadog
  tag: Blog
  text: Surveillez et visualisez les performances de vos bases de données
- link: https://www.datadoghq.com/blog/sql-server-and-azure-managed-services-database-monitoring/
  tag: Blog
  text: Surveiller des bases de données gérées par SQL Server et Azure avec Database Monitoring
- link: https://www.datadoghq.com/blog/mongodb-database-monitoring/
  tag: Blog
  text: Suivre et dépanner les performances de MongoDB avec Datadog Database Monitoring
- link: https://www.datadoghq.com/blog/datadog-database-research/
  tag: Blog
  text: Comment les architectures de microservices ont façonné l'utilisation des technologies
    de base de données ?
- link: /database_monitoring/data_collected/
  tag: Documentation
  text: Data Collected
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Prenez part à une session interactive pour améliorer la solution Database
    Monitoring
- link: https://learn.datadoghq.com/courses/database-monitoring
  tag: Centre d'apprentissage
  text: Surveillance d'une base de données Postgres avec Datadog DBM
title: Database Monitoring
---
{{< learning-center-callout header="Rejoindre une session de webinaire d'initiation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Database">}}
  Avec la surveillance de base de données, apprenez à identifier rapidement les requêtes coûteuses et lentes. Plongez dans les détails d'exécution précis pour résoudre les goulets d'étranglement.
{{< /learning-center-callout >}}

La surveillance de base de données Datadog offre une visibilité approfondie sur les bases de données de tous vos hôtes. Explorez les métriques de performance des requêtes historiques, les plans d'explication et les métriques au niveau de l'hôte, le tout en un seul endroit, pour comprendre la santé et la performance de vos bases de données et résoudre les problèmes au fur et à mesure qu'ils surviennent.

## Commencer {#getting-started}

La surveillance des bases de données Datadog prend en charge les versions auto-hébergées et gérées dans le cloud de **Postgres**, **MySQL**, **Oracle**, **SQL Server**, **MongoDB**, **Amazon DocumentDB** et **ClickHouse**. Pour commencer avec la surveillance de base de données Datadog, configurez votre base de données et installez l'Agent Datadog. Pour les instructions d'installation, sélectionnez votre technologie de base de données :

### Postgres {#postgres}

{{< partial name="dbm/dbm-setup-postgres" >}}
<p></p>

### MySQL {#mysql}

{{< partial name="dbm/dbm-setup-mysql" >}}
<p></p>

### Oracle {#oracle}

{{< partial name="dbm/dbm-setup-oracle" >}}
<p></p>

### SQL Server {#sql-server}

{{< partial name="dbm/dbm-setup-sql-server" >}}
<p></p>

### MongoDB {#mongodb}

{{< partial name="dbm/dbm-setup-mongodb" >}}
<p></p>

### Amazon DocumentDB {#amazon-documentdb}

{{< partial name="dbm/dbm-setup-documentdb" >}}
<p></p>

### ClickHouse {#clickhouse}

{{< partial name="dbm/dbm-setup-clickhouse" >}}
<p></p>

## Explorez la surveillance de base de données Datadog {#explore-datadog-database-monitoring}

Accédez à [Database Monitoring][1] dans Datadog.

### Plongez dans les métriques de performance des requêtes {#dig-into-query-performance-metrics}

La vue [Métriques de requêtes][2] montre la performance historique des requêtes normalisées. Visualisez les tendances de performance par infrastructure ou par balises personnalisées telles que la zone de disponibilité du centre de données, et définissez des alertes pour les anomalies.

- Identifiez les requêtes lentes et celles qui consomment le plus de temps.
- Affichez les métriques au niveau de la base de données non capturées par l'APM, telles que les lignes mises à jour/retournées.
- Filtrez et regroupez les requêtes par dimensions arbitraires telles que l'équipe, l'utilisateur, le cluster et l'hôte.

{{< img src="database_monitoring/dbm-query-metrics-2.png" alt="Database Monitoring" style="width:100%;">}}

### Explorez des échantillons de requêtes {#explore-query-samples}

La vue [Échantillons de requêtes][3] vous aide à comprendre quelles requêtes s'exécutent à un moment donné. Comparez chaque exécution à la performance moyenne de la requête et des requêtes connexes.

- Identifiez les requêtes anormalement lentes mais peu fréquentes non capturées par les métriques.
- Trouvez des valeurs aberrantes dans le temps d'exécution ou le coût d'exécution d'une requête.
- Attribuez une exécution de requête spécifique à un utilisateur, une application ou un hôte client.

{{< img src="database_monitoring/dbm-query-sample-2.png" alt="Database Monitoring" style="width:100%;">}}

### Comprenez avant d'exécuter {#understand-before-you-run}

Les [plans d'exécution][4] vous permettent de déterminer comment une base de données va exécuter vos requêtes.

- Passez en revue chaque opération pour identifier les goulets d'étranglement.
- Améliorez l'efficacité des requêtes et économisez sur les analyses séquentielles coûteuses sur de grandes tables.
- Voyez comment le plan d'une requête évolue au fil du temps.

{{< img src="database_monitoring/dbm-explain-plan-3.png" alt="Database Monitoring" style="width:100%;">}}

### Collectez des métriques personnalisées {#collect-custom-metrics}

Utilisez [`custom_queries`][7] pour collecter des métriques de vos propres tables de base de données — état de l'application, compteurs d'affaires, profondeurs de file d'attente, ou toute donnée que vous souhaitez corréler avec la performance des requêtes.

### Visualisez tout sur des tableaux de bord enrichis {#visualize-everything-on-enriched-dashboards}

Identifiez rapidement les zones problématiques en visualisant ensemble les métriques de la base de données et du système sur des tableaux de bord d'intégration enrichis pour les instances auto-hébergées et gérées dans le cloud. Clonez les tableaux de bord pour les personnaliser et les améliorer avec vos propres métriques personnalisées. Cliquez sur le lien {{< ui >}}Dashboards{{< /ui >}} en haut des pages Métriques de requête et Échantillons de requête pour accéder aux tableaux de bord de surveillance de la base de données.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

### Optimisez la santé et la performance de l'hôte {#optimize-host-health-and-performance}

Sur la [page des bases de données][1], vous pouvez évaluer la santé et l'activité de vos hôtes de base de données. Triez et filtrez la liste pour prioriser les hôtes avec des alertes déclenchées, un volume de requêtes élevé et d'autres critères. Cliquez sur un hôte individuel pour voir des détails tels que sa configuration, les requêtes de blocage courantes et les services appelants. Voir [Explorer les hôtes de base de données][5] pour plus de détails.

{{< img src="database_monitoring/databases-list.png" alt="La page des bases de données dans Datadog" style="width:90%;" >}}

### Voir les recommandations d'optimisation {#view-optimization-recommendations}

La [page des recommandations][6] met en évidence les problèmes et les opportunités d'optimisation, vous aidant à gagner du temps en priorisant ce qui est le plus important. Sélectionnez une recommandation pour voir les détails, y compris un résumé du problème, ainsi que les étapes potentielles à suivre pour résoudre le problème.

{{< img src="database_monitoring/recommendations-page.png" alt="La page des recommandations dans Datadog" style="width:90%;" >}}


## Lectures complémentaires {#further-reading}

{{< learning-center-callout header="Essayez de surveiller une base de données Postgres avec Datadog DBM dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/database-monitoring">}}
  Le Centre d'apprentissage Datadog est rempli de cours pratiques pour vous aider à en apprendre davantage sur ce sujet. Inscrivez-vous gratuitement pour identifier les inefficacités et optimiser votre base de données Postgres.
{{< /learning-center-callout >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/query_metrics/
[3]: /fr/database_monitoring/query_samples/
[4]: /fr/database_monitoring/query_metrics/#explain-plans
[5]: /fr/database_monitoring/database_hosts/
[6]: /fr/database_monitoring/recommendations/
[7]: /fr/database_monitoring/custom_metrics/