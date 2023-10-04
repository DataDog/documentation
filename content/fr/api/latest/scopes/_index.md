---
disable_sidebar: true
title: Contextes d'autorisation
type: documentation
---
## Contextes d'autorisation

La portée (ou scope) est un mécanisme d'autorisation vous permettant de définir et de restreindre l'accès granulaire dont les applications disposent pour les données Datadog d'une organisation. Lorsque des applications sont autorisées à consulter des données au nom d'un utilisateur ou d'un compte de service, elles peuvent uniquement accéder aux informations explicitement demandées.

Pour gérer au mieux les autorisations, il est recommandé de définir des contextes restrictifs et d'accorder l'accès minimal requis pour garantir le bon fonctionnement des applications. Les utilisateurs peuvent donc contrôler précisément les applications et vérifier facilement comment leurs données sont utilisées. Ainsi, il est inutile d'attribuer des autorisations de gestion ou de suppression d'utilisateurs dans une organisation à une application tierce qui est uniquement censée lire des données de dashboards.

Dans Datadog, les contextes peuvent être appliqués de deux façons différentes :
- Limitez les clients OAuth2 pour vos [applications Datadog][1].
- Limitez vos [clés d'application][2].

{{< api-scopes >}}

[1]: https://docs.datadoghq.com/fr/developers/datadog_apps/#oauth-api-access
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/