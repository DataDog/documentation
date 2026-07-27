---
title: Résoudre le problème « unable to verify AWS account »
---

Si vous obtenez une erreur « unable to verify AWS account » lors de la tentative d'ajout de votre compte AWS à Cloudcraft, cela peut être dû au fait que votre organisation a attaché une politique de contrôle de service au compte. Cela empêche les serveurs de Cloudcraft de valider le rôle IAM créé.

Pour résoudre cette erreur, vous disposez des options suivantes :

## Activer l'accès à la région `us-east-1`

Vous pouvez demander à votre équipe informatique d'activer temporairement l'accès à la région `us-east-1` dans leurs politiques. C'est la région que Cloudcraft utilise pour vérifier le rôle IAM. Après avoir ajouté le compte, vous pouvez ensuite désactiver à nouveau la région, et Cloudcraft sera limité à l'analyse uniquement des composants dans les régions qui ne sont pas bloquées.

Pour aider à faire valoir une exception dans la politique, vous pouvez offrir aux administrateurs de votre organisation l'option d'attacher une politique IAM minimale au rôle, limitant ce que Cloudcraft peut et ne peut pas lire depuis le compte AWS ajouté à l'application. Pour plus d'informations, consultez la section [Créer une politique IAM minimale à utiliser avec Cloudcraft][1].

## Utiliser l'API pour ajouter votre compte

Comme alternative à l'utilisation de l'interface Web, vous pouvez utiliser l'API de Cloudcraft pour ajouter votre compte et spécifier depuis quelle région le compte doit être vérifié. Pour plus d'informations, consultez la section [Ajouter des comptes AWS via l'API Cloudcraft][2].

[1]: /fr/cloudcraft/advanced/minimal-iam-policy/
[2]: /fr/cloudcraft/advanced/add-aws-account-via-api/