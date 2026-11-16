---
aliases:
- /fr/actions/connections/aws_integration/
- /fr/actions/connections/integration_connections/
description: Utilisez les identifiants des intégrations Datadog existantes pour authentifier
  les actions dans les workflows et les applications.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: Documentation
  text: En savoir plus sur les identifiants de connexion
title: Connexions d'intégration
---
## Présentation {#overview}

Les connexions d'intégration permettent aux workflows et aux actions Datadog d'utiliser des identifiants déjà configurés dans une intégration Datadog. Cela élimine le besoin de configurer une connexion distincte pour une action et simplifie l'accès au service externe.

## Cas d'utilisation pris en charge {#supported-use-cases}

Les connexions d'intégration sont prises en charge pour :

- **ServiceNow** : Utilisez les identifiants d'une instance d'intégration ServiceNow existante pour exécuter des actions ServiceNow.
- **AWS** : Utilisez les identifiants d'un compte d'intégration AWS existant pour exécuter des actions AWS en lecture seule prises en charge. Pour plus d'informations sur les actions et les autorisations AWS prises en charge, consultez [les connexions d'intégration AWS](#aws-integration-connections).

Pour d'autres intégrations ou opérations, [créez une connexion][2].

## Configuration {#configuration}

Avant de commencer, assurez-vous que l'intégration est active et que vous disposez des autorisations de modification pour le compte ou l'instance d'intégration que vous souhaitez utiliser.

L'exemple suivant configure une connexion d'intégration ServiceNow. Vous pouvez suivre le même processus général pour les actions AWS prises en charge, sous réserve des [exigences AWS supplémentaires](#aws-integration-connections).

### 1. Configurer les autorisations d'intégration {#1-configure-integration-permissions}

Pour configurer l'autorisation {{< ui >}}Executor{{< /ui >}} pour une instance d'intégration ServiceNow :

1. Dans Datadog, accédez à [**Integrations**][4].
1. Cliquez sur l'intégration {{< ui >}}ServiceNow{{< /ui >}}.
1. Sélectionnez l'instance ServiceNow que vous souhaitez utiliser pour exécuter des actions.
1. Cliquez sur {{< ui >}}Set Permissions{{< /ui >}}.
    - Si vous voyez un bouton {{< ui >}}Request Edit Access{{< /ui >}} au lieu d'un bouton {{< ui >}}Set Permissions{{< /ui >}}, demandez à l'administrateur de votre organisation Datadog de vous ajouter en tant qu'Éditeur pour l'instance.
1. Sélectionnez un utilisateur, une équipe ou une organisation et cliquez sur {{< ui >}}Add{{< /ui >}}.
1. Sous {{< ui >}}People with access{{< /ui >}}, sélectionnez l'autorisation {{< ui >}}Executor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### 2. Ajoutez l'intégration à une action {#2-add-the-integration-to-an-action}

1. Dans [Workflow Automation][5], cliquez sur le workflow que vous souhaitez modifier.
1. Ajoutez une action ServiceNow.
1. Dans le volet de configuration, cliquez sur le menu déroulant {{< ui >}}Connection{{< /ui >}} et faites défiler jusqu'à {{< ui >}}Existing ServiceNow Integrations{{< /ui >}}.
1. Sélectionnez l'instance ServiceNow que vous avez configurée à l'étape précédente.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Connexions d'intégration AWS {#aws-integration-connections}

Les workflows et actions Datadog peuvent utiliser vos identifiants d'intégration AWS Datadog existants pour effectuer des opérations en lecture seule dans votre environnement AWS. Datadog utilise les mêmes identifiants AWS que ceux qui alimentent les intégrations telles que la surveillance Amazon EC2, RDS et S3 pour exécuter en toute sécurité les actions en lecture seule prises en charge.

Il existe deux manières d'exécuter des actions AWS dans votre environnement :

- Utilisez l'intégration AWS Datadog pour exécuter des actions en lecture seule autorisées par la politique [`ViewOnlyAccess` permissions][1].
- Utilisez une connexion AWS personnalisée liée à un rôle IAM AWS dédié avec des autorisations spécifiques pour les opérations non incluses dans les [`ViewOnlyAccess` permissions][1].

### Actions AWS prises en charge {#supported-aws-actions}

Voici quelques exemples de workflows disponibles :

- Lister ou décrire des ressources AWS, telles que `ListECSClusters`, `DescribeInstances` et `GetBucketPolicy`
- Lire des configurations ou des métadonnées à partir de services AWS, tels que `GetFunctionConfiguration` et `ListSecrets`
- Inspecter les tags, les métriques ou les logs de ressources

Pour d'autres actions AWS, utilisez plutôt une [connexion dédiée][2].

### Exigences AWS {#aws-requirements}

Pour exécuter correctement des actions avec une connexion d'intégration AWS :

- Le rôle IAM d'intégration AWS configuré pour la délégation de rôle doit disposer des autorisations requises pour les opérations souhaitées, telles que `ecs:ListClusters`.
- L'action sélectionnée doit être en lecture seule. Les actions d'écriture ou de mutation, telles que `Put*`, `Delete*` et `Update*`, ne sont pas prises en charge et échouent lors de l'exécution.
- L'utilisateur, l'équipe ou l'organisation qui exécute l'action doit disposer de l'autorisation {{< ui >}}Executor{{< /ui >}} explicite sur le compte d'intégration AWS dans Datadog.

<div class="alert alert-info">
L'exécution d'actions à l'aide de l'intégration AWS de Datadog n'est disponible que pour les utilisateurs ayant configuré l'intégration AWS de Datadog via <a href="/integrations/guide/aws-manual-setup/?tab=roledelegation" target="_blank">la délégation de rôle</a>. De plus, bien que les opérations sous les <a href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html" target="_blank">autorisations ViewOnlyAccess</a> soient autorisées, le rôle IAM associé à l'intégration AWS de Datadog peut ne pas disposer des autorisations nécessaires. Assurez-vous que le rôle dispose des autorisations correctes si vous rencontrez des problèmes.
</div>

Avant de configurer une connexion d'intégration AWS, assurez-vous que :

- L'intégration AWS est active pour votre compte AWS cible et Datadog n'a détecté aucun problème d'intégration. Si vous n'avez pas configuré l'intégration AWS, suivez le [guide de configuration de l'intégration AWS][6].
- Le rôle IAM associé à l'intégration dispose des autorisations nécessaires pour les opérations requises, telles que `ecs:ListClusters`.
- Vous avez accès à la modification des autorisations pour les comptes AWS que vous souhaitez utiliser.

Pour configurer l'autorisation {{< ui >}}Executor{{< /ui >}} pour un compte d'intégration AWS, suivez [les étapes de configuration](#1-configure-integration-permissions), en sélectionnant l'intégration {{< ui >}}Amazon Web Services{{< /ui >}} et le compte AWS concerné au lieu de ServiceNow.

Pour ajouter l'intégration AWS à une action :

1. Dans [Workflow Automation][5], cliquez sur le workflow que vous souhaitez modifier.
1. Ajoutez une action AWS, telle que {{< ui >}}List ECS Clusters{{< /ui >}}.
1. Dans le volet de configuration, cliquez sur le menu déroulant {{< ui >}}Connection{{< /ui >}} et faites défiler jusqu'à {{< ui >}}Existing AWS Integrations{{< /ui >}}.
1. Sélectionnez le compte AWS que vous avez configuré.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/ViewOnlyAccess.html
[2]: /fr/actions/connections/#create-a-connection
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/workflow
[6]: /fr/integrations/amazon-web-services/#setup