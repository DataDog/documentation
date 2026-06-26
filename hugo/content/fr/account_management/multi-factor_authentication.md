---
description: Ajoutez une couche de sécurité supplémentaire aux comptes Datadog avec
  l'authentification multifacteur utilisant des mots de passe à usage unique basés
  sur le temps et des applications d'authentification.
title: Authentification multifacteur (MFA)
---

## Présentation

L'authentification multifacteur (MFA), ou authentification à deux facteurs (2FA), exige qu'un utilisateur présente plus d'un type de vérification pour s'authentifier à un système. Le MFA protège contre la majorité des attaques liées aux mots de passe, y compris les attaques par force brute, le credential stuffing et le password spraying.

## Fonctionnalités

-   **MFA pour les comptes Datadog natifs** : le MFA est disponible comme couche de sécurité supplémentaire lors de la connexion pour les comptes qui se connectent directement à Datadog avec un e-mail et un mot de passe. Les comptes e-mail/mot de passe natifs sont plus vulnérables aux attaques que les comptes gérés via un fournisseur d'identité.
-   **MFA facultatif** : le MFA est disponible pour les utilisateurs finaux comme fonctionnalité optionnelle. Activez le MFA à tout moment via vos paramètres personnels.
-   **MFA obligatoire** : les administrateurs peuvent exiger que tous les utilisateurs d'une organisation qui se connectent avec un e-mail et un mot de passe enregistrent un second facteur d'authentification avant d'accéder à l'organisation. Pour activer l'application du MFA, consultez la section relative aux [méthodes de connexion][1].
-   **Applications d'authentification** : toute application d'authentification prenant en charge l'authentification par mot de passe à usage unique basé sur le temps (TOTP) peut être utilisée pour le MFA. Exemples : Microsoft Authenticator, Google Authenticator, Authy et Duo.

## Limites

-   Le MFA n'est pas disponible pour les comptes utilisant uniquement l'authentification unique (SSO). Pour utiliser le MFA avec SAML et Google Auth, configurez-le via votre fournisseur d'identité (IdP).
-   Le MFA ne protège pas contre tous les types d'attaques. Par exemple, si un attaquant a accès à votre e-mail, il peut être en mesure de désactiver le MFA et de compromettre votre compte.
-   Le MFA prend en charge au maximum une seule application d'authentification.

## Prérequis

Pour configurer le MFA pour votre compte, connectez-vous en utilisant votre **e-mail et mot de passe**. Les utilisateurs qui se connectent via SSO ne voient **pas** les options de configuration du MFA.

## Configurer le MFA pour votre compte utilisateur

Pour accéder à la [page Password & Authentication][2] :

1. Vérifiez que vous êtes connecté avec une combinaison nom d'utilisateur et mot de passe, et non via SSO.
1. Accédez à **Personal Settings** dans le menu de votre compte.
1. Sous **Security**, sélectionnez **Password & Authentication**.

La section d'authentification multifacteur répertorie toutes les applications d'authentification configurées.

1. En regard de **Authenticator App**, sélectionnez **Add**.
1. Suivez la documentation de votre application d'authentification pour savoir comment ajouter un nouveau code QR.
1. Saisissez le dernier code généré par votre application d'authentification dans l'invite pour confirmer que l'appareil a été configuré correctement.
1. Conservez une copie des codes de récupération dans un endroit sûr. Les codes ne peuvent pas être récupérés une fois la configuration terminée.

## Consulter le statut du MFA d'un utilisateur

Pour savoir si un utilisateur a configuré le MFA ou non, vous pouvez filtrer le tableau Users. Le statut du MFA est également disponible dans le panneau des détails de l'utilisateur. 

{{< img src="account_management/multi-factor-authentication-status.png" alt="Vue du statut du MFA sur la page de détail de l'utilisateur, l'exemple montre que l'utilisateur a configuré le MFA" style="width:90%;" >}}

## Récupération du MFA

Si vous n'avez pas accès à votre application d'authentification, vous pouvez utiliser un code de récupération au lieu d'un mot de passe à usage unique au cours de la procédure de connexion. Chaque code de récupération ne peut être utilisé qu'une seule fois.

1. Accédez à la [page de connexion][3].
1. Saisissez votre adresse électronique et votre mot de passe, puis sélectionnez **Log in**.
1. Sélectionnez **Don't have access to your authenticator?**
1. Saisissez l'un de vos codes de récupération inutilisés et cliquez sur **Verify**.

## Récupération du MFA

Si vous n'avez pas accès à votre application d'authentification ou à vos codes de récupération, vous pouvez demander un lien de récupération unique par courrier électronique au cours de la procédure de connexion.

1. Accédez à la [page de connexion][3].
1. Saisissez votre adresse électronique et votre mot de passe, puis sélectionnez **Log in**.
1. Sélectionnez **Don't have access to your authenticator?**
1. Sélectionnez **Don't have access to your recovery codes? Get a one time recovery link via email.**
1. Consultez votre boîte mail et recherchez un message ayant pour objet « Recovery link for logging into your Datadog account ».
1. Sélectionnez le lien **Log in to Datadog** pour terminer la connexion à votre compte.

Si vous avez perdu l'accès à votre application d'authentification enregistrée, Datadog recommande de supprimer l'appareil perdu et d'en ajouter un nouveau. Conserver une application d'authentification valide permet d'éviter des problèmes de connexion à votre compte à l'avenir.

[1]: /fr/account_management/login_methods/#requiring-multi-factor-authentication
[2]: https://app.datadoghq.com/personal-settings/password-and-authentication
[3]: https://app.datadoghq.com