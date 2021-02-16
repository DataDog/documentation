---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logzio/README.md'
display_name: Logz.io
draft: false
git_integration_title: logzio
guid: 0e44f9bd-8c7b-426a-a0ba-8f4302808191
integration_id: logz-io
integration_title: Logz.io
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.2
name: logzio
public_title: Intégration Datadog/Logz.io
short_description: Suite ELK avec apprentissage automatique en tant que service
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Intégrez les alertes Logz.io pour visualiser les événements en temps réel.

- Importez les alertes dans Datadog.

![importer_alertes_depuis_logz][1]

- Intégrez les événements dans un dashboard pour identifier les corrélations avec vos métriques.

![dashboard][2]

## Configuration

### Installation

Pour importer vos alertes dans Datadog, procédez comme suit :

1. Utilisez une [clé d'API Datadog][3] pour créer un endpoint d'alertes dans Logz.io.
2. Créez une alerte pour une requête spécifique dans Logz.io.

Pour en savoir plus sur la procédure de configuration, consultez la [documentation détaillée de logz.io concernant Datadog][4].

## Données collectées

### Métriques

Le check Logz.io n'inclut aucune métrique.

### Événements

Le check Logz.io n'inclut aucun événement.

### Checks de service

Le check Logz.io n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/import_alert_from_logz.jpg
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/logzio/images/dashboard.png
[3]: https://app.datadoghq.com/account/settings#api
[4]: http://logz.io/blog/log-correlation-datadog
[5]: https://docs.datadoghq.com/fr/help/