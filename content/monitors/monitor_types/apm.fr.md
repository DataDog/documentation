---
title: Monitor pour l'APM
kind: documentation
description: "Comparer une métrique APM à un seuil défini par l'utilisateur"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: Configurez les notifications de votre monitor
- link: "monitors/downtimes"
  tag: "Documentation"
  text: Planifiez un downtime pour désactiver un monitor
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: Consulter le statut de de votre monitor.
---

## Aperçu

Ils fonctionnent exactement comme les [monitors de métriques][1], mais avec des paramètres spécifiquement adaptés aux métriques APM. Ils vous permettent d'alerter au niveau du service sur les hits, les erreurs et diverses mesures de latence.

## Implémentation

1. Sélectionnez votre [environnement][2]: 
    {{< img src="monitors/monitor_types/apm/apm_select_env.png" alt="APM select Environment" responsive="true" style="width:75%;" >}}

2. Sélectionnez votre [service][3]:
    {{< img src="monitors/monitor_types/apm/apm_select_service.png" alt="APM select Service" responsive="true" style="width:75%;" >}}
3. Définir les conditions d'alerte:
    {{< img src="monitors/monitor_types/apm/apm_set_alert_conditions.png" alt="APM set alert conditions" responsive="true" style="width:75%;" >}}
4. Configurez les **options de vos notifications**:
    Reportez-vous à la page de documentation dédiée [Notifications][4] pour plus d'informations.

## En apprendre plus
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric
[2]: /tracing/setup/first_class_dimensions#environment
[3]: /tracing/visualization/service
[4]: /monitors/notifications
