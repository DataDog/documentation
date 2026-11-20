---
title: Application mobile Datadog avec connexion SAML initiée par un fournisseur d'identité
is_public: true
aliases:
  - /fr/account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
## Configuration

Pour pouvoir utiliser l'application mobile Datadog avec une connexion SAML initiée par un fournisseur d'identité, vous devez transmettre un état de relais supplémentaire via Datadog. Cela permet de déclencher l'affichage de la page de destination de l'application mobile lors de la connexion. Une fois cette fonctionnalité activée, toutes les connexions SAML pour cette application passent par une page interstitielle avant de rediriger vers l'application.

- Sur les **appareils mobiles** dotés de l'application mobile Datadog, les utilisateurs doivent **d'abord se connecter à l'aide de leur fournisseur d'identité sur leur navigateur mobile** (consultez ci-dessous un exemple avec Google). L'app capture ensuite automatiquement la requête et autorise l'utilisateur à se connecter.

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="État de relais du fournisseur d'identité Google" >}}

- Sur les **ordinateurs de bureau** ou les appareils sans l'application, les utilisateurs doivent cliquer sur « Use the Datadog Website » pour se connecter.

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Page interstitielle SAML de l'application mobile Datadog" >}}

## Fournisseurs

**Remarque** : il est possible d'initier une connexion SAML avec Datadog à partir de la plupart des fournisseurs d'identité. Si vous ne parvenez pas à configurer votre fournisseur d'identité avec l'app mobile Datadog, contactez l'[assistance Datadog][1].

### OneLogin

Lors de la configuration de votre application OneLogin, dans la section **Application Details**, définissez l'état de relais sur la valeur `dd_m_idp`.
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="Section Application Details de OneLogin" >}}

### Okta

Lors de la configuration de l'application Okta, dans l'onglet **Configure SAML**, définissez le paramètre Default RelayState sur la valeur `dd_m_idp`.
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Page de configuration du SAML d'Okta" >}}

### Google

Lors de la configuration du SAML pour votre application Google, dans la section Service provider details, définissez le champ **Start URL** sur la valeur `dd_m_idp`.
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Section Service provider details de Google" >}}

## Dépannage

Si une erreur `403 Forbidden` s'affiche lors de la connexion après que vous avez configuré l'état de relais, contactez l'[assistance][1] pour vérifier que la fonctionnalité a bien été activée pour votre organisation.

[1]: /fr/help/