---
description: Découvrez les métriques utiles que vous pouvez générer à partir de données
  APM.
further_reading:
- link: tracing/trace_pipeline/
  tag: Documentation
  text: Personnalise l'ingestion de traces et conserve les traces importantes
- link: tracing/trace_collection/
  tag: Documentation
  text: Instrumenter vos services et configurer la collecte de données de trace dans
    l'Agent
- link: monitors/
  tag: Documentation
  text: Créer et gérer des monitors pour informer vos équipes dès que nécessaire
title: Métriques APM
---

## Métriques de trace

Les [métriques d'application de tracing][1] sont recueillies après l'activation de la collecte de traces et de l'instrumentation de votre application. Elles sont disponibles pour les dashboards et les monitors. Ces métriques capturent le nombre de **requêtes**, le nombre d'**erreur** et les mesures de **latence**. Elles sont calculées pour l'ensemble du trafic de l'application, peu importe l'[échantillonnage de l'ingestion des traces][2] que vous avez configuré.

Par défaut, ces métriques sont calculées par l'Agent Datadog en fonction des traces qu'il reçoit à partir d'une application instrumentée.

Les spans et les traces ingérées sont conservées pendant 15 minutes. Les spans et les traces indexées conservées par les filtres de rétention sont stockées par Datadog pendant 15 jours. Néanmoins, si vous générez des métriques custom à partir des données ingérées, les métriques sont conservées pendant 15 mois.

## Métriques runtime

Activez la [collecte de métriques runtime][3] dans les bibliothèques de tracing compatibles afin d'obtenir de précieuses informations sur les performances d'une application. Ces métriques sont envoyées à l'Agent Datadog via le port DogStatsD configuré.


## Étapes suivantes

{{< whatsnext desc="Utilisez les ressources que vous avez configurées :" >}}
    {{< nextlink href="tracing/guide/apm_dashboard" >}}Créer un dashboard pour suivre et corréler les métriques APM{{< /nextlink >}}
    {{< nextlink href="monitors/create/types/apm/" >}}Créer des monitors APM qui génèrent des alertes en cas d'imprévu{{< /nextlink >}}
{{< /whatsnext >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/metrics/metrics_namespace/
[2]: /fr/tracing/trace_pipeline/ingestion_mechanisms
[3]: /fr/tracing/metrics/runtime_metrics/