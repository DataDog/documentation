---
title: Surveiller votre utilisation des logs
kind: guide
further_reading:
  - link: /logs/log_configuration/processors
    tag: Documentation
    text: Apprendre à traiter vos logs
  - link: /logs/log_configuration/parsing
    tag: Documentation
    text: En savoir plus sur le parsing
---
Ce guide vous explique comment surveiller l'utilisation des logs avec des métriques d'estimation de l'utilisation. Les points suivants seront abordés :

* Recevoir une alerte en cas de pic de trafic imprévu
* Recevoir une alerte lorsque vous êtes sur le point de dépasser un seuil de budget associé à vos logs indexés
* Importer le dashboard d'utilisation Log Management prêt à l'emploi

## Recevoir une alerte en cas de pic imprévu

### Métriques d'utilisation des logs

Les [métriques d'utilisation des logs][1] sont proposées par défaut afin de surveiller le nombre de logs ingérés, d'octets ingérés et de logs indexés. Ces métriques sont gratuites et valables pendant 15 mois :

{{< img src="logs/processing/logs_to_metrics/estimated_usage_metrics.png" alt="Métriques d'utilisation conseillées" responsive="true" style="width:80%;">}}

Consultez la section ci-dessous pour découvrir comment les exploiter dans des [monitors de détection d'anomalies][2].

**Remarque** : il est conseillé de définir l'unité de la métrique `datadog.estimated_usage.logs.ingested_bytes` sur `Byte` depuis la [page Metric Summary][3] :

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="Définir l'unité de la métrique"  style="width:70%;">}}

### Monitors de détection d'anomalies

Pour définir des monitors de détection d'anomalies et recevoir une alerte en cas d'augmentation imprévue du nombre de logs indexés :

1. [Créez un monitor d'anomalie][4].
2. Sélectionnez la métrique `datadog.estimated_usage.logs.ingested_events`.
3. Ajoutez `datadog_is_excluded:false` dans la section `from` (pour surveiller les logs indexés et non ceux qui sont ingérés).
4. Ajoutez le tag `service` et `datadog_index` dans **count by** (pour recevoir une notification si un service spécifique fait l'objet d'un pic ou arrête d'envoyer des logs vers un index quelconque).
5. Définissez des conditions d'alerte en fonction de vos besoins (par exemple, une fenêtre d'évaluation ou un nombre d'occurrences d'une valeur en dehors de la plage attendue).
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

**Remarque** : les métriques utilisées dans ce dashboard sont des estimations et peuvent ne pas refléter les valeurs facturées.

Pour importer ce dashboard, copiez la [définition JSON du dashboard d'estimation de l'utilisation][5] et collez-la dans un nouveau dashboard. Vous pouvez également utiliser l'option `Import Dashboard JSON` dans le menu des paramètres, situé dans le coin supérieur droit de la fenêtre du nouveau dashboard.

**Remarque** : cette définition JSON ne peut pas être importée en tant que timeboard ou screenboard.

## Surveiller les logs indexés avec un seuil fixe

Recevez une notification si les volumes de logs indexés de votre infrastructure augmentent de manière imprévue, peu importe leur contexte (`service`, `availability-zone`, etc.) :

1. Accédez à la vue [Log Explorer de Datadog][6].
2. Créez une [requête de recherche][7] qui correspond au volume à surveiller. Ne spécifiez pas de requête pour surveiller tous les logs de cet index.
3. Cliquez sur **Export to monitor**.
4. Spécifiez la valeur seuil pour un *warning* ou une *error*.
5. Indiquez une notification explicite : `Le volume de ce service vient d'atteindre un niveau trop élevé. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour revenir à des valeurs normales.`

{{< img src="logs/guide/example_notification.png" alt=" exemple de notification" style="width:70%;">}}

### Recevoir une alerte lorsqu'un index atteint son quota journalier

Il est également possible d'[appliquer un quota journalier aux index][8] pour empêcher que le nombre de logs indexés par jour dépasse une valeur donnée. Si vous appliquez une telle limite, Datadog vous conseille de configurer le monitor ci-dessus de façon à recevoir une alerte lorsque 80 % de ce quota est atteint au cours des 24 dernières heures. Un événement est généré lorsque le quota journalier est atteint. Configurez un monitor pour être notifié de cet événement :

{{< img src="logs/guide/daily_quota_monitor.png" alt="Monitor de quota journalier"  style="width:70%;">}}

Voici un exemple de notification sur Slack :

{{< img src="logs/guide/daily_quota_notification.png" alt="Notification de quota journalier"  style="width:70%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/logs_to_metrics/#recommended-usage-metrics
[2]: /fr/monitors/create/types/anomaly/
[3]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[4]: https://app.datadoghq.com/monitors#create/anomaly
[5]: /resources/json/estimated_log_usage_dashboard_configuration.json
[6]: https://app.datadoghq.com/logs
[7]: /fr/logs/explorer/search/
[8]: /fr/logs/indexes/#set-daily-quota