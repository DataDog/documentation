---
title: Configuration de Microsoft Active Directory Federation Services en tant que fournisseur d'identité SAML
kind: documentation
aliases:
  - /fr/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
  - link: account_management/saml
    tag: Documentation
    text: Configurer SAML pour votre compte Datadog
  - link: account_management/multi_organization
    tag: Documentation
    text: Configurer des équipes et organisations avec plusieurs comptes
---
L'intégration SAML Datadog pour l'authentification unique permet d'associer en toute simplicité une organisation à un système de gestion d'utilisateurs externe, afin de conserver et de gérer depuis un système centralisé tous les identifiants.

Cet article vient compléter le guide principal sur cette intégration, qui est disponible ci-dessous. Il développe des étapes supplémentaires qui peuvent être nécessaires lors de l'association de Datadog à ADFS.

[Authentification unique avec SAML (document principal)][1]

**Suivez les étapes suivantes pour réaliser la configuration avec ADFS.**

Ouvrez la console de gestion d'ADFS. Vous pouvez passer par le Server Manager, comme affiché ci-dessous :

{{< img src="account_management/saml/1ef6IBS.png" alt="1ef6IBS"  style="width:60%;">}}

Cliquez sur le bouton Add a Relying Party Trust sur la droite.

{{< img src="account_management/saml/O85HjIi.png" alt="O85HjIi"  style="width:60%;">}}

Cela permet d'ouvrir un assistant connexe, avec un écran d'accueil qui décrit la fonctionnalité. Lisez la description et cliquez sur Start pour commencer.

{{< img src="account_management/saml/KWe4h6W.png" alt="KWe4h6W"  style="width:60%;">}}

Importez le [fichier des métadonnées SAML de Datadog][2].

Vous devez vous connecter pour accéder au fichier. Il est donc plus facile de le télécharger puis de l'importer, plutôt que d'utiliser directement l'URL, comme proposé dans les options d'importation ci-dessous. Attention : lorsque vous téléchargez le fichier, si vous ouvrez ou renommez le fichier, le type du fichier peut être modifié, ce qui peut provoquer des problèmes de parsing xml lors de l'étape suivante.

{{< img src="account_management/saml/UAjeUVL.png" alt="UAjeUVL"  style="width:60%;">}}

Cliquez sur Browse pour sélectionner le fichier de métadonnées téléchargé, puis sur Next.

{{< img src="account_management/saml/LWZCPG6.png" alt="LWZCPG6"  style="width:60%;">}}

Donnez un nom d'affichage à la partie de confiance, comme « Datadog » ou un nom similaire, puis cliquez sur Next.

{{< img src="account_management/saml/IQDM19N.png" alt="IQDM19N"  style="width:60%;">}}

L'authentification multifacteur n'est pas prise en charge à l'heure actuelle. Laissez les paramètres par défaut et cliquez sur Next.

{{< img src="account_management/saml/AhM25jW.png" alt="AhM25jW"  style="width:60%;">}}

Autorisez l'accès pour tous les utilisateurs et cliquez sur Next.

Remarque : il est possible de contrôler l'accès via Datadog en invitant uniquement des utilisateurs précis dans votre organisation à partir de [la page d'équipe de l'application][3]

{{< img src="account_management/saml/Rd13Ofm.png" alt="Rd13Ofm"  style="width:60%;">}}

Vérifiez les informations de la partie de confiance afin de vous assurer que le endpoint est bien configuré, puis cliquez sur Next.

{{< img src="account_management/saml/xex71aV.png" alt="xex71aV"  style="width:60%;">}}

Pour finir, cliquez sur Close. Cette action enregistre la définition de la partie de confiance et ouvre la fenêtre des revendications qui vous propose d'ajouter des règles de revendication.

{{< img src="account_management/saml/5NkUanW.png" alt="5NkUanW"  style="width:60%;">}}

Nous recommandons d'en ajouter deux pour l'intermédiation des assertions SAML. Commencez par cliquer sur le bouton Add Rule pour en ajouter.

{{< img src="account_management/saml/QkNaDCD.png" alt="QkNaDCD"  style="width:60%;">}}

La première règle concerne les attributs LDAP. Elle permet de garantir que les informations nécessaires circulent entre les deux systèmes. Configurez la règle comme affiché ci-dessous et cliquez sur OK pour enregistrer. Assurez-vous d'utiliser trois champs distincts pour « E-Mail-Addresses », « Given-Name » et « Surname » pour éviter que des informations pertinentes aient le statut « None » plus tard.

{{< img src="account_management/saml/cogaUQT.png" alt="cogaUQT" style="width:60%;">}}

La seconde règle applique une transformation. Datadog indique `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` pour le format de NameIDPolicy dans les requêtes d'assertion où ADFS les demande nativement au format Name ID. Il faut donc transformer le format de l'e-mail au format Name ID.

Sélectionnez Transform an Incoming Claim dans le menu déroulant, puis cliquez sur **Next** pour continuer.

{{< img src="account_management/saml/JS5FNbR.png" alt="JS5FNbR"  style="width:60%;">}}

Suivez la configuration ci-dessous, puis cliquez sur **Finish**.

{{< img src="account_management/saml/OT9i0K5.png" alt="OT9i0K5"  style="width:60%;">}}

Cliquez sur OK pour enregistrer les nouvelles règles de revendication.

{{< img src="account_management/saml/CeCyDmc.png" alt="CeCyDmc"  style="width:60%;">}}

Pour finir, téléchargez et importez les métadonnées du fournisseur d'identité d'ADFS depuis le serveur ADFS vers la configuration SAML sur la [page SAML de votre organisation Datadog][4].

Vous pouvez télécharger ce fichier à partir de l'URL suivante (remplacez le nom du host par le nom du host DNS public de votre serveur) : `https://hostname/FederationMetadata/2007-06/FederationMetadata.xml`.

Procédez à l'importation vers votre organisation Datadog à partir de la page de configuration SAML comme ici :

{{< img src="account_management/saml/KJxaVYe.png" alt="KJxaVYe"  style="width:60%;">}}

Et voilà ! Une fois SAML configuré, les utilisateurs peuvent se connecter en utilisant le lien fourni dans la page de configuration SAML.

N'oubliez pas que les utilisateurs doivent toujours être invités et activés avant de pouvoir se connecter. Invitez de nouveaux utilisateurs en saisissant bien l'adresse e-mail qui correspond à leur dossier d'utilisateur Active Directory, sans quoi l'accès pourrait leur être refusé, comme ci-dessous :

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla"  style="width:60%;">}}

Bien que dans la plupart des configurations, l'adresse utilisateur@domaine appartienne à l'utilisateur, ce n'est pas le cas avec la connexion Microsoft. Vous pouvez confirmer l'adresse e-mail utilisée au sein du dossier d'utilisateur comme ci-dessous :

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK"  style="width:60%;">}}

Si vous avez des questions ou si vous avez besoin d'aide, contactez [l'équipe d'assistance Datadog][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/saml
[2]: https://app.datadoghq.com/account/saml/metadata.xml
[3]: https://app.datadoghq.com/account/team
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: /fr/help