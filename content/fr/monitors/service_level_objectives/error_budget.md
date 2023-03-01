---
description: Utiliser des monitors pour envoyer des alertes à propos de l'utilisation
  de la marge d'erreur d'un SLO
kind: documentation
title: Alertes de marge d'erreur
---

## Présentation

Les alertes de marge d'erreur de SLO sont basées sur des seuils et vous informent lorsqu'un certain pourcentage de votre marge d'erreur de SLO a été utilisé. Par exemple, vous pouvez recevoir une alerte si 75 % de la marge d'erreur sur 7 jours a été utilisée, et un avertissement si 50 % de la marge a été utilisée (facultatif).

**Remarque :** les alertes de marge d'erreur ne sont disponibles que pour les [SLO basés sur des métriques][1], ou les [SLO basés sur des monitors][2] uniquement composés de types de monitors de métrique (les monitors Metric, Integration, APM Metric, Anomaly, Forecast ou Outliner).

{{< img src="monitors/service_level_objectives/error_budget_alert_config.png" alt="Configuration d'une alerte de marge d'erreur">}}

## Création d'un monitor

1. Accédez à la [page de statut des SLO][3].
2. Créez un SLO ou modifiez-en un, puis cliquez sur le bouton **Save and Set Alert**. Si vous utilisez un SLO existant, vous pouvez également cliquer sur le bouton **Set up Alerts** dans le volet latéral des détails pour accéder directement à la configuration de l'alerte.
3. Sélectionnez l'onglet **Error Budget** dans la section **Step 1: Setting alerting conditions**.
4. Configurez une alerte de façon à ce qu'elle se déclenche lorsque le pourcentage de la marge d'erreur utilisée est supérieur au seuil
sur l'intervalle cible.
4. Ajoutez les [informations de notification][4] dans les sections **Say what’s happening** et **Notify your team**.
5. Cliquez sur le bouton Save and Set Alert sur la page de configuration du SLO.

{{< img src="monitors/service_level_objectives/save_set_alert.png" alt="Enregistrer le SLO et configurer une alerte de marge d'erreur">}}

### API et Terraform

Vous pouvez créer des alertes de marge d'erreur de SLO à l'aide de l'[endpoint d'API create-monitor][5]. Vous trouverez ci-dessous un exemple de requête pour un monitor SLO. Des alertes sont envoyées lorsque 75 % de la marge d'erreur d'un SLO est utilisée. Remplacez *slo_id* par l'ID alphanumérique du SLO pour lequel vous souhaitez configurer une alerte de taux d'utilisation. Remplacez également *time_window* par la valeur « 7d », « 30d » ou « 90d », en fonction de la cible de votre SLO :

```
error_budget("slo_id").over("time_window") > 75
```

Il est également possible de créer des alertes de marge d'erreur de SLO à l'aide de la [ressource datadog_monitor dans Terraform][6]. Voici un exemple de `.tf` qui configure une alerte de marge d'erreur pour un SLO basé sur des métriques à partir de la même requête que celle de l'exemple ci-dessus.

**Pour les versions 2.7.0 et antérieures ou 2.13.0 et ultérieures du fournisseur**

**Remarque :** les alertes de marge d'erreur de SLO sont uniquement prises en charge par la v2.7.0 et les versions antérieures du fournisseur Terraform, ou par la v2.13.0 et les versions ultérieures. Elles ne sont donc pas prises en charge pour les versions entre v2.7.0 et v.2.13.0.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "Exemple d'alerte de marge d'erreur de SLO"
    type  = "slo alert"

    query = <<EOT
    error_budget("slo_id").over("time_window") > 75 
    EOT

    message = "Exemple de message de monitor"
    monitor_thresholds {
      critical = 75
    }
    tags = ["foo:bar", "baz"]
}
```

[1]: /fr/monitors/service_level_objectives/metric/
[2]: /fr/monitors/service_level_objectives/monitor/
[3]: https://app.datadoghq.com/slo
[4]: /fr/monitors/notify/
[5]: /fr/api/v1/monitors/#create-a-monitor
[6]: https://www.terraform.io/docs/providers/datadog/r/monitor.html