---
aliases:
- /fr/database_monitoring/sql_alwayson
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: Documentation
  text: Configurer SQL Server
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage de la solution Database Monitoring
title: Explorer les groupes de disponibilité AlwaysOn de SQL Server
---

La vue AlwaysOn Clusters de Database Monitoring vous permet de détecter les problèmes de synchronisation des données, de comprendre le comportement des groupes de disponibilité et d'identifier les goulots d'étranglement dans les groupes de disponibilité SQL Server.

Pour accéder à la vue AlwaysOn Clusters, accédez à l'onglet **APM** > **Database Monitoring** > **Databases** et sélectionnez **AlwaysOn Clusters**.

## Évaluer l'état de santé de vos nœuds

Utilisez la vue AlwaysOn Clusters pour évaluer l'état de santé de vos groupes de disponibilité SQL Server. Une fois sélectionnée, la page affiche une visualisation avec code couleur basée sur l'état actuel des nœuds primaire (P) et secondaires (S) dans chaque groupe de disponibilité.

Pour identifier les groupes rencontrant des problèmes, utilisez les filtres de statut pour afficher les groupes dont les nœuds sont en état **Reverting**, **Not Synchronizing**, etc. Vous pouvez également utiliser les graphiques de séries temporelles pour repérer une activité de performance inhabituelle dans vos clusters, en vous basant sur les métriques de délai des logs, de réexécution et des secondaires.

{{< img src="database_monitoring/dbm_alwayson.png" alt="Afficher les groupes AlwaysOn SQL Server" style="width:100%;">}}

## Analyser les métriques historiques

Pour évaluer les fluctuations des états de synchronisation des nœuds au fil du temps, sélectionnez un groupe de disponibilité pour ouvrir le panneau latéral de détails. Le graphique **Historical Synchronization States** en haut du panneau affiche l'état de chaque nœud sur la période sélectionnée.

Affichez des informations supplémentaires sur tous les réplicas et leurs bases de données associées dans l'onglet **Replicas**. Utilisez également les graphiques de séries temporelles de l'onglet **Metrics** pour repérer des comportements anormaux dans des réplicas et des bases de données individuels, en vous basant sur les métriques d'envoi, de réexécution et de délai.

{{< img src="database_monitoring/dbm_alwayson_history.png" alt="Afficher les groupes AlwaysOn SQL Server" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}