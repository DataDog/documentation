---
kind: documentation
title: Alertes SLO
---

## Présentation

Les [SLO (Service Level Objectives)][1] constituent un outil essentiel pour optimiser le niveau de fiabilité d'un site. Ils fournissent un cadre permettant de définir des objectifs précis relatifs aux performances de l'application. Cela aide ainsi les équipes à proposer une expérience client homogène, à assurer les développements futurs sans compromettre la stabilité de la plateforme, et à améliorer la communication avec les utilisateurs internes et externes.

## Création d'un monitor

Pour créer une [alerte SLO][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> SLO*.

### Sélectionner un SLO

Sélectionnez un [Service Level Objective][1].

### Définir vos conditions d'alerte

Vous pouvez choisir parmi deux types d'alertes :

Les [alertes de marge d'erreur][3] vous informent lorsqu'un certain pourcentage de la marge d'erreur de votre SLO a été utilisé.

Les [alertes de taux d'utilisation][4] vous informent lorsque le taux d'utilisation de la marge d'erreur de votre SLO a dépassé un certain seuil que vous avez défini pendant une certaine durée.

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][5].

Outre les [template variables standard][6] disponibles pour tous les types de monitors, les alertes SLO prennent également en charge les variables suivantes :

| Variable   | Description   |
| ---------- | ------------- |
| `{{timeframe}}` | La période du SLO (7, 30 ou 90 jours). |
| `{{value}}` | Le pourcentage de la marge d'erreur utilisée (uniquement pour les alertes de marge d'erreur). |
| `{{short_window_burn_rate}}` | La valeur du taux d'utilisation observée lors de la période courte (alertes de taux d'utilisation uniquement). |
| `{{long_window_burn_rate}}` | La valeur du taux d'utilisation observée lors de la période longue (alertes de taux d'utilisation uniquement). |

[1]: /fr/monitors/service_level_objectives/
[2]: https://app.datadoghq.com/monitors/create/slo
[3]: /fr/monitors/service_level_objectives/error_budget/
[4]: /fr/monitors/service_level_objectives/burn_rate/
[5]: /fr/monitors/notify/#overview
[6]: /fr/monitors/notify/variables/?tab=is_alert#template-variables