---
description: Dépannage de la solution Database Monitoring
title: Dépannage de la solution Database Monitoring pour MySQL
---
Cette page détaille les problèmes courants liés à la configuration et à l'utilisation de Database Monitoring avec MySQL, ainsi que la manière de les résoudre. Datadog recommande de conserver la dernière version stable de l'Agent et de respecter la [documentation de configuration][1] la plus récente, car celle-ci peut changer avec les versions de l'Agent.

## Diagnostic des problèmes courants {#diagnosing-common-problems}

### Aucune donnée ne s'affiche après la configuration de Database Monitoring {#no-data-is-showing-after-configuring-database-monitoring}

Si vous ne voyez aucune donnée après avoir suivi les [instructions de configuration][1] et configuré l'Agent, il s'agit très probablement d'un problème de configuration de l'Agent ou de clé d'API. Assurez-vous de recevoir des données de l'Agent en suivant le [guide de dépannage][2].

Si vous recevez d'autres données, telles que des métriques système, mais pas les données de Database Monitoring (telles que les métriques de requête et les échantillons de requête), il y a probablement un problème avec la configuration de l'Agent ou de la base de données. Assurez-vous que votre configuration d'Agent ressemble à l'exemple dans les [instructions de configuration][1], en vérifiant deux fois l'emplacement des fichiers de configuration.

Pour procéder au débogage, commencez par exécuter la [commande status de l'Agent][3] pour recueillir les informations de débogage concernant les données recueillies et envoyées à Datadog.

Vérifiez la section `Config Errors` pour vous assurer que le fichier de configuration est valide. Par exemple, ce qui suit indique une configuration d'instance manquante ou un fichier non valide :

```
  Config Errors
  ==============
    mysql
    -----
      Configuration file contains no valid instances
```

Si la configuration est correcte, la sortie ressemble à ce qui suit :

```
=========
Collector
=========

  Running Checks
  ==============

    mysql (5.0.4)
    -------------
      Instance ID: mysql:505a0dd620ccaa2a
      Configuration Source: file:/etc/datadog-agent/conf.d/mysql.d/conf.yaml
      Total Runs: 32,439
      Metric Samples: Last Run: 175, Total: 5,833,916
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
      Database Monitoring Query Samples: Last Run: 1, Total: 74,451
      Service Checks: Last Run: 3, Total: 95,993
      Average Execution Time : 1.798s
      Last Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      Last Successful Execution Date : 2021-07-29 19:28:21 UTC (1627586901000)
      metadata:
        flavor: MySQL
        version.build: unspecified
        version.major: 5
        version.minor: 7
        version.patch: 34
        version.raw: 5.7.34+unspecified
        version.scheme: semver
```

Assurez-vous que les lignes suivantes figurent dans la sortie et présentent des valeurs supérieures à zéro :

```
Database Monitoring Query Metrics: Last Run: 2, Total: 51,074
Database Monitoring Query Samples: Last Run: 1, Total: 74,451
```

Si vous êtes certain que la configuration de l'Agent est correcte, [consultez les logs de l'Agent][4] pour vérifier la présence d'avertissements ou d'erreurs lors de la tentative d'exécution des intégrations de base de données.

Vous pouvez également exécuter explicitement un check en lançant la commande CLI `check` sur le Datadog Agent et en inspectant la sortie pour détecter d'éventuelles erreurs :

```bash
# For self-hosted installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# For container-based installations of the Agent
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### Les requêtes n'ont pas de plans d'exécution {#queries-are-missing-explain-plans}

Certaines ou toutes les requêtes peuvent ne pas avoir de plans disponibles. Cela peut être dû à des commandes de requête non prises en charge, à des requêtes effectuées par des applications clientes non prises en charge, à un Agent obsolète ou à une configuration de base de données incomplète. Vous trouverez ci-dessous les causes possibles de l'absence de plans d'exécution.

#### Consommateur d'instructions d'événement manquant {#events-statements-consumer-missing}
Pour capturer les plans d'exécution, vous devez activer un consommateur d'instructions d'événement. Vous pouvez le faire en ajoutant l'option suivante à vos fichiers de configuration (par exemple, `mysql.conf`) :

```
performance-schema-consumer-events-statements-current=ON
```

Datadog recommande également d'activer les éléments suivants :

```
performance-schema-consumer-events-statements-history-long=ON
```
Cette option permet le suivi d'un plus grand nombre de requêtes récentes sur tous les threads. Son activation augmente la probabilité de capturer les détails d'exécution des requêtes peu fréquentes.

#### Procédure de plan d'exécution manquante {#explain-plan-procedure-missing}
L'Agent nécessite que la procédure `datadog.explain_statement(...)` existe dans le schéma `datadog`. Lisez les [instructions de configuration][1] pour plus de détails sur la création du schéma `datadog`.

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
#### Procédure de plan d'exécution entièrement qualifiée manquante {#explain-plan-fq-procedure-missing}
L'Agent nécessite que la procédure `explain_statement(...)` existe dans **tous les schémas** à partir desquels l'Agent peut collecter des échantillons.

Créez cette procédure **dans chaque schéma** à partir duquel vous souhaitez collecter des plans d'exécution. Remplacez `<YOUR_SCHEMA>` par votre schéma de base de données :

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

#### L'Agent exécute une version non prise en charge {#agent-is-running-an-unsupported-version}

Assurez-vous que l'Agent exécute la version 7.36.1 ou une version ultérieure. Datadog recommande de mettre régulièrement à jour l'Agent pour bénéficier des nouvelles fonctionnalités, des améliorations de performances et des mises à jour de sécurité.

#### Les requêtes sont tronquées {#queries-are-truncated}

Consultez la section sur les [échantillons de requêtes tronqués](#query-samples-are-truncated) pour obtenir des instructions sur la façon d'augmenter la taille du texte des exemples de requêtes.

#### La requête ne peut pas être expliquée {#query-cannot-be-explained}

Certaines requêtes telles que BEGIN, COMMIT, SHOW, USE et ALTER ne peuvent pas produire un plan d'exécution valide à partir de la base de données. Seules les requêtes SELECT, UPDATE, INSERT, DELETE et REPLACE prennent en charge les plans d'exécution.

#### La requête est relativement peu fréquente ou s'exécute rapidement {#query-is-relatively-infrequent-or-executes-quickly}

Il est possible que la requête n'ait pas été échantillonnée pour la sélection car elle ne représente pas une proportion significative du temps d'exécution total de la base de données. Essayez d'[augmenter les taux d'échantillonnage][5] pour capturer la requête.

### Les métriques de requête sont manquantes {#query-metrics-are-missing}

Avant de suivre ces étapes pour diagnostiquer les données de métriques de requête manquantes, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer les données d'agent manquantes](#no-data-is-showing-after-configuring-database-monitoring). Voici les causes possibles de l'absence de métriques de requête.

### Les métriques d'index sont manquantes {#index-metrics-are-missing}

Si l'Agent affiche cette erreur :

```
Error querying mysql.innodb_index_stats: (1142, "SELECT command denied to user 'datadog'@'172.20.0.5' for table 'innodb_index_stats'")
```
Résolvez l'erreur en accordant à l'utilisateur `datadog` le privilège SELECT pour collecter les métriques d'index :

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

#### `performance_schema` n'est pas activé {#performance-schema-not-enabled}
L'Agent nécessite que l'option `performance_schema` soit activée. Elle est activée par défaut par MySQL, mais peut être désactivée dans la configuration ou par votre fournisseur cloud. Suivez les [instructions de configuration][1] pour l'activer.

#### Limitation de Google Cloud SQL {#google-cloud-sql-limitation}
Le host est géré par Google Cloud SQL et ne prend pas en charge `performance_schema`. En raison des limitations de Google Cloud SQL, Datadog Database Monitoring n'est [pas pris en charge sur les instances avec moins de 16 Go de RAM][6].

### Certaines requêtes sont manquantes {#certain-queries-are-missing}

Si vous recevez des données pour certaines requêtes mais que d'autres sont manquantes dans la section Database Monitoring, suivez ce guide.


| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| La requête n'est pas une « requête principale », ce qui signifie que la somme de son temps d'exécution total ne figure pas parmi les 200 premières requêtes normalisées à aucun moment de la période sélectionnée. | Elle peut être regroupée dans la ligne « Autres requêtes ». Pour plus d'informations sur les requêtes suivies, consultez [Données collectées][7]. Le nombre de requêtes principales suivies peut être augmenté en contactant le support Datadog. |
| Le `events_statements_summary_by_digest` est peut-être plein. | Le tableau MySQL `events_statements_summary_by_digest` dans `performance_schema` a une limite maximale sur le nombre de résumés (requêtes normalisées) qu'elle stocke. La troncature régulière de ce tableau en tant que tâche de maintenance garantit que toutes les requêtes sont suivies au fil du temps. Consultez [Configuration avancée][5] pour plus d'informations. |
| La requête a été exécutée une seule fois depuis le dernier redémarrage de l'Agent. | Les métriques de requête ne sont émises qu'après avoir été exécutées au moins une fois sur deux intervalles distincts de dix secondes depuis le redémarrage de l'Agent. |

### Les échantillons de requêtes sont tronqués {#query-samples-are-truncated}

Les requêtes plus longues peuvent ne pas afficher leur texte SQL complet en raison de la configuration de la base de données. Un réglage est nécessaire pour s'adapter à votre charge de travail.

La longueur de texte SQL MySQL visible par le Datadog Agent est déterminée par les [variables système][8] suivantes :

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### L'activité des requêtes est manquante {#query-activity-is-missing}

<div class="alert alert-danger">La collecte de l'activité de requête et des événements d'attente n'est pas prise en charge pour Flexible Server, car ces fonctionnalités nécessitent des paramètres MySQL qui ne sont pas disponibles sur un host Flexible Server.</div>

Avant de suivre ces étapes pour diagnostiquer une activité de requête manquante, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer les données d'agent manquantes](#no-data-is-showing-after-configuring-database-monitoring). Voici les causes possibles de l'absence d'activité de requête.

#### `performance-schema-consumer-events-waits-current` n'est pas activé {#events-waits-current-not-enabled}
L'Agent nécessite que l'option `performance-schema-consumer-events-waits-current` soit activée. Elle est désactivée par défaut par MySQL, mais peut être activée par votre fournisseur cloud. Suivez les [instructions de configuration][1] pour l'activer. Alternativement, pour éviter de redémarrer votre base de données, envisagez de configurer un consommateur de configuration à l'exécution. Créez la procédure suivante pour donner à l'Agent la capacité d'activer les consommateurs `performance_schema.events_*` au moment de l'exécution.


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

**Remarque :** Cette option nécessite également que `performance_schema` soit activé.


<!-- TODO: add a custom query recipe for getting the max sql text length -->

### Des tableaux sont manquants dans les schémas collectés {#tables-are-missing-from-collected-schemas}

Si l'Agent consigne un avertissement commençant par :

```
No tables were found across any of the N databases.
```
MySQL n'expose un tableau dans `INFORMATION_SCHEMA` qu'aux utilisateurs qui détiennent un privilège sur cette table, donc l'utilisateur `datadog` ne voit aucun tableau sans privilège. Résolvez l'avertissement en accordant le privilège `REFERENCES`, ce qui rend les métadonnées de votre tableau visibles sans donner à l'Agent la capacité de lire vos données :

```sql
GRANT REFERENCES ON *.* TO datadog@'%';
```

Si seuls certains tableaux sont manquants, vérifiez que l'octroi les couvre. Un privilège limité à des colonnes individuelles n'expose que les colonnes accordées, et un privilège limité à une base de données ou un tableau ne couvre que cette base de données ou cette table. Consultez [Collecting schemas][10] pour les périmètres disponibles.

### Schéma ou base de données manquant sur les métriques et échantillons de requêtes MySQL {#schema-or-database-missing-on-mysql-query-metrics-samples}

Le tag `schema` (également appelée « database ») est présent sur les métriques et échantillons de requêtes MySQL uniquement lorsqu'une base de données par défaut est définie sur la connexion qui a effectué la requête. La base de données par défaut est configurée par l'application en spécifiant le « schema » dans les paramètres de connexion à la base de données, ou en exécutant l'[instruction USE][9] sur une connexion déjà existante.

Si aucune base de données par défaut n'est configurée pour une connexion, alors aucune des requêtes effectuées par cette connexion ne porte le tag `schema`.

## Limitations connues de MariaDB {#mariadb-known-limitations}

Si vous utilisez MariaDB, consultez [Limitations connues de MariaDB][14] dans le guide de dépannage de MariaDB.

[1]: /fr/database_monitoring/setup_mysql/
[2]: /fr/agent/troubleshooting/
[3]: /fr/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /fr/agent/configuration/agent-log-files
[5]: /fr/database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html
[10]: /fr/database_monitoring/setup_mysql/selfhosted/?tab=mysql57#collecting-schemas
[14]: /fr/database_monitoring/setup_mariadb/troubleshooting/#mariadb-known-limitations