---
description: Accès et authentification pour App Builder
kind: documentation
title: Accès et authentification
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Rejoignez la bêta !">}}
La solution App Builder Datadog est disponible en version bêta privée. Remplissez le formulaire pour pouvoir en bénéficier.
{{< /callout >}}

Plusieurs outils permettent de contrôler l'accès et l'authentification à des applications et à leurs composants.

## Identifiants d'action

Étant donné que les [actions][1] d'application se connectent à des systèmes logiciels externes, il se peut que vous deviez authentifier votre compte Datadog auprès d'une intégration correspondante. Une application ne peut être exécutée correctement qu'à condition que chaque action nécessitant une authentification puisse vérifier l'identité de votre compte Datadog.

Les actions peuvent être authentifiées à l'aide de deux types d'identifiants :
- Identifiants et autorisations configurés dans le carré d'intégration
- Identifiants de connexion

Pour en savoir plus sur la configuration des identifiants, consultez la section [Connexions][2]. App Builder partage le catalogue des actions ainsi que les identifiants de connexion de chaque intégration avec la solution [Workflow Automation][3] Datadog.

## Autorisations d'application

### Accès général aux applications et connexions

Utilisez le [contrôle d'accès à base de rôles (RBAC)][4] pour gérer l'accès à vos applications et à vos connexions. 

Les autorisations générales `apps_run`, `apps_write` ou encore `connections_read` s'appliquent aux applications.

`apps_write`
: Permet de créer et de modifier des applications nouvelles et existantes. Les rôles Standard et Admin Datadog disposent par défaut d'un accès en écriture à App Builder.

`apps_run`
: Permet d'interagir avec des applications. Les rôles Standard et Admin Datadog disposent par défaut d'un accès en exécution à App Builder.

`connections_read`
: Permet de répertorier et de consulter les connexions disponibles. Les rôles Read Only, Standard et Admin Datadog disposent par défaut d'un accès en lecture aux connexions.

### Limiter l'accès à une connexion spécifique

Définissez des autorisations pour chaque connexion afin de limiter les modifications ou de restreindre leur utilisation. Les autorisations granulaires comprennent **Viewer**, **Resolver** et **Editor**.

Viewer
: Peut consulter la connexion

Resolver
: Peut résoudre et consulter la connexion

Editor
: Peut modifier, résoudre et consulter la connexion

L'étape de résolution d'une connexion comprend la récupération de l'objet de la connexion attribué à une étape ainsi que le secret associé.

Procédez comme suit pour modifier les autorisations d'une connexion spécifique :

1. Accédez à la [page App Builder][5].
1. Cliquez sur l'onglet **Connections**. Une liste de connexions apparaît.
1. Passez le curseur sur la connexion pour laquelle vous souhaitez définir des autorisations granulaires. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de cadenas (**Permissions**).
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné remplit le champ en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

### Limiter l'accès à une application spécifique

Définissez des autorisations pour chaque application afin de limiter les modifications apportées à celle-ci. Les autorisations granulaires comprennent **Runner** et **Editor**.

Runner
: Peut exécuter et consulter l'application

Editor
: Peut modifier, exécuter et consulter l'application

Limitez l'accès pendant la modification de l'application dans son canevas.
1. Pour commencer, accédez à la vue de modification détaillée de l'application dont vous souhaitez limiter l'accès.
1. Dans l'éditeur d'application, cliquez sur l'icône en forme d'engrenage (**Settings**).
1. Sélectionnez **Permissions** dans le menu déroulant.
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné remplit le champ en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

[1]: /fr/service_management/workflows/actions_catalog/
[2]: /fr/service_management/workflows/connections/
[3]: /fr/service_management/workflows/
[4]: /fr/account_management/rbac/
[5]: https://app.datadoghq.com/app-builder/