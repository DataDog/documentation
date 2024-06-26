---
description: Configuration avancée de Database Monitoring pour Postgres
kind: documentation
title: Configuration avancée de Database Monitoring pour Postgres
---

## Gérer de nombreuses relations

Si votre base de données Postgres comporte un grand nombre de relations (quelques milliers), Datadog recommande d'ajouter le paramètre `collect_database_size_metrics: false` à votre configuration d'instance pour cette base de données. Si ce paramètre est désactivé, l'Agent n'exécute pas la fonction `pg_database_size()` permettant de recueillir des statistiques sur la taille de la base de données, car celle-ci est peu performante sur les instances comportant un grand nombre de tables.

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

Dans ce cas, utilisez l'option `replace_digits` pour surveiller ces requêtes sous la forme d'une seule requête normalisée. Toutes les métriques associées à ces requêtes seront alors regroupées dans une seule requête :

```sql
SELECT * FROM daily_aggregates_?
```

Ajoutez l'option `replace_digits` à la configuration de l'instance de votre base de données dans l'Agent Datadog :

```yaml
instances:
  - dbm: true
    ...
    obfuscator_options:
      replace_digits: true
```

## Augmenter le taux d'échantillonnage

Si certaines requêtes sont relativement peu fréquentes ou s'exécutent rapidement, augmentez le taux d'échantillonnage en réduisant la valeur `collection_interval` afin de recueillir des échantillons plus fréquemment.

Définissez le paramètre `collection_interval` dans la configuration de l'instance de votre base de données dans l'Agent Datadog. Ce paramètre est défini sur 1 seconde par défaut. Un exemple est disponible dans le fichier <a href="https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L332C9-L336" target="_blank">`postgres/conf.yaml.example`</a>.

Réduisez cette valeur pour obtenir un intervalle plus court :

```yaml
instances:
  - dbm: true
    ...
    query_samples:
        collection_interval: 0.1
```