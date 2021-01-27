---
title: Métriques
kind: documentation
disable_toc: true
aliases:
  - /fr/graphing/metrics/
  - /fr/metrics/introduction/
---
### En quoi consistent les métriques ?

Les métriques sont des valeurs numériques qui vous permettent de surveiller l'évolution de nombreux éléments de votre environnement (latence, taux d'erreur, inscriptions, etc.).

### À quoi servent les métriques ?

Les métriques vous fournissent une vue d'ensemble de votre système. Elles vous servent à évaluer rapidement la santé de votre environnement, en vérifiant par exemple la vitesse à laquelle votre site se charge, ou encore l'utilisation moyenne de la mémoire de vos serveurs. SI vous constatez un problème, vous pouvez utiliser les [logs][1] et le [tracing][2] pour identifier son origine précise.

Grâce à l'intégration de plus de 400 services, des métriques mesurant la santé de votre système sont automatiquement fournies. Toutefois, vous pouvez également recueillir des métriques adaptées à votre activité. On parle alors de métriques custom. Ces dernières vous permettent de consulter le nombre de connexions utilisateur, la taille des paniers ou encore la fréquence des commits de votre équipe.

Les métriques vous aident également à ajuster la taille de votre environnement afin de répondre aux demandes de vos clients. Grâce à des informations précises sur l'utilisation de vos ressources requise, vous pouvez réduire vos coûts ou améliorer vos performances.

### Comment utiliser les métriques dans Datadog ?

Dans l'application Datadog, vous pouvez visualiser vos métriques et créer des graphiques depuis le [Metrics Explorer][3], les [dashboards][4] ou les [notebooks][5].

Voici un exemple de visualisation représentant une série temporelle : 

{{< img src="metrics/introduction/timeseries_example.png" alt="Exemple de série temporelle" >}}

Ce graphique linéaire affiche la latence (en millisecondes) des utilisateurs (en ordonnée) en fonction de l'heure (en abscisse).

Datadog propose de nombreux autres types de graphiques et de widgets pour visualiser vos données. Pour en savoir plus, consultez [cet article][6] (en anglais).

### Comment envoyer des métriques à Datadog ?

Il existe plusieurs façons d'envoyer des métriques à Datadog.

- Vous pouvez utiliser les [intégrations prises en charge par Datadog][7]. Plus de {{< translate key="integration_count" >}} intégrations incluses dans votre infrastructure envoient des métriques à Datadog. Pour configurer la collecte de métriques depuis des intégrations externes, accédez à la page du service en question, puis suivez les instructions d'installation indiquées. Par exemple, si vous souhaitez surveiller une instance EC2, accédez à [cette page][8].

- Un grand nombre de nos fonctionnalités génèrent directement des métriques. Ainsi, vous pouvez compter les codes de statut d'erreur qui figurent dans vos logs, et [stocker cette valeur sous la forme d'une nouvelle métrique][9] dans Datadog.

- Vous devrez régulièrement surveiller des métriques liées à votre activité, comme le nombre de connexions ou d'inscriptions. Pour ce faire, vous pouvez créer des [métriques custom][10]. Ces métriques peuvent être transmises à l'aide de l'[Agent][11], de [DogStatsD][12] ou de l'[API HTTP][13].

- En outre, l'[Agent Datadog][14] envoie automatiquement plusieurs métriques standard, comme l'utilisation du CPU ou du disque.

Pour parcourir une synthèse de l'ensemble des sources et méthodes d'envoi de métriques, consultez la section [Types de métriques][14].

## Interroger des métriques

Que vous utilisiez des métriques, des monitors, des dashboards ou encore des notebooks, tous les graphiques Datadog offrent les mêmes fonctionnalités de base. Pour créer des graphiques, vous pouvez utiliser l'interface de l'éditeur de graphiques, ou modifier directement la chaîne de requête brute. Pour modifier la chaîne de la requête, cliquez sur le bouton `</>` situé à droite de la page.

### Anatomie d'une requête de métrique

Voici à quoi ressemble une requête de métrique dans Datadog :

{{< img src="metrics/introduction/color-query2.png" alt="Requête expliquée" style="width:70%;">}}

Nous pouvons diviser cette requête en plusieurs parties :

#### Nom de la métrique

Commencez par choisir la métrique à représenter en la recherchant ou en la sélectionnant dans le menu déroulant en regard de **Metric**. Si vous ne savez pas quelle métrique utiliser, vous pouvez commencer par consulter le Metrics Explorer ou un notebook. Vous pouvez également consulter la liste des métriques sur la page Metrics Summary.

#### Filtrer votre métrique

Une fois votre métrique sélectionnée, vous pouvez filtrer votre requête à l'aide de tags. Par exemple, utilisez le tag `account:prod` afin d'appliquer un _contexte_ à votre requête. Ainsi, celle-ci inclut uniquement les métriques provenant de vos hosts de production. Pour en savoir plus, consultez la documentation relative au [tagging][16].

#### Configurer l'intervalle

Choisissez ensuite la granularité de vos données à l'aide de l'option de cumul temporel. Pour cet exemple, nous avons choisi d'appliquer un point de données toutes les six minutes (360 secondes). Vous pouvez également choisir le type d'agrégation des données pour chaque compartiment temporel. Par défaut, l'agrégation _avg_ est appliquée. Toutefois, il est également possible de choisir parmi les agrégations _sum_, _min_, _max_ et_count_. Pour appliquer l'agrégation max, il suffit d'indiquer `.rollup(max, 60)`.

#### Configurer l'espace

Dans Datadog, le terme « espace » désigne la façon dont les métriques sont réparties en fonction des différents hosts et tags. Vous pouvez contrôler deux caractéristiques de l'espace : le regroupement et l'agrégation.

Les options de _regroupement_ définissent les éléments composant une ligne sur le graphique. Ainsi, si vous disposez de centaines de hosts répartis dans quatre régions, un regroupement par région vous permet de visualiser une ligne par région, afin de n'afficher que quatre séries temporelles.

Les options d'_agrégation_ définissent la façon dont les métriques de chaque groupe sont combinées. Il existe quatre types d'agrégations : sum, min, max et avg.

#### Appliquer des fonctions (facultatif)

Vous pouvez modifier les valeurs de votre graphique à l'aide de [fonctions][17] mathématiques. Il est possible d'appliquer des opérations arithmétiques à une métrique (p. ex., en la multipliant par deux) ou plusieurs (p. ex., en créant une nouvelle série temporelle pour le taux d'utilisation de la mémoire avec l'opération `jvm.heap_memory / jvm.heap_memory_max`).

### Agrégation spatiale et temporelle

L'_agrégation temporelle_ et l'_agrégation spatiale_ constituent deux éléments essentiels des requêtes. Pour bien comprendre leur fonctionnement et éviter les erreurs d'interprétation des graphiques, ces deux concepts sont détaillés ci-dessous.

#### Agrégation temporelle

Datadog stocke un important volume de points. Dans la plupart des cas, il n'est pas possible d'afficher tous ces points sur un graphique : le nombre de pixels ne serait pas assez important. Pour y remédier, l'agrégation temporelle combine des points de données au sein de compartiments temporels. Il s'agit d'une opération de _cumul_. Lorsque vous augmentez l'intervalle de votre requête, vos données perdent en granularité.

Vous pouvez choisir parmi cinq agrégations pour combiner vos données dans chaque compartiment temporel : sum, min, max, avg et count.

Attention : n'oubliez pas que l'agrégation temporelle est _systématiquement_ appliquée à chaque requête que vous effectuez. Nous ne pouvons pas afficher chaque point de données stocké.

#### Agrégation spatiale

L'agrégation spatiale permet de diviser une métrique en plusieurs séries temporelles en fonction de différents tags, afin de répartir vos métriques selon les hosts, conteneurs, régions, etc. Par exemple, si vous cherchez à consulter la latence de vos instances EC2 par région, vous devez utiliser l'agrégation spatiale pour combiner les hosts de chaque région.

Vous pouvez choisir parmi quatre agrégations spatiales : _sum_, _min_, _max_ et _avg_. Pour notre exemple, imaginons que vos hosts sont répartis en quatre régions : us-east-1, us-east-2, us-west-1 et us-west-2. Les hosts de chaque région doivent être combinés à l'aide d'une fonction d'agrégation. L'agrégation _max_ affichera la latence maximale des différents hosts de chaque région, tandis que l'agrégation _avg_ représentera la latence moyenne par région.

## Types de métriques et informations en temps réel

### Quels types de métriques peuvent être envoyés à Datadog ?

Datadog prend en charge plusieurs types de métriques : count, gauge, rate, histogram et distribution. Chaque type possède ses propres avantages.

### Qu'est-ce qui différencie chaque type de métrique ?

L'Agent Datadog n'envoie pas à nos serveurs une requête distincte pour chaque point de données analysé. Il transmet plutôt les valeurs recueillies sur un _intervalle de transmission_. Le type de métrique détermine la méthode d'agrégation appliquée aux valeurs recueillies depuis vos hosts sur cet intervalle, avant l'envoi de ces valeurs.

Une métrique **_count_** additionne toutes les valeurs envoyées lors d'un intervalle. Vous pouvez utiliser ce type de métrique pour surveiller le nombre de visites d'un site Web.

Si vous souhaitez plutôt consulter le nombre de visites par seconde, utilisez une métrique **_rate_**. Celle-ci divise le nombre de visites par l'intervalle en question.

Une métrique **_gauge_** tient uniquement compte de la dernière valeur transmise lors de l'intervalle. Ce type de métrique est particulièrement utile pour surveiller l'utilisation de la RAM ou du CPU. En effet, la dernière valeur offre une idée précise du comportement du host lors de l'intervalle. Dans cet exemple, si vous utilisez une métrique _count_, vous obtiendrez des valeurs extrêmes incorrectes. Il est donc crucial de choisir le bon type de métrique.

Une métrique **_histogram_** transmet cinq différentes valeurs afin de synthétiser les données transmises, à savoir la moyenne, le total, la valeur médiane, le 95e centile et le maximum. Vous obtenez ainsi cinq séries temporelles distinctes. Ce type de métrique vous permet de représenter des concepts, comme la latence, pour lesquels une valeur moyenne ne suffit pas. Les métriques histogram vous aident à mieux comprendre la répartition de vos données, sans pour autant enregistrer chaque point de données.

Une métrique de **_distribution_** ressemble à une métrique histogram. Toutefois, elle synthétise les valeurs transmises au cours d'un intervalle pour tous les hosts de votre environnement. Vous pouvez également choisir d'envoyer les valeurs de plusieurs centiles : p50, p75, p90, p95 et p99. Pour en savoir plus sur toutes les possibilités de cette fonctionnalité, consultez [cette page][18].

Pour résumer les différents types de métriques, imaginons que vous disposez d'un host qui transmet une métrique avec les valeurs [1,1,1,2,2,2,3,3] lors d'un intervalle de 10 secondes. Selon le type de métrique utilisé, les valeurs stockées par Datadog peuvent grandement varier :

Une métrique _count_ additionnerait les données et transmettrait la valeur 15 à nos serveurs. Une métrique _rate_ diviserait la somme par 10 (le nombre de secondes) et enverrait une valeur de 1,5. Une métrique _gauge_ transmettrait simplement la dernière valeur, à savoir 3. Une métrique _histogram_ enverrait cinq valeurs différentes : une moyenne (1,88), un total (8), une médiane (2), le 95e centile (3) et le maximum (3).

Les types de métriques déterminent les graphiques et fonctions disponibles dans l'app. Consultez la section [Types de métriques][15] pour obtenir des exemples détaillés pour chaque type de métrique, ainsi que des instructions pour leur envoi.

### Comment afficher les informations en temps réel sur des métriques ?

La [page Metrics Summary][19] affiche la liste de vos métriques transmises à Datadog pendant un intervalle précis, à savoir l'heure précédente, le jour précédent ou la semaine précédente. Les métriques peuvent être filtrées en fonction de leur nom ou d'un tag.

Cliquez sur un nom de métrique pour afficher un volet latéral comportant des détails supplémentaires. Vous pouvez consulter des informations importantes sur une métrique, notamment ses métadonnées (type, unité, intervalle), le nombre de métriques distinctes, le nombre de hosts transmettant des données, le nombre de tags envoyés, ainsi qu'un tableau rassemblant tous les tags envoyés pour une métrique. Ces informations sur les tags vous permettent de mieux comprendre le nombre de métriques distinctes associées aux tags qui transmettent des données. En effet, le nombre de métriques distinctes dépend des combinaisons de valeurs de vos tags.

Remarque : le nombre de métriques distinctes indiqué dans le volet latéral détaillé de la page Metrics Summary ne correspond pas au nombre de métriques facturées. Accédez à vos [informations d'utilisation][20] pour obtenir des données précises sur votre utilisation au cours du mois dernier.

Consultez la section [Metrics Summary][21] pour en savoir plus.

## Pour aller plus loin

{{< whatsnext desc="Pour approfondir vos connaissances sur les métriques, consultez les ressources suivantes :">}}
    {{< nextlink href="/metrics/explorer" >}}<u>Metrics Explorer</u> : plongez au cœur de l'ensemble de vos métriques et effectuez des analyses.{{< /nextlink >}}
    {{< nextlink href="/metrics/summary" >}}<u>Metrics Summary</u> : consultez la liste complète des métriques transmises à Datadog.{{< /nextlink >}}
    {{< nextlink href="/metrics/distributions" >}}<u>Métriques de distribution</u> : calculez les centiles globaux pour l'intégralité de votre ensemble de données.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/logs
[2]: /fr/tracing/
[3]: /fr/metrics/explorer/
[4]: /fr/dashboards/
[5]: /fr/notebooks/
[6]: https://www.datadoghq.com/blog/timeseries-metric-graphs-101/
[7]: /fr/integrations/
[8]: /fr/integrations/amazon_ec2/
[9]: /fr/logs/logs_to_metrics/
[10]: /fr/developers/metrics/
[11]: /fr/agent/
[12]: /fr/developers/metrics/dogstatsd_metrics_submission/
[13]: /fr/api/
[14]: https://docs.datadoghq.com/fr/agent/basic_agent_usage/
[15]: /fr/developers/metrics/types/
[16]: /fr/getting_started/tagging/using_tags/
[17]: /fr/dashboards/functions/
[18]: /fr/metrics/distributions/
[19]: https://app.datadoghq.com/metric/summary
[20]: /fr/account_management/billing/usage_details/
[21]: /fr/metrics/summary/