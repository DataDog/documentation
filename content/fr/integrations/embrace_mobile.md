---
app_id: embrace-mobile
app_uuid: 86988058-9b89-45a8-b92f-5473a96e4a36
assets:
  dashboards:
    Embrace Overview: assets/dashboards/embrace_mobile_overview.json
author:
  homepage: https://embrace.io
  name: Embrace
  support_email: support@embrace.io
categories:
- issue tracking
- metrics
- mobile
- network
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/embrace_mobile/README.md
display_on_public_website: true
draft: false
git_integration_title: embrace_mobile
integration_id: embrace-mobile
integration_title: Embrace Mobile
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: embrace_mobile
public_title: Embrace Mobile
short_description: Visibilité mobile pour iOS, Android, React Native et Unity
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Issue Tracking
  - Category::Metrics
  - Category::Mobile
  - Category::Network
  - Offering::UI Extension
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Visibilité mobile pour iOS, Android, React Native et Unity
  media:
  - caption: Surveillez les crashs et les données réseau d'Embrace directement à partir
      de Datadog en ajoutant des widgets.
    image_url: images/datadog_dashboard.jpg
    media_type: image
  - caption: Analysez les crashs en accédant à chaque stack trace de chaque session
      utilisateur affectée, ainsi qu'aux détails des apps et des sessions. Pour obtenir
      plus d'informations, accédez directement au replay intégral d'une session utilisateur
      dans Embrace.
    image_url: images/datadog_side_panel.jpg
    media_type: image
  - caption: Les replays de sessions utilisateur d'Embrace fournissent l'ensemble
      des données techniques et comportementales de chaque session utilisateur au
      sein d'une visualisation temporelle. Identifiez instantanément la cause d'un
      problème sans avoir à le reproduire manuellement.
    image_url: images/embrace_session.jpg
    media_type: image
  - caption: Optimisez les flux utilisateur clés en suivant les actions effectuées,
      leur chronologie et les résultats de ces actions. Identifiez rapidement les
      obstacles à une bonne expérience utilisateur (ralentissements, freezes, etc.)
      et corrigez-les pour booster l'engagement et le chiffre d'affaires.
    image_url: images/embrace_app_performance.jpg
    media_type: image
  - caption: Surveillez les métriques clés à l'aide de dashboards mis à jour en temps
      réel. Suivez facilement les performances, la stabilité, l'engagement, la monétisation
      et d'autres éléments afin que vos équipes puissent se concentrer sur les données
      qui les intéressent.
    image_url: images/embrace_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Embrace Mobile
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

[Embrace][1] est une plateforme de données et d'observabilité mobile qui permet aux équipes spécialisées dans les appareils mobiles d'offrir des expériences utilisateur de qualité en optimisant les performances, en priorisant et en corrigeant les problèmes, et en surveillant l'ensemble des fonctionnalités, des versions et des segments personnalisés. Embrace vise avant tout à transformer des données mobiles complexes en solutions concrètes. La plateforme recueille des données exhaustives relatives à chaque session utilisateur et les interprète pour vous afin de vous aider à développer votre activité.

Une fois l'app installée, Embrace fournit des dashboards qui suivent des métriques de santé mobile clés. Vous pouvez analyser les détails complets de chaque session utilisateur affectée par une régression sans avoir à la reproduire manuellement.

## Formule et utilisation

1. Activez votre essai gratuit et suivez la [documentation Embrace][2]. **Aucune métrique n'apparaîtra dans Datadog tant que vous n'aurez pas suivi les instructions de cette documentation.**
1. Une fois la configuration de l'intégration Embrace terminée, revenez à Datadog pour connecter les deux plateformes.
1. Authentifiez-vous et liez votre compte Embrace à Datadog en vous connectant avec vos identifiants.
1. Créez un dashboard dans Datadog, puis sélectionnez le widget Embrace afin d'afficher les données Embrace comprenant des métriques liées aux crashs et au réseau.
1. Cliquez sur « Details » pour analyser en détail les données Embrace depuis Datadog.

## Agent

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://embrace.io
[2]: https://embrace.io/docs/
[3]: https://docs.datadoghq.com/fr/help/