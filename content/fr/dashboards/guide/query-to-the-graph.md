---
title: De la requête au graphique
aliases:
  - /fr/dashboards/faq/query-to-the-graph
---
Cette page décrit les étapes suivies par le système de graphiques de Datadog pour passer d'une requête à un graphique. Ainsi, vous comprendrez mieux comment choisir les paramètres de votre graphique.

Lorsque vous créez un graphique dans un [timeboard][1] ou un [screenboard][2], vous pouvez utiliser l'éditeur ou l'onglet JSON pour configurer des requêtes avancées. L'exemple ci-dessous utilise la métrique `system.disk.total` issue d'un serveur spécifique (`host:bubs`).

{{< img src="dashboards/faq/graph_metric.png" alt="métrique_graphique" style="width:80%;">}}

Suivez ensuite chaque étape exécutée par le backend de Datadog afin d'exécuter la requête et de représenter une ligne de graphique sur votre dashboard.

Cet article relève l'effet de chaque paramètre de la requête à chaque étape.
**Avant la requête, les données storage: sont stockées séparément en fonction des tags**.

La métrique `system.disk.total` (recueillie par défaut par [datadog-agent][3]) est observée à partir de différentes sources.

En effet, cette métrique est renvoyée par différents hosts, et chaque Agent Datadog recueille cette métrique pour chaque appareil. Le tag `device:tmpfs` est ainsi ajouté à la métrique `system.disk.total` lors de l'envoi des données associées au disque avec le même nom, etc.

Ainsi, cette métrique peut être consultée avec différentes combinaisons de tags `{host, device}`.

Pour chaque source (définie par un host et un ensemble de tags), les données sont stockées séparément.
Dans cet exemple, imaginons que `host:moby` dispose de 5 appareils. Datadog enregistre alors 5 séries temporelles (tous les points de données envoyés au fil du temps pour une source) pour :

* `{host:moby, device:tmpfs}`
* `{host:moby, device:cgroup_root}`
* `{host:moby, device:/dev/vda1}`
* `{host:moby, device:overlay}`
* `{host:moby, device:shm}`

Considérez à présent les étapes successives suivies par le backend pour la requête présentée ci-dessus.

## Trouver quelles séries temporelles sont requises pour la requête

Dans cette requête, vous demandiez seulement les données associées au tag `host:moby`. La première chose à faire pour le backend de Datadog est d'analyser toutes les sources (dans ce cas, toutes les combinaisons `{host, device}` avec lesquelles la métrique `system.disk.total` est envoyée) et de conserver seulement celles qui correspondent au contexte de la requête.

Comme vous l'avez sûrement deviné, le backend trouve cinq sources correspondantes (voir le paragraphe précédent).

{{< img src="dashboards/faq/metrics_graph_2.png" alt="graphique_métriques_2" style="width:70%;">}}

Il faut alors agréger les données de ces sources afin d'obtenir une métrique représentant `system.disk.total` pour votre host. Cette opération est effectuée à l'[étape 3](#effectuer-l-agregation-spatiale).

**Remarque** : le système de tagging adopté par Datadog est à la fois simple et puissant. Vous n'avez pas besoin de connaître ou de spécifier les sources à combiner : il vous suffit de fournir un tag, par exemple un identifiant. Datadog combine alors uniquement toutes les données possédant cet identifiant. Vous n'avez donc pas besoin de savoir le nombre de hosts ou d'appareils dont vous disposez lorsque vous interrogez `system.disk.total{*}`. Datadog agrège pour vous les données de toutes les sources.

[Cliquez ici pour obtenir plus d'informations sur les séries temporelles et la cardinalité des tags][4].

**Paramètre impliqué : contexte**  
Vous pouvez utiliser plusieurs tags, p. ex. `{host:moby, device:udev}`, si vous souhaitez récupérer les données correspondant aux deux tags.

## Effectuer l'agrégation temporelle

Le backend de Datadog sélectionne toutes les données correspondant à l'intervalle de votre graphique.

Toutefois, avant de combiner toutes les données des différentes sources (étape 3), Datadog doit effectuer une agrégation temporelle.

### Pourquoi ?

Datadog stocke les données à une granularité de 1 seconde. Par conséquent, il n'est pas possible de représenter toutes les données réelles dans les graphiques. Consultez la section relative à l'[agrégation des données dans les graphiques][5] pour en savoir plus.

Pour un graphique avec un intervalle d'une semaine, il faudrait envoyer des centaines de milliers de valeurs à votre navigateur. De plus, tous ces points ne pourraient pas être représentés sur un widget occupant une petite partie de votre écran. Ainsi, Datadog est contraint d'effectuer une agrégation des données et d'envoyer un nombre limité de points à votre navigateur afin d'afficher un graphique.

### Quelle granularité ?

Par exemple, pour une vue du jour avec affichage des lignes, chaque point de données représente 5 minutes. Le backend de Datadog divise l'intervalle d'un jour en 288 compartiments de 5 minutes. Pour chaque compartiment, le backend cumule toutes les données en une seule valeur. Par exemple, le point de données représenté sur votre graphique avec le timestamp 07:00 est en fait un agrégat de tous les points de données réels envoyés entre 07:00:00 et 07:05:00 ce jour-là.

### Comment ?

Par défaut, le backend de Datadog calcule les données agrégées et cumulées en faisant la moyenne de toutes les valeurs réelles, ce qui permet de lisser les graphiques lorsque vous effectuez un zoom arrière. [Découvrez pourquoi un zoom arrière sur un intervalle permet également de lisser vos graphiques][6].
L'agrégation de données est nécessaire, que vous ayez 1 ou 1 000 sources, tant que vous consultez les données d'un intervalle de temps conséquent. Les valeurs que vous voyez sur le graphique ne correspondent généralement pas aux valeurs réelles envoyées, mais plutôt à des agrégats locaux.

{{< img src="dashboards/faq/metrics_graph_3.png" alt="graphique_métriques_3" style="width:75%;">}}

Le backend de Datadog calcule une série d'agrégats locaux pour chaque source correspondant à la requête.

Toutefois, vous pouvez contrôler les paramètres de cette agrégation.

**Paramètre impliqué : rollup (facultatif)**
Comment utiliser la [fonction rollup][7] ?

Dans cet exemple, `rollup(avg,60)` définit une période d'agrégation de 60 secondes. Ainsi, l'intervalle de X minutes est découpé en Y intervalles de 1 minute chacune. Les données d'une minute donnée sont agrégées en un point unique qui s'affiche sur votre graphique (après l'étape 3, l'agrégation spatiale).

**Remarque** : le backend de Datadog essaie de maintenir le nombre d'intervalles en dessous d'une valeur proche de 300. Si vous utilisez la fonction `rollup(60)` sur une période de deux mois, vous n'obtiendrez pas la granularité d'une minute demandée.

## Effectuer l'agrégation spatiale

Vous pouvez ensuite combiner les données de différentes sources en une seule ligne.

Vous disposez de ~300 points pour chaque source. Chacun d'eux représente une minute.
Dans cet exemple, Datadog calcule la moyenne de toutes les sources pour chaque minute, ce qui donne le graphique suivant :

{{< img src="dashboards/faq/metrics_graph_4.png" alt="graphique_métriques_4" style="width:75%;">}}

La valeur obtenue (25,74 Go) représente la moyenne des valeurs renvoyées par toutes les sources (voir l'image ci-dessus).

**Remarque** : s'il n'y a qu'une seule source (par exemple, si vous avez choisi le contexte `{host:moby, device:/dev/disk}` pour la requête), les paramètres `sum`, `avg`, `max` ou `min` n'ont aucun effet, car aucune agrégation spatiale ne doit être effectuée. Consultez la [FAQ sur le changement d'un agrégateur sum, min, max ou avg à un autre][8].

**Paramètre impliqué : space aggregator**

Datadog propose 4 agrégateurs spatiaux :

* `max`
* `min`
* `avg`
* `sum`

## Appliquer des fonctions (facultatif)

Des fonctions peuvent être appliquées aux opérations arithmétiques dans la case `Formula` lors de la représentation graphique des données. La plupart des fonctions sont appliquées lors de la dernière étape. À partir des ~300 points obtenus après les agrégations temporelles (étape 2) et spatiales (étape 3), la fonction calcule de nouvelles valeurs qui peuvent être représentées sur votre graphique.

Dans cet exemple, la fonction `abs` veille à ce que vos résultats correspondent à des nombres positifs.

**Paramètre impliqué : function**

{{< whatsnext desc="Choisissez votre type de fonctions" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}Nombre de valeurs : comptez les valeurs différentes de zéro ou différentes de null pour votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rollup" >}}Rollup : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

### Requêtes groupées, opérations arithmétiques et as_count/rate

#### Requêtes groupées

{{< img src="dashboards/faq/metric_graph_6.png" alt="graphique_métriques_6" style="width:75%;">}}

La logique reste la même :

1. Le backend de Datadog trouve tous les appareils associés à la source sélectionnée.
2. Pour chaque appareil, le backend effectue la requête `system.disk.total{host:example, device:<APPAREIL>}`, comme expliqué dans cet article.
3. Tous les résultats finaux sont représentés sur le même graphique.

{{< img src="dashboards/faq/metric_graph_7.png" alt="graphique_métriques_7" style="width:75%;">}}

**Remarque** : les modificateurs `rollup` ou `as_count` doivent être placés après la mention « by {`device`} ».

**Autre remarque** : vous pouvez utiliser plusieurs tags, par exemple : `system.disk.in_use{*} by {host,device}`.

#### Opérations arithmétiques

Les opérations arithmétiques sont également appliquées après l'agrégation temporelle et spatiale ([étape 4 : Appliquer des fonctions](#appliquer-des-fonctions-facultatif)).

{{< img src="dashboards/faq/metric_graph_8.png" alt="graphique_métriques_8" style="width:75%;">}}

#### Count et rate

`as_count` et `as_rate` sont des agrégateurs temporels spécifiques aux rates et counters envoyés avec StatsD ou DogStatsD. Ils permettent d'afficher les métriques sous forme de taux par seconde ou de les visualiser sous forme de nombres bruts. Syntaxe : au lieu d'ajouter un cumul, vous pouvez utiliser `.as_count()` ou `.as_rate()`.

Pour en savoir plus, consultez l'article [Visualisation des métriques StatsD avec la représentation graphique de counts][9] (en anglais) et la documentation relative à [StatsD et à DogStatsD][10].

[1]: /fr/dashboards/timeboard/
[2]: /fr/dashboards/screenboard/
[3]: /fr/agent/
[4]: /fr/metrics/custom_metrics/
[5]: /fr/dashboards/faq/how-is-data-aggregated-in-graphs/
[6]: /fr/dashboards/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs/
[7]: /fr/dashboards/functions/rollup/
[8]: /fr/dashboards/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same/
[9]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[10]: /fr/metrics/dogstatsd_metrics_submission/