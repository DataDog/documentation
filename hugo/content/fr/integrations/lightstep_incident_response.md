---
app_id: lightstep-incident-response
app_uuid: b61db30e-3cbc-4dbe-b055-824f9e46e006
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lightstep-incident-response
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Lightstep Incident Response
author:
  homepage: https://lightstep.com/incident-response
  name: Datadog
  sales_email: success@lightstep.com
  support_email: help@datadoghq.com
categories:
- alerting
- collaboration
- issue tracking
- notification
- incidents
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lightstep_incident_response/README.md
display_on_public_website: true
draft: false
git_integration_title: lightstep_incident_response
integration_id: lightstep-incident-response
integration_title: Lightstep Incident Response
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: lightstep_incident_response
public_title: Lightstep Incident Response
short_description: Synchroniser vos alertes Datadog avec les alertes Lightstep Incident Response
supported_os:
- linux
- mac os
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Mac OS
  - Supported OS::Windows
  - Category::Alerting
  - Category::Collaboration
  - Category::Issue Tracking
  - Category::Notification
  - Category::Incidents
  configuration: README.md#Setup
  description: Synchroniser vos alertes Datadog avec les alertes Lightstep Incident Response
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Lightstep Incident Response
---



## Présentation

[Lightstep Incident Response][1] orchestre le triage des alertes et la planification de l'astreinte via Slack et Zoom. Cette solution est disponible sur ordinateur et sur mobile. Lightstep fournit également un contexte de réponse unifié grâce aux outils de collaboration intégrés et à différents workflows de gestion des incidents, des alertes et de l'astreinte.

LIghtstep Incident Response ingère les données de Datadog via les API standard et détecte les événements anormaux avant que votre entreprise ne soit impactée.

## Configuration

### Installation

Pour configurer l'intégration et envoyer des données à Lightstep Incident Response, consultez la [documentation Lightstep sur l'intégration Datadog][2] (en anglais).

Si vous n'avez pas encore de compte Lightstep Incident Response, [inscrivez-vous][3] pour démarrer votre essai gratuit.

## Assistance

Contactez l'[assistance Datadog][4] ou discutez en direct avec un agent une fois votre inscription à [Lightstep Incident Response][1] finalisée.

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Intégration Datadog/Incident Response][2]

[1]: https://lightstep.com/incident-response
[2]: https://lightstep.com/incident-response/docs/integrations-datadog
[3]: https://lightstep.com/incident-response/signup
[4]: https://docs.datadoghq.com/fr/help/