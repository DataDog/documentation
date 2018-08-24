---
title: Graphiques
kind: documentation
aliases:
  - /fr/guides/graphing
  - /fr/graphing/miscellaneous/metrics_arithmetic
  - >-
    /fr/graphing/faq/is-there-a-way-for-me-to-set-the-maximum-and-minimum-values-on-the-y-axis-of-a-graph
  - /fr/graphing/faq/is-it-possible-to-adjust-the-y-axis-for-my-graphs
description: Visualiser vos données pour mieux les comprendre
---
Les graphiques sont une fenêtre sur vos systèmes surveillés. La plupart du temps lors de vos visites de Datadog, vous regardez [des dashboards][8] constitués de graphiques. D'autres fois, vous recevez des notifications par courriel qui incluent un graphique de certaines fluctuations dans le système. Et d'autres fois, vous voyez des graphiques dans votre client Slack, HipChat (ou autres clients de chat) montrant des changements de comportement dans les métriques au cours du temps. Les graphiques sont au cœur de la surveillance et de l'observabilité, il est donc essentiel de comprendre comment définir de superbes graphiques.

## L'éditeur de graphique

Il existe deux façons d'interagir avec l'éditeur de graphique: l'utilisation de l'interface graphique (la méthode par défaut) et l'écriture d'objet JSON (la méthode la plus complète). Cette page couvre l'utilisation de l'interface graphique. Pour en savoir plus sur l'utilisation de Graphing Editor JSON, consultez la [Page d'introduction aux graphiques JSON][1]

Sur chaque graphique, il y a une icône en forme de crayon qui ouvre l'éditeur de graphique.

{{< img src="graphing/index/references-graphing-overview.png" alt="Graphing Overview" responsive="true" style="width:75%;" >}}

L'éditeur de graphique a trois onglets:

* **Share**: vous permet d'intégrer le graphique sur n'importe quelle page Web externe (Remarque: l'onglet Partage n'est disponible que sur les Timeboards).
* **JSON**: L'éditeur le plus flexible, mais il nécessite la connaissance du langage de définition des graphique pour l'utiliser.
* **Edit**: L'onglet par défaut qui vous permet d'utiliser une interface graphique pour sélectionner les options graphiques.

Lorsque vous ouvrez la fenêtre de l'éditeur graphique pour la première fois, vous êtes sur l'onglet **Edit**. Ici vous pouvez utiliser l'interface utilisateur pour choisir la plupart des paramètres pour modifier vos graphiques. Voici un exemple de ce que vous pourriez voir. Cet exemple provient du premier graphique du dashboard par défaut de l'intégration Postgres:

{{< img src="graphing/index/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" responsive="true" style="width:75%;" >}}

La configuration d'un graphique est un processus en plusieurs étapes:

1. [Choisissez la métrique à grapher][9]
2. [Sélectionner la visualisation][10]
3. [Filter][11] 
4. [Agréger et cumuler][12]
5. [Appliquer des fonctions suplémentaires][13]
6. [Améliorer vos graphiques][14]
7. [Titre du graphique][15]

## Choisissez la métrique à grapher

Lorsque vous créez un graphique, vous avez probablement une métrique en tête que vous voulez afficher. Vous pouvez la sélectionner dans la première liste déroulante de la section **Choose metrics and events**. Si vous n'êtes pas sûr de la métrique à utiliser, vous pouvez commencer par regarder les pages [Metrics Explorer][2] ou [Notebook][7]. Vous pouvez également consulter le [Metrics Summary][3].

La page Metrics Explorer vous permet de jouer avec différents paramètres graphiques d'une manière plus ad hoc. La page Metrics Summary permet d'en savoir plus sur le type d'une métrique et de définir l'unité par défaut pour une métrique.

## Sélectionner vos visualisation

Une fois que vous avez choisi une métrique à afficher dans votre graphique, sélectionnez votre visualisation.

Trouver la liste de toutes les visualisations [ici][4]

## Filter

Maintenant que vous avez la métrique et une visualisation en place, vous pouvez filtrer les hôtes à représenter graphiquement. A droite de la métrique se trouve une liste déroulante qui par défaut vaut *(everywhere) *. Cliquez dessus et choisissez le ou les tags que vous souhaitez utiliser pour filtrer le contexte de votre graphique. Pour en savoir plus sur les tags, reportez-vous à la [Documentation de tagging][5].

## Agréger et cumuler
### Méthode d'agrégation

À côté de la liste déroulante du filtre, il y a la méthode d'agrégation. La valeur par défaut est **avg by** mais elle peut être remplacée par **max by**, **min by**, ou **sum by**. Dans la plupart des cas, la métrique a plusieurs valeurs, provenant de nombreux hôtes ou instances, pour chaque intervalle de temps.
La méthode d'agrégation choisie détermine la manière dont les métriques sont agrégées en une seule ligne. Ainsi, si vous représentez une métrique provenant de 100 hôtes, **sum by** additionne toutes ces valeurs et en affiche la somme.

### Groupes d'agrégation

Après la méthode d'agrégation, vous pouvez déterminer ce qui constitue une ligne ou un group dans un graphique. Si vous choisissez host, alors vous avez une ligne (dans le cas des graphiques linéaires) pour chaque host. Si vous choisissez le rôle, il y a une ligne pour chaque rôle et cette ligne sera composée de métriques de tous les hôtes de ce rôle, agrégées à l'aide de la méthode que vous avez choisie ci-dessus.

### Rollup pour agréger au fil du temps

Indépendamment des options choisies ci-dessus, il y a toujours une certaine agrégation de données due aux contraintes de taille physique de la fenêtre contenant le graphique. Si une métrique est mise à jour toutes les secondes et que vous consultez 4 heures de données, vous avez besoin de 14 400 points pour tout afficher. Chaque graphique que nous affichons a environ 300 points affichés à un moment donné.

Dans l'exemple ci-dessus, chaque point affiché à l'écran représente 48 points de données. En pratique, les métriques sont collectées par l'Agent toutes les 15-20 secondes. Donc, un jour de données représente 4.320 points. Vous pourriez envisager une fonction de rollup qui prend en compte 5 ou 10 minutes de données si vous souhaiteriez avoir plus de contrôle sur l'affichage de vos données pour un graphique qui affiche 1 jour entier.

Pour utiliser la fonction de rollup, cliquez sur le signe plus à droite du groupe d'agrégation et choisissez "rollup" dans la liste déroulante. Maintenant, choisissez comment vous voulez agréger les données et l'intervalle en secondes.

Pour créer une seule ligne représentant l'espace disque total disponible en moyenne sur toutes les machines déployées dans des compartiments de 60 secondes, vous devez utiliser une requête comme celle-ci:

{{< img src="graphing/index/references-graphing-rollup-example.png" alt="rollup example" responsive="true" style="width:90%;">}}

Lorsque vous passez à la vue JSON, la requête ressemble à ceci:

    "q": "avg:system.disk.free{*}.rollup(avg, 60)"

Pour plus d'informations sur l'utilisation de la vue JSON, visitez la page [JSON Graphing Primer][1].

## Réalisation de graphiques avancés

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à votre requête. Les exemples incluent les taux et les dérivés, le lissage, et plus encore. Pour une liste des fonctions disponibles [cliquez ici][6].

L'interface utilisateur Datadog prend également en charge la possibilité de représenter graphiquement vos métriques avec différentes options arithmétiques. Utilisez l'un de: `+`, `-`, `/`, `*`  pour modifier les valeurs affichées sur vos graphiques.
Cette syntaxe permet à la fois des valeurs entières et arithmétiques en utilisant plusieurs métriques.

### Arithmétique de métrique utilisant un nombre entier

Vous pouvez modifier la façon dont une valeur de métrique est affichée sur un graphique en effectuant une opération arithmétique sur la métrique.
Par exemple, si vous souhaitez visualiser le double d'une métrique spécifique, disons `system.load.5`. Cela peut être fait à l'intérieur d'un éditeur de graphique en cliquant sur l'éditeur de graphes et en sélectionnant **Advanced...**.
De là, entrez votre arithmétique dans la case `Formula`, dans ce cas: ` a * 2`.

{{< img src="graphing/index/arithmetic_2.png" alt="Arithmetic 2" responsive="true" style="width:75%;" >}}

### Arithmétique entre deux métriques

Si vous souhaitez visualiser le pourcentage de `jvm.heap_memory` utilisé par exemple, effectuez l'opération arithmétique suivante sur deux métriques qui reportent déjà dans votre application Datadog:

`jvm.heap_memory / jvm.heap_memory_max`

Cela peut être fait de la même manière que ci-dessus, en utilisant l'option **Advanced...** dans l'éditeur de graphique. De là, sélectionnez:

* `Add Query +`

Une fois que vous avez ajouté toutes les métriques que vous souhaitiez visualiser avec leur contexte, notez qu'une lettre leur est affectée: la première métrique est représentée par **a**, la seconde métrique est représentée par **b**, et ainsi de suite..

Ensuite, dans la case `Formula`, entrez l'arithmétique que vous souhaitez, dans ce cas: `(a/b)`.

{{< img src="graphing/index/arithmetic_3.png" alt="Arithmetic 3" responsive="true" style="width:75%;" >}}

Pour afficher uniquement votre formule, désactivez vos métriques **a** et **b**:

{{< img src="graphing/index/arithmetic_3_bis.png" alt="Arithmetic 3 bis" responsive="true" style="width:75%;" >}}

**Note**: Les formules n'ont pas des lettres, vous ne pouvez pas faire d'arithmétique entre les formules.

## Amélioration des graphiques

### Aliasing de métriques

Chaque requête ou formule peut avoir un alias. L'alias remplace l'affichage sur le graphique et la légende, ce qui est particulièrement utile pour les noms de métriques longs ou pour clarifier une formule.
À la fin de votre requête/formule, cliquez sur le bouton **as...**, puis entrez votre alias de métrique:

{{< img src="graphing/index/metric_alias.png" alt="metric alias" responsive="true" style="width:75%;" >}}

### Définir l'échelle de l'axe des ordonnées

Les contrôles de l'axe des ordonnées de Datadog sont disponibles via l'interface utilisateur et l'éditeur JSON. Ils vous permettent de:

* Fixer l'axe des Y à un intervalle donné
* Supprimer les valeurs aberrantes en spécifiant un pourcentage ou une valeur absolue pour supprimer les valeurs aberrantes
* Changer l'échelle de l'axe des y en passant de linéaire à log, sqrt ou échelle de puissance

Changez l'échelle de l'axe des ordonnées avec le bouton **Show Y-Axis Controls**:

{{< img src="graphing/index/y_axis_control.png" alt="y axis control" responsive="true" style="width:75%;" >}}

Il y a trois paramètres de configuration:

* `Min`/`max` (optionnel): Spécifie la valeur minimale (et/ou maximale) à afficher sur l'axe des ordonnées. Il faut au moins un nombre, ou "auto" pour le comportement par défaut.

* `Scale` (optionnel): Spécifie le type d'échelle. Les valeurs possibles sont:

    * *linear*: Une échelle linéaire (échelle par défaut)
    * *log*: Une échelle logarithmique
    * *pow*: Une échelle de puissance de 2 (2 est la valeur par défaut, mais peut être modifiée dans l'editeur json)
    * *sqrt*: Une échelle en racine carrée

* `Always include zero` (optionnel): Spécifie s'il faut toujours inclure zéro ou ajuster l'axe à la plage de données. La comportement par défaut est de toujours inclure  zéro.

Note: comme la fonction log logarithmique n'accepte pas les valeurs négatives, notre échelle log ne fonctionne que si les valeurs ont le même signe (tout> 0 ou tout <0). Sinon, un graphique vide est renvoyé.

### Superposer des événements pour un contexte supplémentaire

Ajoutez des événements du système associé pour ajouter encore plus de contexte à votre graphique. Un exemple consisterait à ajouter des validations Github, des déploiements Jenkins ou des événements de création Docker. Cliquez simplement sur le bouton Overlay Events et entrez une requête pour trouver et afficher vos événements.
Pour montrer quelque chose d'une source telle que Github, utilisez `sources: github`. Pour tous les événements avec le tag `role:web`, utilisez `tag:role:web`.

{{< img src="graphing/index/overlay_events.png" alt="Overlay Events" responsive="true" style="width:75%;" >}}

## Créez un titre

Si vous ne saisissez pas de titre, nous générons automatiquement un titre en fonction des sélections que vous avez effectuées. Mais il peut être plus utile aux utilisateurs du [dashboard][16] de créer un titre qui décrit plus précisément le but du graphique. Lier l'objectif technique aux avantages business ajoute encore plus de valeur.

## Sauvegardez

La dernière étape consiste à cliquer sur Save. Vous pourrez toujours revenir à l'éditeur et modifier le graphique en fonction de vos besoins.

[1]: /graphing/graphing_json/
[2]: https://app.datadoghq.com/metric/explorer/
[3]: https://app.datadoghq.com/metric/summary/
[4]: /graphing/dashboards/widgets/
[5]: /tagging/
[6]: /graphing/functions/
[7]: https://app.datadoghq.com/notebook/list
[8]: /graphing/dashboards
[9]: /graphing/#choose-the-metric-to-graph
[10]: /graphing/#select-your-visualization
[11]: /graphing/#filter
[12]: /graphing/#aggregate-and-rollup
[13]: /graphing/#advanced-graphing
[14]: /graphing/#graphs-enhancement
[15]: /graphing/#create-a-title
[16]: /graphing/dashboards