---
title: Estimer et contrôler l'utilisation de l'APM
kind: documentation
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].
Consultez la page [Tarification de l'APM][2] pour comprendre comment l'APM et le tracing distribué sont facturés.

La fonctionnalité App Analytics est facturée en fonction du nombre de [spans analysées][3]. Vous avez la possibilité de configurer [App Analytics][4] pour des services spécifiques afin de contrôler manuellement le nombre de spans analysées générées via les outils suivants. Notez toutefois que la fonctionnalité App Analytics sera alors limitée à ces services ou intégrations.

### Choisir la durée de rétention des spans analysées

La fonctionnalité App Analytics est facturée en fonction de la durée de rétention des spans analysées. Vous pouvez contrôler votre facture en définissant la durée de votre choix.

| Durée de rétention des spans analysées | Tarif                                    |
|--------------------------|--------------------------------------------|
| 15 jours (par défaut)        | 1,70 $ par million de spans analysées par mois |
| 3 jours                   | 1,06 $ par million de spans analysées par mois |
| 7 jours                   | 1,27 $ par million de spans analysées par mois |
| 30 jours                  | 2,50 $ par million de spans analysées par mois |

Les tarifs correspondent à une facturation annuelle. Contactez le [service commercial][5] ou votre [chargé de compte][6] pour discuter d'éventuels tarifs préférentiels pour votre compte.

### Estimateur de spans analysées
L'outil [Analyzed Span Estimator][7] est conçu pour vous aider à choisir les services pour lesquels activer App Analytics afin de mieux maîtriser votre utilisation et vos coûts.

Pour estimer le nombre total de spans analysées qui devraient être envoyées chaque jour ou chaque mois par un service, suivez ces étapes :

1. Activez l'APM sur tous les hosts pour lesquels vous souhaitez estimer le volume de spans analysées.
2. Dans la [vue **Analyzed Span Estimator**][7], sélectionnez les services pour lesquels vous souhaitez activer APM Analytics.
3. La valeur **Total Estimated APM Volume** représente le volume total estimé de spans analysées pour tous les services, par jour et par mois. Chaque ligne correspondant au service représente le volume estimé de spans analysées pour ce service, par jour.

  {{< img src="tracing/faq/apm_span_estimator.png" alt="Estimateur de spans analysées">}}

4. Pour estimer le coût total, multipliez le volume total par le [prix de la durée de rétention des spans analysées][8].

Par exemple, si vous avez 1 750 000 000 spans analysées par mois et que celles-ci sont conservées pendant 15 jours (rétention par défaut), vous pouvez effectuer le calcul suivant :

1 750 000 000 spans analysées par mois * 1,70 $ / 1 million de spans analysées = **2 975 $ par mois** pour App Analytics

### Filtrage des spans analysées

Par défaut, les [filtres de spans][9] sont configurés de façon à ce que 100 % de vos spans analysées soient envoyées. Par exemple, un service Java avec 100 requêtes génère 100 spans analysées à partir de ses spans `servlet.request`, car chaque span `servlet.request` génère une span analysée.

Pour réduire votre facture, vous pouvez réduire le nombre de spans analysées facturables en [appliquant des filtres][9]. L'[échantillonnage des traces][10] ne sera pas affecté. Lorsqu'un service est filtré et que moins de 100 % des spans analysées sont envoyées, l'analyse des spans analysées est mise à l'échelle pour afficher une estimation par défaut, et vous avez la possibilité d'afficher la valeur filtrée.


Vous pouvez également choisir d'activer App Analytics pour des services ou des intégrations spécifiques dans le code en suivant [les instructions correspondant au langage utilisé][11].


[1]: https://www.datadoghq.com/pricing
[2]: /fr/account_management/billing/apm_distributed_tracing
[3]: /fr/tracing/visualization/#apm-event
[4]: /fr/tracing/app_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: /fr/account_management/billing/usage_control_apm/#choose-analyzed-span-retention
[9]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[10]: https://docs.datadoghq.com/fr/tracing/guide/trace_sampling_and_storage
[11]: /fr/tracing/app_analytics/?tab=java#configure-additional-services-optional