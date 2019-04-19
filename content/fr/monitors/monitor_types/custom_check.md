---
title: Monitor de check custom
kind: documentation
description: Surveiller le statut des checks custom arbitraires
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

Les monitors personnalisés désignent les checks de service qui ne sont pas transmis par l'une des intégrations incluses par défaut avec l'Agent.

Consultez le [guide sur les checks de l'Agent][1] pour découvrir comment rédiger vos propres checks afin d'envoyer des métriques, événements ou checks de service.

## Configuration

1. Sélectionnez votre **check custom** :
  {{< img src="monitors/monitor_types/custom_check/Selecting_custom_check.png" alt="sélection de monitor personnalisé" responsive="true" style="width:80%;">}}
2. Sélectionnez **le host ou les tags** que vous souhaitez surveiller.
  {{< img src="monitors/monitor_types/custom_check/monitor_scope.png" alt="contexte de monitor" responsive="true" style="width:80%;">}}
  Le check s'exécute pour chaque ensemble unique de tags de tous les hosts surveillés. Par exemple, le check de service `Nginx` transmet un statut par `{host,port}`. Ainsi, si plusieurs de vos serveurs s'exécutent sur un seul host, chacun d'entre eux émet une alerte individuelle en cas de défaillance.

3. Sélectionnez vos **options d'alerte** :
  {{< img src="monitors/monitor_types/custom_check/monitor_options.png" alt="options de monitor" responsive="true" style="width:80%;">}}
  Bien que chaque exécution de check entraîne l'envoi d'un statut CRITICAL, WARNING OU OK, vous pouvez choisir des conditions consécutives qui déclencheront un changement d'état et enverront une notification. Par exemple, imaginons que vous souhaitez être prévenu immédiatement lorsque votre check échoue et rétablir son état uniquement s'il demeure ainsi. Vous pouvez alors choisir de recevoir une notification pour un statut CRITICAL, un statut WARNING et quatre statuts OK.
  Vous pouvez aussi **recevoir une notification en l'absence de données** après une période configurable. Celle-ci ne doit pas être inférieure à deux minutes.

4. Configurez vos **options de notification** :
  Reportez-vous à la page de la documentation relative aux [notifications][2] pour découvrir les différentes options de base des notifications.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/agent_checks
[2]: /fr/monitors/notifications