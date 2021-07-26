---
title: Consulter les données d'utilisation de l'APM et configurer des alertes
kind: documentation
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].
Consultez la page [Tarification de l'APM][2] pour comprendre comment l'APM et le tracing distribué sont facturés.

**Remarque :** les spans indexées étaient auparavant désignées par le terme de « spans analysées ». Le changement de dénomination a eu lieu à l'occasion du lancement de Tracing Without Limits le 20 octobre 2020.

## Informations sur l'utilisation de l'APM

Si vous êtes administrateur, vous pouvez consulter les informations relatives à l'utilisation de votre compte sur la page [Usage][3], qui est mise à jour toutes les 72 heures.

| Métrique         | Description                                                                              |
|----------------|------------------------------------------------------------------------------------------|
| Hosts APM      | Affiche le nombre total de hosts d'APM distincts au 99e centile pour toutes les heures du mois actuel. |
| Spans indexées | Affiche la somme de toutes les spans indexées pour toutes les heures du mois actuel.         |
| Fargate Tasks  | Affiche le nombre total moyen de tâches Fargate pour toutes les heures du mois actuel.              |

## Définir une alerte pour un host d'APM

Pour être notifié lorsqu'un déploiement de code accroît le nombre de hosts qui envoient des traces, configurez un monitor sur le nombre de hosts d'APM. Vous recevrez alors une notification dès que le nombre de hosts au sein de votre infrastructure augmente de manière imprévue, peu importe le contexte défini (`prod`, `availability-zone`, etc.) :

{{< img src="tracing/faq/apm_host_monitor.mp4" alt="Vue Analytics" video="true"  style="width:90%;">}}

1. Accédez à Monitors -> New Monitor.
2. Configurez un [nouveau monitor de métrique[4] avec `datadog.apm.host_instance`.
3. Définissez un seuil d'avertissement ou d'erreur.
4. Indiquez une notification explicite. Exemple : « Le nombre de hosts sur cet environnement vient de dépasser la valeur seuil spécifiée. Réduisez le nombre de hosts d'APM activés.

## Définir une alerte sur des spans indexées

Pour être notifié lorsqu'un déploiement de code entraîne une augmentation soudaine du nombre de spans indexées générés, configurez des [monitors d'analyse][5] pour les spans indexées. Vous recevrez alors une notification dès que le nombre de spans indexées au sein d'une infrastructure augmente de manière imprévue, peu importe le contexte défini (par exemple `service` ou `availability-zone`) :

1. Accédez à la [vue Analytics][6] dans l'APM.
2. Sélectionnez `env` (vous pouvez sélectionner `*`).
3. Sélectionnez `count` (vous pouvez sélectionner `*`).
4. Sélectionnez Export -> Export to Monitor.
5. Définissez le nombre de spans indexées à partir duquel envoyer un avertissement ou une erreur.
6. Indiquez une notification explicite. Exemple : « Le nombre de spans indexées pour ce service vient de dépasser le seuil spécifié. Définissez un filtre d'exclusion supplémentaire ou augmentez le taux d'échantillonnage pour revenir à des valeurs normales. »

Pour en savoir plus sur les filtres de rétention, cliquez [ici][7].

[1]: https://www.datadoghq.com/pricing
[2]: /fr/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /fr/monitors/monitor_types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/analytics
[7]: /fr/tracing/trace_retention_and_ingestion/