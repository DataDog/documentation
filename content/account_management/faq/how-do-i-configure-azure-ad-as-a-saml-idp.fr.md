---
title: Comment configurer Azure AD comme un SAML IdP?
kind: faq
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: Configurez SAML pour votre compte Datadog
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: Configurez vos Teams et Organisations avec plusieurs comptes
---

Vous trouverez ci-dessous un guide pas à pas pour configurer Azure AD en tant qu'IdP SAML dans Datadog:
**Note**: un abonnement Azure AD Premium est requis pour configurer ce service.

1. Allez à `manage.windowsazure.com`

2. Allez dans le sous-menu `Active Directory` 

3. Sélectionnez l'Active directory que vous voulez utiliser pour SSO

4. Allez dans la section "Applications" le long de la barre de navigation supérieure

5. Appuyez "Add" en bas de l'écran
    {{< img src="account_management/faq/Step5redo.png" alt="Step5redo" responsive="true" popup="true">}}

6. Selectionnez "Add an application from the gallery"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure.png" alt="Active_Directory_-_Microsoft_Azure" responsive="true" popup="true">}}


7. Sélectionnez "Custom" -> "Add an unlisted application my organization is using" -> Entrez un nom tel "DatadogSSOApp" comme nom d'application. Puis appuyez sur le bouton check une fois terminé.
    **NOTE**: Si vous ne voyez pas l'option "Add an unlisted application my organization is using", cela signifie que vous ne disposez pas de l'abonnement Premium pour Azure AD. Effectuez une mise à niveau vers Azure AD Premium, puis actualisez la page.
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure2.png" alt="Active_Directory_-_Microsoft_Azure2" responsive="true" popup="true">}}

8. Une fois que l'application a été crée, sélectionnez "Configure single sign-on"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure3.png" alt="Active_Directory_-_Microsoft_Azure3" responsive="true" popup="true">}}

9. Sélectionnez "Microsoft Azure AD Single Sign-On"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure4.png" alt="Active_Directory_-_Microsoft_Azure4" responsive="true" popup="true">}}

10. Allez à https://app.datadoghq.com/saml/saml_setup , Trouvez votre Service Provider Entity ID et  l'url de Assertion Consumer Service à la droite de la page.  Copiez/collez ces valeurs respectivement dans les champs "Identifier" et "Reply URL" text.
    {{< img src="account_management/faq/Step10Redo.png" alt="Step10Redo" responsive="true" popup="true">}}
    {{< img src="account_management/faq/Step10Redo2.png" alt="Step10Redo2" responsive="true" popup="true">}}

11. Sur la page suivante téléchargez Metadata (XML), cochez la case confirmant que vous avez configuré votre SSO et appuyez sur suivant. Préparez vous à utiliser ce fichier à l'étape 17

12. Entrez l'adresse Email où vous voulez recevoir des notifications sur les différentes maintenances.

13. Une fois de retour à la page principale des applications, allez à "Attributes"
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure6.png" alt="Active_Directory_-_Microsoft_Azure6" responsive="true" popup="true">}}

14. Dans "SAML Token Attributes", passez la souris sur la ligne où "TYPE" est "user attribute (nameid)" (généralement le premier) et cliquez sur l'icon de crayon pour le modifier.
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure7.png" alt="Active_Directory_-_Microsoft_Azure7" responsive="true" popup="true">}}

15. Changez la valeur de l'attribut  "user.mail" et pressez le bouton check
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure14.png" alt="Active_Directory_-_Microsoft_Azure14" responsive="true" popup="true">}}

16. Appuyez sur "Apply Changes" en bas de l'écran
    {{< img src="account_management/faq/Active_Directory_-_Microsoft_Azure9.png" alt="Active_Directory_-_Microsoft_Azure9" responsive="true" popup="true">}}

17. Retournez à https://app.datadoghq.com/saml/saml_setup et uploadez le fichier xml que vous avez téléchargé à l'étape 11:
    {{< img src="account_management/faq/SAML_Configuration___Datadog10.png" alt="SAML_Configuration___Datadog10" responsive="true" popup="true">}}

18. Faites attention de bien cliquer "Upload File" après avoir choisi le fichier XML

19. Et c'est tout! Vous devriez désormais observer que votre SAML est prêt et que des metadata IdP valides sont installées. Connectez vous à présent à Datadog via Azure AD en selectionnant "Enable".
  {{< img src="account_management/faq/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" responsive="true" popup="true">}}
  {{< img src="account_management/faq/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" responsive="true" popup="true">}}

**Optionnel**

Si vous utilisez un SSO via un bouton ou lien Datadog, vous devez rajouter un Sign-on URL. Pour cela retournez dans la section de configuration SSO de votre Azure Application, allez à l'étape 2, décochez "Show advanced settings (optional)" and collez le Single Sign-on URL qui est affiché sur la page de configuration SAML dans Datadog. (Vous devrez cliquer à nouveau sur l'assistant Azure pour enregistrer les modifications)
{{< img src="account_management/faq/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" responsive="true" popup="true">}}
{{< img src="account_management/faq/OptionalStepRedo.png" alt="OptionalStepRedo" responsive="true" popup="true">}}

{{< partial name="whats-next/whats-next.html" >}}