---
aliases:
- /fr/monitors/faq/anomaly-monitor.md

title: Monitors d'anomalie
---

### Faut-il utiliser la détection des anomalies pour toutes les métriques ?

Non. La détection des anomalies est conçue pour vous aider à visualiser et à surveiller les métriques affichant un comportement prévisible. Par exemple, `my_site.page_views{*}` repose sur le trafic utilisateur et varie donc de façon prévisible selon l'heure du jour et le jour de la semaine. Il s'agit donc d'une métrique adaptée à la détection des anomalies.

**Remarque** : il est indispensable de disposer de données historiques pour identifier correctement les anomalies. Si vous recueillez une métrique depuis seulement quelques heures ou quelques jours, il y a peu de chances pour que la détection des anomalies soit utile.

### Je ne peux pas utiliser la détection d'anomalies dans des groupes de mon dashboard. Pourquoi ?

L'ajout de plusieurs séries temporelles différentes sur un même graphique peut engendrer un effet de [spaghettification][9] (article en anglais). La visualisation des anomalies détectées est susceptible d'accentuer ce problème :

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="Effet de spaghettification" style="width:80%;">}}

Cependant, il est possible d'ajouter plusieurs séries à un même graphique en les intégrant une par une. La bande grise n'apparaît que lorsque vous passez le curseur dessus.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomalie plusieurs lignes" style="width:80%;" >}}

### Les anomalies précédentes affectent-elles les prédictions actuelles ?

À l'exception de l'algorithme `basic`, tous les algorithmes utilisent un grand volume de données historiques pour rester robustes face à la plupart des anomalies. Dans le premier graphique, la bande grise se stabilise autour des 400K même lorsque la métrique a atteint 0.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="historique_anormal" style="width:80%;">}}

Le deuxième graphique présente la même métrique, la journée suivante. Même s'il prend en compte le jour précédent dans le calcul de la bande, il n'est pas affecté par l'anomalie qui a eu lieu à ce moment-là.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="pas d'effet" style="width:80%;">}}

### Pourquoi est-ce qu'une anomalie « disparaît » lorsque je zoome sur le graphique ?

Selon le niveau de zoom, une même requête peut présenter des séries temporelles aux caractéristiques différentes. Lorsque vous consultez de longues périodes, chaque point représente une agrégation de plusieurs points plus granulaires. Par conséquent, chaque point d'agrégation peut masquer des données fluctuantes observées dans les points plus granulaires. Par exemple, les graphiques qui représentent une semaine entière semblent souvent plus homogènes (moins de fluctuations) que les graphiques qui ne représentent que 10 minutes.

La largeur de la bande grise est un facteur clé de la surveillance des anomalies. La bande doit être suffisamment large pour inclure les fluctuations normales afin qu'elles ne soient pas prises pour des anomalies. Malheureusement, dans ce cas, elle peut également masquer certaines anomalies, en particulier lors de la visualisation de courtes périodes.

Par exemple, la métrique `app.requests` ci-dessous est irrégulière, mais on distingue une valeur moyenne constante de 8. Sur une journée, on constate une période anormale de 10 minutes qui commence à 9 h 00, pendant laquelle la métrique a une valeur moyenne de 10. Le graphique ci-dessous présente une série sur une durée d'une journée. Chaque point du graphique représente 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="disparition journée" style="width:70%;" >}}

La bande grise visible répond à une certaine logique : elle est suffisamment large pour regrouper les irrégularités de la série temporelle. Pourtant, elle est aussi suffisamment précise pour que l'on distingue clairement l'anomalie à 9 h 00. Le graphique suivant montre plus en détail la demi-heure qui comprend l'anomalie de 10 minutes. Chaque point du graphique représente alors 10 secondes.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="disparition demi-heure" style="width:70%;" >}}

Là aussi, la bande semble avoir une taille raisonnable, car les données normales de 8 h 50 à 9 h 00 et de 9 h 10 à 9 h 20 sont incluses dans la bande. Une bande légèrement plus étroite commencerait à identifier des données normales comme des anomalies. On remarque que la bande de ce graphique est ~8 fois plus large que celle du graphique précédent. La période anormale de 9 h 00 à 9 h 10 semble différente du reste de la série, mais n'est pas suffisamment extrême pour sortir de la bande.

En général, si une anomalie disparaît lorsque vous zoomez, cela ne signifie pas qu'il ne s'agit pas d'une anomalie. En réalité, les points individuels dans la vue agrandie ne sont pas anormaux lorsqu'ils sont isolés, mais lorsque plusieurs points inhabituels sont simultanément visibles, il s'agit alors d'une anomalie.

### Je reçois une erreur de parsing de requête lorsque j'essaie d'associer certaines fonctions à une détection d'anomalies. Pourquoi ?

Les fonctions ne peuvent pas toutes être imbriquées dans des appels de la fonction `anomalies()`. Vous ne pouvez notamment pas inclure les fonctions suivantes dans un monitor de détection d'anomalies ou dans une requête de dashboard : `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()` ou `trend_line()`.

La détection des anomalies utilise des données historiques pour établir le comportement normal de référence d'une série. Les fonctions citées plus haut prennent en compte le placement de la période de requête. La valeur de la série pour un seul timestamp peut fortement varier selon sa place dans la période de requête. Cette sensibilité empêche la détection d'anomalies de déterminer une base constante pour la série.

### Qu'est-il arrivé à l'algorithme `adaptive` ?

Les algorithmes Datadog ont été repensés, et l'algorithme `adaptive` n'est plus utilisé. Les monitors existants qui utilisent cet algorithme ne sont pas affectés et continuent de fonctionner.

### À quoi sert l'argument `count_default_zero` ?

Auparavant, Datadog traitait les métriques count comme des gauges et les points transmis étaient donc interpolés. Les anomalies ne génèrent plus d'interpolation entre les counts. Toutefois, pour les anciens monitors, l'ancien comportement est préservé grâce à l'argument `count_default_zero`.

### J'aimerais que ma métrique count soit considérée comme une métrique gauge. Comment faire ?

Il paraît logique d'éviter l'interpolation entre des counts si votre métrique évalue le nombre d'erreurs (par exemple). Cependant, si vous avez des tâches planifiées toutes les heures, il peut être préférable d'empêcher la métrique de transmettre la valeur 0,0 entre les exécutions. Il existe deux façons d'y parvenir :

1. En définissant l'intervalle de cumul (dans les options avancées) sur une heure
2. En définissant explicitement `count_default_zero='false'` avec l'API

### Pourquoi définir l'intervalle de cumul dans la requête avec .rollup() plutôt que dans les options avancées ?

Si le cumul est explicitement défini dans la requête, l'option d'intervalle de cumul pour le monitor d'anomalie est ignorée.

### Les anomalies liées à une métrique dont la valeur est inférieure à X ne m'intéressent pas. Est-il possible de les ignorer ?

Créez **A**, un monitor d'anomalie envoyant des alertes lorsque les valeurs dépassent les limites, et **B**, un [monitor de métrique][2] distinct avec une alerte de seuil pour les valeurs supérieures à X. Ensuite, créez un [monitor composite][3] avec **A && B**.

### Je ne peux pas enregistrer mon monitor, et un message m'indique que les critères d'alertes et de rétablissement font que le monitor peut à la fois déclencher et annuler une alerte. Pourquoi ?

La configuration d'intervalles différents pour les périodes d'alerte et de rétablissement peut donner lieu à des ambiguïtés. L'intervalle d'alerte et l'intervalle de récupération ne doivent pas se chevaucher. Par exemple, le fait de définir un seuil d'alerte à 50 % pour une durée de 2 heures (une alerte se déclenche après une heure de comportement anormal) et un [seuil de rétablissement][4] à 50 % pour une durée de 10 minutes (l'alerte est annulée après 5 minutes de comportement normal) peut déclencher simultanément un état d'alerte et un état de rétablissement. Si les 5 dernières minutes affichent un comportement normal alors que l'heure précédente _était_ caractérisée par un comportement anormal, l'alerte et le rétablissement surviennent simultanément.

### Quel est l'impact du changement d'heure sur les monitors de détection des anomalies ?

Les monitors de Datadog se basent sur le temps universel (UTC) et sont par défaut insensibles aux fuseaux horaires locaux. L'activité des utilisateurs dépend du fuseau UTC, car elle ne change généralement pas pour le fuseau horaire de l'utilisateur. Cela peut entraîner la détection d'une anomalie inattendue.

Datadog vous permet de configurer un fuseau horaire pour chaque monitor de détection d'anomalies afin de prendre automatiquement en compte le décalage temporel. Consultez la page [Comment mettre à jour un monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local][5] pour en savoir plus.

[1]: https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101
[2]: /fr/monitors/create/types/metric/
[3]: /fr/monitors/create/types/composite/
[4]: /fr/monitors/guide/recovery-thresholds/
[5]: /fr/monitors/guide/how-to-update-anomaly-monitor-timezone/