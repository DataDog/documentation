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
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/postgres/README.md'
display_name: Postgres
git_integration_title: postgres
guid: e9ca29d5-5b4f-4478-8989-20d89afda0c9
integration_id: postgres
integration_title: "Postgres\_SQL"
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

Vous trouverez ci-dessous les instructions pour installer et configurer le check lors de l'exécution de l'Agent sur un host. Consultez la [documentation Modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check PostgreSQL est fourni avec l'Agent. Pour commencer à recueillir vos logs et métriques PostgreSQL, [installez l'Agent][3].

### Configuration

Modifiez le fichier `postgres.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et [logs](#collecte-de-logs) PostgreSQL. Consultez le [fichier d'exemple postgres.d/conf.yam][5] pour découvrir toutes les options de configuration disponibles.

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

#### Collecte de métriques

* Modifiez le fichier `postgres.d/conf.yaml` afin de spécifier votre serveur et votre port et de définir les masters à surveiller. Consultez le [fichier d'exemple postgres.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

| Option                              | Obligatoire | Description                                                                                                                                                                                        |
|-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **`username`**                      | Non       | Le compte utilisateur utilisé pour recueillir les métriques, préalablement créé à la [section Installation](#installation) ci-dessus.                                                                                              |
| **`password`**                      | Non       | Le mot de passe du compte utilisateur.                                                                                                                                                                 |
| **`dbname`**                        | Non       | Le nom de la base de données à surveiller.                                                                                                                                                      |
| **`ssl`**                           | Non       | Valeur par défaut : `False`. Spécifie si une connexion SSL doit être utilisée.                                                                                                                                   |
| **`tags`**                          | Non       | La liste des tags appliqués à l'ensemble des métriques recueillies. Les tags peuvent être des chaînes simples ou des paires clé-valeur.                                                                                                    |
| **`relations`**                     | Non       | Tous les schémas sont inclus par défaut. Ajoutez des schémas spécifiques à cet endroit pour recueillir des métriques relatives aux relations entre les schémas. Chaque relation génère 10 métriques, ainsi que 10 métriques supplémentaires par index.                |
| **`collect_function_metrics`**      | Non       | Permet de recueillir des métriques concernant les fonctions PL/pgSQL depuis `pg_stat_user_functions`.                                                                                                                        |
| **`collect_count_metrics`**         | Non       | Permet de recueillir des métriques count. Cette option est définie sur `True` par défaut pour une meilleure rétrocompatibilité, mais les délais d'exécution peuvent être plus longs. Valeur recommandée : `False`.                                                           |
| **`collect_activity_metrics`**      | Non       | Valeur par défaut : `False`. Permet de recueillir des métriques concernant les transactions associées à `pg_stat_activity`. Assurez-vous que l'utilisateur dispose d'un accès en lecture à `pg_stat_activity` avant d'activer cette option.     |
| **`collect_database_size_metrics`** | Oui      | Permet de recueillir des métriques de taille pour la base de données. Valeur par défaut : `True`. Les délais d'exécution peuvent être plus longs si la base de données est volumineuse.                                                                                                |
| **`collect_default_database`**      | Non       | Valeur par défaut : `False`. Permet d'inclure des statistiques sur le `postgres` de base de données par défaut dans les métriques de check.                                                                                                 |

Pour PostgreSQL 9.6 et versions inférieures, exécutez la commande ci-dessous et créez une fonction `SECURITY DEFINER` pour obtenir un accès en lecture à `pg_stat_activity`.
```
CREATE FUNCTION pg_stat_activity() RETURNS SETOF pg_catalog.pg_stat_activity AS
$$ SELECT * from pg_catalog.pg_stat_activity; $$
LANGUAGE sql VOLATILE SECURITY DEFINER;

CREATE VIEW pg_stat_activity_dd AS SELECT * FROM pg_stat_activity();
grant SELECT ON pg_stat_activity_dd to datadog;
```

* [Redémarrez l'Agent][6] pour commencer à envoyer des métriques PostgreSQL à Datadog.

#### Collecte de logs

Par défaut, les logs PostgreSQL sont envoyés vers `stderr` et n'incluent aucune information détaillée. Il est conseillé d'enregistrer les logs dans un fichier en incluant les détails supplémentaires spécifiés en tant que préfixe dans la ligne de log.

* Modifiez votre fichier de configuration PostgreSQL `/etc/postgresql/<version>/main/postgresql.conf` et supprimez la mise en commentaire du paramètre suivant dans la section concernant les logs :

  ```
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

* La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

  ```
  logs_enabled: true
  ```

*  Ajoutez ce bloc de configuration à votre fichier `postgres.d/conf.yaml` pour commencer à recueillir vos logs PostgreSQL :

  ```
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
* Modifiez les valeurs des paramètres `path` et `service` en fonction de votre environnement. Consultez le [fichier d'exemple postgres.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

* [Redémarrez l'Agent][6].

**Pour en savoir plus sur la collecte de logs, consultez [la documentation relative aux logs][7].**

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `postgres` dans la section Checks.

## Données collectées

Certaines des métriques répertoriées ci-dessous nécessitent une configuration supplémentaire. Consultez le [fichier d'exemple postgres.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

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
* [Comment recueillir des métriques custom avec PostgreSQL][10]

### Articles de blog
* [Réduire les délais d'exécution des requêtes Postgres par 100 en modifiant une simple ligne][11]
* [Métriques clés pour la surveillance PostgreSQL][12]
* [Recueillir des métriques avec les outils de surveillance PostgreSQL][13]
* [Comment recueillir et surveiller les données PostgreSQL avec Datadog][14]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/postgres/images/postgresql_dashboard.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/postgres/datadog_checks/postgres/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/logs
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/postgres/metadata.csv
[10]: https://docs.datadoghq.com/fr/integrations/faq/postgres-custom-metric-collection-explained
[11]: https://www.datadoghq.com/blog/100x-faster-postgres-performance-by-changing-1-line
[12]: https://www.datadoghq.com/blog/postgresql-monitoring
[13]: https://www.datadoghq.com/blog/postgresql-monitoring-tools
[14]: https://www.datadoghq.com/blog/collect-postgresql-data-with-datadog


{{< get-dependencies >}}