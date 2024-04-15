---
description: Configuration de Database Monitoring sur une base de données Postgres
disable_sidebar: true

title: Configuration de Postgres
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

### Versions de Postgres prises en charge

|  | Auto-hébergé | Amazon RDS | Amazon Aurora | Google Cloud SQL | Azure |
|--|------------|---------|------------|------------------|---------|
| Postgres 9.6 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 10 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 11 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 12 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 13 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 14 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 15 | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Postgres 16 | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |

Pour obtenir les instructions de configuration, sélectionnez votre type d'hébergement :

{{< partial name="dbm/dbm-setup-postgres" >}}

<br>

### Charge système de lʼintégration de lʼAgent

Les tests de charge système de lʼintégration de lʼAgent ont été exécutés sur une instance `c5.xlarge` de machine Amazon EC2  (4 vCPU, 8 Go de RAM). La base de données utilisée pour les tests était une instance PostgreSQL 14.10 exécutée sur une instance `db.m5.large` Amazon RDS (2 vCPU, 8 Go de RAM). La base de données exécutait un workload TPC-C avec 20 entrepôts.

| Paramètre                           | Intervalle de collecte |
| --------------------------------- | ------------------- |
| Vérifier lʼintervalle de collecte minimal     | 15 s                 |
| Intervalle de collecte de métriques de requêtes | 10 s                 |
| Intervalle de collecte dʼéchantillons de requêtes | 10 s                 |
| Intervalle de collecte des paramètres      | 600 s                |
| Intervalle de collecte de schéma        | 600 s                |

* Version de lʼAgent testé : `7.50.2`
* Processeur : ~1 % du processeur utilisé en moyenne
* Mémoire : ~300 MiB de RAM utilisés (mémoire RSS)
* Bande passante réseau : ~30 KB/s ▼ | 30 KB/s ▲
* Charge système de la requête de lʼAgent sur la base de données : ~1 % du temps du processeur
