---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/actions_catalog/action_blueprints/
- /fr/service_management/workflows/actions_catalog/saved_actions/
- /fr/service_management/workflows/actions/saved_actions/
- /fr/service_management/workflows/saved_actions
description: Enregistrer et réutiliser des actions et leurs paramètres
disable_sidebar: false
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
- link: /actions/app_builder/saved_actions/
  tag: Documentation
  text: Enregistrer et réutiliser des actions dans les applications
title: Enregistrer et réutiliser des actions
type: documentation
---

Utilisez la fonction _Saved Actions_ (Actions enregistrées) pour stocker et réutiliser une action et ses paramètres. Vous pouvez insérer une action enregistrée dans votre workflow en tant que nouvelle étape ou l'utiliser pour remplir les paramètres d'une étape existante.

## Enregistrer une action

1. Dans le canevas du workflow, cliquez sur une action que vous souhaitez enregistrer.
1. Cliquez sur **Save action**.
1. Saisissez un nom et une description pour l'action.
1. Si vous voulez que n'importe quel autre membre de votre organisation ait accès à l'action, cochez **Usable by others in the organization**.
1. Vérifiez les détails de la configuration de l'action et cliquez sur **Save Action Configuration**.

{{< img src="service_management/workflows/save_action_1.mp4" alt="Cliquez sur l'icône Saved Action pour enregistrer une action pour l'utiliser plus tard." video="true" width=80% >}}

## Utiliser une action enregistrée dans votre workflow

Pour ajouter une action enregistrée en tant que nouvelle étape de votre workflow :
1. Cliquez sur l'icône plus (`+`) dans le canevas du workflow et sélectionnez Saved Actions.
1. Utilisez la barre de recherche ou parcourez la liste pour rechercher l'action enregistrée de votre choix.
1. Sélectionnez l'action enregistrée pour l'ajouter en tant qu'étape configurée dans le canevas de votre workflow.

Pour configurer une étape existante à l'aide d'une action enregistrée :
1. Sélectionnez une étape de votre workflow que vous souhaitez remplir avec une action préconfigurée.
1. Cliquez sur l'icône **Saved Actions** et sélectionnez **Configure using a saved action**.
1. Sélectionnez l'action enregistrée que vous souhaitez utiliser pour configurer votre étape et cliquez sur **Use Saved Action**.

## Gérer une action enregistrée

Vous pouvez prévisualiser, modifier ou supprimer vos actions enregistrées à partir de l'onglet [Catalogue d'actions][1].

Pour rechercher une action enregistrée :
1. Sur la page [Workflow Automation][2], cliquez sur [**Action Catalog**][1].
1. Cliquez sur **Saved Actions** et recherchez dans la liste l'action sauvegardée que vous souhaitez prévisualiser, modifier ou supprimer.
1. Survolez l'action et cliquez sur **Preview/Edit saved configurations** pour obtenir un aperçu de l'action.
1. Dans l'écran de prévisualisation, sélectionnez l'action pour la modifier ou la supprimer.

Si vous n'avez pas créé l'action, vous ne pouvez pas la modifier directement. Sélectionnez plutôt l'icône **Clone** pour la copier et apporter vos modifications à la configuration. Vous ne pouvez pas supprimer une action que vous n'avez pas créée.

{{< img src="service_management/workflows/edit_saved_action.png" alt="Prévisualiser, modifier ou supprimer une action enregistrée depuis le catalogue des actions." style="width:80%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][3].

[1]: https://app.datadoghq.com/workflow/action-catalog
[2]: https://app.datadoghq.com/workflow/
[3]: https://datadoghq.slack.com/