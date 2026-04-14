---
description: Installez et configurez Database Monitoring pour Postgres auto-hébergé.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégation Postgres basique
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentation
  text: Capture des valeurs de paramètres de requêtes SQL
- link: https://www.datadoghq.com/blog/database-monitoring-explain-analyze
  tag: Blog
  text: Déboguer plus rapidement la latence des requêtes PostgreSQL avec EXPLAIN ANALYZE
    dans Datadog Database Monitoring
title: Configuration de Database Monitoring pour Postgres auto-hébergé
---

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête, des plans d'exécution, des états, des failovers et des événements de base de données.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données Postgres :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-postgres)
1. [Autoriser l'Agent à accéder à la base de données](#accorder-un-acces-a-l-agent)
1. [Installer l'Agent](#installer-l-agent)

## Avant de commencer

Versions de PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13, 14, 15, 16, 17, 18

Prérequis
: Des modules Postgres supplémentaires doivent être installés. Ils sont fournis par défaut pour la plupart des installations. Pour les installations peu courantes, il est possible que vous deviez installer votre version du [package `postgresql-contrib`][1].

Versions de l'Agent prises en charge
: 7.36.1 et versions ultérieures

Incidence sur les performances
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][2]).

Proxies, répartiteurs de charge et poolers de connexion
: L'Agent Datadog doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, `127.0.0.1` ou le socket est préférable. L'Agent ne doit pas se connecter à la base de données via un proxy, un répartiteur de charge ou un pooler de connexion tel que `pgbouncer`. Si l'Agent se connecte à différents hosts pendant son exécution (comme dans le cas d'un basculement, d'un équilibrage de charge, etc.), il calcule la différence de statistiques entre deux hosts, ce qui produit des métriques inexactes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][3] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres Postgres

Configurez les [paramètres][4] suivants dans le fichier `postgresql.conf`. **Redémarrez ensuite le serveur** pour appliquer la configuration. Pour en savoir plus sur ces paramètres, consultez la [documentation Postgres][5] (en anglais).

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requis pour les métriques `postgresql.queries.*`. Active la collecte de métriques de requête à l'aide de l'extension [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Obligatoire pour la collecte des requêtes plus longues. Augmente la taille du texte SQL dans `pg_stat_activity`. Si la valeur par défaut est conservée, les requêtes de plus de `1024` caractères ne seront pas collectées. |
| `pg_stat_statements.track` | `ALL` | Facultatif. Active le suivi des déclarations dans les procédures et fonctions stockées. |
| `pg_stat_statements.max` | `10000` | Facultatif. Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Ce paramètre est recommandé pour les bases de données générant d'importants volumes ainsi que de nombreux types de requêtes à partir d'un grand nombre de clients. |
| `pg_stat_statements.track_utility` | `off` | Facultatif. Désactive les commandes utilitaires telles que PREPARE et EXPLAIN. Définir cette valeur sur `off` signifie que seules les requêtes de type SELECT, UPDATE et DELETE sont suivies. |
| `track_io_timing` | `on` | Facultatif. Active la collecte des durées de lecture et d'écriture des blocs pour les requêtes. |

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour le serveur de base de données, afin de pouvoir recueillir les statistiques et requêtes.

Les commandes SQL suivantes doivent être exécutées sur le serveur de base de données **primaire** (le writer) du cluster si Postgres est répliqué. Choisissez une base de données PostgreSQL sur le serveur de base de données à laquelle l'Agent se connectera. L'Agent peut collecter des données de télémétrie depuis toutes les bases de données du serveur de base de données, quelle que soit celle à laquelle il se connecte ; il est donc conseillé d'utiliser la base de données `postgres` par défaut. Ne choisissez une base de données différente que si vous avez besoin que l'Agent exécute des [requêtes custom sur des données propres à cette base de données][6].

Connectez-vous à la base de données en tant que super-utilisateur (ou en tant qu'un autre utilisateur avec les autorisations nécessaires). Par exemple, pour la base de données `postgres`, exécutez ce qui suit pour vous connecter en tant qu'utilisateur `postgres` avec [psql][7] :

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}

{{% tab "Postgres ≥ 15" %}}

Accordez à l'utilisateur `datadog` l'autorisation d'accéder aux tables concernées :

```SQL
ALTER ROLE datadog INHERIT;
```

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}

{{% tab "Postgres ≥ 10" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT pg_monitor TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

Créez le schéma suivant **dans chaque base de données** :

```SQL
CREATE SCHEMA datadog;
GRANT USAGE ON SCHEMA datadog TO datadog;
GRANT USAGE ON SCHEMA public TO datadog;
GRANT SELECT ON pg_stat_database TO datadog;
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

Créez des fonctions **dans chaque base de données** pour permettre à l'Agent de lire tout le contenu de `pg_stat_activity` et `pg_stat_statements` :

```SQL
CREATE OR REPLACE FUNCTION datadog.pg_stat_activity() RETURNS SETOF pg_stat_activity AS
  $$ SELECT * FROM pg_catalog.pg_stat_activity; $$
LANGUAGE sql
SECURITY DEFINER;
CREATE OR REPLACE FUNCTION datadog.pg_stat_statements() RETURNS SETOF pg_stat_statements AS
    $$ SELECT * FROM pg_stat_statements; $$
LANGUAGE sql
SECURITY DEFINER;
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">Pour la collecte de données ou les métriques custom nécessitant d'interroger des tables supplémentaires, vous devrez peut-être accorder l'autorisation <code>SELECT</code> sur ces tables à l'utilisateur <code>datadog</code>. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consultez la page <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Collecte de métriques custom PostgreSQL</a> pour en savoir plus. </div>

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
   SET TRANSACTION READ ONLY;

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

### Stocker votre mot de passe de manière sécurisée
{{% dbm-secret %}}

### Vérification

Pour vérifier que l'utilisateur de l'Agent possède les autorisations adéquates et qu'il parvient à se connecter à la base de données et à lire les principales tables, exécutez ce qui suit :

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

```shell
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_database limit 1;" \
  && echo -e "\e[0;32mPostgres connection - OK\e[0m" \
  || echo -e "\e[0;31mCannot connect to Postgres\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_activity limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_activity read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_activity\e[0m"
psql -h localhost -U datadog postgres -A \
  -c "select * from pg_stat_statements limit 1;" \
  && echo -e "\e[0;32mPostgres pg_stat_statements read OK\e[0m" \
  || echo -e "\e[0;31mCannot read from pg_stat_statements\e[0m"
```

{{% /tab %}}
{{< /tabs >}}

Lorsque vous êtes invité à saisir un mot de passe, indiquez celui que vous avez défini lors de la création de l'utilisateur `datadog`.

## Installer l'Agent

L'installation de l'Agent Datadog installe également le check Postgres, requis pour Database Monitoring sur Postgres.
Si vous n'avez pas encore installé l'Agent, consultez les [instructions d'installation de l'Agent][8]. Revenez ensuite ici pour continuer avec les instructions correspondant à votre méthode d'installation.

Modifiez le fichier `conf.d/postgres.d/conf.yaml` de l'Agent pour le faire pointer vers l'instance Postgres que vous souhaitez surveiller. Pour obtenir la liste complète des options de configuration, consultez le [fichier d'exemple postgres.d/conf.yaml][9].

```yaml
init_config:
instances:
 - dbm: true
   host: localhost
   port: 5432
   username: datadog
   password: 'ENC[datadog_user_database_password]'

  ## Optional: Connect to a different database if needed for `custom_queries`
  # dbname: '<DB_NAME>'
```

**Remarque** : si votre mot de passe contient des caractères spéciaux, placez-le entre guillemets simples.

[Redémarrez l'Agent][16] pour appliquer les modifications.

### Collecte de logs (facultatif)

Par défaut, les logs PostgreSQL sont envoyés vers `stderr` et n'incluent aucune information détaillée. Il est conseillé d'enregistrer les logs dans un fichier en ajoutant des détails supplémentaires spécifiés en tant que préfixe dans la ligne de log. Consultez la [documentation PostgresSQL][11] (en anglais) à ce sujet pour en savoir plus.

1. La journalisation est configurée dans le fichier `/etc/postgresql/<VERSION>/main/postgresql.conf`. Pour obtenir des résultats de log standard, y compris les sorties des requêtes, définissez les paramètres suivants dans la section log :
   ```conf
     logging_collector = on
     log_line_prefix = '%m [%p] %d %a %u %h %c ' # this pattern is required to correlate metrics in the Datadog product
     log_file_mode = 0644

     ## For Windows
     #log_destination = 'eventlog'
   ```
2. Pour recueillir des métriques de durée détaillées et les rechercher depuis l'interface Datadog, vous devez les configurer directement au sein des déclarations. Comparez la configuration recommandée qui suit avec celle ci-dessus : vous noterez que dans les deux cas, les options `log_statement` et `log_duration` ont été mises en commentaire. Pour en savoir plus à ce sujet, consultez [cette discussion][12].

   Cette configuration enregistre toutes les déclarations dans les logs, mais vous avez la possibilité d'enregistrer uniquement les déclarations qui dépassent une certaine durée en définissant la valeur `log_min_duration_statement` sur la durée minimum souhaitée en millisecondes (assurez-vous que l'enregistrement des déclarations SQL complètes est conforme aux exigences de confidentialité de votre organisation) :
   ```conf
     log_min_duration_statement = 0    # -1 is disabled, 0 logs all statements
                                       # and their durations, > 0 logs only
                                       # statements running at least this number
                                       # of milliseconds
     #log_statement = 'all'
     #log_duration = on
   ```
3. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :
   ```yaml
   logs_enabled: true
   ```
4. Ajoutez ce bloc de configuration à votre fichier `conf.d/postgres.d/conf.yaml` et modifiez-le pour commencer à recueillir vos logs PostgreSQL :
   ```yaml
   logs:
     - type: file
       path: "<LOG_FILE_PATH>"
       source: postgresql
       service: "<SERVICE_NAME>"
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       #    name: new_log_start_with_date
   ```
   Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postgres.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.
5. [Redémarrez l'Agent][10].

### Collecte de plans avec `auto_explain` (facultatif)

Par défaut, l'Agent ne recueille des plans [`EXPLAIN`][17] que pour un échantillon de requêtes en cours d'exécution. Ces plans sont de nature plus générale, notamment lorsque le code de l'application utilise des requêtes préparées.

Pour collecter les plans `EXPLAIN ANALYZE` complets à partir de toutes les requêtes, vous devez utiliser [`auto_explain`][18], une extension native fournie avec PostgreSQL et disponible chez tous les principaux fournisseurs. _La collecte de logs est un prérequis à la collecte `auto_explain`_, veillez donc à l'activer avant de continuer.

<div class="alert alert-danger">
  <strong>Important :</strong> <code>auto_explain</code> génère des lignes de logs susceptibles de contenir des informations sensibles provenant de votre application, similaires aux valeurs brutes qui apparaissent dans les requêtes SQL non obfusquées. Vous pouvez utiliser l'<a href="/account_management/rbac/permissions/#database-monitoring">autorisation <code>dbm_parameterized_queries_read</code></a> pour contrôler qui peut consulter les plans générés, mais les lignes de logs elles-mêmes <i>sont</i> visibles par tous les utilisateurs de votre organisation Datadog. L'utilisation de <a href="/logs/guide/logs-rbac">RBAC for Logs</a> contribue à s'assurer que ces logs ne sont visibles que par les utilisateurs appropriés.
</div>

Une fois la collecte de logs activée :

1. Ajoutez `auto_explain` à votre liste `shared_preload_libraries` dans `postgresql.conf`. Par exemple, si `shared_preload_libraries` est défini sur `pg_stat_statements`, le remplacer par `pg_stat_statements,auto_explain`

2. Modifiez le paramètre `log_line_prefix` pour permettre une corrélation d'événements plus riche. Ce pattern est requis pour ingérer les plans auto_explain.
   ```conf
     log_line_prefix = '%m:%r:%u@%d:[%p]:%l:%e:%s:%v:%x:%c:%q%a:'
   ```

3. Configurez les paramètres `auto_explain`. Le format de log _doit_ être `json`, mais les autres paramètres peuvent varier en fonction de votre application. Cet exemple enregistre un plan `EXPLAIN ANALYZE` dans les logs pour toutes les requêtes dépassant une seconde, y compris les informations relatives aux tampons, mais en omettant les informations de temporisation (ce qui peut engendrer une surcharge).

   ```conf
    auto_explain.log_format: "json"
    auto_explain.log_min_duration: "1000"
    auto_explain.log_analyze: "on"
    auto_explain.log_buffers: "on"
    auto_explain.log_timing: "off"
    auto_explain.log_triggers: "on"
    auto_explain.log_verbose: "on"
    auto_explain.log_nested_statements: "on"
    auto_explain.sample_rate: "1"
   ```

4. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][13] et cherchez `postgres` dans la section Checks. Vous pouvez également visiter la page [Databases][14] pour commencer à surveiller vos bases de données.

## Exemples de configuration de l'Agent
{{% dbm-postgres-agent-config-examples %}}

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.postgresql.org/docs/current/contrib.html
[2]: /fr/database_monitoring/agent_integration_overhead/?tab=postgres
[3]: /fr/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /fr/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /fr/agent/configuration/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /fr/database_monitoring/troubleshooting/?tab=postgres
[16]: /fr/agent/configuration/agent-commands/#restart-the-agent
[17]: https://www.postgresql.org/docs/current/sql-explain.html
[18]: https://www.postgresql.org/docs/current/auto-explain.html