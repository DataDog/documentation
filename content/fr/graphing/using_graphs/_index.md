---
title: Présentation des graphiques
kind: documentation
description: Visualiser vos données pour mieux les comprendre
further_reading:
  - link: 'https://learn.datadoghq.com/course/view.php?id=8'
    tag: “Centre d'apprentissage”
    text: “Améliorer vos dashboards”
---
## L'éditeur de graphiques

Interagissez avec l'éditeur de graphiques en utilisant l'interface graphique (la méthode par défaut) ou en rédigeant directement en JSON (la méthode plus avancée). Cette page couvre l'utilisation de l'éditeur de graphiques avec l'interface graphique. Pour en savoir plus sur l'utilisation de l'éditeur de graphiques avec du JSON, consultez la section [Graphiques JSON][1].

Chaque graphique est doté d'une icône en forme de crayon, qui ouvre l'éditeur de graphiques :

{{< img src="graphing/index/references-graphing-overview.png" alt="Présentation des graphiques" responsive="true" style="width:75%;" >}}

L'éditeur de graphiques dispose des onglets suivants :

* **Share** : permet d'intégrer le graphique à n'importe quelle page Web externe.
* **JSON** : l'éditeur le plus flexible. Il est cependant nécessaire de connaître le langage de définition de graphiques pour l'utiliser.
* **Edit** : il s'agit de l'onglet par défaut de l'interface graphique pour les options des graphiques.

Lorsque vous ouvrez l'éditeur de graphiques pour la première fois, vous accédez à l'onglet **Edit**. Grâce à son interface utilisateur, vous pouvez définir la plupart des paramètres. Voici un exemple d'interface :

{{< img src="graphing/index/references-graphing-edit-window-with-y.png" alt="Onglet Edit des graphiques" responsive="true" style="width:75%;" >}}

## Configuration d'un graphique
Pour configurer votre graphique, suivez ce processus :

1. [Choisir la métrique à représenter](#choose-the-metric-to-graph)
2. [Sélectionner la visualisation](#select-your-visualization)
3. [Filtre](#filter)
4. [Agréger et cumuler des données](#aggregate-and-rollup)
5. [Appliquer des fonctions supplémentaires](#advanced-graphing)
6. [Donner un titre au graphique](#create-a-title)

### Choisir la métrique à représenter

Lorsque vous créez un graphique, vous cherchez probablement à représenter une métrique. Vous pouvez la sélectionner dans la première liste déroulante de l'étape 2, **Graph your data**. Si vous ne savez pas quelle métrique utiliser, vous pouvez commencer par consulter le [Metrics Explorer][2] ou un [notebook][3]. Vous pouvez également consulter la liste des métriques dans le [Metrics Summary][4].


### Sélectionner votre visualisation

Une fois que vous avez choisi une métrique à représenter dans votre graphique, sélectionnez votre visualisation. Consultez la [liste de toutes les visualisations (widgets)][5].

### Filtre

Lorsque la métrique et la visualisation sont prêtes, vous pouvez filtrer les hosts à représenter graphiquement. À droite de la métrique se trouve la liste déroulante **from**. Sa valeur par défaut est *(everything)*. Cliquez dessus et choisissez la ou les clés de tags que vous souhaitez utiliser pour filtrer les données. Pour en savoir plus sur les tags, consultez la [documentation relative au tagging][6].

### Agréger et cumuler des données
#### Méthode d'agrégation

La méthode d'agrégation se trouve en regard de la liste déroulante du filtre. Par défaut, sa valeur est définie sur **avg by**, mais vous pouvez la remplacer par **max by**, **min by** ou **sum by**. Dans la plupart des cas, la métrique possède de nombreuses valeurs, provenant d'un grand nombre de hosts ou d'instances, pour chaque intervalle de temps. La méthode d'agrégation choisie détermine comment les valeurs de la métrique sont agrégées en une seule ligne. Ainsi, si vous représentez une métrique provenant de 100 hosts, **sum by** additionne toutes ces valeurs et en affiche la somme.

#### Groupes d'agrégation

Après la méthode d'agrégation, vous pouvez déterminer ce qui constitue une ligne ou un groupe dans un graphique. Si vous choisissez comme critère les hosts, chaque host est représenté par une ligne sur un graphique linéaire. Si vous choisissez comme critère les rôles, chaque rôle sera représenté par une ligne, et chaque ligne sera composée des métriques de l'ensemble des hosts du rôle en question. Ces métriques sont agrégées via la méthode que vous avez précédemment choisie.

#### Cumul pour agréger vos données au fil du temps

Indépendamment des options précédemment choisies, en raison des contraintes de taille physique de la fenêtre du graphique, les données font toujours l'objet d'une certaine agrégation. Si une métrique est mise à jour toutes les secondes et que vous consultez 4 heures de données, vous avez besoin d'afficher 14 400 points pour tout représenter. Chaque graphique affiché inclut à tout moment environ 300 points.

Dans l'exemple ci-dessus, chaque point affiché à l'écran représente 48 points de données. Dans la pratique, les métriques sont recueillies par l'Agent toutes les 15 à 20 secondes. Ainsi, un jour de données représente 4 320 points. Vous pouvez envisager d'utiliser la fonction de cumul pour prendre en considération 5 à 10 minutes de données afin de contrôler davantage le graphique.

Pour utiliser la fonction de rollup, cliquez sur le signe « + » à droite du groupe d'agrégation et choisissez `rollup` dans la liste déroulante. Choisissez ensuite la méthode d'agrégation de vos données ainsi que l'intervalle en secondes.

Pour créer une seule ligne représentant l'espace disque total disponible en moyenne sur toutes les machines déployées dans des compartiments de 60 secondes, vous pouvez utiliser une requête comme celle-ci :

{{< img src="graphing/index/references-graphing-rollup-example.png" alt="exemple cumul" responsive="true" style="width:90%;">}}

Lorsque vous passez à la vue JSON, voici à quoi ressemble la requête :

```
"q": "avg:system.disk.free{*}.rollup(avg, 60)"
```

Pour obtenir davantage d'information sur l'utilisation de la vue JSON, consultez la section [Graphiques JSON][1].

### Créer des graphiques avancés

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à votre requête. Vous pouvez par exemple inclure des taux et des dérivés, un lissage, et plus encore. Consultez la [liste des fonctions disponibles][7].

L'interface utilisateur Datadog vous permet également de représenter graphiquement vos métriques avec différentes opérations arithmétiques. Utilisez les options `+`, `-`, `/` ou `*` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe accepte à la fois des nombres entiers et des opérations arithmétiques sur plusieurs métriques.

#### Opération arithmétique pour une métrique utilisant un nombre entier

Modifiez l'affichage de la valeur d'une métrique sur un graphique en effectuant une opération arithmétique sur la métrique. Par exemple, vous pouvez visualiser le double d'une métrique spécifique en cliquant sur le lien **Advanced...** de l'éditeur de graphiques. Saisissez ensuite votre opération arithmétique dans la case `Formula`, à savoir ici : `a * 2`.

{{< img src="graphing/index/arithmetic_2.png" alt="Opération arithmétique 2" responsive="true" style="width:75%;" >}}

#### Opération arithmétique entre deux métriques

Visualisez le pourcentage d'une métrique en divisant une métrique par une autre. Par exemple :

`jvm.heap_memory / jvm.heap_memory_max`

Comme pour l'exemple ci-dessus, vous pouvez utiliser l'option **Advanced...** de l'éditeur de graphiques pour y parvenir. Il vous suffit alors de sélectionner **Add Query**. Chaque requête se voit attribuer une lettre : la première métrique est représentée par **a**, la deuxième métrique par **b**, et ainsi de suite.

Saisissez ensuite dans la case `Formula` l'opération arithmétique, par exemple : `a / b`.

{{< img src="graphing/index/arithmetic_3.png" alt="Opération arithmétique 3" responsive="true" style="width:75%;" >}}

Pour afficher uniquement votre formule, désélectionnez vos métriques **a** et **b** :

{{< img src="graphing/index/arithmetic_3_bis.png" alt="Opération arithmétique 3 bis" responsive="true" style="width:75%;" >}}

**Remarque** : les formules ne sont pas représentées par des lettres. Vous ne pouvez donc pas effectuer d'opérations arithmétiques entre plusieurs formules.

### Créer un titre

Si vous ne saisissez pas de titre, nous en générons un automatiquement en fonction de vos sélections. Nous vous recommandons toutefois de créer un titre qui décrit l'objectif du graphique. 

### Enregistrer

Cliquez sur **Done** pour enregistrer votre travail et quitter l'éditeur. Vous pourrez toujours revenir à l'éditeur pour modifier le graphique. Si vous ne souhaitez pas enregistrer les modifications effectuées, cliquez sur **Cancel**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/graphing/graphing_json
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/notebook/list
[4]: https://app.datadoghq.com/metric/summary
[5]: /fr/graphing/widgets
[6]: /fr/tagging
[7]: /fr/graphing/functions/#apply-functions-optional