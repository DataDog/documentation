---
app_id: komodor-komodor
app_uuid: d62310ba-c7a8-4c5b-ab9f-60bb46527f1b
assets: {}
author:
  homepage: https://komodor.com
  name: Komodor
  sales_email: datadogsales@komodor.com
  support_email: support@komodor.com
  vendor_id: komodor
categories:
- marketplace
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: komodor_license
integration_id: komodor-komodor
integration_title: Komodor
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: assets/Terms of Use.pdf
manifest_version: 2.0.0
name: komodor_license
pricing:
- billing_type: tag_count
  includes_assets: true
  metric: datadog.marketplace.komodor.komodor
  product_id: komodor
  short_description: Différents niveaux de tarification en fonction du volume de nœuds
  tag: node
  unit_label: Nœud surveillé
  unit_price: 30.0
public_title: Komodor
short_description: Plateforme de dépannage Kubernetes
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
  - Category::Marketplace
  - Offering::Software License
  configuration: README.md#Setup
  description: Plateforme de dépannage Kubernetes
  media:
  - caption: Vue principale du service de Komodor et visibilité complète de la charge
      de travail
    image_url: images/Komodor_screen_01.png
    media_type: image
  - caption: Mettre en corrélation plusieurs services et reconstituer la chaîne d'événements
      sur une même timeline
    image_url: images/Komodor_screen_02.png
    media_type: image
  - caption: Comparer facilement les changements dans le manifeste Kubernetes et les
      changements de configuration via Komodor
    image_url: images/Komodor_screen_03.png
    media_type: image
  - caption: Analyser en profondeur le statut et les logs des pods sans une seule
      commande kubectl
    image_url: images/Komodor_screen_04.png
    media_type: image
  - caption: Visualiser les alertes Datadog, les événements Kubernetes et les problèmes
      de disponibilité dans une même vue épurée
    image_url: images/Komodor_screen_06.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Komodor
  uninstallation: README.md#Uninstallation
---



## Présentation

Komodor vous permet de surveiller les modifications effectuées sur l'ensemble de votre stack Kubernetes, d'analyser leurs répercussions et d'obtenir le contexte dont vous avez besoin pour résoudre les problèmes de manière efficace et autonome. Ce service vous offre la possibilité de visualiser l'historique de vos déploiements Kubernetes avec des informations utiles comme les modifications effectuées, le code déployé et l'auteur de ce code. Vous pouvez également visualiser les données issues de Git, des config maps, de votre infrastructure, des alertes et d'autres outils tels que Datadog depuis une fenêtre facile à comprendre.

Cette solution du Marketplace Datadog vous permet d'accéder à la plateforme Komodor. Si vous avez déjà souscrit à Komodor et que vous souhaitez connecter votre instance à Datadog, [configurez l'intégration][1].

## Assistance
Chez Komodor, nous nous engageons à vous offrir les outils et données dont vous avez besoin pour réussir. Ainsi, vous disposez de plusieurs options pour obtenir de l'aide au moment opportun. Vous pouvez nous envoyer des messages depuis l'application Komodor (le bouton de contact en bas à droite), utiliser la documentation et les FAQ pour trouver des informations, ou bien ouvrir un ticket auprès de l'assistance en nous envoyant un e-mail à l'adresse [support@komodor.com](mailto:support@komodor.com).


[1]: /fr/integrations/komodor
---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/komodor-komodor" target="_blank">Cliquez ici</a> pour l'acheter.