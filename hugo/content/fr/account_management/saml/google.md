---
aliases:
- /fr/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
description: Configurez Google en tant que fournisseur d'identité SAML pour Datadog
  avec les détails du fournisseur de services et le mappage d'attributs pour une authentification
  unique sécurisée.
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configurer SAML pour votre compte Datadog
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configurer vos équipes et organisations avec plusieurs comptes
title: Configurer Google en tant qu'IdP SAML
---
## Configuration de Google en tant qu'IdP SAML {#setting-up-google-as-a-saml-idp}

[Consultez les instructions Google spécifiques][1].

## Détails du prestataire de services {#service-provider-details}

En guise de prérequis, {{< ui >}}IDP initiated SSO{{< /ui >}} doit être coché sur la [page de configuration SAML][2] de Datadog.

Application Name
: Peut être n'importe quoi

Description
: Peut être n'importe quoi

ACS URL
: Utilisez l'URL indiquée sous {{< ui >}}Assertion Consumer Service URL for IdP Initiated Login{{< /ui >}} sur la [page de configuration SAML][2] (celle contenant `/id/`). Si plusieurs valeurs sont affichées pour Assertion Consumer Service URL, n'en saisissez qu'une seule ici.

Entity ID
: Utilisez l'URL indiquée sous {{< ui >}}Entity ID{{< /ui >}} sur la [page de configuration SAML][2].

URL de départ
: Peut être laissé vide, ou le {{< ui >}}Single Sign On Login URL{{< /ui >}} indiqué sur la [page de configuration SAML][2] peut être utilisé.

Signed Response
: Laissez la case décochée

Name ID
: Sélectionnez {{< ui >}}Basic Information{{< /ui >}} et {{< ui >}}Primary Email{{< /ui >}}

## Mappage d'attributs {#attribute-mapping}

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

Ajoutez également :

* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup