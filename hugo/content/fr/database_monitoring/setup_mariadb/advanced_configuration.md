---
description: Configuration avancée pour MariaDB Database Monitoring
title: Configuration avancée pour MariaDB Database Monitoring
---
## Troncature de `events_statements_summary_by_digest` {#truncating-events-statements-summary-by-digest}

Certaines charges de travail nécessitent une maintenance sur les tables dans `performance_schema`. Les statistiques de requête sont agrégées dans la `performance_schema.events_statements_summary_by_digest` table, qui a une limite sur le nombre de lignes. Cette limite est spécifiée par la [`performance_schema_digests_size` variable système][1]. Si la table est pleine, les nouveaux résumés de requête sont suivis dans une ligne fourre-tout avec un schéma de valeur null et un résumé de requête de valeur null, ce qui empêche l'Agent de distinguer les requêtes formant cette ligne.

Pour éviter que les métriques ne puissent plus être surveillées pour chaque requête spécifique, nous vous recommandons d'ajouter une étape de maintenance qui consiste à tronquer régulièrement la table afin que toutes les nouvelles requêtes puissent être recueillies :

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

Pour déterminer la fréquence de troncature, exécutez la requête ci-dessous afin de déterminer le nombre d'instructions envoyées à cette ligne fourre-tout par seconde. Une valeur supérieure à zéro signifie que la table est pleine et doit être tronquée.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## Gestion de nombreuses tables identiques {#handling-many-identical-tables}

Si vous partitionnez vos bases de données sur plusieurs tables différentes et que les définitions des tables sont identiques (à l'exception de leurs noms), vous risquez de vous retrouver avec un grand nombre de requêtes normalisées :

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

Dans ces cas, suivez ces requêtes comme une seule requête normalisée en utilisant l'option `replace_digits`, afin que toutes les métriques de ces requêtes soient regroupées en une seule requête. Cela réduit le nombre de requêtes normalisées distinctes comptabilisées dans votre quota DBM et n'affecte pas les limites de résumé du côté du schéma de performance MariaDB :

```sql
SELECT * FROM daily_aggregates_?
```

Ajoutez l'option `replace_digits` sous `obfuscator_options` dans la configuration de votre instance de base de données dans le Datadog Agent :

```yaml
init_config:

instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## Augmentation du taux d'échantillonnage {#raising-the-sampling-rate}

Si vous avez des requêtes relativement peu fréquentes ou qui s'exécutent rapidement, augmentez le taux d'échantillonnage en abaissant la valeur `collection_interval` pour collecter des échantillons plus fréquemment.

Définissez le `collection_interval` dans la configuration de votre instance de base de données du Datadog Agent. La valeur par défaut est 1. Réduisez la valeur à un intervalle plus petit :

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

**Remarque** : Si vous exécutez plusieurs instances du check d'intégration MariaDB sur la même base de données, utilisez la même valeur `collection_interval` pour toutes. Des intervalles de collecte mixtes pour la même métrique peuvent entraîner des anomalies de métriques.

[1]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables#performance_schema_digests_size