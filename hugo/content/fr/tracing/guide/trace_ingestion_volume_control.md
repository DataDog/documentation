---
description: Apprenez à contrôler le volume d'ingestion des spans avec les mécanismes
  de tracing APM pour gérer les coûts tout en maintenant l'observabilité.
further_reading:
- link: /tracing/trace_pipeline/ingestion_controls/
  tag: Documentation
  text: Page Ingestion Control
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
title: Contrôle du volume d'ingestion avec le tracing distribué d'APM
---
## Présentation {#overview}

La [page Ingestion Control ][1] offre une visibilité granulaire sur la configuration de l'ingestion pour tous les services, dans l'agent et dans les SDK. Tous les [mécanismes d'ingestion][2] sont documentés publiquement et configurables.

Avec la page Ingestion Control , vous disposez d'une visibilité totale et d'un contrôle complet sur votre volume de spans. Par conséquent, vous pouvez :
- Ingérer les données les plus pertinentes pour votre activité et vos objectifs d'observabilité.
- Réduire les coûts réseau en évitant d'envoyer des données de trace inutilisées vers la plateforme Datadog.
- Contrôler et gérer vos coûts globaux.

## Effets de la réduction du volume d'ingestion de traces {#effects-of-reducing-trace-ingestion-volume}

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_25_percent.png" alt="Échantillonnage de l'ingestion APM affichant 25 pour cent des traces complètes ingérées" style="width:70%;" >}}

Si vous décidez de réduire le volume d'ingestion pour certains services, les **métriques de [requêtes, erreurs et latence][3]** (appelées métriques RED, pour Requests, Errors, and Duration) restent précises à 100 %, car elles sont calculées sur la base de 100 % du trafic de l'application, indépendamment de toute configuration d'échantillonnage. Ces métriques sont incluses lors de l'achat de Datadog APM. Afin de vous assurer d'avoir une visibilité totale sur le trafic de votre application, vous pouvez utiliser ces métriques pour repérer des erreurs potentielles sur un service ou une ressource, en créant des dashboards, des monitors et des SLO.

**Remarque** : Si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry et que vous configurez l'échantillonnage au niveau du SDK et/ou au niveau du collecteur, les métriques APM sont basées par défaut sur l'ensemble de données **échantillonné**. Consultez [Ingestion Sampling with OpenTelemetry][4] pour plus d'informations.

<div class="alert alert-info">Pour calculer les métriques APM à partir de données OpenTelemetry non échantillonnées, placez le <a href="/opentelemetry/setup/collector_exporter/#span-metrics-connector"><code>span_metrics</code> connector</a> avant tout processeur d'échantillonnage. Le connecteur Datadog permet d'obtenir le même résultat dans les configurations existantes. Pour plus d'informations, consultez <a href="/opentelemetry/ingestion_sampling/">Ingestion Sampling with OpenTelemetry</a>.</div>

Les données de trace sont très répétitives, ce qui signifie que des échantillons de traces pour enquêter sur d'éventuels problèmes restent disponibles avec l'échantillonnage de l'ingestion. Pour les services à haut débit, il n'est généralement pas nécessaire de collecter chaque requête ; un problème suffisamment important doit toujours présenter des symptômes dans plusieurs traces. Les contrôles d'ingestion vous aident à obtenir la visibilité dont vous avez besoin pour résoudre les problèmes tout en restant dans votre budget.

#### Métriques issues des spans {#metrics-from-spans}

[Les métriques issues des spans][5] sont basées sur les spans ingérés.

La réduction des taux d'échantillonnage d'ingestion impactera toute métrique de type **count**. Les métriques de type **Distribution**, par exemple les mesures `duration`, ne sont pas impactées car l'échantillonnage est principalement uniforme, la distribution des latences reste représentative du trafic.

#### monitors {#monitors}

Tout monitor de **métrique** utilisant des [métriques issues des spans](#metrics-from-spans) est impacté par la réduction du volume d'ingestion. Les monitors de métriques basés sur les métriques **trace.__** resteront précis, car ces métriques sont calculées sur la base de 100 % du trafic.

Les monitors [{{< ui >}}Trace analytics{{< /ui >}}][6] basés sur le nombre sont également impactés. Vérifiez si vous avez créé des monitors d'analyse de traces en recherchant les monitors `type:trace-analytics` sur la page de gestion des monitors.

## Évaluez la configuration d'ingestion de vos services {#assess-your-services-ingestion-configuration}

Pour évaluer l'état actuel de l'instrumentation des applications, utilisez la [page Ingestion control des traces][1] qui fournit des informations détaillées sur la configuration de l'agent et du SDK.

### Comprendre si vous respectez votre allocation d'ingestion mensuelle {#understanding-if-you-are-within-your-monthly-ingestion-allocation}

Utilisez le KPI d'utilisation mensuelle de l'ingestion pour estimer votre utilisation par rapport à l'allocation mensuelle de 150 Go de spans ingérées par host APM (cette allocation est cumulée pour tous les hosts APM).

{{< img src="/tracing/guide/trace_ingestion_volume_control/ingestion_overage.png" alt="KPI de dépassement d'ingestion affichant 170 pour cent de l'utilisation mensuelle estimée de 23,3 To mensuels disponibles sur l'ensemble de l'infrastructure" style="width:40%;" >}}

### Enquête avancée sur l'utilisation de l'APM {#advanced-apm-usage-investigation}

La configuration de l'ingestion peut être examinée pour chaque service. Cliquez sur une ligne de service pour voir le résumé de l'ingestion du service, qui affiche :
- {{< ui >}}Ingestion reason breakdown{{< /ui >}} : quel [mécanisme d'ingestion][2] est responsable du volume d'ingestion
- {{< ui >}}Top sampling decision makers{{< /ui >}} : quels services en amont prennent les décisions d'échantillonnage pour les spans ingérés concernant le [mécanisme d'ingestion par défaut][7]

Un [dashboard prêt à l'emploi][8] est également disponible pour obtenir davantage d'informations sur les tendances historiques liées à votre volume et à votre utilisation d'ingestion. Clonez ce dashboard pour pouvoir modifier les widgets et effectuer des analyses plus poussées.

## Réduisez votre volume d'ingestion {#reduce-your-ingestion-volume}

### Identifiez les services responsables de la majeure partie du volume d'ingestion {#identify-services-responsible-for-most-of-the-ingestion-volume}

Pour identifier quels services sont responsables de la majeure partie du volume d'ingestion, triez le tableau par {{< ui >}}Downstream Bytes/s{{< /ui >}}. Cette colonne vous permet de repérer quels services prennent la plupart des décisions d'échantillonnage, ce qui impacte également les services en aval.

Si le service initie la trace, **Octets/s en aval** englobe également le volume de spans provenant des services en aval pour lesquels le service a pris la décision d'échantillonnage.

La colonne {{< ui >}}Traffic Breakdown{{< /ui >}} donne une bonne indication de la configuration d'échantillonnage du service.

Si le service possède une valeur Downstream Bytes/s élevée et un taux d'échantillonnage important (ce taux est indiqué dans la section bleue de la colonne Traffic Breakdown), la diminution du taux d'échantillonnage de ce service devrait avoir une incidence conséquente sur le volume d'ingestion.

{{< img src="/tracing/guide/trace_ingestion_volume_control/sampling_99_percent.png" alt="Échantillonnage d'ingestion APM affichant 99 pour cent des traces complètes ingérées, ce qui signifie aucun échantillonnage" style="width:70%;" >}}

### Configurez globalement le taux d'échantillonnage d'ingestion au niveau de l'Agent {#globally-configure-the-ingestion-sampling-rate-at-the-agent-level}

La colonne {{< ui >}}Configuration{{< /ui >}} vous indique si vos services sont configurés avec des règles d'échantillonnage ou non. Si les principaux services sont étiquetés avec la configuration `AUTOMATIC`, la modification de la **configuration de l'Agent** réduira le volume globalement pour tous les services.

Pour réduire le volume d'ingestion au niveau de l'Agent, configurez `DD_APM_TARGET_TPS` (défini sur `10` par défaut) afin de réduire la part du volume d'échantillonnage en tête (head-based sampling). En savoir plus sur le [mécanisme d'échantillonnage par défaut][7].

**Remarque** : cette option de configuration ne prend effet que lors de l'utilisation des **SDK Datadog**. Si l'ingestion OTLP dans l'Agent collecte des données provenant d'applications instrumentées avec OpenTelemetry, la modification de `DD_APM_TARGET_TPS` ne change pas les taux d'échantillonnage appliqués dans les SDK.

De plus, pour réduire le volume de traces [d'erreur][9] et [rares][10] :
- Configurez `DD_APM_ERROR_TPS` pour réduire la part de l'échantillonnage des erreurs.
- Définissez `DD_APM_DISABLE_RARE_SAMPLER` sur true pour arrêter l'échantillonnage des traces rares.

### Configurez indépendamment le taux d'échantillonnage d'ingestion pour les services au niveau de la bibliothèque {#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level}

En configurant les taux d'échantillonnage pour quelques services à haut débit, la majeure partie du volume d'ingestion « excédentaire » peut être réduite.

Cliquez sur un service pour afficher le {{< ui >}}Service Ingestion Summary{{< /ui >}}. Regardez le {{< ui >}}Ingestion reasons breakdown{{< /ui >}} dans le panneau latéral, qui donne un aperçu de la part du volume d'ingestion attribuée à chaque mécanisme.

Si la raison principale de la majeure partie du volume d'ingestion est l'échantillonnage en tête (`auto` ou `rule`), le volume peut être configuré en définissant une règle d'échantillonnage au niveau du SDK.

Cliquez sur le bouton {{< ui >}}Manage Ingestion Rate{{< /ui >}} pour configurer un taux d'échantillonnage pour le service. Sélectionnez la langue du service et le taux d'échantillonnage d'ingestion que vous souhaitez appliquer.

**Remarque :** L'application doit être redéployée afin d'appliquer les modifications de configuration. Datadog recommande d'appliquer les modifications en définissant des [variables d'environnement][11].

### Échantillonnage de traces avec OpenTelemetry {#trace-sampling-with-opentelemetry}

Si vos applications et services sont instrumentés avec des bibliothèques OpenTelemetry et que vous utilisez le collecteur OpenTelemetry, vous pouvez utiliser les fonctionnalités d'échantillonnage OpenTelemetry suivantes :

- [TraceIdRatioBased][12] et [ParentBased][13] sont 2 échantillonneurs intégrés qui vous permettent de mettre en œuvre un échantillonnage déterministe en tête en fonction du trace_id au niveau du **SDK**.
- Le [Tail Sampling Processor][14] et le [Probabilistic Sampling Processor][15] vous permettent d'échantillonner des traces en fonction d'un ensemble de règles au niveau du **collecteur**.

L'utilisation de l'une ou l'autre de ces deux options génère des [métriques APM](#effects-of-reducing-trace-ingestion-volume) échantillonnées.

## Glossaire des raisons d'ingestion {#ingestion-reasons-glossary}

_Savoir quels mécanismes d'ingestion sont responsables de la majeure partie du volume d'ingestion_

Le mécanisme par défaut pour échantillonner les traces est le head-based sampling. La décision d'échantillonner ou non une trace est prise au début de son cycle de vie et propagée en aval dans le contexte des requêtes afin de garantir que vous puissiez toujours visualiser et analyser des traces complètes.

Le head-based sampling est configurable dans les SDK ou depuis Datadog Agent :

| raison d'ingestion   | Où             | Description du mécanisme d'ingestion | Par défaut |
|--------------------|-------------------|-----------------------|---------|
| `auto`             | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Datadog Agent distribue les taux d'échantillonnage aux SDK.    | 10 traces par seconde par Agent |
| `rule`             | [Bibliothèques de tracing](#independently-configure-the-ingestion-sampling-rate-for-services-at-the-library-level) | Le pourcentage d'échantillonnage défini par les bibliothèques pour des services spécifiques.   | null                 |


Plusieurs autres raisons d'ingestion sont affichées sur la page Ingestion Control et sous forme de tag sur la métrique `datadog.estimated_usage.apm.ingested_bytes`. Ces raisons d'ingestion peuvent être responsables de votre volume d'ingestion :

| raison d'ingestion   | Où             | Description du mécanisme d'ingestion | Par défaut |
|--------------------|-------------------|-----------------------|---------|
| `error`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             | Échantillonnage des erreurs non interceptées par le head-based sampling.             | 10 traces par seconde par Agent (null, si des règles sont définies) |
| `rare`            | [Agent](#globally-configure-the-ingestion-sampling-rate-at-the-agent-level)             |  Échantillonnage des traces rares (capturant toutes les combinaisons d'un ensemble de span tags).        | 5 traces par seconde par Agent (null, si des règles sont définies) |
| `manual`             | Dans le code | Remplacement de la décision dans le code pour conserver ou supprimer un span et ses enfants.    | null |
| `analytics`          | Agent et bibliothèques de tracing | [Mécanisme d'ingestion obsolète][16] qui échantillonne des spans individuels sans la trace complète.   | null                 |

D'autres solutions peuvent également être à l'origine d'un volume de spans échantillonnées :

- `synthetics` et `synthetics-browser` : Les tests API et navigateur sont connectés à la trace générée par le test.
- `rum` : Les requêtes provenant d'applications web et mobiles sont liées aux traces backend correspondantes.
- `lambda` et `xray` : Traces générées à partir de fonctions AWS Lambda instrumentées avec des bibliothèques X-Ray ou Datadog.

Consultez la [documentation relative aux mécanismes d'ingestion][2] pour en savoir plus sur les motifs d'ingestion.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_pipeline/ingestion_controls
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[3]: /fr/tracing/metrics/metrics_namespace/
[4]: /fr/opentelemetry/guide/ingestion_sampling_with_opentelemetry/
[5]: /fr/tracing/trace_pipeline/generate_metrics/
[6]: /fr/monitors/types/apm/?tab=analytics
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#head-based-sampling
[8]: /fr/tracing/trace_pipeline/metrics/
[9]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[10]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[11]: /fr/tracing/trace_pipeline/ingestion_mechanisms/?tab=environmentvariables#in-tracing-libraries-user-defined-rules
[12]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#traceidratiobased
[13]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/sdk.md#parentbased
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[15]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[16]: /fr/tracing/legacy_app_analytics