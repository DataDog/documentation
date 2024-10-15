---
aliases:
- /fr/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer des équipes et organisations avec plusieurs comptes
title: Configurer Google en tant que fournisseur d'identité SAML
---

## Configuration de Google en tant que fournisseur d'identité SAML

[Consultez les instructions Google spécifiques][1].

## Détails du prestataire de services

Comme condition préalable, **IDP initiated SSO** doit être coché sur la [page de configuration SAML][2] de Datadog.

Application Name
: le nom de votre choix.

Description
: la description de votre choix.

ACS URL
: utilisez l'URL qui figure dans **Assertion Consumer Service URL** sur la [page de configuration SAML][2] (celle qui contient `/id/`). Si plusieurs valeurs sont affichées pour Assertion Consumer Service URL, nʼen saisissez quʼune seule ici.

Entity ID
: Utilisez l'URL indiquée sous **Entity ID** sur la [page de configuration SAML][2].

Start URL
:  laissez ce champ vide ou utilisez l'URL **Single Sign On Login URL** indiquée sur la [page de configuration SAML][2].

Signed Response
: ne cochez pas cette case.

Name ID
: Sélectionnez les **informations de base** et la **principale adresse e-mail**.

## Mappage des attributs

* « urn:oid:1.3.6.1.4.1.5923.1.1.1.6 » « informations de base » « principale adresse e-mail »

Ajoutez également :

* « urn:oid:2.5.4.4 » « informations de base » « principale adresse e-mail »
* « urn:oid:2.5.4.42 » « informations de base » « principale adresse e-mail »

{{< img src="account_management/saml/zAttributeMapping.png" alt="Mappage d'attributs" style="width:75%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup