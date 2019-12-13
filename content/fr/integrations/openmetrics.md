---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md'
display_name: OpenMetrics
git_integration_title: openmetrics
guid: 3f67af75-6987-468c-99b3-5001ba5ab414
integration_id: openmetrics
integration_title: OpenMetrics
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: openmetrics
public_title: Intégration Datadog/OpenMetrics
short_description: OpenMetrics est une norme ouverte qui permet d'exposer des données de métriques.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Extrayez des métriques custom depuis des endpoints OpenMetrics.

<div class="alert alert-warning">Toutes les métriques récupérées par cette intégration sont considérées comme des <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">métriques custom</a>.</div>

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check OpenMetrics est inclus à partir de la [version 6.6.0 de l'Agent Datadog][3].

### Configuration

Modifiez le fichier `openmetrics.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][4]. Consultez le [fichier d'exemple openmetrics.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

Pour chaque instance, les paramètres suivants sont requis :

| Paramètre        | Description                                                                                                                                                                                                                                                              |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `prometheus_url` | L'URL sur laquelle les métriques de votre application sont exposées par Prometheus (doit être unique).                                                                                                                                                                                       |
| `namespace`      | L'espace de nommage à ajouter devant le nom de chaque métrique.                                                                                                                                                                                                                                 |
| `metrics`        | La liste des métriques à récupérer en tant que métriques custom. Ajoutez chaque métrique à la liste en spécifiant le `nom_métrique` ou utilisez `nom_métrique: renamed` pour la renommer. Utilisez le wildcard `*` (`metric*`) pour récupérer toutes les métriques correspondantes. **Remarque** : l'utilisation des wildcards peut engendrer l'envoi d'un grand nombre de métriques custom. |

Pour obtenir d'autres exemples de configuration, consultez la section [collecte de métriques Prometheus et OpenMetrics][10].

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `openmetrics` dans la section Checks.

## Données collectées
### Métriques

Toutes les métriques recueillies par le check OpenMetrics sont transmises à Datadog en tant que métriques custom.

### Événements

Le check OpenMetrics n'inclut aucun événement.

### Checks de service

Le check OpenMetrics n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin

* [Configurer un check OpenMetrics][8]
* [Écrire un check OpenMetrics personnalisé][9]

[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/openmetrics
[9]: https://docs.datadoghq.com/fr/developers/openmetrics
[10]: https://docs.datadoghq.com/fr/getting_started/integrations/prometheus


{{< get-dependencies >}}