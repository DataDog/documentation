---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
  - logic
  - logic step
  - flow
aliases:
- /fr/workflows/logic_actions
- /fr/service_management/workflows/actions_catalog/logic_actions/
- /fr/service_management/workflows/actions/flow_control
description: Ajoutez une logique de contrôle aux workflows en utilisant des conditions
  if, des instructions switch, des boucles, des intervalles de sommeil et des actions
  de branchement.
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
is_beta: false
title: Logique de workflow
type: workflows
---
Utilisez [Logic actions][1] pour ajouter une logique de contrôle à votre workflow. Par exemple, vous pouvez créer un branchement à partir d'une condition, effectuer une action de manière itérative, inclure un intervalle de pause, et plus encore.

## If condition {#if-condition}

Vous pouvez créer un branchement dans le chemin d'exécution de votre workflow en fonction de l'évaluation d'une ou plusieurs instructions que vous définissez. Dans la capture d'écran ci-dessous, une action {{< ui >}}If condition{{< /ui >}} détermine l'étape suivante du workflow selon que le code d'état d'une action de requête HTTP précédente renvoie `200`.

{{< img src="actions/workflows/actions/flow_control/if-condition.png" alt="Le canevas de workflow avec une action de condition if sélectionnée et l'onglet de configuration ouvert. La section Statements est mise en surbrillance avec deux instructions spécifiant que le statut d'une requête précédente doit être 200." >}}

## Switch statement {#switch-statement}

Utilisez l'action Switch statement pour gérer plusieurs chemins de branchement en une seule étape. Spécifiez une expression switch et comparez-la à une ou plusieurs valeurs de cas. Si aucun cas ne correspond, une branche par défaut est exécutée à la place. Dans l'exemple ci-dessous, une Switch statement achemine le workflow selon que le code d'état d'une requête HTTP précédente est `200`, `403`, `404`, `500` ou une autre valeur.

{{< img src="actions/workflows/actions/flow_control/switch-statement.png" alt="Le canevas de workflow montrant une action Switch statement nommée 'Make_request.status' se ramifiant en plusieurs cas pour différents codes d'état HTTP. Chaque cas envoie un message Slack différent, et la branche par défaut génère une erreur inattendue si aucun autre cas ne correspond." >}}

## Sleep {#sleep}

L'action {{< ui >}}Sleep{{< /ui >}} suspend l'exécution du workflow pendant une durée spécifiée. Sélectionnez une durée prédéfinie dans le drop-down {{< ui >}}Duration{{< /ui >}}, ou saisissez une variable personnalisée en secondes.

## Boucle For {#for-loop}

L'action {{< ui >}}For loop{{< /ui >}} vous permet d'exécuter un ensemble d'actions de manière itérative pour chaque élément d'une liste d'entrée donnée. Les boucles For acceptent une liste d'entrée allant jusqu'à 2000 éléments. Vous pouvez effectuer de nombreuses opérations différentes au sein d'une boucle For, notamment configurer des chemins d'erreur et mettre à jour des variables.

Dans l'exemple ci-dessous, une boucle For itère sur une liste d'incidents et envoie un message Slack pour tout incident datant de plus d'une semaine.

{{< img src="actions/workflows/actions/flow_control/iteration2.png" alt="Un workflow avec une boucle For. La boucle For itère sur une liste d'incidents et envoie un message sur un canal Slack si l'incident date de plus d'une semaine." style="width:100%;" >}}

Pour ajouter une boucle For à votre workflow :
1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape {{< ui >}}For loop{{< /ui >}}.
1. Cliquez sur l'étape de boucle et saisissez une {{< ui >}}Input list{{< /ui >}} sur lequel l'étape doit itérer. Vous pouvez saisir une liste personnalisée ou utiliser une variable de workflow.
1. À l'intérieur du cadre de la boucle, cliquez sur l'icône ({{< ui >}}\+{{< /ui >}}) pour ajouter une étape à la boucle.
1. Configurez l'action en boucle. Pour accéder à la valeur actuelle dans la liste d'entrée, utilisez le `{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}`.
1. Ajoutez et configurez toutes les étapes supplémentaires dont vous avez besoin dans la boucle. Vous pouvez utiliser un {{< ui >}}if statement{{< /ui >}} et un {{< ui >}}break{{< /ui >}} pour quitter votre boucle prématurément.
1. {{< ui >}}Save{{< /ui >}} et {{< ui >}}Publish{{< /ui >}} le workflow.

Lorsqu'une exécution se termine, le workflow passe en mode {{< ui >}}Debug{{< /ui >}}. Sélectionnez une étape au sein de la boucle While pour voir une liste des itérations {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} ou {{< ui >}}Successful{{< /ui >}} pour cette étape. Sélectionnez une itération pour voir le résultat ou le message d'erreur.

## Boucle While {#while-loop}

L'action {{< ui >}}While loop{{< /ui >}} vous permet d'exécuter un ensemble d'actions de manière itérative en fonction d'un ensemble de conditions et est recommandée pour les modèles d'automatisation où le nombre de répétitions n'est pas connu à l'avance. Les boucles While exécutent un maximum de 2000 itérations. Vous pouvez effectuer différentes opérations avec une boucle While, notamment la pagination, l'interrogation de la progression et la nouvelle tentative jusqu'à la réussite.

L'exemple suivant utilise une boucle While pour paginer l'API List Buckets d'AWS S3 pour une application.

{{< img src="actions/workflows/actions/flow_control/iteration3.png" alt="Un workflow avec une boucle While. Le workflow utilise une boucle While pour paginer l'API List Buckets d'AWS S3 pour une application." style="width:100%;" >}}

Pour ajouter une boucle While à votre workflow :
1. Cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape {{< ui >}}While loop{{< /ui >}}.
1. Cliquez sur l'étape de boucle et définissez la condition que la boucle While évaluera avant chaque itération. La boucle While continue si la condition est vraie et s'arrête lorsqu'elle est évaluée comme fausse.
1. À l'intérieur du cadre de la boucle, cliquez sur l'icône plus ({{< ui >}}\+{{< /ui >}}) pour ajouter une étape à la boucle.
1. Configurez l'action en boucle. Pour accéder à l'index de la valeur actuelle, utilisez `{{Current.Index}}`.
1. Ajoutez et configurez toutes les étapes supplémentaires dont vous avez besoin dans la boucle. Vous pouvez utiliser une action {{< ui >}}if statement{{< /ui >}} et une action {{< ui >}}break{{< /ui >}} pour quitter votre boucle While prématurément.
1. {{< ui >}}Save{{< /ui >}} et {{< ui >}}Publish{{< /ui >}} le workflow.

Lorsqu'une exécution se termine, le workflow passe en mode {{< ui >}}Debug{{< /ui >}}. Sélectionnez une étape au sein de la boucle While pour voir une liste des itérations {{< ui >}}All{{< /ui >}}, {{< ui >}}Failed{{< /ui >}} ou {{< ui >}}Successful{{< /ui >}} pour cette étape. Sélectionnez une itération pour voir le résultat ou le message d'erreur. Sélectionnez l'étape de boucle While et un index spécifique pour voir la condition évaluée à cet index.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][2].

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/