---
title: Monitor Watchdog
kind: documentation
description: Détecte de manière algorithmique les problèmes d'application et d'infrastructure.
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: watchdog
    tag: Documentation
    text: Détecter de manière algorithmique les problèmes d'application et d'infrastructure avec Watchdog
---
## Présentation

[Watchdog][1] est une fonction algorithmique pour l'APM qui détecte automatiquement les problèmes d'application et d'infrastructure. Pour ce faire, Watchdog surveille en continu les tendances et les modèles qui se dégagent de vos métriques d'application, comme les taux d'erreur, les taux de requêtes et la latence, tout en recherchant les comportements inattendus.

Les monitors Watchdog vous permettent de définir des monitors et de recevoir des notifications d'alerte lorsque Watchdog détecte un problème potentiel dans vos systèmes.

**Remarque** : Watchdog est une fonction de l'APM, et les monitors Watchdog sont uniquement disponibles pour les clients de l'APM.

## Créer un monitor Watchdog
* Choisissez « Watchdog » sur la page [New Monitor][2].

* Le graphique en haut de la page [Create Monitor][3] affiche le nombre d'événements Watchdog dans le temps, ainsi qu'une liste d'événements.

{{< img src="monitors/monitor_types/watchdog/wmonitor-create-top.png" alt="Watchdog" responsive="true" style="width:80%;">}}

* Sélectionnez le type de story sur lequel vous souhaitez baser votre monitor : service ou infrastructure

{{< img src="monitors/monitor_types/watchdog/wmonitor-1.png" alt="Select story type" responsive="true" style="width:80%;">}}

* Si vous avez choisi Service comme type de story, sélectionnez les ressources pour lesquelles vous souhaitez être alerté.

{{< img src="monitors/monitor_types/watchdog/wmonitor-2.png" alt="Select sources" responsive="true" style="width:80%;">}}

* Configurez votre message de notification. Vous pouvez utiliser des [template variables][4] pour personnaliser votre message.

{{< img src="monitors/monitor_types/watchdog/wmonitor-3.png" alt="Say what's happening" responsive="true" style="width:80%;">}}

Lorsque vous choisissez l'option « Include triggering tags in notification title », le nom du service, le nom de la ressource et le tag principal (par exemple, availability-zone) sont ajoutés au titre.

* Configurez les destinataires de votre notification.

{{< img src="monitors/monitor_types/watchdog/wmonitor-4.png" alt="Notify your team" responsive="true" style="width:80%;">}}

## Template variables dans les notifications

* `{{event.id}}` : ID de l'événement
* `{{event.title}}` : titre de l'événement, qui fournit également des détails sur la story

## Alertes Watchdog

Les monitors Watchdog s'affichent sur la page [Manage Monitors][5] ainsi que sur la page [Triggered Monitors][6] lorsque vous filtrez les monitors avec le type « Watchdog ».

Lorsque vous recevez une alerte, vous pouvez afficher davantage d'informations sur la story Watchdog associée qui a déclenché l'alerte en faisant défiler vers le bas la page [Triggered Monitors][6] jusqu'à la section Events et en cliquant sur le lien de détails.

{{< img src="monitors/monitor_types/watchdog/wmonitor-triggered.png" alt="Events" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/watchdog
[2]: https://app.datadoghq.com/monitors#/create
[3]: https://app.datadoghq.com/monitors#create/watchdog
[4]: /fr/monitors/notifications/?tab=is_alertis_warning#variables
[5]: https://app.datadoghq.com/monitors/manage
[6]: https://app.datadoghq.com/monitors/triggered