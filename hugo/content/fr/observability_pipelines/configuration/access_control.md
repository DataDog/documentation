---
aliases:
- /fr/observability_pipelines/access_control/
description: Apprenez à utiliser le contrôle d'accès granulaire et basé sur les rôles
  pour restreindre qui peut afficher, modifier, déployer ou supprimer les configurations
  d'Observability Pipelines et de Live Capture.
disable_toc: false
title: Access Control
---
## Présentation {#overview}

Le système de gestion des accès de Datadog utilise le contrôle d'accès basé sur les rôles (RBAC). Cela vous permet de définir le niveau d'accès des utilisateurs aux différentes ressources Datadog. Les utilisateurs sont affectés à des rôles qui définissent leurs autorisations de compte, notamment les données qu'ils peuvent lire et les ressources de compte qu'ils peuvent modifier. Lorsque des [autorisations](#permissions) sont accordées à un rôle, tout utilisateur associé à ce rôle reçoit ces autorisations. Consultez [Contrôle d'accès basé sur les rôles][1] pour plus d'informations.

Le [contrôle d'accès granulaire](#granular-access-control) vous permet de restreindre l'accès à des ressources individuelles par rôles, [équipes][2] ou utilisateurs : Pour Observability Pipelines, vous pouvez [restreindre l'accès à un pipeline](#restrict-access-to-a-pipeline) ou [restreindre l'accès à Live Capture pour un pipeline](#restrict-access-to-live-capture-for-a-pipeline).

## Autorisations {#permissions}

Consultez la [liste des autorisations][3] pour les ressources d'Observability Pipelines et les niveaux d'autorisations inclus dans les rôles par défaut de Datadog.

## Contrôle d'accès granulaire {#granular-access-control}

Le [contrôle d'accès granulaire][4] peut uniquement restreindre l'accès aux ressources et n'augmente **pas** les autorisations. Par exemple, si un utilisateur possède le **Datadog Read Only Role** et qu'il reçoit l'accès {{< ui >}}Editor{{< /ui >}} pour un pipeline spécifique via le contrôle d'accès granulaire, l'utilisateur dispose toujours d'un accès en lecture seule à ce pipeline et ne peut pas le modifier. Vous devez mettre à jour son rôle pour un rôle autorisant la modification de pipelines si vous souhaitez qu'il puisse apporter des modifications à ce pipeline et à d'autres pipelines.

{{< img src="observability_pipelines/access_control/menu.png" alt="La page du pipeline affichant le menu Access Control" style="width:40%;" >}}

### Restreindre l'accès à un pipeline {#restrict-access-to-a-pipeline}

Vous pouvez restreindre l'accès à un pipeline spécifique avec les options de rôle suivantes :

| Rôle | Afficher le pipeline | Modifier le pipeline | Déployer le pipeline | Supprimer le pipeline | Peut restreindre l'accès au pipeline |
|:----:|:-------------:|:-------------:|:---------------:|:---------------:|:--------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| Runner | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| Contributor* | {{< X >}} | {{< X >}} |  |  |  |
| Viewer | {{< X >}} |  |  |  |  |
| No Access |  |  |  |  |  |

*Contributor ne peut modifier la configuration du pipeline que lorsque celui-ci est en draft mode et n'a pas encore été déployé.

**Remarques** :

- Vous ne pouvez pas enregistrer les paramètres d'accès granulaires s'il n'y a pas au moins un utilisateur disposant d'un accès Editor au pipeline.
- Vous pouvez vous exclure vous-même d'un pipeline, même si vous l'avez créé. Lorsque vous modifiez les restrictions d'accès granulaires pour l'accès au pipeline et que vous souhaitez continuer à disposer d'un accès Editor pour ce pipeline, assurez-vous d'être l'un des utilisateurs ou de faire partie d'une équipe ou d'un rôle disposant d'un accès Editor.

{{< img src="observability_pipelines/access_control/pipeline_modal.png" alt="La fenêtre modale de contrôle d'accès au pipeline affichant les options de restriction" style="width:60%;" >}}

Pour utiliser des contrôles d'accès granulaires afin de limiter l'accès à un pipeline spécifique :

1. Accédez à la page [Pipelines][5].
1. Sélectionnez le pipeline auquel vous souhaitez restreindre l'accès.
1. Cliquez sur la roue dentée en haut à droite de la page.
1. Cliquez sur {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Pipeline Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
1. La section {{< ui >}}Organization access{{< /ui >}} indique que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut. Utilisez le menu déroulant pour sélectionner le type d'accès que vous souhaitez leur accorder.
1. Cliquez sur le menu déroulant dans la section {{< ui >}}Restricted{{< /ui >}} pour définir les niveaux d'accès pour les équipes, les rôles, les utilisateurs ou les comptes de service.
1. Cliquez sur {{< ui >}}Copy Link{{< /ui >}} si vous souhaitez fournir le lien du pipeline aux utilisateurs qui obtiennent l'accès à ce pipeline.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour restaurer l'accès complet à un pipeline :

1. Cliquez sur la roue dentée en haut à droite de la page de votre pipeline.
1. Cliquez sur {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Pipeline Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Restreindre l'accès à Live Capture pour un pipeline {#restrict-access-to-live-capture-for-a-pipeline}

[Live Capture][6] vous permet de :

- Voir les données qu'une source envoie aux pipelines.
- Voir les données qu'un processeur reçoit.
- Voir les données qu'un processeur envoie à la destination.

Vous pouvez restreindre l'accès à Live Capture **pour un pipeline spécifique** avec les options suivantes :

| Role | View captured events | Run new captures | Restrict access to Live Capture |
|:----:|:--------------------:|:----------------:|:-------------------------------:|
| Editor | {{< X >}} | {{< X >}} | {{< X >}} |
| Viewer | {{< X >}} |  |  |
| No Access |  |  |  |

**Remarques** :

- Vous ne pouvez pas enregistrer de paramètres d'accès granulaires s'il n'y a pas au moins un utilisateur avec un accès {{< ui >}}Editor{{< /ui >}} à Live Capture.
- Vous pouvez vous exclure de Live Capture pour un pipeline spécifique même si vous avez créé le pipeline. Lorsque vous modifiez les restrictions d'accès granulaires pour l'accès à Live Capture et que vous souhaitez disposer d'un accès Editor pour Live Capture, assurez-vous d'être l'un des utilisateurs ou de faire partie d'une équipe ou d'un rôle disposant d'un accès Editor.

{{< img src="observability_pipelines/access_control/live_capture_modal.png" alt="La fenêtre modale de contrôle d'accès au pipeline affichant les options de restriction" style="width:60%;" >}}

Pour utiliser les contrôles d'accès granulaires afin de limiter l'accès à Live Capture pour un pipeline spécifique :

1. Accédez à la page [Pipelines][6].
1. Sélectionnez le pipeline auquel vous souhaitez restreindre l'accès.
1. Cliquez sur la roue dentée en haut à droite de la page.
1. Cliquez sur {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Live Capture Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restrict Access{{< /ui >}}.
1. La section {{< ui >}}Organization access{{< /ui >}} indique que les membres de votre organisation ont un accès {{< ui >}}Viewer{{< /ui >}} par défaut. Utilisez le menu déroulant pour sélectionner le type d'accès que vous souhaitez leur accorder.
1. Cliquez sur le menu déroulant dans la section {{< ui >}}Restricted{{< /ui >}} pour définir les niveaux d'accès pour les équipes, les rôles, les utilisateurs ou les comptes de service en fonction de votre cas d'utilisation.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour restaurer l'accès complet à Live Capture pour un pipeline :

1. Cliquez sur la roue dentée en haut à droite de la page de votre pipeline.
1. Cliquez sur {{< ui >}}Edit Access{{< /ui >}} > {{< ui >}}Live Capture Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Restore Full Access{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: /fr/account_management/rbac/?tab=datadogapplication#role-based-access-control
[2]: /fr/account_management/teams/
[3]: /fr/account_management/rbac/permissions/#observability-pipelines
[4]: /fr/account_management/rbac/granular_access/
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /fr/observability_pipelines/live_capture/