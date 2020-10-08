---
aliases:
  - /fr/integrations/postgresql
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: postgresql
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    operations: assets/saved_views/operations.json
    postgres_pattern: assets/saved_views/postgres_pattern.json
    sessions_by_host: assets/saved_views/sessions_by_host.json
    slow_operations: assets/saved_views/slow_operations.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/postgres/README.md'
display_name: Postgres
git_integration_title: postgres
guid: e9ca29d5-5b4f-4478-8989-20d89afda0c9
integration_id: postgres
integration_title: Postgres
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postgresql.
metric_to_check:
  - postgresql.connections
  - postgresql.max_connections
name: postgres
process_signatures:
  - postgres -D
  - pg_ctl start -l logfile
  - postgres -c 'pg_ctl start -D -l
public_title: Intégration Datadog/Postgres
short_description: Recueillez une multitude de métriques relatives aux performances et à la santé de vos bases de données.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique PostgreSQL][1]

## Présentation

Recueillez des métriques de PostgreSQL en temps réel pour :

- Visualiser et surveiller les états de PostgreSQL.
- Être informé des failovers et des événements PostgreSQL.

## Configuration

### Installation

Le check PostgreSQL est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques PostgreSQL, [installez l'Agent][2].

### Configuration

#### Préparer Postgres

Pour implémenter l'intégration PostgreSQL, créez un utilisateur `datadog` en lecture seule avec un accès approprié à votre serveur PostgreSQL. Lancez `psql` sur votre base de données PostgreSQL.

Pour PostgreSQL 10 et versions ultérieures, exécutez :

```shell
create user datadog with password '<MOTDEPASSE>';
grant pg_monitor to datadog;
grant SELECT ON pg_stat_database to datadog;
```

Pour les versions plus anciennes de PostgreSQL, exécutez :

```shell
create user datadog with password '<MOTDEPASSE>';
grant SELECT ON pg_stat_database to datadog;
```

**Remarque** : si vous souhaitez générer des métriques custom qui nécessitent d'interroger des tables supplémentaires, vous devrez peut-être accorder l'autorisation `CONNECT` à l'utilisateur `datadog` pour les tables concernées.

Pour vérifier que les autorisations sont bien configurées, exécutez la commande suivante :

```shell
psql -h localhost -U datadog postgres -c \
"select * from pg_stat_database LIMIT(1);" \
&& echo -e "\e[0;32mPostgres connection - OK\e[0m" \
|| echo -e "\e[0;31mCannot connect to Postgres\e[0m"
```

Une fois invité à saisir un mot de passe, indiquez celui utilisé dans la première commande.

**Remarque** : pour PostgreSQL 9.6 et versions inférieures, exécutez la commande ci-dessous et créez une fonction `SECURITY DEFINER` pour obtenir un accès en lecture à `pg_stat_activity`.

```shell
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `postgres.d/conf.yaml` afin de spécifier votre `host` / `port` et de définir les masters à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param host - string - required
     ## The hostname to connect to.
     ## NOTE: Even if the server name is "localhost", the agent connects to
     ## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.
     #
     - host: localhost

       ## @param port - integer - required
       ## Port to use when connecting to PostgreSQL.
       #
       port: 5432

       ## @param user - string - required
       ## Datadog Username created to connect to PostgreSQL.
       #
       username: datadog

       ## @param pass - string - required
       ## Password associated with the Datadog user.
       #
       password: "<PASSWORD>"

       ## @param dbname - string - optional - default: postgres
       ## Name of the PostgresSQL database to monitor.
       ## Note: If omitted, the default system postgres database is queried.
       #
       dbname: "<DB_NAME>"
   ```

2. [Redémarrez l'Agent][2].

##### Collecte de traces

L'APM Datadog s'intègre à Postgres pour vous permettre de visualiser les traces sur l'ensemble de votre système distribué. La collecte de traces est activée par défaut dans les versions 6 et ultérieures de l'Agent Datadog. Pour commencer à recueillir des traces :

1. [Activez la collecte de trace dans Datadog][3].
2. [Instrumentez l'application qui envoie des requêtes à Postgres][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Par défaut, les logs PostgreSQL sont envoyés vers `stderr` et n'incluent aucune information détaillée. Il est conseillé d'enregistrer les logs dans un fichier en ajoutant des détails supplémentaires spécifiés en tant que préfixe dans la ligne de log. Consultez la [documentation PostgresSQL][5] à ce sujet pour en savoir plus.

1. La configuration du logging se fait depuis le fichier `/etc/postgresql/<VERSION>/main/postgresql.conf`. Pour recueillir des logs standard, y compris les sorties des déclarations, supprimez la mise en commentaire des paramètres suivants dans la section dédiée aux logs :

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

2. Pour recueillir des métriques de durée détaillées et les rechercher depuis l'interface Datadog, vous devez les configurer directement au sein des déclarations. Comparez la configuration recommandée qui suit avec celle ci-dessus : vous noterez que dans les deux cas, les options `log_statement` et `log_duration` ont été mises en commentaire. Pour en savoir plus à ce sujet, consultez [cette discussion][6].

    Cette configuration enregistre toutes les déclarations dans les logs, mais vous avez la possibilité d'enregistrer uniquement les déclarations qui dépassent une certaine durée en définissant la valeur `log_min_duration_statement` sur la durée minimum souhaitée (en millisecondes) :

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

4. Ajoutez ce bloc de configuration à votre fichier `postgres.d/conf.yaml` et modifiez-le pour commencer à recueillir vos logs PostgreSQL :

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

      Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postgres.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.

5. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/fr/tracing/send_traces/
[4]: https://docs.datadoghq.com/fr/tracing/setup/
[5]: https://www.postgresql.org/docs/11/runtime-config-logging.html
[6]: https://www.postgresql.org/message-id/20100210180532.GA20138@depesz.com
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `postgres`                                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                   |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":5432,"username":"datadog","password":"<MOTDEPASSE>"}` |

##### Collecte de traces

L'APM dédié aux applications conteneurisées est pris en charge par les hosts exécutant les versions 6 et ultérieures de l'Agent, mais nécessite une configuration supplémentaire pour recueillir des traces.

Variables d'environnement requises sur le conteneur de l'Agent :

| Paramètre            | Valeur                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

Consultez les sections [Tracing d'applications Kubernetes][2] et [Configuration de DaemonSet Kubernetes][3] pour consulter la liste complète des variables d'environnement et configurations disponibles.

Ensuite, [instrumentez votre conteneur d'application][4] et définissez `DD_AGENT_HOST` sur le nom du conteneur de votre Agent.

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][5].

| Paramètre      | Valeur                                               |
| -------------- | --------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "postgresql", "service": "postgresql"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/fr/tracing/setup/
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `postgres` dans la section Checks.

## Données collectées

Certaines des métriques répertoriées ci-dessous nécessitent une configuration supplémentaire. Consultez le [fichier d'exemple postgres.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

### Métriques
{{< get-metrics-from-git "postgres" >}}


### Événements

Le check PostgreSQL n'inclut aucun événement.

### Checks de service

**postgres.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter à l'instance PostgreSQL qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

### FAQ

- [Comment recueillir des métriques custom avec PostgreSQL][5]

### Articles de blog

- [Réduire les délais d'exécution des requêtes Postgres par 100 en modifiant une simple ligne][6]
- [Métriques clés pour la surveillance PostgreSQL][7]
- [Recueillir des métriques avec les outils de surveillance PostgreSQL][8]
- [Comment recueillir et surveiller les données PostgreSQL avec Datadog][9]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/integrations/faq/postgres-custom-metric-collection-explained/
[6]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[7]: https://www.datadoghq.com/blog/postgresql-monitoring
[8]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[9]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog