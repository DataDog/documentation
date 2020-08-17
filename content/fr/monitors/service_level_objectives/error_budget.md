---
title: Monitors de budget d'indisponibilité
kind: documentation
description: Définir un Service Level Objective à partir de monitors
---
<div class="alert alert-warning">
Cette fonctionnalité est en version bêta ouverte. Envoyez un e-mail à <a href="mailto:slo-help@datadoghq.com">slo-help@datadoghq.com</a> si vous avez des questions ou des retours.
</div>

## Présentation

Les monitors de budget d’indisponibilité de SLO sont basés sur des seuils et vous informent lorsqu'un certain pourcentage de votre budget d’indisponibilité de SLO a été consommé. Par exemple, vous pouvez recevoir une alerte si 75 % du budget d'indisponibilité sur 7 jours a été consommé, et un avertissement si 50 % du budget a été consommé (facultatif).


**Remarque :** les monitors de budget d'indisponibilité ne sont disponibles que pour les [SLO basés sur des métriques][1].


## Création d'un monitor

1. Accédez à la [page de statut des SLO][2].
2. Créez un nouveau SLO basé sur des métriques ou modifiez un SLO existant, puis cliquez sur le bouton Save and Set Alert. Pour les SLO existants, vous pouvez également cliquer sur le lien Enable Alerts dans le volet des détails du SLO pour accéder directement à la configuration de l'alerte.
3. Configurez une alerte de façon à ce qu'elle se déclenche lorsque le pourcentage du budget d'indisponibilité consommé est supérieur au seuil
sur l'intervalle cible.
4. Ajoutez les [informations de notification][3] dans les sections **Say what’s happening** et **Notify your team**.
5. Cliquez sur le bouton Save and Set Alert sur la page de configuration du SLO.

**Remarque :** cliquez sur le bouton `New Condition` si vous souhaitez ajouter une condition d'avertissement facultative. Le seuil d'avertissement doit être inférieur au seuil d'alerte.

{{< img src="monitors/service_level_objectives/error_budget_alert.png" alt="configuration d'une alerte de budget d'indisponibilité">}}

### API et Terraform

Vous pouvez créer des monitors de budget d'indisponibilité de SLO via l'[endpoint d'API creation-monitor][4]. Vous trouverez ci-dessous un exemple de requête pour un monitor de SLO, qui alerte lorsque plus de 75 % du budget d'indisponibilité d'un SLO a été consommé :

```
error_budget("slo_id").over("time_window") > 75
```

Il est également possible de créer des monitors de budget d’indisponibilité de SLO à l'aide de la [ressource datadog_monitor dans Terraform][5]. Voici un exemple de `.tf` pour configurer un monitor de budget d'indisponibilité pour un SLO basé sur des métriques à partir de la même requête que celle donnée dans l'exemple ci-dessus.

**Remarque :** les monitors de budget d'indisponibilité de SLO sont uniquement pris en charge dans la v2.7.0 du provider Terraform et les versions antérieures.

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

Remplacez `slo_id` par l'ID alphanumérique du SLO basé sur des métriques pour lequel vous souhaitez configurer un monitor de budget d'indisponibilité et remplacez `time_window` par `7d`, `30d` ou `90d`, selon l'intervalle cible utilisé pour configurer votre SLO basé sur des métriques.

## Restrictions bêta

- Les alertes ne sont disponibles que pour les SLO basés sur des métriques.
- Le statut d'alerte d'un monitor de SLO est disponible dans l'onglet **Alerts** dans le volet des détails du SLO.
- Vous ne pouvez définir qu'une seule alerte par SLO (cible + Intervalle de temps) dans l'interface utilisateur, mais vous pouvez définir plusieurs alertes par SLO à l'aide de l'API ou de Terraform.

[1]: /fr/monitors/service_level_objectives/metric/
[2]: https://app.datadoghq.com/slo
[3]: /fr/monitors/notifications/
[4]: /fr/api/v1/monitors/#create-a-monitor
[5]: https://www.terraform.io/docs/providers/datadog/r/monitor.html