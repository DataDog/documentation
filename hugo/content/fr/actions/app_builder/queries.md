---
aliases:
- /fr/app_builder/queries
- /fr/service_management/app_builder/queries
description: Remplissez les applications avec des données provenant des API et des
  intégrations Datadog à l'aide de requêtes qui connectent les composants de l'interface
  utilisateur aux actions backend.
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
title: Requêtes
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Les requêtes sont des actions qui remplissent votre application avec des données provenant des API Datadog ou des intégrations prises en charge. Elles prennent des entrées provenant d'autres requêtes ou de composants de l'interface utilisateur et renvoient des sorties destinées à être utilisées dans d'autres requêtes ou dans des composants de l'interface utilisateur.

Le [Action Catalog][10] au sein de l'application Datadog fournit des actions qui peuvent être effectuées en tant que requêtes sur votre infrastructure et vos intégrations à l'aide d'App Builder. Vous pouvez orchestrer et automatiser vos processus de bout en bout en reliant des actions qui effectuent des tâches dans vos fournisseurs cloud, vos outils SaaS et vos comptes Datadog.

Pour ajouter une requête, cliquez sur l'icône Data ({{< ui >}}{&nbsp;}{{< /ui >}}) pour ouvrir l'onglet Data. Cliquez sur plus ({{< ui >}}\+{{< /ui >}}), sélectionnez {{< ui >}}Actions{{< /ui >}} et recherchez « query » pour ajouter une action à votre application. Une fois l'action de requête ajoutée, elle apparaît dans la {{< ui >}}Actions{{< /ui >}} liste. Sélectionnez une requête pour la configurer.

Vous pouvez également utiliser Bits AI pour ajouter, configurer et déclencher des requêtes. Cliquez sur l'icône {{< ui >}}Build with AI{{< /ui >}} (**<i class="icon-bits-ai"></i>**) pour commencer. 

Les requêtes s'appuient sur des [Connections][5] pour l'authentification. App Builder partage les connexions avec [Workflow Automation][6].

## Paramètres d'exécution {#run-settings}

{{< ui >}}Run Settings{{< /ui >}} déterminent quand une requête est exécutée. Il existe deux options :

- {{< ui >}}Auto{{< /ui >}} : La requête s'exécute au chargement de l'application et chaque fois que les arguments de la requête changent.
- {{< ui >}}Manual{{< /ui >}} : La requête s'exécute lorsqu'une autre partie de l'application la déclenche. Par exemple, utilisez un déclencheur manuel si vous souhaitez qu'une requête ne s'exécute que lorsqu'un utilisateur clique sur un composant de bouton de l'interface utilisateur. Pour plus d'informations sur les déclencheurs d'événements, consultez [Events][11].

## Options de requête avancées {#advanced-query-options}

### Débruitage {#debounce}

La configuration du débruitage garantit que votre requête n'est déclenchée qu'une seule fois par saisie utilisateur. Par défaut, le débruitage est réglé sur `0` millisecondes (ms). Pour éviter qu'une requête ne soit appelée trop fréquemment, augmentez le débruitage. Configurez le débruitage dans la section {{< ui >}}Advanced{{< /ui >}} d'une requête.

### Requêtes conditionnelles {#conditional-queries}

Vous pouvez définir une condition qui doit être remplie avant qu'une requête puisse s'exécuter. Pour définir la condition d'une requête, saisissez une expression dans le champ {{< ui >}}Condition{{< /ui >}} de la section {{< ui >}}Advanced{{< /ui >}} de la requête. Cette condition doit être évaluée comme vraie avant que la requête puisse s'exécuter. Par exemple, si vous souhaitez qu'une requête donnée ne s'exécute que si un composant d'interface utilisateur nommé `select0` existe et n'est pas vide, utilisez l'expression suivante :

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### Transformation post-requête {#post-query-transformation}

Effectuez une transformation post-requête pour simplifier ou transformer le résultat d'une requête. Ajoutez une transformation post-requête dans la section {{< ui >}}Advanced{{< /ui >}} d'une requête.

Par exemple, l'action Slack _List Channels_ renvoie un tableau de dictionnaires contenant l'ID et le nom de chaque canal. Pour ignorer les ID et ne renvoyer qu'un tableau de noms, ajoutez la transformation de requête suivante :

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

### Hooks post-requête {#post-query-hooks}

Similairement aux événements de composants d'interface utilisateur, vous pouvez configurer une réaction à déclencher après l'exécution d'une requête. Un hook post-requête peut définir l'état d'un composant d'interface utilisateur, ouvrir ou fermer une fenêtre modale, déclencher une autre requête ou même exécuter du JavaScript personnalisé. Par exemple, la requête `scaleService` du blueprint [ECS Task Balancer][7] utilise un hook post-requête pour réexécuter la requête `describeService` après son exécution.

Vous pouvez utiliser des [fonctions d'état][12] dans les hooks post-requête.

### Notifications d'erreur {#error-notifications}

Pour afficher un toast (un bref message de notification) à l'utilisateur lorsque le système renvoie une erreur, activez {{< ui >}}Show Toast on Errors{{< /ui >}} dans la section {{< ui >}}Advanced{{< /ui >}} d'une requête.

### Invites de confirmation {#confirmation-prompts}

Pour demander une confirmation à l'utilisateur avant l'exécution de la requête, activez l'option {{< ui >}}Requires Confirmation{{< /ui >}} dans la section {{< ui >}}Advanced{{< /ui >}} d'une requête.

### Intervalles d'interrogation {#polling-intervals}

Pour exécuter une requête de manière répétée à un intervalle défini pendant que l'application est ouverte sur l'écran d'un utilisateur, saisissez l'intervalle en millisecondes (ms) comme {{< ui >}}Polling interval{{< /ui >}} dans la section {{< ui >}}Advanced{{< /ui >}} d'une requête.

**Remarque** : La requête ne s'exécute pas en arrière-plan ; elle ne s'exécute que lorsque quelqu'un a l'application ouverte.

## Sorties simulées {#mocked-outputs}

Parfois, lorsque vous créez ou testez une application dans l'éditeur, vous pouvez souhaiter éviter d'exécuter une requête réelle ou éviter d'exécuter la même requête de manière répétée. Lorsque vous activez {{< ui >}}Mocked outputs{{< /ui >}} et exécutez votre requête, App Builder remplit les sorties avec des données simulées au lieu d'exécuter l'action de requête.

Vous pouvez générer des sorties simulées à partir d'une exécution de requête précédente ou les fournir manuellement.

### Générer des sorties à partir d'une exécution précédente {#generate-outputs-from-previous-run}

Pour générer des données de sortie simulées à partir d'une exécution de requête précédente, effectuez les étapes suivantes :

1. Ajoutez une requête et remplissez le reste des paramètres de votre requête.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour exécuter votre requête une fois.
1. Dans la section {{< ui >}}Mocked outputs{{< /ui >}} de la requête, cliquez sur l'onglet {{< ui >}}Generate{{< /ui >}}.
1. Cliquez sur {{< ui >}}Generate from outputs{{< /ui >}}. Cela active automatiquement {{< ui >}}Use Mocked Outputs{{< /ui >}}.<br>
    Le bouton {{< ui >}}Run{{< /ui >}} change pour afficher {{< ui >}}Run (Mocked){{< /ui >}}, et la prochaine fois que vous exécuterez votre requête, la sortie sera remplie avec les données simulées.

### Fournissez les sorties manuellement {#provide-outputs-manually}

Pour fournir des sorties simulées manuellement, effectuez les étapes suivantes :

{{% collapse-content title="Utilisation de l'interface graphique" level="p" %}}
1. Ajoutez une requête et remplissez le reste des paramètres de votre requête.
1. Dans la section {{< ui >}}Mocked outputs{{< /ui >}} de la requête, cliquez sur l'onglet {{< ui >}}GUI{{< /ui >}}.
1. Remplissez tous les champs obligatoires, que la vue de l'interface graphique affiche automatiquement.
1. Optionnellement, pour ajouter des champs supplémentaires, cliquez sur ({{< ui >}}\+{{< /ui >}}). Choisissez une clé dans la liste déroulante et remplissez une valeur. Si vous souhaitez saisir une valeur qui est un objet ou un tableau, cliquez sur {{< ui >}}{}{{< /ui >}} ou {{< ui >}}[]{{< /ui >}}, respectivement, après le champ {{< ui >}}Enter value{{< /ui >}}.
{{% /collapse-content %}}

{{% collapse-content title="Utilisation de JSON" level="p" %}}
1. Ajoutez une requête et remplissez le reste des paramètres de votre requête.
1. Dans la section {{< ui >}}Mocked outputs{{< /ui >}} de la requête, cliquez sur l'onglet {{< ui >}}JSON{{< /ui >}}.
1. Collez le JSON qui correspond au format de sortie attendu de la requête.<br>
    Si vous ne connaissez pas le format de sortie attendu, vous pouvez exécuter la requête une fois, puis consulter `outputs` dans la section {{< ui >}}Inspect Data{{< /ui >}} de la requête.
{{% /collapse-content %}}


## Ordre des opérations {#order-of-operations}

Lors de l'exécution d'une requête, App Builder effectue les étapes suivantes dans l'ordre indiqué :

1. Vérifie s'il existe une expression {{< ui >}}Condition{{< /ui >}} pour la requête et, le cas échéant, vérifie que la condition est remplie. Si ce n'est pas le cas, l'exécution s'arrête.
2. Évalue toutes les expressions dans {{< ui >}}Inputs{{< /ui >}} pour déterminer les données d'entrée de la requête.
3. Si la propriété {{< ui >}}Debounce{{< /ui >}} est définie, retarde l'exécution de l'intervalle défini par la valeur de débruitage. Si les entrées de la requête ou leurs dépendances sont mises à jour pendant ce laps de temps, l'exécution de la requête en cours est arrêtée et une nouvelle commence depuis le début en utilisant les entrées mises à jour.<br>
   **Remarque** : Si plusieurs demandes de requête surviennent dans l'intervalle de débruitage, toutes les demandes sauf la dernière demande d'exécution sont annulées.
4. Exécute la requête.
5. Stocke la réponse brute de la requête dans `query.rawOutputs`.
6. Exécute toute transformation post-requête et définit `query.outputs` comme étant égal au résultat. Ce processus prend un instantané des données de l'application et le transmet à la transformation post-requête.<br>
   **Remarque** : Les transformations post-requête doivent être des fonctions pures sans effets secondaires. Par exemple, ne mettez pas à jour une variable d'état dans votre transformation post-requête.
7. Calcule toutes les expressions de l'application qui dépendent des données issues du résultat de la requête.
8. Exécute toutes les {{< ui >}}Reactions{{< /ui >}} depuis le {{< ui >}}Events{{< /ui >}} de l'application, dans l'ordre dans lequel elles sont définies dans l'interface utilisateur. Cela implique de prendre un instantané de l'application qui est utilisé tout au long de l'exécution de la réaction. Un nouvel instantané est pris avant l'exécution de chaque réaction, et les modifications apportées par une réaction précédente sont visibles par une réaction ultérieure.
9. Si un {{< ui >}}Polling interval{{< /ui >}} est défini, planifie la réexécution de la requête dans le nombre de millisecondes défini.


## Exemples d'applications {#example-apps}

### Renvoyer les résultats du workflow à une application {#return-workflow-results-to-an-app}
Les requêtes d'App Builder peuvent déclencher des workflows de Workflow Automation. Les applications peuvent ensuite utiliser les résultats de ces workflows.

Cette application fournit un bouton pour déclencher un workflow. Le workflow envoie un sondage sur un canal Slack demandant à l'utilisateur de choisir parmi deux options. En fonction de l'option choisie par l'utilisateur, le workflow émet l'une des deux requêtes HTTP GET différentes, qui renvoie ensuite des données affichées dans l'application.

{{< img src="actions/app_builder/workflow-trigger-from-app.mp4" alt="Cliquer sur Trigger Workflow interroge Slack puis renvoie un fait aléatoire sur les chats ou les chiens" video="true" width="70%">}}

{{% collapse-content title="Créer l'application" level="h4" %}}

##### Créer un workflow {#create-workflow}

1. Dans un nouveau canevas de workflow, sous {{< ui >}}Datadog Triggers{{< /ui >}}, cliquez sur {{< ui >}}App{{< /ui >}}.
1. Sous l'étape de déclenchement {{< ui >}}App{{< /ui >}}, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}), puis recherchez « Make a decision » et sélectionnez l'action Slack {{< ui >}}Make a decision{{< /ui >}}.
1. Sélectionnez votre espace de travail et choisissez un canal à interroger.
1. Remplissez le texte de l'invite « Cat fact or dog fact? » et modifiez les choix des boutons en « Cat fact » et « Dog fact ».
1. Sous l'étape {{< ui >}}Make a decision{{< /ui >}} dans le canevas, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) au-dessus de {{< ui >}}Cat fact{{< /ui >}} et ajoutez l'action HTTP {{< ui >}}Make request{{< /ui >}}.
1. Nommez l'étape « Get cat fact ». Sous {{< ui >}}Inputs{{< /ui >}}, pour {{< ui >}}URL{{< /ui >}}, gardez {{< ui >}}GET{{< /ui >}} sélectionné et entrez l'URL `https://catfact.ninja/fact`.
1. Sous l'étape {{< ui >}}Make a decision{{< /ui >}} dans le canevas, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) au-dessus de {{< ui >}}Dog fact{{< /ui >}}. Suivez les mêmes étapes pour ajouter l'action HTTP {{< ui >}}Make request{{< /ui >}}, mais cette fois nommez l'étape « Get dog fact » et utilisez les paramètres suivants :
    * {{< ui >}}URL{{< /ui >}} : `https://dogapi.dog/api/v2/facts`.
    * {{< ui >}}Request Headers{{< /ui >}} : `Content-Type` de `application/json`
1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sous l'étape du fait sur les chats. Recherchez « Function » et choisissez l'étape de transformation de données {{< ui >}}Function{{< /ui >}}.
1. Connectez l'icône plus ({{< ui >}}\+{{< /ui >}}) sous l'étape du fait sur les chiens à cette étape {{< ui >}}JS Function{{< /ui >}} en cliquant et en faisant glisser depuis le plus vers le point qui apparaît au-dessus de l'étape JS Function.
1. Dans la JS Function, sous {{< ui >}}Configure{{< /ui >}}, pour {{< ui >}}Script{{< /ui >}}, utilisez l'extrait de code suivant :
    ```javascript
    const catFact = $.Steps.Get_cat_fact?.body?.fact;
    const dogFactRaw = $.Steps.Get_dog_fact?.body;

    let dogFact;

    try {
        const parsedDogFact = JSON.parse(dogFactRaw);
        dogFact = parsedDogFact.data?.[0]?.attributes?.body;
    } catch {
        // Do nothing
    }

    return catFact != null ? catFact : dogFact;
    ```
1. Dans la vue d'ensemble du workflow, sous {{< ui >}}Output Parameters{{< /ui >}}, ajoutez un paramètre nommé `output` avec la valeur `{{ Steps.Function.data }}` and the Data Type `string`.
1. Nommez votre workflow « My AB Workflow », puis enregistrez et publiez le workflow.

##### Créez l'application {#create-app}

Pour connecter App Builder au workflow, effectuez les étapes suivantes :

1. Dans votre application, cliquez sur l'icône Données ({{< ui >}}{&nbsp;}{{< /ui >}}), cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}), puis sélectionnez {{< ui >}}Query{{< /ui >}}.
1. Recherchez « Trigger Workflow » et sélectionnez l'élément {{< ui >}}Trigger Workflow{{< /ui >}} Datadog Workflow Automation.
1. Réglez {{< ui >}}Run Settings{{< /ui >}} sur Manuel et nommez la requête `triggerWorkflow0`.
1. Sous {{< ui >}}Inputs{{< /ui >}}, pour {{< ui >}}App Workflow{{< /ui >}}, sélectionnez {{< ui >}}My AB Workflow{{< /ui >}}.
1. Cliquez sur {{< ui >}}Run{{< /ui >}} pour exécuter le workflow, puis accédez à votre canal Slack et répondez à la question du sondage. Cela fournit à App Builder des exemples de données à afficher.
1. Ajoutez un composant texte. Sous {{< ui >}}Content{{< /ui >}}, saisissez l'expression `${triggerWorkflow0?.outputs?.workflowOutputs?.output}`.
1. Ajoutez un composant bouton. Utilisez les valeurs suivantes :
    * {{< ui >}}Label{{< /ui >}} : « Trigger Workflow »
    * {{< ui >}}Is Loading{{< /ui >}} : `${triggerWorkflow0.isLoading}` (cliquez sur {{< ui >}}</>{{< /ui >}} pour saisir une expression)
1. Sous {{< ui >}}Events{{< /ui >}} du bouton, cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}) pour ajouter un événement. Utilisez les valeurs suivantes :
    * {{< ui >}}Event{{< /ui >}} : click
    * {{< ui >}}Reaction{{< /ui >}} : Trigger Query
    * {{< ui >}}Query{{< /ui >}} : `triggerWorkflow0`
1. Enregistrez votre application.

##### Application de test {#test-app}

1. Dans votre application, cliquez sur {{< ui >}}Preview{{< /ui >}}.
1. Cliquez sur le bouton {{< ui >}}Trigger Workflow{{< /ui >}}.
1. Dans le canal Slack que vous avez sélectionné, répondez à la question du sondage.<br>
    Votre application affiche un résultat lié à l'option que vous avez choisie.
{{% /collapse-content %}}

### Combiner et transformer les données de sortie de requête {#combine-and-transform-query-output-data}
Après avoir obtenu des données à partir d'une requête dans App Builder, vous pouvez utiliser des transformateurs de données pour combiner et transformer ces données.

Cette application fournit des boutons pour récupérer des faits sur deux nombres à partir d'une API. Elle utilise ensuite un transformateur de données pour calculer et afficher la somme des deux nombres.

{{< img src="actions/app_builder/data-transformer.mp4" alt="Un clic sur chaque bouton récupère un nouveau fait sur un nombre, et la somme des deux nombres est mise à jour en même temps que les faits" video="true" width="70%">}}

{{% collapse-content title="Créer l'application" level="h4" %}}

##### Créer des requêtes {#create-queries}

1. Dans une nouvelle application, cliquez sur l'icône Données ({{< ui >}}{&nbsp;}{{< /ui >}}) pour ouvrir l'onglet Données.
1. Cliquez sur le signe plus ({{< ui >}}\+{{< /ui >}}), puis sélectionnez {{< ui >}}Query{{< /ui >}}. Recherchez « Make request » et choisissez l'action {{< ui >}}HTTP Make request{{< /ui >}}.
1. Utilisez les valeurs suivantes :
    * {{< ui >}}Name{{< /ui >}} : `mathFact1`
    * Sous {{< ui >}}Inputs{{< /ui >}}, pour {{< ui >}}URL{{< /ui >}} : GET `http://numbersapi.com/random/trivia`
1. Cliquez sur ({{< ui >}}\+{{< /ui >}}) pour ajouter une autre requête {{< ui >}}HTTP Make request{{< /ui >}}. Utilisez les valeurs suivantes :
    * {{< ui >}}Name{{< /ui >}} : `mathFact2`
    * Sous {{< ui >}}Inputs{{< /ui >}}, pour {{< ui >}}URL{{< /ui >}} : GET `http://numbersapi.com/random/trivia`

##### Ajouter un transformateur de données {#add-data-transformer}

1. Cliquez sur {{< ui >}}Σ{{< /ui >}} (sigma) pour ouvrir le panneau {{< ui >}}Transformers{{< /ui >}}.
1. Cliquez sur {{< ui >}}\+ Create Transformer{{< /ui >}}.
1. Nommez le transformateur `numberTransformer`. Sous {{< ui >}}Inputs{{< /ui >}}, sous {{< ui >}}function () {{{< /ui >}}, saisissez ce qui suit :
    ```javascript
    // get both random facts
    const fact1 = mathFact1.outputs.body;
    const fact2 = mathFact2.outputs.body;

    // parse the facts to get the first number that appears in them
    const num1 = fact1.match(/\d+/)[0];
    const num2 = fact2.match(/\d+/)[0];

    // complete arithmetic on the numbers to find the sum
    const numSum = Number(num1) + Number(num2)

    return numSum
    ```

##### Créer des composants de canevas d'application {#create-app-canvas-components}

1. Dans le canevas d'application, ajoutez un bouton et remplissez l'étiquette « Generate fact 1 ».
1. Sous {{< ui >}}Events{{< /ui >}} du bouton, utilisez les valeurs suivantes :
    * {{< ui >}}Event{{< /ui >}} : click
    * {{< ui >}}Reaction{{< /ui >}} : Trigger Query
    * {{< ui >}}Query{{< /ui >}} : mathFact1
1. Ajoutez un autre bouton et remplissez l'étiquette « Generate fact 2 ».
1. Sous {{< ui >}}Events{{< /ui >}} du bouton, utilisez les valeurs suivantes :
    * {{< ui >}}Event{{< /ui >}} : click
    * {{< ui >}}Reaction{{< /ui >}} : Trigger Query
    * {{< ui >}}Query{{< /ui >}} : mathFact2
1. Ajoutez un élément de texte sous le premier bouton. Pour sa propriété {{< ui >}}Content{{< /ui >}}, cliquez sur {{< ui >}}</>{{< /ui >}} et saisissez l'expression `${mathFact1.outputs.body}`.
1. Ajoutez un élément de texte sous le second bouton. Pour sa propriété {{< ui >}}Content{{< /ui >}}, cliquez sur {{< ui >}}</>{{< /ui >}} et saisissez l'expression `${mathFact2.outputs.body}`.
1. Ajoutez un élément de texte avec la valeur {{< ui >}}Content{{< /ui >}} « Sum of numbers ».
1. Ajoutez un élément de texte à côté de celui-ci. Pour sa propriété {{< ui >}}Content{{< /ui >}}, cliquez sur {{< ui >}}</>{{< /ui >}} et utilisez l'expression `${numberTransformer.outputs}`.


##### Testez l'application {#test-app-1}

1. Dans votre application, cliquez sur {{< ui >}}Preview{{< /ui >}}.
1. Cliquez sur {{< ui >}}Generate fact 1{{< /ui >}}, puis cliquez sur {{< ui >}}Generate fact 2{{< /ui >}}.<br>
    Votre application met à jour les faits numériques et la somme des nombres à mesure que vous cliquez sur chaque bouton.

{{% /collapse-content %}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal {{< ui >}}#app-builder{{< /ui >}} sur le [Datadog Community Slack][8].

[5]: /fr/actions/connections
[6]: /fr/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[10]: https://app.datadoghq.com/actions/action-catalog/
[11]: /fr/actions/app_builder/events
[12]: /fr/actions/app_builder/events/#state-functions