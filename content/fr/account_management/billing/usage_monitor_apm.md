---
kind: documentation
title: Consulter les données d'utilisation de l'APM et configurer des alertes
---

Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].
Consultez la page [Tarification d'APM][2] pour comprendre comment l'APM et le tracing distribué sont facturés.

## Informations sur l'utilisation de l'APM

Si vous êtes administrateur, vous pouvez consulter les informations relatives à l'utilisation de votre compte sur la page [Usage][3], qui est mise à jour toutes les 24 heures.

| Dimension          | Description                                                                                    |
|--------------------|------------------------------------------------------------------------------------------------|
| Hosts d'APM          | Affiche le nombre total de hosts d'APM distincts au 99e centile pour toutes les heures du mois actuel.       |
| Tâches Fargate d'APM  | Affiche la moyenne de tâches Fargate distinctes pour les périodes de 5 minutes du mois actuel.   |
| Ingested Spans     | Affiche la somme de tous les octets ingérés depuis des spans ingérés au cours du mois actuel.                      |
| Indexed Spans      | Affiche la somme des spans indexés pendant le mois en cours.                                   |

Chaque host APM et tâche APM Fargate vous octroie une partie du volume ingéré et indexé : 
- Spans ingérés : 150 Go de spans ingérés par host APM et 10 Go de spans ingérés par tâche APM Fargate.
- Spans indéxés : 1 million de spans indéxés par host APM et 65 000 spans indéxés par tâche APM Fargate.

## Définir des alertes basées sur les volumes ingérés/indexés

### Définir des alertes sur les octets ingérés

Pour vous assurer que l'utilisation de spans reste dans les limites de l'allocation que les hosts APM et les tâches APM Fargate vous accordent, configurez des monitors pour vous alerter lorsque votre utilisation mensuelle sʼapproche de la limite de votre allocation.

1. Créez un [monitor de métrique][8].
2. Saisissez `datadog.estimated_usage.apm.ingested_bytes` pour la requête métrique.
3. Définissez la fenêtre d'évaluation du monitor sur `current month (MTD)`. Cela permet de s'assurer que le monitor observe l'utilisation depuis le début du mois. Pour en savoir plus sur les fenêtres de temps cumulé, consultez la documentation relative aux [monitors][9].
4. Définissez le **seuil d'alerte** et un **seuil d'avertissement** facultatif pour vous alerter lorsque le volume ingéré atteint 80 % ou 90 % de votre allocation. 
5. Saisissez un nom pour le monitor. Définissez la notification pour envoyer une alerte à votre équipe lorsque les volumes ingérés sont trop élevés.

{{< img src="account_management/billing/monitor_usage_apm.png" alt="Une page de configuration de monitor de métrique affichant datadog.estimated_usage.apm.ingested_bytes comme requête de métrique" width="80%" >}}

Pour réduire efficacement vos volumes ingérés, consultez ce [guide][7] ou la documentation sur les [mécanismes d'ingestion][10].

### Définir des alertes sur des spans indexées

De même, vous pouvez définir des alertes pour vous assurer que votre budget pour vos spans indexés ne dépasse pas certaines limites. Créez un monitor de métrique à l'aide de la métrique `datadog.estimated_usage.apm.indexed_spans` pour recevoir des alertes lorsque votre volume de spans indexés depuis le début du mois dépasse un seuil défini.

Pour réduire le nombre de spans indexés, vérifiez la présence de filtres de rétention dans votre configuration. Pour en savoir plus sur les filtres de rétention, consultez la documentation relative à la [rétention de traces][11].

[1]: https://www.datadoghq.com/pricing
[2]: /fr/account_management/billing/apm_distributed_tracing/
[3]: https://app.datadoghq.com/account/usage
[4]: https://app.datadoghq.com/monitors#create/metric
[5]: /fr/monitors/types/apm/?tab=traceanalytics#monitor-creation
[6]: https://app.datadoghq.com/apm/traces?viz=timeseries
[7]: /fr/tracing/guide/trace_ingestion_volume_control/
[8]: https://app.datadoghq.com/monitors/create/metric
[9]: /fr/monitors/configuration/?tab=thresholdalert#cumulative-time-windows
[10]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[11]: /fr/tracing/trace_pipeline/trace_retention/