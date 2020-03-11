---
title: Surveiller votre utilisation des logs
kind: guide
further_reading:
  - link: logs/processing
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: logs/processing/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
---
## Surveiller les logs indexés avec un seuil fixe

Recevez une notification si les volumes de logs indexés de votre infrastructure augmentent de manière imprévue, peu importe leur contexte (`service`, `availability-zone`, etc.) :

1. Accédez à la vue [Log Explorer de Datadog][1]
2. Créez une [requête de recherche][2] qui correspond au volume à surveiller (ne spécifiez pas de requête pour surveiller tous les logs de cet index)
3. Cliquez sur **Export to monitor**.
4. Spécifiez la valeur seuil pour un *warning* ou une *error*.
5. Indiquez une notification explicite : `Le volume de ce service vient d'atteindre un niveau trop élevé. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour revenir à des valeurs normales.`

{{< img src="logs/guide/example_notification.png" alt=" exemple de notification" style="width:70%;">}}

Il est également possible d'[appliquer un quota journalier aux index][3] pour empêcher que le nombre de logs indexés par jour dépassent une valeur donnée. Si vous appliquez une telle limite, nous vous conseillons de configurer le monitor ci-dessus de façon à recevoir une alerte lorsque 80 % de ce quota est atteint au cours des 24 dernières heures.

## Recevoir une alerte en cas de pic imprévu

### Activer les métriques d'utilisation des logs conseillées

Activez les [métriques d'utilisation des logs conseillées][4] pour commencer à surveiller les nombres de logs ingérés, d'octets ingérés et de logs indexés. Accédez à la page [Générer des métriques][5] pour activer les métriques relatives à l'utilisation de vos logs (ces métriques sont gratuites et conservées pendant 15 mois) :

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métriques d'utilisation conseillées" responsive="true" style="width:80%;">}}

Consultez la section ci-dessous pour découvrir comment les exploiter dans des [monitors de détection d'anomalie][6].

**Remarque** : il est conseillé de définir l'unité de la métrique `datadog.estimated_usage.logs.ingested_bytes` sur `Byte` depuis la [page Metric Summary][7] :

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Définir l'unité de la métrique"  style="width:70%;">}}

### Monitors de détection d'anomalies

Pour définir des monitors de détection d'anomalie et recevoir une alerte en cas d'augmentation imprévue du nombre de logs indexés :

1. [Créez un monitor d'anomalie][8]
2. Sélectionnez la métrique `datadog.estimated_usage.logs.ingested_events`
3. Ajoutez `datadog_is_excluded:false` dans la section `from` (pour surveiller les logs indexés et non ceux qui sont ingérés)
4. Ajoutez le tag `service` et `datadog_index` dans **group by** (pour recevoir une notification si un service spécifique fait l'objet d'un pic ou arrête d'envoyer des logs vers un index quelconque)
5. Définissez des conditions d'alerte en fonction de vos besoins (par exemple, fenêtre d'évaluation, nombre de fois où une valeur est en dehors de la plage attendue, etc.)
6. Définissez un message de notification avec des instructions claires :

{{< img src="logs/guide/anomaly_usage_notification.png" alt=" exemple de notification d'anomalie"  style="width:70%;">}}

Exemple de notification avec des liens contextuels :

```text
Une quantité de logs imprévue a été indexée dans l'index {{datadog_index.name}}

1. [Consultez les patterns de logs pour ce service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
2. [Appliquez un filtre pour exclure le pattern à l'origine du pic](https://app.datadoghq.com/logs/pipelines/indexes)
```

## Dashboard d'estimation de l'utilisation

Il est également possible d'utiliser les métriques d'utilisation des logs pour créer un dashboard servant à estimer votre utilisation de la solution Log Management de Datadog. Voici un exemple de dashboard de ce type :

{{< img src="logs/guide/log_usage_dashboard.png" alt="Dashboard d'estimation de l'utilisation des logs"  style="width:70%;">}}

**Rappel** : les métriques utilisées dans ce dashboard sont des estimations et peuvent ne pas refléter les valeurs facturées.

Pour importer ce dashboard, copiez la [définition JSON du dashboard d'estimation de l'utilisation][9] et importez-la dans un nouveau screenboard :

{{< img src="logs/guide/dashboard_import.png" alt="Dashboard d'estimation de l'utilisation des logs"  style="width:30%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /fr/logs/explorer/search
[3]: /fr/logs/indexes/#set-daily-quota
[4]: /fr/logs/logs_to_metrics/#recommended-usage-metrics
[5]: https://app.datadoghq.com/logs/pipelines/generate-metrics
[6]: /fr/monitors/monitor_types/anomaly/
[7]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[8]: https://app.datadoghq.com/monitors#create/anomaly
[9]: /resources/json/estimated_log_usage_dashboard_configuration.json