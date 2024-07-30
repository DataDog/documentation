---
app_id: planetscale
app_uuid: ea670b69-7322-4c75-afbc-4ef1a6cf286c
assets:
  dashboards:
    planetscale_overview: assets/dashboards/planetscale_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: planetscale.tables.storage
      metadata_path: metadata.csv
      prefix: planetscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: PlanetScale
author:
  homepage: http://www.planetscale.com
  name: PlanetScale
  sales_email: sales@planetscale.com
  support_email: support@planetscale.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/planetscale/README.md
display_on_public_website: true
draft: false
git_integration_title: planetscale
integration_id: planetscale
integration_title: PlanetScale
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: planetscale
public_title: PlanetScale
short_description: Envoyez vos métriques PlanetScale à DataDog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Store
  configuration: README.md#Setup
  description: Envoyez vos métriques PlanetScale à DataDog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: PlanetScale
---



## Présentation

PlanetScale peut transmettre des métriques à Datadog pour aider vos équipes à mieux comprendre l'utilisation et les performances de vos bases de données.

## Configuration

Suivez les étapes ci-dessous pour configurer votre organisation PlanetScale afin qu'elle transmette les métriques à Datadog.

1. Créez une clé d'API Datadog dans vos [paramètres d'organisation Datadog][1].
2. Renseignez la clé d'API Datadog dans vos [paramètres d'organisation PlanetScale][2].

![Paramètres d'organisation PlanetScale][3]

## Données collectées

### Métriques
{{< get-metrics-from-git "planetscale" >}}


### Checks de service

PlanetScale n'inclut aucun check de service.

### Événements

PlanetScale n'inclut aucun événement.

## Assistance

Besoin d'aide ? Contactez [l'assistance Datadog][5].


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.planetscale.com/settings/integrations
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/planetscale/images/planetscale.png
[4]: https://github.com/DataDog/integrations-extras/blob/master/planetscale/metadata.csv
[5]: https://docs.datadoghq.com/fr/help/