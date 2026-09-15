---
algolia:
  tags:
  - workflow variables
  - variables
  - mutable
aliases:
- /fr/service_management/workflows/actions/set_variables/
- /fr/service_management/workflows/variables
description: Utilisez des variables de contexte, des paramètres d'entrée, des paramètres
  de sortie et des variables personnalisées pour transmettre des données entre les
  étapes d'un workflow.
disable_toc: false
further_reading:
- link: /actions/workflows/actions/flow_control#for-loop
  tag: Documentation
  text: Utilisez une boucle for pour effectuer une action de manière itérative
title: 'Variables et paramètres :'
---
Les variables et paramètres suivants sont disponibles dans les workflows :
- [Variables de contexte](#context-variables) : Les variables de contexte sont une vaste catégorie de variables immuables qui stockent des informations contextuelles sur un workflow, ou contiennent des données transmises au workflow par un événement déclencheur ou par une étape du workflow.
- [Paramètres d'entrée](#input-parameters) : Les paramètres d'entrée sont des paires clé-valeur immuables que vous pouvez utiliser pour transmettre des données à un workflow lors de l'exécution.
- [Paramètres de sortie](#output-parameters) : Les paramètres de sortie vous permettent de transmettre le résultat d'un workflow à un autre workflow.
- [Variables personnalisées](#custom-variables) : Les variables personnalisées sont mutables. Elles vous permettent de déclarer, de mettre à jour et d'accéder à des variables tout au long de votre workflow.

## Variables de contexte {#context-variables}

La création de workflows utiles nécessite parfois de transmettre des données d'une étape à une autre, ou de configurer des étapes qui agissent sur les données provenant de la source de déclenchement du workflow. Vous pouvez effectuer ce type d'interpolation de données avec des variables de contexte.

- **Les variables de workflow** vous donnent des informations sur le workflow actuel :
    - `WorkflowName` : Le nom du workflow.
    - `WorkflowId` : L'ID du workflow.
    - `InstanceId` : L'ID de l'instance d'exécution du workflow.
- Certaines étapes sont dotées de **variables de sortie d'étape** intégrées qui vous permettent de transmettre des données de cette étape à une étape ultérieure de votre workflow.
- **Les variables de déclenchement** sont transmises au workflow par l'événement déclencheur.
- **Les variables d'objet source** sont transmises au workflow par l'événement déclencheur.

L'onglet {{< ui >}}Context Variables{{< /ui >}} de chaque étape fournit une carte de toutes les variables de contexte disponibles pour cette étape.

{{< img src="actions/workflows/variables/context-variables5.png" alt="L'onglet Variables de contexte :" >}}

Accédez à une variable de contexte dans une étape en l'entourant de doubles accolades (`{{`). Pour accéder aux champs au sein des variables de contexte, utilisez la [syntaxe d'expression Handlebars][4].

### Variables de sortie d'étape {#step-output-variables}

Certaines étapes créent des sorties qui sont disponibles pour les étapes ultérieures d'un workflow. Accédez à une variable d'étape avec la syntaxe : `Steps.<step_name>.<variable>`. Par exemple, pour récupérer la variable de statut de pull request (`state`) à partir de l'étape de statut de pull request GitHub (`Get_pull_request_status`), vous utiliseriez la variable de contexte suivante :

```
{{ Steps.Get_pull_request_status.state }}
```

Si vous n'êtes pas sûr de la variable que vous recherchez, Datadog suggère les sorties d'étape existantes au fur et à mesure que vous tapez. Sinon, vous pouvez consulter l'onglet {{< ui >}}Context Variables{{< /ui >}} pour obtenir une liste des variables disponibles.

{{< img src="actions/workflows/variables/step-outputs2.png" alt="Datadog suggère les sorties d'étape existantes au fur et à mesure que vous tapez." style="width:100%;" >}}

### Variables d'objet source {#source-object-variables}

Les variables d'objet source sont des propriétés de l'événement déclencheur qui sont résolues lors de l'exécution. Les variables disponibles dans le workflow dépendent du type de déclencheur qui a lancé l'instance de workflow. Par exemple, si l'instance de workflow est déclenchée par un monitor, la variable d'ID de monitor est disponible en utilisant `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}`.

Toutes les variables de l'objet Source sont visibles dans l'onglet {{< ui >}}Context Variables{{< /ui >}}.

{{< img src="actions/workflows/variables/context-variables-tab-source-object-variables2.png" alt="Les variables d'objet Source dans l'onglet Variables de contexte" style="width:60%;">}}

## Paramètres d'entrée {#input-parameters}

Les paramètres d'entrée sont des paires clé-valeur immuables que vous pouvez utiliser pour transmettre des données dans un workflow. Vous pouvez utiliser des paramètres d'entrée dans les workflows qui :
- sont déclenchés manuellement, par exemple depuis un Dashboard.
- utilisent des déclencheurs de mention, tels que les monitors et les règles de notification de signal de sécurité.

Pour ajouter un paramètre d'entrée :
1. Cliquez sur le canevas du workflow.
1. Cliquez sur l'icône {{< ui >}}\+{{< /ui >}} à côté de {{< ui >}}Input Parameters{{< /ui >}}.
1. Ajoutez un nom de paramètre, un type de données et une description pour le paramètre. Le nom d'affichage est généré automatiquement à partir du nom du paramètre. Cochez la case {{< ui >}}Use custom display name{{< /ui >}} pour le personnaliser. Le nom d'affichage est un nom lisible par l'humain pour le paramètre, tandis que le nom du paramètre est utilisé pour référencer le paramètre dans vos étapes de workflow.
1. Optionnellement, ajoutez une valeur par défaut pour le paramètre. Si vous ajoutez une valeur par défaut, le paramètre est facultatif lors de l'exécution.

Pour référencer le paramètre d'entrée dans une étape, utilisez la syntaxe `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `user`, use `{{Trigger.user}}`.

La section {{< ui >}}Input Parameters{{< /ui >}} affiche les noms de tous les paramètres d'entrée existants ainsi qu'un compteur. Survolez un compteur pour voir quelles étapes utilisent le paramètre.

{{< img src="actions/workflows/variables/input-parameter3.png" alt="Survolez un compteur pour voir quelles étapes utilisent le paramètre." style="width:60%;">}}

Vous pouvez ajouter un paramètre d'entrée implicite (un paramètre qui n'existe pas encore dans le workflow) en le saisissant dans une étape de workflow en utilisant la syntaxe `{{ Trigger.<parameter name> }}`. La prochaine fois que vous enregistrez le workflow, une boîte de dialogue apparaît vous permettant de convertir le paramètre en un paramètre explicite. Pour plus d'informations sur le déclenchement de workflows, consultez [Déclencher un workflow][5].

Si vous recherchez un paramètre d'entrée existant, commencez à taper `{{ Trigger.` pour voir s'il apparaît en tant que suggestion. Sinon, consultez l'onglet {{< ui >}}Context Variables{{< /ui >}} pour une liste des paramètres disponibles.

## Paramètres de sortie {#output-parameters}

Les paramètres de sortie vous permettent d'accéder au résultat d'un workflow. Ceci est utile lorsque vous souhaitez transmettre le résultat d'un workflow à un autre workflow ou à une application App Builder.

Pour ajouter un paramètre de sortie :
1. Cliquez sur le canevas du workflow.
1. Cliquez sur l'icône {{< ui >}}\+{{< /ui >}} à côté de {{< ui >}}Output Parameters{{< /ui >}}.
1. Ajoutez un nom de paramètre, une valeur et un type de données pour le paramètre.
1. Optionnellement, ajoutez une valeur par défaut pour le paramètre. Si vous ajoutez une valeur par défaut, le paramètre est facultatif lors de l'exécution.

La section {{< ui >}}Output Parameters{{< /ui >}} affiche les noms de tous les paramètres de sortie existants ainsi qu'un compteur.

Pour plus d'informations sur le transfert de données entre des workflows, consultez [Accéder au résultat d'un workflow enfant][7].

Pour un exemple d'utilisation des paramètres de sortie pour transférer des informations entre Workflows et App Builder, consultez [renvoyer les résultats d'un workflow à une application App Builder][6].

## Variables personnalisées {#custom-variables}

Pour définir une variable de workflow mutable, utilisez l'action [Définir une variable][1]. Vous pouvez utiliser cette action pour déclarer, mettre à jour et accéder à des variables personnalisées tout au long de votre workflow, ce qui vous permet d'effectuer des opérations de workflow plus complexes. Exemple :
- _Gestion de la pagination d'API_ : les requêtes API nécessitent parfois que vous gardiez une trace d'un jeton de page ou d'un décalage.
- _Gestion des listes_ : vous pouvez utiliser une variable pour initialiser un tableau et effectuer des actions telles que map et reduce.
- _Itération_ : Les variables vous permettent de manipuler et de stocker des données à l'intérieur d'une [boucle for][2]. Vous pouvez ensuite utiliser ces données dans le reste du workflow.

### Définir une variable personnalisée {#set-a-custom-variable}

Pour définir une variable personnalisée :
1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape {{< ui >}}Set variable{{< /ui >}}.
1. Cliquez sur l'étape {{< ui >}}Set variable{{< /ui >}} et saisissez un {{< ui >}}Step name{{< /ui >}}.
1. Saisissez un {{< ui >}}variable name{{< /ui >}}. Les noms de variables doivent commencer par une lettre et ne peuvent contenir que des caractères alphanumériques et des traits de soulignement.
1. Saisissez une valeur pour la variable.
   - Tapez « ``{{`` si vous souhaitez utiliser une variable de contexte de workflow.
   - Pour créer un objet, cliquez sur le bouton {{< ui >}}Create object{{< /ui >}} <i class="icon-api"></i>.
   - Pour créer un tableau, cliquez sur le bouton {{< ui >}}Create array{{< /ui >}} <span id="icon-array">[ ]</span>.

Si vous devez modifier la valeur d'une variable personnalisée après l'avoir définie, vous devez ajouter une étape {{< ui >}}Set variable{{< /ui >}} supplémentaire et soit réassigner la variable, soit créer une nouvelle variable.

Voici un exemple de workflow qui illustre l'étape {{< ui >}}Set variable{{< /ui >}} :

1. Dans votre workflow, commencez par une étape {{< ui >}}Set variable{{< /ui >}} pour déclarer une variable appelée `intList` et lui donner la valeur `[1,2,3,4]`.
1. Ajoutez une deuxième étape {{< ui >}}Set variable{{< /ui >}} et déclarez une variable nommée `evenList` avec la valeur `${Variables.intList.filter(number => number % 2 === 0)}`. Il s'agit d'une [expression JavaScript en ligne][8] qui filtre les nombres impairs.
1. Ajoutez une étape {{< ui >}}Echo{{< /ui >}} pour renvoyer la valeur de `evenList` (`2,4`).

{{< img src="actions/workflows/variables/set-variable-updated.png" alt="Ce workflow définit une variable pour contenir une liste de nombres, déclare une seconde variable qui filtre les nombres impairs de la liste à l'aide d'une expression en ligne, et affiche la valeur de la seconde variable." style="width:100%;" >}}

### Accéder à une variable personnalisée {#access-a-custom-variable}

Vous pouvez accéder à une variable personnalisée dans votre workflow en utilisant `{{ Variables.variableName }}`. For example, to access a custom variable named `DashboardList`, use `{{ Variables.DashboardList }}`.

### Itération {#iteration}

Définir une variable personnalisée à l'intérieur d'un {{< ui >}}For loop{{< /ui >}} ou d'un {{< ui >}}While loop{{< /ui >}} vous permet de stocker des données pour une utilisation en dehors de la boucle. Par exemple, si vous effectuez plusieurs requêtes API à l'intérieur d'un {{< ui >}}For loop{{< /ui >}}, vous pouvez définir une variable personnalisée et y ajouter les données dont vous avez besoin à chaque itération. En dehors de la boucle, vous pouvez accéder à la variable personnalisée et traiter les données que vous avez collectées.

Pour éviter une erreur de type résultant d'une variable non définie, définissez une variable personnalisée avant de l'utiliser dans une boucle. Dans l'exemple ci-dessous, la variable personnalisée `evenList` est définie sur un tableau vide avant d'être utilisée dans la boucle.

{{< img src="actions/workflows/variables/loop.png" alt="Ce workflow définit une variable avant qu'elle ne soit utilisée dans une boucle." style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /fr/actions/workflows/actions/flow_control#for-loop
[3]: https://chat.datadoghq.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /fr/actions/workflows/trigger
[6]: /fr/actions/app_builder/queries/#return-workflow-results-to-an-app
[7]: /fr/actions/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /fr/actions/workflows/expressions/#inline-javascript-expressions