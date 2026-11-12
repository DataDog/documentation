---
aliases:
- /fr/graphing/metrics/
- /fr/metrics/introduction/
- /fr/graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
- /fr/dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
  algolia:
    rank: 70
    tags:
    - submit metrics
    - metrics submission
description: Soumettez, interrogez, visualisez et gérez vos métriques dans Datadog.
title: Métriques
---
{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Découvrez les sessions Foundation Enablement consacrées aux métriques personnalisées et inscrivez-vous. Découvrez comment les métriques personnalisées vous aident à suivre les KPI de votre application, tels que le nombre de visiteurs, la taille moyenne du panier client, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.
{{< /learning-center-callout >}}

Ceci est une introduction aux métriques dans Datadog et à leur utilité. Cette section comprend les sujets suivants : 

{{< whatsnext desc="Soumettre des métriques à Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Soumettre des Custom Metrics</u> - Découvrez ce que sont les Custom Metrics et comment les soumettre.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>Envoyer des métriques OpenTelemetry</u> - Configurez le Datadog Agent ou OpenTelemetry Collector.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Types de métriques</u> - Types de métriques pouvant être soumises à Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Distribution Metrics</u> - Découvrez les Distribution Metrics et les percentiles globalement précis.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unités de métriques</u> - Découvrez les unités pouvant être associées aux métriques.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualisez et interrogez vos métriques" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> - Explorez toutes vos métriques et effectuez des analyses.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Catalog</u> - Découvrez quelles métriques Datadog transmettent actuellement des données.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrage avancé</u> - Filtrez vos données pour restreindre le périmètre des métriques renvoyées.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>Requêtes imbriquées</u> - Ajoutez des niveaux d'agrégation pour accéder à des fonctionnalités de requête avancées.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprenez et gérez les volumes et les coûts de vos métriques personnalisées" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Découvrez comment contrôler les volumes de métriques personnalisées avec des configurations de tags en utilisant Metrics without Limits™.{{< /nextlink >}}
{{< /whatsnext >}}

## Présentation {#overview}
### Que sont les métriques ? {#what-are-metrics}

Les métriques sont des valeurs numériques qui permettent de suivre n'importe quel aspect de votre environnement au fil du temps, de la latence aux taux d'erreur en passant par les inscriptions d'utilisateurs.

Dans Datadog, les données de métriques sont ingérées et stockées sous forme de points de données avec une valeur et un horodatage :

```text
[ 17.82,  22:11:01 ]
```

Une séquence de points de données est stockée sous forme de série temporelle :

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Les horodatages des métriques comportant des fractions de seconde sont arrondis à la seconde la plus proche. Si plusieurs points ont le même horodatage, le point le plus récent écrase les précédents.

### Pourquoi les métriques sont-elles utiles ? {#why-are-metrics-useful}

Les métriques offrent une vue d'ensemble de votre système. Vous pouvez les utiliser pour évaluer l'état de santé de votre environnement en un coup d'œil. Visualisez par exemple la vitesse à laquelle les utilisateurs chargent votre site web, ou la consommation moyenne de mémoire de vos serveurs. Une fois que vous avez identifié un problème, vous pouvez utiliser les [logs][1] et le [tracing][2] pour approfondir le dépannage.

Les métriques qui suivent l'état de santé du système sont transmises automatiquement via les Integrations de Datadog avec plus de {{< translate key="integration_count" >}} services. Vous pouvez également suivre des métriques spécifiques à votre activité, également appelées Custom Metrics. Vous pouvez suivre des éléments tels que le nombre de connexions utilisateur ou la taille des paniers d'achat, jusqu'à la fréquence des commits de code de votre équipe.

De plus, les métriques peuvent vous aider à adapter la capacité de votre environnement à la demande de vos clients. Savoir exactement quelle quantité de ressources vous devez consommer peut vous aider à économiser de l'argent ou à améliorer les performances.

### Envoi de métriques à Datadog {#submitting-metrics-to-datadog}

Les métriques peuvent être envoyées à Datadog depuis plusieurs endroits.

- [Integrations prises en charge par Datadog][8] : les Integrations de Datadog {{< translate key="integration_count" >}}+ incluent des métriques prêtes à l'emploi. Pour accéder à ces métriques, accédez à la page d'intégration spécifique de votre service et suivez les instructions d'installation qui s'y trouvent. Pour surveiller une instance EC2, par exemple, consultez la [documentation de l'intégration Amazon EC2][9].

- Vous pouvez générer des métriques directement au sein de la plateforme Datadog. Par exemple, vous pouvez compter les codes d'état d'erreur apparaissant dans vos logs et [enregistrer ce nombre comme nouvelle métrique][10] dans Datadog.

- Souvent, vous devrez suivre des métriques liées à votre activité (par exemple, le nombre de connexions ou d'inscriptions d'utilisateurs). Dans ces cas, vous pouvez créer des [Custom Metrics][11]. Les Custom Metrics peuvent être soumises via l'[Agent][12], [DogStatsD][13] ou l'[API HTTP][14].

- De plus, le [Datadog Agent][15] envoie automatiquement plusieurs métriques standard (telles que l'utilisation du processeur et du disque).

Pour un résumé de toutes les sources et méthodes de soumission de métriques, lisez la [documentation sur les types de métriques][16].

### Types de métriques et visibilité des métriques en temps réel {#metric-types-and-real-time-metrics-visibility}

#### Types de métriques {#metric-types}

Datadog prend en charge plusieurs types de métriques répondant à des cas d'utilisation distincts : count, jauge, rate, histogram et distribution. Les types de métriques déterminent quels graphiques et fonctions peuvent être utilisés avec la métrique dans l'application.

Le Datadog Agent n'effectue pas de requête distincte vers les serveurs de Datadog pour chaque point de données que vous envoyez. À la place, il transmet les valeurs collectées pendant un _intervalle de flush_. Le type de la métrique détermine la manière dont les valeurs collectées depuis votre host sur cet intervalle sont agrégées pour la soumission.

Un type **_count_** additionne toutes les valeurs soumises au cours d'un intervalle de temps. Cela conviendrait par exemple à une métrique suivant le nombre de visites sur un site web.

Le type **_rate_** prend le count et le divise par la durée de l'intervalle de temps. Ceci est utile si vous vous intéressez au nombre de visites par seconde.

Un type **_jauge_** prend la dernière valeur rapportée au cours de l'intervalle. Ce type serait pertinent pour suivre l'utilisation de la RAM ou du CPU, où prendre la dernière valeur fournit une image représentative du comportement du host pendant l'intervalle de temps. Dans ce cas, l'utilisation d'un type différent tel que _count_ conduirait probablement à des valeurs inexactes et extrêmes. Choisir le bon type de métrique garantit des données précises.

Un **_histogram_** rapporte cinq valeurs différentes résumant les valeurs soumises : la moyenne, le nombre, la médiane, le 95e centile et le maximum. Cela produit cinq séries temporelles différentes. Ce type de métrique est adapté à des éléments comme la latence, pour lesquels il ne suffit pas de connaître la valeur moyenne. Les histogrammes vous permettent de comprendre comment vos données ont été réparties sans enregistrer chaque point de données.

Une **_distribution_** est similaire à un histogramme, mais elle résume les valeurs soumises au cours d'un intervalle de temps sur tous les hosts de votre environnement. Vous pouvez également choisir de rapporter plusieurs centiles : p50, p75, p90, p95 et p99. Vous pouvez en apprendre davantage sur cette fonctionnalité puissante dans la [documentation sur les distributions][19].

Consultez la documentation sur les [types de métriques][16] pour obtenir des exemples plus détaillés de chaque type de métrique et des instructions de soumission.

## Interroger des métriques {#querying-metrics}

Vous pouvez visualiser vos métriques et créer des graphiques dans tout Datadog : dans [Metrics Explorer][3], les [Dashboards][4] ou les [Notebooks][5].

**Astuce** : pour ouvrir la page Metrics Catalog depuis la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `metrics`.

Voici un exemple de visualisation de série temporelle :

{{< img src="metrics/introduction/timeseries_example.png" alt="Un graphique de série temporelle affiche une métrique de latence représentée par une seule ligne bleue avec plusieurs pics" >}}

Ce graphique linéaire trace la latence (en millisecondes) subie par les utilisateurs sur l'axe des ordonnées en fonction du temps sur l'axe des abscisses.

#### Visualisations supplémentaires {#additional-visualizations}

Datadog propose une variété d'options de visualisation pour aider les utilisateurs à représenter et afficher facilement leurs métriques. 

Une requête de métrique consiste à commencer par les deux mêmes étapes d'évaluation : l'agrégation temporelle et l'agrégation spatiale. Consultez l'[anatomie d'une requête de métrique][6] pour plus d'informations.

{{< whatsnext desc="Deux options de visualisation que les utilisateurs de métriques trouvent souvent utiles sont :">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Query Value Widget</u> – Réduit les résultats de ces deux étapes en une seule valeur.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Top List</u> – Renvoie une seule valeur par groupe.{{< /nextlink >}}
{{< /whatsnext >}}

De plus, Datadog propose de nombreux autres types de graphiques et de widgets pour les visualisations. Vous pouvez en apprendre davantage à leur sujet dans la [série de blogs de Datadog sur les graphiques de métriques][7].

L'expérience de création de graphiques est cohérente, que vous utilisiez des Dashboards, des notebooks ou des monitors. Vous pouvez créer des graphiques en utilisant l'interface de l'éditeur de graphiques ou en modifiant directement la chaîne de requête brute. Pour modifier la chaîne de requête, utilisez le bouton {{< ui >}}</>{{< /ui >}} situé tout à droite.

### Anatomie d'une requête de métrique {#anatomy-of-a-metric-query}

Une requête de métrique dans Datadog ressemble à ceci :

{{< img src="metrics/introduction/newanatomy.jpg" alt="Exemple de requête avec des sections codées par couleur" style="width:70%;">}}

Vous pouvez décomposer cette requête en quelques étapes :

#### Nom de la métrique {#metric-name}

Tout d'abord, choisissez la métrique spécifique que vous souhaitez représenter graphiquement en la recherchant ou en la sélectionnant dans la liste déroulante à côté de {{< ui >}}Metric{{< /ui >}}. Si vous ne savez pas quelle métrique utiliser, commencez par Metrics Explorer ou un notebook. Vous pouvez également consulter la liste des métriques qui transmettent des données sur la page Metrics Catalog.

#### Filtrez votre métrique {#filter-your-metric}

Après avoir sélectionné une métrique, vous pouvez filtrer votre requête en fonction d'un ou plusieurs tags. Par exemple, vous pouvez utiliser `account:prod` pour _définir le périmètre de_ votre requête afin d'inclure uniquement les métriques provenant de vos hosts de production. Pour plus d'informations, lisez la [documentation sur la manière de taguer][17].

#### Configurez l'agrégation temporelle {#configure-time-aggregation}

Ensuite, choisissez la granularité de vos données à l'aide du rollup temporel. Dans cet exemple, vous avez défini qu'il y a un point de données pour chaque heure (3600 secondes). Vous pouvez choisir la manière dont vous souhaitez agréger les données dans chaque compartiment temporel. Par défaut, _avg_ est appliqué, mais les autres options disponibles sont _sum_, _min_, _max_ et _count_. Vous pouvez également personnaliser la manière dont vos données de métriques sont agrégées et compartimentées avec des fonctions ou des modificateurs intégrés à l'application. Par exemple, si vous souhaitiez appliquer max et personnaliser la manière dont vos données de métriques sont agrégées et regroupées dans le temps avec des requêtes alignées sur le calendrier, vous utiliseriez `.rollup(max, 60)`. Pour plus d'informations, consultez la documentation sur les [Fonctions][24], le [Rollup][23] et les [Modificateurs intégrés à l'application][25].

#### Configurez l'agrégation spatiale {#configure-space-aggregation}

Dans Datadog, « espace » fait référence à la manière dont les métriques sont réparties sur différents hosts et tags. Il existe deux aspects différents de l'espace que vous pouvez contrôler : l'agrégateur et le regroupement

_L'agrégateur_ définit la manière dont les métriques de chaque groupe sont combinées. Quatre agrégations sont disponibles : sum, min, max et avg.

_Le regroupement_ définit ce qui constitue une ligne sur le graphique. Par exemple, si vous avez des centaines d'hôtes répartis dans quatre régions, le regroupement par région vous permet de représenter une ligne pour chaque région. Cela réduirait le nombre de séries temporelles à quatre.

#### Appliquez des fonctions (facultatif) {#apply-functions-optional}

Vous pouvez modifier les valeurs de votre graphique avec des [fonctions][18] mathématiques. Cela peut signifier effectuer des opérations arithmétiques entre un entier et une métrique (par exemple, multiplier une métrique par 2). Ou effectuer des opérations arithmétiques entre deux métriques (par exemple, créer une nouvelle série temporelle pour le taux d'utilisation de la mémoire comme ceci : `jvm.heap_memory / jvm.heap_memory_max`).

### Agrégation temporelle et spatiale {#time-and-space-aggregation}

_L'agrégation temporelle_ et _l'agrégation spatiale_ sont deux composants importants de toute requête. Comme comprendre le fonctionnement de ces agrégations vous aide à éviter d'interpréter incorrectement vos graphiques, ces concepts sont expliqués plus en détail ci-dessous.

#### Agrégation temporelle {#time-aggregation}

Datadog stocke un grand volume de points, et dans la plupart des cas, il n'est pas possible de tous les afficher sur un graphique. Il y aurait plus de points de données que de pixels. Datadog utilise l'agrégation temporelle pour résoudre ce problème en combinant les points de données dans des intervalles de temps. Par exemple, lorsqu'on examine une période de quatre heures, les points de données sont combinés dans des intervalles de deux minutes. C'est ce qu'on appelle un _rollup_. À mesure que l'intervalle de temps que vous avez défini pour votre requête augmente, la granularité de vos données diminue.

Il existe cinq agrégations que vous pouvez appliquer pour combiner vos données dans chaque intervalle de temps : sum, min, max, avg et count.

Il est important de se rappeler que l'agrégation temporelle est _toujours_ appliquée dans chaque requête que vous effectuez.

#### Agrégation spatiale {#space-aggregation}

L'agrégation spatiale divise une seule métrique en plusieurs séries temporelles par des tags tels que le host, le conteneur et la région. Par exemple, si vous souhaitez visualiser la latence de vos instances EC2 par région, vous devrez utiliser la fonctionnalité de regroupement de l'agrégation spatiale pour combiner les hosts de chaque région.

Il existe quatre agrégateurs qui peuvent être appliqués lors de l'utilisation de l'agrégation spatiale : _sum_, _min_, _max_ et _avg_. En reprenant l'exemple ci-dessus, supposons que vos hosts soient répartis dans quatre régions : us-east-1, us-east-2, us-west-1 et us-west-2. Les hosts de chaque région doivent être combinés à l'aide d'une fonction d'agrégateur. L'utilisation de l'agrégateur _max_ donnerait la latence maximale rencontrée sur les hosts de chaque région, tandis que l'agrégateur _avg_ donnerait la latence moyenne par région.

#### Requêtes imbriquées {#nested-queries}
Ajoutez des couches d'agrégation supplémentaires sur les résultats de requêtes existantes dans le temps et l'espace avec des requêtes imbriquées dans l'interface utilisateur ou via l'[API][27]. Pour plus d'informations, consultez la documentation sur les [requêtes imbriquées][26].


### Consultez des informations en temps réel sur les métriques {#view-real-time-information-about-metrics}

La [page Metrics Catalog][20] affiche la liste des métriques transmises à Datadog pendant un intervalle précis, à savoir l'heure précédente, le jour précédent ou la semaine précédente. Les métriques peuvent être filtrées par nom de métrique ou par tag.

Cliquez sur n'importe quel nom de métrique pour afficher un panneau latéral contenant des informations plus détaillées. Le panneau latéral de détails affiche des informations clés pour une métrique donnée, notamment ses métadonnées (type, unité, intervalle), le nombre de métriques distinctes, le nombre de hosts qui transmettent des données, le nombre de tags soumis, ainsi qu'un tableau contenant tous les tags soumis pour une métrique. Savoir quels tags sont soumis pour une métrique vous aide à comprendre le nombre de métriques distinctes qui en découlent, car ce nombre dépend de vos combinaisons de valeurs de tags.

**Remarque :** Le nombre de métriques distinctes indiqué dans le panneau latéral de détails du Metrics Catalog ne définit pas votre facturation. Consultez vos [détails d'utilisation][21] pour obtenir un compte rendu précis de votre utilisation au cours du mois dernier.

Lisez la [documentation du Metrics Catalog][22] pour plus de détails.

## Pour aller plus loin {#further-reading}

{{< whatsnext desc="Pour continuer avec les métriques, consultez :">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrage avancé</u> - Filtrez vos données pour restreindre le périmètre des métriques renvoyées.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> - Calculez des percentiles globaux sur l'ensemble de votre jeu de données.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Découvrez comment contrôler les volumes de Custom Metrics à l’aide de configurations de tags avec Metrics without Limits™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Formation aux fondamentaux</u> - Participez à une session interactive pour exploiter tout le potentiel des métriques.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>Premiers pas avec les métriques</u> - Apprenez à envoyer et à visualiser vos premières métriques avec Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/logs
[2]: /fr/tracing/
[3]: /fr/metrics/explorer/
[4]: /fr/dashboards/
[5]: /fr/notebooks/
[6]: https://docs.datadoghq.com/fr/metrics/#anatomy-of-a-metric-query
[7]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[8]: /fr/integrations/
[9]: /fr/integrations/amazon_ec2/
[10]: /fr/logs/logs_to_metrics/
[11]: /fr/metrics/custom_metrics/
[12]: /fr/agent/
[13]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[14]: /fr/api/
[15]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/
[16]: /fr/metrics/types/
[17]: /fr/getting_started/tagging/using_tags/
[18]: /fr/dashboards/functions/
[19]: /fr/metrics/distributions/
[20]: https://app.datadoghq.com/metric/catalog
[21]: /fr/account_management/plan_and_usage/usage_details/
[22]: /fr/metrics/summary/
[23]: /fr/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /fr/dashboards/functions/
[25]: /fr/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /fr/metrics/nested_queries
[27]: https://docs.datadoghq.com/fr/api/latest/metrics/#query-timeseries-data-across-multiple-products