---
algolia:
  rank: 70
  tags:
  - anomaly
  - anomaly monitor
aliases:
- /fr/guides/anomalies
- /fr/monitors/monitor_types/anomaly
- /fr/monitors/create/types/anomaly/
description: Détecte les comportements anormaux pour une métrique en fonction des
  données historiques
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
- link: dashboards/functions/algorithms/#anomalies
  tag: Documentation
  text: Fonction d'anomalies
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: Blog
  text: Détection des anomalies, corrélations prédictives - Utilisation de la surveillance
    des métriques assistée par IA
title: Monitor d'anomalie
---
## Aperçu {#overview}

La détection d'anomalies est une fonctionnalité algorithmique qui identifie quand une métrique se comporte différemment de ce qu'elle a présenté par le passé, en tenant compte des tendances, des variations selon les jours de la semaine et des schémas horaires. Elle est adaptée aux métriques avec de fortes tendances et des schémas récurrents qui sont difficiles à surveiller avec des alertes basées sur des seuils.

Par exemple, la détection des anomalies peut vous aider à découvrir quand votre trafic web est anormalement bas un après-midi en semaine, même si ce même niveau de trafic est normal plus tard dans la soirée. Ou considérez une métrique mesurant le nombre de connexions à votre site en croissance constante. Comme le nombre augmente chaque jour, tout seuil serait obsolète, tandis que la détection des anomalies peut vous alerter s'il y a une chute inattendue, ce qui pourrait indiquer un problème avec le système de connexion.

## Création de moniteur {#monitor-creation}

Pour créer un [moniteur d'anomalies][1] dans Datadog, utilisez la navigation principale : *Moniteurs --> Nouveau Moniteur --> Anomalie*.

### Définir la métrique {#define-the-metric}

Toute métrique rapportée à Datadog est disponible pour les moniteurs. Pour plus d'informations, consultez la page [Moniteur de métrique][2].
**Remarque** : La `anomalies` fonction utilise le passé pour prédire ce qui est attendu dans le futur, donc l'utiliser sur une nouvelle métrique peut donner de mauvais résultats.

Après avoir défini la métrique, le moniteur de détection des anomalies fournit deux graphiques de prévisualisation dans l'éditeur :
{{< img src="monitors/monitor_types/anomaly/context.png" alt="contexte historique" style="width:80%;">}}

* La **Vue Historique** vous permet d'explorer la requête surveillée à différentes échelles de temps pour mieux comprendre pourquoi les données peuvent être considérées comme anormales ou non anormales.
* La **Prévisualisation d'Évaluation** est plus longue que la fenêtre d'alerte et fournit un aperçu de ce que l'algorithme des anomalies prend en compte lors du calcul des limites.

### Définir les conditions d'alerte {#set-alert-conditions}

Déclenchez une alerte si les valeurs ont été `above or below`, `above` ou `below` les limites pendant les `15 minutes`, `1 hour`, etc. ou `custom` pour définir une valeur entre 15 minutes et 2 semaines. Récupérez si les valeurs sont dans les limites pendant au moins `15 minutes`, `1 hour`, etc. ou `custom` pour définir une valeur entre 15 minutes et 2 semaines.

Détection des anomalies
: Avec l'option par défaut (`above or below`), une métrique est considérée comme anormale si elle est en dehors de la bande d'anomalie grise. En option, vous pouvez spécifier si le fait d'être seulement `above` ou `below` les bandes est considéré comme anormal.

Fenêtre de déclenchement
: Combien de temps est nécessaire pour que la métrique soit anormale avant que l'alerte ne se déclenche. **Remarque**: Si la fenêtre d'alerte est trop courte, vous pourriez recevoir de fausses alarmes en raison de bruit parasite.

Fenêtre de récupération
: La durée nécessaire pour que la métrique ne soit plus considérée comme anormale, permettant à l'alerte de se rétablir. Il est recommandé de définir la **Fenêtre de récupération** à la même valeur que la **Fenêtre de Déclenchement**. 

**Remarque**: La plage des valeurs acceptées pour la **Fenêtre de récupération** dépend de la **Fenêtre de Déclenchement** et du **Seuil d'alerte** pour garantir que le moniteur ne peut pas satisfaire à la fois la condition de récupération et la condition d'alerte en même temps.
Exemple :
* `Threshold`: 50%
* `Trigger window`: 4h
La plage des valeurs acceptées pour la fenêtre de récupération est comprise entre 121 minutes (`4h*(1-0.5) +1 min = 121 minutes`) et 4 heures. Définir une fenêtre de récupération inférieure à 121 minutes pourrait entraîner un délai de 4 heures avec 50% de points anormaux et les 120 dernières minutes sans points anormaux.

Un autre exemple :
* `Threshold`: 80%
* `Trigger window`: 4h
La plage des valeurs acceptées pour la fenêtre de récupération est comprise entre 49 minutes (`4h*(1-0.8) +1 min = 49 minutes`) et 4 heures.

### Options avancées {#advanced-options}

Datadog analyse automatiquement votre métrique choisie et définit plusieurs paramètres pour vous. Cependant, vous pouvez modifier ces options sous **Options avancées**.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="Le menu Options avancées dans la page de configuration du moniteur d'anomalies avec la configuration définie pour détecter les anomalies 2 écarts par rapport aux données prédites en utilisant l'algorithme agile avec une saisonnalité hebdomadaire, pour prendre en compte l'heure d'été, et pour utiliser un intervalle de rollup de 60 secondes." style="width:80%;">}}


Déviations
: La largeur de la bande grise. Cela équivaut au paramètre de limites utilisé dans la [fonction d'anomalies][3].

Algorithme
: L'[algorithme de détection d'anomalies](#anomaly-detection-algorithms) (`basic`, `agile` ou `robust`).

Caractère saisonnier
: La [saisonnalité](#seasonality) (`hourly`, `daily` ou `weekly`) du cycle pour l'algorithme `agile` ou `robust` afin d'analyser la métrique.

L'heure d'été
: Disponible pour la détection d'anomalies `agile` ou `robust` avec une saisonnalité `weekly` ou `daily`. Pour plus d'informations, voir [Détection d'anomalies et fuseaux horaires][4].

Cumul
: L'[intervalle de rollup][5].

Seuils
: Le pourcentage de points qui doivent être anormaux pour l'alerte, l'avertissement et la récupération.

### Saisonnalité {#seasonality}

Toutes les heures
: L'algorithme s'attend à ce que la même minute après l'heure se comporte comme les minutes passées après l'heure, par exemple 5:15 se comporte comme 4:15, 3:15, etc.

Daily
: L'algorithme s'attend à ce que la même heure aujourd'hui se comporte comme les jours passés, par exemple 17h aujourd'hui se comporte comme 17h hier.

Weekly
: L'algorithme s'attend à ce qu'un jour donné de la semaine se comporte comme les jours passés de la semaine, par exemple ce mardi se comporte comme les mardis passés.

**Historique de données requis pour l'algorithme de détection d'anomalies**: Les algorithmes d'apprentissage automatique nécessitent au moins trois fois plus de temps de données historiques que le temps de saisonnalité choisi pour calculer la ligne de base.
Exemple :

* _Une saisonnalité_ hebdomadaire nécessite au moins trois semaines de données
* _Une saisonnalité_ quotidienne nécessite au moins trois jours de données
* _Une saisonnalité_ horaire nécessite au moins trois heures de données

Tous les algorithmes saisonniers peuvent utiliser jusqu'à six semaines de données historiques lors du calcul de la plage normale de comportement attendue d'une métrique. En utilisant une quantité significative de données passées, les algorithmes évitent de donner trop de poids à des comportements anormaux qui pourraient avoir eu lieu récemment.

### Algorithmes de détection d'anomalies {#anomaly-detection-algorithms}
Basic
: Utiliser lorsque les métriques n'ont pas de motif saisonnier répétitif. Basic utilise un calcul simple de quantile glissant pour déterminer la plage des valeurs attendues. Il utilise peu de données et s'ajuste rapidement aux conditions changeantes, mais n'a aucune connaissance du comportement saisonnier ou des tendances plus longues.

Agile
: Utiliser lorsque les métriques sont saisonnières et susceptibles de changer. L'algorithme s'ajuste rapidement aux changements de niveau des métriques. Cet algorithme est une version robuste de l'algorithme [SARIMA][6]. Il intègre les dernières données historiques à ses prédictions, ce qui lui permet de s'adapter rapidement aux changements de niveaux, mais qui lui vaut d'être moins robuste pour les anomalies récentes sur le long terme.

Robust
: Utiliser lorsque les métriques saisonnières sont censées être stables, et que des changements de niveau lents sont considérés comme des anomalies. Un algorithme de [décomposition tendance saisonnière][7], il est stable et les prévisions restent constantes même en cas d'anomalies durables, au prix d'une réponse plus lente aux changements de niveau prévus (par exemple, si le niveau d'une métrique change en raison d'un changement de code).

## Exemples {#examples}
Les graphiques ci-dessous illustrent comment et quand ces trois algorithmes se comportent différemment les uns des autres.

#### Comparaison de détection d'anomalies pour la saisonnalité horaire {#anomaly-detection-comparison-for-hourly-seasonality}
Dans cet exemple, `basic` identifie avec succès les anomalies qui sortent de la plage normale de valeurs, mais n'incorpore pas le motif saisonnier répétitif dans sa plage de valeurs prédites. En revanche, `robust` et `agile` reconnaissent tous deux le motif saisonnier et peuvent détecter des anomalies plus nuancées, par exemple si la métrique devait se stabiliser près de sa valeur minimale. La tendance montre également un motif horaire, donc la saisonnalité horaire fonctionne mieux dans ce cas.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="Comparaison des algorithmes de détection d'anomalies avec saisonnalité quotidienne" style="width:90%;">}}

#### Comparaison de détection d'anomalies pour la saisonnalité hebdomadaire {#anomaly-detection-comparison-for-weekly-seasonality}
Dans cet exemple, la métrique présente un changement de niveau soudain. `Agile` s'ajuste plus rapidement au changement de niveau que `robust`. De plus, la largeur des limites de `robust` augmente pour refléter une plus grande incertitude après le changement de niveau ; la largeur des limites de `agile` reste inchangée. `Basic` est clairement inadapté à ce scénario, où la métrique présente un fort schéma saisonnier hebdomadaire.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="comparaison des algorithmes de détection d'anomalies avec saisonnalité hebdomadaire" style="width:90%;">}}

#### Comparaison des réactions des algorithmes au changement {#comparison-of-algorithm-reactions-to-change}
Cet exemple montre comment les algorithmes réagissent à une anomalie d'une heure. `Robust` n'ajuste pas les limites pour l'anomalie dans ce scénario car il réagit plus lentement aux changements brusques. Les autres algorithmes commencent à se comporter comme si l'anomalie était la nouvelle norme. `Agile` identifie même le retour de la métrique à son niveau d'origine comme une anomalie.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="comparaison des algorithmes de détection d'anomalies avec saisonnalité horaire :" style="width:90%;">}}

#### Comparaison des réactions des algorithmes à l'échelle {#comparison-of-algorithm-reactions-to-scale}
Les algorithmes traitent l'échelle différemment. `Basic` et `robust` sont insensibles à l'échelle, tandis que `agile` ne l'est pas. Les graphiques à gauche ci-dessous montrent que `agile` et `robust` marquent le changement de niveau comme étant anormal. À droite, 1000 est ajouté à la même métrique, et `agile` ne signale plus le changement de niveau comme étant anormal tandis que `robust` continue de le faire.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="comparaison des algorithmes à l'échelle" style="width:90%;">}}

#### Comparaison de la détection d'anomalies pour de nouvelles métriques {#anomaly-detection-comparison-for-new-metrics}
Cet exemple montre comment chaque algorithme gère une nouvelle métrique. `Robust` et `agile` ne montrent aucune limite pendant les premières saisons (hebdomadaires). `Basic` commence à montrer des limites peu après l'apparition de la métrique.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="comparaison des algorithmes pour une nouvelle métrique" style="width:90%;">}}

## Conditions d'alerte avancées {#advanced-alert-conditions}

Pour des instructions détaillées sur les options d'alerte avancées (résolution automatique, délai d'évaluation, etc.), consultez la page [Configuration du moniteur][8]. Pour l'option de fenêtre de données complète spécifique à la métrique, consultez la page [Moniteur de métriques][9].

## Notifications {#notifications}

Pour des instructions détaillées sur la section **Configurer les notifications et les automatisations**, consultez la page [Notifications][10].

## API {#api}

Les clients ayant un plan entreprise peuvent créer des moniteurs de détection d'anomalies en utilisant le [point de terminaison API create-monitor][11]. Datadog **recommande fortement** [d'exporter le JSON d'un moniteur][12] pour construire la requête pour l'API. En utilisant la [page de création de moniteur][1] dans Datadog, les clients bénéficient du graphique d'aperçu et de l'ajustement automatique des paramètres pour éviter un moniteur mal configuré.

Les moniteurs d'anomalies sont gérés en utilisant la [même API][14] que les autres moniteurs. Ces champs sont uniques pour les moniteurs d'anomalies :

### `query` {#query}

La propriété `query` dans le corps de la requête doit contenir une chaîne de requête au format suivant :

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<count_default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

`query_window`
: Une période de temps comme `last_4h` ou `last_7d`. Ce paramètre contrôle la plage de temps des données affichées dans les graphiques de notification. Le `query_window` détermine combien de données historiques apparaissent dans la visualisation mais n'affecte pas l'évaluation des alertes. Datadog recommande que le `query_window` soit environ cinq fois le `alert_window` pour fournir un contexte supplémentaire. **Remarque**: Le `query_window` doit être au moins aussi grand que le `alert_window`. 

`metric_query`
: Une requête de métrique standard Datadog (par exemple, `sum:trace.flask.request.hits{service:web-app}.as_count()`).

`algorithm`
: `basic`, `agile`, ou `robust`.

`deviations`
: Un nombre positif ; contrôle la sensibilité de la détection d'anomalies.

`direction`
: La directionnalité des anomalies qui devraient déclencher une alerte: `above`, `below`, ou `both`.

`alert_window`
: La période à vérifier pour les anomalies (par exemple, `last_5m`, `last_1h`).

`interval`
: Un entier positif représentant le nombre de secondes dans l'intervalle de regroupement. Il doit être inférieur ou égal à un cinquième de la durée `alert_window`.

`count_default_zero`
: Utilisez `true` pour la plupart des moniteurs. Réglez sur `false` uniquement si vous soumettez une métrique de comptage dans laquelle l'absence de valeur ne doit _pas_ être interprétée comme un zéro.

`seasonality`
: `hourly`, `daily`, ou `weekly`. Excluez ce paramètre lors de l'utilisation de l'algorithme `basic`.

`threshold`
: Un nombre positif ne dépassant pas 1. La fraction de points dans le `alert_window` qui doit être anormale pour qu'une alerte critique soit déclenchée.

Vous trouverez ci-dessous un exemple pour un monitor de détection d'anomalies qui vous informe lorsque l'utilisation moyenne du processeur de votre nœud Cassandra a dépassé une valeur ordinaire correspondant à trois fois l'écart type pendant les 5 dernières minutes :

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

Cette requête utilise `avg` à deux endroits :
- `avg(last_1h)` - Agrège les points de données d'anomalie sur la fenêtre de requête pour les graphiques de notification
- `avg:system.cpu.system{name:cassandra}` - Agrège la métrique CPU sur les nœuds Cassandra avant la détection d'anomalies

### `options` {#options}

La plupart des propriétés sous `options` dans le corps de la requête sont les mêmes que pour d'autres alertes de requête, sauf pour `thresholds` et `threshold_windows`.

`thresholds`
: Les moniteurs d'anomalies supportent `critical`, `critical_recovery`, `warning`, et `warning_recovery` seuils. Les seuils sont exprimés comme des nombres de 0 à 1, et sont interprétés comme la fraction de la fenêtre associée qui est anormale. Par exemple, une valeur de seuil `critical` de `0.9` signifie qu'une alerte critique se déclenche lorsque au moins 90 % des points dans le `trigger_window` (décrit ci-dessous) sont anormaux. Ou, une valeur `warning_recovery` de 0 signifie que le moniteur se rétablit de l'état d'avertissement uniquement lorsque 0 % des points dans le `recovery_window` sont anormaux.
: Le `critical` `threshold` doit correspondre au `threshold` utilisé dans le `query`.

`threshold_windows`
: Les moniteurs d'anomalies ont une propriété `threshold_windows` dans `options`. `threshold_windows` doit inclure les deux propriétés—`trigger_window` et `recovery_window`. Ces fenêtres sont exprimées sous forme de chaînes de temps, telles que `last_10m` ou `last_1h`. Le `trigger_window` doit correspondre au `alert_window` provenant du `query`. Le `trigger_window` est la plage horaire qui est analysée pour détecter des anomalies lors de l'évaluation de la nécessité de déclencher un moniteur. Le `recovery_window` est la plage horaire analysée pour détecter des anomalies lors de l'évaluation de la nécessité de rétablir un moniteur déclenché.

Voici à quoi ressemble une configuration standard des seuils et période de seuil :

```json
"options": {
  ...
  "thresholds": {
    "critical": 1,
    "critical_recovery": 0
  },
  "threshold_windows": {
    "trigger_window": "last_30m",
    "recovery_window": "last_30m"
  }
}
```

## Dépannage {#troubleshooting}

* [FAQ sur le moniteur d'anomalies][15]
* [Mettre à jour le fuseau horaire du moniteur d'anomalies][16]
* [Contacter le support Datadog][17]

## Lectures complémentaires : {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/anomaly
[2]: /fr/monitors/types/metric/#define-the-metric
[3]: /fr/dashboards/functions/algorithms/#anomalies
[4]: /fr/monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /fr/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /fr/monitors/configuration/#advanced-alert-conditions
[9]: /fr/monitors/types/metric/#data-window
[10]: /fr/monitors/notify/
[11]: /fr/api/v1/monitors/#create-a-monitor
[12]: /fr/monitors/status/#settings
[13]: mailto:billing@datadoghq.com
[14]: /fr/api/v1/monitors/
[15]: /fr/monitors/guide/anomaly-monitor/
[16]: /fr/monitors/guide/how-to-update-anomaly-monitor-timezone/
[17]: /fr/help/