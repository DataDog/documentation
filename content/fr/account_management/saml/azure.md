---
title: Configurer Azure Active Directory en tant qu'IdP SAML
kind: documentation
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
Suivez les étapes ci-dessous pour configurer Azure AD en tant que fournisseur d'identité SAML dans Datadog. **Remarque** : un abonnement Azure AD est requis. Si vous n'avez pas d'abonnement, créez un [compte gratuit][1].

## Configuration
### Azure

1. Ouvrez le [portail Azure][2] et connectez-vous en tant qu'administrateur ou co-administrateur global.

2. Accédez à _Azure Active Directory_ -> _Enterprise applications_ -> _New application_.

3. Faites défiler la page jusqu'à atteindre la section **Add from the gallery**, et saisissez **Datadog** dans la zone de recherche.

4. Sélectionnez **Datadog** dans le volet des résultats.

5. Saisissez le nom de votre application dans la zone de texte **Name** et cliquez sur **Add**.

6. Une fois votre application ajoutée, accédez à **Single sign-on** dans le menu de navigation sur la gauche de l'application.

7. Sur la page **Select a single sign-on method**, cliquez sur **SAML**. 

8. Récupérez vos informations `Service Provider Entity ID` et `Assertion Consumer Service URL` depuis la [page SAML de Datadog][3]. Les valeurs par défaut sont les suivantes :

    |                                |                                                                                                                |
    |--------------------------------|----------------------------------------------------------------------------------------------------------------|
    | Service Provider Entity ID     | `https://{{< region-param key="dd_full_site" >}}/account/saml/metadata.xml` |
    | Assertion Consumer Service URL | `https://{{< region-param key="dd_full_site" >}}/account/saml/assertion`    |

9.  Dans Azure, ajoutez les valeurs récupérées ci-dessus et cliquez sur Save :

    `Service Provider Entity ID` dans **Identifier**<br>
    `Assertion Consumer Service URL` dans **Reply URL**

10. Définissez **User Identifier** sur `user.mail` et cliquez sur Save.

11. Accédez à la section **SAML Signing Certificate** et vérifiez que votre adresse e-mail de notification dans **Notification Email** est correcte. Lorsque la date d'expiration du certificat de signature actif se rapprochera, des notifications seront envoyées à cette adresse e-mail avec les instructions à suivre pour mettre à jour le certificat.

12. Dans la même section **SAML Signing Certificate**, recherchez **Federation Metadata XML** et sélectionnez Download pour télécharger le certificat et l'enregistrer.

### Datadog

1. Accédez à la [page SAML de Datadog][3].

2. Choisissez et importez le fichier **SAML XML Metadata** téléchargé depuis Azure.

3. Les messages **SAML is ready** et **Valid IdP metadata installed** devraient s'afficher :

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

4. Cliquez sur **Enable** pour commencer à utiliser l'authentification unique Azure AD avec SAML :

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}

## URL avancée

Si vous utilisez l'authentification unique à l'aide d'un bouton ou d'un lien Datadog, une URL d'authentification est requise :

1. Récupérez votre URL d'authentification unique depuis la [page SAML de Datadog][3] :

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:70%;">}}

2. Dans Azure, accédez à la section SSO Configuration de votre application Azure, cochez la case **Show advanced URL settings** et ajoutez votre URL d'authentification unique.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://azure.microsoft.com/free/
[2]: https://portal.azure.com
[3]: https://app.datadoghq.com/saml/saml_setup