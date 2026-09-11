---
title: Activer le SSO avec Azure AD
---

L'activation du Single Sign-On (SSO) avec Azure AD comme fournisseur d'identité vous permet de simplifier l'authentification et l'accès de connexion à Cloudcraft.

Cet article vous aide à configurer le SSO si votre fournisseur d'identité est Azure AD. Pour les autres fournisseurs d'identité, consultez les articles suivants :

- [Activer le SSO avec Okta][1]
- [Activer le SSO avec un fournisseur d'identité générique][2]

Pour plus d'informations générales sur l'utilisation du SSO avec Cloudcraft, consultez la section [Activer le SSO dans votre compte][3].

## Configuration de SAML/SSO

<div class="alert alert-info">Seul le propriétaire du compte peut configurer la fonctionnalité SAML SSO. Si le propriétaire du compte n'est pas en mesure de configurer le SSO, <a href="https://app.cloudcraft.co/app/support" title="Contacter l'équipe d'assistance de Cloudcraft">contactez l'équipe d'assistance de Cloudcraft</a> pour activer cette fonctionnalité.
</div>

1. Dans Cloudcraft, accédez à **User** > **Security & SSO**.
2. Les détails dont vous avez besoin pour créer une nouvelle application avec Azure se trouvent dans la section **Cloudcraft service provider details**.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Capture d'écran des détails du fournisseur de services Cloudcraft pour la configuration du fournisseur d'identité avec l'ID d'entité et l'URL du service consommateur d'assertion." responsive="true" style="width:100%;">}}

3. Connectez-vous à Azure en tant qu'administrateur.
4. Cliquez sur le menu avec trois points dans le coin supérieur gauche de l'écran et sélectionnez **Azure Active Directory**.
5. Dans la section **Manage** du menu de gauche, cliquez sur **Enterprise applications**.
6. Cliquez sur **New application** et sélectionnez **Non-gallery application**.
7. Saisissez **Cloudcraft** comme nom de l'application, puis cliquez sur **Add**.

Ensuite, configurez l'intégration SAML en utilisant les détails fournis par Cloudcraft.

1. Dans la section **Getting started**, sélectionnez **Set up single sign on**, puis cliquez sur **SAML**.
2. Sous la section **Basic SAML Configuration**, cliquez sur **Edit**.
3. Saisissez les détails fournis par Cloudcraft. Les champs sont mappés comme suit, la première valeur étant l'étiquette dans Azure AD et la seconde étant l'étiquette dans la boîte de dialogue Cloudcraft.
    - **Identifier** : ID de l'entité prestataire de services
    - **Reply URL** : URL du service consommateur d'assertions
    - **Sign on URL** : laissez ce champ vide pour permettre le SSO initié par le fournisseur d'identité

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Capture d'écran de l'interface de configuration SAML de base affichant les champs pour l'identifiant (ID d'entité) et l'URL de réponse (URL du service consommateur d'assertion)." responsive="true" style="width:80%;">}}

4. Cliquez sur **Save** pour revenir à l'écran précédent.
5. Sous la section **SAML Signing Certificate**, sélectionnez **Federation Metadata XML** et téléchargez le fichier XML sur votre ordinateur.
6. Revenez à Cloudcraft et téléchargez votre fichier XML de métadonnées.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="Statut de SAML Single Sign-On configuré avec succès avec l'URL du fournisseur d'identité visible dans l'interface des paramètres de sécurité." responsive="true" style="width:100%;">}}

7. Basculez l'option **SAML Single Sign-On is enabled**.
8. Revenez au portail Azure.
9. Sous la section **Test single sign-on with Cloudcraft**, cliquez sur **Test** pour tester votre intégration.
10. Si vous préférez que vos utilisateurs accèdent à Cloudcraft uniquement via Azure AD, activez l'option **Strict mode**, qui désactive toutes les autres méthodes de connexion.

**Remarque** : pour accorder l'accès aux utilisateurs de votre organisation, consultez [la documentation Azure AD][4].

[1]: /fr/cloudcraft/account-management/enable-sso-with-okta/
[2]: /fr/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /fr/cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support