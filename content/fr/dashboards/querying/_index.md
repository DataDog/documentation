---
aliases:
- /fr/graphing/using_graphs/
description: Interroger vos données pour mieux les comprendre
further_reading:
- link: https://learn.datadoghq.com/course/view.php?id=8
  tag: Centre d'apprentissage
  text: Améliorer vos dashboards
kind: documentation
title: Requêtes
---

## Présentation

Que vous utilisiez les métriques, les logs, les traces, les monitors, les dashboards ou encore les notebooks, tous les graphiques Datadog offrent les mêmes fonctionnalités de base. Cette page décrit comment créer des requêtes avec l'éditeur de graphiques. Les utilisateurs avancés peuvent également créer et modifier des graphiques avec JSON. Pour en savoir plus, consultez la section [Graphiques JSON][1].

Vous pouvez créer des requêtes à l'aide de l'éditeur de graphiques sur les pages Dashboards ou Notebooks, ou utiliser les **graphiques rapides** disponibles sur n'importe quelle page. Ouvrez des graphiques rapides en appuyant sur `G` sur n'importe quelle page. Pour en savoir plus, consultez le [guide sur les graphiques rapides][2].

## Éditeur de graphiques

Depuis les widgets, ouvrez l'éditeur de graphiques en cliquant sur l'icône en forme de crayon en haut à droite. L'éditeur de graphiques présente les onglets suivants :

* **Share** : permet d'intégrer le graphique à n'importe quelle page Web externe.
* **JSON** : un éditeur plus flexible. Il est cependant nécessaire de connaître le langage de définition de graphiques pour l'utiliser.
* **Edit** : l'onglet par défaut avec les options de création de graphique.

Lorsque vous ouvrez l'éditeur de graphiques pour la première fois, vous accédez à l'onglet **Edit**. De là, vous pouvez utiliser l'interface pour définir la plupart des paramètres. Voici un exemple :

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Onglet Edit des graphiques" style="width:75%;" >}}

## Configuration d'un graphique

Pour configurer votre graphique sur un dashboard, suivez ce processus :

1. [Sélectionner la visualisation](#selectionner-votre-visualisation)
2. [Choisir la métrique à représenter](#choisir-la-metrique-a-representer)
3. [Filtrer](#filtrer)
4. [Agréger et cumuler des données](#agreger-et-cumuler-des-donnees)
5. [Appliquer des fonctions supplémentaires](#creer-des-graphiques-avances)
6. [Donner un titre au graphique](#creer-un-titre)

### Sélectionner votre visualisation

Sélectionnez votre visualisation à partir des [widgets][3] disponibles.

### Choisir la métrique à représenter

Choisissez la métrique à représenter en la recherchant ou en la sélectionnant dans la liste déroulante à côté de **Metric**. Si vous ne savez pas quelle métrique utiliser, la liste déroulante de métriques fournit des informations supplémentaires, y compris `unit`, `type`, `interval`, `description`, `tags` et le nombre de `tag values`. 

{{< img src="dashboards/querying/metric_dropdown.png" alt="Liste déroulante de sélection de métriques" responsive="true" style="width:75%;">}}

Explorez vos métriques plus en détail depuis la page [Metrics Explorer][4] ou un [Notebook][5], ou consultez la liste des métriques sur la page [Metrics Summary][6].

### Filtrer

La métrique choisie peut être filtrée en fonction d'un host ou d'un tag à l'aide du menu déroulant **from** à droite de la métrique. Le filtre par défaut est *(everywhere)*.

{{< img src="dashboards/querying/filter-2.png" alt="Filtre sur un graphique" style="width:75%;" >}}

Vous pouvez également utiliser le [filtrage avancé][7] dans le menu déroulant `from` pour évaluer les requêtes avec des filtres basés sur un opérateur booléen ou des wildcards, comme suit :

{{< img src="dashboards/querying/booleanfilters.png" alt="Création d'un graphique avec filtres booléens" style="width:75%;" >}} 

Pour en savoir plus sur les tags, consultez la [documentation relative au tagging][8].

### Agréger et cumuler des données

#### Méthode d'agrégation

La méthode d'agrégation est indiquée à côté de la liste déroulante du filtre. La méthode par défaut est `avg by`, mais vous pouvez la définir sur `max by`, `min by` ou `sum by`. Dans la plupart des cas, la métrique possède de nombreuses valeurs issues d'un grand nombre de hosts ou d'instances pour chaque intervalle de temps. La méthode d'agrégation choisie détermine comment les valeurs de la métrique sont agrégées en une seule ligne.

#### Groupes d'agrégation

Après la méthode d'agrégation, vous pouvez déterminer ce qui constitue une ligne ou un groupe dans un graphique. Par exemple, si vous choisissez `host`, une ligne apparaîtra pour chaque `host`. Chaque ligne représente la métrique sélectionnée pour un `host` spécifique, ses valeurs étant agrégées selon la méthode choisie.

En outre, vous pouvez cliquer sur les tags dans la liste déroulante utilisée pour [choisir la métrique](#choisir-la-metrique-a-representer) afin de regrouper et d'agréer vos données.

#### Agréger vos données au fil du temps avec la fonction rollup

Indépendamment des options précédemment choisies, en raison des contraintes de taille physique de la fenêtre du graphique, les données font toujours l'objet d'une certaine agrégation. Si une métrique est mise à jour toutes les secondes et que vous consultez 4 heures de données, vous avez besoin d'afficher 14 400 points pour tout représenter. Chaque graphique illustre environ 300 points à la fois. Ainsi, chaque point de données affiché à l'écran représente 48 points de données.

Dans la pratique, les métriques sont recueillies par l'Agent toutes les 15 à 20 secondes. Ainsi, un jour de données représente 4 320 points. Si vous représentez les données d'un jour entier sur un seul graphique, les données sont automatiquement cumulées par Datadog. Pour en savoir plus, consultez la page [Présentation des métriques][9].

Pour cumuler manuellement les données, utilisez la [fonction rollup][10]. Cliquez sur le signe « + » à droite du groupe d'agrégation et choisissez `rollup` dans la liste déroulante. Choisissez ensuite la méthode d'agrégation de vos données ainsi que l'intervalle en secondes.

Cette requête crée une ligne unique représentant l'espace disque total disponible en moyenne sur l'ensemble des machines déployées, avec un intervalle de cumul des données de 1 minute :

{{< img src="dashboards/querying/references-graphing-rollup-example-2.png" alt="exemple de cumul" style="width:90%;">}}

Lorsque vous passez à la vue JSON, voici à quoi ressemble la requête :

```text
"query": "avg:system.disk.free{*}.rollup(avg, 60)"
```

Le JSON complet ressemble à ce qui suit :

```text
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.disk.free{*}.rollup(avg, 60)"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

Pour obtenir davantage d'informations sur l'utilisation de la vue JSON, consultez la section [Graphiques JSON][1].

### Créer des graphiques avancés

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à votre requête. Vous pouvez par exemple calculer les taux et les dérivées, appliquer un lissage, et plus encore. Consultez la [liste des fonctions disponibles][11].

Datadog vous permet également de représenter graphiquement vos métriques, logs, traces et autres sources de données avec différentes opérations arithmétiques. Utilisez les options `+`, `-`, `/`, et `*` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe accepte à la fois des nombres entiers et des opérations arithmétiques sur plusieurs métriques.

Pour représenter les métriques séparément, ajoutez une virgule (`,`). Par exemple, `a, b, c`.

**Remarque** : les requêtes utilisant des virgules sont uniquement prises en charge dans les visualisations et ne fonctionnent pas sur les monitors. Utilisez des [opérateurs booléens][12] ou des opérations arithmétiques pour combiner plusieurs métriques dans un monitor.

#### Opérations arithmétiques avec un entier

Modifiez la valeur affichée pour une métrique sur un graphique en effectuant une opération arithmétique. Par exemple, vous pouvez visualiser le double d'une métrique spécifique en cliquant sur le lien **Advanced...** de l'éditeur de graphiques. Saisissez ensuite votre opération arithmétique dans la case `Formula`, à savoir ici : `a * 2`.

{{< img src="dashboards/querying/arithmetic_4.png" alt="Exemple de formule - multiplication" style="width:75%;" >}}

#### Opération arithmétique entre deux métriques

Visualisez le pourcentage d'une métrique en divisant une métrique par une autre. Par exemple :

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utilisez l'option **Advanced...** sur l'éditeur de graphiques et sélectionnez **Add Query**. Chaque requête se voit attribuer une lettre dans l'ordre alphabétique : la première métrique est représentée par `a`, la seconde par `b`, etc.

Ensuite, saisissez l'opération arithmétique dans la zone `Formula` (`a / b` pour cet exemple). Pour afficher uniquement la formule sur votre graphique, cliquez sur les coches à côté des métriques `a` et `b`.

{{< img src="dashboards/querying/arithmetic_5.png" alt="Exemple de formule - rapport" style="width:75%;" >}}

Voici un autre exemple illustrant comment vous pouvez représenter graphiquement le rapport entre les logs `error` et les logs `info`.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Exemple de formule - rapport de logs" style="width:75%;" >}}

**Remarque** : les formules ne sont pas représentées par des lettres. Vous ne pouvez donc pas effectuer d'opérations arithmétiques entre plusieurs formules.

### Créer un alias

Vous pouvez créer un alias personnalisé pour vos sources de données pour permettre à vos utilisateurs d'interpréter plus facilement les résultats du graphique.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personnalisé" style="width:75%;" >}}

### Créer un titre

Si vous ne saisissez pas de titre, Datadog en génère un automatiquement en fonction de vos sélections. Nous vous conseillons toutefois de définir un titre qui décrit précisément l'objectif du graphique.

### Enregistrer

Cliquez sur **Done** pour enregistrer votre travail et quitter l'éditeur. Vous pourrez toujours revenir à l'éditeur pour modifier le graphique. Si vous ne souhaitez pas enregistrer les modifications effectuées, cliquez sur **Cancel**.

## Configuration d'un graphique de statistiques APM

Pour configurer votre graphique à l'aide des données statistiques de l'APM, suivez ces étapes :

1. [Sélectionner votre visualisation](#selectionner-votre-visualisation) (procédure identique à celle des métriques)
2. [Choisir votre niveau de détail](#niveau-de-detail)
3. [Choisir vos paramètres](#parametres-des-statistiques-de-l-APM)
4. [Donner un titre au graphique](#creer-un-titre) (procédure identique à celle des métriques)

### Niveau de détail
Choisissez le niveau de détail pour lequel vous souhaitez visualiser des statistiques : services, ressources ou spans. Tous les niveaux de détail ne sont pas disponibles pour chaque type de widget.

### Paramètres des statistiques de l'APM
Sélectionnez les paramètres suivants depuis l'éditeur de graphiques : Environnement (`env`), Tag primaire (`primary_tag`), Service (`service`) et Nom de l'opération (`name`).

Si le niveau de détail choisi correspond à une ressource ou à une span, vous devrez également sélectionner un Nom de ressource (`resource`) pour certains types de widget afin d'affiner le contexte de votre requête.

## Options supplémentaires

### Superposition d'événements

Identifiez les corrélations avec vos événements à l'aide de la section **Event Overlays** dans l'éditeur de graphiques. Dans la barre de recherche, saisissez du texte ou une requête de recherche structurée. Pour en savoir plus sur les recherches, consultez la documentation sur le [langage de requête d'événement][13] de Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/graphing_json/
[2]: /fr/dashboards/guide/quick-graphs/
[3]: /fr/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /fr/metrics/advanced-filtering/
[8]: /fr/getting_started/tagging/
[9]: /fr/metrics/introduction/
[10]: /fr/dashboards/functions/rollup/
[11]: /fr/dashboards/functions/#apply-functions-optional
[12]: /fr/metrics/advanced-filtering/#boolean-filtered-queries
[13]: /fr/events/#event-query-language