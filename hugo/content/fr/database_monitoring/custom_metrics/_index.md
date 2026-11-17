---
aliases:
- /fr/database_monitoring/custom_metrics/exploring_custom_metrics
description: Utilisez l'option custom_queries pour collecter des métriques à partir
  de vos propres tables de base de données et les afficher dans Database Monitoring.
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /metrics/types/
  tag: Documentation
  text: Types de métriques
title: Métriques personnalisées dans Database Monitoring
---
Utilisez `custom_queries` pour collecter des métriques à partir de n'importe quelle table que l'utilisateur de base de données de l'Agent peut lire. Cela étend les données disponibles dans Datadog au-delà des métriques de performance des requêtes que Database Monitoring collecte nativement, en incluant notamment les tables d'état des applications, les compteurs métier ou la longueur des files d'attente.

## Avant de commencer {#before-you-begin}

Le Datadog Agent doit être installé et l'intégration de la base de données configurée. L'utilisateur de base de données de l'Agent a besoin de `SELECT` sur toutes les tables que vous interrogez.

## Configuration {#configuration}

Ajoutez `custom_queries` au fichier `conf.yaml` de votre intégration. Chaque entrée de la liste exécute une requête SQL et associe ses colonnes de sortie à des métriques ou à des tags.

| Option | Obligatoire | Description |
| --- | --- | --- |
| `metric_prefix` | Non | Toutes les métriques émises par cette requête commencent par ce préfixe. |
| `query` | Oui | Le SQL à exécuter. Toutes les lignes renvoyées sont évaluées. Utilisez le caractère pipe (`\|`) pour les requêtes multilignes. |
| `columns` | Oui | Une liste de colonnes dans le même ordre que votre `SELECT`. Chaque colonne nécessite un `name` et un `type`. Définissez `type` sur `gauge`, `count`, `rate` ou un autre [type de métrique][1] pour émettre une métrique, ou sur `tag` pour appliquer la valeur de la colonne en tant que tag sur chaque métrique issue de cette requête. |
| `tags` | Non | Une liste de tags statiques appliqués à chaque métrique issue de cette requête. |
| `collection_interval` | Non | La fréquence, en secondes, à laquelle l'Agent exécute la requête. Par défaut : toutes les 15 secondes. |

Si vous définissez `metric_prefix`, les métriques sont nommées `<metric_prefix>.<column_name>`. Sinon, le préfixe par défaut de l'intégration s'applique. Par exemple, les métriques Postgres sont nommées `postgresql.<column_name>` et les métriques MySQL sont nommées `<column_name>`.

**Remarques :**
- Le nombre d'entrées `columns` doit être égal au nombre de colonnes renvoyées par la requête.
- L'ordre des entrées `columns` doit correspondre à l'ordre des colonnes renvoyées par la requête.
- Au moins une entrée dans `columns` doit correspondre à un type de métrique (et non à `tag`).

### Types de colonnes {#column-types}

Chaque colonne d'une requête personnalisée se voit attribuer un type qui contrôle la manière dont la métrique est agrégée et affichée :

| Type | Description |
| --- | --- |
| `gauge` | Une valeur qui peut augmenter ou diminuer (par exemple, la taille d'une table). |
| `count` | Un décompte des événements depuis la dernière collecte. |
| `rate` | Un taux par seconde. |
| `monotonic_count` | Un compteur qui ne fait qu'augmenter. |
| `monotonic_gauge` | Une jauge qui augmente de façon monotone. |
| `temporal_percent` | Un pourcentage de temps. |
| `time_elapsed` | Durée en unités de temps. |
| `tag` | Permet de regrouper ou de filtrer les métriques ; n'est pas représenté sous forme de graphique distinct. |

Les colonnes `count` et `monotonic_count` sont agrégées en tant que `sum`. Tous les autres types de métriques sont agrégés en tant que `avg`.

## Exemples {#examples}

{{< tabs >}}
{{% tab "PostgreSQL" %}}

Ajoutez `custom_queries` à votre fichier `postgres.d/conf.yaml`.

Si la requête lit à partir d'une table à laquelle l'utilisateur `datadog` n'a pas encore accès, accordez-lui d'abord l'autorisation :

```sql
GRANT SELECT ON <TABLE_NAME> TO datadog;
```

**Exemple :** La table `company` suivante contient des enregistrements d'employés :

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Pour collecter `age` et `salary` en tant que métriques avec `name` et `address` comme tags :

```yaml
custom_queries:
  - metric_prefix: postgresql.employee
    query: SELECT age, salary, name, address FROM company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

Après avoir mis à jour le fichier, [redémarrez l'Agent][2].

Pour la référence complète de configuration, consultez [Collecte de métriques personnalisées Postgres][3].

[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
{{% /tab %}}

{{% tab "MySQL" %}}

Ajoutez `custom_queries` à votre fichier `mysql.d/conf.yaml`.

**Important :** Toutes les références de table doivent inclure le nom de la base de données (`database_name.table_name`). Si vous omettez le nom de la base de données, l'Agent échoue avec l'erreur : `No database selected`.

**Exemple :** La table `company` suivante dans la base de données `testdb` contient des enregistrements d'employés :

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Pour collecter `age` et `salary` en tant que métriques avec `name` et `address` comme tags :

```yaml
custom_queries:
  - metric_prefix: mysql.employee
    query: SELECT age, salary, name, address FROM testdb.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

Après avoir mis à jour le fichier, [redémarrez l'Agent][2].

Pour la référence complète de configuration, consultez [Requêtes personnalisées MySQL][3].

[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: /fr/integrations/guide/mysql-custom-queries/
{{% /tab %}}

{{% tab "SQL Server" %}}

SQL Server prend en charge deux approches pour collecter des métriques personnalisées : [requêtes personnalisées](#custom-queries) ou [compteurs de performance](#performance-counters).

### Requêtes personnalisées {#custom-queries}

Ajoutez `custom_queries` à votre fichier `sqlserver.d/conf.yaml` pour collecter des métriques à partir de n'importe quelle table.

**Exemple :** La table `company` suivante dans `testdb` contient des enregistrements d'employés :

```text
id | name  | age | address    | salary
---------------------------------------
1  | Paul  | 32  | California | 20000
2  | Allen | 25  | Texas      | 30000
3  | Teddy | 23  | Norway     | 45000
```

Pour collecter `age` et `salary` en tant que métriques avec `name` et `address` comme tags :

```yaml
custom_queries:
  - metric_prefix: sqlserver.employee
    query: SELECT age, salary, name, address FROM testdb.dbo.company
    columns:
      - name: employee_age
        type: gauge
      - name: employee_salary
        type: gauge
      - name: name
        type: tag
      - name: address
        type: tag
    tags:
      - source:hr_db
```

### Compteurs de performance {#performance-counters}

Utilisez `custom_metrics` pour collecter des métriques depuis `sys.dm_os_performance_counters` et d'autres DMV système.

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
```

| Option | Obligatoire | Description |
| --- | --- | --- |
| `name` | Oui | Le nom de la métrique dans Datadog. |
| `counter_name` | Oui | Le nom du compteur provenant de `sys.dm_os_performance_counters`. |
| `instance_name` | Non | Une instance de compteur spécifique. Utilisez `ALL` pour collecter toutes les instances (nécessite `tag_by`). |
| `tag_by` | Non | Nom de tag utilisé pour différencier les instances lorsque `instance_name: ALL`. |

Après avoir mis à jour le fichier, [redémarrez l'Agent][2].

Pour obtenir la référence complète de la configuration, y compris les détails des compteurs de performance et la méthode de procédure stockée héritée, consultez [Collect SQL Server Custom Metrics][3].

[2]: /fr/agent/configuration/agent-commands/#restart-the-agent
[3]: /fr/integrations/guide/collect-sql-server-custom-metrics/
{{% /tab %}}
{{< /tabs >}}

## Validation {#validation}

Une fois l'Agent exécuté, recherchez vos métriques dans [Metrics Explorer][4].

Pour vérifier les erreurs de configuration, [exécutez la sous-commande de statut de l'Agent][5] et recherchez votre intégration dans la section Checks :

```text
postgres
--------
  - instance #0 [ERROR]: 'Missing metric_prefix parameter in custom_queries'
  - Collected 0 metrics, 0 events & 0 service checks
```

## Explorer les métriques personnalisées {#explore-custom-metrics}

La section {{< ui >}}Custom Metrics{{< /ui >}} apparaît sur la page de détails de l'instance de base de données et affiche des graphiques de séries temporelles pour toutes les requêtes personnalisées que vous avez définies dans la configuration de votre Datadog Agent.

Si vous avez configuré `custom_queries` dans l'intégration de base de données de votre Datadog Agent, cette section détecte automatiquement ces requêtes et visualise chaque colonne de métrique sous forme de graphique de séries temporelles. Les graphiques sont limités à l'instance de base de données actuelle. Cela vous permet de surveiller des métriques de base de données spécifiques à votre entreprise ou à votre environnement parallèlement aux métriques standard de Database Monitoring, le tout au même endroit. La section Custom Metrics est masquée si aucune requête personnalisée n'est configurée.

### Exemple de configuration de l'Agent {#example-agent-configuration}

L'exemple PostgreSQL suivant suit la taille des tables et le nombre de lignes par table :

```yaml
init_config:

instances:
  - dbm: true
    host: localhost
    port: 5432
    username: datadog
    password: <PASSWORD>
    custom_queries:
      - metric_prefix: postgresql.custom
        query: |
          SELECT
            table_name,
            pg_total_relation_size(quote_ident(table_name)) AS total_bytes,
            n_live_tup                                       AS live_rows,
            n_dead_tup                                       AS dead_rows
          FROM information_schema.tables
          JOIN pg_stat_user_tables USING (table_name)
          WHERE table_schema = 'public'
        columns:
          - name: table_name
            type: tag
          - name: total_bytes
            type: gauge
          - name: live_rows
            type: gauge
          - name: dead_rows
            type: gauge
        collection_interval: 60
        tags:
          - env:production
          - service:my-app
```

Cette configuration produit trois métriques, chacune ventilée par `table_name` :

- `postgresql.custom.total_bytes`
- `postgresql.custom.live_rows`
- `postgresql.custom.dead_rows`

Les trois apparaissent sous forme de graphiques de séries temporelles distincts dans la section Custom Metrics de la page de détails de l'instance.

### Afficher le SQL source {#view-the-source-sql}

Chaque graphique dispose d'un bouton {{< ui >}}View SQL query{{< /ui >}} dans le coin supérieur droit. Un clic sur ce bouton affiche l'instruction SQL brute qui produit la métrique, afin que vous puissiez comprendre et auditer ce qui est mesuré.

### Intervalle de collecte {#collection-interval}

Le sous-titre de la section indique la fréquence de collecte des métriques (par exemple, « collected every 15s »). Si vous avez plusieurs requêtes personnalisées avec des intervalles différents, la plage est affichée (par exemple, « collected every 15s-60s »).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/metrics/types/
[4]: /fr/metrics/explorer/
[5]: /fr/agent/configuration/agent-commands/#agent-status-and-information