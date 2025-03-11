---
description: Dépannage de la solution Database Monitoring
title: Dépannage de la solution Database Monitoring pour MySQL
---
{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la solution Database Monitoring avec MySQL et explique comment les résoudre. Datadog recommande de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

## Diagnostiquer les problèmes courants

### Aucune donnée ne s'affiche après la configuration du Database Monitoring

Si vous ne voyez aucune donnée après avoir suivi les [instructions de configuration][1] et configuré l'Agent, le problème vient probablement de la configuration de l'Agent ou de la clé d'API. Assurez-vous que vous recevez des données de l'Agent en suivant le [guide de dépannage][2].

Si vous recevez d'autres données (telles que les métriques système) mais pas les données Database Monitoring (telles que les métriques de requête et les échantillons de requête), le problème vient probablement de la configuration de l'Agent ou de la base de données. Assurez-vous que la configuration de votre Agent ressemble à l'exemple dans les [instructions de configuration][1] et vérifiez bien l'emplacement des fichiers de configuration.

Pour procéder au debugging, commencez par exécuter la [commande status de l'Agent][3] pour recueillir les informations de debugging concernant les données recueillies et envoyées à Datadog.

Vérifiez la section `Config Errors` pour vous assurer que le fichier de configuration est valide. Par exemple, le message d'erreur suivant indique une configuration d'instance manquante ou un fichier non valide :

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

Vous pouvez également exécuter explicitement un check en exécutant la commande CLI `check` sur l'Agent Datadog et en vérifiant la présence d'erreurs dans la sortie :

```bash
# Pour les installations de l'Agent auto-hébergées
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true datadog-agent check sqlserver -t 2

# Pour les installations de l'Agent basées sur un conteneur
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check postgres -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check mysql -t 2
DD_LOG_LEVEL=debug DBM_THREADED_JOB_RUN_SYNC=true agent check sqlserver -t 2
```
### Les requêtes ne présentent pas de plans d'exécution

Une partie ou l'intégralité des requêtes ne présentent pas de plans. Ce problème peut être causé par des commandes de requête non prises en charge, des requêtes effectuées par des applications client non prises en charge, un Agent obsolète ou une configuration de base de données incomplète. Vous trouverez ci-dessous les causes possibles de l'absence de plans d'exécution.

#### La procédure des plans d'exécution est manquante {#procedure-plans-execution-manquante}
L'Agent nécessite que la procédure `datadog.explain_statement(...)` soit présente dans le schéma `datadog`. Lisez les [instructions de configuration][1] pour en savoir plus sur la création du schéma `datadog`.

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
#### La procédure complète des plans d'exécution est manquante {#procedure-complete-plans-execution-manquante}
L'Agent nécessite que la procédure `explain_statement(...)` soit présente dans **tous les schémas** à partir desquels l'Agent peut collecter des échantillons.

Créez la procédure suivante **dans chaque schéma** pour lesquels vous souhaitez recueillir des plans d'exécution. Remplacez `<VOTRE_SCHÉMA>` par le schéma de votre base de données :

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

#### La version de l'Agent qui s'exécute n'est pas prise en charge

Assurez-vous que la version de l'Agent qui s'exécute est la version 7.36.1 ou une version ultérieure. Datadog recommande de mettre régulièrement à jour l'Agent pour profiter des dernières fonctionnalités, améliorations des performances et mises à jour de sécurité.

#### Les requêtes sont tronquées

Consultez la section sur les [échantillons de requête tronqués](#les-echantillons-de-requete-sont-tronques) pour découvrir comment augmenter la taille du texte d'échantillon de requête.

#### La requête ne prend pas en charge les plans d'exécution

Certaines requêtes, telles que les requêtes BEGIN, COMMIT, SHOW, USE et ALTER, ne peuvent pas renvoyer un plan d'exécution valide à partir de la base de données. Seules les requêtes SELECT, UPDATE, INSERT, DELETE et REPLACE sont prises en charge pour les plans d'exécution.

#### La requête est relativement peu fréquente ou s'exécute rapidement

La requête n'a peut-être pas été sélectionnée pour être ajoutée dans l'échantillon, car elle ne représente pas une proportion significative du temps d'exécution total de la base de données. Pour recueillir la requête, nous vous conseillons d'essayer d'[augmenter les taux d'échantillonnage][5].

### Les métriques de requête sont manquantes

Avant de suivre ces étapes pour diagnostiquer un problème de métriques de requête manquantes, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer une absence de données de l'Agent](#aucune-donnee-ne-s-affiche-apres-la-configuration-de-database-monitoring). Vous trouverez ci-dessous les causes possibles de l'absence de métriques de requête.

#### L'option `performance_schema` n'est pas activée {#performance-schema-non-active}
L'Agent nécessite que l'option `performance_schema` soit activée. Elle est activée par défaut par MySQL, mais peut être désactivée dans la configuration ou par votre fournisseur de solutions cloud. Suivez les [instructions de configuration][1] pour activer cette option.

#### Limitation de Google Cloud SQL
Le host est géré par Google Cloud SQL et ne prend pas en charge l'option `performance_schema`. En raison de limites liées à Google Cloud SQL, la solution Database Monitoring de Datadog [n'est pas prise en charge sur les instances avec moins de 26 Go de RAM][2].

### Certaines requêtes sont manquantes

Si vous recevez des données pour certaines requêtes mais que d'autres sont manquantes dans la section Database Monitoring, suivez ce guide.


| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| La requête n'est pas une « requête courante », ce qui signifie que son temps total d'exécution cumulé ne figure dans les 200 premières requêtes normalisées à aucun moment dans l'intervalle de temps sélectionné. | Elle a peut-être été comptabilisée dans la ligne « Other Queries ». Pour en savoir plus sur les requêtes qui font l'objet d'un suivi, consultez [Données collectées][7]. Pour augmenter le nombre de requêtes courantes qui font l'objet d'un suivi, contactez l'assistance Datadog. |
| La table `events_statements_summary_by_digest` est peut-être pleine. | Le nombre de digests (requêtes normalisées) pouvant être stockés par la table MySQL `events_statements_summary_by_digest` dans `performance_schema` présente une limite maximale. Procédez régulièrement à la troncation de cette table dans le cadre des opérations de maintenance pour effectuer le suivi de toutes les requêtes au fil du temps. Consultez la section [Configuration avancée][5] pour en savoir plus. |
| La requête n'a été exécutée qu'une fois depuis le dernier redémarrage de l'Agent. | Les métriques de requêtes ne sont émises qu'après avoir été exécutées au moins une fois au cours de deux intervalles distincts de dix secondes depuis le dernier redémarrage de l'Agent. |

### Les échantillons de requête sont tronqués

Il est possible que seule une partie du texte SQL ne s'affiche pour les requêtes longues en raison de la configuration de la base de données. Des ajustements sont nécessaires pour s'adapter à votre charge de travail.

La longueur de texte SQL MySQL visible par l'Agent Datadog est déterminée par les [variables système][8] suivantes :

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema_max_sql_text_length=4096
```

### Les activités de requête sont manquantes

Avant de suivre ces étapes pour diagnostiquer un problème d'activités de requête manquantes, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer une absence de données de l'Agent](#aucune-donnee-ne-s-affiche-apres-la-configuration-de-database-monitoring). Vous trouverez ci-dessous les causes possibles de l'absence d'activités de requête.

#### L'option `performance-schema-consumer-events-waits-current` n'est pas activée {#events-waits-current-non-active}
L'Agent nécessite que l'option `performance-schema-consumer-events-waits-current` soit activée. Elle est désactivée par défaut par MySQL, mais peut être activée par votre fournisseur de solutions cloud. Suivez les [instructions de configuration][1] pour activer cette option. Si vous souhaitez éviter de redémarrer votre base de données, vous pouvez également ajouter un consommateur de configuration à l'exécution. Créez la procédure suivante pour permettre à l'Agent d'activer les consommateurs `performance_schema.events_*` à l'exécution.


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

**Remarque :** cette option nécessite que l'option `performance_schema` soit également activée.


<!-- TODO: add a custom query recipe for getting the max sql text length -->

### Tag Schema ou Database manquant dans les métriques et échantillons de requêtes MySQL

Le tag `schema` (également désigné « database ») est uniquement présent dans les métriques et échantillons de requêtes MySQL lorsqu'une base de données par défaut a été définie pour la connexion à l'origine de la requête. La base de données par défaut est configurée par l'application, en spécifiant le « schema » dans les paramètres de la connexion de la base de données ou en exécutant une [instruction USE][9] sur une connexion existante.

Si aucune base de données par défaut n'est configurée pour une connexion, alors les requêtes effectuées par cette connexion ne présentent pas le tag `schema`.

[1]: /fr/database_monitoring/setup_mysql/
[2]: /fr/agent/troubleshooting/
[3]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /fr/agent/guide/agent-log-files
[5]: /fr/database_monitoring/setup_mysql/advanced_configuration/
[6]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
[7]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[8]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
[9]: https://dev.mysql.com/doc/refman/8.0/en/use.html