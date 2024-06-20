---
categories:
  - Collecte de logs
  - security
ddtype: crawler
dependencies: []
description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
doc_link: https://docs.datadoghq.com/integrations/okta/
draft: false
git_integration_title: okta
has_logo: true
integration_id: okta
integration_title: Okta
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: okta
public_title: Intégration Datadog/Okta
short_description: Intégrez vos logs d'événements de sécurité Okta à Datadog.
version: '1.0'
---
## Présentation

Connectez Okta pour intégrer vos logs d'événements système Okta à la fonctionnalité Log Management de Datadog.

Ces logs vous offrent une meilleure visibilité sur les événements d'accès et de cycle de vie associés à l'ensemble de vos applications, utilisateurs, etc. L'intégration Datadog/Okta vous permet de détecter les menaces pour vos applications, de suivre l'activité des utilisateurs, de débuguer les problèmes d'authentification et d'autorisation, et de créer une piste d'audit pour assurer votre conformité à la réglementation.

[Consultez la section Types d'événements][1] de la documentation Okta (en anglais) pour obtenir la liste de tous les événements Okta que Datadog peut surveiller.

## SSO avec SAML

Pour l'authentification unique, consultez la section [Configurer Okta en tant que fournisseur d'identité SAML][2].

## Configuration

### Configuration

Pour activer l'intégration Datadog/Okta :

1. Dans Okta, accédez à _Security_ -> _API_ -> _Tokens_ et ajoutez un nouveau token d'API pour Datadog.
2. Dans Datadog, ouvrez le [carré d'intégration Okta][3].
3. Depuis l'onglet **Configuration**, cliquez sur _Add Account_ et indiquez les informations suivantes :

    | Paramètre    | Description                                                                                                     |
    | ------------ | --------------------------------------------------------------------------------------------------------------- |
    | Account name | Indiquez un nom de compte pour identifier votre compte Okta dans Datadog. Celui-ci ne peut contenir que des caractères alphanumériques et des underscores. |
    | Domain       | Le domaine unique du compte utilisé pour récupérer des logs à partir de votre compte Okta. Le domaine doit correspondre à une URL valide. Cette URL doit commencer par `https://<votre_domaine>.okta.com`.               |
    | API key      | Le token d'API associé au compte Okta créé précédemment.                                                             |

4. Cliquez sur _Save_.

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