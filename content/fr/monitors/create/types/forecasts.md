---
aliases:
- /fr/guides/forecasts/
- /fr/monitors/monitor_types/forecasts
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
kind: documentation
title: Monitor de prévisions
---

## Présentation

Les prévisions sont une fonctionnalité algorithmique qui vous permet de prédire le comportement futur d'une métrique. Elles sont particulièrement utiles pour les métriques qui possèdent de fortes tendances ou des modèles récurrents. Par exemple, si votre application commence à enregistrer davantage de logs, les prévisions peuvent vous prévenir une semaine en avance que vos disques n'auront plus d'espace libre, ce qui vous confère suffisamment de temps pour mettre à jour votre stratégie de rotation. Vous pouvez également utiliser les prévisions sur vos métriques opérationnelles, telles que le nombre d'inscriptions d'utilisateurs, pour suivre votre avancement par rapport à vos objectifs trimestriels.

## Création d'un monitor

Pour créer un [monitor de prévisions][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Forecast*.

### Définir la métrique

Toutes les métriques actuellement transmises à Datadog peuvent être surveillées. Pour obtenir des informations supplémentaires, consultez la page [Monitor de métrique][2].

Une fois la métrique définie, le monitor de prévisions génère deux graphiques d'aperçu dans l'éditeur :
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="Graphiques de l'éditeur" style="width:95%;">}}

* Le graphique **Historical View** vous permet d'explorer les données de métriques antérieures sur différentes périodes.
* Le graphique **Evaluation Preview** affiche une combinaison de données de métriques historiques et prévisionnelles.

### Définir vos conditions d'alerte

* Déclencher une alerte lorsque la limite de confiance des prévisions passe `above` ou `below`
* du seuil sur un intervalle de `24 hours`, `1 week`, `1 month`, etc. ou sur un intervalle `custom` (entre 12 heures et 3 mois).
* Seuil d'alerte : >= `<NOMBRE>`
* [Seuil de rétablissement][3] d'alerte : < `<NOMBRE>`

#### Options avancées

Datadog analyse automatiquement la métrique choisie et définit plusieurs paramètres pour vous. Cependant, les options peuvent être modifiées dans **Advanced Options** :

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Options avancées" style="width:80%;">}}

| Option                     | Description                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [Algorithme](#algorithmes)   | Algorithme de prévision (`linear` ou `seasonal`)                                                                         |
| Modèle                      | Modèle de prévision (`default`, `simple` ou `reactive`) pour l'algorithme linear                                        |
| Saisonnalité                | Caractère saisonnier d'une prévision (`hourly`, `daily` ou `weekly`) pour l'algorithme saisonnier                         |
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
| Valeur par défaut  | S'ajuste à la dernière tendance et extrapole les données tout en ignorant les valeurs parasites récentes. |
| Simple   | Effectue une régression linéaire robuste sur l'ensemble des données historiques.                                |
| Reactive | Extrapole plus facilement le comportement récent, mais est davantage susceptible de trop s'ajuster aux valeurs parasites, aux pics et aux creux.  |

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

Utilisez l'algorithme seasonal pour les métriques qui affichent des tendances récurrentes. Il est possible de choisir parmi trois _caractères saisonniers_ différents :

| Option  | Description                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly  | L'algorithme s'attend à ce qu'une même minute d'une heure donnée se comporte comme celles des heures précédentes. Par exemple, les données de 17 h 15 doivent être similaires à celles de 16 h 15, 15 h 15, etc.      |
| Daily   | L'algorithme s'attend à ce qu'une heure donnée se comporte comme celles des jours précédents. Par exemple, les données du jour pour 17 h doivent être similaires à celles de 17 h la veille.                                |
| Weekly  | L'algorithme s'attend à ce qu'un jour de la semaine donné se comporte comme ceux des semaines précédentes. Par exemple, les données d'un mardi doivent être similaires à celles des mardis précédents.        |

**Remarque** : cet algorithme exige au moins deux saisons de données historiques et utilise jusqu'à six saisons pour les prévisions.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="saisonnier"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (statut no data, délai d'évaluation, etc.), consultez la documentation relative à la [configuration des monitors][6]. Pour découvrir les options de chaque métrique en matière d'intervalle de mesure entier des données, consultez la section [Monitor de métrique][7].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][8].

## API

Pour automatiser la création de monitors de prévisions, consultez la [documentation de référence sur l'API Datadog][9]. Datadog vous **conseille fortement** d'[exporter le JSON d'un monitor][5] pour créer la requête pour l'API. Depuis la [page de création de monitors][1] de Datadog, les clients peuvent tirer parti du graphique d'aperçu et de l'ajustement automatique des paramètres pour éviter toute erreur de configuration.

Les monitors de prévisions sont gérés via la [même API][11] que les autres monitors. Le contenu de la propriété `query` doit toutefois être décrit plus en détail.

La propriété `query` dans le corps de la requête doit contenir une chaîne de requête au format suivant :

```text
<agrégateur>(<période_requête>):forecast(<requête_métrique>, '<algorithme>', <déviations>, interval=<intervalle>[, history='<historique>'][, model='<modèle>'][, seasonality='<saisonnalité>']) <comparateur> <seuil>
```

* `agrégateur` : utiliser `min` si l'alerte doit se déclencher lorsque la prévision passe en dessous du seuil. Utiliser `max` si l'alerte doit se déclencher lorsque la prévision passe au-dessus du seuil.
* `période_requête` : intervalle, par exemple `last_4h` ou `last_7d`. Datadog vous conseille de choisir un intervalle environ cinq fois supérieur à la `période_alerte`, et il ne doit pas être inférieur à celle-ci. Ce paramètre détermine l'intervalle affiché dans les graphiques des notifications.
* `requête_métrique` : requête de métrique Datadog standard. Exemple : `min:system.disk.free{service:database,device:/data}by{host}`.
* `algorithme` : `linear` ou `seasonal`
* `déviations` : un nombre supérieur ou égal à un. Ce paramètre détermine la taille des limites de confiance, ce qui permet de rendre un monitor plus ou moins sensible.
* `intervalle` : un nombre entier positif représentant le nombre de secondes de l'intervalle de cumul.
* `historique` : une chaîne représentant la quantité de données historiques à utiliser pour effectuer la prévision. Exemple : `1w`, `3d`. Ce paramètre s'utilise uniquement avec l'algorithme `linear`.
* `modèle` : le type de modèle à utiliser parmi `default`, `simple` et `reactive`. Ce paramètre s'utilise uniquement avec l'algorithme `linear`.
* `saisonnalité` : la saisonnalité à utiliser parmi `hourly`, `daily` et `weekly`. Ce paramètre s'utilise uniquement avec l'algorithme `seasonal`.
* `comparateur` : utiliser `<=` si l'alerte doit se déclencher lorsque la prévision passe en dessous du seuil. Utiliser `>=` si l'alerte doit se déclencher lorsque la prévision passe au-dessus du seuil.
* `seuil` : déclencher une alerte critique si les limites de confiance de la prévision atteignent ce seuil.

## Dépannage

Les fonctions suivantes ne peuvent pas être imbriquées dans des appels de la fonction `forecast()` :<br>
`anomalies`, `cumsum`, `integral`, `outliers`, `piecewise_constant`, `robust_trend` ou `trend_line`

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html"  >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /fr/monitors/create/types/metric/#define-the-metric
[3]: /fr/monitors/faq/what-are-recovery-thresholds/
[4]: /fr/monitors/faq/how-to-update-anomaly-monitor-timezone/
[5]: /fr/dashboards/functions/rollup/
[6]: /fr/monitors/create/configuration/#advanced-alert-conditions
[7]: /fr/monitors/create/types/metric/#data-window
[8]: /fr/monitors/notify/
[9]: /fr/api/v1/monitors/#create-a-monitor
[10]: /fr/monitors/manage/status/#settings
[11]: /fr/api/v1/monitors/