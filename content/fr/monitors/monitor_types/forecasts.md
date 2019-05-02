---
title: Monitor forecast
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
Les prévisions sont une fonctionnalité algorithmique qui vous permet de prédire le comportement futur d'une métrique. Elles sont particulièrement utiles pour les métriques qui possèdent de fortes tendances ou des modèles récurrents.

Par exemple, si votre application commence la journalisation à un taux plus rapide, les prévisions peuvent vous prévenir une semaine en avance que vos disques n'auront plus d'espace libre, ce qui vous confère suffisamment de temps pour mettre à jour votre stratégie de rotation de logs. Vous pouvez également utiliser des prévisions sur des métriques métier, telles que le nombre d'inscriptions d'utilisateurs, pour suivre votre avancement par rapport à vos objectifs trimestriels.

## Fonction forecast

Le langage de requête de Datadog est doté d'une fonction `forecast`. Lorsque vous appliquez cette fonction à une série, elle renvoie les résultats habituels ainsi qu'une prévision des futures valeurs.

## Créer un monitor

Vous pouvez créer des monitors qui se déclenchent lorsqu'il est prévu que des métriques atteignent un certain seuil. L'alerte se déclenche lorsqu'une partie de la plage de valeurs prédites dépasse le seuil. En pratique, cela peut par exemple être utilisé pour surveiller un groupe de disques affichant des schémas d'utilisation similaires : `max:system.disk.in_use{service:service_name, device:/data} by {host}`.

Accédez à la [page Monitor][1] pour les **alertes de prévision**. Remplissez ensuite la section **Define the metric** comme pour n'importe quel autre monitor.

{{< img src="monitors/monitor_types/forecasts/alert_conditions.png" alt="conditions d'alerte" responsive="true" style="width:80%;">}}

Vous devez définir trois options pour configurer une alerte de prévision :

* Le seuil de déclenchement de l'alerte. Pour une métrique comme `system.disk.in_use`, définissez le seuil sur 1.0. À l'inverse, pour une métrique comme `system.mem.pct_usable`, définissez-le sur 0.0. Un [seuil d'annulation][2] est également requis.
* La condition de déclenchement de l'alerte. Pour une métrique comme `system.disk.in_use`, choisissez « above or equal to ». À l'inverse, pour une métrique comme `system.mem.pct_usable`, choisissez « below or equal to ».
* Choisissez combien de temps à l'avance vous souhaitez recevoir l'alerte avant que votre métrique atteigne son seuil critique.

{{< img src="monitors/monitor_types/forecasts/alert_advanced.png" alt="alerte avancée" responsive="true" style="width:80%;" >}}

Datadog définit automatiquement pour vous les options **Advanced** en analysant votre métrique. Veuillez noter que tout changement apporté à la section **Define the metric** peut modifier les réglages des options avancées.

* Vous pouvez sélectionner l'algorithme de prévision utilisé. Consultez la section [Algorithmes de prévision](#algorithmes-de-prevision) pour découvrir comment choisir le bon algorithme en fonction de vos besoins. Chaque algorithme possède également des paramètres supplémentaires, qui sont décrits dans la section suivante.
* Datadog recommande l'utilisation d'intervalles importants entre chaque point pour éviter que les prévisions n'aient trop de valeurs parasites.
* Le nombre d'écarts contrôle la largeur de la plage des valeurs prédites. Indiquez 1 ou 2 pour prévoir avec précision la plupart des points « normaux ».

Indiquez ensuite si vous souhaitez que le monitor exige une période complète de données pour lancer l'évaluation. Si vous choisissez « Requires », le monitor est contraint d'ignorer (à savoir, d'afficher l'état de monitor « No Data ») toutes les séries qui ne possèdent pas de données depuis l'heure de début de l'intervalle indiqué dans le graphique de période d'évaluation.

Suivez toutes les étapes du formulaire New Monitor (**Say what's happening**, etc.) et cliquez sur **Save** pour créer un monitor forecast.

Les pages Monitor Edit et Monitor Status disposent d'un contexte historique vous permettant d'étudier le comportement historique de la métrique. Cela vous permet d'obtenir des informations pertinentes sur les données prises en compte par l'algorithme de prévision lors de la détermination des futures valeurs.

## Algorithmes de prévision

Il existe deux différents algorithmes de prévision :

**Linear** : utilisez cet algorithme pour les métriques qui n'ont pas de modèle saisonnier récurrent et sont susceptibles de présenter des tendances régulières. Sur les tableaux de bord, l'algorithme linear utilise les données affichées pour créer une prévision sur une durée identique. Par exemple, si vous définissez le sélecteur de durée sur « The Past Week », la fonction utilise les données de la semaine précédente pour prédire les valeurs de la semaine suivante. Pour les monitors, vous pouvez définir explicitement la période de données historiques à utiliser. Par défaut, celle-ci est définie sur une semaine. 

{{< img src="monitors/monitor_types/forecasts/linear.png" alt="linear" responsive="true" style="width:80%;" >}}

L'algorithme linear possède trois _modèles_ différents. Ils contrôlent la sensibilité de l'algorithme aux changements de niveau.

Le modèle « simple » effectue une régression linéaire robuste sur l'ensemble des données historiques.

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" responsive="true" style="width:80%;">}}

Le modèle « reactive » extrapole plus facilement le comportement récent, mais est davantage susceptible de trop s'ajuster aux valeurs parasites, aux pics ou aux creux.

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" responsive="true" style="width:80%;" >}}

Le modèle « default » combine les caractéristiques des deux premiers modèles et s'ajuste à la dernière tendance. Il extrapole une ligne tout en ignorant les valeurs parasites récentes.

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" responsive="true" style="width:80%;">}}

**Seasonal** : utilisez cet algorithme pour les métriques saisonnières. Datadog détecte automatiquement le caractère saisonnier de la métrique dans les monitors et choisit une période d'une semaine, d'un jour ou d'une heure. Cet algorithme nécessite au moins deux périodes de données historiques pour prévoir des valeurs. Vous pouvez utiliser jusqu'à six périodes.

Exemples d'options sur le caractère saisonnier :

* **weekly** : l'algorithme estime que les valeurs de ce lundi seront similaires à celles des anciens lundis.
* **daily** : l'algorithme estime que les valeurs d'aujourd'hui à 19 h seront similaires à celles des autres jours à 19 h.
* **hourly** : l'algorithme estime que les valeurs de 17 h 15 seront similaires à celles de 17 h 15, 16 h 15, etc.

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" responsive="true" style="width:80%;">}}

### Accéder aux options avancées

Cliquez sur l'onglet **Advanced** de la page **New Monitor** pour accéder aux options avancées. Pour les définir dans les dashboards (à l'aide de l'onglet JSON) ou dans l'API, utilisez le format suivant :

Pour linear : `forecast(nom_métrique, 'linear', 1, interval='60m', history='1w', model='default')`. Valeurs autorisées pour `model` : `default`, `simple` ou `reactive`.

Pour seasonal : `forecast(nom_métrique, 'seasonal', 1, interval='60m', seasonality='weekly')`, Valeurs autorisées pour `seasonality` : `hourly`, `daily` ou `weekly`.

Si vous utilisez l'API, indiquez les heures de départ et de fin de la prévision. SI vous souhaitez prévoir les valeurs de la prochaine journée, indiquez l'heure de départ `now` et l'heure de fin `1 day ahead`.

### Attention

Les fonctions ne peuvent pas toutes être imbriquées dans des appels de la fonction `forecast()`. Vous ne pouvez notamment pas inclure les fonctions suivantes dans un monitor forecast ou dans une requête de dashboard : `anomalies()`, `cumsum()`, `integral()`, `outliers()`, `piecewise_constant()`, `robust_trend()` ou `trend_line()`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" responsive="true" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /fr/monitors/faq/what-are-recovery-thresholds