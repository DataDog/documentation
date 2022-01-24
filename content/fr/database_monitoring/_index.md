---
title: Database Monitoring
kind: documentation
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
---
{{< img src="database_monitoring/dbm-main.png" alt="Database Monitoring" style="width:100%;">}}

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La solution Database Monitoring de Datadog vous permet d'analyser en détail vos bases de données parmi l'ensemble de vos hosts. Consultez les métriques de performance de vos requêtes, les plans d'exécution et les métriques issues de vos hosts depuis une plateforme centralisée afin de mieux surveiller la santé et les performances de vos bases de données tout en traitant chaque problème dès qu'il est détecté.

## Prise en main

La solution Database Monitoring de Datadog prend en charge la surveillance des versions auto-hébergées et des versions cloud gérées de **Postgres** et **MySQL**. Pour commencer à utiliser cette fonctionnalité, configurez votre base de données et installez l'Agent Datadog. Suivez les instructions de configuration correspondant à votre type de base de données :

### Bases de données auto-hébergées

{{< partial name="dbm/dbm-getting-started" >}}
<p></p>

### Bases de données gérées

{{< partial name="dbm/dbm-getting-started-managed" >}}
<p></p>

## Explorer la solution Database Monitoring de Datadog

Accédez à la surveillance de base de données en cliquant sur **[APM > Databases][1]** depuis l'interface.

### Analysez les métriques de performance de vos requêtes

La [vue Query Metrics][2] affiche l'historique des performances de vos requêtes normalisées. Visualisez les profils de performance pour une infrastructure ou des tags personnalisés spécifiques, tels que la zone de disponibilité du centre de données, et définissez des alertes pour être informé en cas d'anomalie.

- Identifiez les requêtes lentes et celles qui prennent le plus de temps à s'exécuter.
- Visualisez les métriques de base données non capturées par l'APM, comme le nombre de lignes mises à jour/récupérées.
- Filtrez et regroupez vos requêtes en fonction de dimensions arbitraires, comme une équipe, un utilisateur, un cluster ou un host.

{{< img src="database_monitoring/dbm-query-metrics.png" alt="Database Monitoring" style="width:100%;">}}

### Explorez les exemples de requête

La [vue Query Samples][3] vous aide à identifier les requêtes qui s'exécutent à un instant donné. Comparez chaque exécution aux performances moyennes de la requête et des requêtes connexes.

- Identifiez les requêtes anormalement lentes mais peu fréquentes qui ne sont pas capturées par les métriques.
- Identifiez les anomalies dans les temps et les coûts d'exécution de vos requêtes.
- Attribuez l'exécution d'une requête à un utilisateur, une application ou un host client spécifique.

{{< img src="database_monitoring/dbm-query-sample.png" alt="Surveillance de base données" style="width:100%;">}}

### Comprenez avant d'exécuter

Les [plans d'exécution][4] vous aident à comprendre comment la base de données a l'intention d'exécuter vos requêtes.

- Visualisez en détail chaque opération pour identifier les goulots d'étranglement.
- Améliorez l'efficacité de vos requêtes et limitez les analyses séquentielles de vastes tables pour réduire vos coûts.
- Consultez l'évolution du plan d'une requête en fonction du temps.

{{< img src="database_monitoring/dbm-explain-plan.png" alt="Surveillance de base données" style="width:100%;">}}

### Visualisez toutes vos données sur des dashboards enrichis

Identifiez rapidement les problèmes en visualisant vos métriques de base de données et vos métriques système sur des dashboards d'intégration détaillés pour les instances auto-hébergées et celles gérées dans le cloud. Clonez des dashboards pour les personnaliser et les enrichir avec vos propres métriques. Cliquez sur le lien **Dashboards** en haut des pages Query Metrics et Query Samples pour accéder aux dashboards de surveillance de base de données.

{{< img src="database_monitoring/dbm-dashboard-postgres.png" alt="Database Monitoring" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/databases
[2]: /fr/database_monitoring/query_metrics/
[3]: /fr/database_monitoring/query_samples/
[4]: /fr/database_monitoring/query_metrics/#explain-plans