---
title: Créer des monitors
kind: documentation
description: Créer des monitors
aliases:
  - /fr/monitors/monitor_types/
further_reading:
  - link: /monitors/notify/
    tag: Documentation
    text: Notifications des monitors
  - link: /monitors/manage/
    tag: Documentation
    text: Gérer les monitors
---
## Présentation

Pour [créer un monitor][1] dans Datadog, passez le curseur sur **Monitors** dans le menu principal et cliquez sur [**New Monitor**][2] dans le sous-menu. Pour programmer la création d'un monitor, consultez la documentation relative à l'[API Datadog][3] ou aux [bibliothèques maintenues par la communauté][4].

## Types de monitors

Sélectionnez un [type de monitor][5] dans la liste.

{{< whatsnext desc="Choisissez votre type de monitor :">}}
{{< nextlink href="/monitors/create/types/host" >}}<u>Host</u> : vérifiez si un ou plusieurs hosts transmettent des données à Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/metric" >}}<u>Métrique</u> : comparez les valeurs d'une métrique avec un seuil défini par un utilisateur.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/anomaly" >}}<u>Anomalie</u> : détectez les comportements anormaux pour une métrique en fonction des données historiques.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/audit_logs" >}}<u>Logs d'audit</u> : recevez des alertes lorsqu'un type de log d'audit spécifique dépasse un seuil défini par l'utilisateur sur une période donnée.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/outlier" >}}<u>Outlier</u> : recevez des alertes lorsqu'un membre d'un groupe se comporte différemment des autres.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/forecasts" >}}<u>Prévision</u> : recevez des alertes lorsque Datadog prédit qu'une métrique s'apprête à franchir un seuil.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/integration" >}}<u>Intégration</u> : surveillez les valeurs de métriques ou des statuts de santé à partir d'une intégration spécifique.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process" >}}<u>Live Processes</u> : vérifiez si un ou plusieurs processus sont en cours d'exécution sur un host.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/process_check" >}}<u>Check de processus</u> : observez le statut généré par le check de service process.up.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/network" >}}<u>Réseau</u> : vérifiez le statut des endpoints TCP/HTTP.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/custom_check" >}}<u>Check custom</u> : surveillez le statut de checks custom arbitraires.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/event" >}}<u>Événement</u> : surveillez des événements recueillis par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/log" >}}<u>Logs</u> : surveillez des logs recueillis par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/apm" >}}<u>APM</u> : comparez une métrique APM à un seuil défini par un utilisateur.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/real_user_monitoring" >}}<u>Real User Monitoring</u> : surveillez des données utilisateur réelles recueillies par Datadog.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/watchdog" >}}<u>Watchdog</u> : recevez une notification lorsque Watchdog détecte un comportement anormal.{{< /nextlink >}}
{{< nextlink href="/monitors/create/types/composite" >}}<u>Composite</u> : recevez des alertes pour une expression combinant plusieurs monitors.{{< /nextlink >}}
{{< /whatsnext >}}

### Importer un monitor

Pour [importer un monitor][6] dans Datadog au format JSON, utilisez la navigation principale : *Monitors --> New Monitor --> Import*.

Vous pouvez exporter un monitor au format JSON depuis la page de statut du monitor. Cliquez sur l'icône des paramètres en forme d'engrenage (en haut à droite) et sélectionnez **Export** depuis le menu.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/create/configuration
[2]: https://app.datadoghq.com/monitors#/create
[3]: /fr/api/v1/monitors/
[4]: /fr/developers/community/libraries/#managing-monitors
[5]: /fr/monitors/create/types
[6]: https://app.datadoghq.com/monitors#create/import