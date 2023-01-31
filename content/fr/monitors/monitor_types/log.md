---
title: Log Monitors
kind: documentation
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Vérifier le statut de votre monitor
---
## Présentation

Une fois la fonctionnalité [Log Management][1] activée pour votre organisation, vous pouvez créer des logs monitors afin de recevoir une alerte lorsqu'un type de log spécifique dépasse un seuil défini par l'utilisateur sur une période donnée.

## Création d'un monitor

Pour créer un [log monitor][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Logs*.

### Définir la requête de recherche

À mesure que vous définissez votre requête de recherche, le graphique au-dessus des champs de recherche se met à jour.

1. Créez votre requête de recherche en utilisant la même logique que pour une [recherche dans le Log Explorer][1].
2. Choisissez de surveiller un nombre de logs, une [facette][4] ou une [mesure][4] :
    * **Monitor over a log count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** une facette ou une mesure. Datadog évalue le nombre de logs sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet** : si vous sélectionnez une [facette][4], le monitor envoie une alerte en fonction du `Unique value count` (nombre de valeurs uniques) de la facette.
    * **Monitor over a measure** : si vous sélectionnez une [mesure][4], le monitor envoie une alerte en fonction de la valeur numérique de la facette de log (comme le ferait un monitor de métrique). Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Définissez les groupes d'alertes (facultatif). **Remarque** : que vous définissiez ou non des groupes d'alertes, vous recevez **une seule** alerte lorsque la valeur agrégée remplit les conditions définies. Même si vous triez la requête par host, une seule notification est envoyée si plusieurs hosts remplissent les conditions définies définies. Ce système permet de réduire le nombre de notifications reçues.


### Définir vos conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieur ou égale à, inférieure ou égale à)
* au seuil durant les `5 minutes`, `15 minutes` ou encore `1 hour` précédentes.
* Seuil d'alerte `<NOMBRE>`
* Seuil d'avertissement `<NOMBRE>`

#### Absence de données et alertes Below

Définissez la condition `below 1` pour recevoir une notification lorsque les groupes d'un service ont tous arrêté d'envoyer des logs. Vous serez ainsi alerté lorsqu'aucun log ne correspond à la requête du monitor sur un intervalle de temps donné pour tous les groupes d'agrégation.

Lorsque vous répartissez le monitor par dimension (tag ou facette) tout en utilisant une condition `below`, l'alerte se déclenche **uniquement** s'il existe des logs pour un groupe donné et que le nombre est inférieur au seuil, ou s'il n'y a aucun log pour **tous** les groupes.  

**Exemples** :

* Le monitor suivant se déclenche uniquement s'il n'y a aucun log pour tous les services :
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor Below réparti par service" style="width:60%;" >}}
* Le monitor suivant se déclenche s'il n'y a aucun log pour le service `backend` :  
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor Below pour le service backend" style="width:60%;" >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][5].

#### Exemples de log

Par défaut, lorsqu'un log monitor se déclenche, le message de notification envoyé comprend des exemples de log ou les valeurs principales.

| Élément surveillé     | Informations ajoutées au message de notification                                                                            |
|------------------|----------------------------------------------------------------------------------------------------------|
| Nombre de logs        | Alertes groupées : les 10 principales valeurs dépassant le seuil et les nombres de logs correspondants.<br>Alertes non groupées : jusqu'à 10 exemples de logs. |
| Facette ou mesure | Les valeurs les plus élevées pour la facette ou la mesure.                                                                      |

Ces informations peuvent être envoyées via Slack, Jira, Webhook, Microsoft Teams, PagerDuty ou e-mail. **Remarque** : les notifications de rétablissement n'affichent aucun exemple de log.

Pour désactiver les exemples de logs, décochez la case correspondante en bas de la section **Say what's happening**. Le texte affiché à côté de la case reflète les groupes définis pour votre monitor (comme indiqué ci-dessus).

#### Exemples

Inclure un tableau des 10 principales valeurs dépassant le seuil :
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="10 principales valeurs dépassant le seuil" style="width:60%;" >}}

Inclure 10 exemples de log dans la notification d'alerte :
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="10 principales valeurs dépassant le seuil" style="width:60%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/
[2]: https://app.datadoghq.com/monitors#create/log
[3]: /fr/logs/explorer/search/
[4]: /fr/logs/explorer/facets/
[5]: /fr/monitors/notifications/