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
## Présentation {#overview}

Que vous utilisiez des métriques, des logs, des traces, des monitors, des dashboards, des notebooks, etc., tous les graphiques dans Datadog ont la même fonctionnalité de base. Cette page explique comment effectuer des requêtes avec l'éditeur graphique. Les utilisateurs avancés peuvent créer et modifier des graphiques au format JSON. Pour en savoir plus, consultez [Graphiques JSON][1].

Vous pouvez effectuer des requêtes en utilisant l'éditeur de graphique sur les pages Dashboards ou Notebooks, ou vous pouvez utiliser {{< ui >}}Quick Graphs{{< /ui >}} disponible sur n'importe quelle page. Ouvrez Quick Graphs en appuyant sur `G` sur n'importe quelle page. Pour en savoir plus, consultez le [guide de Quick Graphs][2].

## Éditeur de graphique {#graphing-editor}

Sur les widgets, ouvrez l'éditeur de graphique en cliquant sur l'icône en forme de crayon dans le coin supérieur droit. L'éditeur de graphiques dispose des onglets suivants :

* {{< ui >}}Share{{< /ui >}} : Intégrez le graphique sur n'importe quelle page web externe.
* {{< ui >}}JSON{{< /ui >}} : Un éditeur plus flexible, qui nécessite de connaître le langage de définition des graphiques.
* {{< ui >}}Edit{{< /ui >}} : L'onglet d'interface utilisateur par défaut pour les options de graphique.

Lorsque vous ouvrez l'éditeur de graphique pour la première fois, vous êtes sur l'onglet {{< ui >}}Edit{{< /ui >}}. Ici, vous pouvez utiliser l'interface utilisateur pour choisir la plupart des paramètres. Voici un exemple :

{{< img src="dashboards/querying/references-graphing-edit-window-with-y-2.png" alt="Onglet d'édition de graphique" style="width:100%;" >}}

## Configuration d'un graphique {#configuring-a-graph}

Pour configurer votre graphique sur un dashboard, suivez ce processus :

1. [Sélectionnez la visualisation](#select-your-visualization)
2. [Définissez la métrique](#define-the-metric)
3. [Filtrez votre métrique](#filter)
4. [Configurez l'agrégation temporelle](#configure-the-time-aggregation)
5. [Configurez l'agrégation spatiale](#configure-the-space-aggregation)
6. [Appliquez une fonction](#advanced-graphing)
7. [Donnez un titre au graphique](#create-a-title)

### Sélectionnez votre visualisation {#select-your-visualization}

Sélectionnez votre visualisation à partir des [widgets][3] disponibles.

### Définissez la métrique {#define-the-metric}

Choisissez la métrique à représenter graphiquement en la recherchant ou en la sélectionnant dans le menu déroulant à côté de {{< ui >}}Metric{{< /ui >}}. Si vous ne savez pas quelle métrique utiliser, le menu déroulant des métriques fournit des informations supplémentaires, notamment le `unit`, `type`, `interval`, `description`, `tags` et le nombre de `tag values`.

Vous pouvez également voir des indicateurs de source Datadog ou OpenTelemetry. Si votre environnement utilise les deux, vous pouvez utiliser le modificateur de requête [Telemetry source][19] de Datadog pour [Interroger les métriques Datadog et OpenTelemetry][18] dans un seul graphique.

{{< img src="dashboards/querying/metric_dropdown.png" alt="Menu déroulant de sélection des métriques" responsive="true" style="width:100%;">}}

Explorez vos métriques plus en détail depuis la page [Metrics Explorer][4] ou un [Notebook][5], ou consultez la liste des métriques sur la page [Metrics Summary][6].

### Filtrer {#filter}

Votre métrique choisie peut être filtrée par host ou par tag en utilisant le menu déroulant {{< ui >}}from{{< /ui >}} à droite de la métrique. Le filtre par défaut est *(partout)*.

{{< img src="dashboards/querying/filter-3.png" alt="Filtrez le graphique à l'aide du champ « from », de variables de modèle et de la logique booléenne" style="width:100%;" >}}

- Utilisez le [filtrage avancé][7] dans le menu déroulant `from` pour évaluer des requêtes filtrées selon une logique booléenne ou à l'aide de caractères génériques.
- Filtrez les requêtes dynamiquement à l'aide de variables de modèle. Ajoutez le `$` avec la clé de tag et le graphique applique automatiquement le tag que vous choisissez dans le menu déroulant des variables de modèle. Pour plus d'informations, consultez la [documentation sur les variables de modèle][8].

Pour en savoir plus sur les tags, consultez la [documentation relative au tagging][9].

### Agrégation et rollup {#aggregate-and-rollup}

#### Méthode d'agrégation {#aggregation-method}

La méthode d'agrégation se trouve à côté du menu déroulant de filtre. Celle-ci est définie par défaut sur `avg by`, mais vous pouvez changer la méthode pour `max by`, `min by` ou `sum by`. Dans la plupart des cas, la métrique possède de nombreuses valeurs pour chaque intervalle de temps, provenant de nombreux hosts ou instances. La méthode d'agrégation choisie détermine comment les métriques sont agrégées en une seule ligne.

#### Configurez l'agrégation temporelle {#configure-the-time-aggregation}

Indépendamment des options choisies ci-dessus, il existe toujours une certaine agrégation des données en raison des contraintes de taille physique de la fenêtre contenant le graphique. Si une métrique est mise à jour chaque seconde et que vous examinez 4 heures de données, vous avez besoin de 14,400 points pour tout afficher. Chaque graphique affiché présente environ 300 points à tout moment. Par conséquent, chaque point affiché à l'écran représente 48 points de données.

En pratique, les métriques sont collectées par l'Agent toutes les 15 à 20 secondes. Ainsi, une journée de données représente 4,320 points de données. Si vous affichez une journée de données sur un seul graphique, Datadog effectue automatiquement un rollup des données. Pour plus de détails sur l'agrégation temporelle, consultez l'[Introduction aux métriques][10]. Consultez la documentation sur le [Rollup][11] pour en savoir plus sur les intervalles de rollup et sur la façon dont Datadog effectue automatiquement un rollup des points de données.

Pour effectuer manuellement un rollup des données, utilisez la [fonction rollup][12]. Cliquez sur l'icône sigma pour ajouter une fonction et sélectionnez `rollup` dans le menu déroulant. Choisissez ensuite comment vous souhaitez agréger les données et l'intervalle en secondes.

Cette requête crée une ligne unique représentant l'espace disque total disponible en moyenne sur l'ensemble des machines déployées, avec un intervalle de cumul des données de 1 minute :

{{< img src="dashboards/querying/references-graphing-rollup-example-minutes.png" alt="exemple de rollup de la métrique system.disk.free sur toutes les machines" style="width:100%;">}}

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

#### Configurez l'agrégation spatiale {#configure-the-space-aggregation}

À côté du menu déroulant de la méthode d'agrégation, choisissez ce qui constitue une ligne ou un regroupement sur un graphique. Par exemple, si vous choisissez `host`, il y a une ligne pour chaque `host`. Chaque ligne est composée de la métrique sélectionnée sur un `host` particulier, agrégée en utilisant la méthode choisie.

De plus, vous pouvez cliquer sur les tags dans le menu déroulant des métriques utilisé pour [définir la métrique](#define-the-metric) afin de regrouper et d'agréger vos données.

### Requêtes imbriquées {#nested-queries}

La fonctionnalité de requêtes imbriquées de Datadog vous permet d'ajouter des couches supplémentaires d'agrégation temporelle et/ou spatiale sur les résultats de requêtes de métriques existantes. Cette capacité de requête avancée vous permet également de calculer des centiles et des écarts-types sur les résultats de requêtes agrégées de métriques de type nombre/taux/jauge, et d'accéder à des requêtes à plus haute résolution sur des périodes historiques.

Pour plus d'informations, consultez la documentation sur les [requêtes imbriquées][13].


### Graphiques avancés {#advanced-graphing}

Selon vos besoins d'analyse, vous pouvez choisir d'appliquer d'autres fonctions mathématiques à la requête. Les exemples incluent les taux et les dérivées, le lissage et d'autres encore. Consultez la [liste des fonctions disponibles][14].

Datadog prend également en charge la possibilité de représenter graphiquement vos métriques, logs, traces et autres sources de données avec diverses opérations arithmétiques et fonctions de comparaison. Utilisez `+`, `-`, `/`, `*`, `minimum()` et `maximum()` pour modifier les valeurs affichées sur vos graphiques. Cette syntaxe permet d'utiliser aussi bien des valeurs entières que des opérations arithmétiques sur plusieurs métriques.

Pour représenter les métriques séparément, utilisez la virgule (`,`). Par exemple, `a, b, c`.

**Remarque** : les requêtes utilisant des virgules ne sont prises en charge que dans les visualisations ; elles ne fonctionnent pas sur les monitors. Utilisez des [opérateurs booléens][15] ou des opérations arithmétiques pour combiner plusieurs métriques dans un monitor.

{{% collapse-content title="Opération arithmétique pour une métrique utilisant un nombre entier" level="h4" %}}

Modifiez la valeur affichée d'une métrique sur un graphique en effectuant une opération arithmétique. Par exemple, pour visualiser le double d'une métrique spécifique, cliquez sur le lien {{< ui >}}Advanced...{{< /ui >}} dans l'éditeur de graphique. Saisissez ensuite votre calcul arithmétique dans la zone `Formula` ; dans ce cas : `a * 2` :

{{< img src="dashboards/querying/arithmetic_4.png" alt="Exemple de formule : multiplication" style="width:75%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="Opération arithmétique entre deux métriques" level="h4" %}}

Visualisez le pourcentage d'une métrique en divisant une métrique par une autre. Par exemple :

```text
jvm.heap_memory / jvm.heap_memory_max
```

Utilisez l'option {{< ui >}}Advanced...{{< /ui >}} dans l'éditeur de graphique et sélectionnez {{< ui >}}Add Query{{< /ui >}}. Chaque requête se voit attribuer une lettre par ordre alphabétique : la première métrique est représentée par `a`, la deuxième métrique est représentée par `b`, etc.

Ensuite, dans la zone `Formula`, saisissez l'opération arithmétique (`a / b` pour cet exemple). Pour afficher uniquement le résultat de la formule, consultez [Masquer une requête de la visualisation](#hide-a-query-from-the-visualization).

{{< img src="dashboards/querying/arithmetic_5.png" alt="Exemple de formule - ratio" style="width:75%;" >}}

Voici un autre exemple montrant comment vous pouvez représenter graphiquement le ratio entre les logs `error` et les logs `info`.

```text
status:error / status:info
```

{{< img src="dashboards/querying/arithmetic_6.png" alt="Exemple de formule - ratio de logs" style="width:75%;" >}}

**Remarque** : les formules ne sont pas désignées par des lettres. On ne peut pas effectuer d'opérations arithmétiques entre des formules.
{{% /collapse-content %}}

#### Masquer une requête de la visualisation {#hide-a-query-from-the-visualization}

Lorsqu'un widget comporte plusieurs requêtes et une formule, vous pouvez masquer des requêtes individuelles afin que seul le résultat de la formule apparaisse sur le graphique. Cliquez sur l'étiquette portant la lettre de la requête pour afficher ou masquer celle-ci sur le graphique. Une étiquette bleue indique que la requête est affichée ; une étiquette grise indique qu'elle est masquée. La requête masquée est toujours utilisée dans le calcul de la formule.

{{% collapse-content title="Minimum ou maximum entre deux requêtes" level="h5" %}}

Utilisez `minimum()` et `maximum()` pour comparer deux requêtes point par point et renvoyer la valeur inférieure ou supérieure à chaque horodatage.

**Remarque** : L'utilisation de `min()` et `max()` pour la comparaison arithmétique est obsolète. Utilisez `minimum()` et `maximum()` à la place. Cette obsolescence s'applique uniquement à la syntaxe de comparaison arithmétique. Les méthodes d'agrégation telles que `min by`, `max by` et l'agrégation de requêtes imbriquées avec `min` et `max` restent inchangées.

Voici un exemple utilisant `maximum()` pour trouver l'utilisation maximale du processeur entre deux zones de disponibilité.

```text
maximum(system.cpu.user{availability-zone:us-east-1a}, system.cpu.user{availability-zone:us-east-2a})
```

{{< img src="dashboards/querying/minmax_metrics_example-2.png" alt="Exemple de formule pour « maximum » montrant la valeur la plus élevée entre deux requêtes de métrique" style="width:75%;" >}}

De plus, vous pouvez également calculer le minimum entre deux requêtes sur des produits différents. Voici un autre exemple utilisant `minimum()` pour trouver le minimum entre les logs avec des statuts d'erreur et ceux avec des statuts d'avertissement.

```text
minimum(status:error, status:warn)
```

{{< img src="dashboards/querying/minmax_logs_platform_example.png" alt="Exemple de formule pour « minimum » montrant la valeur la plus basse entre deux requêtes de logs" style="width:75%;" >}}
{{% /collapse-content %}}

{{% collapse-content title="fonction time()" level="h5" %}}

La fonction `time()` renvoie le temps Unix actuel, en secondes, sous forme de série temporelle. Utilisez-la dans des formules pour comparer l'horodatage d'une métrique à l'heure actuelle, ce qui permet de surveiller la fraîcheur des données ou de calculer le temps restant avant une expiration.

Par exemple, pour calculer le temps écoulé en secondes depuis la dernière sauvegarde signalée, vous pouvez utiliser `time()` pour trouver la différence entre l'heure actuelle et l'horodatage de la métrique de sauvegarde.

```text
time() - max:backup.last_completed_timestamp{*}
```

{{% /collapse-content %}}

### Créez un alias {#create-an-alias}

Vous pouvez créer un alias personnalisé pour vos sources de données pour permettre à vos utilisateurs d'interpréter plus facilement les résultats du graphique.

{{< img src="dashboards/querying/custom_alias.png" alt="Alias personnalisé" style="width:75%;" >}}

### Créez un titre {#create-a-title}

Si vous ne saisissez pas de titre, un titre est automatiquement généré en fonction de vos sélections. Cependant, il est recommandé de créer un titre qui décrit l'objectif du graphique.

### Enregistrez {#save}

Cliquez sur {{< ui >}}Done{{< /ui >}} pour enregistrer votre travail et quitter l'éditeur. Vous pouvez toujours revenir dans l'éditeur pour modifier le graphique. Si vous effectuez des modifications que vous ne souhaitez pas enregistrer, cliquez sur {{< ui >}}Cancel{{< /ui >}}.

## Options supplémentaires {#additional-options}

### Superpositions d'événements {#event-overlays}

{{< img src="/dashboards/querying/event_overlay_example.png" alt="Widgets de séries temporelles affichant les taux d'erreur RUM avec des événements de déploiement superposés" style="width:100%;" >}}

Visualisez les corrélations d'événements en utilisant la section {{< ui >}}Event Overlays{{< /ui >}} dans l'éditeur de graphique pour la visualisation sous forme de [série temporelle][16]. Dans le champ de recherche, saisissez n'importe quel texte ou requête de recherche structurée. La recherche d'événements utilise la [syntaxe de recherche de logs][17].

La superposition d'événements prend en charge toutes les sources de données. Cela facilite la corrélation entre les événements métier et les données provenant de n'importe quel service Datadog.

Avec la superposition d'événements, vous pouvez rapidement voir comment les actions au sein de l'organisation impactent les performances des applications et de l'infrastructure. Voici quelques exemples de cas d'utilisation :
- Taux d'erreur RUM avec superposition d'événements de déploiement
- Corrélation de l'utilisation du processeur avec des événements liés au provisionnement de serveurs supplémentaires
- Corrélation du trafic sortant avec une activité de connexion suspecte
- Corrélation de toute donnée de série temporelle avec des alertes de monitor pour garantir que Datadog a été configuré avec les alertes appropriées


### Graphique scindé {#split-graph}

Les graphiques partagés vous permettent de visualiser des représentations d'une métrique en fonction de différents tags.

{{< img src="dashboards/querying/split_graph_beta.png" alt="Affichez des graphiques fractionnés de la métrique container.cpu.usage dans le widget en plein écran" style="width:100%;" >}}

1. Accédez à cette fonctionnalité via l'onglet {{< ui >}}Split Graph{{< /ui >}} lors de la visualisation des graphiques.
1. Vous pouvez modifier la métrique {{< ui >}}sort by{{< /ui >}} pour voir la relation entre les données que vous représentez graphiquement et d'autres métriques.
1. Limitez le nombre de graphiques affichés en modifiant la valeur {{< ui >}}limit to{{< /ui >}}.

## Pour aller plus loin {#further-reading}

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
[19]: /fr/dashboards/functions/telemetry_source/