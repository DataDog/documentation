---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md'
display_name: "Cisco\_ACI"
git_integration_title: cisco_aci
guid: 8a20f56b-2e25-4a0b-a252-f5187dddeeef
integration_id: cisco-aci
integration_title: "Cisco\_ACI"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cisco_aci.
metric_to_check: cisco_aci.fabric.node.health.cur
name: cisco_aci
public_title: "Intégration Datadog/Cisco\_ACI"
short_description: "Surveillez l'utilisation et les performances de Cisco\_ACI."
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Grâce à l'intégration Cisco ACI, vous pouvez :

* Faire un suivi de l'état et de la santé de votre réseau
* Faire un suivi de la capacité de votre ACI
* Surveiller les commutateurs et les contrôleurs

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check Cisco ACI est fourni avec l'Agent : il vous suffit donc d'[installer l'Agent][2] sur un serveur au sein de votre réseau.

### Configuration

1. Modifiez le fichier `cisco_aci.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3].
    Consultez le [fichier d'exemple cisco_aci.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
      init_config:
          # This check makes a lot of API calls
          # it could sometimes help to add a minimum collection interval
          # min_collection_interval: 180
      instances:
          - aci_url: localhost # the url of the aci controller
            username: datadog
            pwd: datadog
            timeout: 15
            # if it's an ssl endpoint that doesn't have a certificate, use this to ensure it can still connect
            ssl_verify: True
            tenant:
              - WebApp
              - Database
              - Datadog
    ```

2. [Redémarrez l'Agent][5] pour commencer à envoyer vos métriques Cisco ACI à Datadog.

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `cisco_aci` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "cisco_aci" >}}


### Événements
Le check Cisco ACI envoie les défaillances de locataire sous la forme d'événements.

### Checks de service

`cisco_aci.can_connect` :

Renvoie CRITICAL si l'Agent n'est pas capable de se connecter à l'API Cisco ACI pour recueillir des métriques. Si ce n'est pas le cas, renvoie OK.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/metadata.csv
[8]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}