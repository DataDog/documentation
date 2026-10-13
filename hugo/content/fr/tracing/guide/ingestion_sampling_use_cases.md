---
description: Explorez différents cas d'utilisation et stratégies d'échantillonnage
  de traces pour optimiser le volume d'ingestion tout en maintenant les capacités
  de dépannage.
further_reading:
- link: /tracing/guide/trace_ingestion_volume_control/
  tag: Guide
  text: Comment contrôler les volumes ingérés
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
title: Cas d'utilisation de l'échantillonnage de traces
---
## Présentation {#overview}

Les données de trace ont tendance à être répétitives. Un problème dans votre application est rarement identifié dans une trace unique, sans être constaté dans d'autres traces. Pour les services à haut débit, en particulier pour les incidents qui nécessitent votre attention, un problème présente des symptômes de manière répétée dans plusieurs traces. Par conséquent, vous n'avez généralement pas besoin de collecter chaque trace pour un service ou un endpoint, ni chaque span au sein d'une trace. Les [mécanismes de contrôle d'ingestion][1] de Datadog APM vous aident à conserver la visibilité dont vous avez besoin pour résoudre les problèmes, tout en réduisant le bruit et en maîtrisant les coûts.

Les mécanismes d'ingestion sont des configurations au sein du Datadog Agent et des SDK Datadog. Si vous utilisez les SDK OpenTelemetry pour instrumenter vos applications, lisez [Ingestion Sampling with OpenTelemetry][2].

Ce guide vous aide à comprendre quand et comment utiliser les configurations de contrôle d'ingestion en fonction des principaux cas d'utilisation que vous pourriez rencontrer. Il couvre :

- [Déterminer quels mécanismes d'ingestion sont utilisés](#determining-which-ingestion-mechanisms-are-used) pour un service donné
- [Les cas d'utilisation axés sur la conservation de types de traces particuliers](#keeping-certain-types-of-traces)
- [Les cas d'utilisation axés sur la réduction des traces ingérées](#reducing-ingestion-for-high-volume-services)


## Déterminer quels mécanismes d'ingestion sont utilisés {#determining-which-ingestion-mechanisms-are-used}

Pour identifier les mécanismes d'ingestion actuellement utilisés dans votre environnement Datadog, accédez à la [page Ingestion Control][3].

{{< img src="/tracing/guide/ingestion_sampling_use_cases/ingestion_control_page.png" alt="Page Ingestion Control" style="width:90%;" >}}

Le tableau donne des informations sur les volumes ingérés *par service*. La colonne Configuration fournit une première indication de la configuration actuelle. Il indique :
- `AUTOMATIC` si le taux d'échantillonnage calculé dans le Datadog Agent est appliqué aux traces générées par le service. En savoir plus sur les spécificités de la [logique d'ingestion du Datadog Agent][5].
- `CONFIGURED` si un taux d'échantillonnage de trace personnalisé configuré dans le SDK est appliqué aux traces générées par le service.

Cliquez sur les services pour voir les détails sur les décideurs d'échantillonnage (par exemple, l'Agent ou le SDK, les règles ou les taux d'échantillonnage) utilisés pour chaque service, ainsi que sur les [mécanismes d'échantillonnage d'ingestion][1] exploités pour les services des spans ingérés.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary.png" alt="Résumé de l'ingestion de service" style="width:90%;" >}}

Dans l'exemple de résumé de l'ingestion de service ci-dessus, le tableau {{< ui >}}Ingestion reasons breakdown{{< /ui >}} montre que la plupart des raisons d'ingestion pour ce service proviennent de `rule` ([règle d'échantillonnage définie par l'utilisateur][6]).

Les principaux décideurs d'échantillonnage pour ce service montrent que le service `web-store` reçoit des décisions d'échantillonnage de `web-store`, `shopist-web-ui`, `shipping-worker`, `synthetics-browser` et `product-recommendation`. Ces cinq services contribuent tous aux décisions d'échantillonnage globales qui affectent les spans du service `web-store`. Lors de la détermination de la manière d'ajuster l'ingestion pour web-store, les cinq services doivent être pris en compte.

## Conserver certains types de traces {#keeping-certain-types-of-traces}

### Conserver des traces de transaction complètes {#keeping-entire-transaction-traces}

L'ingestion de traces de transaction complètes garantit une visibilité sur le **flux de requête de service de bout en bout** pour des requêtes individuelles spécifiques.

#### Solution : Échantillonnage basé sur la tête {#solution-head-based-sampling}

Des traces complètes peuvent être ingérées avec des mécanismes d'[échantillonnage basé sur la tête][4] : la décision de conserver ou d'abandonner la trace est déterminée à partir du premier span de la trace, la *tête*, lors de la création de la trace. Cette décision est propagée via le contexte de requête aux services en aval.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/head-based-sampling.png" alt="Échantillonnage basé sur le début de la trace" style="width:100%;" >}}

Pour décider quelles traces conserver et abandonner, le Datadog Agent calcule des [taux d'échantillonnage par défaut][5] pour chaque service à appliquer lors de la création de la trace, en fonction du trafic de l'application :
- Pour les applications à faible trafic, un taux d'échantillonnage de 100 % est appliqué.
- Pour les applications à fort trafic, un taux d'échantillonnage inférieur est appliqué avec un objectif de 10 traces complètes par seconde par Agent.

Vous pouvez également remplacer le taux d'échantillonnage par défaut de l'Agent en configurant le taux d'échantillonnage par service. Consultez la section sur la façon de [conserver plus de traces pour des services spécifiques](#keeping-more-traces-for-specific-services-or-resources) pour plus d'informations.

#### Configurer l'échantillonnage basé sur la tête {#configuring-head-based-sampling}

Les taux d'échantillonnage par défaut sont calculés pour cibler 10 traces complètes par seconde, par Agent. Il s'agit d'un nombre *cible* de traces, qui résulte de la moyenne des traces sur une période donnée. Ce n'est *pas* une limite stricte, et les pics de trafic peuvent entraîner l'envoi d'un nombre nettement plus élevé de traces à Datadog pendant de courtes périodes.

Vous pouvez augmenter ou diminuer cette cible en configurant le paramètre du Datadog Agent `target_traces_per_second` ou la variable d'environnement `DD_APM_TARGET_TPS`. En savoir plus sur les [mécanismes d'ingestion de l'échantillonnage basé sur la tête][5].

**Remarque :** La modification de la configuration d'un Agent a un impact sur les taux d'échantillonnage en pourcentage pour *tous les services* qui rapportent des traces à ce Datadog Agent.

Dans la plupart des scénarios, cette configuration au niveau de l'Agent reste dans les limites du quota alloué, offre une visibilité suffisante sur les performances de votre application et vous aide à prendre les décisions appropriées pour votre activité.

### Conserver plus de traces pour des services ou des ressources spécifiques {#keeping-more-traces-for-specific-services-or-resources}

Si certains services et certaines requêtes sont critiques pour votre activité, vous souhaitez une meilleure visibilité sur ceux-ci. Vous pouvez souhaiter envoyer toutes les traces associées à Datadog afin de pouvoir examiner chacune des transactions individuelles.

#### Solution : Règles d'échantillonnage {#solution-sampling-rules}

Par défaut, les taux d'échantillonnage sont calculés pour cibler 10 traces par seconde par Datadog Agent. Vous pouvez remplacer le taux d'échantillonnage calculé par défaut en configurant des [règles d'échantillonnage][6] dans le SDK.

Vous pouvez configurer des règles d'échantillonnage par service. Pour les traces qui commencent à partir du service spécifié par la règle, le taux d'échantillonnage en pourcentage défini est appliqué à la place du taux d'échantillonnage par défaut de l'Agent.

#### Configuration d'une règle d'échantillonnage {#configuring-a-sampling-rule}

Vous pouvez configurer des règles d'échantillonnage en définissant la variable d'environnement `DD_TRACE_SAMPLING_RULES`.

Par exemple, pour envoyer 20 pour cent des traces pour le service nommé `my-service` :

```
DD_TRACE_SAMPLING_RULES='[{"service": "my-service", "sample_rate": 0.2}]'
```

En savoir plus sur les [mécanismes d'ingestion des règles d'échantillonnage][6].

### Conserver davantage de traces liées aux erreurs {#keeping-more-error-related-traces}

Les traces comportant des segments d'erreur sont souvent le symptôme de défaillances du système. Conserver une proportion plus élevée de transactions avec erreurs garantit que vous avez toujours accès à certaines requêtes individuelles pertinentes.

#### Solution : Taux d'échantillonnage des erreurs {#solution-error-sampling-rate}

En plus des traces échantillonnées au niveau de la tête, vous pouvez augmenter le taux d'échantillonnage des erreurs afin que chaque Agent conserve des segments d'erreur supplémentaires, même si les traces associées ne sont pas conservées par l'échantillonnage au niveau de la tête.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/error-spans-sampling.png" alt="Échantillonnage d'erreurs" style="width:100%;" >}}

**Remarques :**
- Les morceaux de trace distribués pourraient ne pas être ingérés car l'échantillonnage se produit localement au niveau du Datadog Agent.
- À partir de **Datadog Agent 6/7.41.0 et versions ultérieures**, `DD_APM_FEATURES=error_rare_sample_tracer_drop` peut être configuré pour inclure les segments abandonnés par les règles du SDK ou `manual.drop`. Plus de détails sont disponibles dans la [section Traces d'erreur de la documentation sur les mécanismes d'ingestion][9].

#### Configuration de l'échantillonnage des erreurs {#configuring-error-sampling}

Vous pouvez configurer le nombre de segments d'erreur par seconde et par Agent à capturer en définissant la variable d'environnement `DD_APM_ERROR_TPS`. La valeur par défaut est de `10` erreurs par seconde. Pour ingérer **toutes les erreurs**, définissez une valeur arbitrairement élevée. Pour désactiver l'échantillonnage des erreurs, définissez `DD_APM_ERROR_TPS` sur `0`.

## Réduction de l'ingestion pour les services à haut volume {#reducing-ingestion-for-high-volume-services}

### Réduction du volume provenant des services de base de données ou de cache {#reducing-volume-from-database-or-cache-services}

Les appels de base de données suivis peuvent représenter une grande quantité de données ingérées, alors que les métriques de performance des applications (telles que le nombre d'erreurs, le nombre de requêtes et la latence) suffisent à surveiller l'état de santé de la base de données.

#### Solution : Règles d'échantillonnage pour les traces avec appels de base de données {#solution-sampling-rules-for-traces-with-database-calls}

Pour réduire le volume de spans créé par le suivi des appels de base de données, configurez l'échantillonnage au début de la trace.

Les services de base de données démarrent rarement une trace. Habituellement, les spans de base de données client sont des enfants d'un span de service backend instrumenté.

Pour savoir **quels services démarrent les traces de base de données**, utilisez le graphique top list `Top Sampling Decision Makers` sur la page de contrôle d'ingestion [Service Ingestion Summary][7]. La configuration de l'échantillonnage basé sur l'en-tête pour ces services spécifiques réduit le volume des database spans ingérés, tout en garantissant qu'aucune trace incomplète n'est ingérée. Les traces distribuées sont soit conservées, soit entièrement supprimées.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/service-ingestion-summary-database.png" alt="Principaux décideurs en matière d'échantillonnage" style="width:90%;" >}}

Par exemple, pour les appels de base de données tracés de `web-store-mongo`, les traces proviennent des services `web-store` et `shipping-worker` 99 % du temps. Par conséquent, pour réduire le volume pour `web-store-mongo`, configurez l'échantillonnage pour les services `web-store` et `shipping-worker`.

#### Configurez l'échantillonnage pour supprimer les database spans {#configure-sampling-to-drop-database-spans}

Reportez-vous à la [section de configuration des règles d'échantillonnage](#configuring-a-sampling-rule) pour plus d'informations sur la syntaxe des règles d'échantillonnage.

Le service backend `web-store` appelle une base de données Mongo plusieurs fois par trace, et cela crée un volume important de spans indésirables :

- Configurez une **règle d'échantillonnage de trace** pour le service backend `web-store`, en veillant à ce que 10 pour cent des traces entières soient conservées, y compris les Mongo spans.

  ```
  DD_TRACE_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 0.1}]'
  ```

- Optionnellement, si vous souhaitez conserver tous les spans `web-store`, configurez une **règle d'échantillonnage de span unique** pour conserver 100 pour cent des spans pour le service backend `web-store`. Cet échantillonnage n'ingère aucun database call span en dehors des 10 pour cent identifiés ci-dessus.

  ```
  DD_SPAN_SAMPLING_RULES='[{"service": "web-store", "sample_rate": 1}]'
  ```

  **Remarque** : La configuration d'une règle d'échantillonnage de span unique est particulièrement utile si vous utilisez des [métriques basées sur des spans][8], qui sont dérivées des spans ingérés.

{{< img src="/tracing/guide/ingestion_sampling_use_cases/single-span-sampling3.png" alt="Échantillonnage des database spans" style="width:100%;" >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[2]: /fr/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[3]: https://app.datadoghq.com/apm/traces/ingestion-control
[4]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[5]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[6]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[7]: /fr/tracing/trace_pipeline/ingestion_controls/#service-ingestion-summary
[8]: /fr/tracing/trace_pipeline/generate_metrics/
[9]: /fr/tracing/trace_pipeline/ingestion_mechanisms/?tab=java#error-and-rare-traces