---
aliases:
- /fr/graphing/metrics/
- /fr/metrics/introduction/
- /fr/graphing/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
- /fr/dashboards/faq/inconsistent-sum-aggregation-between-different-time-windows-on-graph/
cascade:
  algolia:
    rank: 70
title: Métriques
---
Cette page présente le fonctionnement des métriques dans Datadog et leurs avantages. Elle abord les sujets suivants :

{{< whatsnext desc="Envoyer des métriques à Datadog" >}}
    {{< nextlink href="/metrics/custom_metrics">}}<u>Envoyer des métriques custom</u> : Qu'est-ce qu'une métrique custom et comment en envoyer{{< /nextlink >}}
    {{< nextlink href="/opentelemetry/otel_metrics" >}}<u>Envoyer des métriques OpenTelemetry</u> : Configurer l'Agent Datadog ou le Collector OpenTelemetry{{< /nextlink >}}
    {{< nextlink href="/metrics/types" >}}<u>Types de métriques</u> : Types de métriques pouvant être envoyées à Datadog{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> : En savoir plus sur les métriques de distribution et les centiles calculés à l'échelle globale{{< /nextlink >}}
    {{< nextlink href="/metrics/units" >}}<u>Unités des métriques</u> : En savoir plus sur les unités pouvant être associées aux métriques{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Visualiser et interroger vos métriques" >}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> : Explorer l'ensemble de vos métriques et effectuer des analyses{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> : Analyser les métriques transmises à Datadog{{< /nextlink >}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtres avancés</u> : Filtrer vos données pour restreindre le contexte des métriques renvoyées{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Comprendre et gérer la quantité de métriques custom et les coûts associés" >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without LimitsTM</u> : Comprendre comment contrôler le volume de métriques custom en configurant des tags et des agrégations avec Metrics without LimitsTM{{< /nextlink >}}
{{< /whatsnext >}}

## Présentation
### En quoi consistent les métriques ?

Les métriques sont des valeurs numériques qui vous permettent de surveiller l'évolution de nombreux éléments de votre environnement (latence, taux d'erreur, inscriptions, etc.).

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

Les métriques dont les timestamps comportent des fractions de seconde sont arrondies à la seconde la plus proche. Si plusieurs points possèdent le même timestamp, le dernier point remplace les précédents.

### À quoi servent les métriques ?

Les métriques vous fournissent une vue d'ensemble de votre système. Elles vous servent à évaluer rapidement la santé de votre environnement, en vérifiant par exemple la vitesse à laquelle votre site se charge, ou encore l'utilisation moyenne de la mémoire de vos serveurs. SI vous constatez un problème, vous pouvez utiliser les [logs][1] et le [tracing][2] pour identifier son origine précise.

Grâce à l'intégration de plus de {{< translate key="integration_count" >}} services, des métriques mesurant la santé de votre système sont automatiquement fournies. Vous pouvez également recueillir des métriques adaptées à votre activité : il s'agit de métriques custom. Ces dernières vous permettent de surveiller le nombre de connexions utilisateur, la taille des paniers ou encore la fréquence des commits de votre équipe.

Les métriques vous aident également à ajuster la taille de votre environnement afin de répondre aux demandes de vos clients. Grâce à des informations précises sur l'utilisation de vos ressources requise, vous pouvez réduire vos coûts ou améliorer vos performances.

### Envoyer des métriques à Datadog

Il existe plusieurs façons d'envoyer des métriques à Datadog.

- Vous pouvez utiliser les [intégrations prises en charge par Datadog][8]. Plus de {{< translate key="integration_count" >}} intégrations incluses dans votre infrastructure envoient des métriques à Datadog. Pour consulter ces métriques, accédez à la page de l'intégration du service en question, puis suivez les instructions d'installation indiquées. Par exemple, si vous souhaitez surveiller une instance EC2, accédez à la [documentation relative à l'intégration Amazon EC2][9].

- Vous pouvez générer des métriques directement depuis la plateforme Datadog. Il est par exemple possible de compter les codes de statut d'erreur figurant dans vos logs, puis de [stocker cette valeur sous la forme d'une nouvelle métrique][10] dans Datadog.

- Vous devrez régulièrement surveiller des métriques liées à votre activité, comme le nombre de connexions ou d'inscriptions. Pour ce faire, vous pouvez créer des [métriques custom][11]. Ces métriques peuvent être transmises à l'aide de l'[Agent][12], de [DogStatsD][13] ou de l'[API HTTP][14].

- En outre, l'[Agent Datadog][15] envoie automatiquement plusieurs métriques standard, portant notamment sur l'utilisation du CPU ou du disque.

Pour parcourir une synthèse de l'ensemble des sources et méthodes d'envoi de métriques, consultez la section [Types de métriques][16].

### Types de métriques et informations en temps réel

#### Types de métriques

Datadog prend en charge plusieurs types de métriques : count, gauge, rate, histogram et distribution. Chaque type possède ses propres avantages. Il détermine les graphiques et fonctions disponibles dans l'application.

L'Agent Datadog n'envoie pas à nos serveurs une requête distincte pour chaque point de données analysé. Il transmet plutôt les valeurs recueillies sur un _intervalle de transmission_. Le type de métrique détermine la méthode d'agrégation appliquée aux valeurs recueillies depuis votre host sur cet intervalle, avant l'envoi de ces valeurs.

Une métrique **_count_** additionne toutes les valeurs envoyées lors d'un intervalle. Vous pouvez utiliser ce type de métrique pour surveiller, par exemple, le nombre de visites d'un site Web.

Une métrique **_rate_** divise un nombre par la durée d'une l'intervalle. Cela vous permet par exemple de déterminer le nombre de visites par seconde.

Une métrique **_gauge_** tient uniquement compte de la dernière valeur transmise lors de l'intervalle. Ce type de métrique est particulièrement utile pour surveiller l'utilisation de la RAM ou du CPU. En effet, la dernière valeur offre une idée précise du comportement du host lors de l'intervalle. Dans cet exemple, si vous utilisez une métrique _count_, vous obtiendrez des valeurs extrêmes incorrectes. Pour obtenir des données précises, il est donc important de choisir le bon type de métrique.

Une métrique **_histogram_** transmet cinq différentes valeurs afin de synthétiser les données transmises, à savoir la moyenne, le nombre de valeurs, la médiane, le 95e centile et le maximum. Vous obtenez ainsi cinq séries temporelles distinctes. Ce type de métrique vous permet de représenter des concepts, comme la latence, pour lesquels une valeur moyenne ne suffit pas. Les métriques histogram vous aident à mieux comprendre la répartition de vos données, sans pour autant enregistrer chaque point de données.

Une métrique de **_distribution_** ressemble à une métrique histogram. Toutefois, elle synthétise les valeurs transmises au cours d'un intervalle pour tous les hosts de votre environnement. Vous pouvez également choisir d'envoyer les valeurs de plusieurs centiles : p50, p75, p90, p95 et p99. Pour en savoir plus sur toutes les possibilités de cette fonctionnalité, consultez [la documentation dédiée][19].

Référez-vous à la section [Types de métriques][16] pour obtenir des exemples détaillés de chaque type de métrique, ainsi que des instructions pour leur envoi.

## Interroger des métriques

Vous pouvez visualiser vos métriques et créer des graphiques dans Datadog depuis le [Metrics Explorer][3], les [dashboards][4] ou les [notebooks][5].

Voici un exemple de visualisation représentant une série temporelle :

{{< img src="metrics/introduction/timeseries_example.png" alt="Un graphique de série temporelle avec une métrique de latence représentée par une ligne bleue avec plusieurs pics" >}}

Ce graphique linéaire affiche la latence (en millisecondes) des utilisateurs (en ordonnée) en fonction de l'heure (en abscisse).

#### Visualisations supplémentaires

Datadog fournit différents types de visualisations, afin que chacun puisse représenter et visualiser facilement ses métriques.

Une requête de métrique suit systématiquement deux étapes préliminaires d'évaluation, à savoir une agrégation temporelle et une agrégation spatiale. Consultez la rubrique [Anatomie d'une requête de métrique][6] pour en savoir plus.

{{< whatsnext desc="Deux types de visualisations particulièrement utiles pour représenter des métriques :">}}
    {{< nextlink href="dashboards/widgets/query_value/" >}}<u>Widget Valeur de requête</u> : rassemblez les résultats des deux étapes d'évaluation au sein d'une valeur unique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/widgets/top_list/" >}}<u>Top list</u> : obtenez une seule valeur par groupe.{{< /nextlink >}}
{{< /whatsnext >}}

En outre, Datadog propose de nombreux autres types de graphiques et de widgets pour les visualisations. Pour en savoir plus, consultez notre [série d'articles de blog sur la représentation graphique des métriques][7] (en anglais).

Que ce soit dans des dashboards, notebooks ou monitors, les graphiques fonctionnent de façon identique. Pour créer des graphiques, vous pouvez utiliser l'interface de l'éditeur de graphiques. Il est également possible de modifier directement la chaîne de requête brute. Pour ce faire, cliquez sur le bouton `</>` situé à droite de la page.

### Anatomie d'une requête de métrique

Voici à quoi ressemble une requête de métrique dans Datadog :

{{< img src="metrics/introduction/newanatomy.jpg" alt="Exemple de requête avec des parties identifiées par des couleurs" style="width:70%;">}}

Cette requête peut être divisée en plusieurs parties :

#### Nom de la métrique

Commencez par choisir la métrique à représenter en la recherchant ou en la sélectionnant dans le menu déroulant en regard de **Metric**. Si vous ne savez pas quelle métrique utiliser, consultez au préalable le Metrics Explorer ou un notebook. Vous pouvez également parcourir la liste des métriques transmettant des données sur la page Metrics Summary.

#### Filtrer votre métrique

Une fois votre métrique sélectionnée, vous pouvez filtrer votre requête à l'aide de tags. Par exemple, utilisez le tag `account:prod` afin de _filtrer_ votre requête et d'inclure uniquement les métriques provenant de vos hosts de production. Pour en savoir plus, consultez la [documentation relative au tagging][17].

#### Configurer une agrégation temporelle

Choisissez ensuite la granularité de vos données à l'aide de l'option de cumul temporel. Pour cet exemple, un point de données a été appliqué toutes les heures (3 600 secondes). Vous pouvez également choisir le type d'agrégation des données pour chaque compartiment temporel. Par défaut, l'agrégation _avg_ est appliquée. Toutefois, il est également possible de choisir parmi les agrégations _sum_, _min_, _max_ et _count_. Pour appliquer l'agrégation max, il suffit d'indiquer `.rollup(max, 60)`. Vous pouvez également personnaliser la façon dont vos données de métriques sont cumulées et compartimentées à l'aide de requêtes alignées sur le calendrier via la fonction `.rollup()`. Consultez la section [Cumul de données à l'aide de requêtes alignées sur le calendrier][23] pour en savoir plus.

#### Configurer une agrégation spatiale

Dans Datadog, le terme « spatial » désigne la façon dont les métriques sont réparties sur les différents hosts et tags. Vous pouvez contrôler deux caractéristiques spatiales : le regroupement et l'agrégation.

Les options d'_agrégation_ définissent la façon dont les métriques de chaque groupe sont combinées. Il existe quatre types d'agrégations : sum, min, max et avg.

Les options de _regroupement_ définissent les éléments composant une ligne sur le graphique. Ainsi, si vous disposez de centaines de hosts répartis dans quatre régions, un regroupement par région vous permet de visualiser une ligne par région, afin de n'afficher que quatre séries temporelles.

#### Appliquer des fonctions (facultatif)

Vous pouvez modifier les valeurs de votre graphique à l'aide de [fonctions][18] mathématiques. Il est possible d'appliquer des opérations arithmétiques à une métrique (p. ex., en la multipliant par 2) ou plusieurs (p. ex., en créant une nouvelle série temporelle pour le taux d'utilisation de la mémoire avec l'opération `jvm.heap_memory / jvm.heap_memory_max`).

### Agrégation spatiale et temporelle

L'_agrégation temporelle_ et l'_agrégation spatiale_ constituent deux éléments essentiels des requêtes. Pour bien comprendre leur fonctionnement et éviter les erreurs d'interprétation des graphiques, ces deux concepts sont détaillés ci-dessous.

#### Agrégation temporelle

Datadog stocke un important volume de points. Dans la plupart des cas, il n'est pas possible d'afficher tous ces points sur un graphique : le nombre de pixels ne serait pas assez important. Pour y remédier, l'agrégation temporelle de Datadog combine des points de données au sein de compartiments temporels. Par exemple, si vous visualisez l'équivalent de quatre heures de données, les points de données sont combinés au sein de compartiments de deux minutes. Il s'agit d'une opération de _cumul_. Lorsque vous augmentez l'intervalle de votre requête, vos données perdent en granularité.

Vous pouvez choisir parmi cinq agrégations pour combiner vos données dans chaque compartiment temporel : sum, min, max, avg et count.

Attention : n'oubliez pas que l'agrégation temporelle est _systématiquement_ appliquée à chaque requête que vous effectuez.

#### Agrégation spatiale

L'agrégation spatiale permet de diviser une métrique en plusieurs séries temporelles en fonction de différents tags, afin de répartir vos métriques selon les hosts, conteneurs, régions, etc. Par exemple, si vous cherchez à consulter la latence de vos instances EC2 par région, vous devez utiliser le regroupement de l'agrégation spatiale pour combiner les hosts de chaque région.

Vous pouvez choisir parmi quatre agrégations spatiales : _sum_, _min_, _max_ et _avg_. Pour notre exemple, imaginons que les hosts sont répartis en quatre régions : us-east-1, us-east-2, us-west-1 et us-west-2. Les hosts de chaque région doivent être combinés à l'aide d'une fonction d'agrégation. L'agrégation _max_ affichera la latence maximale des différents hosts de chaque région, tandis que l'agrégation _avg_ représentera la latence moyenne par région.

### Afficher des informations en temps réel sur des métriques

La [page Metrics Summary][20] affiche la liste de vos métriques transmises à Datadog pendant un intervalle précis, à savoir l'heure précédente, le jour précédent ou la semaine précédente. Les métriques peuvent être filtrées en fonction de leur nom ou d'un tag.

Cliquez sur un nom de métrique pour afficher un volet latéral comportant des détails supplémentaires. Vous pouvez y consulter des informations importantes sur une métrique, notamment ses métadonnées (type, unité, intervalle), le nombre de métriques distinctes, le nombre de hosts transmettant des données, le nombre de tags envoyés, ainsi qu'un tableau rassemblant tous les tags envoyés pour une métrique. Ces informations sur les tags vous permettent de mieux comprendre le nombre de métriques distinctes associées aux tags qui transmettent des données. En effet, le nombre de métriques distinctes dépend des combinaisons de valeurs de vos tags.

**Remarque** : le nombre de métriques distinctes indiqué dans le volet latéral des détails de la page Metrics Summary ne correspond pas au nombre de métriques facturées. Accédez à vos [informations d'utilisation][21] pour obtenir des données précises sur votre utilisation au cours du mois dernier.

Consultez la [section Metrics Summary][22] pour en savoir plus.

## Pour aller plus loin

{{< whatsnext desc="Pour approfondir vos connaissances sur les métriques, consultez les ressources suivantes :">}}
    {{< nextlink href="/metrics/advanced-filtering" >}}<u>Filtrage avancé</u> : filtrez vos données afin de restreindre le contexte des métriques renvoyées.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> : calculez les centiles globaux pour l'intégralité de votre ensemble de données.{{< /nextlink >}}
    {{< nextlink href="metrics/metrics-without-limits/" >}}<u>Metrics without Limits™</u> : découvrez comment contrôler vos volumes de métriques custom avec des configurations de tags et d'agrégations grâce à Metrics without Limits™.{{< /nextlink >}}
    {{< nextlink href="https://dtdg.co/fe" >}}<u>Validation des bases</u> : participez à une session interactive pour tirer pleinement profit des métriques.{{< /nextlink >}}
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