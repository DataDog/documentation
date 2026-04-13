---
description: Explorer et analyser les schémas de base de données, notamment les tables,
  les colonnes et les index.
title: Explorer les schémas de base de données
---

Les schémas vous aident à surveiller les performances, l'utilisation et les modifications de vos modèles de données, ce qui permet d'identifier et de résoudre les problèmes plus rapidement.

<div class="alert alert-info">Le suivi des schémas est disponible pour PostgreSQL, SQL Server et MySQL.</div>

{{< img src="database_monitoring/dbm-schemas-page.png" alt="Page Schemas affichant les tables de base de données suivies et les métriques au niveau du schéma dans Datadog" style="width:100%;" >}}

## Configuration

Pour activer la fonctionnalité de schémas, ajoutez le paramètre `collect_schemas` à votre configuration Database Monitoring :

```yaml
init_config:
instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    collect_schemas:
      enabled: true
    ## Optional: Connect to a different database if needed for `custom_queries`
    # dbname: '<DB_NAME>'
```

## Vue d'ensemble des tables

La vue d'ensemble des tables répertorie toutes les tables suivies dans vos bases de données, regroupées par nom de table, avec les colonnes suivantes :

| Colonne         | Rôle                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \# Variantes    | Nombre de versions distinctes de la table sur tous les hosts.                                                                                                                                           |
| \# Instances   | Nombre total d'instances de la table sur tous les hosts. Par exemple, si une table possède deux variantes avec respectivement sept et huit instances, le nombre total d'instances est de 15.                         |
| \# Colonnes     | Nombre de colonnes uniques dans toutes les variantes de la table sur tous les hosts. Par exemple, si une variante possède les colonnes A, B, C et une autre les colonnes A, B, D, le nombre total de colonnes uniques est de quatre (A, B, C, D). |
| Bases de données      | Noms de toutes les bases de données contenant cette table sur tous les hosts.                                                                                                                                       |
| Schémas        | Schémas dans lesquels cette table apparaît sur tous les hosts.                                                                                                                                                |
| Hosts de base de données | Hosts sur lesquels cette table est présente.                                                                                                                                                                   |

Chaque ligne de table peut être développée pour afficher ses variantes de table et les colonnes suivantes :

| Colonne         | Rôle                                                            |
|----------------|------------------------------------------------------------------------|
| Identifiant de variante     | Identifiant unique d'une variante (version) de cette table.               |
| \# Instances   | Nombre d'instances de cette table pour cette variante.                    |
| \# Colonnes     | Nombre de colonnes uniques dans cette variante de table.                        |
| Bases de données      | Liste triée par ordre alphabétique des bases de données contenant cette variante de table. |
| Schémas        | Liste triée par ordre alphabétique des schémas contenant cette variante de table.   |
| Hosts de base de données | Liste triée par ordre alphabétique des hosts sur lesquels cette variante de table apparaît.  |

### Consulter les détails d'une variante de table

Pour afficher plus de détails sur une variante de table, cliquez sur sa ligne pour ouvrir le panneau de la variante de table.

{{< img src="database_monitoring/table-variant-panel.png" alt="Panneau de variante de table affichant les définitions de colonnes et un index pour la table d'inventaire" style="width:100%;" >}}

Ce panneau affiche des informations sur la variante (version), telles que :

- **Definition** : inclut les colonnes, les index et les clés étrangères pour cette variante de table.
- **Table Instances** : toutes les instances associées à cette variante de table.
- **Metrics** : taille de la table, analyses séquentielles et autres métriques associées (7 derniers jours par défaut).
- **Queries** : requêtes impliquant cette variante de table (7 derniers jours par défaut).
- **Changes** : modifications de schéma affectant cette variante de table (7 derniers jours par défaut).

### Consulter les détails d'une instance de table

Pour afficher les détails d'une instance de table spécifique, accédez à l'onglet **Table Instances** dans le panneau de la variante de table et cliquez sur une ligne.

{{< img src="database_monitoring/table-instance-details.png" alt="Panneau d'instance de table affichant les détails des colonnes et des index pour la table d'inventaire." style="width:100%;" >}}

Une vue similaire au panneau de la variante de table s'ouvre, affichant les informations suivantes pour l'instance de table sélectionnée :

- **Definition** : inclut les colonnes, les index et les clés étrangères pour cette instance de table.
- **Metrics** : taille de la table, analyses séquentielles et autres métriques associées (7 derniers jours par défaut).
- **Queries** : requêtes impliquant cette instance de table (7 derniers jours par défaut).
- **Changes** : modifications de schéma affectant cette instance de table (7 derniers jours par défaut).

## Recommandations

Les recommandations mettent en évidence les opportunités potentielles d'optimisation des schémas dans vos tables.

Chaque recommandation comprend :

- Un problème détecté, comme une clé primaire manquante ou un index inefficace.
- Une explication de l'importance du problème et de son impact sur les performances ou l'intégrité de la base de données.
- Un correctif suggéré, souvent une instruction SQL pouvant être exécutée sur la base de données concernée.

Les recommandations sont disponibles de manière agrégée (en haut de la page) et par table, chaque table applicable affichant ses recommandations correspondantes. Pour en savoir plus, consultez la section [Recommandations][1].

## Vue d'ensemble des métriques

La vue d'ensemble des métriques affiche des dashboards pour les métriques associées aux tables suivies dans chaque SGBD.

{{< img src="database_monitoring/metrics-overview.png" alt="Vue d'ensemble des métriques affichant le nombre total d'instances de table et les métriques d'activité clés dans les instances de base de données suivies" style="width:100%;" >}}

Chaque dashboard inclut les métriques suivantes :

- Nombre total d'instances de table
- Instances à évolution la plus rapide (%)
- Instances à évolution la plus rapide (octets)
- Instances les plus consultées
- Instances les plus volumineuses
- Instances avec le plus grand nombre de lignes actives
- Instances avec les index les plus volumineux
- Instances avec des verrous d'accès exclusifs
- Instances avec le plus grand nombre de lignes mortes
- Instances avec la durée la plus longue depuis le dernier vacuum
- Instances avec la durée la plus longue depuis le dernier vacuum

[1]: /fr/database_monitoring/recommendations
[2]: https://app.datadoghq.com/databases/list