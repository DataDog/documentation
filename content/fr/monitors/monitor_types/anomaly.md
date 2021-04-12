---
title: Monitor d'anomalies
kind: documentation
aliases:
  - /fr/guides/anomalies
description: Détecte les comportements anormaux pour une métrique en fonction des données historiques
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

La détection d'anomalies est une fonction algorithmique qui identifie le comportement anormal d'une métrique en fonction de ses données historiques, comme les tendances et les variations saisonnières en fonction du jour de la semaine ou de l'heure. Cette fonctionnalité est idéale pour les métriques qui affichent des tendances marquées et des patterns récurrents, qui seraient difficiles (voire impossibles) à surveiller avec des alertes de seuil.

Par exemple, la détection d'anomalies peut vous aider à déterminer si votre trafic Web est anormalement bas pour un après-midi en semaine, même si ce même niveau de trafic serait normal plus tard dans la soirée. Elle vous permet également d'étudier une métrique mesurant le nombre de connexions à votre site, même si celui-ci est en pleine croissance. Puisque le nombre de visiteurs augmente chaque jour, l'utilisation de seuils ne serait pas pertinente. À l'inverse, la détection d'anomalies peut rapidement vous envoyer une alerte en cas de baisse inattendue, qui pourrait être liée à un dysfonctionnement du système de connexion.

## Création d'un monitor

Pour créer un [monitor d'anomalies][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Anomaly*.

### Définir la métrique

Toutes les métriques actuellement transmises à Datadog peuvent être surveillées. Pour obtenir des informations supplémentaires, consultez la page [Monitor de métrique][2].
**Remarque** : la fonction `anomalies` utilise des données historiques pour prédire un comportement futur. Ainsi, si vous utilisez ce type de monitor sur une nouvelle métrique, les résultats risquent de ne pas être pertinents.

Une fois la métrique définie, le monitor de détection des anomalies génère deux graphiques d'aperçu dans l'éditeur :
{{< img src="monitors/monitor_types/anomaly/context.png" alt="contexte historique" style="width:80%;">}}

* Le graphique **Historical View** vous permet de visualiser la requête surveillée sur différentes périodes pour mieux comprendre pourquoi les données peuvent être considérées comme anormales ou normales.
* Le graphique **Evaluation Preview** couvre une plus longue période que la période d'alerte et permet de visualiser les données prises en compte par l'algorithme d'anomalies pour le calcul des valeurs limites.

### Définir vos conditions d'alerte

* Déclencher une alerte si les valeurs sont `above or below`, `above` ou `below`
* aux limites depuis `15 minutes`, `1 hour` ou une période `custom` (comprise entre 15 minutes et 24 heures).
* Rétablir si les valeurs sont comprises entre les limites pendant une durée minimale de `15 minutes`, `1 hour` `custom` (comprise entre 15 minutes et 24 heures).

**Détection des anomalies** : avec l'option par défaut (`above ou below`), une métrique est considérée comme anormale si elle sort de la bande grise représentant les valeurs normales. Choisissez l'option `above` ou `below` pour être alerté uniquement si la métrique passe au-dessus ou en dessous de la bande grise.

**Période de déclenchement** : la durée pendant laquelle une métrique doit être anormale pour qu'une alerte se déclenche. **Remarque** : si la période d'alerte est trop courte, vous risquez de recevoir de fausses alertes pour de simples irrégularités.

**Période de rétablissement** : la durée pendant laquelle une métrique anormale doit afficher un comportement normal pour que l'alerte soit annulée.

#### Options avancées

Datadog analyse automatiquement la métrique choisie et définit plusieurs paramètres pour vous. Cependant, les options peuvent être modifiées dans **Advanced Options**.

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="options avancées" style="width:80%;">}}

| Option                      | Description                                                                                                                |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| Déviations                  | La largeur de la bande grise. Elle correspond au paramètre des limites utilisé pour la [fonction anomalies][3].                |
| Algorithme                   | L'[algorithme de détection des anomalies](#algorithme-de-detection-des-anomalies) (`basic`, `agile` ou `robust`).                          |
| [Caractère saisonnier](#seasonality) | Caractère saisonnier d'une prévision (`hourly`, `daily` ou `weekly`) pour l'algorithme saisonnier `agile` ou `robust` afin d'analyser la métrique. |
| [Changement d'heure][4]  | Disponible pour la détection d'anomalies `agile` ou `robost` avec le caractère saisonnier `weekly` ou `daily`.                                  |
| [Rollup][5]                 | L'intervalle de cumul.                                                                                                       |
| Seuils                  | Le pourcentage de points qui doivent être anormaux pour déclencher une alerte, un avertissement ou un rétablissement.                                    |

##### Caractère saisonnier

| Option | Description                                                                                                                                   |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly | L'algorithme s'attend à ce qu'une même minute d'une heure donnée se comporte comme celles des heures précédentes. Par exemple, les données de 17 h 15 doivent être similaires à celles de 16 h 15, 15 h 15, etc. |
| Daily  | L'algorithme s'attend à ce qu'une heure donnée se comporte comme celles des jours précédents. Par exemple, les données du jour pour 17 h doivent être similaires à celles de 17 h la veille.                           |
| Weekly | L'algorithme s'attend à ce qu'un jour de la semaine donné se comporte comme ceux des semaines précédentes. Par exemple, les données d'un mardi doivent être similaires à celles des mardis précédents.   |

**Remarque** : pour être réellement efficaces, les algorithmes d'apprentissage automatique nécessitent au moins deux fois plus de données historiques que l'intervalle saisonnier choisi.

##### Algorithmes de détection des anomalies

| Option | Cas d'utilisation                                                                                       | Description                                                                                                                                                                                                                                                           |
|--------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Basic  | Les métriques qui n'ont pas de tendance saisonnière récurrente.                                                     | Utilise un calcul simple reposant sur des quantiles cumulés avec un délai pour déterminer la plage de valeurs attendues. Cet algorithme utilise très peu de données et s'ajuste rapidement aux changements de conditions. Toutefois, il ne prend pas en compte le comportement saisonnier ni les tendances à plus long terme.                                         |
| Agile  | Les métriques saisonnières sont amenées à évoluer. L'algorithme doit être en mesure de s'adapter rapidement à ces évolutions. | Cet algorithme est une version robuste de l'algorithme [SARIMA][6]. Il intègre les dernières données historiques à ses prédictions, ce qui lui permet de s'adapter rapidement aux changements de niveaux, mais qui lui vaut d'être moins robuste pour les anomalies récentes sur le long terme.                                                |
| Robust | Les métriques saisonnières sont normalement stables. Les changements de niveaux légers sont considérés comme des anomalies.             | Un algorithme de [décomposition de tendance saisonnière][7] (article en anglais) particulièrement stable. Ses prédictions restent constantes même en cas d'anomalies sur le long terme, ce qui lui vaut un temps de réponse plus long en cas de changement de niveau attendu (par exemple, si le niveau d'une métrique change à la suite d'une modification du code). |

Tous les algorithmes saisonniers peuvent utiliser au maximum deux mois de données historiques lors du calcul de la plage normale de comportement attendue d'une métrique. En utilisant un volume conséquent de données passées, les algorithmes peuvent éviter de donner trop d'importance à un comportement anormal qui aurait pu avoir lieu il y a peu de temps.

**Exemples** :<br>
Les graphiques ci-dessous illustrent les différents comportements de ces trois algorithmes.

Dans cet exemple, `basic` identifie avec succès les anomalies qui quittent la plage normale de valeurs, sans tenir compte des tendances saisonnières et récurrentes pour déterminer la plage de valeurs prévues. À l'inverse, les algorithmes `robust`  et `agile` reconnaissent la tendance saisonnière et peuvent détecter des anomalies plus nuancées (p. ex., si la métrique se stabilise au niveau de sa valeur minimale).

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="comparaison d'algorithmes 1" style="width:90%;">}}

Dans cet exemple, la métrique affiche un changement de niveau soudain. L'algorithme `Agile` s'ajuste plus rapidement au changement de niveau que l'algorithme `robust`. En outre, la largeur des limites de l'algorithme `robust` augmente et reflète une plus grande incertitude après le changement de niveau, tandis que la largeur des limites de l'algorithme `agile` reste inchangée. L'algorithme `Basic` n'est clairement pas adapté à ce scénario, où la métrique affiche une tendance saisonnière marquée.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="comparaison d'algorithmes 2" style="width:90%;">}}

Cet exemple montre la réaction des algorithmes face à une anomalie d'une heure. L'algorithme `Robust` l'ignore complètement. Les autres se mettent à agir comme si l'anomalie représentait le nouveau critère de normalité. L'algorithme `Agile` considère même que le retour à la normale de la métrique est une anomalie.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="comparaison d'algorithmes 3" style="width:90%;">}}

Les algorithmes gèrent différemment les changements d'échelle. Les algorithmes `Basic` et `robust` n'y sont pas sensibles, contrairement à l'algorithme `agile`. Dans les graphiques de gauche, on remarque que les algorithmes `agile` et `robust` considèrent le changement de niveau comme une anomalie. Sur la droite, lorsque l'on fait augmenter la même métrique de 1 000, l'algorithme `agile` ne signale plus le changement de niveau comme une anomalie tandis que l'algorithme `robust` continue à le faire.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="comparaison d'algorithmes échelle" style="width:90%;">}}

Cet exemple montre comment chaque algorithme gère une nouvelle métrique. Les algorithmes `Robust` et `agile` ne présentent aucune limite pendant les premières saisons (hebdomadaire). L'algorithme `Basic`  commence à afficher des limites peu après l'apparition de la première métrique.

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="Comparaison d'algorithmes nouvelle métrique" style="width:90%;">}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][8].

## API

Les clients Enterprise peuvent créer un monitor de détection d'anomalies avec l'[endpoint d'API create-monitor][9]. Datadog vous **conseille fortement** d'[exporter le JSON d'un monitor][10] pour créer la requête de l'API. Grâce à la [page de création de monitors][1] de Datadog, les clients ont accès au graphique d'aperçu et peuvent ajuster les paramètres automatiques, afin de rattraper toute erreur de configuration.

**Remarque** : les monitors de détection d'anomalies sont uniquement disponibles pour les clients Enterprise. Si vous disposez d'un abonnement Pro et que vous souhaitez utiliser la fonctionnalité de détection d'anomalies, contactez votre chargé de compte ou envoyez un e-mail à l'[équipe de facturation Datadog][11].

Les monitors d'anomalies sont gérés à l'aide de la [même API][12] que les autres monitors. Les champs suivants sont uniquement disponibles pour les monitors d'anomalies :

### `query`

La propriété `query` dans le corps de la requête doit contenir une chaîne de requête au format suivant :

```text
avg(<période_requête>):anomalies(<requête_métrique>, '<algorithme>', <déviations>, direction='<direction>', alert_window='<période_alerte>', interval=<intervalle>, count_default_zero='<zéro_défaut>' [, seasonality='<caractère_saisonnier>']) >= <seuil>
```

* `période_requête` : intervalle, par exemple `last_4h` ou `last_7d`. Correspond à l'intervalle affiché dans les graphiques des notifications. Cette valeur ne doit pas être inférieure à `période_alerte`. Valeur recommandée : environ 5 fois la valeur de `période_alerte`.
* `requête_métrique` : requête de métrique Datadog standard. Exemple : `sum:trace.flask.request.hits{service:web-app}.as_count()`.
* `algorithme` : `basic`, `agile` ou `robust`.
* `déviations` : nombre positif permettant de régler la réactivité de la détection des anomalies.
* `direction` : indique si l'alerte doit être déclenchée lorsque les points se trouvent au-dessus de la bande de valeurs autorisées (`above`), en dessous (`below`) ou au-dessus et en dessous (`both`).
* `période_alerte`: intervalle de vérification des anomalies (p. ex., `last_5m` ou `last_1h`).
* `intervalle` : nombre entier positif représentant le nombre de secondes de l'intervalle de cumul. Valeur recommandée : au moins un cinquième de la durée de `alert_window`.
* `zéro_défaut` : indiquez la valeur `true` pour la plupart des monitors. Définissez uniquement la valeur `false` si l'envoi d'une métrique count sans valeur ne doit _pas_ être considérée comme une valeur nulle.
* `caractère_saisonnier`: `hourly`, `daily` ou `weekly`. Excluez ce paramètre si vous utilisez l'algorithme `basic`.
* `seuil` : nombre positif inférieur ou égal à 1. Correspond à la fraction de points de `période_alerte` qui doivent être anormaux pour déclencher une alerte critique.

Vous trouverez ci-dessous un exemple pour un monitor de détection d'anomalies qui vous informe lorsque la charge processeur moyenne de votre nœud Cassandra dépasse la valeur ordinaire par plus de trois fois l'écart type au cours des 5 dernières minutes :

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

### `options`

La plupart des propriétés sous `options` dans le corps de requête sont identiques aux autres alertes de requête, à l'exception de `thresholds` et `threshold_windows`.

**`thresholds`**

Les monitors d'anomalies prennent en charge les seuils `critical`, `critical_recovery`, `warning` et `warning_recovery`. Les seuils sont exprimés sous la forme de chiffres compris entre 0 et 1. Ces valeurs représentent la fraction d'anomalies de la période associée. Par exemple, si le seuil `critical` a pour valeur `0.9`, une alerte critique se déclenche lorsque 90 % des points de `trigger_window` (décrit ci-dessous) sont anormaux. De même, si la valeur de `warning_recovery` est définie sur 0, le monitor passe de l'état d'avertissement à l'état normal uniquement lorsque 0 % des points de `recovery_window` sont anormaux.

Le seuil `critical` doit correspondre au seuil utilisé dans la `query`.

**`threshold_windows`**

Les monitors d'anomalies possèdent une propriété `threshold_windows` dans `options`. Celle-ci doit inclure les deux propriétés suivantes : `trigger_window` et `recovery_window`. Ces périodes sont exprimées sous la forme de chaînes d'intervalle, par exemple `last_10m` ou `last_1h`. `trigger_window` doit correspondre à la propriété `alert_window` de `query`. `trigger_window` correspond à l'intervalle d'analyse des anomalies utilisé pour initier ou non le déclenchement d'un monitor. `recovery_window` correspond à l'intervalle d'analyse des anomalies utilisé pour initier ou non le rétablissement d'un monitor déclenché.

Voici à quoi ressemble une configuration standard des seuils et périodes de seuil :

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

## Dépannage

* [FAQ sur les monitors d'anomalies][13]
* [Contacter l'assistance Datadog][14]

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/anomaly
[2]: /fr/monitors/monitor_types/metric/#define-the-metric
[3]: /fr/dashboards/functions/algorithms/#anomalies
[4]: /fr/monitors/faq/how-to-update-anomaly-monitor-timezone/
[5]: /fr/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /fr/monitors/notifications/
[9]: /fr/api/v1/monitors/#create-a-monitor
[10]: /fr/monitors/monitor_status/#settings
[11]: mailto:billing@datadoghq.com
[12]: /fr/api/v1/monitors/
[13]: /fr/monitors/faq/anomaly-monitor/
[14]: /fr/help/