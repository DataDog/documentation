---
aliases:
- /fr/database_monitoring/sql_extended_events
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: Documentation
  text: Configuration de SQL Server
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Configuration de la capture de requêtes avec des valeurs de paramètres
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage de la solution Database Monitoring
title: Configuration de la capture de fin de requête et d'erreur de requête sur SQL
  Server
---
Cette fonctionnalité collecte les événements de fin de requête et d'erreur de requête à partir de vos instances SQL Server à l'aide des événements étendus (XE). Elle offre une visibilité sur :
- Les métriques et le comportement des requêtes SQL avec des valeurs de paramètres
- Les erreurs et les délais d'attente survenus lors de l'exécution

Pour plus d'informations sur la capture des paramètres de requête sur différents systèmes de base de données, consultez [Configuration de la capture de requêtes avec des valeurs de paramètres][1].

[1]: /fr/database_monitoring/guide/parameterized_queries/

Ces données sont utiles pour :
- L'analyse des performances
- Débogage du comportement de l'application
- Audit des erreurs ou délais d'attente inattendus


## Avant de commencer {#before-you-begin}

Vous devez configurer Database Monitoring pour votre instance [SQL Server][1] avant de poursuivre ce guide.


Bases de données prises en charge
: SQL Server

Déploiements pris en charge
: Tous les types de déploiement.

Versions de l'Agent prises en charge
: 7.67.0+

## Configuration {#setup}
{{< tabs >}}
{{% tab "SQL Server hors Azure" %}}

1. Dans votre instance SQL Server, créez les sessions Extended Events (XE) suivantes. Ces sessions peuvent être créées sur n'importe quelle base de données au sein de l'instance.

La session XE `datadog_query_completions` capture les requêtes SQL de longue durée (plus d'une seconde) provenant des appels RPC, des lots SQL et des procédures stockées.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO

CREATE EVENT SESSION datadog_query_completions ON SERVER -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON SERVER STATE = START;
GO
```

La session XE datadog_query_errors capture les erreurs SQL de [gravité ≥ 11][1] et les délais d'expiration de requête (également appelés [événements d'attention][2]), permettant à Datadog de signaler les échecs et les délais d'expiration de requête.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
CREATE EVENT SESSION datadog_query_errors ON SERVER
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON SERVER STATE = START;
GO
```

   **Remarque** : Si vous utilisez Amazon RDS pour SQL Server, supprimez la ligne `MEMORY_PARTITION_MODE = PER_NODE` des deux configurations de session, car cette option n'est pas prise en charge sur les instances RDS.

2. Dans la configuration du Datadog Agent, activez `collect_xe` dans `sqlserver.d/conf.yaml`.
Consultez l'exemple [conf.yaml.example][3] pour connaître toutes les options de configuration disponibles.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
Pour collecter les instructions de requête avec les valeurs de paramètres, activez `collect_raw_query_statement` dans `sqlserver.d/conf.yaml`. Pour plus d'informations sur la capture des paramètres, consultez [Configuring Query Capture with Parameter Values][1].

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">Les instructions de requête brutes peuvent contenir des informations sensibles (par exemple, des mots de passe dans le texte de la requête) ou des informations personnellement identifiables. L'activation de cette option permet à Datadog de collecter et d'ingérer les instructions de requête brutes qui apparaissent dans les échantillons de requêtes. Cette option est désactivée par défaut.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
{{% /tab %}}

{{% tab "Azure DB" %}}

1. Dans votre base de données Azure SQL Server, créez les sessions Extended Events (XE) suivantes :

La session XE `datadog_query_completions` capture les requêtes SQL de longue durée (plus d'une seconde) provenant des appels RPC, des lots SQL et des procédures stockées.

```sql
-- Query completions: RPC, batch, and stored procedure events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON DATABASE;
GO

CREATE EVENT SESSION datadog_query_completions ON DATABASE -- datadog requires this exact session name
ADD EVENT sqlserver.rpc_completed ( -- capture remote procedure call completions
    ACTION ( -- datadog requires these exact actions for rpc_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.sql_batch_completed( -- capture batch completions
    ACTION ( -- datadog requires these exact actions for sql_batch_completed
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
),
ADD EVENT sqlserver.module_end( -- capture stored procedure completions
    SET collect_statement = (1)
    ACTION ( -- datadog requires these exact actions for module_end
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE (
        sql_text <> '' AND
        duration > 1000000 -- in microseconds, limit to queries with duration greater than 1 second
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not exceed 1024, values above 1 MB may result in data loss due to SQLServer internals
    TRACK_CAUSALITY = ON, -- allows datadog to correlate related events across activity ID
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_completions ON DATABASE STATE = START;
GO
```

La session XE datadog_query_errors capture les erreurs SQL de [gravité ≥ 11][1] et les délais d'expiration de requête (également appelés [événements d'attention][2]), permettant à Datadog de signaler les échecs et les délais d'expiration de requête.

```sql
-- Errors and timeouts: SQL errors and attention events
IF EXISTS (
    SELECT * FROM sys.database_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON DATABASE;
GO
CREATE EVENT SESSION datadog_query_errors ON DATABASE
ADD EVENT sqlserver.error_reported(
    ACTION( -- datadog requires these exact actions for error_reported
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
    WHERE severity >= 11
),
ADD EVENT sqlserver.attention(
    ACTION( -- datadog requires these exact actions for attention
        sqlserver.sql_text,
        sqlserver.database_name,
        sqlserver.username,
        sqlserver.client_app_name,
        sqlserver.client_hostname,
        sqlserver.session_id,
        sqlserver.request_id
    )
)
ADD TARGET package0.ring_buffer -- do not change, datadog is only configured to read from ring buffer at this time
(
  SET MAX_MEMORY = 1024
)
WITH (
    MAX_MEMORY = 1024 KB, -- do not change, setting this larger than 1 MB may result in data loss due to SQLServer internals
    EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
    MAX_DISPATCH_LATENCY = 30 SECONDS,
    MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems
    STARTUP_STATE = ON
);

ALTER EVENT SESSION datadog_query_errors ON DATABASE STATE = START;
GO
```

2. Dans la configuration du Datadog Agent, activez `collect_xe` dans `sqlserver.d/conf.yaml`.
Consultez l'exemple [conf.yaml.example][3] pour connaître toutes les options de configuration disponibles.

```yaml
  collect_xe:
    query_completions:
      enabled: true
    query_errors:
      enabled: true
```
Pour collecter les instructions de requête avec les valeurs de paramètres, activez `collect_raw_query_statement` dans `sqlserver.d/conf.yaml`. Pour plus d'informations sur la capture des paramètres, consultez [Configuring Query Capture with Parameter Values][1].

```yaml
  collect_raw_query_statement:
    enabled: true
```

<div class="alert alert-info">Les instructions de requête brutes et les plans d'exécution peuvent contenir des informations sensibles (par exemple, des mots de passe dans le texte de la requête) ou des informations personnellement identifiables. L'activation de cette option permet à Datadog de collecter et d'ingérer les instructions de requête brutes et les plans d'exécution qui apparaissent dans les échantillons de requêtes ou les explain plans. Cette option est désactivée par défaut.</div>

[1]: https://learn.microsoft.com/en-us/sql/relational-databases/errors-events/database-engine-error-severities
[2]: https://learn.microsoft.com/en-us/sql/relational-databases/event-classes/attention-event-class
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example

{{% /tab %}}

{{< /tabs >}}

## Réglage des Extended Events pour votre environnement (facultatif) {#tuning-extended-events-for-your-environment-optional}

Vous pouvez personnaliser les sessions Extended Events pour mieux répondre à vos besoins spécifiques :

### Seuil de durée de requête {#query-duration-threshold}
Le seuil de durée de requête par défaut est de `duration > 1000000` (1 seconde). Ajustez cette valeur pour contrôler le nombre de requêtes capturées :

- **Capturer plus de requêtes** : Abaissez le seuil (par exemple, `duration > 500000` pour 500 ms)
- **Capturer moins de requêtes** : Augmentez le seuil (par exemple, `duration > 5000000` pour 5 secondes)
<div class="alert alert-danger">Définir des seuils trop bas peut entraîner une collecte excessive d'événements qui affecte les performances du serveur, une perte d'événements due à un dépassement de tampon et des données incomplètes, car Datadog ne collecte que les 1000 événements les plus récents par intervalle de collecte.</div>

### Allocation de mémoire {#memory-allocation}
- La valeur par défaut est `MAX_MEMORY = 1024 KB`.
- Ne dépassez pas 1024 Ko, car des valeurs plus élevées peuvent entraîner une perte de données en raison des [limitations internes de SQL Server][3].
- Pour les serveurs à haut volume, il est recommandé de maintenir cette valeur à un maximum de 1024 Ko.
- Pour les serveurs à faible trafic, un paramètre de 512 Ko peut suffire.

### Filtrage d'événements {#event-filtering}

Pour réduire le volume d'événements, vous pouvez ajouter des filtres à la clause `WHERE`. Exemple :

  ```sql
  WHERE (
      sql_text <> '' AND
      duration > 1000000 AND
      -- Add custom filters here
      database_name = 'YourImportantDB' AND -- Only track specific databases
      username <> 'datadog' -- Exclude Datadog Agent queries or specific users
  )
  ```

### Considérations relatives aux performances {#performance-considerations}

Les Extended Events sont conçus pour être légers, mais ils peuvent entraîner une certaine surcharge. Si vous constatez des problèmes de performance, envisagez les actions suivantes :

- [Augmentez le seuil de durée de requête](#query-duration-threshold) pour limiter les requêtes capturées.
- [Ajoutez des filtres plus spécifiques](#event-filtering) pour réduire le volume d'événements.
- Désactivez une ou deux sessions pendant les périodes de charge de pointe en exécutant :

```sql
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_completions'
)
    DROP EVENT SESSION datadog_query_completions ON SERVER;
GO
IF EXISTS (
    SELECT * FROM sys.server_event_sessions WHERE name = 'datadog_query_errors'
)
    DROP EVENT SESSION datadog_query_errors ON SERVER;
GO
```

### Considérations spécifiques à Azure {#azure-specific-considerations}

Les environnements Azure SQL Database disposent généralement de ressources plus limitées. Pour minimiser l'impact sur les performances :

- [Utilisez des filtres plus restrictifs](#event-filtering) si vous utilisez un niveau de service inférieur.
- Si vous utilisez des pools élastiques, surveillez l'impact sur les performances pour toutes les bases de données.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/setup_sql_server/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838