---
title: Configurer Okta en tant que fournisseur d'identité SAML
kind: documentation
aliases:
  - /fr/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer vos équipes et organisations avec plusieurs comptes
---
Il est conseillé de configurer Datadog en tant qu'application Okta manuellement, et non en utilisant une configuration prédéfinie.

## Détails généraux

* **Single Sign On URL** : https://app.datadoghq.com/account/saml/assertion
    REMARQUE : si vous avez activé l'initiation de la connexion par le fournisseur d'identité, utilisez l'URL publique spécifique à l'ID générée après l'activation de la fonctionnalité dans Datadog. Cette URL se trouve sur la page '[Configure SAML][1]', au niveau du champ 'Assertion Consumer Service URL'. Exemple d'URL : `https://app.datadoghq.com/account/saml/assertion/id/`. Cela s'applique également aux champs **Recipient URL** et **Destination URL**, respectivement.

* **Recipient URL** : https://app.datadoghq.com/account/saml/assertion (ou cochez la case intitulée « Use this for Recipient URL and Destination URL » dans Okta pour utiliser l'URL d'authentification unique)

* **Destination URL** : https://app.datadoghq.com/account/saml/assertion (ou cochez la case intitulée « Use this for Recipient URL and Destination URL » dans Okta pour utiliser l'URL d'authentification unique)

* **Audience URL (SP Entity ID)** : https://app.datadoghq.com/account/saml/metadata.xml

* **Default Relay State** : 

* **Name ID Format** : EmailAddress

* **Response** : Signed

* **Assertion Signature** : Signed

* **Signature Algorithm** : RSA_SHA256

* **Digest Algorithm** : SHA256
* **Assertion Encryption** : les assertions peuvent être chiffrées, mais les assertions non chiffrées sont également acceptées.
* **SAML Single Logout** : Disabled
* **authnContextClassRef** : PasswordProtectedTransport
* **Honor Force Authentication** : Yes
* **SAML Issuer ID** : `http://www.okta.com/`

## Détails des déclarations d'attributs

* **NameFormat** : urn:oasis:names:tc:SAML:2.0:attrname-format:uri
* **sn** : user.lastName
* **givenName** : user.firstName

Pour en savoir plus sur la configuration du SAML pour votre compte Datadog, consultez la [page de la documentation dédiée au SAML][2]. Si vous utilisez la fonctionnalité de sous-domaine personnalisé, les détails associés figurent également sur cette page.

Si vous devez importer un fichier `IDP.XML` dans Datadog et que vous n'êtes pas en mesure de configurer entièrement l'application dans Okta, consultez l'article [Acquérir le fichier de métadonnées idp.xml pour une application de modèle SAML][3] (en anglais). Vous y trouverez des instructions concernant les placeholders des différents champs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/saml/saml_setup
[2]: /fr/account_management/saml/
[3]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App