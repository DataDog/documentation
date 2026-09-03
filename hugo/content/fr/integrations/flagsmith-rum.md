---
app_id: flagsmith-rum
app_uuid: a88f10b6-aef7-41df-979e-d70b720c6752
assets: {}
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- configuration & deployment
- issue tracking
- outils de développement
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith-rum/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith-rum
integration_id: flagsmith-rum
integration_title: Flagsmith
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: flagsmith-rum
public_title: Flagsmith
short_description: Enrichissez vos données RUM avec vos flags de fonctionnalité Flagsmith
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
  - Category::Configuration & Deployment
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Enrichissez vos données RUM avec vos flags de fonctionnalité Flagsmith
  media:
  - caption: Vue d'ensemble de la solution RUM Datadog avec les flags Flagsmith
    image_url: images/flag_rum_overview.png
    media_type: image
  - caption: Détails de la solution RUM Datadog avec les flags Flagsmith
    image_url: images/flag_rum_details.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

[Flagsmith][1] facilite la gestion des fonctionnalités pour les applications Web, mobiles et côté serveur.

L'intégration RUM Flagsmith/Datadog permet d'enrichir les données de vos événements RUM avec des feature flags afin d'optimiser le suivi des performances et des comportements inhabituels. Identifiez les utilisateurs qui sont exposés à une expérience utilisateur spécifique et déterminez si cette expérience nuit aux performances de ces utilisateurs.

## Configuration

Le suivi des feature flags est disponible dans le SDK Browser RUM. Pour obtenir des instructions de configuration détaillées, consultez la page [Débuter avec les données des features flags dans RUM][2].

1. Installez la version 4.25.0 ou une version ultérieure du SDK Browser RUM.
2. Initialisez le SDK RUM et configurez le paramètre d'initialisation `enableExperimentalFeatures` avec `["feature_flags"]`.
3. Initialisez le SDK de Flagsmith avec l'option `datadogRum` et utilisez l'extrait de code ci-dessous afin de transmettre l'évaluation des feature flags à Datadog.

```javascript
flagsmith.init({
     datadogRum: {
        client: datadogRum,
        trackTraits: true,
    },
    ...
})
```

## Dépannage

Besoin d'aide ? Consultez la [documentation Flagsmith][3] (en anglais) ou [contactez l'assistance Datadog] [4].

[1]: https://flagsmith.com/
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/guide/setup-feature-flag-data-collection/
[3]: https://docs.flagsmith.com/clients/javascript#datadog-rum-javascript-sdk-integration
[4]: https://docs.datadoghq.com/fr/help/