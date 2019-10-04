---
title: Log monitor
kind: documentation
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
{{< img src="monitors/monitor_types/log/log_monitor_overview.png" alt="Aperçu log monitor" responsive="true" >}}

## Présentation

Les log monitors envoient une alerte lorsqu'un type de log spécifié dépasse un seuil défini par l'utilisateur sur une période donnée.

## Implémentation

Rédigez une requête pour contrôler ce qui doit être surveillé :

1. Définissez la requête de recherche :
    {{< img src="monitors/monitor_types/log/define_the_search_query.png" alt="Définir la requête de recherche" responsive="true" style="width:50%;" >}}
    La requête de recherche possède le même comportement que [la recherche du Log Explorer][1]

2. Choisissez une [mesure][1] ou une [facette][2] à surveiller. Les [mesures][1] vous permettent de choisir une fonction d'agrégation, tandis que les [facettes][2] affichent le nombre de valeurs.

    {{< img src="monitors/monitor_types/log/choose_measure_facet.png" alt="choisir mesure ou facette" responsive="true" style="width:50%;">}}

3. Sélectionnez la fonction d'agrégation pour la [mesure][1] que vous souhaitez surveiller :

    {{< img src="monitors/monitor_types/log/agg_function.png" alt="fonction d'agrégation pour l'analyse de logs" responsive="true" style="width:50%;">}}

4. Définissez le groupe d'alertes (facultatif) :
  {{< img src="monitors/monitor_types/log/log_monitor_group_by.png" alt="Définir des conditions d'alerte" responsive="true" style="width:50%;" >}}
    Que vous définissiez ou non le groupe d'alertes, vous recevez **une seule** alerte lorsque la valeur agrégée remplit les conditions ci-dessous. Même si vous triez la requête par host, une seule notification est envoyée si plusieurs hosts remplissent les conditions définies ci-dessous. Ce système permet de réduire le nombre de notifications reçues.

5. Définissez les conditions d'alerte. Vous pouvez utiliser les options suivantes :

  {{< img src="monitors/monitor_types/log/above_below.png" alt="fonction d'agrégation pour l'analyse de logs" responsive="true" style="width:50%;">}}

6. Configurez vos **options de notification** :

  {{< img src="monitors/monitor_types/log/set_alert_conditions.png" alt="Définir des conditions d'alerte" responsive="true" style="width:50%;" >}}

  Reportez-vous à la page de la documentation relative aux [notifications][2] pour obtenir plus d'informations.


## Exemples de logs et de notifications

Vous pouvez ajouter jusqu'à 10 exemples de logs qui ont déclenché le monitor dans le message de notification.
Cette option est disponible avec Slack, Jira, Webhook, Microsoft Teams et les notifications par e-mail.

* Les exemples ne sont pas affichés pour les notifications de rétablissement.

 **Activer les exemples de logs dans les notifications** :

  {{< img src="monitors/monitor_types/log/activate-log-monitor-sample.png" alt="Activer les exemples de logs dans les messages" responsive="true" style="width:50%;" >}}

  **Exemple pour une notification Slack** 

  {{< img src="monitors/monitor_types/log/slack-log-sample.png" alt="Exemple de notification Slack" responsive="true" style="width:50%;" >}}

### Notifications pour les groupes

Les notifications provenant de monitors répartis par groupe peuvent comprendre les 10 principales valeurs dépassant le seuil plutôt que 10 exemples de logs.

 **Activer l'affichage des 10 principales valeurs dépassant le seuil dans les notifications**

{{< img src="monitors/monitor_types/log/activate-log-multi-monitor-sample.png" alt="Activer les exemples de logs dans les messages" responsive="true" style="width:50%;" >}}

**Exemple pour une notification Slack** 

 {{< img src="monitors/monitor_types/log/slack-log-multi-sample.png" alt="Exemple de notifications Slack" responsive="true" style="width:50%;" >}}

## Aucune alerte de données et conditions Below

Définissez la condition `below 1` afin d'être informé en l'absence de la réception d'un ensemble de logs. Cette condition vous envoie une notification lorsqu'aucun log ne correspond à la requête du monitor sur un intervalle de temps donné.

Notez cependant que lorsque vous répartissez le monitor par dimension (tag ou facette) tout en utilisant une condition `below`, l'alerte est déclenchée **si et seulement s'il** existe des logs pour un groupe donné et que le nombre est inférieur au seuil, ou s'il n'y a aucun log pour **tous** les groupes.  

Exemples :

1. Le monitor suivant se déclenche si et seulement s'il n'y a aucun log pour tous les services :
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor Below réparti par service" responsive="true" style="width:50%;" >}}
2. Le monitor suivant se déclenche s'il n'y a aucun log pour le service `backend` :  
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor Below pour le service backend" responsive="true" style="width:50%;" >}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/search
[2]: /fr/monitors/notifications