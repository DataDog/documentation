---
title: Activer le SSO avec Okta
---

Si vous préférez que vos utilisateurs accèdent à Cloudcraft uniquement via votre fournisseur d'identité, activez l'option **Strict mode**.

Cet article vous aide à configurer le SSO si votre fournisseur d'identité est Okta. Pour les autres fournisseurs d'identité, consultez les articles suivants :

- [Activer le SSO avec Azure AD][1]
- [Activer le SSO avec un fournisseur d'identité générique][2]

Pour des informations générales sur l'utilisation du SSO avec Cloudcraft, consultez la section [Activer le SSO dans votre compte][3].

## Configuration de SAML/SSO

<div class="alert alert-info">Seul le propriétaire du compte peut configurer la fonctionnalité SAML SSO. Si le propriétaire du compte n'est pas en mesure de configurer le SSO, <a href="https://app.cloudcraft.co/app/support" title="Contacter l'équipe d'assistance de Cloudcraft">contactez l'équipe d'assistance de Cloudcraft</a> pour activer cette fonctionnalité.</div>

1. Dans Cloudcraft, accédez à **User** > **Security & SSO**.
2. Les détails dont vous avez besoin pour créer une nouvelle application avec Okta se trouvent dans la section **Cloudcraft service provider details**.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="Capture d'écran des détails du fournisseur de services Cloudcraft pour la configuration du fournisseur d'identité avec l'ID d'entité et l'URL du service consommateur d'assertion." responsive="true" style="width:100%;">}}

3. Connectez-vous à Okta en tant qu'administrateur.
4. Cliquez sur **Application**.
5. Cliquez sur **Add Application**, puis cliquez sur **Create New App**.
6. Sélectionnez **SAML 2.0** comme méthode de connexion et cliquez sur **Create**.
7. Saisissez **Cloudcraft** comme nom de l'application et laissez les valeurs restantes telles quelles.
8. Cliquez sur **Next**.

<div class="alert alert-info">Si vous préférez utiliser un logo d'application, vous pouvez utiliser <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Logo Cloudcraft" rel="noopener noreferrer" target="_new">ce logo</a> qui respecte les restrictions de taille d'Okta.
</div>

9. Ensuite, configurez l'intégration SAML en utilisant les détails fournis par Cloudcraft. Les champs sont mappés comme suit, le premier étant l'étiquette dans Okta et le second étant l'étiquette chez Cloudcraft.
    - **Single sign on URL** : URL du service consommateur d'assertions
    - **Audience URI** : ID de l'entité prestataire de services

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="Capture d'écran de l'interface des paramètres SAML avec des champs pour l'URL de connexion unique et la configuration de l'ID d'entité." responsive="true" style="width:80%;">}}

10. Dans le menu déroulant **Name ID format**, sélectionnez **EmailAddress**.
11. Passez à l'écran suivant et sélectionnez **I'm an Okta customer adding an internal app** pour répondre à la question « Are you a customer or partner? ».
12. Cliquez sur **Finish**. Maintenant que l'application est configurée dans Okta, vous pouvez y attribuer vos utilisateurs et une fois que vous avez terminé, accédez à l'onglet **Sign On**.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Capture d'écran affichant les paramètres de configuration SAML 2.0 dans une interface d'intégration d'application Okta." responsive="true" style="width:80%;">}}

13. Sous le bouton **View Setup Instructions**, cliquez sur le lien bleu pour télécharger le fichier requis pour le téléchargement vers Cloudcraft.
14. Revenez à Cloudcraft et téléchargez votre fichier de configuration.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="Statut de SAML Single Sign-On configuré avec succès avec l'URL du fournisseur d'identité visible dans l'interface des paramètres de sécurité." responsive="true" style="width:80%;">}}

15. Basculez l'option **SAML Single Sign-On is enabled**.
16. Si vous préférez que vos utilisateurs accèdent à Cloudcraft uniquement via votre fournisseur d'identité, activez l'option **Strict mode**.

[1]: /fr/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /fr/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /fr/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/app/support