---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/access
- /fr/workflows/service_accounts
description: Accès et authentification pour l'automatisation de workflows
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
- link: /service_management/workflows/actions_catalog
  tag: Documentation
  text: Consultez la liste des actions de workflow
title: Accès et authentification
---

Plusieurs outils permettent de contrôler l'accès et l'authentification à des workflows et à leurs composants.

## Identité de workflow

Il est possible d'exécuter un workflow en utilisant l'identité de son propriétaire ou un compte de service associé. Par défaut, un workflow utilise l'identité d'utilisateur Datadog de son auteur.

### Utiliser un compte de service

Il est possible d'associer un compte de service à un workflow et de le faire agir en tant qu'identité du workflow lorsqu'il est exécuté. Un compte de service peut :
- résoudre les connexions définies dans les actions du workflow au moment de l'exécution
- fournir une identité pour les exécutions de workflow
- fournir une identité pour les [pistes d'audit][1] de workflow

Afin de créer un compte de service pour un workflow, vous devez avoir le rôle d'administrateur Datadog ou un rôle personnalisé avec l'autorisation **Service Account Write**. Le compte de service que vous créez adopte votre rôle et vos autorisations. Pour en savoir plus sur les comptes de service et les autorisations, consultez la section [comptes de service][2] ou [Contrôle d'accès à base de rôles][3].

#### Associer un compte de service à un workflow

Vous pouvez créer un compte de service pour votre workflow de façon dynamique lorsque vous [ajoutez un déclencheur automatique][4].

1. Cliquez sur l'icône en forme d'engrenage (**Réglages**).
1. Cliquez sur **Create a service account**.
1. Sélectionnez un rôle pour l'utilisateur de votre compte de service.
1. Cliquez sur **Create** pour enregistrer le compte de service.
1. Enregistrez votre workflow pour appliquer les modifications.

Lorsque vous exécutez un workflow, l'utilisateur du compte de service résout les connexions définies dans les actions du workflow. Par conséquent, l'utilisateur du compte de service a besoin de l'autorisation `connections_resolve`. Le rôle d'administrateur Datadog et le rôle standard Datadog incluent l'autorisation `connections_resolve`.

#### Voir les détails du compte de service

1. Cliquez sur l'icône en forme d'engrenage (**Réglages**).
1. Sélectionnez votre compte de service dans le menu déroulant.

#### Supprimer un compte de service associé à un workflow

1. Cliquez sur l'icône en forme d'engrenage (**Réglages**).
1. Sélectionnez votre compte de service dans le menu déroulant.
1. Cliquez sur **Remove service account**.

## Identifiants des actions

Étant donné que les [actions][5] de workflow se connectent à des systèmes logiciels externes, il se peut que vous deviez authentifier votre compte Datadog auprès de l'intégration correspondante. Un workflow ne peut être exécuté correctement qu'à condition que chaque action du workflow nécessitant une authentification puisse vérifier l'identité de votre compte Datadog.

Les actions de workflow peuvent être authentifiées de deux manières :
- Avec des Identifiants et autorisations configurés dans les carrés d'intégration
- Avec des identifiants de connexion

Pour obtenir plus d'informations sur la configuration des informations d'identification, consultez la section [Connexions][6].

## Autorisations de workflow

Utilisez le [contrôle d'accès basé sur les rôles (RBAC)][3] pour contrôler l'accès à vos workflows et à vos connexions. Pour consulter la liste des autorisations qui s'appliquent aux workflows et aux connexions, consultez la rubrique [Autorisations des rôles Datadog][7].

Par défaut, l'auteur d'un workflow ou d'une connexion est le seul utilisateur à bénéficier d'un accès **Editor**. Le reste de l'organisation Datadog reçoit un accès **Viewer** au workflow ou à la connexion.

### Restreindre l'accès à une connexion spécifique

Définissez des autorisations pour chaque connexion afin de limiter les modifications ou de restreindre leur utilisation. Les autorisations granulaires comprennent **Viewer**, **Resolver** et **Editor**. Par défaut, seul l'auteur de la connexion bénéficie de l'accès **Editor**. L'auteur peut choisir d'accorder l'accès à d'autres utilisateurs, rôles ou équipes.

Viewer
: Peut consulter la connexion

Resolver
: Peut résoudre et consulter la connexion

Editor
: Peut modifier, résoudre et consulter la connexion

L'étape de résolution d'une connexion comprend la récupération de l'objet de la connexion attribué à une étape ainsi que le secret associé.

Suivez les étapes ci-dessous pour modifier les autorisations sur une connexion spécifique :

1. Accédez à la [page Workflow Automation][8].
1. Cliquez sur **Connections** en haut à droite. Une liste de connexions apparaît.
1. Passez le curseur sur la connexion pour laquelle vous souhaitez définir des autorisations granulaires. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de cadenas (**Permissions**).
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné remplit le champ en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

### Restreindre l'accès à un workflow spécifique

Définissez des autorisations pour chaque workflow afin de limiter ses modifications ou de restreindre son utilisation. Les autorisations granulaires comprennent **Viewer**, **Runner** et **Editor**. Par défaut, seul l'auteur du workflow bénéficie de l'accès **Editor**. L'auteur peut choisir d'accorder l'accès à d'autres utilisateurs, rôles ou équipes.

Viewer
: Permet de visualiser le workflow

Runner
: Peut exécuter et visualiser le workflow

Editor
: Peut modifier, exécuter et visualiser le workflow

Vous pouvez restreindre l'accès à un workflow spécifique soit à partir de la page contenant la liste des workflows, soit à partir du canevas du workflow quand vous le modifiez.

**Restreindre les permissions à partir de la page contenant la liste des workflows**
1. Accédez à la [page Workflow Automation][8].
1. Passez le curseur sur le workflow pour lequel vous souhaitez définir des autorisations granulaires. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de cadenas (**Permissions**).
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné remplit le champ en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

**Restreindre les permissions à partir de l'éditeur de workflow**
1. Dans l'éditeur de workflow, cliquez sur l'icône en forme d'engrenage (**Réglages**).
1. Sélectionnez **Edit Permissions** dans la liste déroulante.
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné remplit le champ en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][9].

[1]: /fr/account_management/audit_trail/#overview
[2]: /fr/account_management/org_settings/service_accounts/
[3]: /fr/account_management/rbac/
[4]: /fr/service_management/workflows/trigger/
[5]: /fr/service_management/workflows/actions_catalog/
[6]: /fr/service_management/workflows/connections/
[7]: /fr/account_management/rbac/permissions/#workflow-automation
[8]: https://app.datadoghq.com/workflow
[9]: https://datadoghq.slack.com/