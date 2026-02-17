---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
  - logic
  - logic step
  - flux
aliases:
- /fr/workflows/logic_actions
- /fr/service_management/workflows/actions_catalog/logic_actions/
- /fr/service_management/workflows/actions/flow_control
description: Ajouter une logique de contrôle aux workflows à l'aide de conditions
  if, d'instructions switch, de boucles, d'intervalles de veille et d'actions de branchement.
disable_toc: false
further_reading:
- link: /integrations/
  tag: Documentation
  text: En savoir plus sur les intégrations
is_beta: false
title: Logique de workflow
type: workflows
---

Utilisez les [actions logiques][1] pour ajouter une logique de contrôle à votre workflow. Par exemple, vous pouvez créer une branche à partir d'une condition, effectuer une action de manière itérative, inclure un intervalle de veille, et plus encore.

## If condition

Vous pouvez créer une branche dans le chemin d'exécution de votre workflow en fonction de l'évaluation d'une ou plusieurs instructions que vous définissez. Dans la capture d'écran ci-dessous, une action **If condition** détermine l'étape suivante dans le workflow en fonction de si le code de statut d'une action de requête HTTP précédente renvoie `200`. 

{{< img src="service_management/workflows/if-condition.png" alt="Le canevas du workflow avec une action if condition sélectionnée et l'onglet de configuration ouvert. La section Statements est mise en évidence avec deux instructions spécifiant que le statut d'une requête précédente doit être 200." >}} 

## Switch statement

Utilisez l'action Switch statement pour gérer plusieurs chemins de branchement dans une seule étape. Spécifiez une expression switch et comparez-la à une ou plusieurs valeurs de cas. Si aucun cas ne correspond, une branche par défaut s'exécute à la place. Dans l'exemple ci-dessous, une instruction Switch achemine le workflow en fonction de si le code de statut d'une requête HTTP précédente est `200`, `403`, `404`, `500` ou une autre valeur.

{{< img src="service_management/workflows/switch-statement.png" alt="Le canevas du workflow montrant une action Switch statement nommée 'Make_request.status' se ramifiant en plusieurs cas pour différents codes de statut HTTP. Chaque cas envoie un message Slack différent, et la branche par défaut génère une erreur inattendue si aucun autre cas ne correspond." >}}

## Sleep

L'action **Sleep** met en pause l'exécution du workflow pendant une durée spécifiée. Sélectionnez une durée prédéfinie dans le menu déroulant **Duration**, ou saisissez une variable personnalisée en secondes.

## For loop

L'action **For loop** vous permet d'exécuter un ensemble d'actions de manière itérative pour chaque élément d'une liste d'entrée donnée. Les boucles for acceptent une liste d'entrée allant jusqu'à 2 000 éléments. Vous pouvez effectuer de nombreuses opérations différentes dans une boucle for, y compris la configuration de chemins d'erreur et la mise à jour de variables.

Dans l'exemple ci-dessous, une boucle for itère sur une liste d'incidents et envoie un message Slack pour tout incident de plus d'une semaine.

{{< img src="service_management/workflows/iteration2.png" alt="Un workflow avec une boucle for. La boucle itère sur une liste d'incidents et envoie un message à un canal slack si l'incident a plus d'une semaine." style="width:100%;" >}}

Pour ajouter une boucle for à votre workflow :
1. Cliquez sur l'icône plus (**+**) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape **For loop**.
1. Cliquez sur l'étape de boucle et saisissez une **Input list** sur laquelle l'étape doit itérer. Vous pouvez saisir une liste personnalisée ou utiliser une variable de workflow.
1. À l'intérieur du cadre de la boucle, cliquez sur l'icône (**+**) pour ajouter une étape à la boucle.
1. Configurez l'action en boucle. Pour accéder à la valeur actuelle dans la liste d'entrée, utilisez la variable `{{Current.Value}}`. Pour accéder à l'index de la valeur actuelle, utilisez `{{Current.Index}}`.
1. Ajoutez et configurez toutes les étapes supplémentaires que vous devez mettre en boucle. Vous pouvez utiliser une **if statement** et un **break** pour quitter votre boucle prématurément.
1. **Enregistrez** et **publiez** le workflow.

Lorsqu'une exécution se termine, le workflow passe en mode **Debug**. Sélectionnez une étape dans la boucle pour voir une liste de **toutes** les itérations, des itérations **ayant échoué** ou des itérations **réussies** pour cette étape. Sélectionnez une itération pour voir la sortie ou le message d'erreur.

## While loop

L'action **While loop** vous permet d'exécuter un ensemble d'actions de manière itérative en fonction d'un ensemble de conditions et est recommandée pour les modèles d'automatisation où le nombre de répétitions n'est pas connu à l'avance. Les boucles while exécutent un maximum de 2 000 itérations. Vous pouvez effectuer différentes opérations avec une boucle while, y compris la pagination, l'interrogation de la progression et la réessai jusqu'au succès.

L'exemple suivant utilise une boucle while pour paginer l'API AWS S3 List Buckets pour une application.

{{< img src="service_management/workflows/iteration3.png" alt="Un workflow avec une boucle while. Le workflow utilise une boucle while pour paginer l'API AWS S3 List Buckets pour une application." style="width:100%;" >}}

Pour ajouter une boucle while à votre workflow :
1. Cliquez sur l'icône plus (**+**) sur votre canevas de workflow pour ouvrir le catalogue d'actions.
1. Recherchez et sélectionnez l'étape **While loop**.
1. Cliquez sur l'étape de boucle et définissez la condition que la boucle While évaluera avant chaque itération. La boucle continue si la condition est vraie, et s'arrête lorsqu'elle évalue à faux.
1. À l'intérieur du cadre de la boucle, cliquez sur l'icône plus (**+**) pour ajouter une étape à la boucle.
1. Configurez l'action en boucle. Pour accéder à l'index de la valeur actuelle, utilisez `{{Current.Index}}`.
1. Ajoutez et configurez toutes les étapes supplémentaires que vous devez mettre en boucle. Vous pouvez utiliser une **if statement** et une action **break** pour quitter votre boucle prématurément.
1. **Enregistrez** et **publiez** le workflow.

Lorsqu'une exécution se termine, le workflow passe en mode **Debug**. Sélectionnez une étape dans la boucle pour voir une liste de **toutes** les itérations, des itérations **ayant échoué** ou des itérations **réussies** pour cette étape. Sélectionnez une itération pour voir la sortie ou le message d'erreur. Sélectionnez l'étape While Loop et un index spécifique pour voir la condition évaluée à cet index.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][2].

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://datadoghq.slack.com/