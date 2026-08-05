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
title: Metrics
---
{{< learning-center-callout header="Participez à une session de webinaire d'habilitation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Metrics">}}
  Explorez et inscrivez-vous aux sessions d'habilitation de base pour des métriques personnalisées. Découvrez comment les métriques personnalisées vous aident à suivre les KPI de votre application, tels que le nombre de visiteurs, la taille moyenne du panier client, la latence des requêtes ou la distribution des performances pour un algorithme personnalisé.
{{< /learning-center-callout >}}

Ceci est une introduction aux métriques dans Datadog et à leur utilité. Cette section comprend les sujets suivants : 

{{< whatsnext desc="Soumettez des métriques à Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Soumettre des métriques personnalisées</u> - Apprenez ce que sont les métriques personnalisées et comment les soumettre.{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/reference/otel_metrics" >}}<u>Envoyer des métriques OpenTelemetry</u> - Configurez l'Agent Datadog ou le Collecteur OpenTelemetry.{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Types de métriques</u> - Types de métriques pouvant être soumises à Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> - Découvrez les métriques de distribution et les percentiles globalement précis.{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unités de métriques</u> - Découvrez les unités pouvant être associées aux métriques.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualisez et interrogez vos métriques" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Explorateur de métriques</u> - Explorez toutes vos métriques et effectuez des analyses.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Résumé des métriques</u> - Comprenez vos métriques Datadog actuellement rapportées.{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrage avancé</u> - Filtrez vos données pour restreindre la portée des métriques retournées.{{< /nextlink >}}
    {{< nextlink href="/metrics/nested_queries" >}}<u>Requêtes imbriquées</u> - Appliquez des couches supplémentaires d'agrégation pour débloquer des capacités de requête avancées.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprenez et gérez vos volumes et coûts de métriques personnalisées" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Métriques sans limites™</u> - Apprenez à contrôler les volumes de métriques personnalisées avec des configurations de balises utilisant les Métriques sans limites™.{{< /nextlink >}}
{{< /whatsnext >}}

## Aperçu {#overview}
### Qu'est-ce que les métriques ? {#what-are-metrics}

Les métriques sont des valeurs numériques qui peuvent surveiller l'évolution de nombreux éléments de votre environnement (latence, taux d'erreur, inscriptions, etc.).

Dans Datadog, les données des métriques sont ingérées et stockées sous forme de points de données avec une valeur et un timestamp :

```text
[ 17.82,  22:11:01 ]
```

Une séquence de points de données est stockée sous la forme d'une série temporelle :

```text
[ 17.82,  22:11:01 ]
[  6.38,  22:11:12 ]
[  2.87,  22:11:38 ]
[  7.06,  22:12:00 ]
```

Toutes les métriques avec des timestamps en fractions de seconde sont arrondies à la seconde la plus proche. Si plusieurs points ont le même timestamp, le dernier point écrase les précédents.

### Pourquoi les métriques sont-elles utiles ? {#why-are-metrics-useful}

Les métriques fournissent une vue d'ensemble de votre système. Vous pouvez les utiliser pour évaluer la santé de votre environnement d'un coup d'œil. Visualisez à quelle vitesse les utilisateurs chargent votre site web, ou la consommation moyenne de mémoire de vos serveurs, par exemple. Une fois que vous avez identifié un problème, vous pouvez utiliser [les journaux][1] et [le traçage][2] pour approfondir le dépannage.

Les métriques qui suivent la santé du système sont automatiquement fournies par les intégrations de Datadog avec plus de {{< translate key="integration_count" >}} services. Vous pouvez également suivre des métriques spécifiques à votre entreprise, également connues sous le nom de métriques personnalisées. Vous pouvez suivre des éléments tels que le nombre de connexions d'utilisateurs, la taille des paniers des utilisateurs, jusqu'à la fréquence des commits de code de votre équipe.

De plus, les métriques peuvent vous aider à ajuster l'échelle de votre environnement pour répondre à la demande de vos clients. Savoir exactement combien vous devez consommer en ressources peut vous aider à économiser de l'argent ou à améliorer les performances.

### Soumettre des métriques à Datadog {#submitting-metrics-to-datadog}

Il existe plusieurs façons d'envoyer des métriques à Datadog.

- [Intégrations prises en charge par Datadog][8] : {{< translate key="integration_count" >}}+ Les intégrations incluent des métriques prêtes à l'emploi. Pour accéder à ces métriques, naviguez vers la page d'intégration spécifique à votre service et suivez les instructions d'installation. Si vous devez surveiller une instance EC2, par exemple, vous iriez à la [documentation d'intégration Amazon EC2][9].

- Vous pouvez générer des métriques directement au sein de la plateforme Datadog. Par exemple, vous pouvez compter les codes d'état d'erreur apparaissant dans vos journaux et [les stocker comme une nouvelle métrique][10] dans Datadog.

- Souvent, vous devrez suivre des métriques liées à votre entreprise (par exemple, le nombre de connexions ou d'inscriptions d'utilisateurs). Dans ces cas, vous pouvez créer des [métriques personnalisées][11]. Les métriques personnalisées peuvent être soumises via l'[Agent][12], [DogStatsD][13] ou l'[API HTTP][14].

- De plus, l'[Agent Datadog][15] envoie automatiquement plusieurs métriques standard (telles que l'utilisation du CPU et du disque).

Pour parcourir une synthèse de l'ensemble des sources et méthodes d'envoi de métriques, consultez la section [Types de métriques][16].

### Types de métriques et visibilité des métriques en temps réel {#metric-types-and-real-time-metrics-visibility}

#### Types de métriques {#metric-types}

Datadog prend en charge plusieurs types de métriques : count, gauge, rate, histogram et distribution. Chaque type possède ses propres avantages. Les types de métriques déterminent quels graphiques et fonctions sont disponibles pour être utilisés avec la métrique dans l'application.

L'Agent Datadog ne fait pas de demande séparée aux serveurs de Datadog pour chaque point de données que vous envoyez. Au lieu de cela, il rapporte les valeurs collectées sur un _intervalle de temps de vidage_. Le type de la métrique détermine comment les valeurs collectées depuis votre hôte pendant cet intervalle sont agrégées pour soumission.

Un type **_compte_** additionne toutes les valeurs soumises dans un intervalle de temps. Cela serait approprié pour une métrique suivant le nombre de visites sur le site web, par exemple.

Le type **_taux_** prend le compte et le divise par la durée de l'intervalle de temps. Ceci est utile si vous êtes intéressé par le nombre de visites par seconde.

Un type **_jauge_** prend la dernière valeur rapportée pendant l'intervalle. Ce type aurait du sens pour suivre l'utilisation de la RAM ou du CPU, où prendre la dernière valeur fournit une image représentative du comportement de l'hôte pendant l'intervalle de temps. Dans ce cas, utiliser un type différent tel que _compte_ conduirait probablement à des valeurs inexactes et extrêmes. Choisir le bon type de métrique garantit des données précises.

Un **_histogramme_** rapporte cinq valeurs différentes résumant les valeurs soumises : la moyenne, le compte, la médiane, le 95ᵉ percentile et le maximum. Cela produit cinq séries temporelles différentes. Ce type de métrique est adapté à des éléments tels que la latence, pour laquelle il ne suffit pas de connaître la valeur moyenne. Les histogrammes vous permettent de comprendre comment vos données étaient réparties sans enregistrer chaque point de données individuel.

Une **_distribution_** est similaire à un histogramme, mais elle résume les valeurs soumises pendant un intervalle de temps sur tous les hôtes de votre environnement. Vous pouvez également choisir de rapporter plusieurs percentiles : p50, p75, p90, p95 et p99. Vous pouvez en apprendre davantage sur cette fonctionnalité puissante dans la [documentation sur les distributions][19].

Référez-vous à la section [Types de métriques][16] pour obtenir des exemples détaillés de chaque type de métrique, ainsi que des instructions pour leur envoi.

## Interrogation des métriques {#querying-metrics}

Vous pouvez visualiser vos métriques et créer des graphiques dans Datadog depuis le [Metrics Explorer][3], les [dashboards][4] ou les [notebooks][5].

**Astuce** : Pour ouvrir la page Résumé des métriques à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `metrics`.

Voici un exemple de visualisation représentant une série temporelle :

{{< img src="metrics/introduction/timeseries_example.png" alt="Un graphique de séries temporelles affiche une métrique de latence représentée par une seule ligne bleue avec plusieurs pics." >}}

Ce graphique linéaire affiche la latence (en millisecondes) des utilisateurs (en abscisse) en fonction de l'heure (en ordonnée).

#### Visualisations supplémentaires {#additional-visualizations}

Datadog fournit différents types de visualisations, afin que chacun puisse représenter et visualiser facilement ses métriques. 

Une requête de métrique se compose des mêmes deux étapes d'évaluation pour commencer : agrégation temporelle et agrégation spatiale. Consultez l'[anatomie d'une requête de métrique][6] pour plus d'informations.

{{< whatsnext desc="Deux offres de visualisation que les utilisateurs de métriques trouvent souvent utiles sont :">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Widget de valeur de requête</u> - Réduit les résultats de ces deux étapes en une seule valeur.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Liste des meilleurs</u> - Renvoie une seule valeur par groupe.{{< /nextlink >}}
{{< /whatsnext >}}

De plus, Datadog propose de nombreux autres types de graphiques et de widgets pour les visualisations. Vous pouvez en apprendre davantage à leur sujet dans la [série de blogs de Datadog sur les graphiques de métriques][7].

L'expérience de graphisme est cohérente que vous utilisiez des tableaux de bord, des carnets ou des moniteurs. Vous pouvez créer des graphiques en utilisant l'interface utilisateur de l'éditeur de graphiques ou en modifiant directement la chaîne de requête brute. Pour modifier la chaîne de requête, utilisez le bouton `</>` à l'extrême droite.

### Anatomie d'une requête de métrique {#anatomy-of-a-metric-query}

Voici à quoi ressemble une requête de métrique dans Datadog :

{{< img src="metrics/introduction/newanatomy.jpg" alt="Exemple de requête avec des sections codées par couleur" style="width:70%;">}}

Cette requête peut être divisée en plusieurs parties :

#### Nom de la métrique {#metric-name}

Tout d'abord, choisissez la métrique spécifique que vous souhaitez représenter graphiquement en la recherchant ou en la sélectionnant dans le menu déroulant à côté de **Métrique**. Si vous n'êtes pas sûr de la métrique à utiliser, commencez par l'Explorateur de métriques ou un carnet de notes. Vous pouvez également voir une liste des métriques en cours de rapport actif sur la page Résumé des métriques.

#### Filtrer votre métrique {#filter-your-metric}

Après avoir sélectionné une métrique, vous pouvez filtrer votre requête en fonction des balises. Par exemple, vous pouvez utiliser `account:prod` pour _délimiter_ votre requête afin d'inclure uniquement les métriques de vos hôtes de production. Pour plus d'informations, consultez la [documentation sur le balisage][17].

#### Configurer l'agrégation temporelle {#configure-time-aggregation}

Ensuite, choisissez la granularité de vos données en utilisant le regroupement temporel. Dans cet exemple, vous avez défini qu'il y a un point de données pour chaque heure (3600 secondes). Vous pouvez choisir comment vous souhaitez agréger les données dans chaque intervalle de temps. Par défaut, _moyenne_ est appliquée, mais d'autres options disponibles sont _somme_, _min_, _max_ et _compte_. Vous pouvez également personnaliser la façon dont vos données de métriques sont agrégées et regroupées avec des fonctions ou des modificateurs dans l'application. Par exemple, si vous souhaitez appliquer max et personnaliser la façon dont vos données de métriques sont agrégées et regroupées dans le temps avec des requêtes alignées sur le calendrier, vous utiliseriez `.rollup(max, 60)`. Pour plus d'informations, consultez la documentation sur les [Fonctions][24], [Regroupement][23] et [Modificateurs dans l'application][25].

#### Configurer l'agrégation d'espace {#configure-space-aggregation}

Dans Datadog, "espace" fait référence à la façon dont les métriques sont réparties sur différents hôtes et balises. Il y a deux aspects différents de l'espace que vous pouvez contrôler : l'agrégateur et le regroupement.

_L'agrégateur_ définit comment les métriques dans chaque groupe sont combinées. Il existe quatre agrégations disponibles : somme, min, max et moyenne.

_Le regroupement_ définit ce qui constitue une ligne sur le graphique. Par exemple, si vous avez des centaines d'hôtes répartis sur quatre régions, le regroupement par région vous permet de tracer une ligne pour chaque région. Cela réduirait le nombre de séries temporelles à quatre.

#### Appliquer des fonctions (optionnel) {#apply-functions-optional}

Vous pouvez modifier les valeurs de votre graphique avec des [fonctions][18] mathématiques. Cela peut signifier effectuer des opérations arithmétiques entre un entier et une métrique (par exemple, multiplier une métrique par 2). Ou effectuer des opérations arithmétiques entre deux métriques (par exemple, créer une nouvelle série temporelle pour le taux d'utilisation de la mémoire comme ceci : `jvm.heap_memory / jvm.heap_memory_max`).

### Agrégation temporelle et spatiale {#time-and-space-aggregation}

_L'agrégation temporelle_ et _l'agrégation spatiale_ sont deux composants importants de toute requête. Parce que comprendre comment ces agrégations fonctionnent vous aide à éviter de mal interpréter vos graphiques, ces concepts sont expliqués plus en détail ci-dessous.

#### Agrégation temporelle {#time-aggregation}

Datadog stocke un grand volume de points, et dans la plupart des cas, il n'est pas possible de les afficher tous sur un graphique. Il y aurait plus de points de données que de pixels. Datadog utilise l'agrégation temporelle pour résoudre ce problème en combinant les points de données en seaux temporels. Par exemple, lors de l'examen de quatre heures, les points de données sont combinés en seaux de deux minutes. Ceci est appelé un _rollup_. À mesure que l'intervalle de temps que vous avez défini pour votre requête augmente, la granularité de vos données diminue.

Vous pouvez choisir parmi cinq agrégations pour combiner vos données dans chaque compartiment temporel : sum, min, max, avg et count.

Il est important de se rappeler que l'agrégation temporelle est _toujours_ appliquée dans chaque requête que vous effectuez.

#### Agrégation spatiale {#space-aggregation}

L'agrégation spatiale divise une seule métrique en plusieurs séries temporelles par des balises telles que l'hôte, le conteneur et la région. Par exemple, si vous souhaitez voir la latence de vos instances EC2 par région, vous devez utiliser la fonction de regroupement de l’agrégation spatiale pour combiner les hôtes de chaque région.

Il existe quatre agrégateurs qui peuvent être appliqués lors de l'utilisation de l'agrégation spatiale : _sum_, _min_, _max_ et _avg_. En utilisant l'exemple ci-dessus, disons que vos hôtes sont répartis sur quatre régions : us-east-1, us-east-2, us-west-1 et us-west-2. Les hôtes de chaque région doivent être combinés à l'aide d'une fonction d'agrégation. Utiliser l'agrégateur _max_ donnerait la latence maximale constatée parmi les hôtes dans chaque région, tandis que l'agrégateur _avg_ donnerait la moyenne de la latence par région.

#### Requêtes imbriquées {#nested-queries}
Ajoutez des couches supplémentaires d'agrégation sur les résultats des requêtes existantes dans le temps et l'espace avec des requêtes imbriquées dans l'interface utilisateur ou via l'[API][27]. Pour plus d'informations, consultez la documentation sur les [Requêtes imbriquées][26].


### Voir des informations en temps réel sur les métriques {#view-real-time-information-about-metrics}

La [page Résumé des métriques][20] affiche une liste de vos métriques rapportées à Datadog pour une période spécifiée : la dernière heure, le dernier jour ou la dernière semaine. Les métriques peuvent être filtrées par nom de métrique ou par balise.

Cliquez sur n'importe quel nom de métrique pour afficher un panneau latéral de détails avec des informations plus détaillées. Le panneau latéral de détails affiche des informations clés pour une métrique donnée, y compris ses métadonnées (type, unité, intervalle), le nombre de métriques distinctes, le nombre d'hôtes ayant envoyé des données, le nombre de balises soumises et un tableau contenant toutes les balises soumises pour une métrique. Voir quelles balises sont soumises sur une métrique vous aide à comprendre le nombre de métriques distinctes qui en résultent, puisque ce nombre dépend de vos combinaisons de valeurs de balises.

**Remarque :** Le nombre de métriques distinctes rapportées dans le panneau latéral de détails sur le Résumé des métriques n’a pas d’impact sur votre facturation. Consultez vos [détails d'utilisation][21] pour un comptage précis de votre utilisation au cours du mois dernier.

Consultez la [section Metrics Summary][22] pour en savoir plus.

## Lectures complémentaires {#further-reading}

{{< whatsnext desc="Pour continuer avec les métriques, consultez :">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrage avancé</u> - Filtrez vos données pour restreindre la portée des métriques retournées.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> - Calculez des percentiles globaux sur l’ensemble de vos données.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> - Découvrez comment contrôler les volumes de métriques personnalisées avec des configurations de balises en utilisant Metrics without Limits™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Foundation Enablement</u> - Participez à une session interactive pour exploiter le plein potentiel des métriques.{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/getting-started-metrics" >}}<u>Commencer avec les métriques</u> - Apprenez à soumettre et à visualiser vos premières métriques avec Datadog.{{< /nextlink >}}
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
[20]: https://app.datadoghq.com/metric/summary
[21]: /fr/account_management/plan_and_usage/usage_details/
[22]: /fr/metrics/summary/
[23]: /fr/dashboards/functions/rollup/#rollup-with-calendar-aligned-queries
[24]: /fr/dashboards/functions/
[25]: /fr/metrics/custom_metrics/type_modifiers/?tab=count#in-application-modifiers
[26]: /fr/metrics/nested_queries
[27]: https://docs.datadoghq.com/fr/api/latest/metrics/#query-timeseries-data-across-multiple-products