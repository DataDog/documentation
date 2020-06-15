---
title: Configurer SafeNet en tant que fournisseur d'identité SAML
kind: documentation
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
---
## Implémentation

Pour suivre les instructions formulées par SafeNet, consultez la page [SafeNet Trusted Access pour Datadog][1] (en anglais).

## Datadog

Suivez les [instructions principales pour la configuration de SAML][2].

* Les métadonnées du fournisseur d'identité sont disponibles dans la console SafeNet Trusted Access en cliquant sur le bouton **Download Metadata**.
* Dans Datadog, assurez-vous que la case **Identity Provider (IdP) Initiated Login** est cochée.
* Les [métadonnées du fournisseur de service][3] de Datadog sont requises.

## SafeNet

1. Ajoutez une application nommée `Datadog`.
2. Sous **STA Setup**, cliquez sur **Upload Datadog Metadata**.
3. Depuis la fenêtre **Metadata upload**, cliquez sur **Browse** pour rechercher et sélectionner les métadonnées Datadog téléchargées précédemment. Les informations du fournisseur de service s'affichent sous **Account Details**.
4. Cliquez sur **Save Configuration** pour enregistrer les détails et activer l'application Datadog dans SafeNet Trusted Access.

## Vérifier l'authentification

### Utilisation de la console STA

Accédez à l'URL de connexion Datadog. Vous êtes redirigé vers la page de connexion à SafeNet Trusted Access. Saisissez vos identifiants et passez la double authentification. Vous accédez alors à Datadog.

**Remarque** : pour utiliser le mode d'initiation par le fournisseur d'identité, récupérez l'**Assertion Consumer Service URL** depuis Datadog et saisissez-la sur la console SafeNet Trusted Access.

### Utilisation du portail utilisateur STA

Accédez à l'URL du portail utilisateur pour vous connecter au dashboard du portail utilisateur STA. Le dashboard présente une liste d'applications auxquelles vous avez accès. Cliquez sur l'icône de l'application Datadog pour accéder à Datadog après l'authentification.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://resources.safenetid.com/help/Datadog/Index.htm
[2]: /fr/account_management/saml/#configure-saml
[3]: https://app.datadoghq.com/account/saml/metadata.xml