---
app_id: isdown
app_uuid: 22560cfe-27cc-492f-a978-64dfcdc3b3c0
assets:
  dashboards:
    IsDown: assets/dashboards/isdown_overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: IsDown
author:
  homepage: https://isdown.app
  name: IsDown
  sales_email: sales@isdown.app
  support_email: support@isdown.app
categories:
- notification
- monitoring
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/isdown/README.md
display_on_public_website: true
draft: false
git_integration_title: isdown
integration_id: isdown
integration_title: IsDown
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: isdown
public_title: IsDown
short_description: IsDown permet aux entreprises de surveiller toutes les pages de
  statut tierces depuis un seul endroit
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Category::Notification
  - Category::Monitoring
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: IsDown permet aux entreprises de surveiller toutes les pages de statut
    tierces depuis un seul endroit
  media:
  - caption: Flux IsDown/Datadog
    image_url: images/isdown_datadog_flow.jpg
    media_type: image
  - caption: Dashboards IsDown
    image_url: images/isdown_dashboards.jpg
    media_type: image
  - caption: Dashboard Datadog
    image_url: images/isdown_datadog_dashboard.jpg
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: IsDown
---



## Présentation

[IsDown][1] est un agrégateur de pages de statut et un outil de surveillance des pannes qui permet aux entreprises de surveiller leurs dépendances. Votre équipe bénéficie ainsi d'une surveillance en temps réel et de notifications instantanées en cas de panne affectant l'un de vos outils ou fournisseurs de cloud. IsDown prend en charge plus de 2 000 pages de statut.

Utilisez cette intégration pour recevoir des alertes de vos dépendances tierces dans Datadog, surveiller les services dont dépend votre entreprise et analyser la fréquence des pannes, le tout depuis un dashboard prêt à l'emploi.

## Implémentation

1. Utilisez votre compte existant ou créez-en un dans [IsDown][1].
2. Connectez-vous à votre compte et accédez à la page **Notifications**.
3. Sélectionnez la case correspondant à Datadog et cliquez sur **Connect to Datadog**.
4. Vous êtes ensuite redirigé vers Datadog pour autoriser l'application. IsDown crée une clé d'API qui permet uniquement d'accéder à ce dont IsDown a besoin pour envoyer des événements et des checks de service à Datadog.
5. Une fois l'autorisation accordée, vous accédez à nouveau à IsDown.
6. Sélectionnez les services à surveiller.
7. Configurez les paramètres de notification souhaités pour chaque service.


### Désinstallation

1. Accédez à la page **Notifications** dans IsDown.
2. Désélectionnez Datadog et cliquez sur **Save**.
3. Vérifiez que toutes les clés d'API associées à cette intégration ont été désactivées en recherchant IsDown sur la [page de gestion des clés d'API][2] dans Datadog.


## Données collectées

### Checks de service
{{< get-service-checks-from-git "isdown" >}}


### Événements

IsDown envoie un événement dès que l'un des services que vous surveillez tombe en panne. Deux types d'événements différents sont envoyés : un lorsque la panne commence, et un lorsque la panne se termine. Les événements sont envoyés avec les attributs suivants :
- Title : le nom du service concerné par la panne.
- Text : la description de la panne.
- Tags : `isdown` et `isdown:nom_service`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance IsDown][4].

[1]: https://isdown.app
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: assets/service_checks.json
[4]: mailto:support@isdown.app