---
description: Explorez et analysez les schémas de base de données, y compris les tableaux,
  les colonnes et les index.
title: Exploration de schémas de base de données
---
Les schémas vous aident à surveiller les performances, l'utilisation et les modifications de vos modèles de données, permettant une identification et une résolution plus rapides des problèmes.

<div class="alert alert-info">Le suivi de schéma est disponible pour PostgreSQL, SQL Server et MySQL.</div>

{{< img src="database_monitoring/dbm-schemas-page.png" alt="Page des schémas affichant les tableaux de base de données suivis et les métriques au niveau du schéma dans Datadog" style="width:100%;" >}}

## Configuration {#configuration}

Pour activer la fonctionnalité de schémas, ajoutez le paramètre `collect_schemas` à votre configuration Database Monitoring :

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

### Réglage de la collecte de schémas {#tuning-schema-collection}

Les options `collect_schemas` disponibles et leurs valeurs par défaut diffèrent selon le moteur de base de données.

{{< tabs >}}
{{% tab "Postgres" %}}

| Option | Valeur par défaut | Description |
|---|---|---|
| `enabled` | `true` | Définissez sur `false` pour désactiver la collecte de schémas. Activé par défaut pour les versions 7.80.0 et ultérieures de Datadog Agent. |
| `max_tables` | `300` | Nombre maximal de tableaux que l'Agent collecte à partir de l'instance. Les tableaux dépassant cette limite ne sont pas collectés. |
| `max_columns` | `50` | Nombre maximal de colonnes que l'Agent collecte par tableau. |
| `max_query_duration` | `60` | Durée maximale, en secondes, de la requête qui collecte les informations de schéma. |
| `collection_interval` | `600` | Intervalle, en secondes, entre les exécutions de collecte de schémas. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```

<div class="alert alert-info">Si les partitions sont comptabilisées dans la limite de PostgreSQL <code>max_tables</code> dépend de la méthode de partitionnement. Le partitionnement déclaratif (<code>PARTITION BY</code>, PostgreSQL 10 et versions ultérieures) compte un tableau une seule fois, quel que soit le nombre de partitions, mais le partitionnement par héritage (<code>INHERITS</code>, la seule option sur PostgreSQL 9.6) compte le parent et chaque enfant séparément. Cela signifie que les bases de données partitionnées par héritage peuvent atteindre la limite par défaut de 300 avec beaucoup moins de tableaux logiques que prévu, évinçant ainsi d'autres tableaux. Si des tableaux sont manquants sur la page Schémas, vérifiez le partitionnement par héritage et augmentez la limite en conséquence. <code>max_tables</code> la limite en conséquence.</div>

Augmenter `max_tables` augmente le coût de chaque exécution de collecte. Sur les instances avec un grand nombre de tableaux, envisagez également d'augmenter `max_query_duration` et `collection_interval` pour réduire la charge sur la base de données.
{{% /tab %}}

{{% tab "SQL Server" %}}

| Option | Valeur par défaut | Description |
|---|---|---|
| `enabled` | `false` | Définissez sur `true` pour activer la collecte de schémas. |
| `max_tables` | `300` | Nombre maximal de tableaux que l'Agent collecte à partir de l'instance. Les tableaux dépassant cette limite ne sont pas collectés. |
| `collection_interval` | `600` | Intervalle, en secondes, entre les exécutions de collecte de schémas. |

```yaml
collect_schemas:
  enabled: true
  max_tables: 1000
```
{{% /tab %}}

{{% tab "MySQL" %}}

| Option | Valeur par défaut | Description |
|---|---|---|
| `enabled` | `false` | Définissez sur `true` pour activer la collecte de schémas. |
| `collection_interval` | `600` | Intervalle, en secondes, entre les exécutions de collecte de schémas. |
| `max_execution_time` | `60` | Durée maximale, en secondes, de la requête qui collecte les informations de schéma. |

```yaml
collect_schemas:
  enabled: true
  collection_interval: 300
```
{{% /tab %}}
{{< /tabs >}}

## Vue d'ensemble des tableaux {#tables-overview}

La vue d'ensemble des tableaux répertorie toutes les tableaux suivis dans vos bases de données, regroupés par nom de tableau, avec les colonnes suivantes :

| Colonne         | Description                                                                                                                                                                                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Nb de variantes    | Nombre de versions distinctes du tableau sur tous les hosts.                                                                                                                                           |
| Nb d'instances   | Nombre total d'instances de tableau sur tous les hosts. Par exemple, si un tableau possède deux variantes avec respectivement sept et huit instances, le nombre total d'instances est de 15.                         |
| Nb de colonnes     | Nombre de colonnes uniques parmi toutes les variantes du tableau sur tous les hosts. Par exemple, si une variante possède les colonnes A, B, C et qu'une autre possède A, B, D, le nombre total de colonnes uniques serait de quatre (A, B, C, D). |
| Bases de données      | Noms de toutes les bases de données contenant ce tableau sur tous les hosts.                                                                                                                                       |
| Schémas        | Schémas dans lesquels ce tableau apparaît sur tous les hosts.                                                                                                                                                |
| Hôtes de base de données | Hôtes sur lesquels ce tableau est présent.                                                                                                                                                                   |

Chaque ligne de tableau peut être développée pour afficher ses variantes de tableau et les colonnes suivantes :

| Colonne | Description |
|----------------|------------------------------------------------------------------------|
| ID de variante | Identifiant unique pour une variante (version) de ce tableau. |
| Nb d'instances | Nombre d'instances de ce tableau pour cette variante. |
| Nb de colonnes | Nombre de colonnes uniques dans cette variante de tableau.                        |
| Bases de données | Liste triée par ordre alphabétique des bases de données contenant cette variante de tableau. |
| Schémas | Liste triée par ordre alphabétique des schémas contenant cette variante de tableau.   |
| Hôtes de base de données | Liste triée par ordre alphabétique des hosts où cette variante de tableau apparaît.  |

### Affichage des détails de la variante de tableau {#viewing-table-variant-details}

Pour afficher plus de détails sur une variante de tableau, cliquez sur sa ligne pour ouvrir le panneau de la variante de tableau.

{{< img src="database_monitoring/table-variant-panel.png" alt="Panneau de variante de tableau affichant les définitions de colonnes et un index pour le tableau d'inventaire" style="width:100%;" >}}

Ce panneau vous montre des informations sur la variante (version), telles que :

- {{< ui >}}Definition{{< /ui >}} : Inclut les colonnes, les index et les clés étrangères pour cette variante de tableau.
- {{< ui >}}Table Instances{{< /ui >}} : Toutes les instances associées à cette variante de tableau.
- {{< ui >}}Metrics{{< /ui >}} : Taille du tableau, scans séquentiels et autres métriques associées (7 derniers jours par défaut).
- {{< ui >}}Queries{{< /ui >}} : Requêtes impliquant cette variante de tableau (7 derniers jours par défaut).
- {{< ui >}}Changes{{< /ui >}} : Modifications de schéma affectant cette variante de tableau (7 derniers jours par défaut).

### Affichage des détails de l'instance de tableau {#viewing-table-instance-details}

Pour afficher les détails d'une instance de tableau spécifique, accédez à l'onglet {{< ui >}}Table Instances{{< /ui >}} dans le panneau de la variante de tableau et cliquez sur une ligne.

{{< img src="database_monitoring/table-instance-details.png" alt="Panneau d'instance de tableau affichant les détails des colonnes et des index pour le tableau d'inventaire." style="width:100%;" >}}

Ceci ouvre une vue similaire au panneau de variante de tableau, affichant les informations suivantes pour l'instance de tableau sélectionnée :

- {{< ui >}}Definition{{< /ui >}} : Inclut les colonnes, les index et les clés étrangères pour cette instance de tableau.
- {{< ui >}}Metrics{{< /ui >}} : Taille du tableau, scans séquentiels et autres métriques associées (7 derniers jours par défaut).
- {{< ui >}}Queries{{< /ui >}} : Requêtes impliquant cette instance de tableau (7 derniers jours par défaut).
- {{< ui >}}Changes{{< /ui >}} : Modifications de schéma affectant cette instance de tableau (7 derniers jours par défaut).

## Recommandations {#recommendations}

Les recommandations mettent en évidence les opportunités potentielles d'optimisation du schéma pour vos tableaux.

Chaque recommandation inclut :

- Un problème détecté, tel qu'une clé primaire manquante ou un index inefficace.
- Une explication de l'importance du problème et de son impact sur les performances ou l'intégrité de la base de données.
- Une correction suggérée, souvent une instruction SQL pouvant être exécutée sur la base de données concernée.

Les recommandations sont disponibles de manière agrégée (en haut de la page) et par tableau, chaque tableau applicable affichant ses recommandations correspondantes. Pour plus d'informations, consultez [Recommendations][1].

## Vue d'ensemble des métriques {#metrics-overview}

La vue d'ensemble des métriques affiche des dashboards pour les métriques associées aux tableaux suivis dans chaque DBMS.

{{< img src="database_monitoring/metrics-overview.png" alt="Vue d'ensemble des métriques affichant le nombre total d'instances de tableau et les métriques d'activité clés sur les instances de base de données suivies" style="width:100%;" >}}

Chaque dashboard inclut les métriques suivantes :

- Nombre total d'instances de tableau  
- Instances changeant le plus rapidement (%)  
- Instances changeant le plus rapidement (octets)  
- Instances les plus consultées
- Instances les plus grandes  
- Instances avec le plus de lignes actives  
- Instances avec les plus grandes tailles d'index  
- Instances avec des verrous d'accès exclusif  
- Instances avec le plus de lignes mortes  
- Instances avec l'âge du dernier vacuum le plus long  
- Instances avec l'âge du dernier auto-vacuum le plus long

[1]: /fr/database_monitoring/recommendations
[2]: https://app.datadoghq.com/databases/list