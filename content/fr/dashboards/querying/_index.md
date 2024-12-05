---
aliases:
- /fr/graphing/using_graphs/
description: Interroger vos données pour mieux les comprendre
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centre d'apprentissage
  text: Améliorer vos dashboards
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

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Onglet Edit d'un graphique" style="width:100%;" >}}

## Configuration d'un graphique

Pour configurer votre graphique sur un dashboard, suivez ce processus :

1. [Sélectionner la visualisation](#selectionner-votre-visualisation)
2. [Définir la métrique](#definir-la-metrique)
3. [Filtrer votre métrique](#filtrer)
4. [Configurer l'agrégation temporelle](#configurer-l-agregation-temporelle)
5. [Configurer l'agrégation spatiale](#configurer-l-agregation-spatiale)
6. [Appliquer une fonction](#creer-des-graphiques-avances)
7. [Donner un titre au graphique](#creer-un-titre)

### Sélectionner votre visualisation

Sélectionnez votre visualisation à partir des [widgets][3] disponibles.

### Définir la métrique

Choisissez la métrique à représenter en la recherchant ou en la sélectionnant dans la liste déroulante à côté de **Metric**. Si vous ne savez pas quelle métrique utiliser, la liste déroulante de métriques fournit des informations supplémentaires, y compris `unit`, `type`, `interval`, `description`, `tags` et le nombre de `tag values`. 

{{< img src="dashboards/querying/metric_dropdown.png" alt="Liste déroulante de sélection de métriques" responsive="true" style="width:100%;">}}

Explorez vos métriques plus en détail depuis la page [Metrics Explorer][4] ou un [Notebook][5], ou consultez la liste des métriques sur la page [Metrics Summary][6].

### Filtrer

La métrique choisie peut être filtrée en fonction d'un host ou d'un tag à l'aide du menu déroulant **from** à droite de la métrique. Le filtre par défaut est *(everywhere)*.

{{< img src="dashboards/querying/filter-3.png" alt="Filtrer le graphique avec le champ 'from', à l'aide de template variables et d'une logique booléenne" style="width:100%;" >}}

- Utilisez le [filtrage avancé][7] dans le menu déroulant `from` pour évaluer les requêtes avec des filtres basés sur un opérateur booléen ou des wildcards.
- Filtrez de façon dynamique des requêtes grâce aux template variables. Ajoutez le caractère `$` devant la clé d'un tag pour filtrer automatiquement le graphique en fonction du tag sélectionné dans la liste déroulante des template variables. Pour en savoir plus, consultez la section [Template variables][16].

Pour en savoir plus sur les tags, consultez la [documentation relative au tagging][8].

### Agréger et cumuler des données

#### Méthode d'agrégation

La méthode d'agrégation est indiquée à côté de la liste déroulante du filtre. La méthode par défaut est `avg by`, mais vous pouvez la définir sur `max by`, `min by` ou `sum by`. Dans la plupart des cas, la métrique possède de nombreuses valeurs issues d'un grand nombre de hosts ou d'instances pour chaque intervalle de temps. La méthode d'agrégation choisie détermine comment les valeurs de la métrique sont agrégées en une seule ligne.

#### Configurer l'agrégation temporelle

Indépendamment des options précédemment choisies, en raison des contraintes de taille physique de la fenêtre du graphique, les données font toujours l'objet d'une certaine agrégation. Si une métrique est mise à jour toutes les secondes et que vous consultez 4 heures de données, vous avez besoin d'afficher 14 400 points pour tout représenter. Chaque graphique illustre environ 300 points à la fois. Ainsi, chaque point de données affiché à l'écran représente 48 points de données.

Dans la pratique, les métriques sont recueillies par l'Agent toutes les 15 à 20 secondes. Ainsi, un jour de données représente 4 320 points. Si vous représentez les données d'un jour entier sur un seul graphique, les données sont automatiquement cumulées par Datadog. Pour en savoir plus sur l'agrégation temporelle, consultez la page [Présentation des métriques][9]. Consultez la documentation sur la fonction [Rollup][10] pour en savoir plus sur les intervalles de cumul et découvrir comment Datadog effectue automatiquement un cumul des points de données.

Pour cumuler manuellement les données, utilisez la [fonction rollup][11]. Cliquez sur l'icône Sigma pour ajouter une fonction et sélectionnez `rollup` dans le menu déroulant. Choisissez ensuite la méthode d'agrégation de vos données ainsi que l'intervalle en secondes.

Cette requête crée une ligne unique représentant l'espace disque total disponible en moyenne sur l'ensemble des machines déployées, avec un intervalle de cumul des données de 1 minute :

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="Exemple d'utilisation de la fonction rollup sur la métrique system.disk.free sur toutes les machines" style="width:100%;">}}

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

#### Configurer l'agrégation spatiale

Après la méthode d'agrégation, vous pouvez déterminer ce qui constitue une ligne ou un groupe dans un graphique. Par exemple, si vous choisissez `host`, une ligne apparaîtra pour chaque `host`. Chaque ligne représente la métrique sélectionnée pour un `host` spécifique, ses valeurs étant agrégées selon la méthode choisie.

En outre, vous pouvez cliquer sur les tags dans la liste déroulante utilisée pour [définir la métrique](#definir-la-metrique) afin de regrouper et d'agréer vos données.

### Créer des graphiques avancés

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à votre requête. Vous pouvez par exemple calculer les taux et les dérivées, appliquer un lissage, et plus encore. Référez-vous à la [liste des fonctions disponibles][12].

Datadog vous permet également de représenter graphiquement vos métriques, logs, traces et autres sources de données avec différentes opérations arithmétiques. Utilisez les options `+`, `-`, `/`, `*`, `min`, and `max` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe accepte à la fois des nombres entiers et des opérations arithmétiques sur plusieurs métriques.

Pour représenter les métriques séparément, ajoutez une virgule (`,`). Par exemple, `a, b, c`.

**Remarque** : les requêtes utilisant des virgules sont uniquement prises en charge dans les visualisations et ne fonctionnent pas sur les monitors. Utilisez des [opérateurs booléens][13] ou des opérations arithmétiques pour combiner plusieurs métriques dans un monitor.

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

#### Minimum ou maximum entre deux requêtes
Voici un exemple utilisant l'opérateur `max` pour trouver l'utilisation maximale du processeur entre deux zones de disponibilité.  

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2}) 
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="Exemple de formule pour 'max' affichant la valeur maximale entre deux requêtes de métriques" style="width:75%;" >}}

En outre, vous pouvez également calculer le maximum (ou le minimum) entre deux requêtes portant sur des produits différents. Voici un autre exemple utilisant l'opérateur `min` pour trouver le minimum entre des logs avec des statuts d'erreur et des statuts d'avertissement.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Exemple de formule pour 'min' affichant la valeur minimale entre deux requêtes de logs" style="width:75%;" >}}

### Créer un alias

Vous pouvez créer un alias personnalisé pour vos sources de données pour permettre à vos utilisateurs d'interpréter plus facilement les résultats du graphique.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personnalisé" style="width:75%;" >}}

### Créer un titre

Si vous ne saisissez pas de titre, Datadog en génère un automatiquement en fonction de vos sélections. Nous vous conseillons toutefois de définir un titre qui décrit précisément l'objectif du graphique.

### Enregistrer

Cliquez sur **Done** pour enregistrer votre travail et quitter l'éditeur. Vous pourrez toujours revenir à l'éditeur pour modifier le graphique. Si vous ne souhaitez pas enregistrer les modifications effectuées, cliquez sur **Cancel**.

## Options supplémentaires

### Superposition d'événements

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widget Série temporelle affichant les taux d'erreurs RUM avec les événements de déploiement en superposition" style="width:100%;" >}}

Identifiez les corrélations avec vos événements à l'aide de la section **Event Overlays** dans l'éditeur de graphiques pour la visualisation de [Séries temporelles][15]. Dans la barre de recherche, saisissez du texte ou une requête de recherche structurée. La recherche d'événements utilise la [syntaxe de recherche de logs][14].

La superposition d'événements prend en charge toutes les sources de données. Vous pouvez ainsi facilement mettre en corrélation les événements au sein de votre entreprise avec les données de n'importe quel service Datadog.

La superposition d'événements vous permet de déterminer rapidement comment les actions effectuées au sein de votre organisation affectent les performances de vos applications et de votre infrastructure. Voici quelques exemples de cas d'utilisation :
- Affichage des taux d'erreurs RUM avec les événements de déploiement superposés
- Mise en corrélation de la charge CPU avec les événements associés au provisionnement de serveurs supplémentaires
- Mise en corrélation du trafic de sortie avec les activités de connexion suspectes
- Mise en corrélation des données de séries temporelles avec les alertes de monitor pour vérifier que les alertes appropriées ont bien été configurées dans Datadog


### Graphique partagé

Les graphiques partagés vous permettent de visualiser des représentations d'une métrique en fonction de différents tags.

{{< img src="dashboards/querying/split_graph_beta.png" alt="Graphiques partagés de la métrique dans le widget plein écran" style="width:100%;" >}}

1. Pour accéder à cette fonctionnalité, cliquez sur l'onglet **Split Graph** lorsque vous visualisez un graphique.
1. Utilisez le champ *sort by* pour modifier la métrique de tri et visualiser la relation entre les données représentées sur le graphique et d'autres métriques.
1. Pour limiter le nombre de graphique affichés, modifiez la valeur du champ *limit to*.

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
[9]: /fr/metrics/#time-aggregation
[10]: /fr/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[11]: /fr/dashboards/functions/rollup/
[12]: /fr/dashboards/functions/#function-types
[13]: /fr/metrics/advanced-filtering/#boolean-filtered-queries
[14]: /fr/logs/explorer/search_syntax/
[15]: /fr/dashboards/widgets/timeseries/#event-overlay
[16]: /fr/dashboards/template_variables/