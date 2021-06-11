---
title: Alertes de budgets d'indisponibilité
kind: documentation
description: Utiliser les monitors pour envoyer des alertes en fonction des Service Level Objectives
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte. Envoyez un e-mail à <a href="mailto:slo-help@datadoghq.com">slo-help@datadoghq.com</a> si vous avez des questions ou des retours.
</div>

## Présentation

Les alertes de budget d’indisponibilité de SLO sont basées sur des seuils et vous informent lorsqu'un certain pourcentage de votre budget d’indisponibilité de SLO a été utilisé. Par exemple, vous pouvez recevoir une alerte si 75 % du budget d'indisponibilité sur 7 jours a été utilisé, et un avertissement si 50 % du budget a été utilisé (facultatif).

**Remarque :** les alertes de budget d'indisponibilité ne sont disponibles que pour les [SLO basés sur des métriques][1], ou les [SLO basés sur des monitors][6] uniquement composés de types de monitors de métrique (les monitors Metric, Integration, APM Metric, Anomaly, Forecast ou Outliner).

{{< img src="monitors/service_level_objectives/error_budget_alert_config.png" alt="Configuration d'une alerte de budget d'indisponibilité">}}

## Création d'un monitor

1. Accédez à la [page de statut des SLO][2].
2. Créez un SLO ou modifiez-en un, puis cliquez sur le bouton Save and Set Alert. Si vous utilisez un SLO existant, vous pouvez également cliquer sur le lien Enable Alertes dans le volet latéral des détails pour accéder directement à la configuration de l'alerte.
3. Configurez une alerte de façon à ce qu'elle se déclenche lorsque le pourcentage du budget d'indisponibilité utilisé est supérieur au seuil
sur l'intervalle cible.
4. Ajoutez les [informations de notification][3] dans les sections **Say what’s happening** et **Notify your team**.
5. Cliquez sur le bouton Save and Set Alert sur la page de configuration du SLO.

**Remarque :** cliquez sur le bouton `New Condition` si vous souhaitez ajouter une condition d'avertissement facultative. Le seuil d'avertissement doit être inférieur au seuil d'alerte.

{{< img src="monitors/service_level_objectives/save_set_alert.png" alt="Enregistrer le SLO et configurer une alerte de budget d'indisponibilité">}}

### API et Terraform

Vous pouvez créer des alertes de budget d'indisponibilité de SLO via l'[endpoint d'API creation-monitor][4]. Vous trouverez ci-dessous un exemple de requête pour un monitor de SLO, qui envoie une alerte lorsque plus de 75 % du budget d'indisponibilité d'un SLO a été utilisé :

```
error_budget("slo_id").over("time_window") > 75
```

Il est également possible de créer des alertes de budget d’indisponibilité de SLO à l'aide de la [ressource datadog_monitor dans Terraform][5]. Voici un exemple de `.tf` pour configurer une alerte de budget d'indisponibilité pour un SLO basé sur des métriques à partir de la même requête que celle donnée dans l'exemple ci-dessus.

**Remarque :** les alertes de budget d'indisponibilité de SLO sont uniquement prises en charge par la v2.7.0 et les versions antérieures de Terraform, ou par la v2.13.0 et les versions ultérieures. Elles ne sont donc pas prises en charge pour les versions entre v2.7.0 et v.2.13.0.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "Exemple d'alerte sur un budget d'indisponibilité de SLO"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Exemple de message de monitor"
    thresholds = {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

Remplacez `slo_id` par l'ID alphanumérique du SLO basé sur des métriques pour lequel vous souhaitez configurer une alerte de budget d'indisponibilité et remplacez `time_window` par `7d`, `30d` ou `90d`, selon l'intervalle cible utilisé pour configurer votre SLO basé sur des métriques.

## Restrictions bêta

- Les alertes sont uniquement disponibles pour les SLO basés sur des métriques, ou les SLO basés sur des monitors uniquement composés de types de monitors de métrique (les monitors Metric, Integration, APM Metric, Anomaly, Forecast ou Outliner).
- Le statut d'alerte d'un monitor de SLO est disponible dans l'onglet **Alerts** du volet des détails du SLO ou sur la page [Manager Monitors][7].
- Vous ne pouvez définir qu'une seule alerte par SLO (cible + Intervalle de temps) dans l'interface utilisateur, mais vous pouvez définir plusieurs alertes par SLO à l'aide de l'API ou de Terraform.

[1]: /fr/monitors/service_level_objectives/metric/
[2]: https://app.datadoghq.com/slo
[3]: /fr/monitors/notifications/
[4]: /fr/api/v1/monitors/#create-a-monitor
[5]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[6]: /fr/monitors/service_level_objectives/monitor/
[7]: https://app.datadoghq.com/monitors/manage