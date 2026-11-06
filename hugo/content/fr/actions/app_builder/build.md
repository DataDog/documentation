---
aliases:
- /fr/app_builder/build
- /fr/service_management/app_builder/build
description: Créez des applications personnalisées à partir de modèles ou en partant
  de zéro en utilisant des composants d'interface utilisateur à glisser-déposer, des
  requêtes et des expressions JavaScript.
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: Documentation
  text: Action Catalog
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: Centre d'apprentissage
  text: Prise en main d'App Builder
title: Créer des applications
---
Vous pouvez créer une application ou modifier des applications existantes depuis la page [App Builder][1]. La page répertorie des informations sur les applications existantes, notamment :
- Auteur
- Tags
- Date de dernière modification de chaque application
- Si chaque application est publiée

Sur la page App Builder, vous pouvez accéder à vos applications et les filtrer. Survolez une application pour obtenir des options permettant de modifier, supprimer, afficher ou cloner l'application. Vous pouvez également activer le commutateur {{< ui >}}My apps{{< /ui >}} pour ne voir que les applications que vous avez créées :

{{< img src="actions/app_builder/app-builder-my-apps-2025-11-19.png" alt="La page App Builder, filtrée pour afficher uniquement « Mes applications »" style="width:100%;" >}}

## Créer une application {#create-an-app}

Lors de la création d'une nouvelle application, vous pouvez utiliser [l'IA][22], [un modèle][18], [une mise en page][19] ou [une action][20] pour commencer. Alternativement, vous pouvez [partir de zéro][21] ou utiliser [l'App Playground][23] pour en savoir plus sur App Builder.

### Créer une application avec l'IA {#build-an-app-with-ai}

Avec Bits AI, vous pouvez générer une application complète à partir d'un seul prompt. Décrivez l'application que vous souhaitez créer, et l'agent d'interface utilisateur génère automatiquement l'interface, les actions et la logique mappées sur vos données et autorisations existantes. Vous pouvez ensuite itérer en discutant — en affinant les composants, les flux ou le style — sans écrire de code.

Pour créer une application avec Bits AI :
1. Depuis [App Builder][1], cliquez sur {{< ui >}}New App{{< /ui >}}.
1. Cliquez sur une suggestion de prompt ou saisissez un prompt décrivant l'application que vous souhaitez créer. Saisissez autant de détails que possible pour améliorer les résultats. Voici quelques exemples de prompts :
   - `Display a list of AWS Lambda functions in a table. Allow the user to filter by function name and specify the limit.`
   - `Display GitHub pull requests in a table.`
1. Appuyez sur <kbd>Entrée</kbd> pour envoyer votre prompt. Bits AI génère automatiquement l'interface utilisateur, les actions et la logique de votre application, mappées sur vos données et autorisations existantes.
    - Pendant que Bits AI génère votre application, il peut vous donner la possibilité de configurer une connexion pour créer l'application avec des données réelles. Vous pouvez effectuer cette étape ou la sauter pour créer la mise en page de l'application plus rapidement sans données.
    - Bits AI pose parfois des questions de clarification pendant qu'il répond à votre prompt. Si cela se produit, saisissez une réponse, puis appuyez sur <kbd>Entrée</kbd>. 
    - Une fois que Bits AI a ajouté une action à l'application, il vous donne la possibilité d'utiliser des données fictives dans votre action ou de sauter cette étape. Avec des données fictives, Bits AI peut déduire la sortie de l'action et connecter automatiquement ces données aux composants (comme définir la source de données d'un tableau). Si vous sautez cette étape, vous pourrez connecter les sorties manuellement plus tard.
1. Une fois que Bits AI a généré votre application, vous pouvez cliquer sur {{< ui >}}Edit with AI{{< /ui >}} ou [personnaliser votre application][15] manuellement.

Pour itérer sur une application existante :
1. Depuis [votre liste d'applications][14], survolez une application et cliquez sur l'icône modifier {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} .
1. Cliquez sur l'icône AI **<i class="icon-bits-ai"></i>**.
1. Saisissez un prompt détaillé pour le comportement que vous souhaitez ajouter à votre application. Incluez les intégrations et les actions que vous souhaitez utiliser.
1. Appuyez sur <kbd>Entrée</kbd> pour ajouter la fonctionnalité à votre application.

### Créer une application à partir d'un modèle {#build-an-app-from-a-blueprint}

Les Blueprints constituent des exemples d'applications pratiques, couvrant des cas d'utilisation courants et présentant les meilleures pratiques pour configurer des applications. Ils sont fournis avec des données de démonstration que vous pouvez utiliser pour vous familiariser avec les fonctions de l'application. Certains modèles créent une application de démarrage que vous pouvez personnaliser, comme [Manage Datastore][24] et [Export Synthetics][25]. Les Blueprints avec « how to » dans leur titre, comme [How to: Custom Code][26], sont des modèles avec des tutoriels intégrés pour les fonctionnalités d'App Builder.

1. Depuis [App Builder][1], cliquez sur l'onglet [**Blueprints**][2].
1. Cliquez sur le modèle que vous souhaitez utiliser. 
1. Cliquez sur {{< ui >}}Open in Editor{{< /ui >}}.
1. [Personnalisez votre application][15].

<div class="alert alert-tip">Vous pouvez également accéder aux modèles depuis la <a href="https://app.datadoghq.com/integrations">page des intégrations</a>. Cliquez sur une intégration, puis cliquez sur <b>Ressources de surveillance</b> pour voir les modèles disponibles.</div>

### Créer une application à partir d'une mise en page {#build-an-app-from-a-layout}

Choisir une mise en page est le moyen le plus rapide de créer une application minimale, prête à être modifiée. 

Pour créer une application à partir d'une mise en page :
1. Depuis [App Builder][1], cliquez sur {{< ui >}}New App{{< /ui >}}.
1. Cliquez sur {{< ui >}}Layouts{{< /ui >}} dans la fenêtre modale d'intégration.
1. Sélectionnez une mise en page. Il existe trois options : 
    - {{< ui >}}Table Manager{{< /ui >}} : Lister, filtrer et trier les données d'une requête.
    - {{< ui >}}Form{{< /ui >}} : Collecter des entrées et déclencher des actions (créer, mettre à jour, demander, etc.). Pour des modèles de formulaire plus détaillés, consultez [**Formulaires**][27].
    - {{< ui >}}Custom Chart{{< /ui >}} : Visualisez une requête en échangeant vos données dans un graphique à barres préconstruit.
1. Cliquez sur {{< ui >}}Use Layout{{< /ui >}}.
1. [Personnalisez votre application][15].

### Créez une application à partir d'une action {#build-an-app-from-an-action}

Vous pouvez créer une application en choisissant une intégration et une action spécifique dans l'[Action Catalog][17]. App Builder préconfigure l'action et ses requêtes, en intégrant des données en direct dans le canevas de l'application. Vous pouvez ensuite connecter des composants et tester l'application immédiatement. Cette méthode est idéale si vous avez déjà une intégration et une action en tête (comme interagir avec [a Datadog datastore][28]).

1. Depuis [App Builder][1], cliquez sur {{< ui >}}New App{{< /ui >}}. 
1. Cliquez sur **Action** dans la fenêtre modale d'intégration. 
1. Choisissez une intégration, puis cliquez sur **Continuer**.
1. Choisissez une ou plusieurs actions. Chaque ensemble d'actions est un modèle spécifique à l'intégration que vous avez sélectionnée. Il n'y a aucune limite au nombre d'actions que vous pouvez choisir.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.
1. [Personnalisez votre application][15].

### Créez une application personnalisée {#create-a-custom-app}

Si vous ne souhaitez utiliser aucune des méthodes ci-dessus, vous pouvez créer une nouvelle application à partir du canevas vierge d'App Builder.

1. Depuis [App Builder][1], cliquez sur {{< ui >}}New App{{< /ui >}}. 
1. Cliquez sur {{< ui >}}Start From Scratch{{< /ui >}}, ou cliquez sur {{< ui >}}X{{< /ui >}} pour fermer la fenêtre modale d'intégration.
1. [Personnalisez votre application][15].

### Découvrez ce qui est possible avec App Playground {#see-whats-possible-with-app-playground}

L'App Playground est une démonstration interactive qui guide les utilisateurs dans la création et l'utilisation d'une application. Si vous débutez avec App Builder, vous pouvez utiliser l'App Playground pour découvrir ses concepts fondamentaux, notamment : 
- Récupération de données
- Affichage des données de requête dans un tableau
- Configuration d'un bouton pour déclencher une requête
- Configuration des états de chargement d'un composant pour refléter l'état de chargement d'une requête
- Visualisation des données dans un graphique

Pour accéder à l'App Playground :
1. Depuis [App Builder][1], cliquez sur {{< ui >}}New App{{< /ui >}}. 
1. Cliquez sur {{< ui >}}App Playground{{< /ui >}}.
1. Sur l'écran suivant, le canevas de l'application (le volet de droite) affiche des informations pour vous guider dans App Builder. Cliquez sur des éléments tels que {{< ui >}}Fetching Data{{< /ui >}} pour voir des informations et des instructions sur l'utilisation de cette fonctionnalité. 

## Personnalisez votre application {#customize-your-app}

Les applications sont composées de composants d'interface utilisateur et de requêtes qui interagissent entre eux pour former l'expérience utilisateur et la logique derrière chaque application. La liste des requêtes et l'éditeur apparaissent sur le côté gauche de la page, tandis que le canevas de l'application et les composants d'interface utilisateur constituent le côté droit de la page.

Pour modifier les éléments de base de votre application :
1. Depuis [App Builder][1], survolez une application et cliquez sur l'icône modifier {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} .
1. Apportez les modifications nécessaires à votre application. 
    1. Cliquez sur le nom de l'application pour modifier ces éléments :
        - Nom
        - Description
        - Tags
        - Apparence
    1. Modifiez les [paramètres d'entrée][29].
    1. Pour ajouter un [composant d'interface utilisateur](#app-canvas-and-components) au canevas de l'application, cliquez sur l'icône {{< ui >}}Add Component{{< /ui >}} <i class="icon-component-wui" style="position:relative; top:4px;"></i> pour ouvrir l'onglet {{< ui >}}Components{{< /ui >}}. Cliquez sur le composant ou faites-le glisser sur le canevas de l'application.
1. Cliquez sur le bouton {{< ui >}}View{{< /ui >}} pour voir votre application du point de vue de l'utilisateur. Utilisez le mode vue pour interagir avec l'interface utilisateur de l'application et tester vos requêtes. Lorsque vous avez terminé, cliquez sur {{< ui >}}Edit{{< /ui >}} pour revenir au générateur d'applications.
1. Pour enregistrer votre application, cliquez sur {{< ui >}}Save{{< /ui >}}.
1. Lorsque vous êtes prêt à publier votre application, cliquez sur {{< ui >}}Publish{{< /ui >}}. La publication d'une application la rend disponible pour vos dashboards.

### Zone de travail de l'application et composants {#app-canvas-and-components}

Le canevas de l'application représente l'interface graphique avec laquelle vos utilisateurs interagissent. Vous pouvez faire glisser et déposer des composants pour les déplacer sur le canevas de l'application. Pour voir tous les composants disponibles, cliquez sur l'icône plus {{< img src="actions/app_builder/components-icon.png" inline="true" width="30px">}} pour ouvrir l'onglet {{< ui >}}Components{{< /ui >}}.

Chaque composant dispose d'une liste d'options de configuration correspondantes qui contrôlent la façon dont les utilisateurs interagissent avec votre application. Par exemple, le composant {{< ui >}}Text Input{{< /ui >}} vous permet de définir une valeur par défaut, un texte d'espace réservé et une étiquette. Le composant {{< ui >}}Button{{< /ui >}} comprend une étiquette et un événement qui se déclenche lorsque le bouton est pressé. Les composants d'interface utilisateur disposent également d'une section {{< ui >}}Appearance{{< /ui >}} qui modifie l'apparence et le comportement des composants. Par exemple, vous pouvez désactiver un bouton ou contrôler sa visibilité.

Pour supprimer ou dupliquer un composant, sélectionnez le composant et cliquez sur les trois points de suspension (*...*) pour afficher les options {{< ui >}}Delete{{< /ui >}} ou {{< ui >}}Duplicate{{< /ui >}}.

Pour obtenir une liste des composants d'interface utilisateur disponibles et leurs propriétés, consultez [Composants][9].

Les composants d'interface utilisateur peuvent déclencher des réactions sur un [Événement][11].

Les [Requêtes][12] alimentent votre application avec des données provenant des API Datadog ou des intégrations prises en charge. Elles prennent des entrées provenant d'autres requêtes ou de composants de l'interface utilisateur et renvoient des sorties destinées à être utilisées dans d'autres requêtes ou dans des composants de l'interface utilisateur.

Vous pouvez utiliser des [Expressions JavaScript][13] n'importe où dans App Builder pour créer des interactions personnalisées entre les différentes parties de votre application.

## Taguer une application {#tag-an-app}

Les tags s'affichent dans une colonne sur la [liste des applications][14].

Pour ajouter un tag à une application :

1. Ouvrez l'onglet {{< ui >}}App Properties{{< /ui >}} de votre application.
1. Sous {{< ui >}}Tags{{< /ui >}}, utilisez le menu déroulant pour sélectionner un tag existant, ou saisissez une nouvelle valeur et cliquez sur {{< ui >}}Add option: [your text]{{< /ui >}}.
1. Enregistrez votre application.

Le tag s'affiche sur la ligne correspondant à cette application dans la liste des applications. Vous pouvez cliquer sur le tag dans cette liste pour le copier dans votre presse-papiers.

## Ajouter une application aux favoris {#favorite-an-app}

L'ajout d'une application aux favoris l'épingle en haut de votre [liste d'applications][14]. 

Pour ajouter une application aux favoris, cliquez sur l'icône en forme d'étoile <i class="icon-star-empty-wui" style="position:relative; top:4px;"></i> à côté du nom de l'application. Lorsque vous actualisez la page, l'application marquée d'une étoile apparaît en haut de votre liste d'applications.

## Afficher l'historique des versions de l'application {#view-app-version-history}

App Builder conserve un enregistrement de chaque version enregistrée de votre application.

Pour afficher l'historique des versions de votre application, dans le menu de gauche de votre application, cliquez sur l'icône d'historique des versions {{< img src="icons/version-history.png" inline="true" style="width:14px;">}} .

L'interface utilisateur affiche les versions précédemment enregistrées ou publiées de votre application, ainsi que l'icône de l'utilisateur qui a enregistré ou publié la version :

{{< img src="actions/app_builder/version-history-example.png" alt="Un exemple de liste d'historique des versions d'App Builder avec deux éléments, la version actuelle et une version précédente" style="width:70%;" >}}

Vous pouvez effectuer les opérations suivantes :

* Pour afficher une version d'application, cliquez sur la version dans la liste.
* Pour remplacer une application existante par une version précédente, sélectionnez la version, puis cliquez sur {{< ui >}}Restore Version{{< /ui >}} en haut à droite.
* Pour créer une nouvelle application qui est une copie d'une version, sélectionnez la version, puis cliquez sur {{< ui >}}Clone Version{{< /ui >}} en haut à droite.


## Interagir avec une application en JSON {#interact-with-an-app-in-json}

### Modifier une application {#edit-an-app}

Pour modifier une application avec JSON, cliquez sur les paramètres {{< img src="icons/settings.png" inline="true" style="width:14px;">}} icône et sélectionnez {{< ui >}}Switch to JSON{{< /ui >}}. L'option {{< ui >}}Switch to GUI{{< /ui >}} dans le menu des paramètres vous ramène à l'éditeur d'interface graphique.

### Copier une application{#copy-an-app}

Pour copier la mise en page d'une application entre des organisations ou pour sauvegarder une application, cliquez sur les paramètres {{< img src="icons/settings.png" inline="true" style="width:14px;">}} icône et sélectionnez {{< ui >}}Switch to JSON{{< /ui >}}. Ceci affiche le code JSON de l'application entière. Copiez ce code JSON et enregistrez-le dans un éditeur de texte. Vous pouvez enregistrer des états intermédiaires de votre application pendant le développement et y revenir si nécessaire.

Pour copier l'application vers une autre organisation :
1. Créer une application. 
1. Cliquez sur {{< ui >}}Settings{{< /ui >}} {{< img src="icons/settings.png" inline="true" style="width:14px;">}} et sélectionnez {{< ui >}}Switch to JSON{{< /ui >}}. 
1. Remplacez le JSON existant par le JSON que vous avez copié précédemment. 

L'option {{< ui >}}Switch to GUI{{< /ui >}} dans le menu des paramètres vous ramène à l'éditeur d'interface graphique.

## Déboguer une application {#debug-an-app}

La console de débogage d'App Builder offre un emplacement central pour visualiser les logs en temps réel, les exécutions d'actions et les erreurs. 

Pour accéder à la console de débogage, survolez une application dans [votre liste d'applications][14] et cliquez sur l'icône modifier {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} . Cliquez sur l'icône d'agrandissement {{< img src="icons/panel-bottom-grow.png" inline="true" style="width:14px;">}} dans le coin inférieur droit pour voir la console de débogage entière. Les informations contenues dans la console incluent :
- {{< ui >}}Action Executions{{< /ui >}} : Suivez le succès et l'échec des exécutions d'actions avec leurs entrées et sorties associées.
- {{< ui >}}Errors{{< /ui >}} : Affichez les logs des erreurs, des avertissements et des messages d'information.
- {{< ui >}}Logs{{< /ui >}} : Affichez les erreurs de configuration de vos actions, transformateurs, variables et composants.
- {{< ui >}}App State{{< /ui >}} : Accédez aux changements d'état de l'application en temps réel.

{{< img src="actions/app_builder/app-builder-debug-console.png" alt="Le panneau développé de la console de débogage dans la vue éditeur d'une application" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][8].

[1]: https://app.datadoghq.com/app-builder/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /fr/actions/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /fr/actions/connections
[6]: /fr/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[9]: /fr/actions/app_builder/components
[10]: https://app.datadoghq.com/app-builder/action-catalog
[11]: /fr/actions/app_builder/events
[12]: /fr/actions/app_builder/queries
[13]: /fr/actions/app_builder/expressions
[14]: https://app.datadoghq.com/app-builder/apps/list
[15]: /fr/actions/app_builder/build/#customize-your-app
[16]: /fr/getting_started/integrations/
[17]: /fr/actions/actions_catalog/
[18]: /fr/actions/app_builder/build/#build-an-app-from-a-blueprint
[19]: /fr/actions/app_builder/build/#build-an-app-from-a-layout
[20]: /fr/actions/app_builder/build/#build-an-app-from-an-action
[21]: /fr/actions/app_builder/build/#create-a-custom-app
[22]: /fr/actions/app_builder/build/#build-an-app-with-ai
[23]: /fr/actions/app_builder/build/#see-whats-possible-with-app-playground
[24]: https://app.datadoghq.com/app-builder/apps/edit?template=manage-datastore&viewMode=templatePreview
[25]: https://app.datadoghq.com/app-builder/apps/edit?template=export-synthetics&viewMode=templatePreview
[26]: https://app.datadoghq.com/app-builder/apps/edit?template=how_to__write_custom_code&viewMode=templatePreview
[27]: /fr/actions/forms/
[28]: /fr/actions/datastores/
[29]: /fr/actions/app_builder/embedded_apps/input_parameters/