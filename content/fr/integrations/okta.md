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

Connectez-vous à Okta pour intégrer vos logs système Okta dans Datadog.

## Implémentation

### Installation

Pour activer l'intégration Datadog/Okta :

1. Accédez à votre compte Okta.
1. Accédez à *Security* -> *API* -> *Tokens*.
2. Ajoutez un token API et copiez-le.

### Configuration

1. Accédez à la [page d'intégration de l'organisation Datadog][1].
2. Ouvrez le [carré d'intégration Okta][2].
3. Entrez un nom de compte pour le champ `Account name`. Il sert à identifier votre compte Okta dans Datadog. Celui-ci ne peut contenir que des caractères alphanumériques et des underscores.
4. Saisissez un domaine dans le champ `Domain`. il s'agit du domaine unique du compte utilisé pour exiger des logs à partir de votre compte Okta. Le domaine doit correspondre à une URL valide.
5. Saisissez une clé d'API dans le champ `API key`. Il s'agit du token API provenant de votre compte Okta.
6. Cliquez sur *Save*.

## Données collectées
### Métriques

L'intégration Okta n'inclut aucune métrique.

### Événements
L'intégration Okta n'inclut aucun événement.

### Checks de service
L'intégration Okta n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].



{{< get-dependencies >}}
[1]: https://app.datadoghq.com/account/settings
[2]: https://app.datadoghq.com/account/settings#integrations/okta
[3]: https://docs.datadoghq.com/fr/help
