---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    lighttpd: assets/dashboards/lighttpd_dashboard.json
  logs:
    source: lighttpd
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    lighttpd_processes: assets/saved_views/lighttpd_processes.json
  service_checks: assets/service_checks.json
categories:
- web
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md
display_name: Lighttpd
draft: false
git_integration_title: lighttpd
guid: 01dcfe7a-7a56-4388-a388-799ee6daaaab
integration_id: lighttpd
integration_title: Lighttpd
integration_version: 3.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lighttpd.
metric_to_check: lighttpd.performance.uptime
name: lighttpd
process_signatures:
- lighttpd
public_title: Intégration Datadog/lighttpd
short_description: Surveillez la disponibilité, les octets traités, les requêtes par
  seconde, les codes de réponse et plus encore.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard lighttpd][1]

## Présentation

Le check lighttpd de l'Agent surveille la disponibilité, les octets traités, les requêtes par seconde, les codes de réponse et bien plus encore.

## Configuration

### Installation

Le check lighttpd est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs lighttpd.

En outre, vous pouvez installer `mod_status` sur vos serveurs lighttpd.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `lighttpd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1]. Consultez le [fichier d'exemple lighttpd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

2. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `lighttpd`                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                   |
| `<CONFIG_INSTANCE>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez ce bloc de configuration à votre fichier `lighttpd.d/conf.yaml` pour commencer à recueillir vos logs lighttpd :

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: lighttpd
   ```

   Modifiez la valeur du paramètre `path` et configurez-la pour votre environnement.
   Consultez le [fichier d'exemple lighttpd.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande `status` de l'Agent][5] et cherchez `lighttpd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "lighttpd" >}}


### Événements

Le check lighttpd n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "lighttpd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

- [Surveiller les métriques sur le serveur Web Lighttpd avec Datadog][6]



[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics