---
title: Activer le SSO avec un fournisseur d'identité générique
---

L'activation du Single Sign-On (SSO) dans Cloudcraft vous permet de simplifier l'authentification et l'accès de connexion à Cloudcraft.

Cet article vous aide à configurer le SSO si vous n'avez pas de guide spécifique pour votre fournisseur d'identité. Si votre fournisseur d'identité est Azure AD ou Okta, consultez les articles suivants :

- [Activer le SSO avec Azure AD][1]
- [Activer le SSO avec Okta][2]

Pour plus d'informations générales sur l'utilisation du SSO avec Cloudcraft, consultez la section [Activer le SSO dans votre compte][3].

## Configuration de SAML/SSO

<div class="alert alert-info">Seul le propriétaire du compte peut configurer la fonctionnalité SAML SSO. Si le propriétaire du compte n'est pas en mesure de configurer le SSO, <a href="https://app.cloudcraft.co/app/support" title="Contacter l'équipe d'assistance de Cloudcraft">contactez l'équipe d'assistance de Cloudcraft</a> pour activer cette fonctionnalité.</div>

1. Dans Cloudcraft, accédez à **User** > **Security & SSO**.
2. Les détails dont vous avez besoin pour créer une nouvelle application avec Azure se trouvent dans la section **Cloudcraft service provider details**.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/service-provider-details.png" alt="Capture d'écran des détails du fournisseur de services Cloudcraft pour la configuration du fournisseur d'identité avec l'ID d'entité et l'URL du service consommateur d'assertion." responsive="true" style="width:100%;">}}

3. Connectez-vous à votre fournisseur d'identité en tant qu'administrateur.
4. Suivez sa documentation pour créer une nouvelle application pour l'intégration SAML.
5. Mappez ses champs avec les champs de Cloudcraft. Pour référence, les champs sont généralement mappés comme suit, le premier étant l'étiquette utilisée par votre fournisseur d'identité et le second étant l'étiquette chez Cloudcraft.

    - **Single sign on URL** : URL du service consommateur d'assertions
    - **Audience URI** : ID de l'entité prestataire de services
    - **Name ID** : format NameId

6. Si le champ **Name ID** est un menu déroulant, sélectionnez **emailAddress** ou similaire.

<div class="alert alert-info">Vous pouvez également inclure un logo d'application pour permettre aux utilisateurs de voir plus facilement dans quelle application ils se connectent. Nous en avons un qui correspond aux restrictions de la plupart des fournisseurs <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Logo Cloudcraft" rel="noopener noreferrer" target="_new">par ici</a>.
</div>

7. Configurez l'application pour permettre l'accès à tous les utilisateurs concernés au sein de votre organisation.
8. Téléchargez le fichier de métadonnées généré par votre fournisseur, parfois appelé XML de fédération.
9. Revenez à Cloudcraft et téléchargez votre fichier XML de métadonnées.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/upload-metadata.png" alt="Statut de SAML Single Sign-On configuré avec succès avec l'URL du fournisseur d'identité visible dans l'interface des paramètres de sécurité." responsive="true" style="width:100%;">}}

10. Basculez l'option **SAML Single Sign-On is enabled**.
11.  Si vous préférez que vos utilisateurs accèdent à Cloudcraft uniquement via votre fournisseur d'identité, activez l'option **Strict mode**.

[1]: /fr/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /fr/cloudcraft/account-management/enable-sso-with-okta/
[3]: /fr/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/support