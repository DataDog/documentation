---
aliases:
- /fr/monitors/monitor_types/real_user_monitoring
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Explorer vos données RUM
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
kind: documentation
title: Monitor Real User Monitoring
---

## Présentation

Une fois la fonctionnalité [Real User Monitoring][1] activée pour votre organisation, vous pouvez créer un monitor RUM afin de recevoir une alerte lorsqu'un type d'événement RUM spécifique dépasse un seuil prédéfini sur une période donnée.

## Créer un monitor RUM

Pour créer un monitor Real User Monitoring dans Datadog, accédez à [**Monitors** > **New Monitor** > **Real User Monitoring**][2].

<div class="alert alert-info"><strong>Remarque</strong> : par défaut, chaque compte est limité à 1 000 monitors RUM. <a href="/help/">Contactez l'assistance</a> afin d'augmenter cette limite pour votre compte.</div>

### Définir la requête de recherche

À mesure que vous ajoutez des filtres de recherche, le graphique au-dessus de la barre de recherche se met à jour.

1. Créez votre requête de recherche en utilisant la même logique que pour une [recherche dans le RUM Explorer][3].
2. Choisissez de surveiller un nombre d'événements RUM, une [facette][4] ou une [mesure][5].
    * **Monitor over a RUM event count** : utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** une facette ou une mesure. Datadog évalue le nombre d'événements RUM sur une période sélectionnée, puis le compare aux conditions de seuil.
    * **Monitor over a facet** : si vous sélectionnez une [facette][4], le monitor envoie une alerte en fonction du nombre de valeurs uniques de la facette (`Unique value count`).
    * **Monitor over a measure** : si vous sélectionnez une [mesure][5], le monitor envoie une alerte en fonction de la valeur numérique de la facette RUM (comme le ferait un monitor de métrique). Sélectionnez simplement le type d'agrégation (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Regroupez les événements RUM en fonction de plusieurs dimensions (facultatif). Tous les événements RUM correspondant à la requête sont agrégés au sein de groupes basés sur la valeur d'un maximum de quatre facettes.
4. Configurez la stratégie de regroupement pour les alertes (facultatif).
   * **Simple-Alert** : les alertes simples agrègent vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies. Si la requête inclut un critère `group by` et que vous sélectionnez **Simple-Alert**, vous recevez une seule alerte lorsqu'une ou plusieurs valeurs des groupes dépassent le seuil. Cette stratégie vous permet de réduire le nombre de notifications envoyées.
   * **Multi-Alert** : les alertes multiples appliquent l'alerte à chaque source en fonction des paramètres de votre groupe. Un événement d'alerte est créé pour chaque groupe qui répond aux conditions définies. Par exemple, vous pouvez regrouper une requête par `@browser.name` pour recevoir une alerte distincte pour chaque navigateur lorsque le nombre d'erreurs est élevé.

   {{< img src="monitors/monitor_types/rum/define-the-search-query.png" alt="Définir la requête de recherche" style="width:80%;" >}}

5. Ajoutez plusieurs requêtes et appliquez des formules et des fonctions (facultatif) :

    * **Requêtes multiples** : cliquez sur **Add Query** pour analyser différents ensembles de données RUM les uns en fonction des autres.
    * **Formules et fonctions** : après avoir ajouté les requêtes souhaitées, cliquez sur **Add Formula** pour ajouter un calcul mathématique. Dans l'example ci-dessous, le taux d'erreurs sur une page de panier est calculé à l'aide de la formule `(a/b)*100`.

   {{< img src="monitors/monitor_types/rum/rum_multiple_queries_1.png" alt="Requêtes multiples dans le filtre de recherche" style="width:80%;" >}}

### Définir vos conditions d'alerte

Une alerte se déclenche chaque fois qu'une métrique dépasse un seuil.

* Envoyer une alerte lorsque la métrique est `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale à, inférieure ou égale à)
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre 5 minutes et 48 heures) ;
* au seuil d'alerte `<NOMBRE>` ;
* au seuil d'avertissement `<NOMBRE>`.

#### Absence de données et alertes Below

Définissez la condition `below 1` pour recevoir une notification lorsqu'une application arrête d'envoyer des événements RUM. Vous serez ainsi alerté lorsqu'aucun événement RUM ne correspond à la requête du monitor sur un intervalle de temps donné pour tous les groupes d'agrégations.

Lorsque vous répartissez le monitor par dimension (tag ou facette) tout en utilisant une condition `below`, l'alerte se déclenche **uniquement** s'il existe des événements RUM pour un groupe donné et que le nombre est inférieur au seuil, ou s'il n'y a aucun événement RUM pour **tous** les groupes.  

#### Exemples d'alertes

Par exemple, le monitor suivant se déclenche uniquement s'il n'y a aucun événement RUM pour toutes les applications :

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_application_id.png" alt="Monitor Below réparti par application" style="width:70%;" >}}

Le monitor suivant se déclenche s'il n'y a aucun log pour l'application `Shop.ist` :

  {{< img src="monitors/monitor_types/rum/rum_monitoring_by_shopist.png" alt="Monitor Below pour une application spécifique" style="width:70%;" >}}

#### Conditions d'alerte avancées

Pour en savoir plus sur les options d'alerte avancées (telles que le délai d'évaluation), consultez la section [Configurer des monitors][6].

### Notifications

Pour en savoir plus sur les sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: https://app.datadoghq.com/monitors/create/rum
[3]: /fr/real_user_monitoring/explorer/search/
[4]: /fr/real_user_monitoring/explorer/?tab=facets#setup-facets-measures
[5]: /fr/real_user_monitoring/explorer/?tab=measures#setup-facets-measures
[6]: /fr/monitors/create/configuration/#advanced-alert-conditions
[7]: /fr/monitors/notify/