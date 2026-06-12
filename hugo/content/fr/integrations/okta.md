---
app_id: okta
app_uuid: 1bbd0367-66bf-41c9-be58-8f3313afd0e5
assets:
  dashboards:
    Okta-Overview: assets/dashboards/Okta-Overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 236
    source_type_name: Okta
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Collecte de logs
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: okta
integration_id: okta
integration_title: Okta
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: okta
public_title: Okta
short_description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Okta
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## Présentation

Connectez Okta pour intégrer vos logs d'événements système Okta à la fonctionnalité Log Management de Datadog.

Ces logs vous offrent une meilleure visibilité sur les événements d'accès et de cycle de vie associés à l'ensemble de vos applications, utilisateurs, etc. L'intégration Datadog/Okta vous permet de détecter les menaces pour vos applications, de suivre l'activité des utilisateurs, de débuguer les problèmes d'authentification et d'autorisation, et de créer un journal d'audit pour assurer votre conformité à la réglementation.

[Consultez la section Types d'événements][1] de la documentation Okta (en anglais) pour obtenir la liste de tous les événements Okta que Datadog peut surveiller.

## SSO avec SAML

Pour l'authentification unique, consultez la section [Configurer Okta en tant que fournisseur d'identité SAML][2].

## Configuration

### Configuration

Il existe deux méthodes pour activer l'intégration Okta dans Datadog : via OAuth avec des identifiants provenant de l'application Datadog dans l'Okta Integration Network, ou via une clé API. 

Les deux méthodes nécessitent les champs suivants :

| Paramètre            | Rôle                                                                                                                                                      |
|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Account name         | Identifie votre compte Okta dans Datadog. Le nom de compte ne peut contenir que des caractères alphanumériques et des underscores.                                              |
| Domaine               | Domaine unique utilisé pour demander les logs de votre compte Okta. L'URL doit être valide et commencer par `https://<your_domain>.okta.com`.                    |
| Authorization method | Spécifie la méthode d'autorisation utilisée avec Okta. Les deux options sont : clé API de compte ou identifiants provenant de l'application Datadog dans l'Okta Integration Network. |


Pour activer l'intégration à l'aide d'OAuth :

1. Dans Okta, accédez à **Applications** > **API Services Integration** > **Add Integration** > **Datadog**.
2. Une fois l'application installée, vous recevrez un couple d'identifiants client (client ID et client secret). Copiez ces identifiants.
3. Dans Datadog, ouvrez le [carré d'intégration Okta][3].
4. Sous l'onglet **Configure**, cliquez sur **Add Account** et renseignez les informations suivantes :

    | Paramètre            | Description                                                                                                                                                      |
    |----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Client ID            | L'identifiant client fourni par Okta.                                                                                                                                  |
    | Client Secret        | Le secret client fourni par Okta.                                                                                                                              |

5. Cliquez sur **Save**.


Pour activer l'intégration à l'aide d'une clé API :

1. Dans Okta, accédez à **Security** > **API** > **Tokens**, puis ajoutez un nouveau jeton API.
2. Dans Datadog, ouvrez le [carré d'intégration Okta][3].
3. Sous l'onglet **Configure**, cliquez sur **Add Account** et renseignez les informations suivantes :

    | Paramètre | Description                           |
    |-----------|---------------------------------------|
    | API key | Le jeton API de votre compte Okta. La permission minimale requise est administrateur en lecture seule. |

4. Cliquez sur **Save**.

## Données collectées

### Métriques

L'intégration Okta n'inclut aucune métrique.

### Événements

L'intégration Okta n'inclut aucun événement.

### Checks de service

L'intégration Okta n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://developer.okta.com/docs/reference/api/event-types/
[2]: https://docs.datadoghq.com/fr/account_management/saml/okta/
[3]: https://app.datadoghq.com/account/settings#integrations/okta
[4]: https://docs.datadoghq.com/fr/help/