---
categories:
- data store
ddtype: check
doc_link: https://docs.datadoghq.com/integrations/pgbouncer/
git_integration_title: pgbouncer
guid: 51386802-4502-4991-b592-27eff1ca111c
has_logo: true
integration_title: PGBouncer
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 0.1.1
max_agent_version: 6.0.0
min_agent_version: 5.6.3
name: pgbouncer
package_deps: false
public_title: Intégration Datadog-PGBouncer
short_description: Suivre les métriques du pool de connexions et monitorer le trafic vers et depuis votre
  application.
support: core
supported_os:
- linux
- mac_os
version: 1.2.0
---



## Aperçu

La check PgBouncer suit les métriques du pool de connexions et vous permet de monitorer le trafic vers et depuis votre application.

## Implémentation
### Installation

Le check PgBouncer est packagé avec l'agent, il vous faut donc simplement [installer l'agent](https://app.datadoghq.com/account/settings#agent) sur vos noeuds PgBouncer.

### Configuration

Editez le fichier `pgbouncer.yaml` dans le dossier `conf.d` de l'Agent. Consultez l'exemple du [canevas  pgbouncer.yaml](https://github.com/DataDog/integrations-core/blob/master/pgbouncer/conf.yaml.example) pour apprendre toutes les options de configuration disponibles:

```
init_config:

instances:
  - host: localhost
    port: 15433
    username: <YOUR_USERNAME>
    password: <YOUR_PASSWORD>
#   tags:
#     - env:prod
  - database_url: postgresql://<DB_USER>:<DB_PASS>@<DB_HOST>:<DB_PORT>/dbname?sslmode=require
#   tags:
#     - role:main
```

Dans votre fichier PGBouncer userlist.txt, ajoutez
```
  "datadog" "<your_pass>"
```

Ensuite, dans votre fichier PGBouncer pgbouncer.ini ajoutez
```
stats_users = datadog
```

[Redémarrez l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#start-stop-restart-the-agent) pour commencer à envoyer vos métriques PgBouncer à Datadog

### Validation

[Lancez la commande `status`de l'Agent](https://docs.datadoghq.com/agent/faq/agent-commands/#agent-status-and-information) et cherchez `pgbouncer` dans la section Checks:

```
  Checks
  ======
    [...]

    pgbouncer
    -------
      - instance #0 [OK]
      - Collected 26 metrics, 0 events & 1 service check

    [...]
```

## Compatibilité

Le check PgBouncer est compatible avec toutes les principales plateformes.

## Données collectées
### Métriques
{{< get-metrics-from-git "pgbouncer" >}}


Note: Toutes les métriques ne sont pas disponibles avec toutes les versions de PGBouncer.

### Evénements
Le check PGboucer n'inclut aucun événement pour le moment.

### Checks de Service

`pgbouncer.can_connect`:

Renvoie CRITICAL si l'agent ne peut pas se connecter à PgBouncer pour collecter des métriques, sinon OK.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)

