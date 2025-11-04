---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/build
- /fr/service_management/workflows/build
description: Créer des workflows à partir de blueprints ou créer des workflows personnalisés
  à l'aide de l'assistance IA, de la configuration manuelle et d'actions glisser-déposer.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/actions_catalog
  tag: Documentation
  text: Parcourir les actions disponibles dans l'Action Catalog
- link: /security/cloud_security_management/workflows
  tag: Documentation
  text: Automatiser les workflows de sécurité avec Workflow Automation
- link: /service_management/workflows/variables
  tag: Documentation
  text: Variables et paramètres
title: Créer des workflows
---

Vous pouvez créer des workflows ou modifier des workflows existants depuis la page [Workflow Automation][1]. La page répertorie des informations sur les workflows existants, telles que le propriétaire du workflow, le type de déclencheur, les dates de dernière modification et d'exécution de chaque workflow, et si le workflow est publié ou non.
- Passez la souris sur un workflow pour obtenir les options permettant de supprimer, cloner ou modifier les autorisations du workflow.
- Activez l'option **My workflows** si vous souhaitez uniquement voir les workflows que vous avez créés.

## Créer un workflow à partir d'un blueprint

1. Cliquez sur l'onglet [**Blueprints**][5].
1. Si vous le souhaitez, utilisez la barre de recherche pour filtrer la liste des blueprints par nom, catégorie ou intégration.
1. Trouvez le blueprint que vous souhaitez utiliser et cliquez dessus. Le canevas du workflow apparaît.
1. Cliquez sur **Create From Blueprint**. Le canevas du workflow se met à jour pour afficher votre workflow nouvellement créé.
1. Saisissez un nouveau nom et une nouvelle description pour le workflow.
1. Facultativement, sélectionnez ou saisissez des tags que vous souhaitez appliquer au workflow. Pour obtenir plus d'informations sur les tags Datadog, consultez la section [Débuter avec les tags][7].
1. Facultativement, sélectionnez tous les [services][8] associés à appliquer au workflow.
1. Facultativement, sélectionnez des [équipes][9] à associer au workflow. Si une équipe n'existe pas, vous pouvez saisir un nom pour la créer.
1. Cliquez sur **Save** pour appliquer vos modifications.
1. Les étapes de workflow qui nécessitent des mises à jour sont marquées de points d'exclamation. Cliquez sur chaque étape de workflow que vous souhaitez modifier et remplissez tous les champs vides dans l'onglet **Configure**.
1. Lorsque vous avez terminé de modifier le workflow, cliquez sur **Run** pour tester votre workflow.
1. Lorsque vous êtes prêt à publier votre workflow, cliquez sur **Publish**. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][4].

## Créer ou modifier un workflow avec l'IA {#create-a-workflow-with-ai}

Si vous ne savez pas par où commencer, vous pouvez générer automatiquement un workflow ou itérer sur un workflow existant avec l'IA.

Pour générer un workflow :
1. Depuis la page [Workflow Automation][1], cliquez sur **New Workflow**.
1. Cliquez sur **Create a workflow with AI**.
1. Saisissez une invite détaillée pour votre workflow. Spécifiez les intégrations et les actions que vous souhaitez utiliser.
1. Cliquez sur la flèche vers le haut (**↑**) pour créer votre workflow.

Pour itérer sur un workflow existant :
1. Depuis un workflow existant, cliquez sur **Edit with AI**.
1. Saisissez une invite détaillée pour le comportement que vous souhaitez ajouter à votre workflow. Incluez les intégrations et les actions que vous souhaitez utiliser.
1. Cliquez sur la flèche vers le haut (**↑**) pour ajouter la fonctionnalité à votre workflow.

<div class="alert alert-info">L'IA de Workflow Automation ne répond pas aux questions sur le produit. Si vous avez des questions ou des commentaires, envisagez de rejoindre le canal <strong>#workflows</strong> sur le <a href="https://datadoghq.slack.com/">Slack de la communauté Datadog</a></div>

## Créer un workflow personnalisé

Pour créer un workflow, cliquez sur **New workflow** sur la page [Workflow Automation][1].

Pour configurer votre workflow :
1. Dans le panneau de configuration du workflow, saisissez un **Name** pour votre workflow.
1. Facultativement, sélectionnez ou saisissez des tags que vous souhaitez appliquer au workflow. Pour obtenir plus d'informations sur les tags Datadog, consultez la section [Débuter avec les tags][7].
1. Facultativement, sélectionnez tous les [services][8] associés à appliquer au workflow.
1. Facultativement, sélectionnez des [équipes][9] à associer au workflow. Si une équipe n'existe pas, vous pouvez saisir un nom pour la créer.
1. Saisissez des paramètres d'entrée ou de sortie si votre workflow les utilise.
1. Cliquez sur **Save** pour appliquer vos modifications.

Si vous n'êtes pas sûr de la configuration de votre workflow, vous pouvez revenir au panneau plus tard en cliquant n'importe où sur le canevas du workflow.

### Créer un workflow avec le créateur de workflow

1. Si votre workflow nécessite un déclencheur, cliquez sur **Add Trigger**. Pour obtenir plus d'informations, consultez la section [Déclencher un workflow][3].
1. Cliquez sur **Add Step** pour commencer à ajouter des étapes à votre workflow.
1. Recherchez une action à l'aide de la barre de recherche ou parcourez les différentes intégrations et leurs actions associées pour trouver l'action qui vous intéresse. Cliquez sur une action pour l'ajouter en tant qu'étape dans la fenêtre d'édition.
1. Cliquez sur l'étape dans le canevas du workflow pour la configurer ou afficher ses sorties ou ses variables de contexte. Pour obtenir plus d'informations sur les sorties et les variables de contexte, consultez la section [Variables de contexte][14].
1. Après avoir configuré l'étape, cliquez sur l'icône IA <i class="icon-bits-ai"></i> ou sur l'icône plus (**+**) pour ajouter une autre étape, ou enregistrez le workflow si vous avez terminé.
1. Lorsque vous êtes prêt à publier votre workflow, cliquez sur **Publish**. Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][4].

Chaque étape du workflow peut être modifiée à tout moment en cliquant dessus. Cliquez sur les étapes et faites-les glisser pour les réorganiser.

#### Raccourcis et outils de canevas

Pour voir les raccourcis clavier et souris pour le canevas du générateur de workflow, tapez `?` (shift+`/`) ou cliquez sur le bouton **Keyboard** {{< img src="service_management/workflows/keyboard-icon.png" inline="true" style="width:40px;">}}. Une liste de raccourcis apparaît.

Les boutons **Zoom out** {{< img src="service_management/workflows/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, **Zoom in** {{< img src="service_management/workflows/zoom-in-mag-icon.png" inline="true" style="width:30px;">}} et **Reset viewport** {{< img src="service_management/workflows/reset-viewport-icon.png" inline="true" style="width:34px;">}} contrôlent la façon dont la fenêtre d'affichage est affichée.

Le bouton **Auto layout** {{< img src="service_management/workflows/auto-layout-icon.png" inline="true" style="width:80px;">}} aligne et distribue les étapes de votre workflow.

Le bouton **Add annotation** {{< img src="service_management/workflows/add-annotation-icon.png" inline="true" style="width:30px;">}} vous permet d'ajouter des notes d'annotation à votre workflow. Ces notes offrent une barre de formatage pour ajouter divers formats de texte tels que le gras et l'italique, les liens et les listes. Vous pouvez également saisir vos annotations en Markdown.

{{< img src="service_management/workflows/workflow-annotation-with-bar.png" alt="Une annotation vide, avec la barre de formatage affichée au-dessus" style="width:70%;" >}}

## Tester une étape

Consultez la page de test et de débogage pour obtenir des informations sur [comment tester une étape][11].

## Publier un workflow

Les workflows planifiés et déclenchés ne se déclenchent pas automatiquement tant que vous ne les avez pas publiés. Pour publier le workflow, cliquez sur **Publish** depuis la page du workflow.

Les workflows publiés engendrent des coûts en fonction des exécutions de workflow. Pour obtenir plus d'informations, consultez la [page de la tarification de Datadog][4].

### Mettre à jour un workflow publié

Vous pouvez mettre à jour les workflows publiés sans affecter la version en ligne jusqu'à ce que vous soyez prêt.

La modification d'un workflow publié crée un brouillon. Toutes les modifications apportées au brouillon ne modifient pas le workflow publié. Chaque workflow peut avoir un brouillon actif, que tous les éditeurs peuvent modifier. Lorsque vous êtes prêt, cliquez sur **Publish Changes** pour remplacer la version publiée.

Les brouillons exécutent toutes les étapes configurées comme n'importe quel workflow normal. Vous pouvez uniquement exécuter des brouillons depuis l'éditeur de workflow.

Pour supprimer le brouillon, cliquez sur l'**icône de roue dentée** dans le coin supérieur droit de l'éditeur et sélectionnez **Discard draft**.

**Remarques** :
- L'exécution d'un brouillon pour les workflows publiés n'engendre pas de coûts.
- Toute mise à jour des propriétés du workflow (nom, tags ou notifications) contourne le flux de brouillon et est appliquée immédiatement à la version publiée.

## Variables et paramètres

Pour obtenir des informations sur l'utilisation de variables et de paramètres dans vos workflows, consultez la section [Variables et paramètres][12].

## Notifications de workflow

Vous pouvez configurer votre workflow pour qu'il vous envoie une notification en cas de succès ou d'échec. Les intégrations suivantes sont prises en charge :
- Slack
- Microsoft Teams
- PagerDuty
- E-mail

Pour ajouter une notification :
1. Dans le panneau de configuration du workflow, faites défiler jusqu'à la section **Notifications**.
1. Pour ajouter une notification si le workflow réussit :
   1. Cliquez sur l'icône plus (`+`) à côté de **Notify on success**.
   1. Sélectionnez l'intégration que vous souhaitez utiliser pour les notifications.
   1. Remplissez les champs requis pour l'intégration spécifiée.
   1. Cliquez sur **Save** pour enregistrer votre workflow.
1. Pour ajouter une notification si le workflow échoue :
   1. Cliquez sur l'icône plus (`+`) à côté de **Notify on failure**.
   1. Sélectionnez l'intégration que vous souhaitez utiliser pour les notifications.
   1. Remplissez les champs requis pour l'intégration spécifiée.
   1. Cliquez sur **Save** pour enregistrer votre workflow.

## Gestion des erreurs

Vous pouvez spécifier le nombre de fois que vous souhaitez que votre workflow réessaie une étape ayant échoué, et à quel intervalle, avant de passer à un chemin d'erreur facultatif. Si aucun chemin d'erreur n'est présent, le workflow se termine après épuisement de toutes les tentatives.

### Tentatives

Pour configurer les tentatives pour une étape :
1. Cliquez sur l'étape concernée dans la fenêtre d'édition du workflow.
1. Dans la section **Retries**, ajustez les valeurs **Interval** et **Max retries**.
1. Enregistrez votre workflow pour appliquer les modifications.

### Ajouter un chemin d'erreur

Vous pouvez ajouter un chemin d'erreur que le workflow doit suivre s'il rencontre une erreur.

Pour ajouter un chemin d'erreur :
1. Passez la souris sur l'étape où vous souhaitez ajouter un chemin d'erreur.
1. Cliquez et faites glisser l'icône **Error path** {{< img src="service_management/workflows/error-path-icon.png" inline="true" style="width:24px;">}} pour placer un nouveau chemin d'erreur sur le canevas.
1. Sélectionnez une étape de workflow à ajouter au chemin d'erreur.
1. Après avoir configuré votre étape, vous pouvez ajouter d'autres étapes à un chemin d'erreur et même fusionner votre chemin d'erreur avec le chemin de workflow principal.
1. Lorsque vous avez terminé de configurer les étapes de votre chemin d'erreur, cliquez sur **Save** pour appliquer vos modifications.

## Attendre jusqu'à ce que la condition soit remplie

Certaines actions vous permettent d'ajouter une condition qui doit être remplie avant qu'un workflow puisse marquer une étape comme terminée et continuer.

Pour ajouter une condition :
1. Cliquez sur l'étape concernée dans la fenêtre d'édition du workflow.
1. Dans la section **Wait until condition**, utilisez le menu déroulant pour sélectionner une condition préconfigurée, ou sélectionnez **Configure custom wait condition** et créez votre propre condition.
   - La liste des conditions préconfigurées disponibles dépend de l'action.
   - Les variables d'instruction conditionnelle peuvent être soit une chaîne de caractères, soit un nombre, soit un booléen, soit une variable de sortie d'étape.
   - Seules les variables de sortie de l'étape actuelle peuvent être utilisées dans une instruction conditionnelle personnalisée.
1. Saisissez un temps d'attente maximum pour le workflow. Si la condition n'est pas remplie à temps, l'étape échoue.

{{< img src="service_management/workflows/wait-until-condition2.png" alt="Un exemple de wait until condition" style="width:100%;" >}}

## Modifier un workflow avec JSON

Modifiez un workflow en JSON en cliquant sur **Edit JSON Spec** sur la page de votre workflow. L'éditeur JSON vous permet également de :
- **Format JSON** : améliorez l'apparence de votre JSON.
- **Export JSON** : permet de télécharger le workflow.

## Interagir avec les workflows à l'aide de l'API

Pour effectuer des tâches à l'aide de l'API, consultez la [documentation de l'API Workflow Automation][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /fr/service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /fr/service_management/workflows/actions/#testing-expressions-and-functions
[7]: /fr/getting_started/tagging/
[8]: /fr/glossary/#service
[9]: /fr/account_management/teams/
[10]: https://datadoghq.slack.com/
[11]: /fr/service_management/workflows/test_and_debug/#test-a-step
[12]: /fr/service_management/workflows/variables/
[13]: /fr/api/latest/workflow-automation/
[14]: /fr/service_management/workflows/variables/#context-variables