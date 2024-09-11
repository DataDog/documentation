---
title: Configurer Azure Active Directory en tant que fournisseur d'identité SAML
aliases:
  - /fr/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
  - link: /account_management/saml/
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: /account_management/multi_organization/
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
## Configuration

Suivez le tutoriel [Intégration de l'authentification unique Azure Active Directory à Datadog][1} pour configurer Azure AD en tant que fournisseur d'identité SAML. **Remarque** : un abonnement Azure AD est requis. Si vous n'avez pas d'abonnement, créez un [compte gratuit][2].

### Datadog

1. Accédez à la [page SAML de Datadog][3].

2. Choisissez et importez le fichier **SAML XML Metadata** téléchargé depuis Azure.

3. Les messages **SAML is ready** et **Valid IdP metadata installed** devraient s'afficher :

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. Cliquez sur **Enable** pour commencer à utiliser l'authentification unique Azure AD avec SAML :

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### URL avancée

Si vous utilisez l'authentification unique à l'aide d'un bouton ou d'un lien Datadog, une URL d'authentification est requise :

1. Récupérez votre URL d'authentification unique depuis la [page SAML de Datadog][3] :

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. Dans Azure, accédez à la section SSO Configuration de votre application Azure, cochez la case **Show advanced URL settings** et ajoutez votre URL d'authentification unique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup