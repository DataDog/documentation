---
algolia:
  tags:
  - workflow variables
  - variables
  - mutable
aliases:
- /fr/service_management/workflows/actions/set_variables/
- /fr/service_management/workflows/variables
description: Utiliser des variables de contexte, des paramètres d'entrée, des paramètres
  de sortie et des variables personnalisées pour transmettre des données entre les
  étapes de workflow.
disable_toc: false
further_reading:
- link: /service_management/workflows/actions/flow_control#for-loop
  tag: Documentation
  text: Utiliser une boucle for pour effectuer une action de manière itérative
title: Variables et paramètres
---

Les variables et paramètres suivants sont disponibles dans les workflows :
- [Variables de contexte](#context-variables) : les variables de contexte sont une large catégorie de variables immuables qui stockent des informations contextuelles sur un workflow, ou contiennent des données qui sont transmises au workflow par un événement déclencheur.
- [Paramètres d'entrée](#input-parameters) : les paramètres d'entrée sont des paires clé-valeur immuables que vous pouvez utiliser pour transmettre des données dans un workflow au moment de l'exécution.
- [Paramètres de sortie](#output-parameters) : les paramètres de sortie vous permettent de transmettre le résultat d'un workflow à un autre workflow.
- [Variables personnalisées](#custom-variables) : les variables personnalisées sont mutables. Elles vous permettent de déclarer, mettre à jour et accéder aux variables tout au long de votre workflow.

## Variables de contexte

Pour créer des workflows utiles, il est parfois nécessaire de transmettre des données d'une étape à une autre ou de configurer des étapes qui agissent en fonction de la source de déclenchement du workflow. Vous pouvez utiliser des variables de contexte pour mettre en place ce type d'interpolations de données.

- **Workflow variables** vous donne des informations sur le workflow actuel :
    - 'WorkflowName' : le nom du workflow.
    - 'WorkflowId' : l'ID du workflow.
    - 'InstanceId' : l'ID de l'instance d'exécution du workflow.
- Certaines étapes intègrent des **variables de sortie d'étape**, qui vous permettent de transmettre les données d'une étape à une autre étape ultérieure.
- Les **variables de déclenchement** sont transmises dans le workflow par l'événement de déclenchement.
- Les **variables d'objet source** sont transmises dans le workflow par l'événement de déclenchement.

Pour chaque étape, l'onglet **Context Variables** affiche une carte des différentes variables de contexte qui peuvent être utilisées.

{{< img src="service_management/workflows/context-variables5.png" alt="L'onglet Context Variables" >}}

Accédez à une variable de contexte dans une étape en l'encadrant dans des accolades doubles (`{{`). Pour accéder aux champs dans les variables de contexte, utilisez la [syntaxe d'expression Handlebars][4].

### Variables de sortie d'étape

Certaines étapes génèrent des sorties que les étapes ultérieures peuvent ensuite utiliser. Pour accéder à une variable d'étape, utilisez la syntaxe `Steps.<nom_étape>.<variable>`. Par exemple, pour récupérer la variable de statut d'une pull request (`state`) depuis l'étape de statut d'une pull request GitHub (`Get_pull_request_status`), utilisez la variable de contexte suivante :

```
{{ Steps.Get_pull_request_status.state }}
```

Si vous ne savez pas quelle variable vous recherchez, Datadog suggère les sorties d'étapes existantes au fur et à mesure que vous tapez. Vous pouvez également consulter l'onglet [Context Variables](#context-variables) pour obtenir une liste des variables disponibles.

{{< img src="service_management/workflows/step-outputs2.png" alt="Datadog suggère les sorties d'étapes existantes au fur et à mesure que vous saisissez du texte." style="width:100%;" >}}

### Variables d'objet source

Les variables d'objet source sont des propriétés de l'événement déclencheur qui sont résolues lors de l'exécution. Les variables disponibles dans le workflow dépendent du type de déclencheur qui a initié l'instance de workflow. Par exemple, si l'instance de workflow est déclenchée par un monitor, la variable d'ID du monitor est disponible via `{{Source.monitor.id}}`. Si le workflow est déclenché par une règle de détection ou de notification de signal de sécurité, l'ID du signal est disponible via `{{Source.securitySignal.id}}`.

Toutes les variables de l'objet source sont visibles depuis l'onglet Context Variables.

{{< img src="service_management/workflows/context-variables-tab-source-object-variables2.png" alt="Les variables de l'objet Source dans l'onglet Context Variables" style="width:60%;" >}}

## Paramètres d'entrée

Les paramètres d'entrée sont des paires clé-valeur immuables que vous pouvez utiliser pour transmettre des données dans un workflow. Vous pouvez utiliser des paramètres d'entrée dans les workflows qui :
- les workflows déclenchés manuellement, par exemple à partir d'un dashboard
- les workflows déclenchés via une mention, par exemple dans un monitor ou dans les règles de notification des signaux de sécurité

Pour ajouter un paramètre d'entrée :
1. Cliquez sur la fenêtre d'édition du workflow.
1. Cliquez sur l'icône **+** à proximité de **Input Parameters**.
1. Indiquez le nom du paramètre, le type de données et une description. Le nom d'affichage est automatiquement généré à partir du nom du paramètre. Cochez la case **Use custom display name** pour le personnaliser. Le nom d'affichage doit être lisible par un humain, tandis que le nom du paramètre est utilisé pour faire référence au paramètre dans vos étapes de workflow.
1. Si vous le souhaitez, attribuez une valeur par défaut au paramètre. Si vous ajoutez une valeur par défaut, le paramètre est alors facultatif lors de l'exécution.

Pour faire référence au paramètre d'entrée dans une étape, utilisez la syntaxe `{{ Trigger.<nom du paramètre>}}`. Par exemple, pour faire référence à un paramètre d'entrée nommé `user`, utilisez `{{Trigger.user}}`.

La section **Input Parameters** affiche les noms de tous les paramètres d'entrée existants avec leur nombre d'utilisations. Passez votre souris sur un nombre pour voir les étapes qui utilisent le paramètre.

{{< img src="service_management/workflows/input-parameter3.png" alt="Passez la souris sur un compteur pour voir quelles étapes utilisent le paramètre." style="width:60%;" >}}

Vous pouvez ajouter un paramètre d'entrée implicite (c'est-à-dire qui n'existe pas déjà dans le workflow) en le saisissant dans une étape de workflow à l'aide la syntaxe `{{ Trigger.<parameter name> }}`. Lorsque vous enregistrerez le workflow, une fenêtre apparaîtra pour vous inviter à convertir le paramètre en paramètre explicite. Pour en savoir plus sur le déclenchement de workflows, consultez la section [Déclencher un workflow][5].

Si vous recherchez le nom d'un paramètre d'entrée existant, commencez à saisir `{{ Trigger.` pour voir s'il apparaît dans les suggestions. Vous pouvez également consulter l'onglet [Context Variables](#context-variables) pour obtenir la liste des paramètres disponibles.

## Paramètres de sortie

Les paramètres de sortie vous permettent d'accéder au résultat d'un workflow. Ceci est utile lorsque vous souhaitez transmettre le résultat d'un workflow à un autre workflow ou à une application App Builder.

Pour ajouter un paramètre de sortie :
1. Cliquez sur la fenêtre d'édition du workflow.
1. Cliquez sur l'icône **+** à côté de **Output Parameters**.
1. Ajoutez un nom de paramètre, une valeur et un type de données pour le paramètre.
1. Si vous le souhaitez, attribuez une valeur par défaut au paramètre. Si vous ajoutez une valeur par défaut, le paramètre est alors facultatif lors de l'exécution.

La section **Output Parameters** affiche les noms de tous les paramètres de sortie existants ainsi qu'un compteur.

Pour obtenir des informations sur la transmission de données entre workflows, consultez la section [Accéder au résultat d'un workflow enfant][7].

Pour obtenir un exemple de la façon d'utiliser des paramètres de sortie pour transmettre des informations entre Workflows et App Builder, consultez la section [retourner les résultats de workflow à une application][6].

## Variables personnalisées

Pour définir une variable de workflow mutable, utilisez l'action [Set variable][1]. Vous pouvez utiliser cette action pour déclarer, mettre à jour et accéder aux variables personnalisées tout au long de votre workflow, ce qui vous permet d'effectuer des opérations de workflow plus complexes. Par exemple :
- _Gestion de la pagination d'API_ : les requêtes API nécessitent parfois de suivre un jeton de page ou un offset.
- _Gestion des listes_ : vous pouvez utiliser une variable pour initialiser un tableau et effectuer des actions comme map et reduce.
- _Itération_ : les variables vous permettent de manipuler et de stocker des données à l'intérieur d'une [boucle for][2]. Vous pouvez ensuite utiliser ces données dans le reste du workflow.

### Définir une variable personnalisée

Pour définir une variable personnalisée :
1. Cliquez sur l'icône plus (**+**) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape **Set variable**.
1. Cliquez sur l'étape **Set variable** et saisissez un **Step name**.
1. Saisissez un **variable name**. Les noms de variables doivent commencer par une lettre et ne peuvent contenir que des caractères alphanumériques et des underscores.
1. Saisissez une valeur pour la variable.
   - Tapez ``{{`` si vous souhaitez utiliser une variable de contexte de workflow.
   - Pour créer un objet, cliquez sur le bouton **Create object** <i class="icon-api"></i>.
   - Pour créer un tableau, cliquez sur le bouton **Create array** <span id="icon-array">[ ]</span>.

Si vous devez modifier la valeur d'une variable personnalisée après l'avoir définie, vous devez ajouter une étape **Set variable** supplémentaire et soit réattribuer la variable, soit créer une nouvelle variable.

Voici un exemple d'un workflow qui démontre l'étape **Set variable** :

1. Dans votre workflow, commencez par une étape **Set variable** pour déclarer une variable appelée `intList` et donnez-lui la valeur `[1,2,3,4]`.
1. Ajoutez une deuxième étape **Set variable** et déclarez une variable nommée `evenList` avec la valeur `${Variables.intList.filter(number => number % 2 === 0)}`. Il s'agit d'une [expression JavaScript en ligne][8] qui filtre les nombres impairs.
1. Ajoutez une étape **Echo** pour répercuter la valeur d'`evenList` (`2,4`).

{{< img src="service_management/workflows/set-variable-updated.png" alt="Ce workflow définit une variable pour contenir une liste de nombres, déclare une deuxième variable qui filtre les nombres impairs dans la liste à l'aide d'une expression en ligne, puis affiche la deuxième variable." style="width:100%;" >}}

### Accéder à une variable personnalisée

Vous pouvez accéder à une variable personnalisée dans votre workflow en utilisant `{{ Variables.variableName }}`. Par exemple, pour accéder à une variable personnalisée nommée `DashboardList`, utilisez `{{ Variables.DashboardList }}`.

### Itération

Définir une variable personnalisée à l'intérieur d'une **For loop** ou d'une **While loop** vous permet de stocker des données pour les utiliser en dehors de la boucle. Par exemple, si vous effectuez plusieurs requêtes API à l'intérieur d'une **For loop**, vous pouvez définir une variable personnalisée et y ajouter les données dont vous avez besoin à chaque itération. En dehors de la boucle, vous pouvez accéder à la variable personnalisée et gérer les données que vous avez collectées.

Pour éviter une erreur de type résultant d'une variable non définie, attribuez une variable personnalisée avant de l'utiliser dans une boucle. Dans l'exemple ci-dessous, la variable personnalisée `evenList` est définie sur un tableau vide avant d'être utilisée dans la boucle.

{{< img src="service_management/workflows/loop.png" alt="Ce workflow définit une variable avant qu'elle ne soit utilisée dans une boucle." style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][3].

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /fr/service_management/workflows/actions/flow_control#for-loop
[3]: https://datadoghq.slack.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /fr/service_management/workflows/trigger
[6]: /fr/service_management/app_builder/queries/#return-workflow-results-to-an-app
[7]: /fr/service_management/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /fr/service_management/workflows/expressions/#inline-javascript-expressions