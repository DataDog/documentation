---
title: Passer d'une organisation à une autre
---

Si vous appartenez à plusieurs organisations Datadog, le sélecteur d'organisation en bas à gauche de la barre de navigation vous permet de changer d'organisation. Vous pouvez également afficher toutes vos organisations et passer d'une organisation à une autre depuis l'onglet **Organizations** de la page **Personal Settings**.

{{< img src="account_management/org_switching.png" alt="Deux moyens de changer dʼorganisation" style="width:70%;" >}}

Pour des raisons de sécurité, vous devez avoir une session valide pour chaque organisation. Si vous n'avez pas de session active, vous êtes invité à vous connecter à l'aide d'un nom d'utilisateur et d'un mot de passe ou de l'authentification SAML.

1. **Méthodes d'authentification multiples** : si vous utilisez l'authentification SAML ainsi que l'authentification via un nom d'utilisateur et un mot de passe, vous devez vous connecter avec la méthode requise par l'organisation (nom d'utilisateur et mot de passe ou SAML). Il ne suffit donc pas de vous connecter à l'une de vos organisations pour accéder à l'ensemble d'entre elles.

2. **SAML Strict** : si votre organisation a activé le mode [SAML Strict][1], vous devez vous connecter via l'authentification SAML. Vous devez vous réauthentifier chaque fois que vous changez d'organisation. Comme les sessions des fournisseurs d'identité restent actives, il s'agit souvent d'une redirection.

## Réinitialisation des mots de passe pour les utilisateurs multi-org

Les organisations partagent un mot de passe pour chaque utilisateur multi-org. Si vous réinitialisez votre mot de passe, le changement s'applique à toutes les organisations auxquelles vous appartenez.

**Remarque** : il n'est pas possible d'utiliser deux fois le même mot de passe.

## Dépannage

Si vous rencontrez un problème qui vous empêche de vous connecter, procédez comme suit :

1. Saisissez de nouveau votre mot de passe ou réinitialisez-le, même si vous n'avez jamais eu besoin de le faire.

2. Demandez à un autre membre de l'équipe d'essayer de se connecter avec son nom d'utilisateur et son mot de passe. S'il arrive à se connecter, suivez l'étape 1. Dans le cas contraire, suivez l'étape 3.

3. Demandez à un administrateur de votre équipe si ce compte nécessite un nom d'utilisateur et mot de passe, une authentification SAML ou Google OAuth, afin de vérifier que vous utilisez la bonne méthode.

Si les étapes de dépannage ci-dessus échouent, contactez l'[équipe d'assistance Datadog][2] en précisant le comportement attendu et les actions prises.

[1]: /fr/account_management/saml/#saml-strict
[2]: /fr/help/