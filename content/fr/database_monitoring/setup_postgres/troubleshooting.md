---
description: Dépannage de la solution Database Monitoring pour Postgres
title: Dépannage de la solution Database Monitoring pour Postgres
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

Cette page décrit les problèmes courants liés à la configuration et à l'utilisation de la solution Database Monitoring avec Postgres et explique comment les résoudre. Datadog recommande de rester sur la dernière version stable de l'Agent et de suivre les dernières [instructions de configuration][1], car elles peuvent changer en fonction des versions de l'Agent.

## Diagnostiquer les problèmes courants

### Aucune donnée ne s'affiche après la configuration du Database Monitoring

Si vous ne voyez aucune donnée après avoir suivi les [instructions de configuration][1] et configuré l'Agent, le problème vient probablement de la configuration de l'Agent ou de la clé d'API. Assurez-vous que vous recevez des données de l'Agent en suivant le [guide de dépannage][2].

Si vous recevez d'autres données (telles que les métriques système) mais pas les données Database Monitoring (telles que les métriques de requête et les échantillons de requête), le problème vient probablement de la configuration de l'Agent ou de la base de données. Assurez-vous que la configuration de votre Agent ressemble à l'exemple dans les [instructions de configuration][1] et vérifiez bien l'emplacement des fichiers de configuration.

Pour procéder au debugging, commencez par exécuter la [commande status de l'Agent][3] pour recueillir les informations de debugging concernant les données recueillies et envoyées à Datadog.

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
### Les métriques de requête sont manquantes

Avant de suivre ces étapes pour diagnostiquer un problème de métriques de requête manquantes, assurez-vous que l'Agent s'exécute correctement et que vous avez suivi [les étapes pour diagnostiquer une absence de données de l'Agent](#aucune-donnee-ne-s-affiche-apres-la-configuration-de-database-monitoring). Vous trouverez ci-dessous les causes possibles de l'absence de métriques de requête.

#### L'extension pg_stat_statements ne se charge pas {#l-extension-pg-stat-statements-ne-se-charge-pas}
L'extension `pg_stat_statements` ne se charge pas. Elle doit être chargée via `shared_preload_libraries` dans votre configuration Postgres. **Remarque** : pour appliquer les modifications apportées à cette variable, vous devez redémarrer le serveur. Pour en savoir plus sur le chargement de cette extension, consultez les [instructions de configuration][1].

#### L'extension pg_stat_statements n'est pas créée dans la base de données {#l-extension-pg-stat-statements-n-est-pas-creee-dans-la-base-de-donnees}
L'extension `pg_stat_statements` n'est pas installée dans la bonne base de données. Vous devez exécuter `CREATE EXTENSION pg_stat_statements` dans toutes les bases de données auxquelles l'Agent se connecte. Par défaut, l'Agent se connecte à la base de données `postgres`. Pour obtenir des détails supplémentaires sur l'utilisation de cette variable dans votre configuration, consultez les [instructions de configuration][1].

Pour vérifier si `pg_stat_statements` est installé et accessible par l'utilisateur `datadog`, connectez-vous à la base de données `postgres` et essayez de lancer une requête en tant qu'utilisateur `datadog`. La requête devrait renvoyer au moins une ligne. Par exemple :

```bash
psql -h localhost -U datadog -d postgres -c "select * from pg_stat_statements LIMIT 1;"
```

Si vous avez défini `dbname` sur une valeur différente de la valeur par défaut `postgres` dans la configuration de votre Agent, vous devez exécuter `CREATE EXTENSION pg_stat_statements` dans cette base de données.

Si vous avez créé l'extension dans votre base de données cible et que cet avertissement apparaît quand même, cela signifie que l'extension a peut-être été créée dans un schéma auquel l'utilisateur `datadog` ne peut pas accéder. Pour vous en assurer, exécutez cette commande pour vérifier dans quel schéma `pg_stat_statements` a été créé :

```bash
psql -h localhost -U datadog -d postgres -c "select nspname from pg_extension, pg_namespace where extname = 'pg_stat_statements' and pg_extension.extnamespace = pg_namespace.oid;"
```

Exécutez ensuite cette commande pour vérifier les schémas auxquels l'utilisateur `datadog` a accès :

```bash
psql -h localhost -U datadog -d <votre_base_de_données> -c "show search_path;"
```

Si le schéma `pg_stat_statements` ne se trouve pas dans le `search_path` de l'utilisateur `datadog`, vous devez l'ajouter à l'utilisateur `datadog`. Par exemple :

```sql
ALTER ROLE datadog SET search_path = "$user",public,schema_with_pg_stat_statements;
```

### Certaines requêtes sont manquantes

Si vous recevez des données pour certaines requêtes, mais que celles d'une ou de plusieurs requêtes spécifiques sont manquantes dans la section Database Monitoring, suivez ce guide.
| Cause possible                         | Solution                                  |
|----------------------------------------|-------------------------------------------|
| Avec Postgres 9.6, si vous voyez uniquement les requêtes exécutées par l'utilisateur datadog, il est alors probable que certains paramètres soient manquants dans la configuration de l'instance. | Pour la surveillance d'instances sur Postgres 9.6, la configuration de l'instance de l'Agent Datadog doit utiliser les paramètres `pg_stat_statements_view: datadog.pg_stat_statements()` et `pg_stat_activity_view: datadog.pg_stat_activity()` selon les fonctions créées dans le guide de configuration initiale. Ces fonctions doivent être créées dans toutes les bases de données. |
| La requête n'est pas une « requête courante », ce qui signifie que son temps total d'exécution cumulé ne figure dans les 200 premières requêtes normalisées à aucun moment dans l'intervalle de temps sélectionné. | La requête a peut-être été comptabilisée dans la ligne « Other Queries ». Pour en savoir plus sur les requêtes qui font l'objet d'un suivi, consultez la documentation relative aux [données collectées][5]. Pour augmenter le nombre de requêtes courantes qui font l'objet d'un suivi, contactez l'assistance Datadog. |
| La requête n'est pas une requête SELECT, INSERT, UPDATE ou DELETE. | Par défaut, les fonctions non utilitaires ne font pas l'objet d'un suivi. Pour les recueillir, définissez le paramètre Postgres `pg_stat_statements.track_utility` sur `true`. Consultez la [documentation Postgres][6] (en anglais) pour en savoir plus. |
| La requête est exécutée dans une fonction ou une procédure stockée. | Pour effectuer le suivi des requêtes exécutées dans des fonctions ou procédures, définissez le paramètre de configuration `pg_stat_statements.track` sur `true`. Consultez la [documentation Postgres][6] (en anglais) pour en savoir plus. |
| Le paramètre de configuration Postgres `pg_stat_statements.max` est peut-être trop bas pour votre workload. | Si un grand nombre de requêtes normalisées sont exécutées pendant une courte période (plusieurs milliers de requêtes normalisées uniques en 10 secondes), il est possible que le buffer dans `pg_stat_statements` ne parvienne pas à contenir toutes les requêtes normalisées. En augmentant cette valeur, vous pouvez améliorer la couverture des requêtes normalisées qui font l'objet d'un suivi et réduire l'impact des mises à jour intensives liées au SQL généré. **Remarque** : les requêtes avec des noms de colonne désordonnés ou qui utilisent des ARRAY de longueurs variables peuvent considérablement ralentir le traitement des requêtes normalisées. Par exemple, `SELECT ARRAY[1,2]` et `SELECT ARRAY[1,2,3]` sont suivies en tant que deux requêtes séparées dans `pg_stat_statements`. Pour en savoir plus sur le réglage de ce paramètre, consultez la documentation sur la [configuration avancée][7]. |
| Les métriques de requêtes ne sont émises qu'après avoir été exécutées au moins une fois au cours de deux intervalles distincts de dix secondes depuis le dernier redémarrage de l'Agent. |

### Les échantillons de requête sont tronqués

Il est possible que seule une partie du texte SQL ne s'affiche pour les requêtes longues en raison de la configuration de la base de données. Des ajustements sont nécessaires pour l'adapter à votre workload.

Le paramètre Postgres `track_activity_query_size` indique la taille maximale de l'instruction SQL que Postgres stocke et rend visible par l'Agent. Par défaut, cette valeur est de 1024 octets. En définissant cette valeur sur 4096, vous pourrez recueillir la plupart des requêtes pour la plupart des workloads. Toutefois, une valeur supérieure peut être appropriée si vos requêtes sont complexes ou utilisent de longs arrays.

Par exemple, la base de données tronquera les requêtes avec un array comportant de nombreux éléments, telles que :

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[11, 12, 13, ... , 9999, 10000 ]) LIMIT 5
```

La requête normalisée résultante s'affiche dans l'application comme suit :

```sql
SELECT DISTINCT address FROM customers WHERE id = ANY(ARRAY[ ?
```

Pour éviter cette situation, définissez le paramètre `track_activity_query_size` sur une valeur suffisamment élevée pour couvrir la plus grande taille attendue au niveau de vos requêtes. Pour en savoir plus, consultez la documentation Postgres sur les [statistiques de runtime][8] (en anglais).

### Les requêtes ne présentent pas de plans d'exécution

Une partie ou l'intégralité des requêtes ne présentent pas de plans. Ce problème peut être causé par des commandes de requête non prises en charge, des requêtes effectuées par des applications client non prises en charge, un Agent obsolète ou une configuration de base de données incomplète. Vous trouverez ci-dessous les causes possibles de l'absence de plans d'exécution.

#### Fonction d'exécution manquante {#fonction-d-execution-manquante}

Problème : l'Agent n'est pas en mesure d'exécuter une fonction requise dans le schéma `datadog` de la base de données.

Solution : l'Agent nécessite que la fonction `datadog.explain_statement(...)` soit présente dans **toutes les bases de données** à partir desquelles il peut recueillir des requêtes.

Créez la fonction **dans chaque base de données** pour permettre à l'Agent de recueillir les plans d'exécution.

```SQL
CREATE OR REPLACE FUNCTION datadog.explain_statement(
   l_query TEXT,
   OUT explain JSON
)
RETURNS SETOF JSON AS
$$
DECLARE
curs REFCURSOR;
plan JSON;

BEGIN
   OPEN curs FOR EXECUTE pg_catalog.concat('EXPLAIN (FORMAT JSON) ', l_query);
   FETCH curs INTO plan;
   CLOSE curs;
   RETURN QUERY SELECT plan;
END;
$$
LANGUAGE 'plpgsql'
RETURNS NULL ON NULL INPUT
SECURITY DEFINER;
```
#### La version de l'Agent qui s'exécute n'est pas prise en charge
Assurez-vous que la version de l'Agent qui s'exécute est la version 7.36.1 ou une version ultérieure. Datadog recommande de mettre régulièrement à jour l'Agent pour profiter des dernières fonctionnalités, améliorations des performances et mises à jour de sécurité.

#### Les requêtes sont tronquées
Consultez la section sur les [échantillons de requête tronqués](#les-echantillons-de-requete-sont-tronques) pour découvrir comment augmenter la taille du texte d'échantillon de requête.

#### Protocole de requête étendu Postgres

Si un client utilise le [protocole de requête étendu][9] Postgres ou des instructions préparées, l'Agent Datadog ne peut pas recueillir les plans d'exécution, car la requête parsée et les paramètres de liaison bruts sont séparés. Si le client offre la possibilité d'utiliser exclusivement le protocole de requête simplifié, l'activation de cette option permet à l'Agent Datadog de recueillir les plans d'exécution.

| Langage | Client | Configuration pour le protocole de requête simplifié|
|----------|--------|----------------------------------------|
| Go       | [pgx][10] | Définissez `PreferSimpleProtocol` pour activer le protocole de requête simplifié (voir la [documentation ConnConfig][11] en anglais). Vous pouvez également l'appliquer pour des requêtes ou des appels spécifiques en utilisant le flag [QuerySimpleProtocol][24] comme premier argument sur les appels `Query` ou `Exec`.
| Java     | [Client JDBC Postgres][12] | Définissez `preferQueryMode = simple` pour activer le protocole de requête simplifié (voir la [documentation PreferQueryMode][13] en anglais). |
| Python   | [asyncpg][14]              | Utilise le protocole de requête étendu, qui ne peut pas être désactivé. La désactivation des instructions préparées ne permet pas de résoudre ce problème. Pour activer la collecte des plans d'exécution, formatez les requêtes SQL à l'aide de [psycopg sql][15] (ou d'un autre outil de formatage semblable qui échappe les valeurs SQL de façon adéquate) avant de les passer au client de base de données.                                                  |
| Python   | [psycopg][16]             | `psycopg2` n'utilise pas le protocole de requête étendu : les plans d'exécution sont donc normalement recueillis. <br/> `psycopg3` utilise le protocole de requête étendu, qui ne peut pas être désactivé. La désactivation des instructions préparées ne permet pas de résoudre ce problème. Pour activer la collecte des plans d'exécution, formatez les requêtes SQL à l'aide de [psycopg sql][15] avant de les passer au client de base de données. |
| Node     | [node-postgres][17]       | Utilise le protocole de requête étendu, qui ne peut pas être désactivé. Pour que l'Agent Datadog recueille les plans d'exécution, utilisez [pg-format][18] de manière à formater les requêtes SQL avant de les passer à [node-postgres][17].|

#### La requête est associée à une base de données ignorée par la configuration de l'instance de l'Agent
La requête est associée à une base de données ignorée par le paramètre de configuration `ignore_databases` de l'instance de l'Agent. Les bases de données par défaut, telles que les bases de données `rdsadmin` et `azure_maintenance`, sont ignorées dans le paramètre `ignore_databases`. Les requêtes associées à ces bases de données ne comportent aucun échantillon ni aucun plan d'exécution. Vérifiez la valeur de ce paramètre dans la configuration de votre instance et les valeurs par défaut dans l'[exemple de fichier de configuration][19].

**Remarque :** la base de données `postgres` est également ignorée par défaut dans les versions <7.41.0 de l'Agent.

#### La requête ne prend pas en charge les plans d'exécution
Certaines requêtes, telles que les requêtes BEGIN, COMMIT, SHOW, USE et ALTER, ne peuvent pas renvoyer un plan d'exécution valide à partir de la base de données. Seules les requêtes SELECT, UPDATE, INSERT, DELETE et REPLACE sont prises en charge pour les plans d'exécution.

#### La requête est relativement peu fréquente ou s'exécute rapidement
La requête n'a peut-être pas été sélectionnée pour être ajoutée dans l'échantillon, car elle ne représente pas une proportion significative du temps d'exécution total de la base de données. Pour recueillir la requête, il est conseillé d'essayer d'[augmenter les taux d'échantillonnage][23].


#### L'application repose sur des chemins de recherche pour indiquer les schémas à interroger
Étant donné que Postgres n'expose pas le [chemin de recherche][20] actuel dans [`pg_stat_activity`][21], l'Agent Datadog ne peut pas identifier le chemin de recherche utilisé pour les processus Postgres actifs. La solution consiste à modifier le chemin de recherche de l'utilisateur défini dans la configuration de l'intégration Postgres pour inclure le schéma.
```sql
ALTER ROLE datadog SET search_path = "$user",public,schema1,schema2,etc;
```

### La configuration échoue à l'exécution de `create extension pg_stat_statements`

Exemple d'erreur générée lors de l'exécution de `create extension pg_stat_statements` :
```
create extension pg_stat_statements;
ERROR:  could not open extension control file "<chemin>/share/postgresql/extension/pg_stat_statements.control": No such file or directory
SQL State: 58P01
```

Cette erreur se produit lorsque le package `postgresql-contrib` qui contient l'extension `pg_stat_statements` est manquant. La méthode d'installation du package manquant dépend de la distribution du host et de votre version de Postgres. Par exemple, pour installer le package `contrib` sous Ubuntu avec Postgres 10, exécutez :

```
sudo apt-get install postgresql-contrib-10
```

Pour en savoir plus, consultez la version appropriée de la [documentation Postgres sur `contrib`][22] (en anglais).

### Les requêtes de l'Agent sont lentes et/ou ont un impact important sur la base de données

La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. Vous trouverez ci-dessous les raisons pour lesquelles les requêtes de l'Agent peuvent solliciter plus de ressources.

#### Valeur élevée pour `pg_stat_statements.max` {#high-pg-stat-statements-max-configuration}
Il est conseillé de définir la valeur de `pg_stat_statements.max` sur `10000`. Si vous utilisez une valeur plus élevée, l'exécution de la requête de collecte prendra plus de temps, ce qui peut entraîner l'expiration de la requête et empêcher la collecte d'une partie des métriques. Si l'Agent envoie cet avertissement, vérifiez que `pg_stat_statements.max` est défini sur `10000` pour la base de données.


[1]: /fr/database_monitoring/setup_postgres/
[2]: /fr/agent/troubleshooting/
[3]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[4]: /fr/agent/guide/agent-log-files
[5]: /fr/database_monitoring/data_collected/#which-queries-are-tracked
[6]: https://www.postgresql.org/docs/current/pgstatstatements.html#id-1.11.7.38.8
[7]: /fr/database_monitoring/setup_postgres/advanced_configuration
[8]: https://www.postgresql.org/docs/current/runtime-config-statistics.html
[9]: https://www.postgresql.org/docs/current/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
[10]: https://github.com/jackc/pgx
[11]: https://pkg.go.dev/github.com/jackc/pgx#ConnConfig
[12]: https://jdbc.postgresql.org/documentation/head/connect.html
[13]: https://jdbc.postgresql.org/documentation/publicapi/org/postgresql/jdbc/PreferQueryMode.html
[14]: https://github.com/MagicStack/asyncpg
[15]: https://www.psycopg.org/docs/sql.html
[16]: https://www.psycopg.org/
[17]: https://node-postgres.com/
[18]: https://www.npmjs.com/package/pg-format
[19]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[20]: https://www.postgresql.org/docs/14/ddl-schemas.html#DDL-SCHEMAS-PATH
[21]: https://www.postgresql.org/docs/14/monitoring-stats.html#MONITORING-PG-STAT-ACTIVITY-VIEW
[22]: https://www.postgresql.org/docs/12/contrib.html
[23]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example#L281
[24]: https://pkg.go.dev/github.com/jackc/pgx/v4#QuerySimpleProtocol