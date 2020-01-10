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

[Watchdog][1] est une fonction algorithmique pour l'APM qui détecte automatiquement les problèmes d'application et d'infrastructure. Pour ce faire, Watchdog surveille en continu les tendances et les patterns qui se dégagent de vos métriques d'application afin d'identifier les comportements anormaux.

**Remarque** : Watchdog est une fonction de l'APM, et les monitors Watchdog sont uniquement disponibles pour les clients de l'APM.

## Création d'un monitor

Pour créer un [monitor Watchdog][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Watchdog*.

### Sélectionner le type de story

Dans cette section, choisissez entre une story **APM** ou **Infrastructure** :

{{< tabs >}}
{{% tab "APM" %}}

Une story APM est créée lorsque Watchdog détecte un comportement anormal au niveau des services de votre système ou de leur ressources enfant.

### Sélectionner les sources

Choisissez vos [tags primaires][1], votre [service][2] et votre [ressource][3] dans les menus déroulants.

Une fois les options de votre choix sélectionnées, le graphique en haut de la page de création d'un monitor affiche le nombre d'événements Watchdog correspondants dans le temps, ainsi qu'une liste d'événements.

[1]: /fr/tracing/setting_primary_tags_to_scope/#environment
[2]: /fr/tracing/visualization/service
[3]: /fr/tracing/visualization/resource
{{% /tab %}}
{{% tab "Infrastructure" %}}

Les stories de type Infrastructure englobent les problèmes réseau détectés dans les régions couvertes par votre fournisseur de services cloud.

Une fois l'option Infrastructure sélectionnée, le graphique en haut de la page de création d'un monitor affiche le nombre d'événements Watchdog dans le temps, ainsi qu'une liste d'événements.

### Sélectionner les sources

Aucune sélection n'est nécessaire. Vous recevez une notification dès que Watchdog détecte un problème sur votre infrastructure.

{{% /tab %}}
{{< /tabs >}}

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/watchdog
[2]: https://app.datadoghq.com/monitors#create/watchdog
[3]: /fr/monitors/notifications