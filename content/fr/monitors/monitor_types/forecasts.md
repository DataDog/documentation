---
title: Monitor de prévisions
kind: documentation
aliases:
  - /fr/guides/forecasts/
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
## Présentation

Les prévisions sont une fonctionnalité algorithmique qui vous permet de prédire le comportement futur d'une métrique. Elles sont particulièrement utiles pour les métriques qui possèdent de fortes tendances ou des modèles récurrents. Par exemple, si votre application commence à enregistrer davantage de logs, les prévisions peuvent vous prévenir une semaine en avance que vos disques n'auront plus d'espace libre, ce qui vous confère suffisamment de temps pour mettre à jour votre stratégie de rotation. Vous pouvez également utiliser les prévisions sur vos métriques opérationnelles, telles que le nombre d'inscriptions d'utilisateurs, pour suivre votre avancement par rapport à vos objectifs trimestriels.

## Création d'un monitor

Pour créer un [monitor de prévisions][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Forecast*.

### Définir la métrique

Toutes les métriques actuellement transmises à Datadog peuvent être surveillées. Pour obtenir des informations supplémentaires, consultez la page [Monitor de métrique][2].

Une fois la métrique définie, le monitor de prévisions génère deux graphiques d'aperçu dans l'éditeur :
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Graphiques de l'éditeur" responsive="true" style="width:95%;">}}

* Le graphique **Historical View** vous permet d'explorer les données de métriques antérieures sur différentes périodes.
* Le graphique **Evaluation Preview** affiche une combinaison de données de métriques historiques et prévisionnelles.

### Définir vos conditions d'alerte

* Déclencher une alerte lorsque la limite de confiance des prévisions passe `above` ou `below`
* du seuil au cours de la période à venir qui suit : `24 hours`, `1 week`, `1 month`, etc.
* Seuil d'alerte : >= `<NOMBRE>`
* [Seuil de rétablissement][3] d'alerte : < `<NOMBRE>`

#### Options avancées

Datadog analyse automatiquement la métrique choisie et définit plusieurs paramètres pour vous. Cependant, les options peuvent être modifiées dans **Advanced Options** :

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Options avancées" responsive="true" style="width:80%;">}}

| Option                     | Description                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Algorithme](#algorithms)   | Algorithme de prévision (`linear` ou `seasonal`)                                                                         |
| Modèle                      | Modèle de prévision (`default`, `simple` ou `reactive`) pour l'algorithme linear                                        |
| Caractère saisonnier                | Caractère saisonnier d'une prévision (`hourly`, `daily` ou `weekly`) pour l'algorithme saisonnier                         |
| [Changement d'heure][4] | Disponible pour les monitors de prévisions `seasonal` avec le caractère saisonnier `daily` ou `weekly`.                            |
| [Rollup][5]                | L'intervalle de cumul. L'utilisation d'un intervalle important entre les différents points permet de limiter l'influence des valeurs parasites sur les prévisions.                        |
| Déviations                 | La largeur de la plage des valeurs prédites. Une valeur de 1 ou 2 est généralement suffisante pour prévoir la plupart des points « normaux ». |

##### Algorithmes

Les algorithmes de prévision disponibles sont `linear` et `seasonal` :

{{< tabs >}}
{{% tab "Linear" %}}

Utilisez l'algorithme linear pour les métriques qui évoluent de façon stable et n'affichent pas de tendance saisonnière récurrente. La sensibilité de l'algorithme linear aux changements de niveau peut être ajustée en sélectionnant l'un des trois modèles disponibles :

| Modèle    | Description                                                                                |
|----------|--------------------------------------------------------------------------------------------|
| Default  | S'ajuste à la dernière tendance et extrapole les données tout en ignorant les valeurs parasites récentes. |
| Simple   | Effectue une régression linéaire robuste sur l'ensemble des données historiques.                                |
| Reactive | Extrapole plus facilement le comportement récent, mais est davantage susceptible de trop s'ajuster aux valeurs parasites, aux pics et aux creux.  |

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" responsive="true" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" responsive="true" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" responsive="true" style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

Utilisez l'algorithme seasonal pour les métriques qui affichent des tendances récurrentes. Il est possible de choisir parmi trois _caractères saisonniers_ différents :

| Option  | Description                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly  | L'algorithme s'attend à ce qu'une même minute d'une heure donnée se comporte comme celles des heures précédentes. Par exemple, les données de 17 h 15 doivent être similaires à celles de 16 h 15, 15 h 15, etc.      |
| Daily   | L'algorithme s'attend à ce qu'une heure donnée se comporte comme celles des jours précédents. Par exemple, les données du jour pour 17 h doivent être similaires à celles de 17 h la veille.                                |
| Weekly  | L'algorithme s'attend à ce qu'un jour de la semaine donné se comporte comme ceux des semaines précédentes. Par exemple, les données d'un mardi doivent être similaires à celles des mardis précédents.        |

**Remarque** : cet algorithme exige au moins deux saisons de données historiques et utilise jusqu'à six saisons pour les prévisions.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][6].

## API

Pour automatiser la création de monitors de prévisions, consultez la [documentation de référence sur l'API Datadog][7]. Datadog vous conseille d'[exporter le JSON d'un monitor][8] pour créer la requête pour l'API.

## Dépannage

Les fonctions suivantes ne peuvent pas être imbriquées dans des appels de la fonction `forecast()` :<br>
`anomalies`, `cumsum`, `integral`, `outliers`, `piecewise_constant`, `robust_trend` ou `trend_line`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" responsive="true" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /fr/monitors/monitor_types/metric/#define-the-metric
[3]: /fr/monitors/faq/what-are-recovery-thresholds
[4]: /fr/monitors/faq/how-to-update-anomaly-monitor-timezone
[5]: /fr/graphing/functions/rollup
[6]: /fr/monitors/notifications
[7]: /fr/api/#create-a-monitor
[8]: /fr/monitors/monitor_status/#settings