---
app_id: drata-integration
app_uuid: c06736af-282f-4b3c-a9e6-2b049dbc0e2a
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10311
    source_type_name: Drata
author:
  homepage: https://www.drata.com/
  name: Drata
  sales_email: sales@drata.com
  support_email: support@drata.com
categories:
- compliance
- log collection
- security
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/drata/README.md
display_on_public_website: true
draft: false
git_integration_title: drata
integration_id: drata-integration
integration_title: Drata
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: drata
public_title: Drata
short_description: Ingérez les informations de conformité Datadog dans Drata
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Compliance
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ingérez les informations de conformité Datadog dans Drata
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Drata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Drata est une plateforme d'automatisation de la sécurité et de la conformité qui surveille en permanence les contrôles de sécurité de l'entreprise et recueille des preuves à cet égard. Elle permet de simplifier les workflows de conformité dans leur intégralité pour assurer une préparation optimale avant un audit.

Cette intégration permet aux clients de [Drata][1] d'envoyer leurs logs et leurs événements de conformité à Drafta depuis Datadog via une API.

## Formule et utilisation

Pour configurer cette intégration, vous devez disposer d'un [compte Drata][2] actif. Vous devez également disposer des [autorisations admin][3] adéquates dans Datadog.

### Liste des infrastructures

1. Pour installer cette intégration, vous devez créer une clé d'API et une clé d'application.
2. Nous vous conseillons de créer un compte de service dans Datadog et de lui appliquer le rôle Read-Only Datadog afin d'accorder des autorisations limitées à cette connexion.
3. Accédez à vos paramètres d'organisation pour [créer une clé d'API][4] dans Datadog. Attribuez un nom descriptif à la clé d'API, comme `Drata`.
4. Copiez et enregistrez votre clé d'API.
5. Depuis vos paramètres d'organisation, [créez une clé d'application][5]. 
6. Copiez et enregistrez votre clé d'application.
7. Collez votre clé d'API et votre clé d'application dans le menu de connexion Drafta pour Datadog.
8. Drafta procédera alors à la synchronisation des données utilisateur et des données de configuration via l'API de Datadog. La plateforme vous notifiera en cas d'échec d'un monitor de conformité.


## Agent

Besoin d'aide ? Contactez l'[assistance Datadog][6] ou [support@drata.com][7].


[1]: https://www.drata.com
[2]: https://drata.com/demo
[3]: https://docs.datadoghq.com/fr/account_management/rbac/permissions/
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#add-application-keys
[6]: https://docs.datadoghq.com/fr/help/
[7]: mailto:support@drata.com