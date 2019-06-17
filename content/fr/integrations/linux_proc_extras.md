---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/README.md'
display_name: "Linux\_proc\_extras"
git_integration_title: linux_proc_extras
guid: 47f243d7-5df4-47b5-9f1a-923b4f7cefe7
integration_id: system
integration_title: "Linux\_Proc\_Extras"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.inodes.total
name: linux_proc_extras
public_title: Intégration Datadog/Linux Proc Extras
short_description: Visualiser et surveiller les états de linux_proc_extras.
support: core
supported_os:
  - linux
---
## Présentation
Recueillez des métriques du service linux_proc_extras en temps réel pour :

* Visualiser et surveiller les états de linux_proc_extras
* Être informé des failovers et des événements de linux_proc_extras.

## Implémentation
### Installation

Le check Linux_proc_extras est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

### Configuration

Modifiez le fichier `linux_proc_extras.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2]. Consultez le [fichier d'exemple linux_proc_extras.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques
Le check Linux Proc Extras peut potentiellement générer des [métriques custom][6], qui peuvent avoir une incidence sur votre [facturation][7]. 

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `linux_proc_extras` dans la section Checks.

## Données collectées
### Métriques
Le check Linux Proc Extras n'inclut aucune métrique.

### Événements
Le check Linux Proc Extras n'inclut aucun événement.

### Checks de service
Le check Linux Proc Extras n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/linux_proc_extras/datadog_checks/linux_proc_extras/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help
[6]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[7]: https://docs.datadoghq.com/fr/account_management/billing/custom_metrics/


{{< get-dependencies >}}