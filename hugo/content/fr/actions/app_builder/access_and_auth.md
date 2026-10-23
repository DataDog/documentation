---
aliases:
- /fr/service_management/app_builder/auth
- /fr/actions/app_builder/auth
description: Accès et authentification pour App Builder
title: Accès et authentification
---
Plusieurs outils permettent de contrôler l'accès et l'authentification à des applications et à leurs composants.

## Identité d'exécution de l'application {#app-execution-identity}

Une application publiée s'exécute en utilisant l'identité utilisateur Datadog de son auteur, ou un compte de service associé à l'application. L'auteur est répertorié à la fois dans la vue {{< ui >}}All Apps{{< /ui >}} et dans {{< ui >}}App Properties{{< /ui >}}.

En mode édition, une application s'exécute en tant qu'éditeur actuel.

### Utiliser un compte de service {#use-a-service-account}

Un compte de service peut être associé à une application et agir en tant qu'identité de l'application lorsqu'elle s'exécute. Un compte de service peut :
- résoudre les connexions définies dans les requêtes de l'application au moment de l'exécution
- fournir une identité pour les exécutions d'applications
- fournir une identité pour les [pistes d'audit][7] de l'application

Pour créer un compte de service pour une application, vous devez disposer du rôle Datadog Admin ou d'un rôle personnalisé avec l'autorisation {{< ui >}}Service Account Write{{< /ui >}}. Le compte de service que vous créez adopte votre rôle et vos autorisations. Pour plus d'informations sur les comptes de service et les autorisations, consultez [Comptes de service][2] ou [Contrôle d'accès basé sur les rôles][3].

#### Configurer votre application pour qu'elle s'exécute en tant que compte de service {#configure-your-app-to-run-as-a-service-account}

1. Cliquez sur l'icône en forme de roue dentée ({{< ui >}}Settings{{< /ui >}}).
1. Cliquez sur {{< ui >}}Manage app identity{{< /ui >}}.
1. Sélectionnez {{< ui >}}Run as Service Account{{< /ui >}}.
1. Sélectionnez un rôle pour votre utilisateur de compte de service ou sélectionnez un compte de service existant.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour enregistrer le compte de service et appliquer les modifications.

Lorsque vous exécutez une application, l'utilisateur du compte de service résout les connexions définies dans les requêtes de l'application. Par conséquent, l'utilisateur du compte de service a besoin de l'autorisation `connections_resolve`. Le rôle Datadog Admin et le rôle Datadog Standard incluent l'autorisation `connections_resolve`.

#### Afficher les détails du compte de service {#view-service-account-details}

1. Cliquez sur l'icône en forme de roue dentée ({{< ui >}}Settings{{< /ui >}}).
1. Sélectionnez {{< ui >}}Manage app identity{{< /ui >}}.
1. Cliquez sur votre compte de service à côté de *Run As*.

#### Supprimer un compte de service associé à une application {#remove-a-service-account-associated-with-an-app}

1. Cliquez sur l'icône en forme de roue dentée ({{< ui >}}Settings{{< /ui >}}).
1. Sélectionnez {{< ui >}}Manage app identity{{< /ui >}}.
1. Cliquez sur {{< ui >}}Remove service account{{< /ui >}}.

## Identifiants d'action {#action-credentials}

Comme les [actions][1] d'application se connectent à des systèmes logiciels externes, vous devrez peut-être authentifier votre compte Datadog auprès d'une intégration correspondante. Une application ne peut s'exécuter correctement que si chaque action nécessitant une authentification peut vérifier l'identité de votre compte Datadog.

Les actions peuvent être authentifiées des manières suivantes :
- Identifiants et autorisations configurés dans la tuile d'intégration
- Identifiants de connexion

Par défaut, les lecteurs d'une application publiée n'ont pas besoin d'accéder aux connexions de l'application. Au lieu de cela, les actions utilisent l'identité de l'auteur de l'application. Cela simplifie le partage et améliore la sécurité en empêchant les applications d'effectuer des opérations sensibles en utilisant l'identité de lecteurs arbitraires.
Pour plus d'informations sur la configuration des identifiants, consultez [Connexions][8]. App Builder partage l'Action Catalog et les identifiants de connexion pour chaque intégration avec [Datadog Workflow Automation][9].

## Autorisations de l'application {#app-permissions}

Par défaut :
- Pendant que l'application est à l'état de brouillon, son auteur est le seul utilisateur à y avoir accès.
- Une fois l'application publiée, l'auteur conserve {{< ui >}}Editor{{< /ui >}} l'accès, tandis que le reste de l'organisation Datadog de l'auteur reçoit {{< ui >}}Viewer{{< /ui >}} l'accès à l'application.

Vous pouvez étendre l'accès à une application en mode brouillon ou publiée à l'aide du contrôle d'accès.

### Autorisations et contrôle d'accès {#permissions-and-access-control}

Utilisez le [contrôle d'accès basé sur les rôles (RBAC)][3] pour contrôler l'accès à vos applications et connexions.

Les autorisations générales qui s'appliquent aux applications incluent les suivantes :

{{< ui >}}Apps View{{< /ui >}}
: Afficher et exécuter des applications. Les rôles Standard et Admin de Datadog disposent par défaut d'un accès en lecture à App Builder.

{{< ui >}}Apps Write{{< /ui >}}
: Créer et modifier des applications nouvelles ou existantes. Les rôles Standard et Admin de Datadog disposent par défaut d'un accès en écriture à App Builder.

{{< ui >}}Connections Read{{< /ui >}}
: Lister et afficher les connexions disponibles. Les rôles Datadog Read Only, Standard et Admin disposent par défaut d'un accès en lecture aux connexions.

### Restreindre l'accès à une application spécifique {#restrict-access-to-a-specific-app}

Définissez des autorisations sur chaque application pour restreindre les modifications qui y sont apportées.

App Builder fournit les autorisations suivantes pour chaque application :

{{< ui >}}Viewer{{< /ui >}}
: Exécuter et afficher l'application

{{< ui >}}Contributor{{< /ui >}}
: Modifier, exécuter et afficher l'application

{{< ui >}}Editor{{< /ui >}}
: Modifier, exécuter, afficher, publier et supprimer l'application.

Pour restreindre l'accès à l'application, effectuez les étapes suivantes dans le canevas de l'application :
1. Accédez à la vue de modification détaillée de l'application dont vous souhaitez restreindre l'accès.
1. Dans l'application, cliquez sur l'icône en forme de roue dentée ({{< ui >}}Settings{{< /ui >}}).
1. Sélectionnez {{< ui >}}Permissions{{< /ui >}} dans le menu déroulant.
1. Sélectionnez {{< ui >}}Restrict Access{{< /ui >}}.
1. Sélectionnez un rôle dans le menu déroulant. Cliquez sur {{< ui >}}Add{{< /ui >}}. Le rôle que vous avez sélectionné s'affiche en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous souhaitez supprimer l'accès d'un rôle, cliquez sur l'icône de corbeille à droite du nom du rôle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Restreindre l'accès à l'application via l'API ou Terraform {#restrict-app-access-using-the-api-or-terraform}

Lors de l'utilisation de l'[API de politique de restriction][10] ou de Terraform, un utilisateur ou un compte de service ne peut pas réduire son propre niveau d'accès. Il s'agit d'un comportement intentionnel appliqué par [l'accès granulaire][4] pour éviter les verrouillages accidentels.

Pour transférer l'accès `editor` de l'utilisateur ou du compte de service appelant :

1. Ajoutez le nouveau mandant en tant que `editor` tout en conservant l'utilisateur ou le compte de service actuel en tant que `editor` :

   ```terraform
   bindings {
       principals = ["user:<SERVICE_ACCOUNT_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

1. À l'aide d'une **différente** clé d'API ou d'un compte administrateur (différent de celui qui est rétrogradé), supprimez la liaison de l'utilisateur ou du compte de service d'origine :

   ```terraform
   bindings {
       principals = ["team:<TEAM_UUID>"]
       relation   = "editor"
   }
   bindings {
       principals = ["org:<ORG_UUID>"]
       relation   = "viewer"
   }
   ```

### Restreindre l'accès à une connexion spécifique {#restrict-access-to-a-specific-connection}

Définissez des autorisations sur des connexions individuelles pour restreindre leur utilisation ou limiter les modifications. App Builder fournit les autorisations suivantes pour chaque connexion :

{{< ui >}}Viewer{{< /ui >}}
: Afficher la connexion

{{< ui >}}Resolver{{< /ui >}}
: Résoudre et afficher la connexion

{{< ui >}}Editor{{< /ui >}}
: Modifier, résoudre et afficher la connexion

Par défaut, seul l'auteur de la connexion reçoit l'accès {{< ui >}}Editor{{< /ui >}}. L'auteur peut choisir d'accorder l'accès à d'autres utilisateurs, rôles ou équipes.

**Note** : L'autorisation de résoudre une connexion inclut l'autorisation d'obtenir l'objet de connexion affecté à une étape et de récupérer le secret qui lui est associé.

Suivez les étapes suivantes pour modifier les autorisations sur une connexion spécifique :

1. Accédez à la [page App Builder][5].
1. Cliquez sur l'onglet {{< ui >}}Connections{{< /ui >}}. Une liste de connexions s'affiche.
1. Survolez la connexion pour laquelle vous souhaitez définir des autorisations granulaires. Les icônes {{< ui >}}Edit{{< /ui >}}, {{< ui >}}Permissions{{< /ui >}} et {{< ui >}}Delete{{< /ui >}} apparaissent sur la droite.
1. Cliquez sur l'icône de cadenas ({{< ui >}}Permissions{{< /ui >}}).
1. Sélectionnez {{< ui >}}Restrict Access{{< /ui >}}.
1. Sélectionnez un rôle dans le menu déroulant et cliquez sur {{< ui >}}Add{{< /ui >}}. Le rôle que vous avez sélectionné s'affiche en bas de la boîte de dialogue.
1. À côté du nom du rôle, sélectionnez l'autorisation souhaitée dans le menu déroulant.
1. Si vous souhaitez supprimer l'accès d'un rôle, cliquez sur l'icône de corbeille à droite du nom du rôle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][6].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /fr/account_management/org_settings/service_accounts#permissions
[3]: /fr/account_management/rbac/?tab=datadogapplication#role-based-access-control
[4]: /fr/account_management/rbac/granular_access
[5]: https://app.datadoghq.com/app-builder/
[6]: https://chat.datadoghq.com/
[7]: /fr/account_management/audit_trail/#overview
[8]: /fr/actions/connections/
[9]: /fr/actions/workflows/
[10]: /fr/api/latest/restriction-policies/