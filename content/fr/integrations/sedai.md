---
app_id: sedai
app_uuid: fa7de455-fef8-4cb2-af30-9baa50e351f2
assets:
  dashboards:
    Sedai Overview: assets/dashboards/sedai_overview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: sedai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Sedai
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Sedai
  sales_email: praveen.prakash@sedai.io
  support_email: praveen.prakash@sedai.io
categories:
- automation
- cloud
- cost management
- notification
- orchestration
- provisioning
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sedai/README.md
display_on_public_website: true
draft: false
git_integration_title: sedai
integration_id: sedai
integration_title: Sedai
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sedai
public_title: Sedai
short_description: Une plateforme autonome de gestion intelligente de vos applications
  cloud
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Automation
  - Category::Cloud
  - Category::Cost Management
  - Category::Notification
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Une plateforme autonome de gestion intelligente de vos applications
    cloud
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Sedai
---

## Présentation

Sedai est une plateforme cloud autonome qui gère de façon proactive des environnements de production, dans le but d'éviter tout problème, de gagner en disponibilité, d'améliorer les performances et de réduire les coûts liés au cloud. Cet outil de SRE détecte, hiérarchise et analyse à votre place les données de surveillance, afin de modifier de façon autonome et sécurisée les environnements de production sans appliquer le moindre seuil. 

Activez cette intégration pour recevoir dans la plateforme Datadog des notifications à propos des mesures prises de façon autonome par Sedai dans vos environnements de production.

### Fonctionnement

* **Aucun Agent** : cette solution se connecte facilement à vos comptes cloud, puis découvre et analyse automatiquement vos environnements de production.

* **Aucune configuration** : Sedai se connecte à l'API Datadog, puis identifie, hiérarchise et mémorise de façon intelligente le comportement des métriques.

* **Mesures proactives** : Sedai modifie à votre place les environnements de production afin que vos ressources ne rencontrent aucun problème de disponibilité et que leur exécution soit optimisée en tout temps.

## Implémentation

Dans Sedai :

1. Accédez à Settings > Notifications > Add Integration > icône Datadog.

   ![Ajouter l'intégration Datadog][1]

2. Saisissez un nom et la clé d'API de votre compte Datadog. Activez l'intégration et testez-la.

   ![Configurer la clé d'API Datadog][2]

3. Une fois le test concluant, cliquez sur Save.

   ![Enregistrer l'intégration Datadog fonctionnelle][3]

4. Sous Settings > Notifications, [sélectionnez les notifications][4] que vous souhaitez recevoir dans Datadog.

   ![Activer les notifications Datadog][5]

## Données collectées

Cette intégration envoie des événements à Datadog.

## Assistance

Pour obtenir de l'aide concernant cette intégration, contactez l'[assistance Datadog][6].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/DataDog_Notification_Integration.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Add_DataDog_Channel-Working_REC.png
[4]: https://sedai.gitbook.io/sedai/sedai-user-guide/controls/notifications
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sedai/images/Enable_Notifications.png
[6]: https://docs.datadoghq.com/fr/help/