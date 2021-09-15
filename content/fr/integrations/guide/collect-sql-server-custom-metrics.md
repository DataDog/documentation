---
title: Recueillir des métriques custom SQL Server
kind: guide
aliases:
  - /fr/integrations/faq/how-to-collect-metrics-with-sql-stored-procedure/
further_reading:
  - link: 'https://www.datadoghq.com/blog/sql-server-metrics/#creer-une-procedure-stockee-pour-generer-et-recueillir-des-metriques'
    tag: Blog
    text: Créer une procédure stockée pour générer et recueillir des métriques
  - link: /integrations/mysql/
    tag: Documentation
    text: Intégration Datadog/MySQL
---
Par défaut, le [check Datadog/SQL Server][1] capture uniquement *une partie* des métriques présentes dans la table `sys.dm_os_performance_counters`. Ajoutez des métriques supplémentaires en suivant la structure `custom_metrics`.

## Recueillir des métriques depuis une DMV

Voici un exemple de configuration basique pour la collecte de métriques custom. Aucune instance n'est associée à ce counter. **Remarque** : vous pouvez spécifier des tags à envoyer avec vos métriques si vous le souhaitez.

```yaml
custom_metrics:
  - name: sqlserver.clr.execution
    counter_name: CLR Execution
    tags:
      - tag_name:value
```

Descriptions des paramètres :

| Paramètre      | Description                                           |
|----------------|-------------------------------------------------------|
| `name`         | Nom de votre métrique dans Datadog.                   |
| `counter_name` | Le nom du counter des [objets de base de données SQL Server][2]. |

Si un counter est associé à plusieurs instances, vous pouvez choisir de récupérer une seule instance avec le nom de paramètre `instance_name` :

```yaml
custom_metrics:
  - name: sqlserver.exec.in_progress
    counter_name: OLEDB calls
    instance_name: Cumulative execution time (ms) per second
```

Pour une granularité supérieure, affinez la requête en spécifiant un `object_name` :

```yaml
custom_metrics:
- name: sqlserver.cache.hit_ratio
  counter_name: Cache Hit Ratio
  instance_name: SQL Plans
  object_name: SQLServer:Plan Cache
```

Pour recueillir toutes les instances d'un counter associé à plusieurs instances, utilisez la valeur sensible à la casse `ALL` pour le paramètre `instance_name`, qui **requiert** une valeur pour le paramètre `tag_by`. Cet exemple récupère les métriques portant le tag `db:mydb1`, `db:mydb2` :

```yaml
- name: sqlserver.db.commit_table_entries
  counter_name: Commit table entries
  instance_name: ALL
  tag_by: db
```

Les counters sont tirés de la table par défaut `sys.dm_os_performance_counters`. Le check Datadog/SQL Server prend également en charge `sys.dm_os_wait_stats`, `sys.dm_os_memory_clerks` et `sys.dm_io_virtual_file_stats`.

Pour envoyer une métrique tirée de l'une des tables supplémentaires, spécifiez la table dans la définition du counter avec le paramètre `table`, ainsi que les colonnes du counter à envoyer avec le paramètre `columns` :

```yaml
custom_metrics:
  - name: sqlserver.LCK_M_S
    table: sys.dm_os_wait_stats
    counter_name: LCK_M_S
    columns:
      - max_wait_time_ms
      - signal_wait_time_ms

```

L'exemple ci-dessus envoie deux métriques, `sqlserver.LCK_M_S.max_wait_time.ms` et `sqlserver.LCK_M_S.signal_wait_time_ms`.

**Remarque** : si les métriques comme `sys.dm_io_virtual_file_stats` et `sys.dm_os_memory_clerks` ne sont pas associées à un `counter_name`, seules les colonnes doivent être spécifiées.

```yaml
custom_metrics:
  - name: sqlserver.io_file_stats
    table: sys.dm_io_virtual_file_stats
    columns:
      - num_of_reads
      - num_of_writes
```

L'exemple ci-dessus envoie deux métriques, `sqlserver.io_file_stats.num_of_reads` et `sqlserver.io_file_stats.num_of_writes`, chacune étant taguée avec l'ID de la base de données et l'ID du fichier.

## Recueillir des métriques avec une procédure personnalisée

Recueillir des métriques avec une procédure personnalisée produit une grande quantité de métriques custom, ce qui peut affecter votre facture.

**Remarque** : si vous utilisez une version < 6.11 de l'Agent, vous devez avoir configuré le pilote `adodbapi` pour que cela fonctionne.

### Configurer une procédure stockée

Une table temporaire doit être configurée pour recueillir les métriques custom afin de les envoyer à Datadog. La table doit contenir les colonnes suivantes :

| Colonne   | Description                                               |
|----------|-----------------------------------------------------------|
| `metric` | Le nom de la métrique tel qu'il apparaît dans Datadog.          |
| `type`   | Le [type de métrique][3] (gauge, rate ou [histogram][4]).    |
| `value`  | La valeur de la métrique (doit pouvoir être convertie en valeur de type float). |
| `tags`   | Les tags qui apparaissent dans Datadog, séparés par une virgule.     |

La procédure stockée suivante est créée dans la base de données principale :

```text
-- Créer une procédure stockée avec le nom <NOM_PROCÉDURE>
CREATE PROCEDURE [dbo].[<NOM_PROCÉDURE>]
AS
BEGIN

  -- Créer une table temporaire selon les instructions de l'intégration
  CREATE TABLE #DataDog
  (
    [metric] varchar(255) not null,
    [type] varchar(50) not null,
    [value] float not null,
    [tags] varchar(255)
  )

  -- Supprimer les nombres de lignes des ensembles de résultats
  SET NOCOUNT ON;

  -- Créer un count variable et le définir comme égal au nombre de connexions utilisateur
  DECLARE @count float;
  SET @count = (select cntr_value from sys.dm_os_performance_counters where counter_name = 'User Connections');

  -- Insérer des métriques custom dans la table #Datadog
  INSERT INTO #Datadog (metric, type, value, tags)
  VALUES ('sql.test.test', 'gauge', @count, 'db:master,env:staging')
        ,('sql.test.gauge', 'gauge', FLOOR(RAND()*20), 'tag:test')
        ,('sql.test.rate', 'rate', FLOOR(RAND()*20), 'metric:gauge')
        ,('sql.test.histogram', 'histogram', FLOOR(RAND()*20), 'metric:histogram')
  SELECT * from #DataDog
END
GO

-- Autoriser l'exécution de la procédure stockée
GRANT EXECUTE ON [dbo].[<NOM_PROCÉDURE>] To Public
GO
```

La procédure stockée renvoie les métriques custom suivantes :

* `sql.test.test`
* `sql.test.gauge`
* `sql.test.rate`
* `sql.test.histogram.95percentile`
* `sql.test.histogram.avg`
* `sql.test.histogram.count`
* `sql.test.histogram.max`
* `sql.test.histogram.median`

### Mettre à jour la configuration de l'intégration SQL Server

Pour recueillir des métriques avec une procédure personnalisée, créez une définition d'instance dans votre fichier `sqlserver.d/conf.yaml` avec la procédure à exécuter. Une instance distincte est nécessaire pour toute configuration existante. Les instances avec une procédure stockée ne traitent rien d'autre que cette dernière, par exemple :

```yaml
  - host: 127.0.0.1,1433
    username: datadog
    password: "<MOTDEPASSE>"
    database: master
  - host: 127.0.0.1,1433
    username: datadog
    password: "<MOTDEPASSE>"
    stored_procedure: "<NOM_PROCÉDURE>"
    database: master
```

Vous pouvez également spécifier :

| Paramètre                 | Description                                                                               | Valeur par défaut            |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------|
| `ignore_missing_database` | Ne pas effectuer le check si la base de données spécifiée n'existe pas sur le serveur.                  | `False`            |
| `proc_only_if`            | Exécuter cette requête SQL avant chaque appel de `stored_procedure`. Si elle renvoie 1, appeler la procédure. |                    |
| `proc_only_if_database`   | La base de données dans laquelle la requête SQL `proc_only_if` est exécutée.                                            | attribut de la base données |

**Remarque** : la condition de protection `proc_only_if` est utile pour les scénarios de haute disponibilité où la base de données peut être déplacée d'un serveur à l'autre.

### Dépannage

Si vos métriques custom n'apparaissent pas dans Datadog, vérifiez le fichier de log de l'Agent. Si vous voyez l'erreur `Could not call procedure <NOM_PROCÉDURE>: You must supply -1 parameters for this stored procedure`, la raison est peut-être l'une des suivantes :

* Le `<NOM_PROCÉDURE>` est incorrect.
* Il est possible que le nom d'utilisateur de la base de données spécifié dans la configuration ne soit pas autorisé à exécuter la procédure stockée.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/sqlserver/
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/performance-monitor/sql-server-databases-object
[3]: /fr/metrics/#metric-types
[4]: /fr/metrics/histograms/