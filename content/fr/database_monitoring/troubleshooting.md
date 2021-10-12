---
title: Dépannage de la surveillance de base de données
kind: documentation
description: Dépannage de la configuration de la surveillance de base de données
---
{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">La surveillance de base de données n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la surveillance de base de données et explique comment les résoudre. Nous vous conseillons de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

## Diagnostiquer les problèmes courants

### Aucune donnée ne s'affiche après la configuration de la surveillance de base de données

Si vous ne voyez aucune donnée après avoir suivi les [instructions de configuration][1] et configuré l'Agent, le problème vient probablement de la configuration de l'Agent ou de la clé d'API. Assurez-vous que vous recevez des données de l'Agent en suivant le [guide de dépannage][2].

Si vous recevez d'autres données (telles que les métriques système) mais pas les données de surveillance de base de données (telles que les métriques de requête et les échantillons de requête), le problème vient probablement de la configuration de l'Agent ou de la base de données. Assurez-vous que la configuration de votre Agent ressemble à l'exemple dans les [instructions de configuration][1] et vérifiez bien l'emplacement des fichiers de configuration.

{{< tabs >}}
{{% tab "Postgres" %}}

Pour procéder au debugging, commencez par exécuter la [commande status de l'Agent][1] pour recueillir les informations de debugging concernant les données recueillies et envoyées à Datadog.

Vérifiez la section `Config Errors` pour vous assurer que le fichier de configuration est valide. Par exemple, le message d'erreur suivant indique une configuration d'instance manquante ou un fichier non valide :

```
  Config Errors
  ==============
    postgres
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

    postgres (8.0.5)
    ----------------
      Instance ID: postgres:d3dceb9fd36fd57e [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/postgres.d/conf.yaml
      Total Runs: 16,538
      Metric Samples: Last Run: 186, Total: 2,844,362
      Events: Last Run: 0, Total: 0
      Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
      Database Monitoring Query Samples: Last Run: 1, Total: 17,921
      Service Checks: Last Run: 1, Total: 16,538
      Average Execution Time : 1.765s
      Last Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      Last Successful Execution Date : 2021-07-26 19:16:58 UTC (1627327018000)
      metadata:
        version.major: 10
        version.minor: 17
        version.patch: 0
        version.raw: 10.17
        version.scheme: semver
```

Assurez-vous que les lignes suivantes figurent dans la sortie et présentent des valeurs supérieures à zéro :

```
Database Monitoring Query Metrics: Last Run: 2, Total: 24,274
Database Monitoring Query Samples: Last Run: 1, Total: 17,921
```

[1]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{% tab "MySQL" %}}

Pour procéder au debugging, commencez par exécuter la [commande status de l'Agent][1] pour recueillir les informations de debugging concernant les données recueillies et envoyées à Datadog.

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

[1]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

Si vous êtes certain que la configuration de l'Agent est correcte, [consultez les logs de l'Agent][3] pour vérifier la présence d'avertissements ou d'erreurs lors de la tentative d'exécution des intégrations de base de données.

Vous pouvez également exécuter explicitement un check en exécutant la commande CLI `check` sur l'Agent Datadog et en vérifiant la présence d'erreurs dans la sortie :

```bash
# Pour les installations auto-hébergées de l'Agent
datadog-agent check postgres -t 2
datadog-agent check mysql -t 2

# Pour les installations basées sur un conteneur de l'Agent
agent check postgres -t 2
agent check mysql -t 2
```

### Les métriques de requête sont manquantes

Avant de suivre ces étapes pour diagnostiquer les données de métrique de requête manquantes, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer les données manquantes de l'Agent](#aucune-donnee-ne-s-affiche-apres-la-configuration-de-la-surveillance-de-base-de-donnees).

{{< tabs >}}
{{% tab "Postgres" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| L'extension `pg_stat_statements` n'est pas installée ou n'est pas chargée dans la base de donnée appropriée. | L'extension doit être installée à l'aide de `shared_preload_libraries` dans votre configuration Postgres. (**Remarque** : un redémarrage du serveur est requis pour que les modifications soient appliquées après la modification de cette variable.) Vous devez ensuite exécuter `CREATE EXTENSION pg_stat_statements` dans toutes les bases de données auxquelles l'Agent se connecte. Par défaut, l'Agent se connecte à la base de données `postgres`. Pour obtenir des détails supplémentaires sur l'utilisation de cette variable dans votre configuration, consultez les [instructions de configuration][1]. |
| L'utilisateur `datadog` n'est pas autorisé à recueillir des statistiques de requête. | Pour accorder les autorisations appropriées à l'utilisateur `datadog`, consultez les [instructions de configuration][1] pour la version de votre base de données. |

Pour vérifier si `pg_stat_statements` est installé et accessible par l'utilisateur `datadog`, connectez-vous à la base de données `postgres` et essayez de lancer une requête en tant qu'utilisateur `datadog`. La requête devrait renvoyer au moins une ligne. Par exemple :

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

Si vous avez défini `dbname` sur une valeur différente de la valeur par défaut `postgres` dans la configuration de votre Agent, vous devez exécuter `CREATE EXTENSION pg_stat_statements` dans cette base de données.


[1]: /fr/database_monitoring/setup_postgres/
{{% /tab %}}
{{% tab "MySQL" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| L'option `performance_schema` n'est pas activée. | L'option `performance_schema` est activée par défaut par MySQL, mais peut être désactivée dans la configuration ou par votre fournisseur de solutions cloud. Suivez les [instructions de configuration][1] pour l'activation de `performance_schema`. |
| Le host est géré par Google Cloud SQL et ne prend pas en charge `performance_schema`. | En raison de limites liées à Google Cloud SQL, la surveillance de base de données Datadog [n'est pas prise en charge sur les instances avec moins de 26 Go de RAM][2]. | |


[1]: /fr/database_monitoring/setup_mysql/
[2]: https://cloud.google.com/sql/docs/mysql/flags#tips-performance-schema
{{% /tab %}}
{{< /tabs >}}

### Certaines requêtes sont manquantes

Si vous recevez des données pour certaines requêtes mais que d'autres sont manquantes dans la surveillance de base de données, suivez ce guide.

{{< tabs >}}
{{% tab "Postgres" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| Avec Postgres 9.6, si vous voyez uniquement les requêtes exécutées par l'utilisateur datadog, il est alors probable que certains paramètres soient manquants dans la configuration de l'instance. | Pour la surveillance d'instances sur Postgres 9.6, la configuration de l'instance de l'Agent Datadog doit utiliser les paramètres `pg_stat_statements_view: datadog.pg_stat_statements()` et `pg_stat_activity_view: datadog.pg_stat_activity()` selon les fonctions créées dans le guide de configuration initiale. Ces fonctions doivent être créées dans toutes les bases de données. |
| La requête n'est pas une « requête courante », ce qui signifie que son temps total d'exécution cumulé ne figure dans les 200 premières requêtes normalisées à aucun moment dans l'intervalle de temps sélectionné. | La requête a peut-être été ajoutée dans la ligne « Other Queries ». Pour en savoir plus sur les requêtes qui font l'objet d'un suivi, consultez [Données collectées][1]. Pour augmenter le nombre de requêtes courantes qui font l'objet d'un suivi, contactez l'assistance Datadog. |
| La requête n'est pas une requête SELECT, INSERT, UPDATE ou DELETE. | Par défaut, les fonctions non utilitaires ne font pas l'objet d'un suivi. Pour les recueillir, définissez le paramètre Postgres `pg_stat_statements.track_utility` sur `true`. Consultez la [documentation Postgres][2] pour en savoir plus. |
| La requête est exécutée dans une fonction ou une procédure stockée. | Pour effectuer le suivi de requêtes exécutées dans des fonctions ou procédures, définissez le paramètre de configuration `pg_stat_statements.track` sur `true`. Consultez la [documentation Postgres][2] pour en savoir plus. |
| Le paramètre de configuration Postgres `pg_stat_statements.max` est peut-être trop bas pour votre charge de travail. | Si un grand nombre de requêtes normalisées sont exécutées pendant une courte période (plusieurs milliers de requêtes normalisées uniques en 10 secondes), il est possible que le tampon dans `pg_stat_statements` ne parvienne pas à contenir toutes les requêtes normalisées. En augmentant cette valeur, vous pouvez améliorer la couverture des requêtes normalisées qui font l'objet d'un suivi et réduire l'impact des mises à jour intensives liées au SQL généré. **Remarque** : les requêtes avec des noms de colonne désordonnés ou qui utilisent des ARRAY de longueurs variables peuvent considérablement ralentir le traitement des requêtes normalisées. Par exemple, `SELECT ARRAY[1,2]` et `SELECT ARRAY[1,2,3]` sont suivies en tant que deux requêtes séparées dans `pg_stat_statements`. Pour en savoir plus sur le réglage de ce paramètre, consultez la section [Configuration avancée][3]. |



[1]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[2]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[3]: /fr/database_monitoring/setup_postgres/advanced_configuration/
{{% /tab %}}
{{% tab "MySQL" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| La requête n'est pas une « requête courante », ce qui signifie que son temps total d'exécution cumulé ne figure dans les 200 premières requêtes normalisées à aucun moment dans l'intervalle de temps sélectionné. | Elle a peut-être été ajoutée dans la ligne « Other Queries ». Pour en savoir plus sur les requêtes qui font l'objet d'un suivi, consultez [Données collectées][1]. Pour augmenter le nombre de requêtes courantes qui font l'objet d'un suivi, contactez l'assistance Datadog. |
| La table `events_statements_summary_by_digest` est peut-être pleine. | Le nombre de digests (requêtes normalisées) pouvant être stockés par la table MySQL `events_statements_summary_by_digest` dans `performance_schema` présente une limite maximale. Procédez régulièrement à la troncation de cette table dans le cadre des opérations de maintenance pour effectuer le suivi de toutes les requêtes au fil du temps. Consultez la section [Configuration avancée][2] pour en savoir plus. |



[1]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[2]: /fr/database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}


### Les paramètres de liaison de requête ne peuvent pas être affichés

Pour le moment, les paramètres de liaison de requête brute sont obfusqués dans les échantillons de requête et les explain plans, le caractère `?` étant utilisé à la place. Dans une prochaine version, nous ajouterons des paramètres permettant d'exposer les paramètres de liaison de requête non obfusqués.


### Les échantillons de requête sont tronqués

Il est possible que l'intégralité du texte SQL ne soit pas affiché pour les requêtes longues en raison de la configuration de la base de données. Des réglages sont nécessaires pour s'adapter à votre charge de travail.

{{< tabs >}}
{{% tab "Postgres" %}}

Le paramètre Postgres `track_activity_query_size` indique la taille maximale de l'instruction SQL que Postgres stocke et rend visible par l'Agent. Par défaut, cette valeur est de 1 024 octets. En définissant cette valeur sur 4 096, vous pourrez recueillir la plupart des requêtes pour la plupart des charges de travail. Toutefois, une valeur supérieure peut être appropriée si vos requêtes sont très complexes ou utilisent de très longs arrays.

Par exemple, la base de données tronquera les requêtes avec un array comportant de nombreux éléments, telles que :

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, … , 9999, 10000 ]) LIMIT 5
```

La requête normalisée résultante s'affiche dans l'application comme suit :

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

Pour éviter cette situation, définissez le paramètre `track_activity_query_size` sur une valeur suffisamment grande pour couvrir la plus grande taille attendue au niveau de vos requêtes. Pour en savoir plus, consultez la [documentation Postgres sur les statistiques de runtime][1].


[1]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
{{% /tab %}}
{{% tab "MySQL" %}}

La longueur de texte SQL MySQL visible par l'Agent Datadog est déterminée par les [variables système][1] suivantes :

```
max_digest_length=4096
performance_schema_max_digest_length=4096
performance_schema=4096
```

La plupart des charges de travail sont capables de recueillir la plupart des requêtes lorsque cette valeur est définie sur 4 096, mais vous devrez peut-être définir une valeur supérieure pour les requêtes particulièrement longues et complexes.

<!-- TODO: add a custom query recipe for getting the max sql text length -->


[1]: https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_digest_length
{{% /tab %}}
{{< /tabs >}}

### Les requêtes ne présentent pas d'explain plans

Une partie ou l'intégralité des requêtes ne présentent pas de plans. Ce problème peut être causé par des commandes de requête non prises en charge, des requêtes effectuées par des applications client non prises en charge, un Agent obsolète ou une configuration de base de données incomplète.

{{< tabs >}}
{{% tab "Postgres" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| La version de l'Agent qui s'exécute n'est pas prise en charge. | Assurez-vous que la version de l'Agent qui s'exécute est la version 7.30.0 ou une version ultérieure. Nous vous conseillons de mettre régulièrement à jour l'Agent pour profiter des dernières fonctionnalités, améliorations des performances et mises à jour de sécurité. |
| L'Agent n'est pas en mesure d'exécuter une fonction requise dans le schéma `datadog` de la base de données. | L'Agent exige que la fonction `datadog.explain_statement(...)` existe dans **toutes les bases de données** à partir desquelles l'Agent peut recueillir des requêtes. Assurez-vous que cette fonction a été créée par l'utilisateur root conformément aux [instructions de configuration][1] et que l'utilisateur `datadog` dispose de l'autorisation pour l'exécuter. |
| Les requêtes sont tronquées. | Consultez la section sur les [échantillons de requête tronqués](#les-echantillons-de-requete-sont-tronques) pour découvrir comment augmenter la taille du texte d'échantillon de requête. |
| Le client d'application utilisé pour exécuter la requête utilise le protocole de requête étendu Postgres ou des instructions préparées. | Certaines applications client utilisant le [protocole de requête étendu][2] Postgres ne prennent pas en charge la collecte d'explain plans en raison de la séparation des paramètres de requête parsée et de liaison brute. Par exemple, le client Python [asyncpg][3] et le client Go [pgx][4] utilisent le protocole de requête étendu par défaut. Pour contourner cette limite, vous pouvez configurer votre client de base de données de façon à utiliser le protocole de requête simple. Par exemple : définissez `preferQueryMode = simple` pour le [client JDBC Postgres][5] ou définissez `PreferSimpleProtocol` dans la configuration de la connexion [pgx][4]. |
| La requête est associée à une base de données ignorée par le paramètre `ignore_databases` de l'instance de l'Agent. | Les bases de données par défaut, telles que la base de données `postgres`, sont ignorées dans le paramètre `ignore_databases`. Les requêtes dans ces bases de données ne comporteront aucun échantillon ni aucun explain plan. Vérifiez la valeur de ce paramètre dans la configuration de votre instance et les valeurs par défaut dans l'[exemple de fichier de configuration][6]. |
| La requête ne peut pas être expliquée. | Certaines requêtes, telles que les requêtes BEGIN, COMMIT, SHOW, USE et ALTER, ne peuvent pas renvoyer un explain plan explication valide à partir de la base de données. Seules les requêtes SELECT, UPDATE, INSERT, DELETE et REPLACE sont prises en charge pour les explain plans. |
| La requête est relativement peu fréquente ou s'exécute très rapidement. | La requête n'a peut-être pas été sélectionnée pour être ajoutée dans l'échantillon, car elle ne représente pas une proportion significative du temps d'exécution total de la base de données. Pour recueillir la requête, nous vous conseillons d'essayer d'[augmenter les taux d'échantillonnage][7]. |


[1]: /fr/database_monitoring/setup_postgres/
[2]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[3]: https://github.com/MagicStack/asyncpg
[4]: https://github.com/jackc/pgx
[5]: https://jdbc.postgresql.org/documentation/head/connect.html
[6]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[7]: /fr/database_monitoring/setup_postgres/advanced_configuration
{{% /tab %}}
{{% tab "MySQL" %}}

| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| La version de l'Agent qui s'exécute n'est pas prise en charge. | Assurez-vous que la version de l'Agent qui s'exécute est la version 7.30.0 ou une version ultérieure. Nous vous conseillons de mettre régulièrement à jour l'Agent pour profiter des dernières fonctionnalités, améliorations des performances et mises à jour de sécurité. |
| L'Agent n'est pas en mesure d'exécuter une fonction requise dans ce schéma de la base de données. | L'Agent exige que la fonction `explain_statement(...)` existe dans **tous les schémas** à partir desquels l'Agent peut recueillir des échantillons. Assurez-vous que cette fonction a été créée par l'utilisateur root conformément aux [instructions de configuration][1] et que l'utilisateur `datadog` dispose de l'autorisation pour l'exécuter. |
| Les requêtes sont tronquées. | Consultez la section sur les [échantillons de requête tronqués](#les-echantillons-de-requete-sont-tronques) pour découvrir comment augmenter la taille du texte d'échantillon de requête. |
| La requête ne peut pas être expliquée. | Certaines requêtes, telles que les requêtes BEGIN, COMMIT, SHOW, USE et ALTER, ne peuvent pas renvoyer un explain plan explication valide à partir de la base de données. Seules les requêtes SELECT, UPDATE, INSERT, DELETE et REPLACE sont prises en charge pour les explain plans. |
| La requête est relativement peu fréquente ou s'exécute très rapidement. | La requête n'a peut-être pas été sélectionnée pour être ajoutée dans l'échantillon, car elle ne représente pas une proportion significative du temps d'exécution total de la base de données. Pour recueillir la requête, nous vous conseillons d'essayer d'[augmenter les taux d'échantillonnage][2]. |

[1]: /fr/database_monitoring/setup_mysql/
[2]: /fr/database_monitoring/setup_mysql/advanced_configuration/
{{% /tab %}}
{{< /tabs >}}


## Besoin d'aide supplémentaire ?

Si votre problème persiste, contactez l'[assistance Datadog][4] pour obtenir de l'aide.







[1]: /fr/database_monitoring/#getting-started
[2]: /fr/agent/troubleshooting/
[3]: /fr/agent/guide/agent-log-files
[4]: /fr/help/