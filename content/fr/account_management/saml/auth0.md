---
title: Configurer Auth0 en tant que fournisseur d'identité SAML
aliases:
  - /fr/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
---
## Configuration

Suivez les instructions de [cette page][1] (en anglais) pour configurer Auth0 en tant que fournisseur d'identité SAML.

## Informations supplémentaires

`first_name` et `give_name` sont des attributs racine de l'utilisateur Auth0. Ils peuvent uniquement être définis à la création de l'utilisateur via l'API Management d'Auth0. Consultez la page [Profils d'utilisateur normalisés][2] (en anglais) pour en savoir plus.

La section `user_metadata` du profil utilisateur est utilisée pour spécifier des informations utilisateur supplémentaires, par exemple :

{{< img src="account_management/saml/auth0_metadata.png" alt="À mettre à jour" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[2]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema