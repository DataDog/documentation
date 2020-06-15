---
title: Changer d'organisation
kind: documentation
---
Si vous appartenez à plusieurs organisations Datadog, le sélecteur d'organisations en bas à gauche de la barre de navigation vous permet de changer d'organisation.

Pour des raisons de sécurité, vous devez avoir une session valide pour chaque organisation. Si vous n'avez pas de session active, vous serez invité à vous connecter à l'aide d'un nom d'utilisateur/un mot de passe ou de l'authentification SAML.

**Les scénarios suivants se comportent différemment à partir du 2 janvier 2019** :

1. **Méthodes d'authentification multiples** : si vous utilisez l'authentification SAML ainsi que l'authentification via un nom d'utilisateur/mot de passe, vous devez vous connecter avec la méthode requise par l'organisation (nom d'utilisateur/mot de passe ou SAML). Vous ne pouvez donc pas vous connecter à une organisation et accéder à l'ensemble d'entre elles.

2. **SAML Strict** : si votre organisation a activé le mode [SAML Strict][1], vous devez vous connecter via l'authentification SAML. Vous devez vous réauthentifier à chaque fois que vous changez d'organisation. Comme les sessions des fournisseurs d'identité restent actives, il s'agit souvent d'une redirection.

## Dépannage

Si vous rencontrez un problème qui vous empêche de vous connecter, procédez comme suit :

1. Saisissez de nouveau ou réinitialisez votre nom d'utilisateur/mot de passe, même si vous n'avez pas eu besoin de le faire dans le passé.

2. Demandez à un autre membre de l'équipe d'essayer de se connecter avec le nom d'utilisateur/le mot de passe. S'il arrive à se connecter, suivez l'étape 1. Dans le cas contraire, suivez l'étape 3.

3. Demandez à un administrateur de votre équipe si ce compte nécessite un nom d'utilisateur/mot de passe, une authentification SAML ou Google OAuth pour vérifier que vous utilisez la bonne méthode.

Si les étapes de dépannage ci-dessus échouent, contactez l'[équipe d'assistance de Datadog][2] en précisant le comportement attendu et les actions prises.

[1]: /fr/account_management/saml/#saml-strict
[2]: /fr/help/