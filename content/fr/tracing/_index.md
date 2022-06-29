---
aliases:
- /fr/tracing/faq/terminology
- /fr/tracing/guide/terminology
- /fr/tracing/guide/distributed_tracing/
- /fr/tracing/advanced/
- /fr/tracing/api
- /fr/tracing/faq/distributed-tracing/
description: Instrumenter votre code pour améliorer ses performances
further_reading:
- link: https://app.datadoghq.com/release-notes?category=APM
  tag: Notes de version
  text: Découvrez les dernières versions de la solution APM Datadog (connexion à l'application
    requise).
- link: /tracing/guide/setting_primary_tags_to_scope/
  tag: Documentation
  text: Ajouter des tags primaires et secondaires à vos traces
- link: /tracing/guide/add_span_md_and_graph_it/
  tag: Documentation
  text: Ajouter des tags personnalisés à vos spans pour filtrer et regrouper les données
    de performance
- link: /tracing/guide/security/
  tag: Documentation
  text: Nettoyer automatiquement les informations personnelles de vos traces
- link: /tracing/guide/metrics_namespace/
  tag: Documentation
  text: En savoir plus sur les métriques de trace et leurs tags
- link: /tracing/visualization/
  tag: Documentation
  text: Apprendre à utiliser l'UI de l'APM
- link: https://www.datadoghq.com/blog/span-based-metrics/
  tag: Blog
  text: Générer des métriques basées sur des spans pour suivre les tendances historiques
    relatives aux performances des applications
kind: documentation
title: APM et profileur en continu
---

{{< vimeo 381554158 >}}

</br>

L'APM et le profileur en continu de Datadog permettent d'analyser en détail vos applications grâce à des **dashboards de performance prêts à l'emploi** qui surveillent les requêtes, les erreurs et la latence de vos services Web, vos files d'attente et vos bases de données. Les traces distribuées sont **automatiquement mises en corrélation** avec les sessions de navigateur, les logs,  les profils, les checks Synthetic ainsi que les métriques réseau, de processus et d'infrastructure sur l'ensemble de vos hosts, conteneurs, proxies et fonctions sans serveur. Passez directement de l'analyse d'une trace lente à l'**identification de la ligne de code spécifique** à l'origine des goulots d'étranglement limitant les performances avec les hotspots de code.

#### Parcours d'une trace

{{< img src="tracing/live_search_and_analytics/tracing_without_limits_lifecycle-0.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Parcours d'une trace" >}}

Les traces sont créées dans vos applications instrumentées et sont transmises à Datadog ; toutes les traces y sont ingérées au rythme de 50 traces par seconde (par host d'APM). Dans le cas de services caractérisés par un débit élevé, vous pouvez visualiser et contrôler le processus à l'aide des [contrôles d'ingestion][1]. Toutes les traces ingérées peuvent être utilisées afin de rechercher et d'analyser des données en temps réel sur une durée de 15 minutes. Vous pouvez utiliser des [filtres de rétention][2] personnalisés basés sur des tags afin de conserver uniquement les traces pertinentes pour votre entreprise. Ainsi, vous pourrez rechercher et analyser ces traces pendant 15 jours.

## Envoyer des traces à Datadog

Lorsque que vous passez d'une application monolithique à une architecture de microservices, implémenter l'APM Datadog sur l'ensemble de vos hosts, conteneurs et fonctions sans serveur ne prend que quelques minutes.

[Ajoutez la bibliothèque de tracing Datadog][3] pour obtenir les instructions pour votre environnement et votre langage, que vous souhaitiez effectuer le [tracing d'un proxy][4] ou le tracing sur des [fonctions Lambda AWS][5] et des hosts via l'instrumentation automatique, dd-trace-api, [OpenTracing ou OpenTelemetry][6].

{{< partial name="apm/apm-compatibility.html" >}}

<br>

## Explorer l'APM Datadog

Maintenant que vous avez configuré votre application pour qu'elle envoie des traces à Datadog, vous pouvez commencer à analyser les performances de votre application :

### Service Map

[Analysez les dépendances entre les services][7] avec une service map générée automatiquement à partir de vos traces, ainsi que des métriques de performance des services et des statuts d'alerte de monitor.

{{< img src="tracing/index/ServiceMapInspect.mp4" alt="Service Map" video=true style="width:100%;">}}

### Dashboards sur les performances des services

[Surveillez les métriques de services][8] pour détecter des requêtes, erreurs et centiles de latence. Analysez les requêtes de base de données ou les endpoints mis en corrélation avec les données de votre infrastructure.

{{< img src="tracing/index/ServicePage.png" alt="Page Service" style="width:100%;">}}

### Profileur en continu

[Améliorez la latence des applications][9] et optimisez les ressources de calcul avec le profiling continu en production, qui vous permet d'identifier les lignes de code qui sollicitent le plus le processeur, la mémoire et l'E/S.

{{< img src="tracing/index/Profiling.png" alt="Profiling"  style="width:100%;">}}

### Live Search

[Effectuez une recherche sur l'ensemble de vos traces][10] par tag, en temps réel et sans aucun échantillonnage, pendant 15 minutes.

{{< img src="tracing/live_search/LiveSearch2.png" alt="Live Search" >}}

### Live Analytics

Lors d'une panne, [analysez les performances par tag sur n'importe quelle span][11] en temps réel, sur une durée de 15 minutes, afin d'identifier les utilisateurs ou transactions concernés.

{{< img src="tracing/live_search/LiveAnalytics.png" alt="Live Analytics" >}}

### Suivi des déploiements

[Surveillez les performances de vos services][12] et comparez les versions pour les déploiements progressifs, bleus/verts, fantômes et Canary.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions sur la page Service"  style="width:100%;">}}

### Rétention et ingestion des traces

[Conservez les traces pertinentes][13] grâce à des filtres de rétention basés sur des tags, et effectuez des analyses sur toutes les spans indexées pendant 15 jours.

{{< img src="tracing/index/RetentionFilterTracingPage.png" alt="Rétention et ingestion des traces"  style="width:100%;">}}

### Générer des métriques custom à partir de l'ensemble des spans

[Générez des métriques][14] avec une période de rétention de 15 mois à partir de l'ensemble des spans ingérées, afin de créer et de surveiller des indicateurs de performance et d'activité clés.

{{< img src="tracing/index/SpantoMetricsPreview.png" alt="Générer des métriques custom à partir des spans ingérées"  style="width:100%;">}}

### Associer vos logs à vos traces distribuées

[Visualisez vos logs d'application][15] en même temps que la trace associée pour une requête distribuée spécifique grâce à l'injection automatique de l'ID de trace.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Associer vos logs à vos traces"  style="width:100%;">}}

### Associer la fonctionnalité RUM aux traces

[Associez vos sessions RUM][16] à vos traces pour visualiser les traces spécifiques qui correspondent aux expériences utilisateur ainsi qu'aux problèmes signalés.

{{< img src="tracing/index/RumTraces.png" alt="Associer les sessions RUM aux traces" style="width:100%;">}}

### Associer vos données de test Synthetic à vos traces

[Associez les tests API simulés][17] aux traces pour identifier l'origine des échecs parmi vos requêtes frontend, réseau et backend.

{{< img src="tracing/index/Synthetics.png" alt="Tests Synthetic" style="width:100%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_ingestion/ingestion_controls/
[2]: /fr/tracing/trace_retention/#retention-filters
[3]: /fr/tracing/setup_overview/setup/java
[4]: /fr/tracing/setup_overview/proxy_setup/
[5]: /fr/tracing/setup_overview/serverless_functions/
[6]: /fr/tracing/setup_overview/open_standards/
[7]: /fr/tracing/visualization/services_map/
[8]: /fr/tracing/visualization/service/
[9]: /fr/tracing/profiler/
[10]: /fr/tracing/trace_explorer/#live-search-for-15-minutes
[11]: /fr/tracing/trace_explorer/#live-analytics-for-15-minutes
[12]: /fr/tracing/deployment_tracking/
[13]: /fr/tracing/trace_retention/
[14]: /fr/tracing/generate_metrics/
[15]: /fr/tracing/connect_logs_and_traces/
[16]: /fr/real_user_monitoring/connect_rum_and_traces
[17]: /fr/synthetics/apm/