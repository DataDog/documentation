---
algolia:
  tags:
  - app builder
  - actions
description: Enregistrer et réutiliser des actions et leurs paramètres
disable_sidebar: false
disable_toc: false
further_reading:
- link: /actions/workflows/actions/
  tag: Documentation
  text: Découvrez les actions dans des workflows
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
title: Enregistrer et réutiliser des actions
type: documentation
---
Utilisez la fonctionnalité _Actions enregistrées_ pour enregistrer une copie d'une action afin de la réutiliser. Vous pouvez insérer une action enregistrée dans votre application en tant que nouvelle étape, ou utiliser une action enregistrée pour renseigner les paramètres d'une étape existante.

<div class="alert alert-info">Vous ne pouvez enregistrer des actions que si vous disposez d'un accès <a href="https://docs.datadoghq.com/actions/app_builder/access_and_auth/#app-permissions"><b>Editor</b>.</a> pour cette application.</div>

## Enregistrer une action {#save-an-action}

1. Dans Datadog, accédez à [**Actions** > **App Builder**][1] et survolez une application. Les icônes d'action pour cette application apparaîtront sous la colonne {{< ui >}}Last Saved{{< /ui >}}. Cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} .
1. Cliquez sur le menu {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} , puis {{< ui >}}Save Action{{< /ui >}}.
1. Saisissez un nom et une description pour l'action.
1. Si vous souhaitez que d'autres membres de votre organisation aient accès à l'action, activez le commutateur {{< ui >}}Usable by others in the organization{{< /ui >}}.
1. Vérifiez les détails de configuration de l'action et cliquez sur {{< ui >}}Save Action Configuration{{< /ui >}}.

## Utilisez une action enregistrée dans votre application {#use-a-saved-action-in-your-app}

1. Dans Datadog, accédez à [**Actions** > **App Builder**][1], survolez une application, puis cliquez sur l'icône {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} .
1. Cliquez sur le menu {{< ui >}}Actions{{< /ui >}} {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} et sélectionnez {{< ui >}}Use Saved Actions{{< /ui >}}.
1. Parcourez la liste pour trouver l'action enregistrée que vous recherchez.
1. Sélectionnez l'action enregistrée pour l'ajouter en tant qu'étape configurée dans votre application.

## Gérer une action enregistrée {#manage-a-saved-action}

Vous pouvez modifier, cloner ou supprimer vos actions enregistrées depuis l'Action Catalog.

<div class="alert alert-info">Si vous n'avez pas créé une action, vous ne pouvez pas la supprimer ni la modifier directement. Sélectionnez plutôt <b>Clone</b>. {{< img src="icons/clone-alert-blue.png" inline="true" style="width:14px;">}} Icône pour copier l'action et effectuer vos modifications de configuration.</div>

Pour rechercher une action enregistrée :
1. Dans Datadog, accédez à l'[**Action Catalog**][2].
1. Cliquez sur {{< ui >}}Saved Actions{{< /ui >}}.
1. Parcourez la liste des actions enregistrées ou utilisez la barre de recherche pour rechercher des actions par nom. Survolez l'action enregistrée que vous souhaitez modifier, cloner ou supprimer.
1. Cliquez sur {{< ui >}}Manage Saved Actions{{< /ui >}}.
1. Sélectionnez l'icône pour modifier {{< img src="icons/pencil.png" inline="true" style="width:14px;">}}, cloner {{< img src="icons/clone.png" inline="true" style="width:14px;">}}, ou supprimer {{< img src="icons/delete.png" inline="true" style="width:14px;">}} l'action enregistrée.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/app-builder/apps/list
[2]: https://app.datadoghq.com/actions/action-catalog
[3]: https://chat.datadoghq.com/