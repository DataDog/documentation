---
aliases:
- /fr/app_builder/build
disable_toc: false
further_reading:
- link: /service_management/workflows/actions_catalog/
  tag: Documentation
  text: Catalogue des actions
kind: documentation
title: Créer des applications
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Rejoignez la bêta !">}}
La solution App Builder Datadog est disponible en version bêta privée. Remplissez le formulaire pour pouvoir en bénéficier.
{{< /callout >}}

La page [App Builder][1] vous permet de modifier des applications existantes ou d'en créer de nouvelles. Cette page affiche les informations suivantes sur les applications existantes :
- L'auteur
- Le statut
- La date de dernière modification de chaque application
- Le statut de publication de l'application

Vous pouvez accéder à vos applications et les filtrer sur la page App Builder :
- Passez le curseur sur une application pour la modifier, la supprimer, la consulter ou la dupliquer.
- Activez l'option **My apps** pour afficher uniquement les applications que vous avez créées.

{{< img src="service_management/app_builder/app_builder_page.png" alt="La page App Builder" style="width:100%;" >}}

## Créer une application

### Créer une application à partir d'un blueprint

Les blueprints sont des applications de base idéales pour débuter. Ils couvrent les cas d'utilisation courants et intègrent des données de démonstration qui vous permettent de vous familiariser avec l'application.

1. Cliquez sur l'onglet [**Blueprints**][2].
1. Trouvez le blueprint que vous souhaitez utiliser, puis cliquez sur **Preview**.
1. Cliquez sur **Use Blueprint** pour ouvrir le blueprint de l'application.
1. Pour modifier le nom et la description de l'application, cliquez sur son nom.
1. Chaque modèle de blueprint est accompagné de données de démonstration. Pour personnaliser sans plus tarder l'application, modifiez le champ **Connection** de chaque requête.
1. Pour enregistrer l'application, cliquez sur **Save as New App**.
1. Pour afficher un aperçu de l'application, cliquez sur **Preview**. Cliquez ensuite sur **Edit** depuis l'écran d'aperçu pour revenir à la vue de la configuration.
1. Une fois vos changements effectués, cliquez sur **Run** pour tester l'application.
1. Lorsque vous êtes prêt à publier votre application, cliquez sur **Publish**. Votre application est alors disponible dans vos dashboards.

[1]: https://app.datadoghq.com/app-builder/

### Créer une application de base avec l'IA

{{< callout url="https://docs.google.com/forms/d/14Heybl3cLHuyxl1XpsGrEoWvc1TPA2DVLeS7S0wgIRI" btn_hidden="false" header="Participez à la bêta !">}}
Les fonctionnalités IA d'App Builder sont accessibles sur demande.
{{< /callout >}}

Si vous ne savez pas trop par où commencer, décrivez votre application à l'IA de l'App Builder, qui se chargera de créer une application de base pour vous.

1. Depuis l'écran [App Builder][1], cliquez sur **New App**.
1. Cliquez sur le bouton AI.
1. Saisissez une description complète de votre application. Précisez les intégrations, les actions ainsi que les composants d'interface utilisateur que votre application doit embarquer.
1. Cliquez sur la flèche du haut (**&#8593;**) pour créer votre application.

{{< img src="/service_management/app_builder/app-builder-ai.png" alt="Créer une application de base avec l'IA" style="width:100%;" >}}

### Créer une application personnalisée

1. Depuis l'écran [App Builder][1], cliquez sur **New App**.
1. Pour modifier le nom et la description de l'application, cliquez sur son nom.
1. Pour ajouter un [composant d'interface utilisateur](#canevas-et-composants-de-l-application) au canevas de l'application, sélectionnez le composant ou faites-le glisser vers le canevas.
1. Utilisez des [requêtes](#requetes) pour renseigner les informations du canevas ou interagir avec.
1. Pour enregistrer l'application, cliquez sur **Save as New App**.
1. Pour afficher un aperçu de l'application, cliquez sur **Preview**. Cliquez ensuite sur **Edit** depuis l'écran d'aperçu pour revenir à la vue de la configuration.
1. Une fois vos changements effectués, cliquez sur **Run** pour tester l'application.
1. Lorsque vous êtes prêt à publier votre application, cliquez sur **Publish** pour la publier ; elle apparaîtra ainsi sur vos dashboards.

## Personnaliser votre application

Les applications sont constituées de composants d'interface utilisateur et de requêtes qui interagissent entre eux pour former l'expérience utilisateur ainsi que la logique sous-jacente de chaque application. La liste des requêtes et l'éditeur associé apparaissent sur le côté gauche de la page. Le canevas de l'application et les composants de l'interface utilisateur, quant à eux, occupent le côté droit de la page.

Personnalisation de base :
- Pour modifier le paramètre **Name**, **Description** ou **Canvas Color** de votre application, cliquez sur le nom de l'application en haut à gauche.
- Cliquez sur le bouton **Preview** pour afficher un aperçu de votre application. Le mode d'aperçu vous permet de consulter l'application du point de vue de l'utilisateur. Utilisez ce mode pour interagir avec l'interface utilisateur de l'application et tester vos requêtes.  Lorsque vous avez terminé, cliquez sur **Edit** pour revenir à l'App Builder.
- Pour enregistrer votre application, cliquez sur **Save**.
- Lorsque vous êtes prêt à publier votre application, cliquez sur **Publish** pour la publier ; elle apparaîtra ainsi sur vos dashboards.

### Canevas et composants de l'application

Le canevas de l'application représente l'interface graphique avec laquelle vos utilisateurs interagissent. Le simple fait de sélectionner un composant l'ajoute au canevas. Si vous le souhaitez, vous pouvez également ajouter des composants ou les déplacer sur le canevas en les faisant glisser et en les déposant à l'endroit souhaité. Pour consulter tous les composants disponibles, cliquez sur **All Components**.

Chaque composant comprend une liste d'options de configuration correspondantes qui déterminent la façon dont les utilisateurs interagissent avec votre application. Par exemple, le composant **Text Input** vous permet de définir une valeur par défaut, du texte fictif et une étiquette. Le composant **Button** comprend une étiquette et un événement qui se déclenche lorsque l'utilisateur appuie sur le bouton. Les composants incluent également une section **Appearance** qui permet de modifier le rendu ainsi que le comportement des composants. Vous pouvez par exemple désactiver un bouton ou contrôler sa visibilité.

Pour supprimer ou dupliquer un composant, sélectionnez-le, puis cliquez sur les trois points de suspension (*...*) pour afficher les options **Delete** et **Duplicate**.

Composants d'interface utilisateur disponibles :
- Bouton
- Valeur de la légende
- Case à cocher
- Conteneur
- Outil de sélection de la plage de dates
- Entrée JSON
- Fenêtre modale
- Entrée de numéros
- Case d'option
- Rechercher
- Sélection
- Tableau
- Texte
- Champ de texte

#### Aide

Les composants d'interface utilisateur peuvent déclencher des réactions à la suite d'un **Event**. Les déclencheurs d'événements diffèrent d'un composant à l'autre. Par exemple, un composant de bouton peut déclencher une réaction après un événement de clic, et l'événement associé à un composant de tableau peut se déclencher après un changement de page ou un clic sur une ligne de tableau.

Un événement peut définir l'état d'un composant d'interface utilisateur, ouvrir ou fermer une fenêtre modale, déclencher une autre requête, voire exécuter un code JavaScript personnalisé.

Par exemple, le blueprint [Outil de synthèse de PR GitHub][4] utilise un bouton **Summarize** avec un événement qui se déclenche après un clic. L'événement utilise la réaction **Trigger Query**, qui exécute la requête `summarizePulls`.

#### Valeurs de tableau dynamiques

Tout comme la [transformation post-requête](#transformation-post-requete), le composant d'interface utilisateur de tableau vous permet de personnaliser la source de données du tableau. Vous pouvez utiliser le champ **Data Source** pour remplir les valeurs du tableau de façon dynamique et limiter les objets intégrés au tableau en tant que colonnes.

Par exemple, le blueprint [Outil de synthèse de PR GitHub][4] utilise une série de requêtes GitHub pour synthétiser une liste de requêtes pull dans un référentiel. La requête se sert de l'entrée de source de données ci-dessous pour limiter le tableau à 6 colonnes  `title`,`Summary`,`updated_at`,`user`,`html_url`, et `state`. Le code mis en surbrillance permet de remplir la colonne utilisateur de chaque requête pull avec l'avatar de l'auteur et le nom d'utilisateur GitHub.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

Dans le tableau, la colonne **User** est préremplie avec un avatar et le nom d'utilisateur GitHub pour chaque auteur de PR.

### Requêtes

Les requêtes vous permettent d'alimenter votre application en données issues des API Datadog ou d'une intégration prise en charge. Elles reçoivent les entrées d'autres requêtes ou de composants d'interface utilisateur, et renvoient des sorties qui seront utilisées à leur tour dans d'autres requêtes ou composants d'interface utilisateur. 

Pour ajouter une requête, cliquez sur l'icône plus (**+**) dans la section **Queries**, puis recherchez une requête à ajouter à votre application. Une fois la requête ajoutée, elle apparaît dans la liste des requêtes au-dessus de l'éditeur de requêtes. Cliquez sur des requêtes et faites glisser votre curseur pour les réorganiser. Sélectionnez une requête pour la configurer.

Les requêtes dépendent de [connexions][5] pour l'authentification. L'App Builder partage des connexions avec la solution [Workflow Automation][6].

#### Paramètres d'exécution

Les **Run Settings** (paramètres d'exécution) déterminent à quel moment une requête est exécutée. Deux options sont disponibles :

- **Auto** : la requête est exécutée lorsque l'application se charge, et en cas de modification des arguments d'une requête, quelle qu'elle soit.
- **Manual** : la requête est exécutée lorsqu'une autre partie de l'application la déclenche. Utilisez par exemple un déclencheur manuel si vous souhaitez qu'une requête s'exécute uniquement lorsqu'un utilisateur clique sur un composant de bouton d'interface utilisateur. Pour en savoir plus sur les déclencheurs d'événements, consultez la section [Événements](#evenements).

#### Antirebond

Configurer l'antirebond permet de s'assurer qu'une requête ne se déclenche qu'une seule fois par saisie utilisateur. L'antirebond prend la valeur par défaut `0` milliseconde (ms). Pour éviter qu'une requête ne soit appelée trop régulièrement, choisissez une valeur plus élevée pour l'antirebond. Configurez celui-ci dans la section **Advanced** d'une requête.

#### Requêtes conditionnelles

Vous pouvez définir une condition qui, si elle est remplie, entraîne l'exécution d'une requête. Pour définir une requête, saisissez une expression dans le champ **Condition** de la section **Advanced** de la requête. La condition doit renvoyer la valeur true pour que la requête soit exécutée. À titre d'exemple, si vous souhaitez qu'une requête donnée soit exécutée uniquement si un composant d'interface utilisateur intitulé `select0` existe et s'il est vide, utilisez l'expression suivante :

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

#### Transformation post-requête

Effectuez une transformation post-requête pour simplifier, voire transformer la sortie d'une requête. Ajoutez une transformation post-requête dans la section **Advanced** d'une requête.

Par exemple, l'action Slack _List Channels_ renvoie un tableau de dictionnaires contenant l'identifiant et le nom de chaque canal. Pour supprimer les identifiants et renvoyer uniquement un tableau de noms,, ajoutez la transformation de requête suivante :

{{< code-block lang="js" collapsible="false" >}}
// Utiliser `outputs` pour faire référence à la sortie non formatée de la requête.
// À FAIRE : appliquer les transformations à la sortie de la requête brute
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

#### Hooks post-requête

À l'instar des événements des composants d'interface utilisateur, vous pouvez configurer une réaction qui se déclenche après l'exécution d'une requête. Un **hook post-requête** peut définir l'état d'un composant d'interface utilisateur, voire exécuter du code JavaScript personnalisé. Par exemple, la requête `scaleService` du blueprint [Gestionnaire de tâches ECS][7] utilise un hook post-requête pour renvoyer la requête `describeService` après son exécution.

#### Notifications d'erreur

Pour présenter à l'utilisateur un toast (c'est-à-dire une notification de message concis) lorsque le système renvoie une erreur, activez l'option **Show Toast on Errors** dans la section **Advanced** d'une requête.

#### Invites de confirmation

Pour demander la confirmation d'un utilisateur avant l'exécution de la requête, activez l'option **Requires Confirmation** dans la section **Advanced** d'une requête.

### Enregistrement d'étapes

Utilisez les variables d'application pour transmettre des données d'une partie de votre application à une autre. Vous pouvez également les utiliser pour transmettre des données issues de votre dashboard à l'aide des [template variables de dashboard][3].

Les variables sont indiquées entre accolades, précédées par un signe de dollar (`${}`). Pour utiliser une variable, saisissez le nom de la requête ou du composant d'interface utilisateur et accédez aux champs enfant à l'aide de la notation décimale à point. Par exemple, si vous possédez un composant de sélection intitulé `select0` et souhaitez accéder à son champ de valeur par défaut, utilisez la syntaxe `${select0.defaultValue}`. Si vous ne savez pas quelle variable saisir, saisissez `${` pour ouvrir un menu de suggestions contenant toutes les variables disponibles.

{{< img src="service_management/app_builder/app-builder-variable.mp4" alt="Si vous ne savez pas quelle variable saisir, saisissez `${` pour ouvrir un menu de suggestions contenant toutes les variables disponibles" video=true >}}

### Personnaliser une application avec JSON

Pour modifier une application avec JSON, cliquez sur l'icône en forme d'engrenage (paramètres) et sélectionnez **Switch to JSON**. L'option *Switch to GUI** du menu des paramètres vous redirige vers l'éditeur visuel.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/app-builder/apps/
[2]: https://app.datadoghq.com/app-builder/blueprints
[3]: /fr/service_management/app_builder/embedded_apps
[4]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[5]: /fr/service_management/workflows/connections
[6]: /fr/service_management/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager