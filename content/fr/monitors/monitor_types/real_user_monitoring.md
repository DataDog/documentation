---
title: Monitor Real User Monitoring
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

Une fois la fonctionnalité [Real User Monitoring][1] activée pour votre organisation, vous pouvez créer un monitor RUM afin de recevoir une alerte lorsqu'un type d'événement RUM dépasse un seuil défini par l'utilisateur sur une période donnée.

## Création d'un monitor

Pour créer un [monitor RUM][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Monitoring*.

### Définir la requête de recherche

À mesure que vous définissez votre requête de recherche, le graphique au-dessus des champs de recherche se met à jour.

1. Créez votre requête de recherche en utilisant la même logique que pour une [recherche dans le RUM Explorer][3].
2. Choisissez de surveiller un nombre d'événements RUM, une [facette][4] ou une [mesure][5] :
    * **Monitor over a RUM event count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** une facette ou une mesure. Datadog évalue le nombre d'événements RUM sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet** : si vous sélectionnez une [facette][4], le monitor envoie une alerte en fonction du `Unique value count` (nombre de valeurs uniques) de la facette.
    * **Monitor over a measure** : si vous sélectionnez une [mesure][5], le monitor envoie une alerte en fonction de la valeur numérique de la facette RUM (comme le ferait un monitor de métrique). Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Définissez les groupes d'alertes (facultatif). **Remarque** : que vous définissiez ou non des groupes d'alertes, vous recevez **une seule** alerte lorsque la valeur agrégée remplit les conditions définies. Même si vous triez la requête par pays, une seule notification est envoyée si plusieurs pays remplissent les conditions définies. Ce système permet de réduire le nombre de notifications reçues.

{{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="Définir la requête de recherche"  style="width:60%;" >}}

### Définir vos conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieur ou égale à, inférieure ou égale à)
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre 5 minutes et 48 heures).
* Seuil d'alerte `<NOMBRE>`
* Seuil d'avertissement `<NOMBRE>`

#### Absence de données et alertes Below

Définissez la condition `below 1` pour recevoir une notification lorsqu'une application arrête d'envoyer des événements RUM. Vous serez ainsi alerté lorsqu'aucun événement RUM ne correspond à la requête du monitor sur un intervalle de temps donné pour tous les groupes d'agrégations.

Lorsque vous répartissez le monitor par dimension (tag ou facette) tout en utilisant une condition `below`, l'alerte se déclenche **uniquement** s'il existe des événements RUM pour un groupe donné et que le nombre est inférieur au seuil, ou s'il n'y a aucun événement RUM pour **tous** les groupes.  

**Exemples** :

* Le monitor suivant se déclenche uniquement s'il n'y a aucun événement RUM pour toutes les applications :
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="Monitor Below réparti par application"  style="width:70%;" >}}
* Le monitor suivant se déclenche s'il n'y a aucun log pour l'application `Shop.ist` :
  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="Monitor Below pour une application spécifique"  style="width:70%;" >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors#create/rum
[3]: /fr/real_user_monitoring/explorer/search/
[4]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /fr/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /fr/monitors/notifications/