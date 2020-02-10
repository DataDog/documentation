---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - languages
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/dotnetclr/README.md'
display_name: .NET CLR
git_integration_title: dotnetclr
guid: 3d21557e-65bd-4b66-99b9-5521f32b5957
integration_id: dotnetclr
integration_title: .NET CLR
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: dotnetclr.
metric_to_check: dotnetclr.memory.time_in_gc
name: dotnetclr
public_title: Intégration Datadog/.NET CLR
short_description: Visualisez et surveillez les statuts de Dotnetclr
support: core
supported_os:
  - windows
---
## Présentation

Recueillez des métriques du service .NET CLR en temps réel pour :

* Visualiser et surveiller les statuts de .NET CLR
* Être informé des failovers et des événements de .NET CLR

## Implémentation
### Installation

Le check .NET CLR est inclus avec le paquet de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Modifiez le fichier `dotnetclr.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour commencer à recueillir vos données de performance .NET CLR. Consultez le [fichier d'exemple dotnetclr.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][5].

## Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `dotnetclr` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "dotnetclr" >}}


### Checks de service

Le check .NET CLR n'inclut aucun check de service.

### Événements

Le check .NET CLR n'inclut aucun événement.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/datadog_checks/dotnetclr/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/dotnetclr/metadata.csv
[8]: https://docs.datadoghq.com/fr/help