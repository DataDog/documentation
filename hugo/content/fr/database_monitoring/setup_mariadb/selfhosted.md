---
description: Installez et configurez Database Monitoring pour MariaDB auto-hébergée.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
title: Configuration de Database Monitoring pour MariaDB auto-hébergée
---
Database Monitoring offre une visibilité approfondie sur vos bases de données MariaDB en exposant les métriques de requêtes, les échantillons de requêtes, les plans d'exécution, les données de connexion, les métriques système et la télémétrie pour le moteur de stockage InnoDB.

L'Agent recueille les données de télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Effectuez la configuration suivante pour activer Database Monitoring avec votre base de données MariaDB :

1. [Configurez les paramètres de base de données](#configure-mariadb-settings)
1. [Accordez à l'Agent l'accès à la base de données](#grant-the-agent-access)
1. [Installez l'Agent](#install-the-agent)

## Avant de commencer {#before-you-begin}

Versions de MariaDB prises en charge
: 10.5, 10.6, 10.11 ou 11.4 <br/><br/>
Database Monitoring pour MariaDB est prise en charge avec des [limitations connues][13].

Versions de l'Agent prises en charge
: 7.61.0+

Impact sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est prudente, mais vous pouvez ajuster les paramètres tels que l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des charges de travail, l'Agent représente moins de 1 % du temps d'exécution des requêtes sur la base de données et moins de 1 % du CPU. <br/><br/>
Database Monitoring s'exécute en tant qu'intégration au-dessus de l'Agent de base ([voir les benchmarks][1]).

Proxys, équilibreurs de charge et répartiteurs de connexion
: Le Datadog Agent doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, `127.0.0.1` ou le socket est préférable. L'Agent ne doit pas se connecter à la base de données via un proxy, un équilibreur de charge ou un pooler de connexions. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), l'Agent calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez [Informations sensibles][2] pour savoir quelles données l'Agent collecte depuis vos bases de données et comment les sécuriser.

## Configurez les paramètres MariaDB {#configure-mariadb-settings}

Pour collecter des métriques de requêtes, des échantillons et des plans d'exécution, activez le [schéma de performance MariaDB][3] et configurez les [options du schéma de performance][4] suivantes, soit sur la ligne de commande, soit dans les fichiers de configuration (par exemple, `mysql.conf`) :

**Remarque** : Contrairement à MySQL, MariaDB est livré avec `performance_schema` désactivé par défaut. Vous devez l'activer explicitement.

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Requis. Active le schéma de performance. MariaDB ne l'active pas par défaut. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes plus volumineuses. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne sont pas collectées. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Doit correspondre à `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Requis. Active la surveillance des requêtes en cours. |
| `performance-schema-consumer-events-waits-current` | `ON` | Requis. Active la collecte des événements d'attente. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recommandé. Active le suivi d'un plus grand nombre de requêtes récentes sur tous les threads. S'il est activé, cela augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |
| `performance-schema-consumer-events-statements-history` | `ON` | Optionnel. Active le suivi de l'historique récent des requêtes par thread. S'il est activé, cela augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes. |

**Remarque** : Une pratique recommandée consiste à autoriser l'Agent à activer les paramètres `performance-schema-consumer-*` dynamiquement au moment de l'exécution, dans le cadre de l'octroi de l'accès à l'Agent. Voir [Configuration des consommateurs au runtime](#runtime-setup-consumers).

## Accorder l'accès à l'Agent {#grant-the-agent-access}

Le Datadog Agent nécessite un accès en lecture seule à la base de données pour collecter des statistiques et des requêtes.

Les instructions suivantes accordent à l'Agent la permission de se connecter depuis n'importe quel host en utilisant `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` pour qu'il ne soit autorisé à se connecter qu'à partir de localhost en utilisant `datadog@'localhost'`. Consultez la [documentation MariaDB][5] pour plus d'informations.

Créez l'utilisateur `datadog` et accordez les permissions de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

La collecte des requêtes bloquantes utilise `information_schema.INNODB_LOCK_WAITS` et `INNODB_TRX`, conjointement avec `performance_schema`, donc les octrois `PROCESS` et `SELECT ON performance_schema.*` ci-dessus sont suffisants ; aucun octroi supplémentaire n'est requis. La collecte des requêtes bloquantes est désactivée par défaut. Activez-la avec `query_activity.collect_blocking_queries: true` dans la configuration de votre instance.

Créez le schéma suivant :

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
```

Créez la procédure `explain_statement` pour permettre à l'Agent de collecter les plans d'exécution :

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

De plus, créez cette procédure **dans chaque schéma** à partir duquel vous souhaitez collecter des plans d'exécution. Remplacez `<YOUR_SCHEMA>` par votre schéma de base de données :

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

Pour collecter les métriques d'index, accordez à l'utilisateur `datadog` un privilège supplémentaire :

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

### Configuration des consommateurs au runtime {#runtime-setup-consumers}
Datadog recommande de créer la procédure suivante pour donner à l'Agent la capacité d'activer les consommateurs `performance_schema.events_*` au moment de l'exécution.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### Stockez votre mot de passe de manière sécurisée {#securely-store-your-password}
{{% dbm-secret %}}

## Collecte des schémas {#collecting-schemas}

À partir de l'Agent 7.65, le Datadog Agent peut collecter des informations de schéma à partir des bases de données MariaDB. Activez-la avec `collect_schemas.enabled: true` dans la configuration de votre instance (utilisez `schemas_collection` à la place sur l'Agent 7.68 et versions antérieures). La collecte de schémas est désactivée par défaut.

```yaml
instances:
  - dbm: true
    ...
    collect_schemas:
      enabled: true
```

Sur MariaDB 10.5 et versions ultérieures (comme MySQL), `INFORMATION_SCHEMA` n'expose un tableau qu'à un utilisateur qui détient un privilège sur celle-ci ; par conséquent, sans octroi, l'utilisateur `datadog` ne voit aucune table. Accordez le privilège `REFERENCES` pour rendre les métadonnées de tableau visibles sans donner à l'Agent la capacité de lire les données du tableau :

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

`REFERENCES` est également requis pour collecter les valeurs de clé étrangère `delete_rule` et `update_rule` depuis `INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS` ; le privilège `SELECT` au niveau du tableau n'expose pas cette vue.

Consultez [Exploring Database Schemas][14] pour connaître les options de réglage `collect_schemas` disponibles.

## Installer l'Agent {#install-the-agent}

L'installation du Datadog Agent installe également le check MySQL, qui est utilisée pour surveiller MariaDB et est requise pour Database Monitoring sur MariaDB. Si vous n'avez pas encore installé l'Agent pour votre host de base de données MariaDB, consultez les [instructions d'installation de l'Agent][6].

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `mysql.d/conf.yaml`, dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][7] pour commencer à collecter vos [métriques](#metric-collection) et [logs](#log-collection-optional) MariaDB. Consultez l'[exemple mysql.d/conf.yaml][8] pour toutes les options de configuration disponibles, y compris celles pour les métriques personnalisées.

### Collecte de métriques {#metric-collection}

Ajoutez ce bloc de configuration à votre `mysql.d/conf.yaml` pour collecter les métriques MariaDB :

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]' # from the CREATE USER step earlier
```

**Remarque** : L'utilisateur `datadog` doit être configuré dans la configuration de l'intégration MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Alternativement, vous pouvez également utiliser `sock`.

Les métriques et les événements sont marqués avec `dbms_flavor:mariadb` afin que vous puissiez distinguer les données MariaDB des données MySQL.

[Redémarrez l'Agent][9] pour commencer à envoyer les métriques MariaDB à Datadog.

### Collecte de logs (facultatif) {#log-collection-optional}

Pour venir compléter la télémétrie recueillie depuis la base de données par l'Agent, vous pouvez envoyer directement à Datadog les logs de votre base de données.

1. Par défaut, MariaDB enregistre tout dans `/var/log/syslog`, ce qui nécessite un accès root pour la lecture. Pour rendre les logs plus accessibles, suivez ces étapes :

   1. Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et commentez toutes les lignes.
   2. Modifiez `/etc/mysql/my.cnf` pour activer les paramètres de journalisation souhaités. Par exemple, pour activer les logs généraux, d'erreurs et de requêtes lentes, utilisez la configuration suivante :

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 3
     ```

   3. Enregistrez le fichier et redémarrez MariaDB.
   4. Assurez-vous que l'Agent dispose d'un accès en lecture au répertoire `/var/log/mysql` et à tous les fichiers qu'il contient. Vérifiez à nouveau votre configuration `logrotate` pour vous assurer que ces fichiers sont pris en compte et que les autorisations sont correctement définies.
      Dans `/etc/logrotate.d/mysql-server` il devrait y avoir quelque chose de similaire à :

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La collecte de logs est désactivée par défaut dans le Datadog Agent, activez-la dans votre fichier `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour commencer à collecter vos logs MariaDB :

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

4. [Redémarrez l'Agent][9].

## Validez {#validate}

[Exécutez la sous-commande status de l'Agent][10] et recherchez `mysql` dans la section Checks, ou consultez la page [Databases][11] pour commencer.

## Dépannage {#troubleshooting}

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][12].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://mariadb.com/kb/en/performance-schema-overview/
[4]: https://mariadb.com/docs/server/reference/system-tables/performance-schema/performance-schema-system-variables
[5]: https://mariadb.com/docs/server/reference/sql-statements/account-management-sql-statements/create-user
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /fr/agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /fr/database_monitoring/setup_mariadb/troubleshooting/
[13]: /fr/database_monitoring/setup_mariadb/troubleshooting/#mariadb-known-limitations
[14]: /fr/database_monitoring/schema_explorer/