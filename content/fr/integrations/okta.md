---
categories:
  - Collecte de logs
  - security
ddtype: crawler
dependencies: []
description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/okta/'
git_integration_title: okta
has_logo: true
integration_title: Okta
is_public: true
kind: integration
manifest_version: 1
name: okta
public_title: Intégration Datadog/Okta
short_description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
version: 1
---
## Présentation

Connectez Okta pour intégrer vos logs d'événements de sécurité Okta au système Log Management de Datadog.

## SSO avec SAML

Pour l'authentification unique, consultez la section [Configurer Okta en tant que fournisseur d'identité SAML][4].

## Configuration

### Configuration

Pour activer l'intégration Datadog/Okta :

1. Dans Okta, accédez à *Security* -> *API* -> *Tokens* et ajoutez un nouveau token d'API pour Datadog.
2. Dans Datadog, ouvrez le [carré d'intégration Okta][2].
3. Depuis l'onglet **Configuration**, cliquez sur *Add Account* et indiquez les informations suivantes :

    | Paramètre    | Description                                                                                                     |
    |--------------|-----------------------------------------------------------------------------------------------------------------|
    | Account name | Indiquez un nom de compte pour identifier votre compte Okta dans Datadog. Celui-ci ne peut contenir que des caractères alphanumériques et des underscores. |
    | Domain       | Le domaine unique du compte utilisé pour récupérer des logs à partir de votre compte Okta. Le domaine doit correspondre à une URL valide.                  |
    | API key      | Le token d'API associé au compte Okta créé précédemment.                                                             |

4. Cliquez sur *Save*.

## Données collectées
### Métriques

L'intégration Okta n'inclut aucune métrique.

### Événements
L'intégration Okta n'inclut aucun événement.

### Checks de service
L'intégration Okta n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[2]: https://app.datadoghq.com/account/settings#integrations/okta
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://docs.datadoghq.com/fr/account_management/saml/okta