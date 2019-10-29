---
title: Estimer et contrôler l'utilisation de l'APM
kind: faq
---
Datadog propose différentes offres tarifaires selon vos besoins. Pour en savoir plus, consultez la page des [Tarifs][1].
Consultez la page [Tarification de l'APM][2] pour comprendre comment l'APM et le tracing distribué sont facturés.

La fonctionnalité Analyse et recherche de traces est facturée en fonction du nombre d'[événements APM][3]. Vous avez la possibilité de configurer l'[analyse et la recherche de traces][4] par service pour contrôler manuellement le nombre d'événements APM générés à l'aide des outils suivants. En revanche, notez que la fonctionnalité Analyse et recherche de traces sera alors limitée à ces services ou intégrations.

### Choisir la durée de rétention des événements APM

La fonctionnalité Analyse et de recherche de traces est facturée en fonction de la durée de rétention des événements APM. Vous pouvez contrôler votre facture en définissant la durée de votre choix.

| Durée de rétention des événements APM | Tarif |
|----------------------|---------|
| 15 jours (par défaut) | 1,70 $ par million d'événements APM par mois |
| 3 jours | 1,06 $ par million d'événements APM par mois |
| 7 jours | 1,27 $ par million d'événements APM par mois |
| 30 jours | 2,50 $ par million d'événements APM par mois |

Les tarifs correspondent à une facturation annuelle. Contactez le [service commercial][5] ou votre [chargé de compte][6] pour discuter d'éventuels tarifs préférentiels pour votre compte.

### Estimateur d'événements APM

{{< img src="tracing/faq/event_estimator.png" alt="Filtres d'événements APM" responsive="true" style="width:100%;">}}

Afin d'estimer le nombre d'événements envoyés par un service chaque jour ou chaque mois, utilisez la [page Event Estimator][7]. Elle est conçue pour vous aider à choisir les services pour lesquels activer l'analyse et la recherche de traces afin de mieux maîtriser vos coûts.

### Filtrage des événements APM

{{< img src="tracing/faq/event_filtering.mp4" alt="Vue d'analyse" video="true" responsive="true" style="width:90%;">}}

Par défaut, les [filtres d'événements][8] sont configurés de façon à ce que 100 % de vos événements APM soient envoyés. Par exemple, un service Java avec 100 requêtes génère 100 événements APM à partir de ses spans `servlet.request`, car chaque span `servlet.request` génère un événement APM.

Pour réduire votre facture, vous pouvez réduire le nombre d'événements APM facturables en [appliquant des filtres][8]. L'[échantillonnage des traces][9] ne sera pas affecté. Lorsqu'un service est filtré et que moins de 100 % des événements sont envoyés, l'analyse des événements APM est mise à l'échelle pour afficher une estimation par défaut, et vous avez l'option d'afficher la valeur filtrée.

Vous pouvez également choisir d'activer l'analyse et la recherche de traces par service, ou par intégration dans le code en suivant [les instructions correspondant au langage utilisé][10].

[1]: https://www.datadoghq.com/pricing
[2]: /fr/account_management/billing/apm_distributed_tracing
[3]: /fr/tracing/visualization/#apm-event
[4]: /fr/tracing/trace_search_and_analytics
[5]: mailto:sales@datadoghq.com
[6]: mailto:success@datadoghq.com
[7]: https://app.datadoghq.com/apm/docs/trace-search
[8]: https://app.datadoghq.com/apm/settings?env=datadoghq.com&activeTab=0
[9]: https://docs.datadoghq.com/fr/tracing/guide/trace_sampling_and_storage/
[10]: tracing/trace_search_and_analytics/?tab=java#configure-additional-services-optional