---
title: Configurer Auth0 en tant que fournisseur d'identité SAML
kind: documentation
aliases:
  - /fr/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
---
## Implémentation

SAML est configuré en [utilisant Auth0 avec une application Web SAML2][1].

1. Sur la page **Applications** de Auth0, modifiez un **Client** existant ou créez-en un autre.
2. Dans l'onglet **Addons** du client, activez **SAML2 Web App**.
3. Entrez la configuration suivante dans l'onglet **Settings** de SAML2 Web App.

### Configuration

Il s'agit de la [configuration SAML Datadog][2] officielle de Auth0.

**Application Callback URL** :

```text
https://app.datadoghq.com/account/saml/assertion
```

**Settings** :

```json
{
  "audience": "https://app.datadoghq.com/account/saml/metadata.xml",
  "mappings": {},
  "createUpnClaim": false,
  "passthroughClaimsWithNoMapping": false,
  "mapUnknownClaimsAsIs": false,
  "mapIdentities": false,
  "nameIdentifierFormat": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
  "nameIdentifierProbes": [
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
  ]
}
```

## Informations supplémentaires

`first_name` et `give_name` sont des attributs racine de l'utilisateur Auth0. Ils peuvent uniquement être définis à la création de l'utilisateur via l'API Management de Auth0. Consultez la page [Normalized User Profiles][3] pour en savoir plus.

La section `user_metadata` du profil utilisateur est utilisée pour spécifier des informations utilisateur supplémentaires, par exemple :

{{< img src="account_management/saml/auth0_metadata.png" alt="À mettre à jour" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml/saml2webapp-tutorial
[2]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[3]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema