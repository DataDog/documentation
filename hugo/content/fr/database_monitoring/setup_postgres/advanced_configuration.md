---
description: Configuration avancée de Database Monitoring pour Postgres
title: Configuration avancée de Database Monitoring pour Postgres
---
## Gestion d'un grand nombre de relations {#handling-many-relations}

Si votre base de données Postgres comporte un grand nombre de relations (plusieurs milliers), Datadog recommande d'ajouter `collect_database_size_metrics: false` à la configuration de votre instance pour cette base de données. Lorsque ce paramètre est désactivé, l'Agent n'exécute pas la fonction `pg_database_size()` pour collecter les statistiques de taille de la base de données, ce qui est moins performant sur les instances comportant un grand nombre de tables.

```yaml
instances:
  - dbm: true
    ...
    collect_database_size_metrics: false
```

En outre, si vous partitionnez vos données sur plusieurs tables et que les définitions des tables sont identiques (à l'exception de leur nom), vous risquez de vous retrouver avec un grand nombre de requêtes normalisées :

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

Dans ces cas, suivez ces requêtes en tant que requête normalisée unique en utilisant l'option `replace_digits`, afin que toutes les métriques de ces requêtes soient regroupées en une seule requête :

```sql
SELECT * FROM daily_aggregates_?
```

Ajoutez l'option `replace_digits` à la configuration de votre instance de base de données dans le Datadog Agent :

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

Le partitionnement affecte également la collecte de schémas. Les tables partitionnées avec le partitionnement déclaratif natif (`PARTITION BY`) comptent comme une seule table pour la limite `max_tables` de `collect_schemas`, quel que soit le nombre de partitions. Les tables partitionnées utilisant l'héritage de table (`INHERITS`), telles que les tables `daily_aggregates_*` ci-dessus, comptent chaque partition individuellement ; les bases de données utilisant ce modèle peuvent donc nécessiter une limite `max_tables` plus élevée pour une couverture complète. Consultez [Optimisation de la collecte de schémas][2] pour plus de détails.

## Augmentation du taux d'échantillonnage {#raising-the-sampling-rate}

Si vous avez des requêtes relativement peu fréquentes ou qui s'exécutent rapidement, augmentez le taux d'échantillonnage en diminuant la valeur `collection_interval` pour collecter les plans d'exécution plus fréquemment.

Définissez le `collection_interval` dans la configuration de votre instance de base de données du Datadog Agent. La valeur par défaut est de 1 seconde et peut être consultée dans le <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example" target="_blank">`postgres/conf.yaml.example`</a>.

Réduisez cette valeur pour obtenir un intervalle plus court :

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

## Configuration de la collecte des statistiques de colonnes {#configuring-column-statistics-collection}

La collecte des statistiques de colonnes lit les statistiques par colonne depuis `pg_stats` (`n_distinct`, `null_frac`, `avg_width`, `correlation`, `most_common_freqs`) selon un planning périodique. Cela nécessite que la fonction `datadog.column_statistics()` existe dans chaque base de données surveillée ; consultez [Configuration de Database Monitoring pour Self-Hosted Postgres][1] pour la définition de la fonction.

Une fois la fonction créée, activez et ajustez la collecte dans la configuration de votre instance Postgres :

```yaml
instances:
  - dbm: true
    ...
    collect_column_statistics:
      enabled: true
      collection_interval: 3600   # seconds between collection runs; default 3600 (hourly)
      max_tables: 500              # maximum tables to collect per run; default 500
```

| Option | Valeur par défaut | Quand la modifier |
| --- | --- | --- |
| `enabled` | `false` | Définissez sur `true` pour activer la collecte des statistiques de colonnes. |
| `collection_interval` | `3600` | Diminuez pour des statistiques plus réactives (au prix d'un plus grand nombre de requêtes sur `pg_stats`) ; augmentez sur des clusters très volumineux ou très sollicités pour réduire la charge de requêtes. |
| `max_tables` | `500` | Augmentez si vous surveillez une base de données avec plus de 500 tables et souhaitez une couverture complète ; diminuez pour limiter le coût de collecte. Cette limite est distincte de l'option `max_tables` sous `collect_schemas`, qui est définie par défaut sur `300`. |

Pour que les statistiques de colonne soient renseignées, les tables sous-jacentes doivent avoir fait l'objet d'une exécution de `ANALYZE` (ou autoanalyze) au moins une fois — `pg_stats` est vide pour les tables sans statistiques collectées.

[1]: /fr/database_monitoring/setup_postgres/selfhosted/#create-the-column-statistics-function
[2]: /fr/database_monitoring/schema_explorer/#tuning-schema-collection