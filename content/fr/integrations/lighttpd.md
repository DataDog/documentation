---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/lighttpd/README.md'
display_name: Lighttpd
git_integration_title: lighttpd
guid: 01dcfe7a-7a56-4388-a388-799ee6daaaab
integration_id: lighttpd
integration_title: Lighttpd
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: lighttpd.
metric_to_check: lighttpd.performance.uptime
name: lighttpd
process_signatures:
  - lighttpd
public_title: Intégration Datadog/Lighttpd
short_description: 'Surveillez la durée de fonctionnement, les octets traités, les requêtes par seconde, les codes de réponse et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard lighttpd][1]

## Présentation

Le check lighttpd de l'Agent surveille la durée de fonctionnement, les octets traités, les requêtes par seconde, les codes de réponse et bien plus encore.

## Implémentation
### Installation

Le check lighttpd est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs lighttpd.

En outre, vous pouvez installer `mod_status` sur vos serveurs lighttpd.

### Configuration

1. Modifiez le fichier `lighttpd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
    Consultez le [fichier d'exemple lighttpd.d/conf.yam][4] pour découvrir toutes les options de configuration disponibles :

    ```yaml
    init_config:

    instances:
        # Each instance needs a lighttpd_status_url. Tags are optional.
        - lighttpd_status_url: http://example.com/server-status?auto
        #   tags:
        #     - instance:foo
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques lighttpd à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `lighttpd` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "lighttpd" >}}


### Événements
Le check lighttpd n'inclut aucun événement.

### Checks de service

`- lighttpd.can_connect` :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à lighttpd pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) surveiller les métriques du serveur web lighttpd avec Datadog, lisez nos [articles de blog][9] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics


{{< get-dependencies >}}