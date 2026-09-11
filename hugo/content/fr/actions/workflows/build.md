---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/workflows/build
- /fr/service_management/workflows/build
description: Créez des workflows à partir de blueprints ou construisez des workflows
  personnalisés à l'aide de l'assistance IA, de la configuration manuelle et d'actions
  par glisser-déposer.
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Débuter avec Workflow Automation
- link: /actions/actions_catalog
  tag: Documentation
  text: Parcourez les actions disponibles dans l'Action Catalog.
- link: /security/cloud_security_management/workflows
  tag: Documentation
  text: Automatisez les Security Workflows avec Workflow Automation.
- link: /actions/workflows/variables
  tag: Documentation
  text: Variables et paramètres
title: Créez des workflows
---
Vous pouvez créer des workflows ou modifier des workflows existants depuis la page [Workflow Automation][1]. La page répertorie des informations sur les workflows existants, telles que le propriétaire du workflow, le type de déclencheur, les dates auxquelles chaque workflow a été modifié et exécuté pour la dernière fois, et si le workflow est publié ou non.
- Survolez un workflow pour afficher les options permettant de supprimer, cloner ou modifier les autorisations du workflow.
- Activez {{< ui >}}My workflows{{< /ui >}} si vous souhaitez voir uniquement les workflows que vous avez créés.

## Construisez un workflow à partir d'un blueprint {#build-a-workflow-from-a-blueprint}

1. Cliquez sur l'onglet [**Blueprints**][5].
1. Si vous le souhaitez, utilisez la barre de recherche pour restreindre la liste des blueprints par nom, catégorie ou intégration.
1. Trouvez le blueprint que vous souhaitez utiliser et cliquez dessus. Le canevas de workflow s'affiche.
1. Cliquez sur {{< ui >}}Create From Blueprint{{< /ui >}}. Le canevas de workflow se met à jour pour afficher votre workflow nouvellement créé.
1. Saisissez un nouveau nom et une description pour le workflow.
1. Optionnellement, sélectionnez ou saisissez les tags que vous souhaitez appliquer au workflow. Pour plus d'informations sur les tags Datadog, consultez [Débuter avec les tags][7].
1. Optionnellement, sélectionnez les [services][8] associés à ajouter au workflow.
1. Optionnellement, sélectionnez les [équipes][9] à associer au workflow. Si une équipe n'existe pas, vous pouvez saisir un nom pour la créer.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour appliquer vos modifications.
1. Les étapes de workflow qui nécessitent des mises à jour sont marquées par des points d'exclamation. Cliquez sur chaque étape de workflow que vous souhaitez modifier et remplissez les champs vides sous l'onglet {{< ui >}}Configure{{< /ui >}}.
1. Lorsque vous avez terminé de modifier le workflow, cliquez sur {{< ui >}}Run{{< /ui >}} pour tester votre workflow.
1. Lorsque vous êtes prêt à publier votre workflow, cliquez sur {{< ui >}}Publish{{< /ui >}}. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][4].

## Créer ou modifier un workflow avec l'IA {#create-a-workflow-with-ai}

Si vous ne savez pas par où commencer, vous pouvez générer automatiquement un workflow ou itérer sur un workflow existant avec l'IA.

Pour générer un workflow :
1. Depuis la page [Workflow Automation][1], cliquez sur {{< ui >}}New Workflow{{< /ui >}}.
1. Cliquez sur {{< ui >}}Create a workflow with AI{{< /ui >}}.
1. Saisissez une invite détaillée pour votre workflow. Spécifiez les intégrations et les actions que vous souhaitez utiliser.
1. Cliquez sur la flèche vers le haut ({{< ui >}}↑{{< /ui >}}) pour créer votre workflow.

Pour itérer sur un workflow existant :
1. Depuis un workflow existant, cliquez sur {{< ui >}}Edit with AI{{< /ui >}}.
1. Saisissez une invite détaillée pour le comportement que vous souhaitez ajouter à votre workflow. Incluez les intégrations et les actions que vous souhaitez utiliser.
1. Cliquez sur la flèche vers le haut ({{< ui >}}↑{{< /ui >}}) pour ajouter la fonctionnalité à votre workflow.

<div class="alert alert-info">L'IA de Workflow Automation ne répond pas aux questions sur le produit. Si vous avez des questions ou des commentaires, pensez à rejoindre le canal <strong>#workflows</strong> sur le <a href="https://chat.datadoghq.com/">Slack de la communauté Datadog</a></div>

## Créer un workflow personnalisé {#create-a-custom-workflow}

Pour créer un workflow, cliquez sur {{< ui >}}New workflow{{< /ui >}} sur la page [Workflow Automation][1].

Pour configurer votre workflow :
1. Dans le panneau de configuration du workflow, saisissez un {{< ui >}}Name{{< /ui >}} pour votre workflow.
1. Optionnellement, sélectionnez ou saisissez les tags que vous souhaitez appliquer au workflow. Pour plus d'informations sur les tags Datadog, consultez [Débuter avec les tags][7].
1. Optionnellement, sélectionnez les [services][8] associés à ajouter au workflow.
1. Optionnellement, sélectionnez les [équipes][9] à associer au workflow. Si une équipe n'existe pas, vous pouvez saisir un nom pour la créer.
1. Saisissez les paramètres d'entrée ou de sortie si votre workflow les utilise.
1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour appliquer vos modifications.

Si vous n'êtes pas sûr de la configuration de votre workflow, vous pouvez revenir au panneau plus tard en cliquant n'importe où sur le canevas du workflow.

### Créez un workflow avec le générateur de workflow {#build-a-workflow-with-the-workflow-builder}

1. Si votre workflow nécessite un déclencheur, cliquez sur {{< ui >}}Add Trigger{{< /ui >}}. Pour plus d'informations, consultez [Déclencher un workflow][3].
1. Cliquez sur {{< ui >}}Add Step{{< /ui >}} pour commencer à ajouter des étapes à votre workflow.
1. Recherchez une action à l'aide de la barre de recherche ou parcourez les intégrations et leurs actions associées pour trouver l'action que vous recherchez. Cliquez sur une action pour l'ajouter en tant qu'étape sur votre canevas de workflow.
1. Cliquez sur l'étape dans le canevas du workflow pour la configurer ou pour afficher ses sorties ou ses variables de contexte. Pour plus d'informations sur les sorties et les variables de contexte, consultez [Variables de contexte][14].
1. Une fois l'étape configurée, cliquez sur l'icône IA <i class="icon-bits-ai"></i> ou l'icône plus ({{< ui >}}\+{{< /ui >}}) pour ajouter une autre étape, ou enregistrez le workflow si vous avez terminé.
1. Lorsque vous êtes prêt à publier votre workflow, cliquez sur {{< ui >}}Publish{{< /ui >}}. Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][4].

Vous pouvez modifier une étape du workflow à tout moment en cliquant dessus. Cliquez sur les étapes de votre workflow et faites-les glisser pour les réorganiser.

#### Raccourcis et outils de canevas {#shortcuts-and-canvas-tools}

Pour voir les raccourcis clavier et souris du canevas du générateur de workflow, tapez `?` (shift+`/`) ou cliquez sur le {{< ui >}}Keyboard{{< /ui >}} {{< img src="actions/workflows/build/keyboard-icon.png" inline="true" style="width:40px;">}} bouton. Une liste de raccourcis s'affiche.

Le {{< ui >}}Zoom out{{< /ui >}} {{< img src="actions/workflows/build/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}, {{< ui >}}Zoom in{{< /ui >}} {{< img src="actions/workflows/build/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}, et {{< ui >}}Reset viewport{{< /ui >}} {{< img src="actions/workflows/build/reset-viewport-icon.png" inline="true" style="width:34px;">}} Ces boutons permettent de contrôler l'affichage de la zone de visualisation.

Le {{< ui >}}Auto layout{{< /ui >}} {{< img src="actions/workflows/build/auto-layout-icon.png" inline="true" style="width:80px;">}} Ce bouton permet d'aligner et de répartir les étapes de votre workflow.

Le {{< ui >}}Add annotation{{< /ui >}} {{< img src="actions/workflows/build/add-annotation-icon.png" inline="true" style="width:30px;">}} Ce bouton permet d'ajouter des notes d'annotation à votre workflow. Ces notes proposent une barre de mise en forme pour ajouter divers formats de texte tels que le gras et l'italique, des liens et des listes. Vous pouvez également saisir vos annotations en Markdown.

{{< img src="actions/workflows/build/workflow-annotation-with-bar.png" alt="Une annotation vide, avec la barre de mise en forme affichée au-dessus" style="width:70%;" >}}

## Tester une étape {#test-a-step}

Consultez la page de test et de débogage pour plus d'informations sur [comment tester une étape][11].

## Publier un workflow {#publish-a-workflow}

Les workflows planifiés et déclenchés ne se lancent pas automatiquement tant que vous ne les avez pas publiés. Pour publier le workflow, cliquez sur {{< ui >}}Publish{{< /ui >}} depuis la page du workflow.

Les workflows publiés génèrent des coûts basés sur les exécutions de workflow. Pour plus d'informations, consultez la [page de tarification Datadog][4].

### Mise à jour d'un workflow publié {#updating-a-published-workflow}

Vous pouvez mettre à jour des workflows publiés sans affecter la version en ligne tant que vous n'êtes pas prêt.

La modification d'un workflow publié crée un brouillon. Toutes les modifications apportées au brouillon n'altèrent pas le workflow publié. Chaque workflow peut avoir un brouillon actif, que tous les éditeurs peuvent modifier. Lorsque vous êtes prêt, cliquez sur {{< ui >}}Publish Changes{{< /ui >}} pour remplacer la version publiée.

Les brouillons exécutent toutes les étapes configurées comme n'importe quel workflow normal. Vous ne pouvez exécuter des brouillons qu'à partir de l'éditeur de workflow.

Pour supprimer le brouillon, cliquez sur {{< ui >}}cog icon{{< /ui >}} dans le coin supérieur droit de l'éditeur et sélectionnez {{< ui >}}Discard draft{{< /ui >}}.

**Remarques** :
- L'exécution d'un brouillon pour des workflows publiés n'entraîne aucun coût.
- Toute mise à jour des propriétés du workflow (nom, tags ou notifications) contourne le flux de brouillon et est appliquée immédiatement à la version publiée.

## Variables et paramètres {#variables-and-parameters}

Pour plus d'informations sur l'utilisation des variables et des paramètres dans vos workflows, consultez [Variables and parameters][12].

## Notifications de workflow {#workflow-notifications}

Vous pouvez configurer votre workflow pour qu'il vous envoie une notification en cas de succès ou d'échec. Les intégrations suivantes sont prises en charge :
- Slack
- Microsoft Teams
- PagerDuty
- E-mail

Pour ajouter une notification :
1. Dans le panneau de configuration du workflow, faites défiler jusqu'à la section {{< ui >}}Notifications{{< /ui >}}.
1. Pour ajouter une notification si le workflow réussit :
   1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) à côté de {{< ui >}}Notify on success{{< /ui >}}.
   1. Sélectionnez l'intégration que vous souhaitez utiliser pour les notifications.
   1. Remplissez les champs requis pour l'intégration spécifiée.
   1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour enregistrer votre workflow.
1. Pour ajouter une notification si le workflow échoue :
   1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) à côté de {{< ui >}}Notify on failure{{< /ui >}}.
   1. Sélectionnez l'intégration que vous souhaitez utiliser pour les notifications.
   1. Remplissez les champs requis pour l'intégration spécifiée.
   1. Cliquez sur {{< ui >}}Save{{< /ui >}} pour enregistrer votre workflow.

## Gestion des erreurs {#error-handling}

Vous pouvez spécifier le nombre de fois que vous souhaitez que votre workflow réessaie une étape échouée, ainsi que l'intervalle entre chaque tentative, avant de passer à un chemin d'erreur optionnel. Si aucun chemin d'erreur n'est présent, le workflow se termine une fois toutes les tentatives épuisées.

### Tentatives {#retries}

Pour configurer les tentatives pour une étape :
1. Cliquez sur l'étape dans le canevas du workflow.
1. Dans la section {{< ui >}}Retries{{< /ui >}}, ajustez les valeurs {{< ui >}}Interval{{< /ui >}} et {{< ui >}}Max retries{{< /ui >}}.
1. Enregistrez votre workflow pour appliquer les modifications.

### Ajouter un chemin d'erreur {#add-an-error-path}

Vous pouvez ajouter un chemin d'erreur que le workflow doit suivre s'il rencontre une erreur.

Pour ajouter un chemin d'erreur :
1. Survolez l'étape où vous souhaitez ajouter un chemin d'erreur.
1. Cliquez et faites glisser l'icône {{< ui >}}Error path{{< /ui >}} {{< img src="actions/workflows/build/error-path-icon.png" inline="true" style="width:24px;">}} pour placer un nouveau chemin d'erreur sur le canevas.
1. Sélectionnez une étape de workflow à ajouter au chemin d'erreur.
1. Après avoir configuré votre étape, vous pouvez ajouter d'autres étapes à un chemin d'erreur et même fusionner votre chemin d'erreur avec le chemin principal du workflow.
1. Une fois la configuration des étapes de votre chemin d'erreur terminée, cliquez sur {{< ui >}}Save{{< /ui >}} pour appliquer vos modifications.

## Attendre jusqu'à la condition {#wait-until-condition}

Certaines actions vous permettent d'ajouter une condition qui doit être remplie avant qu'un workflow puisse marquer une étape comme terminée et continuer.

Pour ajouter une condition :
1. Cliquez sur l'étape dans le canevas du workflow.
1. Dans la section {{< ui >}}Wait until condition{{< /ui >}}, utilisez le menu déroulant pour sélectionner une condition préconfigurée, ou sélectionnez {{< ui >}}Configure custom wait condition{{< /ui >}} et créez votre propre condition.
   - La liste des conditions préconfigurées disponibles dépend de l'action.
   - Les variables d'instruction conditionnelle peuvent être une chaîne, un nombre, un booléen ou une variable de sortie d'étape.
   - Seules les variables de sortie de l'étape actuelle peuvent être utilisées dans une instruction conditionnelle personnalisée.
1. Saisissez un temps d'attente maximal pour le workflow. Si la condition n'est pas remplie à temps, l'étape échoue.

{{< img src="actions/workflows/build/wait-until-condition2.png" alt="Un exemple de condition « attendre jusqu'à »" style="width:100%;" >}}

## Modifier un workflow avec JSON {#edit-a-workflow-with-json}

Modifier un workflow en JSON en cliquant sur {{< ui >}}Edit JSON Spec{{< /ui >}} sur votre page de workflow. L'éditeur JSON vous permet également de :
- {{< ui >}}Format JSON{{< /ui >}} : Optimisez la mise en forme de votre JSON.
- {{< ui >}}Export JSON{{< /ui >}} : Téléchargez le workflow.

## Interagir avec le workflow en utilisant l'API {#interact-with-workflows-using-the-api}

Pour effectuer des tâches à l'aide de l'API, consultez la [documentation de l'API Workflow Automation][13].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][10].

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /fr/actions/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /fr/actions/workflows/actions/#testing-expressions-and-functions
[7]: /fr/getting_started/tagging/
[8]: /fr/glossary/#service
[9]: /fr/account_management/teams/
[10]: https://chat.datadoghq.com/
[11]: /fr/actions/workflows/test_and_debug/#test-a-step
[12]: /fr/actions/workflows/variables/
[13]: /fr/api/latest/workflow-automation/
[14]: /fr/actions/workflows/variables/#context-variables