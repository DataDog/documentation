---
title: Monitor réseau
kind: documentation
description: Vérifier le statut des endpoints TCP/HTTP
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
Les monitors réseau englobent les checks TCP et HTTP disponibles dans l'Agent. Lisez la [documentation sur le check HTTP][1] pour en savoir plus sur la configuration de l'Agent.

## Statut réseau

1. Choisissez un **check réseau**. Les options disponibles sont toutes des checks `HTTP` ou `TCP` surveillés et envoyés par vos Agents.
    {{< img src="monitors/monitor_types/network/network_check_pick.png" alt="Sélectionner un check réseau" responsive="true" style="width:80%;">}}
2. Définissez le **contexte du monitor**. Seuls les hosts ou les tags associés aux checks sélectionnés sont disponibles.
    {{< img src="monitors/monitor_types/network/network_check_monitor_scope.png" alt="Contexte du monitor du check réseau" responsive="true" style="width:80%;">}}
3. Sélectionnez les **options d'alerte** :
    {{< img src="monitors/monitor_types/network/network_check_alert_conditions.png" alt="Conditions d'alerte du network check" responsive="true" style="width:80%;">}}

    **Remarque** : contrairement aux [monitors de métrique][2], il n'est pas possible de recevoir une alerte lorsque l'endpoint est indisponible depuis `X` minutes. Vous ne serez alerté qu'après 5 statuts d'erreur consécutifs au maximum. Une panne d'un site se traduira par une absence de données pendant 5 × 15 à 20 secondes (période de collecte de l'Agent) ou 90 secondes, sauf si un délai d'expiration élevé a été spécifié dans la configuration de l'Agent.

4. Configurez les **options de notification**. Reportez-vous à la documentation relative aux [notifications][3] pour découvrir les différentes options de base des notifications.

## Métriques réseau

1. Choisissez une **métrique réseau**. Il est possible de choisir la métrique de temps de réponse `TCP` ou `HTTP`.

2. Définissez le **contexte du monitor**. Seuls les hosts et les tags associés à la métrique sélectionnée sont disponibles.

3. Sélectionnez les **options d'alerte**. Consultez la section relative aux conditions d'alerte de la documentation sur la page [Metric Monitor][2] pour en savoir plus.

4. Configurez les **options de notification**. Reportez-vous à la documentation relative aux [notifications][3] pour découvrir les différentes options de base des notifications.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/http_check
[2]: /fr/monitors/monitor_types/metric
[3]: /fr/monitors/notifications