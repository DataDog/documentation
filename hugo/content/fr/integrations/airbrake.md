---
app_id: airbrake
app_uuid: 9628996b-82c1-4920-a0c5-c5f32dabd4cf
assets:
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - airbrake.exception_rate
      metadata_path: metadata.csv
      prefix: airbrake.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 34
    source_type_name: Airbrake
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
- issue tracking
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: airbrake
integration_id: airbrake
integration_title: Airbrake
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: airbrake
public_title: Airbrake
short_description: Affichez, recherchez et échangez sur des exceptions Airbrake dans
  votre flux d'événements.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Event Management
  - Category::Issue Tracking
  configuration: README.md#Setup
  description: Affichez, recherchez et échangez sur des exceptions Airbrake dans votre
    flux d'événements.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Airbrake
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Présentation

Associez Airbrake à Datadog pour :

- Visualiser les exceptions en temps réel sous forme d'[événements][1] dans Datadog
- Rechercher des exceptions sur vos graphiques
- Discuter des exceptions avec votre équipe

{{< img src="integrations/airbrake/airbrakeevent.png" alt="airbrake" popup="true">}}

## Mise en œuvre

### Configuration

Pour configurer l'intégration Airbrake à l'aide de Webhooks :

1. Accédez à la page de réglages de votre compte Airbrake.

2. Pour chaque projet que vous souhaitez activer, cliquez sur **Integrations**.

3. Cliquez sur **WebHooks** et saisissez l'URL suivante dans le champ **URL** :

    ```text
    https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
    ```

4. Cliquez sur **Save**.

Accédez au [Events Explorer][2] pour visualiser les nouvelles erreurs depuis Airbrake.

## Données recueillies

### Métriques
{{< get-metrics-from-git "airbrake" >}}


### Événements

L'intégration Airbrake affiche les erreurs Airbrake sous forme d'événements.

### Checks de service

L'intégration Airbrake n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.datadoghq.com/fr/events/
[2]: https://app.datadoghq.com/event/explorer
[3]: https://github.com/DataDog/integrations-internal-core/blob/main/airbrake/metadata.csv
[4]: https://docs.datadoghq.com/fr/help/