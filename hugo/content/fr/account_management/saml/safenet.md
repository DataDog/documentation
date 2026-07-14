---
title: Configurer SafeNet en tant que fournisseur d'identité SAML
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
---
## Implémentation

Suivez les [instructions de configuration globales du SAML][1], puis consultez la page [SafeNet Trusted Access pour Datadog}[2] (en anglais) pour configurer SafeNet en tant que fournisseur SAML.

## Datadog

* Les métadonnées du fournisseur d'identité sont disponibles dans la console SafeNet Trusted Access en cliquant sur le bouton **Download Metadata**.
* Dans Datadog, assurez-vous que la case **Identity Provider (IdP) Initiated Login** est cochée.
* Les [métadonnées du fournisseur de service][3] de Datadog sont requises.

## Vérifier l'authentification

### Utilisation de la console STA

Accédez à l'URL de connexion Datadog. Une fois redirigé vers la page de connexion à SafeNet Trusted Access, saisissez vos identifiants et passez la double authentification. Vous accédez alors à Datadog.

**Remarque** : pour utiliser le mode d'initiation par le fournisseur d'identité, récupérez l'**Assertion Consumer Service URL** depuis Datadog et saisissez-la sur la console SafeNet Trusted Access.

### Utilisation du portail utilisateur STA

Accédez à l'URL du portail utilisateur pour vous connecter au dashboard du portail utilisateur STA. Le dashboard présente la liste des applications auxquelles vous avez accès. Cliquez sur l'icône de l'application Datadog pour accéder à Datadog après l'authentification.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml/#configure-saml
[2]: https://resources.safenetid.com/help/Datadog/Index.htm
[3]: https://app.datadoghq.com/account/saml/metadata.xml