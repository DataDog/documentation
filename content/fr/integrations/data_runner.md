---
app_id: data-runner
app_uuid: ad7b5a3c-497d-45e0-9bcf-50f2d1365247
assets: {}
author:
  homepage: https://datadoghq.com
  name: Datadog
  sales_email: sales@datadog.com
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/data_runner/README.md
display_on_public_website: true
draft: false
git_integration_title: data_runner
integration_id: data-runner
integration_title: Data Runner
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: data_runner
public_title: Data Runner
short_description: Un jeu incrémental de recherche de métriques dans les dashboards
  Datadog.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::UI Extension
  configuration: README.md#Setup
  description: Un jeu incrémental de recherche de métriques dans les dashboards Datadog.
  media:
  - caption: Data Runner
    image_url: images/data-runner.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Data Runner
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Dans le jeu Data Runner, votre personnage sillonne l'environnement d'une bibliothèque à la recherche d'une métrique précise définie par le joueur. Lorsqu'il la trouve, la valeur de la métrique est ajoutée au score du joueur. Vous pouvez ajouter Data Runner à vos dashboards Datadog sous la forme d'un widget. 

Cette extension repose sur les [Apps Datadog][1], qui permettent d'intégrer à l'interface utilisateur du contenu tiers qui n'est pas pris en charge nativement. Si vous souhaitez enrichir votre expérience Datadog avec de nouvelles fonctionnalités utiles ou amusantes, vous pouvez [concevoir votre propre app ou jeu][1]. 

Pour en savoir plus sur Data Runner, consultez le référentiel GitHub [stuartlangridge/data-runner][2].

## Formule et utilisation

1. Pour afficher Data Runner sur le [dashboard][3] de votre choix, commencez par ouvrir ce dashboard.

2. Cliquez sur le bouton **+ Add Widgets** pour ouvrir la liste des widgets disponibles. Faites glisser le widget Data Runner vers l'emplacement souhaité sur le dashboard.

3. Choisissez la métrique que le personnage doit trouver.

## Real User Monitoring

### Analyse d'entonnoirs

Data Runner ne fournit aucune métrique.

### Aide

Data Runner n'inclut aucun événement.

### Aide

Data Runner n'inclut aucun check de service.

## Agent

Besoin d'aide ? Contactez [l'assistance Datadog][4].

Pour concevoir votre propre App Datadog, consultez la [documentation réservée aux développeurs d'Apps Datadog][1].

[1]: https://docs.datadoghq.com/fr/developers/datadog_apps
[2]: https://github.com/stuartlangridge/data-runner
[3]: https://app.datadoghq.com/dashboard/lists
[4]: https://www.datadoghq.com/support/