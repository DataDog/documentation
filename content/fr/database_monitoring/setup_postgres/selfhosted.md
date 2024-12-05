---
description: Installez et configurez Database Monitoring pour Postgres auto-hébergé.
further_reading:
- link: /integrations/postgres/
  tag: Documentation
  text: Intégation Postgres basique
title: Configuration de Database Monitoring pour Postgres auto-hébergé
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Database Monitoring n'est pas prise en charge pour ce site.</div>
{{< /site-region >}}

La solution Database Monitoring vous permet de bénéficier d'une visibilité complète sur vos bases de données Postgres, en exposant des métriques de requête, des échantillons de requête et des plans d'exécution, ainsi que des états, des failovers et des événements de base de données.

L'Agent recueille la télémétrie directement depuis la base de données, en se connectant en tant qu'utilisateur en lecture seule. Suivez les étapes ci-dessous pour activer la solution Database Monitoring avec votre base de données Postgres :

1. [Configurer les paramètres de base de données](#configurer-les-parametres-postgres)
2. [Accorder à l'Agent un accès à la base de données](#acccorder-un-acces-a-l-agent)
3. [Installer l'Agent](#installer-l-agent)

## Avant de commencer

Versions de PostgreSQL prises en charge
: 9.6, 10, 11, 12, 13 et 14

Prérequis
: Des modules Postgres supplémentaires doivent être installés. Ils sont fournis par défaut pour la plupart des installations. Pour les installations peu courantes, il est possible que vous deviez installer votre version du [package `postgresql-contrib`][1].

Versions de l'Agent prises en charge
: 7.36.1+

Incidence sur les performances impact
: La configuration par défaut de l'Agent pour Database Monitoring est relativement souple. Néanmoins, vous pouvez ajuster certains paramètres comme l'intervalle de collecte et le taux d'échantillonnage des requêtes pour mieux répondre à vos besoins. Pour la plupart des workloads, l'Agent monopolise moins d'un pour cent du temps d'exécution des requêtes sur la base de données, et moins d'un pour cent du CPU. <br/><br/>
La solution Database Monitoring de Datadog fonctionne comme une intégration et vient compléter l'Agent de base ([voir les benchmarks][2]).

Proxies, répartiteurs de charge et outils de regroupement de connexions
: L'Agent doit se connecter directement au host surveillé. Pour les bases de données auto-hébergées, il est préférable d'utiliser `127.0.0.1` ou le socket. L'Agent ne doit pas se connecter aux bases de données via un proxy, un répartiteur de charge ni un outil de groupement de connexions comme `pgbouncer`. Bien qu'il puisse s'agir d'un antipattern pour des applications client, chaque Agent doit connaître le hostname sous-jacent et rester sur un seul host pendant toute sa durée de vie, même en cas de failover. Si l'Agent Datadog se connecte à plusieurs hosts pendant son exécution, les valeurs des métriques seront incorrectes.

Considérations relatives à la sécurité des données
: Consultez la rubrique [Informations sensibles][3] pour découvrir les données recueillies par l'Agent à partir de vos bases de données et la méthode à suivre pour garantir leur sécurité.

## Configurer les paramètres Postgres

Configurez les [paramètres][4] suivants dans le fichier `postgresql.conf`. **Redémarrez ensuite le serveur** pour appliquer la configuration. Pour en savoir plus sur ces paramètres, consultez la [documentation Postgres][5] (en anglais).

| Paramètre | Valeur | Description |
| --- | --- | --- |
| `shared_preload_libraries` | `pg_stat_statements` | Requis pour les métriques `postgresql.queries.*`. Active la collecte de métriques de requête à l'aide de l'extension [pg_stat_statements][5]. |
| `track_activity_query_size` | `4096` | Requis pour la collecte de requêtes volumineuses. Augmente la taille du texte SQL dans `pg_stat_activity` et `pg_stat_statements`. Si vous conservez la valeur par défaut, les requêtes comportant plus de `1024` caractères ne seront pas recueillies. |
| `pg_stat_statements.track` | `ALL` | Facultatif. Active le suivi des déclarations dans les procédures et fonctions stockées. |
| `pg_stat_statements.max` | `10000` | Facultatif. Augmente le nombre de requêtes normalisées suivies dans `pg_stat_statements`. Ce paramètre est recommandé pour les bases de données générant d'importants volumes ainsi que de nombreux types de requêtes à partir d'un grand nombre de clients. |
| `pg_stat_statements.track_utility` | `off` | Facultatif. Désactive les commandes d'utilitaire comme PREPARE et EXPLAIN. Si vous définissez ce paramètre sur `off`, seules les requêtes de type SELECT, UPDATE, and DELETE sont suivies. |
| `track_io_timing` | `on` | Facultatif. Active la collecte des durées de lecture et d'écriture des blocs pour les requêtes. |

## Accorder un accès à l'Agent

L'Agent Datadog requiert un accès en lecture seule pour le serveur de base de données, afin de pouvoir recueillir les statistiques et requêtes.

Si Postgres est répliqué, les commandes SQL suivantes doivent être exécutées sur le **principal** serveur de base de données (avec les droits d'écriture) dans le cluster. Choisissez la base de données PostgresSQL à laquelle l'Agent se connectera sur le serveur dédié. L'Agent peut recueillir la télémétrie de toutes les bases de données sur ce serveur, peu importe celle à laquelle il se connecte. Il est donc recommandé d'utiliser la base de données `postgres` par défaut. Choisissez une autre base de données uniquement si l'Agent doit exécuter des [requêtes personnalisées sur des données stockées uniquement dans cette base de données][6].

Connectez-vous à la base de données en tant que super-utilisateur (ou en tant qu'un autre utilisateur avec les autorisations nécessaires). Par exemple, pour la base de données `postgres`, exécutez ce qui suit pour vous connecter en tant qu'utilisateur `postgres` avec [psql][7] :

 ```bash
 psql -h mydb.example.com -d postgres -U postgres
 ```

Créez l'utilisateur `datadog` :

```SQL
CREATE USER datadog WITH password '<PASSWORD>';
```

{{< tabs >}}
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
{{% tab "Postgres 9.6" %}}

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

<div class="alert alert-info">Pour la collecte de données ou les métriques custom nécessitant d'interroger des tables supplémentaires, vous devrez peut-être accorder l'autorisation <code>SELECT</code> pour les tables en question à l'utilisateur <code>datadog</code>. Exemple : <code>grant SELECT on &lt;TABLE_NAME&gt; to datadog;</code>. Consultez la section <a href="https://docs.datadoghq.com/integrations/faq/postgres-custom-metric-collection-explained/">Collecte de métriques custom PostgreSQL</a> pour en savoir plus. </div>

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

L'installation de l'Agent Datadog entraîne également l'installation du check Postgres requis pour la solution Database Monitoring sur Postgres. Si vous n'avez pas encore installé l'Agent pour le host de votre base de données Postgres, consultez les [instructions d'installation de l'Agent][8].

1. Modifiez le fichier `conf.d/postgres.d/conf.yaml` de l'Agent afin de pointer vers votre `host`/`port` et définissez les hosts à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

{{< tabs >}}
{{% tab "Postgres ≥ 10" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<MOT_DE_PASSE>'
       ## Facultatif : connexion à une autre base de données si nécessaire pour `custom_queries`
       # dbname: '<NOM_BASE_DE_DONNÉES>'
   ```

{{% /tab %}}
{{% tab "Postgres 9.6" %}}

   ```yaml
   init_config:
   instances:
     - dbm: true
       host: localhost
       port: 5432
       username: datadog
       password: '<MOT_DE_PASSE>'
       pg_stat_statements_view: datadog.pg_stat_statements()
       pg_stat_activity_view: datadog.pg_stat_activity()
       ## Facultatif : connexion à une autre base de données si nécessaire pour `custom_queries`
       # dbname: '<NOM_BASE_DE_DONNÉES>'
   ```

{{% /tab %}}
{{< /tabs >}}

2. [Redémarrez l'Agent][10].

### Collecte de logs (facultatif)

Par défaut, les logs PostgreSQL sont envoyés vers `stderr` et n'incluent aucune information détaillée. Il est conseillé d'enregistrer les logs dans un fichier en ajoutant des détails supplémentaires spécifiés en tant que préfixe dans la ligne de log. Consultez la [documentation PostgresSQL][11] (en anglais) à ce sujet pour en savoir plus.

1. La configuration de la journalisation se fait depuis le fichier `/etc/postgresql/<VERSION>/main/postgresql.conf`. Pour recueillir des logs standard, y compris les sorties des déclarations, supprimez la mise en commentaire des paramètres suivants dans la section dédiée aux logs :
   ```conf
     logging_collector = on
     log_directory = 'pg_log'  # directory where log files are written,
                               # can be absolute or relative to PGDATA
     log_filename = 'pg.log'   # log file name, can include pattern
     log_statement = 'all'     # log all queries
     #log_duration = on
     log_line_prefix= '%m [%p] %d %a %u %h %c '
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

### Validation

[Lancez la sous-commande status de l'Agent][13] et cherchez `postgres` dans la section Checks. Vous pouvez également visiter la page [Databases][14] pour commencer à surveiller vos bases de données.

## Exemples de configuration de l'Agent
{{% dbm-postgres-agent-config-examples %}}

## Dépannage

Si vous avez respecté les instructions d'installation et de configuration des intégrations et de l'Agent, mais que vous rencontrez un problème, consultez la section [Dépannage][15].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.postgresql.org/docs/12/contrib.html
[2]: /fr/agent/basic_agent_usage#agent-overhead
[3]: /fr/database_monitoring/data_collected/#sensitive-information
[4]: https://www.postgresql.org/docs/current/config-setting.html
[5]: https://www.postgresql.org/docs/current/pgstatstatements.html
[6]: /fr/integrations/faq/postgres-custom-metric-collection-explained/
[7]: https://www.postgresql.org/docs/current/app-psql.html
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[10]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[12]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
[13]: /fr/agent/guide/agent-commands/#agent-status-and-information
[14]: https://app.datadoghq.com/databases
[15]: /fr/database_monitoring/troubleshooting/?tab=postgres