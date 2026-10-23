---
aliases:
- /fr/data_observability/datasets/?tab=snowflake
description: Connectez Snowflake à Datadog Data Observability pour surveiller la qualité
  des données, suivre l'utilisation et détecter les problèmes.
further_reading:
- link: /data_observability/
  tag: Documentation
  text: Vue d'ensemble de Data Observability
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitors Data Observability
title: Snowflake
---
## Présentation {#overview}

L'intégration Snowflake connecte Datadog à votre compte Snowflake pour synchroniser les métadonnées, l'historique des requêtes et les métriques au niveau des tableaux. Utilisez-la pour surveiller la fraîcheur des données, détecter les anomalies et suivre la traçabilité dans votre entrepôt et vos outils en aval.

## Prérequis {#prerequisites}

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Accès au rôle `ACCOUNTADMIN` dans Snowflake.
- Une paire de clés RSA. Pour plus d'informations, consultez la [documentation sur l'authentification par paire de clés Snowflake][1].
- Si votre compte Snowflake restreint l'accès réseau par IP, les adresses IP des webhooks Datadog doivent être incluses dans votre liste d'autorisation de politique réseau. Pour obtenir la liste des adresses IP, consultez la section `webhooks` de la page [Plages d'adresses IP][7].

  <div class="alert alert-warning">Les plages d'adresses IP sont différentes pour chaque site Datadog. Sur la page <a href="/api/latest/ip-ranges/">Plages d'adresses IP</a>, utilisez le sélecteur de site en haut à droite pour confirmer que vous récupérez les adresses IP à partir de l'URL d'endpoint spécifique au site correct.</div>

## Configurez votre compte dans Snowflake {#set-up-your-account-in-snowflake}

Pour configurer votre compte dans Snowflake :

1. Définissez les variables suivantes :

   ```sql
   SET role_name      = 'DATADOG_ROLE';
   SET user_name      = 'DATADOG_USER';
   SET warehouse_name = 'DATADOG_WH';
   ```

2. Créez un rôle, un entrepôt et un utilisateur authentifié par paire de clés.

   ```sql
   USE ROLE ACCOUNTADMIN;

   -- Create monitoring role
   CREATE ROLE IF NOT EXISTS IDENTIFIER($role_name);

   -- Create an X-SMALL warehouse (auto-suspend after 30s)
   CREATE WAREHOUSE IF NOT EXISTS IDENTIFIER($warehouse_name)
   WAREHOUSE_SIZE       = XSMALL
   WAREHOUSE_TYPE       = STANDARD
   AUTO_SUSPEND         = 30
   AUTO_RESUME          = TRUE
   INITIALLY_SUSPENDED  = TRUE;

   -- Raise the statement timeout so large crawls and queries aren't cut off,
   -- and cap concurrency so this warehouse can't be monopolized.
   ALTER WAREHOUSE IDENTIFIER($warehouse_name) SET
   MAX_CONCURRENCY_LEVEL               = 8
   STATEMENT_TIMEOUT_IN_SECONDS        = 3600
   STATEMENT_QUEUED_TIMEOUT_IN_SECONDS = 1200
   AUTO_SUSPEND                        = 30
   AUTO_RESUME                         = TRUE;

   -- Create Datadog user—key-pair only (no password)
   -- Replace <PUBLIC_KEY> with your RSA public key (PEM, no headers/newlines)
   CREATE USER IF NOT EXISTS IDENTIFIER($user_name)
   LOGIN_NAME     = $user_name
   RSA_PUBLIC_KEY = '<PUBLIC_KEY>';

   GRANT ROLE IDENTIFIER($role_name) TO USER IDENTIFIER($user_name);

   ALTER USER IDENTIFIER($user_name) SET
   DEFAULT_ROLE            = $role_name
   DEFAULT_WAREHOUSE       = $warehouse_name
   DEFAULT_SECONDARY_ROLES = ();
   ```

3. Accordez des privilèges de surveillance au rôle.

   ```sql
   -- Warehouse usage
   GRANT USAGE ON WAREHOUSE IDENTIFIER($warehouse_name) TO ROLE IDENTIFIER($role_name);

   -- Account‐level monitoring (tasks, pipes, query history)
   GRANT MONITOR EXECUTION ON ACCOUNT TO ROLE IDENTIFIER($role_name);

   -- Snowflake account-usage views for metadata, usage, and governance
   -- metrics. These do not grant access to the contents of your data.
   GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE IDENTIFIER($role_name);
   ```

   <div class="alert alert-info">Pour éviter de manquer de nouveaux tableaux, utilisez des attributions futures au niveau du schéma. Snowflake donne la priorité aux attributions au niveau du schéma sur celles au niveau de la base de données. Si Datadog ne dispose que d'attributions au niveau de la base de données mais que d'autres rôles disposent d'attributions au niveau du schéma sur les mêmes schémas, les nouveaux tableaux pourraient ne pas apparaître dans Datadog. Consultez la <a href="https://docs.snowflake.com/en/sql-reference/sql/grant-privilege#considerations">documentation de Snowflake</a> pour plus de détails.</div>

4. Accordez un accès en lecture seule à vos données. `grant_database_access` accorde un accès au niveau du schéma (plutôt qu'au niveau de la base de données) pour préserver la priorité sur les accès accordés à d'autres rôles, comme indiqué ci-dessus, et accepte un tableau JSON afin que vous puissiez accorder l'accès à plusieurs bases de données en un seul appel.

   ```sql
   -- A database must be selected in order to create a procedure. This can be
   -- any database.
   USE DATABASE SNOWFLAKE;

   CREATE OR REPLACE PROCEDURE grant_database_access(
       databaseNamesJson STRING,
       roleName STRING
   )
   RETURNS STRING
   LANGUAGE JAVASCRIPT
   EXECUTE AS CALLER
   AS
   $$
   function quoteIdentifier(name) {
       return '"' + name.replace(/"/g, '""') + '"';
   }

   var databaseNames;
   try {
       databaseNames = JSON.parse(DATABASENAMESJSON);
   } catch (error) {
       throw new Error("database_names_json must be a JSON array: " + error.message);
   }

   if (!Array.isArray(databaseNames) || databaseNames.length === 0) {
       throw new Error("database_names_json must contain at least one database");
   }

   // the role is always uppercased, so its name here matches regardless of
   // how it was entered when calling this procedure.
   var role = quoteIdentifier(String(ROLENAME).toUpperCase());

   // Grants on TABLE do not apply to dynamic tables, so they are listed
   // separately and additionally receive MONITOR, which dynamic tables need
   // to expose scheduling/lineage metadata.
   var selectKinds = [
       "TABLES",
       "VIEWS",
       "MATERIALIZED VIEWS",
       "EXTERNAL TABLES",
       "EVENT TABLES",
       "ICEBERG TABLES"
   ];

   var databaseCount = 0;
   var schemaCount = 0;

   for (var databaseIndex = 0;
        databaseIndex < databaseNames.length;
        databaseIndex++) {
       var database = quoteIdentifier(databaseNames[databaseIndex]);

       snowflake.execute({sqlText: "GRANT USAGE ON DATABASE " + database + " TO ROLE " + role});

       var schemaResultSet = snowflake.execute({
           sqlText:
               "SELECT SCHEMA_NAME " +
               "FROM " + database + ".INFORMATION_SCHEMA.SCHEMATA " +
               "WHERE SCHEMA_NAME <> 'INFORMATION_SCHEMA'"
       });

       while (schemaResultSet.next()) {
           var schema = quoteIdentifier(schemaResultSet.getColumnValue(1));
           var qualifiedSchema = database + "." + schema;

           snowflake.execute({sqlText: "GRANT USAGE ON SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           for (var kindIndex = 0; kindIndex < selectKinds.length; kindIndex++) {
               var kind = selectKinds[kindIndex];
               snowflake.execute({sqlText: "GRANT SELECT ON ALL " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
               snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + kind +
                       " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           }

           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON ALL DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});
           snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES" +
                   " IN SCHEMA " + qualifiedSchema + " TO ROLE " + role});

           schemaCount++;
       }

       // Covers schemas created after onboarding. The schema-level future
       // grants above remain necessary because they take precedence
       // wherever both exist.
       snowflake.execute({sqlText: "GRANT USAGE ON FUTURE SCHEMAS IN DATABASE " + database +
               " TO ROLE " + role});

       for (var futureKindIndex = 0;
            futureKindIndex < selectKinds.length;
            futureKindIndex++) {
           snowflake.execute({sqlText: "GRANT SELECT ON FUTURE " + selectKinds[futureKindIndex] +
                   " IN DATABASE " + database + " TO ROLE " + role});
       }

       snowflake.execute({sqlText: "GRANT SELECT, MONITOR ON FUTURE DYNAMIC TABLES IN DATABASE " +
               database + " TO ROLE " + role});

       databaseCount++;
   }

   return (
       "Granted Datadog access to " + databaseCount +
       " database(s) and " + schemaCount +
       " existing schema(s)"
   );
   $$
   ;

   CALL grant_database_access('["<YOUR_DATABASE>"]', '<ROLE_NAME>');
   ```

   Exécutez à nouveau l'instruction `CALL` (avec une liste de bases de données mise à jour) chaque fois que vous souhaitez accorder l'accès à une nouvelle base de données, ou [dans le cadre de votre configuration CI][8] afin que les bases de données éphémères restent lisibles.

5. (Facultatif) Si votre organisation utilise des [tables d'événements Snowflake][2], vous pouvez accorder au rôle Datadog l'accès à celles-ci.

   ```sql
   -- Grant usage on the database, schema, and table of the event table
   GRANT USAGE ON DATABASE <EVENT_TABLE_DATABASE> TO ROLE IDENTIFIER($role_name);
   GRANT USAGE ON SCHEMA <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA> TO ROLE IDENTIFIER($role_name);
   GRANT SELECT ON TABLE <EVENT_TABLE_DATABASE>.<EVENT_TABLE_SCHEMA>.<EVENT_TABLE_NAME> TO ROLE IDENTIFIER($role_name);

   -- Snowflake-provided application roles for event logs
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_VIEWER TO ROLE IDENTIFIER($role_name);
   GRANT APPLICATION ROLE SNOWFLAKE.EVENTS_ADMIN TO ROLE IDENTIFIER($role_name);
   ```

   Une fois la configuration de Snowflake terminée, configurez l'intégration Snowflake dans Datadog.

## Configurez l'intégration Snowflake dans Datadog {#configure-the-snowflake-integration-in-datadog}

Pour configurer l'intégration Snowflake dans Datadog :

1. Accédez à [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][3].
2. Cliquez sur le bouton {{< ui >}}Configure{{< /ui >}} pour l'option Snowflake.

   {{< img src="data_observability/data-obs-settings-integrations.png" alt="Liste des intégrations Data Observability sur la page Paramètres" style="width:100%;" >}}

3. Suivez la procédure pour saisir les détails de votre compte et télécharger une clé privée.
4. Activez {{< ui >}}Enable Data Observability for Snowflake tables{{< /ui >}}.
5. (Facultatif) Sous {{< ui >}}Custom alias URLs{{< /ui >}}, enregistrez tout nom supplémentaire utilisé par d'autres outils pour référencer ce compte Snowflake. Les exemples incluent l'identifiant de compte configuré dans dbt, la chaîne de connexion utilisée par un outil BI ou une URL AWS PrivateLink. Consultez [URL d'alias personnalisées](#custom-alias-urls) ci-dessous pour savoir quand cela est nécessaire.
6. Cliquez sur {{< ui >}}Save & Test{{< /ui >}}.

### URL d'alias personnalisées {#custom-alias-urls}

Ce champ est facultatif. Utilisez-le lorsque le nom du compte Snowflake auquel Datadog se connecte ne correspond pas à la façon dont d'autres outils font référence au même compte.

Les événements de lignée provenant de l'extérieur de Datadog incluent les émetteurs OpenLineage, les manifestes dbt et l'historique des requêtes provenant d'autres outils. Ces événements identifient l'entrepôt en utilisant le nom avec lequel l'outil en amont a été configuré. Si ces noms diffèrent de l'URL de compte canonique utilisée par Datadog, la lignée provenant de ces sources n'est pas associée à cette intégration Snowflake.

Enregistrer chaque nom alternatif en tant que {{< ui >}}Custom alias URL{{< /ui >}} indique à Datadog de les traiter comme des références au même compte Snowflake. La lignée inter-outils se résout alors correctement. Les cas courants incluent :

- Le compte est atteint via une URL AWS PrivateLink.
- Un projet dbt, un outil BI ou un autre connecteur est configuré avec un identifiant de compte qui ne correspond pas à l'URL canonique.

Pour ajouter un alias, développez {{< ui >}}Configure Data Observability{{< /ui >}} lors de la configuration de l'intégration et cliquez sur {{< ui >}}\+ Add Alias{{< /ui >}} sous {{< ui >}}Custom alias URLs{{< /ui >}}. Ajoutez une entrée par nom alternatif. Les alias s'appliquent uniquement au compte Snowflake en cours de configuration ; chaque intégration Snowflake gère sa propre liste d'alias.

## Tâches Snowflake et Snowpipes {#snowflake-tasks-and-snowpipes}

Datadog déduit la lignée des tâches Snowflake et des Snowpipes en analysant leurs définitions SQL.
- Pour les tâches, cela inclut les dépendances de tâche à tâche et la lignée vers les tableaux de destination.
- Pour les Snowpipes, Datadog déduit la lignée de la zone de préparation source vers le tableau de destination.

Les deux fonctionnalités nécessitent l'autorisation `GRANT MONITOR EXECUTION ON ACCOUNT` accordée lors de la configuration.

<div class="alert alert-info">Les traces des tâches Snowflake sont en préversion. Contactez votre représentant de compte pour activer cette fonctionnalité.</div>

Une fois activée, chaque exécution de graphe de tâches apparaît sous forme de trace dans l'APM avec des tâches individuelles en tant qu'étendues, incluant les détails d'exécution tels que le statut, la durée et les erreurs. Pour les trouvera:
1. Dans Datadog, accédez à {{< ui >}}APM{{< /ui >}} > [{{< ui >}}Trace Explorer{{< /ui >}}][4].
2. Filtrer l'Explorer :
   - Pour le span du graphe de tâches de haut niveau, filtrez par `operation_name:snowflake.task_graph`
   - Pour les spans de tâches individuelles, filtrez par `operation_name:snowflake.task`

## Tags d'objet {#object-tags}

Datadog ingère les [tags d'objet Snowflake][6] appliqués à vos tableaux et les associe au tableau correspondante dans Data Observability. Les tags sont lus depuis `SNOWFLAKE.ACCOUNT_USAGE.TAG_REFERENCES` en utilisant le rôle de base de données `SNOWFLAKE.GOVERNANCE_VIEWER` accordé lors de la configuration, aucune autorisation supplémentaire n'est donc requise.

Les tags ingérés sont disponibles en tant qu'attributs sur la source de données **Data Observability Metrics**, aux côtés de `database`, `schema`, `table` et `entity_id`. Dans le Metrics Explorer et l'éditeur de widgets du dashboard, vous pouvez les utiliser pour :

- Filtrer les métriques de tableaux par dimension métier (par exemple, `data_source` ou `data_domain`).
- Grouper les métriques par valeur de tag.
- Piloter des variables de modèle sur les dashboards.

Datadog ingère jusqu'à 50 tags par tableau, ce qui correspond à la limite documentée de Snowflake. Les tags sont actualisés à chaque exploration, les modifications dans Snowflake apparaissent donc après la synchronisation suivante.

## Étapes suivantes {#next-steps}

Une fois enregistré, Datadog commence à synchroniser votre schéma d'informations et votre historique de requêtes en arrière-plan. Les synchronisations initiales peuvent prendre jusqu'à plusieurs heures selon la taille de votre déploiement Snowflake.

Une fois la synchronisation initiale terminée, créez un [monitor Data Observability][5] pour commencer à recevoir des alertes sur la fraîcheur, le nombre de lignes, les métriques au niveau des colonnes et les métriques SQL personnalisées.

## Dépanner les autorisations {#troubleshoot-permissions}

Si Datadog ne parvient pas à voir les bases de données, schémas ou tableaux attendus dans votre compte Snowflake, suivez ces étapes pour vérifier que le rôle Datadog dispose de l'accès approprié.

<div class="alert alert-info">La console Snowflake active les rôles secondaires par défaut, ce qui peut donner l'impression qu'un rôle dispose de plus d'accès qu'il n'en a réellement. L'étape 2 ci-dessous permet de s'assurer que vous effectuez vos tests uniquement avec les autorisations du rôle Datadog.</div>

1. Définissez le rôle et l'utilisateur sur ceux provisionnés pour Datadog :
   ```sql
   USE ROLE DATADOG_ROLE;
   ```

2. Désactivez les rôles secondaires afin que seules les autorisations du rôle Datadog soient actives :
   ```sql
   USE SECONDARY ROLES NONE;
   ```

3. Vérifiez que le rôle correct est défini et qu'aucun rôle secondaire n'est utilisé :
   ```sql
   SELECT CURRENT_ROLE(), CURRENT_SECONDARY_ROLES();
   ```

4. Listez les bases de données auxquelles le rôle Datadog peut accéder :
   ```sql
   SELECT database_name FROM snowflake.information_schema.databases;
   ```

5. Vérifiez l'accès à des schémas ou des tableaux spécifiques :
   ```sql
   SHOW SCHEMAS IN DATABASE "<DATABASE_NAME>";
   SHOW TABLES IN SCHEMA "<DATABASE_NAME>"."<SCHEMA_NAME>";
   ```

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.snowflake.com/en/user-guide/key-pair-auth#generate-the-private-key
[2]: https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up
[3]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: https://app.datadoghq.com/apm/traces
[5]: /fr/monitors/types/data_observability/
[6]: https://docs.snowflake.com/en/user-guide/object-tagging
[7]: /fr/api/latest/ip-ranges/
[8]: /fr/data_observability/cicd/#drift-detection