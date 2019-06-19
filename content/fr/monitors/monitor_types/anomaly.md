---
title: Monitor d'anomalie
kind: documentation
aliases:
  - /fr/guides/anomalies
description: Détecte les comportements anormaux pour une métrique basée sur des données historiques
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
La détection d'anomalies est une fonction algorithmique qui vous permet d'identifier un comportement anormal d'une métrique en fonction de ses données historiques, comme les tendances et les variations saisonnières en fonction du jour de la semaine ou de l'heure. Cette fonctionnalité convient aux métriques qui possèdent de fortes tendances et des modèles récurrents qui sont difficiles voire impossibles à surveiller avec des alertes de seuil.

Par exemple, la détection d'anomalies peut vous aider à déterminer si votre trafic Web est anormalement bas pour un après-midi en semaine, même si ce même niveau de trafic serait parfaitement normal plus tard dans la soirée. Elle vous permet également d'étudier une métrique mesurant le nombre de connexions à votre site, même si celui-ci est en pleine croissance. Puisque le nombre de visiteurs augmente chaque jour, l'utilisation de seuils ne serait pas pertinente. À l'inverse, la détection d'anomalies peut rapidement vous envoyer une alerte en cas de baisse inattendue, qui pourrait être liée à un dysfonctionnement du système de connexion.

## Comment créer un monitor de détection d'anomalies

Le langage de requête de Datadog comprend une fonction pour les `anomalies`. Lorsque vous appliquez cette fonction à une série, elle renvoie les résultats habituels ainsi qu'une plage de résultats « normale » attendue.

Les monitors de détection d'anomalies disposent d'un « contexte historique » (pour déterminer le comportement passé de la métrique) et d'une « période d'évaluation », plus importante que la période d'alerte, pour proposer un contexte immédiat. Ces deux concepts permettent d'obtenir des informations pertinentes sur les données prises en compte par l'algorithme d'anomalie lors du calcul des valeurs limites.

{{< img src="monitors/monitor_types/anomaly/context.png" alt="contexte historique" responsive="true" style="width:80%;">}}

Gardez à l'esprit que les `anomalies` utilisent des données historiques pour prédire un comportement futur. Ainsi, si vous utilisez les `anomalies` sur une nouvelle métrique, qui comporte peu de données, vos résultats peuvent être moins pertinents.

Pour créer un monitor de détection d'anomalies, accédez à la page [New Monitor][1] et cliquez sur **Anomaly Detection**. Remplissez ensuite la section **Define the metric** comme pour n'importe quel autre monitor.

{{< img src="monitors/monitor_types/anomaly/monitor_options.png" alt="options de monitor" responsive="true" style="width:80%;">}}

Le formulaire ci-dessus apparaît alors. Il comporte plusieurs paramètres qui vous permettent de déterminer dans quelles circonstances une alerte doit être envoyée pour signaler un comportement anormal. Si vous ne vous souciez que des valeurs anormalement élevées ou faibles, choisissez d'envoyer des alertes uniquement lorsque les valeurs dépassent des limites supérieures et inférieures. Le prochain paramètre définit la période d'alerte, qui permet de préciser la durée d'anormalité d'une métrique avant le déclenchement d'une alerte. Attention : si la période d'alerte est trop courte, il se peut que vous receviez de fausses alertes pour de simples irrégularités. Enfin, la durée d'annulation désigne la durée pendant laquelle une métrique doit afficher un comportement normal pour que l'alerte soit annulée.

Suivez le reste des étapes du formulaire New Monitor (**Say what's happening**, etc.) et cliquez sur **Save** pour créer un monitor d'anomalie.

### Options avancées

Datadog analyse automatiquement la métrique choisie et définit plusieurs paramètres pour vous. Cependant, les options peuvent être modifiées dans l'onglet Advanced Options :

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="options avancées" responsive="true" style="width:80%;">}}

Options :

* La largeur de la bande grise. « Deviations » correspond au paramètre des limites utilisé pour la fonction d'anomalies dans les dashboards.
* L'[algorithme de détection d'anomalies][2] utilisé.
* L'intervalle de [cumul][3].
* Le pourcentage de points qui doivent être anormaux pour déclencher une alerte, un avertissement ou une annulation.
* Si le caractère saisonnier est défini sur :
    - Weekly : l'algorithme s'attend à ce qu'un jour de la semaine donné se comporte comme ceux des semaines précédentes. Par exemple, les données d'un mardi doivent être similaires à celles des mardis précédents.
    - Daily : l'algorithme s'attend à ce qu'une heure donnée se comporte comme celles des jours précédents. Par exemple, les données du jour pour 17 h doivent être similaires à celles de 17 h la veille.
    - Hourly : l'algorithme s'attend à ce qu'une même minute donnée d'une heure donnée se comporte comme celles des heures précédentes. Par exemple, les données de 17 h 15 doivent être similaires à celles de 16 h 15, 15 h 15, etc.
* Changement d'heure : si vous utilisez des algorithmes de détection d'anomalies agiles ou robustes avec un caractère saisonnier hebdomadaire ou quotidien, vous pouvez mettre à jour votre monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local. Pour en savoir plus, consultez la page [Comment mettre à jour un monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local][4].

**Remarque** : pour être réellement efficaces, les algorithmes d'apprentissage automatique nécessitent au moins deux fois plus de données historiques que l'intervalle saisonnier choisi.

### Algorithmes de détection d'anomalies

Il existe trois différents algorithmes de détection d'anomalies :

* **Basic** : utilisez cet algorithme pour les métriques qui n'ont pas de modèle saisonnier récurrent.
L'algorithme *Basic* utilise un calcul simple reposant sur des quantiles cumulés avec un délai pour déterminer la plage de valeurs attendues. Néanmoins, cet algorithme utilise très peu de données et s'ajuste rapidement aux changements de conditions sans prendre en compte de comportement saisonnier ni de tendance à plus long terme.

* **Agile** : utilisez cet algorithme pour les métriques saisonnières lorsque vous souhaitez que l'algorithme s'ajuste rapidement aux changements de niveaux de la métrique.
L'algorithme *Agile* est une version robuste de l'algorithme [SARIMA][5]. Il intègre les dernières données historiques à ses prédictions, ce qui lui permet de s'adapter rapidement aux changements de niveaux, mais qui lui vaut d'être moins robuste pour les anomalies récentes sur le long terme.

* **Robust** : utilisez cet algorithme pour les métriques saisonnières lorsque vous pensez qu'une métrique évolue peu et que vous souhaitez considérer les changements de niveaux légers comme des anomalies.
L'algorithme *Robust* est un algorithme de [décomposition de tendance saisonnière][6] (article en anglais). Il est très stable et ses prédictions restent constantes même en cas d'anomalies sur le long terme, ce qui lui vaut un temps de réponse plus long pour les changements de niveaux prévus (par exemple, si le niveau d'une métrique change en cas de modification de code).

Tous les algorithmes saisonniers peuvent utiliser au maximum deux mois de données historiques lors du calcul de la plage normale de comportement attendue d'une métrique. En utilisant un volume conséquent de données passées, les algorithmes peuvent éviter de donner trop d'importance à un comportement anormal qui aurait pu avoir lieu il y a peu de temps.

Les figures ci-dessous illustrent les situations pour lesquelles ces trois algorithmes agissent différemment ainsi que la nature de leurs différences. Dans la première figure, l'algorithme _Basic_ identifie avec succès les anomalies qui quittent la plage normale de valeurs, sans tenir compte des modèles saisonniers et récurrents pour déterminer la plage de valeurs prévues. À l'inverse, les algorithmes _Robust_ et _Agile_ reconnaissent le modèle saisonnier et peuvent détecter des anomalies plus nuancées (p. ex., si la métrique se stabilise au niveau de sa valeur minimale).

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="comparaison d'algorithmes 1" responsive="true" style="width:90%;">}}

Dans la figure suivante, la métrique présente un changement de niveau soudain. L'algorithme _Agile_ s'ajuste plus rapidement au changement de niveau que l'algorithme _Robust_. En outre, la largeur des limites de l'algorithme _Robust_ augmente pour refléter une plus grande incertitude après le changement de niveau. La largeur des limites de l'algorithme _Agile_ reste inchangée. L'algorithme _Basic_ est clairement le maillon faible de ce scénario, où la métrique présente un important modèle saisonnier hebdomadaire.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="comparaison d'algorithmes 2" responsive="true" style="width:90%;">}}

La figure suivante montre la réaction des algorithmes face à une anomalie d'une heure. L'algorithme _Robust_ l'ignore complètement. Les autres se mettent à agir comme si l'anomalie représentait le niveau critère de normalité. L'algorithme _Agile_ considère même que le retour à la normale de la métrique est une anomalie.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="comparaison d'algorithmes 3" responsive="true" style="width:90%;">}}

Les algorithmes gèrent également différemment les changements d'échelle. Les algorithmes _Basic_ et _Robust_ n'y sont pas sensibles, contrairement à l'algorithme _Agile_. Dans les graphiques de gauche, on remarque que les algorithmes _Agile_ et _Robust_ considèrent le changement de niveau comme une anomalie. Sur la droite, nous ajoutons 1 000 à la même métrique. L'algorithme _Agile_ ne signale plus les changements de niveaux comme étant des anomalies, tandis que l'algorithme Robust continue à le faire.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="comparaison d'algorithmes échelle" responsive="true" style="width:90%;">}}

Enfin, nous pouvons voir comment chaque algorithme gère une nouvelle métrique. Les algorithmes _Robust_ et _Agile_ ne présentent aucune limite pendant les premières saisons (ici, la saisonnalité est hebdomadaire). L'algorithme _Basic_ commence à afficher des limites peu après l'apparition de la première métrique.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="Comparaison d'algorithmes nouvelle métrique" responsive="true" style="width:90%;">}}

## Monitors d'anomalie via l'API

Les clients dotés du niveau Enterprise peuvent créer un monitor de détection d'anomalies via l'API avec l'[endpoint de l'API creation-monitor][7] standard. Pour ce faire, ajoutez la fonction `anomalies` à la requête du monitor. Celle-ci suit la formule suivante :

```
time_aggr(eval_window_length):anomalies(space_aggr:metric{tags}, 'basic/agile/robust', deviation_number, direction='both/above/below', alert_window='alert_window_length', interval=seconds, count_default_zero='true') >= threshold_value
```

**Remarque** : les monitors de détection d'anomalies peuvent uniquement être utilisés avec les abonnements Enterprise. Si vous disposez d'un abonnement Pro et que vous souhaitez utiliser la fonctionnalité de détection d'anomalies, contactez votre responsable du succès client ou envoyez un e-mail à l'[équipe de facturation Datadog][8].

### Exemple

Si vous souhaitez créer un monitor de détection d'anomalies pour vous informer lorsque l'utilisation moyenne du processeur de votre nœud Cassandra a dépassé une valeur ordinaire correspondant à trois fois l'écart type pendant les 5 dernières minutes, vous pouvez utiliser la requête suivante dans votre appel d'API :

```
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

## FAQ

###  Faut-il utiliser la détection d'anomalies pour toutes les métriques ?

Non. La détection d'anomalies est conçue pour vous aider à visualiser et à surveiller les métriques possédant des modèles prévisibles. Par exemple, `my_site.page_views{*}` peut reposer sur le trafic utilisateur et donc varier de façon prévisible selon l'heure du jour et le jour de la semaine.
Si votre métrique ne dispose d'aucun modèle prévisible ou répété, alors une simple superposition de graphiques ou une alerte de seuil peut être plus efficace que la détection d'anomalies.

De plus, il est indispensable de disposer de données historiques pour identifier correctement les anomalies. Si vous recueillez une métrique depuis quelques heures ou quelques jours, il y a peu de chances pour que la détection d'anomalies soit utile.

### Je ne peux pas utiliser la détection d'anomalies dans des groupes de mon dashboard. Pourquoi ?

Si vous visualisez plusieurs séries temporelles différentes sur un même graphique, il peut y avoir un effet de [spaghettification][9] (article en anglais). La visualisation de la détection d'anomalies est susceptible d'accentuer ce problème.

{{< img src="monitors/monitor_types/anomaly/spaghetti.png" alt="spaghetti" responsive="true" style="width:80%;">}}

Cependant, il est possible d'ajouter plusieurs séries à un même graphique en les intégrant une par une. La bande grise n'apparaît que lorsque vous passez le curseur dessus.

{{< img src="monitors/monitor_types/anomaly/anomaly_multilines.png" alt="anomalie plusieurs lignes" responsive="true" style="width:80%;" >}}

### Les anomalies précédentes affectent-elles les prédictions actuelles ?

À l'exception de l'algorithme _Basic_, tous les algorithmes utilisent un grand volume de données historiques pour rester robustes face à la plupart des anomalies. Dans le premier graphique, vous remarquerez que la bande se stabilise autour des 400K, même lorsque la métrique a atteint 0, et ce tout au long de la journée.

{{< img src="monitors/monitor_types/anomaly/anomalous_history.png" alt="historique_anormal" responsive="true" style="width:80%;">}}

Le deuxième graphique présente la même métrique, la journée suivante. Même s'il implique le jour précédent dans le calcul de la bande, il n'est pas affecté par l'anomalie qui a eu lieu à ce moment-là.

{{< img src="monitors/monitor_types/anomaly/no_effect.png" alt="pas d'effet" responsive="true" style="width:80%;">}}

### Pourquoi est-ce qu'une anomalie « disparaît » lorsque je zoome sur le graphique ?

Selon le niveau de zoom, une même requête peut présenter des séries temporelles aux caractéristiques très différentes. Lorsque vous consultez de longues périodes, chaque point représente une agrégation de plusieurs points plus granulaires. Par conséquent, chaque point d'agrégation peut masquer des données fluctuantes observées dans les points plus granulaires. Par exemple, les graphiques qui représentent une semaine entière semblent souvent plus fluides (moins de fluctuations) que les graphiques qui ne représentent que 10 minutes.

La largeur de la bande grise créée à partir de l'algorithme de détection d'anomalies de Datadog est, en partie, basée sur la fluctuation des séries temporelles de l'ensemble. La bande doit être suffisamment large pour inclure les fluctuations normales sans créer d'anomalie. Malheureusement, dans ce cas, elle peut également masquer certaines anomalies, en particulier lors de la visualisation de courtes périodes.

Voici un exemple concret pour illustrer ce concept. La métrique `app.requests` est irrégulière, mais on distingue une valeur moyenne constante de 8. Sur une journée, on constate une période anormale de 10 minutes qui commence à 9 h 00, pendant laquelle la métrique a une valeur moyenne de 10. Le graphique ci-dessous présente cette série dans un graphique sur une durée d'une journée. Chaque point du graphique représente 5 minutes.

{{< img src="monitors/monitor_types/anomaly/disappearing_day.png" alt="disparition journée" responsive="true" style="width:70%;" >}}

La bande grise que vous voyez répond à une certaine logique : elle est suffisamment large pour regrouper les irrégularités de la série temporelle. Pourtant, elle est aussi suffisamment précise pour que l'on distingue clairement l'anomalie à 9 h 00. Le graphique suivant montre plus en détail la demi-heure qui comprend l'anomalie de 10 minutes. Chaque point du graphique représente alors 10 secondes.

{{< img src="monitors/monitor_types/anomaly/disappearing_half_hour.png" alt="disparition demi-heure " responsive="true" style="width:70%;" >}}

Là aussi, la bande semble avoir une taille raisonnable, car les données normales de 8 h 50 à 9 h 00 et de 9 h 10 à 9 h 20 sont incluses dans la bande. Une bande légèrement plus étroite commencerait à identifier des données normales comme des anomalies.
Vous remarquerez que la bande de ce graphique est ~8 fois plus large que celle du graphique précédent. La période anormale de 9 h 00 à 9 h 10 semble quelque peu différente du reste de la série, mais n'est pas suffisamment extrême pour sortir de la bande.

En général, si une anomalie disparaît lorsque vous zoomez, cela ne signifie pas qu'il ne s'agit pas d'une anomalie. En réalité, les points individuels dans la vue agrandie ne sont pas anormaux lorsqu'ils sont isolés, mais lorsque plusieurs points inhabituels sont simultanément visibles, il s'agit alors d'une anomalie.

### Je reçois une erreur de parsing de requête lorsque j'essaie d'associer certaines fonctions à une détection d'anomalies. Pourquoi ?

Les fonctions ne peuvent pas toutes être imbriquées dans des appels de la fonction `anomalies()`. Vous ne pouvez notamment pas inclure les fonctions suivantes dans un monitor de détection d'anomalies ou dans une requête de dashboard : `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()` ou `trend_line()`.

La détection d'anomalies utilise des données historiques pour établir la base du comportement normal d'une série. Les fonctions citées prennent en compte le placement de la période de requête. La valeur de la série pour un seul timestamp peut fortement varier selon sa place dans la période de requête. Cette sensibilité empêche la détection d'anomalies de déterminer une base constante pour la série.

### Qu'est-il arrivé à l'algorithme `adaptive` ?

Nous avons mis en place l'algorithme `adaptive` dans le but d'essayer de comprendre le caractère saisonnier inhérent à une métrique et d'ajuster ses prédictions en conséquence. Puisque nous détectons désormais automatiquement le caractère saisonnier d'une métrique lors de la configuration d'un monitor, cet algorithme a moins d'utilité, d'autant plus qu'il était plus lent et nécessitait plus de données que les autres algorithmes. Les monitors actuels qui utilisent l'algorithme `adaptive` ne sont pas modifiés et continuent de fonctionner.

### En quoi consiste l'argument `count_default_zero` ?

Auparavant, nous traitions les métriques count comme des gauges, ce qui créait une interpolation entre les points signalés. Cela pouvait donner lieu à des visualisations de métriques étranges pour quelques nombres signalés. Les anomalies ne génèrent plus d'interpolation entre les totaux. Toutefois, pour les anciens monitors, l'ancien comportement est préservé grâce à l'argument `count_default_zero`.

### J'aimerais que ma métrique count soit considérée comme une métrique gauge ? Que dois-je faire ?

Il paraît logique d'éviter l'interpolation entre des totaux si vous cherchez à compter des erreurs. Cependant, si vous avez des tâches planifiées toutes les heures, il est plus pertinent que la métrique ne transmette pas la valeur 0,0 entre les exécutions. Il existe deux façons d'y parvenir : 1) définissez le cumul (dans les options avancées) sur une heure ; ou 2) définissez explicitement `count_default_zero='false'` avec l'API.

### En quoi la configuration de l'intervalle de cumul dans « Advanced Options » diffère-t-elle de celle dans la requête avec `.rollup()` ?

Si le cumul est explicitement défini dans la requête, l'option d'intervalle de cumul pour le monitor d'anomalie est ignorée.

### Les anomalies liées à une métrique dont la valeur est inférieure à X ne m'intéressent pas. Est-il possible de les ignorer ?

Créez **A**, un monitor d'anomalie envoyant des alertes lorsque les valeurs dépassent les limites, et **B**, un [monitor de métrique][10] distinct avec une alerte de seuil pour les valeurs supérieures à X. Enfin, créez un [monitor composite][11] avec **A && B**.

### Je ne peux pas enregistrer de monitor lorsqu'un message indique que les critères d'alertes et d'annulation d'alerte font que le monitor peut à la fois déclencher et annuler une alerte. Pourquoi ?

La configuration de plusieurs durées pour les périodes d'alerte et d'annulation d'alerte peut créer un état ambigu. La durée de l'alerte et celle de son annulation ne doivent pas se chevaucher. Par exemple, la définition d'un seuil d'alerte à 50 % pour une durée de 2 heures (à savoir, un déclenchement d'alerte après une heure de comportement anormal) et d'un [seuil d'annulation][12] à 50 % pour une durée de 10 minutes (à savoir, une annulation d'alerte après 5 minutes de comportement normal) peut déclencher simultanément les états d'alerte et d'annulation d'alerte. Si les 5 dernières minutes affichent un comportement normal, mais si l'heure précédente est caractérisée par un comportement anormal, l'alerte et son annulation sont toutes deux déclenchées.__

### Quel est l'impact du changement d'heure sur les monitors de détection d'anomalies ?

Les monitors de Datadog se basent sur le temps universel (UTC) et sont par défaut insensibles aux fuseaux horaires locaux (comme EST, PST, CST). L'activité des utilisateurs dépend du fuseau UTC, car elle ne change généralement pas pour le fuseau horaire de l'utilisateur. Cela peut entraîner la détection d'une anomalie inattendue.

Datadog vous permet de configurer un fuseau horaire pour chaque monitor de détection d'anomalies qui corrige automatiquement le décalage temporel. Consultez la page [Comment mettre à jour un monitor de détection d'anomalies afin de prendre en compte un fuseau horaire local][4] pour en savoir plus.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#/create
[2]: #anomaly-detection-algorithms
[3]: /fr/graphing/#aggregate-and-rollup
[4]: /fr/monitors/faq/how-to-update-anomaly-monitor-timezone
[5]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[6]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[7]: /fr/api/#monitor-create
[8]: mailto:billing@datadoghq.com
[9]: https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101
[10]: /fr/monitors/monitor_types/metric
[11]: /fr/monitors/monitor_types/composite
[12]: /fr/monitors/faq/what-are-recovery-thresholds