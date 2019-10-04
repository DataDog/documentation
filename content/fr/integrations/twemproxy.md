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
  - 'https://github.com/DataDog/integrations-core/blob/master/twemproxy/README.md'
display_name: Twemproxy
git_integration_title: twemproxy
guid: a5cca58a-9984-4226-ad1c-8dff73c9d6ac
integration_id: twemproxy
integration_title: Twemproxy
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: twemproxy.
metric_to_check: twemproxy.total_connections
name: twemproxy
public_title: Intégration Datadog/Twemproxy
short_description: Visualisez les performances de Twemproxy pour les corréler avec le reste de vos applications. your applications
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Suivez les statistiques globales et les statistiques de chaque pool pour chacun de vos serveurs Twemproxy. Ce check de l'Agent recueille les métriques pour les connexions et les erreurs client/serveur, les taux de requêtes et de réponses, les octets entrants/sortants du proxy, et plus encore.

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Twemproxy de l'Agent est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs Twemproxy .

### Configuration

1. Modifiez le fichier `twemproxy.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3]. Consultez le [fichier d'exemple twemproxy.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles :

    ```
    init_config:

    instances:
        - host: localhost
          port: 2222 # change if your twemproxy doesn't use the default stats monitoring port
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques Twemproxy à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `twemproxy` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "twemproxy" >}}


### Événements
Le check Twemproxy n'inclut aucun événement.

### Checks de service

`twemproxy.can_connect` :

Renvoie CRITICAL si l'Agent ne parvient pas à se connecter à l'endpoint de statistiques Twemproxy pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/datadog_checks/twemproxy/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/twemproxy/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}