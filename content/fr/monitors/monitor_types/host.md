---
title: Monitor de host
kind: documentation
description: Vérifier si un ou plusieurs hosts transmettent des données à Datadog
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

Chaque processus de collecte de l'Agent Datadog transmet une pulsation du nom de `datadog.agent.up`
avec le statut `UP`. Vous pouvez surveiller cette pulsation sur un ou plusieurs hosts.

## Configuration

1. Sélectionnez votre ****host en fonction d'un nom ou de tag(s). Précisez un ou plusieurs tags pour surveiller tous les hosts caractérisés par le tag ou la combinaison de tags.
    {{< img src="monitors/monitor_types/host/host_monitor_pick_hosts.png" alt="sélection des hosts monitor de host" responsive="true" style="width:80%;">}}

2. Choisissez entre une **Check Alert** et une **Cluster Alert**.

3. **Check Alert** : lorsqu'un host cesse de transmettre des données, une alerte est déclenchée.
    Sélectionnez l'option **no-data timeframe**. Vous recevrez alors une notification en cas d'arrêt de transmission de données par la pulsation pendant un délai dépassant le nombre de minutes précisé.
    {{< img src="monitors/monitor_types/host/no_data_timeframe.png" alt="aucun intervalle de données monitor de host" responsive="true" style="width:80%;">}}

4. **Cluster Alert** : lorsqu'un certain pourcentage de hosts cesse de transmettre des données, une alerte est déclenchée.
    * Choisissez si vous souhaitez regrouper ou non vos hosts dans un cluster en fonction d'un tag.
        {{< img src="monitors/monitor_types/host/cluster_alert.png" alt="Cluster alert" responsive="true" style="width:80%;">}}

    * Sélectionnez le pourcentage des seuils d'alerte/avertissement pour votre monitor de host. 
        {{< img src="monitors/monitor_types/host/cluster_alert_setup.png" alt="configuration cluster alert" responsive="true" style="width:75%;">}} 

    * Sélectionnez l'option **no-data timeframe**. Vous recevrez alors une notification en cas d'arrêt de transmission de données par la pulsation pendant un délai dépassant le nombre de minutes précisé pour le pourcentage de host défini dans le cluster sélectionné.

5. Configurez vos **options de notification** :
    Reportez-vous à la page de la documentation relative aux [notifications][1] pour découvrir les différentes options de base des notifications.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/notifications