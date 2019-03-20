---
title: Monitor d'APM
kind: documentation
description: Comparer une métrique d'APM à un seuil défini par un utilisateur
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

Les monitors d'APM fonctionnent comment les [monitors de métrique][1], mais sont dotés de commandes personnalisées pour les métriques d'APM. Ces monitors vous permettent d'envoyer des alertes au niveau des services pour les hits, les erreurs et toute une gamme de mesures relatives à la latence.

## Implémentation

1. Sélectionnez votre [environnement][2] :
    {{< img src="monitors/monitor_types/apm/apm_select_env.png" alt="Sélectionner environnement APM" responsive="true" style="width:75%;" >}}

2. Sélectionnez votre [service][3] :
    {{< img src="monitors/monitor_types/apm/apm_select_service.png" alt="Sélectionner service APM" responsive="true" style="width:75%;" >}}
3. Définissez vos conditions d'alerte :
    {{< img src="monitors/monitor_types/apm/apm_set_alert_conditions.png" alt="Définir conditions d'alerte APM" responsive="true" style="width:75%;" >}}
4. Configurez vos **options de notification** :
    Reportez-vous à la page de la documentation relative aux [notifications][4] pour obtenir plus d'informations.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/monitor_types/metric
[2]: /fr/tracing/setup/first_class_dimensions#environment
[3]: /fr/tracing/visualization/service
[4]: /fr/monitors/notifications