---
title: Configurer Okta en tant que fournisseur d'identité SAML
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
## Configuration

Suivez la documentation [Comment configurer SAML 2.0 pour Datadog][1] afin de configurer Okta en tant que fournisseur d'identité SAML.

**Remarque** : il est conseillé de configurer Datadog en tant qu'application Okta manuellement, et non en utilisant une configuration `pre-configured`.

## Détails généraux

| Champ de saisie du fournisseur d'identité Okta        | Valeur attendue                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| URL d'authentification unique          | URL « Assertion Consumer Service » (figurant dans le champ *Assertion Consumer Service URL* de la page [Configure SAML][2]) |
| URL du destinataire               | URL « Assertion Consumer Service » (ou cochez la case *Use this for Recipient URL and Destination URL*)                        |
| URL de la destination             | URL « Assertion Consumer Service » (ou cochez la case *Use this for Recipient URL and Destination URL*)                        |
| URI d'audience (ID de l'entité du prestataire de service) | Service Provider Entity ID (figurant dans le champ *Service Provider Entity ID* de la page [Configure SAML][2])         |
| Format de l'ID de nom              | EmailAddress                                                                                                                   |
| Réponse                    | Signée                                                                                                                         |
| Signature de l'assertion         | Signée                                                                                                                         |
| Algorithme de signature         | SHA256                                                                                                                         |
| Chiffrement de l'assertion        | Les assertions peuvent être chiffrées, mais ce n'est pas obligatoire.                                                     |
| Déconnexion unique SAML          | Désactivée                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| Respecter l'authentification forcée  | Oui                                                                                                                            |
| ID de l'émetteur SAML              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## Détails des déclarations d'attributs

| Nom       | Format du nom (facultatif) | Valeur                                             |
|------------|------------------------|---------------------------------------------------|
| FormatNom | Référence URI          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | Référence URI          | `user.lastName`                                   |
| givenName  | Référence URI          | `user.firstName`                                  |

## Déclarations d'attributs de groupe (facultatif)

Ces déclarations sont uniquement requises si vous utilisez le [mappage AuthN][3].

| Nom     | Format du nom (facultatif) | Valeur                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | Non spécifié            | Correspond à l'expression régulière `.*`. Cette méthode récupère tous les groupes. Contactez l'administrateur de votre fournisseur d'identité si ce comportement ne vous convient pas. |


Pour en savoir plus sur la configuration SAML pour votre compte Datadog, consultez la [documentation dédiée][4].

Si vous devez importer un fichier `IDP.XML` dans Datadog et que vous n'êtes pas en mesure de configurer entièrement l'application dans Okta, consultez l'article [Acquérir le fichier de métadonnées idp.xml pour une application de modèle SAML][5] (en anglais). Vous y trouverez des instructions concernant les placeholders des différents champs.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-DataDog.html
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: /fr/account_management/saml/#mapping-saml-attributes-to-datadog-roles
[4]: /fr/account_management/saml/
[5]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App