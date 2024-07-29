---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    pgbouncer: assets/dashboards/pgbouncer_dashboard.json
  logs:
    source: pgbouncer
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    error_warning_status: assets/saved_views/error_warning_status.json
    instance_overview: assets/saved_views/instance_overview.json
    pgbouncer_processes: assets/saved_views/pgbouncer_processes.json
    user_overview: assets/saved_views/user_overview.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md'
display_name: PGBouncer
draft: false
git_integration_title: pgbouncer
guid: 51386802-4502-4991-b592-27eff1ca111c
integration_id: pgbouncer
integration_title: PGBouncer
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: pgbouncer.
metric_to_check: pgbouncer.pools.sv_idle
name: pgbouncer
process_signatures:
  - pgbouncer
public_title: Intégration Datadog/PGBouncer
short_description: Surveillez des métriques du pool de connexions et mesurez le trafic entrant et sortant de votre application.
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Le check PgBouncer surveille les métriques du pool de connexions et vous permet de mesurer le trafic entrant et sortant de votre application.

## Configuration

### Installation

Le check PgBouncer est inclus dans le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos nœuds PgBouncer.

Ce check nécessite un utilisateur associé afin d'interroger votre instance PgBouncer :

1. Créez un utilisateur Datadog dans votre fichier `pgbouncer.ini` PgBouncer :

   ```ini
   stats_users = datadog
   ```

2. Ajoutez un mot de passe associé pour l'utilisateur `datadog` dans votre fichier `userlist.txt` PgBouncer :

   ```text
   "datadog" "<PASSWORD>"
   ```

3. Pour vérifier les identifiants, exécutez la commande suivante :

   ```shell
   psql -h localhost -U datadog -p 6432 pgbouncer -c \
   "SHOW VERSION;" \
   && echo -e "\e[0;32mpgBouncer connection - OK\e[0m" \
   || echo -e "\e[0;31mCannot connect to pgBouncer\e[0m"
   ```

   Une fois invité à saisir un mot de passe, indiquez celui que vous avez ajouté au fichier `userlist.txt`.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `pgbouncer.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles :

   ```yaml
   init_config:

   instances:
     ## @param database_url - string - required
     ## `database_url` parameter should point to PgBouncer stats database url (ie. "pgbouncer")
     #
     - database_url: "postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require"
   ```

   **Remarque** : si votre instance de PgBouncer ne prend pas en charge la technologie SSL, remplacez `sslmode=require` par `sslmode=allow` pour éviter d'engendrer des erreurs de serveur. Pour en savoir plus sur la prise en charge de SSL, consultez la [documentation de Postgres][3] (en anglais).

2. [Redémarrez l'Agent][4].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `pgbouncer.d/conf.yaml` pour commencer à recueillir vos logs Pgbouncer :

   ```yaml
   logs:
     - type: file
       path: /var/log/postgresql/pgbouncer.log
       source: pgbouncer
       service: "<SERVICE_NAME>"
   ```

   Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[3]: https://www.postgresql.org/docs/9.1/libpq-ssl.html
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `<NOM_INTÉGRATION>` | `pgbouncer`                                                                                            |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                          |
| `<CONFIG_INSTANCE>`  | `{"database_url": "postgresql://datadog:<MOTDEPASSE>@%%host%%:%%port%%/<URL_BASEDEDONNÉES>?sslmode=require"}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                           |
| -------------- | ----------------------------------------------- |
| `<CONFIG_LOG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][2] et cherchez `pgbouncer` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "pgbouncer" >}}


**Remarque** : les métriques ne sont pas toutes disponibles pour toutes les versions de PgBouncer.

### Événements

Le check PgBouncer n'inclut aucun événement.

### Checks de service

Consultez le fichier [service_checks.json][3] pour afficher la liste des checks de service fournis par cette intégration.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[3]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/assets/service_checks.json
[4]: https://docs.datadoghq.com/fr/help/