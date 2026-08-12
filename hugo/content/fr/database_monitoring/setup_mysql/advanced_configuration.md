---
description: Configuration avancée de Database Monitoring pour MySQL
title: Configuration avancée de Database Monitoring pour MySQL
---

## Tronquer `events_statements_summary_by_digest`

Certaines charges de travail nécessitent une maintenance des tables dans `performance_schema`. Les statistiques de requête sont agrégées dans la table `performance_schema.events_statements_summary_by_digest`, dont le nombre de lignes est limité. Cette limite est spécifiée via la [variable système `performance_schema_digests_size`][1]. Si la table est pleine, les nouvelles synthèses de requêtes sont recueillies dans une ligne générique avec un schéma de valeur null et une synthèse de requête de valeur null, ce qui empêche l'Agent de faire la distinction entre les différentes requêtes au sein de la ligne.

Pour éviter que les métriques ne puissent plus être surveillées pour chaque requête spécifique, nous vous recommandons d'ajouter une étape de maintenance qui consiste à tronquer régulièrement la table afin que toutes les nouvelles requêtes puissent être recueillies :

```sql
TRUNCATE performance_schema.events_statements_summary_by_digest;
```

Pour déterminer la fréquence à laquelle la table doit être tronquée, exécutez la requête ci-dessous afin de déterminer le nombre d'instructions envoyées par seconde à cette ligne générique. Une valeur supérieure à zéro signifie que la table est pleine et doit être tronquée.

```sql
SHOW STATUS LIKE 'Performance_schema_digest_lost';
```

## Gérer de nombreuses tables identiques

Si vous partitionnez vos bases de données sur plusieurs tables différentes et que les définitions des tables sont identiques (à l'exception de leurs noms), vous risquez de vous retrouver avec un grand nombre de requêtes normalisées :

```sql
SELECT * FROM daily_aggregates_001
SELECT * FROM daily_aggregates_002
SELECT * FROM daily_aggregates_003
```

Dans ce cas, utilisez l'option `replace_digits` pour surveiller ces requêtes sous la forme d'une seule requête normalisée. Toutes les métriques associées à ces requêtes seront alors regroupées dans une seule requête :

```sql
SELECT * FROM daily_aggregates_?
```

Ajoutez l'option `replace_digits` à la configuration de l'instance de votre base de données dans l'Agent Datadog :

```yaml
init_config:

instances:
  - dbm: true
    ...
    replace_digits: true
```

## Augmenter le taux d'échantillonnage

Si certaines requêtes sont relativement peu fréquentes ou s'exécutent rapidement, augmentez le taux d'échantillonnage en réduisant la valeur `collection_interval` afin de recueillir des échantillons plus fréquemment.

Définissez le paramètre `collection_interval` dans la configuration de l'instance de votre base de données dans l'Agent Datadog. Ce paramètre est défini sur 1 par défaut. Réduisez cette valeur pour obtenir un intervalle plus court :

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-system-variables.html#sysvar_performance_schema_digests_size