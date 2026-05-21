---
aliases:
- /fr/graphing/using_graphs/
description: Interroger vos données pour mieux les comprendre
further_reading:
- link: https://learn.datadoghq.com/courses/building-better-dashboards
  tag: Centre d'apprentissage
  text: Améliorer vos dashboards
title: Création de requêtes
---
## Aperçu {#overview}

Que vous utilisiez des métriques, des journaux, des traces, des moniteurs, des tableaux de bord, des carnets, etc., tous les graphiques dans Datadog ont la même fonctionnalité de base. Cette page décrit comment effectuer une requête à l'aide de l'éditeur graphique. Les utilisateurs avancés peuvent créer et modifier des graphiques avec JSON. Pour en savoir plus, consultez [Graphing with JSON][1].

Vous pouvez interroger en utilisant l'éditeur de graphique sur les pages Tableaux de bord ou Carnets, ou vous pouvez utiliser {{< ui >}}Quick Graphs{{< /ui >}} disponible sur n'importe quelle page. Ouvrez Graphiques rapides en appuyant sur `G` sur n'importe quelle page. Pour en savoir plus, consultez le [Guide des Graphiques rapides][2].

## Éditeur graphique {#graphing-editor}

Sur les widgets, ouvrez l'éditeur graphique en cliquant sur l'icône de crayon dans le coin supérieur droit. L'éditeur de graphiques dispose des onglets suivants :

* {{< ui >}}Share{{< /ui >}} : Intégrez le graphique sur n'importe quelle page web externe.
* {{< ui >}}JSON{{< /ui >}} : Un éditeur plus flexible, qui nécessite des connaissances en langage de définition de graphique.
* {{< ui >}}Edit{{< /ui >}} : L'onglet UI par défaut pour les options de graphique.

Lorsque vous ouvrez pour la première fois l'éditeur graphique, vous êtes sur l'onglet {{< ui >}}Edit{{< /ui >}}. Ici, vous pouvez utiliser l'interface utilisateur pour choisir la plupart des paramètres. Voici un exemple :

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Onglet d'édition graphique" style="width:100%;" >}}

## Configuration d'un graphique {#configuring-a-graph}

Pour configurer votre graphique sur un dashboard, suivez ce processus :

1. [Sélectionnez la visualisation](#select-your-visualization)
2. [Définissez la métrique](#define-the-metric)
3. [Filtrer votre métrique](#filter)
4. [Configurer l'agrégation temporelle](#configure-the-time-aggregation)
5. [Configurer l'agrégation spatiale](#configure-the-space-aggregation)
6. [Appliquer la fonction](#advanced-graphing)
7. [Intituler le graphique](#create-a-title)

### Sélectionnez votre visualisation {#select-your-visualization}

Sélectionnez votre visualisation à partir des [widgets][3] disponibles.

### Définir la métrique {#define-the-metric}

Choisissez la métrique à représenter graphiquement en la recherchant ou en la sélectionnant dans le menu déroulant à côté de {{< ui >}}Metric{{< /ui >}}. Si vous ne savez pas quelle métrique utiliser, le menu déroulant des métriques fournit des informations supplémentaires, y compris le `unit`, `type`, `interval`, `description`, `tags` et le nombre de `tag values`.

Vous pouvez également voir des indicateurs de source Datadog ou OpenTelemetry. Si votre environnement utilise les deux, vous pouvez utiliser le sélecteur {{< ui >}}Semantic Mode{{< /ui >}} de Datadog pour [Interroger les métriques Datadog et OpenTelemetry][18] dans un seul graphique.

{{< img src="dashboards/querying/metric_dropdown.png" alt="Menu déroulant de sélection de métriques" responsive="true" style="width:100%;">}}

Explorez vos métriques plus en détail depuis la page [Metrics Explorer][4] ou un [Notebook][5], ou consultez la liste des métriques sur la page [Metrics Summary][6].

### Filtrer {#filter}

Votre métrique choisie peut être filtrée par hôte ou par tag en utilisant le menu déroulant {{< ui >}}from{{< /ui >}} à droite de la métrique. Le filtre par défaut est *(partout)*.

{{< img src="dashboards/querying/filter-3.png" alt="Filtrez le graphique avec le champ 'from', en utilisant des variables de modèle et une logique booléenne" style="width:100%;" >}}

- Utilisez [le filtrage avancé][7] dans le menu déroulant `from` pour évaluer des requêtes filtrées par booléen ou par caractères génériques.
- Filtrer les requêtes dynamiquement, en utilisant des variables de modèle. Ajoutez le `$` avec la clé de tag et le graphique applique automatiquement le tag que vous choisissez dans le menu déroulant des variables de modèle. Pour plus d'informations, consultez la [documentation des variables de modèle][8].

Pour en savoir plus sur les tags, consultez la [documentation relative au tagging][9].

### Agrégation et regroupement {#aggregate-and-rollup}

#### Méthode d'agrégation {#aggregation-method}

La méthode d'agrégation est à côté du menu déroulant de filtre. La valeur par défaut est `avg by`, mais vous pouvez changer la méthode en `max by`, `min by` ou `sum by`. Dans la plupart des cas, la métrique a de nombreuses valeurs pour chaque intervalle de temps, provenant de nombreux hôtes ou instances. La méthode d'agrégation choisie détermine comment les métriques sont agrégées en une seule ligne.

#### Configurer l'agrégation temporelle {#configure-the-time-aggregation}

Quelles que soient les options choisies ci-dessus, il y a toujours une certaine agrégation des données en raison des contraintes de taille physique de la fenêtre contenant le graphique. Si une métrique est mise à jour chaque seconde, et que vous regardez 4 heures de données, vous avez besoin de 14 400 points pour tout afficher. Chaque graphique affiché a environ 300 points montrés à tout moment. Par conséquent, chaque point affiché à l'écran représente 48 points de données.

En pratique, les métriques sont collectées par l'Agent toutes les 15-20 secondes. Ainsi, les données d'une journée représentent 4 320 points de données. Si vous affichez les données d'une journée sur un seul graphique, Datadog regroupe automatiquement les données. Pour plus de détails sur l'agrégation temporelle, voir l'[Introduction aux métriques][10]. Voir la documentation sur le [Regroupement][11] pour en savoir plus sur les intervalles de regroupement et comment Datadog regroupe automatiquement les points de données.

Pour regrouper manuellement les données, utilisez la [fonction de regroupement][12]. Cliquez sur l'icône sigma pour ajouter une fonction et sélectionnez `rollup` dans le menu déroulant. Ensuite, choisissez comment vous souhaitez agréger les données et l'intervalle en secondes.

Cette requête crée une ligne unique représentant l'espace disque total disponible en moyenne sur l'ensemble des machines déployées, avec un intervalle de cumul des données de 1 minute :

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="Exemple de regroupement de la métrique system.disk.free sur toutes les machines." style="width:100%;">}}

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

Pour obtenir davantage d'information sur l'utilisation de la vue JSON, consultez la section [Graphiques JSON][1].

#### Configurer l'agrégation de l'espace {#configure-the-space-aggregation}

À côté du menu déroulant de la méthode d'agrégation, choisissez ce qui constitue une ligne ou un regroupement sur un graphique. Par exemple, si vous choisissez `host`, il y a une ligne pour chaque `host`. Chaque ligne est composée de la métrique sélectionnée sur un `host` particulier agrégée selon la méthode choisie.

De plus, vous pouvez cliquer sur les étiquettes dans le menu déroulant de la métrique utilisé pour [définir la métrique](#define-the-metric) afin de regrouper et d'agréger vos données.

### Requêtes imbriquées {#nested-queries}

La fonctionnalité de requêtes imbriquées de Datadog vous permet d'ajouter des couches supplémentaires d'agrégation temporelle et/ou spatiale sur les résultats des requêtes de métriques existantes. Cette capacité de requête avancée vous permet également de calculer des percentiles et des écarts types sur les résultats de requêtes agrégées de métriques de type count/rate/gauge et d'accéder à des requêtes de plus haute résolution sur des périodes historiques.

Pour plus d'informations, consultez la documentation sur les [requêtes imbriquées][13].


### Graphique avancé {#advanced-graphing}

En fonction de vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à la requête. Les exemples incluent les taux et les dérivées, le lissage, et d'autres. Voir la [liste des fonctions disponibles][14].

Datadog prend également en charge la possibilité de représenter graphiquement vos métriques, journaux, traces et autres sources de données avec diverses opérations arithmétiques. Utilisez : `+`, `-`, `/`, `*`, `min`, et `max` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe permet à la fois des valeurs entières et des opérations arithmétiques utilisant plusieurs métriques.

Pour représenter graphiquement les métriques séparément, utilisez la virgule (`,`). Par exemple, `a, b, c`.

**Remarque** : Les requêtes utilisant des virgules ne sont prises en charge que dans les visualisations, elles ne fonctionnent pas sur les moniteurs. Utilisez [opérateurs booléens][15] ou opérations arithmétiques pour combiner plusieurs métriques dans un moniteur.

#### Arithmétique des métriques utilisant un entier {#metric-arithmetic-using-an-integer}

Modifiez la valeur affichée d'une métrique sur un graphique en effectuant une opération arithmétique. Par exemple, pour visualiser le double d'une métrique spécifique, cliquez sur le lien {{< ui >}}Advanced...{{< /ui >}} dans l'éditeur graphique. Ensuite, entrez votre opération arithmétique dans la case `Formula`, dans ce cas : `a * 2` :

{{< img src="dashboards/querying/arithmetic_4.png" alt="Exemple de formule - multiplication" style="width:75%;" >}}

#### Arithmétique entre deux métriques {#arithmetic-between-two-metrics}

Visualisez le pourcentage d'une métrique en divisant une métrique par une autre. Par exemple :

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utilisez l'option {{< ui >}}Advanced...{{< /ui >}} dans l'éditeur de graphique et sélectionnez {{< ui >}}Add Query{{< /ui >}}. Chaque requête se voit attribuer une lettre par ordre alphabétique : la première métrique est représentée par `a`, la deuxième métrique est représentée par `b`, etc.

Ensuite, dans la case `Formula`, saisissez l'opération arithmétique (par exemple, `a / b`). Pour afficher uniquement la formule sur votre graphique, cliquez sur les cases à cocher à côté des métriques `a` et `b`.

{{< img src="dashboards/querying/arithmetic_5.png" alt="Exemple de formule - ratio" style="width:75%;" >}}

Voici un autre exemple montrant comment vous pouvez tracer le ratio entre `error` logs et `info` logs.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Exemple de formule - ratio de logs" style="width:75%;" >}}

**Remarque** : Les formules ne sont pas numérotées. L'arithmétique ne peut pas être effectuée entre des formules.

#### Minimum ou Maximum entre deux requêtes {#minimum-or-maximum-between-two-queries}
Voici un exemple utilisant l'opérateur `max` pour trouver l'utilisation maximale du CPU entre deux zones de disponibilité.

```text
max(system.cpu.user{availability-zone:eastus-1}, system.cpu.user{availability-zone:eastus-2})
```

{{< img src="dashboards/querying/minmax_metrics_example.png" alt="Exemple de formule pour 'max' montrant la valeur maximale de compte entre deux requêtes de métriques" style="width:75%;" >}}

De plus, vous pouvez également calculer le maximum (ou le minimum) entre deux requêtes sur différents produits. Voici un autre exemple utilisant l'opérateur `min` pour trouver le minimum entre les logs avec des statuts d'erreur et des statuts d'avertissement.

```text
min(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Exemple de formule pour 'min' montrant la valeur minimale de compte entre deux requêtes de logs." style="width:75%;" >}}

### Créer un alias {#create-an-alias}

Vous pouvez créer un alias personnalisé pour vos sources de données pour permettre à vos utilisateurs d'interpréter plus facilement les résultats du graphique.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personnalisé" style="width:75%;" >}}

### Créer un titre {#create-a-title}

Si vous n'entrez pas de titre, un titre est automatiquement généré en fonction de vos sélections. Cependant, il est recommandé de créer un titre qui décrit l'objectif du graphique.

### Enregistrer {#save}

Cliquez sur {{< ui >}}Done{{< /ui >}} pour enregistrer votre travail et quitter l'éditeur. Vous pouvez toujours revenir à l'éditeur pour modifier le graphique. Si vous apportez des modifications que vous ne souhaitez pas enregistrer, cliquez sur {{< ui >}}Cancel{{< /ui >}}.

## Options supplémentaires {#additional-options}

### Superpositions d'événements {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de séries temporelles montrant les taux d'erreur RUM avec des événements de déploiement superposés" style="width:100%;" >}}

Voir les corrélations d'événements en utilisant la section {{< ui >}}Event Overlays{{< /ui >}} dans l'éditeur de graphiques pour la visualisation [Séries temporelles][16]. Dans le champ de recherche, entrez tout texte ou requête de recherche structurée. La recherche d'événements utilise la [syntaxe de recherche des journaux][17].

La superposition d'événements prend en charge toutes les sources de données. Cela permet de corréler plus facilement les événements métier avec les données de tout service Datadog.

Avec la superposition d'événements, vous pouvez rapidement voir comment les actions au sein de l'organisation impactent la performance des applications et de l'infrastructure. Voici quelques exemples de cas d'utilisation :
- Taux d'erreur RUM avec des événements de déploiement superposés
- Corréler l'utilisation du CPU avec des événements liés à la mise en service de serveurs supplémentaires
- Corréler le trafic sortant avec une activité de connexion suspecte
- Corréler toutes les données de séries temporelles avec des alertes de surveillance pour s'assurer que Datadog a été configuré avec les alertes appropriées


### Graphique divisé {#split-graph}

Les graphiques partagés vous permettent de visualiser des représentations d'une métrique en fonction de différents tags.

{{< img src="dashboards/querying/split_graph_beta.png" alt="Voir les graphiques divisés de container.cpu.usage dans le widget en plein écran" style="width:100%;" >}}

1. Accédez à cette fonctionnalité via l'onglet {{< ui >}}Split Graph{{< /ui >}} lors de la visualisation des graphiques.
1. Vous pouvez changer la métrique {{< ui >}}sort by{{< /ui >}} pour voir la relation entre les données que vous affichez et d'autres métriques.
1. Limitez le nombre de graphiques affichés en modifiant la valeur {{< ui >}}limit to{{< /ui >}}.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/graphing_json/
[2]: /fr/dashboards/guide/quick-graphs/
[3]: /fr/dashboards/widgets/
[4]: https://app.datadoghq.com/metric/explorer
[5]: https://app.datadoghq.com/notebook/list
[6]: https://app.datadoghq.com/metric/summary
[7]: /fr/metrics/advanced-filtering/
[8]: /fr/dashboards/template_variables/
[9]: /fr/getting_started/tagging/
[10]: /fr/metrics/#time-aggregation
[11]: /fr/dashboards/functions/rollup/#rollup-interval-enforced-vs-custom
[12]: /fr/dashboards/functions/rollup/
[13]: /fr/metrics/nested_queries/
[14]: /fr/dashboards/functions/#function-types
[15]: /fr/metrics/advanced-filtering/#boolean-filtered-queries
[16]: /fr/dashboards/widgets/timeseries/#event-overlay
[17]: /fr/logs/explorer/search_syntax/
[18]: /fr/metrics/open_telemetry/query_metrics