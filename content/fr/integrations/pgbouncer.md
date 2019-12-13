---
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
  - 'https://github.com/DataDog/integrations-core/blob/master/pgbouncer/README.md'
display_name: PGBouncer
git_integration_title: pgbouncer
guid: 51386802-4502-4991-b592-27eff1ca111c
integration_id: pgbouncer
integration_title: PGBouncer
is_public: true
kind: integration
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

## Implémentation
### Installation

Le check PgBouncer est inclus dans le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos nœuds PgBouncer.

Ce check nécessite un utilisateur associé afin d'interroger votre instance PgBouncer :

1. Créez un utilisateur Datadog dans votre fichier `pgbouncer.ini` PgBouncer :

    ```
    stats_users = datadog
    ```

2. Ajoutez un mot de passe associé pour l'utilisateur `datadog` dans votre fichier `userlist.txt` PgBouncer :

    ```
    "datadog" "<PASSWORD>"
    ```

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

##### Collecte de métriques

1. Modifiez le fichier `pgbouncer.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

    ```
      init_config:

      instances:

          ## @param database_url - string - required
          ## `database_url` parameter should point to PgBouncer stats database url
          #
        - database_url: postgresql://datadog:<PASSWORD>@<HOSTNAME>:<PORT>/<DATABASE_URL>?sslmode=require
    ```

2. [Redémarrez l'Agent][4].

##### Collecte de logs

**Disponible à partir des versions > 6.0 de l'Agent**

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
          service: <SERVICE_NAME>
    ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                  |
|----------------------|--------------------------------------------------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `oracle`                                                                                               |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                          |
| `<CONFIG_INSTANCE>`  | `{"database_url": "postgresql://datadog:<MOTDEPASSE>@%%host%%:%%port%%/<URL_BASEDEDONNÉES>?sslmode=require"}` |

##### Collecte de logs

**Disponible à partir des versions > 6.5 de l'Agent**

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][7].

| Paramètre      | Valeur                                           |
|----------------|-------------------------------------------------|
| `<CONFIG_LOG>` | {"source": "pgbouncer", "service": "pgbouncer"} |

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `pgbouncer` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "pgbouncer" >}}


**Remarque** : les métriques ne sont pas toutes disponibles pour toutes les versions de PgBouncer.

### Événements
Le check PgBouncer n'inclut aucun événement.

### Checks de service

**pgbouncer.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à PgBouncer pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations/
[7]: https://docs.datadoghq.com/fr/agent/docker/log/
[8]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/metadata.csv
[9]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}