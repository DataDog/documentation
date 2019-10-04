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

**Remarque** : toutes les métriques récupérées par cette intégration sont considérées comme des [métriques custom][1].

## Implémentation

Vous trouverez ci-dessous les instructions pour installer et configurer le check lorsque vous exécutez l'Agent sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check OpenMetrics est inclus à partir de la [version 6.6.0 de l'Agent Datadog][3].

### Configuration

Modifiez le fichier `openmetrics.d/conf.yaml` à la racine du [répertoire de configuration de votre Agent][4] pour ajouter les différentes instances OpenMetrics pour lesquelles vous souhaitez récupérer des métriques.

Chaque instance est au minimum composée des paramètres suivants :

* `prometheus_url` : indique l'itinéraire des métriques (**remarque :** doit être unique).
* `namespace` : espace de nommage à ajouter en préfixe pour toutes les métriques (permet d'éviter les conflits entre les noms de métriques).
* `metrics` : la liste des métriques à récupérer en tant que métriques custom. Il vous suffit d'ajouter vos métriques à la liste `- nom_métrique` ou de les renommer avec `- nom_métrique: renamed`. Vous pouvez également utiliser le wildcard `*`, par exemple `- metric*`, afin de récupérer toutes les métriques correspondantes. Utilisez prudemment ce wildcard, car il peut entraîner l'envoi de nombreuses métriques custom.

Il existe également plusieurs paramètres plus avancés (`ssl`, `labels joining`, `tags`,...) dont l'utilisation est expliquée dans [l'exemple de configuration `conf.yaml`][5].

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `openmetrics` dans la section Checks.

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

[1]: https://docs.datadoghq.com/fr/developers/metrics/custom_metrics
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://docs.datadoghq.com/fr/agent/openmetrics
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://docs.datadoghq.com/fr/help
[8]: https://docs.datadoghq.com/fr/agent/openmetrics
[9]: https://docs.datadoghq.com/fr/developers/openmetrics


{{< get-dependencies >}}