---
app_id: flagsmith
app_uuid: 0ad66873-2958-4ca5-ae25-ee893b4c6e31
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: flagsmith.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Flagsmith
author:
  homepage: https://flagsmith.com/
  name: Flagsmith
  sales_email: support@flagsmith.com
  support_email: support@flagsmith.com
categories:
- issue tracking
- outils de développement
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flagsmith/README.md
display_on_public_website: true
draft: false
git_integration_title: flagsmith
integration_id: flagsmith
integration_title: Flagsmith
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: flagsmith
public_title: Flagsmith
short_description: Les événements de changement de flag dans Flagsmith sont affichés
  dans Datadog.
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
  - Category::Issue Tracking
  - Category::Developer Tools
  - Offering::UI Extension
  - Offering::Integration
  configuration: README.md#Setup
  description: Les événements de changement de flag dans Flagsmith sont affichés dans
    Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Flagsmith
---



## Présentation

[Flagsmith][1] simplifie la gestion des fonctionnalités des applications Web, mobiles, et serveur. L'intégration Datadog/Flagsmith vous permet d'afficher des informations concernant les changements de flag directement dans Datadog.

Flagsmith propose les intégrations suivantes pour la plateforme Datadog :

### Intégration d'événements

Tous les événements de changement de flag sont envoyés à Datadog. L'ancien environnement est ajouté en tant que tag aux événements.

### Widget de dashboard

Le widget de dashboard de Flagsmith vous permet de visualiser vos flags et logs d'audit Flagsmith directement dans Datadog.

## Implémentation

Dans le [dashboard Datadog][2], sélectionnez le menu Integrations, puis ajoutez l'intégration Datadog. Saisissez ensuite votre [clé d'API Datadog][3]. Pour le champ Base URL, saisissez `https://api.datadoghq.com` si vous utilisez le site Datadog américain ou `https://api.datadoghq.eu` si vous utilisez le site Datadog européen.

### Widget de dashboard Flagsmith

1. Dans le [carré d'intégration Flagsmith][4], vérifiez que l'intégration est installée.
1. Assurez-vous également que vous êtes connecté à Flagsmith avec le compte à afficher dans Datadog.
1. Dans Datadog, accédez à un dashboard existant ou créez-en un.
1. Cliquez sur le bouton **Add Widgets** pour afficher le menu des widgets.
1. Recherchez **Flagsmith** pour afficher le widget Flagsmith dans la section **Apps** du menu des widgets.
1. Sélectionnez l'**icône du widget Flagsmith** pour l'ajouter à votre dashboard et ouvrir l'**éditeur Flagsmith**. Vous pouvez choisir d'ajouter un widget représentant des flags ou des logs d'audit.
1. Sélectionnez l'organisation, le projet et l'environnement Flagsmith que vous souhaitez ajouter à votre dashboard.
1. Copiez ensuite les valeurs **Project ID** et **Environment ID** et collez-les dans Datadog.
1. Sélectionnez la taille de la page. Vous pouvez également attribuer un titre au widget et appliquer un filtre basé sur un tag Flagsmith.
1. Cliquez sur **Save** pour terminer la configuration du widget de dashboard.

## Données collectées

### Métriques

L'intégration Flagsmith n'inclut aucune métrique.

### Checks de service

L'intégration Flagsmith n'inclut aucun check de service.

### Événements

Tous les événements Flagsmith sont tranmis au flux d'événements Datadog.

## Dépannage

Besoin d'aide ? Consultez la [documentation Flagsmith][5] (en anglais) ou [contactez l'assistance Datadog] [6].

[1]: https://www.flagsmith.com/
[2]: https://app.flagsmith.com/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/integrations/flagsmith
[5]: https://docs.flagsmith.com/integrations/datadog/
[6]: https://docs.datadoghq.com/fr/help/