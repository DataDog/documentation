---
further_reading:
- link: https://www.datadoghq.com/blog/oauth/
  tag: GitHub
  text: Autorisez vos intégrations Datadog avec OAuth
- link: /developers/integrations/api_integration
  tag: Documentation
  text: Implémenter OAuth pour votre intégration basée sur une API
- link: /developers/authorization/oauth2_in_datadog/
  tag: Documentation
  text: En savoir plus sur OAuth2 dans Datadog
- link: /developers/authorization/oauth2_endpoints
  tag: API
  text: Référence des endpoints d'autorisation OAuth2
title: Autorisation
type: documentation
---

## Présentation

Datadog utilise le [framework d'autorisation OAuth 2.0 (OAuth2)][1] pour permettre aux utilisateurs d'autoriser de manière sécurisée des applications tierces à accéder à des ressources Datadog restreintes en leur nom. L'accès dont disposent les applications est déterminé par des [périmètres][2], qui permettent aux utilisateurs d'accorder un consentement explicite pour un ensemble spécifique d'autorisations granulaires demandées par l'application.

## Clients et informations d'identification

Un client OAuth2 est le composant d'une application qui permet aux utilisateurs d'autoriser l'application à accéder aux ressources Datadog en leur nom. OAuth2 définit deux types de clients : public et [confidentiel][3].

Clients publics
: Généralement utilisés pour les applications web et ne sont pas capables de stocker des informations confidentielles.
<!--Examples of public clients include OAuth clients for [UI Extensions][4]. -->

Clients confidentiels
: Capables de stocker des données sensibles et nécessitant un `client_secret` supplémentaire pour effectuer des demandes d'autorisation. Les clients OAuth pour les intégrations sont des clients confidentiels.

Lorsque vous créez un client OAuth, un ensemble d'informations d'identification client est émis sous la forme d'un ID client et, facultativement, d'un secret client pour les clients confidentiels.

ID client
: Utilisé pour identifier votre client lors des demandes aux endpoints d'autorisation et de token.

Secret client
: Si émis, utilisé pour authentifier le client lors des demandes aux endpoints d'autorisation. Copiez et stockez immédiatement le secret client de manière sécurisée, car il s'agit d'un mot de passe confidentiel exposé une seule fois lors de la création du client.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://datatracker.ietf.org/doc/html/rfc6749
[2]: https://docs.datadoghq.com/fr/api/latest/scopes/
[3]: https://datatracker.ietf.org/doc/html/rfc6749#section-3.2.1
[4]: https://docs.datadoghq.com/fr/developers/ui_extensions/#oauth-api-access