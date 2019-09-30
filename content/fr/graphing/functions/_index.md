---
title: De la requête au graphique
kind: documentation
aliases:
  - /fr/examples/
  - /fr/examples/aws-metrics/
  - /fr/examples/month_before/
  - /fr/examples/graphing-functions/
  - /fr/examples/day_before/
  - /fr/examples/json-editing/
  - /fr/examples/nginx-metrics/
  - /fr/examples/dashboards/
  - /fr/examples/hour_before/
  - /fr/examples/os-metrics/
  - /fr/examples/week_before/
  - /fr/examples/cassandra-metrics/
  - /fr/graphing/miscellaneous/functions
  - /fr/graphing/miscellaneous/
  - /fr/getting_started/from_the_query_to_the_graph
  - /fr/graphing/miscellaneous/from_the_query_to_the_graph
---
Même si la configuration de graphiques dans Datadog est un jeu d'enfants, cette section vous aidera à exploiter au maximum le système de graphiques de Datadog.

Cet article décrit les étapes suivies par le système de graphiques de Datadog pour passer d'une requête à un graphique. Ainsi, vous comprendrez mieux comment choisir les paramètres de votre graphique.

Prenons comme exemple la métrique **system.disk.total**. Supposons que vous vouliez représenter graphiquement les données associées à cette métrique et provenant d'un serveur spécifique (`host:moby`).

Lorsque vous configurez un nouveau graphique dans un [timeboard][1] ou un [screenboard][2], vous pouvez utiliser l'éditeur, mais également accéder à l'onglet JSON pour configurer des requêtes avancées :

{{< img src="graphing/miscellaneous/from_query_to_graph/graph_metric.png" alt="graphique_métrique" responsive="true" style="width:75%;">}}

Suivez chaque étape exécutée par le backend de Datadog afin d'effectuer la requête et de représenter une ligne de graphique sur votre dashboard.

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

Voici les étapes successives suivies par le backend pour la requête présentée ci-dessus.

## Trouver quelles séries temporelles sont requises pour la requête

Dans cette requête, vous demandiez seulement les données associées au tag `host:moby`. La première chose à faire pour le backend de Datadog est d'analyser toutes les sources (dans ce cas, toutes les combinaisons `{host, device}` avec lesquelles la métrique `system.disk.total` est envoyée) et de conserver seulement celles qui correspondent au contexte de la requête.

Comme vous l'avez sûrement deviné, le backend trouve cinq sources correspondantes (voir le paragraphe précédent).

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_2.png" alt="graphique_métrique_2" responsive="true" style="width:70%;">}}

Il faut alors agréger les données de ces sources afin de fournir une métrique représentant `system.disk.total` pour votre host. Cette opération est effectuée à l'[étape 3][4].

**Remarque** : le système d'ajout de tags adopté par Datadog est à la fois simple et puissant. Vous n'avez pas besoin de connaître ou de spécifier les sources à combiner : il vous suffit de fournir un tag (par exemple, un identifiant). Datadog combine alors uniquement toutes les données possédant cet identifiant. Vous n'avez donc pas besoin de connaître le nombre de hosts ou d'appareils dont vous disposez lorsque vous interrogez `system.disk.total{*}`. Datadog agrège les données de toutes les sources pour vous.

[Cliquez ici pour obtenir plus d'informations sur les séries temporelles et la cardinalité des tags][5].

**Paramètre impliqué : contexte**  
Vous pouvez utiliser plusieurs tags, p. ex. `{host:moby, device:udev}`, si vous souhaitez récupérer les données correspondant aux deux tags.

## Effectuer l'agrégation temporelle

Notre backend sélectionne toutes les données correspondant à l'intervalle de votre graphique.

Toutefois, avant de combiner toutes les données des différentes sources (étape 3), Datadog doit effectuer une agrégation temporelle.

### Pourquoi ?

Datadog stocke les données à une granularité de 1 seconde. Par conséquent, il ne peut pas afficher toutes les données réelles des graphiques. [Consultez cet article pour en savoir plus sur l'agrégation des données dans les graphiques][6]

Pour un graphique avec un intervalle d'une semaine, il faudrait envoyer des centaines de milliers de valeurs à votre navigateur. De plus, tous ces points ne pourraient pas être représentés sur un widget occupant une petite partie de votre écran. Ainsi, Datadog est contraint d'effectuer une agrégation des données et d'envoyer un nombre limité de points à votre navigateur afin d'afficher un graphique.

### Quelle granularité ?

Par exemple, pour une vue du jour avec affichage des lignes, chaque point de données représente 5 minutes. Le backend de Datadog divise l'intervalle d'un jour en 288 compartiments de 5 minutes. Pour chaque compartiment, le backend regroupe toutes les données en une seule valeur. Par exemple, le point de données représenté sur votre graphique avec le timestamp 07:00 est en fait un agrégat de tous les points de données réels envoyés entre 07:00:00 et 07:05:00 ce jour-là.

### Comment ?

Par défaut, le backend de Datadog calcule les données agrégées et cumulées en faisant la moyenne de toutes les valeurs réelles, ce qui permet de lisser les graphiques lorsque vous effectuez un zoom arrière. [Découvrez pourquoi un zoom arrière sur un intervalle permet également de lisser vos graphiques][7].
L'agrégation de données est nécessaire, que vous ayez 1 ou 1 000 sources, tant que vous consultez les données d'un intervalle de temps conséquent. Les valeurs que vous voyez sur le graphique ne correspondent généralement pas aux valeurs réelles envoyées, mais plutôt à des agrégats locaux.

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_3.png" alt="graphique_métrique_3" responsive="true" style="width:75%;">}}

Notre backend calcule une série d'agrégats locaux pour chaque source correspondant à la requête.

Toutefois, vous pouvez contrôler les paramètres de cette agrégation.

**Paramètre impliqué : cumul (facultatif)**
Comment utiliser la [fonction de cumul][8] ?

Dans cet exemple, `rollup(avg,60)` définit une période d'agrégation de 60 secondes. Ainsi, l'intervalle de X minutes est découpé en Y intervalles de 1 minute chacune. Les données d'une minute donnée sont agrégées en un point unique qui s'affiche sur votre graphique (après l'étape 3, l'agrégation spatiale).

Notez que le backend de Datadog essaie de maintenir le nombre d'intervalles en dessous de ~300. Si vous effectuez la fonction `rollup(60)` sur une période de deux mois, vous n'obtiendrez pas la granularité d'une minute demandée.

## Effectuer l'agrégation spatiale

Vous pouvez désormais combiner les données de différentes sources en une seule ligne.

Vous disposez de ~300 points pour chaque source. Chacun d'eux représente une minute.
Dans cet exemple, Datadog calcule la moyenne de toutes les sources pour chaque minute, ce qui donne le graphique suivant :

{{< img src="graphing/miscellaneous/from_query_to_graph/metrics_graph_4.png" alt="graphique_métrique_4" responsive="true" style="width:75%;">}}

La valeur obtenue (25,74 Go) représente la moyenne des valeurs renvoyées par toutes les sources (voir l'image ci-dessus).

Remarque : s'il n'y a qu'une seule source (par exemple, si nous avions choisi le contexte `{host:moby, device:/dev/disk}` pour la requête), les paramètres `sum`, `avg`, `max` ou `min` n'ont aucun effet, car aucune agrégation spatiale ne doit être effectuée. [Cliquez ici pour en savoir plus][9].

**Paramètre impliqué : agrégateur spatial**

Datadog propose 4 agrégateurs spatiaux :

* `max`
* `min`
* `avg`
* `sum`

## Appliquer des fonctions (facultatif)

Des fonctions peuvent être appliquées à l'arithmétique dans la case `Formula` lors de la représentation graphique des données. La plupart des fonctions sont appliquées lors de la dernière étape. À partir des ~300 points obtenus après les agrégations temporelles (étape 2) et spatiales (étape 3), la fonction calcule de nouvelles valeurs qui peuvent être représentées sur votre graphique.

Dans cet exemple, la fonction `abs` veille à ce que vos résultats correspondent à des nombres positifs.

**Paramètre impliqué : fonction**

{{< whatsnext desc="Choisissez votre type de fonctions" >}}
    {{< nextlink href="/graphing/functions/algorithms" >}}Algorithme : mettez en place un système de détection d'anomalies ou de singularités sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/arithmetic" >}}Opérations arithmétiques : effectuez des opérations arithmétiques sur votre métrique.  {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/count" >}}Total : comptez les valeurs différentes de zéro ou différentes de null de votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/interpolation" >}}Interpolation : saisissez ou définissez des valeurs par défaut pour votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rank" >}}Rang : sélectionnez seulement un sous-ensemble de métriques. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rate" >}}Taux : calculez une dérivée personnalisée sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/regression" >}}Régression : appliquez une fonction d'apprentissage automatique sur votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/rollup" >}}Cumul : contrôlez le nombre de points bruts utilisés dans votre métrique. {{< /nextlink >}}
    {{< nextlink href="/graphing/functions/smoothing" >}}Lissage : lissez les variations de votre métrique.{{< /nextlink >}}
    {{< nextlink href="/graphing/functions/timeshift" >}}Décalage temporel : modifiez la période d'un point de données de votre métrique. {{< /nextlink >}}
{{< /whatsnext >}}

### Requêtes groupées, opérations arithmétiques et as_count/rate

#### Requêtes groupées

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_6.png" alt="graphique_métrique_6" responsive="true" style="width:75%;">}}

La logique reste la même :

1. Le backend de Datadog trouve tous les appareils associés à la source sélectionnée.
2. Pour chaque appareil, le backend effectue la requête `system.disk.total{host:example, device:<appareil>}`, comme expliqué dans cet article.
3. Tous les résultats finaux sont représentés sur le même graphique.

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_7.png" alt="graphique_métrique_2" responsive="true" style="width:75%;">}}

**Remarque** : les modificateurs `rollup` ou `as_count` doivent être placés après la mention « by {`device`} ».

**Autre remarque** : vous pouvez utiliser plusieurs tags, par exemple : `system.disk.in_use{*} by {host,device}`.

#### Opérations arithmétiques

Les opérations arithmétiques sont également appliquées après l'agrégation temporelle et spatiale ([étape 4 : Appliquer une fonction](#appliquer-des-fonctions-facultatif)).

{{< img src="graphing/miscellaneous/from_query_to_graph/metric_graph_8.png" alt="graphique_métrique_8" responsive="true" style="width:75%;">}}

#### as_count et as_rate

`As_count` et `as_rate` sont des agrégateurs temporels spécifiques aux rates et counters envoyés via StatsD/DogStatsD. Ils permettent d'afficher les métriques sous forme de taux par seconde ou de les visualiser sous forme de nombres bruts.
Syntaxe : au lieu d'ajouter un cumul, vous pouvez ajouter `.as_count()` ou `.as_rate()`.

Consultez [cet article de notre blog][10] pour en savoir plus.
Documentation relative à [StatsD/DogStatsD][11].


[1]: /fr/graphing/dashboards/timeboard
[2]: /fr/graphing/dashboards/screenboard
[3]: /fr/agent
[4]: #proceed-to-space-aggregation
[5]: /fr/developers/metrics/custom_metrics
[6]: /fr/graphing/faq/how-is-data-aggregated-in-graphs
[7]: /fr/graphing/faq/why-does-zooming-out-a-timeframe-also-smooth-out-my-graphs
[8]: /fr/graphing/functions/rollup
[9]: /fr/graphing/faq/i-m-switching-between-the-sum-min-max-avg-aggregators-but-the-values-look-the-same
[10]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[11]: /fr/developers/dogstatsd