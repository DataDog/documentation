---
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
short_description: Surveillez des métriques du pool de connexions et mesurez le trafic entrant et sortant de votre application application.
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Le check PgBouncer surveille les métriques du pool de connexions et vous permet de mesurer le trafic entrant et sortant de votre application.

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check PgBouncer est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos nœuds PgBouncer.

### Configuration

Modifiez le fichier `pgbouncer.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

```
init_config:

instances:
  - host: localhost
    port: 15433
    username: <VOTRE_NOMDUTILISATEUR>
    password: <VOTRE_MOTDEPASSE>
    # tags:
    #   - env:prod

  # Remarque : `host`, `port`, `username` et `password` sont ignorés lorsque l'instance est configurée avec `database_url`.
  - database_url: postgresql://<UTILISATEUR_DB>:<PASSE_DB>@<HOST_DB>:<PORT_DB>/dbname?sslmode=require
    # tags:
    #   - role:main
```

**Remarque** : la valeur du paramètre `database_url` doit pointer vers la base de données statistiques de PgBouncer.

Dans le fichier userlist.txt de votre PgBouncer, ajoutez
```
"datadog" "<votre_motdepasse>"
```

Ensuite, ajoutez la ligne suivante dans le fichier userlist.ini de votre PgBouncer :
```
stats_users = datadog
```

[Redémarrez l'Agent][5] pour commencer à envoyer des métriques PgBouncer à Datadog.

#### Collecte de logs

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

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple pgbouncer.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][6].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `pgbouncer` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "pgbouncer" >}}


Remarque : toutes les métriques ne sont pas disponibles avec toutes les versions de PgBouncer.

### Événements
Le check PgBouncer n'inclut aucun événement.

### Checks de service

`pgbouncer.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à PgBouncer pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/datadog_checks/pgbouncer/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/pgbouncer/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}