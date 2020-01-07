---
title: "Configurer Azure\_AD en tant que fournisseur d'identité SAML"
kind: documentation
aliases:
  - /fr/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
disable_toc: true
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: account_management/multi_organization
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
Vous trouverez ci-dessous un guide détaillé pour configurer Azure AD en tant que fournisseur d'identité SAML dans Datadog :
**Remarque** : un abonnement Azure AD Premium est requis pour configurer ce service.

#### Configuration

1. Accédez au site `https://portal.azure.com/`.

2. Une fois connecté à Azure, accédez à l'onglet *Azure Active Directory* dans le menu sur la gauche.

3. Sélectionnez le service **Applications d'entreprise**.

4. Cliquez sur le bouton **Nouvelle application**.

5. Sélectionnez **Application ne figurant pas dans la galerie**.

    {{< img src="account_management/saml/non_gallery_application.png" alt="Application ne figurant pas dans la galerie"  style="width:20%;">}}

6. Donnez-lui un nom (p. ex., **DatadogSSO_test**).

7. Cliquez sur **Ajouter**.

8. Une fois votre application ajoutée, accédez à **Configurer l'authentification unique (obligatoire)**.

9. Sélectionnez le mode d'authentification unique **Authentification SAML**.

    {{< img src="account_management/saml/saml_based_sign_on.png" alt="Authentification SAML"  style="width:70%;">}}

10. Accédez à la [page SAML de Datadog][1] et cherchez les URL **Service Provider Entity ID** et **Assertion Consumer Service** sur la droite. Copiez/collez respectivement ces valeurs dans les champs de texte **Identificateur** et **URL de réponse**.
    Dans Datadog :

    {{< img src="account_management/saml/Step10Redo.png" alt="Étape10répétition"  style="width:70%;">}}

    Dans le portail Azure :

    {{< img src="account_management/saml/set_values_azure.png" alt="Définir les valeurs dans Azure"  style="width:70%;">}}

11. Indiquez `user.mail` pour **Identificateur de l'utilisateur** :

    {{< img src="account_management/saml/user_identifier.png" alt="Identificateur d'utilisateur"  style="width:70%;">}}

12. Saisissez votre **E-mail de notification** en bas de la page. Lorsque la date d'expiration du certificat de signature actif se rapprochera, des notifications seront envoyées à cette adresse e-mail avec les instructions à suivre pour mettre à jour le certificat :

    {{< img src="account_management/saml/notification_email.png" alt="E-mail de notification"  style="width:70%;">}}

13. Cliquez en bas de la page de l'étape 5 sur **Configurer DatadogSSO_test**.

14. Défilez jusqu'à atteindre l'étape 3 de *Configurer DatadogSSO_test* afin d'accéder à la section relative à l'authentification unique, puis téléchargez le fichier de **métadonnées XML SAML**.

15. Allez en haut de votre **section Configuration SSO** et cliquez sur **Enregistrer**.

16. Revenez à la [page SAML de Datadog][1] et importez le fichier de **métadonnées XML SAML** téléchargé à l'étape 14 :

    {{< img src="account_management/saml/SAML_Configuration___Datadog10.png" alt="SAML_Configuration___Datadog10"  style="width:70%;">}}

17. Assurez-vous de cliquer sur le bouton **Upload File** après avoir choisi le fichier XML à importer.

18. Vous avez terminé la configuration ! Le message *SAML is ready* ainsi qu'une confirmation de la validité des métadonnées IdP devraient désormais s'afficher.

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11"  style="width:70%;">}}

19. Activez l'authentification à Datadog via Azure AD en cliquant sur **Enable** :

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12"  style="width:70%;">}}


#### Facultatif

Si vous cliquez sur un bouton ou un lien Datadog pour bénéficier de l'authentification unique, vous devez ajouter une URL de connexion. Pour ce faire, revenez à la section Configuration SSO de l'application Azure (étape 8) et cochez la case **Afficher les paramètres d'URL avancés** :

Collez ensuite l'URL d'authentification unique affichée dans la [page SAML de Datadog][1].

{{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13"  style="width:60%;">}}


#### Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://app.datadoghq.com/saml/saml_setup