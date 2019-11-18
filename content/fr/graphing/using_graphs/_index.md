---
title: Utiliser les graphiques
kind: documentation
description: Visualiser vos données pour mieux les comprendre
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=8'
    tag: Centre d'apprentissage
    text: Améliorer vos dashboards
---
## Présentation

Que vous utilisiez les métriques, les monitors, les dashboards ou encore les notebooks, tous les graphiques Datadog offrent les mêmes fonctionnalités de base.

## Éditeur de graphiques

Cette page décrit comment utiliser l'éditeur de graphiques depuis l'interface Datadog. Pour une utilisation plus avancée, vous pouvez également créer et modifier des graphiques avec JSON. Pour en savoir plus sur l'utilisation de JSON, consultez la section [Graphiques JSON][1].

Depuis les widgets, ouvrez l'éditeur de graphiques en cliquant sur l'icône en forme de crayon en haut à droite. L'éditeur de graphiques présente les onglets suivants :

* **Share** : permet d'intégrer le graphique à n'importe quelle page Web externe.
* **JSON** : un éditeur plus flexible. Il est cependant nécessaire de connaître le langage de définition de graphiques pour l'utiliser.
* **Edit** : l'onglet par défaut avec les options de création de graphique.

Lorsque vous ouvrez l'éditeur de graphiques pour la première fois, vous accédez à l'onglet **Edit**. De là, vous pouvez utiliser l'interface pour définir la plupart des paramètres. Voici un exemple d'interface :

{{< img src="graphing/using_graphs/references-graphing-edit-window-with-y.png" alt="Onglet Edit des graphiques" responsive="true" style="width:75%;" >}}

## Configuration d'un graphique
Pour configurer votre graphique sur un dashboard, suivez ce processus :

1. [Sélectionner la visualisation](#select-your-visualization)
2. [Choisir la métrique à représenter](#choose-the-metric-to-graph)
3. [Filtre](#filter)
4. [Agréger et cumuler des données](#aggregate-and-rollup)
5. [Appliquer des fonctions supplémentaires](#advanced-graphing)
6. [Donner un titre au graphique](#create-a-title)

### Sélectionner votre visualisation

Sélectionnez votre visualisation à partir des [widgets][2] disponibles.

### Choisir la métrique à représenter

Choisissez la métrique à représenter en la recherchant ou en la sélectionnant dans le menu déroulant à proximité de **Metric**. Si vous ne savez pas quelle métrique utiliser, vous pouvez commencer par consulter le [Metrics Explorer][3] ou un [notebook][4]. Vous pouvez également consulter la liste des métriques sur la page [Metrics Summary][5].

### Filtre

La métrique choisie peut être filtrée en fonction d'un host ou d'un tag à l'aide du menu déroulant **from** à droite de la métrique. Le filtre par défaut est *(everywhere)*. Pour en savoir plus sur les tags, consultez la documentation sur le [Tagging][6].

### Agréger et cumuler des données
#### Méthode d'agrégation

La méthode d'agrégation est indiquée à côté de la liste déroulante du filtre. La méthode par défaut est `avg by`, mais vous pouvez la définir sur `max by`, `min by` ou `sum by`. Dans la plupart des cas, la métrique possède de nombreuses valeurs issues d'un grand nombre de hosts ou d'instances pour chaque intervalle de temps. La méthode d'agrégation choisie détermine comment les valeurs de la métrique sont agrégées en une seule ligne.

#### Groupes d'agrégation

Après la méthode d'agrégation, vous pouvez déterminer ce qui constitue une ligne ou un groupe dans un graphique. Par exemple, si vous choisissez `host`, une ligne apparaîtra pour chaque `host`. Chaque ligne représente la métrique sélectionnée pour un `host` spécifique, ses valeurs étant agrégées selon la méthode choisie.

#### Agréger vos données au fil du temps avec la fonction rollup

Indépendamment des options précédemment choisies, en raison des contraintes de taille physique de la fenêtre du graphique, les données font toujours l'objet d'une certaine agrégation. Si une métrique est mise à jour toutes les secondes et que vous consultez 4 heures de données, vous avez besoin d'afficher 14 400 points pour tout représenter. Chaque graphique illustre environ 300 points à la fois. Ainsi, chaque point de données affiché à l'écran représente 48 points de données.

Dans la pratique, les métriques sont recueillies par l'Agent toutes les 15 à 20 secondes. Ainsi, un jour de données représente 4 320 points. Si vous représentez les données d'un jour entier sur un seul graphique, les données sont automatiquement cumulées par Datadog. Pour en savoir plus, consultez la page [Présentation des métriques][7].

Pour cumuler manuellement les données, utilisez la [fonction rollup][8]. Cliquez sur le signe « + » à droite du groupe d'agrégation et choisissez `rollup` dans la liste déroulante. Choisissez ensuite la méthode d'agrégation de vos données ainsi que l'intervalle en secondes.

Cette requête crée une ligne unique représentant l'espace disque total disponible en moyenne sur l'ensemble des machines déployées, avec un intervalle de cumul des données de 60 secondes :

{{< img src="graphing/using_graphs/references-graphing-rollup-example.png" alt="exemple de cumul" responsive="true" style="width:90%;">}}

Lorsque vous passez à la vue JSON, voici à quoi ressemble la requête :

```
"q": "avg:system.disk.free{*}.rollup(avg, 60)"
```

Pour obtenir davantage d'information sur l'utilisation de la vue JSON, consultez la section [Graphiques JSON][1].

### Créer des graphiques avancés

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à votre requête. Vous pouvez par exemple calculer les taux et les dérivées, appliquer un lissage, et plus encore. Consultez la [liste des fonctions disponibles][9].

Datadog vous permet également de représenter graphiquement vos métriques avec différentes opérations arithmétiques. Utilisez les options `+`, `-`, `/` et `*` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe accepte à la fois des nombres entiers et des opérations arithmétiques sur plusieurs métriques.

#### Opération arithmétique pour une métrique utilisant un nombre entier

Modifiez la valeur affichée pour une métrique sur un graphique en effectuant une opération arithmétique. Par exemple, vous pouvez visualiser le double d'une métrique spécifique en cliquant sur le lien **Advanced...** de l'éditeur de graphiques. Saisissez ensuite votre opération arithmétique dans la case `Formula`, à savoir ici : `a * 2`.

{{< img src="graphing/using_graphs/arithmetic_2.png" alt="Opération arithmétique 2" responsive="true" style="width:75%;" >}}

#### Opération arithmétique entre deux métriques

Visualisez le pourcentage d'une métrique en divisant une métrique par une autre. Par exemple :
```
jvm.heap_memory / jvm.heap_memory_max
```

Utilisez l'option **Advanced...** sur l'éditeur de graphiques et sélectionnez **Add Query**. Chaque requête se voit attribuer une lettre dans l'ordre alphabétique : la première métrique est représentée par `a`, la seconde par `b`, etc.

Dans la case `Formula`, saisissez ensuite l'opération arithmétique (`a / b` dans cet exemple) :

{{< img src="graphing/using_graphs/arithmetic_3.png" alt="Opération arithmétique 3" responsive="true" style="width:75%;" >}}

Pour afficher uniquement la formule sur votre graphique, cliquez sur les coches correspondant aux métriques `a` et `b`.

**Remarque** : les formules ne sont pas représentées par des lettres. Vous ne pouvez donc pas effectuer d'opérations arithmétiques entre plusieurs formules.

### Créer un titre

Si vous ne saisissez pas de titre, nous en générons un automatiquement en fonction de vos sélections. Nous vous conseillons toutefois de définir un titre qui décrit précisément l'objectif du graphique.

### Enregistrer

Cliquez sur **Done** pour enregistrer votre travail et quitter l'éditeur. Vous pourrez toujours revenir à l'éditeur pour modifier le graphique. Si vous ne souhaitez pas enregistrer les modifications effectuées, cliquez sur **Cancel**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json
[2]: /fr/graphing/widgets
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/notebook/list
[5]: https://app.datadoghq.com/metric/summary
[6]: /fr/tagging
[7]: /fr/graphing/metrics/introduction
[8]: /fr/graphing/functions/rollup
[9]: /fr/graphing/functions/#apply-functions-optional