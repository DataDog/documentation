---
title: Configurer Google en tant que fournisseur d'identité SAML
kind: documentation
aliases:
  - /fr/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
## Configuration de Google en tant que fournisseur d'identité SAML

[Consultez les instructions Google spécifiques][1].

## Détails du prestataire de services

**Pré-requis** ; vous devez avoir coché « IDP initiated SSO » sur la page de configuration de SAML de Datadog.

* **Application Name** : le nom de votre choix.
* **Description** : la description de votre choix.
* **ACS URL** : utilisez l'URL qui figure dans « Assertion Consumer Service URL » via la page https://app.datadoghq.com/saml/saml_setup (celle contenant `/id/`). Si plusieurs valeurs s'affichent pour « Assertion Consumer Service URL », saisissez seulement l'une d'entre elles.
* **Entity ID** :  `https://app.datadoghq.com/account/saml/metadata.xml`.
* **Start URL** : laissez ce champ vide ou utilisez l'URL « Single Sign On Login URL » figurant sur les pages https://app.datadoghq.com/saml/saml_setup et https://app.datadoghq.com/account/team.
* **Signed Response** : ne cochez pas cette case.
* **Name ID** : « informations de base » « principale adresse e-mail »

## Mappage des attributs

* « urn:oid:1.3.6.1.4.1.5923.1.1.1.6 » « informations de base » « principale adresse e-mail »

Ajoutez également :

* « urn:oid:2.5.4.4 » « informations de base » « principale adresse e-mail »
* « urn:oid:2.5.4.42 » « informations de base » « principale adresse e-mail »

{{< img src="account_management/saml/zAttributeMapping.png" alt="Mappage d'attributs" style="width:75%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768