---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - autodiscovery
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
public_title: Intégration Datadog/lighttpd
short_description: 'Surveillez la disponibilité, les octets traités, les requêtes par seconde, les codes de réponse et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard lighttpd][1]

## Présentation

Le check lighttpd de l'Agent surveille la disponibilité, les octets traités, les requêtes par seconde, les codes de réponse et bien plus encore.

## Implémentation

### Installation

Le check lighttpd est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs lighttpd.

En outre, vous pouvez installer `mod_status` sur vos serveurs lighttpd.

### Configuration

#### Host

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la section [Environnement conteneurisé](#environnement-conteneurise) pour en savoir plus sur les environnements conteneurisés.

1. Modifiez le fichier `lighttpd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple lighttpd.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:

      instances:
        ## @param lighttpd_status_url - string - required
        ## Status url of your Lighttpd server.
        #
        - lighttpd_status_url: http://localhost/server-status?auto
    ```

2. [Redémarrez l'Agent][5].

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][6] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

| Paramètre            | Valeur                                                           |
|----------------------|-----------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `lighttpd`                                                      |
| `<CONFIG_INIT>`      | vide ou `{}`                                                   |
| `<CONFIG_INSTANCE>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

### Validation

[Lancez la sous-commande `status` de l'Agent][7] et cherchez `lighttpd` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "lighttpd" >}}


### Événements
Le check lighttpd n'inclut aucun événement.

### Checks de service

`- lighttpd.can_connect` :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à lighttpd pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin
Pour mieux comprendre comment (ou pourquoi) surveiller les métriques de serveur web lighttpd avec Datadog, lisez nos [articles de blog][10] à ce sujet.


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/lighttpd/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics