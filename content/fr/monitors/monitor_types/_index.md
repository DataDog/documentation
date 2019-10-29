---
title: Les monitors
kind: documentation
aliases:
  - /fr/monitoring
---
Pour [créer un monitor][1] dans Datadog, passez le curseur sur **Monitors** dans le menu principal et cliquez sur **New Monitor** dans le sous-menu. Pour programmer la création d'un monitor, consultez la documentation relative à l'[API Datadog][2] ou aux [bibliothèques entretenues par la communauté][3].

{{< whatsnext desc="Choisissez votre type de monitor :">}}
    {{< nextlink href="/monitors/monitor_types/host" >}}Host{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/metric" >}}Métrique{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/anomaly" >}}Anomalie{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/outlier" >}}Outlier{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/forecasts" >}}Prévision{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/integration" >}}Intégration{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/process" >}}Live Process{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/network" >}}Réseau{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/custom_check" >}}Check custom{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/event" >}}Événement{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/log" >}}Logs{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/apm" >}}Métriques APM{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/app_analytics" >}}Analyse de traces{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/watchdog" >}}Watchdog{{< /nextlink >}}
    {{< nextlink href="/monitors/monitor_types/composite" >}}Composite{{< /nextlink >}}
{{< /whatsnext >}}

## Contrôler des monitors

Pour tous les types de monitor, les modifications qui y sont apportées crée dans le [flux d'événements][4] un événement qui explique la modification et affiche l'utilisateur à son origine.

Si vous avez apporté des modifications à un monitor, vous pouvez consulter des exemples en effectuant la recherche d'événement suivante :
```
https://app.datadoghq.com/event/stream?per_page=30&query=tags:audit%20status:all
```

Datadog propose également une option de notification en cas de changement apporté à un monitor que vous avez créé. En bas de l'éditeur de monitors, sous **Notify your team**, sélectionnez **Notify** dans le menu déroulant en regard de : *alert recipients when this alert is modified*.

Le paramètre Notify envoie un e-mail pour les événements d'audit du monitor à toutes les personnes qui reçoivent des alertes pour ce monitor. L'événement d'audit du monitor apparaît également dans le [flux d'événements][20].


[1]: https://app.datadoghq.com/monitors#/create
[2]: /fr/api/#monitors
[3]: /fr/developers/libraries/#managing-monitors
[4]: /fr/monitors/monitor_types/host
[5]: /fr/monitors/monitor_types/metric
[6]: /fr/monitors/monitor_types/anomaly
[7]: /fr/monitors/monitor_types/outlier
[8]: /fr/monitors/monitor_types/forecasts
[9]: /fr/monitors/monitor_types/integration
[10]: /fr/monitors/monitor_types/process
[11]: /fr/monitors/monitor_types/process_check
[12]: /fr/monitors/monitor_types/network
[13]: /fr/monitors/monitor_types/custom_check
[14]: /fr/monitors/monitor_types/event
[15]: /fr/monitors/monitor_types/log
[16]: /fr/monitors/monitor_types/apm
[17]: /fr/monitors/monitor_types/watchdog
[18]: /fr/monitors/monitor_types/composite
[19]: https://app.datadoghq.com/monitors#create/import
[20]: /fr/graphing/event_stream