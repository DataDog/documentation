---
aliases:
- /fr/tracing/ingestion/
- /fr/tracing/trace_retention_and_ingestion/
description: Découvrir comment contrôler l'ingestion des spans
further_reading:
- link: /tracing/trace_retention/
  tag: Documentation
  text: Rétention des traces
- link: /tracing/trace_retention/usage_metrics/
  tag: Documentation
  text: Métriques d'utilisation
kind: documentation
title: Ingestion de traces
---

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace : ingestion" >}}

Avec APM, l'**ingestion de traces** et la [rétention][1] de ces traces pendant 15 jours sont totalement personnalisables.

Pour suivre ou surveiller votre volume de données ingérées et indexées, consultez la section [Métriques d'utilisation][2].

## Mécanismes d'ingestion

Configurez le tracing pour profiter d'une visibilité de bout en bout sur vos applications avec une [configuration sur mesure de l'ingestion][3]. Assurez-vous de capturer les traces complètes, y compris l'ensemble des traces d'erreur ou de haute latence, afin de ne jamais passer à côté d'un problème de performance tel qu'une panne de l'application ou un service qui ne répond plus.

{{< img src="tracing/trace_indexing_and_ingestion/service_setup.png" style="width:80%;" alt="Configuration des services" >}}


## Contrôles d'ingestion

La [page Ingestion Control][4] offre une vue d'ensemble des volumes d'ingestion et des paramètres de configuration pour vos différents services.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Aperçu de la page Ingestion Control" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_retention
[2]: /fr/tracing/trace_retention/usage_metrics
[3]: /fr/tracing/trace_ingestion/mechanisms
[4]: /fr/tracing/trace_ingestion/ingestion_controls