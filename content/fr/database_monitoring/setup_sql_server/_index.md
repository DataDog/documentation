---
description: Configuration de Database Monitoring sur une base de données SQL Server
disable_sidebar: true

title: Configuration de SQL Server
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

### Versions de SQL Server prises en charge

|                 | Auto-hébergé | Azure     | Amazon RDS | Google Cloud SQL | Remarque |
|-----------------|-------------|-----------|------------|------------------|------|
| SQL Server 2012 | {{< X >}}   |           |            |                  | SQL Server 2012 a atteint sa fin de vie le 12 juillet 2022. Database Monitoring continue de prendre en charge SQL Server 2012 avec [des limitations connues][1]. |
| SQL Server 2014 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2016 | {{< X >}}   | {{< X >}} | {{< X >}}  |                  |      |
| SQL Server 2017 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2019 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |
| SQL Server 2022 | {{< X >}}   | {{< X >}} | {{< X >}}  | {{< X >}}        |      |

Pour obtenir les instructions de configuration, sélectionnez votre type d'hébergement :

{{< partial name="dbm/dbm-setup-sql-server" >}}

<br>

### Charge système de lʼintégration de lʼAgent

Les tests de charge système de lʼintégration de lʼAgent ont été exécutés sur une instance `c5.xlarge` de machine Amazon EC2  (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance SQL Server 2019 Standard Edition exécutée sur une instance `db.m5.large` Amazon RDS (2 vCPU, 8 Go de RAM). La base de données exécutait un workload TPC-C avec 20 entrepôts.

| Paramètre                              | Intervalle de collecte |
| ------------------------------------ | ------------------- |
| Vérifier lʼintervalle de collecte minimal        | 15 s                 |
| Intervalle de collecte de métriques de requêtes    | 60 s                 |
| Intervalle de collecte de activités de requêtes | 10 s                 |
| Intervalle de collecte des paramètres         | 600 s                |

* Version de lʼAgent testé : `7.50.2`
* Processeur : ~1 % du processeur utilisé en moyenne
* Mémoire : ~300 MiB de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~40 KB/s ▼ | 30 KB/s ▲
* Charge système de la requête de lʼAgent sur la base de données : ~1 % du temps du processeur

[1]: /fr/database_monitoring/setup_sql_server/troubleshooting/#known-limitations
