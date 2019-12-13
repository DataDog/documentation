---
aliases:
  - /fr/integrations/postgresql
assets:
  dashboards: {}
  monitors: {}
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
integration_title: Postgres SQL
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: postgresql.
metric_to_check: postgresql.connections
name: postgres
process_signatures:
  - postgres -D
  - pg_ctl start -l logfile
  - postgres -c 'pg_ctl start -D -l
public_title: "Intégration Datadog/Postgres\_SQL"
short_description: Recueillez une multitude de métriques relatives aux performances et à la santé de vos bases de données.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Graphique PostgreSQL][1]

## Présentation

Recueillez des métriques du service PostgreSQL en temps réel pour :

* Visualiser et surveiller les états de PostgreSQL
* Être informé des failovers et des événements PostgreSQL

## Implémentation
### Installation

Le check PostgreSQL est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques PostgreSQL, [installez l'Agent][2].

### Configuration
#### Préparer Postgres

Pour implémenter l'intégration PostgreSQL, créez un utilisateur `datadog` en lecture seule avec un accès approprié à votre serveur PostgreSQL. Lancez `psql` sur votre base de données PostgreSQL et exécutez le code ci-dessous.

Pour PostgreSQL 10 et versions ultérieures :

```
create user datadog with password '<MOTDEPASSE>';
grant pg_monitor to datadog;
```

Pour les versions plus anciennes de PostgreSQL :

```
create user datadog with password '<MOTDEPASSE>';
grant SELECT ON pg_stat_database to datadog;
```

**Remarque** : si vous souhaitez générer des métriques custom qui nécessitent d'interroger des tables supplémentaires, vous devrez peut-être accorder l'autorisation `CONNECT` à l'utilisateur `datadog` pour les tables concernées.

Pour vérifier que les autorisations sont bien configurées, exécutez la commande suivante :

```
psql -h localhost -U datadog postgres -c \
"select * from pg_stat_database LIMIT(1);" \
&& echo -e "\e[0;32mConnexion à Postgres réussie\e[0m" \
|| echo -e "\e[0;31mImpossible de se connecter à Postgres\e[0m"
```

Une fois invité à saisir un mot de passe, indiquez celui utilisé dans la première commande.


**Remarque** : pour PostgreSQL 9.6 et versions inférieures, exécutez la commande ci-dessous et créez une fonction `SECURITY DEFINER` pour obtenir un accès en lecture à `pg_stat_activity`.

```
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `postgres.d/conf.yaml` afin de spécifier votre  `host` / `port` et de définir les masters à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:

          ## @param host - string - required
          ## The hostname to connect to.
          ## NOTE: Even if the server name is "localhost", the agent connects to
          ## PostgreSQL using TCP/IP, unless you also provide a value for the sock key.
          ## If `use_psycopg2` is enabled, use the directory containing
          ## the UNIX socket (ex: `/run/postgresql/`) otherwise, use the full path to
          ##  the socket file (ex: `/run/postgresql/.s.PGSQL.5433`).
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
    ```

2. [Redémarrez l'Agent][4].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

Par défaut, les logs PostgreSQL sont envoyés vers `stderr` et n'incluent aucune information détaillée. Il est conseillé d'enregistrer les logs dans un fichier en ajoutant des détails supplémentaires spécifiés en tant que préfixe dans la ligne de log.

1. Modifiez votre fichier de configuration PostgreSQL `/etc/postgresql/<version>/main/postgresql.conf` et supprimez la mise en commentaire du paramètre suivant dans la section concernant les logs :

    ```conf
      logging_collector = on
      log_directory = 'pg_log'  # directory where log files are written,
                                # can be absolute or relative to PGDATA
      log_filename = 'pg.log'   #log file name, can include pattern
      log_statement = 'all'     #log all queries
      log_line_prefix= '%m [%p] %d %a %u %h %c '
      log_file_mode = 0644
      ## For Windows
      #log_destination = 'eventlog'
    ```

2. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
      logs_enabled: true
    ```

3.  Ajoutez ce bloc de configuration à votre fichier `postgres.d/conf.yaml` pour commencer à recueillir vos logs PostgreSQL :

    ```yaml
      logs:
          - type: file
            path: /var/log/pg_log/pg.log
            source: postgresql
            sourcecategory: database
            service: myapp
            #To handle multi line that starts with yyyy-mm-dd use the following pattern
            #log_processing_rules:
            #  - type: multi_line
            #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
            #    name: new_log_start_with_date
    ```

    Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postgres.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

4. [Redémarrez l'Agent][4].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][5] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                           |
|----------------------|---------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `postgres`                                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                   |
| `<CONFIG_INSTANCE>`  | `{"host":"%%host%%", "port":5432,"username":"datadog","password":"<MOTDEPASSE>"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][6].

| Paramètre      | Valeur                                               |
|----------------|-----------------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "postgresql", "service": "postgresql"}` |

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `postgres` dans la section Checks.

## Données collectées

Certaines des métriques répertoriées ci-dessous nécessitent une configuration supplémentaire. Consultez le [fichier d'exemple postgres.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

### Métriques
{{< get-metrics-from-git "postgres" >}}


### Événements
Le check PostgreSQL n'inclut aucun événement.

### Checks de service

**postgres.can_connect**
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance PostgreSQL qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

### FAQ

* [Comment recueillir des métriques custom avec PostgreSQL][9]

### Articles de blog

* [Réduire les délais d'exécution des requêtes Postgres par 100 en modifiant une simple ligne][10]
* [Métriques clés pour la surveillance PostgreSQL][11]
* [Recueillir des métriques avec les outils de surveillance PostgreSQL][12]
* [Comment recueillir et surveiller les données PostgreSQL avec Datadog][13]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[6]: https://docs.datadoghq.com/fr/agent/docker/log/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/postgres/metadata.csv
[9]: https://docs.datadoghq.com/fr/integrations/faq/postgres-custom-metric-collection-explained
[10]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[11]: https://www.datadoghq.com/blog/postgresql-monitoring
[12]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[13]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog


{{< get-dependencies >}}