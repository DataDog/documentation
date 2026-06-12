---
title: Activer le SSO
---

L'activation du Single Sign-On (SSO) pour votre compte vous permet de simplifier l'authentification et l'accès de connexion à Cloudcraft.

Cloudcraft prend en charge le SSO via ces méthodes :

- **Datadog SSO** : Datadog SSO ne nécessite aucune configuration supplémentaire pour les nouveaux comptes. Sélectionnez **Sign in with Datadog** sur les pages d'inscription ou de connexion de Cloudcraft. [Contactez l'équipe d'assistance de Cloudcraft][1] pour activer cette fonctionnalité pour les comptes
  existants.
- **Google Workspace SSO** : Google SSO ne nécessite aucune configuration supplémentaire. Sélectionnez **Sign in with Google** sur les pages d'inscription ou de connexion de Cloudcraft.
- **SAML SSO** : disponible pour les comptes Cloudcraft Pro et Enterprise, SAML SSO fédère avec le fournisseur d'identité existant de votre organisation, permettant à vos utilisateurs de se connecter avec leurs comptes existants et à votre organisation de gérer de manière centralisée qui a accès à l'application.

Cet article concerne le SAML SSO et comment le configurer dans votre compte.

## Configuration de SAML/SSO

<div class="alert alert-info">Si vous souhaitez configurer le SSO pour votre compte, <a href="https://app.cloudcraft.co/app/support" title="Contacter l'équipe d'assistance de Cloudcraft">contactez l'équipe d'assistance de Cloudcraft</a> pour activer la fonctionnalité.
Une fois la fonctionnalité activée, le propriétaire du compte peut terminer la configuration.</div>

1. Accédez à **User** > **Security & SSO**.
2. Enregistrez Cloudcraft en tant que nouvelle application auprès de votre fournisseur d'identité SAML. Pour des instructions détaillées, consultez les articles suivants :
    - [Activer le SSO avec Azure AD][2]
    - [Activer le SSO avec Okta][3]
    - [Activer le SSO avec un fournisseur d'identité générique][4]
3. Trouvez les détails nécessaires pour créer une nouvelle application avec le fournisseur d'identité dans la même fenêtre.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Paramètres d'intégration du fournisseur de services SAML de Cloudcraft" responsive="true" style="width:100%;">}}

4. Après avoir créé l'application, revenez à Cloudcraft et téléchargez le fichier de métadonnées du fournisseur d'identité.
5. Sélectionnez l'option **SAML Single Sign-On is enabled**.
6. Activez l'option **Strict mode** si vous devez restreindre l'accès à Cloudcraft uniquement aux utilisateurs SAML SSO.

## Fonctionnalités supplémentaires

L'utilisation de SAML SSO avec Cloudcraft offre des avantages supplémentaires qui sont particulièrement utiles lors de la gestion d'un grand nombre d'utilisateurs.

### Provisionnement d'utilisateurs juste-à-temps

Avec le **provisionnement d'utilisateurs juste-à-temps**, Cloudcraft crée automatiquement des comptes utilisateur lorsque les utilisateurs se connectent pour la première fois avec une adresse e-mail d'entreprise, sans nécessiter d'invitation.

L'option permettant de modifier l'équipe par défaut que les utilisateurs rejoignent lorsqu'ils se connectent pour la première fois se trouve en bas de la page **Security & Single Sign-On**.

### Connexion initiée par le fournisseur d'identité (IdP)

Permettre la connexion à Cloudcraft directement depuis le tableau de bord de votre fournisseur d'identité.

### Mode strict

Avec le **mode strict** activé, tous les utilisateurs doivent se connecter avec SAML SSO. Les connexions existantes par nom d'utilisateur/mot de passe ou Google Sign In sont désactivées.

Assurez-vous que la connexion SAML SSO fonctionne correctement avant d'activer cette option pour éviter d'être verrouillé hors de votre compte.

[1]: https://app.cloudcraft.co/app/support
[2]: /fr/cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /fr/cloudcraft/account-management/enable-sso-with-okta/
[4]: /fr/cloudcraft/account-management/enable-sso-with-generic-idp/