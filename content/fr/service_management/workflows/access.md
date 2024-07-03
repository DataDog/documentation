---
aliases:
- /fr/workflows/access
- /fr/workflows/service_accounts
description: Accès et authentification pour l'automatisation de workflows
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
- link: /service_management/service_management/workflows/actions_catalog
  tag: Documentation
  text: Consulter la liste des actions de workflow
title: Accès et authentification
---

Un certain nombre d'outils permettent de contrôler les accès et l'authentification des workflows et de leurs composants.

## Identité du workflow

Un workflow peut être exécuté en utilisant l'identité du propriétaire du workflow ou un compte de service associé au workflow. Par défaut, chaque workflow utilise l'identité Datadog de son auteur.

### Devenir propriétaire d'un workflow

<div class="alert alert-info">Pour devenir propriétaire d'un workflow, votre compte Datadog doit posséder les rôles et les autorisations requises par les connexions du workflow.</div>


1. Cliquez sur l'icône en forme d'engrenage (**Settings**).
1. Sélectionnez **Take ownership of workflow**. Cette option apparaît uniquement si vous n'êtes pas déjà le propriétaire du workflow.
1. Cliquez sur **Confirm** pour prendre possession du workflow.

### Utiliser un compte de service

Un compte de service peut être associé à un workflow et faire office d'identité du workflow lors de son exécution. Les comptes de service peuvent :
- résoudre les connexions définies dans les actions de workflow au lancement
- fournir une identité pour les exécutions de workflow
- fournir une identité pour les [pistes d'audit][1] de workflow

Pour créer un compte de service pour un workflow, vous devez posséder le rôle admin Datadog ou un rôle personnalisé avec l'autorisation **Service Account Write**. Le compte de service créé héritera de votre rôle et de vos autorisations. Pour en savoir plus sur les comptes de service et les autorisations, consultez la section [Comptes de service][2] ou [Contrôle d'accès à base de rôles][3].

#### Associer un compte de service à un workflow

Vous pouvez créer un compte de service pour votre workflow de façon dynamique en [ajoutant un déclencheur automatique][4].

1. Cliquez sur l'icône en forme d'engrenage (**Settings**).
1. Cliquez sur **Create a service account**.
1. Sélectionnez le rôle de votre compte de service.
1. Cliquez sur **Create** pou enregistrer le compte de service.
1. Enregistrez votre workflow pour appliquer les modifications.

Lorsque vous exécutez un workflow, l'utilisateur du compte de service résout les connexions définies dans les actions du workflow. Par conséquent, l'utilisateur du compte de service a besoin de l'autorisation `connections_resolve`. Les rôles Admin et Standard de Datadog possèdent l'autorisation `connections_resolve` par défaut.

#### Afficher les détails du compte de service

1. Cliquez sur l'icône en forme d'engrenage (**Settings**).
1. Sélectionnez votre compte de service dans le menu déroulant.

#### Retirer un compte de service associé à un workflow

1. Cliquez sur l'icône en forme d'engrenage (**Settings**).
1. Sélectionnez votre compte de service dans le menu déroulant.
1. Cliquez sur **Remove service account**.

## Identifiants des actions

Étant donné que les [actions][5] de workflow se connectent à des systèmes logiciels externes, il se peut que vous deviez authentifier votre compte Datadog auprès des intégrations correspondantes. Pour qu'un workflow puisse être exécuté correctement, chaque action du workflow nécessitant une authentification doit pouvoir vérifier l'identité de votre compte Datadog.

Les actions de workflow peuvent être authentifiées de deux manières :
- Identifiants et autorisations configurés dans le carré d'intégration
- Identifiants de connexion

Pour en savoir plus sur la configuration d'identifiants, consultez la section [Connexions][7].

## Autorisations des workflows

Utilisez le [contrôle d'accès à base de rôles (RBAC)][3] pour contrôler les accès à votre workflow et les connexions. Pour découvrir la liste des autorisations liées aux workflows et aux connexions, consultez la section [Autorisations des rôles Datadog][10].

### Restreindre l'utilisation des connexions

Vous pouvez définir des autorisations pour chaque connexion afin de restreindre leur modification ou leur utilisation. Les autorisations granulaires comprennent **Viewer**, **Resolver** et **Editor**.

Viewer
: Peut consulter

Resolver
: Peut résoudre et consulter

Editor
: Peut modifier, résoudre et consulter

Résoudre une connexion consiste à obtenir l'objet de connexion assigné à une étape et à récupérer le secret qui lui est associé.

Suivez les étapes ci-dessous pour modifier les autorisations propres à une certaine connexion :

1. Accédez à la page [Workflow Automation][9].
1. Cliquez sur **Connections** en haut à droite. Une liste de connexions apparaît.
1. Passez votre curseur sur la connexion pour laquelle vous souhaitez définir des autorisations granulaires. Les icônes **Edit**, **Permissions** et **Delete** apparaissent à droite.
1. Cliquez sur l'icône en forme de cadenas (**Permissions**).
1. Sélectionnez **Restrict Access**.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur **Add**. Le rôle que vous avez sélectionné apparaît au bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous voulez supprimer l'accès d'un rôle, cliquez sur l'icône en forme de corbeille à droite du nom du rôle.
1. Cliquez sur **Save**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/audit_trail/#overview
[2]: /fr/account_management/org_settings/service_accounts/
[3]: /fr/account_management/rbac/
[4]: /fr/service_management/workflows/trigger/
[5]: /fr/service_management/workflows/actions_catalog/
[6]: /fr/integrations/
[7]: /fr/service_management/workflows/connections/
[8]: /fr/service_management/workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
[10]: /fr/account_management/rbac/permissions/#workflows