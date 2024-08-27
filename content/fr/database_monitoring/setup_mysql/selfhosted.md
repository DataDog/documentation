---
description: Installez et configurez Database Monitoring pour MySQL auto-hébergé.
further_reading:
- link: /integrations/mysql/
  tag: Documentation
  text: Intégration MySQL basique
title: Configuration de Database Monitoring pour MySQL auto-hébergé
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données MySQL, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des données sur les connexions, des métriques système et des données de télémétrie à propos du moteur de stockage InnoDB.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données MySQL :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-mysql)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer l'Agent](#installer-l-agent)

## Avant de commencer

Versions de MySQL prises en charge
: 5.6, 5.7 et 8.0+

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][1]).

Proxies, répartiteurs de charge et outils de regroupement de connexions
: L'Agent doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, il est préférable d'utiliser `127.0.0.1` ou le socket. L'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge ni un outil de groupement de connexions. Bien qu'il puisse s'agir d'un antipattern pour des applications client, chaque Agent doit connaître le hostname sous-jacent et rester sur un seul host pendant toute sa durée de vie, même en cas de failover. Si l'Agent Datadog se connecte à plusieurs hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][2] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres MySQL

Pour recueillir des métriques de requête, des échantillons et des plans d'exécution, activez le [schéma de performance MySQL][3] et configurez les [options connexes][4] suivantes, que ce soit dans l'interface de ligne de commande ou dans les fichiers de configuration (comme `mysql.conf`) :

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| Paramètre | Valeur | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Requis. Active le schéma de performance. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes volumineuses. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne sont pas recueilles. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Requis. Active la surveillance des requêtes en cours d'exécution. |
| `performance-schema-consumer-events-waits-current` | `ON` | Requis. Active la collecte des événements d'attente. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recommandé. Active le suivi d'un grand nombre de requêtes récentes sur l'ensemble des threads. Si vous activez cette fonctionnalité, cela augmente la probabilité d'enregistrer des détails sur l'exécution de requêtes occasionnelles. |
| `performance-schema-consumer-events-statements-history` | `ON` | Facultatif. Active le suivi des requêtes récentes pour un thread spécifique. Si vous activez cette fonctionnalité, cela augmente la probabilité d'enregistrer des détails sur l'exécution de requêtes occasionnelles. |
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| Paramètre | Valeiur | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Requis. Active le schéma de performance. |
| `max_digest_length` | `4096` | Requis pour la collecte de requêtes volumineuses. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne sont pas recueilles. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Doit correspondre à la valeur de `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Requis. Active la surveillance des requêtes en cours d'exécution. |
| `performance-schema-consumer-events-waits-current` | `ON` | Requis. Active la collecte des événements d'attente. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recommandé. Active le suivi d'un grand nombre de requêtes récentes sur l'ensemble des threads. Si vous activez cette fonctionnalité, cela augmente la probabilité d'enregistrer des détails sur l'exécution de requêtes occasionnelles. |
| `performance-schema-consumer-events-statements-history` | `ON` | Facultatif. Active le suivi des requêtes récentes pour un thread spécifique. Si vous activez cette fonctionnalité, cela augmente la probabilité d'enregistrer des détails sur l'exécution de requêtes occasionnelles. |
{{% /tab %}}
{{< /tabs >}}


**Remarque** : nous vous recommandons d'autoriser l'Agent à activer les paramètres `performance-schema-consumer-*` de façon dynamique lors de l'exécution, durant l'étape d'attribution d'un accès à l'Agent. Consultez la rubrique [Exécuter les consommateurs de configuration](#executer-les-consommateurs-de-configuration).

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour la base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les instructions suivantes autorisent l'Agent à se connecter depuis n'importe quel host à l'aide de `datadog@'%'`. Vous pouvez restreindre l'utilisateur `datadog` avec `datadog@'localhost'`, de façon à ce qu'il soit uniquement autorisé à se connecter depuis localhost. Consultez la [documentation MYSQL][5] (en anglais) pour en savoir plus.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED by '<MOT_DE_PASSE_UNIQUE>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 et 5.7" %}}

Créez l'utilisateur `datadog` et accordez-lui des autorisations de base :

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<MOT_DE_PASSE_UNIQUE>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Créez le schéma suivant :

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Créez la procédure `explain_statement` afin d'activer la collecte de plans d'exécution par l'Agent :

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

Créez également la procédure suivante **dans chaque schéma** pour lesquels vous souhaitez recueillir des plans d'exécution. Remplacez `<VOTRE_SCHÉMA>` par le schéma de votre base de données :

```sql
DELIMITER $$
CREATE PROCEDURE <VOTRE_SCHÉMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <VOTRE_SCHÉMA>.explain_statement TO datadog@'%';
```

### Exécuter les consommateurs de configuration
Datadog vous conseille de créer la procédure suivante afin d'autoriser l'Agent à activer les consommateurs `performance_schema.events_*` lors de l'exécution.

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

## Installer l'Agent

L'installation de l'Agent Datadog entraîne également l'installation du check MySQL requis pour utiliser la solution Database Monitoring sur MySQL. Si vous n'avez pas encore installé l'Agent pour le host de votre base de données MySQL, consultez les [instructions d'installation de l'Agent][6].

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

Modifiez le fichier `mysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs-facultatif) MySQL. Consultez le [fichier d'exemple mysql.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles, y compris pour les métriques custom.

### Collecte de métriques

Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour recueillir des métriques MySQL :

```yaml
init_config:

instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: '<MOT_DE_PASSE_CHOISI>' # Le mot de passé créé auparavant lors de l'étape CREATE USER
```

**Remarque** : ajoutez des guillemets simples autour de votre mot de passe s'il contient un caractère spécial.

Notez que l'utilisateur `datadog` doit être défini dans la configuration de l'intégration MySQL en tant que `host: 127.0.0.1` au lieu de `localhost`. Vous pouvez également utiliser `sock`.

[Redémarrez l'Agent][9] pour commencer à envoyer des métriques MySQL à Datadog.

### Collecte de logs (facultatif)

Pour venir compléter la télémétrie recueillie depuis la base de données par l'Agent, vous pouvez envoyer directement à Datadog les logs de votre base de données.

1. Par défaut, MySQL enregistre tous ses logs dans `/var/log/syslog`, dont la lecture nécessite un accès root. Pour rendre les logs plus accessibles, voici les étapes à suivre :

   1. Modifiez `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` et mettez en commentaire toutes les lignes.
   2. Modifiez `/etc/mysql/my.cnf` pour activer les paramètres de journalisation de votre choix. Par exemple, pour activer les logs globaux, d'erreur et de requêtes lentes, utilisez la configuration suivante :

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

   3. Enregistrez le fichier et redémarrez MySQL.
   4. Assurez-vous que l'Agent dispose d'une autorisation de lecture pour le répertoire `/var/log/mysql` et tous ses fichiers. Vérifiez votre configuration `logrotate` pour vous assurer que ces fichiers sont pris en compte et que les autorisations sont correctement définies.
      Dans `/etc/logrotate.d/mysql-server`, vous devriez voir des lignes similaires à ce qui suit :

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

3. Ajoutez ce bloc de configuration à votre fichier `mysql.d/conf.yaml` pour commencer à recueillir vos logs MySQL :

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
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

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

## Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `mysql` dans la section Checks. Vous pouvez également visiter la page [Databases][11] pour commencer à surveiller vos bases de données.

## Exemple de configurations de l'Agent
{{% dbm-mysql-agent-config-examples %}}

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][12].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage#agent-overhead
[2]: /fr/database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /fr/database_monitoring/troubleshooting/?tab=mysql