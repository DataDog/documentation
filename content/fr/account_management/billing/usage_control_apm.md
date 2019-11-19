---
title: Estimer et contrôler l'utilisation de l'APM
kind: faq
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].
Consultez la page [Tarification de l'APM][2] pour comprendre comment l'APM et le tracing distribué sont facturés.

La fonctionnalité App Analytics est facturée en fonction du nombre de [spans analysées][3]. Vous avez la possibilité de configurer [App Analytics][4] pour des services spécifiques afin de contrôler manuellement le nombre de spans analysées générés via les outils suivants. Notez toutefois que la fonctionnalité App Analytics sera alors limitée à ces services ou intégrations.

### Choisir la durée de rétention des spans analysées

La fonctionnalité App Analytics est facturée en fonction de la durée de rétention des spans analysées. Vous pouvez contrôler votre facture en définissant la durée de votre choix.

| Durée de rétention des spans analysées | Tarif |
|----------------------|---------|
| 15 jours (par défaut) | 1,70 $ par million de spans analysées par mois |
| 3 jours | 1,06 $ par million de spans analysées par mois |
| 7 jours | 1,27 $ par million de spans analysées par mois |
| 30 jours | 2,50 $ par million de spans analysées par mois |

Les tarifs correspondent à une facturation annuelle. Contactez le [service commercial][5] ou votre [chargé de compte][6] pour discuter d'éventuels tarifs préférentiels pour votre compte.

### Estimateur de spans analysées

Afin d'estimer le nombre spans analysées générées par un service chaque jour ou chaque mois, utilisez la [page Analyzed Span Estimator][7]. Elle est conçue pour vous aider à choisir les services pour lesquels activer la fonction App Analytics afin de mieux maîtriser vos coûts.

### Filtrage des spans analysées

Par défaut, les [filtres de spans][8] sont configurés de façon à ce que 100 % de vos spans analysées soient envoyées. Par exemple, un service Java avec 100 requêtes génère 100 spans analysées à partir de ses spans `servlet.request`, car chaque span `servlet.request` génère une span analysée.

Pour réduire votre facture, vous pouvez réduire le nombre de spans analysées facturables en [appliquant des filtres][8]. L'[échantillonnage des traces][9] ne sera pas affecté. Lorsqu'un service est filtré et que moins de 100 % des spans analysées sont envoyées, l'analyse des spans analysées est mise à l'échelle pour afficher une estimation par défaut, et vous avez la possibilité d'afficher la valeur filtrée.

Vous pouvez également choisir d'activer App Analytics pour des services ou des intégrations spécifiques dans le code en suivant [les instructions correspondant au langage utilisé][10].

[1]: https://www.datadoghq.com/pricing
[2]: /fr/account_management/billing/apm_distributed_tracing
[3]: /fr/tracing/visualization/#apm-event
[4]: /fr/tracing/app_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[9]: https://docs.datadoghq.com/fr/tracing/guide/trace_sampling_and_storage/
[10]: tracing/app_analytics/?tab=java#configure-additional-services-optional