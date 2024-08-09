---
aliases:
- /fr/monitors/monitor_types/log
- /fr/monitors/create/types/log/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
title: Log Monitors
---

## Présentation

Une fois la fonctionnalité [Log Management][1] activée pour votre organisation, vous pouvez créer des log monitors afin de recevoir une alerte lorsqu'un type de log spécifique dépasse un seuil défini par l'utilisateur sur une période donnée. Les log monitors peuvent uniquement évaluer les [logs indexés][2].

## Création d'un monitor

Pour créer un [log monitor][3] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Logs*.

<div class="alert alert-info"><strong>Remarque</strong> : par défaut, chaque compte est limité à 1 000 log monitors. Si cette limite est trop basse, utilisez les <a href="/monitors/configuration/?tab=thresholdalert#groupe-d-alertes">alertes multiples</a> ou <a href="/help/">contactez l'assistance</a>.</div>

### Définir la requête de recherche

À mesure que vous définissez votre requête de recherche, le graphique au-dessus des champs de recherche se met à jour.

1. Créez votre requête de recherche en utilisant la même logique que pour une [recherche dans le Log Explorer][4].
2. Choisissez de surveiller un nombre de logs, une [facette][5] ou une [mesure][6] :
    * **Monitor over a log count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** une facette ou une mesure. Datadog évalue le nombre de logs sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet** : si vous sélectionnez une [facette][5], le monitor envoie une alerte en fonction du nombre de valeurs uniques de la facette (`Unique value count`). Par exemple, si vous avez une facette `user.email`, le nombre de valeurs uniques correspond au nombre d'adresses e-mail uniques.
    * **Monitor over a measure** : si vous sélectionnez une [mesure][6], le monitor envoie une alerte en fonction de la valeur numérique de la facette de log (comme le ferait un monitor de métrique). Vous devez simplement sélectionner l'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Regroupez les logs en fonction de plusieurs dimensions (facultatif) :

   Tous les logs correspondant à la requête sont agrégés sous forme de groupes en fonction de la valeur d'un maximum de quatre facettes de log. Lorsque plusieurs dimensions sont définies, les valeurs les plus élevées sont déterminées en fonction de la première dimension, puis de la deuxième dans la fourchette des valeurs les plus élevées de la première dimension, et ainsi de suite jusqu'à la dernière dimension. La limite de dimensions dépend du nombre total de dimensions :
   * **1 facette** : 1 000 valeurs les plus élevées
   * **2 facettes** : 30 valeurs les plus élevées par facette (900 groupes maximum)
   * **3 facettes** : 10 valeurs les plus élevées par facette (1 000 groupes maximum)
   * **4 facettes** : 5 valeurs les plus élevées par facette (625 groupes maximum)
4. Configurez la stratégie de regroupement pour les alertes (facultatif) :
    * **Simple-Alert** : les alertes simples agrègent vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies. Ces alertes sont particulièrement utiles pour surveiller une métrique issue d'un seul host ou une métrique agrégée à partir de nombreux hosts. Vous pouvez sélectionner cette stratégie pour réduire le nombre de notifications inutiles.
    * **Multi-Alert** : les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe. Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper `system.disk.in_use` par `device` pour recevoir une alerte distincte pour chaque appareil qui manque d'espace disque.

### Définir vos conditions d'alerte

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à) :
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre `5 minutes` et `2 days`)
* au seuil d'alerte `<NOMBRE>` ;
* au seuil d'avertissement `<NOMBRE>`.

#### Absence de données et alertes Below

`NO DATA` est un état affiché lorsqu'aucun log ne correspond à la requête du monitor pendant l'intervalle de temps.

Définissez la condition `below 1` pour recevoir une notification lorsque les groupes correspondant à une requête spécifique ont tous arrêté d'envoyer des logs. Vous serez ainsi alerté lorsqu'aucun log ne correspond à la requête du monitor sur un intervalle de temps donné pour tous les groupes d'agrégation.

Lorsque vous répartissez le monitor par dimension (tag ou facette) tout en utilisant une condition `below`, l'alerte se déclenche **uniquement** s'il existe des logs pour un groupe donné et que le nombre est inférieur au seuil, ou s'il n'y a aucun log pour **tous** les groupes.  

**Exemples** :

* Le monitor suivant se déclenche uniquement s'il n'y a aucun log pour tous les services :
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor Below réparti par service" style="width:60%;" >}}
* Le monitor suivant se déclenche s'il n'y a aucun log pour le service `backend` :  
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor Below pour le service backend" style="width:60%;" >}}

#### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (délai d'évaluation, délai pour les nouveaux groupes, etc.), consultez la documentation relative à la [configuration des monitors][7].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][8].

#### Exemples de logs et top list des valeurs dépassant le seuil

Lorsqu'un log monitor se déclenche, des exemples ou valeurs peuvent être ajoutés au message de notification.

| Configuration du monitor                    | Peut être ajouté au message de notification |
|----------------------------------|--------------------------------------|
| Nombre de logs, alerte simple, pas de regroupement | Jusqu'à 10 échantillons de log.                |
| Nombre de logs, alerte simple, avec regroupement   | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Nombre de logs, alertes multiples, avec regroupement    | Jusqu'à 10 échantillons de log.                |
| Mesure, alerte simple, pas de regroupement   | Jusqu'à 10 échantillons de log.                |
| Mesure, alerte simple, avec regroupement     | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Nombre de logs, alertes multiples, avec regroupement    | Jusqu'à 10 valeurs de facette ou de mesure.    |

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
[2]: /fr/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/monitors#create/log
[4]: /fr/logs/explorer/search/
[5]: /fr/logs/explorer/facets/
[6]: /fr/logs/explorer/facets/#measures
[7]: /fr/monitors/configuration/#advanced-alert-conditions
[8]: /fr/monitors/notify/